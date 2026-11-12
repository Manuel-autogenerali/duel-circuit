import {players} from './data.js';
import {dbLimit} from './competition.js';
import {entryReason} from './weekend.js';
import {events15} from './events15.js';

export const preparation = ['plantel','meta','noticias','accion','mercado','torneos'];
export function update15(state) {
 const data = state.update15 ??= {friendship:{}, events:{}, interviews:[], tutorials:{}, history:[]};
 if(data.prep?.week!==state.week)data.prep={week:state.week,done:[]};
 return data;
}
export const friendship = (state,id)=>update15(state).friendship[state.team+':'+id]||0;
export function changeFriendship(state,id,delta,source) {
 const data=update15(state),key=state.team+':'+id;
 data.friendship[key]=friendship(state,id)+delta;
 data.history.push({id,club:state.team,week:state.week,delta,source});
}
export function socialOptions(state) {
 const data=update15(state);
 return events15.filter(e=>state.owned[e.character_index]===state.team&&!data.events[state.team+':'+e.id]);
}
export function startSocial(state,id) {
 const data=update15(state),event=socialOptions(state).find(e=>e.id===id);
 if(!event||data.socialWeek===state.week||data.social||state.finished)return false;
 data.socialWeek=state.week;
 data.social={id,week:state.week,stage:0,phase:'intro',answers:[]};
 return true;
}
export const activeEvent = state=>events15.find(e=>e.id===update15(state).social?.id);
export function advanceSocial(state) {
 const data=update15(state),run=data.social;
 if(run?.phase==='intro'){run.phase='question';return;}
 if(run?.phase!=='reaction')return;
 if(run.stage<2){run.stage++;run.phase='question';return;}
 run.phase='end';
 data.events[state.team+':'+run.id]={...run,answers:[...run.answers],total:run.answers.reduce((sum,a)=>sum+a.delta,0)};
}
export function respondSocial(state,index,stage) {
 const run=update15(state).social,event=activeEvent(state);
 const choice=event?.stages[run.stage]?.options[index];
 if(run?.phase!=='question'||stage!==run.stage||!choice)return false;
 run.answers.push({id:choice.id,delta:choice.delta});
 run.phase='reaction';
 changeFriendship(state,event.character_index,choice.delta,event.id);
 return true;
}
export function draft15(state) {
 const data=update15(state);
 if(data.draft?.week!==state.week)data.draft={week:state.week,entries:structuredClone(state.entries),days:{...(state.competition?.days||{})},dirty:false};
 return data.draft;
}
export function registrationError(state,plan,event,id,cap,mayEnter) {
 const draft=draft15(state),ids=draft.entries[event.key]||[];
 if(!mayEnter(event))return 'El club no clasificó.';
 if(state.owned[id]!==state.team)return 'El duelista ya no pertenece a tu plantel.';
 if(event.type==='team'&&!ids.includes(id)&&ids.length>=3)return 'La formación ya tiene tres integrantes.';
 return entryReason({...state,entries:draft.entries},event,id,plan.events,cap);
}
export function validateDraft(state,plan,cap,mayEnter) {
 const draft=draft15(state);
 for(const [key,ids] of Object.entries(draft.entries)){
  if(!ids.length)continue;
  const event=plan.events.find(e=>e.key===key);
  if(!event)return 'Hay una competencia fuera del calendario de esta semana.';
  if(new Set(ids).size!==ids.length)return 'Hay duelistas duplicados.';
  if(event.type==='team'&&ids.length!==3)return event.name+': se requieren tres integrantes.';
  for(const id of ids){
   const error=registrationError(state,plan,event,id,cap,mayEnter);
   if(error)return players[id-1].name+': '+error;
  }
 }
 for(const [id,days] of Object.entries(draft.days)){
  if(!days)continue;
  if(!plan.online)return 'Dark Book está suspendido esta semana.';
  const player=players[Number(id)-1];
  if(!player||state.owned[id]!==state.team||!cap(state,Number(id)))return (player?.name||'Duelista desconocido')+' no está habilitado para Dark Book.';
  if(!Number.isInteger(days)||days<0)return player.name+': ingresá una cantidad válida de días.';
  if(days>dbLimit(player))return player.name+': superó el límite semanal de Dark Book ('+dbLimit(player)+' días).';
 }
 return '';
}
export const questions15=[
 ['¿Qué estás buscando en un equipo?','¿Qué tendría que pasar para que sintieras que este equipo es tu lugar?'],
 ['¿Qué creés que podés aportarle a nuestro equipo?','¿Cómo actuarías si uno de tus compañeros está pasando por una mala racha?'],
 ['¿Qué dificultades podríamos tener trabajando juntos?','¿Cómo reaccionarías si te dejáramos de reserva para un torneo importante?']
];
export const tutorial15=[
 ['', '¡Bienvenido a Duel Circuit! Ahora estás al frente de una organización competitiva. Vas a formar un plantel, preparar a tus jugadores, tomar decisiones y competir contra otros equipos.'],
 ['', 'Tu objetivo no es solamente ganar partidas. También vas a tener que administrar el equipo, entender el formato y aprovechar las oportunidades de cada semana.'],
 ['plantel','Acá vas a encontrar a los integrantes de tu organización. Vas a poder revisar su cansancio, su estado de ánimo, sus afinidades y las ventajas y desventajas que aportan.'],
 ['plantel','Si tocás a un jugador, vas a abrir su ficha técnica. Desde ahí también podés hablar con él y conocerlo mejor.'],
 ['meta','El metajuego representa las estrategias que están funcionando en el circuito. Cada jugador se adapta de manera diferente a los cambios del formato.'],
 ['meta','Acá vas a encontrar dos gráficos: uno sobre los estilos y otro sobre la diversidad. También podés consultar cómo afecta el formato a tu plantel.'],
 ['noticias','El circuito está vivo. Cada semana pueden ocurrir torneos, rivalidades, sorpresas y situaciones que afectan a jugadores y organizaciones.'],
 ['noticias','En Noticias vas a poder seguir lo que ocurre durante la temporada.'],
 ['accion','Cada semana vas a tener que decidir cómo preparar a tu equipo. Podés organizar sesiones de testeo, juntadas, encuentros con otros equipos, contratar ayuda o darles descanso.'],
 ['accion','Cada actividad tiene beneficios y requisitos. Leelos bien antes de decidir.'],
 ['mercado','Acá podés conocer candidatos, entrevistarlos y decidir quién merece un lugar en tu organización.'],
 ['mercado','Las entrevistas te ayudan a entender cómo piensa cada jugador. No hay preguntas correctas o incorrectas: vos decidís qué perfil te interesa.'],
 ['torneos','En Torneos vas a organizar las competencias del sábado, domingo y los días de testeo de Dark Book.'],
 ['torneos','Podés distribuir a tus jugadores, revisar sus cupos y confirmar las inscripciones cuando estés conforme.'],
 ['finish','Este contador te ayuda a seguir tu preparación semanal. Cuando hayas tomado tus decisiones, podés finalizar la semana.'],
 ['finish','Antes de avanzar, el juego te avisará si tenés cuestiones importantes pendientes.'],
 ['', '¡Listo! Ya conocés las herramientas principales de Duel Circuit.'],
 ['', 'Ahora te toca construir tu propia historia, preparar a tus jugadores, competir contra otras organizaciones y buscar la clasificación al Continental por equipos.'],
 ['', '¿Y quién sabe? Tal vez termines levantando el trofeo de campeón.']
];
