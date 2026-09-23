#!/usr/bin/env node
/**
 * P1 — Claim Ledger §6/§28 field reconciliation (batch 4, wrap-up).
 *
 * Derives the missing §6 claim-ledger fields from existing published data only
 * (zero fabrication) and writes them into BOTH:
 *   1. src/data/battery-models-seed.json   (single source of truth, drives the build)
 *   2. public/data/battery-models.json     (published reference dataset)
 *
 * §6 field list vs current data:
 *   entity            → model                          (already present)
 *   value / unit      → voltage/capacity_ah/c20_ah/cca.value/dimensions_mm/weight_kg
 *                                                        (already present as spec fields)
 *   source            → source                          (already present)
 *   confidence        → confidence (+ cca.confidence)   (already present)
 *   verified_date     → last_verified                   (present, now aliased explicitly)
 *   ---- MISSING, added here (values derived from existing data) ----
 *   claim_id          → "BAT-{model}" stable ledger ID
 *   source_type       → derived from source string
 *   verification_status → §28 LEVEL 1..5 (derived from source_type)
 *   first_published   → PUBLISHED_DATE (site reference-database publish date)
 *   last_verified     → verified_date
 *   reviewer          → null (no reviewer published; do not invent one — §29)
 *   evidence_url      → null (no evidence URL in existing data; do not fabricate)
 *   notes             → null (kept empty; CCA note lives in cca.note)
 *
 * §28 evidence hierarchy mapping:
 *   LEVEL 1  DINWEY/Chengguang first-party documentation  → 报价单 (manufacturer quotation)
 *   LEVEL 2  Official standards / government / institutional → "standard reference"
 *   LEVEL 3  Credible industry sources → datasheet / size chart / cross-ref / industry reference
 *   LEVEL 4  Independent fitment/reference sources → "fitment refs"
 *   LEVEL 5  Unverified / community information → (none currently)
 */
import { readFileSync, writeFileSync } from 'node:fs';

const PUBLISHED_DATE = '2026-09-01'; // mirrors PUBLISHED_DATE in src/data/site.ts

const SEED = 'src/data/battery-models-seed.json';
const PUBLIC = 'public/data/battery-models.json';

/** source string → source_type (order matters: first match wins) */
export function sourceTypeOf(source) {
  const s = (source || '').toLowerCase();
  if (s.includes('报价单')) return 'manufacturer_specification';
  if (s.includes('fitment')) return 'fitment_reference';
  if (s.includes('standard reference')) return 'official_standard';
  if (/datasheet|size chart|chart|cross-manufacturer|cross-ref|industry reference|batteryequivalents|batterysharks|batterystuff/.test(s))
    return 'industry_reference';
  return 'unverified';
}

export const VERIFICATION_LEVEL = {
  manufacturer_specification: 'LEVEL 1',
  official_standard: 'LEVEL 2',
  industry_reference: 'LEVEL 3',
  fitment_reference: 'LEVEL 4',
  unverified: 'LEVEL 5',
};

function enrichModel(m) {
  const source_type = sourceTypeOf(m.source);
  return {
    ...m,
    claim_id: `BAT-${m.model}`,
    source_type,
    verification_status: VERIFICATION_LEVEL[source_type],
    first_published: PUBLISHED_DATE,
    last_verified: m.verified_date,
    reviewer: null,
    evidence_url: null,
    notes: null,
  };
}

// --- seed ---
const seed = JSON.parse(readFileSync(SEED, 'utf8'));
const enriched = seed.map(enrichModel);
writeFileSync(SEED, JSON.stringify(enriched, null, 2) + '\n', 'utf8');

// --- public dataset (flattened schema; preserve existing fields, add new ones) ---
// NOTE: derive source_type/verification_status from the PUBLIC file's OWN source
// string. The seed and public JSON already diverge for a few models (65D23, 55D23,
// H7 — public carries a newer cross-manufacturer source). Deriving per-file keeps
// each file internally consistent; we do not rewrite either file's source string.
const pub = JSON.parse(readFileSync(PUBLIC, 'utf8'));
let added = 0;
for (const pm of pub.models) {
  const ownType = sourceTypeOf(pm.source);
  pm.claim_id = `BAT-${pm.model}`;
  pm.source_type = ownType;
  pm.verification_status = VERIFICATION_LEVEL[ownType];
  pm.first_published = PUBLISHED_DATE;
  pm.last_verified = pm.verified_date;
  pm.reviewer = null;
  pm.evidence_url = null;
  pm.notes = null;
  added++;
}
writeFileSync(PUBLIC, JSON.stringify(pub, null, 2) + '\n', 'utf8');

// --- summary ---
const count = {};
for (const m of enriched) count[m.verification_status] = (count[m.verification_status] || 0) + 1;
console.log('Enriched models:', enriched.length, '| public rows updated:', added);
console.log('verification_status distribution:');
for (const [k, v] of Object.entries(count)) console.log(`  ${k}: ${v}`);
console.log('WROTE:', SEED, '+', PUBLIC);
