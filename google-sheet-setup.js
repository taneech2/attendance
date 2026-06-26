// ============================================================
// Google Apps Script — รับคะแนนจากสื่อทั้ง 2 ตัว
// ============================================================
//
// วิธีตั้งค่า (ทำครั้งเดียว):
//
// 1. ไปที่ https://sheets.google.com สร้าง Google Sheets ใหม่
//    ตั้งชื่อว่า "คะแนนสื่อการสอน — ครูธานี"
//
// 2. สร้าง 2 แท็บ:
//    แท็บที่ 1: ชื่อ "ฝึกมือนิ่ง"
//    แถวที่ 1 ใส่: วันเวลา | ชื่อ-สกุล | เส้น | ความยาก | ความเร็ว | แม่น% | จังหวะ% | รวม% | เวลา(วิ) | เบี่ยงเบน | เกรด
//
//    แท็บที่ 2: ชื่อ "เกมธุรกิจ"
//    แถวที่ 1 ใส่: วันเวลา | ชื่อ | สถานการณ์ | เป้าหมาย(บาท) | ธุรกิจ | ลูกค้า | รอบที่ใช้ | กำไรรวม | สำเร็จ
//
// 3. เมนู Extensions > Apps Script
//    ลบโค้ดเดิม แล้ววางโค้ดด้านล่างนี้ทั้งหมด
//
// 4. กด Deploy > New deployment
//    - Type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
//    กด Deploy > คัดลอก URL
//
// 5. นำ URL ที่ได้ไปวางใน 2 ไฟล์:
//    - steady-hand.html     →  บรรทัด SCORE_URL = 'วาง URL ตรงนี้';
//    - vocational-welder-biz/script.js  →  บรรทัด REPORT_URL = 'วาง URL ตรงนี้';
//    (ใช้ URL เดียวกันทั้ง 2 ไฟล์)
//
// 6. Commit + Push ขึ้น GitHub อีกครั้ง
//
// ============================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // ตรวจว่าเป็นข้อมูลจากสื่อตัวไหน
    if (data.level) {
      // === ฝึกมือนิ่ง ===
      var sheet = ss.getSheetByName("ฝึกมือนิ่ง");
      sheet.appendRow([
        new Date().toLocaleString("th-TH"),
        data.name,
        data.level,
        data.difficulty,
        data.speed,
        data.accuracy,
        data.pace,
        data.total,
        data.time,
        data.maxDev,
        data.grade
      ]);
    } else {
      // === เกมธุรกิจ ===
      var sheet = ss.getSheetByName("เกมธุรกิจ");
      sheet.appendRow([
        new Date().toLocaleString("th-TH"),
        data.name,
        data.scenario,
        data.target,
        data.business,
        data.customer,
        data.rounds,
        data.earned,
        data.completed ? "สำเร็จ" : "ยังไม่สำเร็จ"
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
