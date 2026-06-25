# Expansion Batch 01 Review

This directory is a quarantined review package, not production maintenance data.

Hermes produced useful official-manual extractions, but its final state contained
contradictory metadata, duplicate structures, placeholders, and one file that was
not a vehicle record at all. Several files also changed after the original
manifest and validation report were generated.

## Accepted as candidates

Thirteen records are retained because they contain usable maintenance content and
identify an official manufacturer source:

- 2019 Toyota Camry
- 2020 Buick Enclave
- 2020 Ford F-150
- 2020 Ford Edge
- 2020 Toyota Corolla
- 2021 Ford Explorer
- 2021 Honda Accord
- 2021 Honda CRV
- 2021 Jeep Wrangler
- 2021 Ram 1500 Classic
- 2021 Ram 1500 DT
- 2021 Toyota RAV4 Hybrid
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
  structure; the batch now keeps a normalized `2020_ford_f150.json` candidate.
- `toyota_rav4_2021_maintenance.json` duplicated an older RAV4-shaped artifact;
  the batch now keeps a hybrid-specific `2021_toyota_rav4_hybrid.json`
  candidate.

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
