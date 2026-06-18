# Phase 2 Validation Notes

## Current progress

- Completed vehicle records: 16
- Completed batches: 4
- JSON files parse successfully.
- Sources used so far are official manufacturer owner manuals or official warranty and maintenance guides.

## Phase 1 blocking defect

`PHASE1-VEHICLE-RESEARCH.md` claims a total of 50 vehicles, but its ranked table contains only 43 vehicle rows.

The missing ranks are:

- 26
- 27
- 28
- 29
- 30
- 31
- 32

Phase 2 must not invent those seven vehicles. Hermes or Claude must restore the missing ranked rows, including representative year and official manual source, before a truthful 50-vehicle final dataset can be completed.

The Phase 1 narrative mentions some likely omitted models, including Volkswagen Tiguan, Hyundai Santa Fe, and Nissan Altima, but narrative references are not sufficient to reconstruct the official rank list.

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

