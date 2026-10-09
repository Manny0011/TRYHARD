#!/usr/bin/env python3
"""Parse the four source Markdown files into data/*.js (plain <script> globals, works from file://).
Usage: python3 tools/build_data.py <dir-with-md-files>
"""
import json, re, sys, os

SRC = sys.argv[1] if len(sys.argv) > 1 else "."
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")
os.makedirs(OUT, exist_ok=True)

def read(name):
    with open(os.path.join(SRC, name), encoding="utf-8") as f:
        return f.read()

def clean_artifacts(t):
    # pandoc leftovers:  `\n2`{=tex}.  -> newline + "2."   |  `\n`{=tex} -> newline | `\n*`{=tex}\*Q -> **Q
    t = re.sub(r"`\\n(\d+)`\{=tex\}\.", r"\n\1.", t)
    t = t.replace("`\\n*`{=tex}", "\n*").replace("`\\n`{=tex}", "\n")
    t = t.replace("\\*", "*")
    # malformed closing fence followed by prose:  ``` Here `p` ...
    t = re.sub(r"^```[ ]+(?=Here )", "```\n", t, flags=re.M)
    return t

def split_sections(lines):
    """Split lines of a question block into [(title, body)] on '### ' headings (fence-aware)."""
    secs, cur_title, cur, in_fence = [], None, [], False
    for ln in lines:
        if ln.startswith("```"):
            in_fence = not in_fence
        if not in_fence and ln.startswith("### "):
            if cur_title is not None:
                secs.append((cur_title, cur))
            cur_title, cur = ln[4:].strip(), []
        else:
            if cur_title is not None:
                cur.append(ln)
    if cur_title is not None:
        secs.append((cur_title, cur))
    return secs

def body_text(lines):
    # strip trailing horizontal rules / blank lines / stray top-level headings
    out = []
    for ln in lines:
        if re.match(r"^#\s", ln):  # part heading that leaked into a block
            break
        out.append(ln)
    s = "\n".join(out).strip()
    s = re.sub(r"(\n\s*-{3,}\s*)+$", "", s).strip()
    s = re.sub(r"^-{3,}\s*$", "", s, flags=re.M).strip() if s.strip("- ") == "" else s
    return s

KIND = [
    (r"^core answer|^interview answer", "core"),
    (r"^why|concept clarity", "why"),
    (r"^practical", "example"),
    (r"^code", "code"),
    (r"^step", "steps"),
    (r"follow-?up", "followups"),
    (r"^common mistake", "mistakes"),
]
def kind_of(title):
    for rx, k in KIND:
        if re.search(rx, title, re.I):
            return k
    return "other"

def norm_title(t):
    t = re.sub(r"\s*---\s*(Detailed Hinglish|Simple English)\s*$", "", t)
    t = t.replace("Code / Example Where Required", "Code / Example")
    t = t.replace("Step-by-Step Explanation", "Step-by-Step")
    t = t.replace("Common Mistakes / Confusion", "Common Mistakes")
    t = t.replace("Common Mistake / Avoid", "Common Mistakes")
    return t

def parse_qa_file(text, qrx, cat_rx, prefix, cat_fallback=None):
    text = clean_artifacts(text)
    lines = text.split("\n")
    idxs = [i for i, l in enumerate(lines) if re.match(qrx, l)]
    items = []
    for k, i in enumerate(idxs):
        j = idxs[k + 1] if k + 1 < len(idxs) else len(lines)
        block = lines[i:j]
        m = re.match(qrx, block[0])
        num, title = int(m.group(1)), m.group(2).strip()
        cat = None
        for ln in block:
            mc = re.match(cat_rx, ln)
            if mc:
                cat = mc.group(1).strip(); break
        secs = []
        for st, sl in split_sections(block[1:]):
            if re.match(r"mark as learned", st, re.I):
                continue
            body = body_text(sl)
            if body:
                secs.append({"t": norm_title(st), "k": kind_of(st), "b": body})
        items.append({"id": f"{prefix}-{num:03d}", "n": num, "q": title, "c": cat, "s": secs})
    return items

# ---------------- Technical ----------------
tech = parse_qa_file(read("Allied_Softech_Technical_Detailed_Hinglish.md"),
                     r"^## Q?(\d+)\.\s+(.*)$", r"^\*\*Category:\*\*\s*(.*)$", "TECH")
def tech_cat(n):  # Q60+ have no Category line in the source -> assign topic-based category
    if n == 91: return "Backend"
    if 60 <= n <= 102: return "Networking"
    if 103 <= n <= 110: return "DSA"
    if n in (111, 112, 113): return "SQL"
    if n == 114: return "DBMS"
    if n in (115, 116): return "OS"
    if n in (117, 118, 119): return "JavaScript"
    if n == 120: return "Web"
    return "General"
