Knowledge · Engineering

# What is CCA (cold cranking amps)?

Published by Dingwei Battery · Last reviewed 2026-09-09 · Sources: SAE J537, EN 50342, JIS D 5301

CCA measures how much current a battery can deliver for 30 seconds at a cold temperature before dropping below a cut-off voltage. It is the number most buyers compare — and the number most often compared incorrectly, because the same physical battery carries a different CCA under each test standard.

**Short answer:** Cold cranking amps (CCA) is the current a fully charged battery can deliver for 30 seconds at a defined cold temperature while holding a minimum voltage. The SAE J537 reference is −18°C (0°F) with a 7.2 V floor. Because JIS tests at −15°C and EN/DIN use different cut-off voltages, a JIS CCA and an EN CCA are not the same number for the same battery — and there is no universal conversion.

## What CCA actually measures

CCA answers one question: will this battery start the engine in cold weather? A higher CCA means more current available to the starter motor at low temperature, where engine oil is thicker and cranking demand is highest.

It is a starting-power metric, not a capacity metric. A battery can have a high CCA and a modest amp-hour (Ah) capacity, or the reverse — the two measure different things. A cold-weather diesel needs CCA; a vehicle with heavy accessory loads needs Ah. Both belong in a specification.

## Why one battery has several CCA numbers

CCA is not a single universal test. Three variables separate the standards, and each one moves the printed number:

| Standard | Test temperature | Cut-off voltage | Effect on the number |
|---|---|---|---|
| JIS D 5301 | −15°C | reference | Warmer test → higher number |
| SAE J537 | −18°C | 7.2 V | Baseline (30 s) |
| EN 50342 | −18°C | 7.5 V (10 s) | Higher cut-off, shorter time → higher number |
| DIN 43539 | −18°C | 9.0 V (30 s) | Higher cut-off → lower number |

Because JIS tests at a warmer −15°C, the same battery shows a higher CCA under JIS than under EN/SAE. EN and DIN both test at −18°C but use different cut-off voltages, which pushes their numbers in opposite directions. The values are not interchangeable, and there is no universal percentage conversion.

Related ratings differ only by temperature: CA (cranking amps) and MCA (marine cranking amps) are measured at 0°C (32°F), and HCA (hot cranking amps) at 27°C (80°F). All are always higher than CCA because they are measured warmer. A 250 CCA battery carries more cold-weather starting power than a 250 CA battery — the number is meaningless without its temperature.

## The controversy: the label value vs the tested value

This is where many buyer-side comparisons go wrong. A CCA figure printed on a label is a _nominal_ rating, not necessarily a measurement of the batch you will receive. Three things routinely separate a datasheet CCA from a tested CCA:

-   **Test basis** — a JIS CCA of 600 looks better than an EN CCA of 540, but the two can describe the same battery tested at −15°C versus −18°C. The number looks attractive, but it is not directly comparable.
-   **Nominal vs batch-tested** — a catalogue value is the design target; a production batch varies within tolerance. A responsible supplier states which one it is quoting.
-   **Rounding and marketing** — CCA values are often rounded up to a round number for labelling. The underlying test result may sit below the printed figure.

On Dingwei reference pages, CCA is shown as a **(reference)** value with its test basis (for example "JIS (−15°C) reference"). Confirm the final CCA, its test basis and whether it is nominal or batch-tested with the manufacturer before using it in a product specification.

## How to compare CCA correctly

1.  **Confirm the test basis first** — JIS, EN, SAE or DIN. Ask the supplier which standard the number refers to.
2.  **Compare within one standard** — only compare JIS with JIS, EN with EN.
3.  **Match the cut-off voltage and duration** — a 10-second EN test and a 30-second SAE test are different measurements.
4.  **Ask nominal or tested** — is this the design target or a value measured on a production sample?
5.  **Treat the number as a reference** — the final CCA for a specific battery is confirmed by the manufacturer against its test procedure.

## A worked example: one battery, three numbers

The cleanest way to see the test-method problem is a single battery quoted under three standards. Take a mid-size 72 Ah European battery:

| Standard | Test condition | Printed CCA (reference) | Why it differs |
|---|---|---|---|
| JIS D 5301 | −15°C, 30 s | ~600 A | Warmer test |
| EN 50342 | −18°C, 10 s to 7.5 V | ~640 A | Colder, but higher cut-off and shorter time |
| SAE J537 | −18°C, 30 s to 7.2 V | ~560 A | Coldest plus lowest cut-off |

The values are illustrative, but the pattern is real: the same physical battery can legitimately wear a 600, a 640 or a 560 depending on which standard the supplier printed. None of the three is "wrong" — each is correct under its own method. A buyer who compares a JIS 600 against a competitor’s SAE 560 is comparing two different measurements and will draw a false conclusion about which battery is stronger.

## How CCA is actually measured

The test itself is simple in principle: fully charge the battery, cool it to the standard temperature, then discharge at a high constant current and watch the voltage. The CCA rating is the current at which the battery holds the cut-off voltage for the standard duration. In practice a CCA tester applies a short high-current pulse and infers the rating from the voltage response, rather than discharging the battery for a full 30 seconds — which is why a hand-held tester’s reading can differ from the laboratory value and from the printed label.

That gap between the label, the lab and the handheld tester is worth remembering when a value is disputed. The label is the nominal rating; the laboratory value is what the standard actually measures; a quick handheld test is an estimate. They are three different numbers for three different purposes.

## CCA is not a lifetime number

CCA is measured on a new, fully charged battery at a controlled temperature. As a battery ages, its plates sulphate and its CCA falls — a battery that started life at 600 CCA may deliver meaningfully less after a few years, especially if it has been deeply discharged or stored hot. This is why CCA is a specification at the point of sale, not a guarantee over the warranty period. Buyers who treat CCA as fixed through life misjudge both the product and the warranty risk.

## How much CCA does the vehicle actually need

The correct CCA is set by the vehicle, not by ambition. The OE specification is the reference point — the battery the manufacturer fitted was sized for that engine’s cranking load in its intended climate. Upsizing CCA has a real cost (more plate surface, more lead, more weight) and, past the point where the engine starts reliably, no benefit. Down-sizing below the OE value risks a slow crank on a cold morning and a shortened starter-motor life from repeated long cranks.

The disciplined approach is to match the OE value, then adjust only for a documented change in climate or electrical load — not to chase a bigger number on a label. When a buyer asks for "the highest CCA that fits", the honest answer is usually a question: what does the vehicle actually need, and which standard are you comparing?

## CCA vs Ah: do not confuse them

Ah (amp-hours) measures stored energy over time — how long the battery can supply current. CCA measures the peak current burst for starting. A vehicle with high electrical accessories needs Ah; a cold-weather diesel needs CCA. Most OEM specifications list both, and both must be confirmed. Read the difference in full in the [capacity guide](/knowledge/battery-capacity-ah-vs-c20-vs-rc/).

## How CCA fits the wider specification

CCA is one of five decisions in a complete specification — standard family, case size, capacity, CCA and terminals. See how it slots into the full picture in the [specifications reference](/knowledge/battery-specifications-guide/), and how it differs across the three standard families in [JIS vs DIN vs BCI](/knowledge/jis-vs-din-vs-bci/).

Dingwei Battery provides OEM and private-label battery programs manufactured by Chengguang Power Tech Co., Ltd. (founded 2002). Models across JIS, DIN, BCI, AS, SA are available with CCA values confirmed to the relevant test standard.

[Browse model CCA references →](/data/) · [Compare two models →](/tools/compare/)
