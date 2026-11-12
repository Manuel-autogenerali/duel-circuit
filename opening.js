import {upgrade,maintenance,needsFoundation,foundationCandidates,startConversation,answerConversation,continueConversation,signFoundation,recruitmentGate,interviewPassed} from './social.js';
import {events as personalEvents} from './dialogues.js';
import {settleRivalDebt} from './finances.js';
import {teams,players,formats} from './data.js';
import {offers,offerQuote,canSign,recordContract,origins,fit} from './career.js';
import {ensureCircuit,relate,bond,unlocked} from './circuit.js';

export const organizations={
 korium:{founder:34,ids:[34],challenge:'Alta',history:'Una organización que sostiene su proyecto con presupuesto y preparación.',edge:'Ingresos base de gestión: 180 CR por semana.',handover:'Las cuentas están ordenadas. Desde hoy decidís vos cómo invertir y a quién llevar a cada fecha. Yo sigo en el plantel.'},
 garden:{founder:35,ids:[35],challenge:'Alta',history:'Garden Team apuesta por estrategias alternativas.',edge:'El testeo descubre un poco más sobre Mixto.',handover:'En Garden nos gusta incomodar al favorito. El equipo queda en tus manos. Yo sigo acá para probar esas listas que nadie quiere llevar.'},
 mujica:{founder:9,ids:[9,10,11],challenge:'Moderada',history:'Thiago, Kevin y Johnny construyeron su identidad alrededor del trabajo de los tres.',edge:'Juntada del equipo: +1 de sinergia adicional.',handover:'Te presento a Kevin y Johnny. Siempre competimos como un bloque. Vos vas a dirigir, yo voy a seguir en la mesa con mis hermanos.'},
 sekai:{founder:37,ids:[37],challenge:'Alta',history:'Sekai conecta la comunidad y la competencia presencial. Nico TCG es su fundador.',edge:'Cada local disputado en Sekai da +2 de reputación adicional.',handover:'Conozco la comunidad de Sekai y voy a ayudarte a abrir puertas. La dirección deportiva queda a tu cargo. Yo sigo compitiendo en el plantel.'},
 obelisk:{founder:22,ids:[22,21],challenge:'Moderada',history:'El medio del circuito reúne información, audiencia y experiencia competitiva.',edge:'Los contactos con otras organizaciones aportan +3 de relación.',handover:'Mateo y yo arrancamos juntos. Acá importa lo que jugamos y la reputación que dejamos. La dirección es tuya. Yo sigo como duelista.'},
 dima:{founder:26,ids:[26],challenge:'Alta',history:'Un local con identidad competitiva que busca convertir práctica en resultados.',edge:'Reunión de testeo: +1 de preparación adicional.',handover:'Mi mazo tiene sus reglas. El equipo, a partir de hoy, tiene tus decisiones. Contá conmigo para las partidas.'},
 lair:{founder:null,representative:16,ids:[16],challenge:'Alta',history:'Lair se apoya en la experiencia presencial. Carlitos Vala representa al club hasta confirmar el nombre del fundador.',edge:'Cada local disputado en Lair da +2 de reputación adicional.',handover:'La sala te enseña rápido qué idea funciona. Vos dirigís desde ahora. Yo me quedo a probar la próxima rareza en la mesa.'},
 haru:{emblem:'✦',founder:null,representative:18,ids:[],challenge:'Alta',history:'La tienda virtual acerca a los duelistas mediante Dark Book.',edge:'La primera fecha online disputada de cada semana aporta +2 de conocimiento en Combo.',handover:'Haru empieza con tu elección. Elegí un agente libre de menos de 4,5 estrellas sin costo; después conocerás una oportunidad fundacional para completar el grupo.'}
};
export const continental={week:52,slots:4,minimumRoster:3};
const initialMembers=new Set(Object.values(organizations).flatMap(o=>o.ids));
export const haruRecruits=players.filter(p=>!initialMembers.has(p.id)&&p.stars<4.5);
export function newOrganization(state,id,manager,captain,seen=[],starter=null){
 const club=organizations[id];
 if(!club||id==='haru'&&!haruRecruits.some(p=>p.id===starter))return false;
 const initial=id==='haru'?[...club.ids,starter]:[...club.ids];
 state.started=true;
 state.organization={id,founder:club.founder,representative:club.representative??null,initial,freeSigning:null,chosenInitial:id==='haru'?starter:null,seen:[...seen],qualifiers:null,champion:null};
 state.team=id;
 state.manager=manager.trim().slice(0,35)||'Mánager';
 state.credits=100;
 state.identity=null;
 state.owned=Object.fromEntries(players.map(p=>[p.id,null]));
 for(const [team,definition] of Object.entries(organizations))for(const pid of definition.ids)state.owned[pid]=team;
 for(const pid of initial)state.owned[pid]=id;
 if(id!=='haru'){const first=players.filter(p=>!state.owned[p.id]&&p.stars<4.5).sort((a,b)=>a.stars-b.stars||a.id-b.id)[0];state.owned[first.id]='haru';}
 state.active=[...initial];state.captain=initial.includes(captain)?captain:initial[0];
 if(club.ids.length>=3){state.teamEvent=5;state.news.push('Se anuncia el debut 3v3 para la semana 5.');}
 state.guide={seen:[],dismissed:false};
 ensureCircuit(state);
 upgrade(state);state.social.version=14;state.social.tutorial.introStep=6;
 state.offers=offers(state);
 return true;
}
export const rankedTeams=state=>[...teams].sort((a,b)=>(state.standings[b.id]||0)-(state.standings[a.id]||0)||a.name.localeCompare(b.name,'es'));
export const eligibleTeams=state=>rankedTeams(state).filter(t=>Object.values(state.owned).filter(id=>id===t.id).length>=continental.minimumRoster);
export function qualify(state){
 if(!state.organization||state.week<continental.week)return null;
 state.organization.qualifiers??=eligibleTeams(state).slice(0,continental.slots).map(t=>t.id);
 return state.organization.qualifiers;
}
export function rivalRecruit(state,random=Math.random){
 if(!state.organization)return [];
 const x=upgrade(state),signings=[];state.rivalBudgets??={};state.rivalIncomeWeek??={};state.rivalSignings??=[];
 for(const t of teams.filter(t=>t.id!==state.team)){
  if(state.rivalIncomeWeek[t.id]===state.week)continue;state.rivalIncomeWeek[t.id]=state.week;
  const original=state.team,active=x.active,lineup=[...state.active],captain=state.captain;state.team=t.id;x.active=null;
  try{
   const foundation=state.week===1&&needsFoundation(state,t.id),size=Object.values(state.owned).filter(id=>id===t.id).length;
   if(size>=5||!foundation&&!canSign(state,t.id))continue;
   const candidates=foundation?foundationCandidates(state):players.filter(p=>recruitmentGate(state,p,t.id).ok&&offerQuote(state,[p.id],t.id).price<=Math.max(0,(state.rivalBudgets[t.id]??100)-maintenance(size+1))).sort((a,b)=>b.stars-a.stars);
   const p=candidates[0];if(!p)continue;
   if(!interviewPassed(state,p.id,t.id)){
    if(!startConversation(state,p.id,foundation?'amable':['amable','indiferente','dificil'][(state.week+p.id)%3],foundation?'foundation':'recruit'))continue;
    const event=personalEvents.find(e=>e.id===x.active.event);
    for(let i=0;i<3;i++){answerConversation(state,i===0?event.stages[i].correct:random()<.7?event.stages[i].correct:(event.stages[i].correct+1)%3);continueConversation(state);}
    x.active=null;
   }
   if(!foundation&&!interviewPassed(state,p.id,t.id))continue;
   let price=0;
   if(foundation){if(!signFoundation(state,p.id,t.id))continue;}
   else{price=offerQuote(state,[p.id],t.id).price;if(price+maintenance(size+1)>(state.rivalBudgets[t.id]??0))continue;state.rivalBudgets[t.id]-=price;recordContract(state,t.id,[p.id],price);state.owned[p.id]=t.id;}
   const entry={week:state.week,team:t.id,id:p.id,price,foundation};state.rivalSignings.push(entry);signings.push(entry);state.news.push(t.name+' incorporó a '+p.name+(foundation?' mediante una oportunidad fundacional.':'.'));
  }finally{state.team=original;x.active=active;state.active=lineup;state.captain=captain;}
 }
 return signings;
}
export const openingLines=[
 ['welcome','¡Bienvenido a Duel Circuit! Soy Mili. Estamos en 2027 y el circuito vive una nueva temporada. Cada semana se disputan el lugar entre los mejores.'],
 ['explain','Vos vas a dirigir. Fichá talentos, entrená al plantel, estudiá el metajuego y elegí en qué fechas conviene competir.'],
 ['celebrate','El objetivo es clasificar al Continental de Equipos y ganarlo. Los rivales también tienen ese plan. Y sí, algunos ya le pusieron nombre a su trofeo.'],
 ['surprise','Ocho organizaciones buscan dirección deportiva. Cada una arranca con un plantel y un desafío distinto. ¿Cuál vas a dirigir?']
];
export const guideNotes={
 mercado:['explain','Las ofertas rotan cada semana. Las relaciones desbloquean negociaciones dirigidas, aunque el duelista no esté entre las ofertas.'],
 torneos:['welcome','Tocá un torneo para inscribir duelistas. En individual podés enviar a varios y en 3v3 necesitás exactamente tres habilitados.'],
 darkbook:['warn','Dark Book da experiencia e información. Repetir fechas acumula fatiga y puede llevar a obsesión. Los eventos mayores suspenden la agenda online.'],
 meta:['explain','Un formato combina amplitud y enfoque. Las ruedas explican los cruces y la investigación revela qué se está jugando.'],
 accion:['explain','Elegí una acción principal por semana. Podés practicar, reunir al plantel, fortalecer vínculos o contratar ayuda.'],
 liga:['celebrate','Los puntos de Regionales y superiores deciden la clasificación. Los locales ayudan a crecer y tienen su propia tabla.'],
 plantel:['warn','La fatiga afecta el rendimiento. Ajustá tus titulares y dejá descansar a quien lo necesite.']
};
