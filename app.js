const STORAGE_KEY = "adminpilot.state.v1";
const DEFAULT_STATE = {
  assets: [],
  lastDecodedVehicle: null,
  recalls: [],
  lastLookup: "",
};

function cloneDefaultState() {
  return {
    assets: [],
    lastDecodedVehicle: null,
    recalls: [],
    lastLookup: "",
  };
}

function createSampleAssets() {
  const createdAt = new Date().toISOString();
  return [
    {
      id: crypto.randomUUID(),
      name: "2019 Ford F-150",
      type: "Vehicle",
      vin: "1FTFW1E5XJFA00000",
      due: "Oil change due in 320 miles",
      note: "Track service before road trip.",
      createdAt,
    },
    {
      id: crypto.randomUUID(),
      name: "Home warranty",
      type: "Document",
      vin: "",
      due: "Renewal in 42 days",
      note: "Store policy number and contact details.",
      createdAt,
    },
  ];
}

const els = {
  assetForm: document.getElementById("asset-form"),
  assetName: document.getElementById("asset-name"),
  assetType: document.getElementById("asset-type"),
  assetVin: document.getElementById("asset-vin"),
  assetDue: document.getElementById("asset-due"),
  assetNote: document.getElementById("asset-note"),
  assetList: document.getElementById("asset-list"),
  assetCount: document.getElementById("asset-count"),
  vehicleCount: document.getElementById("vehicle-count"),
  recallCount: document.getElementById("recall-count"),
  vehicleCard: document.getElementById("vehicle-card"),
  recallCard: document.getElementById("recall-card"),
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

function setStatus(text, tone = "") {
  els.vinStatus.textContent = text;
  els.vinStatus.dataset.tone = tone;
}

function render() {
  const assets = state.assets;
  const vehicles = assets.filter((asset) => asset.type === "Vehicle").length;
  const recalls = state.recalls.length;

  els.assetCount.textContent = String(assets.length);
  els.vehicleCount.textContent = String(vehicles);
  els.recallCount.textContent = String(recalls);

  renderVehicleCard();
  renderRecallCard();
  renderAssets();
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

function renderAssets() {
  if (!state.assets.length) {
    els.assetList.innerHTML =
      "<div class='asset empty'><strong>No assets yet</strong><small>Add a vehicle, home item, or document to get started.</small></div>";
    return;
  }

  els.assetList.innerHTML = state.assets
    .map((asset) => {
      const badge = asset.type === "Vehicle" && asset.vin ? "VIN linked" : asset.type;
      return `
        <article class="asset">
          <div class="asset-top">
            <div>
              <strong>${escapeHtml(asset.name)}</strong>
              <small>${escapeHtml(asset.note || "No notes added.")}</small>
            </div>
            <span class="pill">${escapeHtml(badge)}</span>
          </div>
          <div class="asset-meta">
            <span>${escapeHtml(asset.due || "No status")}</span>
            <span>${escapeHtml(asset.vin || "No VIN")}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getDecodedField(results, fieldName) {
  const match = results.find((item) => item.Variable === fieldName);
  const value = match?.Value;
  return value && String(value).trim() ? String(value).trim() : "";
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

function addAssetFromForm(event) {
  event.preventDefault();
  const name = els.assetName.value.trim();
  const type = els.assetType.value;
  const vin = normalizeVin(els.assetVin.value);
  const due = els.assetDue.value.trim();
  const note = els.assetNote.value.trim();

  if (!name || !due) {
    return;
  }

  const asset = {
    id: crypto.randomUUID(),
    name,
    type,
    vin,
    due,
    note,
    createdAt: new Date().toISOString(),
  };

  state.assets = [asset, ...state.assets];
  saveState(state);
  render();
  event.target.reset();
  els.assetType.value = "Vehicle";
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

els.decodeVin.addEventListener("click", async () => {
  try {
    const vehicle = await decodeVin(els.vinInput.value);
    if (vehicle) {
      els.assetVin.value = vehicle.vin;
      els.assetName.value = `${prettyValue(vehicle.year)} ${prettyValue(vehicle.make)} ${prettyValue(vehicle.model)}`.trim();
      els.assetDue.value = "Recall check complete";
      els.assetNote.value = "Vehicle details decoded from NHTSA.";
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

render();
setStatus("Idle");
