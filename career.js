import {localLimit} from './competition.js';
import {relation,recruitmentGate,interviewPassed} from './social.js';
import {ensureCircuit,bond,discount} from './circuit.js';
import {players, teams, initialAssignments} from './data.js';
import {trio, abilities} from './mechanics.js';

export const founders = {34:'korium',35:'garden',9:'mujica'};
export const rarity = ['Común','Poco común','Competitivo','Destacado','Élite','Legendario'];
export const roll = (random=Math.random) => Math.min(6,1+Math.floor(random()/.18));
export const origins = Object.fromEntries(Object.entries(initialAssignments).flatMap(([team,ids])=>ids.map(id=>[id,team])));
export const get = id => players.find(p=>p.id===Number(id));

export function begin(state,id,name,color,emblem){
 const p=get(id);
 if(!p)return false;
 state.team=founders[id]||origins[id];
 state.identity=id;
 state.manager=p.name;
 state.club=founders[id]?null:{name:name.trim().slice(0,35)||'Mi equipo',color,emblem};
 state.credits=100;
 state.owned[id]=state.team;
 for(const member of players){
  if(member.id!==id&&state.owned[member.id]===state.team)state.owned[member.id]=null;
 }
 state.active=[id];
 state.captain=id;
 state.started=true;
 ensureCircuit(state);
 state.offers=offers(state);
 return true;
}

export const expansionMultiplier=index=>[1,1.4,1.9,2.5,3.2][index]??3.2;
export function contractLedger(state,team=state.team){
 state.contracts??={};
 if(!state.contracts[team]){
  const history=team===state.team?[...((state.offerHistory||[]).flatMap(h=>h.offers.filter(o=>o.status==='signed').map(o=>({...o,week:h.week})))),...(state.offers||[]).filter(o=>o.status==='signed').map(o=>({...o,week:state.week}))]:[];
  const deals=team===state.team?(state.circuit?.negotiations||[]).filter(n=>n.result==='se incorporó al equipo'):[];
  const combined=new Map(history.map(o=>[o.week+':'+o.id,o]));
  for(const deal of deals)combined.set(deal.week+':'+deal.id,{...combined.get(deal.week+':'+deal.id),...deal});
  state.contracts[team]={count:[...combined.values()].reduce((n,o)=>n+(o.ids?.length||1),0),lastWeek:Math.max(0,...[...combined.values()].map(o=>o.week)),spent:0};
 }
 return state.contracts[team];
}
export const canSign=(state,team=state.team)=>contractLedger(state,team).lastWeek!==state.week;
export function recordContract(state,team,ids,cost){
 const ledger=contractLedger(state,team);
 ledger.count+=ids.length;ledger.lastWeek=state.week;ledger.spent=cost;
}
const pricePoints=[[1,440],[2,480],[3,530],[3.5,600],[4,750],[5,1100]];
export function recruitmentBasePrice(stars){
 const bounded=Math.max(1,Math.min(5,stars));
 const upper=pricePoints.findIndex(([rating])=>rating>=bounded);
 if(upper===0)return pricePoints[0][1];
 const [lowRating,lowPrice]=pricePoints[upper-1], [highRating,highPrice]=pricePoints[upper];
 return Math.round(lowPrice+(highPrice-lowPrice)*(bounded-lowRating)/(highRating-lowRating));
}
export function offerQuote(state,ids,team=state.team){
 const count=contractLedger(state,team).count;
 const c=ensureCircuit(state);
 const bases=ids.map(id=>{
  const p=get(id);
  const stars=Math.min(p.potential??5,p.stars+Math.floor((state.xp?.[id]||0)/120)*.5+(state.aiBoost?.[id]||0));
  return recruitmentBasePrice(stars);
 });
 const base=bases.reduce((sum,n)=>sum+n,0);
 const personal=Math.min(.06,relation(state,ids[0],team)/1000);
 const expanded=bases.reduce((sum,n,i)=>sum+n*expansionMultiplier(count+i),0);
 const club=state.owned[ids[0]]||origins[ids[0]];
 const cut=Math.min(.25,discount(bond(c,team,club),team===state.team?(c.reputation[origins[ids[0]]]||0):0)+personal);
 return {price:Math.round(expanded*(1-cut)),base,multiplier:expanded/base,discount:cut};
}
export function offers(state,random=Math.random){
 const roster=players.filter(p=>state.owned[p.id]===state.team);
 const missingTrio=trio.filter(id=>state.owned[id]!==state.team);
 const canOfferTrio=missingTrio.length&&missingTrio.length+roster.length<=5&&missingTrio.every(id=>!state.unavailable.includes(id));
 const candidates=players.filter(p=>!roster.includes(p)&&!state.unavailable.includes(p.id)&&(!state.social||recruitmentGate(state,p).ok)&&(!trio.includes(p.id)||(canOfferTrio&&p.id===missingTrio[0])));
 if(state.social){
  const rotation=(a,b)=>((a.id+state.week)%41)-((b.id+state.week)%41);
  const affordable=[...candidates].sort((a,b)=>Math.abs(a.stars-3)-Math.abs(b.stars-3)||rotation(a,b))[0];
  const featured=candidates.filter(p=>p!==affordable).sort((a,b)=>Math.abs(a.stars-3.5)-Math.abs(b.stars-3.5)||rotation(a,b));
  return [affordable,...featured].filter(Boolean).slice(0,3).map(p=>{
   const ids=trio.includes(p.id)?missingTrio:[p.id];
   return {id:p.id,ids,face:1,band:1,...offerQuote(state,ids),status:'open'};
  });
 }
 const result=[];
 for(let i=0;i<3&&candidates.length;i++){
  const face=roll(random);
  const band=p=>Math.max(1,Math.min(6,Math.ceil((p.stars-.5)*1.25)));
  const distance=Math.min(...candidates.map(p=>Math.abs(band(p)-face)));
  const pool=candidates.filter(p=>Math.abs(band(p)-face)===distance);
  const p=pool[Math.floor(random()*pool.length)];
  candidates.splice(candidates.indexOf(p),1);
  const ids=trio.includes(p.id)?missingTrio:[p.id];
  result.push({id:p.id,ids,face,band:band(p),...offerQuote(state,ids),status:'open'});
 }
 return result;
}

