import json

# Read the current Phase 2.5 file
path = r"C:\Users\Dad\Documents\GitHub\adminpilot\outputs\PHASE2.5-VARIANT-SPLITS.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Helper to make a new vehicle dict
def make_vehicle(rank, vid, year, make, model, trim, engine, transmission, driveType, source, source_url, maintenance, applicability, validation_flags, production_ready=False, source_confidence="needs_table_verification"):
    return {
        "rank": rank,
        "id": vid,
        "year": year,
        "make": make,
        "model": model,
        "trim": trim,
        "engine": engine,
        "transmission": transmission,
        "driveType": driveType,
        "source": source,
        "source_url": source_url,
        "maintenance": maintenance,
        "applicability": applicability,
        "validation_flags": validation_flags,
        "production_ready": production_ready,
        "source_confidence": source_confidence,
    }

# Start rank from current max + 1
current_ranks = [int(v["rank"]) for v in data["vehicles"]]
next_rank = max(current_ranks) + 1

# Shared maintenance skeleton
def base_skeleton():
    return [
        {
            "service": "Engine oil and filter change",
            "interval": {"miles": 5000, "months": None, "logic": "normal-use oil-life monitor guidance"},
            "severity": "critical",
            "notes": "Do not exceed manufacturer maximum interval. Confirm exact miles/months from official manual."
        },
        {
            "service": "Tire rotation, wear inspection, and tread depth measurement",
            "interval": {"miles": 5000, "months": None, "logic": "perform at each oil change interval"},
            "severity": "high",
            "notes": "Inspect pressure, wear, and tread depth."
        },
        {
            "service": "Brake system inspection",
            "interval": {"miles": 5000, "months": None, "logic": "perform at each oil change interval"},
            "severity": "high",
            "notes": "Inspect pads, shoes, rotors, drums, linings, hoses, parking brake, and fluid level."
        },
        {
            "service": "Engine air filter replacement",
            "interval": {"miles": 30000, "months": None, "logic": "fixed interval"},
            "severity": "medium",
            "notes": "Replace more frequently in dusty conditions."
        },
        {
            "service": "Cabin air filter replacement",
            "interval": {"miles": 30000, "months": None, "logic": "fixed interval"},
            "severity": "medium",
            "notes": "Inspect or replace per severe-use conditions as outlined in the maintenance specifications."
        },
        {
            "service": "Brake fluid change",
            "interval": {"miles": None, "months": 24, "logic": "time-based severe-use conditional"},
            "severity": "high",
            "notes": "Conditional severe-use item; normal intervals are mileage based. Confirm from official manual."
        },
    ]

# Keep a simple count
added = 0

# RAM 1500
data["vehicles"].append(make_vehicle(
    next_rank,
    "ram_1500_2021_gas",
    2021,
    "Ram",
    "1500",
    "Gasoline",
    "5.7L V8 / 3.6L V6",
    "Automatic",
    "2WD or 4WD",
    "2021 Ram 1500 Owner's Manual",
    "https://www.ramtrucks.com/owners/manuals.html",
    base_skeleton() + [
        {
            "service": "Automatic transmission fluid service",
            "interval": {"miles": 60000, "months": None, "logic": "inspect/replace per automatic transmission guidance"},
            "severity": "medium",
            "notes": "Gasoline powertrain only."
        }
    ],
    {"drive_type": "2WD_OR_4WD", "transmission": "automatic", "engine": "gasoline", "powertrain": "gasoline"},
    ["Split from ram_1500_2021.", "Separate EcoDiesel and eTorque records will be added if their schedules differ."],
    source_confidence="needs_table_verification",
))
next_rank += 1
added += 1

data["vehicles"].append(make_vehicle(
    next_rank,
    "ram_1500_2021_ecodiesel",
    2021,
    "Ram",
    "1500",
    "EcoDiesel",
    "3.0L inline-6 turbodiesel",
    "Automatic",
    "4WD",
    "2021 Ram 1500 Diesel Supplement",
    "source URL to be confirmed",
    base_skeleton() + [
        {
            "service": "Diesel exhaust fluid service",
            "interval": {"miles": 7500, "months": None, "logic": "fixed interval"},
            "severity": "high",
            "notes": "Diesel-specific requirement."
        }
    ],
    {"drive_type": "4WD", "transmission": "automatic", "engine": "3.0L diesel", "powertrain": "diesel"},
    ["Split from ram_1500_2021.", "Created because diesel maintenance items differ from gasoline."],
    source_confidence="needs_table_verification",
))
next_rank += 1
added += 1

