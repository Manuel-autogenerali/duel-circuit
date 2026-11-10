import {financeRules,financeState,costs,settleFinance} from './finances.js';
import {organizations,continental,newOrganization,rankedTeams,eligibleTeams,qualify,rivalRecruit,openingLines,guideNotes,haruRecruits} from './opening.js';
import {profiles, labels, profileStats, profileEffects, characterAbilities, exclusiveRule, knowledge, discover, lineupSlots, changeSlot, profileFor} from './encyclopedia.js';
import {weekend,entryReason,professionals,guestChance} from './weekend.js';
import {publish} from './press.js';
import {styles, favorite, dominant, matchup, affinity, distribution, ensureCircuit, metaPosition, practice, learn, talk, bond, relate, discount, unlocked, onlineStatus, onlineEligible, onlineLoad, advanceCircuit, clamp} from './circuit.js';
import {venues, structures, levelOf, rankingPrize, roleWeight, buildField, swissTournament, updateLocal} from './tournaments.js';
import {begin, offers, offerQuote, canSign, contractLedger, recordContract, fit, recruit, enroll, cap, rarity, founders, origins} from './career.js';
import {avatar, ranks, updateRanks} from './avatars.js';
import {trio, weightedScore, transfer, abilities} from './mechanics.js';
import {teams,players,formats,styleNames,initialAssignments} from './data.js';

