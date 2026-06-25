// ==============================================================================
// ⚙️ URL สำหรับส่งรายงาน Google Sheet — ครูธานี deploy แล้ววาง URL ตรงนี้
// ==============================================================================
const REPORT_URL = '';  // <-- วาง URL ของ Google Apps Script Web App ที่นี่

// ==============================================================================
// สถานการณ์จำลอง — เลือกโจทย์ที่ท้าทาย!
// ==============================================================================
const SCENARIOS = [
    {
        id: "mom",
        title: "💔 แม่ป่วยหนัก",
        tagline: "ค่ารักษา 50,000 บาท... เวลาไม่รอ",
        targetName: "ค่ารักษาแม่",
        targetPrice: 50000,
        story: `ผมชื่อ <strong>"[ชื่อ]"</strong> เรียนอยู่ ปวช.1 แผนกช่างเชื่อม<br>
            หมอบอกว่าแม่ต้องผ่าตัดด่วน ค่ารักษา <strong class="highlight-orange">50,000 บาท</strong><br>
            พ่อเสียตั้งแต่เด็ก... ผมเป็นความหวังเดียวของแม่<br><br>
            <strong>ผมจะใช้ฝีมือช่างเชื่อมที่เรียนมา สร้างธุรกิจหาเงินก้อนนี้ให้ได้!</strong>`,
        pitch: `"สวัสดีครับ ผมชื่อ[ชื่อ] นักเรียนช่างเชื่อม ปวช.1 ครับ
            ผมตั้งใจทำ <strong>[สินค้า]</strong> ทุกชิ้นด้วยฝีมือเต็มร้อย
            ตอนนี้ผมกำลังหาค่ารักษาแม่ที่ป่วยหนักครับ
            ทุกบาทที่ลูกค้าอุดหนุน จะช่วยให้แม่ผมได้ผ่าตัดเร็วขึ้นครับ"`
    },
    {
        id: "bike",
        title: "🏍️ มอเตอร์ไซค์คันแรก",
        tagline: "อยากมีรถเป็นของตัวเอง 35,000 บาท",
        targetName: "มอเตอร์ไซค์คันแรก",
        targetPrice: 35000,
        story: `ผมชื่อ <strong>"[ชื่อ]"</strong> บ้านอยู่ไกลจากวิทยาลัย 30 กม.<br>
            ทุกวันต้องนั่งรถสองแถว เสียค่ารถวันละ 80 บาท เดือนหนึ่งหมดไป 2,400!<br>
            ถ้ามีมอเตอร์ไซค์ ก็ไปกลับสะดวก แถมรับงานหลังเลิกเรียนได้<br><br>
            <strong>เป้าหมาย: หาเงิน 35,000 บาท ซื้อรถคันแรกให้ได้ก่อนปิดเทอม!</strong>`,
        pitch: `"สวัสดีครับ ผมชื่อ[ชื่อ] จากแผนกช่างเชื่อมครับ
            <strong>[สินค้า]</strong> ของผมทำจากเหล็กคุณภาพ เชื่อมทุกจุดแน่นหนา
            ผมกำลังเก็บเงินซื้อมอเตอร์ไซค์คันแรกครับ จะได้รับงานได้มากขึ้น
            สนใจสั่งทำได้เลยครับ ราคาเป็นกันเอง งานประณีตครับ"`
    },
    {
        id: "shop",
        title: "🏪 เปิดร้านเป็นเจ้าของ",
        tagline: "ฝันอยากมีร้านเชื่อมเป็นของตัวเอง 80,000 บาท",
        targetName: "ทุนเปิดร้านเชื่อม",
        targetPrice: 80000,
        story: `ผมชื่อ <strong>"[ชื่อ]"</strong> ฝันอยากมีร้านเชื่อมเป็นของตัวเอง<br>
            ลุงสอนเชื่อมให้ตั้งแต่เด็ก แต่ลุงเพิ่งเกษียณ ร้านกำลังจะปิด<br>
            ถ้ามีเงินทุน <strong class="highlight-orange">80,000 บาท</strong> ผมเซ้งร้านลุงมาทำต่อได้<br><br>
            <strong>ร้านนี้คืออนาคตของผม — ผมจะไม่ปล่อยให้มันปิดตัว!</strong>`,
        pitch: `"สวัสดีครับ ผมชื่อ[ชื่อ] จากแผนกช่างเชื่อมครับ
            ผมทำ <strong>[สินค้า]</strong> ด้วยเทคนิคที่ลุงผมสอนมาตั้งแต่เด็ก
            ตอนนี้ผมกำลังสะสมทุนเพื่อเซ้งร้านเชื่อมมาทำเองครับ
            ทุกชิ้นงานจะทำเต็มฝีมือ รับประกันความพอใจครับ"`
    },
    {
        id: "sister",
        title: "🎓 ส่งน้องเรียนต่อ",
        tagline: "น้องสอบติดม.ดัง ค่าเทอม 45,000 บาท",
        targetName: "ค่าเทอมน้อง",
        targetPrice: 45000,
        story: `ผมชื่อ <strong>"[ชื่อ]"</strong> มีน้องสาวชื่อ "ฝ้าย" เรียนเก่งมาก<br>
            ฝ้ายสอบติดคณะวิศวกรรมศาสตร์ ม.ขอนแก่น!<br>
            แต่พ่อแม่เป็นเกษตรกร ไม่มีเงินจ่ายค่าเทอม <strong class="highlight-orange">45,000 บาท</strong><br><br>
            <strong>ผมเป็นพี่ ผมต้องช่วย! ฝีมือเชื่อมของผมจะเปลี่ยนอนาคตน้อง!</strong>`,
        pitch: `"สวัสดีครับ ผมชื่อ[ชื่อ] นักเรียนช่างเชื่อมครับ
            <strong>[สินค้า]</strong> ของผมทำอย่างประณีต รอยเชื่อมเนี้ยบทุกจุด
            ตอนนี้ผมกำลังหาเงินส่งน้องเรียนมหาวิทยาลัยครับ
            ถ้าสนใจสั่งทำ ผมพร้อมบริการเต็มที่ครับ"`
    }
];

