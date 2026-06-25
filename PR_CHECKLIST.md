# AdminPilot — PR-Ready Checklist

Use this checklist before opening a PR or sharing a build.

## Blocking issues (fix before release)

- [ ] **Attachments moved to IndexedDB**
  - [ ] Replace localStorage attachment storage with IndexedDB
  - [ ] Asset objects store only `attachmentId` reference
  - [ ] Add upload size/type validation (max 10MB, block executables)
  - [ ] Test: adding multiple PDFs no longer corrupts storage

- [ ] **VIN flow is deterministic**
  - [ ] "Lookup VIN" always decodes the current VIN in the form field
  - [ ] Add "Use this vehicle" confirmation step after decode
  - [ ] Test: decoding a second VIN doesn't populate the first asset's data

- [ ] **Reminder side effects removed from render path**
  - [ ] `pingDueReminders` runs as discrete async check on load + interval
  - [ ] Permission state persisted in storage and reflected in UI after reload
  - [ ] Test: notifications still fire after page reload

- [ ] **clearData flow is safe**
  - [ ] Export completes and file save is confirmed before deletion
  - [ ] Test: canceling export still shows confirmation; flow has no data loss path

- [ ] **Input validation added**
  - [ ] VIN length/format validated before API call
  - [ ] Reminder date required only if repeat > 0
  - [ ] Future dates handled intentionally (allow or reject with message)

## Important credibility fixes

- [ ] **"Admin" type resolved**
  - [ ] Either removed or given a defined schema/fields
  - [ ] Test: adding an "Admin" asset makes sense to a new user

- [ ] **highConsequence has visible behavior**
  - [ ] Red/danger visual treatment in lists
  - [ ] Default sort: high consequence items appear first
  - [ ] Test: toggling the checkbox changes display immediately

- [ ] **Edit dialog is complete**
  - [ ] Shows existing attachments with delete option
  - [ ] Shows reminder history inline
  - [ ] Preserves decoded vehicle context when editing a vehicle asset
  - [ ] Test: edit a vehicle, save, verify VIN/recall data still present

- [ ] **Error states are actionable**
  - [ ] NHTSA API failures show retry option, not just status text
  - [ ] Network/quota errors have user-facing recovery path
  - [ ] Test: disconnect network, verify meaningful message appears

## Polish / nice-to-have

- [ ] **Date inputs render consistently**
  - [ ] Helper text added (e.g. "YYYY-MM-DD")
  - [ ] No "Month Month / Day Day / Year Year" zero-value state
  - [ ] Test on Safari, Firefox, Chrome

- [ ] **Accessibility**
  - [ ] Modal dialog traps focus and closes on Escape
  - [ ] Skip-to-content link present
  - [ ] Heading hierarchy is logical

- [ ] **PWA completeness**
  - [ ] Service worker caches shell assets
  - [ ] Install flow tested on mobile and desktop

## Definition of done

- [ ] All "Blocking" items checked
- [ ] No console errors in normal flows
- [ ] Loaded 10+ test assets without storage failure
- [ ] Code review completed
