import {profiles} from './profiles-data.js';
import {players} from './data.js';
import {abilities} from './mechanics.js';
export {profiles};
export const labels=['Juego competitivo','Análisis y lectura','Preparación y testeo','Adaptabilidad','Trabajo en equipo','Fortaleza mental'];
export function profileStats(p){
 const a=abilities[p.id-1],base=30+p.stars*10;
 const bound=n=>Math.round(Math.max(20,Math.min(95,n)));
 return [base+4,base+(a.wide||a.narrow||0)*22,base+(a.trainTeam||a.trainXP||0)*1.2,base+(p.style==='flex'?15:p.id===2?-10:0),base+(a.team||a.trio||0)*32,base+(a.official||0)*17-(a.swing||0)*15].map(bound);
}
function secondaryValues(p){
 const stats=profileStats(p);
 return {signature:stats[0]*.001,prepared:stats[1]*.001,adaptation:(100-stats[3])*.002,fatigue:(105-stats[2])*.002,morale:(105-stats[5])*.0015};
}
function originalDrawback(p,state,context,club){
 const fatigue=state.fatigue[p.id]||0;
 if([9,11].includes(p.id))return context==='team'&&![9,10,11].every(id=>state.owned[id]===club)?-.10:0;
 if(p.id===30)return context==='team'&&fatigue>=6?-.08:0;
 if(p.id===37)return context==='local'&&fatigue>=6?-.08:0;
 return 0;
}
export function profileEffects(p,state,context,club){
 const d=state.circuit.decks[p.id],v=secondaryValues(p);
 const fatigue=state.fatigue[p.id]||0, morale=state.morale[club]||0;
 const prepared=club===state.team?(state.prep||0)>=4:d.mastery[d.style]>=80;
 return originalDrawback(p,state,context,club)
  +(d.style===favoriteStyle(p)&&d.mastery[d.style]>=65?v.signature:0)
  +(prepared&&fatigue<=4?v.prepared:0)
  -(d.adaptation>=35?v.adaptation:0)
  -(fatigue>=7?v.fatigue:0)
  -(morale<0&&context!=='book'?v.morale:0)
  +(context===profiles[p.id].context&&specialReady(p,state,club)?specialBoost(p):0);
}
const favoriteStyle=p=>({aggro:0,combo:1,control:2,antimeta:3,offmeta:4,flex:4})[p.style];
const specialBoost=p=>Math.round((.09+(p.stars-1)*.018)*100)/100;
function specialReady(p,state,club){
 const d=state.circuit.decks[p.id],o=state.circuit.online[p.id];
 if([9,10,11].includes(p.id))return [9,10,11].every(id=>state.owned[id]===club);
 if(p.id===3)return state.active.includes(p.id);
 if(p.id===5)return d.adaptation<=25;
 if(p.id===20)return (state.prep||0)>=4;
 if(p.id===32)return d.mastery[d.style]>=70&&!o?.exhaustion;
 if(p.id===37)return club==='sekai'||(state.synergy||0)>=3;
 if(p.id===38)return d.mastery[d.style]>=75;
 return d.style===favoriteStyle(p)&&(state.fatigue[p.id]||0)<=4;
}
const numeric=(n=0)=>Number(n.toFixed(4)).toLocaleString('es-AR',{maximumFractionDigits:4});
const delta=n=>(n>0?'+':'')+numeric(n);
const contexts={local:'un local',book:'Dark Book',official:'una fecha oficial estándar',team:'un 3v3',national:'un Nacional individual',wide:'un formato de amplitud 4 o más',narrow:'un formato de amplitud 2 o 3',captain:'la capitanía del equipo del mánager',reserve:'la reserva del equipo del mánager',trio:'los tres Mujica en la misma organización'};
const profileRule=(short,full,condition,effect,duration,limit,interaction,mitigation)=>({short,full,condition,effect,duration,limit,interaction,mitigation});

