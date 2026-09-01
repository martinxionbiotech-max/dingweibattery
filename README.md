# Dingwei Battery — Astro Website

Static Astro 5 website for **Dingwei Battery**, an OEM / private-label automotive battery brand. Manufacturing is attributed to **Chengguang Energy (founded 2002)**.

## Stack

- Astro 5 + TypeScript
- `@astrojs/sitemap`
- Static output for Cloudflare Pages (`site: https://dingweibattery.com`)

## Commands

```bash
npm install
npm run build      # outputs to dist/
npm run dev        # local development server
npm run preview    # preview the production build
```

## Content sources

- `src/data/site.ts` — brand, manufacturer, certifications, product lines, process and trade terms
- `src/data/battery-models-seed.json` — model data (read at build time via `getStaticPaths`)
- `FACTS.md` — verified facts (source of truth; do not add unverified facts)

## Key rules

- Never publish prices.
- CCA values render with `(reference)` and a “confirm with manufacturer” note.
- NULL model fields render as “Confirm on inquiry”, never as guesses.
- JSON-LD contains only real, visible content.
