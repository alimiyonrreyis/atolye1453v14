const CACHE_NAME = 'atolye1453-v12.5';

// Kurulum aşamasında sadece ana dosyaları hafızaya almayı dene
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Güvenlik kısıtlamalarına takılmamak için esnek getirme (fetch) stratejisi
self.addEventListener('fetch', (e) => {
  // Dışarıdan gelen cdn (jspdf, google fonts vb.) isteklerini filtrele, hata vermesini engelle
  if (!e.request.url.startsWith(self.location.origin)) {
    return;
  }

  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
