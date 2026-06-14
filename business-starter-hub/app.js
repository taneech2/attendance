const stepsData = [
    {
        title: "1. Entrepreneurial Mindset",
        desc: "สำรวจความพร้อมและรูปแบบการทำธุรกิจของคุณ",
        html: `
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
const finishBtn = document.getElementById('finish-btn');
const restartBtn = document.getElementById('restart-btn');
const printBtn = document.getElementById('print-btn');

// Event Listeners
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

finishBtn.addEventListener('click', () => {
    saveCurrentStepData();
    generateBlueprint();
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

    if (currentStep === stepsData.length - 1) {
        nextBtn.classList.add('hidden');
        finishBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
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
function generateBlueprint() {
    appSection.classList.remove('active-section');
    appSection.classList.add('hidden-section');
    blueprintSection.classList.remove('hidden-section');
    blueprintSection.classList.add('active-section');

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

    document.getElementById('printable-blueprint').innerHTML = bmcHTML;
}
