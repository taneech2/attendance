var CONFIG = {
    storyTextHtml: '<strong>ขั้นตอนที่ 1 — ตะลุยอบรมออนไลน์ผ่าน OVEC Cloud</strong><br><br><strong>สิ่งที่ต้องทำ:</strong><br>• ลงทะเบียนที่เว็บไซต์ <strong>ศูนย์บ่มเพาะผู้ประกอบการอาชีวศึกษา</strong><br>• ระบุรหัสสถานศึกษา 15 หลัก<br>• <strong>อบรมออนไลน์ให้ครบ 15 ชั่วโมง</strong><br>• <strong>สอบผ่านแบบทดสอบท้าย EP</strong> เพื่อรับสิทธิ์ทำแผนธุรกิจ<br><br>⚡ <em>Speed Hack: ต่อยอดจากโครงงานเดิม — นำสิ่งประดิษฐ์หรือโครงการในวิชาเรียนมาประยุกต์ใช้ เพื่อประหยัดเวลาและสร้างความได้เปรียบ!</em>',
    businessPaths: [
        { name: "อุปกรณ์ช่วยงานเชื่อม", profit: 15000, type: "ธุรกิจใหม่/นวัตกรรม", desc: "ประดิษฐ์จิ๊กแม่เหล็ก เครื่องมือช่วยจับฉาก แก้ปัญหาใหม่", focus: "นวัตกรรม, แก้ปัญหาใหม่", ideal: "สายช่าง, สายประดิษฐ์", image: "", icon: "🚀" },
        { name: "เฟอร์นิเจอร์เหล็กสไตล์ลอฟท์", profit: 12000, type: "ธุรกิจขายดี", desc: "โต๊ะ ชั้นวาง ของแต่งร้าน ขายคล่อง กำไรดี ตลาดตอบรับไว", focus: "ขายคล่อง, กำไรดี", ideal: "สายอาหาร, แฟชั่น, พาณิชยกรรม", image: "assets/table.png", icon: "" },
        { name: "รับจ้างเชื่อม/บริการถึงที่", profit: 8000, type: "สุดยอดนักขาย", desc: "รับงานเชื่อม ซ่อมประตู รั้ว เน้นเทคนิค Pitching ปิดการขาย", focus: "เทคนิคการขาย, พรีเซนต์เก่ง", ideal: "คนมีทักษะโน้มน้าวใจ (The Speaker)", image: "", icon: "🎤" },
        { name: "ร่วมทุนกับอู่/ร้านเหล็ก", profit: 10000, type: "ธุรกิจร่วมทุน", desc: "จับมือพันธมิตร สถานประกอบการ ขยายงานด้วยเครือข่าย", focus: "จับมือพันธมิตร (สถานประกอบการ)", ideal: "ทีมคอนเนคชันกว้าง, มีเครือข่าย", image: "", icon: "🤝" }
    ],
    customers: [
        "เจ้าของร้านอาหาร / คาเฟ่ — ต้องการเฟอร์นิเจอร์ลอฟท์",
        "อู่ซ่อมรถ / ร้านมอเตอร์ไซค์ — ต้องการงานเหล็ก",
        "ชาวบ้านในชุมชน — ต้องการซ่อมแซมทั่วไป",
        "โรงงาน / ไซต์ก่อสร้าง — ต้องการช่างเชื่อม"
    ],
    pitchTemplate: '"สวัสดีครับ ผมนักเรียนช่างเชื่อมจากวิทยาลัยการอาชีพบุรีรัมย์ ผมอยากนำเสนอ <strong>[สินค้า]</strong> ที่ผมทำขึ้นมา<br><br><strong>ปัญหา:</strong> ลูกค้าหลายท่านหาช่างเชื่อมคุณภาพดี ราคาเป็นธรรมได้ยาก<br><strong>ทางออก:</strong> ผมใช้ทักษะจากห้องปฏิบัติการจริง รอยเชื่อมทุกจุดได้มาตรฐาน<br><strong>ข้อเสนอ:</strong> สั่งทำได้ตามแบบ ราคานักเรียน งานคุณภาพครับ"'
};

