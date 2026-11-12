import assert from 'node:assert/strict';
import {fixture} from './tests-v14.mjs';
import {events15} from './events15.js';
import {interviewAnswers} from './interviews15.js';
import {update15,startSocial,respondSocial,advanceSocial,friendship,draft15,validateDraft} from './update15.js';
import {foundationPools,foundationCandidates} from './social.js';
import {cap} from './career.js';
import {weekend} from './weekend.js';

assert.deepEqual(events15.map(e=>e.id),Array.from({length:40},(_,i)=>i*3+1));
assert.equal(events15.flatMap(e=>e.stages.flatMap(s=>s.options)).length,360);
assert.equal(new Set(interviewAnswers.flat()).size,240);
assert.ok(interviewAnswers.every(row=>row.length===6));
for(const [club,pool] of Object.entries(foundationPools)){
 const state=fixture(club,25);
 update15(state);
 assert.deepEqual(foundationCandidates(state).map(p=>p.id),pool.filter(id=>!state.owned[id]));
}
for(const event of events15){
 let state=fixture('korium');
 const id=event.character_index;
 state.owned[id]=state.team;
 const before=JSON.stringify([state.credits,state.xp,state.morale,state.fatigue,state.circuit]);
 assert.ok(startSocial(state,event.id));
 advanceSocial(state);
 for(const [i,stage] of event.stages.entries()){
  assert.ok(stage.options.every(o=>[-1,0,1].includes(o.delta)));
  assert.equal(stage.options.filter(o=>o.delta===1).length,1);
  const chosen=stage.options.findIndex(o=>o.delta===1);
  assert.ok(respondSocial(state,chosen,i));
  state=JSON.parse(JSON.stringify(state));
  assert.equal(respondSocial(state,chosen,i),false);
  assert.equal(friendship(state,id),i+1);
  advanceSocial(state);
 }
 assert.equal(update15(state).events[state.team+':'+event.id].total,3);
 assert.equal(JSON.stringify([state.credits,state.xp,state.morale,state.fatigue,state.circuit]),before);
}
const state=fixture('mujica');
const plan=weekend(1,[],'sekai');
const draft=draft15(state);
const individual=plan.events.find(e=>e.type==='individual');
const team=plan.events.find(e=>e.type==='team');
draft.entries[team.key]=[9];
assert.match(validateDraft(state,plan,cap,()=>true),/tres integrantes/);
draft.entries[team.key]=[9,10,11];
assert.equal(validateDraft(state,plan,cap,()=>true),'');
draft.entries[individual.key]=[9,9];
assert.match(validateDraft(state,plan,cap,()=>true),/duplicados/);
delete draft.entries[individual.key];
draft.days[9]=99;
assert.match(validateDraft(state,plan,cap,()=>true),/superó el límite/);
assert.deepEqual(state.entries,{});
console.log('OK: 40 eventos, 240 respuestas de entrevista, pools, amistad idempotente y validación de borradores.');
