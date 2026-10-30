// functions/_middleware.js — HTTP content negotiation for Dingwei Battery
// (Astro static site on Cloudflare Pages).
//
// Behaviour:
//   - Browser / HTML requests continue to receive the original static HTML.
//   - Requests accepting `text/markdown` receive the Markdown sidecar at the
//     SAME public URL (resolved through dist/_md/manifest.json).
//   - HTML remains the canonical, indexable representation.
//   - Markdown responses are `Cache-Control: no-store` until cache-key separation
//     is verified in production. HTML responses gain a merged `Vary: Accept` for
//     cache safety, but otherwise keep their original status, headers and body.
//
// Coexists with the existing `/markdown/*.md` mirror system and `_headers` /
// `_redirects` files: those routes are served by the static asset store unchanged.
//
// No recursion: `env.ASSETS.fetch()` reads the static asset store directly and
// never re-enters Functions, so neither the manifest fetch nor the Markdown fetch
// can loop back into this middleware.

const MD_CONTENT_TYPE = 'text/markdown; charset=utf-8';

// Lazily cached manifest (module scope persists within a Pages isolate; the
// manifest only changes on redeploy, so this is safe and avoids a per-request
// fetch on the HTML path).
let manifestCache = null;

async function getManifest(env, request) {
  if (manifestCache) return manifestCache;
  const res = await env.ASSETS.fetch(
    new Request(new URL('/_md/manifest.json', request.url)),
  );
  if (res.ok) {
    manifestCache = await res.json();
    return manifestCache;
  }
  return {}; // do not cache a failed read
}

// Parse an Accept header into { mediaType: qValue }. Media types are lowercased.
// Invalid q values fall back to the default of 1. First occurrence wins.
function parseAccept(header) {
  const result = {};
  if (!header) return result;
  for (const part of header.split(',')) {
    const segments = part.split(';');
    const type = segments[0].trim().toLowerCase();
    if (!type) continue;
    let q = 1;
    for (const seg of segments.slice(1)) {
      const idx = seg.indexOf('=');
      if (idx === -1) continue;
      const key = seg.slice(0, idx).trim().toLowerCase();
      if (key !== 'q') continue;
      const parsed = parseFloat(seg.slice(idx + 1).trim());
      if (!Number.isNaN(parsed)) q = parsed;
    }
    if (!(type in result)) result[type] = q;
  }
  return result;
}

// `text/markdown` wins only when explicitly present with q > 0 AND its q value
// is strictly higher than the effective HTML quality value. Ties resolve to HTML
// (the canonical default). `q=0` means explicit rejection → HTML.
function prefersMarkdown(acceptHeader) {
  const q = parseAccept(acceptHeader);
  const mdQ = q['text/markdown'];
  if (mdQ === undefined || mdQ <= 0) return false;
  const htmlQ =
    q['text/html'] !== undefined ? q['text/html'] : q['*/*'] !== undefined ? q['*/*'] : 0;
  return mdQ > htmlQ;
}

// Look up a URL path in the manifest, tolerating a missing trailing slash.
function resolveAsset(manifest, pathname) {
  if (manifest[pathname] !== undefined) return manifest[pathname];
  if (!pathname.endsWith('/') && manifest[`${pathname}/`] !== undefined) {
    return manifest[`${pathname}/`];
  }
  return undefined;
}

// Guard against path traversal in (trusted, build-generated) asset paths.
function isSafeAssetPath(p) {
  return typeof p === 'string' && p.startsWith('/') && !p.includes('..');
}

// Merge `Vary: Accept` into a response without clobbering an existing Vary value.
function withVaryAccept(res) {
  const headers = new Headers(res.headers);
  const vary = headers.get('Vary') || '';
  const values = vary.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (!values.includes('accept')) {
    headers.set('Vary', vary ? `${vary}, Accept` : 'Accept');
  }
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  });
}

// Only HTML documents vary on Accept; static assets keep their own caching.
function isHtmlDocumentPath(pathname) {
  if (pathname === '/') return true;
  if (pathname.endsWith('/')) return true;
  if (pathname.endsWith('.html')) return true;
  return false;
}

export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const acceptHeader = request.headers.get('Accept') || '';

  if (prefersMarkdown(acceptHeader)) {
    const manifest = await getManifest(env, request);
    const asset = resolveAsset(manifest, pathname);

    if (isSafeAssetPath(asset)) {
      const mdRes = await env.ASSETS.fetch(new Request(new URL(asset, url)));
      if (mdRes.ok) {
        return new Response(await mdRes.text(), {
          headers: {
            'Content-Type': MD_CONTENT_TYPE,
            Vary: 'Accept',
            'Cache-Control': 'no-store',
          },
        });
      }
    }

    // Markdown requested but unavailable → safe fallback to the original response.
    // Only HTML documents get Vary: Accept; assets keep their own caching.
    const fallback = await env.ASSETS.fetch(request);
    return isHtmlDocumentPath(pathname) ? withVaryAccept(fallback) : fallback;
  }

  // Normal request: serve the static asset unchanged; add Vary only to HTML docs.
  const res = await env.ASSETS.fetch(request);
  return isHtmlDocumentPath(pathname) ? withVaryAccept(res) : res;
}
