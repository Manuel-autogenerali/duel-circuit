const cacheVersion = 'beta-2.0';
const cachePrefix = 'duel-circuit@' + self.registration.scope + '#';
const cacheName = cachePrefix + cacheVersion;
const assets = ['./update15.js','./events15.js','./interviews15.js','./','./index.html','./galeria.html','./galeria.js','./personalities.js','./character-news.js','./relationships.js','./competition.js','./social.js','./dialogues.js','./app.js','./mechanics.js','./career.js','./circuit.js','./weekend.js','./press.js','./opening.js','./finances.js','./encyclopedia.js','./profiles-data.js','./revision.html','./revision.js','./tournaments.js','./avatars.js','./data.js','./style.css','./manifest.webmanifest','./icon.svg'];
assets.push(...Array.from({length:40},(_,i)=>'./public/assets/characters/duelist-'+String(i+1).padStart(2,'0')+'.webp'));
assets.push('./public/assets/opening/arena.webp',...['welcome','explain','surprise','celebrate','warn','farewell'].map(name=>'./public/assets/opening/mili-'+name+'.webp'));
self.addEventListener('install', event => event.waitUntil(caches.open(cacheName).then(cache=>cache.addAll(assets))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(cachePrefix)&&key!==cacheName).map(key=>caches.delete(key))))));
self.addEventListener('fetch',event=>{
  const artRoot=new URL('./public/assets/',self.registration.scope).href;
  const url=event.request.url;
  const art=url.startsWith(artRoot)&&/^(?:cinema|scenes|characters\/variants)\/.*\.webp$/.test(url.slice(artRoot.length));
  if(event.request.method!=='GET'||(!art&&!assets.some(path=>new URL(path,self.location).href===url)))return;
  if(art){
   event.respondWith(caches.open(cacheName).then(async cache=>{
    const cached=await cache.match(event.request);
    if(cached)return cached;
    const response=await fetch(event.request);
    if(response.ok)event.waitUntil(cache.put(event.request,response.clone()).catch(()=>{}));
    return response;
   }));
   return;
  }
  event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));
});


