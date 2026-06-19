# AdminPilot Maintenance Dataset Tracker

Last updated: June 19, 2026

## Pipeline Status

| Phase | Owner | Status | Progress | Completion Date |
|---|---|---|---|---|
| Phase 1 - Vehicle research and manual sources | Hermes | COMPLETE | 50/50 vehicles listed | June 18, 2026 |
| Phase 2 - Maintenance schedule extraction | GPT / Codex | COMPLETE | Vehicles completed: 50/50 | June 18, 2026 |
| Phase 3 - Schema validation and production tagging | Claude | IN PROGRESS | 50/50 schema-tagged, 17/50 production-ready as single records | June 18, 2026 (schema pass) |
| Phase 2.5 - Variant-split extraction | Hermes / GPT | IN PROGRESS | Partial variant supplement committed; 89 split records covering 34 retired ids | June 19, 2026 |

## Phase 3 Progress (schema validation + tagging)

Vehicles schema-tagged: 50/50

- `interval_type` (fixed / monitor_driven) tagged per maintenance item
- `applicability.drive_type` (ALL / AWD_4WD_ONLY) tagged per item
- `applicability.use_profile` (normal / severe_only) tagged per item
- `production_ready` flag set per vehicle

Result: **17/50 production-ready as single records.** 33/50 flagged as needing
a variant split (hybrid/gas, FWD/AWD, engine, transmission, or generation)
before they can ship — see Phase 2.5 below.

Deliverables:

- `PHASE3-PRODUCTION-DATA.json`
- `PHASE3-REPORT.md`

## Phase 2.5 Progress (variant-split extraction)

Vehicles flagged for split: 33/50

Schema decision (Claude, Phase 3): each variant becomes its own full,
independent record in the flat `vehicles` array — e.g.
`toyota_camry_2019_gas` / `toyota_camry_2019_hybrid` — not a nested
`variants` array. The original un-split id is retired once split. Full
naming convention and per-vehicle split reasons are in the handoff doc.

Deliverables:

- `PHASE2.5-VARIANT-SPLITS.json`
- `append_splits_v1.py`
- `fix_retired_ids.py`

Status: partial supplement committed. Claude should re-run the
Phase 3 schema pass against these split records, validate the split
bookkeeping, and merge the final result into `PHASE3-PRODUCTION-DATA.json`,
retiring the un-split originals that still need replacement records.



Vehicles completed: 50/50

Completed extraction batches:

- Batch 1: Ford F-150, Tesla Model Y, Mercedes-Benz GLC-Class
- Batch 2: Toyota RAV4, Highlander, Tacoma, Corolla
- Batch 3: Toyota Camry, 4Runner
- Batch 4: Chevrolet Silverado 1500, GMC Sierra 1500, Chevrolet Equinox, Chevrolet Trax, Chevrolet Malibu, Chevrolet Tahoe/Suburban, GMC Yukon/Yukon XL
- Batch 5: Nissan Rogue, Nissan Altima, Nissan Rogue Sport, Nissan Sentra
- Batch 6: Honda CR-V, Honda Accord, Honda Civic, Honda HR-V
- Batch 7: Subaru Outback, Subaru Crosstrek, Subaru Forester, Subaru Ascent, Tesla Model 3, Toyota Sienna
- Batch 8: Ford Escape, Hyundai Tucson, Mazda CX-5, Volkswagen Tiguan, Volkswagen Jetta, Ford Bronco Sport, Hyundai Elantra, Ford Explorer, Ford Fusion, Hyundai Kona/Kona Electric
- Batch 9: Ram 1500, Jeep Wrangler, Jeep Grand Cherokee, Kia Sportage, Kia Telluride, Kia Seltos, Kia Forte, Dodge Durango, Chrysler Pacifica/Voyager, BMW X5

Current deliverables:

- `PHASE2-EXTRACTED-DATA-PARTIAL-1.json`
- `PHASE2-EXTRACTED-DATA.batch1.json`
- `PHASE2-EXTRACTED-DATA.batch2.json`
- `PHASE2-EXTRACTED-DATA.batch3.json`
- `PHASE2-EXTRACTED-DATA.batch4.json`
- `PHASE2-EXTRACTED-DATA.batch5.json`
- `PHASE2-EXTRACTED-DATA.batch6.json`
- `PHASE2-EXTRACTED-DATA.batch7.json`
- `PHASE2-EXTRACTED-DATA.batch8.json`
- `PHASE2-EXTRACTED-DATA.batch9.json`

Final deliverable:

- `PHASE2-EXTRACTED-DATA.json`

## Issues

- Some official manual portals require model selectors, accounts, or login sessions.
- Several manufacturers use condition-based oil-life monitors instead of fixed mileage intervals.
- Hybrid, EV, diesel, transmission, and drivetrain variants require separate production records — confirmed by Phase 3, 33/50 vehicles affected.
- Severe-use maintenance must remain conditional and must not be presented as the normal schedule.
- Phase 1 originally omitted ranks 26-32. Hermes restored them on June 18, 2026, and the corrected list now contains all 50 ranks.
- Phase 3 schema pass complete; 17/50 vehicles are production-ready as-is, 33/50 are blocked on Phase 2.5 variant-split extraction.

## Phase 2 Completion Sign-Off

Status: COMPLETE

Completion date: June 18, 2026

Completed by: GPT / Codex

Validation handoff to Claude: COMPLETE (see Phase 3 above)

## Phase 2.5 Handoff Sign-Off

Status: PARTIAL supplement committed

Handoff date: June 19, 2026

Handed off by: Claude

Owner: Hermes (research) -> GPT (extraction)

Notes: local checkout now contains the split supplement and the restored Phase 2 batch files; GM families that share the same underlying architecture should stay unified unless a later pass proves the maintenance schedules truly diverge. Tahoe/Suburban and Yukon/Yukon XL are currently kept unified on that basis. Final merge into `PHASE3-PRODUCTION-DATA.json` remains the next Claude-owned validation step.