// ==============================================================================
// ธุรกิจ + ลูกค้า
// ==============================================================================
const BUSINESSES = [
    { name: "โต๊ะเหล็กสไตล์ลอฟต์", profit: 10000, type: "ธุรกิจขายดี", desc: "นำเหล็กมาเชื่อมเป็นโต๊ะสุดเท่", image: "assets/table.png", icon: "" },
    { name: "อุปกรณ์ช่วยเชื่อมรุ่นใหม่", profit: 15000, type: "ธุรกิจนวัตกรรม", desc: "ประดิษฐ์จิ๊กแม่เหล็กช่วยจับฉาก", image: "assets/student.png", icon: "🔧" },
    { name: "รับซ่อมโครงรถคลาสสิก", profit: 8000, type: "ธุรกิจร่วมทุน", desc: "อ๊อกเหล็กซ่อมแชสซีรถเก่ากับช่างยนต์", image: "assets/table.png", icon: "🚗" },
    { name: "ชั้นวางของเหล็กดัด", profit: 7000, type: "ธุรกิจมาแรง", desc: "ดัดเหล็กเป็นชั้นวางสวยๆ ขายตามร้าน", image: "", icon: "🏗️" }
];

const CUSTOMERS = [
    "เจ้าของคาเฟ่ที่ชอบของแต่งร้านดิบๆ",
    "อู่ซ่อมรถยนต์ละแวกบ้าน",
    "เพื่อนนักเรียนช่าง",
    "แม่ค้าตลาดนัดอยากได้ชั้นวาง"
];

