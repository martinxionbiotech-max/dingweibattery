Knowledge · Standards

# JIS vs DIN vs BCI battery standards

Published by Dingwei Battery · Last reviewed 2026-09-09 · Sources: JIS D 5301, EN 50342, BCI Battery Replacement Data Book

A battery’s "size" is defined by the standard family your market uses. JIS, DIN/EN and BCI batteries with similar electrical ratings are physically different — and mostly not interchangeable, despite sharing some footprints at the dimension level.

**Short answer:** JIS, DIN/EN and BCI batteries are not interchangeable even at similar Ah ratings — the case dimensions, terminal layout, naming rules and CCA test method all differ. The one important overlap: DIN H6/LN3 and BCI Group 48 are the same 278 × 175 × 190 mm box. Ordering the wrong family means the battery will not fit the tray, regardless of the spec sheet.

## The three families at a glance

| Standard | Region | Typical case reference | CCA test | Naming rule |
|---|---|---|---|---|
| JIS | Japan / Asia | D23, D26, D31, B24, N-series | −15°C | Performance grade + case code (55D23, 80D26) |
| DIN / EN | Europe | H5–H8 (LN2–LN5), L3–L5 | −18°C | Letter + length class (H6, L3) |
| BCI | North America | Group 24, 27, 31, 34, 47, 48, 49, 94R | −18°C (SAE) | Arbitrary group number |

## How the naming rules differ

The naming systems encode different information, which is itself a source of confusion:

-   **JIS** — the two-digit prefix is a _performance/capacity grade_, and the letter+number suffix is the _case size_. So 55D23 and 75D23 share the D23 case (same footprint) but differ in capacity and CCA; 65D23 and 65D26 share the grade but differ in case length.
-   **DIN/EN** — the H/LN code is a length class within a fixed 175 mm width and 190 mm height. H6 (LN3) and L3 are the same 278 mm box under old and new numbering. The code says nothing about capacity by itself.
-   **BCI** — the group number is arbitrary and maps to a fixed footprint plus terminal layout. It carries no performance information.

The practical consequence: quoting "72 Ah" is useless without the family, because a JIS 72 Ah battery, a DIN 72 Ah battery and a BCI 72 Ah battery are three different shapes. This is a real trap when a buyer copies an Ah rating from one market and applies it to another.

## Why they are not interchangeable

1.  **Case dimensions** — a JIS D26 (256 × 175 × 220 mm) and a DIN H6 (278 × 175 × 190 mm) may both be ~72 Ah, but one is longer and the other taller. They do not fit the same tray.
2.  **Terminal layout** — terminal type, position and polarity convention differ between markets. A battery that fits physically can still have the wrong terminals.
3.  **CCA test method** — JIS tests at −15°C, EN/SAE at −18°C, so the printed CCA is not directly comparable across families. See the [CCA guide](/knowledge/what-is-cca/).

## The overlap that saves moulds

Not everything is different. At the dimension level the families overlap more than most buyers assume:

| DIN/EN code | BCI group | Footprint (mm) |
|---|---|---|
| H5 / LN2 | 47 | 242 × 175 × 190 |
| H6 / LN3 / L3 | 48 | 278 × 175 × 190 |
| H7 / LN4 / L4 | 94R | 315 × 175 × 190 |
| H8 / LN5 / L5 | 49 | 354 × 175 × 190 |

One mould set can therefore serve Europe and North America, provided the terminal layout and CCA basis are confirmed for each destination. The full cross-reference, including JIS, is in the [group size chart](/knowledge/battery-group-size-chart/).

## Each family in detail

### JIS (Japan / Asia)

JIS D 5301 is the Japanese national standard for lead-acid starter batteries. It is the default across Japan, and through Japanese vehicle exports it spread across Southeast Asia, the Middle East, Africa and Australia. The case codes (B24, D23, D26, D31, plus the N-series for trucks) are the buying language of these markets, and the two-digit prefix (55, 65, 75, 80, 95, 105) is a performance grade. The CCA test runs at −15°C, warmer than the European and American methods — which is why JIS CCA numbers run higher for the same battery.

