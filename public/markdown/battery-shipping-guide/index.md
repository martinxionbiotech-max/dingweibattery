Knowledge · Logistics

# Battery shipping, compliance and warranty: the complete guide

Published by Dingwei Battery · Last reviewed 2026-09-10 · Sources: IMO IMDG Code, UN Model Regulations, US DOT PHMSA, Battery University

A battery order is not complete when it leaves the line — it is complete when it arrives undamaged, with the right documents, under a warranty you understand. That means three disciplines at once: dangerous-goods classification, export documentation and warranty terms. Get any one wrong and the container either stalls at the port or costs you money after delivery. This guide covers all three in one place, plus storage, because a battery that sits too long in your warehouse is a warranty claim waiting to happen.

**Short answer:** Lead-acid batteries ship as Class 8 corrosive dangerous goods — UN 2794 (wet, filled with acid) or UN 2800 (non-spillable) — under the IMDG Code for sea freight, and unlike lithium they need no UN 38.3 report. A 20ft container is weight-limited to about 28,000 kg, which is why a first order is 600–800 units. Export needs at least five documents, warranty is only as strong as its written scope, and storage demands a top-up charge every 6 months because batteries self-discharge at 3–5% per month.

## Dangerous-goods classification, in one paragraph

Lead-acid batteries are not "general cargo." They are Class 8 corrosive dangerous goods because the electrolyte is sulfuric acid. The two relevant UN numbers are **UN 2794 — Batteries, wet, filled with acid** (a standard flooded car battery) and **UN 2800 — Batteries, wet, non-spillable** (a sealed design that passes vibration and pressure-differential tests). Sea freight is governed by the \[IMO IMDG Code\](https://www.imo.org/); the UN numbers themselves come from the \[UN Model Regulations\](https://unece.org/transport/dangerous-goods), which feed every national rule set. The full classification logic, the UN 2800 test requirements, and the comparison with lithium's UN 3480/UN 3481 (Class 9) are in the [dangerous-goods classification](/knowledge/lead-acid-battery-dangerous-goods/) page.

## The container: weight before volume

Batteries are dense, so the loading math works backwards from what people expect. A standard 20ft container offers about 33 m³ of volume but only about 28,000 kg of payload (tare weight is roughly 2,200–2,400 kg against a 30,480 kg gross maximum). Lead-acid batteries hit the weight ceiling long before they fill the volume — which is exactly why a first order lands at 600–800 units rather than the 1,400+ a naive volume calculation would suggest. Single pallets are typically kept to 1.5 m height and about 1.5 tonnes for safe stacking. The [MOQ and lead time](/knowledge/oem-battery-moq-lead-time/) page explains how this weight logic sets the minimum order.

## Export documentation: the five-document baseline

A clean document set is what keeps a battery container moving through customs instead of sitting in a bond. The baseline set is five documents, and the dangerous-goods declaration is the one amateurs miss:

1.  **Commercial invoice** — value, terms, buyer and seller.
2.  **Packing list** — carton counts, weights, dimensions per pallet.
3.  **Bill of lading** — the carrier's receipt and contract of carriage.
4.  **Certificate of origin** — needed for preferential duty or for importers whose customs demands it.
5.  **Dangerous-goods declaration (DGD)** — the shipper's statement of the UN number, class and packing, signed by a trained person.

On top of the baseline, most destinations add a CCA/capacity test report, an MSDS, and — for Gulf states — SASO/GSO conformity. The [export documentation](/knowledge/battery-export-documentation/) page walks each document and what it proves.

## Warranty: read the scope, not the number

The factory's standard term is 12 months from bill of lading date. But "12 months" is a headline, not a contract. A warranty is only as strong as three written things: the **duration** (from bill of lading date), the **exclusions** (deep discharge, misuse, physical damage, poor charging), and the **claim handling** (how a failure is filed, inspected and settled — full replacement or pro-rata credit). A 12-month warranty with broad exclusions and pro-rata settlement is a very different product from a 12-month full-replacement warranty. The [warranty claim process](/knowledge/battery-warranty-claim-process/) page details how claims are judged and settled, and the [shipping and warranty](/knowledge/battery-shipping-warranty/) page covers the packaging side of protecting that warranty.

## Storage and shelf life: the warranty you lose silently

A battery left on the shelf is not static — it is discharging. Lead-acid self-discharges at roughly 3–5% per month at moderate temperature, and the rate roughly doubles for every 10°C rise (see \[Battery University's self-discharge data\](https://batteryuniversity.com/article/bu-802b-what-does-elevated-self-discharge-do)). Below about 50% charge, sulfation begins to harden on the plates and the capacity loss can become permanent. The practical rule: top up stored batteries every 6 months, store them cool and fully charged, and rotate stock first-in-first-out so no pallet ages past its warranty clock before it sells. The [storage and shelf life](/knowledge/battery-storage-shelf-life/) page turns this into a warehouse procedure.

## Why lead-acid is simpler to ship than lithium

Buyers coming from lithium often overestimate the paperwork for lead-acid. The two chemistries sit in different classes and carry different burdens:

| Dimension | Lead-acid | Lithium-ion |
|---|---|---|
| UN number | UN 2794 / UN 2800 | UN 3480 / UN 3481 |
| Hazard class | Class 8 (corrosive) | Class 9 (miscellaneous) |
| UN 38.3 test report | Not required | Required |
| Main risk | Acid spill / corrosion | Thermal runaway / fire |
| Documentation burden | Lower | Higher (test summaries, labelling, training) |

The lead-acid advantage is real but narrow: no UN 38.3 report. You still need Class 8 labelling, compliant packaging and a dangerous-goods declaration where the carrier requires it. The [dangerous-goods classification](/knowledge/lead-acid-battery-dangerous-goods/) page lays out exactly where the two regimes diverge.

## The two calculations that matter

**The weight-ceiling test.** At roughly 15–19 kg per starter battery, 28,000 kg of payload allows about 1,500–1,800 units on pure weight. But pallets, carton crush strength and stacking rules cap the practical load at 600–800 for a standard first order — the difference between a theoretical and a shippable container is the reason MOQ is a logistics number, not a marketing one.

**The storage-cost test.** If a battery self-discharges 5% per month and sits 12 months untended, it has lost most of its state of charge and begun sulfating — a warranty liability, not an asset. The cost of a quarterly top-up charge across a warehouse is a rounding error against the cost of shipping a container that arrives partially sulfated.

## What suppliers will not volunteer

-   **The dangerous-goods declaration is a hidden cost and a training requirement.** Someone has to be certified to sign it, and that compliance work is priced into the freight somewhere.
-   **"Non-spillable" is a tested claim, not a label.** UN 2800 status requires passing vibration and pressure-differential tests — a sealed battery without test records is not legally non-spillable.
-   **The warranty clock starts at the bill of lading, not at your customer's purchase.** Six months in your warehouse is six months of warranty already consumed.
-   **Claim settlement is often pro-rata.** A "12-month warranty" may credit you a fraction of the battery's value based on its age, not a full replacement.

## A worked container-loading calculation

The reason a battery MOQ is 600–800 units is worth seeing in arithmetic, because it explains a number most buyers just accept:

| Constraint | Value | What it allows |
|---|---|---|
| 20ft container payload | ~28,000 kg | ~1,500–1,800 batteries by weight alone |
| 20ft container volume | ~33 m³ | ~1,400+ batteries by volume alone |
| Pallet height / weight cap | ~1.5 m / ~1.5 t per pallet | Caps the practical load far below both |

Weight alone would allow nearly 1,800 units, and volume over 1,400 — but pallet stacking, carton crush strength and the need for stable, liftable pallets cap the real load at 600–800 for a standard first order. The container is weight-limited, not volume-limited, which is why MOQ is a logistics fact and why "one 20ft container" is the honest minimum, not a sales tactic.

## The shipping timeline, week by week

A battery container's journey from finished goods to your warehouse is longer than most buyers budget. Here is the realistic calendar on FOB terms:

| Stage | Duration | Who owns it |
|---|---|---|
| Production + test | 30–45 days | Factory |
| Export packaging + DGD | 2–3 days | Factory / shipper |
| Ocean freight | 3–5 weeks | Carrier (FOB: buyer's risk) |
| Customs clearance + inland | 3–7 days | Importer |

Under FOB the risk transfers at the origin port, so the buyer owns the ocean leg and clearance — which is why the Incoterm and the document set are the same decision. A buyer who plans "30–45 days" for production but forgets the 3–5 week ocean leg is the one who ends up with stockouts and demurrage.

## A warranty claim, worked end to end

To make the claim process concrete, take a buyer who receives 700 batteries and finds 7 failing CCA test within 60 days of landing — a 1% early-failure rate, within the 12-month window. The claim runs like this:

1.  **Measure** — the buyer tests the 7 units and records CCA readings below spec on the named basis.
2.  **File** — invoice, bill of lading, test report and photos go to the factory against the written scope.
3.  **Inspect** — the factory confirms the failures are not deep discharge, physical damage or misuse (the exclusions).
4.  **Settle** — full replacement inside the free-replacement window, or a pro-rata credit if the failure falls after it.

The claim succeeds because the failure was _measured_ and the scope was _written_. A buyer who files "the batteries are bad" with no test data and no documents gets the claim refused on process, not on merit. The [warranty claim process](/knowledge/battery-warranty-claim-process/) page has the full mechanics.

## How to use this cluster

Dingwei Battery provides OEM and private-label battery programs manufactured by Chengguang Power Tech Co., Ltd. (founded 2002). Chengguang Power Tech Co., Ltd. ships from Tianjin / Shanghai on FOB Tianjin / CFR / CIF terms with a 12 months from bill of lading date warranty. Use this pillar to fix the overall picture — classification, documents, warranty and storage — then follow the cluster pages for the detail:

-   [Lead-acid battery dangerous-goods classification](/knowledge/lead-acid-battery-dangerous-goods/)
-   [Battery export documentation](/knowledge/battery-export-documentation/)
-   [Battery shipping, packaging and warranty](/knowledge/battery-shipping-warranty/)
-   [Battery warranty claim process](/knowledge/battery-warranty-claim-process/)
-   [Battery storage and shelf life](/knowledge/battery-storage-shelf-life/)

Related: [how to source from China](/knowledge/battery-sourcing-guide/) · [MOQ and lead time](/knowledge/oem-battery-moq-lead-time/) · [import regulations by market](/knowledge/battery-import-regulations/) · [confirm shipping and warranty terms →](/contact/)
