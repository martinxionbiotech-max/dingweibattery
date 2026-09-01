You are adding 7 new knowledge pages to the existing Dingwei Battery Astro site in the current directory.

The site is already built (28 pages) and pushed. Your job: add 7 OEM-procurement knowledge pages, following the exact same pattern as the existing knowledge pages (see src/pages/knowledge/oem-battery-supplier-checklist/index.astro for the pattern).

READ CONTENT_PACK_2.md in the current directory — it contains the full content (title, description, articleTitle, lead, body sections, internal links) for all 7 pages.

IMPLEMENT:
1. Create src/pages/knowledge/<slug>/index.astro for each of the 7 pages, using ArticleLayout + CTASection (imported like the existing pages).
2. Use the site.ts data constants ({MANUFACTURER.name}, {CERTIFICATIONS}, {TRADE_TERMS}, {RELATIONSHIP}, etc.) wherever the content references company facts — do NOT hardcode facts that could drift.
3. Each page: title (SEO), description (meta), articleTitle (H1), lead paragraph, h2 sections with the content from CONTENT_PACK_2.md, internal links as specified, and RELATIONSHIP where appropriate.
4. Match the existing pages' tone and structure (concise, buyer-first, list-based).

HARD CONSTRAINTS:
- OEM procurement view only — NO battery technical/chemistry content.
- NO prices anywhere.
- Use only verified facts from site.ts (Chengguang Energy, founded 2002, IATF 16949, 18 lines, 40,000+/day, 70+ countries, MOQ 1×20ft 600-800 units, lead 30-45 days, 12-month warranty).
- Consistent entity relationship: "Dingwei Battery provides OEM and private-label battery programs manufactured by Chengguang Energy (founded 2002)."

VERIFY: run `npm run build` (should go from 28 to 35 pages). Report the page list + build result.

Work in the current directory. Do NOT push to GitHub. Do NOT modify existing pages or data files.
