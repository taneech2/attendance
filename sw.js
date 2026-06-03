const CACHE = 'attendance-v22'; // ← bump version → ล้าง cache เก่าทุกเครื่องอัตโนมัติ
const PRECACHE = [
  './index.html',
  './home.html',
  './attendance-ch1.html',
  './attendance-y2.html',
  './attendance-scout.html',
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
// ออฟไลน์ → ใช้ Cache สำรอง (เฉพาะไฟล์ HTML เท่านั้น)
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // ข้าม Firebase, CDN, Fonts — ให้ไปตรงๆ ไม่ cache
  if (url.hostname.includes('firebaseio.com') ||
      url.hostname.includes('justadudewhohacks') ||
      url.hostname.includes('jsdelivr.net') ||
      url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com')) {
    return;
  }

  // Navigation requests (เปิดหน้าใหม่) — ใช้ URL ที่ขอจริงๆ เท่านั้น
  // ไม่ fallback ข้ามไฟล์ (ป้องกัน ชช.1 ขึ้นแทน ชช.2)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res && res.status === 200) {
            const cloned = res.clone(); // clone ทันที ก่อน async
            caches.open(CACHE).then(c => c.put(e.request, cloned));
          }
          return res;
        })
        .catch(() => caches.match(e.request, { ignoreSearch: true }))
    );
    return;
  }

  // Resources (JS, CSS, images) — Network-First
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res && res.status === 200 && res.type !== 'opaque') {
          const cloned = res.clone(); // clone ทันที ก่อน async
          caches.open(CACHE).then(c => c.put(e.request, cloned));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
