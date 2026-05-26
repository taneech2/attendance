const CACHE = 'attendance-v1';
const PRECACHE = [
  './index.html',
  './attendance-y2.html',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network-First: โหลดจาก Server เสมอเมื่อออนไลน์ → อัปเดตอัตโนมัติ
// ออฟไลน์ → ใช้ Cache สำรอง
// ไม่ cache face-api.js / xlsx (ไฟล์ใหญ่เกินไป)
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // ข้าม Firebase, face-api CDN, Google Fonts — ให้ไปตรงๆ
  if (url.hostname.includes('firebaseio.com') ||
      url.hostname.includes('justadudewhohacks') ||
      url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com')) {
    return;
  }
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res && res.status === 200 && res.type !== 'opaque') {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