function originalRule(p,positive){
 const a=abilities[p.id-1], effects=[];
 const add=(key,value,condition,effect)=>{if(value)effects.push({key,condition,effect});};
 for(const [key,when] of Object.entries(contexts))if((positive?1:-1)*(a[key]||0)>0)add(key,a[key],when,delta(a[key])+' al rendimiento');
 if(positive){
  add('xp',a.trainXP,'práctica presencial del jugador','+'+a.trainXP+' XP al duelista');
  add('teamXP',a.trainTeam,'práctica del equipo con el duelista en el plantel','+'+a.trainTeam+' XP a cada integrante');
  add('classicXP',a.bookTeam,'sesión clásica de Dark Book con el duelista en el plantel','+'+a.bookTeam+' XP a cada integrante');
  add('onlineXP',a.bookXP,'Dark Book competitivo','+'+numeric(a.bookXP*.4)+' XP antes de reducción, redondeo y mínimo');
  add('classicIncome',a.income,'ingresos operativos de una carrera clásica','+'+a.income+' CR');
  add('morale',a.form,'moral positiva','+'+numeric(a.form)+' de rendimiento por cada punto de moral');
  if(!effects.length)add('swing',a.swing,'al evaluar el rendimiento','la variación favorable puede sumar hasta '+numeric(a.swing));
 }else{
  add('absence',a.absence,'al generar la disponibilidad de la próxima semana',Math.round((a.absence||0)*100)+'% de probabilidad de ausencia física');
  if(a.absence)effects.push({key:'agenda',condition:'cuando está disponible para competir físicamente',effect:'límite de un torneo físico por semana'});
  add('swing',a.swing,'al evaluar el rendimiento','una mala variación puede restar hasta '+numeric(a.swing));
  add('morale',a.form,'moral negativa','resta '+numeric(a.form)+' de rendimiento por cada punto por debajo de cero');
  add('fatigue',a.fatigue,'con fatiga superior a cero','resta adicional de '+numeric(a.fatigue)+' de rendimiento por punto de fatiga');
  if([9,11].includes(p.id))add('siblings',.10,'en 3v3, si sus hermanos no comparten equipo','−0,10 de rendimiento');
  if(p.id===30)add('support',.08,'en 3v3 con fatiga de 6 o más','−0,08 de rendimiento');
  if(p.id===37)add('support',.08,'en un local con fatiga de 6 o más','−0,08 de rendimiento');
 }
 const first=effects[0];
 return profileRule(first?first.effect.charAt(0).toUpperCase()+first.effect.slice(1)+'.':'Efecto pendiente de revisión.',
  effects.map(x=>x.condition+': '+x.effect+'.').join(' '),
  effects.map(x=>x.condition).join(' · '),
  effects.map(x=>x.effect).join(' · '),
  effects.some(x=>['absence','agenda'].includes(x.key))?'La agenda rige toda la semana. Los demás modificadores se evalúan por actividad o duelo.':'Se evalúa al resolver la actividad, el ingreso o el duelo correspondiente.',
  'Cada efecto se aplica una vez por evaluación si cumple su condición. Las estrellas y el potencial no cambian por este rasgo.',
  'Se combina con los demás modificadores activos. El motor acota la probabilidad final de victoria.',
  positive?null:a.absence?'Elegí otra fecha o inscribí a otro integrante cuando no esté disponible.':'Ajustá el formato, el rol, la recuperación o la inscripción para evitar la condición desfavorable.');
}
export function characterAbilities(p,profile,level){
 const v=secondaryValues(p);
 const plus=(short,condition,value,interaction)=>profileRule(short,'Suma '+numeric(value)+' al rendimiento del duelista cuando se cumple la condición.',condition,delta(value)+' al rendimiento','Cada evaluación de rendimiento que cumpla la condición.','Solo una bonificación por evaluación. No cambia las estrellas.',interaction,null);
 const minus=(short,condition,value,mitigation)=>profileRule(short,'Resta '+numeric(value)+' al rendimiento del duelista cuando se cumple la condición.',condition,delta(-value)+' al rendimiento','Mientras se cumpla la condición, se evalúa de nuevo en cada duelo.','Solo una penalización por evaluación. No cambia las estrellas.','Puede combinarse con el resto de los modificadores de rendimiento.',mitigation);
 const positive=[
  originalRule(p,true),
  plus('Aprovecha el dominio de su estilo favorito.','Estilo favorito equipado y dominio de 65 o más.',v.signature,'Puede sumarse al beneficio de preparación y a la mecánica exclusiva.'),
  plus('Saca provecho de un plan preparado.','Preparación del equipo del mánager ≥4 (o dominio del mazo rival ≥80) y fatiga ≤4.',v.prepared,'Puede sumarse al dominio del estilo favorito. La fatiga superior a 4 desactiva este beneficio.')
 ];
 const negative=[
  originalRule(p,false),
  minus('Pierde precisión al estrenar un mazo.', 'Adaptación pendiente de 35 o más.',v.adaptation,'Practicá con el mazo en testeo, torneos o Dark Book.'),
  profileRule('Le pesan la fatiga alta y la moral baja.','Fatiga de 7 o más: '+delta(-v.fatigue)+'. Moral negativa en un duelo físico: '+delta(-v.morale)+'.','Fatiga ≥7 o moral del equipo por debajo de 0 fuera de Dark Book.','Ambos valores se aplican al rendimiento y se suman si coinciden.','Mientras dure cada estado, se reevalúa en cada duelo.','Cada penalización se aplica como máximo una vez por evaluación.','Se suma al desgaste de fatiga que ya aplica el motor.','El descanso reduce la fatiga. Las acciones que mejoran la moral reducen la otra penalización.')
 ];
 return Object.entries({positive,negative}).flatMap(([type,rules])=>rules.map((rule,i)=>{
  const visibility=level===3||level===2&&(type==='positive'?i<2:i===0)?'known':level===2&&type==='negative'&&i===1||level===1&&i===0?'hint':'hidden';
  const id=p.id+'-'+type+'-'+(i+1);
  if(visibility==='hidden')return {id,type,visibility};
  if(visibility==='hint')return {id,type,visibility,name:level===1&&type==='positive'?profile.positive[i]:null,hint:level===1&&type==='negative'?'Hay indicios de una dificultad bajo ciertas condiciones.':level===1?'Se observó una ventaja en competencia o preparación.':rule.short};
  return {id,type,visibility,name:profile[type][i],...rule};
 }));
}
export function exclusiveRule(p){
 const condition=[9,10,11].includes(p.id)?'los tres Mujica comparten equipo':({3:'integra la alineación titular',5:'la adaptación pendiente es ≤25',20:'su equipo tiene preparación ≥4',32:'tiene dominio ≥70 y no está agotado',37:'compite por Sekai o la sinergia llega a 3',38:'su mazo llega a 75 de dominio'}[p.id]||'conserva su estilo favorito con fatiga ≤4');
 return 'En '+contexts[profiles[p.id].context]+', suma '+delta(specialBoost(p))+' al rendimiento si '+condition+'. Se aplica una vez por evaluación y puede combinarse con las demás ventajas.';
}

