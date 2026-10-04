const C='listen-room-v1',F=['/','/index.html','/sender.html','/listener.html','/style.css','/icon-192.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('/socket.io/')||e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
