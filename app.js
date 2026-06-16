const STORAGE_KEY = "adminpilot.state.v1";

function isoDateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function cloneDefaultState() {
  return {
    assets: [],
    lastDecodedVehicle: null,
    recalls: [],
    lastLookup: "",
  };
}

const DEFAULT_STATE = cloneDefaultState();

function createSampleAssets() {
  const createdAt = new Date().toISOString();
  return [
    {
      id: crypto.randomUUID(),
      name: "2019 Ford F-150",
      type: "Vehicle",
      status: "due-soon",
      vin: "1FTFW1E5XJFA00000",
      due: "Oil change due in 320 miles",
      reminderDate: isoDateOffset(3),
      repeatEveryDays: 90,
      note: "Track service before road trip.",
      consequence: "Risk of skipped maintenance and a noisy reminder later.",
      attachments: [],
      createdAt,
    },
    {
      id: crypto.randomUUID(),
      name: "Home warranty",
      type: "Document",
      status: "on-track",
      vin: "",
      due: "Renewal in 42 days",
      reminderDate: isoDateOffset(14),
      repeatEveryDays: 365,
      note: "Store policy number and contact details.",
      consequence: "Could miss a renewal or claim deadline.",
      attachments: [],
      createdAt,
    },
  ];
}

const els = {
  assetForm: document.getElementById("asset-form"),
  assetName: document.getElementById("asset-name"),
  assetType: document.getElementById("asset-type"),
  assetStatus: document.getElementById("asset-status"),
  assetVin: document.getElementById("asset-vin"),
  assetDue: document.getElementById("asset-due"),
  assetReminder: document.getElementById("asset-reminder"),
  assetRepeat: document.getElementById("asset-repeat"),
  assetNote: document.getElementById("asset-note"),
  assetConsequence: document.getElementById("asset-consequence"),
  assetFile: document.getElementById("asset-file"),
  assetList: document.getElementById("asset-list"),
  assetCount: document.getElementById("asset-count"),
  dueSoonCount: document.getElementById("due-soon-count"),
  reminderCount: document.getElementById("reminder-count"),
  vehicleCount: document.getElementById("vehicle-count"),
  recallCount: document.getElementById("recall-count"),
  vehicleCard: document.getElementById("vehicle-card"),
  recallCard: document.getElementById("recall-card"),
  timeline: document.getElementById("timeline"),
  reminderList: document.getElementById("reminder-list"),
  notifyEnable: document.getElementById("notify-enable"),
  notifyStatus: document.getElementById("notify-status"),
  vinInput: document.getElementById("vin-input"),
  vinStatus: document.getElementById("vin-status"),
  lastSave: document.getElementById("last-save"),
  addSample: document.getElementById("add-sample"),
  clearData: document.getElementById("clear-data"),
  fillVin: document.getElementById("fill-vin"),
  decodeVin: document.getElementById("decode-vin"),
  loadRecalls: document.getElementById("load-recalls"),
  exportData: document.getElementById("export-data"),
  importFile: document.getElementById("import-file"),
  assetDialog: document.getElementById("asset-dialog"),
  assetDialogForm: document.getElementById("asset-dialog-form"),
  assetDialogClose: document.getElementById("asset-dialog-close"),
  assetDialogDelete: document.getElementById("asset-dialog-delete"),
  assetDialogId: document.getElementById("asset-id"),
  editAssetName: document.getElementById("edit-asset-name"),
  editAssetType: document.getElementById("edit-asset-type"),
  editAssetStatus: document.getElementById("edit-asset-status"),
  editAssetVin: document.getElementById("edit-asset-vin"),
  editAssetDue: document.getElementById("edit-asset-due"),
  editAssetReminder: document.getElementById("edit-asset-reminder"),
  editAssetRepeat: document.getElementById("edit-asset-repeat"),
  editAssetNote: document.getElementById("edit-asset-note"),
  editAssetConsequence: document.getElementById("edit-asset-consequence"),
};

let state = loadState();

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "");
    return {
      ...DEFAULT_STATE,
      ...parsed,
      assets: Array.isArray(parsed?.assets) ? parsed.assets : [],
      recalls: Array.isArray(parsed?.recalls) ? parsed.recalls : [],
    };
  } catch {
    return cloneDefaultState();
  }
}

function saveState(nextState) {
  state = nextState;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  els.lastSave.textContent = `Saved ${new Date().toLocaleTimeString()}`;
}

function normalizeVin(value) {
  return value.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 17);
}

