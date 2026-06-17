# GitHub Issue: AdminPilot — Critical fixes before wider release

## Labels
`bug` `enhancement` `priority:high` `area:storage` `area:ux`

## Description

AdminPilot is close to usable for a single user on one machine. The biggest obstacles to real adoption are the localStorage ceiling and the VIN UX.

### 1. Storage model will fail in production
- **Problem:** Attachments are stored as data URLs in `localStorage`. A single PDF can hit the 5MB quota immediately; multiple attachments will corrupt the store.
- **Impact:** Users lose all data silently after adding a few documents.
- **Fix:** Move attachments to IndexedDB. Keep only an `attachmentId` reference in the asset object. Add size/type validation on upload (e.g. max 10MB, block executables).

### 2. Reminder system is surface-level
- **Problem:** Browser notifications only; no fallback when the page is closed. Repeating reminders mutate state silently inside render-adjacent code.
- **Impact:** Missed reminders with no recovery path.
- **Fix:** Separate `pingDueReminders` from render logic; run as a discrete async check on load + interval. Persist permission state in localStorage/IndexedDB.

### 3. VIN flow is semantically confusing
- **Problem:** Clicking “Lookup VIN” in the Add Asset form reuses `lastDecodedVehicle` from global state rather than forcing a fresh decode of the form’s current VIN.
- **Impact:** Users accidentally save wrong vehicle data.
- **Fix:** “Lookup VIN” should always decode the current VIN in that field. Add a “Use this vehicle” confirmation step.

### 4. Data model is under-specified
- **Problem:** “Admin” type has no schema or UI treatment. `highConsequence` is a boolean with no behavioral difference.
- **Impact:** Users don’t know what “Admin” means; high-consequence items aren’t visually prioritized.
- **Fix:** Either remove “Admin” or give it a defined schema. Make `highConsequence` matter: red badge, default-sort to top.

### 5. UX brittle under real input
- **Problem:** Date input behavior varies across browsers. Edit dialog doesn’t show attachments or reminders.
- **Fix:** Add helper text for date format. Show attachment list + reminder history in edit dialog.

### 6. Error handling is sparse
- **Problem:** API failures show only status text. `clearData` auto-triggers export inside a confirm chain.
- **Fix:** Actionable error UI. Export FIRST, await file save, then confirm deletion.
