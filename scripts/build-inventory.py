#!/usr/bin/env python3
"""Build content-inventory.json for dingweibattery.com from the Astro source tree."""
import json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src", "pages")
DATA = os.path.join(ROOT, "src", "data")

# --- load models ---
with open(os.path.join(DATA, "battery-models-seed.json")) as f:
    models = json.load(f)
MODEL_META = {m["model"]: m for m in models}

# --- git last-modified per file ---
def git_date(relpath):
    try:
        out = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", relpath],
            cwd=ROOT, capture_output=True, text=True, check=True,
        ).stdout.strip()
        return out or "2026-09-01"
    except Exception:
        return "2026-09-01"

# --- internal link counting (en pages only for link graph) ---
def count_internal_links(relpath):
    p = os.path.join(ROOT, relpath)
    if not os.path.exists(p):
        return 0
    txt = open(p, encoding="utf-8").read()
    # href="/..." occurrences (internal)
    return len(re.findall(r'href="/', txt))

# --- knowledge slug -> metadata ---
KNOWLEDGE = {
    "what-is-cca": ("What Is CCA (Cold Cranking Amps)?", "what is CCA",
        ["cold cranking amps", "CCA vs Ah", "JIS vs EN CCA", "battery starting power"],
        ["CCA", "Cold Cranking Amps", "JIS", "EN", "SAE", "DIN", "battery", "starter"],
        "Informational"),
    "what-is-oem-battery": ("What Is an OEM Battery?", "what is OEM battery",
        ["OEM battery meaning", "OEM vs aftermarket battery", "private label battery"],
        ["OEM battery", "aftermarket", "private label", "manufacturer"],
        "Informational"),
    "battery-capacity-ah-vs-c20-vs-rc": ("Battery Capacity: Ah vs C20 vs Reserve Capacity", "battery capacity Ah vs C20 vs RC",
        ["amp hour rating", "C20 rate", "reserve capacity", "battery capacity explained"],
        ["Ah", "C20", "Reserve Capacity", "capacity", "battery"],
        "Informational"),
    "battery-dimensions-case-size": ("Battery Dimensions and Case Size Guide", "battery dimensions case size",
        ["battery group size", "JIS D26 dimensions", "DIN L3 size", "BCI group size"],
        ["case size", "dimensions", "JIS", "DIN", "BCI", "fitment"],
        "Informational"),
    "battery-terminal-types-polarity": ("Battery Terminal Types and Polarity", "battery terminal types polarity",
        ["battery terminal type", "JIS terminal", "SAE post", "reversed polarity"],
        ["terminal", "polarity", "JIS", "SAE", "post", "battery"],
        "Informational"),
    "battery-quality-control": ("Battery Quality Control", "battery quality control",
        ["battery QC process", "battery testing standards", "factory quality control"],
        ["quality control", "testing", "IATF 16949", "inspection", "manufacturing"],
        "Informational"),
    "battery-shipping-warranty": ("Battery Shipping and Warranty", "battery shipping warranty",
        ["shipping lead acid batteries", "battery warranty terms", "dangerous goods battery shipping"],
        ["shipping", "warranty", "logistics", "UN2800", "export"],
        "Informational"),
    "battery-applications-by-vehicle": ("Battery Applications by Vehicle", "battery applications by vehicle",
        ["car battery types", "start-stop battery", "truck battery", "battery for SUV"],
        ["vehicle", "application", "start-stop", "AGM", "EFB", "heavy duty"],
        "Informational"),
    "jis-vs-din-vs-bci": ("JIS vs DIN vs BCI Battery Standards", "JIS vs DIN vs BCI",
        ["JIS battery standard", "DIN battery standard", "BCI group size", "battery standards comparison"],
        ["JIS", "DIN", "BCI", "EN", "SAE", "standard"],
        "Commercial Investigation"),
    "how-lead-acid-batteries-are-made": ("How Lead-Acid Batteries Are Made", "how lead acid batteries are made",
        ["lead acid battery manufacturing", "battery production process", "grid casting battery"],
        ["lead-acid", "manufacturing", "grid", "pasting", "formation"],
        "Informational"),
    "how-oem-battery-programs-work": ("How OEM Battery Programs Work", "how OEM battery programs work",
        ["OEM battery program", "private label battery program", "battery manufacturer partnership"],
        ["OEM", "private label", "program", "manufacturer", "branding"],
        "Commercial Investigation"),
    "oem-battery-development-process": ("OEM Battery Development Process", "OEM battery development process",
        ["battery development timeline", "OEM battery sampling", "battery design approval"],
        ["OEM", "development", "sampling", "design", "approval"],
        "Commercial Investigation"),
    "oem-battery-moq-lead-time": ("OEM Battery MOQ and Lead Time", "OEM battery MOQ lead time",
        ["battery MOQ", "battery lead time", "minimum order quantity battery"],
        ["MOQ", "lead time", "container", "production", "order"],
        "Transactional"),
    "oem-battery-rfq-guide": ("OEM Battery RFQ Guide", "OEM battery RFQ",
        ["battery RFQ template", "how to request battery quote", "battery supplier quotation"],
        ["RFQ", "quotation", "specification", "procurement", "supplier"],
        "Transactional"),
    "oem-battery-specification-guide": ("OEM Battery Specification Guide", "OEM battery specification",
        ["battery spec sheet", "battery specification fields", "battery datasheet guide"],
        ["specification", "datasheet", "voltage", "capacity", "CCA", "terminal"],
        "Commercial Investigation"),
    "oem-battery-supplier-checklist": ("OEM Battery Supplier Checklist", "OEM battery supplier checklist",
        ["how to vet battery supplier", "battery supplier audit", "battery manufacturer evaluation"],
        ["supplier", "checklist", "audit", "qualification", "procurement"],
        "Commercial Investigation"),
    "oem-vs-odm-vs-private-label": ("OEM vs ODM vs Private Label", "OEM vs ODM vs private label",
        ["OEM vs ODM", "private label meaning", "battery branding options"],
        ["OEM", "ODM", "private label", "branding", "manufacturing"],
        "Commercial Investigation"),
    "private-label-battery-strategy": ("Private Label Battery Strategy", "private label battery strategy",
        ["build battery brand", "private label battery business", "battery brand launch"],
        ["private label", "brand", "strategy", "distribution", "market"],
        "Commercial Investigation"),
    "how-choose-oem-battery-manufacturer": ("How to Choose an OEM Battery Manufacturer", "how to choose OEM battery manufacturer",
        ["battery manufacturer selection", "China battery manufacturer", "battery factory evaluation"],
        ["manufacturer", "selection", "China", "factory", "OEM"],
        "Commercial Investigation"),
    "how-audit-battery-factory": ("How to Audit a Battery Factory", "how to audit battery factory",
        ["battery factory audit", "factory inspection checklist", "battery manufacturing audit"],
        ["factory", "audit", "inspection", "quality", "manufacturing"],
        "Commercial Investigation"),
    "how-build-private-label-battery-brand": ("How to Build a Private Label Battery Brand", "how to build private label battery brand",
        ["start battery brand", "private label battery business", "battery import business"],
        ["private label", "brand", "import", "distribution", "business"],
        "Commercial Investigation"),
}

