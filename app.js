import {update15,preparation,friendship,changeFriendship,socialOptions,startSocial,activeEvent,advanceSocial,respondSocial,draft15,registrationError,validateDraft,questions15,tutorial15} from './update15.js';
import {interviewAnswers} from './interviews15.js';
import {publishCharacterNews,newsState} from './character-news.js';
import {dbLimit,localLimit,fatigueRules,competitionState,setDays,resolveTesting,recordTournament,rankings,startRankingWeek} from './competition.js';
import {dailyTopics,dailyAvailable,dailyPrompt,dailyTalk,memberState,dismissalQuote,dismiss,weeklyBelonging} from './relationships.js';
import {specialAvailable,queueContext} from './social.js';
import {events as personalEvents} from './dialogues.js';
import {upgrade,relation,availableEvents,startConversation,answerConversation,continueConversation,recruitmentGate,interviewPassed,needsFoundation,foundationCandidates,signFoundation,settleEconomy,maintenance,weeklyIncome,restTeam,restRecovery,onlineResistance,tutorialPending,reviewCommitment} from './social.js';
import {financeRules,financeState,costs,settleFinance} from './finances.js';
import {organizations,continental,newOrganization,rankedTeams,eligibleTeams,qualify,rivalRecruit,openingLines,guideNotes,haruRecruits} from './opening.js';
import {profiles, labels, profileStats, profileEffects, characterAbilities, exclusiveRule, knowledge, discover, lineupSlots, changeSlot, profileFor} from './encyclopedia.js';
import {weekend,entryReason,professionals,guestChance} from './weekend.js';
import {publish} from './press.js';
import {styles, favorite, dominant, matchup, affinity, distribution, ensureCircuit, metaPosition, practice, learn, talk, bond, relate, discount, unlocked, onlineStatus, onlineEligible, onlineLoad, advanceCircuit, clamp, duelChance} from './circuit.js';
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
function notify(msg){let t=$('.toast');if(t)t.remove();t=document.createElement('div');t.className='toast';t.setAttribute?.('role','status');t.textContent=msg;document.body.appendChild(t);clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.remove(),3200)}
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
 if(o.exhaustion&&(state.fatigue[p.id]||0)>=8)r-=.18;
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
 const fatigue=state.fatigue[p.id]||0;r-=fatigueRules(fatigue).penalty+(fatigue>=8?(fatigue-7)*(a.fatigue||0):0);
 r+=(memberState(state,p.id).motivation-50)*.002;
 return Math.max(.6,r);
}
function chooseLineup(){const a=own();if(state.active.length!==Math.min(3,a.length)||state.active.some(id=>!a.some(p=>p.id===id)))state.active=a.slice(0,3).map(p=>p.id);if(!state.active.includes(state.captain))state.captain=state.active[0];}
function headerOld(){const top=`<div class="top"><div><div class="logo">DUEL <span>CIRCUIT</span></div>${modernCareer()?`<div class="club-label">${esc(teamName(state.team))} · ${own().length}/5</div>`:''}<div class="sub">PRUEBA 11 · ${state.started?`Semana ${state.week} · ${esc(weekDate())}`:'Temporada 2027'}</div></div><div class="currency">${state.started?currency(state.credits):'40 duelistas'}</div></div>`;
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
const cinemaScenes={inicio:'inicio',plantel:'equipo',meta:'meta',noticias:'noticias',accion:'acciones',mercado:'fichajes',torneos:'torneos',darkbook:'darkbook',relaciones:'fichajes',informe:'torneos'};
function cinemaBackdrop(scene){
 const base='./public/assets/cinema/'+scene;
 return `<picture class="cinema-backdrop" aria-hidden="true"><source media="(max-width: 640px)" srcset="${base}-mobile.webp"><img src="${base}.webp" alt="" decoding="async" fetchpriority="high"></picture>`;
}
function render(){
 if(state.started&&(state.organization||state.identity)){ensureCircuit(state);upgrade(state);competitionState(state);migrate14();trackMeta15();}
 normalizeSekai();
 if(launchScreen){
  $('#app').classList?.toggle('reduce-motion',launchSettings.reduce);
  const stage=opening.stage;
  const scene={title:'inicio',dialogue:'torneos',choose:'equipo',handover:'fichajes',roster:'equipo',goal:'torneos'}[stage]||'inicio';
  $('#app').innerHTML=`${cinemaBackdrop(scene)}<main class="content launch-shell launch-stage-${stage}">${openingView()}</main>`;
  return;
 }
 if(state.started&&modernCareer()&&weeklyVisits15.includes(tab)){
  mark15(tab);
  const seen=upgrade(state).tutorial.seen;
  if(state.week===1&&!seen.includes(tab))seen.push(tab);
 }
 const scene=cinemaScenes[tab]||'inicio';
 const old=!state.circuit;
 ensureCircuit(state);
 qualify(state);
 $('#app').classList?.toggle('reduce-motion',launchSettings.reduce);
 if(old&&state.identity)for(const o of state.offers)if(o.status==='open')Object.assign(o,offerQuote(state,o.ids||[o.id]));
 updateRanks(rating);if(state.started){chooseLineup();recordMoves();}let html=cinemaBackdrop(tab==='torneos'&&boardDay15===2?'darkbook':scene)+header()+`<main class="content cinema-${scene}">${state.started?guidePanel():''}${!state.started?intro():({inicio:modernCareer()?dashboard:home,plantel:squad,mercado:modernCareer()?newMarket:market,torneos:modernCareer()?board15:entriesView,darkbook:onlineView,liga:()=>objective()+financeView()+league()+localTables(),archivo:archive,enciclopedia:encyclopedia,rankings:rankingView,relaciones:socialView,meta:metaView,noticias:newsView,accion:actionsView,informe:reportView}[tab]||home)()}</main><div class="footer">Duel Circuit · Prototipo original de gestión TCG · Sin cartas ni marcas oficiales. <a class="btn ghost" href="./galeria.html">Galería de duelistas</a> <button class="btn ghost" data-action="export">Exportar partida</button></div>`;$('#app').innerHTML=html;enhancePreview();save()}
function home(){const t=getTeam(state.team),f=currentFormat();return `<div class="hero"><span class="tag gold">MANAGER MODE · TEMPORADA 2027</span><h1>${esc(t.name)}</h1><p>Dirigido por ${esc(state.manager)} · ${esc(t.focus)}. Hasta tres titulares y dos reservas. La preparación es tan importante como las estrellas.</p><div class="grid three"><div class="mini"><small>Créditos</small><strong>${currency(state.credits)}</strong></div><div class="mini"><small>Puntos de liga</small><strong>${state.score}</strong></div><div class="mini"><small>Balance</small><strong>${state.wins}V / ${state.losses}D</strong></div></div></div><div class="widegrid"><section><div class="panel"><h2>Esta semana</h2>${state.report?'<button class="btn ghost" data-tab="informe">Último informe</button>':''}<p class="muted">${esc(weekDate())} · Formato: <b>${esc(f.name)}</b></p>${formatDisplay(f)}${state.banStyle?`<div class="notice">Banlist activa: penalización a estrategias ${esc(styleNames[state.banStyle])}.</div>`:''}<div class="actions"><button class="btn" data-tab="torneos">Jugar torneos</button><button class="btn secondary" data-tab="plantel">Ajustar titulares</button><button class="btn secondary" data-action="finishWeek">Finalizar semana →</button></div></div><div class="panel"><h2>Próximos eventos</h2>${nextEvents().slice(0,4).map(e=>`<div class="news"><b>Semana ${e.week}: ${esc(e.name)}</b><div class="small muted">${esc(e.type)}</div></div>`).join('')}</div></section><section><div class="panel"><h2>Mis titulares</h2>${state.active.map(id=>playerLine(getP(id))).join('')}</div><div class="panel"><h2>Noticias del circuito</h2>${state.news.slice(-5).reverse().map(n=>`<div class="news small">${esc(n)}</div>`).join('')}</div></section></div>`}
function playerLine(p){if(!p)return'';return `<div class="player">${avatar(p)}<div><div class="title">${esc(p.name)} ${state.captain===p.id?'<span class="tag gold">CAP</span>':''}</div><div class="alias">${esc(p.alias)}</div><div class="score">${stars(rating(p))} · Tier ${tier(rating(p))}</div></div><button data-detail="${p.id}">Ficha</button></div>`}
function squadOld(){
 const rosterIds=own().map(p=>p.id),slots=lineupSlots(state,rosterIds);
 const position=(id,i)=>{
  const p=getP(id),captain=i===1,reserve=i>=3,label=captain?'Capitán':reserve?'Reserva '+(i-2):'Titular '+(i===0?1:2);
  return `<article class="roster-slot ${captain?'roster-captain':''}"><span class="tag ${captain?'gold':''}">${label} · ×${captain?'2':reserve?'0,5':'1'}</span>
  ${p?`<button class="roster-portrait" data-detail="${p.id}" aria-label="Ficha de ${esc(p.name)}">${avatar(p)}<span class="roster-name"><strong>${esc(p.name)}</strong>${captain?`<small>${esc(p.alias)}</small>`:''}<span class="stars">${stars(rating(p))}</span></span></button>
  ${reserve?`<p class="small">${state.unavailable.includes(p.id)?'Ausente':'Fatiga '+(state.fatigue[p.id]||0)+'/12'} · ${styles[state.circuit.decks[p.id].style]}</p>`:''}
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
 const candidate=state.started&&tab==='mercado'&&modernCareer()&&state.owned[id]!==state.team
  ? hiringTerms15({id,mode:'foundation'})||hiringTerms15({id,mode:'recruit'})||hiringTerms15({id,mode:'recruit',direct:true}):null;
 const skills=characterAbilities(p,f,level),deck=state.circuit.decks[id],morale=state.morale[state.team]||0;
 const el=document.createElement('div');el.className='dialogback';
 const opener=document.activeElement;
 const dismiss=()=>{el.remove();opener?.focus?.();};
 el.innerHTML=`<div class="dialog dossier compact-dossier" role="dialog" aria-modal="true" aria-label="Ficha de ${esc(p.name)}"><div class="dossier-bar">${state.started?`<span class="wallet-button15">${walletBadge15()}</span>`:''}<span class="tag gold">N.º ${String(id).padStart(3,'0')} · Conocimiento ${level}/3</span><button class="btn ghost" data-action="close">Cerrar</button></div>
 <div class="dossier-grid"><header class="dossier-art">${avatar(p)}<div><h2>${esc(p.name)}</h2><p>«${esc(p.alias)}»</p><strong class="stars">${stars(rating(p))}${known&&p.potential!==null?' · Potencial '+stars(p.potential):''}</strong></div></header>
 <div class="dossier-body"><section class="dossier-overview"><p class="dossier-personality">${esc(known?f.behavior:f.public.split(/(?<=\.)\s+/)[0])}</p>
 <p class="tag gold">${state.owned[id]===state.team?(state.captain===id?'Capitán':state.active.includes(id)?'Titular':'Reserva')+' · '+esc(clubState15(p)):'Afinidad '+affinity(p,currentFormat())} · Pertenencia ${memberState(state,p.id).belonging}/100 · Motivación ${memberState(state,p.id).motivation}/100</p><p class="dossier-tags"><span class="tag">${esc(f.status)}</span> <span class="tag">Origen: ${esc(teamName(f.origin))}</span> <span class="tag">Mazo favorito: ${styles[favorite(p)]}</span></p>
 ${known?`<div class="dossier-vitals"><div>Moral del equipo <strong>${morale>0?'+':''}${morale}</strong></div><div>Fatiga <strong>${state.fatigue[id]||0}/12</strong></div><div>Confianza <strong>${deck.trust}/100</strong></div></div>`:'<p class="muted small">Perfil público · Estado interno reservado.</p>'}</section>
 ${candidate?hiringDetails15(candidate):''}<div class="ability-groups">${[['positive','Ventajas'],['negative','Desventajas']].map(([type,title])=>`<section aria-label="${title}"><h3>${title}</h3>${skills.filter(s=>s.type===type).map(abilityCard).join('')}</section>`).join('')}</div>
 ${full?`<details class="panel exclusive"><summary>✦ Mecánica exclusiva · ${esc(f.exclusive)}</summary><p>${esc(exclusiveRule(p))}</p></details>`:`<p class="small muted">🔒 Mecánica exclusiva sin descubrir${known?' · '+(state.profileKnowledge?.[id]||0)+'/10':''}.</p>`}
 ${known?`<details class="panel dossier-secondary"><summary>Biografía y perfil</summary><p class="tag">${esc(f.review)}</p><p>${esc(f.history)}</p><p>${esc(f.habit)}. ${esc(f.relationship)}</p><p>Ante derrotas: ${esc(f.loss)}. Ante victorias: ${esc(f.win)}.</p><p>${cap(state,id)} torneos físicos disponibles esta semana · ${state.xp[id]||0} XP</p></details>
 <details class="panel dossier-secondary"><summary>Mazo y estadísticas de perfil</summary>${deckCard(p,level)}${labels.map((label,i)=>{const value=profileStats(p)[i];return `<div class="report-meter">${label} <strong>${value}/100</strong><div class="progress"><div style="width:${value}%"></div></div></div>`;}).join('')}</details>`:''}
 ${state.owned[id]===state.team?`<p>${icon15("heart")} Amistad ${signedNumber(friendship(state,id))}</p><div class="actions"><button class="btn" data-action="dailyOpen" data-id="${id}" ${dailyAvailable(state)?'':'disabled'}>Hablar con el jugador</button><button class="btn warn" data-action="dismissOpen" data-id="${id}" ${dismissalQuote(state,id).blocked?'disabled':''}>DAR DE BAJA DEL PLANTEL</button></div><p class="small">${esc(dismissalQuote(state,id).blocked||'La baja requiere confirmar sus consecuencias.')}</p>`:''}<details class="panel dossier-secondary"><summary>Historial competitivo</summary>${historyCard(p)}</details></div></div></div>`;
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

function market(){const candidates=players.filter(p=>state.owned[p.id]!==state.team);return `<div class="panel"><h2>Mercado de fichajes</h2><p class="muted">Los equipos siempre tienen cinco jugadores. Cada operación intercambia al jugador comprado por uno de tu plantel, y descuenta el precio de fichaje.</p><p class="small muted">Los tres Mujica tienen un contrato indivisible: no pueden transferirse por separado.</p><div class="formline"><label>Jugador que se va de tu equipo en el intercambio</label><select id="swapOut">${own().filter(p=>!isMujica(p.id)).map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select></div><div class="actions"><button class="btn secondary" data-action="mujicaDeal" ${state.team===state.owned[9]||!canSign(state)?'disabled':''}>Negociar el trío Mujica</button></div></div><div class="panel"><h2>Jugadores disponibles</h2>${candidates.map(p=>{const quote=offerQuote(state,[p.id]);return `<div class="player">${avatar(p)}<div><b>${esc(p.name)}</b><div class="small muted">${esc(teamName(state.owned[p.id]))} · ${esc(p.alias)}</div><div class="score">${stars(rating(p))}</div>${priceBreakdown(quote)}</div><div><button data-detail="${p.id}">Ficha</button><button data-action="buy" data-id="${p.id}" ${isMujica(p.id)||!canSign(state)||state.credits<quote.price?'disabled':''}>ENTREVISTAR</button></div></div>`;}).join('')}</div>`}
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
function archive(){return `<div class="panel"><h2>Personajes y revisión</h2><button class="btn" data-tab="enciclopedia">Abrir enciclopedia</button> <a class="btn ghost" href="./revision.html">Revisión editorial</a></div><div class="panel"><h2>Datos y partida guardada</h2><button class="btn ghost" data-action="openingTitle">Volver al título</button> <button class="btn ghost" data-action="guideReset">Reactivar guía de Mili</button>${modernCareer()?'<button class="btn ghost" data-action="tutorial">Ver tutorial</button>':''}<div class="actions"><button class="btn secondary" data-action="export">Exportar partida JSON</button><button class="btn secondary" data-action="import">Importar partida JSON</button><button class="btn warn" data-action="reset">Reiniciar partida</button></div><p class="small muted">La partida se guarda automáticamente en este navegador (localStorage). Exportá una copia antes de borrar los datos del dispositivo.</p></div>`}
function nextWeek(quiet=false){if(state.week>=52){notify('Terminó la temporada 2027. Exportá tu partida o reiniciá para una nueva carrera.');return}state.week++;state.localDone=false;state.officialDone=false;state.bookDone=false;state.restDone=false;state.bookResult=null;
 state.unavailable=players.filter(p=>Math.random()<(abilities[p.id-1].absence||0)).map(p=>p.id);
 const absent=own().filter(p=>state.unavailable.includes(p.id));
 if(absent.length)state.news.push('Ausencias de esta semana: '+absent.map(p=>p.name).join(', ')+'.');
 if(!state.social)players.forEach(p=>state.fatigue[p.id]=Math.max(0,(state.fatigue[p.id]||0)-1));
 if((state.week-1)%13===0){state.formatIndex=(state.formatIndex+1)%formats.length;state.news.push(`Nuevo formato trimestral: ${currentFormat().name}.`);players.filter(p=>state.owned[p.id]!==state.team).forEach(p=>{if(Math.random()<.2)state.aiBoost[p.id]=Math.min(.5,(state.aiBoost[p.id]||0)+.5)})}
 if((state.week-1)%26===0){state.banStyle=pick(['aggro','combo','control','offmeta']);state.news.push(`Banlist semestral: ${styleNames[state.banStyle]} recibe una penalización temporal en los duelos.`)}
 const income=state.social?0:modernCareer()?(90+own().length*5+(state.organization?.id==='korium'?12:0)+Math.floor(Math.max(0,...Object.values(state.circuit.reputation))/5)):350+own().reduce((sum,p)=>sum+(abilities[p.id-1].income||0),0);state.credits+=income;state.news.push(`Semana ${state.week}: ingresos operativos +${income} créditos.`);if(!quiet){tab='inicio';render();notify(`Semana ${state.week} · ${currentFormat().name}`)}}
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
document.addEventListener('click',e=>{const tabbtn=e.target.closest('[data-tab]');if(tabbtn){tab=tabbtn.dataset.tab;if(modernCareer()&&tutorialTabs[state.tutorial]===tab)state.tutorial++;if(state.started&&state.week===1){const g=upgrade(state).tutorial;if(!g.seen.includes(tab))g.seen.push(tab);}if(tab==='noticias')readMetaNews();render();globalThis.scrollTo?.(0,0);return}const dt=e.target.closest('[data-detail]');if(dt){playerModal(Number(dt.dataset.detail));return}const btn=e.target.closest('[data-action]');if(!btn)return;const action=btn.dataset.action,id=Number(btn.dataset.id);if(act15(action,id,btn)||action14(action,id,btn)||previewAction(action,id,btn)||openingAction(action,id,btn)||careerAction(action,id,btn))return;switch(action){case'start':state.team=$('#chooseTeam')?.value||'korium';state.manager=($('#manager')?.value||'Manu').trim().slice(0,35);state.started=true;state.credits+=getTeam(state.team).budget;state.active=own().slice(0,3).map(p=>p.id);state.captain=state.active[0];tab='inicio';render();break;case'nextWeek':nextWeek();break;case'playLocal':simulateEvent('local');break;case'playOfficial':simulateEvent('official');break;case'captain':if(state.active.includes(id)){state.captain=id;render()}break;case'promote':{const old=state.active[2];state.active=state.active.filter(x=>x!==old).concat(id);if(state.captain===old)state.captain=state.active[0];render();break}case'train':train();break;case'rest':if(!state.restDone){own().forEach(p=>state.fatigue[p.id]=Math.max(0,(state.fatigue[p.id]||0)-2));state.restDone=true;render();notify('Descanso completado.')}break;case'book':book();break;case'buy':buy(id);break;case'mujicaDeal':mujicaDeal();break;case'export':exportSave();break;case'import':importSave();break;case'reset':if(confirm('¿Borrar la partida y empezar desde cero?')){state=initial();selected=null;tab='inicio';launchScreen=true;opening.stage='title';save();render()}break;}});
const bookSlots=4;
function deckCard(p,level=3){
 const d=state.circuit.decks[p.id],o=onlineStatus(state.circuit,p.id),ready=d.lastTalk+4;
 return `<section class="panel"><h3>Mazo y confianza</h3><p>Actual: <b>${styles[d.style]}</b> · Favorito: ${styles[favorite(p)]} · Dominio ${Math.round(d.mastery[d.style])}/100${level===3?' · Afinidad '+affinity(p,currentFormat()):''}</p><p>Confianza ${d.trust}/100 · Adaptación pendiente ${Math.round(d.adaptation)}/100 · Fatiga ${state.fatigue[p.id]||0}/12${level===3&&o.obsession?' · Obsesión activa':''}${o.exhaustion?' · Agotamiento':''}</p>
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
function onlineViewOld(){
 if(!weekendPlan().online)return '<section class="panel"><h2>Dark Book suspendido</h2><p>Esta semana está reservada para el evento principal.</p><button class="btn" data-tab="torneos">Ver evento principal</button></section>';
 const c=state.circuit;
 return `<section class="panel"><h2>Dark Book · Semana ${state.week}</h2><p>Cuatro torneos online de cuatro rondas. Se juegan al finalizar la semana después de los presenciales. Dan XP e información, con fatiga creciente y sin puntos de liga.</p>
 ${Array.from({length:bookSlots},(_,i)=>`<fieldset class="duel-card"><legend>Dark Book · Fecha ${i+1}</legend>${own().map(p=>{
 const o=onlineStatus(c,p.id),eligible=onlineEligible(state,p.id,physicalCount(p.id));
 return `<label class="entry-choice"><input type="checkbox" value="${p.id}" ${c.bookEntries[i]?.includes(p.id)?'checked':''} ${eligible?'':'disabled'}>${avatar(p)}<span>${esc(p.name)} · Fatiga ${state.fatigue[p.id]||0}/12${o.obsession?' · Obsesión':''}${eligible?'':' · Límite por dos torneos físicos'}</span></label>`;
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
function resolveOnlineOld(physical){
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
function onlineReportOld(e){
 return `<details class="result"><summary>Dark Book · Semana ${e.week} · Fecha ${e.slot}${e.table?' · '+e.table.length+' duelistas':''}</summary>${e.rows.map(p=>`<div class="player">${avatar(getP(p.id))}<div><b>${esc(p.name)}</b> · #${p.place} · ${p.wins}V / ${p.losses}D · +${p.xp} XP · Fatiga ${p.fatigue}/12${p.matches.map(m=>`<div class="small">Ronda ${m.round} · ${esc(m.opponent)} · ${m.won?'Victoria':'Derrota'}</div>`).join('')}</div></div>`).join('')}${e.skipped.length?`<p>Sin cupo online por actividad física: ${esc(e.skipped.join(', '))}</p>`:''}${e.table?`<details><summary>Clasificación online</summary>${e.table.map(p=>`<div class="small">#${p.place} · ${esc(p.name)} · ${p.points} puntos</div>`).join('')}</details>`:''}</details>`;
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
 <div class="card-grid candidate-grid15">${directOffers().map(o=>candidateCard15(getP(o.id),hiringTerms15({id:o.id,mode:'recruit',direct:true}),'directRecruit','Entrevistar')).join('')||'<p>Sin oportunidades dirigidas para el plantel actual.</p>'}</div>
 <h3>Historial</h3>${c.negotiations.slice(-10).reverse().map(n=>`<div class="news">Semana ${n.week} · ${esc(getP(n.id).name)} · ${esc(n.result)} · ${currency(n.price)}</div>`).join('')||'<p>Sin negociaciones.</p>'}</details>`;
}
function negotiateLegacy(id,direct){
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
 for(const [id,n] of Object.entries(after.fatigue))if(n!==before.fatigue[id])lines.push(`${getP(id).name} · Fatiga ${before.fatigue[id]} → ${n}/12${knowledge(state,Number(id))===3&&onlineStatus(state.circuit,id).obsession?' · Obsesión activa':''}.`);
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
 rest:['Descanso',0,'Recuperación individual de fatiga'],
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
 return opening.club==='haru'&&opening.recruit?[opening.recruit]:ids;
}
function haruStarterPickerOld(){
 const p=getP(opening.recruit);
 return `<section class="panel"><h2>Refuerzo inicial de Haru</h2><p>Sumá un duelista gratis junto a Alan. Solo se admiten personajes de menos de 4,5 estrellas.</p>
 <label>Elegí un agente libre inicial <select id="haru-starter"><option value="">Seleccioná un duelista</option>${[...haruRecruits].sort((a,b)=>a.name.localeCompare(b.name,'es')).map(q=>`<option value="${q.id}" ${opening.recruit===q.id?'selected':''}>${esc(q.name)} · ${stars(q.stars)}</option>`).join('')}</select></label>
 ${p?`<div class="player">${avatar(p)}<div><strong>${esc(p.name)}</strong><p class="small">${stars(p.stars)} · Fichaje inicial gratuito</p></div><span class="tag gold">0 CR</span></div>`:''}</section>`;
}
function openingLineup(club){
 const ids=openingRosterIds(),others=ids.filter(id=>id!==opening.captain),slots=[others[0],opening.captain,others[1]];
 const slot=(id,label,central=false)=>`<article class="roster-slot ${central?'roster-captain':''}"><span class="tag ${central?'gold':''}">${label}</span>${id?`<button class="roster-portrait" data-detail="${id}">${avatar(getP(id))}<span class="roster-name"><strong>${esc(getP(id).name)}</strong><span class="stars">${stars(getP(id).stars)}</span></span></button>`:'<div class="empty-slot">Vacante</div>'}</article>`;
 return `<div class="lineup-stage">${slots.map((id,i)=>slot(id,['Titular · ×1','Capitán · ×2','Titular · ×1'][i],i===1)).join('')}</div><div class="lineup-bench">${slot(null,'Reserva · ×0,5')}${slot(null,'Reserva · ×0,5')}</div>
 ${ids.length>1?`<div class="actions"><span>Elegí capitán:</span>${ids.map(id=>`<button class="btn ${opening.captain===id?'gold-button':'ghost'}" data-action="openingCaptain" data-id="${id}" aria-pressed="${opening.captain===id}">${avatar(getP(id))}${esc(getP(id).name)}</button>`).join('')}</div>`:''}`;
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
  return `<article class="duel-card organization-card" style="--club:${t.color}"><button class="organization-pick" data-action="openingSelect" data-club="${id}" aria-expanded="${expanded}">${avatar(p)}<span><b>${o.emblem||'⬟'} ${esc(t.name)}</b><small>${id==='haru'?'Sin fundador fijo · primer jugador a elección':(o.founder?'Fundador':'Referente provisional')+' · '+esc(p.name)}</small><small>${(id==='haru'?1:o.ids.length)} integrante${id!=='haru'&&o.ids.length===1?'':'s'} · Desafío ${o.challenge.toLowerCase()}</small></span></button>
  ${expanded?`<div class="organization-detail"><p>${esc(o.history)}</p><p><b>Filosofía:</b> ${esc(t.focus)}.</p><p><b>Ventaja:</b> ${esc(o.edge)}</p><p><b>Dificultad:</b> ${o.ids.length<3?'Necesita fichajes para competir en 3v3.':'Arranca con trío completo y una agenda más exigente.'}</p><p><b>Plantel:</b> ${o.ids.map(id=>esc(getP(id).name)).join(', ')}${id==='haru'?' primer integrante a elección, seguido de una incorporación fundacional':''}.</p>${button('openingConfirm','Confirmar organización')}</div>`:''}</article>`;
 }).join('')}</div><div class="actions">${back}</div></section>`;
 if(opening.stage==='handover')return `<section class="opening-scene opening-founder">${opening.club==='haru'?mili('welcome'):avatar(speaker)}<div class="opening-copy"><span class="tag gold">TRASPASO DE MANDO · ${esc(team.name)}</span><h1>${opening.club==='haru'?'Mili':esc(speaker.name)}</h1><p>«${esc(club.handover)}»</p><div class="actions">${button('openingRoster','Conocer el plantel')}${back}</div></div></section>`;
 if(opening.stage==='roster')return `<section class="panel roster-stage"><h1>Plantel inicial · ${esc(team.name)}</h1>${opening.club==='haru'?haruStarterPicker():''}${openingLineup(club)}<p>Mili: «Los lugares vacantes son espacio para fichajes. Para el Continental necesitás tres duelistas habilitados».</p><div class="actions">${opening.club==='haru'&&!opening.recruit?'<button class="btn gold-button" disabled>Ver objetivo continental</button>':button('openingGoal','Ver objetivo continental')}${back}</div></section>`;
 return `<section class="opening-scene">${mili('farewell')}<div class="opening-copy"><span class="tag gold">OBJETIVO FINAL</span><h1>Ganá el Continental de Equipos</h1>${road()}<p>En esta beta clasifican los primeros ${continental.slots} equipos elegibles del ranking nacional al comenzar la semana ${continental.week}. Se exige un plantel de ${continental.minimumRoster} o más. Los locales no suman puntos nacionales.</p><label>Tu nombre de mánager <input id="openingManager" maxlength="35" placeholder="Mánager"></label><div class="actions">${button('openingLaunch','Empezar semana 1')}${back}</div></div></section>`;
}
function guidePanelOld(){
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
  update15(fresh).tutorials.intro={step:0,mode:'initial'};state=fresh;launchScreen=false;tab='inicio';break;
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
function eventBadges(e){
 const category={local:'Local',regional:'Regional',national:'Nacional',ycs:'YCS',continental:'Continental'}[levelOf(e)];
 return `<span class="event-badges"><span class="event-tier" data-tier="${levelOf(e)}">${icon15('torneos')} ${category}</span>${e.type==='team'?'<span class="event-team">'+icon15('plantel')+' 3v3 · Por equipos</span>':''}</span>`;
}
function eventRows(list){return list.length?list.map(e=>`<div class="news event-announcement">${eventBadges(e)}<b>${esc(e.name)}</b><div class="small muted">Semana ${e.week} · ${e.week===state.week?'Esta semana':'Faltan '+(e.week-state.week)+' semanas'}</div></div>`).join(''):'<p class="muted">Los eventos se anunciarán con anticipación.</p>'}
function dashboardOld(){
 const t=getTeam(state.team), members=own();
 const names=['Meta actual','Noticias','Acción semanal','Torneos'];
 return `<section class="hero team-banner"><div><span class="tag gold">TEMPORADA 2027 · ${esc(weekDate())}</span><h1>${esc(t.emblem||organizations[t.id]?.emblem||'⬟')} ${esc(t.name)}</h1><p>${esc(state.manager)} · ${members.length}/5 integrantes · ${currency(state.credits)}</p></div>${avatar(getP(state.organization?.founder||state.organization?.representative||state.identity))}</section>
 ${state.tutorial>=0?`<div class="notice tutorial"><b>Tutorial · ${Math.min(5,state.tutorial+1)}/5</b> · ${['Consultá el formato vigente.','Leé las noticias del circuito.','Elegí una acción para esta semana.','Inscribí a un duelista en el local.','Finalizá la semana para ver los resultados.'][state.tutorial]||''} <button class="btn ghost" data-action="skipTutorial">Omitir</button></div>`:''}
 <div class="arena-grid"><div class="arena-actions">${tutorialTabs.map((key,i)=>`<button class="arena-tile ${state.tutorial===i?'guided':''}" data-tab="${key}"><span aria-hidden="true">${['♠','▤','⚡','🏆'][i]}</span><strong>${names[i]}</strong><small>${[currentFormat().name,'Últimas novedades',state.weekly?'Acción reservada':'1 acción disponible','Inscribir duelistas'][i]}</small></button>`).join('')}</div><section class="panel"><h2>Próximos eventos</h2>${eventRows(upcoming())}</section></div>
 ${objective()}
 ${newMarket(true)}
 <div class="actions week-actions">${state.report?'<button class="btn ghost" data-tab="informe">Último informe</button>':''}<button class="btn gold-button ${state.tutorial===4?'guided':''}" data-action="finishWeek">Finalizar semana »</button></div>`;
}
function metaView(){return metaScreen15();}
function portraitsInNews(text){
 const words=text.toLocaleLowerCase('es');
 return players.filter(p=>words.includes(p.name.toLocaleLowerCase('es'))).slice(0,3)
  .map(p=>`<button type="button" class="portrait-link" data-detail="${p.id}" aria-label="Ficha de ${esc(p.name)}">${avatar(p)}</button>`).join('');
}
function newsIllustration(article){
 const image=article.image;
 if(!image||!/^public\/assets\/(?:scenes\/[a-z0-9-]+|characters\/variants\/(?:0[1-9]|[1-3][0-9]|40)\/[a-z0-9-]+)\.webp$/.test(image.src))return '';
 return `<img class="news-illustration" src="./${esc(image.src)}" alt="${esc(image.alt||'')}" width="960" height="540" loading="lazy" decoding="async">`;
}
document.addEventListener('error',event=>{
 if(event.target?.classList?.contains('news-illustration'))event.target.remove();
},true);
function newsArticle(a,featured=false){
 return `<details class="news bulletin ${featured?'headline':''}"><summary><span class="tag">${esc(a.category)} · ${esc(a.date)} · ${esc(a.entity)} · Impacto ${a.importance}/12</span><h3>${esc(a.title)}</h3><p>${esc(a.intro)}</p></summary><div>${newsIllustration(a)}${portraitsInNews(a.body)}<p>${esc(a.body)}</p>${a.effect?`<p class="notice">${esc(a.effect)}</p>`:''}</div></details>`;
}
function newsView(){
 const archive=state.press?.articles||[];
 const recent=[...archive].reverse().sort((a,b)=>b.week-a.week);
 const current=recent.filter(a=>a.week===recent[0]?.week).sort((a,b)=>b.importance-a.importance);
 const featured=current.slice(0,3);
 if(featured.length<3)featured.push(...recent.filter(a=>!featured.includes(a)&&!featured.some(b=>b.category===a.category)).slice(0,3-featured.length));
 return `<section class="panel"><header class="cinema-masthead"><h2>Circuit News</h2></header>${state.report?'<button class="btn ghost" data-tab="informe">Ver registro semanal</button>':''}<p class="muted">Medio ficticio del universo Duel Circuit. Los incidentes se ambientan con NPC y sedes inventadas.</p>${featured.map((a,i)=>newsArticle(a,i===0)).join('')||'<p>La primera edición sale al finalizar la semana.</p>'}
 <details><summary>Archivo de ediciones anteriores</summary>${recent.filter(a=>!featured.includes(a)).map(a=>newsArticle(a)).join('')||'<p>Todavía no hay ediciones anteriores.</p>'}
 ${state.news.slice(-25).reverse().map(n=>`<details class="news"><summary>${esc(n)}</summary><p>Registro histórico del circuito.</p></details>`).join('')}</details></section>`;
}
function guests(){
 return players.filter(p=>state.owned[p.id]&&state.owned[p.id]!==state.team&&bond(state.circuit,state.team,state.owned[p.id])>0);
}
function actionsView(){
 const c=state.circuit;
 if(state.weekly)return `<section class="panel"><h2>Acción semanal · Elección completada</h2><div class="notice">Confirmada: ${esc(state.weekly.label||activities[state.weekly.type][0])}. Se resuelve al finalizar la semana.</div></section>`;
 return `<section class="panel"><h2>Acción semanal</h2><p>Elegí una actividad principal. Se resuelve al finalizar la semana.</p>
 <details class="duel-card cinema-activity activity-test" id="guest-selector"><summary>${icon15("meta")} Sesión de testeo</summary><p>Participa tu plantel. Aporta dominio, conocimiento del formato y preparación. Otorga XP con fatiga inicial de 0 a 3, sin sumar fatiga. Las pasivas de entrenamiento pueden dar XP adicional.</p><p>Podés invitar hasta ocho duelistas con un vínculo previo.</p>${guests().map(p=>{
 const club=state.owned[p.id],relation=bond(c,state.team,club),available=!state.unavailable.includes(p.id),d=c.decks[p.id];
 return `<label class="entry-choice"><input type="checkbox" value="${p.id}" ${available?'':'disabled'}>${avatar(p)}<span>${esc(p.name)} · ${esc(teamName(club))} · Relación ${relation}/100 · ${styles[d.style]} · ${stars(rating(p))} · ${available?'Disponible · '+Math.round(guestChance(relation,d.trust))+'%':'Ausente'}</span></label>`;
 }).join('')||'<p>Todavía no hay invitados elegibles. Podés testear con tu propio equipo.</p>'}<button class="btn" data-action="chooseActivity" data-type="test">Confirmar testeo</button></details>
 <details class="duel-card cinema-activity activity-team"><summary>${icon15("heart")} Juntada del equipo</summary><p>Solo tu equipo. Mejora sinergia, moral, confianza y preparación para 3v3.</p>${own().map(playerLine).join('')}<button class="btn" data-action="chooseActivity" data-type="team">Confirmar juntada</button></details>
 <details class="duel-card cinema-activity activity-link"><summary>${icon15("plantel")} Encuentro con otro equipo</summary><div class="card-grid">${teams.filter(t=>t.id!==state.team).map(t=>{
 const rel=bond(c,state.team,t.id),top=roster(t.id).filter(p=>!state.unavailable.includes(p.id)).sort((a,b)=>rating(b)-rating(a)).slice(0,2);
 return `<article class="duel-card"><h3><span style="color:${t.color}">⬟</span> ${esc(t.name)}</h3><p>Relación ${rel}/100 · ${rel>=50?'Afinidad':rel>0?'Contacto':'Vínculo por construir'}</p><p>${esc(top.map(p=>p.name).join(', '))}</p><p class="small">Testeo conjunto, información y fichajes dirigidos.</p><button class="btn" data-action="chooseActivity" data-type="link" data-target="${t.id}" ${top.length?'':'disabled'}>${top.length?'Confirmar con':'Sin invitados disponibles en'} ${esc(t.name)}</button></article>`;
 }).join('')}</div></details>
 <details class="duel-card cinema-activity activity-coach"><summary>${icon15("mercado")} Contratar profesional</summary><p>Cada sesión dura una semana. Consultar el detalle es gratis.</p><div class="card-grid">${Object.entries(professionals).map(([id,[name,cost,desc]])=>`<article class="duel-card"><h3>${name}</h3><p>${desc} · ${currency(cost)}</p><button class="btn" data-action="chooseActivity" data-type="coach" data-prof="${id}" ${state.credits<cost?'disabled':''}>Contratar</button></article>`).join('')}</div></details></section>`;
}
function entriesView(){
 const {events,special,suspended}=weekendPlan();
 const card=(e,i)=>`<details class="duel-card event-card ${special?'special-event':''}" id="event-${i}" ${state.openEvent===e.key?'open':''}><summary><strong>${esc(special?e.name:venues[e.venue]||e.name)}</strong><div class="small muted">${e.day===0?'Sábado':'Domingo'} · ${e.type==='team'?'3v3':'Individual'} · ${e.type==='team'?e.level==='local'?10:Math.floor(structures[e.level].size/3):structures[e.level].size} ${e.type==='team'?'equipos':'duelistas'} · ${state.entries[e.key]?.length||0} inscritos · ${own().filter(p=>!entryReason(state,e,p.id,events,cap)).length} habilitados</div></summary>
 ${e.championship&&!mayEnter(e)?'<p class="notice">Tu equipo quedó fuera del corte de clasificación. Podés seguir el torneo desde el informe semanal.</p>':''}
 ${special?`<p>${esc(e.level==='regional'?'Regional':e.level==='national'?'Nacional':e.level==='continental'?'Continental':'YCS')} · Semana ${state.week} · ${esc(weekDate(e.day))} · Preparación ${state.prep}/12</p>`:''}
 ${own().map(p=>{
  const reason=mayEnter(e)?entryReason(state,e,p.id,events,cap):'Sin clasificación continental',checked=state.entries[e.key]?.includes(p.id);
  return `<label class="entry-choice"><input type="checkbox" value="${p.id}" ${checked?'checked':''} ${reason?'disabled':''}>${avatar(p)}<span>${esc(p.name)} · ${stars(rating(p))} · ${styles[state.circuit.decks[p.id].style]} · Fatiga ${state.fatigue[p.id]||0}/12<br><small>${esc(p.alias)}<br>${physicalCount(p.id)}/${cap(state,p.id)} torneos físicos programados · ${reason||'Disponible'}</small></span></label><button class="btn ghost" data-detail="${p.id}">Ver ficha de ${esc(p.name)}</button>`;
 }).join('')}<div class="actions"><button class="btn" data-action="enroll" data-id="${i}" ${state.finished||!mayEnter(e)?'disabled':''}>Confirmar inscripción</button>${state.entries[e.key]?`<button class="btn ghost" data-action="unenroll" data-id="${i}">Retirar inscripción</button>`:''}</div></details>`;
 return `<section class="panel"><h2>Torneos · Semana ${state.week}</h2>${special?`<div class="notice">Semana especial · Dark Book y las categorías inferiores quedan suspendidos.</div>${card(special,0)}<details><summary>Programación suspendida</summary>${suspended.map(e=>`<p>${esc(venues[e.venue]||'Circuito oficial')} · ${esc(e.name)}</p>`).join('')}<p>Dark Book</p></details>`:`<div class="weekend-grid">${['Sábado','Domingo'].map((label,day)=>`<section><h3>${label}</h3>${events.map((e,i)=>e.day===day?card(e,i):'').join('')||'<p>Sin torneos programados.</p>'}</section>`).join('')}</div>`}</section>`;
}

function hiringTerms15({id,mode,direct}){
 const player=getP(id);
 if(!player)return null;
 const free=mode==='foundation';
 const matches=o=>o.id===id&&o.status==='open';
 const offer=free?null:direct?directOffers().find(matches):state.offers.find(matches)||(direct===undefined?directOffers().find(matches):null);
 if(free?!foundationCandidates(state).some(p=>p.id===id)||!needsFoundation(state)||state.week!==1:!offer)return null;
 const ids=offer?.ids||[id],count=own().length;
 const quote=free?{price:0}:offerQuote(state,ids);
 const reserved=!free&&state.weekly?.type==='coach'?(state.weekly.cost??450):0;
 const shortage=free?0:Math.max(0,quote.price+reserved-state.credits);
 const gate=free?null:recruitmentGate(state,player);
 const blocked=state.finished?'La temporada terminó.':count+ids.length>5?'Plantel completo.':
  !free&&!canSign(state)?'Cupo de fichaje utilizado.':gate&&!gate.ok?gate.reason:
  ids.some(pid=>state.owned[pid]===state.team)?'Un integrante ya pertenece al club.':
  shortage?'Te faltan '+currency(shortage)+' para completar el fichaje'+(reserved?' y respetar el gasto de la acción confirmada.':'.'):'';
 return {ids,quote,free,reserved,shortage,blocked,balance:state.credits-quote.price,before:maintenance(count),after:maintenance(count+ids.length),net:ordinaryBudget15(count+ids.length).net};
}
function hiringDetails15(terms){
 const rows=[
  ['Créditos disponibles',currency(state.credits)],['Precio base',currency(terms.quote.base??0)],
  ...(!terms.free?[['Multiplicador','×'+terms.quote.multiplier.toLocaleString('es-AR')],['Descuento',Math.round(terms.quote.discount*100)+' %']]:[]),
  ['Total a pagar ahora',currency(terms.quote.price)],['Saldo después del fichaje',currency(terms.balance)],
  ['Mantenimiento actual',currency(terms.before)+'/semana'],['Mantenimiento nuevo',currency(terms.after)+'/semana'],
  ['Diferencia semanal',signedNumber(terms.after-terms.before)+' CR/semana'],
  ['Balance ordinario previsto',currency(terms.net)+'/semana']
 ];
 return `<section class="hiring-ledger15"><h3>Detalle de contratación</h3>${terms.free?'<p class="hiring-free15">Fichaje fundacional gratuito</p>':''}<dl>${rows.map(([label,value])=>`<div class="${label==='Total a pagar ahora'?'hiring-total15':label==='Saldo después del fichaje'||label==='Balance ordinario previsto'?(value.startsWith('-')?'hiring-blocked15':'hiring-balance15'):''}"><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>${terms.reserved?`<p>Créditos reservados para la acción semanal: ${currency(terms.reserved)}. Se pagan al cerrar la semana.</p>`:''}${terms.blocked?`<p class="hiring-blocked15" role="status">${esc(terms.blocked)}</p>`:''}</section>`;
}
function candidateCard15(p,terms,action,label,status=''){
 const price=terms?`<dl class="candidate-cost15"><div><dt>Incorporación</dt><dd>${terms.free?'Gratis · ':''}${currency(terms.quote.price)}</dd></div><div><dt>Mantenimiento del plantel</dt><dd>${currency(terms.after)}/semana</dd></div></dl>`:'';
 return `<article class="duel-card candidate-card15 ${rating(p)>=4.5?'candidate-elite15':''}"><button class="candidate-portrait15" data-detail="${p.id}" aria-label="Ficha de ${esc(p.name)}">${avatar(p)}</button><h3>${esc(p.name)}</h3><p class="candidate-alias15">${esc(p.alias)}</p><p class="candidate-rating15">${stars(rating(p))} · Afinidad ${affinity(p,currentFormat())}</p>${price}${terms?.ids.length>1?`<p>Contrato conjunto: ${terms.ids.map(id=>esc(getP(id).name)).join(', ')}</p>`:''}<p class="candidate-status15">${esc(status||terms?.blocked||(update15(state).interviewWeek===state.week&&action!=='hireFoundation15'?'Cupo de entrevista utilizado':'Disponible'))}</p><div class="actions"><button class="btn ghost" data-detail="${p.id}">Ficha</button><button class="btn gold-button" data-action="${action}" data-id="${p.id}" ${!terms||terms.blocked||update15(state).interviewWeek===state.week&&action!=='hireFoundation15'?'disabled':''}>${label}</button></div></article>`;
}
function newMarket(compact=false){
 const cards=state.offers.map(offer=>candidateCard15(getP(offer.id),hiringTerms15({id:offer.id,mode:'recruit'}),'recruit','Entrevistar',
  offer.status==='signed'?'Contratado':offer.status==='declined'?'Oferta rechazada':offer.status==='open'?'':'Oferta cerrada')).join('');
 return `<section class="panel"><h2>Mercado · Ofertas de la semana</h2><p>${canSign(state)?'Cupo de fichaje disponible.':'Cupo de fichaje utilizado.'}</p><div class="card-grid candidate-grid15">${cards||'<p>No quedan candidatos elegibles.</p>'}</div>${compact?'':directMarket()}</section>`;
}
function runCircuitEvent(event, ids, used,days={}){
 const level=levelOf(event), local=level==='local', team=event.type==='team';
 const initialFatigue={...state.fatigue};
 const initialDecks=Object.fromEntries(ids.map(id=>[id,{trust:state.circuit.decks[id].trust,adaptation:state.circuit.decks[id].adaptation}]));
 const initialMorale=state.morale[state.team]||0;
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
 const gains=recordTournament(state,{...event,level},result.standings,initialFatigue,used,rankingPrize);
 let eventXp=0;
 const prize=mine.reduce((n,p)=>n+100+Math.round(p.wins*40+p.losses*12)+(p.place===1?200:0),0);
 state.credits+=prize;state.score+=points;
 state.rivalBudgets??={};for(const row of result.standings)if(row.club&&row.club!==state.team){state.rivalBudgets[row.club]=(state.rivalBudgets[row.club]??100)+100+Math.round(row.wins*40+row.losses*12)+(row.place===1?200:0);}
 for(const p of mine){
  for(const id of team?p.members.map(m=>m.id):[p.id]){
   const earnedXp=gains[id]||0;eventXp+=earnedXp;
   practice(state.circuit,id,9);discover(state,id,3);const d=state.circuit.decks[id];d.trust=clamp(d.trust+(p.wins>p.losses?3:1));
   // Tournament fatigue and XP were committed once for all real entrants.
  }
  if(p.wins>p.losses)state.wins++;else state.losses++;
 }
 if(mine.length)state.morale[state.team]=Math.max(-2,Math.min(2,(state.morale[state.team]||0)+(mine.some(p=>p.wins>p.losses)?1:-1)));
 const report={week:state.week,name:event.name,venue:local?venues[venue]:'Circuito oficial',type:event.type,position:mine[0]?.place||0,
  result:mine.length?'Mejor puesto: '+mine[0].place:'Sin inscripción propia',points,prize,ids,deckNotes:ids.map(id=>{const d=state.circuit.decks[id],delta=metaPosition(d.style,currentFormat(),state.circuit,state.team)-d.adaptation*.005;return getP(id).name+' · '+styles[d.style]+' · '+(delta>=0?'posicionamiento favorable':'coste de adaptación superior a la ventaja del meta');}),mine:mine.map(({id})=>id),
  xp:eventXp,level,day:event.day,...result,
  moraleChange:(state.morale[state.team]||0)-initialMorale,
  playerImpact:Object.fromEntries(ids.map(id=>[id,{
   xp:gains[id]||0,initialFatigue:initialFatigue[id]||0,fatigue:state.fatigue[id]||0,
   trust:state.circuit.decks[id].trust-initialDecks[id].trust,
   adapted:initialDecks[id].adaptation-state.circuit.decks[id].adaptation
  }]))};
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
const isFeaturedEvent=e=>e.type==='team'||levelOf(e)!=='local';
function archiveCompetition(e){
 return {name:e.name,type:e.type,level:levelOf(e),ids:e.ids,position:e.position,
  points:e.points,prize:e.prize,reputation:e.reputation,winner:e.standings?.[0]?.name};
}
function competitionImpact(e){
 const reputation=e.reputation?.map(r=>r.venue+' '+signedNumber(r.delta)).join(', ');
 return `<span>${signedNumber(e.points||0)} pts de ranking · Premios ${currency(e.prize||0)}${Array.isArray(e.reputation)?' · Reputación '+esc(reputation||'sin cambios'):''}</span>`;
}
function competitionRecord(e){
 const winner=e.winner||e.standings?.[0]?.name;
 return `<div class="news event-announcement">${eventBadges(e)}<b>${esc(e.name)}</b><div>${e.ids?.length?'Participó el equipo · Puesto '+e.position:'Sin participación del equipo'}${winner?' · Ganó '+esc(winner):''}</div>${competitionImpact(e)}</div>`;
}
function characterResults15(report){
 const byId=new Map((report.players||[]).map(p=>[p.id,{...p,activities:[]}]));
 const add=(id,activity)=>{
  if(!getP(id))return;
  if(!byId.has(id))byId.set(id,{id,activities:[]});
  byId.get(id).activities.push(activity);
 };
 for(const event of report.events||[]){
  for(const id of event.ids||[]){
   const row=event.standings?.find(r=>r.id===id||r.members?.some(m=>m.id===id));
   if(!row)continue;
   const eliminations=(event.bracket||[]).flatMap(match=>{
    const won=match.winnerId===undefined?match.winner===row.name:match.winnerId===row.id;
    const lost=match.loserId===undefined?match.loser===row.name:match.loserId===row.id;
    return won||lost?[{label:match.stage===2?'Final':'Top '+match.stage,won,opponent:won?match.loser:match.winner}]:[];
   });
   add(id,{title:event.name,context:[event.venue,event.type==='team'?'3v3 · Resultado del equipo':'Individual',event.day===0?'Sábado':event.day===1?'Domingo':''].filter(Boolean).join(' · '),
    place:row.place,wins:row.wins,losses:row.losses,matches:[...(row.matches||[]),...eliminations],
    impact:event.playerImpact?.[id],morale:event.moraleChange});
  }
 }
 for(const session of report.online||[]){
  for(const row of session.rows||[]){
   add(row.id,{title:'Dark Book',context:row.day?'Testeo online · Día '+row.day:'Testeo online',online:true,
    wins:row.wins,losses:row.losses,matches:row.matches||[],quality:row.quality,
    impact:{xp:row.xp,initialFatigue:row.initialFatigue,fatigue:row.fatigue,adapted:row.adapted,learned:row.learned}});
  }
 }
 return [...byId.values()];
}
function characterActivity15(activity){
 const impact=activity.impact||{};
 const fatigue=Number.isFinite(impact.initialFatigue)&&Number.isFinite(impact.fatigue)?impact.fatigue-impact.initialFatigue:undefined;
 const deltas=[['XP',impact.xp],['Fatiga',fatigue],['Confianza',impact.trust],['Adaptación al mazo',impact.adapted],['Conocimiento del club',impact.learned],['Moral del equipo',activity.morale]];
 const changes=deltas.filter(([,n])=>Number.isFinite(n)&&n!==0);
 const outcomes=[];
 if(activity.place===1)outcomes.push('Ganó el torneo');
 else if(activity.place)outcomes.push('Terminó en el puesto #'+activity.place);
 if(fatigue>0)outcomes.push('Terminó la actividad con '+impact.fatigue+'/12 de fatiga');
 if(impact.adapted>0)outcomes.push('Quedó con menos adaptación pendiente');
 if(impact.trust>0)outcomes.push('Terminó con más confianza en su mazo');
 if(activity.online&&Number.isFinite(activity.quality))outcomes.push('Calidad de testeo: '+Math.round(activity.quality)+'/100');
 const rounds=activity.matches.map((m,i)=>{
  const label=m.label||(activity.online?'P':'R')+(m.round??i+1);
  const result=m.opponent==='Bye'?'Pase libre':m.won?'Victoria':'Derrota';
  return `<li class="character-round15 ${m.won?'round-won15':'round-lost15'}"><span aria-hidden="true">${m.won?'✓':'✕'}</span><strong>${esc(label)}</strong><small>${result}</small>${m.opponent&&m.opponent!=='Bye'?`<span class="round-opponent15">${esc(m.opponent)}</span>`:''}</li>`;
 }).join('');
 const chips=(items)=>`<ul class="character-chips15">${items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`;
 const impactText=changes.length?chips(changes.map(([label,n])=>label+' '+signedNumber(n))):`<p>${activity.impact?'Sin cambios registrados en los indicadores disponibles.':'Sin desglose individual guardado para esta actividad.'}</p>`;
 return `<section class="character-activity15 ${activity.online?'character-online15':''}"><header><div><h4>${icon15(activity.online?'darkbook':'torneos')} ${esc(activity.title)}</h4><p>${esc(activity.context)}</p></div><strong>${activity.wins??0} V · ${activity.losses??0} D${activity.online?'':' en suizo'}</strong></header>
 ${rounds?`<ol class="character-rounds15" aria-label="${activity.online?'Partidas':'Rondas'}">${rounds}</ol>`:'<p>Sin detalle de rondas guardado.</p>'}
 <div class="character-effects15"><div><h5>¿Cómo lo afectó?</h5>${impactText}</div><div><h5>¿En qué desembocó?</h5>${outcomes.length?chips(outcomes):'<p>Sin desenlace adicional registrado.</p>'}</div></div></section>`;
}
function characterCards15(characters){
 return characters.length? `<div class="character-reports15">${characters.map(({id,role,mood,xp,fatigue,activities})=>{
  const p=getP(id);
  if(!p)return '';
  return `<article class="character-report15"><header class="character-report-identity15">${avatar(p)}<div><h3>${esc(p.name)}</h3><p>${esc(p.alias)}</p><div class="character-facts15">${[role,mood?'Ánimo: '+mood:'',fatigue?'Fatiga '+fatigue[1]+'/12':'',Number.isFinite(xp)?signedNumber(xp)+' XP semanal':''].filter(Boolean).map(text=>`<span>${esc(text)}</span>`).join('')}</div></div></header>
   <div class="character-activities15">${activities.length?activities.map(characterActivity15).join(''):'<p>Sin participación competitiva esta semana.</p>'}</div></article>`;
 }).join('')}</div>`:'<p>Sin desglose individual en este informe.</p>';
}
function reportView(){
 const r=state.report;
 if(!r)return '<section class="panel">Todavía no hay informe semanal.</section>';
 const ownEvents=(r.events||[]).filter(e=>e.ids?.length);
 const online=(r.online||[]).some(e=>e.rows?.length);
 const circuit=(r.events||[]).filter(e=>!e.ids?.length&&isFeaturedEvent(e));
 const highlights=[...(r.headlines||[])].sort((a,b)=>b.importance-a.importance).slice(0,3);
 const old=r.before,newState=r.after;
 const metrics=[['◈','Balance económico',currency(r.credits),r.credits],['🏆','Puntos competitivos',signedNumber(r.points),r.points],['✦','Experiencia total',signedNumber(r.xp)+' XP',r.xp]];
 const progress=old&&newState?`<div class="report-progress">
 ${reportBar('Preparación',newState.prep,12,newState.prep-old.prep)}${reportBar('Sinergia',newState.synergy,12,newState.synergy-old.synergy)}
 ${reportBar('Moral (escala −2 a +2)',newState.morale+2,4,newState.morale-old.morale)}
 <div class="mini"><h3>Conocimiento del meta</h3>${styles.map((s,i)=>reportBar(s,newState.meta[i],100,newState.meta[i]-old.meta[i])).join('')}</div>
 <div class="mini"><h3>Reputación</h3>${Object.entries(venues).map(([id,name])=>reportBar(name,newState.rep[id]||0,100,(newState.rep[id]||0)-(old.rep[id]||0))).join('')}</div>
 <div class="mini"><h3>Relaciones</h3>${teams.filter(t=>t.id!==state.team&&(newState.relations[t.id]!==old.relations[t.id]||newState.relations[t.id]>0)).sort((a,b)=>Math.abs(newState.relations[b.id]-old.relations[b.id])-Math.abs(newState.relations[a.id]-old.relations[a.id])).slice(0,3).map(t=>reportBar(t.name,newState.relations[t.id],100,newState.relations[t.id]-old.relations[t.id])).join('')||'<p>Sin vínculos activos esta semana.</p>'}</div></div>`:'<p>Este informe es anterior al seguimiento visual. Abrí las estadísticas completas para revisar sus cambios.</p>';
 return `<article class="weekly-report"><section class="panel" id="report-characters"><h2>Informe · Semana ${r.week}</h2><h3>Rendimiento del plantel</h3>${characterCards15(characterResults15(r))}</section><section class="panel"><h2>Balance del equipo</h2><div class="grid three report-kpis">${metrics.map(([icon,label,value,n])=>`<div class="mini"><span aria-hidden="true">${icon}</span><small>${label}</small><strong class="${n>0?'report-up':n<0?'report-down':''}">${value}</strong></div>`).join('')}</div><p>${esc(r.activity)}</p>${financeReport(r.finance)}
 ${r.activityDetails?`<p class="small">Plantel: ${esc(r.activityDetails.participants.join(', '))}${r.activityDetails.accepted.length?' · Invitados: '+esc(r.activityDetails.accepted.join(', ')):''}${r.activityDetails.declined.length?' · Rechazaron: '+esc(r.activityDetails.declined.join(', ')):''}</p>`:''}</section>
 <section class="panel" id="report-tournaments"><h2>Resultados de torneos</h2>${r.special?`<p class="notice">Fecha especial · ${esc(r.special)}.</p>`:''}${ownEvents.map(e=>`<details class="result"><summary>${eventBadges(e)}<strong>${esc(e.name)}</strong></summary><p>${competitionImpact(e)}</p>${tournamentDetails(e)}</details>`).join('')}${!ownEvents.length&&!online?'<p>El plantel no disputó torneos esta semana.</p>':''}
 ${circuit.length?`<details><summary>Resultados destacados del circuito</summary>${circuit.map(competitionRecord).join('')}</details>`:''}${r.announcements?.length?`<h3>Anuncios del circuito</h3>${eventRows(r.announcements)}`:''}</section>

 <section class="panel"><h2>Progreso del equipo</h2>${progress}</section>
 <section class="panel"><h2>Noticias destacadas</h2>${highlights.map(a=>`<details class="news"><summary><span class="tag">${esc(a.category)} · ${esc(a.date)}</span><strong>${esc(a.title)}</strong></summary><p>${esc(a.intro)}</p><button class="btn ghost" data-tab="noticias">Leer en Circuit News</button></details>`).join('')||'<p>Sin titulares destacados.</p>'}</section>
 <details class="panel"><summary>Ver estadísticas completas</summary>
 ${r.expenses!==undefined?`<p>Ingresos ${currency(r.credits+r.expenses)} · Gastos ${currency(r.expenses)}${r.sources?` · Torneos ${currency(r.sources.prizes)} · Ingresos operativos ${currency(r.sources.operating)} · Fichajes ${currency(r.sources.contracts)} · Acción ${currency(r.sources.activity)}`:''}</p>`:''}
 ${(r.impact||[]).map(n=>`<div class="small">${esc(n)}</div>`).join('')}${(r.news||[]).map(n=>`<p class="small">${esc(n)}</p>`).join('')}
 ${(state.reportArchive||[]).slice(-12).reverse().map(w=>`<details><summary>Semana ${w.week} · ${currency(w.credits)} · ${signedNumber(w.points)} pts · ${signedNumber(w.xp)} XP</summary>${w.impact.map(n=>`<div class="small">${esc(n)}</div>`).join('')}${w.characterResults?.length?characterCards15(w.characterResults):''}${(w.events||[]).map(competitionRecord).join('')}${w.announcements?.length?eventRows(w.announcements):''}</details>`).join('')}</details>
 <button class="btn" data-tab="inicio">Volver al panel</button> <button class="btn ghost" data-tab="accion">Acción semanal</button></article>`;
}

function closeCareerWeek(confirmed=false){
 if(tutorialPending(state).length){notify('Completá: '+tutorialPending(state).join(', '));return;}
 if(upgrade(state).active){notify('Terminá la conversación antes de avanzar.');return;}
 if(!modernCareer()&&upgrade(state).pending){if(!confirm('Hay una conversación contextual pendiente. ¿Avanzar sin iniciarla?'))return;upgrade(state).pending=null;}
 if(!confirmed&&!state.weekly&&!confirm('Queda la acción semanal sin utilizar. ¿Querés continuar igual?'))return;
 if(!confirmed&&!Object.values(state.entries).some(ids=>ids.length)&&!Object.values(competitionState(state).days).some(n=>n>0)&&!confirm('No inscribiste al equipo en torneos. ¿Finalizar sin competir?'))return;
 if(state.finished||state.resolvedWeek===state.week||(!confirmed&&!confirm('¿Finalizar la semana y resolver las inscripciones?')))return;
 startRankingWeek(state);
 const {week,credits,score}=state, xp=own().reduce((n,p)=>n+(state.xp[p.id]||0),0);
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
  if(type==='rest')activityDetails.recovery=restTeam(state);
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
   if(type==='rest')continue;
   const gain=type==='link'?5:20+boost+(abilities[p.id-1].trainXP||0)+(pro?.[7]||0);
   if(type!=='link'){practice(state.circuit,p.id,pro?.[6]??(10+accepted.length));discover(state,p.id,2);state.circuit.decks[p.id].trust=clamp(state.circuit.decks[p.id].trust+2);}
   state.xp[p.id]=(state.xp[p.id]||0)+gain*fatigueRules(before.fatigue[p.id]||0).xp;
   if(type==='team'||prof==='coach')state.fatigue[p.id]=Math.max(0,(state.fatigue[p.id]||0)-2);
  }
 }
 const announcements=upcoming().filter(event=>event.week>week);
 const used={},days={},plan=weekendPlan();
 for(const event of new Map(plan.events.map(e=>[e.key,e])).values()){
  const registered=(mayEnter(event)?state.entries[event.key]||[]:[]).filter(id=>state.owned[id]===state.team&&(used[id]||0)<cap(state,id)&&!days[id]?.includes(event.day));
  const beforeRep={...state.circuit.reputation};
  const result=runCircuitEvent(event,event.type==='team'&&registered.length!==3?[]:registered,used,days);
  result.reputation=Object.entries(state.circuit.reputation).flatMap(([id,value])=>{
   const delta=value-(beforeRep[id]||0);
   return delta?[{venue:venues[id]||id,delta}]:[];
  });
  results.push(result);
 }
 state.suspensions??=[];
 if(plan.special)state.suspensions.push({week,event:plan.special.name,events:[...plan.suspended.map(e=>e.name+' · '+(venues[e.venue]||'Circuito oficial')),'Dark Book']});
 const online=resolveOnline(used);
 weeklyBelonging(state,used);
 const present=state.weekly?.type==='team'?own().map(p=>p.id):state.weekly?.type==='test'?[...own().map(p=>p.id),...(activityDetails?.accepted||[]).map(name=>players.find(p=>p.name===name)?.id).filter(Boolean)]:results.flatMap(e=>e.ids||[]);
 if(!modernCareer())queueContext(state,present);
 const featured=publishCharacterNews(state,{events:results});
 if(state.organization?.id==='haru'&&online.some(e=>e.rows.length))learn(state.circuit,state.team,1,2);
 const headlines=publish(state,{major:plan.special?{...results[0],result:results[0].name+': '+results[0].standings[0].name+' gana el cuadro. '+results[0].result+'.'}:null,local:results.find(e=>e.level==='local'&&e.ids.length),online,deal:state.circuit.negotiations.filter(n=>n.week===week).map(n=>getP(n.id).name+' '+n.result+'.').join(' '),social:state.weekly?.type==='link'?'Contacto con '+teamName(state.weekly.target):null,practice:state.weekly?activity:null,meta:state.news.find(n=>!prev.has(n)&&n.includes('estrategia poco explorada')),upcoming:upcoming().find(e=>e.week>week)?.name});
 for(const p of own())if(!state.active.includes(p.id)&&!used[p.id]&&!onlineStatus(state.circuit,p.id).count&&state.week-state.circuit.decks[p.id].since>=4)state.circuit.decks[p.id].trust=clamp(state.circuit.decks[p.id].trust-1);
 for(const p of players)state.fatigue[p.id]=Math.max(0,(state.fatigue[p.id]||0)-1);
 advanceCircuit(state);
 const acquired=weeklySnapshot();
 const reportPlayers=own().map(p=>{
  const motivation=memberState(state,p.id).motivation;
  return {id:p.id,role:p.id===state.captain?'Capitán':state.active.includes(p.id)?'Titular':'Reserva',
   mood:motivation>=65?'Animado':motivation<40?'Bajo':'Estable',
   xp:(acquired.xp[p.id]||0)-(before.xp[p.id]||0),fatigue:[before.fatigue[p.id]||0,acquired.fatigue[p.id]||0],
   morale:acquired.morale-before.morale,prep:acquired.prep-before.prep};
 });
 state.offerHistory.push({week,offers:state.offers.map(o=>({...o,status:o.status==='open'?'expired':o.status}))});
 state.resolvedWeek=week;
 const creditsBeforeIncome=state.credits;
 const economy=settleEconomy(state,week);
 reviewCommitment(state);
 if(week===1)rivalRecruit(state);
 if(week<52)nextWeek(true);else state.finished=true;
 const operating=economy[state.team].income;
 const finance=settleFinance(state,week,results,teams.map(t=>t.id));
 if(week<52){rivalRecruit(state);qualify(state);}
 state.offers=state.finished||!modernCareer()?[]:offers(state);
 state.entries={};state.weekly=null;
 state.reportArchive??=[];
 if(state.report)state.reportArchive.push({week:state.report.week,credits:state.report.credits,points:state.report.points,xp:state.report.xp,impact:state.report.impact||[],announcements:state.report.announcements,events:state.report.events?.filter(isFeaturedEvent).map(archiveCompetition),characterResults:characterResults15(state.report).filter(p=>p.activities.length)});
 state.report={week,featured:featured?.id,before,after:acquired,players:reportPlayers,finance,economy:economy[state.team],social:upgrade(state).history.filter(h=>h.week===week&&h.club===state.team),expenses:expenses+contractCosts+(finance?.paid||0)+economy[state.team].paid,sources:{prizes:results.reduce((n,e)=>n+e.prize,0),operating,contracts:contractCosts,activity:expenses},credits:state.credits-credits-contractCosts,points:state.score-score,xp:own().reduce((n,p)=>n+(state.xp[p.id]||0),0)-xp,activity,activityDetails,headlines,special:plan.special?.name,suspended:plan.suspended.length,events:results,announcements,online,impact:weeklyImpact(before,acquired),news:state.news.filter(n=>!prev.has(n)).slice(-6)};
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
  const week=state.week;
  const label=coach?.[0]||activities[type][0];
  confirm15('Confirmar acción semanal',label+' · '+currency(cost),'Confirmar acción',()=>{
   if(state.week!==week||state.weekly||state.credits<cost)return;
   state.weekly={type,target,prof,invitees,cost,label};
   render();
  });
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
  upgrade(state).tutorial.tournaments=true;render();notify('Inscripción confirmada');return true;
 }
 case 'finishWeek':closeCareerWeek();return true;
 }
 return false;
}


globalThis.addEventListener?.('change',e=>{if(e.target.id==='haru-starter'){const id=Number(e.target.value);opening.recruit=haruRecruits.some(p=>p.id===id)?id:null;if(!openingRosterIds().includes(opening.captain))opening.captain=opening.recruit;render();$('#haru-starter')?.focus();return;}const key=e.target.dataset?.encyclopedia;if(key){encyclopediaFilter[key]=e.target.value;render();}});
function negotiate(id,direct){
 const p=getP(id),gate=p&&recruitmentGate(state,p);
 if(!gate?.ok){notify(gate?.reason||'Candidato no disponible');return true;}
 if(!canSign(state)||own().length>=5){notify('No hay cupo de contratación.');return true;}
 return beginPersonal(id,'recruit',direct);
}
function beginPersonalOld(id,mode='social',type='amable'){
 if(startConversation(state,id,type,mode)){document.querySelectorAll?.('.dialogback').forEach(el=>el.remove());tab='relaciones';render();}
 else notify('Esta conversación no está disponible. Las entrevistas se retoman tras dos semanas.');
 return true;
}
function personalSkills(id){return characterAbilities(getP(id),profileFor(id,localStorage),knowledge(state,id));}
function socialView(){
 if(upgrade(state).active)return legacySocialView();
 if(upgrade(state).dailyDraft)return dailyView();
 if(update15(state).interview)return interviewPage15();
 return socialPage15();
}
function legacySocialView(){
 const a=upgrade(state).active;
 if(!a)return `<section class="panel"><h1>Conversaciones</h1><p>Podés hablar una vez por semana con alguien de tu plantel desde su ficha. Los encuentros especiales surgen de actividades, hechos de la semana o entrevistas.</p>${upgrade(state).pending?'<button class="btn gold-button" data-action="contextStart">Continuar el encuentro pendiente</button>':''}<button class="btn" data-tab="inicio">Ver equipo</button></section>`;
 const e=personalEvents.find(e=>e.id===a.event),p=getP(a.character),step=e.stages[a.stage],r=a.result;
 const skills=personalSkills(p.id);
 const quote=['foundation','haru'].includes(a.mode)?{price:0}:offerQuote(state,[p.id]);
 const current=maintenance(own().length),next=maintenance(own().length+(a.mode==='haru'?0:1)),gate=recruitmentGate(state,p);
 const reserve=state.weekly?.cost||0;
 const canBuy=r?.passed&&gate.ok&&canSign(state)&&own().length<5&&state.credits>=quote.price+reserve;
 return `<section class="conversation"><header class="conversation-portrait">${avatar(p)}<h1>${esc(p.name)}</h1><p>${esc(p.alias)}</p><span class="tag">Etapa ${Math.min(3,a.answers.length+Number(!r))}/3</span></header><div class="conversation-body"><h2>${esc(e.title)}</h2><p class="muted">${esc(e.situation)}</p>${['recruit','foundation','haru'].includes(a.mode)?`<p>Entrevista · Mazo favorito: ${esc(styleNames[p.style])}. ${esc(profileFor(p.id,localStorage).public.split(/(?<=\.)\s+/)[0])}</p>`:''}
 ${r?`<div class="notice ${r.passed?'report-up':'report-down'}"><h2>${r.passed?'Conversación superada':'Sin acuerdo'}</h2><p>${esc(r.text)}</p><p>${r.score}/3 aciertos · Relación ${signedNumber(r.relation)} · Confianza ${signedNumber(r.trust)} · Moral ${signedNumber(r.morale||0)} · Motivación ${signedNumber(r.motivation||0)} · Pertenencia ${signedNumber(r.belonging||0)} · Sinergia ${signedNumber(r.synergy||0)}</p></div>`:a.feedback?`<p class="dialogue-feedback" role="status">${esc(a.feedback)}</p><button class="btn" data-action="personalContinue">Continuar →</button>`:`<p class="dialogue-text">${esc(step.text)}</p><div class="dialogue-options">${step.options.map((text,i)=>`<button class="btn secondary" data-action="personalAnswer" data-id="${i}">${esc(text)}</button>`).join('')}</div>`}
 ${r?`<div class="ability-groups">${[['positive','Ventajas de ficharlo'],['negative','Desventajas de ficharlo']].map(([type,title])=>`<section><h3>${title}</h3>${skills.filter(s=>s.type===type).map(abilityCard).join('')}</section>`).join('')}</div>${['recruit','foundation','haru'].includes(a.mode)?`<div class="grid"><div class="mini">Precio<strong>${currency(quote.price)}</strong></div><div class="mini">Mantenimiento adicional<strong>${currency(next-current)}/semana</strong></div><div class="mini">Presupuesto<strong>${currency(state.credits)}</strong></div><div class="mini">Después del fichaje<strong>${currency(state.credits-quote.price)}</strong></div><div class="mini">Balance operativo proyectado<strong>${currency(weeklyIncome[state.team]-next-(financeState(state).activeSince!==null?financeRules.administration+(state.team==='haru'?8:['sekai','dima','lair'].includes(state.team)?12:0):0))}/semana</strong><small>Sin premios, multas ni actividades pagas.</small></div></div><p>${a.mode==='foundation'||a.mode==='haru'?'La oportunidad inicial sigue disponible. El resultado de la charla determina el vínculo y la confianza.':r.passed?esc(gate.reason):'El candidato rechaza esta propuesta. Podrás volver a hablar tras dos semanas.'}</p><button class="btn" data-action="personalSign" ${a.mode==='haru'||(a.mode==='foundation'?needsFoundation(state):canBuy)?'':'disabled'}>ACEPTAR INCORPORACIÓN</button> <button class="btn ghost" data-action="personalClose">RECHAZAR OFERTA</button>`:'<button class="btn" data-action="personalClose">Terminar conversación</button>'}`:''}</div></section>`;
}
function foundationView(){
 if(!needsFoundation(state))return '';
 return `<section class="panel"><h2>Incorporación fundacional gratuita</h2><p>Elegí el segundo duelista y completá su entrevista. No consume tu primer contrato pago. Se priorizan agentes libres de 1–2 estrellas; si se agotan, se amplía al siguiente nivel hasta 3 estrellas.</p><div class="card-grid">${foundationCandidates(state).map(p=>`<article class="duel-card">${card(p)}<button class="btn" data-action="foundation" data-id="${p.id}" ${availableEvents(state,p.id).length?'':'disabled'}>Entrevistar · Gratis</button></article>`).join('')}</div></section>`;
}
function guidePanelOld14(){
 if(state.week!==1||!state.started||!state.organization)return '';
 const notes={inicio:['Tu organización','Conocé el presupuesto y el plantel. Los ingresos llegan al cerrar cada semana; el mantenimiento crece con cada integrante.'],meta:['Leer el metajuego','Las dos ruedas explican los enfrentamientos. Investigá qué estilos aparecen antes de decidir el testeo; un mazo fuerte también necesita preparación y un piloto que lo conozca.'],noticias:['Leer el circuito','Las noticias reúnen resultados y cambios observados. Usalas para planificar. Las habilidades todavía desconocidas no se revelan aquí.'],plantel:['Dirigir al plantel','El capitán multiplica puntos y los suplentes también aportan. Revisá fatiga, confianza y habilidades descubiertas antes de elegir quién compite.'],accion:['Una decisión semanal','Elegí una sola actividad: testeo, juntada, vínculos, profesional o descanso. La reserva se ejecuta al cerrar la semana; no necesitás realizar las otras alternativas.'],mercado:['Construir el equipo','Toda incorporación pasa por una entrevista. Revisá precio y mantenimiento. Si empezaste con un integrante, elegí la incorporación fundacional antes de avanzar.'],relaciones:['Conocer a las personas','Elegí respuestas según lo que plantea cada personaje. Los vínculos mejoran confianza y acuerdos sobre mazos. Tras hablar habrá dos semanas de espera; no se puede repetir para memorizar.'],torneos:['Elegir dónde competir','Confirmá inscripciones compatibles con la fatiga o decidí explícitamente no competir. Los eventos mayores suspenden Dark Book y los locales. No necesitás competir en todas las fechas.']};
 const note=notes[tab],seen=upgrade(state).tutorial.explained||[];
 if(!note||seen.includes(tab))return '';
 return `<aside class="mili-spotlight" role="dialog" aria-label="Guía de Mili"><div class="mili-lesson">${mili('explain')}<div><span class="tag gold">MILI · PRIMERA SEMANA</span><h2>${note[0]}</h2><p>${note[1]}</p><button class="btn gold-button" data-action="previewGuide">Entendido · Continuar</button></div></div></aside>`;
}
function enhancePreviewOld(){
 if(!state.started||!document.querySelectorAll)return;
 const main=document.querySelector('main.content');if(!main)return;
 document.querySelector('.tabs')?.insertAdjacentHTML('beforeend','<button data-tab="relaciones">Relaciones</button>');
 if(tab==='relaciones'){main.innerHTML=guidePanel()+socialView();}
 if(upgrade(state).active&&tab!=='relaciones')main.insertAdjacentHTML('afterbegin','<button class="btn" data-tab="relaciones">Retomar conversación guardada</button>');
 if(tab==='mercado'){main.insertAdjacentHTML('afterbegin',foundationView());if(state.organization?.id==='haru'&&state.organization.freeSigning&&!upgrade(state).haruInterview)main.insertAdjacentHTML('afterbegin','<section class="panel"><h2>Entrevista inicial de Haru</h2><p>Completá la conversación con el duelista que elegiste. Conservás la incorporación gratuita.</p><button class="btn" data-action="haruInterview">Conversar con tu incorporación</button></section>');}
 if(tab==='inicio'){
  const button=document.querySelector('[data-action="finishWeek"]');document.querySelector('.team-banner>div')?.appendChild(button);
  document.querySelector('.tutorial')?.remove();
  main.insertAdjacentHTML('beforeend',`<section class="panel"><h2>Preparación de la semana</h2><p>${state.week===1?'Pendiente: '+(tutorialPending(state).join(', ')||'Todo listo para finalizar.'):'Podés cerrar la semana aun con actividades pendientes, después de confirmarlo.'}</p><p>Ingresos ${currency(weeklyIncome[state.team])} · Mantenimiento ${currency(maintenance(own().length))}</p><button class="btn" data-tab="relaciones">Conversar con un personaje</button>${needsFoundation(state)?'<button class="btn" data-tab="mercado">Elegir segundo integrante</button>':state.organization?.id==='haru'&&!upgrade(state).haruInterview?'<button class="btn" data-tab="mercado">Completar entrevista inicial</button>':''}</section>`);
 }
 if(tab==='accion'&&!state.weekly)main.insertAdjacentHTML('beforeend',`<section class="panel"><h2>Descanso</h2><p>Consume la acción semanal. Recuperación individual al resolver la semana:</p>${own().map(p=>`<p>${esc(p.name)}: fatiga ${state.fatigue[p.id]||0} → ${Math.max(0,(state.fatigue[p.id]||0)-restRecovery(p))}/12</p>`).join('')}<button class="btn" data-action="chooseActivity" data-type="rest">Confirmar descanso</button></section>`);
 if(tab==='torneos')main.insertAdjacentHTML('beforeend','<button class="btn secondary" data-action="skipTournaments">Decidir no participar esta semana</button>');
 if(tab==='darkbook')main.insertAdjacentHTML('afterbegin',`<section class="panel"><h2>Resistencia individual</h2>${own().map(p=>`<p>${esc(p.name)}: ${knowledge(state,p.id)===3?onlineResistance(p)+' de las 4 fechas sin fatiga online.':'Resistencia por descubrir. Observá su fatiga en los informes.'}</p>`).join('')}<p>Al superar el límite: +2 de fatiga por la primera fecha adicional y +4 por la segunda. La fatiga reduce el rendimiento.</p></section>`);
 if(['meta','noticias','accion','plantel','mercado','torneos'].includes(tab))main.insertAdjacentHTML('beforeend',`<div class="actions next-steps">${(tab==='meta'?[['accion','Realizar acción semanal'],['noticias','Ver noticias']]:tab==='noticias'?[['torneos','Ver torneos'],['accion','Realizar acción semanal']]:[['torneos','Ir a torneos'],['plantel','Ver plantel'],['relaciones','Relaciones'],['inicio','Volver al equipo']]).filter(([key])=>key!==tab).map(([key,label])=>`<button class="btn secondary" data-tab="${key}">${label}</button>`).join('')}</div>`);
 if(tab==='informe'&&state.report?.economy){const r=state.report;main.insertAdjacentHTML('afterbegin',`<section class="panel"><h2>Economía de la semana</h2><div class="grid"><div class="mini">Ingresos pasivos<strong>+${currency(r.economy.income)}</strong></div><div class="mini">Mantenimiento pagado<strong>−${currency(r.economy.paid)}</strong></div><div class="mini">Fichajes<strong>−${currency(r.sources.contracts)}</strong></div></div>${r.economy.debt?`<p>Deuda de mantenimiento: ${currency(r.economy.debt)}</p>`:''}<details><summary>Relaciones personales</summary>${(r.social||[]).map(h=>`<p>${esc(getP(h.character).name)} · Relación ${signedNumber(h.relation)} · Confianza ${signedNumber(h.trust)}</p>`).join('')||'<p>Sin conversaciones esta semana.</p>'}</details>${r.activityDetails?.recovery?`<details open><summary>Recuperación por descanso</summary>${r.activityDetails.recovery.map(p=>`<p>${esc(getP(p.id).name)}: ${p.before} → ${p.after}/12</p>`).join('')}</details>`:''}</section>`);}
}
function previewAction(action,id,btn){
 if(!['previewGuide','skipTutorial','personal','foundation','haruInterview','personalAnswer','personalContinue','personalClose','personalSign','skipTournaments'].includes(action))return false;
 const x=upgrade(state);
 switch(action){
 case 'previewGuide':x.tutorial.explained??=[];x.tutorial.explained.push(tab);if(!x.tutorial.seen.includes(tab))x.tutorial.seen.push(tab);render();return true;
 case 'skipTutorial':if(state.week===1){notify('Completá los pasos fundamentales de la primera semana.');return true;}return false;
 case 'personal':notify('Los eventos especiales se abren por contexto o entrevista.');return true;
 case 'foundation':return beginPersonal(id,'foundation');
 case 'haruInterview':return beginPersonal(state.organization.freeSigning,'haru');
 case 'personalAnswer':answerConversation(state,id);render();return true;
 case 'personalContinue':continueConversation(state);render();return true;
 case 'personalClose':if(x.active?.result){x.active=null;tab='mercado';render();}return true;
 case 'personalSign':{
  const a=x.active;if(!a?.result||!a.result.passed&&!['foundation','haru'].includes(a.mode))return true;
  let ok=false;
  if(a.mode==='haru'){x.haruInterview=true;ok=true;}
  else if(a.mode==='foundation')ok=signFoundation(state,a.character);
  else if(a.mode==='recruit'){
   const saved=state.offers;state.offers=[{id:a.character,ids:[a.character],status:'open',...offerQuote(state,[a.character])}];
   try{ok=recruit(state,a.character,currentFormat())==='se incorporó al equipo';}finally{state.offers=saved;}
   if(ok){const o=saved.find(o=>o.id===a.character);if(o)o.status='signed';state.circuit.decks[a.character].trust=clamp(50+relation(state,a.character)*.2);}
  }
  if(ok){state.news.push(getP(a.character).name+' se incorporó al equipo.');x.active=null;tab='plantel';render();notify('Fichaje confirmado.');}else notify('La operación ya no cumple las condiciones.');return true;
 }
 case 'skipTournaments':state.entries={};state.circuit.bookEntries={};competitionState(state).days={};x.tutorial.tournaments=true;render();notify('Decisión guardada: esta semana no competirás.');return true;
 }
 return false;
}


function migrate14(){
 const x=upgrade(state);if(x.migration14)return;
 x.tutorial.introStep??=6;
 x.tutorial.reportStep??=state.week>2?5:0;
 const c=competitionState(state);
 for(const p of players){memberState(state,p.id);state.fatigue[p.id]=Math.min(12,Math.max(0,state.fatigue[p.id]||0));
  if(c.days[p.id]===undefined)c.days[p.id]=Math.min(dbLimit(p),Object.values(state.circuit.bookEntries||{}).filter(ids=>ids.includes(p.id)).length);
 }
 x.migration14=true;
}
function primaryTabs(){return [['plantel','EQUIPO'],['meta','META'],['noticias','NOTICIAS'],['accion','ACCIONES'],['mercado','FICHAJES'],['torneos','TORNEOS']];}
function creditCoin15(){
 return '<svg class="credit-coin15" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14" fill="#b88132" stroke="#ffe2a0" stroke-width="1.5"/><circle cx="16" cy="16" r="11" fill="#e5b55b" stroke="#8a531d"/><path d="M16 7l6 8-6 9-6-9z" fill="#fff0b1" stroke="#9c6328"/><path d="M6 15a10 10 0 0 1 9-9m3 20a10 10 0 0 0 8-8" fill="none" stroke="#fff2b4" stroke-linecap="round"/></svg>';
}
function walletBadge15(){
 return `${creditCoin15()}<span>Créditos <strong>${currency(state.credits)}</strong></span>`;
}
function ordinaryBudget15(size=own().length){
 const income=weeklyIncome[state.team]||0, upkeep=maintenance(size), f=financeState(state);
 const fees=f.activeSince!==null&&state.week>=f.activeSince?costs(state.team,size):null;
 const ordinaryFees=fees?fees.administration+fees.shop+(state.social?0:fees.maintenance+fees.roster):0;
 return {income,upkeep,ordinaryFees,net:income-upkeep-ordinaryFees};
}
function walletDetails15(){
 const budget=ordinaryBudget15(),f=financeState(state);
 const last=Object.entries(upgrade(state).economy).filter(([week,clubs])=>Number(week)<state.week&&clubs[state.team]).at(-1);
 const daily=n=>n.toLocaleString('es-AR',{minimumFractionDigits:2,maximumFractionDigits:2})+' CR/día';
 const planned=state.weekly?.cost||0;
 const debt=(f.clubs[state.team]?.debt||0)+(state.social?.debt?.[state.team]||0);
 const lines=[
  ['Créditos actuales',currency(state.credits)],
  ['Ingreso bruto semanal previsto',currency(budget.income)],
  ['Ingreso bruto equivalente por día',daily(budget.income/7)],
  ['Mantenimiento del plantel',currency(budget.upkeep)],
  ...(budget.ordinaryFees?[['Otros cargos ordinarios',currency(budget.ordinaryFees)]]:[]),
  ['Balance ordinario previsto',currency(budget.net)],
  ['Balance ordinario equivalente por día',daily(budget.net/7)],
  ...(planned?[['Gasto extraordinario confirmado',currency(planned)]]:[]),
  ...(debt?[['Deuda registrada',currency(debt)]]:[]),
  ...(last?[['Ingreso acreditado · Semana '+last[0],currency(last[1][state.team].income)]]:[])
 ];
 return `<dl class="wallet-ledger15">${lines.map(([label,value])=>`<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>`;
}
function header(){
 const parent={archivo:'inicio',enciclopedia:'inicio',relaciones:'inicio',darkbook:'torneos',liga:'torneos',rankings:'torneos',informe:'inicio'}[tab]||tab;
 return `<div class="career-top15"><header class="top"><div><div class="logo">DUEL <span>CIRCUIT</span></div><div class="sub">BETA 2.0 · ${state.started?esc(teamName(state.team))+' · Semana '+state.week:'Temporada 2027'}</div></div><div class="header-tools15">${state.started?`<button class="btn ghost" data-tab="inicio">Inicio</button><button class="btn ghost" data-tab="archivo">Ajustes</button><button class="wallet-button15" data-action="wallet15" aria-label="Créditos: ${currency(state.credits)}. Ver presupuesto">${walletBadge15()}</button>`:''}</div></header>${state.started?`<nav class="tabs primary-six" aria-label="Secciones principales">${primaryTabs().map(([key,label])=>`<button data-tab="${key}" class="${parent===key?'active':''}" aria-current="${parent===key?'page':'false'}">${icon15(key)} ${label}</button>`).join('')}<button class="nav-finish15" data-action="finishWeek" data-week="${state.week}"><span aria-hidden="true">➜</span><span>Finalizar semana<small>${preparation15().size}/6 actividades</small></span></button></nav>`:''}</div>`;
}
function contextualButtons(){
 const choices={inicio:[['accion','Elegir acción'],['torneos','Ir a torneos'],['archivo','Partida y ajustes']],meta:[['noticias','Ver noticias'],['accion','Realizar acción semanal']],noticias:[['accion','Ir a acciones'],['torneos','Ver torneos']],accion:[['mercado','Ir a fichajes'],['torneos','Ver torneos']],mercado:[['inicio','Ver equipo'],['torneos','Ir a torneos']],torneos:[['inicio','Ver equipo'],['rankings','Consultar rankings'],['liga','Calendario y clasificación']],darkbook:[['torneos','Torneos presenciales'],['rankings','Ver rankings']],rankings:[['torneos','Ir a torneos'],['inicio','Ver equipo']],informe:[['inicio','Ver equipo'],['noticias','Noticias completas']]};
 return `<div class="context-gold">${(choices[tab]||[['inicio','Ver equipo']]).map(([key,text])=>`<button class="btn gold-button" data-tab="${key}">${text}</button>`).join('')}</div>`;
}
function squad(){
 const slots=lineupSlots(state,own().map(p=>p.id)),order=[3,0,1,2,4];
 return `<section class="panel roster14" id="team-roster"><h2>Plantel · ${own().length}/5</h2><div class="formation-five">${order.map((slot,pos)=>{
 const p=getP(slots[slot]),role=pos===2?'Capitán':pos===0||pos===4?'Reserva':'Titular';
 return `<article class="formation-slot position-${pos}"><small class="lineup-role15">${pos===2?icon15('torneos'):''}${role}</small>${p?`<button class="portrait-button" data-detail="${p.id}" aria-label="Ficha de ${esc(p.name)}">${avatar(p)}</button><strong>${esc(p.name)}</strong><span class="stars">${stars(rating(p))}</span><div class="roster-badges15"><span title="${esc(clubState15(p).split(' · ')[1])}">Formato ${affinity(p,currentFormat())}</span><span>${esc(clubState15(p).split(' · ')[2])}</span></div><span><b class="positive-count">+${personalSkills(p.id).filter(a=>a.type==='positive'&&a.visibility==='known').length}</b> / <b class="negative-count">−${personalSkills(p.id).filter(a=>a.type==='negative'&&a.visibility==='known').length}</b></span><small class="fatigue15" data-high="${(state.fatigue[p.id]||0)>=8}">Fatiga ${state.fatigue[p.id]||0}/12</small>`:`<div class="vacancy">${icon15("mercado")} <span>Plaza libre</span></div>`}<button class="btn ghost" data-action="slotOpen14" data-id="${slot}">Cambiar</button></article>`;
 }).join('')}</div><p class="muted small">Los contadores muestran habilidades conocidas. Tocá el retrato para consultar la ficha, hablar o revisar una baja.</p><button class="btn secondary" data-tab="enciclopedia">Enciclopedia de personajes</button></section>`;
}
function dashboard(){return menu15();}
function haruStarterPicker(){return `<section class="panel"><h2>Elegí el primer integrante de Haru</h2><p>Haru no tiene fundador predeterminado. Elegí un agente libre de menos de 4,5 estrellas. Durante la semana 1 entrevistarás al segundo integrante mediante la oportunidad fundacional.</p><div class="selection-grid">${haruRecruits.map(p=>`<article class="duel-card ${opening.recruit===p.id?'selected-candidate':''}">${card(p)}<p>${esc(p.alias)}</p><div class="actions"><button class="btn ghost" data-detail="${p.id}">Ficha</button><button class="btn gold-button" data-action="haruPick14" data-id="${p.id}">${opening.recruit===p.id?'Elegido':'Elegir'}</button></div></article>`).join('')}</div></section>`;}
function guidePanel(){
 if(!state.started)return '';
 const g=upgrade(state).tutorial;

 if(tab==='informe'&&state.report?.week===1&&(g.reportStep??0)<5){const steps=[['Economía','Los ingresos y premios reales se comparan con mantenimiento, actividades, fichajes y obligaciones. El saldo puede bajar aunque el equipo gane.'],['Personajes','La fatiga al comenzar una actividad decide si se gana experiencia. De 4 a 7 no hay XP, pero el rendimiento sigue normal; descansar permite volver a desarrollarse.'],['Torneos','El informe registra posiciones y puntos reales. Los locales tienen su propia liga; Regionales y superiores impulsan la clasificación nacional.'],['Metajuego','La práctica y las partidas revelan información. Preparación y conocimiento ayudan a decidir la siguiente semana.'],['Circuito','La noticia especial, los movimientos de otros equipos y el próximo evento forman parte de la misma temporada. Podés ampliar cada noticia después.']];return lesson14(...steps[g.reportStep??0],'reportNext14');}
 if(tab==='inicio'||update15(state).tutorials.intro?.step<tutorial15.length)return '';
 const notes={inicio:['Equipo','Los cinco lugares conservan su orden: reserva, titular, capitán, titular y reserva. Tocá un retrato para revisar habilidades conocidas y conversar. Finalizar semana comprueba las actividades pendientes.'],meta:['Metajuego','Acá podés ver el formato, las estrategias dominantes y las afinidades de tu plantel. No conocés todo automáticamente: testear y competir revela información. El botón dorado te lleva a Noticias cuando quieras.'],noticias:['Noticias','Este panel guarda los hechos y las historias del circuito. El calendario indica cuándo llega el siguiente torneo importante. Leer un artículo no repite sus efectos. Podés continuar hacia Acciones desde arriba.'],accion:['Acciones semanales','Elegí una sola actividad. testeo: preparación y dominio para el plantel. Juntada: integrantes propios, moral, confianza y sinergia. Vínculos: mejora relación con otro equipo. Profesional: cobra el precio indicado y aporta sus beneficios. Descanso: recupera fatiga individual. La XP solo se recibe si la actividad empieza con fatiga 0–3.'],mercado:['Fichajes','Consultá información pública y costos antes de entrevistar. La entrevista tiene su propio cupo semanal. Podés conocer al candidato y después aceptar o rechazar.'],torneos:['Torneos','Confirmá participantes habilitados o decidí no participar. Los locales tienen tabla propia; Regionales, Nacionales, YCS y Continental aportan puntos según sus resultados. Los eventos mayores suspenden locales y Dark Book. La fatiga afecta el rendimiento recién desde 8.']};
 const note=notes[tab];if(!note||(g.explained||[]).includes(tab))return '';return lesson14(...note,'previewGuide');
}
function lesson14(title,text,action){return `<aside class="mili-context14" aria-label="Guía de Mili"><div class="mili-card14">${mili('explain')}<div><span class="tag gold">MILI</span><h2>${esc(title)}</h2><p>${esc(text)}</p><button class="btn gold-button" data-action="${action}">Entendido · Continuar</button></div></div></aside>`;}
function featuredCard14(article){if(!article)return '';const p=getP(article.character);return `<section class="panel special-news14" id="report-circuit"><span class="tag gold">CIRCUIT NEWS · NOTICIA DESTACADA DE LA SEMANA ${article.week}</span><div class="news-character14">${avatar(p)}<div><small>${esc(p.name)}</small><h2>${esc(article.title)}</h2><p>${esc(article.intro)}</p>${newsIllustration(article)}<details><summary>LEER NOTICIA COMPLETA</summary><p>${esc(article.body)}</p><p class="small muted">Historia ficticia del juego.</p>${article.effects?.length?`<p>${esc(article.effects.join(' '))}</p>`:''}</details></div></div></section>`;}
function dailyView(){const d=upgrade(state).dailyDraft,p=getP(d.id);return `<section class="conversation"><header class="conversation-portrait">${avatar(p)}<h1>${esc(p.name)}</h1></header><div><h2>Charla cotidiana</h2>${d.result?`<p>${esc(d.result.text)}</p><p>Confianza ${signedNumber(d.result.trust)} · Moral ${signedNumber(d.result.morale)} · Pertenencia ${signedNumber(d.result.belonging)} · Motivación ${signedNumber(d.result.motivation)} · Amistad ${signedNumber(friendship(state,p.id))}</p><button class="btn" data-action="dailyClose14">Volver al equipo</button>`:d.topic===undefined?`<p>Una charla por semana, independiente del evento especial.</p><div class="dialogue-options">${dailyTopics.map((t,i)=>`<button class="btn secondary" data-action="dailyTopic14" data-id="${i}">${esc(t[0])}</button>`).join('')}</div><button class="btn ghost" data-action="dailyClose14">Volver</button>`:`<p>${esc(dailyPrompt(state,p.id,d.topic))}</p><div class="dialogue-options">${dailyTopics[d.topic].slice(1).map((text,i)=>`<button class="btn secondary" data-action="dailyAnswer14" data-id="${i}">${esc(text)}</button>`).join('')}</div>`}</div></section>`;}
function beginPersonal(id,mode='recruit',direct=false){
 const data=update15(state);
 if(data.interview){tab='relaciones';render();return true;}
 if(!['recruit','foundation'].includes(mode)||data.interviewWeek===state.week){notify('Ya utilizaste la entrevista de esta semana.');return true;}
 if(needsFoundation(state)&&state.week===1&&mode!=='foundation'){notify('Primero elegí la incorporación fundacional.');return true;}
 upgrade(state).interviewDraft={id,mode,direct};render();return true;
}
function interviewWarning14(){const draft=upgrade(state).interviewDraft;if(!draft)return '';return `<aside class="interview-warning14" role="dialog" aria-modal="true" aria-label="Antes de entrevistar"><section class="panel mili-interview15">${mili('warn')}<div class="mili-interview-copy15"><h2>Elegí antes de empezar</h2><p>¡Ojo! Solo podés entrevistar a un candidato por semana. Cuando empieces consumirás el cupo de entrevista, aunque después rechaces la oferta. Primero conocelo y después decidí si querés incorporarlo.</p><p class="mili-candidate15">${esc(getP(draft.id).name)}</p><div class="actions"><button class="btn gold-button" data-action="interviewStart14">Comenzar entrevista</button><button class="btn ghost" data-action="interviewCancel14">Cancelar sin gastar cupo</button></div></div></section></aside>`;}
function foundationView14(){
 if(!needsFoundation(state))return '';
 const done=upgrade(state).history.some(h=>h.club===state.team&&h.week===state.week&&h.mode==='foundation');
 return `<section class="panel"><h2>Incorporación fundacional · 0 CR</h2><p>El segundo integrante no consume un contrato pago. Se priorizan agentes libres de 1–2 estrellas; si no alcanzan para las ocho organizaciones, se amplía hasta 3, sin duplicarlos.</p>${done?'<p>Ya completaste la única entrevista semanal. Podés aceptar otra alternativa fundacional del mismo programa sin iniciar una segunda conversación. Su información secreta seguirá oculta.</p>':'<p>Tu cupo especial está reservado para esta entrevista. Aunque la charla resulte difícil, la oportunidad fundacional sigue disponible.</p>'}<div class="selection-grid">${foundationCandidates(state).map(p=>`<article class="duel-card">${card(p)}<p>${esc(p.alias)}</p><button class="btn ghost" data-detail="${p.id}">Ficha</button><button class="btn gold-button" data-action="${done?'foundationAlternative14':'foundation'}" data-id="${p.id}">${done?'Aceptar alternativa gratuita':'ENTREVISTAR'}</button></article>`).join('')}</div></section>`;
}
function onlineView(){
 if(!weekendPlan().online)return '<section class="panel"><h1>Dark Book suspendido</h1><p>Esta semana se reserva para el evento principal.</p><button class="btn gold-button" data-tab="torneos">Ver torneo</button></section>';
 const c=competitionState(state);
 return `<section class="panel"><h1>Dark Book · Testeo online semanal</h1><p>Elegí días por integrante. Cada día simula cuatro enfrentamientos y una revisión del mazo; no entrega créditos ni puntos nacionales. Los resultados y la calidad alimentan el ranking online.</p><div class="selection-grid">${own().map(p=>{const f=state.fatigue[p.id]||0;return `<article class="duel-card">${card(p)}<p>${esc(p.alias)}</p><p>Máximo ${dbLimit(p)} días · Hasta ${localLimit(p)} torneos locales</p><p>Fatiga actual ${f}/12 → prevista ${f}/12 (dentro de resistencia). Si competís antes, se usa la fatiga real al empezar.</p><p>${fatigueRules(f).xp?'Puede ganar XP si comienza con fatiga ≤3.':'Con esta fatiga no recibirá XP.'} Revisa adaptación, dominio y conocimiento del formato. Los resultados no se garantizan.</p><label>Días elegidos <select data-db-days="${p.id}">${Array.from({length:dbLimit(p)+1},(_,i)=>`<option value="${i}" ${(c.days[p.id]||0)===i?'selected':''}>${i}</option>`).join('')}</select></label><button class="btn" data-action="dbSave14" data-id="${p.id}">Confirmar días</button><button class="btn ghost" data-detail="${p.id}">Ficha</button></article>`;}).join('')}</div></section>`;
}
function resolveOnline(){
 const rows=resolveTesting(state,weekendPlan().online,(p,q)=>duelChance({power:effectiveRating(p,'book'),style:state.circuit.decks[p.id].style},{power:effectiveRating(q,'book'),style:state.circuit.decks[q.id].style}));
 const ownRows=rows.filter(r=>r.club===state.team);for(const r of ownRows)discover(state,r.id,1);
 return ownRows.length?[{week:state.week,slot:1,rows:ownRows,skipped:[],testing:true}]:[];
}
function rankingView(){return `<section class="panel"><h1>Rankings individuales</h1><p>Nacional: puntos reales de Regionales y superiores; las referencias iniciales ceden a los resultados. Dark Book: 60% victorias/enfrentamientos + 25% calidad media del testeo + 15% especialización. Componentes normalizados de 0 a 100; jugar más días no suma puntuación por sí solo.</p><div class="rankings14">${['national','online'].map(kind=>`<section><h2>TOP 10 ${kind==='national'?'NACIONAL':'DARK BOOK'}</h2>${rankings(state,kind).slice(0,10).map(r=>{const p=getP(r.id);return `<article class="ranking-row14"><b>#${r.place}</b><button data-detail="${p.id}" aria-label="Ficha de ${esc(p.name)}">${avatar(p)}</button><div><strong>${esc(p.name)}</strong><small>${stars(rating(p))} · ${esc(teamName(state.owned[p.id]))}</small><small>${kind==='national'?'Preparación presencial · '+esc(styleNames[p.style]):'Testeo '+dbLimit(p)+' días · '+esc(styleNames[p.style])}</small></div><div><b>${r.score.toFixed(1)}</b><small>${r.change>0?'↑'+r.change:r.change<0?'↓'+Math.abs(r.change):'—'}</small></div></article>`;}).join('')}</section>`).join('')}</div><details><summary>Cálculo de Dark Book</summary><p>Rendimiento: porcentaje observado de victorias. Calidad: media por sesión de 35 + 10 × conocimiento útil obtenido + 5 × adaptación resuelta + 0,15 × preparación de perfil, acotada a 100. Especialización: estrellas ×10 + preparación ×0,25 + pasiva online ×70 + pasiva XP online, acotada a 100. Antes de tener muestras, se usan antecedentes narrativos explícitos; Franco y Manu parten con referencias altas que no son posiciones fijas.</p></details></section>`;}
function enhancePreview(){
 if(!state.started||!document.querySelectorAll)return;
 const main=document.querySelector('main.content');if(!main)return;
 if(!['inicio','plantel'].includes(tab))main.insertAdjacentHTML('afterbegin',contextualButtons());
 if(tab==='mercado')main.insertAdjacentHTML('afterbegin',foundation15());
 if(upgrade(state).active&&tab!=='relaciones')main.insertAdjacentHTML('afterbegin','<button class="btn gold-button" data-tab="relaciones">Retomar conversación guardada</button>');
 if(tab==='plantel')main.insertAdjacentHTML('beforeend',squadAbilities15()+`<button class="btn ghost" data-tab="relaciones">${icon15('heart')} Eventos sociales</button>`);
 if(tab!=='inicio'&&tab!=='relaciones'&&(update15(state).social||update15(state).interview||upgrade(state).dailyDraft))main.insertAdjacentHTML('beforeend','<button class="btn gold-button" data-tab="relaciones">Retomar conversación</button>');

 tutorOverlay15();
 if(tab==='noticias'){main.insertAdjacentHTML('afterbegin',`<section class="panel"><h2>Próximos torneos importantes</h2>${eventRows(upcoming())}<button class="btn gold-button" data-tab="liga">Calendario completo</button></section>`);const latest=newsState(state).published.at(-1);main.insertAdjacentHTML('afterbegin',featuredCard14(latest));}
 if(tab==='accion'){
  if(!state.weekly)main.querySelector('.panel:last-of-type')?.insertAdjacentHTML('beforeend',`<details class="duel-card cinema-activity activity-rest"><summary>${icon15('rest')} Descanso</summary><p>Consume la única acción semanal. La recuperación varía con fortaleza mental, pasiva de fatiga y apoyo; nunca baja de cero.</p>${own().map(p=>`<div class="player">${avatar(p)}<div>${esc(p.name)}<p>Fatiga ${state.fatigue[p.id]||0} → ${Math.max(0,(state.fatigue[p.id]||0)-restRecovery(p))}/12 · Recuperación base ${restRecovery(p)}</p></div></div>`).join('')}<button class="btn" data-action="chooseActivity" data-type="rest">Confirmar descanso</button></details>`);
  const test=main.querySelector('[data-type="test"]');if(test&&!guests().some(p=>!state.unavailable.includes(p.id))){test.insertAdjacentHTML('beforebegin','<p class="notice">Podés hacer la sesión con tu propio equipo.</p>');}
 }
 if(tab==='informe'&&state.report){const r=state.report;const results=main.querySelector('#report-characters');results?.insertAdjacentHTML('afterend',featuredCard14(newsState(state).published.find(a=>a.id===r.featured)));if(r.economy)results?.insertAdjacentHTML('afterend',`<section class="panel" id="report-economy"><h2>Economía de la semana</h2><p>Ingresos ${currency(r.economy.income)} · Mantenimiento ${currency(r.economy.paid)} · Fichajes ${currency(r.sources.contracts)} · Balance ${currency(r.credits)}</p>${r.activityDetails?.recovery?`<details><summary>Descanso individual</summary>${r.activityDetails.recovery.map(p=>`<p>${esc(getP(p.id).name)}: ${p.before} → ${p.after}/12</p>`).join('')}</details>`:''}</section>`);
  const major=r.events.filter(e=>e.level!=='local'&&e.ids?.length).sort((a,b)=>a.position-b.position)[0];if(major){const winner=major.standings.find(row=>row.club===state.team);const quote=major.position===1?'¡LO CONSEGUIMOS! ¡SOMOS CAMPEONES!':major.position<=4?'¡Casi lo conseguimos! Estuvimos muy cerca.':major.position<=32?'¡Buen torneo! Seguimos avanzando.':'No bajes los brazos. Perder una batalla no significa perder la guerra.';main.insertAdjacentHTML('afterbegin',`<section class="notice mili-reaction14">${mili(major.position===1?'celebrate':'welcome')}<p>${quote}<br>${esc(winner?.name||teamName(state.team))} · Puesto ${major.position}${major.points?' · '+major.points+' puntos obtenidos por el equipo.':''}</p></section>`);}
 }
 if(modernCareer()&&preparation.includes(tab))main.insertAdjacentHTML('beforeend',weeklyClosing15());
 main.insertAdjacentHTML('beforeend',interviewWarning14());
 document.querySelectorAll('.gold-focus14').forEach(e=>e.classList.remove('gold-focus14'));
 const g=upgrade(state).tutorial;

 if(tab==='informe'&&state.report?.week===1&&(g.reportStep??0)<5){const panels=[main.querySelector('#report-economy'),main.querySelector('#report-characters'),main.querySelector('#report-tournaments'),main.querySelector('.report-progress'),main.querySelector('#report-circuit')];panels[g.reportStep??0]?.classList.add('gold-focus14');}
 main.querySelectorAll('img.avatar').forEach(img=>{img.addEventListener('error',()=>{img.classList.add('missing-portrait');img.alt='Retrato no disponible; recargá para reintentar.';},{once:true});});
}
function action14(action,id,btn){
 const x=state.started?upgrade(state):null;
 switch(action){
 case 'haruPick14':if(haruRecruits.some(p=>p.id===id)){opening.recruit=id;opening.captain=id;render();}return true;
 case 'introNext14':x.tutorial.introStep=Math.min(6,(x.tutorial.introStep||0)+1);render();return true;
 case 'reportNext14':x.tutorial.reportStep=Math.min(5,(x.tutorial.reportStep||0)+1);render();return true;
 case 'dailyOpen':if(state.owned[id]===state.team&&(dailyAvailable(state)||x.dailyDraft)&&!x.active){document.querySelectorAll('.dialogback').forEach(e=>e.remove());x.dailyDraft??={id};tab='relaciones';render();}return true;
 case 'dailyTopic14':if(x.dailyDraft&&!x.dailyDraft.result&&dailyTopics[id]){if(!dailyAvailable(state)||x.dailyDraft.topic!==undefined)return true;x.dailyDraft.topic=id;x.dailyWeek??={};x.dailyWeek[state.team]=state.week;render();}return true;
 case 'dailyAnswer14':if(x.dailyDraft&&!x.dailyDraft.result){x.dailyDraft.result=dailyTalk(state,x.dailyDraft.id,x.dailyDraft.topic,id,true);if(x.dailyDraft.result)changeFriendship(state,x.dailyDraft.id,Math.sign(x.dailyDraft.result.trust),'charla');render();}return true;
 case 'dailyClose14':x.dailyDraft=null;tab='plantel';render();return true;
 case 'interviewCancel14':x.interviewDraft=null;render();return true;
 case 'interviewStart14':{
  const draft=x.interviewDraft;if(!draft)return true;
  const pool=availableEvents(state,draft.id);const e=pool[Math.floor(Math.random()*pool.length)];
  if(e&&startConversation(state,draft.id,e.type,draft.mode)){x.interviewDraft=null;document.querySelectorAll('.dialogback').forEach(el=>el.remove());tab='relaciones';render();}else notify('El cupo o el candidato ya no está disponible.');return true;
 }
 case 'contextStart':if(x.pending&&startConversation(state,x.pending.id,null,'context')){tab='relaciones';render();}return true;
 case 'contextDecline14':x.pending=null;render();return true;
 case 'foundationAlternative14':if(signFoundation(state,id)){tab='inicio';render();notify('Incorporación fundacional confirmada sin una segunda entrevista.');}return true;
 case 'dbSave14':{const n=Number(document.querySelector(`[data-db-days="${id}"]`)?.value);if(setDays(state,id,n,weekendPlan().online)){render();notify('Días de testeo guardados.');}return true;}
 case 'slotOpen14':{
  const element=document.createElement('div');element.className='dialogback';element.innerHTML=`<section class="dialog"><h2>Elegir integrante para esta posición</h2><div class="selection-grid">${own().map(p=>`<article class="duel-card">${card(p)}<p>${esc(p.alias)}</p><button class="btn" data-action="slotChoose14" data-slot="${id}" data-id="${p.id}">Elegir</button><button class="btn ghost" data-detail="${p.id}">Ficha</button></article>`).join('')}</div><button class="btn ghost" data-action="close14">Cerrar</button></section>`;document.body.appendChild(element);return true;
 }
 case 'slotChoose14':{const slot=Number(btn.dataset.slot),slots=lineupSlots(state,own().map(p=>p.id)),old=slots.indexOf(id);if(old>=0&&slot>=0&&slot<5){[slots[old],slots[slot]]=[slots[slot],slots[old]];if(!slots[1]){notify('Elegí otro capitán antes de dejar vacante el centro.');return true;}state.captain=slots[1];state.active=slots.slice(0,3).filter(Boolean);state.reserveOrder=slots.slice(3).filter(Boolean);}document.querySelectorAll('.dialogback').forEach(e=>e.remove());render();return true;}
 case 'dismissOpen':{const q=dismissalQuote(state,id);if(q.blocked){notify(q.blocked);return true;}if(confirm(`Dar de baja a ${getP(id).name}: ahorro ${q.saving} CR por semana, ${q.remaining} integrantes, moral −1, relación −8, sinergia −1. Los gastos anteriores y el multiplicador se conservan. ¿Confirmar?`)){dismiss(state,id);document.querySelectorAll('.dialogback').forEach(e=>e.remove());tab='inicio';render();}return true;}
 case 'close14':btn.closest('.dialogback')?.remove();return true;
 case 'personalClose':if(x.active?.result){x.active=null;tab='mercado';render();}return true;
 }
 return false;
}


function icon15(key){
 const paths={plantel:'M3 20v-2a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v2 M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M17 5a3 3 0 0 1 0 6 M21 20v-2a4 4 0 0 0-3-4',meta:'M12 2 22 9 18 21H6L2 9z M12 2l6 19L2 9h20L6 21z',noticias:'M4 4h16v16H4z M8 8h8 M8 12h8 M8 16h4',accion:'M4 6h16v14H4z M4 10h16 M8 3v5 M16 3v5',mercado:'M3 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2 M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M18 7v8 M14 11h8',torneos:'M7 4h10v5a5 5 0 0 1-10 0z M7 6H3v2a4 4 0 0 0 4 4 M17 6h4v2a4 4 0 0 1-4 4 M12 14v6 M8 20h8',darkbook:'M3 4h18v12H3z M12 16v4 M8 20h8',heart:'M12 20 4 12C0 7 7 2 12 7c5-5 12 0 8 5z',rest:'M3 5v15 M3 16h18v4 M3 10h5v6 M8 11h10a3 3 0 0 1 3 3v2',positive:'M12 4v16 M4 12h16',negative:'M12 3 2 21h20z M12 9v5 M12 17h.01'};
 return `<svg class="dc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[key]||paths.accion}"/></svg>`;
}
const weeklyVisits15=['plantel','meta','noticias','mercado'];
function preparation15(){
 const done=new Set(update15(state).prep.done.filter(key=>weeklyVisits15.includes(key)||key==='torneos'));
 if(state.week===1){
  const tutorial=upgrade(state).tutorial;
  for(const key of weeklyVisits15)if(tutorial.seen.includes(key))done.add(key);
  if(tutorial.tournaments)done.add('torneos');
 }
 if(state.weekly)done.add('accion');
 if(Object.values(state.entries).some(ids=>ids.length)||Object.values(competitionState(state).days).some(n=>n>0))done.add('torneos');
 return done;
}
const finishButton15=()=>`<button class="btn gold-button" data-action="finishWeek" data-week="${state.week}">Finalizar semana</button>`;
function weeklyClosing15(){
 const done=preparation15();
 const missing=primaryTabs().filter(([key])=>!done.has(key)).map(([,label])=>label);
 return `<section class="panel weekly-closing15"><div><h2>Preparación semanal</h2><strong>${done.size}/6 actividades</strong>${missing.length?`<p>Pendientes: ${missing.join(', ')}</p>`:''}</div>${finishButton15()}</section>`;
}
function menu15(){
 const p=getP(state.captain),done=preparation15();
 return `<section class="home15"><div class="home-club15">${p?avatar(p):''}<strong>${esc(teamName(state.team))}</strong><button class="btn ghost" data-action="progress15">${done.size}/6 actividades</button></div><nav aria-label="Secciones principales">${primaryTabs().map(([key,label])=>`<button class="home-tile15 tile-${key}15" data-tab="${key}"><span class="tile-icon15">${icon15(key)}</span><span>${label}${done.has(key)?' <span class="weekly-check15" aria-label="Completada">✓</span>':''}</span></button>`).join('')}</nav></section>`;
}
function mark15(key){
 const data=update15(state);
 if(!data.prep.done.includes(key))data.prep.done.push(key);
}
function tutorOverlay15(){
 const run=update15(state).tutorials.intro;
 if(tab!=='inicio'||!run||run.step>=tutorial15.length)return;
 const [target,line]=tutorial15[run.step];
 const root=$('#app'),selector=target==='finish'?'.nav-finish15':target?`.home15 [data-tab="${target}"]`:'';
 if(selector)root.querySelector(selector)?.classList.add('tutorial-focus15');
 root.insertAdjacentHTML('beforeend',`<div class="tutorial-overlay15" role="dialog" aria-modal="true" aria-label="Tutorial de Mili"><section class="tutorial-box15">${mili('explain')}<div><span class="tag gold">MILI</span><p>${esc(line)}</p><button class="btn gold-button" data-action="tutorNext15" data-id="${run.step}">${run.step===tutorial15.length-1?'Comenzar a jugar':'Continuar'}</button></div></section></div>`);
}
function socialPage15(){
 const data=update15(state),run=data.social,event=activeEvent(state);
 if(!run||!event)return `<section class="panel"><h1>Conversaciones</h1><p>Los eventos especiales y las charlas del plantel tienen cupos independientes.</p>${socialOptions(state).map(e=>`<article class="player">${avatar(getP(e.character_index))}<div><strong>${esc(e.title)}</strong><p>${esc(e.character)}</p></div><button class="btn" data-action="eventStart15" data-id="${e.id}" ${data.socialWeek===state.week?'disabled':''}>Comenzar evento</button></article>`).join('')||'<p>No hay eventos disponibles para tu plantel.</p>'}</section>`;
 const p=getP(event.character_index),step=event.stages[run.stage];
 const next=`<button class="btn gold-button" data-action="eventNext15" data-phase="${run.phase}" data-stage="${run.stage}">Continuar</button>`;
 let body='';
 if(run.phase==='intro')body=`<h2>Mili</h2><p>${esc(event.mili_intro)}</p>${next}`;
 if(run.phase==='question')body=`<p>${esc(step.dialogue)}</p><div class="dialogue-options">${step.options.map((o,i)=>`<button class="btn secondary" data-action="eventAnswer15" data-stage="${run.stage}" data-id="${i}">${esc(o.text)}</button>`).join('')}</div>`;
 if(run.phase==='reaction'){
  const a=run.answers.at(-1);
  body=`<p>${esc(step.options.find(o=>o.id===a.id).reaction)}</p><p>${signedNumber(a.delta)} amistad · Vínculo ${signedNumber(friendship(state,p.id))}</p>${next}`;
 }
 if(run.phase==='end'){
  const total=run.answers.reduce((sum,a)=>sum+a.delta,0);
  body=`<p>${esc(run.answers.filter(a=>a.delta===1).length>=event.required?event.ending_success:event.ending_failure)}</p><p>${run.answers.map((a,i)=>`Decisión ${i+1}: ${signedNumber(a.delta)}`).join(' · ')}</p><strong>Balance ${signedNumber(total)} amistad</strong><p>Evento completado</p><button class="btn" data-action="eventClose15">Volver a conversaciones</button>`;
 }
 return `<section class="conversation"><header class="conversation-portrait">${run.phase==='intro'?mili('explain'):avatar(p)}<h1>${esc(event.title)}</h1><p>${esc(event.character)} · ${run.stage+1}/3</p></header><div class="conversation-body">${body}</div></section>`;
}
function interviewPage15(){
 const run=update15(state).interview,p=getP(run.id),round=run.answers.length;
 const last=run.answers.at(-1);
 let body='';
 if(run.phase==='question')body=`<h2>Tanda ${round+1}/3</h2><div class="dialogue-options">${questions15[round].map((q,i)=>`<button class="btn secondary" data-action="ask15" data-round="${round}" data-id="${i}">${esc(q)}</button>`).join('')}</div>`;
 if(run.phase==='answer')body=`<h2>${esc(questions15[round-1][last])}</h2><p>${esc(interviewAnswers[p.id-1][(round-1)*2+last])}</p><button class="btn" data-action="interviewNext15">Continuar</button>`;
 if(run.phase==='end'){
  const terms=hiringTerms15(run);
  body=`<h2>Propuesta de incorporación</h2>${terms?hiringDetails15(terms):'<p>La oferta ya no está disponible.</p>'}<div class="actions hiring-actions15"><button class="btn gold-button" data-action="hire15" ${!terms||terms.blocked?'disabled':''}>Contratar</button><button class="btn ghost" data-action="reject15">Rechazar</button></div>`;
 }
 return `<section class="conversation hiring-interview15"><header class="conversation-portrait">${avatar(p)}<h1>${esc(p.name)}</h1><p class="candidate-alias15">${esc(p.alias)}</p><p>Entrevista · ${Math.min(3,round+Number(run.phase==='question'))}/3</p></header><div class="conversation-body">${body}</div></section>`;
}
function foundation15(){
 if(!needsFoundation(state)||state.week!==1)return '';
 const interviewed=update15(state).interviewWeek===state.week;
 return `<section class="panel"><h2>Incorporación fundacional · 0 CR</h2><p>El mantenimiento del nuevo integrante empieza esta semana.</p><div class="card-grid candidate-grid15">${foundationCandidates(state).map(p=>candidateCard15(p,hiringTerms15({id:p.id,mode:'foundation'}),interviewed?'hireFoundation15':'foundation',interviewed?'Revisar incorporación':'Entrevistar')).join('')}</div></section>`;
}
let boardDay15=0, selected15=null;
function board15(){
 const plan=weekendPlan(),draft=draft15(state),online=boardDay15===2;
 const roster=own().map(p=>{
  const physicalCount=entries=>plan.events.filter(e=>entries[e.key]?.includes(p.id)).length;
  const max=online?(plan.online&&cap(state,p.id)?dbLimit(p):0):cap(state,p.id);
  const assigned=online?(draft.days[p.id]||0):physicalCount(draft.entries);
  const confirmed=online?(competitionState(state).days[p.id]||0):physicalCount(state.entries);
  const available=Math.max(0,max-assigned);
  return `<button class="board-player15 ${selected15===p.id?'selected15':''}" draggable="true" data-drag15="${p.id}" data-action="boardSelect15" data-id="${p.id}" aria-pressed="${selected15===p.id}"><b>${online?'Días':'Cupos'} asignados: ${assigned}/${max}</b>${avatar(p)}<strong>${esc(p.name)}</strong><span>Disponibles: ${available}</span><span>Confirmados: ${confirmed}</span>${draft.dirty?`<small>En planificación: ${assigned}</small>`:''}<small>${!max?'No habilitado':available?'Con disponibilidad':'Cupo completo'}</small></button>`;
 }).join('');
 const physical=plan.events.filter(e=>e.day===boardDay15).map(e=>{
  const ids=draft.entries[e.key]||[],index=plan.events.indexOf(e);
  return `<article class="duel-card drop15 cinema-event cinema-event-${e.level}" data-venue="${esc(e.venue||'')}" data-drop15="${index}">${eventBadges(e)}<h3>${esc(venues[e.venue]||e.name)}</h3><p>${esc(e.name)} · ${e.type==='team'?'3v3 · '+ids.length+'/3 integrantes':'Individual · '+ids.length+' del plantel'} · ${e.type==='team'?(e.level==='local'?10:Math.floor(structures[e.level].size/3))+' equipos':structures[e.level].size+' duelistas'}</p>${mayEnter(e)?'<p>Requiere habilitación y cupo físico.</p>':'<p>El club no clasificó.</p>'}<button class="btn secondary" data-action="boardAdd15" data-id="${index}">Asignar seleccionado</button>${ids.map(id=>`<button class="btn ghost" data-action="boardRemove15" data-id="${index}" data-player="${id}">Quitar ${esc(getP(id).name)}</button>`).join('')}</article>`;
 }).join('');
 const testing=plan.online?`<article class="duel-card drop15 cinema-event cinema-event-online" data-drop15="-1"><h3>Sesiones de testeo online</h3><p>Arrastrá a un jugador o seleccionalo para agregar un día. Cada día incluye cuatro enfrentamientos.</p><button class="btn secondary" data-action="boardAdd15" data-id="-1">Agregar un día al seleccionado</button>${own().filter(p=>draft.days[p.id]).map(p=>`<button class="btn ghost" data-action="boardRemove15" data-id="-1" data-player="${p.id}">${esc(p.name)} · ${draft.days[p.id]} ${draft.days[p.id]===1?'día':'días'} · Quitar uno</button>`).join('')}</article>`:'<p class="notice">Dark Book está suspendido por el evento principal.</p>';
 return `<section class="panel board-panel15"><h1>Planificación de torneos</h1><div class="board-tabs15" aria-label="Agenda de competencias">${['Sábado','Domingo','Dark Book'].map((label,i)=>`<button class="btn ${i===boardDay15?'gold-button':'secondary'}" data-day="${i}" data-action="boardTab15" data-id="${i}" aria-pressed="${i===boardDay15}">${icon15(i===2?'darkbook':'torneos')}${label}</button>`).join('')}</div><p>${draft.dirty?'Borrador guardado · falta confirmar':preparation15().has('torneos')?'Planificación confirmada':'Arrastrá un retrato o tocá al jugador y luego Asignar.'}</p><div class="board-roster15">${roster}</div><div class="card-grid">${online?testing:physical||'<p>No hay competencias este día.</p>'}</div><div class="actions"><button class="btn gold-button" data-action="boardConfirm15">Confirmar inscripciones</button><button class="btn ghost" data-action="boardClear15">Quitar todas las asignaciones del borrador</button><button class="btn ghost" data-action="boardSkip15">No participar esta semana</button></div></section><section class="panel competition-guide"><h2>Guía de competencia</h2><div class="card-grid">${[['Individual','Podés inscribir varios jugadores con cupo.'],['3v3','Cada formación requiere exactamente tres jugadores.'],['Cupos','Sábado y domingo comparten el límite físico.'],['Dark Book','Los días disponibles dependen del duelista.'],['Fatiga','A partir de 8 afecta el rendimiento.'],['Experiencia','Se gana al comenzar con fatiga de 0 a 3.'],['Torneos mayores','Suspenden competencias inferiores y testeo.'],['Rankings','Los resultados oficiales y el testeo actualizan sus propias tablas.'],['Borrador','Cambiar de pestaña conserva las asignaciones.'],['Confirmación','Verificá los tres grupos y registralos juntos.']].map(([title,desc])=>`<article class="duel-card"><h3>${icon15(({'Individual':'mercado','3v3':'plantel','Cupos':'accion','Dark Book':'darkbook','Fatiga':'rest','Experiencia':'positive','Rankings':'meta','Borrador':'noticias','Confirmación':'positive'})[title]||'torneos')} ${title}</h3><p>${desc}</p></article>`).join('')}</div></section>`;
}
function boardReason15(index,id){
 if(!id)return 'Seleccioná un duelista.';
 const plan=weekendPlan(),draft=draft15(state),p=getP(id);
 if(index===-1)return !plan.online||!p||state.owned[id]!==state.team||!cap(state,id)?'Duelista no habilitado para Dark Book.':(draft.days[id]||0)>=dbLimit(p)?'Límite de días alcanzado.':'';
 const event=plan.events[index];
 if(!event)return 'Torneo fuera del calendario.';
 if(draft.entries[event.key]?.includes(id))return 'El duelista ya figura en este torneo.';
 return registrationError(state,plan,event,id,cap,mayEnter);
}
function boardAdd15(index,id){
 const error=boardReason15(index,id);
 if(error){notify(error);return;}
 const draft=draft15(state);
 if(index===-1)draft.days[id]=(draft.days[id]||0)+1;
 else (draft.entries[eventsNow()[index].key]??=[]).push(id);
 draft.dirty=true;
 selected15=null;
 render();
}
function boardSummary15(){
 const plan=weekendPlan(),d=draft15(state);
 return ['Sábado','Domingo','Dark Book'].map((label,i)=>{
  const rows=i===2?Object.entries(d.days).filter(([,n])=>n).map(([id,n])=>`${getP(id).name}: ${n} ${n===1?'día':'días'}`):plan.events.filter(e=>e.day===i&&d.entries[e.key]?.length).map(e=>`${venues[e.venue]||e.name} · ${e.name}: ${d.entries[e.key].map(id=>getP(id).name).join(', ')}`);
  return `${label}\n${rows.join('\n')||'Sin inscripciones'}`;
 }).join('\n\n');
}
function clubState15(p){
 const d=state.circuit.decks[p.id],m=memberState(state,p.id),a=affinity(p,currentFormat());
 return `Formato ${a} · ${'SAB'.includes(a)?'Cómodo':a==='C'?'Adaptándose':'Exigente'} · Ánimo ${m.motivation>=65?'Animado':m.motivation<40?'Bajo':'Estable'} · Confianza ${d.trust}/100`;
}
function abilityStatus15(p,skill){
 const deck=state.circuit.decks[p.id],fatigue=state.fatigue[p.id]||0,morale=state.morale[state.team]||0,a=abilities[p.id-1];
 const states={
  'positive-2':deck.style===favorite(p)&&deck.mastery[deck.style]>=65,
  'positive-3':state.prep>=4&&fatigue<8,
  'negative-2':deck.adaptation>=35,
  'negative-3':fatigue>=8||morale<0
 };
 const key=skill.id.slice(skill.id.indexOf('-')+1);
 if(Object.hasOwn(states,key))return states[key]?'Condición activa':'Condición pendiente';
 if(a.captain)return state.captain===p.id?'Condición de capitanía activa':'Condición de capitanía pendiente';
 if(a.reserve)return !state.active.includes(p.id)?'Condición de reserva activa':'Condición de reserva pendiente';
 if(a.trio)return trio.every(id=>state.owned[id]===state.team)?'Trío completo':'Trío incompleto';
 return 'Se evalúa según la actividad o el duelo';
}
function squadAbilities15(){
 return `<div class="ability-groups squad-skills15">${[['positive','Ventajas'],['negative','Desventajas']].map(([type,title])=>`<section><h3>${icon15(type)} ${title}</h3>${own().flatMap(p=>personalSkills(p.id).filter(a=>a.type===type&&a.visibility==='known').map(a=>`<div><small>${esc(p.name)} · ${p.id===state.captain?'Capitán':state.active.includes(p.id)?'Titular':'Reserva'} · ${a.id.endsWith('-positive-1')&&(abilities[p.id-1].trainTeam||abilities[p.id-1].trio)?'Grupal':'Individual'} · ${abilityStatus15(p,a)}</small>${abilityCard(a)}</div>`)).join('')||'<p>Sin habilidades descubiertas.</p>'}</section>`).join('')}</div>`;
}
function trackMeta15(){
 const f=currentFormat(),data=update15(state);
 const signature=[dominant(f),f.name,state.banStyle??null].join('|');
 if(data.metaSignature&&data.metaSignature!==signature)data.metaAlert={week:state.week,previous:data.metaName,current:f.name,ban:state.banStyle};
 data.metaSignature=signature;
 data.metaName=f.name;
}

const metaSelection15={match:null,position:null};
const metaPoints15=[[200,46],[346,139],[292,290],[108,290],[54,139]];
const metaCenter15=[200,177];
const metaColors15=['#ffb279','#f2ca77','#8bbfff','#74dabd','#c6a9ed'];
function metaGraph15(chart,selected,known){
 const match=chart==='match';
 const polygons=[.25,.5,.75,1].map(r=>`<polygon class="meta-ring15" points="${metaPoints15.map(([x,y])=>[metaCenter15[0]+(x-metaCenter15[0])*r,metaCenter15[1]+(y-metaCenter15[1])*r].join(',')).join(' ')}"/>`).join('');
 const line=(a,b,cls='')=>`<line class="${cls}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
 const values=metaPoints15.map(([x,y],i)=>known[i]>=12?[metaCenter15[0]+(x-metaCenter15[0])*known[i]/100,metaCenter15[1]+(y-metaCenter15[1])*known[i]/100]:null);
 const edges=match?metaPoints15.map((point,i)=>i===selected?'':line(metaPoints15[selected],point,matchup(selected,i)>0?'favorable15':matchup(selected,i)<0?'unfavorable15':'neutral15')).join(''):values.map((point,i)=>{
  if(!point)return '';
  const next=values[(i+1)%5];
  return `${line(metaCenter15,point,'known-ray15')}${next?line(point,next,'known-edge15'):''}<circle cx="${point[0]}" cy="${point[1]}" r="${i===selected?7:5}" class="known-dot15"/>`;
 }).join('');
 return `<div class="meta-graph15"><svg viewBox="0 0 400 330" aria-hidden="true">${polygons}${metaPoints15.map(point=>line(metaCenter15,point,'meta-axis15')).join('')}${edges}<circle cx="200" cy="177" r="3" class="meta-center15"/></svg>${metaPoints15.map(([x,y],i)=>{
  const tone=match&&selected!==i?(matchup(selected,i)>0?'favorable15':matchup(selected,i)<0?'unfavorable15':''):'';
  return `<button type="button" class="meta-node15 ${tone}" style="--x:${x/4}%;--y:${100*y/330}%;--node:${metaColors15[i]}" data-action="metaSelect15" data-chart="${chart}" data-id="${i}" aria-pressed="${selected===i}">${styles[i]}</button>`;
 }).join('')}</div>`;
}
function metaCharts15(f,known){
 const pivot=dominant(f),weights=distribution(f),selected=metaSelection15.match??pivot, position=metaSelection15.position??pivot;
 const relations=[['Ventaja',1,'favorable15'],['Desventaja',-1,'unfavorable15'],['Neutral',0,'neutral15']].map(([label,value,cls])=>`<div class="${cls}"><dt>${label}</dt><dd>${styles.filter((_,i)=>matchup(selected,i)===value).join(', ')||'Ninguno'}</dd></div>`).join('');
 const k=known[position]||0;
 const estimate=k<12?'Sin datos suficientes':k<35?'Estimación preliminar':weights[position]>=.25?'Muy jugado':weights[position]>=.15?'Presencia media':'Poco jugado';
 return `<article class="panel meta-chart15"><h2>Rueda de matchups</h2><p>Elegí un estilo para ver sus cruces.</p>${metaGraph15('match',selected,known)}<div class="meta-readout15" aria-live="polite"><h3>${styles[selected]}</h3><dl>${relations}</dl></div><details><summary>¿Cómo funciona?</summary><p>La rueda muestra los cruces desde la perspectiva del estilo elegido. El motor combina esa ventaja o desventaja con la preparación, el rendimiento y la fatiga.</p></details></article>
 <article class="panel meta-chart15"><h2>Rueda de posicionamiento</h2><p>Investigación del equipo por estilo.</p>${metaGraph15('position',position,known)}<div class="meta-readout15" aria-live="polite"><h3>${styles[position]}</h3><strong>${estimate}</strong>${k>=12?`<p>Conocimiento: ${k}/100${k>=35?' · Presencia estimada: '+Math.round(weights[position]*100)+'%':''}</p>`:'<p>El equipo necesita más información para estimar su presencia.</p>'}</div><details><summary>¿Cómo funciona?</summary><p>La distancia al centro indica conocimiento. Los estilos sin datos suficientes quedan sin punto. A partir de 12 hay una lectura preliminar y a partir de 35 se muestra la presencia estimada.</p><p>La amplitud va de 2 a 6: a mayor amplitud, más parejo es el reparto entre estilos.</p></details></article>`;
}
function metaScreen15(){
 const f=currentFormat(),known=state.circuit.scouting[state.team],notice=update15(state).metaAlert;
 const pivot=dominant(f),knowledge=Math.round(known.reduce((sum,k)=>sum+k,0)/known.length);
 const formatState=state.banStyle?'Banlist: '+styleNames[state.banStyle]:f.breadth<=3?'Formato concentrado':f.breadth>=5?'Formato abierto':'Diversidad intermedia';
 return `<section class="panel meta-summary15"><h1>Meta actual</h1><dl>${[['Estilo dominante',styles[pivot]],['Amplitud',f.breadth+' mazos'],['Conocimiento del equipo',knowledge?knowledge+'/100':'Sin investigación'],['Estado del formato',formatState]].map(([label,value])=>`<div><dt>${label}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>${notice?`<aside class="meta-alert15"><div><b>El formato está cambiando</b><p>Semana ${notice.week} · ${esc(notice.previous)} → ${esc(notice.current)}${notice.ban!=null?' · Banlist: '+esc(styleNames[notice.ban]):''}</p></div><button class="btn ghost" data-action="metaDismiss15">Entendido</button></aside>`:''}</section>
 <div id="meta-charts15">${metaCharts15(f,known)}</div>
 <section class="panel meta-roster15"><h2>¿Cómo afecta este meta a mi equipo?</h2><div class="card-grid">${own().map(p=>{
  const skills=personalSkills(p.id).filter(a=>a.visibility==='known'&&/estilo|dominio|adaptaci[oó]n|formato|amplitud/i.test(a.condition||''));
  return `<article class="duel-card"><button class="portrait-button" data-detail="${p.id}" aria-label="Ficha de ${esc(p.name)}">${avatar(p)}</button><div><h3>${esc(p.name)}</h3><p>${esc(clubState15(p).split(' · Ánimo')[0])}</p>${skills.map(a=>`<small class="${a.type==='positive'?'favorable15':'unfavorable15'}">${a.type==='positive'?'+':'−'} ${esc(a.name)} · ${esc(a.condition)}</small>`).join('')||'<small>Sin rasgos de formato descubiertos.</small>'}</div></article>`;
 }).join('')}</div></section>
 <section class="panel"><h2>Historial del formato</h2><ol class="meta-timeline15">${formats.slice(0,state.formatIndex+1).map((x,i)=>`<li><small>Semana ${i*13+1}</small><strong>${esc(styles[dominant(x)])}</strong><span>Amplitud: ${x.breadth} mazos</span></li>`).join('')}</ol><details><summary>Ver las 25 combinaciones</summary><div class="grid">${formats.map(x=>`<span class="tag">${esc(x.name)}</span>`).join('')}</div></details></section>`;
}

function confirm15(title,description,label,commit,details=''){
 if(document.querySelector('.confirm15'))return;
 const el=document.createElement('div');
 el.className='dialogback confirm15';
 el.innerHTML=`<section class="dialog" role="dialog" aria-modal="true" aria-label="${esc(title)}"><h2>${esc(title)}</h2><p style="white-space:pre-line">${esc(description)}</p>${details}<div class="actions"><button class="btn ghost" data-action="close14">Volver</button><button class="btn gold-button" data-commit15>${esc(label)}</button></div></section>`;
 document.body.appendChild(el);
 el.querySelector('[data-commit15]').addEventListener('click',()=>{el.remove();commit();},{once:true});
 el.addEventListener('keydown',e=>{if(e.key==='Escape')el.remove();});
 el.querySelector('[data-action="close14"]').focus();
}
function confirmHiring15(run){
 const terms=hiringTerms15(run);
 if(!terms||terms.blocked){notify(terms?.blocked||'La oferta ya no está disponible.');return;}
 const data=update15(state),interview=data.interview;
 confirm15('Confirmar contratación',terms.ids.map(id=>getP(id).name).join(', '),'Confirmar contratación',()=>{
  const fresh=hiringTerms15(run);
  if(state.week!==run.week||data.interview!==interview||!fresh||fresh.blocked||
   fresh.quote.price!==terms.quote.price||fresh.balance!==terms.balance||fresh.after!==terms.after||String(fresh.ids)!==String(terms.ids)){
   notify('La propuesta cambió. Revisá el detalle antes de confirmar.');render();return;
  }
  let hired=false;
  if(terms.free)hired=signFoundation(state,run.id);
  else{
   const offers=state.offers;
   const listed=offers.find(offer=>offer.id===run.id&&offer.status==='open');
   state.offers=[{id:run.id,ids:fresh.ids,status:'open',...fresh.quote}];
   try{hired=recruit(state,run.id,currentFormat())==='se incorporó al equipo';}finally{state.offers=offers;}
   if(hired&&listed)listed.status='signed';
  }
  if(!hired){notify('La incorporación ya no está disponible.');return;}
  if(interview)data.interviews.push({...interview,hired:true});
  delete data.interview;tab='plantel';render();
 },hiringDetails15(terms));
}
function act15(action,id,btn){
 if(!state.started||!modernCareer()&&action!=='wallet15')return false;
 const data=update15(state),run=data.interview,x=upgrade(state);
 switch(action){
 case 'wallet15':{
  if(document.querySelector('.wallet-dialog15'))return true;
  const modal=document.createElement('div');modal.className='dialogback wallet-dialog15';
  modal.innerHTML=`<section class="dialog" role="dialog" aria-modal="true" aria-label="Presupuesto"><h2>${creditCoin15()} Presupuesto</h2>${walletDetails15()}<p class="small">El equivalente diario es informativo. Los ingresos se acreditan al finalizar la semana.</p><button class="btn ghost" data-action="close14">Cerrar</button></section>`;
  document.body.appendChild(modal);modal.querySelector('[data-action="close14"]')?.focus();return true;
 }
 case 'progress15':{
  const done=preparation15(),missing=primaryTabs().filter(([key])=>!done.has(key));
  const modal=document.createElement('div');
  modal.className='dialogback';
  modal.innerHTML=`<section class="dialog" role="dialog" aria-modal="true"><h2>Preparación semanal</h2>${missing.length?`<ul>${missing.map(([,label])=>`<li>${label}</li>`).join('')}</ul>`:'<p>Completaste las seis revisiones.</p>'}<button class="btn" data-action="close14">Cerrar</button></section>`;
  document.body.appendChild(modal);return true;
 }

 case 'finishWeek':{
  if(btn.dataset.week&&Number(btn.dataset.week)!==state.week)return true;
  const required=tutorialPending(state);
  if(state.finished){notify('La temporada ya terminó.');return true;}
  if(required.length){notify('Para cerrar la primera semana completá: '+required.join(', ')+'.');return true;}
  if(run||data.social&&data.social.phase!=='end'||x.dailyDraft?.topic!==undefined&&!x.dailyDraft?.result){notify('Retomá la conversación antes de finalizar.');return true;}
  const missing=primaryTabs().filter(([key])=>!preparation15().has(key)).map(([,label])=>label);
  const dirty=draft15(state).dirty;
  const week=state.week;
  confirm15('Finalizar semana',[dirty?'Hay un borrador sin confirmar. Solo se resolverán las inscripciones confirmadas.':'',missing.length?'Pendientes: '+missing.join(', ')+'.':'','Las competencias y actividades confirmadas se resuelven al avanzar.'].filter(Boolean).join('\n'),'Confirmar cierre',()=>{
   if(state.week!==week)return;
   closeCareerWeek(true);
   if(state.week!==week||state.finished)selected15=null;
  });
  return true;
 }
 case 'tutorial':
  data.tutorials.intro={step:0,mode:'replay'};tab='inicio';render();return true;
 case 'tutorNext15':
  if(data.tutorials.intro?.step===id){data.tutorials.intro.step++;if(data.tutorials.intro.step===tutorial15.length)data.tutorials.intro.mode='completed';render();}
  return true;
 case 'metaSelect15':{
  const chart=btn.dataset.chart;
  if(!['match','position'].includes(chart)||!styles[id])return true;
  metaSelection15[chart]=id;
  const panel=document.querySelector('#meta-charts15');
  if(panel){
   const open=[...panel.querySelectorAll('details')].map(detail=>detail.open);
   panel.innerHTML=metaCharts15(currentFormat(),state.circuit.scouting[state.team]);
   panel.querySelectorAll('details').forEach((detail,index)=>{detail.open=open[index];});
   panel.querySelector(`[data-chart="${chart}"][data-id="${id}"]`)?.focus({preventScroll:true});
  }
  return true;
 }
 case 'metaDismiss15': delete data.metaAlert;render();return true;
 case 'eventStart15':if(startSocial(state,id)){tab='relaciones';render();}return true;
 case 'eventNext15':if(data.social?.phase===btn.dataset.phase&&data.social.stage===Number(btn.dataset.stage)){advanceSocial(state);render();}return true;
 case 'eventAnswer15':if(respondSocial(state,id,Number(btn.dataset.stage)))render();return true;
 case 'eventClose15':if(data.social?.phase==='end'){delete data.social;render();}return true;
 case 'interviewStart14':{
  const d=x.interviewDraft;
  if(!d||run||data.interviewWeek===state.week)return true;
  const valid=hiringTerms15(d);
  if(!valid||valid.blocked){notify(valid?.blocked||'El candidato ya no está disponible.');return true;}
  data.interviewWeek=state.week;
  data.interview={...d,week:state.week,phase:'question',answers:[]};
  x.interviewDraft=null;tab='relaciones';render();return true;
 }
 case 'ask15':
  if(run?.phase==='question'&&Number(btn.dataset.round)===run.answers.length&&[0,1].includes(id)){run.answers.push(id);run.phase='answer';render();}
  return true;
 case 'interviewNext15':
  if(run?.phase==='answer'){run.phase=run.answers.length===3?'end':'question';render();}
  return true;
 case 'hire15':
  if(run?.phase==='end')confirmHiring15(run);
  return true;
 case 'reject15':
  if(run?.phase==='end'){data.interviews.push({...run,hired:false});delete data.interview;tab='mercado';render();}
  return true;
 case 'hireFoundation15':
  if(!run&&data.interviewWeek===state.week)confirmHiring15({id,mode:'foundation',week:state.week});
  else if(run){tab='relaciones';render();}
  return true;
 case 'boardTab15':boardDay15=id;selected15=null;render();return true;
 case 'boardSelect15':selected15=selected15===id?null:id;render();return true;
 case 'boardAdd15':boardAdd15(id,selected15);return true;
 case 'boardRemove15':{
  const draft=draft15(state),player=Number(btn.dataset.player);
  if(id===-1){draft.days[player]=Math.max(0,(draft.days[player]||0)-1);}
  else{const event=eventsNow()[id];if(!event)return true;draft.entries[event.key]=(draft.entries[event.key]||[]).filter(p=>p!==player);}
  draft.dirty=true;render();return true;
 }
 case 'boardClear15':{
  const draft=draft15(state);
  draft.entries={};draft.days={};draft.dirty=true;render();return true;
 }
 case 'boardSkip15':
 case 'boardConfirm15':{
  if(state.finished){notify('La temporada ya terminó.');return true;}
  const draft=draft15(state),skip=action==='boardSkip15';
  const error=skip?'':validateDraft(state,weekendPlan(),cap,mayEnter);
  if(error){notify(error);return true;}
  if(!skip&&!draft.dirty&&preparation15().has('torneos')){notify('La planificación ya está confirmada.');return true;}
  const snapshot=JSON.stringify(draft);
  confirm15(skip?'Omitir competencias':'Resumen de inscripciones',
   skip?'Se retirarán las asignaciones provisionales y confirmadas de esta semana.':boardSummary15(),
   skip?'Confirmar que no participo':'Registrar planificación',()=>{
   if(state.finished||draft.week!==state.week||JSON.stringify(draft15(state))!==snapshot){notify('La planificación cambió. Revisala antes de confirmar.');return;}
   const error=skip?'':validateDraft(state,weekendPlan(),cap,mayEnter);
   if(error){notify(error);return;}
   if(skip){draft.entries={};draft.days={};}
   state.entries=structuredClone(draft.entries);
   competitionState(state).days={...draft.days};
   draft.dirty=false;x.tutorial.tournaments=true;mark15('torneos');render();
   notify(skip?'Semana confirmada sin competencias.':'Inscripciones confirmadas.');
  });
  return true;
 }
 }
 return false;
}
let dragging15=null;
document.addEventListener('dragstart',event=>{
 const portrait=event.target.closest?.('[data-drag15]');
 if(!portrait)return;
 dragging15=Number(portrait.dataset.drag15);
 event.dataTransfer.setData('text/plain',String(dragging15));
 event.dataTransfer.effectAllowed='move';
});
document.addEventListener('dragover',event=>{
 const target=event.target.closest?.('[data-drop15]');
 if(!target||!dragging15)return;
 event.preventDefault();
 const error=boardReason15(Number(target.dataset.drop15),dragging15);
 target.classList.toggle('drop-valid15',!error);
 target.classList.toggle('drop-invalid15',Boolean(error));
});
function clearDrop15(){document.querySelectorAll('.drop-valid15,.drop-invalid15').forEach(el=>el.classList.remove('drop-valid15','drop-invalid15'));}
document.addEventListener('dragleave',event=>{const target=event.target.closest?.('[data-drop15]');if(target&&!target.contains(event.relatedTarget))target.classList.remove('drop-valid15','drop-invalid15');});
document.addEventListener('dragend',()=>{dragging15=null;clearDrop15();});
document.addEventListener('drop',event=>{
 const target=event.target.closest?.('[data-drop15]');
 if(!target||!dragging15)return;
 event.preventDefault();clearDrop15();boardAdd15(Number(target.dataset.drop15),dragging15);dragging15=null;
});


render();
if ("serviceWorker" in navigator && window.isSecureContext) navigator.serviceWorker.register("./sw.js").catch(console.warn);
