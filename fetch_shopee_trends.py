#!/usr/bin/env python3
"""
Shopee Trends Auto-Updater — บริษัทชมสุข69
ค้นหาสินค้า trending จาก Shopee Affiliate API + TikTok Creative Center
วิเคราะห์ด้วย Claude AI → แนะนำสินค้าสำหรับ affiliate ครูช่างเชื่อม
"""
import os, re, json, sys, datetime, subprocess, time

SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
JSON_FILE   = os.path.join(SCRIPT_DIR, 'shopee-trends.json')
LOG_FILE    = os.path.join(SCRIPT_DIR, 'shopee_trends.log')
FEED_URL_FILE = os.path.join(SCRIPT_DIR, 'shopee_feed_url.txt')
FEED_CACHE  = os.path.join(SCRIPT_DIR, 'shopee_feed_cache.csv')
FEED_MAX_MB = 30
SHOPEE_API_URL = "https://open-api.affiliate.shopee.co.th/graphql"

NICHE_KEYWORDS = [
    "เครื่องเชื่อม", "ลวดเชื่อม", "หน้ากากเชื่อม",
    "ถุงมือเชื่อม", "รองเท้าเซฟตี้", "แว่นกันสะเก็ด",
    "เครื่องมือช่าง", "อุปกรณ์ไฟฟ้า", "ดอกกัด CNC",
    "PPE safety", "เสื้อกันสะเก็ด", "เครื่องเจียร",
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
    try:
        import requests
    except ImportError:
        needed.append("requests")
    if needed:
        log(f"📦 ติดตั้ง: {' '.join(needed)}")
        subprocess.check_call([sys.executable, "-m", "pip", "install"] + needed,
                              stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        log("✅ ติดตั้งเสร็จ")

# ===== CREDENTIAL HELPER =====
def get_credential(name):
    val = os.environ.get(name, "")
    if not val:
        try:
            result = subprocess.run(
                ["powershell", "-command",
                 f"[System.Environment]::GetEnvironmentVariable('{name}','User')"],
                capture_output=True, text=True
            )
            val = result.stdout.strip()
        except Exception:
            pass
    return val

# ===== SHOPEE API AUTH =====
def shopee_sign(app_id, app_secret, payload_json):
    import hmac, hashlib
    timestamp = str(int(time.time()))
    factor = app_id + timestamp + payload_json
    signature = hmac.new(
        app_secret.encode('utf-8'),
        factor.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    auth = f"SHA256 Credential={app_id}, Timestamp={timestamp}, Signature={signature}"
    return auth

# ===== SHOPEE GRAPHQL API =====
def search_shopee_products(app_id, app_secret):
    import requests
    all_products = {}
    for kw in NICHE_KEYWORDS:
        query = """query {
    productOfferV2(
        listType: 0
        sortType: 2
        keyword: "%s"
        limit: 10
        page: 1
    ) {
        nodes {
            productName
            productLink
            priceMin
            priceMax
            sales
            commissionRate
            sellerCommissionRate
            shopName
            shopType
            productImage
            categoryName
            ratingStar
            itemId
            shopId
        }
        pageInfo { page limit hasNextPage }
    }
}""" % kw
        payload = json.dumps({"query": query})
        auth = shopee_sign(app_id, app_secret, payload)
        headers = {
            "Content-Type": "application/json",
            "Authorization": auth,
        }
        try:
            resp = requests.post(SHOPEE_API_URL, headers=headers, data=payload, timeout=15)
            resp.encoding = 'utf-8'
            data = resp.json()
            if "errors" in data:
                log(f"⚠ Shopee API error [{kw}]: {data['errors'][0].get('message','unknown')}")
                continue
            nodes = data.get("data", {}).get("productOfferV2", {}).get("nodes", [])
            for node in nodes:
                item_id = node.get("itemId", "")
                if item_id and item_id not in all_products:
                    node["keyword_source"] = kw
                    all_products[item_id] = node
            log(f"   🔍 [{kw}] → {len(nodes)} สินค้า")
        except Exception as e:
            log(f"⚠ Shopee API request error [{kw}]: {e}")
        time.sleep(1)

    products = list(all_products.values())
    log(f"📦 Shopee API: รวม {len(products)} สินค้า (ไม่ซ้ำ)")
    return products

def generate_affiliate_links(app_id, app_secret, products):
    import requests
    for p in products:
        link = p.get("productLink", "")
        if not link:
            continue
        query = """mutation {
    generateShortLink(input: { originUrl: "%s" }) {
        shortLink
    }
}""" % link
        payload = json.dumps({"query": query})
        auth = shopee_sign(app_id, app_secret, payload)
        headers = {
            "Content-Type": "application/json",
            "Authorization": auth,
        }
        try:
            resp = requests.post(SHOPEE_API_URL, headers=headers, data=payload, timeout=10)
            data = resp.json()
            short = data.get("data", {}).get("generateShortLink", {}).get("shortLink", "")
            if short:
                p["affiliate_link"] = short
        except Exception:
            pass
        time.sleep(0.5)

    linked = sum(1 for p in products if p.get("affiliate_link"))
    log(f"🔗 Affiliate links: {linked}/{len(products)}")
    return products

# ===== PRODUCT FEED (ข้อมูลจริงจาก Shopee Dashboard) =====
def get_feed_url():
    if os.path.exists(FEED_URL_FILE):
        with open(FEED_URL_FILE, 'r', encoding='utf-8') as f:
            url = f.read().strip()
            if url:
                return url
    return None

def download_product_feed():
    import requests as req
    url = get_feed_url()
    if not url:
        return None
    log("📥 ดาวน์โหลด Shopee Product Feed...")
    try:
        resp = req.get(url, stream=True, timeout=60, allow_redirects=True)
        resp.raise_for_status()
        downloaded = 0
        max_bytes = FEED_MAX_MB * 1024 * 1024
        with open(FEED_CACHE, 'wb') as f:
            for chunk in resp.iter_content(chunk_size=65536):
                f.write(chunk)
                downloaded += len(chunk)
                if downloaded >= max_bytes:
                    break
        resp.close()
        log(f"   📥 ดาวน์โหลด {downloaded // (1024*1024)} MB")
        return FEED_CACHE
    except Exception as e:
        log(f"⚠ Product Feed download error: {e}")
        return None

def filter_feed_products(csv_path):
    import csv
    csv.field_size_limit(1024 * 1024)
    keywords_lower = [kw.lower() for kw in NICHE_KEYWORDS]
    products = []
    rows_read = 0
    try:
        with open(csv_path, 'r', encoding='utf-8', errors='replace') as f:
            reader = csv.DictReader(f)
            for row in reader:
                rows_read += 1
                title = (row.get('title') or '').lower()
                if not any(kw in title for kw in keywords_lower):
                    continue
                try:
                    sold = int(row.get('item_sold') or 0)
                except ValueError:
                    sold = 0
                try:
                    rating = float(row.get('item_rating') or 0)
                except ValueError:
                    rating = 0.0
                try:
                    price = float(row.get('sale_price') or row.get('price') or 0)
                except ValueError:
                    price = 0
                products.append({
                    'name': row.get('title', '')[:120],
                    'price': price,
                    'item_sold': sold,
                    'rating': round(rating, 1),
                    'shop_name': row.get('shop_name', ''),
                    'is_official': row.get('is_official_shop', ''),
                    'is_preferred': row.get('is_preferred_shop', ''),
                    'category': row.get('global_category1', ''),
                    'category2': row.get('global_category2', ''),
                    'product_link': row.get('product_link', ''),
                    'affiliate_link': row.get('product_short link', ''),
                    'stock': row.get('stock', ''),
                    'discount': row.get('discount_percentage', ''),
                })
    except Exception:
        pass
    products.sort(key=lambda x: x['item_sold'], reverse=True)
    log(f"📦 Product Feed: อ่าน {rows_read} แถว → {len(products)} สินค้าตรง niche")
    return products[:50]

# ===== DDGS FALLBACK (ไม่ต้องมี API Key) =====
def search_shopee_via_ddgs():
    from ddgs import DDGS
    queries = [
        "Shopee สินค้าขายดี เครื่องเชื่อม เครื่องมือช่าง 2026",
        "Shopee trending welding tools safety equipment Thailand 2026",
        "สินค้ายอดขายสูง Shopee หน้ากากเชื่อม รองเท้าเซฟตี้ PPE",
        "Shopee affiliate commission สูง เครื่องมือช่าง อุปกรณ์ไฟฟ้า",
        "Shopee ลวดเชื่อม เครื่องเจียร ดอกกัด CNC ขายดี 2026",
    ]
    snippets = []
    try:
        with DDGS() as ddgs:
            for q in queries:
                for r in ddgs.text(q, max_results=4):
                    text = r.get('body', '') + ' ' + r.get('title', '')
                    if text.strip():
                        snippets.append(text[:400])
    except Exception as e:
        log(f"⚠ DuckDuckGo (Shopee) error: {e}")
    combined = "\n\n".join(snippets)
    log(f"   🔍 Shopee (DuckDuckGo): {len(combined)} ตัวอักษร")
    return combined

def search_tiktok_trends():
    from ddgs import DDGS
    queries = [
        "TikTok trending products Thailand เครื่องมือช่าง 2026",
        "TikTok Shop สินค้าขายดี เครื่องเชื่อม safety อุปกรณ์ช่าง",
        "TikTok Creative Center top products tools Thailand 2026",
        "สินค้าขายดี TikTok Shop ไทย PPE เครื่องมือ 2026",
    ]
    snippets = []
    try:
        with DDGS() as ddgs:
            for q in queries:
                for r in ddgs.text(q, max_results=4):
                    text = r.get('body', '') + ' ' + r.get('title', '')
                    if text.strip():
                        snippets.append(text[:400])
    except Exception as e:
        log(f"⚠ DuckDuckGo (TikTok) error: {e}")
    combined = "\n\n".join(snippets)
    log(f"   🔍 TikTok trends: {len(combined)} ตัวอักษร")
    return combined

# ===== CLAUDE AI ANALYSIS =====
PROMPT_TEMPLATE = """คุณเป็น Vera นักวิจัยของบริษัทชมสุข69 เชี่ยวชาญ Shopee Affiliate Marketing
สำหรับครูช่างเชื่อมโลหะ (YouTube/TikTok content creator)

กลุ่มเป้าหมาย: ช่างเชื่อม, นักเรียนอาชีวะ, ช่างเทคนิค, DIY

{data_section}

งาน:
1. เลือกสินค้า 10-15 รายการที่เหมาะสำหรับ affiliate ครูช่างเชื่อม
2. เรียงลำดับตาม: (commission สูง × ยอดขายดี × ตรงกับ niche)
3. แต่ละรายการระบุ:
   - name: ชื่อสินค้า (ย่อให้กระชับ)
   - price_min, price_max: ราคา (จำนวนเต็ม บาท, ประมาณถ้าไม่มีข้อมูลแน่ชัด)
   - commission_rate: % commission โดยประมาณ
   - total_commission: % รวม (base + seller extra ถ้ามี)
   - sales: ยอดขาย (ประมาณ)
   - rating: คะแนน (1-5)
   - shop_name: ชื่อร้าน (ถ้ามี)
   - category: หมวดหมู่
   - reason: เหตุผลที่เหมาะกับ niche (1 ประโยค)
   - content_type: แนะนำ content type: "รีวิว" / "How-to" / "เทียบสินค้า" / "สาธิตใช้งาน"
   - tiktok_trending: true/false
   - keyword_source: keyword ที่ค้นพบสินค้านี้
   - affiliate_link: ลิงก์ affiliate (ถ้ามีในข้อมูล ให้ใส่ตามเดิม ถ้าไม่มีใส่ "")
4. สรุป insights 3 ข้อ: สินค้าอะไรกำลังมา, category ไหน commission ดี, โอกาสทำ content
5. สรุป categories_summary: นับจำนวนสินค้าและเฉลี่ย commission ของแต่ละ category

Commission rates อ้างอิง (Shopee Thailand 2026):
- เครื่องมือช่าง: 3-5%
- PPE/Safety: 4-6%
- อุปกรณ์ไฟฟ้า: 2-4%
- เสื้อผ้า: 5-8%
- อิเล็กทรอนิกส์: 1-3%

ตอบเป็น JSON เท่านั้น ตามโครงสร้าง:
{{
  "products": [
    {{
      "rank": 1, "name": "...", "price_min": 0, "price_max": 0,
      "commission_rate": 0.0, "total_commission": 0.0,
      "sales": 0, "rating": 0.0, "shop_name": "...",
      "category": "...", "reason": "...", "content_type": "...",
      "tiktok_trending": false, "keyword_source": "...",
      "affiliate_link": "..."
    }}
  ],
  "insights": ["...", "...", "..."],
  "categories_summary": {{
    "เครื่องมือช่าง": {{"count": 0, "avg_commission": 0.0}}
  }}
}}"""

def analyze_with_claude(shopee_data, tiktok_data, source_type):
    api_key = get_credential('ANTHROPIC_API_KEY')
    if not api_key:
        log("❌ ไม่พบ ANTHROPIC_API_KEY — ข้าม AI analysis")
        return None

    if source_type in ("feed", "api"):
        products_text = json.dumps(shopee_data[:50], ensure_ascii=False, indent=1)
        label = "Product Feed จริงจาก Shopee" if source_type == "feed" else "API"
        data_section = f"ข้อมูลสินค้า Shopee (จาก{label} เรียงตามยอดขาย):\n{products_text}\n\nข้อมูล TikTok Trending:\n{tiktok_data}"
    else:
        data_section = f"ข้อมูลสินค้า Shopee (จาก DuckDuckGo search):\n{shopee_data}\n\nข้อมูล TikTok Trending:\n{tiktok_data}"

    prompt = PROMPT_TEMPLATE.format(data_section=data_section[:6000])

    try:
        import anthropic
        client = anthropic.Anthropic(api_key=api_key)
        log("🤖 วิเคราะห์ด้วย Claude AI (Vera)...")
        msg = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=8000,
            messages=[{"role": "user", "content": prompt}]
        )
        raw = msg.content[0].text
        # Claude sometimes wraps in ```json ... ```
        raw = re.sub(r'```json\s*', '', raw)
        raw = re.sub(r'```\s*$', '', raw.rstrip())
        m = re.search(r'\{.*\}', raw, re.DOTALL)
        if m:
            json_str = m.group()
            # fix trailing commas before } or ]
            json_str = re.sub(r',\s*([}\]])', r'\1', json_str)
            try:
                data = json.loads(json_str)
            except json.JSONDecodeError as e:
                log(f"   JSON parse attempt 1 failed: {e}")
                # retry: truncate after last complete object in products array
                try:
                    last_good = json_str.rfind('}')
                    while last_good > 0:
                        candidate = json_str[:last_good+1]
                        # count braces
                        opens = candidate.count('{') - candidate.count('}')
                        if opens > 0:
                            candidate += '}' * opens
                        candidate = re.sub(r',\s*([}\]])', r'\1', candidate)
                        try:
                            data = json.loads(candidate)
                            break
                        except json.JSONDecodeError:
                            last_good = json_str.rfind('}', 0, last_good)
                    else:
                        log("⚠ JSON repair failed")
                        return None
                except Exception:
                    log("⚠ JSON repair failed")
                    return None
            count = len(data.get("products", []))
            log(f"✅ Claude วิเคราะห์สำเร็จ — {count} สินค้า")
            return data
        else:
            log("⚠ ไม่พบ JSON ในคำตอบ Claude")
            return None
    except Exception as e:
        log(f"⚠ Claude error: {e}")
        return None

# ===== LOAD / CHECK / SAVE =====
def load_existing():
    if os.path.exists(JSON_FILE):
        try:
            with open(JSON_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    return None

def needs_update(existing):
    if not existing:
        return True
    updated_str = existing.get('updated', '')
    if not updated_str:
        return True
    try:
        last = datetime.datetime.strptime(updated_str, '%Y-%m-%d').date()
        age = (datetime.date.today() - last).days
        log(f"   ข้อมูลล่าสุด: {updated_str} (อายุ {age} วัน)")
        return age >= 1
    except Exception:
        return True

def save_trends(data):
    with open(JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    log(f"💾 บันทึกแล้ว: {JSON_FILE}")

# ===== TASK SCHEDULER SETUP =====
def setup_scheduler():
    bat_file = os.path.join(SCRIPT_DIR, 'run_shopee_trends.bat')
    task_name = "Shopee_TrendUpdate"
    cmd = (
        f'schtasks /create /tn "{task_name}" /tr "{bat_file}" '
        f'/sc DAILY /st 06:00 /f /rl HIGHEST'
    )
    try:
        subprocess.run(cmd, shell=True, check=True)
        log(f"✅ Task Scheduler: สร้าง '{task_name}' (ทุกวัน 06:00)")
    except subprocess.CalledProcessError as e:
        log(f"⚠ Task Scheduler error: {e}")
        log("   ลองรัน setup_shopee_trends.bat ในฐานะ Administrator")

# ===== MAIN =====
def main():
    if '--setup' in sys.argv:
        setup_scheduler()
        return

    log("=" * 55)
    log("⚙️  Shopee Trends Auto-Updater เริ่มทำงาน")
    log("=" * 55)

    ensure_deps()

    existing = load_existing()
    if not needs_update(existing):
        log("✅ ข้อมูลยังใหม่อยู่ (< 1 วัน) — ไม่ต้องอัปเดต")
        return

    # Shopee data — ลำดับ: Product Feed → Open API → DuckDuckGo
    shopee_data = None
    source_type = "ddgs"

    feed_url = get_feed_url()
    if feed_url:
        csv_path = download_product_feed()
        if csv_path:
            products = filter_feed_products(csv_path)
            if products:
                shopee_data = products
                source_type = "feed"
            try:
                os.remove(csv_path)
            except Exception:
                pass

    if not shopee_data:
        app_id = get_credential('SHOPEE_APP_ID')
        app_secret = get_credential('SHOPEE_APP_SECRET')
        if app_id and app_secret:
            log("🛒 ดึงข้อมูลจาก Shopee Affiliate API...")
            shopee_data = search_shopee_products(app_id, app_secret)
            if shopee_data:
                shopee_data = generate_affiliate_links(app_id, app_secret, shopee_data)
            source_type = "api"

    if not shopee_data:
        log("🛒 ใช้ DuckDuckGo fallback")
        shopee_data = search_shopee_via_ddgs()
        source_type = "ddgs"

    # TikTok data
    log("📱 ค้นหา TikTok trending products...")
    tiktok_data = search_tiktok_trends()

    # Claude analysis
    result = analyze_with_claude(shopee_data, tiktok_data, source_type)

    if result:
        result['updated'] = datetime.date.today().isoformat()
        result['source'] = f"shopee_{source_type}+tiktok_ddgs"
        result['niche'] = "ครูช่างเชื่อม / อาชีวศึกษา"
        if source_type == "feed":
            result['feed_status'] = "✅ ใช้ข้อมูลจริงจาก Shopee Product Feed"
        elif source_type == "api":
            result['feed_status'] = "✅ ใช้ข้อมูลจาก Shopee Open API"
        else:
            result['feed_status'] = "⚠️ Feed URL หมดอายุ — ใช้ DuckDuckGo แทน → ไปหน้า Product Feed copy URL ใหม่มาวางใน shopee_feed_url.txt"
            log("⚠️ Product Feed ใช้ไม่ได้ — อาจต้องอัปเดต URL ใน shopee_feed_url.txt")
        save_trends(result)
        log("🎉 อัปเดต Shopee Trends สำเร็จ!")
    else:
        if existing:
            log("⚠ ใช้ข้อมูลเดิม (Claude ไม่ตอบ)")
        else:
            fallback = {
                "updated": datetime.date.today().isoformat(),
                "source": f"shopee_{source_type}+tiktok_ddgs",
                "niche": "ครูช่างเชื่อม / อาชีวศึกษา",
                "products": [],
                "insights": ["ยังไม่มีข้อมูล — ต้องตั้งค่า ANTHROPIC_API_KEY"],
                "categories_summary": {},
                "raw_shopee": shopee_data if source_type == "ddgs" else str(shopee_data)[:2000],
                "raw_tiktok": tiktok_data[:2000] if tiktok_data else "",
            }
            save_trends(fallback)
            log("⚠ บันทึก raw data (ไม่มี AI analysis)")

    log("=" * 55)

if __name__ == '__main__':
    main()
