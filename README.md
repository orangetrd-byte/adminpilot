# AdminPilot

Local-first asset and life admin dashboard prototype.

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