// ==============================================================================
// เหตุการณ์สุ่ม — เกิดขึ้นทุกรอบใน Stage 5
// ==============================================================================
const EVENTS = [
    { icon: "🔥", title: "ลูกค้าประทับใจ!", desc: "ลูกค้าชอบงานมาก แนะนำเพื่อนมาสั่งเพิ่ม", effect: +0.3, label: "โบนัสแนะนำ", type: "good" },
    { icon: "📱", title: "ดังในโซเชียล!", desc: "มีคนถ่ายรูปงานลง TikTok ยอดสั่งเพิ่มขึ้น!", effect: +0.5, label: "โบนัสไวรัล", type: "good" },
    { icon: "🏆", title: "ได้รางวัลฝีมือแรงงาน!", desc: "ชนะประกวดฝีมือช่างระดับจังหวัด ชื่อเสียงเพิ่ม!", effect: +0.4, label: "โบนัสรางวัล", type: "good" },
    { icon: "🤝", title: "ครูช่วยหาลูกค้า!", desc: "ครูประจำแผนกแนะนำงานให้จากคนรู้จัก", effect: +0.25, label: "โบนัสครู", type: "good" },
    { icon: "📈", title: "วัสดุขึ้นราคา!", desc: "เหล็กและลวดเชื่อมขึ้นราคา 20% ต้นทุนเพิ่ม...", effect: -0.2, label: "ค่าวัสดุเพิ่ม", type: "bad" },
    { icon: "⚡", title: "ไฟฟ้าดับ!", desc: "ไฟฟ้าดับทั้งวัน ต้องจ่ายค่าล่วงเวลาเพื่อทำให้เสร็จทัน", effect: -0.15, label: "ค่าล่วงเวลา", type: "bad" },
    { icon: "😤", title: "ลูกค้าเรื่องมาก!", desc: "ลูกค้าให้แก้งาน 3 รอบ เสียเวลาและวัสดุเพิ่ม", effect: -0.25, label: "ต้นทุนแก้งาน", type: "bad" },
    { icon: "🔨", title: "เครื่องเชื่อมเสีย!", desc: "เครื่องเชื่อมพังต้องซ่อม เสียเงินและเวลา", effect: -0.3, label: "ค่าซ่อมเครื่อง", type: "bad" },
    { icon: "😐", title: "ปกติดี ไม่มีอะไรพิเศษ", desc: "งานเป็นไปตามแผน ไม่มีเรื่องเซอร์ไพรส์", effect: 0, label: "", type: "neutral" },
    { icon: "😐", title: "วันนี้เรียบง่าย", desc: "ทำงานเสร็จตามกำหนด ทุกอย่างราบรื่น", effect: 0, label: "", type: "neutral" }
];

// ==============================================================================
// Game State
// ==============================================================================
let state = {
    scenario: null,
    currentFund: 0,
    bizName: '',
    bizImage: '',
    estimatedProfit: 0,
    targetCustomer: '',
    round: 0
};

// ==============================================================================
// Init — สร้างหน้าเลือกสถานการณ์
// ==============================================================================
function initGame() {
    const grid = document.getElementById('scenario-grid');
    grid.innerHTML = '';
    SCENARIOS.forEach((s, i) => {
        grid.innerHTML += `
            <div class="scenario-card" onclick="pickScenario(${i})">
                <div class="scenario-emoji">${s.title.split(' ')[0]}</div>
                <h3>${s.title.substring(s.title.indexOf(' ') + 1)}</h3>
                <p class="scenario-tagline">${s.tagline}</p>
                <span class="scenario-target">เป้าหมาย: ${s.targetPrice.toLocaleString()} บาท</span>
            </div>`;
    });
}

