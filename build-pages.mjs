import {createHash} from 'node:crypto';
import {mkdir, readFile, writeFile, readdir} from 'node:fs/promises';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const source = fileURLToPath(new URL('.', import.meta.url));
const target = join(source, 'dist');
const marker = '.duel-circuit-build.json';
const runtime = [
 'update15.js','events15.js','interviews15.js',
 'index.html','galeria.html','revision.html','style.css','manifest.webmanifest','icon.svg',
 'app.js','avatars.js','career.js','circuit.js','data.js','encyclopedia.js','finances.js',
 'galeria.js','mechanics.js','opening.js','press.js','profiles-data.js','revision.js',
 'sw.js','tournaments.js','weekend.js','social.js','dialogues.js','personalities.js','character-news.js','relationships.js','competition.js',
 'public/assets/characters/manifest.json',
 ...Array.from({length:40},(_,i)=>'public/assets/characters/duelist-'+String(i+1).padStart(2,'0')+'.webp'),
 ...['arena','mili-welcome','mili-explain','mili-surprise','mili-celebrate','mili-warn','mili-farewell'].map(name=>'public/assets/opening/'+name+'.webp')
];
for (const directory of ['public/assets/cinema','public/assets/scenes','public/assets/characters/variants']) {
 const artwork=await filesAt(join(source,directory),directory+'/').catch(error=>{
  if(error.code==='ENOENT')return [];
  throw error;
 });
 runtime.push(...artwork.filter(path=>path.endsWith('.webp')).sort());
}
const contents = new Map(await Promise.all(runtime.map(async path=>[path,await readFile(join(source,path))])));
const digest = createHash('sha256');
for(const [path,bytes] of contents)digest.update(path+'\0').update(bytes);
const version=digest.digest('hex').slice(0,16);
const worker=contents.get('sw.js').toString('utf8').replace(/const cacheVersion = '[^']+';/,`const cacheVersion = '${version}';`);
contents.set('sw.js',Buffer.from(worker));
contents.set('.nojekyll',Buffer.alloc(0));

async function filesAt(root,prefix=''){
 const found=[];
 for(const entry of await readdir(root,{withFileTypes:true})){
  const relative=prefix+entry.name;
  if(entry.isDirectory())found.push(...await filesAt(join(root,entry.name),relative+'/'));
  else if(entry.isFile())found.push(relative);
  else throw Error('Elemento no admitido en dist: '+relative);
 }
 return found;
}
await mkdir(target,{recursive:true});
const existing=await filesAt(target);
if(existing.length&&!existing.includes(marker))throw Error('dist ya contiene archivos ajenos al build.');
for(const path of existing){
 if(path!==marker&&!contents.has(path))throw Error('Archivo ajeno al build en dist: '+path);
}
for(const [path,bytes] of contents){
 const dest=join(target,path);
 await mkdir(dirname(dest),{recursive:true});
 await writeFile(dest,bytes);
}
await writeFile(join(target,marker),JSON.stringify({version,files:contents.size})+'\n');
console.log(`Duel Circuit ${version}: ${contents.size} archivos estáticos en dist.`);
