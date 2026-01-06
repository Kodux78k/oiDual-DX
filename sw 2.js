const CACHE_NAME = 'infodose-neural-cache-v1';
const ASSETS = [
  '/', // adjust this list for your deploy
  '/index.html',
];

self.addEventListener('install', (e)=>{
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(()=>{}))
  );
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e)=>{
  const req = e.request;
  if(req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then(cached=>{
      if(cached) return cached;
      return fetch(req).then(res=>{
        return res;
      }).catch(()=> {
        return caches.match('/index.html');
      });
    })
  );
});
