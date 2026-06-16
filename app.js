const STORAGE_KEY = "adminpilot.assets";

const sampleAsset = {
  name: "2019 Ford F-150",
  type: "Vehicle",
  note: "Oil change due in 320 miles",
};

function loadAssets() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveAssets(assets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
}

function render() {
  const assets = loadAssets();
  const list = document.getElementById("asset-list");
  const count = document.getElementById("asset-count");

  count.textContent = String(assets.length);
  list.innerHTML = "";

  if (!assets.length) {
    list.innerHTML = "<div class='asset'><strong>No assets yet</strong><small>Add a sample asset to start.</small></div>";
    return;
  }

  for (const asset of assets) {
    const item = document.createElement("article");
    item.className = "asset";
    item.innerHTML = `<strong>${asset.name}</strong><small>${asset.type} · ${asset.note}</small>`;
    list.appendChild(item);
  }
}

document.getElementById("add-sample").addEventListener("click", () => {
  const assets = loadAssets();
  assets.unshift(sampleAsset);
  saveAssets(assets);
  render();
});

document.getElementById("clear-data").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  render();
});

render();

