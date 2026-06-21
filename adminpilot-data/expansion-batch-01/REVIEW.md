# Expansion Batch 01 Review

This directory is a quarantined review package, not production maintenance data.

Hermes produced useful official-manual extractions, but its final state contained
contradictory metadata, duplicate structures, placeholders, and one file that was
not a vehicle record at all. Several files also changed after the original
manifest and validation report were generated.

## Accepted as candidates

Six records were retained because they contain usable maintenance content and
identify an official manufacturer source:

- 2020 Buick Enclave
- 2020 Ford Edge
- 2021 Jeep Wrangler
- 2021 Ram 1500 Classic
- 2021 Ram 1500 DT
- 2022 Chevrolet Equinox

Every retained record is deliberately marked:

- `production_ready: false`
- `review_status: "candidate"`

These records must not be merged into the canonical Phase 2 dataset until the
listed source pages have been rendered and checked for column alignment,
footnotes, variant applicability, and normal-versus-severe usage.

## Rejected artifacts

- `2020_chevrolet_malibu.json` contained page previews from Customer Information,
  OnStar, and index pages rather than a maintenance record.
- `2020_gmc_terrain.json` contained a placeholder maintenance item saying the
  schedule had not been parsed.
- `ford_f150_2020_maintenance.json` duplicated the F-150 in a different dataset
  structure.
- `toyota_rav4_2021_maintenance.json` duplicated a vehicle already present in the
  repository's canonical Phase 2 dataset.
- `2019_toyota_camry.json` and `2020_ford_f150.json` also overlapped canonical
  records without providing a safe production replacement.

The Ram 1500 DT record is retained only as a replacement candidate because the
canonical Ram record is explicitly listed as low confidence.

## Validation

Run:

```powershell
node tools/validate-expansion-batch.mjs
```

The validator checks JSON structure, required vehicle fields, interval types,
severity values, duplicate IDs, manifest consistency, and the non-production
quarantine rule.
