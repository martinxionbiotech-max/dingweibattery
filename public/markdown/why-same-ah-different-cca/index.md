Knowledge · Engineering

# Why two batteries with the same Ah can have different CCA

Published by Dingwei Battery · Last reviewed 2026-09-13 · Sources: SAE J537, EN 50342, JIS D 5301, lead-acid battery engineering reference

Capacity and starting power are not the same thing, and they are controlled by different parts of the battery. That is why two batteries stamped with the same amp-hour rating can deliver very different cold cranking amps — and why quoting only Ah is an incomplete specification.

**Short answer:** Ah (amp-hours) measures total energy — how long the battery can supply current. CCA measures peak starting current — how much it can deliver for 30 seconds at a cold temperature. Ah is driven mostly by the amount of active material; CCA is driven by plate surface area and internal resistance. Because a design can increase one while leaving the other unchanged, two 60 Ah batteries can legitimately show 500 and 600 CCA.

## The two numbers measure different things

Ah is an _energy_ figure: a 60 Ah battery can in principle deliver 1 A for 60 hours, or 60 A for 1 hour. CCA is a _power_ figure: how many amps the battery can push for 30 seconds at a cold temperature before the voltage sags below the test cut-off.

Energy and power decouple in any storage system. A bucket can hold the same volume of water as a narrow pipe, but the pipe delivers it at a different rate. In a lead-acid battery, capacity lives mostly in the **mass of active material**, while starting power lives in the **exposed plate surface** and how easily current leaves the cell.

## What actually sets CCA, independent of Ah

| Design factor | How it raises CCA | Effect on Ah |
|---|---|---|
| **Plate surface area** | More, thinner plates expose more area to electrolyte → higher discharge current | Little direct change |
| **Internal resistance** | Lower resistance lets current leave faster with less voltage drop | Minimal |
| **Grid design & alloy** | More grid cross-section and lower-resistance alloy carry more current | Minimal |
| **Active material density** | Denser, more porous paste improves high-rate discharge | Raises Ah |
| **Separator** | Low-resistance separators reduce internal loss | Minimal |
| **Design intent** | Starting batteries optimise surface for CCA; deep-cycle optimises material for Ah | Trade-off |

## The starting-battery trade-off

This is the structural reason the two numbers diverge. A **starting battery** is built for a short, heavy discharge — many thin plates to maximise surface area for high CCA. A **deep-cycle battery** is built for long, moderate discharge — fewer, thicker plates to maximise active material for high Ah. You can hold Ah roughly constant and move CCA by changing plate count and thickness, which is why the two figures do not track one-to-one.

It is also why two batteries from different manufacturers, both stamped 60 Ah, can differ by a hundred CCA or more: they made different plate-design choices, not an error. See our [what is CCA](/knowledge/what-is-cca/) article for how the test standard (JIS −15°C vs EN/SAE −18°C) moves the number further.

## Why this matters for a specification

-   **Specify both** — Ah for how long, CCA for cold starting. One without the other is an incomplete spec.
-   **Match CCA to the engine** — use the vehicle/OEM requirement, not a higher number.
-   **State the test basis** — a JIS CCA and an EN CCA are not the same number for the same battery.
-   **Ask nominal vs batch-tested** — a catalogue CCA is a design target; the batch you receive varies within tolerance.

## The Author’s Take

**Position:** In my view, the most common battery-buying mistake is comparing batteries by Ah alone and assuming the CCA will follow — when in fact a designer can hold Ah constant and move CCA by hundreds of amps through plate construction alone.

**Reasoning:** Ah and CCA answer different questions and are set by different levers. A buyer who specifies only Ah is leaving the single most important starting parameter to chance. The correct spec names Ah _and_ CCA, with the test basis and whether the value is nominal or batch-tested, and matches CCA to the engine — not to a marketing number.

**Disclosure:** This is my editorial view as a battery manufacturer’s technical team, not a laboratory claim. Confirm the final Ah, CCA and test basis with the manufacturer.
