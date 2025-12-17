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
  // Offline-first for same-origin navigation and site assets.
  // Don't intercept non-GET requests or non-http(s) schemes (e.g., chrome-extension://).
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.protocol !== 'http:' && requestUrl.protocol !== 'https:') return;

  // For cross-origin requests (analytics, CDNs, third-party), use network-only and fail gracefully.
  if (requestUrl.origin !== self.location.origin) {
    event.respondWith(
      fetch(event.request).catch(() =>
        // fallback to cache if available, otherwise a generic 504-like response
        caches.match(event.request).then((cached) => cached || new Response('Network error', { status: 504, statusText: 'Network error' }))
      )
    );
    return;
  }

  // Same-origin: try cache first, then network and cache valid responses.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((networkResponse) => {
          // If bad response, return it (don't try to cache)
          if (!networkResponse || networkResponse.status >= 400) {
            return networkResponse;
          }

          const responseClone = networkResponse.clone();
          return caches.open(CACHE_NAME).then((cache) =>
            cache.put(event.request, responseClone).catch(() => {
              // ignore cache.put errors (opaque responses, unsupported schemes, quota issues, etc.)
            }).then(() => networkResponse)
          );
        })
        .catch(() =>
          // On network failure, return the site's fallback (index) if cached, or a simple offline response.
          caches.match('/').then((fallback) => fallback || new Response('Offline', { status: 503, statusText: 'Offline' }))
        );
    })
  );
});