var BMC_DATA = {
    "รับจ้างเชื่อม/บริการถึงที่": {
        partners: ["ร้านขายเหล็ก/วัสดุ", "อู่ซ่อมรถในพื้นที่", "ครู/วิทยาลัย"],
        activities: ["รับงานเชื่อม ซ่อมประตู รั้ว", "สำรวจหน้างาน ออกใบเสนอราคา", "ส่งมอบงาน + รับประกัน"],
        resources: ["เครื่องเชื่อม MMA/MIG", "ฝีมือช่าง + ใบรับรอง", "รถจักรยานยนต์ (ไปหน้างาน)"],
        value: ["งานเชื่อมคุณภาพ ราคาถูกกว่าร้าน", "ไปถึงหน้างานลูกค้า", "รับประกันรอยเชื่อม"],
        relations: ["บริการถึงบ้าน เป็นกันเอง", "LINE ติดต่อง่าย", "ลูกค้าเก่าได้ส่วนลด"],
        channels: ["ปากต่อปาก / ละแวกบ้าน", "Facebook / LINE กลุ่มช่าง", "ป้ายโฆษณาหน้าบ้าน"],
        customers: ["เจ้าของบ้าน", "ร้านค้า / ตลาด", "เกษตรกร (ซ่อมอุปกรณ์)"],
        costs: ["ลวดเชื่อม + แก๊ส", "ค่าเหล็ก/วัสดุ", "ค่าเดินทาง + ค่าไฟ"],
        revenue: ["ค่าแรงงานเชื่อม (ต่อชิ้น/ต่อวัน)", "ค่าวัสดุ + กำไร", "ค่าบริการถึงที่"]
    },
    "เฟอร์นิเจอร์เหล็กสไตล์ลอฟท์": {
        partners: ["ร้านขายเหล็ก/ไม้", "ช่างไม้ (ทำท็อปโต๊ะ)", "เพื่อนร่วมทุน"],
        activities: ["ออกแบบ + เชื่อมโครง", "เคลือบสี กันสนิม", "จัดส่ง + ติดตั้ง"],
        resources: ["เครื่องเชื่อม + เครื่องตัด", "โรงเชื่อม/พื้นที่ทำงาน", "แบบดีไซน์ / Portfolio"],
        value: ["ดีไซน์เท่ ไม่ซ้ำใคร", "สั่งทำตามขนาดได้", "ราคานักเรียน คุณภาพร้าน"],
        relations: ["สั่งทำตามแบบ ปรับได้", "ส่งรูปความคืบหน้า", "รับประกัน 1 ปี"],
        channels: ["Instagram / TikTok โชว์ผลงาน", "ตลาดนัด / งานแฮนด์เมด", "Shopee / Lazada"],
        customers: ["เจ้าของคาเฟ่ / ร้านอาหาร", "คนรักสไตล์ลอฟท์", "ออฟฟิศ / Co-working"],
        costs: ["เหล็ก + ไม้ + สี", "ค่าไฟ + แก๊ส", "ค่าขนส่ง"],
        revenue: ["ขายเฟอร์นิเจอร์ (ต่อชิ้น)", "รับสั่งทำ custom", "ขายแบบออนไลน์"]
    },
    "อุปกรณ์ช่วยงานเชื่อม": {
        partners: ["ร้านขายแม่เหล็ก/อุปกรณ์", "ครูช่าง (ที่ปรึกษา)", "ช่างเชื่อมรุ่นพี่ (ทดสอบ)"],
        activities: ["วิจัย + ออกแบบต้นแบบ", "ผลิต + ทดสอบคุณภาพ", "ทำคู่มือ + วิดีโอสาธิต"],
        resources: ["ความรู้ด้านเชื่อม + นวัตกรรม", "เครื่องกลึง / เจียร", "สิทธิบัตร / อนุสิทธิบัตร"],
        value: ["ช่วยจับฉากแม่นยำ 100%", "ประหยัดเวลาทำงาน 50%", "ใช้ง่าย ทนทาน ซ่อมได้"],
        relations: ["สอนวิธีใช้ผ่านวิดีโอ", "กลุ่ม LINE ผู้ใช้งาน", "รับคืน/เปลี่ยนภายใน 30 วัน"],
        channels: ["Shopee / Lazada", "งานแสดงสินค้า / ประกวด", "YouTube สาธิตการใช้งาน"],
        customers: ["ช่างเชื่อมมืออาชีพ", "โรงงาน / บริษัทรับเหมา", "สถาบันการศึกษา"],
        costs: ["วัสดุผลิต (เหล็ก + แม่เหล็ก)", "ค่าบรรจุภัณฑ์", "ค่าจดสิทธิบัตร"],
        revenue: ["ขายอุปกรณ์ (ต่อชิ้น)", "ขายส่งให้ร้านเครื่องมือ", "ค่า License ถ้าจดสิทธิบัตร"]
    },
    "ร่วมทุนกับอู่/ร้านเหล็ก": {
        partners: ["อู่ซ่อมรถ / ร้านเหล็กดัด", "สถานประกอบการในพื้นที่", "วิทยาลัย (สนับสนุน)"],
        activities: ["ประสานงานกับพันธมิตร", "รับงานเชื่อมจากสถานประกอบการ", "ร่วมผลิต + แบ่งงาน"],
        resources: ["เครือข่ายสถานประกอบการ", "ทักษะเชื่อมเฉพาะทาง", "สัญญาร่วมทุน MOU"],
        value: ["มีพันธมิตรหนุนหลัง น่าเชื่อถือ", "รับงานใหญ่ได้ ที่คนเดียวทำไม่ไหว", "ลดต้นทุนด้วยการแชร์ทรัพยากร"],
        relations: ["ประชุมร่วมกับพันธมิตรสม่ำเสมอ", "แบ่งกำไรตามสัดส่วนที่ตกลง", "สร้างความไว้วางใจระยะยาว"],
        channels: ["ผ่านเครือข่ายพันธมิตร", "งานจัดซื้อจัดจ้างโรงงาน", "สมาคมช่าง / หอการค้า"],
        customers: ["โรงงานอุตสาหกรรม", "บริษัทรับเหมาก่อสร้าง", "หน่วยงานราชการ (จัดซื้อ)"],
        costs: ["วัสดุ (แชร์กับพันธมิตร)", "ค่าเดินทาง + ประสานงาน", "ค่าทำสัญญา/MOU"],
        revenue: ["ส่วนแบ่งกำไรจากงานร่วม", "ค่าแรงเชื่อมตามสัญญา", "โบนัสเมื่องานสำเร็จตามเป้า"]
    }
};

