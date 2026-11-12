import assert from 'node:assert/strict';
import {fixture} from './tests-v14.mjs';
import {update15} from './update15.js';
import {foundationCandidates,signFoundation,settleEconomy,weeklyIncome,maintenance} from './social.js';
import {weekend} from './weekend.js';
import {formats} from './data.js';
import {offerQuote,recruitmentBasePrice,expansionMultiplier,offers,contractLedger,recruit} from './career.js';

const seed=fixture('korium');
seed.teamEvent=2;
update15(seed).interviewWeek=1;
assert.ok(signFoundation(seed,foundationCandidates(seed)[0].id));
const store=new Map([['duel-circuit-beta-01-save-v1',JSON.stringify(seed)]]);
globalThis.localStorage={getItem:key=>store.get(key)||null,setItem:(key,value)=>store.set(key,value)};
let modal,commit;
const blank=()=>({classList:{toggle(){},remove(){},add(){}},querySelector(){return null;},querySelectorAll(){return [];},insertAdjacentHTML(){},addEventListener(){},remove(){}});
const root=blank(),main=blank();
const listeners={};
globalThis.document={
 querySelector:s=>s==='#app'?root:s==='main.content'?main:s==='.confirm15'?modal:null,
 querySelectorAll:()=>[],addEventListener:(event,fn)=>listeners[event]=fn,
 body:{appendChild(el){if(el.className.includes('confirm15'))modal=el;}},
 createElement:()=>({...blank(),remove(){modal=null;},querySelector:s=>s==='[data-commit15]'?{addEventListener:(event,fn)=>commit=fn}:{focus(){}}})
};
globalThis.confirm=()=>{throw Error('Se abrió una confirmación nativa inesperada');};
await import('./app.js');
function press(dataset){
 const target={dataset};
 listeners.click({target:{closest:s=>s==='[data-tab]'&&dataset.tab||s==='[data-action]'&&dataset.action?target:null}});
}
const save=()=>JSON.parse(store.get('duel-circuit-beta-01-save-v1'));
const ok=()=>{assert.ok(modal);commit();};
press({action:'openingContinue'});
for(const [index,tab] of ['plantel','meta','noticias','mercado'].entries()){
 press({tab});
 assert.equal(save().update15.prep.done.length,index+1);
}
press({tab:'meta'});
assert.equal(save().update15.prep.done.length,4);
press({tab:'inicio'});
assert.match(root.innerHTML,/4\/6 actividades/);
press({tab:'accion'});
press({action:'chooseActivity',type:'rest'});ok();
press({tab:'inicio'});
assert.match(root.innerHTML,/5\/6 actividades/);
press({tab:'torneos'});
const plan=weekend(1,[],seed.localVenue);
const index=plan.events.findIndex(e=>e.day===0&&e.type==='individual');
const onlyOnline=process.argv.includes('--dark-book-only');
if(!onlyOnline){press({action:'boardSelect15',id:'34'});press({action:'boardAdd15',id:String(index)});}
press({action:'boardTab15',id:'2'});
press({action:'boardSelect15',id:'34'});
press({action:'boardAdd15',id:'-1'});
press({action:'boardSelect15',id:'3'});
press({action:'boardAdd15',id:'-1'});
assert.equal(save().update15.draft.days[3],1);
assert.deepEqual(save().entries,{});
assert.equal(save().update15.draft.days[34],1);
press({tab:'inicio'});
assert.match(root.innerHTML,/5\/6 actividades/);
press({tab:'torneos'});
press({action:'boardConfirm15'});ok();
press({tab:'inicio'});
assert.match(root.innerHTML,/6\/6 actividades/);
assert.deepEqual(save().entries[plan.events[index].key],onlyOnline?undefined:[34]);
assert.deepEqual(Object.fromEntries(Object.entries(save().competition.days).filter(([,days])=>days>0)),{'3':1,'34':1});
await import('./app.js?reload');
press({action:'openingContinue'});
assert.match(root.innerHTML,/6\/6 actividades/);
press({tab:'torneos'});
press({action:'boardConfirm15'});
assert.equal(modal,null);
assert.deepEqual(Object.fromEntries(Object.entries(save().competition.days).filter(([,days])=>days>0)),{'3':1,'34':1});
press({tab:'inicio'});
press({action:'finishWeek',week:'1'});ok();
assert.equal(save().week,2);
assert.equal(save().report.week,1);
assert.equal(save().report.events.some(e=>e.ids?.includes(34)),!onlyOnline);
assert.equal(save().competition.online[34].sessions,1);
assert.equal(save().competition.online[3].sessions,1);
assert.match(root.innerHTML,/¿Cómo lo afectó\?/);
assert.match(root.innerHTML,/¿En qué desembocó\?/);
assert.equal((root.innerHTML.match(/aria-label="Partidas"/g)||[]).length,2);
assert.equal((root.innerHTML.match(/aria-label="Rondas"/g)||[]).length,onlyOnline?0:1);
const firstResult=save().report;
assert.ok(firstResult.online[0].rows.every(row=>row.matches.length===4&&Number.isFinite(row.adapted)));
if(!onlyOnline)assert.ok(firstResult.events.some(event=>event.playerImpact?.[34]?.xp>=0));
assert.equal(save().social.tutorial.reportStep,0);
assert.equal(save().update15.prep.done.length,0);
press({action:'finishWeek',week:'1'});
assert.equal(save().week,2);
assert.ok(save().report.announcements.some(e=>e.name==='Regional 3v3 · Debut'));
press({tab:'inicio'});
press({action:'finishWeek',week:'2'});ok();
assert.equal(save().week,3);
const regional=save().report.events.find(e=>e.name==='Regional 3v3 · Debut');
assert.equal(regional.level,'regional');
assert.equal(regional.type,'team');
assert.deepEqual(regional.ids,[]);
assert.equal(regional.points,0);
assert.deepEqual(regional.reputation,[]);
press({tab:'inicio'});
press({action:'finishWeek',week:'3'});ok();
const archived=save().reportArchive.find(r=>r.week===2).events.find(e=>e.name===regional.name);
assert.equal(archived.winner,regional.standings[0].name);
assert.equal(archived.type,'team');
console.log('OK: interfaz JS, acción, borrador físico y Dark Book, confirmación conjunta, informe, persistencia y bloqueo de cierre duplicado.');


