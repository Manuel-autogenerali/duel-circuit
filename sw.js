const cacheVersion = 'local-v17';
const cachePrefix = 'duel-circuit@' + self.registration.scope + '#';
const cacheName = cachePrefix + cacheVersion;
const assets = ['./','./index.html','./galeria.html','./galeria.js','./app.js','./mechanics.js','./career.js','./circuit.js','./weekend.js','./press.js','./opening.js','./finances.js','./encyclopedia.js','./profiles-data.js','./revision.html','./revision.js','./tournaments.js','./avatars.js','./data.js','./style.css','./manifest.webmanifest','./icon.svg'];
assets.push(...Array.from({length:40},(_,i)=>'./public/assets/characters/duelist-'+String(i+1).padStart(2,'0')+'.webp'));
assets.push('./public/assets/opening/arena.webp',...['welcome','explain','surprise','celebrate','warn','farewell'].map(name=>'./public/assets/opening/mili-'+name+'.webp'));
self.addEventListener('install', event => event.waitUntil(caches.open(cacheName).then(cache=>cache.addAll(assets))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(cachePrefix)&&key!==cacheName).map(key=>caches.delete(key))))));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||!assets.some(path=>new URL(path,self.location).href===event.request.url))return;
  event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));
});