data["vehicles"].append(make_vehicle(
    next_rank,
    "ram_1500_2021_etorque",
    2021,
    "Ram",
    "1500",
    "eTorque",
    "3.6L V6 eTorque mild hybrid",
    "Automatic",
    "2WD or 4WD",
    "2021 Ram 1500 Owner's Manual",
    "source URL to be confirmed",
    base_skeleton() + [
        {
            "service": "eTorque battery and module check",
            "interval": {"miles": 60000, "months": None, "logic": "inspect per eTorque guidance"},
            "severity": "medium",
            "notes": "eTorque mild hybrid equipment only."
        }
    ],
    {"drive_type": "2WD_OR_4WD", "transmission": "automatic", "engine": "3.6L eTorque", "powertrain": "hybrid"},
    ["Split from ram_1500_2021.", "Created because eTorque adds hybrid-specific service expectations."],
    source_confidence="needs_table_verification",
))
next_rank += 1
added += 1

# JEEP WRANGLER 2020
jeep_wrangler_variants = [
    ("20l_auto", "2.0L turbo", "Automatic", "2WD or 4WD", "gasoline"),
    ("36l_auto", "3.6L V6", "Automatic", "2WD or 4WD", "gasoline"),
    ("36l_manual", "3.6L V6", "Manual", "2WD or 4WD", "gasoline"),
    ("36l_diesel", "3.0L EcoDiesel", "Automatic", "4WD", "diesel"),
]
for suffix, engine, transmission, drive, fuel in jeep_wrangler_variants:
    data["vehicles"].append(make_vehicle(
        next_rank,
        f"jeep_wrangler_2020_{suffix}",
        2020,
        "Jeep",
        "Wrangler",
        engine,
        engine,
        transmission,
        drive,
        "2020 Jeep Wrangler Owner's Manual",
        "https://www.jeep.com/warranty-and-owner-info.html",
        base_skeleton() + ([
            {
                "service": "Manual transmission fluid service",
                "interval": {"miles": 60000, "months": None, "logic": "manual transmission guidance"},
                "severity": "medium",
                "notes": "Manual transmission variant only."
            }
        ] if transmission == "Manual" else []) + ([
            {
                "service": "Transfer case fluid change",
                "interval": {"miles": 60000, "months": None, "logic": "4WD only"},
                "severity": "medium",
                "notes": "4WD Rubicon and other 4WD variants only."
            },
            {
                "service": "Diesel exhaust fluid service",
                "interval": {"miles": 7500, "months": None, "logic": "diesel-specific interval"},
                "severity": "high",
                "notes": "Diesel variant only."
            }
        ] if fuel == "diesel" else []),
        {"drive_type": drive.replace(" or ", "_OR_"), "transmission": transmission.lower(), "engine": engine.lower(), "powertrain": fuel},
        [f"Split from jeep_wrangler_2020 ({suffix})."],
        source_confidence="needs_table_verification",
    ))
    next_rank += 1
    added += 1

# JEEP GRAND CHEROKEE 2021
gen_splits = [
    ("grand_cherokee_2021_wk2_v6", "WK2", "3.6L V6", "Automatic", "2WD or 4WD", "gasoline"),
    ("grand_cherokee_2021_wk2_v8", "WK2", "5.7L V8", "Automatic", "4WD", "gasoline"),
    ("grand_cherokee_2021_wk2_srt", "WK2", "6.4L V8 SRT", "Automatic", "4WD", "gasoline"),
    ("grand_cherokee_2021_wk2_trackhawk", "WK2", "6.2L V8 Trackhawk", "Automatic", "4WD", "gasoline"),
    ("grand_cherokee_2021_wk2_diesel", "WK2", "3.0L V6 diesel", "Automatic", "4WD", "diesel"),
    ("grand_cherokee_2021_l_v6", "L", "3.6L V6", "Automatic", "2WD or 4WD", "gasoline"),
    ("grand_cherokee_2021_l_4xe", "L", "2.0L 4xe", "Automatic", "4WD AWD", "hybrid"),
]
for suffix, generation, engine, transmission, drive, fuel in gen_splits:
    data["vehicles"].append(make_vehicle(
        next_rank,
        f"jeep_grand_cherokee_2021_{suffix}",
        2021,
        "Jeep",
        "Grand Cherokee",
        f"{generation} {engine}",
        engine,
        transmission,
        drive,
        "2021 Jeep Grand Cherokee Owner's Manual",
        "source URL to be confirmed",
        base_skeleton() + ([
            {"service": "Trackhawk high-performance brakes", "interval": {"miles": 15000, "months": None, "logic": "high-performance variant"}, "severity": "high", "notes": "Trackhawk brake wear is higher than standard V6/V8."}
        ] if "trackhawk" in suffix.lower() else []) + ([
            {"service": "Diesel exhaust fluid service", "interval": {"miles": 7500, "months": None, "logic": "diesel-specific interval"}, "severity": "high", "notes": "Diesel variant only."}
        ] if fuel == "diesel" else []) + ([
            {"service": "High-voltage battery and inverter check", "interval": {"miles": 60000, "months": None, "logic": "hybrid-specific guidance"}, "severity": "medium", "notes": "4xe hybrid variant only."}
        ] if fuel == "hybrid" else []),
        {"drive_type": drive.replace(" or ", "_OR_"), "transmission": transmission.lower(), "engine": engine.lower(), "powertrain": fuel},
        [f"Split from jeep_grand_cherokee_2021 ({suffix})."],
        source_confidence="needs_table_verification",
    ))
    next_rank += 1
    added += 1

