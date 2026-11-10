const incidentBodies=[
 'Ari Bruma, un NPC, avisó que faltaban cartas en una bandeja de utilería. El comité inició un recuento.',
 'Las carpetas de demostración de los NPC Ari Bruma y Noa Vértice terminaron en mesas distintas. La organización comparará sus inventarios.',
 'Los NPC Ari Bruma y Noa Vértice pidieron una revisión de la misma jugada. La mesa ficticia anotó la pausa para revisar el procedimiento.',
 'El NPC Noa Vértice pidió comprobar una anotación deportiva de la exhibición. El comité abrió una revisión del acta.',
 'El comité apartó al NPC Taro Brizna de una exhibición por un cruce de turnos. La medida se limita a la Sala Prisma y se revisará con el registro.',
 'La pantalla de emparejamientos perdió la numeración. El comité ficticio está contrastando el orden anunciado con las mesas ocupadas.',
 'Ari Bruma y Taro Brizna, ambos NPC, reclamaron la misma plaza. El comité revisará el registro antes de cerrar la exhibición.',
 'El comité ficticio revisa el rumor de que Noa Vértice, NPC, cambiaría de equipo de exhibición. Aún no existe anuncio de traspaso.',
 'Un cruce de horarios de la Sala Prisma obligó a pausar una exhibición. El comité busca una franja dentro de su propia agenda ficticia.',
 'El comité ficticio coteja material de demostración que quedó sin registrar al cierre de la exhibición.'
];
const sections=[
 ['Competencia','local',['Se define en la última ronda','El local no da respiro','Cinco rondas y una sorpresa','Otra fecha para el archivo','Una tarde de desempates','Todo se juega en la mesa final','La tabla se mueve','El local prueba a sus favoritos','El circuito toma nota','Nadie se guarda el mazo']],
 ['Circuito oficial','major',['El cuadro grande marca el ritmo','La temporada entra en juego','La última ronda cambia el panorama','El corte deja historias','La clasificación se aprieta','El circuito mira la mesa principal','Una cita que pesa en el ranking','Fin de semana de máxima exigencia','El cuadro vuelve a sorprender','La fecha grande deja su marca']],
 ['Dark Book','online',['El teclado también compite','Cuatro rondas desde casa','Una noche larga en Dark Book','La tabla online cobra vida','Duelo de pantallas','El circuito virtual suma historias','El desempate también es digital','Del escritorio a la clasificación','La última ronda se juega online','Dark Book mueve el tablero']],
 ['Mercado','market',['Hay movimiento en el mercado','Los contratos toman temperatura','El mercado vuelve a abrir','Una plaza cambia la negociación','La mesa de fichajes no descansa','Una oferta activa las conversaciones','El presupuesto marca el paso','Los clubes revisan sus opciones','La próxima firma empieza a tomar forma','Las listas de candidatos se renuevan']],
 ['Relaciones','social',['Los clubes abren el diálogo','Puentes entre organizaciones','La cooperación gana terreno','Dos equipos comparten agenda','Una charla cambia las condiciones','La confianza empieza a pesar','La rivalidad deja espacio al diálogo','Los vínculos también se entrenan','El próximo acuerdo toma forma','La diplomacia entra al circuito']],
 ['Preparación','practice',['El trabajo sigue fuera de la mesa','El plantel se pone a punto','Prepararse también es competir','Una semana para ajustar el plan','La adaptación empieza en el testeo','El equipo mira sus próximos cruces','Una charla antes de volver a competir','Los mazos pasan por el banco de pruebas','El entrenamiento marca la agenda','La preparación se hace notar']],
 ['Metajuego','meta',['Los mazos alternativos piden pista','El circuito revisa sus pronósticos','La preparación cambia de objetivo','El meta todavía guarda sorpresas','Las lecturas del formato se afinan','Un nuevo cruce en el radar','Los favoritos ya tienen respuesta','El laboratorio mira la clasificación','El formato sigue dando conversación','El conocimiento empieza a pesar']],
 ['Agenda','calendar',['Lo que viene en el circuito','Los clubes revisan su calendario','La próxima fecha ya asoma','La agenda tiene una cita marcada','Los duelistas empiezan a hacer planes','El calendario toma protagonismo','Una semana para anotar','El circuito prepara el próximo cuadro','Hay movimiento en la agenda','La preparación tiene fecha límite']],
 ['Crónica','odd',['Una carpeta se va de paseo','El reloj de ronda pierde la noción del tiempo','Un tapete aparece al revés','El mazo de práctica llega en una caja de galletitas','La mesa tres cambia de número','Un árbitro ficticio pide dos pizarras','La fila de inscripción se equivoca de puerta','El marcador imprime una ronda fantasma','El puesto de agua gana la final del humor','Una ficha promocional termina en el buzón equivocado']],
 ['Incidente ficticio','incident',['Investigan cartas extraviadas en la Sala Prisma','Un cruce de carpetas obliga a revisar el inventario','Una discusión por un ruling retrasa una ronda','Una denuncia deportiva ficticia pasa a revisión','Un NPC queda suspendido de una exhibición ficticia','Un fallo del sistema obliga a reorganizar las mesas','Dos NPC discuten por una inscripción','Un rumor ficticio de traspaso llega a la mesa editorial','Una exhibición se reprograma por un error de horarios','El comité ficticio abre una revisión de material extraviado']]
];
export const templates=sections.flatMap(([category,key,titles])=>titles.map((title,i)=>({id:key+'-'+i,key,category,title})));
export function publish(state,context,random=Math.random){
 const press=state.press??={articles:[],pending:[]};
 const week=state.week;
 const append=(category,title,intro,body,importance,entity='Circuito',effect='')=>{
  const article={id:week+'-'+press.articles.length,week,date:new Date(Date.UTC(2027,0,2+(week-1)*7)).toISOString().slice(0,10),category,title,intro,body,importance,entity,effect};
  press.articles.push(article);return article;
 };
 const facts=[
  ['major',context.major,context.major&&context.major.result,9,context.major?.name],
  ['local',context.local,context.local&&context.local.result,5,context.local?.venue],
  ['online',context.online?.length,context.online?.length+' fechas online resueltas; cada una tuvo cuatro rondas.',5,'Dark Book'],
  ['market',context.deal,context.deal,5,'Mercado'],
  ['social',context.social,context.social,5,'Organizaciones'],
  ['practice',context.practice,context.practice,4,'Plantel'],
  ['meta',context.meta,context.meta,4,'Formato'],
  ['calendar',context.upcoming,context.upcoming,3,'Calendario']
 ];
 const emit=(key,text,weight,entity)=>{
  const all=templates.filter(t=>t.key===key);
  const pool=all.filter(t=>!press.articles.some(a=>a.title===t.title&&week-a.week<10));
  const chosen=(pool.length?pool:all)[Math.floor(random()*(pool.length||all.length))];
  const detail=typeof text==='function'?text(chosen):text;
  return append(chosen.category,chosen.title,detail,detail+' '+['La redacción lo incorporó a su registro semanal.','El dato forma parte del balance de la fecha.','Circuit News seguirá su evolución en las próximas fechas.'][week%3],weight,entity);
 };
 const articles=[];
 for(const [key,enabled,text,weight,entity] of facts)if(enabled)articles.push(emit(key,text,weight,entity));
 if(week%3===0)articles.push(emit('odd','Crónica ficticia: un NPC de la Sala Prisma protagonizó una anécdota de organización. La jornada continuó.',2,'Sala Prisma (ficticia)'));
 if(week%11===0&&!press.pending.length){
  const a=emit('incident',t=>'Exhibición ficticia de Sala Prisma. '+incidentBodies[Number(t.id.split('-')[1])],10,'Sala Prisma (ficticia)');
  const before=state.prep;state.prep=Math.min(12,state.prep+1);
  if(state.prep>before)a.effect='El equipo recibe +1 de preparación por revisar su protocolo de torneo.';
  press.pending.push({week,source:a.title});
  articles.push(a);
 }
 for(const event of press.pending){
  if(week===event.week+1)articles.push(append('Seguimiento','Sala Prisma revisa su protocolo','El comité ficticio comunicó sus primeras medidas.',event.source+' sigue bajo revisión. La organización empezó a comprobar registros e inscripciones.',7,'Sala Prisma (ficticia)'));
  if(week===event.week+2)articles.push(append('Seguimiento','Sala Prisma cierra la revisión','El comité ficticio publicó el cierre.',event.source+' quedó asentado. El comité confirmó el ajuste del protocolo y cerró la revisión sin atribuir responsabilidades a terceros.',7,'Sala Prisma (ficticia)'));
 }
 press.pending=press.pending.filter(e=>week<e.week+2);
 return articles;
}
