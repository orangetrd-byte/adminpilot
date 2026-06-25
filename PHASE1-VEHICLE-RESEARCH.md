# PHASE1-VEHICLE-RESEARCH.md
## Top 50 US Vehicles by Registration + Owner's Manual Source Guide
### Phase 1 Deliverable — Vehicle list only; maintenance extraction is GPT's job (Phase 2)

---

## Methodology

**Ranking basis:** Combined 2022–2025 US new-vehicle registration/sales data from
- Car and Driver 2023/2024 bestseller lists (ranks 1–25)
- best-selling-cars.com 2025 full-year USA top-10
- Kelley Blue Book / Automotive News 2025 top-25 coverage
- Historical brand-popularity context (Corolla, Accord, Civic, F-150 multi-decade dominance)

**Unit:** Nameplate (model family) ranked by estimated annual registrations. Where necessary,
vehicles from different body styles / generations are grouped under one model name to reflect
real-world "owned vehicle" count for maintenance purposes.

**Model year target:** Representative year selected from 2015–2025 range with preference for
2019–2022 where a model's current generation launched in that window (covers the largest in-service
fleet eligible for both original-warranty and independent-shop coverage). Where maintenance
guidance is generation-specific, GPT in Phase 2 should note generation.

**Owner's manual status legend:**
| Status | Meaning |
|--------|---------|
| `FOUND PDF` | Direct official PDF available at link shown |
| `PORTAL` | PDF available only via official brand portal; direct year/model URL is the portal page |
| `HARD` | Exists but deep-linked behind year/model selectors; link goes to brand owner's manual hub |
| `RESTRICTED` | Requires VIN or login (e.g., some Mopar/Ram, Subaru) |
| `THIRD-PARTY` | Only third-party aggregator reliable (last resort; marked as such) |
| `FUTURE` | Vehicle sold; archived via non-official or paid archive |

> For PDF links: `assets.sia.toyota.com` serves Toyota PDFs publicly without login; that is treated as
> equivalent to "FOUND PDF." Similarly Mercedes Benz static CDN PDFs are public.

---

## RANKED TOP-50 TABLE

### Rank 1–10 — Core US Market Volume

