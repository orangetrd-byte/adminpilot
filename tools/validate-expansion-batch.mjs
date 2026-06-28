import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const batchDir = path.resolve(
  process.argv[2] || "adminpilot-data/expansion-batch-01",
);
const allowedSeverity = new Set(["critical", "high", "medium", "low"]);
const requiredFields = [
  "id",
  "year",
  "make",
  "model",
  "source",
  "source_url",
  "maintenance",
  "production_ready",
  "source_confidence",
  "review_status",
];

const failures = [];
const recordFiles = fs
  .readdirSync(batchDir)
  .filter((name) => name.endsWith(".json") && name !== "manifest.json")
  .sort();
const records = [];

for (const file of recordFiles) {
  const fullPath = path.join(batchDir, file);
  let record;
  try {
    record = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  } catch (error) {
    failures.push(`${file}: invalid JSON (${error.message})`);
    continue;
  }

  if (!record || Array.isArray(record) || typeof record !== "object") {
    failures.push(`${file}: top-level value must be one vehicle object`);
    continue;
  }

  for (const field of requiredFields) {
    if (!(field in record)) failures.push(`${file}: missing ${field}`);
  }

  if (record.production_ready !== false) {
    failures.push(`${file}: review batches must keep production_ready=false`);
  }
  if (record.review_status !== "candidate") {
    failures.push(`${file}: review_status must be "candidate"`);
  }
  if (!Number.isInteger(record.year) || record.year < 1900 || record.year > 2100) {
    failures.push(`${file}: invalid year`);
  }
  if (!Array.isArray(record.maintenance) || record.maintenance.length === 0) {
    failures.push(`${file}: maintenance must be a non-empty array`);
  } else {
    record.maintenance.forEach((item, index) => {
      const label = `${file}: maintenance[${index}]`;
      if (!item?.service || typeof item.service !== "string") {
        failures.push(`${label}: missing service`);
      }
      if (!item?.interval || typeof item.interval !== "object") {
        failures.push(`${label}: missing interval`);
      } else {
        for (const key of ["miles", "months"]) {
          const value = item.interval[key];
          if (
            value !== null &&
            (!Number.isInteger(value) || value < 0)
          ) {
            failures.push(`${label}: ${key} must be null or a non-negative integer`);
          }
        }
        if (!item.interval.logic || typeof item.interval.logic !== "string") {
          failures.push(`${label}: missing interval.logic`);
        }
      }
      if (!allowedSeverity.has(item?.severity)) {
        failures.push(`${label}: invalid severity`);
      }
    });
  }
  records.push({ file, record });
}

const ids = new Map();
for (const { file, record } of records) {
  if (ids.has(record.id)) {
    failures.push(`${file}: duplicate id also used by ${ids.get(record.id)}`);
  } else {
    ids.set(record.id, file);
  }
}

const manifestPath = path.join(batchDir, "manifest.json");
let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
} catch (error) {
  failures.push(`manifest.json: invalid or missing (${error.message})`);
}

if (manifest) {
  const listed = (manifest.records || []).map((entry) => entry.file).sort();
  if (JSON.stringify(listed) !== JSON.stringify(recordFiles)) {
    failures.push("manifest.json: record list does not match JSON files on disk");
  }
  if (manifest.total_records !== recordFiles.length) {
    failures.push("manifest.json: total_records does not match files on disk");
  }
  if (manifest.production_ready_overall !== false) {
    failures.push("manifest.json: production_ready_overall must be false");
  }
}

if (failures.length) {
  console.error(`Expansion batch validation failed (${failures.length} issue(s)):\n`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Expansion batch validation passed: ${recordFiles.length} candidate records, all non-production.`,
);
