# AdminPilot Maintenance Dataset - Project Tracker

Project: Build top 50 US vehicle maintenance schedules  
Start date: June 17, 2026  
Target completion: June 24, 2026  
Status: IN PROGRESS  
Last updated: June 18, 2026

## Phase Overview

| Phase | Owner | Status | Progress | Completion Date |
|---|---|---|---|---|
| Phase 1 - Research | Hermes | COMPLETE | 50/50 vehicles listed | June 18, 2026 |
| Phase 2 - Extraction | GPT / Codex | IN PROGRESS | 26/50 vehicles completed | - |
| Phase 3 - Validation | Claude | QUEUED | 0/50 vehicles validated | - |

## Phase 1

Status: COMPLETE

- [x] Identify and rank 50 US vehicles.
- [x] Select representative model years.
- [x] Locate official manuals or manufacturer portal sources.
- [x] Restore the originally omitted ranks 26-32.
- [x] Verify 50 continuous and unique ranks.

Deliverable:

- `PHASE1-VEHICLE-RESEARCH.md`

Sign-off: Hermes, June 18, 2026

## Phase 2

Status: IN PROGRESS

Vehicles completed: 26/50

- [ ] Read and extract all 50 maintenance schedules.
- [x] Extract ranks 1-26.
- [x] Document miles, months, and interval logic.
- [x] Assign service severity.
- [x] Attach validation flags and source notes.
- [ ] Extract ranks 27-50.
- [ ] Compile final `PHASE2-EXTRACTED-DATA.json`.
- [ ] Complete GPT/Codex sign-off.

Current deliverables:

- `PHASE2-EXTRACTED-DATA-PARTIAL-1.json` - ranks 1-26
- `PHASE2-EXTRACTED-DATA.batch1.json`
- `PHASE2-EXTRACTED-DATA.batch2.json`
- `PHASE2-EXTRACTED-DATA.batch3.json`
- `PHASE2-EXTRACTED-DATA.batch4.json`
- `PHASE2-EXTRACTED-DATA.batch5.json`
- `PHASE2-VALIDATION-NOTES.md`

Final deliverable:

- `PHASE2-EXTRACTED-DATA.json`

## Phase 3

Status: QUEUED

- [ ] Receive Phase 2 extracted data and validation notes.
- [ ] Spot-check critical intervals.
- [ ] Resolve lower-confidence and variant flags.
- [ ] Standardize the production JSON schema.
- [ ] Test integration with AdminPilot.
- [ ] Produce `maintenance-schedules.json`.
- [ ] Produce `PHASE3-VALIDATION-REPORT.md`.

## Issues and Blockers

| Issue | Severity | Status | Resolution |
|---|---|---|---|
| Phase 1 originally omitted ranks 26-32 | High | Resolved | Hermes restored and verified all 50 ranks on June 18, 2026 |
| Some manufacturer portals require selectors, accounts, or login sessions | Medium | Open | Use official portals where possible and flag restricted records for Phase 3 |
| Ram and Jeep manuals are portal-restricted in the extraction environment | High | Open | Records are marked lower confidence and require exact-manual verification |
| Honda uses Maintenance Minder rather than fixed normal mileage | Medium | Documented | Preserve condition-based logic and do not invent mileage |
| Hybrid, EV, diesel, turbo, transmission, and drivetrain variants differ | High | Open | Split production records where validation flags require it |
| Several transmission-fluid services are severe-use only | High | Documented | Keep conditional and do not present as normal maintenance |
| Final combined JSON is not yet complete | High | In progress | Continue with ranks 27-50 |

## Quality Gates

Phase 1:

- [x] 50 continuous vehicle ranks.
- [x] Every row has a year, source link, and source status.
- [x] Diverse vehicle mix.

Phase 2:

- [ ] All 50 vehicles extracted.
- [x] Ranks 1-26 compiled and structurally validated.
- [x] Oil-monitor and Maintenance Minder logic preserved.
- [x] Spark-plug, coolant, and transmission items captured or flagged.
- [x] Validation notes included.
- [ ] Ranks 27-50 compiled.

Phase 3:

- [ ] Validate all critical intervals against sources.
- [ ] Resolve lower-confidence and variant flags.
- [ ] Standardize final production schema.
- [ ] Run integration tests.
- [ ] Approve production dataset.

## File Locations

All pipeline deliverables belong in `AdminPilot/outputs/`.

## Phase 2 Completion Sign-Off

Status: IN PROGRESS

Completion date: -

Completed by: -

Validation handoff to Claude: NOT READY
