Knowledge · Engineering

# Battery group size chart

Published by Dingwei Battery · Last reviewed 2026-09-09 · Sources: BCI Battery Replacement Data Book, EN 50342, JIS D 5301, Dingwei model database

"Group size" is the industry’s shorthand for a battery’s physical footprint. Three naming systems describe largely the same boxes — BCI group numbers in North America, JIS D/B codes in Japan/Asia, and DIN/EN H and L codes in Europe. This chart maps them to dimensions and vehicle types so a buyer can speak one factory’s language from any market.

**Short answer:** A battery group size is a fixed L × W × H footprint with a market-specific name. The same box is Group 48 in BCI, H6/LN3 in DIN/EN, at 278 × 175 × 190 mm; the smaller H5/LN2 (Group 47) is 242 × 175 × 190 mm; and the JIS D26 is 256 × 175 × 220 mm. Confirming the group is the first fitment check, before any electrical rating.

## The master cross-reference

| Footprint (L×W×H, mm) | BCI group | JIS code | DIN/EN code | Typical use |
|---|---|---|---|---|
| 238 × 129 × 220 | — | B24 | — | Asian compact, hybrid auxiliary |
| 230 × 175 × 220 | — | D23 | — | Mid-size sedan (JIS) |
| 256 × 175 × 220 | — | D26 | — | Pickup / SUV (JIS) |
| 305 × 175 × 220 | — | D31 | — | Heavy SUV / 4WD / light diesel |
| 242 × 175 × 190 | 47 | — | H5 / LN2 | European compact / start-stop |
| 278 × 175 × 190 | 48 | — | H6 / LN3 / L3 | European mid-size / start-stop |
| 315 × 175 × 190 | 94R | — | H7 / LN4 / L4 | European SUV / premium AGM |
| 354 × 175 × 190 | 49 | — | H8 / LN5 / L5 | European large / high load |
| 260 × 173 × 200 | 34 | — | — | North American car / SUV |
| 260 × 173 × 225 | 24 | — | — | North American car / light truck |
| 306 × 173 × 225 | 27 | — | — | North American truck / marine |
| 330 × 173 × 240 | 31 | — | — | Heavy-duty / RV / marine |
| 406–518 × 173–276 × 209–234 | — | N100–N200 | — | Truck / bus / commercial |

Dimensions are the standard nominal footprints; individual manufacturers may vary by a few millimetres. Confirm exact L × W × H and terminal position against the specific model before ordering. The [dimensions guide](/knowledge/battery-dimensions-case-size/) explains why a few millimetres matter.

## Reading the three naming systems

-   **JIS D/B codes** — the number after D or B relates to the case size: B24 is the narrow compact box (129 mm wide), D23 the short sedan box, D26 the standard pickup/SUV box, D31 the long 4WD/diesel box. The two-digit prefix (55D23, 65D26, 80D26, 105D31) is a performance/capacity grade, not a size.
-   **DIN/EN H and L codes** — H5–H8 (equivalently LN2–LN5) are the modern European boxes, 175 mm wide and 190 mm tall, distinguished by length (242→354 mm). L3–L5 are the older DIN numbering for the same lengths. H6/LN3 and L3 are the same 278 mm box.
-   **BCI group numbers** — arbitrary integers assigned by Battery Council International; the group maps to a fixed footprint and terminal layout. Group 48 and Group 94R are the most common European-vehicle footprints in North America.

The overlap is the useful part: H6/LN3/L3 = Group 48 at 278 mm; H7/LN4/L4 = Group 94R at 315 mm. One mould, several markets, three labels. See the [standards comparison](/knowledge/jis-vs-din-vs-bci/) for the terminal and test-method differences that still separate the families.

## Why the group number is also a logistics decision

Group size sets the packaging footprint, which sets how many units fit on a pallet and in a container. A 20 ft container typically carries 600–800 automotive batteries once pallets, cartons, separators and stacking limits are counted. For lead-acid the interesting point is that _weight is not the binding constraint at that count_ — 800 units at an average 15 kg is about 12,000 kg, well under a 20 ft container’s roughly 25,000 kg payload. Palletisation, carton dimensions and safe stacking height (batteries are heavy and acid-filled, so they are not stacked high) cap the count first. This is why MOQ is quoted per container, not per pallet.