export function knowledge(state,id){
 const owned=state.started&&state.owned[id]===state.team;
 return !owned?1:(state.profileKnowledge?.[id]||0)>=10?3:2;
}
export function discover(state,id,amount){
 if(!state.started||state.owned[id]!==state.team)return;
 state.profileKnowledge??={};
 state.profileKnowledge[id]=Math.min(15,(state.profileKnowledge[id]||0)+amount);
}
export function lineupSlots(state,roster){
 const active=state.active.filter(id=>id!==state.captain);
 const reserves=[...new Set([...(state.reserveOrder||[]),...roster])].filter(id=>roster.includes(id)&&!state.active.includes(id));
 return [active[0]||null,state.captain||null,active[1]||null,reserves[0]||null,reserves[1]||null];
}
export function changeSlot(state,roster,slot,id){
 if(!Number.isInteger(slot)||slot<0||slot>4||!roster.includes(id))return false;
 const slots=lineupSlots(state,roster),old=slots.indexOf(id);
 if(old<0||old===slot||!slots[slot])return false;
 [slots[slot],slots[old]]=[slots[old],slots[slot]];
 state.captain=slots[1];
 state.active=slots.slice(0,3).filter(Boolean);
 state.reserveOrder=slots.slice(3).filter(Boolean);
 return true;
}
export const profileRevisionKey='duel-circuit-profile-revisions-v1';
export function profileFor(id,storage){
 try{const saved=JSON.parse(storage?.getItem(profileRevisionKey)||'{}')[id];return saved?{...profiles[id],...saved}:profiles[id];}catch{return profiles[id];}
}