LANGS = {"en": "English", "es": "Spanish", "ar": "Arabic", "ru": "Russian"}

# --- target market inference ---
def target_market(lang, slug="", content_type=""):
    if lang == "ar":
        return "Middle East / North Africa (Arabic)"
    if lang == "es":
        return "Latin America / Spain (Spanish)"
    if lang == "ru":
        return "CIS / Russia (Russian)"
    if content_type == "Model Page" and ("H5" in slug or "H6" in slug or "H7" in slug or "H8" in slug or slug.startswith("din")):
        return "Europe / Global (DIN-EN)"
    if content_type == "Model Page" and slug.startswith("n1") or slug.startswith("n2"):
        return "Africa / Middle East / Global (heavy-duty)"
    return "Global (primary English)"

inventory = []

def add(url, title, ctype, pkw, skw, entities, intent, status, relpath, market, lang):
    # skip duplicated non-en model/knowledge: we enumerate every real file though
    inventory.append({
        "url": url,
        "title": title,
        "content_type": ctype,
        "primary_keyword": pkw,
        "secondary_keywords": skw,
        "entities": entities,
        "search_intent": intent,
        "status": status,
        "last_updated": git_date(relpath),
        "source": "source: " + relpath,
        "quality_score": None,
        "quality_note": "estimate pending deep audit",
        "internal_links": count_internal_links(relpath),
        "target_market": market,
        "language": lang,
    })

