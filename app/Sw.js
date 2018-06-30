const staticCacheName = 'dx-static-v2';
let allCaches = [
  staticCacheName,
];

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installed')

  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {

      console.log('[ServiceWorker] Caching allFiles...')
      return cache.addAll([
        './',
        './App.js',
        './styles.css',
        'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
        'https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700'
      ]);
      
    }).catch(err => console.log(err))
  )
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activated')

  event.waitUntil(

    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('dx-') &&
                 !allCaches.includes(cacheName);
        }).map((cacheName) => {
          console.log('[ServiceWorker] Deleted Old Caches ')
          return caches.delete(cacheName);
        })
      );
    })

  );
});

self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      
      return resp || fetch(event.request).then(function(response) {
        return caches.open(staticCacheName).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    })
  );
});