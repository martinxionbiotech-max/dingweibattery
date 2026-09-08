# AIO Architecture Decision — dingweibattery.com (V2.0)

## Site Overview
- **URL**: https://dingweibattery.com
- **Repo**: `martinxionbiotech-max/dingweibattery` (main) + `dingweibattery-docs` (empty)
- **Framework**: Astro 5.7, TypeScript, static output
- **Hosting**: Cloudflare Pages
- **i18n**: en/es/ar/ru, `prefixDefaultLocale: false`
- **Pages**: 222 static pages

## Architecture
- Static output, no SSR, no API routes, no backend, no runtime database.
- Data source of truth: `src/data/battery-models-seed.json` (23 models), read at build time.
- Schema.org: Organization, WebSite, Product, ItemList, FAQPage, BreadcrumbList, Brand, Dataset.
- robots.txt: AI-crawler-friendly + `ai-train=no` meta.

## Capability Graph
```
MAIN SITE (dingweibattery.com)
├── Content          — 21 knowledge articles × 4 locales
├── Product info     — 23 battery models × 4 locales
├── SEO pages        — home / factory / OEM / private-label / data / contact / terms / privacy
├── Knowledge Hub    — /knowledge/* (topical clusters: standards, specs, sourcing)
├── DATA             — battery-models-seed.json → battery-models.json (machine-readable)
├── TOOLS            — battery-finder + compare (client-side static widgets)
├── API              — (none)
├── AGENT            — (none)
└── AUTH             — (none)
Related surfaces: NONE (no api./docs./data./mcp. subdomains discovered)
```

## SEO Audit
- ✅ robots.txt valid + AI-crawler explicit allows
- ✅ sitemap-index.xml → sitemap-0.xml (240 URLs)
- ✅ canonical URLs set per page
- ✅ hreflang: en/es/ar/ru/x-default correct
- ✅ no accidental noindex/nofollow
- ⚠️ **Soft-404**: unknown paths return HTTP 200 + homepage HTML (Cloudflare Pages SPA fallback)

## AIO Audit
- ✅ Semantic HTML
- ✅ Schema.org (rich, valid)
- ✅ llms.txt (new)
- ✅ Dataset (new: battery-models.json + Dataset JSON-LD)
- ❌ Markdown negotiation (genuinely absent; DEFER)
- ❌ WebMCP (genuinely absent; NOT_REQUIRED)

## Agent Audit
- No API / MCP / A2A / OAuth / Agent — all correctly NOT_REQUIRED.

## Decision Matrix

| Capability | Exists | Value | Complexity | Decision | Reason |
|---|---|---:|---:|---|---|
| Semantic HTML | Yes | High | — | PRESENT | Clean static markup |
| Schema.org | Yes | High | — | PRESENT | Organization/Product/FAQPage/etc valid |
| llms.txt | Yes | Medium | Very Low | IMPLEMENTED | AI discovery index |
| Markdown content | Partial | Medium | Low | DEFER | HTML already clean; llms.txt covers discovery |
| Markdown negotiation | No | Low | Medium | DEFER | Cloudflare Free; no Worker justified |
| Dataset | Yes | High | Low | IMPLEMENTED | 23 structured models → JSON + Dataset schema |
| API | No | — | — | NOT_REQUIRED | No backend/API |
| OpenAPI | No | — | — | NOT_REQUIRED | No API |
| API Catalog | No | — | — | NOT_REQUIRED | No public API to advertise |
| Link Headers | No | — | — | NOT_REQUIRED | No machine resources to advertise (Rule A) |
| WebMCP | No | Low | Medium | NOT_REQUIRED | Static tools, no backend to expose |
| MCP Server | No | Low | High | NOT_REQUIRED | No server-side logic |
| MCP Server Card | No | — | — | NOT_REQUIRED | No MCP server |
| OAuth/OIDC | No | — | — | NOT_REQUIRED | No protected resources |
| A2A | No | — | — | NOT_REQUIRED | No genuine agent |
| Agent Card | No | — | — | NOT_REQUIRED | No A2A |

## Implemented
- `public/data/battery-models.json` — dataset (build-time, from seed)
- `src/pages/data/index.astro` — Dataset + DataDownload JSON-LD
- `public/llms.txt` — AI discovery index
- Factory data alignment (chengguangenergy.com): certs CE→OHSAS 18001, add annual capacity, remove employees/capital/legalRep

## Deferred
- Markdown negotiation — needs SSR/Worker or markdown build pipeline; low value for a site whose HTML is already clean and whose data is machine-readable via JSON + llms.txt.

## Not Implemented (intentional)
- API Catalog, Link Headers, OpenAPI, WebMCP, MCP, MCP Card, OAuth, A2A, Agent Card — no backend/agent; implementing would be fabrication (§2.3).

## Soft-404 (hosting config, not source)
Unknown paths → HTTP 200 + homepage. Fix belongs in Cloudflare Pages build config (custom `404.html`), not repo source. This masks 404s and creates false "PASS" on naive scanners (scanner reports "returned HTML instead of JSON" for every `/.well-known/*` path — that catch-all, not a real feature gap).

## External Validator (isitagentready.com /api/scan, level 1)
- PASS: robotsTxt, sitemap, robotsTxtAiRules
- FAIL (genuine): markdownNegotiation (→ DEFER), webMcp (→ NOT_REQUIRED), linkHeaders, dnsAid
- FAIL (false-positive, catch-all): apiCatalog, oauthDiscovery, oauthProtectedResource, authMd, mcpServerCard, a2aAgentCard, agentSkills, ard — all "returned HTML instead of JSON"
- neutral: commerce checks (x402/mpp/ucp/acp/ap2) — not a commerce site

## Future Opportunities
- P0: Fix soft-404 (Cloudflare Pages 404.html) so real 404 vs homepage fallback is distinguishable
- P1: Populate `dingweibattery-docs` as a Knowledge Hub (mirrors DINWEY/KB pattern)
- P2: Markdown negotiation via build-time `.md` output if AI crawl volume justifies it
- P3: WebMCP only if a client-side lookup tool gains external consumption value