export function fit(state,p,format){
 const roster=players.filter(q=>state.owned[q.id]===state.team);
 const reasons=[];
 let score=0;
 if(format.styles.includes(p.style)){score+=2;reasons.push('favorecido por el formato')}
 if(roster.some(q=>q.style===p.style)){score++;reasons.push('estilo compartido')}
 else if(roster.length){score++;reasons.push('amplía los estilos del equipo')}
 if(roster.some(q=>origins[q.id]===origins[p.id])){score++;reasons.push('compañeros de origen')}
 if(trio.includes(p.id)){score+=2;reasons.push('vínculo Mujica')}
 if(abilities[p.id-1].team>0){score++;reasons.push('pasiva colectiva')}
 if(abilities[p.id-1].absence){score--;reasons.push('agenda variable')}
 const relation=bond(ensureCircuit(state),state.team,state.owned[p.id]||origins[p.id]);
 if(relation){score+=Math.min(4,relation/20);reasons.push('relación con su club de origen')}
 return {score,reasons,chance:Math.min(95,Math.max(45,70+score*4))};
}

export function recruit(state,id,format,random=Math.random){
 const o=state.offers.find(o=>o.id===id&&o.status==='open');
 const size=players.filter(p=>state.owned[p.id]===state.team).length;
 if(!o||!canSign(state))return false;
 if(state.social&&(!recruitmentGate(state,get(id)).ok||!(interviewPassed(state,id)||state.update15?.interview?.id===id&&state.update15.interview.phase==='end'&&state.update15.interview.week===state.week)))return false;
 const ids=o.ids||[id];
 Object.assign(o,offerQuote(state,ids));
 if(size+ids.length>5||state.credits<o.price+(state.weekly?.type==='coach'?(state.weekly.cost??450):0)||ids.some(id=>state.owned[id]===state.team))return false;
 if(!state.social&&random()*100>=fit(state,get(id),format).chance){o.status='declined';return 'rechazó la oferta'}
 state.credits-=o.price;
 recordContract(state,state.team,ids,o.price);
 ids.forEach(id=>state.owned[id]=state.team);
 o.status='signed';
 if(size<3&&size+ids.length>=3&&!state.teamEvent&&state.week<=48)state.teamEvent=state.week+4;
 return 'se incorporó al equipo';
}

export const cap = (state,id) => state.unavailable.includes(id)?0:localLimit(get(id));
export function enroll(state,event,ids){
 if((event.type==='team'?ids.length!==3:ids.length<1)||new Set(ids).size!==ids.length)return false;
 if(ids.some(id=>state.owned[id]!==state.team||Object.entries(state.entries).filter(([key,list])=>key!==event.key&&list.includes(id)).length>=cap(state,id)))return false;
 state.entries[event.key]=ids;
 return true;
}

