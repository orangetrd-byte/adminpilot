import json
path = r"C:\Users\Dad\Documents\GitHub\adminpilot\outputs\PHASE2.5-VARIANT-SPLITS.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

before = len(data.get("retired_ids", []))
data["retired_ids"] = [x for x in data.get("retired_ids", []) if x not in {
    "chevrolet_tahoe_suburban_2021",
    "gmc_yukon_yukon_xl_2021",
}]

with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

after = len(data["retired_ids"])
print(f"retired_ids trimmed: {before} -> {after}")