| Rank | Make | Model | Rep. Year | Body Style | Est. Annual US Registrations (range) | Manual Link | Status | Notes |
|------|------|-------|-----------|-----------|--------------------------------------|-------------|--------|-------|
| 1 | Ford | F-150 / F-Series | 2020 | Full-size pickup | 700k–830k | [Ford Owner Manuals](https://www.ford.com/support/owner-manuals-details/) + [2020 F-150 PDF](https://www.fordservicecontent.com/Ford_Content/Catalog/owner_information/2020-Ford-F-150-Owners-Manual-version-1_om-EN-US_08_2019.pdf) | FOUND PDF | 2020 is 13th gen launch year. Pre-shift to 2021 refresh won't change schedule. |
| 2 | Chevrolet | Silverado 1500 | 2021 | Full-size pickup | 520k–590k | [Chevy Manuals & Guides](https://www.chevrolet.com/support/vehicle/manuals-guides) | PORTAL | GM manuals sit behind year/model selector; portal confirmed functional. |
| 3 | Toyota | RAV4 | 2021 | Compact SUV | 430k–480k | [2021 RAV4 Owner's Manual PDF](https://assets.sia.toyota.com/publications/en/om-s/OM0R028U/pdf/OM0R028U.pdf) | FOUND PDF | PDF confirmed live; XA40 generation. |
| 4 | Honda | CR-V | 2021 | Compact SUV | 360k–410k | [myGarage Manual Search](https://mygarage.honda.com/s/manuals-search) | PORTAL | Honda's techinfo.honda.com also hosts searchable HTML; Phase 2 should prefer PDF if available. |
| 5 | Ram | 1500 | 2021 | Full-size pickup | 340k–375k | [Mopar / Ram Resources](https://www.mopar.com/en-us/my-vehicle/vehicle-information.html) | RESTRICTED | Requires free Mopar account; PDF download accessible after login. |
| 6 | GMC | Sierra 1500 | 2021 | Full-size pickup | 300k–330k | [GM Owner Manuals](https://experience.gm.com/support/vehicle/manuals-guides) | PORTAL | GM family share with Silverado; same T1 platform. |
| 7 | Chevrolet | Equinox | 2021 | Compact SUV | 230k–250k | [Chevy Manuals & Guides](https://www.chevrolet.com/support/vehicle/manuals-guides) | PORTAL | |
| 8 | Toyota | Camry | 2019 | Midsize sedan | 260k–320k | [Toyota Owners — Warranty & Manuals](https://www.toyota.com/owners/warranty-owners-manuals/) | PORTAL | 2019 XV70 launch, first year of new gen — highest in-service fleet. |
| 9 | Tesla | Model Y | 2022 | Compact SUV | ~270k–320k | [Tesla Model Y 2020-2024](https://www.tesla.com/ownersmanual/index-model-y-2024.html) | FOUND PDF | Online web manual; PDF via Print/Save on per-section pages. |
| 10 | Toyota | Tacoma | 2021 | Midsize pickup | 220k–275k | 2021 Tacoma Owner's Manual PDF `assets.sia.toyota.com` → [Toyota portal](https://www.toyota.com/owners/warranty-owners-manuals/vehicle/tacoma/2021/) | PORTAL | 2021 is final J310 year. PDF known pattern (OM0T028U). |

---

### Rank 11–25 — High-Volume SUVs, Trucks, and a Couple Sedans

| Rank | Make | Model | Rep. Year | Body Style | Est. Annual US Registrations | Manual Link | Status | Notes |
|------|------|-------|-----------|-----------|------------------------------|-------------|--------|-------|
| 11 | Ford | Escape | 2020 | Compact SUV | 140k–190k | [Ford Owner Manuals](https://www.ford.com/support/owner-manuals-details/) | HARD | Must select Year/Model. |
| 12 | Jeep | Wrangler | 2020 | Compact SUV / Off-road | 150k–170k | [Jeep / Mopar](https://www.mopar.com/en-us/my-vehicle/vehicle-information.html) | RESTRICTED | Mopar login required for full PDF. |
| 13 | Toyota | Highlander | 2021 | Midsize 3-row SUV | 150k–170k | [Toyota Portal](https://www.toyota.com/owners/warranty-owners-manuals/vehicle/highlander/2021/) | PORTAL | |
| 14 | Honda | Accord | 2019 | Midsize sedan | 170k–200k | [myGarage Honda](https://mygarage.honda.com/s/manuals-search) | PORTAL | 2019 is 10th gen launch. |
| 15 | Hyundai | Tucson | 2021 | Compact SUV | 180k–210k | [owners.hyundai.com](https://owners.hyundai.com/) | PORTAL | |
| 16 | Nissan | Rogue | 2021 | Compact SUV | 250k–270k | [Nissan Owners](https://www.nissanusa.com/owners/maintenance-manuals.html) | PORTAL | Nissan sends PDFs by email/file link after model/years elect. |
| 17 | Subaru | Outback | 2020 | Wagon (raised) | 150k–170k | [Subaru Vehicle Resources](https://www.subaru.com/owners/vehicle-resources.html) | HARD | Requires selecting model from drop-down. |
| 18 | Subaru | Crosstrek | 2020 | Subcompact SUV | 140k–160k | [Subaru Vehicle Resources](https://www.subaru.com/owners/vehicle-resources.html) | HARD | Same subaru.com hub. |
| 19 | Subaru | Forester | 2020 | Compact SUV | 140k–170k | [Subaru Vehicle Resources](https://www.subaru.com/owners/vehicle-resources.html) | HARD | |
| 20 | Jeep | Grand Cherokee | 2021 | Midsize SUV | 200k–230k | [Mopar / Ram / Jeep](https://www.mopar.com/en-us/my-vehicle/vehicle-information.html) | RESTRICTED | Mopar login. |
| 21 | Toyota | Corolla | 2020 | Compact sedan | 220k–250k | [Toyota Portal](https://www.toyota.com/owners/warranty-owners-manuals/vehicle/corolla/2020/) | PORTAL | |
| 22 | Honda | Civic | 2019 | Compact sedan / hatch | 220k–240k | [myGarage Honda](https://mygarage.honda.com/s/manuals-search) | PORTAL | 2019 10th-gen refresh. |
| 23 | Chevrolet | Trax | 2021 | Subcompact SUV | 160k–200k | [Chevy Manuals](https://www.chevrolet.com/support/vehicle/manuals-guides) | PORTAL | |
| 24 | Kia | Sportage | 2021 | Compact SUV | 140k–170k | [Kia Owners](https://www.kia.com/us/en/owners/manuals) | PORTAL | |
| 25 | Kia | Telluride | 2021 | Midsize 3-row SUV | 120k–150k | [Kia Owners](https://www.kia.com/us/en/owners/manuals) | PORTAL | |

---

### Rank 26–32 — MISSING ENTRY BLOCK

| Rank | Make | Model | Rep. Year | Body Style | Est. Annual US Registrations | Manual Link | Status | Notes |
|------|------|-------|-----------|-----------|------------------------------|-------------|--------|-------|
| 26 | Mazda | CX-5 | 2021 | Compact SUV | 120k–155k | [Mazda Owners](https://www.mazdausa.com/owners/manuals) | PORTAL | Current-gen launch year 2017; strong consistent US performer. |
| 27 | Volkswagen | Tiguan | 2021 | Compact SUV | 110k–145k | [VW Owners Manuals](https://owners.vw.com/en/home/manuals-and-guides.html) | PORTAL | |
| 28 | Nissan | Altima | 2021 | Midsize sedan | 100k–135k | [Nissan Owners](https://www.nissanusa.com/owners/maintenance-manuals.html) | PORTAL | |
| 29 | Honda | HR-V | 2021 | Subcompact SUV | 115k–150k | [myGarage Honda](https://mygarage.honda.com/s/manuals-search) | PORTAL | Second generation launch 2023; 2021 is late GK gen. |
| 30 | Volkswagen | Jetta | 2021 | Compact sedan | 95k–130k | [VW Owners Manuals](https://owners.vw.com/en/home/manuals-and-guides.html) | PORTAL | |
| 31 | Subaru | Ascent | 2021 | Midsize 3-row SUV | 55k–80k | [Subaru Vehicle Resources](https://www.subaru.com/owners/vehicle-resources.html) | HARD | Three-row; outback/forester family complement. |
| 32 | Nissan | Rogue Sport | 2021 | Subcompact SUV | 70k–95k | [Nissan Owners](https://www.nissanusa.com/owners/maintenance-manuals.html) | PORTAL | Rogue sibling; narrower trim range. |

---

### Rank 33–40 — SUVs, Sedans, and EVs

| Rank | Make | Model | Rep. Year | Body Style | Est. Annual US Registrations | Manual Link | Status | Notes |
|------|------|-------|-----------|-----------|------------------------------|-------------|--------|-------|
| 33 | Ford | Bronco Sport | 2021 | Compact SUV | 80k–110k | [Ford Owner Manuals](https://www.ford.com/support/owner-manuals-details/) | HARD | 2021 launch year. |
| 34 | Hyundai | Elantra | 2021 | Compact sedan | 130k–160k | [owners.hyundai.com](https://owners.hyundai.com/) | PORTAL | |
| 35 | Kia | Seltos | 2021 | Subcompact SUV | 90k–120k | [Kia Owners](https://www.kia.com/us/en/owners/manuals) | PORTAL | |
| 36 | Kia | Forte | 2020 | Compact sedan | 100k–130k | [Kia Owners](https://www.kia.com/us/en/owners/manuals) | PORTAL | |
| 37 | Tesla | Model 3 | 2021 | Compact sedan / EV | 200k–270k | [Tesla Model 3 2017-2023](https://www.tesla.com/ownersmanual/index-model-3-2017.html) | FOUND PDF | Online manual; sections printable to PDF. Some VIN-linked content. |
| 38 | Toyota | 4Runner | 2020 | Midsize SUV / Off-road | 70k–95k | [Toyota Portal](https://www.toyota.com/owners/warranty-owners-manuals/vehicle/4runner/2020/) | PORTAL | N80 facelift year. |
| 39 | Chevrolet | Tahoe / Suburban | 2021 | Full-size SUV | 80k–110k | [Chevy Manuals](https://www.chevrolet.com/support/vehicle/manuals-guides) | PORTAL | |
| 40 | GMC | Yukon / Yukon XL | 2021 | Full-size SUV | 50k–75k | [GM Owner Manuals](https://experience.gm.com/support/vehicle/manuals-guides) | PORTAL | |

---

### Rank 41–50 — Fill-out for Coverage and Segment Balance

| Rank | Make | Model | Rep. Year | Body Style | Est. Annual US Registrations | Manual Link | Status | Notes |
|------|------|-------|-----------|-----------|------------------------------|-------------|--------|-------|
| 41 | Ford | Explorer | 2020 | Midsize SUV / 3-row | 130k–170k | [Ford Owner Manuals](https://www.ford.com/support/owner-manuals-details/) | HARD | 2020 = sixth-gen launch. |
| 42 | Dodge | Durango | 2021 | Midsize 3-row SUV | 70k–90k | [Mopar / Ram / Dodge](https://www.mopar.com/en-us/my-vehicle/vehicle-information.html) | RESTRICTED | |
| 43 | Chrysler | Pacifica / Voyager | 2021 | Minivan | 60k–90k | [Mopar / Ram](https://www.mopar.com/en-us/my-vehicle/vehicle-information.html) | RESTRICTED | |
| 44 | Toyota | Sienna | 2021 | Minivan | 50k–80k | [Toyota Portal](https://www.toyota.com/owners/warranty-owners-manuals/vehicle/sienna/2021/) | PORTAL | 2021 = Sienna hybrid-only generation launch. |
| 45 | BMW | X5 | 2020 | Midsize luxury SUV | 40k–60k | [BMW Owner's Manuals](https://www.bmwusa.com/owners/manuals-guides.html) | PORTAL | |
| 46 | Mercedes-Benz | GLC-Class | 2021 | Compact luxury SUV | 40k–60k | [MB Owners](https://www.mbusa.com/en/owners/manual-request) / [GLC PDF example](https://static.oneweb.mercedes-benz.com/css-oom-assets/en-do/pdf/mercedes-glc-suv-2021-january-x253-mbux-owners-manual-1.pdf) | FOUND PDF | Direct CDN PDF confirmed. |
| 47 | Nissan | Sentra | 2021 | Compact sedan | 120k–150k | [Nissan Owners](https://www.nissanusa.com/owners/maintenance-manuals.html) | PORTAL | |
| 48 | Chevrolet | Malibu | 2021 | Midsize sedan | 100k–130k | [Chevy Manuals](https://www.chevrolet.com/support/vehicle/manuals-guides) | PORTAL | |
| 49 | Ford | Fusion | 2020 | Midsize sedan | 100k–130k | [Ford Owner Manuals](https://www.ford.com/support/owner-manuals-details/) | HARD | 2020 is final year; manuals in archive. |
| 50 | Hyundai | Kona / Kona Electric | 2021 | Subcompact SUV / EV | 90k–120k | [owners.hyundai.com](https://owners.hyundai.com/) | PORTAL | |

---

## Summary Counts

| Status | Count |
|--------|-------|
| FOUND PDF | 5 |
| PORTAL | 32 |
| HARD | 8 |
| RESTRICTED | 5 |
| FUTURE | 0 |
| THIRD-PARTY | 0 |
| **TOTAL** | **50** |

**Manual coverage:** Direct or near-direct source for 45/50. The 5 RESTRICTED cases (Ram, Jeep/Grand Cherokee, Dodge Durango, Chrysler Pacifica/Voyager) are behind a free Mopar login — still adequate for GPT extraction since a human can log in once to obtain the PDF.

**Model year spread:**
- 2019: 4
- 2020: 14
- 2021: 29
- 2022: 1 (Tesla Model Y)
- 2023–2025: 0 (except Tesla Model Y 2022)
- 2015–2018: 0

Cluster intentionally centered on 2020–2021 because:
1. These years represent peak post-recovery fleet in service with funded maintenance populations.
2. Maintenance schedules in 2020s have converged to around 12-month / 7,500-mile oil change standard on most non-diesel models, plus hybrid battery care — clean target for GPT extraction.

**Segment diversity:**
- Pickup trucks: F-150, Silverado, Sierra, Ram 1500, Tacoma = 5
- Compact SUV: RAV4, CR-V, Equinox, Escape, Tiguan, Rogue, Tucson, Forester, Crosstrek, Sportage, Trax, Bronco Sport, Kona, Koleos-ish potential = 12
- Midsize/large SUV: Explorer, Highlander, Telluride, Grand Cherokee, Durango, Santa Fe, 4Runner, Tahoe, Yukon, X5, GLC = 11
- Sedans: Camry, Accord, Corolla, Civic, Altima, Jetta, Elantra, Malibu, Sentra, Fusion, Model 3 = 11
- Minivans: Pacifica, Sienna = 2
- EVs: Model Y, Model 3, Kona Electric = 3
- Off-road / specialty: Wrangler = 1
- Luxury SUV: X5, GLC = 2

---

## Manual Source Reference Sheet (Brand Hub URLs)

| Brand | Official Manual Hub / Known Direct URL Pattern |
|-------|--------------------------------------------------|
| Ford | [ford.com/support/owner-manuals-details/](https://www.ford.com/support/owner-manuals-details/) — [2020 F-150 PDF direct example](https://www.fordservicecontent.com/Ford_Content/Catalog/owner_information/2020-Ford-F-150-Owners-Manual-version-1_om-EN-US_08_2019.pdf) |
| Chevrolet / GMC | [chevrolet.com/support/vehicle/manuals-guides](https://www.chevrolet.com/support/vehicle/manuals-guides) and [experience.gm.com/support/vehicle/manuals-guides](https://experience.gm.com/support/vehicle/manuals-guides) |
| Toyota | [toyota.com/owners/warranty-owners-manuals/](https://www.toyota.com/owners/warranty-owners-manuals/) — PDF pattern `https://assets.sia.toyota.com/publications/en/om-s/<ID>/pdf/<ID>.pdf` |
| Honda | [mygarage.honda.com/s/manuals-search](https://mygarage.honda.com/s/manuals-search) and [techinfo.honda.com](https://techinfo.honda.com) |
| Ram / Jeep / Dodge | [mopar.com/en-us/my-vehicle/vehicle-information.html](https://www.mopar.com/en-us/my-vehicle/vehicle-information.html) — Free account required to download |
| Hyundai | [owners.hyundai.com](https://owners.hyundai.com/) |
| Kia | [kia.com/us/en/owners/manuals](https://www.kia.com/us/en/owners/manuals) |
| Nissan | [nissanusa.com/owners/maintenance-manuals.html](https://www.nissanusa.com/owners/maintenance-manuals.html) — PDF sent by email |
| Subaru | [subaru.com/owners/vehicle-resources.html](https://www.subaru.com/owners/vehicle-resources.html) — Requires year/model selector |
| Ford (secondary) | bronco, explorer, escape, fusion → same hub |
| Volkswagen | [owners.vw.com/en/home/manuals-and-guides.html](https://owners.vw.com/en/home/manuals-and-guides.html) |
| Mercedes-Benz | [mbusa.com/en/owners/manual-request](https://www.mbusa.com/en/owners/manual-request) plus static PDF CDN example in rank 46 row. |
| BMW | [bmwusa.com/owners/manuals-guides.html](https://www.bmwusa.com/owners/manuals-guides.html) |
| Tesla | [tesla.com/ownersmanual](https://www.tesla.com/ownersmanual) — Online manual; sections printable to PDF |

---

## Phase 2 Handoff Notes for GPT

1. **Use Toyota direct PDF URL pattern** — `assets.sia.toyota.com/publications/en/om-s/<ID>/pdf/<ID>.pdf`. IDs by year/model:
   - 2021 RAV4: `OM0R028U`
   - 2020 Tacoma: `OM04025U`
   - 2021 Highlander, 2021 Camry, 2021 Corolla, 2021 Sienna, 2021 4Runner → same hub page.
2. **F-150 PDF path example is live and confirmed.**
3. **Extract maintenance schedule tables only.** Skip navigation, warranty legalese, infotainment setup, tire-pressure placard tables unrelated to interval.
4. **Flag hybrid / EV variants** (Camry Hybrid, RAV4 Hybrid, CR-V Hybrid, Pacifica Hybrid not sold post-2023, Kona Electric, Model 3, Model Y) — maintenance schedules differ significantly from ICE siblings.
5. **Mopar/Ram/Jeep:** If direct PDFs are unavailable after login in sandbox extraction, substitute the most-recent public PDF posted to Reddit or carmans.net and mark with `SOURCE: PUBLIC/AGGREGATOR` so Claude in Phase 3 can flag for verification.

---

## Sources

- Car and Driver: "The 25 Bestselling Cars, Trucks, and SUVs of 2023" / 2024
- best-selling-cars.com: "2025 Full-Year USA Top 10 Best-Selling Vehicle Models"
- Kelley Blue Book: "The 25 Best-Selling Cars in 2025"
- Toyota Owners online manual portal
- Ford Owner Manuals portal
- Chevrolet / GM Manuals and Guides portal
- Tesla Owner's Manual directory

---

*Phase 1 complete — vehicle list finalized, manual source table built. Ready for GPT extraction (Phase 2).*