// ==============================================================================
// เลือกสถานการณ์
// ==============================================================================
function pickScenario(index) {
    const nameInput = document.getElementById('player-name').value.trim();
    const playerName = nameInput || 'นักเรียนช่าง';

    state.scenario = JSON.parse(JSON.stringify(SCENARIOS[index]));
    state.scenario.story = state.scenario.story.replaceAll('[ชื่อ]', playerName);
    state.scenario.pitch = state.scenario.pitch.replaceAll('[ชื่อ]', playerName);
    state.playerName = playerName;
    state.currentFund = 0;
    state.round = 0;

    document.getElementById('fund-dashboard').classList.remove('hidden');
    document.getElementById('ui-target-name').innerText = "เป้าหมาย: " + state.scenario.targetName;
    document.getElementById('ui-target-price').innerText = state.scenario.targetPrice.toLocaleString();
    document.getElementById('current-fund').innerText = '0';
    document.getElementById('progress-bar').style.width = '0%';

    document.getElementById('ui-story-text').innerHTML = state.scenario.story;

    // Build business cards
    const cardsGrid = document.getElementById('ui-business-cards');
    cardsGrid.innerHTML = '';
    BUSINESSES.forEach(biz => {
        const media = biz.icon
            ? `<div class="icon-placeholder">${biz.icon}</div>`
            : `<img src="${biz.image}" alt="${biz.name}">`;
        cardsGrid.innerHTML += `
            <div class="biz-card" onclick="selectBiz('${biz.name.replace(/'/g,"\\'")}', '${biz.image}', ${biz.profit})">
                ${media}
                <h3>${biz.name}</h3>
                <p>${biz.type}: ${biz.desc}</p>
                <small>คาดการณ์กำไร: ${biz.profit.toLocaleString()} บาท</small>
            </div>`;
    });

    // Build customers
    const list = document.getElementById('ui-customers-list');
    list.innerHTML = '';
    CUSTOMERS.forEach(c => {
        list.innerHTML += `<button class="btn btn-outline" onclick="selectTarget('${c.replace(/'/g,"\\'")}')">${c}</button>`;
    });

    showStage(1);
}

