@echo off
chcp 65001 >nul
:: ขอสิทธิ์ Admin อัตโนมัติ
net session >nul 2>&1
if errorlevel 1 (
    echo กำลังขอสิทธิ์ Administrator...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)
echo.
echo ================================================
echo   Shopee Trends Auto-Updater — ตั้งค่าครั้งแรก
echo ================================================
echo.

:: ตรวจ Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] ไม่พบ Python — กรุณาติดตั้ง Python ก่อน
    echo         ดาวน์โหลด: https://python.org/downloads
    pause
    exit /b 1
)

echo [1/4] ติดตั้ง Python libraries...
python -m pip install anthropic ddgs requests --quiet
echo       เสร็จแล้ว

echo.
echo [2/4] ตั้งค่า SHOPEE_APP_ID...
echo       (ไปที่ affiliate.shopee.co.th → Open API → สร้าง Application)
echo.
set /p APPID="วาง App ID แล้วกด Enter (กด Enter ข้ามได้): "
if "%APPID%"=="" (
    echo [SKIP] ข้ามการตั้งค่า App ID — จะใช้ DuckDuckGo fallback
) else (
    setx SHOPEE_APP_ID "%APPID%" >nul
    echo       บันทึก App ID เรียบร้อย
)

echo.
echo [3/4] ตั้งค่า SHOPEE_APP_SECRET...
echo.
set /p APPSECRET="วาง App Secret แล้วกด Enter (กด Enter ข้ามได้): "
if "%APPSECRET%"=="" (
    echo [SKIP] ข้ามการตั้งค่า App Secret
) else (
    setx SHOPEE_APP_SECRET "%APPSECRET%" >nul
    echo       บันทึก App Secret เรียบร้อย
)

echo.
echo [4/4] ตั้ง Windows Task Scheduler (ทุกวัน 06:00)...
python "%~dp0fetch_shopee_trends.py" --setup
echo.

echo ================================================
echo   เสร็จสิ้น! ระบบจะอัปเดตอัตโนมัติทุกวัน 06:00
echo   ไม่มี Shopee API Key ก็ใช้ได้ (DuckDuckGo fallback)
echo ================================================
echo.
set /p TEST="ทดสอบอัปเดตตอนนี้เลยไหม? (Y/N): "
if /i "%TEST%"=="Y" (
    echo.
    python "%~dp0fetch_shopee_trends.py"
)
echo.
pause