# KIA SPORTAGE 2021
data["vehicles"].append(make_vehicle(
    next_rank,
    "kia_sportage_2021_24l",
    2021,
    "Kia",
    "Sportage",
    "2.4L",
    "2.4L 4-cylinder",
    "Automatic",
    "FWD or AWD",
    "2021 Kia Sportage Owner's Manual",
    "source URL to be confirmed",
    base_skeleton(),
    {"drive_type": "FWD_OR_AWD", "transmission": "automatic", "engine": "2.4L inline-4", "powertrain": "gasoline"},
    ["Split from kia_sportage_2021."],
    source_confidence="needs_table_verification",
))
next_rank += 1
added += 1

data["vehicles"].append(make_vehicle(
    next_rank,
    "kia_sportage_2021_16t",
    2021,
    "Kia",
    "Sportage",
    "2.0T",
    "2.0T 4-cylinder",
    "Automatic",
    "FWD or AWD",
    "2021 Kia Sportage Owner's Manual",
    "source URL to be confirmed",
    base_skeleton(),
    {"drive_type": "FWD_OR_AWD", "transmission": "automatic", "engine": "2.0T turbo inline-4", "powertrain": "gasoline"},
    ["Split from kia_sportage_2021."],
    source_confidence="needs_table_verification",
))
next_rank += 1
added += 1

# KIA SELTOS 2021
data["vehicles"].append(make_vehicle(
    next_rank,
    "kia_seltos_2021_20ivt",
    2021,
    "Kia",
    "Seltos",
    "2.0L IVT",
    "2.0L 4-cylinder",
    "IVT",
    "FWD or AWD",
    "2021 Kia Seltos Owner's Manual",
    "source URL to be confirmed",
    base_skeleton(),
    {"drive_type": "FWD_OR_AWD", "transmission": "ivt", "engine": "2.0L inline-4", "powertrain": "gasoline"},
    ["Split from kia_seltos_2021."],
    source_confidence="needs_table_verification",
))
next_rank += 1
added += 1

data["vehicles"].append(make_vehicle(
    next_rank,
    "kia_seltos_2021_16dct",
    2021,
    "Kia",
    "Seltos",
    "1.6T DCT",
    "1.6T turbo 4-cylinder",
    "DCT",
    "FWD or AWD",
    "2021 Kia Seltos Owner's Manual",
    "source URL to be confirmed",
    base_skeleton() + [
        {
            "service": "Dual-clutch transmission fluid service",
            "interval": {"miles": 60000, "months": None, "logic": "DCT-specific guidance"},
            "severity": "medium",
            "notes": "1.6T DCT variant only; validate severe-use rules separately."
        }
    ],
    {"drive_type": "FWD_OR_AWD", "transmission": "dct", "engine": "1.6T turbo inline-4", "powertrain": "gasoline"},
    ["Split from kia_seltos_2021.", "DCT-fluid severe-use rules should be validated separately."],
    source_confidence="needs_table_verification",
))
next_rank += 1
added += 1

# KIA FORTE 2020
data["vehicles"].append(make_vehicle(
    next_rank,
    "kia_forte_2020_20l",
    2020,
    "Kia",
    "Forte",
    "2.0L",
    "2.0L 4-cylinder",
    "IVT",
    "FWD",
    "2020 Kia Forte Owner's Manual",
    "source URL to be confirmed",
    base_skeleton(),
    {"drive_type": "FWD_ONLY", "transmission": "ivt", "engine": "2.0L inline-4", "powertrain": "gasoline"},
    ["Split from kia_forte_2020."],
    source_confidence="needs_table_verification",
))
next_rank += 1
added += 1

