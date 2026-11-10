import {settleRivalDebt} from './finances.js';
import {teams,players,formats} from './data.js';
import {offers,offerQuote,canSign,recordContract,origins,fit} from './career.js';
import {ensureCircuit,relate,bond,unlocked} from './circuit.js';

export const organizations={
 korium:{founder:34,ids:[34],challenge:'Alta',history:'Una organización que sostiene su proyecto con presupuesto y preparación.',edge:'Apoyo de gestión: +12 CR por fecha.',handover:'Las cuentas están ordenadas. Desde hoy decidís vos cómo invertir y a quién llevar a cada fecha. Yo sigo en el plantel.'},
 garden:{founder:35,ids:[35],challenge:'Alta',history:'Garden Team apuesta por estrategias alternativas.',edge:'El testeo descubre un poco más sobre Mixto.',handover:'En Garden nos gusta incomodar al favorito. El equipo queda en tus manos. Yo sigo acá para probar esas listas que nadie quiere llevar.'},
 mujica:{founder:9,ids:[9,10,11],challenge:'Moderada',history:'Thiago, Kevin y Johnny construyeron su identidad alrededor del trabajo de los tres.',edge:'Juntada del equipo: +1 de sinergia adicional.',handover:'Te presento a Kevin y Johnny. Siempre competimos como un bloque. Vos vas a dirigir, yo voy a seguir en la mesa con mis hermanos.'},
 sekai:{founder:37,ids:[37],challenge:'Alta',history:'Sekai conecta la comunidad y la competencia presencial. Nico TCG es su fundador.',edge:'Cada local disputado en Sekai da +2 de reputación adicional.',handover:'Conozco la comunidad de Sekai y voy a ayudarte a abrir puertas. La dirección deportiva queda a tu cargo. Yo sigo compitiendo en el plantel.'},
 obelisk:{founder:22,ids:[22,21],challenge:'Moderada',history:'El medio del circuito reúne información, audiencia y experiencia competitiva.',edge:'Los contactos con otras organizaciones aportan +3 de relación.',handover:'Mateo y yo arrancamos juntos. Acá importa lo que jugamos y la reputación que dejamos. La dirección es tuya. Yo sigo como duelista.'},
 dima:{founder:26,ids:[26],challenge:'Alta',history:'Un local con identidad competitiva que busca convertir práctica en resultados.',edge:'Reunión de testeo: +1 de preparación adicional.',handover:'Mi mazo tiene sus reglas. El equipo, a partir de hoy, tiene tus decisiones. Contá conmigo para las partidas.'},
 lair:{founder:null,representative:16,ids:[16],challenge:'Alta',history:'Lair se apoya en la experiencia presencial. Carlistos Bala representa al club hasta confirmar el nombre del fundador.',edge:'Cada local disputado en Lair da +2 de reputación adicional.',handover:'La sala te enseña rápido qué idea funciona. Vos dirigís desde ahora. Yo me quedo a probar la próxima rareza en la mesa.'},
 haru:{emblem:'✦',founder:18,ids:[18],challenge:'Alta',history:'La tienda virtual acerca a los duelistas mediante Dark Book.',edge:'La primera fecha online disputada de cada semana aporta +2 de conocimiento en Combo.',handover:'¡Qué bueno que llegaste! Si necesitás una mano para armar el grupo, contá conmigo. Vos dirigís y yo sigo jugando para Haru.'}
};
export const continental={week:52,slots:4,minimumRoster:3};
export const haruRecruits=players.filter(p=>p.id!==18&&p.stars<4.5);
export function newOrganization(state,id,manager,captain,seen=[],starter=null){
 const club=organizations[id];
 if(!club||id==='haru'&&!haruRecruits.some(p=>p.id===starter))return false;
 const initial=id==='haru'?[...club.ids,starter]:[...club.ids];
 state.started=true;
 state.organization={id,founder:club.founder,representative:club.representative??null,initial,freeSigning:id==='haru'?starter:null,seen:[...seen],qualifiers:null,champion:null};
 state.team=id;
 state.manager=manager.trim().slice(0,35)||'Mánager';
 state.credits=100;
 state.identity=null;
 state.owned=Object.fromEntries(players.map(p=>[p.id,null]));
 for(const [team,definition] of Object.entries(organizations))for(const pid of definition.ids)state.owned[pid]=team;
 for(const pid of initial)state.owned[pid]=id;
 state.active=[...initial];state.captain=initial.includes(captain)?captain:initial[0];
 if(club.ids.length>=3){state.teamEvent=5;state.news.push('Se anuncia el debut 3v3 para la semana 5.');}
 state.guide={seen:[],dismissed:false};
 ensureCircuit(state);
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
 state.rivalBudgets??={};
 state.rivalSignings??=[];
 state.rivalIncomeWeek??={};
 const signings=[];
 for(const team of teams.filter(t=>t.id!==state.team)){
  const size=Object.values(state.owned).filter(t=>t===team.id).length;
  if(state.rivalIncomeWeek[team.id]===state.week)continue;
  state.rivalIncomeWeek[team.id]=state.week;
  state.rivalBudgets[team.id]=(state.rivalBudgets[team.id]??100)+90+size*5;
  settleRivalDebt(state,team.id);
  if(size>=5||!canSign(state,team.id)||random()> (size<3?.85:.38))continue;
  const candidates=players.filter(p=>!state.owned[p.id]&&!state.unavailable.includes(p.id)).map(p=>{
   const direct=unlocked(bond(state.circuit,team.id,origins[p.id]),0);
   return {p,direct,quote:offerQuote(state,[p.id],team.id)};
  }).filter(o=>o.quote.price<=state.rivalBudgets[team.id]&&(o.direct||random()<.45));
  candidates.sort((a,b)=>b.p.stars-a.p.stars||Number(b.direct)-Number(a.direct)||a.quote.price-b.quote.price);
  const choice=candidates[0];if(!choice)continue;
  const {p,direct,quote}=choice;
  const opinion=fit({...state,team:team.id},p,formats[state.formatIndex%formats.length]);
  if(random()*100>=opinion.chance)continue;
  state.rivalBudgets[team.id]-=quote.price;
  recordContract(state,team.id,[p.id],quote.price);state.owned[p.id]=team.id;
  relate(state.circuit,team.id,origins[p.id],3);
  const event={week:state.week,team:team.id,id:p.id,price:quote.price,direct};
  state.rivalSignings.push(event);signings.push(event);
  state.news.push(`Semana ${state.week}: ${team.name} incorporó a ${p.name}.`);
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
