// ============================================================
// วิธีใช้:
// 1. ไปที่ Google Sheets สร้างชีตใหม่
// 2. ตั้งชื่อ Sheet แรกว่า "รายงาน"
// 3. ใส่หัวคอลัมน์แถวที่ 1:
//    A: วันเวลา | B: ชื่อ | C: สถานการณ์ | D: เป้าหมาย(บาท) | E: ธุรกิจ | F: ลูกค้า | G: รอบที่ใช้ | H: กำไรรวม | I: สำเร็จ
// 4. เมนู Extensions > Apps Script
// 5. วางโค้ดนี้ทั้งหมดแทนที่โค้ดเดิม
// 6. กด Deploy > New deployment > Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 7. คัดลอก URL ที่ได้ ไปวางใน script.js ตรง REPORT_URL
// ============================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("รายงาน");

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

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
