const CACHE = 'zcabinet-v1';
const FILES = [
  '/fig-untitled.html',
  '/fig-untitled-1.html',
  '/fig-untitled-2.html',
  '/fig-untitled-3.html',
  '/fig-untitled-4.html',
  '/index.html',
  '/books.js',
  '/books.json',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