var PDCA_DATA = {
    "อุปกรณ์ช่วยงานเชื่อม": {
        product: "จิ๊กแม่เหล็กช่วยจับฉาก",
        plan: ["เขียนแบบจิ๊ก กำหนดขนาด มุม 45/90 องศา","คำนวณวัสดุ: เหล็กแผ่น + แม่เหล็ก + สกรู","คำนวณต้นทุน (วัสดุ+ค่าไฟ+ค่าแรง)","ตั้งราคาขาย (ต้นทุน + กำไร 40-60%)","กำหนดเวลาผลิต: ชิ้นละกี่ชั่วโมง"],
        doList: ["ตัดเหล็กแผ่นตามแบบ (เลื่อย/พลาสม่า)","เจาะรู ติดตั้งแม่เหล็กถาวร","เชื่อมประกอบตัวจิ๊ก ขัดเรียบ","พ่นสี/ชุบกันสนิม พิมพ์โลโก้","ทดสอบแรงยึด — จับชิ้นงานได้แน่น"],
        check: ["ตรวจแรงยึดแม่เหล็ก — จับฉากได้แม่น","วัดมุม — ตรง 90° ±1°","ทดสอบกับงานเชื่อมจริง — ใช้งานสะดวก","ตรวจผิวสี — สวยงาม ไม่ลอก","บันทึกบัญชี + ถ่ายรูป Portfolio"],
        act: ["ลูกค้าอยากได้ขนาดอื่นไหม?","แม่เหล็กแบบไหนแรงกว่า ถูกกว่า?","ทำบรรจุภัณฑ์ + คู่มือใช้งาน","เพิ่มรุ่นใหม่: จิ๊กมุม 30/60 องศา","ถามช่างเชื่อมจริง — อยากให้ปรับอะไร?"]
    },
    "เฟอร์นิเจอร์เหล็กสไตล์ลอฟท์": {
        product: "โต๊ะเหล็กสไตล์ลอฟท์",
        plan: ["เขียนแบบโต๊ะ กำหนดขนาด สูง 75 ซม.","คำนวณวัสดุ: เหล็กกล่อง + ไม้ท็อป + สี","คำนวณต้นทุน (เหล็ก+ไม้+สี+ค่าแรง)","ตั้งราคาขาย (ต้นทุน + กำไร 30-50%)","กำหนดเวลาผลิต: ตัวละกี่วัน"],
        doList: ["ตัดเหล็กกล่องตามแบบ (4 ขา + โครง)","เชื่อมประกอบโครง (Tack → เชื่อมเต็ม)","เจียรรอยเชื่อม ขัดผิวเหล็กให้เรียบ","พ่นสีดำด้าน/เคลียร์กันสนิม","ติดตั้งท็อปไม้ ขันสกรู ปรับระดับ"],
        check: ["ตรวจรอยเชื่อม — เนี้ยบ ไม่มี Undercut","วัดขนาด — ตรงตามแบบ ±2mm","ทดสอบรับน้ำหนัก — วางของ 50 กก. ไม่โยก","ตรวจสี/ผิว — สวยงาม ไม่มีรอย","บันทึกบัญชี + ถ่ายรูปก่อน-หลัง"],
        act: ["ลูกค้าชอบสีอะไร? ดำด้าน/ทอง/เงิน","ลดต้นทุน: ซื้อเหล็กที่ไหนถูกกว่า?","เพิ่มดีไซน์: ชั้นวาง/ล้อเลื่อน","ทำชุด set (โต๊ะ+เก้าอี้) ราคาพิเศษ","ถามลูกค้า: อยากให้ปรับอะไรบ้าง?"]
    },
    "รับจ้างเชื่อม/บริการถึงที่": {
        product: "ที่เก็บขุมทรัพย์ (ถังขยะเหล็ก)",
        plan: ["เขียนแบบถังขยะ กำหนดขนาด สูง 80 ซม.","คำนวณวัสดุ: เหล็กกลม + เหล็กแผ่น + ห่วง","คำนวณต้นทุน (วัสดุ+ลวดเชื่อม+ค่าไฟ)","ตั้งราคาขาย (ต้นทุน + กำไร 30-50%)","นัดลูกค้า กำหนดวันส่งงาน"],
        doList: ["ตัดเหล็กกลมตามแบบ (ขา+โครง+ห่วง)","ดัดเหล็กเป็นรูปทรง ขึ้นโครง","เชื่อมประกอบ (Tack → เชื่อมเต็ม)","เจียรรอยเชื่อม ขัดผิวให้เรียบ","พ่นสีกันสนิม ใส่ถุงขยะทดสอบ"],
        check: ["ตรวจรอยเชื่อม — แข็งแรง ไม่มีรูพรุน","วัดขนาด — ตรงตามแบบ ตั้งได้มั่นคง","ทดสอบ — ใส่ถุงขยะได้พอดี ไม่หลุด","ตรวจสี — เรียบสวย กันสนิมได้","บันทึกบัญชี + ถ่ายรูปผลงาน"],
        act: ["ลูกค้าอยากได้ขนาดไหนอีก?","ทำรุ่นแยกขยะ (2-3 ช่อง) ขายแพงขึ้น","ลดเวลาผลิต: ทำจิ๊กขึ้นรูปเร็วขึ้น","เพิ่มลวดลาย: ดัดเหล็กเป็นลาย","ถามลูกค้า: ตั้งตรงไหนดี? ปรับขนาด?"]
    },
    "ร่วมทุนกับอู่/ร้านเหล็ก": {
        product: "ชั้นวางสินค้าเหล็ก (สั่งผลิตให้ร้านค้า)",
        plan: ["ประชุมกับพันธมิตร กำหนดสเปกชิ้นงาน","เขียนแบบชั้นวาง กำหนดขนาด+จำนวนชั้น","แบ่งงาน: ใครตัด ใครเชื่อม ใครพ่นสี","คำนวณต้นทุนรวม แบ่งกำไรตามสัดส่วน","ทำใบเสนอราคา + สัญญาส่งมอบ"],
        doList: ["ทีม A: ตัดเหล็กตามแบบทั้งหมด","ทีม B: เชื่อมประกอบโครง + ชั้น","ทีม C: เจียร ขัด พ่นสี","ประกอบชิ้นส่วนทั้งหมดเข้าด้วยกัน","ขนส่ง + ติดตั้งที่ร้านลูกค้า"],
        check: ["ตรวจรอยเชื่อมทุกจุด — ได้มาตรฐาน","ทดสอบรับน้ำหนัก — วางสินค้าได้จริง","ลูกค้าตรวจรับ — ตรงตามสเปก","บันทึกบัญชีร่วม — แบ่งกำไรตามตกลง","ถ่ายรูปผลงาน — เก็บ Portfolio ทีม"],
        act: ["ทีมทำงานด้วยกันราบรื่นไหม?","ขั้นตอนไหนช้าสุด? ปรับอย่างไร?","พันธมิตรมีงานให้อีกไหม?","เพิ่มสินค้าใหม่: ป้ายร้าน/ราวแขวน","ประชุมทีม: สรุปบทเรียนรอบนี้"]
    }
};

