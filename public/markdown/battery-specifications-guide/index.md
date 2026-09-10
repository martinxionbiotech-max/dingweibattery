Knowledge · Engineering

# Automotive battery specifications: the complete reference

Published by Dingwei Battery · Last reviewed 2026-09-09 · Sources: SAE J537, EN 50342, JIS D 5301, BCI Battery Replacement Data Book

A battery specification is a list of five decisions — standard family, case size, electrical ratings, terminal layout and technology. Get any one of them wrong and a "correct" battery will not fit, will not start the engine, or will fail early. This reference walks through each decision in the order a specification is actually written, and ends with the two things most guides leave out: the mistakes that cost real money, and the seven-line cheat sheet you can paste into an RFQ.

**Short answer:** A complete automotive battery specification has five parts: the standard family (JIS / DIN-EN / BCI), the case group (D26, H6/LN3, Group 48), the capacity at the 20-hour rate (Ah, measured to 10.5 V at 26.7°C), the cold cranking amps with its test basis (JIS at −15°C vs SAE/EN at −18°C), and the terminal type and polarity. CCA and Ah measure different things and are not interchangeable, and neither is interchangeable across standards.

## The five-part specification in order

A specification is built in this order, because each decision constrains the next:

1.  **Standard family** — decided by the vehicle’s market (JIS for Japan/Asia, DIN/EN for Europe, BCI for North America).
2.  **Case size / group** — the physical footprint that must fit the tray and hold-down.
3.  **Electrical ratings** — capacity (Ah at C20) plus CCA on a named test basis.
4.  **Terminal type and polarity** — the connection that must match the vehicle’s cables.
5.  **Technology** — SLI, EFB or AGM, decided by the vehicle’s duty cycle.

Skip straight to electrical ratings without confirming the standard and case, and you can produce a battery that looks right on a datasheet and fits nothing. This is where most buyer-side comparisons go wrong.

## Part 1 — CCA: starting power, and why the number is test-dependent

Cold cranking amps (CCA) is the current a fully charged battery can deliver for 30 seconds at a defined cold temperature while holding a minimum voltage. Under the North American SAE J537 method that temperature is −18°C (0°F) and the voltage must stay at or above 7.2 V. That definition — 30 seconds, −18°C, 7.2 V — is the reference most of the world quotes, but it is not the only one.

Three things shift the printed number: the temperature, the cut-off voltage, and the test duration.

| Standard | Test temperature | Typical cut-off | Effect on the number |
|---|---|---|---|
| JIS D 5301 | −15°C | reference | Warmer test → higher number |
| SAE J537 | −18°C | 7.2 V | Baseline |
| EN 50342 | −18°C | 7.5 V (10 s) | Higher cut-off → higher number |
| DIN 43539 | −18°C | 9.0 V (30 s) | Higher cut-off → lower number |

The practical consequence: a JIS CCA and an EN CCA are not the same number for the same battery, and there is no universal percentage conversion. JIS tests warmer (−15°C), which pushes the number up; EN tests at −18°C but allows a higher cut-off voltage, which also shifts the result. The only safe comparison is within one standard. Read the full test-method breakdown in the [CCA guide](/knowledge/what-is-cca/).

The related ratings CA (cranking amps, 0°C / 32°F) and HCA (hot cranking amps, 27°C / 80°F) are always higher than CCA because they are measured warmer. A 250 CCA battery carries more cold-weather starting power than a 250 CA battery — the number is only meaningful with its temperature attached.

## Part 2 — Capacity: Ah, C20 and RC are three different questions

Capacity is quoted three ways, and mixing them is one of the most common sourcing errors:

| Metric | What it measures | Definition | Answers |
|---|---|---|---|
| Ah (C20) | Total stored charge | Current delivered over 20 hours to 10.5 V at 26.7°C | How much energy is stored? |
| C20 | The discharge rate for the Ah rating | 20-hour rate (Ah ÷ 20 = amps) | At what current is Ah rated? |
| RC | Runtime under load | Minutes at a fixed 25 A load to 10.5 V | How long if charging fails? |

A 60 Ah (C20) battery is rated to deliver 3 A for 20 hours (60 ÷ 20 = 3 A) before falling below 10.5 V. At a faster discharge the same battery delivers _less_ total energy — the capacity is not linear with rate. That is why a battery shows a higher Ah at C20 than at a fast rate like C5.

Reserve capacity (RC) answers a different question: how many minutes the battery can carry the vehicle’s electrical load if the alternator fails. It is a runtime-under-load metric, measured as minutes at a fixed 25 A draw down to 10.5 V. A higher Ah does not automatically mean a higher RC — the relationship is design-dependent. See the [capacity guide](/knowledge/battery-capacity-ah-vs-c20-vs-rc/) for the full treatment.