function prettyValue(value) {
  return value && String(value).trim() ? String(value).trim() : "Unknown";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function setStatus(text, tone = "") {
  els.vinStatus.textContent = text;
  els.vinStatus.dataset.tone = tone;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function dayDiff(from, to) {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);
  return Math.round((end - start) / 86400000);
}

function formatStatus(status) {
  if (status === "overdue") return "Overdue";
  if (status === "due-soon") return "Due soon";
  return "On track";
}

function formatDateLabel(value) {
  if (!value) return "No reminder date";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "No reminder date";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getDecodedField(results, fieldName) {
  const match = results.find((item) => item.Variable === fieldName);
  const value = match?.Value;
  return value && String(value).trim() ? String(value).trim() : "";
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function render() {
  const assets = state.assets;
  const vehicles = assets.filter((asset) => asset.type === "Vehicle").length;
  const recalls = state.recalls.length;
  const dueSoon = assets.filter((asset) => asset.status === "due-soon").length;
  const reminders = getReminderItems();

  els.assetCount.textContent = String(assets.length);
  els.dueSoonCount.textContent = String(dueSoon);
  els.reminderCount.textContent = String(reminders.length);
  els.vehicleCount.textContent = String(vehicles);
  els.recallCount.textContent = String(recalls);

  renderVehicleCard();
  renderRecallCard();
  renderTimeline();
  renderReminderCenter(reminders);
  renderAssets();
  pingDueReminders(reminders);
}

function renderVehicleCard() {
  const vehicle = state.lastDecodedVehicle;
  if (!vehicle) {
    els.vehicleCard.className = "info-card empty";
    els.vehicleCard.innerHTML =
      "<strong>No VIN decoded yet.</strong><small>Decode a 17-character VIN to auto-fill vehicle details.</small>";
    return;
  }

  els.vehicleCard.className = "info-card";
  els.vehicleCard.innerHTML = `
    <div class="info-title">
      <strong>${prettyValue(vehicle.year)} ${prettyValue(vehicle.make)} ${prettyValue(vehicle.model)}</strong>
      <span class="pill">${prettyValue(vehicle.trim)}</span>
    </div>
    <div class="meta-grid">
      <div><span>VIN</span><strong>${prettyValue(vehicle.vin)}</strong></div>
      <div><span>Body</span><strong>${prettyValue(vehicle.bodyClass)}</strong></div>
      <div><span>Drive</span><strong>${prettyValue(vehicle.driveType)}</strong></div>
      <div><span>Plant</span><strong>${prettyValue(vehicle.plantCity)}</strong></div>
    </div>
  `;
}

function renderRecallCard() {
  if (!state.recalls.length) {
    els.recallCard.className = "info-card empty";
    els.recallCard.innerHTML =
      "<strong>No recall data loaded yet.</strong><small>Recall status appears after a successful VIN decode.</small>";
    return;
  }

  els.recallCard.className = "info-card";
  els.recallCard.innerHTML = `
    <div class="info-title">
      <strong>${state.recalls.length} active recall${state.recalls.length === 1 ? "" : "s"}</strong>
      <span class="pill warning">NHTSA</span>
    </div>
    <div class="recall-list">
      ${state.recalls
        .slice(0, 3)
        .map(
          (recall) => `
            <article class="recall-item">
              <strong>${escapeHtml(recall.component)}</strong>
              <small>${escapeHtml(recall.summary)}</small>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderTimeline() {
  const groups = {
    overdue: state.assets.filter((asset) => asset.status === "overdue"),
    dueSoon: state.assets.filter((asset) => asset.status === "due-soon"),
    onTrack: state.assets.filter((asset) => !asset.status || asset.status === "on-track"),
  };

  const renderGroup = (title, tone, items) => `
    <section class="timeline-group">
      <div class="timeline-head">
        <strong>${title}</strong>
        <span class="pill ${tone}">${items.length}</span>
      </div>
      <div class="timeline-items">
        ${items.length
          ? items
              .map(
                (item) => `
                  <article class="timeline-item ${escapeHtml(item.status || "on-track")}">
                    <span class="timeline-dot"></span>
                    <div>
                      <strong>${escapeHtml(item.name)}</strong>
                      <small>${escapeHtml(item.due || "No due date")}</small>
                    </div>
                  </article>
                `
              )
              .join("")
          : "<div class='timeline-empty'>No items</div>"}
      </div>
    </section>
  `;

  els.timeline.innerHTML = [
    renderGroup("Overdue", "error", groups.overdue),
    renderGroup("Due soon", "warning", groups.dueSoon),
    renderGroup("On track", "success", groups.onTrack),
  ].join("");
}

function getReminderItems() {
  const today = todayKey();
  return state.assets
    .filter((asset) => asset.reminderDate)
    .map((asset) => {
      const daysAway = dayDiff(today, asset.reminderDate);
      const overdue = daysAway < 0;
      const dueSoon = daysAway >= 0 && daysAway <= 7;
      return {
        id: asset.id,
        name: asset.name,
        status: overdue ? "overdue" : dueSoon ? "due-soon" : "on-track",
        label: overdue ? "Overdue" : dueSoon ? "Soon" : "Upcoming",
        summary: `${formatDateLabel(asset.reminderDate)} · repeat ${Number(asset.repeatEveryDays) || 0} days`,
        dueDate: asset.reminderDate,
        lastReminderPing: asset.lastReminderPing || "",
      };
    })
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

function renderReminderCenter(reminders) {
  if (!reminders.length) {
    els.reminderList.innerHTML =
      "<div class='timeline-empty'>No active reminders yet. Add a reminder date to start a queue.</div>";
    return;
  }

  els.reminderList.innerHTML = reminders
    .map(
      (item) => `
        <article class="reminder-item ${escapeHtml(item.status)}">
          <div>
            <strong>${escapeHtml(item.name)}</strong>
            <small>${escapeHtml(item.summary)}</small>
          </div>
          <span class="pill ${escapeHtml(item.status)}">${escapeHtml(item.label)}</span>
        </article>
      `
    )
    .join("");
}

function pingDueReminders(reminders) {
  if (!("Notification" in window)) {
    els.notifyStatus.textContent = "Browser only";
    return;
  }

  if (Notification.permission !== "granted") {
    els.notifyStatus.textContent = "Browser only";
    return;
  }

  const today = todayKey();
  let changed = false;
  for (const reminder of reminders) {
    if (reminder.status === "on-track") continue;
    const asset = state.assets.find((item) => item.id === reminder.id);
    if (!asset || asset.lastReminderPing === today) continue;

    new Notification("AdminPilot reminder", {
      body: `${asset.name}: ${asset.due}`,
    });
    asset.lastReminderPing = today;
    changed = true;
  }

  els.notifyStatus.textContent = "Enabled";
  if (changed) {
    saveState(state);
  }
}

async function enableNotifications() {
  if (!("Notification" in window)) {
    els.notifyStatus.textContent = "Unsupported";
    return;
  }

  const permission = await Notification.requestPermission();
  els.notifyStatus.textContent = permission === "granted" ? "Enabled" : "Blocked";
}

function renderAttachmentChips(attachments = []) {
  if (!attachments.length) return "";
  return `
    <div class="attachment-list">
      ${attachments
        .map(
          (attachment, index) => `
            <a class="attachment-chip" href="${escapeHtml(attachment.dataUrl)}" download="${escapeHtml(attachment.name)}">
              ${index + 1}. ${escapeHtml(attachment.name)}
            </a>
          `
        )
        .join("")}
    </div>
  `;
}

function renderAssets() {
  if (!state.assets.length) {
    els.assetList.innerHTML =
      "<div class='asset empty'><strong>No assets yet</strong><small>Add a vehicle, home item, or document to get started.</small></div>";
    return;
  }

  els.assetList.innerHTML = state.assets
    .map((asset) => {
      const badge = asset.type === "Vehicle" && asset.vin ? "VIN linked" : asset.type;
      const attachmentCount = Array.isArray(asset.attachments) ? asset.attachments.length : 0;
      return `
        <article class="asset ${asset.status || "on-track"}">
          <div class="asset-top">
            <div>
              <strong>${escapeHtml(asset.name)}</strong>
              <small>${escapeHtml(asset.note || "No notes added.")}</small>
            </div>
            <span class="pill">${escapeHtml(badge)}</span>
          </div>
          <div class="asset-status-row">
            <span class="status ${escapeHtml(asset.status || "on-track")}">${escapeHtml(formatStatus(asset.status))}</span>
            <span class="status-meta">${attachmentCount} attachment${attachmentCount === 1 ? "" : "s"}</span>
          </div>
          <div class="asset-meta">
            <span>${escapeHtml(asset.due || "No status")}</span>
            <span>${escapeHtml(asset.vin || "No VIN")}</span>
          </div>
          <div class="asset-meta">
            <span>Reminder: ${escapeHtml(formatDateLabel(asset.reminderDate))}</span>
            <span>Repeat: ${escapeHtml(String(asset.repeatEveryDays || 0))} days</span>
          </div>
          ${renderAttachmentChips(asset.attachments)}
          ${asset.consequence ? `<p class="asset-consequence">${escapeHtml(asset.consequence)}</p>` : ""}
          <div class="asset-actions">
            <button type="button" class="secondary" data-edit-id="${escapeHtml(asset.id)}">Edit</button>
            <button type="button" class="secondary danger" data-delete-id="${escapeHtml(asset.id)}">Delete</button>
          </div>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll("[data-edit-id]").forEach((button) => {
    button.addEventListener("click", () => openAssetDialog(button.dataset.editId));
  });
  document.querySelectorAll("[data-delete-id]").forEach((button) => {
    button.addEventListener("click", () => deleteAsset(button.dataset.deleteId));
  });
}

function openAssetDialog(id) {
  const asset = state.assets.find((item) => item.id === id);
  if (!asset) return;

  els.assetDialogId.value = asset.id;
  els.editAssetName.value = asset.name || "";
  els.editAssetType.value = asset.type || "Vehicle";
  els.editAssetStatus.value = asset.status || "on-track";
  els.editAssetVin.value = asset.vin || "";
  els.editAssetDue.value = asset.due || "";
  els.editAssetReminder.value = asset.reminderDate || "";
  els.editAssetRepeat.value = asset.repeatEveryDays || "";
  els.editAssetNote.value = asset.note || "";
  els.editAssetConsequence.value = asset.consequence || "";
  els.assetDialog.showModal();
}

function closeAssetDialog() {
  if (els.assetDialog.open) {
    els.assetDialog.close();
  }
}

function saveEditedAsset(event) {
  event.preventDefault();
  const id = els.assetDialogId.value;
  const index = state.assets.findIndex((item) => item.id === id);
  if (index < 0) return;

  state.assets[index] = {
    ...state.assets[index],
    name: els.editAssetName.value.trim(),
    type: els.editAssetType.value,
    status: els.editAssetStatus.value,
    vin: normalizeVin(els.editAssetVin.value),
    due: els.editAssetDue.value.trim(),
    reminderDate: els.editAssetReminder.value || "",
    repeatEveryDays: Number(els.editAssetRepeat.value) || 0,
    note: els.editAssetNote.value.trim(),
    consequence: els.editAssetConsequence.value.trim(),
  };
  saveState(state);
  render();
  closeAssetDialog();
}

function deleteAsset(id) {
  const asset = state.assets.find((item) => item.id === id);
  if (!asset) return;
  if (!confirm(`Delete ${asset.name}?`)) return;

  state.assets = state.assets.filter((item) => item.id !== id);
  saveState(state);
  render();
}

async function decodeVin(vinInput) {
  const vin = normalizeVin(vinInput);
  if (vin.length !== 17) {
    setStatus("Enter a 17-character VIN", "error");
    return null;
  }

  setStatus("Decoding VIN...", "loading");
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${encodeURIComponent(vin)}?format=json`
  );

  if (!response.ok) {
    throw new Error("VIN lookup failed");
  }

  const data = await response.json();
  const results = Array.isArray(data.Results) ? data.Results : [];
  const vehicle = {
    vin,
    year: getDecodedField(results, "Model Year"),
    make: getDecodedField(results, "Make"),
    model: getDecodedField(results, "Model"),
    trim: getDecodedField(results, "Trim"),
    bodyClass: getDecodedField(results, "Body Class"),
    driveType: getDecodedField(results, "Drive Type"),
    plantCity: getDecodedField(results, "Plant City"),
  };

  state.lastDecodedVehicle = vehicle;
  state.lastLookup = vin;
  saveState(state);
  render();
  setStatus("VIN decoded", "success");
  return vehicle;
}

async function loadRecallsForVehicle(vehicle) {
  if (!vehicle?.make || !vehicle?.model || !vehicle?.year) {
    setStatus("Decode VIN first", "error");
    return;
  }

  setStatus("Loading recalls...", "loading");
  const url = new URL("https://api.nhtsa.gov/recalls/recallsByVehicle");
  url.searchParams.set("make", vehicle.make);
  url.searchParams.set("model", vehicle.model);
  url.searchParams.set("modelYear", vehicle.year);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Recall lookup failed");
  }

  const data = await response.json();
  const results = Array.isArray(data?.results) ? data.results : Array.isArray(data?.Results) ? data.Results : [];
  state.recalls = results.map((item) => ({
    component: item.Component || item.component || "Unknown component",
    summary: item.Summary || item.summary || item.Notes || "No summary available.",
  }));
  saveState(state);
  render();
  setStatus(state.recalls.length ? "Recalls loaded" : "No recalls found", state.recalls.length ? "warning" : "success");
}

async function addAssetFromForm(event) {
  event.preventDefault();
  const name = els.assetName.value.trim();
  const type = els.assetType.value;
  const status = els.assetStatus.value;
  const vin = normalizeVin(els.assetVin.value);
  const due = els.assetDue.value.trim();
  const reminderDate = els.assetReminder.value || "";
  const repeatEveryDays = Number(els.assetRepeat.value) || 0;
  const note = els.assetNote.value.trim();
  const consequence = els.assetConsequence.value.trim();
  const file = els.assetFile.files?.[0] || null;

  if (!name || !due) {
    return;
  }

  const attachments = [];
  if (file) {
    attachments.push({
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      dataUrl: await fileToDataUrl(file),
    });
  }

  const asset = {
    id: crypto.randomUUID(),
    name,
    type,
    status,
    vin,
    due,
    reminderDate,
    repeatEveryDays,
    note,
    consequence,
    attachments,
    createdAt: new Date().toISOString(),
  };

  state.assets = [asset, ...state.assets];
  saveState(state);
  render();
  event.target.reset();
  els.assetType.value = "Vehicle";
  els.assetStatus.value = "on-track";
  els.assetName.focus();
}

function addSampleData() {
  state.assets = [...createSampleAssets(), ...state.assets];
  saveState(state);
  render();
}

function clearData() {
  if (!confirm("Clear all AdminPilot local data?")) {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  state = cloneDefaultState();
  render();
  setStatus("Idle");
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "adminpilot-backup.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

async function importData(file) {
  const text = await file.text();
  const parsed = JSON.parse(text);
  state = {
    ...DEFAULT_STATE,
    ...parsed,
    assets: Array.isArray(parsed?.assets) ? parsed.assets : [],
    recalls: Array.isArray(parsed?.recalls) ? parsed.recalls : [],
  };
  saveState(state);
  render();
}

els.assetForm.addEventListener("submit", addAssetFromForm);
els.addSample.addEventListener("click", addSampleData);
els.clearData.addEventListener("click", clearData);
els.exportData.addEventListener("click", exportData);
els.importFile.addEventListener("change", async () => {
  const file = els.importFile.files?.[0];
  if (!file) return;
  try {
    await importData(file);
    setStatus("Backup imported", "success");
  } catch {
    setStatus("Import failed", "error");
  } finally {
    els.importFile.value = "";
  }
});

els.assetDialogForm.addEventListener("submit", saveEditedAsset);
els.assetDialogClose.addEventListener("click", closeAssetDialog);
els.assetDialogDelete.addEventListener("click", () => {
  const id = els.assetDialogId.value;
  closeAssetDialog();
  deleteAsset(id);
});

els.notifyEnable.addEventListener("click", enableNotifications);

els.decodeVin.addEventListener("click", async () => {
  try {
    const vehicle = await decodeVin(els.vinInput.value);
    if (vehicle) {
      els.assetVin.value = vehicle.vin;
      els.assetName.value = `${prettyValue(vehicle.year)} ${prettyValue(vehicle.make)} ${prettyValue(vehicle.model)}`.trim();
      els.assetDue.value = "Recall check complete";
      els.assetNote.value = "Vehicle details decoded from NHTSA.";
      els.assetReminder.value = isoDateOffset(7);
    }
  } catch (error) {
    console.error(error);
    setStatus("VIN lookup failed", "error");
  }
});

els.loadRecalls.addEventListener("click", async () => {
  try {
    const vehicle = state.lastDecodedVehicle || (await decodeVin(els.vinInput.value));
    await loadRecallsForVehicle(vehicle);
  } catch (error) {
    console.error(error);
    setStatus("Recall lookup failed", "error");
  }
});

els.fillVin.addEventListener("click", async () => {
  const vin = normalizeVin(els.assetVin.value || els.vinInput.value);
  if (!vin) {
    setStatus("Enter a VIN first", "error");
    return;
  }
  els.vinInput.value = vin;
  try {
    const vehicle = await decodeVin(vin);
    if (vehicle) {
      await loadRecallsForVehicle(vehicle);
    }
  } catch (error) {
    console.error(error);
    setStatus("VIN flow failed", "error");
  }
});

els.vinInput.addEventListener("input", () => {
  const normalized = normalizeVin(els.vinInput.value);
  if (normalized !== els.vinInput.value) {
    els.vinInput.value = normalized;
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Offline support is optional in local file testing.
    });
  });
}

setInterval(() => {
  render();
}, 60000);

render();
setStatus("Idle");
