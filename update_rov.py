#!/usr/bin/env python3
"""
ROV Auto-Updater
อัปเดต Tier List ใน rov-pro.html อัตโนมัติ
ใช้ DuckDuckGo Search + Claude AI วิเคราะห์ Meta ล่าสุด
"""
import os, re, json, sys, datetime, subprocess

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
HTML_FILE  = os.path.join(SCRIPT_DIR, 'rov-pro.html')
LOG_FILE   = os.path.join(SCRIPT_DIR, 'rov_update.log')

HERO_IDS = [
    "telAnnas","violet","capheny","yorn","fennik","wisp",
    "butterfly","zephys","nakroth","murad","kriknak","hayate",
    "florentino","omen","luBu","qi","keera","ryoma","wukong",
    "tulen","lauriel","kahlii","ilumia","diaochan",
    "grakk","baldum","mina","thane","ormarr",
    "lumburr","zip","alice"
]

# ===== LOGGER =====
def log(msg):
    ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line)
    with open(LOG_FILE, 'a', encoding='utf-8') as f:
        f.write(line + "\n")

# ===== INSTALL DEPS =====
def ensure_deps():
    needed = []
    try:
        import anthropic
    except ImportError:
        needed.append("anthropic")
    try:
        from ddgs import DDGS
    except ImportError:
        needed.append("ddgs")
    if needed:
        log(f"📦 ติดตั้ง: {' '.join(needed)}")
        subprocess.check_call([sys.executable, "-m", "pip", "install"] + needed, stdout=subprocess.DEVNULL)
        log("✅ ติดตั้งเสร็จ")

# ===== WEB SEARCH =====
def search_rov_meta():
    from ddgs import DDGS
    queries = [
        "ROV Realm of Valor tier list pro league 2026",
        "ROV เมต้าตัวละคร tier list ล่าสุด 2026",
        "Arena of Valor AoV best heroes meta 2026",
    ]
    results = []
    try:
        with DDGS() as ddgs:
            for q in queries:
                for r in ddgs.text(q, max_results=3):
                    results.append(f"Source: {r.get('href','')}\nTitle: {r['title']}\n{r['body']}\n---")
                if len(results) >= 8:
                    break
    except Exception as e:
        log(f"⚠ Search error: {e}")
    return "\n".join(results[:8]) if results else "No search results available."

# ===== FETCH OFFICIAL PATCH NOTES =====
def fetch_patch_notes():
    """ดึง Patch Notes จริงจาก Garena ROV Thailand"""
    try:
        import requests
        from ddgs import DDGS

        # ค้นหาหน้า Patch Notes ล่าสุด
        patch_url = None
        with DDGS() as ddgs:
            for r in ddgs.text(
                'ROV patch notes ล่าสุด site:rov.garena.in.th OR site:fb.com/ROVThailand',
                max_results=5
            ):
                if 'garena' in r.get('href','').lower() or 'rov' in r.get('href','').lower():
                    patch_url = r['href']
                    break

        raw_text = ""
        if patch_url:
            log(f"   📄 ดึง Patch Notes จาก: {patch_url}")
            headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
            resp = requests.get(patch_url, headers=headers, timeout=10)
            resp.encoding = 'utf-8'
            # ดึงเฉพาะ text ออกจาก HTML
            raw = resp.text
            import re as _re
            raw_text = _re.sub(r'<[^>]+>', ' ', raw)
            raw_text = _re.sub(r'\s+', ' ', raw_text)[:4000]

        # ถ้าดึง URL ไม่ได้ ใช้ DuckDuckGo snippets แทน
        if not raw_text:
            snippets = []
            with DDGS() as ddgs:
                for r in ddgs.text('ROV Thailand patch notes buff nerf ล่าสุด 2026', max_results=5):
                    snippets.append(r['body'])
            raw_text = "\n".join(snippets[:5])

        return raw_text, patch_url or ""

    except Exception as e:
        log(f"⚠ Patch fetch error: {e}")
        return "", ""


