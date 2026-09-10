Knowledge · Engineering

# Battery dimensions and case size

Published by Dingwei Battery · Last reviewed 2026-09-09 · Sources: JIS D 5301, EN 50342, BCI Battery Replacement Data Book

The physical footprint of a battery — length, width and height — decides whether it fits the tray, the hold-down, and the hood clearance. Case size is the shorthand for that footprint, and it also decides how many units fit on a pallet and in a container.

**Short answer:** A battery that is a few millimetres too long or too tall will not fit the tray or close the hood — so dimensions decide fitment before anything else. Case size (D26 in JIS, H6 in DIN, Group 48 in BCI) is the shorthand for that fixed footprint, and it drives packaging: a 20 ft container holds roughly 600–800 units once pallets and stacking limits are counted.

## What dimensions mean

Length is the long edge, width the short edge, and height is measured to the top of the case (some standards add a "total height" including the terminal). A battery that is a few millimetres too long or too tall will not fit the tray or close the hood.

## Case size as shorthand

Rather than quoting three numbers, buyers use the case reference from the standard family:

| Standard | Case references | Example dimensions (L×W×H, mm) |
|---|---|---|
| JIS | B24, D23, D26, D31 | B24 ≈ 238 × 129 × 220; D23 ≈ 230 × 175 × 220; D26 ≈ 256 × 175 × 220; D31 ≈ 305 × 175 × 220 |
| DIN / EN | H5–H8 (LN2–LN5), L3–L5 | H6/LN3 ≈ 278 × 175 × 190; L4 ≈ 315 × 175 × 190 |
| BCI | Group 24, 27, 31, 34, 47, 48, 49, 94R | Group 48 ≈ 278 × 175 × 190; Group 34 ≈ 260 × 173 × 200 |

The example dimensions are typical references, not universal — always confirm the exact dimensions for the specific model. The full cross-reference is in the [group size chart](/knowledge/battery-group-size-chart/).

## Reading the JIS D/B family

The JIS letter+number codes describe a progression of case sizes, and the differences are worth knowing:

-   **B24** — the narrow compact box (129 mm wide), for small Asian cars and hybrid auxiliary batteries.
-   **D23** — the short sedan box (~230 mm long), for mid-size sedans.
-   **D26** — the standard pickup/SUV box (~256 mm long), the most common JIS automotive case.
-   **D31** — the long 4WD/diesel box (~305 mm long), for heavy SUVs and light commercial diesels.

Within one code, the two-digit prefix (55D23 vs 75D23) changes capacity and CCA, not the case — so a 55D23 and a 75D23 fit the same tray. That distinction is the useful part of the JIS system and trips up buyers who think the prefix changes the size. See the [standards comparison](/knowledge/jis-vs-din-vs-bci/).

## Why dimensions drive packaging and logistics

Case size sets the carton footprint, which sets the pallet and container count. Because batteries are heavy and acid-filled, they are not stacked high — safe stacking height, carton dimensions and separator material cap the number of units on a pallet. The result: a 20 ft container typically carries 600–800 automotive batteries.

**Original calculation — weight is not the binding constraint:** 800 units × ~15 kg average ≈ 12,000 kg, against a 20 ft container payload of roughly 25 tonnes. So packaging and stacking — not weight — cap the count, which is why MOQ is quoted per container and why case size is as much a logistics decision as a fitment one.

## How to measure a tray correctly

When the vehicle’s OE spec is unknown, the tray is the source of truth. Measure three things and one more:

1.  **Length** — the long axis of the tray, inside edge to inside edge.
2.  **Width** — the short axis, including any hold-down clamp that intrudes.
3.  **Case height** — from the tray floor to the underside of the hood or bracket when closed. This is the dimension that is most often missed.
4.  **Terminal clearance** — the extra room above the case top that the posts and cable clamps occupy. Total height (case + terminals) must clear the hood, not just the case.

A common error is measuring to the case top and forgetting the posts. A battery whose case fits but whose positive post touches the hood is a short circuit waiting to happen — the exact failure a "total height" figure is meant to prevent.

## Hold-down style matters too

Beyond the three dimensions, the hold-down — the bracket that keeps the battery from moving — must engage the case correctly. BCI group sizes historically pair with hold-down styles (a clamp over the top, a lip at the base, or a side wedge). A battery that fits the tray but cannot be secured will vibrate, and vibration is one of the fastest ways to kill a starting battery. Confirm the hold-down style with the case size, not after it.

## Metric and imperial: read both, trust the millimetres

BCI dimensions are published in inches (Group 24 is 10.25 × 6.8125 × 8.875 in), while JIS and DIN/EN are published in millimetres. The inch fractions round awkwardly — 6.8125 in is 173 mm, 8.875 in is 225 mm — and rounding either direction introduces a millimetre or two of error. When in doubt, work from the millimetre figure: a 173 mm width is unambiguous, where "6 13/16 in" invites a rounding mistake at the tray.

## Case size and the capacity it can carry

A case size is not just a shape — it is a physical limit on how much lead fits inside. A narrow B24 box (129 mm wide) can only hold a 48–50 Ah pack, where a D31 (305 mm long) reaches 96 Ah and beyond. This is why the group number and the Ah rating move together: you cannot put a 90 Ah battery in a 50 Ah case, and you should not put a 50 Ah battery in a 90 Ah tray and call it OEM-equivalent. When a buyer asks for a higher Ah than the case supports, the honest answer is that it needs a bigger group — which means a different tray fit.

## Why case size and terminal must be confirmed together

Two batteries with the same case size can still differ in terminal position (L/R) and terminal type. Fitment is confirmed by matching the case dimensions _and_ the terminal layout to the vehicle. See the [terminal and polarity guide](/knowledge/battery-terminal-types-polarity/).

## What buyers should ask

-   What are the exact dimensions (L × W × H) for this model?
-   Is the height to the case top, or the total height including terminals?
-   Does this case size match the tray and hold-down of my target vehicle?
-   Is the terminal position (L/R) compatible?

See how dimensions fit the wider specification in the [specifications reference](/knowledge/battery-specifications-guide/), and filter models by case size in the [model database](/data/).

Dingwei Battery provides OEM and private-label battery programs manufactured by Chengguang Power Tech Co., Ltd. (founded 2002).

[Browse models with dimensions →](/data/) · [Confirm fitment →](/contact/)
