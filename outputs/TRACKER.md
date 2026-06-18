# AdminPilot Maintenance Dataset Tracker

Last updated: June 18, 2026

## Pipeline Status

| Phase | Owner | Status | Progress | Completion Date |
|---|---|---|---|---|
| Phase 1 - Vehicle research and manual sources | Hermes | COMPLETE | 50/50 vehicles listed | June 18, 2026 |
| Phase 2 - Maintenance schedule extraction | GPT / Codex | IN PROGRESS | Vehicles completed: 16/50 | - |
| Phase 3 - Validation and production JSON | Claude | NOT STARTED | 0/50 vehicles validated | - |

## Phase 2 Progress

Vehicles completed: 16/50

Completed extraction batches:

- Batch 1: Ford F-150, Tesla Model Y, Mercedes-Benz GLC-Class
- Batch 2: Toyota RAV4, Highlander, Tacoma, Corolla
- Batch 3: Toyota Camry, 4Runner
- Batch 4: Chevrolet Silverado 1500, GMC Sierra 1500, Chevrolet Equinox, Chevrolet Trax, Chevrolet Malibu, Chevrolet Tahoe/Suburban, GMC Yukon/Yukon XL

Current deliverables:

- `PHASE2-EXTRACTED-DATA.batch1.json`
- `PHASE2-EXTRACTED-DATA.batch2.json`
- `PHASE2-EXTRACTED-DATA.batch3.json`
- `PHASE2-EXTRACTED-DATA.batch4.json`
- `PHASE2-VALIDATION-NOTES.md`

Final deliverable:

- `PHASE2-EXTRACTED-DATA.json`

## Issues

- Some official manual portals require model selectors, accounts, or login sessions.
- Several manufacturers use condition-based oil-life monitors instead of fixed mileage intervals.
- Hybrid, EV, diesel, transmission, and drivetrain variants may require separate production records.
- Severe-use maintenance must remain conditional and must not be presented as the normal schedule.
- Phase 1 originally omitted ranks 26-32. Hermes restored them on June 18, 2026, and the corrected list now contains all 50 ranks.
- The final combined JSON has not yet been produced because Phase 2 extraction is still underway.

## Phase 2 Completion Sign-Off

Status: IN PROGRESS

Completion date: -

Completed by: -

Validation handoff to Claude: NOT READY
