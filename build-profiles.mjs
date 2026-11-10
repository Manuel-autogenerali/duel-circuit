import {readFileSync,writeFileSync} from 'node:fs';
import {players} from './data.js';
const profiles=Object.fromEntries(players.map(({id})=>[id,JSON.parse(readFileSync(new URL('./profiles/'+String(id).padStart(2,'0')+'.json',import.meta.url),'utf8'))]));
writeFileSync(new URL('./profiles-data.js',import.meta.url),'export const profiles = '+JSON.stringify(profiles,null,2)+';\n');
