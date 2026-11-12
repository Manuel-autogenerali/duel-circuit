import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
import {players,teams,formats} from './data.js';
import {newOrganization,rivalRecruit,organizations} from './opening.js';
import {ensureCircuit,onlineLoad,advanceCircuit,talk} from './circuit.js';
import {offerQuote,recruit,offers,contractLedger,expansionMultiplier} from './career.js';
import {financeState,settleFinance} from './finances.js';
import * as social from './social.js';
import {events} from './dialogues.js';
export function fixture(team='korium'){
 const s={started:false,week:1,owned:{},active:[],credits:100,unavailable:[],entries:{},xp:{},fatigue:{},morale:{},formatIndex:0,news:[],standings:Object.fromEntries(teams.map(t=>[t.id,0])),aiBoost:{},prep:0,synergy:0,history:[],offerHistory:[],score:0,wins:0,losses:0};
 newOrganization(s,team,'Prueba 11',organizations[team].ids[0],[],team==='haru'?3:null);return s;
}
export function conversation(s,id,type='amable',mode='social',mask=7){
 assert.ok(social.startConversation(s,id,type,mode));
 const e=events.find(e=>e.id===s.social.active.event);
 e.stages.forEach((step,i)=>{assert.ok(social.answerConversation(s,(mask&(1<<i))?step.correct:(step.correct+1)%3));social.continueConversation(s);});return s.social.active.result;
}
assert.equal(events.length,120);assert.equal(new Set(events.map(e=>e.id)).size,120);
assert.equal(new Set(events.map(e=>e.title)).size,120);
assert.equal(new Set(events.map(e=>e.situation)).size,120);
assert.equal(events.flatMap(e=>e.stages).length,360);
assert.equal(events.flatMap(e=>e.stages.flatMap(s=>s.options)).length,1080);
for(const p of players){assert.equal(events.filter(e=>e.character===p.id).length,3);for(const e of events.filter(e=>e.character===p.id)){
 assert.equal(e.stages.length,3);for(const stage of e.stages){assert.equal(stage.options.length,3);assert.equal(new Set(stage.options).size,3);assert.ok(stage.text&&stage.reactions.every(Boolean));}
 for(let mask=0;mask<8;mask++){const s=fixture();const result=conversation(s,p.id,e.type,'social',mask);assert.equal(result.passed,mask.toString(2).replaceAll('0','').length>=e.required);assert.equal(s.social.history.length,1);assert.equal(social.answerConversation(s,0),false);s.social.active=null;assert.equal(social.startConversation(s,p.id,e.type),false);s.week=3;assert.ok(social.startConversation(s,p.id,e.type));}
}}
console.log('OK: 120 eventos, 360 decisiones, 1080 opciones; 960 combinaciones de aciertos y bloqueos de repetición.');
const s=fixture('haru');
for(const id of [7,32,3,5,27]){
 s.social=undefined;social.upgrade(s);s.fatigue[id]=0;s.xp[id]=0;s.circuit.online[id]={count:0,streak:0,obsession:0,exhaustion:0};
 const p=players[id-1],limit=social.onlineResistance(p);
 for(let i=1;i<=4;i++){onlineLoad(s,p,2,0,()=>1);assert.equal(s.fatigue[id],Math.min(10,i<=limit?0:(i-limit)*(i-limit+1)));}
 const before=structuredClone(s);assert.equal(onlineLoad(s,p,2,0),0);assert.equal(s.xp[id],before.xp[id]);assert.equal(s.fatigue[id],before.fatigue[id]);
}
assert.equal(social.onlineResistance(players[6]),4);assert.equal(social.onlineResistance(players[31]),3);
for(const p of players)s.fatigue[p.id]=9;
for(const r of social.restTeam(s))assert.ok(r.after<r.before&&r.after>=0);
console.log('OK: límites Dark Book de Franco y Manu, sin quinta recompensa, descanso y fatiga no negativa.');
const baseline=fixture(),linked=structuredClone(baseline);baseline.owned[4]='korium';linked.owned[4]='korium';
linked.social.relations['korium:4']=50;
assert.ok(talk(linked,players[3],2,'change',false,()=>0).chance>talk(baseline,players[3],2,'change',false,()=>0).chance);
assert.ok(social.recruitmentGate(baseline,players[5]).ok===false);
assert.equal(expansionMultiplier(30),3.2);
const summary=[];
for(const team of teams){
 const game=fixture(team.id);const original=JSON.stringify(game.owned);social.openingGrant(game);assert.equal(game.credits,220);assert.equal(JSON.stringify(game.owned),original);
 if(social.needsFoundation(game)){const p=social.foundationCandidates(game)[0];conversation(game,p.id,'amable','foundation');assert.ok(social.signFoundation(game,p.id));game.social.active=null;assert.equal(contractLedger(game).count,0);}
 game.social.haruInterview=true;
 game.social.tutorial={seen:['meta','noticias','plantel','mercado'],tournaments:true};game.weekly={type:'rest'};assert.deepEqual(social.tutorialPending(game),[]);
 const rows=[];
 for(let week=1;week<=20;week++){
  game.week=week;const before=game.credits;const economy=social.settleEconomy(game,week);const after=game.credits;
  social.settleEconomy(game,week);assert.equal(game.credits,after);assert.equal(after-before,economy[team.id].income-economy[team.id].paid);
  if(week===1){rivalRecruit(game,()=>0);assert.ok(teams.every(t=>Object.values(game.owned).filter(id=>id===t.id).length>=2));
   game.week=2;game.offers=offers(game);const candidate=game.offers.find(o=>players[o.id-1].stars===3.5);assert.ok(candidate,'No hay candidato 3.5 para '+team.id);assert.ok(candidate.price>=300&&candidate.price<=340);assert.ok(game.credits>=candidate.price,team.id+' no llega al primer fichaje');game.week=1;
  }
  const finance=settleFinance(game,week,[4,8,12,16,20].includes(week)?[{name:'Regional individual',standings:teams.map((t,i)=>({club:t.id,place:i+1}))}]:[],teams.map(t=>t.id));
  if(finance){assert.equal(finance.charges.roster,0);assert.equal(finance.charges.maintenance,0);}
  rivalRecruit(game,()=>0);
  assert.equal(Object.keys(game.owned).length,40);assert.ok(teams.every(t=>Object.values(game.owned).filter(id=>id===t.id).length<=5));
  assert.ok(game.credits>=0);assert.ok(Object.values(game.rivalBudgets).every(v=>v>=0));
  rows.push({week,credits:game.credits,roster:Object.values(game.owned).filter(id=>id===team.id).length,maintenance:economy[team.id].cost,debt:game.social.debt[team.id]||0});
  game.week++;advanceCircuit(game);
 }
 assert.ok(financeState(game).activeSince===9);
 assert.deepEqual(social.tutorialPending(game),[]);
 const copy=JSON.parse(JSON.stringify(game));assert.deepEqual(copy.owned,game.owned);assert.deepEqual(copy.social,game.social);
 summary.push({team:team.id,weeks:rows});
}
writeFileSync(new URL('./balance-v11.json',import.meta.url),JSON.stringify(summary,null,2));
console.log('OK: 8 organizaciones × 20 semanas; ingresos idempotentes, mantenimiento, Konami, IA, 2 integrantes y fichaje 3.5 alcanzable al iniciar semana 2.');
const old=fixture();delete old.social;old.week=12;const preserve=structuredClone(old);social.upgrade(old);assert.deepEqual(old.owned,preserve.owned);assert.equal(old.credits,preserve.credits);assert.deepEqual(social.tutorialPending(old),[]);
console.log('OK: migración conserva propietarios y créditos; semana 2+ sin tutorial obligatorio.');

const loyalty=fixture();loyalty.owned[3]=loyalty.team;loyalty.circuit.decks[3].since=1;loyalty.circuit.decks[3].trust=0;loyalty.week=8;
assert.equal(social.reviewCommitment(loyalty).find(e=>e.id===3).left,false);
assert.equal(social.reviewCommitment(loyalty).length,0);
const bonded=structuredClone(loyalty);bonded.social.relations[bonded.team+':3']=20;bonded.week=12;
assert.equal(social.reviewCommitment(bonded).length,0);assert.equal(bonded.owned[3],bonded.team);
loyalty.week=12;assert.equal(social.reviewCommitment(loyalty).find(e=>e.id===3).left,true);assert.equal(loyalty.owned[3],null);
console.log('OK: permanencia con dos advertencias, protección por relación y sin duplicar revisiones.');
