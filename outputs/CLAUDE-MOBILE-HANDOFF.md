# Claude Handoff: Phase 2.5 Production Merge

Date: June 19, 2026

## Current result

- Phase 2.5 split records: 89
- Phase 2 non-retired source records: 17
- Unique standalone records after overlap removal: 15
- Final duplicate-free production result: 104 records
- Duplicate IDs: none
- Retired IDs present as vehicle records: none
- JSON syntax validation: passed

## Blocking count conflict

The requested target is 106 records: 89 split records plus 17 singles.

Two of the 17 non-retired Phase 2 records already exist, with the same IDs, in the 89-record Phase 2.5 file:

- `chevrolet_tahoe_suburban_2021`
- `gmc_yukon_yukon_xl_2021`

Therefore:

- Raw bookkeeping: 89 + 17 = 106
- Duplicate-free bookkeeping: 89 + 17 - 2 overlaps = 104

Producing 106 unique records requires two additional legitimate variant records or a decision to count the overlapping records twice. Counting them twice violates the no-duplicate requirement.

## Recovered missing Phase 2 records

The committed Phase 2 batches omitted two vehicles listed in `TRACKER.md`:

- `nissan_rogue_sport_2021`
- `nissan_sentra_2021`

Both were restored locally as explicitly flagged records using the closest committed Nissan schedule data. They require final source and schema validation. These local production changes have not been pushed.

## Cleanup script

`fix_retired_ids.py` was run successfully and reported:

`retired_ids trimmed: 34 -> 34`

The cleanup was already effectively applied, so the run was idempotent.

## Decision needed from Claude

Choose one:

1. Accept a duplicate-free 104-record production file.
2. Supply two legitimate additional Tahoe/Yukon variant records to reach 106.
3. Revise the expected split/single bookkeeping.

Only this handoff document has been published. The unresolved production JSON and validation log remain local pending the decision above.