# --- model pages (all langs) ---
for lang, langname in LANGS.items():
    prefix = "" if lang == "en" else f"/{lang}"
    for m in models:
        mm = MODEL_META[m["model"]]
        slug = m["model"].lower()
        url = f"{prefix}/data/{slug}/"
        ctype = "Battery Model Page"
        relpath = f"src/pages/{lang}/data/[model]/index.astro" if lang != "en" else "src/pages/data/[model]/index.astro"
        skw = [f"{m['model']} battery", f"{m['model']} battery specs", f"{m['model']} dimensions", f"{m['model']} CCA"]
        entities = [m["model"], m["standard"], m["case_size"], "battery", "CCA", "Ah"]
        add(url, f"{m['model']} Battery — Specs, CCA, Dimensions | Dingwei Battery", ctype,
            f"{m['model']} battery", skw, entities,
            "Commercial Investigation", "live", relpath,
            target_market(lang, slug, ctype), lang)

# --- data index ---
for lang, langname in LANGS.items():
    prefix = "" if lang == "en" else f"/{lang}"
    relpath = f"src/pages/{lang}/data/index.astro" if lang != "en" else "src/pages/data/index.astro"
    add(f"{prefix}/data/", "Battery Model Database | Dingwei Battery", "Database / Hub",
        "battery model database", ["battery specs database", "JIS DIN battery list", "car battery reference"],
        ["battery", "JIS", "DIN", "BCI", "model", "CCA"], "Navigational", "live", relpath,
        target_market(lang), lang)

# --- knowledge articles ---
for lang, langname in LANGS.items():
    prefix = "" if lang == "en" else f"/{lang}"
    for slug, (title, pkw, skw, ent, intent) in KNOWLEDGE.items():
        relpath = f"src/pages/{lang}/knowledge/{slug}/index.astro" if lang != "en" else f"src/pages/knowledge/{slug}/index.astro"
        add(f"{prefix}/knowledge/{slug}/", title, "Knowledge Article", pkw, skw, ent,
            intent, "live", relpath, target_market(lang), lang)