var state = {
    goalTarget: 0, goalName: '', currentFund: 0, round: 0,
    playerName: '', bizName: '', bizImage: '', estimatedProfit: 0, targetCustomer: ''
};

function formatMoney(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + ' ล้าน';
    return n.toLocaleString();
}

function pickGoal(amount, name) {
    state.goalTarget = amount;
    state.goalName = name;
    state.currentFund = 0;
    state.round = 0;
    state.playerName = document.getElementById('student-name').value.trim() || 'นักเรียนช่าง';

    document.getElementById('goal-dashboard').classList.remove('hidden');
    document.getElementById('goal-name').innerText = name;
    document.getElementById('goal-target').innerText = formatMoney(amount);
    document.getElementById('goal-current').innerText = '0';
    document.getElementById('goal-bar').style.width = '0%';

    document.getElementById('ui-story-text').innerHTML = CONFIG.storyTextHtml;
    buildCards();
    buildCustomers();
    showStage(1);
    document.getElementById('phase-1-banner').classList.remove('hidden');
}

function buildCards() {
    var grid = document.getElementById('ui-business-cards');
    grid.innerHTML = '';
    CONFIG.businessPaths.forEach(function(biz) {
        var media = biz.icon ? '<div class="icon-placeholder">' + biz.icon + '</div>' : '<img src="' + biz.image + '" alt="' + biz.name + '">';
        var div = document.createElement('div');
        div.className = 'biz-card';
        div.innerHTML = media + '<h3>' + biz.name + '</h3><p class="biz-type-tag">' + biz.type + '</p><p>' + biz.desc + '</p><p class="biz-focus"><strong>Focus:</strong> ' + biz.focus + '</p><p class="biz-ideal"><strong>Ideal:</strong> ' + biz.ideal + '</p><small>คาดการณ์กำไร: ' + biz.profit.toLocaleString() + ' บาท</small>';
        div.onclick = function() { selectBiz(biz.name, biz.image, biz.profit); };
        grid.appendChild(div);
    });
}