data["vehicles"].append(make_vehicle(
    next_rank,
    "kia_forte_2020_16gt",
    2020,
    "Kia",
    "Forte",
    "1.6T GT",
    "1.6T turbo 4-cylinder",
    "IVT / DCT depending on market",
    "FWD",
    "2020 Kia Forte GT Owner's Manual details",
    "source URL to be confirmed",
    base_skeleton(),
    {"drive_type": "FWD_ONLY", "transmission": "ivt_or_dct", "engine": "1.6T turbo inline-4", "powertrain": "gasoline"},
    ["Split from kia_forte_2020.", "GT powertrain may use different clutch/fluid intervals."],
    source_confidence="needs_table_verification",
))
next_rank += 1
added += 1

# DODGE DURANGO 2021
durango_variants = [
    ("v6", "3.6L V6", "gasoline"),
    ("57l", "5.7L V8", "gasoline"),
    ("srt64l", "6.4L V8 SRT", "gasoline"),
    ("hellcat", "6.2L V8 Hellcat", "gasoline"),
]
for suffix, engine, fuel in durango_variants:
    data["vehicles"].append(make_vehicle(
        next_rank,
        f"dodge_durango_2021_{suffix}",
        2021,
        "Dodge",
        "Durango",
        engine,
        engine,
        "Automatic",
        "2WD or 4WD",
        "2021 Dodge Durango Owner's Manual",
        "source URL to be confirmed",
        base_skeleton(),
        {"drive_type": "2WD_OR_4WD", "transmission": "automatic", "engine": engine.lower(), "powertrain": fuel},
        [f"Split from dodge_durango_2021 ({suffix})."],
        source_confidence="needs_table_verification",
    ))
    next_rank += 1
    added += 1

# CHRYSLER PACIFICA / VOYAGER 2021
chrysler_variants = [
    ("pacifica_gas", "Pacifica", "3.6L V6 gasoline"),
    ("pacifica_hybrid", "Pacifica Hybrid", "3.6L V6 hybrid"),
    ("voyager", "Voyager", "3.6L V6 gasoline"),
]
for suffix, trim, engine in chrysler_variants:
    data["vehicles"].append(make_vehicle(
        next_rank,
        f"chrysler_pacifica_voyager_2021_{suffix}",
        2021,
        "Chrysler",
        trim if "voyager" in suffix else "Pacifica",
        trim,
        engine,
        "Automatic",
        "FWD",
        "2021 Chrysler Pacifica/Voyager Owner's Manual",
        "source URL to be confirmed",
        base_skeleton() + ([
            {"service": "Hybrid battery and inverter check", "interval": {"miles": 60000, "months": None, "logic": "hybrid-specific guidance"}, "severity": "medium", "notes": "Pacifica Hybrid only."}
        ] if "hybrid" in suffix else []),
        {"drive_type": "FWD_ONLY", "transmission": "automatic", "engine": engine.lower(), "powertrain": "hybrid" if "hybrid" in suffix else "gasoline"},
        [f"Split from chrysler_pacifica_voyager_2021 ({suffix})."],
        source_confidence="needs_table_verification",
    ))
    next_rank += 1
    added += 1

# HYUNDAI KONA 2021
hyundai_kona_variants = [
    ("gas_20", "2.0L automatic", "gasoline"),
    ("gas_16t", "1.6T DCT", "gasoline"),
    ("electric", "Electric", "electric"),
]
for suffix, engine_desc, fuel in hyundai_kona_variants:
    data["vehicles"].append(make_vehicle(
        next_rank,
        f"hyundai_kona_2021_{suffix}",
        2021,
        "Hyundai",
        "Kona",
        engine_desc,
        engine_desc,
        "Automatic" if "automatic" in engine_desc or fuel == "electric" else "DCT",
        "FWD",
        "2021 Hyundai Kona Owner's Manual",
        "source URL to be confirmed",
        base_skeleton() + ([
            {"service": "High-voltage battery coolant and conditioning check", "interval": {"miles": None, "months": 12, "logic": "EV-specific guidance"}, "severity": "critical", "notes": "Electric variant only."}
        ] if fuel == "electric" else []),
        {"drive_type": "FWD_ONLY", "transmission": "automatic" if "automatic" in engine_desc or fuel == "electric" else "dct", "engine": engine_desc.lower(), "powertrain": fuel},
        [f"Split from hyundai_kona_2021 ({suffix})."],
        source_confidence="needs_table_verification",
    ))
    next_rank += 1
    added += 1