**Original calculation — energy content:** nominal stored energy = voltage × capacity. A 12 V, 60 Ah battery stores about 12 × 60 = 720 Wh. A single 6 V, 200 Ah heavy-duty cell stores 6 × 200 = 1,200 Wh, and a pair in series (12 V) stores 2,400 Wh. This is why capacity alone understates a battery’s value — you pay for energy, not for Ah in isolation.

## Why a warmer test produces a bigger number

The reason the temperature matters is electrochemistry, not marketing. A lead-acid battery’s internal resistance rises as temperature falls, so at −18°C the cell simply cannot push out as much current while holding voltage as it can at −15°C. Three degrees does not sound like much, but near the bottom of the electrolyte’s working range the difference is enough to shift the printed CCA by a visible margin.

This is the trap behind "JIS CCA looks higher". A battery labelled 600 CCA under JIS and 540 CCA under EN can be the same physical battery — the JIS number is not a better battery, it is a warmer test. The number looks attractive, but it is not directly comparable. The only correct move is to compare JIS with JIS and EN with EN, and to ask the supplier which basis the number refers to before it goes on a label.

## Part 3 — Standard families: JIS, DIN/EN, BCI, AS, SA

The standard family defines case dimensions, terminal layout and the CCA test method together. JIS, DIN, BCI, AS, SA are all in scope for Chengguang Power Tech, but a buyer must name the correct family — a "72 Ah battery" without a standard is not a complete specification.

| Family | Region | Typical case references | CCA test |
|---|---|---|---|
| JIS | Japan / Asia | B24, D23, D26, D31, N-series | −15°C |
| DIN / EN | Europe | H5–H8 (LN2–LN5), L3–L5 | −18°C |
| BCI | North America | Group 24, 27, 31, 34, 35, 47, 48, 49, 65, 94R | −18°C (SAE) |
| AS / SA | Australia / South America | Localised equivalents of the above | Varies by market |

Families overlap at the dimension level more than buyers expect: BCI Group 48 is the same 278 × 175 × 190 mm footprint as DIN/EN H6/LN3, and Group 47 matches H5/LN2 at 242 × 175 × 190 mm. A factory with one mould set can therefore serve several markets — provided the terminal layout and CCA basis are confirmed for each. The full cross-reference is in the [group size chart](/knowledge/battery-group-size-chart/) and the [standards comparison](/knowledge/jis-vs-din-vs-bci/).

## Who publishes the standards

Each family is published by a named body, and the primary document is where a buyer should go for the definitive test conditions:

