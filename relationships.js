import {players} from './data.js';
import {abilities} from './mechanics.js';
import {personality,voices} from './personalities.js';
const clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,n));
export const dailyTopics=[
 ['Cómo se siente en el equipo','Busquemos una mejora concreta.','Quiero que aceptes un desafío posible.','Deberías estar conforme con todo.'],
 ['Qué opina de sus compañeros','Repartamos mejor las tareas.','Acordemos cómo discutir sin ceder el plan.','Tus compañeros son el problema.'],
 ['Cómo viene entrenando','Elegí un objetivo comprobable.','Mostrá tu preparación en una prueba compartida.','Entrená sin preguntar hasta ganar.'],
 ['Si está conforme con su rol','Revisemos el rol y la próxima oportunidad.','Defendé tu lugar con criterios acordados.','El banco no necesita explicaciones.'],
 ['Qué piensa del próximo torneo','Preparemos un objetivo alcanzable.','Planteá un desafío deportivo al grupo.','Prometé que serás campeón.'],
 ['Cómo se siente con su mazo','Probemos un ajuste antes de decidir.','Explicá tu línea y escuchá otra lectura.','Te cambio la lista sin consultarte.'],
 ['Si está conforme con el mánager','Decime qué compromiso puedo cumplir mejor.','Negociemos expectativas y responsabilidades.','No corresponde cuestionar mi dirección.'],
 ['Qué espera de la temporada','Dividamos el objetivo en pasos.','Elegí una meta ambiciosa con revisiones.','Solo valen títulos inmediatos.']
];
export function memberState(s,id){s.social??={};s.social.members??={};return s.social.members[id]??={belonging:60,motivation:50,lowWeeks:0};}
export function dailyAvailable(s){return s.social?.dailyWeek?.[s.team]!==s.week;}
export function dailyPrompt(s,id,topic){
 const p=players[id-1],m=memberState(s,id),d=s.circuit.decks[id];
 const role=s.captain===id?'capitán':s.active.includes(id)?'titular':'reserva';
 return `${voices[id-1]} ${dailyTopics[topic][0]}: ahora soy ${role}, tengo ${s.fatigue[id]||0}/12 de fatiga y ${d.trust}/100 de confianza. ${m.motivation<40?'Me cuesta sostener el entusiasmo.':m.motivation>65?'Tengo ganas de convertir esta energía en preparación.':'Quiero un acuerdo que pueda sostener esta semana.'}`;
}
export function dailyTalk(s,id,topic,choice,resuming=false){
 if(s.owned[id]!==s.team||(!resuming&&!dailyAvailable(s))||!dailyTopics[topic]||![0,1,2].includes(choice))return null;
 s.social.dailyWeek??={};s.social.dailyWeek[s.team]=s.week;
 const p=players[id-1],kind=personality(id),m=memberState(s,id),d=s.circuit.decks[id];
 const preferred=['villanos','extrovertidos'].includes(kind)?1:0;
 const value=choice===2?-2:choice===preferred?3:1;
 const before={trust:d.trust,belonging:m.belonging,motivation:m.motivation,morale:s.morale[s.team]||0};
 d.trust=clamp(d.trust+value);m.belonging=clamp(m.belonging+value+Number(value>0&&abilities[p.id-1].team>0));m.motivation=clamp(m.motivation+value);
 s.morale[s.team]=clamp(before.morale+(value>0?.25:-.25),-2,2);
 s.social.relations??={};const key=s.team+':'+id;s.social.relations[key]=clamp((s.social.relations[key]||0)+Math.sign(value));
 const result={id,topic,week:s.week,trust:d.trust-before.trust,belonging:m.belonging-before.belonging,motivation:m.motivation-before.motivation,morale:s.morale[s.team]-before.morale,text:value>0?'El compromiso acordado le sirve para esta semana.':'La respuesta no atendió lo que planteaba y dejó malestar.'};
 s.social.dailyHistory??=[];s.social.dailyHistory.push(result);return result;
}
export function dismissalQuote(s,id){
 const count=Object.values(s.owned).filter(t=>t===s.team).length,table=[0,25,65,145,240,360];
 const blocked=s.week<5?'Disponible desde la semana 5.':s.owned[id]!==s.team?'No pertenece a tu plantel.':[9,10,11].includes(id)?'El contrato de los Mujica es indivisible.':count<=2?'Conservá al menos dos integrantes.':null;
 return {blocked,saving:table[count]-table[count-1],remaining:count-1,morale:-1,relation:-8,synergy:-1};
}
export function dismiss(s,id){
 const q=dismissalQuote(s,id);if(q.blocked)return false;
 s.owned[id]=null;s.active=s.active.filter(x=>x!==id);s.synergy=Math.max(0,(s.synergy||0)-1);s.morale[s.team]=clamp((s.morale[s.team]||0)-1,-2,2);
 const key=s.team+':'+id;s.social.relations[key]=clamp((s.social.relations[key]||0)-8);memberState(s,id).belonging=30;
 for(const ids of Object.values(s.entries||{})){const index=ids.indexOf(id);if(index>=0)ids.splice(index,1);}
 if(s.competition)delete s.competition.days[id];
 s.news.push(players[id-1].name+' dejó el plantel por decisión del mánager y vuelve al mercado.');return true;
}
export function weeklyBelonging(s,used){
 if(s.social.belongingWeek===s.week)return;s.social.belongingWeek=s.week;
 for(const p of players){if(!s.owned[p.id])continue;const m=memberState(s,p.id),d=s.circuit.decks[p.id];
  m.belonging=clamp(m.belonging+(used[p.id]?1:s.week-d.since>=3?-1:0)+(d.trust<30?-2:0));
  m.lowWeeks=m.belonging<25?m.lowWeeks+1:0;
 }
}