**Original calculation — weight vs volume:** 800 units × ~15 kg average ≈ 12,000 kg ≈ 12 tonnes, against a 20 ft container payload of roughly 25 tonnes. So volume and stacking — not weight — are the binding constraints, which is the opposite of most lead-heavy thinking. The practical ceiling is packaging, not mass.

## More BCI groups worth knowing

Beyond the European-mapped groups, several North American groups appear constantly in replacement and export work:

| BCI group | Footprint (mm) | Footprint (in) | Typical use |
|---|---|---|---|
| 35 | 230 × 175 × 225 | 9.06 × 6.88 × 8.88 | Compact cars (Honda, Toyota NA) |
| 65 | 306 × 190 × 192 | 12.06 × 7.5 × 7.56 | Ford trucks / SUVs |
| 75 | 230 × 179 × 186 | 9.06 × 7.06 × 7.31 | GM compact / mid-size |
| 78 | 260 × 179 × 186 | 10.25 × 7.06 × 7.31 | GM trucks (side terminal) |
| 51 / 51R | 238 × 129 × 223 | 9.37 × 5.06 × 8.81 | Compact / hybrid auxiliary |

Dimensions are nominal from the BCI group chart; confirm the exact figure and terminal layout for the specific model.

## Heavy-duty N-series at a glance

The JIS N-series is the truck-and-bus case family, and it is worth reading separately because the numbers scale with vehicle size:

| Case | Footprint (mm) | Capacity (Ah) | CCA (reference) | Use |
|---|---|---|---|---|
| N100 | 406 × 173 × 209 | 100 | 740 (SAE) | Truck / bus / light commercial |
| N150 | 508 × 220 × 234 | 160 | 1050 (SAE) | Heavy truck / bus |
| N200 | 518 × 276 × 216 | 200 | 1100 (SAE) | Heavy truck / bus |

These are single 12 V units; a 24 V truck takes two in series. See the [6 V vs 12 V guide](/knowledge/battery-voltage-6v-vs-12v/) for the series logic.

## Vehicle-to-group examples

Mapping a few well-known vehicles to their group makes the chart concrete:

-   **Toyota Hilux / Fortuner (Asia)** — JIS D26 (80D26, ~72 Ah) or D31 for diesels.
-   **Toyota Camry / Honda Accord (Asia)** — JIS D23 (55D23/65D23, ~60 Ah).
-   **Small Asian compact / hybrid auxiliary** — JIS B24.
-   **VW Golf / Audi A3 (Europe)** — DIN H5/LN2 or H6/LN3, EFB or AGM.
-   **BMW / Mercedes (Europe)** — DIN H7/LN4 or H8/LN5, AGM.
-   **Ford F-150 (North America)** — BCI Group 65.
-   **Honda Civic / Toyota Corolla (North America)** — BCI Group 35 or 51R.

These are common OEM conventions and can vary by year, engine and trim — always confirm against the vehicle’s actual label or tray.

## Bigger group is not automatically bigger capacity

It is tempting to read the chart left-to-right and assume a larger footprint means more amp-hours, but the two are correlated, not identical. A Group 24 (260 mm) and a Group 34 (260 mm) share a length but differ in height, and each is offered in a range of Ah ratings. The group fixes the _shape_; the Ah rating fixes the _lead content within that shape_. This is why a buyer should quote both — the group for fit, and the Ah for performance — rather than assuming one implies the other.

## How to pick the right group

1.  Read the OE battery’s label or measure the tray (L × W × H, including hold-down and hood clearance).
2.  Map the footprint to the group number in the table above.
3.  Confirm terminal position (L/R) and type — two batteries in the same group can still differ here.
4.  Confirm electrical ratings (Ah at C20, CCA with its test basis) _after_ the physical fit is locked.

Dingwei Battery provides OEM and private-label battery programs manufactured by Chengguang Power Tech Co., Ltd. (founded 2002). Every model in the [model database](/data/) carries its case size and dimensions. Filter by case code to see the full range within each group.

[Browse models by group size →](/data/) · [Compare two models →](/tools/compare/) · [Confirm fitment →](/contact/)
