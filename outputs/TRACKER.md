# AdminPilot Maintenance Dataset Tracker

Last updated: June 19, 2026

## Current Status

| Phase | Owner | Status | Progress | Completion Date |
|---|---|---|---|---|
| Phase 1 - Vehicle research and manual sources | Hermes | COMPLETE | 50/50 vehicles listed | June 18, 2026 |
| Phase 2 - Maintenance schedule extraction | GPT / Codex | COMPLETE | 50/50 vehicles extracted | June 18, 2026 |
| Phase 2.5 - Variant-split extraction | Hermes / GPT | COMPLETE | 89 split records merged, 2 validation-tracked Nissan records restored | June 19, 2026 |
| Phase 3 - Schema validation and production merge | Claude / Codex | COMPLETE | 104/104 production-ready records | June 19, 2026 |

## Final Production Output

- `outputs/maintenance-schedules.json`

## Production Summary

- Total records: 104
- Split records: 89
- Standalone records: 15
- Production-ready: 104/104
- Retired originals: 34

## Notes

- The merged production file keeps GM badge-shared families unified where they represent the same underlying vehicle architecture.
- Tahoe/Suburban and Yukon/Yukon XL are retained as unified GM families in the merged output.
- Nissan Rogue Sport and Nissan Sentra are included as validation-tracked family records.
- The final dataset is local-first and intended for the AdminPilot PWA maintenance model.

## Deliverables

- `PHASE1-VEHICLE-RESEARCH.md`
- `PHASE2-EXTRACTED-DATA.json`
- `PHASE2.5-VARIANT-SPLITS.json`
- `maintenance-schedules.json`

## Relationship Rule Reference

- Rebadges: treat as one family record by default when the vehicles are effectively the same product under different badges.
- Corporate twins: keep grouped by default and split only when maintenance schedules materially differ.
- Same-platform families: use for extraction reuse and clustering, not identity merging.