# BMW X5 2020
data["vehicles"].append(make_vehicle(
    next_rank,
    "bmw_x5_2020_sdrive40i",
    2020,
    "BMW",
    "X5",
    "sDrive40i",
    "3.0L inline-6 turbo",
    "Automatic",
    "RWD",
    "2020 BMW X5 Owner's Manual",
    "source URL to be confirmed",
    base_skeleton(),
    {"drive_type": "RWD", "transmission": "automatic", "engine": "3.0L inline-6 turbo", "powertrain": "gasoline"},
    ["Split from bmw_x5_2020."],
    source_confidence="needs_table_verification",
))
next_rank += 1
added += 1

data["vehicles"].append(make_vehicle(
    next_rank,
    "bmw_x5_2020_xdrive40i",
    2020,
    "BMW",
    "X5",
    "xDrive40i",
    "3.0L inline-6 turbo",
    "Automatic",
    "AWD",
    "2020 BMW X5 Owner's Manual",
    "source URL to be confirmed",
    base_skeleton(),
    {"drive_type": "AWD", "transmission": "automatic", "engine": "3.0L inline-6 turbo", "powertrain": "gasoline"},
    ["Split from bmw_x5_2020."],
    source_confidence="needs_table_verification",
))
next_rank += 1
added += 1

data["vehicles"].append(make_vehicle(
    next_rank,
    "bmw_x5_2020_xdrive50i",
    2020,
    "BMW",
    "X5",
    "xDrive50i/M50i",
    "4.4L V8 turbo",
    "Automatic",
    "AWD",
    "2020 BMW X5 Owner's Manual",
    "source URL to be confirmed",
    base_skeleton(),
    {"drive_type": "AWD", "transmission": "automatic", "engine": "4.4L V8 turbo", "powertrain": "gasoline"},
    ["Split from bmw_x5_2020."],
    source_confidence="needs_table_verification",
))
next_rank += 1
added += 1

data["vehicles"].append(make_vehicle(
    next_rank,
    "bmw_x5_2020_diesel",
    2020,
    "BMW",
    "X5",
    "xDrive40d",
    "3.0L inline-6 turbodiesel",
    "Automatic",
    "AWD",
    "2020 BMW X5 Diesel details",
    "source URL to be confirmed",
    base_skeleton() + [
        {"service": "Diesel exhaust fluid service", "interval": {"miles": 7500, "months": None, "logic": "diesel-specific interval"}, "severity": "high", "notes": "Diesel variant only."}
    ],
    {"drive_type": "AWD", "transmission": "automatic", "engine": "3.0L inline-6 diesel", "powertrain": "diesel"},
    ["Split from bmw_x5_2020."],
    source_confidence="needs_table_verification",
))
next_rank += 1
added += 1

data["vehicles"].append(make_vehicle(
    next_rank,
    "bmw_x5_2020_m",
    2020,
    "BMW",
    "X5 M",
    "X5 M",
    "4.4L V8 twin-turbo",
    "Automatic",
    "AWD",
    "2020 BMW X5 M Owner's Manual",
    "source URL to be confirmed",
    base_skeleton(),
    {"drive_type": "AWD", "transmission": "automatic", "engine": "4.4L V8 twin-turbo", "powertrain": "gasoline"},
    ["Split from bmw_x5_2020."],
    source_confidence="needs_table_verification",
))
next_rank += 1
added += 1

data["vehicles"].append(make_vehicle(
    next_rank,
    "bmw_x5_2020_45e",
    2020,
    "BMW",
    "X5",
    "xDrive45e",
    "3.0L inline-6 plug-in hybrid",
    "Automatic",
    "AWD",
    "2020 BMW X5 45e Owner's Manual",
    "source URL to be confirmed",
    base_skeleton() + [
        {"service": "High-voltage battery and inverter check", "interval": {"miles": 60000, "months": None, "logic": "PHEV-specific guidance"}, "severity": "medium", "notes": "Plug-in hybrid variant only."}
    ],
    {"drive_type": "AWD", "transmission": "automatic", "engine": "3.0L inline-6 PHEV", "powertrain": "phev"},
    ["Split from bmw_x5_2020."],
    source_confidence="needs_table_verification",
))
next_rank += 1
added += 1

# Update total count
data["vehicles_completed"] = len(data["vehicles"])

# Write back
with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Appended {added} new records.")
print(f"Total vehicles: {len(data['vehicles'])}")

