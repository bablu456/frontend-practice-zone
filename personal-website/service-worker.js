/*
 * SERVICE WORKER - PWA Offline Support
 * 
 * Purpose: Enable offline functionality and faster loading through strategic caching
 * 
 * This service worker implements two caching strategies:
 * 1. App Shell (Cache First): Core HTML/CSS/JS files cached on install
 * 2. Runtime Caching: Dynamic content cached as user navigates
 * 
 * Features:
 * - Offline fallback page when network is unavailable
 * - Cache versioning for easy updates
 * - Background sync for data when back online (future enhancement)
 * - Push notifications (optional, not currently implemented)
 */

// ================================================
// CONFIGURATION
// Cache version - increment to force cache refresh
// ================================================
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `portfolio-cache-${CACHE_VERSION}`;
const OFFLINE_CACHE = `portfolio-offline-${CACHE_VERSION}`;

// ================================================
// FILES TO CACHE (App Shell)
// These are essential files cached during installation
// ================================================
const APP_SHELL = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    // Google Fonts (optional - only if user enables them)
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
];

// ================================================
// OFFLINE FALLBACK PAGE
// Shown when user is offline and page isn't cached
// ================================================
const OFFLINE_PAGE = '/offline.html';

// ================================================
// INSTALL EVENT
// Triggered when service worker is first installed
// Caches all app shell resources
// ================================================
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...', CACHE_VERSION);

    event.waitUntil(
        (async () => {
            try {
                // Open cache storage
                const cache = await caches.open(CACHE_NAME);

                // Cache all app shell resources
                console.log('[Service Worker] Caching app shell');
                await cache.addAll(APP_SHELL);

                // Cache offline page separately
                const offlineCache = await caches.open(OFFLINE_CACHE);
                await offlineCache.add(new Request(OFFLINE_PAGE, { cache: 'reload' }));

                console.log('[Service Worker] App shell cached successfully');

                // Force immediate activation (skip waiting)
                await self.skipWaiting();
            } catch (error) {
                console.error('[Service Worker] Installation failed:', error);
            }
        })()
    );
});

// ================================================
// ACTIVATE EVENT
// Triggered when service worker becomes active
// Cleans up old caches from previous versions
// ================================================
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...', CACHE_VERSION);

    event.waitUntil(
        (async () => {
            try {
                // Get all cache names
                const cacheNames = await caches.keys();

                // Delete old caches (those not matching current version)
                await Promise.all(
                    cacheNames
                        .filter(name => name.startsWith('portfolio-'))
                        .filter(name => name !== CACHE_NAME && name !== OFFLINE_CACHE)
                        .map(name => {
                            console.log('[Service Worker] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );

                // Take control of all open pages immediately
                await self.clients.claim();

                console.log('[Service Worker] Activated successfully');
            } catch (error) {
                console.error('[Service Worker] Activation failed:', error);
            }
        })()
    );
});

// ================================================
// FETCH EVENT
// Intercepts all network requests
// Implements caching strategy: Cache First with Network Fallback
// ================================================
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests (POST, PUT, DELETE)
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }

    event.respondWith(
        (async () => {
            try {
                // STRATEGY 1: Try cache first (faster)
                const cachedResponse = await caches.match(request);
                if (cachedResponse) {
                    console.log('[Service Worker] Serving from cache:', url.pathname);
                    return cachedResponse;
                }

                // STRATEGY 2: Not in cache, try network
                console.log('[Service Worker] Fetching from network:', url.pathname);
                const networkResponse = await fetch(request);

                // Cache successful responses for future use (runtime caching)
                if (networkResponse.ok && networkResponse.status === 200) {
                    const cache = await caches.open(CACHE_NAME);
                    // Clone response because it can only be used once
                    cache.put(request, networkResponse.clone());
                }

                return networkResponse;

            } catch (error) {
                // STRATEGY 3: Network failed, show offline page for navigation requests
                console.error('[Service Worker] Fetch failed:', error);

                if (request.destination === 'document') {
                    const offlineCache = await caches.open(OFFLINE_CACHE);
                    const offlinePage = await offlineCache.match(OFFLINE_PAGE);

                    if (offlinePage) {
                        return offlinePage;
                    }
                }

                // For other resources (images, etc.), return a minimal error response
                return new Response('Offline - Resource not available', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({
                        'Content-Type': 'text/plain'
                    })
                });
            }
        })()
    );
});

// ================================================
// MESSAGE EVENT
// Allows communication between page and service worker
// Useful for triggering cache updates or getting cache status
// ================================================
self.addEventListener('message', (event) => {
    console.log('[Service Worker] Message received:', event.data);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        // Force immediate activation of new service worker
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'GET_VERSION') {
        // Send cache version back to page
        event.ports[0].postMessage({ version: CACHE_VERSION });
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        // Clear all caches (useful for debugging)
        event.waitUntil(
            caches.keys().then(names => {
                return Promise.all(names.map(name => caches.delete(name)));
            })
        );
    }
});

// ================================================
// BACKGROUND SYNC (Future Enhancement)
// Would allow saving data when back online
// Commented out for now - implement if needed
// ================================================
/*
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncUserData());
  }
});

async function syncUserData() {
  // Implement data synchronization logic here
  // Could sync notes, watchlist updates, etc.
  console.log('[Service Worker] Syncing data...');
}
*/

// ================================================
// PUSH NOTIFICATIONS (Future Enhancement)
// Would enable push notifications
// Commented out for now - implement if needed
// ================================================
/*
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    vibrate: [200, 100, 200],
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'close', title: 'Close' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Portfolio Update', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
*/

console.log('[Service Worker] Loaded successfully');
