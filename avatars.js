import {players} from './data.js';

export const ranks={};
export function updateRanks(rating=p=>p.stars){
 const scores=players.map(p=>({p,score:rating(p)}));
 scores.sort((a,b)=>b.score-a.score||(b.p.potential??0)-(a.p.potential??0)||a.p.id-b.p.id);
 scores.forEach(({p},i)=>ranks[p.id]=i+1);
}
updateRanks();

export const portraitPaths=Object.fromEntries(players.map(p=>[p.id,'public/assets/characters/duelist-'+String(p.id).padStart(2,'0')+'.webp']));
export function avatar(p){
 const band=Math.floor((ranks[p.id]-1)/5)+1;
 return `<img class="avatar rank-band-${band}" src="./${portraitPaths[p.id]}" width="448" height="560" loading="lazy" decoding="async" alt="">`;
}
