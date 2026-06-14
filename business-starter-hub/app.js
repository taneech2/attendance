const stepsData = [
    {
        title: "1. Entrepreneurial Mindset",
        desc: "สำรวจความพร้อมและรูปแบบการทำธุรกิจของคุณ",
        html: `
            <div class="input-group">
                <label>ประเภทธุรกิจ (ตามเกณฑ์ศูนย์บ่มเพาะฯ อาชีวะ)</label>
                <select id="ovec-type" name="ovec-type">
                    <option value="ธุรกิจใหม่ / นวัตกรรม (เน้นความแปลกใหม่ แก้ปัญหาได้จริง)">ธุรกิจใหม่ / นวัตกรรม (เน้นความแปลกใหม่ แก้ปัญหาได้จริง)</option>
                    <option value="ธุรกิจขายดี / สุดยอดนักขาย (เน้นเทคนิคนำเสนอที่ดึงดูด)">ธุรกิจขายดี / สุดยอดนักขาย (เน้นเทคนิคนำเสนอที่ดึงดูด)</option>
                    <option value="ธุรกิจร่วมทุน (เน้นจับมือกับพันธมิตรภายนอก)">ธุรกิจร่วมทุน (เน้นจับมือกับพันธมิตรภายนอก)</option>
                </select>
            </div>
            <div class="input-group">
                <label>เป้าหมายการเริ่มต้นธุรกิจของคุณคืออะไร?</label>
                <div class="radio-grid">
                    <label class="radio-card">
                        <input type="radio" name="mindset" value="side-hustle" checked>
                        <h4>Side Hustle (อาชีพเสริม)</h4>
                        <p>ทำควบคู่กับงานประจำ ใช้เวลาว่างเพื่อสร้างรายได้</p>
                    </label>
                    <label class="radio-card">
                        <input type="radio" name="mindset" value="full-time">
                        <h4>Full-Time Startup</h4>
                        <p>ลุยเต็มตัวเพื่อสร้างธุรกิจหลักและพร้อมขยายกิจการ</p>
                    </label>
                </div>
            </div>
        `
    },
    {
        title: "2. PESTEL Analysis",
        desc: "เลือกเทรนด์ระดับโลก (Mega Trends) ที่จะช่วยให้ธุรกิจคุณเติบโต",
        html: `
            <div class="input-group">
                <label>ธุรกิจของคุณจะเกาะกระแสใด?</label>
                <select id="trend" name="trend">
                    <option value="health">Health & Wellness (สุขภาพและความเป็นอยู่ที่ดี)</option>
                    <option value="tech">Digital & AI (เทคโนโลยีและปัญญาประดิษฐ์)</option>
                    <option value="green">Sustainability (รักษ์โลก/สิ่งแวดล้อม)</option>
                    <option value="convenience">Convenience Economy (ความสะดวกสบาย/เดลิเวอรี่)</option>
                </select>
            </div>
        `
    },
    {
        title: "3. SWOT Analysis",
        desc: "ประเมินจุดแข็งและข้อจำกัดเบื้องต้นของคุณ",
        html: `
            <div class="input-group">
                <label>อะไรคือทักษะที่โดดเด่นที่สุดของคุณ? (Strengths)</label>
                <select id="skill" name="skill">
                    <option value="service">งานบริการ / ให้คำปรึกษา / ดูแลลูกค้า</option>
                    <option value="content">การสร้างคอนเทนต์ / การตลาด / เล่าเรื่อง</option>
                    <option value="tech">ทักษะเชิงเทคนิค / เขียนโปรแกรม / ออกแบบ</option>
                    <option value="sales">การขาย / การเจรจาต่อรอง / หาสินค้า</option>
                </select>
            </div>
            <div class="input-group">
                <label>เงินทุนเริ่มต้น (Budget)</label>
                <select id="budget" name="budget">
                    <option value="low">ต่ำกว่า 5,000 บาท (เน้นลงแรง)</option>
                    <option value="medium">5,000 - 50,000 บาท</option>
                    <option value="high">มากกว่า 50,000 บาทขึ้นไป</option>
                </select>
            </div>
        `
    },
    {
        title: "4. Customer Centric (5W1H)",
        desc: "ใครคือลูกค้าตัวจริงของคุณ?",
        html: `
            <div class="input-group">
                <label>คุณต้องการขายให้ใครเป็นหลัก? (Target Audience)</label>
                <select id="audience" name="audience">
                    <option value="b2c-online">คนทั่วไปที่ซื้อของออนไลน์ (B2C Online)</option>
                    <option value="b2c-local">คนในพื้นที่ / ชุมชน (B2C Local)</option>
                    <option value="b2b">ลูกค้าองค์กร / ธุรกิจอื่น (B2B)</option>
                </select>
            </div>
            <div class="input-group">
                <label>ลูกค้ากลุ่มนี้กำลังเจอปัญหา (Pain Point) อะไร?</label>
                <input type="text" id="painpoint" placeholder="เช่น ไม่มีเวลาทำอาหาร, หาร้านซ่อมยาก, ขาดคนทำกราฟิก" required>
            </div>
        `
    },
    {
        title: "5. Marketing Strategy (STP)",
        desc: "สร้างความแตกต่าง (Differentiation) เพื่อไม่ให้ต้องแข่งด้วยราคา",
        html: `
            <div class="input-group">
                <label>อะไรคือ 'จุดเด่น' ที่ทำให้ลูกค้าต้องเลือกคุณแทนคู่แข่ง?</label>
                <input type="text" id="differentiation" placeholder="เช่น ส่งเร็วกว่า, บริการหลังการขายดีมาก, รสชาติต้นตำรับ" required>
            </div>
        `
    },
    {
        title: "6. Value Proposition",
        desc: "คุณค่าที่แท้จริงที่คุณส่งมอบ",
        html: `
            <div class="input-group">
                <label>สินค้าหรือบริการของคุณคืออะไร?</label>
                <input type="text" id="product" placeholder="เช่น คอร์สสอนภาษาออนไลน์, บริการทำความสะอาดคอนโด, แบรนด์เสื้อผ้า" required>
            </div>
        `
    },
    {
        title: "7. Business Model Setup",
        desc: "วางแผนโครงสร้างรายได้",
        html: `
            <div class="input-group">
                <label>คุณจะหารายได้ (Revenue Stream) อย่างไร?</label>
                <select id="revenue" name="revenue">
                    <option value="sale">ขายสินค้าเป็นชิ้น / ขายขาด</option>
                    <option value="service">ค่าบริการรายครั้ง / รายชั่วโมง</option>
                    <option value="subscription">ระบบสมาชิกรายเดือน (Subscription)</option>
                    <option value="commission">ค่าคอมมิชชั่น / นายหน้า</option>
                </select>
            </div>
        `
    },
    {
        title: "8. McKinsey 7S (Team & Resources)",
        desc: "คุณวางแผนจะดำเนินงานนี้อย่างไร?",
        html: `
            <div class="input-group">
                <label>คุณมีทีมงานกี่คนในตอนเริ่มต้น?</label>
                <select id="team" name="team">
                    <option value="solo">Solopreneur (ทำคนเดียว)</option>
                    <option value="small">ทีมเล็ก (2-4 คน)</option>
                    <option value="outsource">ทำคนเดียว + ใช้ Outsource เป็นหลัก</option>
                </select>
            </div>
        `
    },
    {
        title: "9. SMART Goals",
        desc: "ตั้งเป้าหมายแรกเพื่อลงมือทำ",
        html: `
            <div class="input-group">
                <label>เป้าหมายรายได้ (ต่อเดือน) ภายใน 3 เดือนแรก</label>
                <input type="number" id="goal-revenue" placeholder="เช่น 15000" required>
            </div>
            <div class="input-group">
                <label>เป้าหมายจำนวนลูกค้า (ราย) ภายใน 3 เดือนแรก</label>
                <input type="number" id="goal-customers" placeholder="เช่น 50" required>
            </div>
        `
    },
    {
        title: "10. Financial Needs",
        desc: "ความต้องการขอสินเชื่อ",
        html: `
            <div class="input-group">
                <label>จำนวนเงินที่ต้องการขอสินเชื่อ (บาท)</label>
                <input type="number" id="loan-amount" placeholder="เช่น 100000" required>
            </div>
            <div class="input-group">
                <label>วัตถุประสงค์การขอกู้เงิน</label>
                <select id="loan-purpose" name="loan-purpose">
                    <option value="working-capital">เงินทุนหมุนเวียน (ซื้อของเข้าร้าน)</option>
                    <option value="equipment">ซื้อเครื่องจักร / อุปกรณ์ (Assets)</option>
                    <option value="renovation">ตกแต่ง / ปรับปรุงสถานที่</option>
                </select>
            </div>
        `
    },
    {
        title: "11. Financial Projections",
        desc: "คาดการณ์จุดคุ้มทุนเบื้องต้น",
        html: `
            <div class="input-group">
                <label>ราคาขายเฉลี่ย (ต่อ 1 หน่วย / ครั้ง)</label>
                <input type="number" id="price-per-unit" placeholder="เช่น 500" required>
            </div>
            <div class="input-group">
                <label>ต้นทุนแปรผัน (ต่อ 1 หน่วย / ครั้ง) เช่น ค่าของ, ค่าส่ง</label>
                <input type="number" id="cost-per-unit" placeholder="เช่น 200" required>
            </div>
            <div class="input-group">
                <label>ต้นทุนคงที่ต่อเดือน (ค่าเช่าร้าน, เงินเดือน)</label>
                <input type="number" id="fixed-cost" placeholder="เช่น 15000" required>
            </div>
        `
    },
    {
        title: "12. Collateral & Risks",
        desc: "การค้ำประกันและความเสี่ยง (สำหรับยื่นกู้)",
        html: `
            <div class="input-group">
                <label>หลักทรัพย์ค้ำประกัน (Collateral)</label>
                <select id="collateral" name="collateral">
                    <option value="none">ไม่มี (ขอกู้สินเชื่อบุคคล / บสย. ค้ำประกัน)</option>
                    <option value="personal">มีคนค้ำประกัน (Guarantor)</option>
                    <option value="asset">มีหลักทรัพย์ (ที่ดิน / บ้าน / รถ)</option>
                </select>
            </div>
        `
    }
];