const $=sel=>document.querySelector(sel);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const currency=n=>Math.floor(n).toLocaleString('es-AR')+' cr';
const stars=n=>n===null?'? ★':Number(n).toLocaleString('es-AR',{maximumFractionDigits:1})+' ★';
const getP=id=>players.find(p=>p.id===Number(id));
const getTeam=id=>{const t=teams.find(t=>t.id===id);return t&&id===state?.team&&state.club?{...t,...state.club}:t};
const teamName=id=>getTeam(id)?.name||'Sin equipo';
const isMujica=id=>trio.includes(Number(id));
const rnd=(min,max)=>Math.random()*(max-min)+min;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const deepClone=x=>JSON.parse(JSON.stringify(x));
const KEY='duel-circuit-beta-01-save-v1';
let selected=null;
let state=null,tab='inicio',detail=null,toastTimer=null;
function initial(){
 const owned={};for(const [team,ids] of Object.entries(initialAssignments)) ids.forEach(id=>owned[id]=team);
 return {started:false,identity:null,club:null,offers:[],offerHistory:[],entries:{},weekly:null,report:null,relations:{},prep:0,synergy:0,teamEvent:null,tutorial:-1,team:null,manager:'',week:1,credits:15000,score:0,owned,active:[],captain:null,xp:{},fatigue:{},morale:{},unavailable:[],restDone:false,bookResult:null,aiBoost:{},localVenue:'sekai',localMode:'individual',localLeagues:{},localDone:false,officialDone:false,bookDone:false,history:[],standings:Object.fromEntries(teams.map(t=>[t.id,0])),wins:0,losses:0,formatIndex:0,banStyle:null,news:['2027: Duel Circuit anuncia ocho organizaciones invitadas a la nueva liga.'],achievements:[],starter:null};
}
try{const saved=JSON.parse((localStorage.getItem(KEY)||'null').replaceAll('Nico PSG','Nico TCG'));state=saved&&saved.owned&&saved.week?{...initial(),...saved}:initial()}catch{state=initial()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{notify('Guardado automático no disponible. Exportá la partida para conservarla.')}}
function notify(msg){let t=$('.toast');if(t)t.remove();t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.remove(),3200)}
const roster=team=>players.filter(p=>state.owned[p.id]===team);
const own=()=>roster(state.team);
const currentFormat=()=>formats[state.formatIndex%formats.length];
function formatDisplay(f){
 const axis=(label,index,names)=>`<figure><svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,8 90,37 75,84 25,84 10,37"/>${[[50,8],[90,37],[75,84],[25,84],[10,37]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="5" class="${i===index?'selected':''}"/>`).join('')}</svg><figcaption>${label}<strong>${names[index]}</strong></figcaption></figure>`;
 return `<div class="format-axes">${axis('Amplitud',f.breadth-2,['2 mazos','3 mazos','4 mazos','5 mazos','Abierto (6+)'])}${axis('Enfoque',f.axis,['Combo','Control','Aggro','Mixto','Push'])}</div>`;
}
const weekDate=(day=0)=>{const d=new Date(Date.UTC(2027,0,2+7*(state.week-1)+day));return d.toLocaleDateString('es-AR',{timeZone:'UTC',day:'2-digit',month:'short',year:'numeric'})};
const tier=s=>s>=5?'S':s>=4.5?'A+':s>=4?'A':s>=3.5?'B+':s>=3?'B':s>=2.5?'C+':s>=2?'C':s>=1.5?'D+':'D';
function rating(p){const gained=Math.floor((state.xp[p.id]||0)/120);const base=Math.min(p.potential??5,p.stars+0.5*gained);const extra=state.aiBoost[p.id]||0;return Math.min(p.potential??5,base+extra)}
function effectiveRating(p,context='local',teamId=state.owned[p.id]){
 const f=currentFormat(), a=abilities[p.id-1];
 const c=ensureCircuit(state),d=c.decks[p.id],o=onlineStatus(c,p.id);
 let r=rating(p)+profileEffects(p,state,context,teamId)+(a[context]||0)+(d.mastery[d.style]-50)*.004-d.adaptation*.005+metaPosition(d.style,f,c,teamId)+('DCBAS'.indexOf(affinity(p,f))-2)*.06;
 if(o.obsession)r+=context==='book'?.12:-.18;
 if(o.exhaustion)r-=.18;
 if(modernCareer()&&teamId===state.team)r+=state.prep*.035+state.synergy*.04+fit(state,p,f).score*.035;
 if(d.style===dominant(f))r+=.09;
 r+=f.breadth>=4?(a.wide||0):(a.narrow||0);
 if(state.banStyle&&favorite({style:state.banStyle})===d.style)r-=.28;
 if(a.trio&&trio.every(id=>state.owned[id]===teamId))r+=a.trio;
 if(teamId===state.team){
  if(state.captain===p.id)r+=a.captain||0;
  if(!state.active.includes(p.id))r+=a.reserve||0;
 }
 if(a.swing)r+=rnd(-a.swing,a.swing);
 r+=(a.form||0)*(state.morale[teamId]||0);
 r-=(state.fatigue[p.id]||0)*(.07+(a.fatigue||0));
 return Math.max(.6,r);
}
function chooseLineup(){const a=own();if(state.active.length!==Math.min(3,a.length)||state.active.some(id=>!a.some(p=>p.id===id)))state.active=a.slice(0,3).map(p=>p.id);if(!state.active.includes(state.captain))state.captain=state.active[0];}
function header(){const top=`<div class="top"><div><div class="logo">DUEL <span>CIRCUIT</span></div>${modernCareer()?`<div class="club-label">${esc(teamName(state.team))} · ${own().length}/5</div>`:''}<div class="sub">BETA 0.1 · ${state.started?`Semana ${state.week} · ${esc(weekDate())}`:'Temporada 2027'}</div></div><div class="currency">${state.started?currency(state.credits):'40 duelistas'}</div></div>`;
 if(!state.started)return top;
 const tabs=[['inicio','Inicio'],['plantel','Plantel'],['accion','Acción semanal'],['mercado','Fichajes'],['torneos','Torneos'],['darkbook','Dark Book'],['liga','Calendario y liga'],['enciclopedia','Enciclopedia'],['archivo','Archivo y ajustes']];
 return top+`<nav class="tabs" aria-label="Navegación">${tabs.map(([id,label])=>`<button data-tab="${id}" class="${tab===id?'active':''}">${label}</button>`).join('')}</nav>`
}
function recordMoves(){
 state.playerMoves??={};
 if(state.previousOwnership)for(const p of players)if(state.previousOwnership[p.id]!==state.owned[p.id]){
  const moves=state.playerMoves[p.id]??=[];moves.push({week:state.week,from:state.previousOwnership[p.id],to:state.owned[p.id]});
 }
 state.previousOwnership={...state.owned};
}
function normalizeSekai(){
 if(state.organization?.id==='sekai'&&state.organization.founder===null&&state.organization.representative===37){
  state.organization.founder=37;
  state.organization.representative=null;
 }
}
function render(){
 normalizeSekai();
 if(launchScreen){
  $('#app').classList?.toggle('reduce-motion',launchSettings.reduce);
  $('#app').innerHTML=`<main class="content launch-shell">${openingView()}</main>`;
  return;
 }
 const old=!state.circuit;
 ensureCircuit(state);
 qualify(state);
 $('#app').classList?.toggle('reduce-motion',launchSettings.reduce);
 if(old&&state.identity)for(const o of state.offers)if(o.status==='open')Object.assign(o,offerQuote(state,o.ids||[o.id]));
 updateRanks(rating);if(state.started){chooseLineup();recordMoves();}let html=header()+`<main class="content">${state.started?guidePanel():''}${!state.started?intro():({inicio:modernCareer()?dashboard:home,plantel:squad,mercado:modernCareer()?newMarket:market,torneos:entriesView,darkbook:onlineView,liga:()=>objective()+financeView()+league()+localTables(),archivo:archive,enciclopedia:encyclopedia,meta:metaView,noticias:newsView,accion:actionsView,informe:reportView}[tab]||home)()}</main><div class="footer">Duel Circuit · Prototipo original de gestión TCG · Sin cartas ni marcas oficiales. <a class="btn ghost" href="./galeria.html">Galería de duelistas</a> <button class="btn ghost" data-action="export">Exportar partida</button></div>`;$('#app').innerHTML=html;save()}
function home(){const t=getTeam(state.team),f=currentFormat();return `<div class="hero"><span class="tag gold">MANAGER MODE · TEMPORADA 2027</span><h1>${esc(t.name)}</h1><p>Dirigido por ${esc(state.manager)} · ${esc(t.focus)}. Hasta tres titulares y dos reservas. La preparación es tan importante como las estrellas.</p><div class="grid three"><div class="mini"><small>Créditos</small><strong>${currency(state.credits)}</strong></div><div class="mini"><small>Puntos de liga</small><strong>${state.score}</strong></div><div class="mini"><small>Balance</small><strong>${state.wins}V / ${state.losses}D</strong></div></div></div><div class="widegrid"><section><div class="panel"><h2>Esta semana</h2>${state.report?'<button class="btn ghost" data-tab="informe">Último informe</button>':''}<p class="muted">${esc(weekDate())} · Formato: <b>${esc(f.name)}</b></p>${formatDisplay(f)}${state.banStyle?`<div class="notice">Banlist activa: penalización a estrategias ${esc(styleNames[state.banStyle])}.</div>`:''}<div class="actions"><button class="btn" data-tab="torneos">Jugar torneos</button><button class="btn secondary" data-tab="plantel">Ajustar titulares</button><button class="btn secondary" data-action="finishWeek">Finalizar semana →</button></div></div><div class="panel"><h2>Próximos eventos</h2>${nextEvents().slice(0,4).map(e=>`<div class="news"><b>Semana ${e.week}: ${esc(e.name)}</b><div class="small muted">${esc(e.type)}</div></div>`).join('')}</div></section><section><div class="panel"><h2>Mis titulares</h2>${state.active.map(id=>playerLine(getP(id))).join('')}</div><div class="panel"><h2>Noticias del circuito</h2>${state.news.slice(-5).reverse().map(n=>`<div class="news small">${esc(n)}</div>`).join('')}</div></section></div>`}
function playerLine(p){if(!p)return'';return `<div class="player">${avatar(p)}<div><div class="title">${esc(p.name)} ${state.captain===p.id?'<span class="tag gold">CAP</span>':''}</div><div class="alias">${esc(p.alias)}</div><div class="score">${stars(rating(p))} · Tier ${tier(rating(p))}</div></div><button data-detail="${p.id}">Ficha</button></div>`}
function squad(){
 const rosterIds=own().map(p=>p.id),slots=lineupSlots(state,rosterIds);
 const position=(id,i)=>{
  const p=getP(id),captain=i===1,reserve=i>=3,label=captain?'Capitán':reserve?'Reserva '+(i-2):'Titular '+(i===0?1:2);
  return `<article class="roster-slot ${captain?'roster-captain':''}"><span class="tag ${captain?'gold':''}">${label} · ×${captain?'2':reserve?'0,5':'1'}</span>
  ${p?`<button class="roster-portrait" data-detail="${p.id}" aria-label="Ficha de ${esc(p.name)}">${avatar(p)}<span class="roster-name"><strong>${esc(p.name)}</strong>${captain?`<small>${esc(p.alias)}</small>`:''}<span class="stars">${stars(rating(p))}</span></span></button>
  ${reserve?`<p class="small">${state.unavailable.includes(p.id)?'Ausente':'Fatiga '+(state.fatigue[p.id]||0)+'/10'} · ${styles[state.circuit.decks[p.id].style]}</p>`:''}
  <details class="slot-picker"><summary>Cambiar</summary><div>${own().filter(q=>q.id!==id).map(q=>`<button class="btn ghost" data-action="lineupSlot" data-slot="${i}" data-id="${q.id}">${esc(q.name)}</button>`).join('')||'<small>Sin reemplazos.</small>'}</div></details>`:'<div class="empty-slot">Vacante</div>'}</article>`;
 };
 return `<section class="panel roster-stage"><span class="tag gold">ALINEACIÓN · ${rosterIds.length}/5</span><h1>${esc(teamName(state.team))}</h1>
 <div class="lineup-stage">${slots.slice(0,3).map(position).join('')}</div><h2>Reservas</h2>
 <div class="lineup-bench">${slots.slice(3).map((id,i)=>position(id,i+3)).join('')}</div>
 <p class="muted small">Los multiplicadores se aplican a puntos individuales de Regionales y superiores. El rendimiento del duelo se calcula aparte.</p>
 <button class="btn secondary" data-tab="accion">Preparación semanal</button> <button class="btn ghost" data-tab="enciclopedia">Enciclopedia</button></section>`;
}
function historyCard(p){
 const records=state.playerRecords?.[p.id]||[];
 const online=state.circuit.bookHistory.filter(e=>e.rows.some(r=>r.id===p.id)).map(e=>{const row=e.rows.find(r=>r.id===p.id);return {week:e.week,name:'Dark Book',place:row.place,wins:row.wins,losses:row.losses};});
 const news=state.news.filter(n=>n.includes(p.name)).slice(-4);
 return `<section class="panel"><h3>Historial competitivo</h3>${[...records,...online].sort((a,b)=>b.week-a.week).slice(0,12).map(e=>`<div class="news">Semana ${e.week} · ${esc(e.name)} · Puesto ${e.place} · ${e.wins}V / ${e.losses}D${e.level===undefined?'':' · '+stars(e.level)}</div>`).join('')||'<p>Sin resultados registrados en esta carrera.</p>'}
 ${(state.playerMoves?.[p.id]||[]).slice(-5).reverse().map(m=>`<p>Semana ${m.week} · ${esc(teamName(m.from))} → ${esc(teamName(m.to))}</p>`).join('')}${news.map(n=>`<div class="news">${esc(n)}</div>`).join('')}</section>`;
}
function abilityCard(skill){
 const icon=skill.visibility==='hidden'?'🔒':skill.type==='positive'?'✦':'⚑';
 const tone=skill.type==='positive'?'advantage':'drawback';
 if(skill.visibility!=='known')return `<div class="ability-card ${tone} ${skill.visibility}"><span aria-hidden="true">${icon}</span><div><strong>${esc(skill.name||(skill.visibility==='hidden'?'Habilidad desconocida':'Rasgo por confirmar'))}</strong>${skill.hint?`<small>${esc(skill.hint)}</small>`:''}</div></div>`;
 return `<details class="ability-card ${tone}" data-ability-id="${esc(skill.id)}"><summary><span aria-hidden="true">${icon}</span><span><strong>${esc(skill.name)}</strong><small>${esc(skill.short)}</small></span><span class="ability-chevron" aria-hidden="true">⌄</span></summary>
 <div class="ability-detail"><p>${esc(skill.full)}</p><dl>${Object.entries({'Activación':skill.condition,'Efecto real':skill.effect,'Duración':skill.duration,'Límites':skill.limit,'Interacción':skill.interaction,'Cómo mitigarlo':skill.mitigation}).filter(([,text])=>text).map(([label,text])=>`<div><dt>${esc(label)}</dt><dd>${esc(text)}</dd></div>`).join('')}</dl></div></details>`;
}
function playerModal(id){
 const p=getP(id);if(!p)return;
 ensureCircuit(state);
 const f=profileFor(id,localStorage),level=knowledge(state,id),known=level>1,full=level===3;
 const skills=characterAbilities(p,f,level),deck=state.circuit.decks[id],morale=state.morale[state.team]||0;
 const el=document.createElement('div');el.className='dialogback';
 const opener=document.activeElement;
 const dismiss=()=>{el.remove();opener?.focus?.();};
 el.innerHTML=`<div class="dialog dossier compact-dossier" role="dialog" aria-modal="true" aria-label="Ficha de ${esc(p.name)}"><div class="dossier-bar"><span class="tag gold">N.º ${String(id).padStart(3,'0')} · Conocimiento ${level}/3</span><button class="btn ghost" data-action="close">Cerrar</button></div>
 <div class="dossier-grid"><header class="dossier-art">${avatar(p)}<div><h2>${esc(p.name)}</h2><p>«${esc(p.alias)}»</p><strong class="stars">${stars(rating(p))}${known&&p.potential!==null?' · Potencial '+stars(p.potential):''}</strong></div></header>
 <div class="dossier-body"><section class="dossier-overview"><p class="dossier-personality">${esc(known?f.behavior:f.public.split(/(?<=\.)\s+/)[0])}</p>
 <p class="dossier-tags"><span class="tag">${esc(f.status)}</span> <span class="tag">Origen: ${esc(teamName(f.origin))}</span> <span class="tag">Mazo favorito: ${styles[favorite(p)]}</span></p>
 ${known?`<div class="dossier-vitals"><div>Moral del equipo <strong>${morale>0?'+':''}${morale}</strong></div><div>Fatiga <strong>${state.fatigue[id]||0}/10</strong></div><div>Confianza <strong>${deck.trust}/100</strong></div></div>`:'<p class="muted small">Perfil público · Estado interno reservado.</p>'}</section>
 <div class="ability-groups">${[['positive','Ventajas'],['negative','Desventajas']].map(([type,title])=>`<section aria-label="${title}"><h3>${title}</h3>${skills.filter(s=>s.type===type).map(abilityCard).join('')}</section>`).join('')}</div>
 ${full?`<details class="panel exclusive"><summary>✦ Mecánica exclusiva · ${esc(f.exclusive)}</summary><p>${esc(exclusiveRule(p))}</p></details>`:`<p class="small muted">🔒 Mecánica exclusiva sin descubrir${known?' · '+(state.profileKnowledge?.[id]||0)+'/10':''}.</p>`}
 ${known?`<details class="panel dossier-secondary"><summary>Biografía y perfil</summary><p class="tag">${esc(f.review)}</p><p>${esc(f.history)}</p><p>${esc(f.habit)}. ${esc(f.relationship)}</p><p>Ante derrotas: ${esc(f.loss)}. Ante victorias: ${esc(f.win)}.</p><p>${cap(state,id)} torneos físicos disponibles esta semana · ${state.xp[id]||0} XP</p></details>
 <details class="panel dossier-secondary"><summary>Mazo y estadísticas de perfil</summary>${deckCard(p,level)}${labels.map((label,i)=>{const value=profileStats(p)[i];return `<div class="report-meter">${label} <strong>${value}/100</strong><div class="progress"><div style="width:${value}%"></div></div></div>`;}).join('')}</details>`:''}
 <details class="panel dossier-secondary"><summary>Historial competitivo</summary>${historyCard(p)}</details></div></div></div>`;
 document.body.appendChild(el);
 el.addEventListener('click',e=>{if(e.target===el||e.target.closest('[data-action="close"]'))dismiss();});
 el.querySelector?.('[data-action="close"]')?.focus();
 el.addEventListener('keydown',e=>{if(e.key==='Escape')dismiss();});
}

let encyclopediaFilter={};
function encyclopedia(){
 const fields={team:['Equipo',teams.map(t=>[t.id,t.name])],stars:['Estrellas',[1,1.5,2,2.5,3,3.5,4,4.5,5].map(n=>[n,n+' ★'])],style:['Estilo',styles.map((s,i)=>[i,s])],availability:['Disponibilidad',[[0,'Ausente'],[1,'Un torneo'],[2,'Dos torneos']]],status:['Estado',[...new Set(Object.values(profiles).map(p=>p.status))].map(s=>[s,s])]};
 const eligible=players.filter(p=>Object.entries({team:state.owned[p.id]||origins[p.id],stars:rating(p),style:favorite(p),availability:cap(state,p.id),status:profiles[p.id].status}).every(([k,v])=>!encyclopediaFilter[k]||encyclopediaFilter[k]===String(v)));
 return `<section class="panel"><h2>Enciclopedia · ${eligible.length}/40</h2><div class="grid encyclopedia-filters">${Object.entries(fields).map(([key,[label,options]])=>`<label>${label}<select data-encyclopedia="${key}"><option value="">Todos</option>${options.map(([value,name])=>`<option value="${esc(value)}" ${encyclopediaFilter[key]===String(value)?'selected':''}>${esc(name)}</option>`).join('')}</select></label>`).join('')}</div><div class="card-grid">${eligible.map(p=>`<article class="duel-card">${card(p)}<p class="small">${esc(profiles[p.id].status)} · Conocimiento ${knowledge(state,p.id)}/3</p><button class="btn" data-detail="${p.id}">Abrir ficha</button></article>`).join('')||'<p>Sin coincidencias.</p>'}</div></section>`;
}

function market(){const candidates=players.filter(p=>state.owned[p.id]!==state.team);return `<div class="panel"><h2>Mercado de fichajes</h2><p class="muted">Los equipos siempre tienen cinco jugadores. Cada operación intercambia al jugador comprado por uno de tu plantel, y descuenta el precio de fichaje.</p><p class="small muted">Los tres Mujica tienen un contrato indivisible: no pueden transferirse por separado.</p><div class="formline"><label>Jugador que se va de tu equipo en el intercambio</label><select id="swapOut">${own().filter(p=>!isMujica(p.id)).map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select></div><div class="actions"><button class="btn secondary" data-action="mujicaDeal" ${state.team===state.owned[9]||!canSign(state)?'disabled':''}>Negociar el trío Mujica</button></div></div><div class="panel"><h2>Jugadores disponibles</h2>${candidates.map(p=>{const quote=offerQuote(state,[p.id]);return `<div class="player">${avatar(p)}<div><b>${esc(p.name)}</b><div class="small muted">${esc(teamName(state.owned[p.id]))} · ${esc(p.alias)}</div><div class="score">${stars(rating(p))}</div>${priceBreakdown(quote)}</div><div><button data-detail="${p.id}">Ficha</button><button data-action="buy" data-id="${p.id}" ${isMujica(p.id)||!canSign(state)||state.credits<quote.price?'disabled':''}>Fichar</button></div></div>`;}).join('')}</div>`}
const schedule=week=>{let ev=[];if([4,10,16,22,28,34,40,46].includes(week))ev.push({week,name:'Regional individual',type:'individual',context:'official',stakes:8});if([6,12,18,24,30,36,42,48].includes(week))ev.push({week,name:'Regional 3v3',type:'team',context:'team',stakes:9});if(week===26)ev.push({week,name:'Nacional individual',type:'individual',context:'national',stakes:18});if(week===51)ev.push({week,name:'Nacional por equipos',type:'team',context:'team',stakes:20});if(week===38)ev.push({week,name:'Continental',type:'individual',context:'official',stakes:16});if(week===45)ev.push({week,name:'YCS',type:'individual',context:'official',stakes:15});if(week===49)ev.push({week,name:'YCS por equipos',type:'team',context:'team',stakes:16});return ev};
const nextEvents=()=>Array.from({length:52-state.week+1},(_,i)=>schedule(state.week+i)).flat().slice(0,8);
function tournaments(){const ev=schedule(state.week);return `<div class="panel"><h2>Competiciones · Semana ${state.week}</h2><p>Formato activo: <b>${esc(currentFormat().name)}</b></p><div class="grid"><div class="mini"><small>Regional/torneo local</small><strong>${state.localDone?'Jugado':'Disponible'}</strong></div><div class="mini"><small>Evento oficial</small><strong>${!ev.length?'Sin evento':state.officialDone?'Jugado':'Disponible'}</strong></div></div><h3>Fin de semana</h3><p class="muted">Cada semana podés jugar un local individual. Algunos fines de semana hay grandes eventos adicionales.</p><div class="actions"><button class="btn" data-action="playLocal" ${state.localDone?'disabled':''}>Jugar local (sábado/domingo)</button></div>${ev.length?ev.map(e=>`<div class="notice"><b>${esc(e.name)}</b> · ${e.type==='team'?'3v3 por equipos':'Individual'}<div class="actions"><button class="btn ${state.officialDone?'secondary':''}" data-action="playOfficial" ${state.officialDone?'disabled':''}>Participar</button></div></div>`).join(''):'<div class="news">Sin evento mayor esta semana. Entrená, jugá Dark Book o avanzá.</div>'}<div class="actions"><button class="btn secondary" data-action="nextWeek">Siguiente semana →</button></div></div><div class="panel"><h2>Últimos resultados</h2>${state.history.length?state.history.slice(-5).reverse().map(h=>`<div class="result ${h.position<=4?'win':'loss'}"><b>${esc(h.name)}</b> · semana ${h.week}<div class="small">${esc(h.result)} · +${h.points} puntos · +${currency(h.prize)}</div></div>`).join(''):'<p class="muted">Tu historia competitiva comenzará con el primer torneo.</p>'}</div>`}
function simulateEvent(kind, queued=null, registered=null){const event=queued||(kind==='local'?{name:'Local individual',type:'individual',context:'local',stakes:3}:schedule(state.week)[0]);if(!event)return;
 if(!queued&&(kind==='local'?state.localDone:state.officialDone))return;
 const ids=registered||own().map(p=>p.id);
 const results=teams.map(t=>{
  const members=t.id===state.team&&registered?registered.map(getP):roster(t.id).filter(p=>!queued||cap(state,p.id));
  const active=t.id===state.team?(registered||state.active):[...members].sort((a,b)=>rating(b)-rating(a)).slice(0,3).map(p=>p.id);
  const captain=t.id===state.team&&active.includes(state.captain)?state.captain:active[0];
  const scores=members.map(p=>({id:p.id,score:state.unavailable.includes(p.id)?0:Math.max(0,Math.round((effectiveRating(p,event.context)*1.65+rnd(-2.2,3.1))*event.stakes/5))}));
  const points=weightedScore(scores,active,captain);
  const power=event.type==='team'
   ? scores.filter(p=>active.includes(p.id)).reduce((sum,p)=>sum+p.score,0)
   : Math.max(0,...scores.map(p=>p.score));
  return {id:t.id,points,power:power+Math.random(),eligible:!queued||members.length>=(event.type==='team'?3:1)};
 }).filter(t=>t.eligible).sort((a,b)=>b.power-a.power);
 const rank=1+results.findIndex(t=>t.id===state.team);
 const teamScore=results[rank-1].points;
 const pts=teamScore+Math.max(0,9-rank)*event.stakes;const prize=200+Math.round(event.stakes*(9-rank)*20);state.score+=pts;state.credits+=prize;state.standings[state.team]=(state.standings[state.team]||0)+pts;
 results.forEach((t,i)=>{if(t.id!==state.team)state.standings[t.id]+=t.points+(8-i)*event.stakes});
 ids.forEach(id=>{state.xp[id]=(state.xp[id]||0)+Math.max(4,Math.round((9-rank)*3*(event.stakes/3)));state.fatigue[id]=Math.min(5,(state.fatigue[id]||0)+1)});
 results.forEach((t,i)=>state.morale[t.id]=Math.max(-2,Math.min(2,(state.morale[t.id]||0)+(i<4?1:-1))));
 if(rank<=4)state.wins++;else state.losses++;
 const result=rank===1?'¡Campeones!':`Puesto ${rank} de ${results.length} equipos`;
 state.history.push({week:state.week,name:event.name,result,position:rank,points:pts,prize});state.news.push(`${event.name}: ${teamName(state.team)} consiguió ${result.toLowerCase()} (+${pts} puntos).`);
 if(state.news.length>35)state.news.shift();
 if(queued)return;
 if(kind==='local')state.localDone=true;else state.officialDone=true;
 tab='torneos';render();notify(`${result} · +${pts} puntos · +${currency(prize)}`);
}
function darkbook(){const rankings=[{p:getP(7),num:1},{p:getP(32),num:2},...players.filter(p=>![7,32].includes(p.id)).sort((a,b)=>rating(b)-rating(a)).slice(0,6).map((p,i)=>({p,num:i+3}))];return `<div class="panel"><h2>Dark Book · Entrenamiento Online</h2><p class="muted">Una actividad por semana: partidas de práctica contra una variedad de estilos. Otorga XP, pero no puntos de liga. Los beneficios dependen de las pasivas individuales.</p><div class="grid"><div class="mini"><small>Sesión semanal</small><strong>${state.bookDone?'Completada':'Disponible'}</strong></div><div class="mini"><small>Formato</small><strong>${esc(currentFormat().name.split(' · ')[0])}</strong></div></div><div class="actions"><button class="btn" data-action="book" ${state.bookDone?'disabled':''}>Sesión de testeo (+XP)</button></div><div class="notice small">Franquito mejora el entrenamiento colectivo; Franco Parzano y Manu poseen ventajas especiales en Dark Book.</div></div><div class="panel"><h2>Ranking inicial Dark Book</h2>${(state.bookResult||[]).map(r=>`<div class="result ${r.won?'win':'loss'}">${esc(r.name)} vs. ${esc(r.rival)} · ${r.won?'Victoria':'Derrota'}</div>`).join('')}${rankings.map(({p,num})=>`<div class="player">${avatar(p)}<div><b>#${num} · ${esc(p.name)}</b><div class="alias">${esc(p.alias)}</div></div><div class="score">${stars(rating(p))}</div></div>`).join('')}<p class="small muted">Ranking narrativo de la beta: #1 Franco y #2 Manu, conforme a la historia establecida. Todavía no hay partidas de terceros en tiempo real.</p></div>`}
function league(){const rows=teams.map(t=>getTeam(t.id)).sort((a,b)=>(state.standings[b.id]||0)-(state.standings[a.id]||0));return `<div class="panel"><h2>Ranking nacional de equipos</h2><p class="small muted">Solo Regionales y superiores suman puntos nuevos. Los saldos de versiones anteriores se conservan.</p><div class="tablewrap"><table><thead><tr><th>#</th><th>Equipo</th><th>Tipo</th><th>Puntos</th></tr></thead><tbody>${rows.map((t,i)=>`<tr><td>${i+1}</td><td><span class="teamdot" style="background:${t.color}"></span><b>${esc(t.name)}</b>${t.id===state.team?' ★':''}</td><td>${esc(t.kind)}</td><td>${Math.round(state.standings[t.id]||0)}</td></tr>`).join('')}</tbody></table></div></div><div class="panel"><h2>Calendario 2027</h2><p class="muted">Formatos rotan cada 13 semanas. Banlist cada 26. En esta beta se simulan 8 regionales individuales, 8 regionales 3v3, nacionales, Continental y YCS.</p>${(modernCareer()?timedEvents():Array.from({length:52},(_,i)=>schedule(i+1)).flat()).map(e=>`<div class="row" style="padding:8px;border-bottom:1px solid #29344a"><span class="small">Semana ${e.week}: ${esc(e.name)}</span><span class="tag">${e.type==='team'?'3v3':'Individual'}</span></div>`).join('')}</div>`}
function archive(){return `<div class="panel"><h2>Personajes y revisión</h2><button class="btn" data-tab="enciclopedia">Abrir enciclopedia</button> <a class="btn ghost" href="./revision.html">Revisión editorial</a></div><div class="panel"><h2>Datos y partida guardada</h2><button class="btn ghost" data-action="openingTitle">Volver al título</button> <button class="btn ghost" data-action="guideReset">Reactivar guía de Mili</button>${modernCareer()?'<button class="btn ghost" data-action="tutorial">Repetir tutorial</button>':''}<div class="actions"><button class="btn secondary" data-action="export">Exportar partida JSON</button><button class="btn secondary" data-action="import">Importar partida JSON</button><button class="btn warn" data-action="reset">Reiniciar partida</button></div><p class="small muted">La partida se guarda automáticamente en este navegador (localStorage). Exportá una copia antes de borrar los datos del dispositivo.</p></div>`}
function nextWeek(quiet=false){if(state.week>=52){notify('Terminó la temporada 2027. Exportá tu partida o reiniciá para una nueva carrera.');return}state.week++;state.localDone=false;state.officialDone=false;state.bookDone=false;state.restDone=false;state.bookResult=null;
 state.unavailable=players.filter(p=>Math.random()<(abilities[p.id-1].absence||0)).map(p=>p.id);
 const absent=own().filter(p=>state.unavailable.includes(p.id));
 if(absent.length)state.news.push('Ausencias de esta semana: '+absent.map(p=>p.name).join(', ')+'.');
 players.forEach(p=>state.fatigue[p.id]=Math.max(0,(state.fatigue[p.id]||0)-1));
 if((state.week-1)%13===0){state.formatIndex=(state.formatIndex+1)%formats.length;state.news.push(`Nuevo formato trimestral: ${currentFormat().name}.`);players.filter(p=>state.owned[p.id]!==state.team).forEach(p=>{if(Math.random()<.2)state.aiBoost[p.id]=Math.min(.5,(state.aiBoost[p.id]||0)+.5)})}
 if((state.week-1)%26===0){state.banStyle=pick(['aggro','combo','control','offmeta']);state.news.push(`Banlist semestral: ${styleNames[state.banStyle]} recibe una penalización temporal en los duelos.`)}
 const income=modernCareer()?(90+own().length*5+(state.organization?.id==='korium'?12:0)+Math.floor(Math.max(0,...Object.values(state.circuit.reputation))/5)):350+own().reduce((sum,p)=>sum+(abilities[p.id-1].income||0),0);state.credits+=income;state.news.push(`Semana ${state.week}: ingresos operativos +${income} créditos.`);if(!quiet){tab='inicio';render();notify(`Semana ${state.week} · ${currentFormat().name}`)}}
function train(){if(state.credits<300){notify('No tenés suficientes créditos.');return}state.credits-=300;const bonus=own().reduce((sum,p)=>sum+(abilities[p.id-1].trainTeam||0),0);own().forEach(p=>{state.xp[p.id]=(state.xp[p.id]||0)+35+bonus+(abilities[p.id-1].trainXP||0);state.fatigue[p.id]=Math.min(5,(state.fatigue[p.id]||0)+1)});render();notify(`Entrenamiento completado: +${35+bonus} XP`)}
function book(){if(state.bookDone)return;const extra=own().reduce((sum,p)=>sum+(abilities[p.id-1].bookTeam||0),0);
 const rivals=players.filter(p=>state.owned[p.id]!==state.team);
 const rounds=state.active.map(id=>{
  const rival=pick(rivals);
  const won=!state.unavailable.includes(id)&&effectiveRating(getP(id),'book')+rnd(-1,1)>effectiveRating(rival,'book')+rnd(-1,1);
  return {name:getP(id).name,rival:rival.name,won};
 });
 state.bookResult=rounds;own().forEach(p=>{const bonus=(abilities[p.id-1].bookXP||0)+(rounds.some(r=>r.name===p.name&&r.won)?8:0);state.xp[p.id]=(state.xp[p.id]||0)+20+bonus+extra;state.fatigue[p.id]=Math.min(5,(state.fatigue[p.id]||0)+1)});state.bookDone=true;render();notify('Sesión Dark Book completada. Experiencia añadida.')}
function buy(id){if(!canSign(state))return;const p=getP(id);if(!p||state.owned[id]===state.team)return;if(isMujica(id)){notify('Contrato indivisible. Usá la opción de los tres Mujica.');return}const out=Number($('#swapOut')?.value);if(!out||isMujica(out)){notify('Elegí a quién intercambiar (no puede ser un Mujica).');return}const {price}=offerQuote(state,[id]);if(state.credits<price){notify('Créditos insuficientes.');return}if(!transfer(state,players,[id],[out],price))return;recordContract(state,state.team,[id],price);state.active=state.active.filter(x=>x!==out);if(state.active.length<3)state.active.push(id);chooseLineup();tab='plantel';render();notify(`${p.name} fichó por ${teamName(state.team)}.`)}
function mujicaDeal(){if(state.team===state.owned[9]||!canSign(state))return;const quote=offerQuote(state,trio),cost=quote.price;const leaving=own().filter(p=>!isMujica(p.id)).slice(0,3);if(leaving.length<3){notify('Necesitás tres jugadores transferibles.');return}if(state.credits<cost){notify(`Necesitás ${currency(cost)} para los tres Mujica.`);return}if(!confirm(`Fichar a Thiago, Kevin y Johnny juntos por ${currency(cost)} (base ${currency(quote.base)}, expansión ×${quote.multiplier.toFixed(2)}, descuento ${Math.round(quote.discount*100)}%) e intercambiar a ${leaving.map(p=>p.name).join(', ')}?`))return;if(!transfer(state,players,trio,leaving.map(p=>p.id),cost))return;recordContract(state,state.team,trio,cost);state.active=[...trio];state.captain=9;tab='plantel';render();notify('¡Los Mujica ficharon juntos!')}
function exportSave(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='duel-circuit-partida.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function importSave(){const input=document.createElement('input');input.type='file';input.accept='application/json';input.onchange=async()=>{try{const candidate=JSON.parse((await input.files[0].text()).replaceAll('Nico PSG','Nico TCG'));if(!candidate.owned||!candidate.team||!candidate.week)throw Error('Partida no válida');state={...initial(),...candidate};tab='inicio';launchScreen=false;render();notify('Partida importada')}catch(err){notify('No se pudo importar: '+err.message)}};input.click()}
document.addEventListener('click',e=>{const tabbtn=e.target.closest('[data-tab]');if(tabbtn){tab=tabbtn.dataset.tab;if(modernCareer()&&tutorialTabs[state.tutorial]===tab)state.tutorial++;if(tab==='noticias')readMetaNews();render();globalThis.scrollTo?.(0,0);return}const dt=e.target.closest('[data-detail]');if(dt){playerModal(Number(dt.dataset.detail));return}const btn=e.target.closest('[data-action]');if(!btn)return;const action=btn.dataset.action,id=Number(btn.dataset.id);if(openingAction(action,id,btn)||careerAction(action,id,btn))return;switch(action){case'start':state.team=$('#chooseTeam')?.value||'korium';state.manager=($('#manager')?.value||'Manu').trim().slice(0,35);state.started=true;state.credits+=getTeam(state.team).budget;state.active=own().slice(0,3).map(p=>p.id);state.captain=state.active[0];tab='inicio';render();break;case'nextWeek':nextWeek();break;case'playLocal':simulateEvent('local');break;case'playOfficial':simulateEvent('official');break;case'captain':if(state.active.includes(id)){state.captain=id;render()}break;case'promote':{const old=state.active[2];state.active=state.active.filter(x=>x!==old).concat(id);if(state.captain===old)state.captain=state.active[0];render();break}case'train':train();break;case'rest':if(!state.restDone){own().forEach(p=>state.fatigue[p.id]=Math.max(0,(state.fatigue[p.id]||0)-2));state.restDone=true;render();notify('Descanso completado.')}break;case'book':book();break;case'buy':buy(id);break;case'mujicaDeal':mujicaDeal();break;case'export':exportSave();break;case'import':importSave();break;case'reset':if(confirm('¿Borrar la partida y empezar desde cero?')){state=initial();selected=null;tab='inicio';launchScreen=true;opening.stage='title';save();render()}break;}});
const bookSlots=4;
function deckCard(p,level=3){
 const d=state.circuit.decks[p.id],o=onlineStatus(state.circuit,p.id),ready=d.lastTalk+4;
 return `<section class="panel"><h3>Mazo y confianza</h3><p>Actual: <b>${styles[d.style]}</b> · Favorito: ${styles[favorite(p)]} · Dominio ${Math.round(d.mastery[d.style])}/100${level===3?' · Afinidad '+affinity(p,currentFormat()):''}</p><p>Confianza ${d.trust}/100 · Adaptación pendiente ${Math.round(d.adaptation)}/100 · Fatiga ${state.fatigue[p.id]||0}/10${level===3&&o.obsession?' · Obsesión activa':''}${o.exhaustion?' · Agotamiento':''}</p>
 ${level===3?`<details><summary>Dominio por estilo, afinidades e historial</summary>${styles.map((s,i)=>`<div>${s} · ${Math.round(d.mastery[i])}/100</div>`).join('')}${d.history.slice(-8).reverse().map(h=>`<div>Semana ${h.week} · ${styles[h.from]} → ${styles[h.to]} · ${esc(h.reason)}</div>`).join('')}${formats.map(f=>`<span class="tag">${esc(f.name)} · ${affinity(p,f)}</span> `).join('')}</details>`:''}
 ${state.started&&state.owned[p.id]===state.team?`<p class="small">Próxima conversación: ${ready<=state.week?'disponible ahora':'semana '+ready}. «${d.style===favorite(p)?'Me siento cómodo con mi estilo favorito.':'Todavía estoy evaluando este estilo.'}»</p><div class="fieldrow"><select class="deck-style" aria-label="Estilo propuesto">${styles.map((s,i)=>`<option value="${i}" ${i===d.style?'selected':''}>${s}</option>`).join('')}</select><select class="deck-mode" aria-label="Propuesta"><option value="keep">Mantener</option><option value="change">Cambiar</option><option value="try">Probar alternativa</option><option value="adapt">Adaptar mazo actual</option></select></div><button class="btn" data-action="deckTalk" data-id="${p.id}" ${ready>state.week||state.finished?'disabled':''}>Hablar sobre su mazo</button>`:''}</section>`;
}
function deckTalk(id,btn){
 const p=getP(id),dialog=btn.closest('.dialog');
 if(!p||!dialog||state.finished)return true;
 const near=upcoming().some(e=>e.week-state.week<=1);
 const result=talk(state,p,Number(dialog.querySelector('.deck-style').value),dialog.querySelector('.deck-mode').value,near);
 if(result){discover(state,id,2);dialog.parentElement.remove();render();playerModal(id);notify(`${p.name} ${result.ok?'aceptó':'rechazó'} la propuesta (${Math.round(result.chance)}% de aceptación).`);}
 return true;
}
function readMetaNews(){
 const c=state.circuit;
 if(c.newsWeek===state.week)return;
 c.newsWeek=state.week;
 for(const [i,n] of Object.entries(c.discovery))if(n>=2)learn(c,state.team,Number(i),2);
}
function metaWheels(f,known){
 const points=[[50,8],[90,38],[75,84],[25,84],[10,38]];
 const wheel=(title,body,edges)=>`<section class="mini"><h3>${title}</h3><svg class="meta-wheel" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,8 90,38 75,84 25,84 10,38"/>${edges.map(([a,b])=>`<line x1="${points[a][0]}" y1="${points[a][1]}" x2="${points[b][0]}" y2="${points[b][1]}"/>`).join('')}${points.map(([x,y],i)=>`<g><circle cx="${x}" cy="${y}" r="7"/><text x="${x}" y="${y+2}">${i+1}</text></g>`).join('')}</svg>${body}</section>`;
 const pivot=dominant(f),weights=distribution(f);
 return `<div class="grid meta-wheels">${wheel('Rueda de matchups',styles.map((s,i)=>`<div class="small">${i+1}. ${s} · Ventaja contra ${styles.filter((_,j)=>matchup(i,j)>0).join(' y ')}</div>`).join(''),styles.flatMap((_,i)=>styles.flatMap((_,j)=>matchup(i,j)>0?[[i,j]]:[])))}
 ${wheel('Rueda de posicionamiento',styles.map((s,i)=>{
  const k=known[i],trend=state.circuit.discovery[i]||0;
  const estimate=k<12?'Sin datos':k<35?'Estimación preliminar':(weights[i]>=.25?'Muy jugado':weights[i]>=.15?'Presencia media':'Poco jugado')+' · '+(matchup(i,pivot)>0?'ventaja contra el dominante':matchup(i,pivot)<0?'desventaja contra el dominante':'neutral');
  return `<div class="small">${i+1}. ${s} · ${k}/100 · ${estimate}${trend&&k>=12?' · En ascenso':''}<div class="progress"><div style="width:${k}%"></div></div></div>`;
 }).join(''),styles.map((_,i)=>[pivot,i]).filter(([a,b])=>a!==b))}</div><p class="small muted">El formato anuncia el estilo dominante. Su presencia y los resultados alternativos se estiman con investigación y competencia.</p>`;
}
function scoutResults(result){
 const c=state.circuit,byName=new Map(result.standings.map(p=>[p.name,p]));
 for(const row of result.standings){
  if(!row.club)continue;
  if(row.club!==state.team)for(const id of row.members?.map(p=>p.id)||[row.id])if(c.decks[id])practice(c,id,4);
  const seen=new Set(row.matches.map(m=>byName.get(m.opponent)).filter(Boolean).flatMap(p=>p.styles||[Number.isInteger(p.style)?p.style:styles.indexOf(p.style)]));
  for(const i of seen)if(i>=0)learn(c,row.club,i,2);
 }
 for(const p of result.standings.slice(0,4)){
  if(!p.real)continue;
  for(const i of new Set(p.styles||[p.style])){
   if(!Number.isInteger(i)||distribution(currentFormat())[i]>.21)continue;
   if(!c.discovery[i]&&p.club===state.team)state.news.push(`${p.name} destacó con ${styles[i]}, una estrategia poco explorada.`);
   c.discovery[i]=Math.min(12,(c.discovery[i]||0)+2);
   for(const t of teams)learn(c,t.id,i,1);
  }
 }
}
function physicalCount(id){return eventsNow().filter(e=>state.entries[e.key]?.includes(id)).length;}
function onlineView(){
 if(!weekendPlan().online)return '<section class="panel"><h2>Dark Book suspendido</h2><p>Esta semana está reservada para el evento principal.</p><button class="btn" data-tab="torneos">Ver evento principal</button></section>';
 const c=state.circuit;
 return `<section class="panel"><h2>Dark Book · Semana ${state.week}</h2><p>Cuatro torneos online de cuatro rondas. Se juegan al finalizar la semana después de los presenciales. Dan XP e información, con fatiga creciente y sin puntos de liga.</p>
 ${Array.from({length:bookSlots},(_,i)=>`<fieldset class="duel-card"><legend>Dark Book · Fecha ${i+1}</legend>${own().map(p=>{
 const o=onlineStatus(c,p.id),eligible=onlineEligible(state,p.id,physicalCount(p.id));
 return `<label class="entry-choice"><input type="checkbox" value="${p.id}" ${c.bookEntries[i]?.includes(p.id)?'checked':''} ${eligible?'':'disabled'}>${avatar(p)}<span>${esc(p.name)} · Fatiga ${state.fatigue[p.id]||0}/10${o.obsession?' · Obsesión':''}${eligible?'':' · Límite por dos torneos físicos'}</span></label>`;
 }).join('')}<button class="btn" data-action="onlineEnroll" data-id="${i}" ${state.finished?'disabled':''}>Guardar inscripción</button></fieldset>`).join('')}
 <h3>Historial online</h3>${c.bookHistory.slice(-12).reverse().map(onlineReport).join('')||'<p>Todavía no hay resultados.</p>'}</section>`;
}
function queueOnline(i){
 if(!weekendPlan().online||state.finished||i<0||i>=bookSlots)return true;
 const btn=document.querySelector(`[data-action="onlineEnroll"][data-id="${i}"]`);
 const ids=[...(btn?.closest('fieldset').querySelectorAll('input:checked:not(:disabled)')||[])].map(x=>Number(x.value));
 state.circuit.bookEntries[i]=ids.filter(id=>state.owned[id]===state.team&&onlineEligible(state,id,physicalCount(id)));
 render();notify('Inscripción online actualizada');return true;
}
function resolveOnline(physical){
 if(!weekendPlan().online)return [];
 const c=state.circuit,results=[];
 for(let i=0;i<bookSlots;i++){
  const requested=c.bookEntries[i]||[];
  if(!requested.length)continue;
  const ids=requested.filter(id=>onlineEligible(state,id,physical[id]||0));
  const skipped=requested.filter(id=>!ids.includes(id)).map(id=>getP(id).name);
  if(!ids.length){results.push({week:state.week,slot:i+1,rows:[],skipped});continue;}
  const rivals=players.filter(p=>state.owned[p.id]!==state.team).map(p=>({p,draw:Math.random()})).sort((a,b)=>a.draw-b.draw).slice(0,24-ids.length);
  const field=[...ids.map(getP),...rivals.map(r=>r.p)].map(p=>({id:p.id,name:p.name,club:state.owned[p.id],real:true,style:c.decks[p.id].style,power:effectiveRating(p,'book')}));
  const result=swissTournament(field,{day1:4,day2:0,top:0,cut:0});
  scoutResults(result);
  const rows=result.standings.filter(p=>ids.includes(p.id)).map(p=>({id:p.id,name:p.name,place:p.place,wins:p.wins,losses:p.losses,matches:p.matches,xp:onlineLoad(state,getP(p.id),p.wins,physical[p.id]||0),fatigue:state.fatigue[p.id]}));
  for(const id of ids)discover(state,id,2);
  results.push({week:state.week,slot:i+1,rows,skipped,table:result.standings.map(p=>({name:p.name,place:p.place,points:p.points}))});
 }
 c.bookHistory.push(...results);
 c.bookHistory=c.bookHistory.slice(-40);
 return results;
}
function onlineReport(e){
 return `<details class="result"><summary>Dark Book · Semana ${e.week} · Fecha ${e.slot}${e.table?' · '+e.table.length+' duelistas':''}</summary>${e.rows.map(p=>`<div class="player">${avatar(getP(p.id))}<div><b>${esc(p.name)}</b> · #${p.place} · ${p.wins}V / ${p.losses}D · +${p.xp} XP · Fatiga ${p.fatigue}/10${p.matches.map(m=>`<div class="small">Ronda ${m.round} · ${esc(m.opponent)} · ${m.won?'Victoria':'Derrota'}</div>`).join('')}</div></div>`).join('')}${e.skipped.length?`<p>Sin cupo online por actividad física: ${esc(e.skipped.join(', '))}</p>`:''}${e.table?`<details><summary>Clasificación online</summary>${e.table.map(p=>`<div class="small">#${p.place} · ${esc(p.name)} · ${p.points} puntos</div>`).join('')}</details>`:''}</details>`;
}
function directOffers(){
 const c=state.circuit,result=[];
 const group=trio.filter(id=>state.owned[id]!==state.team);
 for(const p of players){
  if(state.owned[p.id]===state.team||state.unavailable.includes(p.id)||isMujica(p.id)&&p.id!==group[0])continue;
  const ids=isMujica(p.id)?group:[p.id];
  if(ids.some(id=>state.unavailable.includes(id))||ids.length+own().length>5)continue;
  const club=state.owned[p.id]||origins[p.id];
  const relation=bond(c,state.team,club),rep=c.reputation[origins[p.id]]||0;
  if(unlocked(relation,rep))result.push({id:p.id,ids,status:'open',...offerQuote(state,ids)});
 }
 return result;
}
function priceBreakdown(o){
 return `<small class="muted price-breakdown">Base ${currency(o.base)} · Expansión ×${o.multiplier.toFixed(2)} · Descuento ${Math.round(o.discount*100)}% · Final ${currency(o.price)}</small>`;
}
function directMarket(){
 const c=state.circuit;
 return `<details class="panel"><summary>Relaciones, reputación y fichajes dirigidos</summary>
 <div class="grid">${teams.filter(t=>t.id!==state.team).map(t=>`<div class="mini">${esc(t.name)} · Relación ${bond(c,state.team,t.id)}/100 · Descuento hasta ${Math.round(discount(bond(c,state.team,t.id),c.reputation[t.id]||0)*100)}%</div>`).join('')}</div>
 <p>${Object.entries(venues).map(([id,name])=>esc(name)+' '+(c.reputation[id]||0)+'/100').join(' · ')}</p>
 <p>Desbloqueo: relación 50 con su organización o reputación 35 en su local de origen. Una negociación por personaje y semana.</p>
 ${directOffers().map(o=>`<div class="player">${avatar(getP(o.id))}<div>${o.ids.map(id=>esc(getP(id).name)).join(', ')} ${priceBreakdown(o)}</div><button data-action="directRecruit" data-id="${o.id}" ${!canSign(state)||state.credits<o.price||c.negotiations.some(n=>n.id===o.id&&n.week===state.week)?'disabled':''}>Negociar</button></div>`).join('')||'<p>Sin oportunidades dirigidas para el plantel actual.</p>'}
 <h3>Historial</h3>${c.negotiations.slice(-10).reverse().map(n=>`<div class="news">Semana ${n.week} · ${esc(getP(n.id).name)} · ${esc(n.result)} · ${currency(n.price)}</div>`).join('')||'<p>Sin negociaciones.</p>'}</details>`;
}
function negotiate(id,direct){
 const c=state.circuit;
 if(state.finished||!modernCareer()||!canSign(state)||c.negotiations.some(n=>n.id===id&&n.week===state.week))return true;
 const offer=direct?directOffers().find(o=>o.id===id):state.offers.find(o=>o.id===id&&o.status==='open');
 if(!offer)return true;
 const club=state.owned[id]||origins[id],before=state.teamEvent;
 const saved=state.offers;
 if(direct)state.offers=[offer];
 let result;
 try{result=recruit(state,id,currentFormat());}finally{state.offers=saved;}
 if(result){
  const accepted=offer.status==='signed';
  relate(c,state.team,club,accepted?5:-4);
  if(accepted&&direct){const stale=saved.find(o=>o.id===id&&o.status==='open');if(stale)Object.assign(stale,{price:offer.price,base:offer.base,multiplier:offer.multiplier,discount:offer.discount,status:'signed'});}
  if(accepted)for(const key of offer.ids||[id]){
   const d=c.decks[key];d.since=state.week;d.trust=clamp(50+bond(c,state.team,club)*.2);
  }
  c.negotiations.push({week:state.week,id,ids:offer.ids||[id],direct,result,price:offer.price});
  state.news.push(`Semana ${state.week}: ${getP(id).name} ${result}.`);
  if(!before&&state.teamEvent)state.news.push(`Se anuncia el primer Regional 3v3 del equipo para la semana ${state.teamEvent}.`);
  render();notify(`${getP(id).name} ${result}.`);
 }
 return true;
}
function weeklySnapshot(){
 const c=state.circuit;
 return {prep:state.prep,synergy:state.synergy,xp:{...state.xp},meta:[...c.scouting[state.team]],rep:{...c.reputation},relations:Object.fromEntries(teams.map(t=>[t.id,bond(c,state.team,t.id)])),fatigue:Object.fromEntries(own().map(p=>[p.id,state.fatigue[p.id]||0])),morale:state.morale[state.team]||0,unlocked:directOffers().map(o=>o.id)};
}
function weeklyImpact(before,after){
 const lines=[];
 styles.forEach((s,i)=>{const n=after.meta[i]-before.meta[i];if(n)lines.push(`Conocimiento de ${s}: +${n} → ${after.meta[i]}/100.`);});
 for(const [id,name] of Object.entries(venues)){const n=(after.rep[id]||0)-(before.rep[id]||0);if(n)lines.push(`Reputación en ${name}: +${n} → ${after.rep[id]}/100.`);}
 for(const t of teams){const n=after.relations[t.id]-before.relations[t.id];if(n)lines.push(`Relación con ${t.name}: +${n} → ${after.relations[t.id]}/100.`);}
 for(const [id,n] of Object.entries(after.fatigue))if(n!==before.fatigue[id])lines.push(`${getP(id).name} · Fatiga ${before.fatigue[id]} → ${n}/10${knowledge(state,Number(id))===3&&onlineStatus(state.circuit,id).obsession?' · Obsesión activa':''}.`);
 for(const id of after.unlocked.filter(id=>!before.unlocked.includes(id)))lines.push(`Fichaje dirigido desbloqueado: ${getP(id).name}.`);
 for(const t of teams){
  const old=discount(before.relations[t.id],before.rep[t.id]||0),next=discount(after.relations[t.id],after.rep[t.id]||0);
  if(Math.floor(next*100)>Math.floor(old*100))lines.push(`Descuento con ${t.name}: hasta ${Math.floor(next*100)}%.`);
 }
 if(after.morale!==before.morale)lines.push(`Moral ${before.morale} → ${after.morale}.`);
 return lines;
}

const tutorialTabs=['meta','noticias','accion','torneos'];
const activities={
 test:['Reunión de testeo',0,'Preparación técnica y XP'],
 team:['Juntada del team',0,'Sinergia, moral y recuperación'],
 link:['Relacionarse con otro equipo',0,'Vínculos y mejores negociaciones'],
 coach:['Charla con un profesional',450,'Preparación, experiencia y sinergia']
};
const card=p=>`${avatar(p)}<strong>${esc(p.name)}</strong><div class="muted small">${esc(p.alias)}</div><div class="stars">${stars(rating(p))}${knowledge(state,p.id)>1?' · Potencial '+stars(p.potential):''}</div><div class="small muted">Ranking #${ranks[p.id]} · ${esc(styleNames[p.style])}</div>`;
const backupKey=KEY+'-previous';
function backupHistory(){
 try{const stored=JSON.parse((localStorage.getItem(backupKey)||'[]').replaceAll('Nico PSG','Nico TCG'));return Array.isArray(stored)?stored:stored?.started?[stored]:[];}catch{return [];}
}
const soundKey='duel-circuit-opening-settings';
let opening={stage:'title',line:0,club:null,captain:null,seen:[]};
let launchScreen=typeof window!=='undefined';
let audioContext;
let launchSettings={sound:false,reduce:false};
try{launchSettings={...launchSettings,...JSON.parse(localStorage.getItem(soundKey)||'{}')};}catch{}
function toggleSetting(key){
 launchSettings[key]=!launchSettings[key];
 try{localStorage.setItem(soundKey,JSON.stringify(launchSettings));}catch{}
 render();
}
function cue(){
 if(!launchSettings.sound||!globalThis.AudioContext)return;
 try{
  audioContext??=new AudioContext();
  audioContext.resume().catch(()=>{});
  const start=audioContext.currentTime,node=audioContext.createOscillator(),gain=audioContext.createGain();
  node.type='sine';node.frequency.setValueAtTime(480,start);node.frequency.linearRampToValueAtTime(620,start+.14);
  gain.gain.setValueAtTime(.035,start);gain.gain.exponentialRampToValueAtTime(.001,start+.18);
  node.connect(gain);gain.connect(audioContext.destination);node.start(start);node.stop(start+.18);
 }catch{}
}
const mili=(expression)=>`<img class="mili-art" src="./public/assets/opening/mili-${expression}.webp" width="448" height="560" alt="Mili, hada guía">`;
const soundControls=()=>`<button class="btn ghost" data-action="openingSound">Sonido: ${launchSettings.sound?'activado':'desactivado'}</button> <button class="btn ghost" data-action="openingMotion">Movimiento: ${launchSettings.reduce?'reducido':'según dispositivo'}</button>`;
const road=()=>`<ol class="continental-road">${['Torneos locales','Regionales','Nacionales y YCS','Clasificación continental','Continental de Equipos','Campeón continental'].map(s=>`<li>${s}</li>`).join('')}</ol>`;
function objective(){
 if(!state.organization)return '';
 const ranked=rankedTeams(state),eligible=eligibleTeams(state),pos=ranked.findIndex(t=>t.id===state.team)+1;
 const cut=eligible[continental.slots-1],points=state.standings[state.team]||0;
 const gap=cut?Math.max(0,state.standings[cut.id]-points+(eligible.indexOf(cut)<eligible.findIndex(t=>t.id===state.team)?1:0)):0;
 const next=upcoming()[0],qualified=state.organization.qualifiers;
 const inCut=eligible.slice(0,continental.slots).some(t=>t.id===state.team);
 return `<section class="panel continental-panel"><span class="tag gold">OBJETIVO DE TEMPORADA</span><h2>Continental de Equipos</h2><p>Puesto nacional #${pos} · ${points} pts · ${state.organization.champion===state.team?'Campeón continental':qualified?(qualified.includes(state.team)?'Clasificado':'Fuera del corte'):own().length<3?'Faltan integrantes para 3v3':inCut?'En zona de clasificación':'Fuera de zona · Brecha al corte: '+gap+' pts'}</p><p class="small muted">Próximo evento: ${next?esc(next.name)+' · semana '+next.week:'sin anuncio dentro del plazo'}. Corte de beta: ${continental.slots} equipos elegibles, mínimo ${continental.minimumRoster} integrantes, semana ${continental.week}.</p><details><summary>Camino al Continental</summary>${road()}</details></section>`;
}
function openingRosterIds(){
 const ids=organizations[opening.club]?.ids||[];
 return opening.club==='haru'&&opening.recruit?[...ids,opening.recruit]:ids;
}
function haruStarterPicker(){
 const p=getP(opening.recruit);
 return `<section class="panel"><h2>Refuerzo inicial de Haru</h2><p>Sumá un duelista gratis junto a Alan. Solo se admiten personajes de menos de 4,5 estrellas.</p>
 <label>Elegí el fichaje inicial <select id="haru-starter"><option value="">Seleccioná un duelista</option>${[...haruRecruits].sort((a,b)=>a.name.localeCompare(b.name,'es')).map(q=>`<option value="${q.id}" ${opening.recruit===q.id?'selected':''}>${esc(q.name)} · ${stars(q.stars)}</option>`).join('')}</select></label>
 ${p?`<div class="player">${avatar(p)}<div><strong>${esc(p.name)}</strong><p class="small">${stars(p.stars)} · Fichaje inicial gratuito</p></div><span class="tag gold">0 CR</span></div>`:''}</section>`;
}
function openingLineup(club){
 const ids=openingRosterIds(),others=ids.filter(id=>id!==opening.captain),slots=[others[0],opening.captain,others[1]];
 const slot=(id,label,central=false)=>`<article class="roster-slot ${central?'roster-captain':''}"><span class="tag ${central?'gold':''}">${label}</span>${id?`<button class="roster-portrait" data-detail="${id}">${avatar(getP(id))}<span class="roster-name"><strong>${esc(getP(id).name)}</strong><span class="stars">${stars(getP(id).stars)}</span></span></button>`:'<div class="empty-slot">Vacante</div>'}</article>`;
 return `<div class="lineup-stage">${slots.map((id,i)=>slot(id,['Titular · ×1','Capitán · ×2','Titular · ×1'][i],i===1)).join('')}</div><div class="lineup-bench">${slot(null,'Reserva · ×0,5')}${slot(null,'Reserva · ×0,5')}</div>
 ${ids.length>1?`<div class="actions"><span>Elegí capitán:</span>${ids.map(id=>`<button class="btn ${opening.captain===id?'gold-button':'ghost'}" data-action="openingCaptain" data-id="${id}" aria-pressed="${opening.captain===id}">${esc(getP(id).name)}</button>`).join('')}</div>`:''}`;
}
function openingView(){
 const club=organizations[opening.club],team=getTeam(opening.club),speaker=club&&getP(club.founder??club.representative);
 const button=(action,text)=>`<button class="btn gold-button" data-action="${action}">${text}</button>`;
 const back=button('openingBack','Volver');
 if(opening.stage==='title'){
  const backup=backupHistory().length>0;
  return `<section class="launch-title"><span class="tag gold">TEMPORADA 2027</span><h1>DUEL <span>CIRCUIT</span></h1><p class="launch-subtitle">Team Manager</p><p>Dirigí tu organización y disputá el Continental de Equipos.</p><div class="actions">${state.started?button('openingContinue','Continuar'):''}${button('openingNew','Nueva carrera')}</div><div class="actions">${soundControls()}<button class="btn ghost" data-action="import">Importar partida</button>${backup?'<button class="btn ghost" data-action="openingRestore">Recuperar carrera anterior</button>':''}</div><p class="small muted">Universo ficticio e independiente.</p></section>`;
 }
 if(opening.stage==='dialogue'){
  const [expression,text]=openingLines[opening.line];
  return `<section class="opening-scene"><button class="opening-art-button" data-action="openingNext" aria-label="Avanzar diálogo">${mili(expression)}</button><div class="opening-copy"><span class="tag gold">MILI · ${opening.line+1}/4</span><button class="opening-dialogue" data-action="openingNext">${esc(text)}</button><div class="actions">${button('openingNext',opening.line===3?'Elegir mi equipo':'Continuar')}${back}<button class="btn ghost" data-action="openingSkip">Omitir introducción</button></div><div class="actions">${soundControls()}</div></div></section>`;
 }
 if(opening.stage==='choose')return `<section class="panel"><h1>Elegí tu organización</h1><p>Ocho clubes. Todos empiezan con 100 CR.</p><div class="organization-grid">${Object.entries(organizations).map(([id,o])=>{
  const t=getTeam(id),p=getP(o.founder??o.representative),expanded=id===opening.club;
  return `<article class="duel-card organization-card" style="--club:${t.color}"><button class="organization-pick" data-action="openingSelect" data-club="${id}" aria-expanded="${expanded}">${avatar(p)}<span><b>${o.emblem||'⬟'} ${esc(t.name)}</b><small>${o.founder?'Fundador':'Referente provisional'} · ${esc(p.name)}</small><small>${(id==='haru'?2:o.ids.length)} integrante${id!=='haru'&&o.ids.length===1?'':'s'} · Desafío ${o.challenge.toLowerCase()}</small></span></button>
  ${expanded?`<div class="organization-detail"><p>${esc(o.history)}</p><p><b>Filosofía:</b> ${esc(t.focus)}.</p><p><b>Ventaja:</b> ${esc(o.edge)}</p><p><b>Dificultad:</b> ${o.ids.length<3?'Necesita fichajes para competir en 3v3.':'Arranca con trío completo y una agenda más exigente.'}</p><p><b>Plantel:</b> ${o.ids.map(id=>esc(getP(id).name)).join(', ')}${id==='haru'?' y un refuerzo gratis a elección':''}.</p>${button('openingConfirm','Confirmar organización')}</div>`:''}</article>`;
 }).join('')}</div><div class="actions">${back}</div></section>`;
 if(opening.stage==='handover')return `<section class="opening-scene opening-founder">${avatar(speaker)}<div class="opening-copy"><span class="tag gold">TRASPASO DE MANDO · ${esc(team.name)}</span><h1>${esc(speaker.name)}</h1><p>«${esc(club.handover)}»</p><div class="actions">${button('openingRoster','Conocer el plantel')}${back}</div></div></section>`;
 if(opening.stage==='roster')return `<section class="panel roster-stage"><h1>Plantel inicial · ${esc(team.name)}</h1>${opening.club==='haru'?haruStarterPicker():''}${openingLineup(club)}<p>Mili: «Los lugares vacantes son espacio para fichajes. Para el Continental necesitás tres duelistas habilitados».</p><div class="actions">${opening.club==='haru'&&!opening.recruit?'<button class="btn gold-button" disabled>Ver objetivo continental</button>':button('openingGoal','Ver objetivo continental')}${back}</div></section>`;
 return `<section class="opening-scene">${mili('farewell')}<div class="opening-copy"><span class="tag gold">OBJETIVO FINAL</span><h1>Ganá el Continental de Equipos</h1>${road()}<p>En esta beta clasifican los primeros ${continental.slots} equipos elegibles del ranking nacional al comenzar la semana ${continental.week}. Se exige un plantel de ${continental.minimumRoster} o más. Los locales no suman puntos nacionales.</p><label>Tu nombre de mánager <input id="openingManager" maxlength="35" placeholder="Mánager"></label><div class="actions">${button('openingLaunch','Empezar semana 1')}${back}</div></div></section>`;
}
function guidePanel(){
 const note=guideNotes[tab],g=state.guide;
 if(!note||!g||g.dismissed||g.seen.includes(tab))return '';
 return `<aside class="notice mili-guide">${mili(note[0])}<div><strong>Mili · ${esc(tab==='liga'?'Camino al Continental':tab)}</strong><p>${esc(note[1])}</p><button class="btn ghost" data-action="guideSeen">Entendido</button> <button class="btn ghost" data-action="guideDismiss">Omitir guía</button></div></aside>`;
}
function openingAction(action,id,btn){
 if(action==='openingSound'){toggleSetting('sound');cue();return true;}
 if(action==='openingMotion'){toggleSetting('reduce');return true;}
 if(action==='guideSeen'||action==='guideDismiss'||action==='guideReset'){
  state.guide??={seen:[],dismissed:false};
  if(action==='guideSeen')state.guide.seen.push(tab);
  if(action==='guideDismiss')state.guide.dismissed=true;
  if(action==='guideReset')state.guide={seen:[],dismissed:false};
  render();return true;
 }
 if(!action.startsWith('opening'))return false;
 switch(action){
 case 'openingTitle':launchScreen=true;opening.stage='title';break;
 case 'openingContinue':launchScreen=false;break;
 case 'openingRestore':
  try{
   const history=backupHistory(),prior=history.pop();
   if(prior?.started&&confirm('¿Intercambiar la carrera actual con la anterior?')){
    if(state.started)history.push(state);localStorage.setItem(backupKey,JSON.stringify(history));state={...initial(),...prior};tab='inicio';launchScreen=false;
   }
  }catch{notify('No se pudo abrir la carrera anterior.');}
  break;
 case 'openingNew':opening={stage:'dialogue',line:0,club:null,captain:null,seen:[]};break;
 case 'openingNext':
  if(opening.stage!=='dialogue')return true;
  if(!opening.seen.includes(opening.line))opening.seen.push(opening.line);
  if(opening.line<openingLines.length-1)opening.line++;else opening.stage='choose';
  break;
 case 'openingSkip':opening.stage='choose';break;
 case 'openingSelect':if(Object.hasOwn(organizations,btn.dataset.club))opening.club=btn.dataset.club;break;
 case 'openingConfirm':
  if(!organizations[opening.club])return true;
  opening.captain=organizations[opening.club].ids[0];opening.stage='handover';break;
 case 'openingRoster':opening.stage='roster';break;
 case 'openingCaptain':if(openingRosterIds().includes(id))opening.captain=id;break;
 case 'openingGoal':if(opening.club==='haru'&&!opening.recruit)return true;opening.stage='goal';break;
 case 'openingBack':{
  const previous={choose:'dialogue',handover:'choose',roster:'handover',goal:'roster'};
  if(opening.stage==='dialogue'&&opening.line>0)opening.line--;
  else opening.stage=previous[opening.stage]||'title';
  break;
 }
 case 'openingLaunch':{
  if(opening.stage!=='goal')return true;
  if(state.started){
   if(!confirm('¿Guardar la carrera actual como anterior e iniciar la nueva?'))return true;
   try{localStorage.setItem(backupKey,JSON.stringify([...backupHistory(),state]));}catch{notify('No se pudo guardar la carrera anterior. Exportala desde Archivo y ajustes.');return true;}
  }
  const fresh=initial();
  if(!newOrganization(fresh,opening.club,$('#openingManager')?.value||'',opening.captain,opening.seen,opening.recruit))return true;
  state=fresh;launchScreen=false;tab='inicio';break;
 }
 default:return false;
 }
 cue();render();globalThis.scrollTo?.(0,0);return true;
}

const modernCareer=()=>Boolean(state.organization||state.identity);
function intro(){
 if(selected===null)return `<section class="hero"><span class="tag gold">TEMPORADA 2027</span><h1>DUEL CIRCUIT</h1><p>El circuito abre sus puertas. Elegí al duelista que va a dirigir tu organización.</p><button class="btn" data-action="pickCareer">Nueva carrera</button><button class="btn ghost" data-action="import">Importar partida</button></section>`;
 if(selected===0)return `<section class="panel"><h2>Elegí a tu duelista</h2><div class="card-grid">${players.map(p=>`<article class="duel-card">${card(p)}<p class="small">${esc(teamName(origins[p.id]))} · ${esc(p.positive)}</p><button data-detail="${p.id}" class="btn ghost">Ficha</button> <button class="btn" data-action="pickIdentity" data-id="${p.id}">Elegir</button></article>`).join('')}</div></section>`;
 const p=getP(selected);
 return `<section class="hero"><h1>Tu debut en el circuito</h1><p>Año 2027. En este escenario ficticio e independiente, una nueva estructura competitiva abre paso a organizaciones profesionales, contratos y torneos por equipos.</p><p>Tu solicitud fue aprobada. Empezás con un integrante y 100 CR.</p></section><section class="panel identity">${card(p)}${founders[p.id]?`<h3>${esc(teamName(founders[p.id]))}</h3>`:`<label>Nombre<input id="clubName" maxlength="35" placeholder="Mi equipo"></label><label>Color<input id="clubColor" type="color" value="#397ade"></label><label>Emblema<select id="clubEmblem"><option>⚡</option><option>◆</option><option>♜</option><option>★</option></select></label>`}<div class="actions"><button class="btn ghost" data-action="pickCareer">Volver</button><button class="btn gold-button" data-action="launchCareer">Iniciar carrera</button></div></section>`;
}
const timedEvents=()=>{
 const extras=[
  ...(state.organization?[{week:continental.week,name:'Continental de Equipos',type:'team',context:'team',stakes:20,championship:true}]:[]),
  ...[8,20,32,44].map(week=>({week,name:'Local especial 3v3',type:'team',context:'team',stakes:5})),
  ...[9,19,29,39].map(week=>({week,name:'Liga de locales',type:'individual',context:'local',stakes:6})),
  {week:50,name:'Clasificatorio internacional',type:'individual',context:'official',stakes:17}
 ];
 const base=Array.from({length:52},(_,i)=>schedule(i+1)).flat();
 const debut=state.teamEvent?{week:state.teamEvent,name:'Regional 3v3 · Debut',type:'team',context:'team',stakes:9}:null;
 return [...base,...extras].filter(e=>e.championship||e.type!=='team'||(debut&&e.week>debut.week)).concat(debut||[]).sort((a,b)=>a.week-b.week);
};
const mayEnter=e=>!e.championship||Boolean(qualify(state)?.includes(state.team));
const weekendPlan=()=>weekend(state.week,timedEvents(),state.localVenue);
const eventsNow=()=>weekendPlan().events;
const lead=e=>e.name.includes('Clasificatorio')?12:/Nacional|Continental/.test(e.name)?8:e.name.includes('YCS')?6:4;
const upcoming=()=>{
 const calendar=timedEvents();
 return calendar.filter(e=>e.week>=state.week&&e.week-state.week<=lead(e)&&weekend(e.week,calendar,state.localVenue).events.some(event=>event.key===e.name)).slice(0,4);
};
function eventRows(list){return list.length?list.map(e=>`<div class="news"><b>${esc(e.name)}</b><div class="small muted">Semana ${e.week} · ${e.week===state.week?'Esta semana':'Faltan '+(e.week-state.week)+' semanas'}</div></div>`).join(''):'<p class="muted">Los eventos se anunciarán con anticipación.</p>'}
function dashboard(){
 const t=getTeam(state.team), members=own();
 const names=['Meta actual','Noticias','Acción semanal','Torneos'];
 return `<section class="hero team-banner"><div><span class="tag gold">TEMPORADA 2027 · ${esc(weekDate())}</span><h1>${esc(t.emblem||organizations[t.id]?.emblem||'⬟')} ${esc(t.name)}</h1><p>${esc(state.manager)} · ${members.length}/5 integrantes · ${currency(state.credits)}</p></div>${avatar(getP(state.organization?.founder||state.organization?.representative||state.identity))}</section>
 ${state.tutorial>=0?`<div class="notice tutorial"><b>Tutorial · ${Math.min(5,state.tutorial+1)}/5</b> · ${['Consultá el formato vigente.','Leé las noticias del circuito.','Elegí una acción para esta semana.','Inscribí a un duelista en el local.','Finalizá la semana para ver los resultados.'][state.tutorial]||''} <button class="btn ghost" data-action="skipTutorial">Omitir</button></div>`:''}
 <div class="arena-grid"><div class="arena-actions">${tutorialTabs.map((key,i)=>`<button class="arena-tile ${state.tutorial===i?'guided':''}" data-tab="${key}"><span aria-hidden="true">${['♠','▤','⚡','🏆'][i]}</span><strong>${names[i]}</strong><small>${[currentFormat().name,'Últimas novedades',state.weekly?'Acción reservada':'1 acción disponible','Inscribir duelistas'][i]}</small></button>`).join('')}</div><section class="panel"><h2>Próximos eventos</h2>${eventRows(upcoming())}</section></div>
 ${objective()}
 ${newMarket(true)}
 <div class="actions week-actions">${state.report?'<button class="btn ghost" data-tab="informe">Último informe</button>':''}<button class="btn gold-button ${state.tutorial===4?'guided':''}" data-action="finishWeek">Finalizar semana »</button></div>`;
}
function metaView(){const f=currentFormat(),known=state.circuit.scouting[state.team];return `<section class="panel"><h2>Meta actual</h2>${formatDisplay(f)}${metaWheels(f,known)}<p>${esc(f.name)} · ${state.banStyle?'Banlist: '+esc(styleNames[state.banStyle]):'Sin penalización de banlist'}</p><h3>Historial trimestral</h3>${formats.slice(0,state.formatIndex+1).map((x,i)=>`<div class="news">Semana ${i*13+1} · ${esc(x.name)}</div>`).join('')}<details><summary>Ver las 25 combinaciones</summary><div class="grid">${formats.map(x=>`<span class="tag">${esc(x.name)}</span>`).join('')}</div></details></section>`}
function portraitsInNews(text){
 const words=text.toLocaleLowerCase('es');
 return players.filter(p=>words.includes(p.name.toLocaleLowerCase('es'))).slice(0,3)
  .map(p=>`<button type="button" class="portrait-link" data-detail="${p.id}" aria-label="Ficha de ${esc(p.name)}">${avatar(p)}</button>`).join('');
}
function newsArticle(a,featured=false){
 return `<details class="news bulletin ${featured?'headline':''}"><summary><span class="tag">${esc(a.category)} · ${esc(a.date)} · ${esc(a.entity)} · Impacto ${a.importance}/10</span><h3>${esc(a.title)}</h3><p>${esc(a.intro)}</p></summary><div>${portraitsInNews(a.body)}<p>${esc(a.body)}</p>${a.effect?`<p class="notice">${esc(a.effect)}</p>`:''}</div></details>`;
}
function newsView(){
 const archive=state.press?.articles||[];
 const recent=[...archive].reverse().sort((a,b)=>b.week-a.week);
 const current=recent.filter(a=>a.week===recent[0]?.week).sort((a,b)=>b.importance-a.importance);
 const featured=current.slice(0,3);
 if(featured.length<3)featured.push(...recent.filter(a=>!featured.includes(a)&&!featured.some(b=>b.category===a.category)).slice(0,3-featured.length));
 return `<section class="panel"><h2>Circuit News</h2><p class="muted">Medio ficticio del universo Duel Circuit. Los incidentes se ambientan con NPC y sedes inventadas.</p>${featured.map((a,i)=>newsArticle(a,i===0)).join('')||'<p>La primera edición sale al finalizar la semana.</p>'}
 <details><summary>Archivo de ediciones anteriores</summary>${recent.filter(a=>!featured.includes(a)).map(a=>newsArticle(a)).join('')||'<p>Todavía no hay ediciones anteriores.</p>'}
 ${state.news.slice(-25).reverse().map(n=>`<details class="news"><summary>${esc(n)}</summary><p>Registro histórico del circuito.</p></details>`).join('')}</details></section>`;
}
function guests(){
 return players.filter(p=>state.owned[p.id]&&state.owned[p.id]!==state.team&&bond(state.circuit,state.team,state.owned[p.id])>0);
}
function actionsView(){
 const c=state.circuit;
 if(state.weekly)return `<section class="panel"><h2>Acción semanal</h2><div class="notice">Confirmada: ${esc(state.weekly.label||activities[state.weekly.type][0])}. Se resuelve al finalizar la semana.</div></section>`;
 return `<section class="panel"><h2>Acción semanal</h2><p>Elegí una actividad principal. Se resuelve al finalizar la semana.</p>
 <details class="duel-card" id="guest-selector"><summary>Reunión de testeo</summary><p>Invitá hasta ocho duelistas de organizaciones con las que ya tenés un vínculo.</p>${guests().map(p=>{
 const club=state.owned[p.id],relation=bond(c,state.team,club),available=!state.unavailable.includes(p.id),d=c.decks[p.id];
 return `<label class="entry-choice"><input type="checkbox" value="${p.id}" ${available?'':'disabled'}>${avatar(p)}<span>${esc(p.name)} · ${esc(teamName(club))} · Relación ${relation}/100 · ${styles[d.style]} · ${stars(rating(p))} · ${available?'Disponible · '+Math.round(guestChance(relation,d.trust))+'%':'Ausente'}</span></label>`;
 }).join('')||'<p>Todavía no hay invitados elegibles. Podés testear con tu propio equipo.</p>'}<button class="btn" data-action="chooseActivity" data-type="test">Confirmar testeo</button></details>
 <details class="duel-card"><summary>Juntada del team</summary><p>Solo tu equipo. Mejora sinergia, moral, confianza y preparación para 3v3.</p>${own().map(playerLine).join('')}<button class="btn" data-action="chooseActivity" data-type="team">Confirmar juntada</button></details>
 <details class="duel-card"><summary>Relacionarse con otro equipo</summary><div class="card-grid">${teams.filter(t=>t.id!==state.team).map(t=>{
 const rel=bond(c,state.team,t.id),top=roster(t.id).sort((a,b)=>rating(b)-rating(a)).slice(0,2);
 return `<article class="duel-card"><h3><span style="color:${t.color}">⬟</span> ${esc(t.name)}</h3><p>Relación ${rel}/100 · ${rel>=50?'Afinidad':rel>0?'Contacto':'Vínculo por construir'}</p><p>${esc(top.map(p=>p.name).join(', '))}</p><p class="small">Testeo conjunto, información y fichajes dirigidos.</p><button class="btn" data-action="chooseActivity" data-type="link" data-target="${t.id}">Confirmar con ${esc(t.name)}</button></article>`;
 }).join('')}</div></details>
 <details class="duel-card"><summary>Contratar profesional</summary><div class="card-grid">${Object.entries(professionals).map(([id,[name,cost,desc]])=>`<article class="duel-card"><h3>${name}</h3><p>${desc} · ${currency(cost)}</p><button class="btn" data-action="chooseActivity" data-type="coach" data-prof="${id}" ${state.credits<cost?'disabled':''}>Contratar</button></article>`).join('')}</div></details></section>`;
}
function entriesView(){
 const {events,special,suspended}=weekendPlan();
 const card=(e,i)=>`<details class="duel-card event-card ${special?'special-event':''}" id="event-${i}" ${state.openEvent===e.key?'open':''}><summary><strong>${esc(special?e.name:venues[e.venue]||e.name)}</strong><div class="small muted">${e.day===0?'Sábado':'Domingo'} · ${e.type==='team'?'3v3':'Individual'} · ${e.type==='team'?e.level==='local'?10:Math.floor(structures[e.level].size/3):structures[e.level].size} ${e.type==='team'?'equipos':'duelistas'} · ${state.entries[e.key]?.length||0} inscritos · ${own().filter(p=>!entryReason(state,e,p.id,events,cap)).length} habilitados</div></summary>
 ${e.championship&&!mayEnter(e)?'<p class="notice">Tu equipo quedó fuera del corte de clasificación. Podés seguir el torneo desde el informe semanal.</p>':''}
 ${special?`<p>${esc(e.level==='regional'?'Regional':e.level==='national'?'Nacional':e.level==='continental'?'Continental':'YCS')} · Semana ${state.week} · ${esc(weekDate(e.day))} · Preparación ${state.prep}/12</p>`:''}
 ${own().map(p=>{
  const reason=mayEnter(e)?entryReason(state,e,p.id,events,cap):'Sin clasificación continental',checked=state.entries[e.key]?.includes(p.id);
  return `<label class="entry-choice"><input type="checkbox" value="${p.id}" ${checked?'checked':''} ${reason?'disabled':''}>${avatar(p)}<span>${esc(p.name)} · ${stars(rating(p))} · ${styles[state.circuit.decks[p.id].style]} · Fatiga ${state.fatigue[p.id]||0}/10<br><small>${physicalCount(p.id)}/${cap(state,p.id)} torneos físicos programados · ${reason||'Disponible'}</small></span></label>`;
 }).join('')}<div class="actions"><button class="btn" data-action="enroll" data-id="${i}" ${state.finished||!mayEnter(e)?'disabled':''}>Confirmar inscripción</button>${state.entries[e.key]?`<button class="btn ghost" data-action="unenroll" data-id="${i}">Retirar inscripción</button>`:''}</div></details>`;
 return `<section class="panel"><h2>Torneos · Semana ${state.week}</h2>${special?`<div class="notice">Semana especial · Dark Book y las categorías inferiores quedan suspendidos.</div>${card(special,0)}<details><summary>Programación suspendida</summary>${suspended.map(e=>`<p>${esc(venues[e.venue]||'Circuito oficial')} · ${esc(e.name)}</p>`).join('')}<p>Dark Book</p></details>`:`<div class="weekend-grid">${['Sábado','Domingo'].map((label,day)=>`<section><h3>${label}</h3>${events.map((e,i)=>e.day===day?card(e,i):'').join('')||'<p>Sin torneos programados.</p>'}</section>`).join('')}</div>`}</section>`;
}

function newMarket(compact=false){return `<section class="panel"><h2>Mercado · Ofertas de la semana</h2><p class="small muted">Una operación de fichaje por semana. ${canSign(state)?'Cupo disponible.':'Cupo utilizado.'} Los contratos grupales ocupan un cupo y cada integrante cuenta para la escala.</p><div class="card-grid">${state.offers.map(stored=>{
 const o=stored.status==='open'?{...stored,...offerQuote(state,stored.ids||[stored.id])}:{...stored,multiplier:stored.multiplier??1,base:stored.base??stored.price,discount:stored.discount??0};
 const p=getP(o.id), f=fit(state,p,currentFormat()),missing=Math.max(0,o.price+(state.weekly?.type==='coach'?(state.weekly.cost??450):0)-state.credits);
 return `<article class="duel-card">${card(p)}${o.ids?.length>1?`<p class="small">Paquete indivisible: ${o.ids.map(id=>esc(getP(id).name)).join(', ')}</p>`:''}<p class="small"><span class="tag">${rarity[o.face-1]}</span> ${o.face!==o.band?'· Fallback: '+rarity[o.band-1]:''}</p><p class="small">${o.discount?Math.round(o.discount*100)+'% de descuento · ':''}${f.chance}% de aceptación · ${esc(f.reasons.join(', ')||'Sin afinidades activas')}</p><strong class="stars">${currency(o.price)}</strong>${priceBreakdown(o)}<div class="actions"><button class="btn ghost" data-detail="${p.id}">Ficha</button><button class="btn" data-action="recruit" data-id="${p.id}" ${o.status!=='open'||!canSign(state)||missing||own().length+(o.ids?.length||1)>5?'disabled':''}>Fichar</button></div><p class="small muted">${o.status==='signed'?'Contratado':o.status==='declined'?'Rechazó la oferta':own().length+(o.ids?.length||1)>5?'Plantel completo':missing?'Faltan '+currency(missing):''}</p></article>`;
 }).join('')||'<p>No quedan candidatos elegibles.</p>'}</div>${compact?'':directMarket()}${compact?'':'<p class="muted small">Rarezas 1 a 5: 18% cada una. Rareza 6: 10%. Si falta un candidato, se busca la categoría más cercana.</p>'}</section>`}
function runCircuitEvent(event, ids, used,days={}){
 const level=levelOf(event), local=level==='local', team=event.type==='team';
 const selectedSet=new Set(ids);
 const eligible=players.filter(p=>!selectedSet.has(p.id)&&state.owned[p.id]!==state.team&&(used[p.id]||0)<cap(state,p.id)&&!days[p.id]?.includes(event.day));
 const contestant=p=>({deckStyle:state.circuit.decks[p.id].style,id:p.id,name:p.name,power:effectiveRating(p,event.context),real:true,club:state.owned[p.id],stars:rating(p),style:styleNames[p.style]});
 const pack=(club,members)=>({id:club,name:teamName(club),club,members,styles:members.map(p=>p.deckStyle),real:true,power:members.reduce((sum,p)=>sum+p.power,0)/3});
 const entrants=team?(ids.length?[pack(state.team,ids.map(id=>contestant(getP(id))))]:[]):ids.map(id=>contestant(getP(id)));
 if(team){
  for(const club of teams.filter(t=>t.id!==state.team&&(!event.championship||qualify(state).includes(t.id)))){
   const members=eligible.filter(p=>state.owned[p.id]===club.id).map(contestant).sort((a,b)=>b.power-a.power).slice(0,3);
   if(members.length===3)entrants.push(pack(club.id,members));
   if(local&&entrants.length>=5)break;
  }
 }else{
  const rivals=eligible.map(p=>({p,draw:Math.random()})).sort((a,b)=>a.draw-b.draw);
  entrants.push(...rivals.slice(0,local?15-entrants.length:rivals.length).map(({p})=>contestant(p)));
 }
 for(const p of entrants)for(const id of team?p.members.map(m=>m.id):[p.id]){used[id]=(used[id]||0)+1;(days[id]??=[]).push(event.day);}
 const result=swissTournament(buildField(event,entrants,Math.random,distribution(currentFormat())).map(p=>p.deckStyle===undefined?p:{...p,style:p.deckStyle,styleLabel:p.style}),structures[level]);
 scoutResults(result);
 state.playerRecords??={};
 for(const row of result.standings){
  const ids=row.members?.filter(m=>m.real).map(m=>m.id)||(row.real?[row.id]:[]);
  for(const id of ids){const records=state.playerRecords[id]??=[];records.push({week:state.week,name:event.name,place:row.place,wins:row.wins,losses:row.losses,level:rating(getP(id))});if(records.length>30)records.shift();}
 }
 const venue=event.venue||state.localVenue;
 if(local){updateLocal(state.localLeagues,venue,event.type,result.standings);
  if(ids.length){const won=result.standings.some(p=>p.club===state.team&&p.place===1);state.circuit.reputation[venue]=clamp((state.circuit.reputation[venue]||0)+7+(won?8:0)+(state.organization?.id===venue&&['sekai','lair'].includes(venue)?2:0));relate(state.circuit,state.team,venue,5+(won?3:0));}
 }
 const mine=result.standings.filter(p=>p.club===state.team);
 if(event.championship){state.organization.champion=result.standings[0].club||'invitado';if(state.organization.champion===state.team)state.news.push('Tu equipo ganó el Continental de Equipos.');}
 let points=0;
 if(!local){
  for(const p of result.standings){
   if(!p.club)continue;
   const active=p.club===state.team?state.active:roster(p.club).map(q=>q.id).slice(0,3);
   const earned=rankingPrize(level,p.place)*(team?1:roleWeight(p.id,active,p.club===state.team?state.captain:active[0]));
   state.standings[p.club]+=earned;
   if(p.club===state.team)points+=earned;
  }
 }
 let eventXp=0;
 const prize=mine.reduce((n,p)=>n+100+Math.round(p.wins*40+p.losses*12)+(p.place===1?200:0),0);
 state.credits+=prize;state.score+=points;
 for(const p of mine){
  for(const id of team?p.members.map(m=>m.id):[p.id]){
   const earnedXp=p.wins*5+p.losses*3;eventXp+=earnedXp;state.xp[id]=(state.xp[id]||0)+earnedXp;
   practice(state.circuit,id,9);discover(state,id,3);const d=state.circuit.decks[id];d.trust=clamp(d.trust+(p.wins>p.losses?3:1));
   state.fatigue[id]=Math.min(10,(state.fatigue[id]||0)+1);
  }
  if(p.wins>p.losses)state.wins++;else state.losses++;
 }
 if(mine.length)state.morale[state.team]=Math.max(-2,Math.min(2,(state.morale[state.team]||0)+(mine.some(p=>p.wins>p.losses)?1:-1)));
 const report={week:state.week,name:event.name,venue:local?venues[venue]:'Circuito oficial',type:event.type,position:mine[0]?.place||0,
  result:mine.length?'Mejor puesto: '+mine[0].place:'Sin inscripción propia',points,prize,ids,deckNotes:ids.map(id=>{const d=state.circuit.decks[id],delta=metaPosition(d.style,currentFormat(),state.circuit,state.team)-d.adaptation*.005;return getP(id).name+' · '+styles[d.style]+' · '+(delta>=0?'posicionamiento favorable':'coste de adaptación superior a la ventaja del meta');}),mine:mine.map(({id})=>id),
  xp:eventXp,level,day:event.day,...result};
 if(mine.length){
  state.history.push({week:report.week,name:report.name,result:report.result,position:report.position,points,prize});
  state.news.push(`${report.name} · ${report.venue}: ${report.result}.`);
 }
 return report;
}
function tournamentDetails(e){
 if(!e.standings)return '';
 const score=p=>`${p.wins}V / ${p.losses}D · ${p.points} pts suizos · ${(p.tiebreak*100).toFixed(1)}% rivales`;
 return `<p>${esc(e.venue)} · ${e.type==='team'?'3v3':'Individual'} · ${e.standings.length} ${e.type==='team'?'equipos':'duelistas'}</p>
 <div class="notice">Día 1 · ${e.day1} rondas${e.day2?' → Día 2 · '+e.cut+' clasificados, '+e.day2+' rondas':''}${e.top?' → Top '+e.top+' por eliminación':''}</div>
 ${(e.deckNotes||[]).map(note=>`<div class="small">${esc(note)}</div>`).join('')}
 ${e.standings.filter(p=>e.mine.includes(p.id)).map(p=>`<details class="news"><summary>${esc(p.name)} · puesto ${p.place} · ${score(p)}</summary>${p.matches.map(m=>`<div class="small">Ronda ${m.round} · ${esc(m.opponent)} · ${m.won?'Victoria':'Derrota'}</div>`).join('')}</details>`).join('')}
 ${e.bracket.length?`<details><summary>Llaves de eliminación</summary>${e.bracket.map(m=>`<div class="small">Top ${m.stage} · ${esc(m.winner)} venció a ${esc(m.loser)}</div>`).join('')}</details>`:''}
 <details><summary>Clasificación final completa</summary><div class="tablewrap"><table><thead><tr><th>Puesto</th><th>Participante</th><th>Rendimiento suizo</th></tr></thead><tbody>${e.standings.map(p=>`<tr><td>${p.place}</td><td>${p.real&&typeof p.id==='number'?`<span class="table-portrait">${avatar(getP(p.id))}</span>`:''}${esc(p.name)}${(p.styleLabel||p.style)?' · '+esc(p.styleLabel||p.style)+' · '+stars(p.stars)+(p.deck?' · '+esc(p.deck):''):''}</td><td>${score(p)}${p.day2?' · Día 2':''}</td></tr>`).join('')}</tbody></table></div></details>`;
}
function localTables(){
 return `<section class="panel"><h2>Ligas de locales</h2><p>Cada victoria suiza suma 3 puntos en su local y modalidad. Desempate: rendimiento medio de oponentes, luego victorias y nombre.</p>${Object.entries(venues).map(([id,name])=>`<details class="news"><summary>${esc(name)}</summary>${['individual','team'].map(mode=>{
 const rows=Object.values(state.localLeagues[id]?.[mode]||{}).sort((a,b)=>b.points-a.points||b.tiebreakSum/b.events-a.tiebreakSum/a.events||b.wins-a.wins||a.name.localeCompare(b.name));
 return `<h3>${mode==='team'?'3v3':'Individual'}</h3>${rows.length?`<div class="tablewrap"><table><thead><tr><th>#</th><th>Nombre</th><th>PJ</th><th>V</th><th>D</th><th>Pts</th><th>Desempate</th></tr></thead><tbody>${rows.map((p,i)=>`<tr><td>${i+1}</td><td>${esc(p.name)}</td><td>${p.played}</td><td>${p.wins}</td><td>${p.losses}</td><td>${p.points}</td><td>${(100*p.tiebreakSum/p.events).toFixed(1)}%</td></tr>`).join('')}</tbody></table></div>`:'<p>Sin resultados todavía.</p>'}`;
 }).join('')}</details>`).join('')}</section>`;
}

const signedNumber=n=>n>0?'+'+n:String(n);
function reportBar(label,value,max,change){
 const percent=Math.min(100,Math.max(0,value/max*100));
 return `<div class="report-meter"><span>${esc(label)}</span><strong>${Number(value.toFixed(1))}/${max}${change?` <small class="${change>0?'report-up':'report-down'}">${signedNumber(Number(change.toFixed(1)))}</small>`:''}</strong><div class="progress"><div style="width:${percent}%"></div></div></div>`;
}
function financeView(){
 const f=financeState(state),club=f.clubs[state.team],active=f.activeSince!==null&&state.week>=f.activeSince;
 const amount=Object.values(costs(state.team,own().length)).reduce((a,b)=>a+b,0);
 return `<section class="panel"><h2>Gestión económica · Konami</h2><p class="small muted">Reglamento ficticio de Duel Circuit.</p><p>${active?'Obligaciones activas desde la semana '+f.activeSince+' · '+currency(amount)+' de gastos estimados por semana.':'Etapa de crecimiento · '+Math.min(2,f.regionalWeeks.length)+'/2 Regionales completados.'}</p><p>Evaluación cada ${financeRules.evaluationInterval} semanas activas: disputar dos fechas y terminar al menos una en la mitad superior. Penalización: ${currency(financeRules.penalty)}.</p>${club?.debt?`<p class="notice">Saldo pendiente: ${currency(club.debt)}.</p>`:''}</section>`;
}
function financeReport(finance){
 if(!finance)return '';
 const {charges,review}=finance;
 return `<details class="news"><summary>Obligaciones de Konami · ${currency(finance.paid)} abonados</summary><p>Mantenimiento ${currency(charges.maintenance)} · Administración ${currency(charges.administration)} · Plantel ${currency(charges.roster)} · Tienda ${currency(charges.shop)}.</p>${review?`<p>Evaluación ${review.passed?'cumplida':'incumplida'} · ${review.played} fechas disputadas · ${review.good} en mitad superior · Penalización ${currency(finance.penalty)}.</p>`:''}${finance.debt?`<p>Saldo pendiente: ${currency(finance.debt)}.</p>`:''}</details>`;
}
function reportView(){
 const r=state.report;
 if(!r)return '<section class="panel">Todavía no hay informe semanal.</section>';
 const ownEvents=(r.events||[]).filter(e=>e.ids?.length);
 const online=(r.online||[]).filter(e=>e.rows.length||e.skipped.length);
 const circuit=(r.events||[]).filter(e=>!e.ids?.length&&e.level&&e.level!=='local');
 const highlights=[...(r.headlines||[])].sort((a,b)=>b.importance-a.importance).slice(0,3);
 const old=r.before,newState=r.after;
 const metrics=[['◈','Balance económico',currency(r.credits),r.credits],['🏆','Puntos competitivos',signedNumber(r.points),r.points],['✦','Experiencia total',signedNumber(r.xp)+' XP',r.xp]];
 const tournamentCards=ownEvents.map(e=>{
  const rows=e.standings.filter(p=>e.mine.includes(p.id));
  const sums=key=>rows.reduce((n,p)=>n+p[key],0);
  const eventXp=e.xp??(sums('wins')*5+sums('losses')*3)*(e.type==='team'?e.ids.length:1);
  return `<details class="result ${e.position===1?'victory':''}"><summary><strong>${esc(e.name)} · ${esc(e.venue)}</strong><div class="small">${e.day===0?'Sábado':'Domingo'} · ${e.type==='team'?'3v3':'Individual'} · ${e.ids.length} propios · ${sums('wins')}V / ${sums('losses')}D · Mejor puesto ${e.position}</div></summary>
  <p>${e.ids.map(id=>esc(getP(id)?.name)).join(', ')} · +${eventXp} XP · +${e.level==='local'?sums('points')+' pts de liga local':e.points+' pts de ranking'}</p>${tournamentDetails(e)}</details>`;
 }).join('');
 const playerCards=(r.players||[]).map(({id,xp,fatigue,morale,prep})=>{
  const p=getP(id);
  const results=ownEvents.filter(e=>e.ids.includes(id)).map(e=>{
   const row=e.standings.find(o=>o.id===id||o.members?.some(m=>m.id===id));
   return `${e.venue} · #${row.place} · ${row.wins}V / ${row.losses}D`;
  }).concat(online.flatMap(e=>e.rows.filter(row=>row.id===id).map(row=>`Dark Book · #${row.place} · ${row.wins}V / ${row.losses}D`)));
  return `<article class="report-player">${avatar(p)}<div><h3>${esc(p.name)}</h3><p class="small">${results.length} torneo${results.length===1?'':'s'} · +${xp} XP · Moral del equipo ${signedNumber(morale)} · Preparación ${signedNumber(prep)}</p>${reportBar('Fatiga',fatigue[1],10,fatigue[1]-fatigue[0])}<p class="small muted">${esc(results.join(' · ')||'Sin inscripción propia.')}${fatigue[1]>fatigue[0]?' La actividad aumentó su fatiga.':fatigue[1]<fatigue[0]?' Recuperó energía durante la actividad.':''}</p></div></article>`;
 }).join('');
 const progress=old&&newState?`<div class="report-progress">
 ${reportBar('Preparación',newState.prep,12,newState.prep-old.prep)}${reportBar('Sinergia',newState.synergy,12,newState.synergy-old.synergy)}
 ${reportBar('Moral (escala −2 a +2)',newState.morale+2,4,newState.morale-old.morale)}
 <div class="mini"><h3>Conocimiento del meta</h3>${styles.map((s,i)=>reportBar(s,newState.meta[i],100,newState.meta[i]-old.meta[i])).join('')}</div>
 <div class="mini"><h3>Reputación</h3>${Object.entries(venues).map(([id,name])=>reportBar(name,newState.rep[id]||0,100,(newState.rep[id]||0)-(old.rep[id]||0))).join('')}</div>
 <div class="mini"><h3>Relaciones</h3>${teams.filter(t=>t.id!==state.team&&(newState.relations[t.id]!==old.relations[t.id]||newState.relations[t.id]>0)).sort((a,b)=>Math.abs(newState.relations[b.id]-old.relations[b.id])-Math.abs(newState.relations[a.id]-old.relations[a.id])).slice(0,3).map(t=>reportBar(t.name,newState.relations[t.id],100,newState.relations[t.id]-old.relations[t.id])).join('')||'<p>Sin vínculos activos esta semana.</p>'}</div></div>`:'<p>Este informe es anterior al seguimiento visual. Abrí las estadísticas completas para revisar sus cambios.</p>';
 return `<article class="weekly-report"><section class="panel"><h2>Informe · Semana ${r.week}</h2><div class="grid three report-kpis">${metrics.map(([icon,label,value,n])=>`<div class="mini"><span aria-hidden="true">${icon}</span><small>${label}</small><strong class="${n>0?'report-up':n<0?'report-down':''}">${value}</strong></div>`).join('')}</div><p>${esc(r.activity)}</p>${financeReport(r.finance)}
 ${r.activityDetails?`<p class="small">Plantel: ${esc(r.activityDetails.participants.join(', '))}${r.activityDetails.accepted.length?' · Invitados: '+esc(r.activityDetails.accepted.join(', ')):''}${r.activityDetails.declined.length?' · Rechazaron: '+esc(r.activityDetails.declined.join(', ')):''}</p>`:''}</section>
 <section class="panel"><h2>Resultados de torneos</h2>${r.special?`<p class="notice">Fecha especial · ${esc(r.special)}.</p>`:''}${tournamentCards}${online.map(onlineReport).join('')}${!ownEvents.length&&!online.length?'<p>El plantel no disputó torneos esta semana.</p>':''}
 ${circuit.length?`<details><summary>Resultados destacados del circuito</summary>${circuit.map(e=>`<p>${esc(e.name)} · Ganador: ${esc(e.standings[0]?.name)}</p>`).join('')}</details>`:''}</section>
 <section class="panel"><h2>Rendimiento del plantel</h2><div class="report-players">${playerCards||'<p>Sin desglose individual en este informe anterior.</p>'}</div></section>
 <section class="panel"><h2>Progreso del equipo</h2>${progress}</section>
 <section class="panel"><h2>Noticias destacadas</h2>${highlights.map(a=>`<details class="news"><summary><span class="tag">${esc(a.category)} · ${esc(a.date)}</span><strong>${esc(a.title)}</strong></summary><p>${esc(a.intro)}</p><button class="btn ghost" data-tab="noticias">Leer en Circuit News</button></details>`).join('')||'<p>Sin titulares destacados.</p>'}</section>
 <details class="panel"><summary>Ver estadísticas completas</summary>
 ${r.expenses!==undefined?`<p>Ingresos ${currency(r.credits+r.expenses)} · Gastos ${currency(r.expenses)}${r.sources?` · Torneos ${currency(r.sources.prizes)} · Ingresos operativos ${currency(r.sources.operating)} · Fichajes ${currency(r.sources.contracts)} · Acción ${currency(r.sources.activity)}`:''}</p>`:''}
 ${(r.impact||[]).map(n=>`<div class="small">${esc(n)}</div>`).join('')}${(r.news||[]).map(n=>`<p class="small">${esc(n)}</p>`).join('')}
 ${(state.reportArchive||[]).slice(-12).reverse().map(w=>`<details><summary>Semana ${w.week} · ${currency(w.credits)} · ${signedNumber(w.points)} pts · ${signedNumber(w.xp)} XP</summary>${w.impact.map(n=>`<div class="small">${esc(n)}</div>`).join('')}</details>`).join('')}</details>
 <button class="btn" data-tab="inicio">Volver al panel</button> <button class="btn ghost" data-tab="accion">Acción semanal</button></article>`;
}

function closeCareerWeek(){
 if(state.finished||state.resolvedWeek===state.week||!confirm('¿Finalizar la semana y resolver las inscripciones?'))return;
 const {week,credits,score}=state, xp=Object.values(state.xp).reduce((a,b)=>a+b,0);
 const prev=new Set(state.news);
 const before=weeklySnapshot();
 const contract=contractLedger(state);
 const contractCosts=contract.lastWeek===week?contract.spent:0;
 const expenses=state.weekly?(state.weekly.cost??activities[state.weekly.type][1]):0;
 const results=[];
 let activity='Sin actividad principal';
 let activityDetails=null;
 if(state.weekly){
  const {type,target,prof,invitees}=state.weekly,[name]=activities[type],cost=expenses;
  const pro=prof?professionals[prof]:null;
  const accepted=[],declined=[];
  activityDetails={participants:own().map(p=>p.name),accepted,declined};
  activity=(pro?.[0]||name)+(cost?' · −'+currency(cost):'');
  state.credits-=cost;
  const boost=own().reduce((sum,p)=>sum+(abilities[p.id-1].trainTeam||0),0);
  if(type==='test'){
   for(const id of invitees||[]){
    const p=getP(id),club=state.owned[id],rel=bond(state.circuit,state.team,club),d=state.circuit.decks[id];
    if(!p||!club||club===state.team||!rel||state.unavailable.includes(id)||Math.random()*100>=guestChance(rel,d.trust)){if(p)declined.push(p.name);continue;}
    accepted.push(p.name);learn(state.circuit,state.team,d.style,3+rating(p));relate(state.circuit,state.team,club,2);
   }
   state.prep=Math.min(12,state.prep+2+Math.floor(accepted.length/3)+(state.organization?.id==='dima'?1:0));
  }
  if(type==='test'&&state.organization?.id==='garden')learn(state.circuit,state.team,4,3);
  if(type==='team'&&state.organization?.id==='mujica')state.synergy=Math.min(12,state.synergy+1);
  if(type==='team')state.morale[state.team]=Math.min(2,(state.morale[state.team]||0)+1);
  if(pro){state.prep=Math.min(12,state.prep+pro[3]);state.synergy=Math.min(12,state.synergy+pro[5]);styles.forEach((_,i)=>learn(state.circuit,state.team,i,pro[4]));if(prof==='coach')state.morale[state.team]=Math.min(2,(state.morale[state.team]||0)+1);}
  else if(type==='coach')state.prep=Math.min(12,state.prep+3);
  if(type==='team'||(type==='coach'&&!pro))state.synergy=Math.min(12,state.synergy+2);
  if(type==='link'){const joint=bond(state.circuit,state.team,target)>=50;relate(state.circuit,state.team,target,state.organization?.id==='obelisk'?18:15);if(joint){activity+=' · Testeo conjunto';for(const p of own())practice(state.circuit,p.id,6);}if(venues[target])state.circuit.reputation[target]=clamp((state.circuit.reputation[target]||0)+5);const rival=state.circuit.scouting[target];if(rival)rival.forEach((n,i)=>learn(state.circuit,state.team,i,3+n*.08));}
  if(type==='test'||(type==='coach'&&!pro))styles.forEach((_,i)=>learn(state.circuit,state.team,i,i===dominant(currentFormat())?12:6));
  for(const p of own()){
   const gain=type==='link'?5:20+boost+(abilities[p.id-1].trainXP||0)+(pro?.[7]||0);
   if(type!=='link'){practice(state.circuit,p.id,pro?.[6]??(10+accepted.length));discover(state,p.id,2);state.circuit.decks[p.id].trust=clamp(state.circuit.decks[p.id].trust+2);}
   state.xp[p.id]=(state.xp[p.id]||0)+gain;
   if(type==='team'||prof==='coach')state.fatigue[p.id]=Math.max(0,(state.fatigue[p.id]||0)-2);
  }
 }
 const used={},days={},plan=weekendPlan();
 for(const event of new Map(plan.events.map(e=>[e.key,e])).values()){
  const registered=(mayEnter(event)?state.entries[event.key]||[]:[]).filter(id=>state.owned[id]===state.team&&(used[id]||0)<cap(state,id)&&!days[id]?.includes(event.day));
  results.push(runCircuitEvent(event,event.type==='team'&&registered.length!==3?[]:registered,used,days));
 }
 state.suspensions??=[];
 if(plan.special)state.suspensions.push({week,event:plan.special.name,events:[...plan.suspended.map(e=>e.name+' · '+(venues[e.venue]||'Circuito oficial')),'Dark Book']});
 const online=resolveOnline(used);
 if(state.organization?.id==='haru'&&online.some(e=>e.rows.length))learn(state.circuit,state.team,1,2);
 const headlines=publish(state,{major:plan.special?{...results[0],result:results[0].name+': '+results[0].standings[0].name+' gana el cuadro. '+results[0].result+'.'}:null,local:results.find(e=>e.level==='local'&&e.ids.length),online,deal:state.circuit.negotiations.filter(n=>n.week===week).map(n=>getP(n.id).name+' '+n.result+'.').join(' '),social:state.weekly?.type==='link'?'Contacto con '+teamName(state.weekly.target):null,practice:state.weekly?activity:null,meta:state.news.find(n=>!prev.has(n)&&n.includes('estrategia poco explorada')),upcoming:upcoming().find(e=>e.week>week)?.name});
 for(const p of own())if(!state.active.includes(p.id)&&!used[p.id]&&!onlineStatus(state.circuit,p.id).count&&state.week-state.circuit.decks[p.id].since>=4)state.circuit.decks[p.id].trust=clamp(state.circuit.decks[p.id].trust-1);
 advanceCircuit(state);
 const acquired=weeklySnapshot();
 state.offerHistory.push({week,offers:state.offers.map(o=>({...o,status:o.status==='open'?'expired':o.status}))});
 state.resolvedWeek=week;
 const creditsBeforeIncome=state.credits;
 if(week<52)nextWeek(true);else state.finished=true;
 const operating=state.credits-creditsBeforeIncome;
 const finance=settleFinance(state,week,results,teams.map(t=>t.id));
 if(week<52){rivalRecruit(state);qualify(state);}
 state.offers=state.finished||!modernCareer()?[]:offers(state);
 state.entries={};state.weekly=null;
 state.reportArchive??=[];
 if(state.report)state.reportArchive.push({week:state.report.week,credits:state.report.credits,points:state.report.points,xp:state.report.xp,impact:state.report.impact||[]});
 const players=own().map(p=>({id:p.id,xp:(acquired.xp[p.id]||0)-(before.xp[p.id]||0),fatigue:[before.fatigue[p.id]||0,acquired.fatigue[p.id]||0],morale:acquired.morale-before.morale,prep:acquired.prep-before.prep}));
 state.report={week,before,after:acquired,players,finance,expenses:expenses+contractCosts+(finance?.paid||0),sources:{prizes:results.reduce((n,e)=>n+e.prize,0),operating,contracts:contractCosts,activity:expenses},credits:state.credits-credits-contractCosts,points:state.score-score,xp:Object.values(state.xp).reduce((a,b)=>a+b,0)-xp,activity,activityDetails,headlines,special:plan.special?.name,suspended:plan.suspended.length,events:results,online,impact:weeklyImpact(before,acquired),news:state.news.filter(n=>!prev.has(n)).slice(-6)};
 state.openEvent=null;state.tutorial=-1;tab='informe';render();if(headlines.some(a=>a.importance===10))notify('Último momento · Hay una noticia extraordinaria en el informe.');
}
function careerAction(action,id,btn){
 switch(action){
 case 'lineupSlot':if(changeSlot(state,own().map(p=>p.id),Number(btn.dataset.slot),id))render();return true;
 case 'onlineEnroll':return queueOnline(id);
 case 'deckTalk':return deckTalk(id,btn);
 case 'directRecruit':return negotiate(id,true);
 case 'pickCareer':selected=0;render();return true;
 case 'pickIdentity':selected=id;render();return true;
 case 'launchCareer':
  if(!state.started&&begin(state,selected,$('#clubName')?.value||'', $('#clubColor')?.value||'', $('#clubEmblem')?.value||'')){
   tab='inicio';state.tutorial=0;render();
  }
  return true;
 case 'skipTutorial':state.tutorial=-1;render();return true;
 case 'tutorial':state.tutorial=0;tab='inicio';render();return true;
 case 'chooseActivity':{
  const {type,target,prof}=btn.dataset;
  if(state.finished||state.weekly||!Object.hasOwn(activities,type))return true;
  const coach=type==='coach'&&professionals[prof];
  if(type==='coach'&&!coach||type==='link'&&(!getTeam(target)||target===state.team))return true;
  const cost=coach?coach[1]:0;
  if(state.credits<cost)return true;
  const available=type==='test'?new Set(guests().filter(p=>!state.unavailable.includes(p.id)).map(p=>p.id)):new Set();
  const invitees=type==='test'?[...new Set([...document.querySelectorAll('#guest-selector input:checked:not(:disabled)')].map(input=>Number(input.value)).filter(id=>available.has(id)))]:[];
  if(invitees.length>8){notify('Podés invitar hasta ocho duelistas.');return true;}
  if(confirm('¿Confirmar esta acción semanal?')){state.weekly={type,target,prof,invitees,cost,label:coach?.[0]};render();}
  return true;
 }
 case 'recruit':return negotiate(id,false);
 case 'enroll':case 'unenroll':{
  const events=eventsNow(),event=events[id];
  if(!event||state.finished||!mayEnter(event))return true;
  state.openEvent=event.key;
  if(action==='unenroll'){delete state.entries[event.key];render();return true;}
  const ids=[...document.querySelectorAll('#event-'+id+' input:checked')].map(input=>Number(input.value));
  const conflict=ids.map(id=>entryReason(state,event,id,events,cap)).find(Boolean);
  if(conflict){notify(conflict);return true;}
  if(!enroll(state,event,ids)){notify(event.type==='team'?'Seleccioná tres integrantes habilitados.':'Seleccioná al menos un duelista habilitado.');return true}
  render();notify('Inscripción confirmada');return true;
 }
 case 'finishWeek':closeCareerWeek();return true;
 }
 return false;
}


globalThis.addEventListener?.('change',e=>{if(e.target.id==='haru-starter'){const id=Number(e.target.value);opening.recruit=haruRecruits.some(p=>p.id===id)?id:null;if(!openingRosterIds().includes(opening.captain))opening.captain=18;render();$('#haru-starter')?.focus();return;}const key=e.target.dataset?.encyclopedia;if(key){encyclopediaFilter[key]=e.target.value;render();}});
render();
if ("serviceWorker" in navigator && window.isSecureContext) navigator.serviceWorker.register("./sw.js").catch(console.warn);
