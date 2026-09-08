#!/usr/bin/env node
/**
 * P2 — Build-time Markdown generation for knowledge articles.
 *
 * Runs AFTER `astro build`. Reads the built HTML for each knowledge article,
 * extracts the main `.prose` body, and converts it to Markdown into
 * `public/` so that `/.md` files are available as static resources.
 *
 * This does NOT implement HTTP content negotiation (that would require SSR or
 * a Cloudflare Worker). It generates static Markdown files that AI crawlers
 * can fetch directly (e.g. /knowledge/what-is-cca/index.md or a flat listing).
 *
 * Zero runtime dependency; turndown is a devDependency used only at build time.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import TurndownService from 'turndown';

const DIST = 'dist';
const OUT = 'public/markdown';
const KNOWLEDGE_DIR = join(DIST, 'knowledge');

// Only generate for the default (English) locale to avoid 4x duplication.
// Other locales remain crawlable via their HTML + hreflang.

const td = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
  strongDelimiter: '**',
});

// Render tables as GFM-style markdown tables (with --- separator row).
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

// Keep internal links as relative markdown links where sensible.
td.addRule('keepLinks', {
  filter: 'a',
  replacement: (content, node) => {
    const href = node.getAttribute('href') || '';
    const text = content.trim();
    if (href.startsWith('http')) return `[${text}](${href})`;
    return `[${text}](${href})`;
  },
});

function extractBody(html) {
  // Body is inside the main <main id="main"> element; the article prose is the
  // <section class="section container prose"> (the first one holds the article).
  // Use a targeted substring extraction between the first prose section and the
  // CTA/FAQ that follows. Simpler: grab <main>…</main> then let turndown handle it,
  // but strip header/footer noise by extracting only the first .prose section.
  const m = html.match(/<main id="main">([\s\S]*?)<\/main>/);
  if (!m) return '';
  const main = m[1];

  // Find the first <section class="...prose..."> ... </section>
  const sec = main.match(/<section class="([^"]*\bprose\b[^"]*)"[^>]*>([\s\S]*?)<\/section>/);
  if (!sec) return '';

  // Decode a few entities turndown may leave
  return sec[2];
}

function decodeEntities(s) {
  return s
    .replace(/&minus;/g, '\u2212')
    .replace(/&deg;/g, '\u00b0')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&mdash;/g, '\u2014')
    .replace(/&ndash;/g, '\u2013')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ');
}

function main() {
  if (!existsSync(KNOWLEDGE_DIR)) {
    console.error('[P2] dist/knowledge not found — run `astro build` first.');
    process.exit(1);
  }

  const slugs = readdirSync(KNOWLEDGE_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const outDir = join(OUT);
  mkdirSync(outDir, { recursive: true });
  const flat = [];

  for (const slug of slugs) {
    const htmlPath = join(KNOWLEDGE_DIR, slug, 'index.html');
    if (!existsSync(htmlPath)) continue;

    const html = readFileSync(htmlPath, 'utf8');
    const bodyHtml = extractBody(html);
    if (!bodyHtml) continue;

    const md = decodeEntities(pathToMarkdown(bodyHtml));

    // Per-article markdown path
    const slugDir = join(outDir, slug);
    mkdirSync(slugDir, { recursive: true });
    writeFileSync(join(slugDir, 'index.md'), md + '\n', 'utf8');

    flat.push({ slug, path: `/markdown/${slug}/index.md` });
  }

  // Generate an index of all markdown files.
  const indexMd = [
    '# Dingwei Battery — Knowledge Base (Markdown)',
    '',
    'Machine-readable Markdown versions of the knowledge articles, generated at build time.',
    '',
    ...flat.map((f) => `- [${f.slug}](${f.path})`),
    '',
  ].join('\n');
  writeFileSync(join(outDir, 'index.md'), indexMd, 'utf8');

  console.log(`[P2] generated ${flat.length} markdown articles in ${OUT}/`);
}

function pathToMarkdown(html) {
  const { JSDOM } = { JSDOM: null };
  // turndown expects a DOM node; wrap in a minimal DOM using turndown's own parser.
  // turndown.turndown(html) works with an HTML string directly.
  const md = td.turndown(html);
  // Clean up excessive blank lines
  return md.replace(/\n{3,}/g, '\n\n').trim();
}

main();
