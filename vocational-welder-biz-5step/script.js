const CONFIG = {
    storyTextHtml: `
        <strong>ขั้นตอนที่ 1 — สมัครเป็นผู้ประกอบการ EP</strong><br>
        ลงทะเบียนที่เว็บไซต์ <strong>ศูนย์บ่มเพาะผู้ประกอบการอาชีวศึกษา</strong> ผ่านระบบ OVEC Cloud<br><br>
        <strong>สิ่งที่ต้องเตรียม:</strong><br>
        • ระบุรหัสสถานศึกษา 15 หลัก<br>
        • กรอกข้อมูลส่วนตัวและแผนกวิชา<br>
        • เลือกประเภทธุรกิจที่สนใจ
    `,
    businessPaths: [
        { name: "รับจ้างเชื่อม/ซ่อมแซม", profit: 8000, type: "ธุรกิจเจ้าของคนเดียว", desc: "รับงานเชื่อม ซ่อมประตู รั้วเหล็ก ตะแกรง", image: "", icon: "🔧" },
        { name: "เฟอร์นิเจอร์เหล็กสไตล์ลอฟท์", profit: 12000, type: "ห้างหุ้นส่วน", desc: "ร่วมกับเพื่อนผลิตโต๊ะ ชั้นวาง ของแต่งร้าน", image: "assets/table.png", icon: "" },
        { name: "อุปกรณ์ช่วยงานเชื่อม (นวัตกรรม)", profit: 15000, type: "บริษัทจำกัด", desc: "ประดิษฐ์จิ๊กแม่เหล็ก เครื่องมือช่วยจับฉาก", image: "", icon: "💡" },
        { name: "งานซ่อมบำรุงให้ชุมชน", profit: 6000, type: "วิสาหกิจชุมชน", desc: "รวมกลุ่มรับซ่อมอุปกรณ์เกษตร ประตู หน้าต่าง", image: "", icon: "🌱" }
    ],
    customers: [
        "เจ้าของร้านอาหาร / คาเฟ่ — ต้องการเฟอร์นิเจอร์ลอฟท์",
        "อู่ซ่อมรถ / ร้านมอเตอร์ไซค์ — ต้องการงานเหล็ก",
        "ชาวบ้านในชุมชน — ต้องการซ่อมแซมทั่วไป",
        "โรงงาน / ไซต์ก่อสร้าง — ต้องการช่างเชื่อม"
    ],
    pitchTemplate: `
        "สวัสดีครับ ผมนักเรียนช่างเชื่อมจากวิทยาลัยการอาชีพบุรีรัมย์
        ผมอยากนำเสนอ <strong>[สินค้า]</strong> ที่ผมทำขึ้นมา<br><br>
        <strong>ปัญหา:</strong> ลูกค้าหลายท่านหาช่างเชื่อมคุณภาพดี ราคาเป็นธรรมได้ยาก<br>
        <strong>ทางออก:</strong> ผมใช้ทักษะจากห้องปฏิบัติการจริง รอยเชื่อมทุกจุดได้มาตรฐาน<br>
        <strong>ข้อเสนอ:</strong> สั่งทำได้ตามแบบ ราคานักเรียน งานคุณภาพครับ"
    `
};

let state = { currentStage: 1, totalEarned: 0, bizName: '', bizImage: '', estimatedProfit: 0, targetCustomer: '' };

function initGame() {
    document.getElementById('ui-story-text').innerHTML = CONFIG.storyTextHtml;

    const grid = document.getElementById('ui-business-cards');
    grid.innerHTML = '';
    CONFIG.businessPaths.forEach(biz => {
        const media = biz.icon ? `<div class="icon-placeholder">${biz.icon}</div>` : `<img src="${biz.image}" alt="${biz.name}">`;
        grid.innerHTML += `<div class="biz-card" onclick="selectBiz('${biz.name.replace(/'/g,"\\'")}','${biz.image}',${biz.profit})">${media}<h3>${biz.name}</h3><p>${biz.type}: ${biz.desc}</p><small>คาดการณ์กำไร: ${biz.profit.toLocaleString()} บาท</small></div>`;
    });

    const list = document.getElementById('ui-customers-list');
    list.innerHTML = '';
    CONFIG.customers.forEach(c => {
        list.innerHTML += `<button class="btn btn-outline" onclick="selectTarget('${c.replace(/'/g,"\\'")}')">${c}</button>`;
    });
}

function updateTimeline(step) {
    document.querySelectorAll('.tl-step').forEach(el => {
        const s = +el.dataset.step;
        el.classList.toggle('done', s < step);
        el.classList.toggle('active', s === step);
    });
    document.querySelectorAll('.tl-line').forEach((line, i) => { line.classList.toggle('done', i < step - 1); });
}

function nextStage(n) {
    document.querySelectorAll('.stage').forEach(s => s.classList.add('hidden'));
    document.getElementById('stage-' + n).classList.remove('hidden');
    document.getElementById('phase-1-banner').classList.toggle('hidden', n > 2);
    if (n >= 3) document.getElementById('phase-2-banner').classList.remove('hidden');
    else document.getElementById('phase-2-banner').classList.add('hidden');
    updateTimeline(n);

    if (n === 4) {
        document.getElementById('target-customer').innerText = state.targetCustomer;
        document.getElementById('pitch-img').src = state.bizImage || 'assets/table.png';
        document.getElementById('ui-pitch-text').innerHTML = CONFIG.pitchTemplate.replace('[สินค้า]', state.bizName);
    }
    if (n === 5) {
        var rev = state.estimatedProfit * 2, cost = state.estimatedProfit;
        document.getElementById('revenue-amount').innerText = rev.toLocaleString();
        document.getElementById('cost-amount').innerText = cost.toLocaleString();
        document.getElementById('profit-amount').innerText = (rev - cost).toLocaleString() + ' บาท';
        document.getElementById('earn-btn').classList.remove('hidden');
        document.getElementById('end-message').classList.add('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectBiz(name, image, profit) {
    state.bizName = name; state.bizImage = image; state.estimatedProfit = profit;
    document.getElementById('chosen-biz').innerText = name;
    nextStage(3);
}
function selectTarget(target) { state.targetCustomer = target; nextStage(4); }
function earnMoney() {
    state.totalEarned += state.estimatedProfit;
    document.getElementById('earn-btn').classList.add('hidden');
    document.getElementById('end-message').classList.remove('hidden');
}
function restartCycle() { nextStage(2); }

initGame();
