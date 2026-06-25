# AdminPilot — Codex Handoff

## What this is
A client-side, local-first dashboard for tracking assets (vehicles, home items, documents). Data lives in `localStorage` with JSON backup. It includes a working NHTSA VIN decoder, recall lookup, reminder queue via the Notification API, and basic CRUD.

## Bottom line
Competent prototype. It’s not a ship-ready app. Several core claims (“local dashboard,” “recall alerts,” “documents”) will break or degrade under real use.

## Top issues by severity

### 1. Storage model will fail in production
- Attachments are stored as data URLs in `localStorage`. A single PDF can hit the 5MB quota immediately; multiple attachments will corrupt the store.
- No warning to users that clearing browser data deletes everything.

### 2. Reminder system is surface-level
- Browser notifications only; no fallback when the page is closed.
- No persistence of granted/denied permission state beyond runtime.
- Repeating reminders mutate state silently during `pingDueReminders` — side effects happen inside render-adjacent code.

### 3. VIN flow is semantically confusing
- Clicking “Lookup VIN” in the Add Asset form reuses `lastDecodedVehicle` from global state rather than forcing a fresh decode of the form’s current VIN. Users can unintentionally fill wrong vehicle data.
- The “Check recalls now” button is separate from the form; the natural flow should be: decode → verify vehicle → check recalls → save asset.

### 4. Data model is under-specified
- “Admin” type has no schema, validation, or UI treatment. It’s a placeholder.
- `highConsequence` is a boolean with no behavioral difference — no escalation, no sorting, no distinct visual treatment in lists.
- Attachments have no preview, size validation, or deduplication; filenames are trusted.

### 5. UX brittle under real input
- Date input behavior varies across browsers; the “Month Month / Day Day / Year Year” zero-value state appears when the field renders without a prefilled date.
- Edit dialog doesn’t update inline attachments or show existing reminders; editing a vehicle loses its decoded context.

### 6. Error handling is sparse
- Errors from NHTSA are caught and shown as status text, but network failures, quota errors, and malformed JSON from future API changes have no user-facing recovery path.
- `clearData` auto-triggers export inside a confirm chain — if export fails, data is already gone.

## What to do (prioritized)

### Must fix before wider release
1. **Replace localStorage attachments with IndexedDB**
   - Keep metadata + small thumbnails in IndexedDB.
   - Store only an `attachmentId` reference in the asset object.
   - Add size/type validation on upload (e.g. max 10MB, block executables).

2. **Make VIN flow deterministic**
   - “Lookup VIN” on the form should always decode the current VIN in that field, not reuse cached `lastDecodedVehicle`.
   - Add a “Use this vehicle” confirmation step so users can’t accidentally save the wrong decoded car.

3. **Fix reminder side effects**
   - Separate `pingDueReminders` from render logic; run as a discrete async check on load + interval.
   - Persist permission state in localStorage/IndexedDB so the UI reflects reality after reloads.

4. **Add input validation**
   - Validate VIN checksum before hitting the API (cheap regex + length check).
   - Require `reminderDate` only if “repeat” is non-zero.
   - Clamp or reject future `reminderDate` values older than today unless deliberately allowed.

### Should fix for credibility
5. **Consequence and “Admin” types**
   - Either remove “Admin” or give it a defined schema (e.g. policy docs, credentials, expiry tracking).
   - Make `highConsequence` actually matter: red badge, default-sort to top, optional priority increment.

6. **Edit dialog depth**
   - Show attachment list with delete/update in the dialog.
   - Show reminder history inline.
   - Preserve decoded vehicle context if editing a vehicle asset.

7. **Error states and recovery**
   - API fetch failures need actionable UI, not just “VIN lookup failed.”
   - `clearData` should export FIRST, await the file save, then confirm deletion.

### Nice to have / polish
8. **Date inputs**
   - Add a small helper text like “YYYY-MM-DD” or polyfill date rendering for Safari/Firefox inconsistencies.
   - Don’t prefill with “0” values — leave blank.

9. **Service worker / install**
   - If PWA install is a goal, complete the cache strategy; right now the manifest and SW are scaffolding.

10. **Accessibility / keyboard**
   - Ensure the modal dialog traps focus and closes on Escape (currently close button only).
   - Add skip-to-content and better heading hierarchy.

## Suggested stack changes (if lifting off pure client-side)
- Move state + attachments to **IndexedDB** (Dexie.js is a clean wrapper).
- Keep NHTSA calls as-is; add a small in-memory cache keyed by VIN to avoid repeated decode requests for the same VIN across sessions.
- If multi-device sync is later desired, add a JSON export/import schema version and a thin backend (even a single Supabase table) rather than bolting it onto localStorage later.

## Key files
- `app.js`: state machine, render, API calls
- `index.html`: form and dialog schema
- `styles.css`: current behavior around empty states and modals
- `sw.js` + `manifest.json`: PWA scaffolding, needs completion

## Tone
This app is close to usable for a single user on one machine. The biggest obstacle to real adoption is the localStorage ceiling and the VIN UX. Fix those two and it stops feeling like a demo.