let currentStep = 0;
const userAnswers = {};

// DOM Elements
const landingSection = document.getElementById('landing-section');
const appSection = document.getElementById('app-section');
const blueprintSection = document.getElementById('blueprint-section');
const stepContainer = document.getElementById('step-container');
const stepIndicator = document.getElementById('step-indicator');
const progressBar = document.getElementById('progress-bar');

const startBtn = document.getElementById('start-journey-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const finishBasicBtn = document.getElementById('finish-basic-btn');
const finishBtn = document.getElementById('finish-btn');
const restartBtn = document.getElementById('restart-btn');
const printBtn = document.getElementById('print-btn');
const btnTabBmc = document.getElementById('btn-tab-bmc');
const btnTabPitch = document.getElementById('btn-tab-pitch');
const btnTabBank = document.getElementById('btn-tab-bank');
const tabBmc = document.getElementById('tab-bmc');
const tabPitch = document.getElementById('tab-pitch');
const tabBank = document.getElementById('tab-bank');

// Event Listeners
btnTabBmc.addEventListener('click', () => {
    btnTabBmc.classList.add('active');
    btnTabPitch.classList.remove('active');
    btnTabBank.classList.remove('active');
    tabBmc.classList.remove('hidden');
    tabPitch.classList.add('hidden');
    tabBank.classList.add('hidden');
});

btnTabPitch.addEventListener('click', () => {
    btnTabPitch.classList.add('active');
    btnTabBmc.classList.remove('active');
    btnTabBank.classList.remove('active');
    tabPitch.classList.remove('hidden');
    tabBmc.classList.add('hidden');
    tabBank.classList.add('hidden');
});

btnTabBank.addEventListener('click', () => {
    btnTabBank.classList.add('active');
    btnTabBmc.classList.remove('active');
    btnTabPitch.classList.remove('active');
    tabBank.classList.remove('hidden');
    tabBmc.classList.add('hidden');
    tabPitch.classList.add('hidden');
});

startBtn.addEventListener('click', () => {
    landingSection.classList.remove('active-section');
    landingSection.classList.add('hidden-section');
    appSection.classList.remove('hidden-section');
    appSection.classList.add('active-section');
    renderStep();
});

nextBtn.addEventListener('click', () => {
    saveCurrentStepData();
    if (currentStep < stepsData.length - 1) {
        currentStep++;
        renderStep();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
});

finishBasicBtn.addEventListener('click', () => {
    saveCurrentStepData();
    generateBlueprint(false);
});

finishBtn.addEventListener('click', () => {
    saveCurrentStepData();
    generateBlueprint(true);
});

restartBtn.addEventListener('click', () => {
    location.reload();
});

printBtn.addEventListener('click', () => {
    window.print();
});

// Setup custom radio card logic when rendering
function setupRadioCards() {
    const radioCards = document.querySelectorAll('.radio-card');
    radioCards.forEach(card => {
        const input = card.querySelector('input');
        if(input.checked) card.classList.add('selected');
        
        input.addEventListener('change', (e) => {
            radioCards.forEach(c => c.classList.remove('selected'));
            if(e.target.checked) card.classList.add('selected');
        });
    });
}

function renderStep() {
    const step = stepsData[currentStep];
    
    // Update Header and Progress
    stepIndicator.innerText = `ขั้นตอนที่ ${currentStep + 1} / ${stepsData.length} : ${step.title.split('.')[1].trim()}`;
    progressBar.style.width = `${((currentStep + 1) / stepsData.length) * 100}%`;

    // Inject HTML
    stepContainer.innerHTML = `
        <div class="step-content">
            <h2>${step.title}</h2>
            <p class="step-desc">${step.desc}</p>
            ${step.html}
        </div>
    `;

    setupRadioCards();

    // Restore previous data if exists
    restoreStepData();

    // Update Buttons
    if (currentStep === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }

    if (currentStep === 8) { // Step 9
        nextBtn.classList.remove('hidden');
        nextBtn.innerHTML = 'ถัดไป (ทำแผนการเงิน) <i class="fa-solid fa-arrow-right"></i>';
        finishBasicBtn.classList.remove('hidden');
        finishBtn.classList.add('hidden');
    } else if (currentStep === stepsData.length - 1) { // Step 12
        nextBtn.classList.add('hidden');
        nextBtn.innerHTML = 'ถัดไป <i class="fa-solid fa-arrow-right"></i>';
        finishBasicBtn.classList.add('hidden');
        finishBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        nextBtn.innerHTML = 'ถัดไป <i class="fa-solid fa-arrow-right"></i>';
        finishBasicBtn.classList.add('hidden');
        finishBtn.classList.add('hidden');
    }
}

function saveCurrentStepData() {
    const inputs = stepContainer.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.type === 'radio' && !input.checked) return;
        userAnswers[input.name || input.id] = input.value;
    });
}

