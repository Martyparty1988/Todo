self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('pwa-todo-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/src/css/styles.css',
        '/src/js/main.js',
        '/src/js/db.js',
        '/src/js/ui.js',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});