#!/usr/bin/env node
/**
 * generate-negotiation-markdown.mjs — build-time Markdown sidecars for HTTP
 * content negotiation (Accept: text/markdown at the SAME public URL).
 *
 * Runs AFTER `astro build` (and after the existing mirror generator). Walks the
 * final `dist/` HTML output, identifies public / indexable / canonical pages,
 * converts each `<main>` to a clean Markdown sidecar next to its `index.html`,
 * and emits `dist/_md/manifest.json` mapping public URLs → Markdown assets.
 *
 * Deliberate decisions (adapted to THIS repo's actual architecture):
 *   - HTML→Markdown uses `turndown` (^7.2.4), already a devDependency and the
 *     same converter the existing `generate-markdown.mjs` mirror generator uses.
 *     `parse5` is only a transitive Astro dependency and is NOT directly
 *     resolvable from this package, so it is not used here (zero new deps).
 *   - Content source is `<main id="main">` (fallback `<main>`), which already
 *     excludes the page-level header/nav/footer, cookie banners and chrome.
 *   - Output is clean Markdown (no frontmatter) — the canonical representation
 *     for content negotiation. Sidecars are dist/<path>/index.md; the mirrors
 *     under dist/markdown/ and dist/llms-full.txt are left untouched.
 *   - Eligibility mirrors the sitemap policy: exclude `404.html`, any `noindex`
 *     page, and the interactive `/tools/` pages (non-informational filter and
 *     compare tools). Everything else public/canonical/indexable is included.
 *   - Deterministic: sorted traversal, no timestamps, sorted manifest keys.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');
const MANIFEST_DIR = join(DIST, '_md');
const MANIFEST_PATH = join(MANIFEST_DIR, 'manifest.json');

// ---------------------------------------------------------------------------
// turndown configuration (mirrors the existing mirror generator's settings)
// ---------------------------------------------------------------------------

const td = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
  strongDelimiter: '**',
});

td.addRule('gfmTable', {
  filter: 'table',
  replacement: (content, node) => {
    const rows = Array.from(node.querySelectorAll('tr'));
    if (rows.length === 0) return content;
    const cellText = (cell) =>
      td.turndown(cell.innerHTML).replace(/\|/g, '\\|').replace(/\n/g, ' ').trim();
    const toRow = (tr) => {
      const cells = Array.from(tr.children).map((c) => cellText(c));
      return '| ' + cells.join(' | ') + ' |';
    };
    const isHeader = (tr) => Array.from(tr.children).every((c) => c.tagName === 'TH');
    const headerIdx = rows.findIndex(isHeader);
    if (headerIdx >= 0) {
      const headerRow = toRow(rows[headerIdx]);
      const colCount = Array.from(rows[headerIdx].children).length;
      const sepRow = '|' + Array(colCount).fill('---').join('|') + '|';
      const bodyRows = rows.slice(headerIdx + 1).map(toRow).join('\n');
      return headerRow + '\n' + sepRow + '\n' + bodyRows;
    }
    return rows.map(toRow).join('\n');
  },
});

td.addRule('keepLinks', {
  filter: 'a',
  replacement: (content, node) => {
    const href = node.getAttribute('href') || '';
    const text = content.trim();
    if (href.startsWith('http')) return `[${text}](${href})`;
    return `[${text}](${href})`;
  },
});

// ---------------------------------------------------------------------------
// HTML extraction helpers (regex-based, same approach as the mirror generator)
// ---------------------------------------------------------------------------

function stripNoise(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '');
}

function extractMain(html) {
  const m = html.match(/<main id="main">([\s\S]*?)<\/main>/);
  if (m) return stripNoise(m[1]);
  const m2 = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (m2) return stripNoise(m2[1]);
  return '';
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&minus;/g, '\u2212')
    .replace(/&deg;/g, '\u00b0')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&mdash;/g, '\u2014')
    .replace(/&ndash;/g, '\u2013')
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));
}

function titleFromHtml(html) {
  const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!t) return '';
  let title = decodeEntities(t[1].replace(/\s+/g, ' ').trim());
  // Strip the trailing site-name suffix (e.g. "| Dingwei Battery" / "| Dingwei").
  title = title.replace(/\s*[|—–-]\s*(Dingwei Battery|Dingwei)\s*$/i, '').trim();
  return title;
}

function metaDescription(html) {
  const m = html.match(/<meta[^>]*name=["']?description["']?[^>]*content=["']([^"']*)["']/i)
    || html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']?description["']?/i);
  if (m) return decodeEntities(m[1].replace(/\s+/g, ' ').trim());
  return '';
}

function hasNoindex(html) {
  return /<meta[^>]*name=["']?robots["']?[^>]*content=["'][^"']*noindex/i.test(html)
    || /<meta[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']?robots["']?/i.test(html);
}

// ---------------------------------------------------------------------------
// Eligibility (Phase Two)
// ---------------------------------------------------------------------------

const EXCLUDED_BASENAMES = new Set(['404.html']);

// Interactive filter/compare tools are not informational content pages; they are
// already excluded from the sitemap (see astro.config.mjs sitemap filter).
function isToolPage(rel) {
  return rel === 'tools' || rel.startsWith('tools/') || rel.includes('/tools/');
}

// ---------------------------------------------------------------------------
// Conversion
// ---------------------------------------------------------------------------

function stripFirstH1(body) {
  const lines = body.split('\n');
  const idx = lines.findIndex((l) => /^#\s/.test(l));
  if (idx === -1) return body;
  lines.splice(idx, 1);
  // Drop a blank line left immediately after the removed heading.
  if (lines[idx] === '') lines.splice(idx, 1);
  return lines.join('\n').trim();
}

function convertPage(html) {
  const title = titleFromHtml(html);
  const desc = metaDescription(html);
  const mainHtml = extractMain(html);
  if (!mainHtml) return null;

  let body = decodeEntities(td.turndown(mainHtml)).trim();

  // Promote the page title to the top and drop the body's duplicate H1
  // (only when we actually have a title to promote).
  if (title) body = stripFirstH1(body);

  const parts = [];
  if (title) parts.push(`# ${title}`);
  if (desc) parts.push(`> ${desc.trim()}`);
  if (body) parts.push(body);
  if (parts.length === 0) return null;

  return `${parts.join('\n\n')}\n`.replace(/[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const FATAL_PATTERNS = [
  { re: /<script/i, label: 'script leakage' },
  { re: /<style/i, label: 'style leakage' },
  { re: /<!doctype/i, label: 'doctype leakage' },
  { re: /<html\b/i, label: 'html tag leakage' },
];

function validateMarkdown(url, md) {
  const problems = [];
  for (const { re, label } of FATAL_PATTERNS) {
    if (re.test(md)) problems.push(label);
  }
  if (!/^#+\s/m.test(md)) problems.push('missing heading');
  if (md.trim().length < 40) problems.push('insufficient content');
  const leftoverTags = md.match(/<[a-zA-Z]/g) || [];
  return { problems, leftoverTags };
}

// ---------------------------------------------------------------------------
// File walking
// ---------------------------------------------------------------------------

function walkFiles(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, out);
    else out.push(full);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (!existsSync(DIST)) {
    console.error('✗ dist/ not found — run `astro build` first.');
    process.exit(1);
  }

  // Idempotent: clear previous negotiation sidecars (index.md next to index.html)
  // and the manifest. Mirror files live under dist/markdown/ and are NOT touched.
  rmSync(MANIFEST_DIR, { recursive: true, force: true });
  for (const f of walkFiles(DIST)) {
    const rel = relative(DIST, f);
    if (rel.includes(`${sep}markdown${sep}`)) continue;
    if (f.endsWith(`${sep}index.md`) || rel === 'index.md') rmSync(f, { force: true });
  }

  const htmlFiles = walkFiles(DIST)
    .filter((f) => f.endsWith('.html'))
    .sort();

  let scanned = 0;
  let generated = 0;
  const excluded = [];
  const manifest = {};
  const warnings = [];

  for (const htmlPath of htmlFiles) {
    const rel = relative(DIST, htmlPath);
    const base = rel.split(sep).pop();

    if (EXCLUDED_BASENAMES.has(base)) {
      excluded.push({ url: rel, reason: 'error page (404)' });
      continue;
    }

    const html = readFileSync(htmlPath, 'utf8');
    scanned += 1;

    if (hasNoindex(html)) {
      excluded.push({ url: rel, reason: 'noindex' });
      continue;
    }

    if (isToolPage(rel)) {
      excluded.push({ url: rel, reason: 'interactive tool (non-informational)' });
      continue;
    }

    const md = convertPage(html);
    if (md === null) {
      excluded.push({ url: rel, reason: 'no <main> content' });
      continue;
    }

    const { problems, leftoverTags } = validateMarkdown(rel, md);
    if (problems.length > 0) {
      console.error(`✗ FAIL ${rel}: ${problems.join(', ')}`);
      process.exit(1);
    }
    if (leftoverTags.length > 0) {
      warnings.push(`${rel}: leftover tag(s) ${[...new Set(leftoverTags)].join(', ')}`);
    }

    const mdRel = rel.replace(/\.html$/, '.md');
    const mdPath = join(DIST, mdRel);
    mkdirSync(dirname(mdPath), { recursive: true });
    writeFileSync(mdPath, md);
    generated += 1;

    // URL mapping: dist/index.html → "/"; dist/a/b/index.html → "/a/b/".
    const dir = dirname(rel);
    const url = dir === '.' ? '/' : `/${dir.split(sep).join('/')}/`;
    manifest[url] = `/${mdRel.split(sep).join('/')}`;
  }

  // Manifest validation: every key is an absolute URL and every value exists.
  for (const [url, asset] of Object.entries(manifest)) {
    if (!url.startsWith('/')) {
      console.error(`✗ FAIL manifest: key not absolute URL: ${url}`);
      process.exit(1);
    }
    if (url.includes('?')) {
      console.error(`✗ FAIL manifest: key contains query string: ${url}`);
      process.exit(1);
    }
    const target = join(DIST, asset.replace(/^\//, ''));
    if (!existsSync(target)) {
      console.error(`✗ FAIL manifest: ${url} → ${asset} does not exist`);
      process.exit(1);
    }
  }

  mkdirSync(MANIFEST_DIR, { recursive: true });
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));

  for (const w of warnings) console.warn(`⚠ ${w}`);

  console.log(
    `✓ Markdown negotiation assets generated: ${generated} pages, ` +
    `${excluded.length} excluded, manifest → ${relative(ROOT, MANIFEST_PATH)}`,
  );
}

main();