### DIN / EN (Europe)

EN 50342 is the harmonised European standard, descended from the older German DIN numbering. The modern case codes H5–H8 (equivalently LN2–LN5) describe batteries 175 mm wide and 190 mm tall, distinguished by length. The older L3–L5 codes describe the same lengths under the previous numbering. European vehicles increasingly use AGM and EFB for start-stop, so the EN family is where technology matters most, not just case size.

### BCI (North America)

The BCI group number is a North American convention for footprint plus terminal layout, maintained by Battery Council International in its Battery Replacement Data Book. The group number carries no performance information — Group 24 and Group 34 are both common car sizes with very different capacities available within them. The CCA is quoted to the SAE method (−18°C, 30 s, 7.2 V).

### AS and SA (Australia and regional markets)

Australia (AS) and a number of regional markets (SA) maintain their own standards or conventions that largely reuse JIS and BCI case dimensions with local terminal and labelling requirements. In practice a buyer exporting to these markets names the underlying JIS or BCI equivalent plus the local requirement, and the factory applies the regional standard to the same case. This is why a single product range can carry JIS / DIN / BCI / AS / SA together.

## Which standard for which export market

| Export destination | Dominant standard | Typical case codes |
|---|---|---|
| Japan, Southeast Asia, Middle East, Africa | JIS | D23, D26, D31, N-series |
| Europe, CIS | DIN / EN | H5–H8, L3–L5 |
| North America | BCI | Group 24, 34, 65, 48, 94R |
| Australia | AS (JIS-based) | D23, D26, D31 |
| Regional markets (SA convention) | JIS / BCI mix | Varies by country |

These are the dominant conventions, not universal rules — always confirm the specific market’s requirement with the buyer or importer before locking the standard into a specification.

## The interchangeability trap in practice

The cleanest example of the trap is a buyer who sees "72 Ah" in a European catalogue and asks for "the same thing" from a JIS supplier. The JIS equivalent in capacity is a D26 or D31 — but those are 220 mm tall and 175 mm wide, while the European H6 is 190 mm tall. The battery arrives, does not fit the tray, and the "same 72 Ah" turns out to have been two different boxes the whole time. The capacity matched; the standard did not. Confirming the standard and case group first would have caught it in one line.

## How one factory serves every standard

A common buyer concern is whether a single manufacturer can really deliver JIS, DIN/EN and BCI batteries to the same quality. The answer is yes, and the reason is that the families differ in case dimensions, terminals and test basis — not in the underlying electrochemistry. The plates, separators, electrolyte and assembly are the same; what changes per market is the mould, the terminal, the label and the test report. A factory that holds multiple mould sets and runs an IATF 16949 quality system can switch between standards on the same line.

What this means for the buyer: the standard is a choice you make, not a capability you must hunt for. The risk is not that a factory cannot make your standard — it is that the factory does not _know_ which standard you need. Naming the family and case group removes that ambiguity.

## How to choose the right standard

Choose by the vehicle’s market, not by the battery’s specs:

-   **Japanese or Asian vehicles** → specify JIS and pick the D/B case group.
-   **European vehicles** → specify DIN/EN and pick the H/LN/L case group.
-   **North American vehicles** → specify BCI and pick the Group number.

One factory can supply every major standard, but the buyer must name the correct family. A "72 Ah battery" without a standard is not a complete specification.

## What buyers should ask

-   Which standard family does my target vehicle use?
-   What is the exact case reference (D26, H6, Group 34)?
-   What terminal type and polarity does the vehicle need?
-   Is the CCA number JIS or EN/SAE?

See the full specification order in the [specifications reference](/knowledge/battery-specifications-guide/), and how CCA differs between standards in the [CCA guide](/knowledge/what-is-cca/). Browse models by standard in the [model database](/data/).

Dingwei Battery provides OEM and private-label battery programs manufactured by Chengguang Power Tech Co., Ltd. (founded 2002).

[Browse models by standard →](/data/) · [Build a clean specification →](/knowledge/oem-battery-specification-guide/)