# ===== CLAUDE ANALYSIS =====
def analyze_tiers(search_text):
    import anthropic
    # ลอง process env ก่อน แล้วค่อย fallback ไป Windows User env
    api_key = os.environ.get("ANTHROPIC_API_KEY","")
    if not api_key:
        try:
            import subprocess
            result = subprocess.run(
                ["powershell","-command",
                 "[System.Environment]::GetEnvironmentVariable('ANTHROPIC_API_KEY','User')"],
                capture_output=True, text=True
            )
            api_key = result.stdout.strip()
        except Exception:
            pass
    if not api_key:
        log("❌ ไม่พบ ANTHROPIC_API_KEY — ข้าม AI analysis ใช้ fallback")
        return None

    client = anthropic.Anthropic(api_key=api_key)

    prompt = f"""You are an expert ROV (Realm of Valor / Arena of Valor) pro-league analyst for Thailand.
Today is {datetime.date.today()}.

Based on the web search results below AND your knowledge of the current meta,
assign each hero a tier: S, A, or B.

Search results:
---
{search_text[:3000]}
---

Hero IDs to rate:
{json.dumps(HERO_IDS, ensure_ascii=False)}

Tier definitions:
- S = Must pick/ban in pro play (top meta)
- A = Strong, viable pick in most team comps
- B = Situational, specific niche only

Return ONLY a JSON object with hero_id → tier, no explanation:
Example: {{"telAnnas":"S","violet":"A","alice":"B"}}

All {len(HERO_IDS)} heroes must be included."""

    try:
        resp = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=800,
            messages=[{"role":"user","content":prompt}]
        )
        text = resp.content[0].text.strip()
        # Extract JSON block
        m = re.search(r'\{[\s\S]+\}', text)
        if m:
            data = json.loads(m.group())
            # Validate all heroes present and valid tiers
            valid = {k:v for k,v in data.items() if k in HERO_IDS and v in ('S','A','B')}
            if len(valid) >= 20:
                log(f"🤖 Claude returned {len(valid)} tier ratings")
                return valid
    except Exception as e:
        log(f"⚠ Claude error: {e}")
    return None

# ===== SUMMARIZE PATCH NOTES WITH CLAUDE =====
def summarize_patch(raw_text, source_url):
    """ให้ Claude สรุป Patch Notes เป็นภาษาไทย"""
    import anthropic
    api_key = os.environ.get("ANTHROPIC_API_KEY","")
    if not api_key:
        try:
            import subprocess
            r = subprocess.run(
                ["powershell","-command",
                 "[System.Environment]::GetEnvironmentVariable('ANTHROPIC_API_KEY','User')"],
                capture_output=True, text=True)
            api_key = r.stdout.strip()
        except: pass
    if not api_key:
        return {}

    client = anthropic.Anthropic(api_key=api_key)
    prompt = f"""You are summarizing ROV (Realm of Valor) patch notes for Thai players.

Raw text from patch source:
---
{raw_text[:3000]}
---

Extract and return a JSON object with:
{{
  "version": "patch version if found, else ''",
  "date": "patch date if found, else ''",
  "notes": [
    {{"hero": "hero name in English", "type": "buff|nerf|adjust|new", "detail": "สรุปสั้นๆ เป็นภาษาไทย 1 ประโยค"}},
    ...
  ],
  "general": ["general game changes in Thai, 1 sentence each", ...],
  "source": "{source_url}"
}}

If no real patch notes found, return {{"notes": [], "general": [], "version": "", "date": "", "source": "{source_url}"}}.
Return ONLY valid JSON, no explanation."""

    try:
        resp = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1000,
            messages=[{"role":"user","content":prompt}]
        )
        text = resp.content[0].text.strip()
        m = re.search(r'\{[\s\S]+\}', text)
        if m:
            return json.loads(m.group())
    except Exception as e:
        log(f"⚠ Patch summary error: {e}")
    return {}