-   [JSA (Japanese Standards Association)](https://www.jsa.or.jp/en/) — publishes JIS D 5301 for lead-acid starter batteries, including the −15°C cold-cranking test.
-   [CENELEC](https://www.cenelec.eu/) — publishes EN 50342 (Parts 1–4), covering test methods, dimensions and terminal marking for European starter batteries.
-   [DIN](https://www.din.de/en) — publishes the German national test standard for starter batteries, the source of the DIN CCA method.
-   [SAE International](https://www.sae.org/standards/content/j537_201608/) — publishes SAE J537, the North American CCA/CA reference (−18°C, 30 s, 7.2 V).
-   [Battery Council International (BCI)](https://batterycouncil.org/) — maintains the BCI Battery Replacement Data Book, the source of group-size dimensions.

These are the references a disciplined supplier quotes from. When a spec sheet cites "JIS D 5301" or "SAE J537" rather than just "CCA", that is a signal the value is tied to a test method — and a number you can actually verify.

## Part 4 — Case size and dimensions

Case size is shorthand for a fixed footprint. Within JIS it is a code like D26 (about 256 × 175 × 220 mm); within DIN/EN it is H6/LN3 or L3; within BCI it is a group number. A difference of a few millimetres in length or height stops a battery seating in the tray or clearing the hood.

Two batteries with the same case size can still differ in terminal position (L/R), so dimensions and terminals must always be confirmed together. The [dimensions guide](/knowledge/battery-dimensions-case-size/) explains how case size also drives packaging — a 20 ft container typically holds 600–800 units once pallets and stacking limits are accounted for, which is why the group number is as much a logistics decision as a fitment one.

## Part 5 — Terminals and polarity

Terminal type, position and polarity are fitment decisions, not afterthoughts. Markets use different post designs — the tapered top post (most cars), the side terminal (some North American applications) and stud/flag terminals (heavy-duty and marine). Manufacturers mark the positive side with an L or R suffix (a D23L vs a D23R). Reversing polarity on connection can damage the vehicle’s electrical system, and modern vehicles are negative-ground — the negative terminal connects to the chassis. See the [terminal and polarity guide](/knowledge/battery-terminal-types-polarity/).

## Part 6 — Voltage: 6 V, 12 V and series logic

A nominal 12 V battery is six series-connected 2 V cells; a 24 V heavy-truck system is twelve cells, often built as two 12 V batteries in series. The industry ran on 6 V until the mid-1950s, when higher-compression engines forced the change to 12 V. Voltage is a system decision — pairing two 6 V batteries in series gives 12 V, but wiring them in parallel keeps 6 V and doubles capacity. Choosing the wrong configuration is a common heavy-duty mistake. See the [6 V vs 12 V guide](/knowledge/battery-voltage-6v-vs-12v/).

## Part 7 — Technology: SLI, EFB, AGM

The battery’s technology is decided by the vehicle’s duty cycle, not by preference. A conventional SLI (starting, lighting, ignition) battery suits a standard passenger car; an EFB (enhanced flooded) battery adds cycling durability for basic start-stop; an AGM (absorbent glass mat) battery handles the frequent cycling of advanced start-stop and high electrical demand. Fitting an SLI battery where the vehicle cycles deeply will fail it early. The [application guide](/knowledge/battery-applications-by-vehicle/) maps each vehicle class to its technology.

## The specification decision tree

1.  **Which market is the vehicle from?** Japan/Asia → JIS; Europe → DIN/EN; North America → BCI.
2.  **What case group?** Read the OE battery label or measure the tray, then map to D26 / H6 / Group 48.
3.  **What capacity and CCA?** Confirm Ah at C20 and CCA with its test basis, not one number alone.
4.  **What terminal and polarity?** Top post, side terminal or stud, plus L/R position.
5.  **What technology?** SLI, EFB or AGM, matched to the duty cycle.

The terminal type and polarity on JIS / DIN / BCI / AS / SA reference models are marked "confirm on inquiry" rather than guessed. That is deliberate: a wrong terminal turns a correct battery into a wrong battery, and the manufacturer confirms it against your vehicle or fleet requirement before production.

## A worked example: three vehicles, three specifications

The difference between the standards stops being abstract once you write three real specifications side by side:

| Vehicle | Market | Standard | Case group | Ah (C20) | CCA (basis) | Technology |
|---|---|---|---|---|---|---|
| Toyota Hilux (pickup) | Japan / Asia | JIS | D26 | 72 | 490 (JIS −15°C) | SLI |
| VW Golf (start-stop) | Europe | DIN/EN | H6 / LN3 | 70 | 640 (EN −18°C) | EFB / AGM |
| Ford F-150 (pickup) | North America | BCI | Group 65 | 70 | 650 (SAE −18°C) | SLI / AGM |

All three are roughly 70–72 Ah starting batteries, yet no two are interchangeable. The Hilux battery is 256 × 175 × 220 mm; the Golf battery is 278 × 175 × 190 mm; the F-150 battery (Group 65) is about 306 × 190 × 192 mm. Three different boxes, three different CCA test bases, three different terminal layouts — and a buyer who orders "a 72 Ah battery" gets whichever one the supplier happens to quote. Naming the standard and the case group removes the ambiguity in one line.

The Hilux 80D26 example (72 Ah, 490 CCA JIS reference) is a Dingwei catalogue value; the Golf H6 and F-150 Group 65 figures are typical references from the standard families. Confirm the final values against the specific vehicle and model.

## Seven specification errors that cost money

These are the recurring mistakes seen in real RFQs — each one traces back to treating one part of the specification as the whole:

1.  **Quoting Ah without the standard** — "72 Ah" is three different batteries across JIS, DIN and BCI. Always pair the capacity with the family and case group.
2.  **Comparing CCA across standards** — a JIS CCA and an EN CCA are not the same number for the same battery. Compare within one standard only.
3.  **Ignoring terminal polarity until it is too late** — the battery fits the tray but the positive post is on the wrong side, and the cables will not reach. Confirm L/R before production.
4.  **Specifying capacity for a vehicle that cycles** — fitting an SLI battery to a start-stop vehicle means early failure. Match technology to the duty cycle, not just Ah to Ah.
5.  **Forgetting the 24 V system** — heavy trucks are not "bigger 12 V". They run 24 V, usually two 12 V batteries in series. Quoting one 12 V battery is half an order.
6.  **Using total height as case height** — a few millimetres of terminal height can stop the hood closing. Confirm height-to-case-top versus total height.
7.  **Treating CCA as a quality score** — beyond the OEM requirement, a higher CCA buys cost and plate surface you will not use. CCA is a fitment criterion, not a ranking.

The common thread: the specification is one decision with five parts, and the failure is almost always in the parts that are _not_ on the headline — the standard, the terminal, the polarity, the technology. That is why a disciplined supplier asks all five before quoting.

## Verifying a specification before you sign

Once the five parts are written, verify them in this order — the order that catches the most expensive mistakes first:

1.  **Physical fit** — hold the case dimensions against the tray, hold-down and hood clearance. This is the cheapest mistake to avoid and the most expensive to ship.
2.  **Terminal and polarity** — confirm the type (top post / side / stud), the L/R position and the ground convention against the actual vehicle.
3.  **Electrical ratings** — confirm Ah is at C20, confirm CCA is on a named test basis, and ask whether the values are nominal or batch-tested.
4.  **Technology** — confirm SLI, EFB or AGM against the vehicle’s duty cycle, not the buyer’s preference.
5.  **Voltage** — confirm 6 V, 12 V or 24 V, and whether the application wires batteries in series or parallel.

If any of the five cannot be confirmed, that part is a risk to carry — not a detail to skip. The specification is only as strong as its weakest confirmed part, and a supplier who confirms all five is doing the job; one who quotes on Ah alone is not.

## How the specification connects to price and lead time

The specification is not just a fitment exercise — it is the thing that drives cost and schedule. Three parts matter most commercially:

-   **Case group and mould** — a standard group (D26, H6, Group 48) runs on an existing mould with no tooling wait. An uncommon or custom case adds tooling cost and lead time, which is why most OEM programs start from a standard footprint.
-   **Capacity and CCA** — more lead and plate surface mean more material cost. A 60 Ah and a 90 Ah battery are not a 50% price difference — the cost scales roughly with lead content, but the engineering, terminals and case are largely fixed.
-   **Technology** — AGM costs more than EFB, which costs more than SLI, because of the separator and plate design. The step is for durability, not capacity, so it should be justified by the vehicle’s duty cycle.

The practical consequence: a specification that is fully confirmed before quoting — standard, case, Ah, CCA basis, terminal and technology — moves straight to sampling and production. A specification with one unconfirmed part loops back through questions and re-quotes, and that loop is where lead time is lost. Confirming the five parts upfront is the cheapest way to shorten the order-to-shipment time.

When the specification is settled, the next step is a clean RFQ — see the [RFQ guide](/knowledge/oem-battery-rfq-guide/) and the [OEM specification guide](/knowledge/oem-battery-specification-guide/) in the sourcing cluster.

## The specification cheat sheet

A single reference table to copy into your RFQ:

| Decision | What to write | Example |
|---|---|---|
| Standard family | JIS / DIN-EN / BCI / AS / SA | JIS |
| Case group | Code + footprint | D26 (256 × 175 × 220 mm) |
| Capacity | Ah at C20 | 72 Ah (C20) |
| CCA | Value + test basis | 490 A (JIS −15°C) |
| Terminal | Type + L/R position | Top post, R (positive right) |
| Voltage | System voltage | 12 V |
| Technology | SLI / EFB / AGM | SLI |

Send these seven lines and the supplier can quote the right battery on the first pass. Send only "72 Ah" and the conversation has to start over.

## How to use this reference

Dingwei Battery provides OEM and private-label battery programs manufactured by Chengguang Power Tech Co., Ltd. (founded 2002). The pages below each drill into one part of the specification. Use the pillar to decide the order of decisions, then follow the cluster links for the details:

-   [CCA: test methods and why the number differs](/knowledge/what-is-cca/)
-   [Capacity: Ah vs C20 vs RC](/knowledge/battery-capacity-ah-vs-c20-vs-rc/)
-   [JIS vs DIN vs BCI: the three families](/knowledge/jis-vs-din-vs-bci/)
-   [Dimensions and case size](/knowledge/battery-dimensions-case-size/)
-   [Terminal types and polarity](/knowledge/battery-terminal-types-polarity/)
-   [Battery group size chart (dataset)](/knowledge/battery-group-size-chart/)
-   [6 V vs 12 V systems](/knowledge/battery-voltage-6v-vs-12v/)
-   [Applications by vehicle type](/knowledge/battery-applications-by-vehicle/)

[Browse model specifications →](/data/) · [Compare two models →](/tools/compare/) · [Start an OEM specification →](/oem/car-batteries/)
