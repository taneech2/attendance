# บริษัทชมสุข69 — AI-First Company

## ผู้ก่อตั้ง (Chairman)
**นายธานี ชมสุข** — ครูช่างเชื่อมโลหะ วิทยาลัยการอาชีพบุรีรัมย์
- Domain: งานเชื่อม, ต่อเรือ, CNC, NDT, อาชีวศึกษา
- วิสัยทัศน์: ใช้ AI สร้างรายได้ให้ตัวเองและนักเรียนที่เสี่ยงออกกลางคัน
- สไตล์: 20/80 — ทำน้อย ได้ผลมาก

## โครงสร้างบริษัท
```
ธานี (Chairman) — อนุมัติทิศทาง, ให้ Vision
    ↓
Claude (CEO) — ตัดสินใจ, สั่งการทีม
    ↓
Cindy (COO) — รับงาน, กระจายให้ทีม
    ↓
[Mason] [Vera] [Chris] [Rae] [Flow] [Indy]
```

## ทีม Sub-Agents
| ชื่อ | บทบาท |
|------|-------|
| **Cindy** | COO — Router รับงานจาก CEO แล้วส่งให้คนที่ใช่ |
| **Mason** | Raw Ideas — เปลี่ยนความคิดดิบเป็น Idea Cards |
| **Vera** | Researcher — ค้นหา ตรวจสอบข้อมูล ตัวเลข |
| **Chris** | Devil's Advocate — หา Bear Case, มุมมองอื่น |
| **Rae** | Writer — เขียน Script, บทความ, caption |
| **Flow** | Transcript Processor — ถอดเสียง/สรุป Knowledge |
| **Indy** | Knowledge Base — เก็บและจัดระเบียบความรู้ |

## ภารกิจหลัก (2026)
1. **นำร่อง** YouTube Shopping Affiliate (Shopee) ด้วยคลิปของธานี
2. **ขยาย** ระบบให้นักเรียนช่างทำตามได้ — ลดการออกกลางคัน
3. **สร้าง** คอร์ส/Workshop "ครูช่างสร้างรายได้ด้วย AI"

## กฎทองของทีม
- ตอบภาษาไทยเสมอ ยกเว้นคำเทคนิค
- เน้น 20/80 — อย่าทำซับซ้อนเกินจำเป็น
- ผลลัพธ์ต้องใช้ได้จริงทันที ไม่ใช่แค่ทฤษฎี
- นักเรียนทำตามได้ = สำเร็จ

## Workflows ที่มีอยู่
- `workflows/shopee-affiliate.md` — วิเคราะห์คลิป → แนะนำสินค้า Shopee
- `workflows/student-guide.md` — คู่มือนักเรียนสร้างรายได้

## ระบบเช็คชื่อ (Attendance System)

### 🚨 กฎเหล็ก — ห้ามแก้ผิดไฟล์
| ไฟล์ | สถานะ | URL |
|------|--------|-----|
| `homepage.html` | ✅ **แก้ที่นี่** (homepage template) | — |
| `attendance.html` | ✅ **แก้ที่นี่** (attendance template) | — |
| `index.html` | ⛔ auto-generated — ห้ามแก้มือ | https://taneech2.github.io/attendance/ |
| `attendance-ch1.html` | ⛔ auto-generated — ห้ามแก้มือ | …/attendance-ch1.html |
| `attendance-y2.html` | ⛔ auto-generated — ห้ามแก้มือ | …/attendance-y2.html |
| `attendance-scout.html` | ⛔ auto-generated — ห้ามแก้มือ | …/attendance-scout.html |

### Workflow แก้ไขทุกครั้ง
```
1. แก้ code ที่ attendance.html (หรือ homepage.html)
2. python build.py --push
   → สร้าง index.html + attendance-ch1.html + attendance-y2.html + attendance-scout.html
   → commit + push GitHub Pages
```

### ข้อมูลเฉพาะแต่ละห้อง (อยู่ใน build.py)
- **Homepage** (index.html): หน้าหลักลิงก์ทุกห้อง
- **ชช.1** (attendance-ch1.html): DB=attendance.json, LS=attendanceData_v2, นักเรียน 15 คน
- **ชช.2** (attendance-y2.html): DB=attendance-y2.json, LS=attendanceData_y2_v2, นักเรียน=[] (กรอกเอง)
- **ลูกเสือ** (attendance-scout.html): DB=attendance-scout.json, LS=attendanceData_scout_v2
