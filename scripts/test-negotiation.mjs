// test-negotiation.mjs — local test harness for functions/_middleware.js.
//
// Environment note: `wrangler` is not installed in this repo, so this harness
// simulates the Cloudflare Pages runtime instead of running the real one:
//   - `env.ASSETS.fetch(request)` is replaced with a static file server reading
//     from `dist/` (directory-index aware, serves dist/404.html for misses).
//   - The real `onRequest` middleware code is imported and invoked unchanged.
//
// This validates the Accept-header negotiation logic, q-value handling, Vary and
// Cache-Control headers, and fallback behaviour — but it is NOT proof that
// Cloudflare Pages Functions work in production (see report, Phase Nine).

import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
};

function resolveDist(pathname) {
  let p = pathname;
  try {
    p = decodeURIComponent(pathname);
  } catch {
    /* keep raw */
  }
  if (p === '/') return join(DIST, 'index.html');
  const rel = p.replace(/^\/+/, '');
  const direct = join(DIST, rel);
  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  const idx = join(DIST, rel, 'index.html');
  if (existsSync(idx)) return idx;
  return null;
}

function staticResponse(request) {
  const url = new URL(request.url);
  const file = resolveDist(url.pathname);
  if (file) {
    const body = readFileSync(file);
    const ct = CONTENT_TYPES[extname(file).toLowerCase()] || 'application/octet-stream';
    return new Response(body, { status: 200, headers: { 'Content-Type': ct } });
  }
  const notFound = join(DIST, '404.html');
  const body = existsSync(notFound) ? readFileSync(notFound) : 'Not Found';
  return new Response(body, { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

const env = {
  ASSETS: { fetch: staticResponse },
};

const { onRequest } = await import(new URL('../functions/_middleware.js', import.meta.url).href);

let pass = 0;
let fail = 0;

function assert(name, cond, detail = '') {
  if (cond) {
    pass += 1;
    console.log(`  ✓ ${name}`);
  } else {
    fail += 1;
    console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

async function get(path, accept) {
  const headers = {};
  if (accept !== undefined) headers.Accept = accept;
  const request = new Request(`https://dingweibattery.com${path}`, { headers });
  return onRequest({ request, env });
}

function isHtml(res) {
  return (res.headers.get('Content-Type') || '').toLowerCase().startsWith('text/html');
}
function isMarkdown(res) {
  return (res.headers.get('Content-Type') || '').toLowerCase().startsWith('text/markdown');
}

console.log('Phase Nine — local negotiation tests (simulated ASSETS, no wrangler)\n');

// Test 1: normal HTML
{
  const res = await get('/');
  const body = await res.text();
  assert('Test 1a: / → HTTP 200', res.status === 200, `status ${res.status}`);
  assert('Test 1b: / → text/html', isHtml(res), res.headers.get('Content-Type'));
  assert('Test 1c: / → original HTML content', /<!doctype html>|<html/i.test(body));
  assert('Test 1d: / → Vary: Accept present', /accept/i.test(res.headers.get('Vary') || ''), res.headers.get('Vary'));
}

// Test 2: Markdown negotiation
{
  const res = await get('/', 'text/markdown');
  const body = await res.text();
  assert('Test 2a: / (Accept: text/markdown) → 200', res.status === 200, `status ${res.status}`);
  assert('Test 2b: → text/markdown; charset=utf-8', isMarkdown(res), res.headers.get('Content-Type'));
  assert('Test 2c: → Vary: Accept', /accept/i.test(res.headers.get('Vary') || ''), res.headers.get('Vary'));
  assert('Test 2d: → actual Markdown content', /^#\s/m.test(body), body.slice(0, 40).replace(/\n/g, '\\n'));
}

// Test 3: data model page returns the correct article (content negotiation at a nested route)
{
  const res = await get('/data/55b24/', 'text/markdown');
  const body = await res.text();
  assert('Test 3a: /data/55b24/ → 200 markdown', res.status === 200 && isMarkdown(res));
  assert('Test 3b: correct page (55B24)', body.includes('55B24') && body.includes('Battery'));
}

// Test 3c: localized page (es) negotiates to Markdown at its own route
{
  const res = await get('/es/', 'text/markdown');
  assert('Test 3c: /es/ → Markdown', isMarkdown(res), res.headers.get('Content-Type'));
}

// Test 4: q=0
{
  const res = await get('/', 'text/markdown; q=0');
  assert('Test 4: q=0 → HTML (not markdown)', isHtml(res) && !isMarkdown(res), res.headers.get('Content-Type'));
}

// Test 5: explicit HTML
{
  const res = await get('/', 'text/html');
  assert('Test 5: Accept: text/html → HTML', isHtml(res) && !isMarkdown(res));
}

// Test 5b: tie-break — both html and markdown at equal q → HTML
{
  const res = await get('/', 'text/html, text/markdown');
  assert('Test 5b: tie (html=md q=1) → HTML', isHtml(res) && !isMarkdown(res), res.headers.get('Content-Type'));
}

// Test 5c: markdown wins when higher q
{
  const res = await get('/', 'text/html;q=0.5, text/markdown;q=0.9');
  assert('Test 5c: md q>html q → Markdown', isMarkdown(res), res.headers.get('Content-Type'));
}

// Test 6: cache separation
{
  const md = await get('/', 'text/markdown');
  const html = await get('/');
  assert('Test 6a: MD has Cache-Control: no-store', (md.headers.get('Cache-Control') || '').includes('no-store'), md.headers.get('Cache-Control'));
  assert('Test 6b: HTML has no no-store (caching preserved)', !(html.headers.get('Cache-Control') || '').includes('no-store'), html.headers.get('Cache-Control'));
}

// Test 7a: missing route falls back to HTML (404 page)
{
  const res = await get('/nonexistent-route/', 'text/markdown');
  assert('Test 7a: missing route → HTML fallback', isHtml(res) && !isMarkdown(res), `${res.status} ${res.headers.get('Content-Type')}`);
}

// Test 7b: excluded route (404.html) keeps original HTML behaviour
{
  const res = await get('/404.html', 'text/markdown');
  assert('Test 7b: /404.html → HTML (excluded)', isHtml(res) && !isMarkdown(res));
}

// Test 7c: excluded interactive tool route keeps original HTML behaviour
{
  const res = await get('/tools/compare/', 'text/markdown');
  assert('Test 7c: /tools/compare/ → HTML (excluded tool)', isHtml(res) && !isMarkdown(res), res.headers.get('Content-Type'));
}

// Test 7d: trailing-slash variant still negotiates to Markdown
{
  const res = await get('/data/55b24', 'text/markdown');
  assert('Test 7d: missing trailing slash → Markdown', isMarkdown(res), res.headers.get('Content-Type'));
}

// Test 7e: query string ignored for negotiation
{
  const res = await get('/data/55b24/?q=foo', 'text/markdown');
  assert('Test 7e: query string → Markdown (query ignored)', isMarkdown(res));
}

// Test 7f: non-HTML asset does not vary on Accept
{
  const res = await get('/favicon.svg', 'text/markdown');
  assert('Test 7f: asset → no Vary: Accept added', !(res.headers.get('Vary') || '').toLowerCase().includes('accept'), res.headers.get('Vary'));
}

// Test 8: manifest asset itself resolves (sanity)
{
  const res = await env.ASSETS.fetch(new Request('https://dingweibattery.com/_md/manifest.json'));
  const json = await res.json();
  const count = Object.keys(json).length;
  assert('Test 8: manifest readable, 480 entries', count === 480, `got ${count}`);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