function buildCustomers() {
    var list = document.getElementById('ui-customers-list');
    list.innerHTML = '';
    CONFIG.customers.forEach(function(c) {
        var btn = document.createElement('button');
        btn.className = 'btn btn-outline';
        btn.innerText = c;
        btn.onclick = function() { selectTarget(c); };
        list.appendChild(btn);
    });
}

function updateGoalUI() {
    document.getElementById('goal-current').innerText = formatMoney(state.currentFund);
    var pct = Math.min((state.currentFund / state.goalTarget) * 100, 100);
    document.getElementById('goal-bar').style.width = pct + '%';
}

function updateTimeline(step) {
    document.querySelectorAll('.tl-step').forEach(function(el) {
        var s = parseInt(el.dataset.step);
        el.classList.toggle('done', s < step);
        el.classList.toggle('active', s === step);
    });
    document.querySelectorAll('.tl-line').forEach(function(line, i) {
        line.classList.toggle('done', i < step - 1);
    });
}

function showStage(n) {
    document.querySelectorAll('.stage').forEach(function(s) { s.classList.add('hidden'); });
    document.getElementById('stage-' + n).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStage(n) {
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
        state.round++;
        document.getElementById('round-counter').innerText = 'รอบ PDCA ที่ ' + state.round;
        fillPDCA(state.bizName);
        var rev = state.estimatedProfit * 2;
        var cost = state.estimatedProfit;
        document.getElementById('revenue-amount').innerText = rev.toLocaleString();
        document.getElementById('cost-amount').innerText = cost.toLocaleString();
        document.getElementById('profit-amount').innerText = (rev - cost).toLocaleString() + ' บาท';
        document.getElementById('earn-btn').classList.remove('hidden');
        document.getElementById('end-message').classList.add('hidden');
    }
    showStage(n);
}

