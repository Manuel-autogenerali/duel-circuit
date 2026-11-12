import {personality,socialWeights} from './personalities.js';
import {memberState} from './relationships.js';
import {dbLimit} from './competition.js';
import {players,teams} from './data.js';
import {abilities} from './mechanics.js';
import {profileStats} from './encyclopedia.js';
import {events} from './dialogues.js';
export const weeklyIncome={korium:180,garden:180,mujica:270,sekai:190,obelisk:200,dima:175,lair:180,haru:185};
export const maintenance=n=>[0,25,65,145,240,360][Math.min(5,n)];
const currentStars=(s,p)=>Math.min(p.potential??5,p.stars+Math.floor((s.xp?.[p.id]||0)/120)*.5+(s.aiBoost?.[p.id]||0));
const bound=n=>Math.max(0,Math.min(100,n));
export function upgrade(s){
 s.social??={version:11,relations:{},history:[],active:null,foundation:{},economy:{},tutorial:{seen:[],tournaments:false},grants:{}};
 const x=s.social;x.history??=[];x.relations??={};x.foundation??={};x.economy??={};x.tutorial??={seen:[],tournaments:false};x.grants??={};x.slots??={};x.members??={};
 for(const h of x.history)if(h.week===s.week)x.slots[h.club+':'+h.week]??=h.event;
 if(x.active)x.slots[x.active.club+':'+(x.active.quotaWeek??x.active.week)]??=x.active.event;
 return x;
}
export const relation=(s,id,club=s.team)=>s.social?.relations?.[club+':'+id]||0;
export function availableEvents(s,id){
 const x=upgrade(s);
 return events.filter(e=>e.character===id&&!x.history.some(h=>h.club===s.team&&h.character===id&&s.week-h.week<2));
}
export function specialAvailable(s,club=s.team,week=s.week){return !upgrade(s).slots[club+':'+week];}
export function startConversation(s,id,type,mode='social'){
 const x=upgrade(s),context=mode==='context',week=context?x.pending?.week:s.week;
 if(x.active||s.finished||!specialAvailable(s,s.team,week))return false;
 if(!['recruit','foundation','context'].includes(mode))return false;
 if(context&&(!x.pending||x.pending.id!==id))return false;
 if(mode!=='foundation'&&needsFoundation(s)&&s.week===1)return false;
 if(mode==='foundation'&&(s.week!==1||!needsFoundation(s)||!foundationCandidates(s).some(p=>p.id===id)))return false;
 const pool=availableEvents(s,id),e=context?pool.find(e=>e.id===x.pending.event):pool.find(e=>e.type===type);
 if(!e)return false;
 x.slots[s.team+':'+week]=e.id;
 x.active={event:e.id,character:id,mode,stage:0,answers:[],week:s.week,quotaWeek:week,club:s.team,feedback:null,result:null};
 if(context)x.pending=null;return true;
}
export function queueContext(s,ids,random=Math.random){
 const x=upgrade(s);if(x.pending||x.active||!specialAvailable(s)||needsFoundation(s)||random()>.45)return null;
 const pool=[...new Set(ids)].filter(id=>availableEvents(s,id).length);if(!pool.length)return null;
 const id=pool[Math.floor(random()*pool.length)],choices=availableEvents(s,id),e=choices[Math.floor(random()*choices.length)];
 x.pending={week:s.week,id,event:e.id};return x.pending;
}
export function answerConversation(s,index){
 const x=upgrade(s),a=x.active;if(!a||a.result||a.feedback||a.week!==s.week)return false;
 const e=events.find(e=>e.id===a.event),step=e.stages[a.stage];if(!Number.isInteger(index)||!step.options[index])return false;
 const ok=index===step.correct;a.answers.push(ok);a.feedback=step.reactions[ok?0:1];
 if(a.answers.length===3){
  const score=a.answers.filter(Boolean).length,passed=score>=e.required;
  const old=relation(s,a.character),gain=passed?e.effects.relation:-2;
  x.relations[s.team+':'+a.character]=bound(old+gain);
  const d=s.circuit.decks[a.character],trust=d.trust;
  if(s.owned[a.character]===s.team)d.trust=bound(d.trust+(passed?e.effects.trust:-2));
  const member=memberState(s,a.character),weights=socialWeights[personality(a.character)],beforeMember={...member},beforeMorale=s.morale[s.team]||0,beforeSynergy=s.synergy||0;
  member.motivation=bound(member.motivation+(passed?weights.motivation:-2));
  if(s.owned[a.character]===s.team){member.belonging=bound(member.belonging+(passed?5:-2));d.trust=bound(d.trust+(passed?weights.trust:0));s.morale[s.team]=Math.max(-2,Math.min(2,beforeMorale+(passed?.25:-.25)));s.synergy=Math.min(12,beforeSynergy+(passed?weights.synergy:0));}
  a.result={passed,score,belonging:member.belonging-beforeMember.belonging,motivation:member.motivation-beforeMember.motivation,morale:(s.morale[s.team]||0)-beforeMorale,synergy:(s.synergy||0)-beforeSynergy,relation:x.relations[s.team+':'+a.character]-old,trust:d.trust-trust,text:e.results[passed?0:1]};
  x.history.push({mode:a.mode,event:e.id,character:a.character,club:s.team,week:a.quotaWeek??s.week,...a.result});
 }
 return true;
}
export function continueConversation(s){const a=upgrade(s).active;if(!a||!a.feedback||a.result)return false;a.stage++;a.feedback=null;return true;}
export function recruitmentGate(s,p,club=s.team){
 const rel=relation(s,p.id,club),prestige=s.standings?.[club]||0;
 const contacts=Math.max(0,...Object.entries(s.circuit?.relationships||{}).filter(([key])=>key.split(':').includes(club)).map(([,v])=>v));
 const reputation=club===s.team?Math.max(0,...Object.values(s.circuit?.reputation||{})):prestige;
 const elite=currentStars(s,p)>=4.5;
 const interest=Math.min(100,25+rel*.6+contacts*.2+reputation*.2+prestige*.15+(abilities[p.id-1].team||0)*10);
 if(s.owned[p.id])return {ok:false,interest,reason:'Tiene contrato vigente. No está disponible como agente libre.'};
 if(elite&&(prestige<60||reputation<35||rel<30))return {ok:false,interest,reason:'Exige 60 puntos deportivos, 35 de reputación y 30 de relación personal.'};
 return {ok:!elite||interest>=65,interest,reason:elite&&interest<65?'Necesita al menos 65 de interés.':'Disponible para entrevista'};
}
export function interviewPassed(s,id,club=s.team){return upgrade(s).history.some(h=>h.character===id&&h.club===club&&h.week===s.week&&h.passed);}
export const foundationPools={korium:[3,1,33],dima:[5,4,12],sekai:[2,24,23],garden:[36,20,19],lair:[29,15,28],haru:[32,7,25]};
export function foundationCandidates(s){
 if(s.update15)return (foundationPools[s.team]||[]).map(id=>players[id-1]).filter(p=>!s.owned[p.id]);
 const free=players.filter(p=>!s.owned[p.id]&&currentStars(s,p)<=3);
 const low=free.filter(p=>currentStars(s,p)<=2);return (low.length?low:free.filter(p=>currentStars(s,p)<=2.5).length?free.filter(p=>currentStars(s,p)<=2.5):free).sort((a,b)=>currentStars(s,a)-currentStars(s,b)||a.id-b.id);
}
export function needsFoundation(s,club=s.team){return Object.values(s.owned).filter(t=>t===club).length===1&&!upgrade(s).foundation[club];}
export function signFoundation(s,id,club=s.team){
 const legacyInterview=upgrade(s).history.some(h=>h.club===club&&h.week===s.week&&(h.mode==='foundation'||xVersionLegacy(s)));
 if(s.week!==1||!needsFoundation(s,club)||!foundationCandidates(s).some(p=>p.id===id)||!(legacyInterview||(club===s.team&&s.week===1&&s.update15?.interviewWeek===s.week)))return false;
 s.owned[id]=club;upgrade(s).foundation[club]=id;
 if(club===s.team){s.active.push(id);s.circuit.decks[id].trust=bound(50+relation(s,id)*.2);}return true;
}
export function settleEconomy(s,week){
 const x=upgrade(s);if(x.economy[week])return x.economy[week];
 const rows={};s.rivalBudgets??={};
 for(const t of teams){
  const size=Object.values(s.owned).filter(id=>id===t.id).length;
  const income=weeklyIncome[t.id],cost=maintenance(size),before=t.id===s.team?s.credits:s.rivalBudgets[t.id]??100;
  const debt=x.debt??={};const due=cost+(debt[t.id]||0),paid=Math.min(before+income,due);debt[t.id]=due-paid;
  const after=before+income-paid;if(t.id===s.team)s.credits=after;else s.rivalBudgets[t.id]=after;
  rows[t.id]={income,cost,paid,debt:debt[t.id],before,after};
 }
 x.economy[week]=rows;return rows;
}
export const onlineResistance=dbLimit;
export const restRecovery=p=>Math.max(2,Math.min(5,Math.round(profileStats(p)[5]/25)-(abilities[p.id-1].fatigue?1:0)+Number(p.traitCode==='apoyo')));
export function restTeam(s,club=s.team){return players.filter(p=>s.owned[p.id]===club).map(p=>{const before=s.fatigue[p.id]||0;s.fatigue[p.id]=Math.max(0,before-restRecovery(p));return {id:p.id,before,after:s.fatigue[p.id]};});}
export function reviewCommitment(s){
 const x=upgrade(s),decisions=[];
 if(s.week<4||s.week%4||x.commitmentWeek===s.week)return decisions;
 x.commitmentWeek=s.week;x.commitment??={};
 const protectedIds=[34,35,9,10,11,37,22,21,26,16,18];
 for(const p of players){
  const club=s.owned[p.id],deck=s.circuit.decks[p.id];
  if(!club||protectedIds.includes(p.id)||s.week-deck.since<4)continue;
  const concern=x.commitment[p.id]??={warnings:0};
  if(memberState(s,p.id).lowWeeks<3||memberState(s,p.id).belonging>=25||deck.trust>20||relation(s,p.id,club)>=15){concern.warnings=0;continue;}
  concern.warnings++;
  const left=concern.warnings>=2;
  if(left){s.owned[p.id]=null;s.active=s.active.filter(id=>id!==p.id);concern.warnings=0;}
  const message=p.name+(left?' decidió dejar su equipo tras dos evaluaciones con confianza muy baja y sin un vínculo suficiente.':' pide revisar su continuidad: confianza de 20 o menos y relación menor a 15. Habrá otra evaluación en cuatro semanas.');
  s.news.push(message);decisions.push({id:p.id,club,left,message});
 }
 return decisions;
}
export function tutorialPending(s){
 if(s.week!==1||!s.organization)return [];
 const x=upgrade(s),pending=['meta','noticias','plantel','mercado'].filter(t=>!x.tutorial.seen.includes(t));
 if(!s.weekly)pending.push('accion');if(!x.tutorial.tournaments)pending.push('torneos');if(needsFoundation(s))pending.push('incorporación inicial');
return pending;
}

function xVersionLegacy(s){return s.social?.version!==14;}
