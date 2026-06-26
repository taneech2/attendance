// ============================================================
// Google Apps Script — รับคะแนนฝึกมือนิ่ง
// ============================================================
// วิธีใช้:
// 1. สร้าง Google Sheets ใหม่
// 2. ตั้งชื่อ Sheet แรกว่า "คะแนนฝึกมือนิ่ง"
// 3. ใส่หัวคอลัมน์แถวที่ 1:
//    A: วันเวลา | B: ชื่อ-สกุล | C: เส้น | D: ความยาก | E: ความเร็ว
//    F: ความแม่น% | G: จังหวะ% | H: คะแนนรวม% | I: เวลา(วิ)
//    J: เบี่ยงเบนสูงสุด | K: เกรด
// 4. Extensions > Apps Script > วางโค้ดนี้
// 5. Deploy > New deployment > Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 6. คัดลอก URL ไปวางใน steady-hand.html ตรง SCORE_URL = '...'
// ============================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("คะแนนฝึกมือนิ่ง");

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

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