for q in tech:
    if not q["c"]:
        q["c"] = tech_cat(q["n"]); q["derived"] = 1

# ---------------- HR ----------------
hr = parse_qa_file(read("Allied_Softech_HR_Round_Easy_English.md"),
                   r"^## (\d+)\.\s+(.*)$", r"^\*\*Round / Category:\*\*\s*(.*)$", "HR")

HR_GROUPS = {
    "About You": ["Introduction", "Motivation", "Strength", "Weakness", "Career"],
    "Company & Logistics": ["Company", "Salary", "Relocation", "Work Style", "Closing"],
    "Work Behaviour": ["Learning", "Problem Solving", "Debugging", "Teamwork", "Conflict", "Pressure",
                       "Failure", "Feedback", "Requirements", "Ethics", "Quality", "Communication"],
    "Project & Tech": ["Project", "Technology"],
}
_hr_map = {c: g for g, cs in HR_GROUPS.items() for c in cs}
for q in hr:
    q["tag"] = q["c"]                      # original "Round / Category" from the source
    q["c"] = _hr_map.get(q["tag"], "Other")  # grouped category used for chips/filters
    q["derived"] = 1

# ---------------- DSA + Loops ----------------
dsa_txt = read("Allied_Softech_DSA_150_Loops_30_Questions.md")
dsa, loops, mode, cat = [], [], None, None
for ln in dsa_txt.split("\n"):
    if ln.startswith("# ") and "DSA" in ln and "150" in ln: mode = "dsa"; continue
    if ln.startswith("# ") and "Loops" in ln: mode = "loop"; continue
    if ln.startswith("# "): mode = None; continue
    if mode == "dsa" and ln.startswith("## "):
        cat = ln[3:].strip(); continue
    m = re.match(r"^### ((?:DSA|LOOP)-(\d+)) — \[(Easy|Medium|Hard)\] (.*)$", ln)
    if m and mode:
        item = {"id": m.group(1), "n": int(m.group(2)), "q": m.group(4).strip(), "d": m.group(3)}
        if mode == "dsa": item["c"] = cat; dsa.append(item)
        else: loops.append(item)

def loop_cat(n):
    if n <= 6: return "Basic Loops"
    if n in (7, 8, 9, 10, 11, 29): return "Digit Problems"
    if n in (12, 13, 14): return "Prime & Fibonacci"
    if n in (15, 16, 28): return "GCD, LCM & Factors"
    if n == 30: return "Patterns"
    return "Special Numbers"
for q in loops:
    q["c"] = loop_cat(q["n"]); q["derived"] = 1

# ---------------- write + verify ----------------
def write(name, key, items):
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        f.write(f"/* AUTO-GENERATED by tools/build_data.py from the source Markdown. Do not edit by hand. */\n")
        f.write(f"window.ILAB_DATA = window.ILAB_DATA || {{}};\nwindow.ILAB_DATA.{key} = ")
        json.dump(items, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")

write("technical.js", "technical", tech)
write("dsa.js", "dsa", dsa)
write("loops.js", "loops", loops)
write("hr.js", "hr", hr)

def check(items, prefix, n):
    ids = [q["id"] for q in items]
    exp = [f"{prefix}-{i:03d}" for i in range(1, n + 1)]
    assert ids == exp, f"{prefix}: id sequence mismatch ({len(ids)} found)"
for items, p, n in ((tech, "TECH", 120), (dsa, "DSA", 150), (loops, "LOOP", 30), (hr, "HR", 26)):
    check(items, p, n)
print("OK  TECH", len(tech), "DSA", len(dsa), "LOOP", len(loops), "HR", len(hr), "TOTAL", len(tech)+len(dsa)+len(loops)+len(hr))
from collections import Counter
for nm, items in (("tech", tech), ("dsa", dsa), ("loops", loops), ("hr", hr)):
    print(nm, dict(Counter(q["c"] for q in items)))
print("sections per tech q (min/max):", min(len(q["s"]) for q in tech), max(len(q["s"]) for q in tech))
print("tech q with no core:", [q["id"] for q in tech if not any(s["k"]=="core" for s in q["s"])])
print("hr q with no core:", [q["id"] for q in hr if not any(s["k"]=="core" for s in q["s"])])
src = clean_artifacts(read("Allied_Softech_Technical_Detailed_Hinglish.md"))
fences_src = len(re.findall(r"^```", src, re.M))
fences_out = sum(len(re.findall(r"^```", s["b"], re.M)) for q in tech for s in q["s"])
print("code fence lines src/out:", fences_src, fences_out)
print("DSA diff:", dict(Counter(q["d"] for q in dsa)), "LOOP diff:", dict(Counter(q["d"] for q in loops)))