function toggleBMC(mode, btn) {
    document.querySelectorAll('.toggle-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById('bmc-short').classList.toggle('hidden', mode !== 'short');
    document.getElementById('bmc-full').classList.toggle('hidden', mode !== 'full');
}

function fillBMC(bizName) {
    var data = BMC_DATA[bizName];
    if (!data) return;
    var fields = ['partners','activities','resources','value','relations','channels','customers','costs','revenue'];
    fields.forEach(function(f) {
        var el = document.getElementById('bmc-' + f);
        if (el && data[f]) {
            el.innerHTML = '<ul>' + data[f].map(function(item) { return '<li>' + item + '</li>'; }).join('') + '</ul>';
        }
    });
}

function fillPDCA(bizName) {
    var data = PDCA_DATA[bizName];
    if (!data) return;
    document.getElementById('pdca-product-name').innerText = data.product;
    var mapping = {plan:'pdca-plan', doList:'pdca-do', check:'pdca-check', act:'pdca-act'};
    Object.keys(mapping).forEach(function(key) {
        var el = document.getElementById(mapping[key]);
        if (el && data[key]) {
            el.innerHTML = '<div class="checklist">' + data[key].map(function(item) {
                return '<label><input type="checkbox"> ' + item + '</label>';
            }).join('') + '</div>';
        }
    });
}

function selectBiz(name, image, profit) {
    state.bizName = name; state.bizImage = image; state.estimatedProfit = profit;
    document.getElementById('chosen-biz').innerText = name;
    fillBMC(name);
    nextStage(3);
}

function selectTarget(target) {
    state.targetCustomer = target;
    nextStage(4);
}

function earnMoney() {
    state.currentFund += state.estimatedProfit;
    if (state.currentFund > state.goalTarget) state.currentFund = state.goalTarget;
    updateGoalUI();

    document.getElementById('earn-btn').classList.add('hidden');
    document.getElementById('end-message').classList.remove('hidden');

    var heading = document.getElementById('end-heading');
    var sub = document.getElementById('end-sub');
    var btn = document.getElementById('end-btn');

    if (state.currentFund >= state.goalTarget) {
        heading.innerText = '🎉 สำเร็จ! บรรลุเป้าหมาย "' + state.goalName + '" แล้ว!';
        heading.style.color = '#b45309';
        sub.innerText = state.playerName + ' ใช้ ' + state.round + ' รอบ PDCA ทำเป้าหมาย ' + formatMoney(state.goalTarget) + ' บาทสำเร็จ!';
        btn.innerText = '🔄 เล่นใหม่ เปลี่ยนเป้าหมาย';
        btn.onclick = function() { location.reload(); };
    } else {
        var remain = state.goalTarget - state.currentFund;
        heading.innerText = 'เยี่ยม! เข้าใกล้เป้าหมายอีกก้าว!';
        heading.style.color = '#16a34a';
        sub.innerText = 'เหลืออีก ' + formatMoney(remain) + ' บาท — ใช้ PDCA ปรับปรุงรอบต่อไป!';
        btn.innerText = '⚡ รับงานรอบถัดไป (PDCA)';
        btn.onclick = function() { nextStage(5); };
    }
}

function restartCycle() { nextStage(5); }
