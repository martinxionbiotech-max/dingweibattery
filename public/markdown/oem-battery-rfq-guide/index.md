Knowledge · Sourcing

# OEM battery RFQ guide

Published by Dingwei Battery · Last reviewed 2026-09-10 · Source: Chengguang Power Tech Co., Ltd. technical documentation

A complete RFQ gets you comparable quotes; a vague one gets you a range so wide it is useless. The template below is four blocks and at least fifteen fields — and three of those fields are where almost every failed RFQ goes wrong.

**Short answer:** Most OEM battery RFQs fail on three missing fields — the CCA test basis, the annual volume, and one standard per line. A complete RFQ carries at least 15 fields across four blocks (specification, volume, branding, commercial), one model per line, so every supplier quotes the same scope and the prices become comparable.

## The specification block

-   Battery type (SLI, AGM, EFB, heavy-duty)
-   Standard family (JIS, DIN, BCI, AS, SA)
-   Reference model (e.g. 65D26)
-   Voltage, capacity (Ah), CCA — with the CCA test basis named
-   Case size, terminal type, polarity

## The volume block

-   Annual volume
-   First order quantity
-   Forecast by model if mixed
-   Target market (affects standard and certification)

## The branding block

-   Private label or OEM
-   Label artwork and packaging
-   Pallet configuration
-   Multi-language documentation

## The commercial block

-   Target price (optional — omit from the first RFQ)
-   Incoterms
-   Payment terms
-   Delivery schedule
-   Destination market and its certification set

[Send an OEM battery RFQ →](/contact/) · [Build a clean specification →](/knowledge/oem-battery-specification-guide/)

## The three missing fields that fail an RFQ

Every one of these turns a quote into a guess, and a guess into a range wide enough to be useless:

1.  **CCA test basis** — JIS (−15°C) and EN/SAE (−18°C) are different tests. Without the basis, two suppliers quote two different measurements and you compare them anyway.
2.  **Annual volume** — MOQ and tiered pricing depend on it. A missing volume makes every supplier assume its own worst case, and the tier you land in is a lottery.
3.  **One standard per line** — mixing JIS and DIN models in a single line forces the supplier to guess which case and which CCA method you mean. One model, one line, one scope.

## RFQ field checklist

A single missing field is usually what turns a quote into a guess. Work through this table before sending.

| Block | Field | Why it matters |
|---|---|---|
| Specification | Standard family + reference model | JIS, DIN and BCI cases are not interchangeable; the model anchors the case size. |
| Specification | CCA test basis | JIS (−15°C) and EN/SAE (−18°C) are different tests; without the basis, two quotes are not comparable. |
| Specification | Terminal type & polarity | Terminal layout decides whether the battery physically fits the vehicle. |
| Volume | Annual volume + first order | MOQ and tiered pricing depend on it; a missing volume makes the supplier assume the worst case. |
| Volume | Target market | The market decides the standard family and the certification set. |
| Branding | Label + packaging + documentation | Private-label scope changes tooling and lead time. |
| Commercial | Incoterms + payment | FOB, CFR and CIF move cost and risk differently between buyer and supplier. |

Do not put a price target in a first RFQ unless you want suppliers to quote to the number rather than the scope. Quote on scope first; negotiate price second.

## Compare quotes on scope, not price

When quotes come back, check six things before comparing the unit number:

-   **Same CCA basis** — JIS and EN numbers are not comparable.
-   **Same case reference** — a quote for a “similar” model is a different battery.
-   **Same MOQ tier** — a price at 10,000 units is not a price at 1,000 units.
-   **Tooling included** — is the mould or label cost in the unit price, or charged separately?
-   **Same Incoterm** — FOB, CFR and CIF are three different cost bases.
-   **Warranty scope** — a 12-month warranty with exclusions is not the same as a 12-month warranty.

## The quote-comparison table

Put every returned quote into one table before you rank anything. The rows are the six scope fields; the columns are the suppliers. A cell that is empty is a quote you cannot compare — go back and ask, rather than averaging around it.

| Scope field | Supplier A | Supplier B | Supplier C |
|---|---|---|---|
| Standard + case reference | JIS D26 | JIS D26 | “similar” |
| CCA basis | JIS −15°C | JIS −15°C | not stated |
| MOQ tier | 1 × 20ft | 1 × 20ft | 5,000 units |
| Tooling | Included | Charged separately | Included |
| Incoterm | FOB Tianjin | FOB Tianjin | CIF |
| Warranty | 12 mo, narrow exclusions | 12 mo, broad exclusions | 12 mo, not written |

In this example, Supplier C is uncomparable on three of six fields — the cheapest unit price there tells you nothing. Only Suppliers A and B are comparable, and between them the warranty scope is the deciding difference. This is the whole discipline: normalise the scope, then let price rank.

## Why most RFQs fail

-   The CCA basis is missing, so quotes arrive on different test methods.
-   Annual volume is missing, so MOQ and production assumptions vary.
-   Multiple standards are mixed in one line, so the supplier guesses instead of quoting one scope.

Compare returned quotes only after fixing those fields. Start with the [specification guide](/knowledge/oem-battery-specification-guide/) and keep one model per line item. Dingwei Battery provides OEM and private-label battery programs manufactured by Chengguang Power Tech Co., Ltd. (founded 2002).

The RFQ is stage five of the [sourcing guide](/knowledge/battery-sourcing-guide/) — run it after you have [verified](/knowledge/battery-supplier-verification/) and [audited](/knowledge/how-audit-battery-factory/) the candidates, so the shortlist you send it to is already credible.
