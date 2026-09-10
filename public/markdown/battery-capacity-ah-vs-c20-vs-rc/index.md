Knowledge · Engineering

# Battery capacity: Ah vs C20 vs RC

Published by Dingwei Battery · Last reviewed 2026-09-09 · Sources: SAE J537, EN 50342

Three numbers describe a battery’s capacity, and they measure different things. Mixing them up is one of the most common sourcing mistakes — a buyer who quotes "60 Ah" without the discharge rate, or "high RC" without asking the Ah, is comparing numbers that answer different questions.

**Short answer:** Ah, C20 and RC answer different questions and are not interchangeable. Ah is total stored charge, C20 is the 20-hour discharge rate that Ah is measured at (to 10.5 V at 26.7°C), and RC is runtime in minutes under a fixed 25 A load. The useful derived figure is watt-hours: 12 V × 60 Ah = 720 Wh.

## Ah: total stored charge

Amp-hours is the total charge a battery can deliver over a discharge. A 60 Ah battery can, in principle, supply 1 amp for 60 hours, or 6 amps for 10 hours — within the limits of the rated discharge rate.

The key point: Ah is only meaningful when tied to a discharge rate. A battery rated "60 Ah" without a rate is incomplete, because capacity is not linear with discharge current.

## C20: the 20-hour rate

C20 (or the 20-hour rate) is the standard discharge rate for most automotive batteries: the current that fully discharges the battery over 20 hours, down to a 10.5 V end voltage at a reference temperature of 26.7°C (80°F). A 60 Ah (C20) battery is rated to deliver 3 amps for 20 hours — that is 60 Ah ÷ 20 hours = 3 A.

Discharging faster reduces the effective capacity (a battery delivers less total energy at a high discharge rate). This is why the same battery shows a higher Ah at C20 than at a fast rate like C5. When a spec sheet lists a single Ah figure, it is almost always the C20 value — and it should say so.

## RC: reserve capacity

Reserve capacity measures the minutes a fully charged battery can deliver a fixed 25-amp load before dropping below 10.5 V. It answers a different question: how long can the battery run the vehicle’s electrical load if the charging system fails.

RC is more useful than Ah for vehicles with heavy accessory loads — it is a runtime-under-load metric, not a total-energy metric. A high Ah does not automatically mean a high RC; the relationship depends on plate design and internal resistance.

## How they relate — and how they don’t

| Metric | Measures | Unit | Answers |
|---|---|---|---|
| Ah | Total stored charge | amp-hours | How much energy is stored? |
| C20 | Discharge rate for the Ah rating | 20-hour rate | At what rate is Ah measured? |
| RC | Runtime under a fixed load | minutes | How long under load if charging fails? |
| Wh | Stored energy | watt-hours | How much energy, in absolute terms? |

**Original calculation — Ah × V = Wh:** nominal stored energy = voltage × capacity. A 12 V, 60 Ah battery stores 12 × 60 = 720 Wh. This is why comparing Ah across different voltages is misleading — a 6 V, 200 Ah battery (1,200 Wh) stores more energy than a 12 V, 60 Ah battery (720 Wh), even though 60 sounds larger than nothing. Always convert to watt-hours before comparing batteries of different voltages.

## RC and CCA: two different "power" numbers

RC and CCA are often quoted side by side, but they measure opposite ends of the battery’s behaviour. CCA is the peak current burst for cold starting (30 seconds at −18°C); RC is a sustained 25 A draw in minutes at ambient temperature. There is no fixed conversion between them — a battery engineered for high CCA (thin, high-surface-area plates) is not automatically optimised for long RC, and vice versa. The two are independent design choices, which is why a complete specification lists both. See the [CCA guide](/knowledge/what-is-cca/) for the starting-power side.

## Why faster discharge means less capacity

The reason capacity falls at higher discharge rates is a real battery effect, not a quirk of the label. At a high current, the electrolyte inside the plates cannot replenish fast enough, and the usable plate surface drops — so the battery delivers fewer total amp-hours before hitting the cut-off. This behaviour is described by a relationship called Peukert’s law, which quantifies how much faster a battery’s effective capacity shrinks as you draw more current.

For a buyer the practical version is simpler: a battery quoted at C20 will deliver noticeably less at a C5 or C1 rate. This is why a "60 Ah" battery running a heavy accessory load does not last 60 hours at 1 A in real conditions, and why the discharge rate must be part of any capacity claim. A supplier who quotes Ah without the rate is leaving the most important variable out.

## Worked example: what 60 Ah means in runtime

| Load | Math | Nominal runtime |
|---|---|---|
| 3 A (the C20 current) | 60 Ah ÷ 3 A | 20 hours (the rating) |
| 6 A | 60 Ah ÷ 6 A | ~10 hours nominal, less in practice |
| 25 A (the RC load) | RC minutes ÷ 60 | Minutes, not hours — see RC below |

The table shows the trap: the 60 Ah figure makes a 6 A draw sound like 10 hours, but at that doubled rate the battery delivers less than the nominal 60 Ah, so real runtime is shorter. Ah is a _rating at a specified rate_, not a bank of hours you can divide up however you like.

## How capacity is rated

A capacity test is straightforward in principle: fully charge the battery, discharge at the specified current (Ah ÷ 20 for C20) at the reference temperature, and time how long the voltage stays above the end voltage — 10.5 V for a 12 V battery, at 26.7°C (80°F) for the standard automotive rate. The rating is the current times the time. A battery that delivers 3 A for 20 hours is a 60 Ah battery; one that delivers 3 A for 18 hours is 54 Ah, even if its label says 60.

This is why capacity is one of the numbers a supplier verifies with a test report rather than asserts on a label — and why a buyer comparing two "60 Ah" batteries should ask what rate, what temperature and whether the value is nominal or tested.

## Choosing capacity for the application

Capacity is not "more is better" — it is a fit to the vehicle’s electrical load. A compact city car with few accessories is served by 40–50 Ah; a mid-size sedan with climate and infotainment by 60–70 Ah; a light commercial vehicle with a power tailgate and refrigeration by 80–100 Ah. Over-specifying means paying for lead you will never discharge and carrying weight the vehicle was not designed around. The right capacity is the one that matches the OEM value, not the biggest number that fits.

## Which number to specify first

When writing a specification, the order matters because each number constrains the next. Confirm the capacity (Ah at C20) first — it sets the battery’s size class and weight. Then confirm CCA on its test basis for the engine’s cranking demand. Then confirm RC if the vehicle has heavy accessory load or the application needs runtime on battery alone. Asking for all three at once, with their units and rates, is what separates a complete specification from a vague request.

The reason capacity leads is practical: Ah is the number the battery industry uses to define a product, and CCA and RC are both optimised _within_ that capacity class. A 60 Ah battery has a CCA and an RC band it can realistically achieve; asking for 90 Ah performance from a 60 Ah case is asking the impossible. Capacity first, then the two power numbers on top of it.

## What buyers should ask

-   Is the Ah rating at C20, or another rate?
-   What reserve capacity (RC) does the battery carry?
-   Which value matters more for my application — runtime (RC) or total energy (Ah)?
-   What is the battery voltage, so I can convert to watt-hours and compare fairly?

Capacity is one of five decisions in a full specification — see where it sits in the [specifications reference](/knowledge/battery-specifications-guide/), and how case size scales with capacity in the [dimensions guide](/knowledge/battery-dimensions-case-size/).

Dingwei Battery provides OEM and private-label battery programs manufactured by Chengguang Power Tech Co., Ltd. (founded 2002).

[Browse model capacity references →](/data/)
