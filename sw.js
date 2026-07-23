const CACHE = 'stashly-v4';
const FILES = [
  '/',
  '/index.html',
  '/fig-untitled.html',
  '/fig-untitled-1.html',
  '/fig-untitled-2.html',
  '/fig-untitled-3.html',
  '/fig-untitled-4.html',
  '/books.js',
  '/books.json',
  '/manifest.json',
  '/apple-icon.jpg',
  '/icon-192.png',
  '/icon-512.png',
  '/assets/emoji/crop_2.png',
  '/assets/emoji/crop_3.png',
  '/assets/emoji/crop_4.png',
  '/assets/emoji/crop_6.png',
  '/assets/emoji/crop_7.png',
  '/assets/emoji/crop_8.png',
  '/assets/emoji/crop_14.png',
  '/assets/emoji/crop_15.png',
  '/assets/emoji/crop_16.png',
  '/assets/emoji/crop_18.png',
  '/assets/emoji/crop_19.png',
  '/assets/emoji/crop_20.png',
  '/assets/fig1_39d387156929.jpg',
  '/assets/fig1_5952cc54edb4.jpg',
  '/assets/fig1_790340836825.jpg',
  '/assets/fig1_ceb2e801f2c6.jpg',
  '/assets/fig2_35d7bad9f1b0.jpg',
  '/assets/fig2_5952cc54edb4.jpg',
  '/assets/fig3_a731c4eb0653.jpg',
  '/assets/fig3_ad0a4d4c73ee.jpg',
  '/assets/fig4_047d7940f8b2.jpg',
  '/assets/fig4_17ab3b83f2ab.jpg',
  '/assets/fig4_2fd8ea7b75b1.jpg',
  '/assets/index-image.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
    if (res.ok) { const clone = res.clone(); caches.open(CACHE).then(c => c.put(e.request, clone)); }
    return res;
  })));
});
