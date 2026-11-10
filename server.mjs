import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
const files = {'/':'index.html','/galeria.html':'galeria.html','/galeria.js':'galeria.js','/index.html':'index.html','/style.css':'style.css','/app.js':'app.js','/data.js':'data.js','/mechanics.js':'mechanics.js','/career.js':'career.js','/circuit.js':'circuit.js','/weekend.js':'weekend.js','/press.js':'press.js','/opening.js':'opening.js','/finances.js':'finances.js','/encyclopedia.js':'encyclopedia.js','/profiles-data.js':'profiles-data.js','/revision.html':'revision.html','/revision.js':'revision.js','/tournaments.js':'tournaments.js','/avatars.js':'avatars.js','/sw.js':'sw.js','/manifest.webmanifest':'manifest.webmanifest','/icon.svg':'icon.svg'};
const types = {html:'text/html',css:'text/css',js:'text/javascript',webmanifest:'application/manifest+json',svg:'image/svg+xml',json:'application/json',webp:'image/webp'};
const server = createServer(async (req,res) => {
  const path = new URL(req.url,'http://localhost').pathname;
  const file = Object.hasOwn(files,path)?files[path]:/^\/public\/assets\/characters\/(?:duelist-(?:0[1-9]|[1-3][0-9]|40)\.webp|manifest\.json)$/.test(path)?path.slice(1):/^\/public\/assets\/opening\/(?:arena|mili-(?:welcome|explain|surprise|celebrate|warn|farewell))\.webp$/.test(path)?path.slice(1):null;
  if (!file) return res.writeHead(404).end();
  try {
    const body = await readFile(new URL(file,import.meta.url));
    res.writeHead(200,{'Content-Type':types[file.split('.').pop()]+'; charset=utf-8'}).end(body);
  } catch {
    res.writeHead(500).end();
  }
});
let port = Number(process.env.PORT || 8080);
const host = process.env.DUEL_HOST || '127.0.0.1';
server.on('error', error => {
  if (error.code === 'EADDRINUSE' && process.env.DUEL_FALLBACK === '1' && port !== 0) {
    port = port===8080?8081:0;
    server.listen(port, host);
    return;
  }
  console.error('No se pudo iniciar Duel Circuit: ' + error.message);
  process.exitCode = 1;
});
server.on('listening', () => console.log('Abri http://' + host + ':' + server.address().port + '/ en tu navegador.'));
server.listen(port, host);