if(!onlyOnline){
 const free=fixture('korium');
 const freeData=update15(free);
 freeData.interviewWeek=1;
 freeData.interview={id:3,mode:'foundation',week:1,phase:'end',answers:[0,0,0]};
 store.set('duel-circuit-beta-01-save-v1',JSON.stringify(free));
 await import('./app.js?free');
 press({action:'openingContinue'});press({tab:'relaciones'});
 assert.match(root.innerHTML,/Fichaje fundacional gratuito/);
 assert.match(root.innerHTML,/\+40 CR\/semana/);
 press({action:'hire15'});
 assert.equal(save().owned[3],null);
 ok();
 assert.equal(save().owned[3],'korium');
 assert.equal(save().credits,free.credits);

 const paid=save();
 paid.week=2;
 paid.credits=10000;
 const price=offerQuote(paid,[4]).price;
 paid.offers=[{id:4,ids:[4],status:'open'}];
 update15(paid).interview={id:4,mode:'recruit',week:2,phase:'end',answers:[0,0,0]};
 store.set('duel-circuit-beta-01-save-v1',JSON.stringify(paid));
 await import('./app.js?paid');
 press({action:'openingContinue'});press({tab:'relaciones'});
 assert.match(root.innerHTML,/\+80 CR\/semana/);
 press({action:'hire15'});
 assert.equal(save().credits,10000);
 ok();press({action:'hire15'});
 assert.equal(save().credits,10000-price);
 assert.equal(save().owned[4],'korium');

 paid.credits=price-20;
 store.set('duel-circuit-beta-01-save-v1',JSON.stringify(paid));
 await import('./app.js?shortage');
 press({action:'openingContinue'});press({tab:'relaciones'});
 assert.match(root.innerHTML,/Te faltan 20 cr/);
 press({action:'hire15'});
 assert.equal(modal,null);
 assert.equal(save().credits,price-20);
 assert.equal(save().owned[4],null);
 console.log('OK: contratación gratuita y pagada, déficit exacto y confirmación sin cobro duplicado.');
}

if(!onlyOnline){
 assert.deepEqual(weeklyIncome,{korium:180,garden:180,mujica:270,sekai:190,obelisk:200,dima:175,lair:180,haru:185});
 assert.deepEqual([1,2,3,4,5].map(maintenance),[25,65,145,240,360]);
 assert.deepEqual([1,2,3,3.5,4,4.5,5].map(recruitmentBasePrice),[440,480,530,600,750,925,1100]);
 assert.deepEqual([0,1,2,3,4,5].map(expansionMultiplier),[1,1.4,1.9,2.5,3.2,3.2]);
 const scenario=(adjustment=0)=>{
  const club=fixture('korium');
  update15(club).interviewWeek=1;
  assert.ok(signFoundation(club,3));
  assert.equal(contractLedger(club).count,0);
  const balances=[club.credits];
  for(let week=1;week<=4;week++){
   club.week=week;
   if(week===1)club.credits+=adjustment;
   settleEconomy(club,week);
   balances.push(club.credits);
   settleEconomy(club,week);
   assert.equal(club.credits,balances.at(-1));
  }
  club.week=5;
  club.offers=offers(club);
  const candidate=club.offers.find(o=>o.price===530);
  assert.ok(candidate);
  update15(club).interview={id:candidate.id,week:5,phase:'end'};
  const hired=recruit(club,candidate.id,formats[club.formatIndex]);
  if(balances.at(-1)>=530){
   assert.equal(hired,'se incorporó al equipo');
   assert.equal(club.credits,balances.at(-1)-530);
   assert.equal(maintenance(Object.values(club.owned).filter(team=>team==='korium').length),145);
   assert.equal(contractLedger(club).count,1);
  }else{
   assert.equal(hired,false);
   assert.equal(club.credits,balances.at(-1));
  }
  return balances;
 };
 assert.deepEqual(scenario(),[100,215,330,445,560]);
 assert.equal(scenario(100).findIndex(credits=>credits>=530)+1,4);
 assert.equal(scenario(-80).some(credits=>credits>=530),false);
 console.log('OK: ingresos, mantenimiento, precios, multiplicadores y progresión Korium.');
}
