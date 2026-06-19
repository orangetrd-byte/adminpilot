# Phase 2 Validation Notes

## Current progress

- Completed vehicle records: 50
- Completed batches: 9
- JSON files parse successfully.
- Sources used so far are official manufacturer owner manuals or official warranty and maintenance guides.

## Phase 1 status

`PHASE1-VEHICLE-RESEARCH.md` now resolves to a full 50-vehicle list.

The earlier missing-rank issue has been corrected in the repo. Do not
reintroduce a partial ranked list.

## Completed records

### Batch 1

- 2020 Ford F-150
- 2022 Tesla Model Y
- 2021 Mercedes-Benz GLC-Class

### Batch 2

- 2021 Toyota RAV4
- 2021 Toyota Highlander
- 2021 Toyota Tacoma
- 2020 Toyota Corolla

### Batch 3

- 2019 Toyota Camry
- 2020 Toyota 4Runner

### Batch 4

- 2021 Chevrolet Silverado 1500
- 2021 GMC Sierra 1500
- 2021 Chevrolet Equinox
- 2021 Chevrolet Trax
- 2021 Chevrolet Malibu
- 2021 Chevrolet Tahoe / Suburban
- 2021 GMC Yukon / Yukon XL

## Cross-manufacturer modeling rules

- Do not force a mileage value when the manufacturer uses an oil-life monitor or service-due display.
- Store severe-use intervals as conditional, not as the normal schedule.
- Split records when engine, hybrid, EV, transmission, or drivetrain variants materially change maintenance.
- Preserve `null` mileage or month values when the manual does not specify that dimension.
- Do not infer a transmission-fluid interval from dealer recommendations or third-party schedules.
- EV records should not contain internal-combustion services.
- Vehicle families that share one manual may remain one extraction record, but Claude should decide whether the production UI needs separate model records.

## Records requiring special validation

- Ford F-150: split gasoline and diesel variants.
- Toyota hybrid models: split hybrid inverter-coolant requirements from gasoline records.
- Toyota transmission service: most replacement entries currently captured are severe-use only.
- Chevrolet Silverado and GMC Sierra: the 2.7L turbo has a different spark-plug interval.
- GM full-size trucks and SUVs: add separate Duramax records if diesel support is required.
- Mercedes-Benz GLC: ASSYST PLUS is variable and display-driven; do not invent fixed intervals.
- 2019 Toyota Camry: confirm the cabin-air-filter pattern shown in the guide.

## Phase 2.5 status

The variant-split supplement exists in `outputs/PHASE2.5-VARIANT-SPLITS.json`.
It covers 33 split vehicles and expands them into 83 variant records.
Use that file as the current Phase 2.5 handoff, not the older "not started"
status text.

