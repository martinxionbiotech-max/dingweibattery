# AIO Architecture Decision — dingweibattery.com

## Project

- **URL**: https://dingweibattery.com
- **Repo**: `martinxionbiotech-max/dingweibattery`
- **Framework**: Astro 5.7, TypeScript, static output
- **Deployment**: Cloudflare Pages
- **i18n**: 4 locales (en/es/ar/ru), `prefixDefaultLocale: false`

## Site classification

**Content Website + Knowledge Hub + Database (product spec) + static Tool pages.**

- 18 knowledge articles × 4 locales
- 24 battery model spec pages × 4 locales (`src/data/battery-models-seed.json`)
- 2 client-side tools (battery-finder, compare) that embed the full dataset inline

## Architecture

- **Static output**, no SSR, no API routes, no backend, no database at runtime
- Data source of truth: `src/data/battery-models-seed.json` (read at build time via `getStaticPaths`)
- Schema.org already present: Organization, Product, ItemList, FAQPage, BreadcrumbList, WebSite, Brand
- robots.txt already allows AI crawlers; `<meta name="ai-train" content="no">` set
- Security headers via `public/_headers`; redirects via `public/_redirects`

## Decision matrix

| Capability | Decision | Reason |
|---|---|---|
| Semantic HTML | PRESENT | Clean static markup |
| Schema.org | PRESENT | Product/Organization/FAQPage/Breadcrumb valid |
| Markdown Negotiation | RECOMMENDED → IMPLEMENTED | Content-heavy knowledge hub; low risk, build-time |
| Dataset | RECOMMENDED → IMPLEMENTED | 24 structured models already in JSON |
| llms.txt | RECOMMENDED → IMPLEMENTED | Site already AI-crawler-friendly; cheap, high value |
| API Catalog | NOT_REQUIRED | No public API exists |
| Link Headers | NOT_REQUIRED | Depends on API Catalog (Rule A); no machine resources to advertise |
| OpenAPI | NOT_REQUIRED | No backend/service API |
| WebMCP | DEFER | Finder/compare are client-side widgets, no backend to expose |
| MCP Server | NOT_REQUIRED | No backend/service layer |
| MCP Server Card | NOT_REQUIRED | No MCP server |
| OAuth/OIDC | NOT_REQUIRED | No protected resources |
| A2A | NOT_REQUIRED | No genuine agent |
| A2A Agent Card | NOT_REQUIRED | No A2A |

## Security / SEO / performance considerations

- All added layers are **build-time static files** — no SSR, no new dependencies, no client JS.
- Markdown is served as an additional representation; HTML remains the canonical/default.
- Dataset is derived from the existing seed JSON — no duplicating data source logic.
- No secrets, no internal endpoints exposed.

## Known issue (not fixed here — requires hosting config)

- Unknown paths return HTTP 200 with homepage HTML (Cloudflare Pages single-page-app 404 fallback),
  which masks 404s and can produce false PASS results in naive agent-readiness scanners.
  Fix belongs in Cloudflare Pages build config (`404.html`) / project deploy settings,
  not in this repo's source.
