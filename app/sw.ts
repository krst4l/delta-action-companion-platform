import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    // Change this attribute's name to your `injectionPoint`.
    // `injectionPoint` is an InjectManifest option.
    // See https://serwist.pages.dev/docs/build/configuring
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: WorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      urlPattern: /^https:\/\/api\.yourdomain\.com\/.*$/i,
      handler: 'NetworkFirst' as RouteHandler<'network'>,
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24, // 24小时
        },
      },
    },
    {
      // cache images
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30天
        },
      },
    },
    {
      // cache font resources
      urlPattern: /\.(?:woff|woff2|ttf|otf|eot)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'fonts-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1年
        },
      },
    },
    {
      // cache CSS and JS files
      urlPattern: /\.(?:css|js)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7天
        },
      },
    },
    {
      // cache API responses
      urlPattern: /^https:\/\/.*\/api\/.*$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-responses',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60, // 1小时
        },
        networkTimeoutSeconds: 3,
      },
    },
  ],
  fallbacks: {
    entries: [
      {
        url: '/~offline',
        matcher({ request }) {
          return request.destination === 'document';
        },
      },
    ],
  },
});

// add specific network listener for performance monitoring
self.addEventListener('fetch', (event) => {
  // 记录缓存命中率
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          // 缓存命中
          return response;
        }
        // 缓存未命中，从网络获取
        return fetch(event.request).then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open('images-cache').then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        });
      })
    );
  }
});

// add PUSH notification support
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || '三角洲游戏陪玩平台';
  const options = {
    body: data.body || '您有新的陪玩订单',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    data,
    actions: [
      {
        action: 'open',
        title: '查看订单',
      },
      {
        action: 'close',
        title: '关闭',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(clients.openWindow(event.notification.data.url || '/'));
  }
});

serwist.addEventListeners();