# ===== READ OLD TIERS =====
def read_old_tiers() -> dict:
    """อ่าน tier เดิมจาก HTML ก่อนอัปเดต"""
    if not os.path.exists(HTML_FILE):
        return {}
    old = {}
    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        for line in f:
            for hero_id in HERO_IDS:
                if f"{hero_id}:{{" in line and 'tier:' in line:
                    m = re.search(r'tier:"([SAB])"', line)
                    if m:
                        old[hero_id] = m.group(1)
    return old

# ===== COMPARE TIERS =====
def compare_tiers(old: dict, new: dict) -> dict:
    """เปรียบเทียบ tier เก่าและใหม่ หา Buff/Nerf"""
    tier_rank = {'S': 3, 'A': 2, 'B': 1}
    changes = {}
    for hero_id in HERO_IDS:
        old_t = old.get(hero_id)
        new_t = new.get(hero_id)
        if old_t and new_t and old_t != new_t:
            diff = tier_rank[new_t] - tier_rank[old_t]
            changes[hero_id] = {
                'from': old_t,
                'to': new_t,
                'type': 'buff' if diff > 0 else 'nerf'
            }
    return changes

# ===== UPDATE HTML =====
def update_html(tiers: dict, changes: dict, patch_summary: dict = {}) -> int:
    if not os.path.exists(HTML_FILE):
        log(f"❌ ไม่พบ {HTML_FILE}")
        return 0

    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    updated = 0
    for i, line in enumerate(lines):
        for hero_id, new_tier in tiers.items():
            # Match lines like: telAnnas:{name:...,tier:"S",...
            if f"{hero_id}:{{" in line and 'tier:' in line:
                old = line
                lines[i] = re.sub(r'tier:"[SAB]"', f'tier:"{new_tier}"', line)
                if lines[i] != old:
                    updated += 1

    # Insert/update timestamp comment near HEROES definition
    ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    ts_comment = f"  // ⏰ อัปเดตล่าสุด: {ts}\n"
    for i, line in enumerate(lines):
        if '// ⏰ อัปเดตล่าสุด:' in line:
            lines[i] = ts_comment
            break
    else:
        for i, line in enumerate(lines):
            if 'const HEROES = {' in line:
                lines.insert(i+1, ts_comment)
                break

    # Embed PATCH data into HTML JS
    content = ''.join(lines)
    changes_json  = json.dumps(changes,       ensure_ascii=False)
    summary_json  = json.dumps(patch_summary, ensure_ascii=False)
    ts_full = datetime.datetime.now().strftime("%d/%m/%Y %H:%M")

    if 'const PATCH_CHANGES' in content:
        content = re.sub(r'const PATCH_CHANGES\s*=\s*\{[^;]*\};',
                         f'const PATCH_CHANGES = {changes_json};', content)
        content = re.sub(r'const PATCH_DATE\s*=\s*"[^"]*";',
                         f'const PATCH_DATE = "{ts_full}";', content)
        content = re.sub(r'const PATCH_OFFICIAL\s*=\s*\{[^;]*\};',
                         f'const PATCH_OFFICIAL = {summary_json};', content)
    else:
        content = content.replace(
            '// ===== HERO DATABASE =====',
            f'// ===== PATCH DATA =====\n'
            f'const PATCH_CHANGES = {changes_json};\n'
            f'const PATCH_DATE = "{ts_full}";\n'
            f'const PATCH_OFFICIAL = {summary_json};\n\n'
            f'// ===== HERO DATABASE ====='
        )

    with open(HTML_FILE, 'w', encoding='utf-8') as f:
        f.write(content)

    return updated

