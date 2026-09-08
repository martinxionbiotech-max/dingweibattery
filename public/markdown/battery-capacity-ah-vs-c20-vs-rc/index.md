Knowledge · Engineering

# Battery capacity: Ah vs C20 vs RC

Published by Dingwei Battery · Last reviewed 2026-09-03 · Source: battery test standards

Three numbers describe a battery’s capacity, and they measure different things. Mixing them up is one of the most common sourcing mistakes.

**Short answer:** Ah, C20 and RC answer different questions and are not interchangeable — mixing them up is one of the most common sourcing mistakes. Ah is total stored charge, C20 is the 20-hour discharge rate that Ah is measured at, and RC is runtime in minutes under a fixed load.

## Ah: total stored charge

Amp-hours is the total charge a battery can deliver over a discharge. A 60 Ah battery can, in principle, supply 1 amp for 60 hours, or 6 amps for 10 hours — within the limits of the rated discharge rate.

The key point: Ah is only meaningful when tied to a discharge rate. A battery rated “60 Ah” without a rate is incomplete.

## C20: the 20-hour rate

C20 (or the 20-hour rate) is the standard discharge rate for most automotive batteries: the current that fully discharges the battery over 20 hours. A 60 Ah (C20) battery is rated to deliver 3 amps for 20 hours.

Discharging faster reduces the effective capacity (a battery delivers less total energy at a high discharge rate). This is why the same battery shows a higher Ah at C20 than at a fast rate like C5.

## RC: reserve capacity

Reserve capacity measures minutes a fully charged battery can deliver a fixed 25-amp load before dropping below 10.5 V. It answers a different question: how long can the battery run the vehicle’s electrical load if the charging system fails.

RC is more useful than Ah for vehicles with heavy accessory loads — it is a runtime-under-load metric, not a total-energy metric.

## How they relate — and how they don’t

| Metric | Measures | Unit | Answers |
|---|---|---|---|
| Ah | Total stored charge | amp-hours | How much energy is stored? |
| C20 | Discharge rate for the Ah rating | 20-hour rate | At what rate is Ah measured? |
| RC | Runtime under a fixed load | minutes | How long under load if charging fails? |

A higher Ah does not automatically mean a higher RC — the relationship depends on battery design. Confirm each value separately for your specification.

## What buyers should ask

-   Is the Ah rating at C20, or another rate?
-   What reserve capacity (RC) does the battery carry?
-   Which value matters more for my application — runtime (RC) or total energy (Ah)?

Use this together with the [CCA guide](/knowledge/what-is-cca/) — CCA is starting power, Ah/RC is capacity, and both belong in an [OEM specification](/knowledge/oem-battery-specification-guide/).

Dingwei Battery provides OEM and private-label battery programs manufactured by Chengguang Power Tech Co., Ltd. (founded 2002).

[Browse model capacity references →](/data/)
