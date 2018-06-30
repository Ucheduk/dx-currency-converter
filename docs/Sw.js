const staticCacheName = 'dx-static-v2';
// const contentImgsCache = 'wittr-content-imgs';
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

// self.addEventListener('fetch', (event) => {
//   console.log('[ServiceWorker] Fetching', event.request.url)
//   let requestUrl = new URL(event.request.url);

//   if (requestUrl.origin === location.origin) {
//     if (requestUrl.pathname === '/') {
//       event.respondWith(caches.match('/'));
//       console.log('[ServiceWorker] Found path / in cache ')
//       return;
//     }
//     if (requestUrl === 'https://use.fontawesome.com/releases/v5.1.0/css/all.css') {
//       event.respondWith(caches.match('css'));
//       console.log('[ServiceWorker] Found path fontawesome css in cache ')
//       return;
//     }
//     // if (requestUrl.pathname.startsWith('/photos/')) {
//     //   event.respondWith(servePhoto(event.request));
//     //   return;
//     // }
//   }

//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });

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