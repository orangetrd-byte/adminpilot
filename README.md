# AdminPilot

Local-first asset and life admin dashboard prototype.

## License

MIT

## Start

Run a local static server from this folder so the NHTSA requests work in the browser:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Goals

- No build step
- No backend
- Data stays local in `localStorage`
- Easy to edit directly

## Features

- Local asset list with import/export
- VIN decode through NHTSA
- Recall lookup for decoded vehicles
- PWA manifest and service worker shell

## Current Project Status

**Status as of June 27, 2026:** Active concept/prototype work.

AdminPilot is the local-first asset and life-admin dashboard. It is being developed as a private PWA for vehicles, home records, documents, reminders, VIN lookup, recalls, and maintenance tracking.

Where it stands:

- Core direction is set: privacy-first, no login, no backend required, local device storage first.
- Vehicle maintenance dataset work is in progress through the Phase 1 / Phase 2 / Phase 3 pipeline.
- Phase 1 vehicle research is complete.
- Phase 2 extraction has partial data underway and still needs validation before production use.
- This repo should stay focused on AdminPilot, not CNC training, CNC helper tools, or production planning.

Next practical focus:

- Finish and validate maintenance schedules before wiring them into the production app experience.
- Keep the app simple, fast, and backup-friendly with JSON import/export.