// ==============================================================================
// Navigation
// ==============================================================================
function showStage(n) {
    document.querySelectorAll('.stage').forEach(s => s.classList.add('hidden'));
    document.getElementById(`stage-${n}`).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStage(n) {
    if (n === 4) {
        document.getElementById('target-customer').innerText = state.targetCustomer;
        document.getElementById('pitch-img').src = state.bizImage || 'assets/table.png';
        const pitch = state.scenario.pitch.replace('[สินค้า]', state.bizName);
        document.getElementById('ui-pitch-text').innerHTML = pitch;
    }

    if (n === 5) {
        setupStage5();
    }

    showStage(n);
}

// ==============================================================================
// Stage 5 — เหตุการณ์สุ่ม + บัญชี
// ==============================================================================
function setupStage5() {
    state.round++;
    document.getElementById('round-counter').innerText = `รอบที่ ${state.round}`;

    // สุ่มเหตุการณ์
    const evt = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    const eventBox = document.getElementById('event-box');
    const eventCostRow = document.getElementById('event-cost-row');

    // คำนวณตัวเลข
    const baseRevenue = state.estimatedProfit * 2;
    const baseCost = state.estimatedProfit;
    let eventAmount = Math.round(state.estimatedProfit * Math.abs(evt.effect));
    let finalProfit = baseRevenue - baseCost;

    // แสดง event
    eventBox.classList.remove('hidden', 'evt-good', 'evt-bad', 'evt-neutral');
    eventBox.classList.add('evt-' + evt.type);
    document.getElementById('event-icon').innerText = evt.icon;
    document.getElementById('event-title').innerText = evt.title;
    document.getElementById('event-desc').innerText = evt.desc;

    if (evt.effect !== 0) {
        eventCostRow.style.display = 'flex';
        document.getElementById('event-cost-label').innerText = evt.label + ':';
        if (evt.effect > 0) {
            finalProfit += eventAmount;
            document.getElementById('event-cost-value').innerHTML = `<span class="text-green">+ ${eventAmount.toLocaleString()} บาท</span>`;
            document.getElementById('event-effect').innerText = `กำไรเพิ่ม +${eventAmount.toLocaleString()} บาท!`;
        } else {
            finalProfit -= eventAmount;
            if (finalProfit < 500) finalProfit = 500;
            document.getElementById('event-cost-value').innerHTML = `<span class="text-red">- ${eventAmount.toLocaleString()} บาท</span>`;
            document.getElementById('event-effect').innerText = `กำไรลด -${eventAmount.toLocaleString()} บาท...`;
        }
    } else {
        eventCostRow.style.display = 'none';
        document.getElementById('event-effect').innerText = '';
    }

    state._currentProfit = finalProfit;

    document.getElementById('revenue-amount').innerText = baseRevenue.toLocaleString();
    document.getElementById('cost-amount').innerText = baseCost.toLocaleString();
    document.getElementById('profit-amount').innerText = finalProfit.toLocaleString() + ' บาท';

    document.getElementById('earn-btn').classList.remove('hidden');
    document.getElementById('end-message').classList.add('hidden');
}

// ==============================================================================
// Actions
// ==============================================================================
function selectBiz(name, image, profit) {
    state.bizName = name;
    state.bizImage = image;
    state.estimatedProfit = profit;
    document.getElementById('chosen-biz').innerText = name;
    nextStage(3);
}

function selectTarget(target) {
    state.targetCustomer = target;
    nextStage(4);
}

function earnMoney() {
    state.currentFund += state._currentProfit;
    if (state.currentFund > state.scenario.targetPrice) {
        state.currentFund = state.scenario.targetPrice;
    }

    document.getElementById('current-fund').innerText = state.currentFund.toLocaleString();
    const pct = (state.currentFund / state.scenario.targetPrice) * 100;
    document.getElementById('progress-bar').style.width = pct + '%';

    document.getElementById('earn-btn').classList.add('hidden');
    document.getElementById('end-message').classList.remove('hidden');

    const heading = document.getElementById('end-heading');
    const sub = document.getElementById('end-sub');
    const btn = document.getElementById('end-btn');

    if (state.currentFund >= state.scenario.targetPrice) {
        heading.innerText = `🎉 สำเร็จ! บรรลุเป้าหมาย "${state.scenario.targetName}" แล้ว!`;
        heading.style.color = '#ffcc00';
        sub.innerText = `คุณใช้ ${state.round} รอบ ในการทำเป้าหมายสำเร็จ! ลองโจทย์อื่นดูไหม?`;
        btn.innerText = '🔄 เล่นโจทย์ใหม่';
        btn.onclick = () => location.reload();
    } else {
        const remain = state.scenario.targetPrice - state.currentFund;
        heading.innerText = 'เยี่ยม! เข้าใกล้เป้าหมายอีกก้าว!';
        heading.style.color = '#2ea043';
        sub.innerText = `เหลืออีก ${remain.toLocaleString()} บาท — ใช้ PDCA ปรับปรุงงานรอบต่อไป!`;
        btn.innerText = '⚡ รับงานรอบถัดไป (PDCA)';
        btn.onclick = () => nextStage(5);
    }
}

function restartCycle() {
    nextStage(5);
}

// ==============================================================================
// ส่งรายงานไป Google Sheet
// ==============================================================================
function sendReport() {
    if (!REPORT_URL) {
        document.getElementById('report-status').innerText = '⚠️ ยังไม่ได้ตั้งค่า URL — แจ้งครูผู้สอน';
        document.getElementById('report-status').style.color = '#f59e0b';
        return;
    }

    const btn = document.getElementById('report-btn');
    btn.disabled = true;
    btn.innerText = '⏳ กำลังส่ง...';
    document.getElementById('report-status').innerText = '';

    const payload = {
        name: state.playerName || 'ไม่ระบุ',
        scenario: state.scenario.targetName,
        target: state.scenario.targetPrice,
        business: state.bizName,
        customer: state.targetCustomer,
        rounds: state.round,
        earned: state.currentFund,
        completed: state.currentFund >= state.scenario.targetPrice
    };

    fetch(REPORT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(() => {
        btn.innerText = '✅ ส่งแล้ว!';
        document.getElementById('report-status').innerText = 'ส่งรายงานให้ครูเรียบร้อยแล้ว';
        document.getElementById('report-status').style.color = '#2ea043';
    })
    .catch(() => {
        btn.disabled = false;
        btn.innerText = '📊 ส่งรายงานให้ครู';
        document.getElementById('report-status').innerText = '❌ ส่งไม่สำเร็จ ลองอีกครั้ง';
        document.getElementById('report-status').style.color = '#f85149';
    });
}

// Run
initGame();