function restoreStepData() {
    const inputs = stepContainer.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        const id = input.name || input.id;
        if (userAnswers[id]) {
            if (input.type === 'radio') {
                if (input.value === userAnswers[id]) {
                    input.checked = true;
                    input.parentElement.classList.add('selected');
                }
            } else {
                input.value = userAnswers[id];
            }
        }
    });
}

// Generate the final BMC and Blueprint
function generateBlueprint(includeBank) {
    appSection.classList.remove('active-section');
    appSection.classList.add('hidden-section');
    blueprintSection.classList.remove('hidden-section');
    blueprintSection.classList.add('active-section');

    if (!includeBank) {
        btnTabBank.classList.add('hidden');
        btnTabBmc.classList.add('active');
        btnTabBank.classList.remove('active');
        btnTabPitch.classList.remove('active');
        tabBmc.classList.remove('hidden');
        tabBank.classList.add('hidden');
        tabPitch.classList.add('hidden');
    } else {
        btnTabBank.classList.remove('hidden');
    }

    const product = userAnswers.product || "ธุรกิจใหม่";
    const painpoint = userAnswers.painpoint || "ปัญหาของลูกค้า";
    const differentiation = userAnswers.differentiation || "ความโดดเด่น";
    const budget = userAnswers.budget;
    const skill = userAnswers.skill;
    const audience = userAnswers.audience;
    const revenueType = userAnswers.revenue;

    // Logic to suggest channels and cost structure based on inputs
    let channels = "Social Media (Facebook, TikTok, IG)";
    if(audience === 'b2b') channels = "LinkedIn, Direct Sales, Email Outreach, Connection";
    if(audience === 'b2c-local') channels = "หน้าร้าน, Google My Business, กลุ่ม Facebook จังหวัด";

    let keyResources = "ความรู้/ทักษะ (Intellectual)";
    if(budget === 'high') keyResources += ", เงินลงทุน (Financial), อุปกรณ์/สถานที่ (Physical)";
    if(userAnswers.team !== 'solo') keyResources += ", ทีมงาน (Human)";

    let keyActivities = "การทำตลาด, การให้บริการ, การพัฒนาสินค้า";
    if(skill === 'content') keyActivities = "สร้างสรรค์คอนเทนต์, ยิงแอด, สร้างแบรนด์";
    
    let costStructure = "ค่าใช้จ่ายแปรผัน (Variable Cost) ตามการขาย";
    if(budget === 'high') costStructure += ", ค่าเช่า/ค่าจ้างคงที่ (Fixed Cost)";

    const bmcHTML = `
        <div class="plan-section">
            <h3><i class="fa-solid fa-bullseye"></i> Business Identity</h3>
            <p><strong>ชื่อโปรเจกต์:</strong> ${product}</p>
            <p><strong>จุดยืนของแบรนด์ (Positioning):</strong> แก้ปัญหา "${painpoint}" ด้วย "${differentiation}"</p>
            <p><strong>เกาะกระแส (Trend):</strong> ${userAnswers.trend.toUpperCase()}</p>
        </div>

        <div class="plan-section">
            <h3><i class="fa-solid fa-table-cells-large"></i> Business Model Canvas</h3>
            <div class="bmc-grid">
                <div class="bmc-box bmc-kp">
                    <h4>Key Partners <i class="fa-solid fa-handshake"></i></h4>
                    <p>ซัพพลายเออร์, แพลตฟอร์มออนไลน์, เครือข่ายที่เกี่ยวข้องกับ ${product}</p>
                </div>
                <div class="bmc-box bmc-ka">
                    <h4>Key Activities <i class="fa-solid fa-clipboard-list"></i></h4>
                    <p>${keyActivities}</p>
                </div>
                <div class="bmc-box bmc-kr">
                    <h4>Key Resources <i class="fa-solid fa-box-open"></i></h4>
                    <p>${keyResources}</p>
                </div>
                <div class="bmc-box bmc-vp">
                    <h4>Value Propositions <i class="fa-solid fa-gift"></i></h4>
                    <p><strong>${product}</strong></p>
                    <p>ช่วยแก้ปัญหา: ${painpoint}</p>
                    <p>จุดเด่น: ${differentiation}</p>
                </div>
                <div class="bmc-box bmc-cr">
                    <h4>Customer Relationships <i class="fa-solid fa-heart"></i></h4>
                    <p>บริการอย่างใส่ใจ, การทำ CRM, ให้คำปรึกษา</p>
                </div>
                <div class="bmc-box bmc-ch">
                    <h4>Channels <i class="fa-solid fa-truck"></i></h4>
                    <p>${channels}</p>
                </div>
                <div class="bmc-box bmc-cs">
                    <h4>Customer Segments <i class="fa-solid fa-users"></i></h4>
                    <p>${audience.toUpperCase()}</p>
                </div>
                <div class="bmc-box bmc-cost">
                    <h4>Cost Structure <i class="fa-solid fa-money-bill-wave"></i></h4>
                    <p>${costStructure}</p>
                </div>
                <div class="bmc-box bmc-rev">
                    <h4>Revenue Streams <i class="fa-solid fa-coins"></i></h4>
                    <p>รายได้จาก: ${revenueType}</p>
                </div>
            </div>
        </div>

        <div class="plan-section">
            <h3><i class="fa-solid fa-flag-checkered"></i> SMART Goal & Action Plan (ภายใน 3 เดือน)</h3>
            <ul class="plan-list">
                <li><i class="fa-solid fa-check-circle"></i> <strong>เป้าหมายรายได้:</strong> ${userAnswers['goal-revenue']} บาท/เดือน</li>
                <li><i class="fa-solid fa-check-circle"></i> <strong>เป้าหมายลูกค้า:</strong> ${userAnswers['goal-customers']} ราย</li>
                <li><i class="fa-solid fa-check-circle"></i> <strong>Action 1:</strong> เปิดช่องทาง ${channels} ทันทีภายในสัปดาห์นี้</li>
                <li><i class="fa-solid fa-check-circle"></i> <strong>Action 2:</strong> นำเสนอ ${product} ไปยังลูกค้ากลุ่ม ${audience.toUpperCase()} เพื่อทดสอบตลาด (Market Test)</li>
                <li><i class="fa-solid fa-check-circle"></i> <strong>Action 3:</strong> จัดทำคอนเทนต์เพื่อสื่อสารเรื่อง "${differentiation}"</li>
            </ul>
        </div>
    `;

    document.getElementById('tab-bmc').innerHTML = bmcHTML;

    // --- Generate Pitch Proposal ---
    const ovecType = userAnswers['ovec-type'] || 'ไม่ระบุ';
    const pitchHTML = `
        <div class="plan-section">
            <h3><i class="fa-solid fa-microphone-lines"></i> บทพูด Pitching (5-10 นาที)</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">สคริปต์นี้เรียบเรียงตามหลัก Storytelling สำหรับการประกวดแผนธุรกิจศูนย์บ่มเพาะฯ (ประเภท: <strong style="color: var(--primary-light);">${ovecType}</strong>)</p>
            
            <div class="financial-grid" style="display: flex; flex-direction: column; gap: 1rem;">
                <div class="finance-box" style="text-align: left; padding: 1.2rem;">
                    <h4 style="color: var(--primary-light); font-size: 1.1rem; margin-bottom: 0.8rem;">1. ทักทาย & แนะนำตัว (Hook)</h4>
                    <p>เรียนคณะกรรมการที่เคารพ พวกเราคือทีมผู้พัฒนา "${product}" ธุรกิจที่สร้างสรรค์ขึ้นมาเพื่อแก้ปัญหา "${painpoint}" ให้กับ "${audience}" ครับ/ค่ะ</p>
                </div>
                <div class="finance-box" style="text-align: left; padding: 1.2rem;">
                    <h4 style="color: var(--primary-light); font-size: 1.1rem; margin-bottom: 0.8rem;">2. ปัญหาและโอกาส (Problem & Opportunity)</h4>
                    <p>คุณเคยเจอปัญหาแบบนี้ไหมครับ? ... นั่นคือเหตุผลที่เราทำโปรเจกต์นี้ขึ้นมา เพื่อเป็นทางออกที่ดีที่สุดสำหรับผู้ที่เจอปัญหานี้</p>
                </div>
                <div class="finance-box" style="text-align: left; padding: 1.2rem;">
                    <h4 style="color: var(--primary-light); font-size: 1.1rem; margin-bottom: 0.8rem;">3. สินค้าของเราคืออะไร & ดีกว่าคู่แข่งอย่างไร? (Solution & Value)</h4>
                    <p>"${product}" ของเราทำงานโดยการ ${revenueType} ซึ่งโดดเด่นกว่าในตลาด เพราะ "${differentiation}" และนี่คือไม้ตายของเราที่ทำให้ลูกค้าต้องเลือกเรา</p>
                </div>
                <div class="finance-box" style="text-align: left; padding: 1.2rem;">
                    <h4 style="color: var(--primary-light); font-size: 1.1rem; margin-bottom: 0.8rem;">4. เราจะขายใคร & ขายอย่างไร? (Market & Channels)</h4>
                    <p>กลุ่มลูกค้าหลักของเราคือ ${audience} โดยเราจะเข้าถึงพวกเขาผ่านช่องทาง "${channels}" เป็นหลัก</p>
                </div>
                <div class="finance-box" style="text-align: left; padding: 1.2rem;">
                    <h4 style="color: var(--primary-light); font-size: 1.1rem; margin-bottom: 0.8rem;">5. แผนการเงิน & อนาคต (Financials & Goal)</h4>
                    <p>เป้าหมายใน 3 เดือนแรกของเราคือ สร้างรายได้ ${userAnswers['goal-revenue'] || '0'} บาท และมีลูกค้า ${userAnswers['goal-customers'] || '0'} ราย ซึ่งโมเดลธุรกิจของเรามีอัตราการเติบโตและจุดคุ้มทุนที่ชัดเจน</p>
                </div>
                <div class="finance-box" style="text-align: left; padding: 1.2rem;">
                    <h4 style="color: var(--primary-light); font-size: 1.1rem; margin-bottom: 0.8rem;">6. ปิดท้าย (Call to Action)</h4>
                    <p>ขอบคุณคณะกรรมการทุกท่านที่ให้โอกาส "${product}" จากทีมของเรา... เราพร้อมและมั่นใจที่จะทำธุรกิจนี้ให้เกิดขึ้นจริง ขอบคุณครับ/ค่ะ!</p>
                </div>
            </div>
        </div>
    `;

    document.getElementById('tab-pitch').innerHTML = pitchHTML;

    if (includeBank) {
        // --- Generate Bank Proposal ---
        const loanAmount = parseInt(userAnswers['loan-amount']) || 0;
        const price = parseInt(userAnswers['price-per-unit']) || 0;
        const variableCost = parseInt(userAnswers['cost-per-unit']) || 0;
        const fixedCost = parseInt(userAnswers['fixed-cost']) || 0;
        
        let grossMargin = price - variableCost;
        let breakEvenUnits = grossMargin > 0 ? Math.ceil(fixedCost / grossMargin) : 0;
        let breakEvenRevenue = breakEvenUnits * price;

        const bankHTML = `
            <div class="plan-section">
                <h3><i class="fa-solid fa-file-signature"></i> บทสรุปผู้บริหาร (Executive Summary)</h3>
                <p><strong>โครงการ:</strong> ${product}</p>
                <p><strong>โมเดลรายได้:</strong> ${revenueType.toUpperCase()}</p>
                <p><strong>กลุ่มลูกค้าเป้าหมาย:</strong> ${audience.toUpperCase()}</p>
                <p>ธุรกิจนี้มุ่งเน้นการแก้ปัญหา "${painpoint}" ด้วยจุดเด่น "${differentiation}" โดยคาดหวังรายได้ที่ ${userAnswers['goal-revenue'] || '0'} บาทใน 3 เดือนแรก</p>
            </div>

            <div class="plan-section">
                <h3><i class="fa-solid fa-sack-dollar"></i> ความต้องการสินเชื่อ (Loan Request)</h3>
                <div class="financial-grid">
                    <div class="finance-box">
                        <h4>วงเงินที่ต้องการกู้</h4>
                        <div class="amount">${loanAmount.toLocaleString()} บาท</div>
                    </div>
                    <div class="finance-box">
                        <h4>วัตถุประสงค์</h4>
                        <div class="amount neutral">${userAnswers['loan-purpose'] === 'working-capital' ? 'เงินทุนหมุนเวียน' : userAnswers['loan-purpose'] === 'equipment' ? 'ซื้อเครื่องจักร/อุปกรณ์' : 'ปรับปรุงสถานที่'}</div>
                    </div>
                    <div class="finance-box">
                        <h4>การค้ำประกัน</h4>
                        <div class="amount neutral">${userAnswers['collateral'] === 'none' ? 'บสย. ค้ำประกัน' : userAnswers['collateral'] === 'personal' ? 'บุคคลค้ำประกัน' : 'หลักทรัพย์ค้ำประกัน'}</div>
                    </div>
                </div>
            </div>

            <div class="plan-section">
                <h3><i class="fa-solid fa-calculator"></i> การวิเคราะห์จุดคุ้มทุน (Break-even Analysis)</h3>
                <div class="financial-grid">
                    <div class="finance-box">
                        <h4>กำไรต่อหน่วย (Gross Margin)</h4>
                        <div class="amount">${grossMargin.toLocaleString()} บาท</div>
                    </div>
                    <div class="finance-box">
                        <h4>ต้นทุนคงที่ต่อเดือน (Fixed Cost)</h4>
                        <div class="amount expense">${fixedCost.toLocaleString()} บาท</div>
                    </div>
                    <div class="finance-box">
                        <h4>จุดคุ้มทุน (Break-even)</h4>
                        <div class="amount neutral">${breakEvenUnits.toLocaleString()} ยูนิต/เดือน</div>
                        <p style="font-size: 0.8rem; color: #94A3B8; margin-top: 5px;">(ยอดขาย ${breakEvenRevenue.toLocaleString()} บาท)</p>
                    </div>
                </div>
                <p style="margin-top: 1.5rem; color: var(--text-muted); font-size: 0.95rem;">
                    * หมายเหตุ: หากยอดขายต่อเดือนต่ำกว่า ${breakEvenUnits.toLocaleString()} ยูนิต ธุรกิจจะขาดทุน และหากขายได้มากกว่า ${breakEvenUnits.toLocaleString()} ยูนิต ส่วนต่างที่เพิ่มขึ้นคือกำไรสุทธิ (ก่อนหักภาษีและดอกเบี้ย)
                </p>
            </div>
        `;

        document.getElementById('tab-bank').innerHTML = bankHTML;
    } else {
        document.getElementById('tab-bank').innerHTML = "";
    }
}

