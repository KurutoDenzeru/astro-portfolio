const CACHE_NAME = 'astro-portfolio-v1';
const urlsToCache = ['/', '/index.html', '/sitemap.webp', '/icons/favicon.svg', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', (event) => {
  console.log('[SW] Install event - starting');
  // Make install resilient: attempt to cache assets but don't fail install on single asset failure.
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        await Promise.all(
          urlsToCache.map(async (url) => {
            try {
              // Use a fresh fetch to avoid returning a stale browser cache during install
              const req = new Request(url, { cache: 'reload' });
              const res = await fetch(req);
              if (res && res.ok) {
                await cache.put(url, res.clone());
                console.log('[SW] Cached', url);
              } else {
                console.warn('[SW] Failed to cache (bad response)', url, res && res.status);
              }
            } catch (err) {
              console.warn('[SW] Failed to cache', url, err);
            }
          }),
        );
        // Ensure the new worker takes control on activation
        await self.skipWaiting();
        console.log('[SW] Install finished');
      } catch (err) {
        console.warn('[SW] Install error (ignored):', err);
        try { await self.skipWaiting(); } catch (e) {}
      }
    })(),
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event - starting');
  event.waitUntil(
    (async () => {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map((cacheName) =>
            cacheName !== CACHE_NAME ? caches.delete(cacheName) : Promise.resolve(),
          ),
        );
        await self.clients.claim();
        console.log('[SW] Activate finished');
      } catch (err) {
        console.warn('[SW] Activate error (ignored):', err);
      }
    })(),
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
