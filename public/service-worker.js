const CACHE_NAME = 'astro-portfolio-v1';
const urlsToCache = ['/', '/index.html', '/sitemap.webp', '/icons/favicon.svg', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        }),
      ),
    ),
  );
});

self.addEventListener('fetch', (event) => {
  // Offline-first for navigation and site assets
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request).then((networkResponse) => {
        // Optional: put network responses into the cache
        return caches.open(CACHE_NAME).then((cache) => {
          try {
            cache.put(event.request, networkResponse.clone());
          } catch (e) {
            // noop if opaque responses can't be cached
          }
          return networkResponse;
        });
      });
    }),
  );
});