# --- core / OEM / tools pages ---
CORE = {
    "": ("Dingwei Battery — OEM & Private-Label Automotive Batteries", "Landing Page",
         "OEM battery manufacturer", ["automotive battery manufacturer", "private label battery", "China battery factory"],
         ["Dingwei Battery", "OEM", "private label", "Chengguang Power", "manufacturer"], "Transactional"),
    "factory": ("Battery Factory — Chengguang Power Tech | Dingwei Battery", "Factory Page",
         "battery factory China", ["battery manufacturing plant", "lead acid battery factory", "battery factory tour"],
         ["factory", "Chengguang Power", "production", "Jinzhou", "manufacturing"], "Commercial Investigation"),
    "heavy-duty-batteries": ("Heavy-Duty Batteries — Truck, Bus & Commercial | Dingwei Battery", "Product Category Page",
         "heavy duty truck battery", ["truck battery", "bus battery", "N150 N200 battery", "commercial vehicle battery"],
         ["heavy duty", "truck", "bus", "N150", "N200", "battery"], "Commercial Investigation"),
    "private-label": ("Private Label Battery Program | Dingwei Battery", "OEM Buyer Page",
         "private label battery", ["private label battery manufacturer", "custom battery branding", "own brand battery"],
         ["private label", "branding", "OEM", "battery"], "Transactional"),
    "contact": ("Contact | Dingwei Battery", "Contact Page",
         "contact Dingwei battery", ["battery manufacturer contact", "battery RFQ contact"],
         ["Dingwei Battery", "contact", "RFQ", "email"], "Transactional"),
    "privacy": ("Privacy Policy | Dingwei Battery", "Legal Page", "privacy policy", [], ["privacy"], "Navigational"),
    "terms": ("Terms of Service | Dingwei Battery", "Legal Page", "terms of service", [], ["terms"], "Navigational"),
    "oem": ("OEM Battery Manufacturing | Dingwei Battery", "OEM Buyer Page",
         "OEM battery manufacturer", ["car battery OEM", "battery private label OEM", "OEM battery China"],
         ["OEM", "manufacturer", "private label", "battery"], "Transactional"),
    "oem/car-batteries": ("Car Battery OEM & Private Label | Dingwei Battery", "OEM Buyer Page",
         "car battery OEM", ["OEM car battery manufacturer", "JIS DIN car battery", "passenger car battery supplier"],
         ["car battery", "OEM", "JIS", "DIN", "SLI", "AGM", "EFB"], "Transactional"),
    "oem/truck-batteries": ("Truck Battery OEM & Private Label | Dingwei Battery", "OEM Buyer Page",
         "truck battery OEM", ["heavy duty truck battery manufacturer", "commercial battery OEM"],
         ["truck battery", "OEM", "heavy duty", "commercial"], "Transactional"),
    "tools/battery-finder": ("Battery Finder Tool | Dingwei Battery", "Tool",
         "battery finder", ["find car battery", "battery selection tool", "battery fitment lookup"],
         ["battery", "fitment", "tool", "model", "CCA"], "Transactional"),
    "tools/compare": ("Compare Battery Models | Dingwei Battery", "Tool",
         "compare battery models", ["battery comparison", "65D26 vs 80D26", "battery specs compare"],
         ["battery", "comparison", "model", "specs", "CCA"], "Commercial Investigation"),
}

for lang, langname in LANGS.items():
    prefix = "" if lang == "en" else f"/{lang}"
    for slug, (title, ctype, pkw, skw, ent, intent) in CORE.items():
        if lang != "en" and slug in ("privacy", "terms"):
            continue  # legal pages en-only
        relpath = f"src/pages/{lang}/{slug}/index.astro" if slug else f"src/pages/{lang}/index.astro"
        if lang == "en":
            relpath = f"src/pages/{slug}/index.astro" if slug else "src/pages/index.astro"
        url = f"{prefix}/" if not slug else f"{prefix}/{slug}/"
        add(url, title, ctype, pkw, skw, ent, intent, "live", relpath, target_market(lang), lang)

# --- sort & write ---
inventory.sort(key=lambda x: (x["language"], x["url"]))
out_path = os.path.join(ROOT, "content-inventory.json")
with open(out_path, "w") as f:
    json.dump(inventory, f, ensure_ascii=False, indent=2)

# --- summary stats ---
from collections import Counter
ct = Counter(i["content_type"] for i in inventory)
langs = Counter(i["language"] for i in inventory)
print("TOTAL PAGES:", len(inventory))
print("\nBY TYPE:")
for k, v in sorted(ct.items(), key=lambda x: -x[1]):
    print(f"  {k}: {v}")
print("\nBY LANGUAGE:")
for k, v in sorted(langs.items()):
    print(f"  {k}: {v}")
print("\nWROTE:", out_path)