# ===== SHOW SUMMARY =====
def show_summary(tiers):
    s = [k for k,v in tiers.items() if v=='S']
    a = [k for k,v in tiers.items() if v=='A']
    b = [k for k,v in tiers.items() if v=='B']
    log(f"  S-Tier ({len(s)}): {', '.join(s)}")
    log(f"  A-Tier ({len(a)}): {', '.join(a)}")
    log(f"  B-Tier ({len(b)}): {', '.join(b)}")

# ===== TASK SCHEDULER SETUP =====
def setup_scheduler():
    bat = os.path.join(SCRIPT_DIR, 'run_rov_update.bat')
    task_name = "ROV_AutoUpdate"
    python_exe = sys.executable

    # Write batch file
    with open(bat, 'w', encoding='utf-8') as f:
        f.write(f'@echo off\n"{python_exe}" "{os.path.abspath(__file__)}" >> "{LOG_FILE}" 2>&1\n')
    log(f"✅ สร้าง batch file: {bat}")

    # Create weekly task (every Monday 8:00)
    cmd = [
        "schtasks", "/Create", "/F",
        "/TN", task_name,
        "/TR", f'"{bat}"',
        "/SC", "WEEKLY",
        "/D", "MON",
        "/ST", "08:00",
        "/RL", "HIGHEST",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        log(f"✅ Task Scheduler ตั้งค่าสำเร็จ: '{task_name}'")
        log("   รันทุกวันจันทร์ เวลา 08:00 น.")
    else:
        log(f"⚠ Task Scheduler error: {result.stderr.strip()}")
        log(f"   ลองรัน run_rov_update.bat ด้วยตัวเองก็ได้ครับ")

# ===== MAIN =====
def main():
    log("=" * 55)
    log("🎮 ROV Auto-Updater เริ่มทำงาน")
    log("=" * 55)

    if "--setup" in sys.argv:
        setup_scheduler()
        return

    ensure_deps()

    log("🔍 ค้นหา Meta ROV ล่าสุด...")
    search_text = search_rov_meta()
    log(f"   ได้ข้อมูล {len(search_text)} ตัวอักษร")

    log("🤖 วิเคราะห์ Tier List ด้วย Claude AI...")
    tiers = analyze_tiers(search_text)

    if not tiers:
        log("⚠ ไม่สามารถวิเคราะห์ได้ — ใช้ค่า fallback (ไม่เปลี่ยน tier)")
        log("   ตรวจสอบ ANTHROPIC_API_KEY ใน environment variables")
        return

    log("📰 ดึง Patch Notes จริงจาก Garena...")
    patch_raw, patch_url = fetch_patch_notes()
    patch_summary = summarize_patch(patch_raw, patch_url) if patch_raw else {}
    if patch_summary.get('notes'):
        log(f"   ✅ ได้ Patch Notes: {len(patch_summary['notes'])} รายการ")
    else:
        log("   ⚠ ไม่พบ Patch Notes อย่างเป็นทางการ")

    log("📖 อ่าน tier เดิมก่อนอัปเดต...")
    old_tiers = read_old_tiers()

    log("📝 อัปเดต rov-pro.html...")
    changes = compare_tiers(old_tiers, tiers)
    n = update_html(tiers, changes, patch_summary)
    log(f"✅ อัปเดตสำเร็จ {n} hero tiers!")

    if changes:
        buffs  = [(k,v) for k,v in changes.items() if v['type']=='buff']
        nerfs  = [(k,v) for k,v in changes.items() if v['type']=='nerf']
        if buffs:
            log(f"🔺 Buff ({len(buffs)}): " + ", ".join(f"{k} {v['from']}→{v['to']}" for k,v in buffs))
        if nerfs:
            log(f"🔻 Nerf ({len(nerfs)}): " + ", ".join(f"{k} {v['from']}→{v['to']}" for k,v in nerfs))
    else:
        log("↔ ไม่มีการเปลี่ยนแปลง Tier ครั้งนี้")

    show_summary(tiers)
    log("=" * 55)

if __name__ == "__main__":
    main()
