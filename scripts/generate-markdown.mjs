#!/usr/bin/env node
/**
 * generate-markdown.mjs — build-time Markdown mirrors for ALL sitemap pages
 * (replaces the P2 knowledge-only version).
 *
 * Runs AFTER `astro build`. Reads dist HTML for every sitemap URL, extracts
 * <main>, converts to Markdown with turndown, writes:
 *   - dist/markdown/<path>.md   (e.g. /markdown/data/55b24.md, /markdown/knowledge/what-is-cca.md)
 *   - dist/markdown/index.md    (human/crawler-readable listing of all mirrors)
 *   - dist/llms-full.txt        (entire corpus in one file)
 *
 * Frontmatter on every mirror: title / source / language / generated.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import TurndownService from 'turndown';

const SITE = 'https://dingweibattery.com';
const DIST = 'dist';
const MD_ROOT = join(DIST, 'markdown');
const GENERATED_ON = new Date().toISOString().slice(0, 10);

const td = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
  strongDelimiter: '**',
});

// GFM table support
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
  if (t) return decodeEntities(t[1].replace(/\s+/g, ' ').trim());
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return decodeEntities(h1[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  return '';
}

function collectSitemapUrls() {
  const candidates = ['sitemap-0.xml', 'sitemap-index.xml'];
  for (const f of candidates) {
    const p = join(DIST, f);
    if (!existsSync(p)) continue;
    const xml = readFileSync(p, 'utf8');
    if (f === 'sitemap-index.xml') {
      const inner = xml.match(/<loc>([^<]+)<\/loc>/);
      if (!inner) continue;
      const innerFile = join(DIST, inner[1].replace(/^\/|\/$/g, '').split('/').pop());
      if (existsSync(innerFile)) {
        const innerXml = readFileSync(innerFile, 'utf8');
        return [...innerXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
      }
    }
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  }
  return [];
}

function htmlPathForUrl(url) {
  const pathname = new URL(url).pathname; // always ends with /
  if (pathname === '/') return join(DIST, 'index.html');
  return join(DIST, pathname.slice(1).replace(/\/$/, ''), 'index.html');
}

function relPathForUrl(url) {
  const pathname = new URL(url).pathname;
  if (pathname === '/') return 'home';
  return pathname.slice(1).replace(/\/$/, '');
}

function langForUrl(url) {
  const pathname = new URL(url).pathname;
  const m = pathname.match(/^\/(es|ar|ru|zh)\//);
  return m ? m[1] : 'en';
}

function main() {
  const urls = collectSitemapUrls();
  if (urls.length === 0) {
    console.error('[md-gen] no sitemap found in dist/ — run `astro build` first.');
    process.exit(1);
  }

  if (existsSync(MD_ROOT)) rmSync(MD_ROOT, { recursive: true, force: true });
  mkdirSync(MD_ROOT, { recursive: true });

  const entries = [];
  const seen = new Set();

  for (const url of urls) {
    if (seen.has(url)) continue;
    seen.add(url);
    if (!url.startsWith(SITE)) continue; // safety: only own host

    const htmlPath = htmlPathForUrl(url);
    if (!existsSync(htmlPath)) continue;
    const html = readFileSync(htmlPath, 'utf8');
    const mainHtml = extractMain(html);
    if (!mainHtml) continue;

    const title = titleFromHtml(html);
    const body = decodeEntities(td.turndown(mainHtml)).replace(/\n{3,}/g, '\n\n').trim();
    if (body.length < 80) continue;

    const lang = langForUrl(url);
    const rel = relPathForUrl(url);
    const md = `---\ntitle: ${JSON.stringify(title)}\nsource: ${url}\nlanguage: ${lang}\ngenerated: ${GENERATED_ON}\n---\n\n> Source: ${url}\n\n${body}\n`;

    const outPath = join(MD_ROOT, rel + '.md');
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, md, 'utf8');
    entries.push({ url, title, lang, rel });
  }

  // Listing index
  const byLang = {};
  for (const e of entries) (byLang[e.lang] ||= []).push(e);
  const listing = [
    '# Dingwei Battery — Markdown Mirrors',
    '',
    `> Source: ${SITE} — generated ${GENERATED_ON}, ${entries.length} mirrors.`,
    '> Full corpus in one file: [llms-full.txt](/llms-full.txt)',
    '',
    ...Object.keys(byLang).sort().flatMap((lang) => [
      `## ${lang}`,
      '',
      ...byLang[lang].map((e) => `- [${e.rel}](${SITE}/markdown/${e.rel}.md)`),
      '',
    ]),
  ].join('\n');
  writeFileSync(join(MD_ROOT, 'index.md'), listing, 'utf8');

  // Full corpus
  const fullParts = [
    `# Dingwei Battery — Full Markdown Corpus`,
    '',
    `> Source: ${SITE}`,
    `> Generated: ${GENERATED_ON}`,
    `> Language mirrors included: en, es, ar, ru, zh`,
    '',
  ];
  for (const e of entries) {
    const mdPath = join(MD_ROOT, e.rel + '.md');
    const content = readFileSync(mdPath, 'utf8').split('\n').slice(5).join('\n'); // strip frontmatter
    fullParts.push(`\n---\n\n# ${e.title}\n\n> Source: ${e.url} (${e.lang})\n\n${content}`);
  }
  const full = fullParts.join('\n');
  writeFileSync(join(DIST, 'llms-full.txt'), full, 'utf8');

  console.log(
    `[md-gen] ${entries.length} mirrors -> /markdown/ ; llms-full.txt ${(full.length / 1024).toFixed(0)}KB`
  );
}

main();
