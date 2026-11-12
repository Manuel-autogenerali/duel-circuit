import assert from 'node:assert/strict';
import {writeFileSync,readFileSync} from 'node:fs';
import {players,teams,formats} from './data.js';
import {organizations,newOrganization,rivalRecruit,haruRecruits} from './opening.js';
import {personalityGroups,personality} from './personalities.js';
import {events} from './dialogues.js';
import {characterNews,publishCharacterNews,newsState} from './character-news.js';
import * as social from './social.js';
import * as competition from './competition.js';
import {dailyTalk,dailyTopics,dailyAvailable,memberState,dismiss,dismissalQuote,weeklyBelonging} from './relationships.js';
import {profileEffects} from './encyclopedia.js';
import {contractLedger,offerQuote,cap} from './career.js';
import {settleFinance} from './finances.js';
import {weekend} from './weekend.js';
export function fixture(team='korium',starter=3){
 const s={started:false,week:1,owned:{},active:[],credits:100,unavailable:[],entries:{},xp:{},fatigue:{},morale:{},formatIndex:0,news:[],standings:Object.fromEntries(teams.map(t=>[t.id,0])),aiBoost:{},prep:0,synergy:0,history:[],offerHistory:[],score:0,wins:0,losses:0,bookResult:null,localLeagues:{},localVenue:'sekai'};
 assert.ok(newOrganization(s,team,'Prueba 14',organizations[team].ids[0]||starter,[],team==='haru'?starter:null));competition.competitionState(s);return s;
}
export function finishConversation(s,mask=7){const a=s.social.active,e=events.find(e=>e.id===a.event);for(let i=a.answers.length;i<3;i++){if(a.feedback)social.continueConversation(s);assert.ok(social.answerConversation(s,mask&(1<<i)?e.stages[i].correct:(e.stages[i].correct+1)%3));}return a.result;}
export function foundation(s){if(!social.needsFoundation(s))return;const p=social.foundationCandidates(s)[0];assert.ok(social.startConversation(s,p.id,'amable','foundation'));finishConversation(s);assert.ok(social.signFoundation(s,p.id));s.social.active=null;}
export function runTests(){
 assert.equal(players.length,40);assert.equal(teams.length,8);assert.equal(new Set(players.map(p=>p.id)).size,40);
 assert.deepEqual(personalityGroups,{serios:[5,6,11,13,14,16,34,38],amables:[1,7,18,28,29,32,33,37],extrovertidos:[2,3,8,10,19,22,24,36],villanos:[9,12,15,17,31,35,39,40],deprimidos:[4,20,21,23,25,26,27,30]});
 assert.equal(new Set(Object.values(personalityGroups).flat()).size,40);
 assert.equal(players[36].name,'Nico TCG');assert.equal(players[15].name,'Carlitos Vala');assert.equal(players[23].name,'Joaquín Pohaji');
 assert.equal(events.length,120);assert.equal(new Set(events.map(e=>e.id)).size,120);assert.equal(events.flatMap(e=>e.stages).length,360);assert.equal(events.flatMap(e=>e.stages.flatMap(x=>x.options)).length,1080);
 for(const e of events){assert.equal(e.personality,personality(e.character));for(let mask=0;mask<8;mask++){
  const s=fixture('mujica');s.social.pending={week:1,id:e.character,event:e.id};assert.ok(social.startConversation(s,e.character,null,'context'));assert.equal(social.specialAvailable(s),false);
  const r=finishConversation(s,mask);assert.equal(r.passed,mask.toString(2).replaceAll('0','').length>=e.required);
  const saved=JSON.parse(JSON.stringify(s));assert.deepEqual(saved.social.active,s.social.active);s.social.active=null;assert.equal(social.startConversation(s,2,'amable','recruit'),false);
 }}
 console.log('OK: categorías exactas; 120 escenas/360 decisiones/1080 respuestas y 960 combinaciones de éxito.');
 const everyday=fixture('mujica');assert.equal(dailyTopics.length,8);assert.equal(dailyTalk(everyday,2,0,0),null);
 for(let i=0;i<8;i++){everyday.week=i+1;assert.ok(dailyTalk(everyday,9,i,0));assert.equal(dailyTalk(everyday,10,i,0),null);assert.ok(social.specialAvailable(everyday));}
 const interrupted=fixture('mujica');social.startConversation(interrupted,2,'amable','recruit');social.answerConversation(interrupted,0);const reloaded=JSON.parse(JSON.stringify(interrupted));assert.equal(reloaded.social.active.answers.length,1);assert.equal(social.specialAvailable(reloaded),false);
 console.log('OK: charla cotidiana independiente, una por semana, integrantes propios, entrevista persistente y cupo consumido al iniciar.');
 const foundationRuns=[];
 for(const club of teams){const s=fixture(club.id);const before=Object.values(s.owned).filter(t=>t===club.id).length;if(before===1){assert.equal(social.startConversation(s,2,'amable','recruit'),false);const p=social.foundationCandidates(s)[0];social.startConversation(s,p.id,'dificil','foundation');finishConversation(s,0);s.social.active=null;const alternative=social.foundationCandidates(s).find(q=>q.id!==p.id)||p;assert.ok(social.signFoundation(s,alternative.id));assert.equal(contractLedger(s).count,0);assert.equal(social.specialAvailable(s),false);}rivalRecruit(s,()=>0);assert.ok(teams.every(t=>Object.values(s.owned).filter(id=>id===t.id).length>=2));assert.equal(Object.keys(s.owned).length,40);foundationRuns.push(club.id);}
 for(const p of haruRecruits){const s=fixture('haru',p.id);assert.deepEqual(s.active,[p.id]);assert.equal(s.organization.founder,null);foundation(s);rivalRecruit(s,()=>0);assert.ok(teams.every(t=>Object.values(s.owned).filter(id=>id===t.id).length>=2));assert.ok([9,10,11].every(id=>s.owned[id]==='mujica'));}
 console.log('OK: ocho organizaciones y cada elección inicial de Haru, alternativas sin segunda entrevista, dos integrantes y Mujica indivisible.');
 const release=fixture('mujica');release.owned[2]=release.team;contractLedger(release).count=3;assert.equal(dismiss(release,2),false);release.week=5;assert.ok(dismiss(release,2));assert.equal(release.owned[2],null);assert.equal(contractLedger(release).count,3);assert.equal(dismiss(release,9),false);
 assert.equal(competition.dbLimit(players[6]),4);assert.equal(competition.dbLimit(players[31]),3);for(const p of players.filter(p=>![7,32].includes(p.id)))assert.ok([1,2].includes(competition.dbLimit(p)));assert.equal(competition.localLimit(players[6]),1);assert.equal(competition.localLimit(players[31]),1);
 for(let f=0;f<=12;f++)assert.deepEqual(competition.fatigueRules(f),{xp:f<=3?1:0,penalty:f<8?0:f<10?.35:.85});
 const neutral=fixture('mujica');neutral.prep=6;
 for(const p of players)for(const context of ['local','team','official','national','book']){const values=[];for(const f of [0,3,4,5,6,7]){neutral.fatigue[p.id]=f;values.push(profileEffects(p,neutral,context,neutral.team));}assert.ok(values.every(v=>v===values[0]),p.name+' penalizado antes de 8');}
 for(const [level,type,threshold] of [['local','individual',8],['local','team',4],['regional','individual',8],['national','individual',32],['ycs','individual',32],['continental','individual',32]]){
  assert.equal(competition.eventWear(level,type,threshold),0);assert.ok(competition.eventWear(level,type,threshold+1)>0);
  const s=fixture('mujica');s.fatigue[9]=5;const xp=s.xp[9]||0;competition.recordTournament(s,{level,type},[{real:true,id:9,club:'mujica',place:threshold,wins:4,losses:1}],{9:5},{9:1},()=>10);assert.equal(s.fatigue[9],5);assert.equal(s.xp[9],xp);
 }
 const balanced=players.find(p=>competition.localLimit(p)===2&&competition.dbLimit(p)===2);assert.ok(balanced);assert.equal(competition.eventWear('local','individual',9,1)+competition.eventWear('local','individual',9,2),3);
 console.log('OK: límites DB 4/3/1–2, contrapartida local, fatiga 0–12, rendimiento idéntico 0–7 para 40 perfiles y seis exenciones exactas.');
 const db=fixture('mujica');db.fatigue[9]=5;competition.setDays(db,9,1);const a=competition.resolveTesting(db,true,()=>.5,()=>.25);assert.equal(a.find(r=>r.id===9).xp,0);const saved=JSON.stringify(db);competition.resolveTesting(db,true,()=>.5);assert.equal(JSON.stringify(db),saved);assert.equal(competition.setDays(db,9,9),false);
 const first=fixture();assert.equal(competition.rankings(first,'online')[0].id,7);assert.equal(competition.rankings(first,'online')[1].id,32);assert.ok(competition.rankings(first,'national').find(r=>r.id===6).place<=3);assert.notDeepEqual(competition.rankings(first,'national').slice(0,10).map(x=>x.id),competition.rankings(first,'online').slice(0,10).map(x=>x.id));
 for(const row of competition.rankings(db,'online'))assert.equal(row.score,row.parts.performance*.6+row.parts.quality*.25+row.parts.specialty*.15);
 const r=db.competition.online[9],beforeRank=competition.rankings(db,'online').find(p=>p.id===9).score;r.matches*=2;r.wins*=2;r.sessions*=2;r.qualitySum*=2;assert.equal(competition.rankings(db,'online').find(p=>p.id===9).score,beforeRank);
 assert.equal(characterNews.length,80);for(const p of players)assert.equal(characterNews.filter(n=>n.character===p.id).length,2);assert.equal(new Set(characterNews.map(a=>a.title)).size,80);assert.equal(new Set(characterNews.map(a=>a.body)).size,80);
 const news=fixture('mujica'),summary=[];for(let week=1;week<=52;week++){news.week=week;const a=publishCharacterNews(news,{},()=>.5);assert.ok(a);if(a.parent)assert.ok(newsState(news).published.some(p=>p.template===a.parent&&a.week-p.week>=3));const saved=JSON.stringify(news);assert.equal(publishCharacterNews(news).id,a.id);assert.equal(JSON.stringify(news),saved);summary.push({week,id:a.id,character:a.character,category:a.personality,parent:a.parent});}
 assert.equal(new Set(summary.slice(0,20).map(a=>a.category)).size,5);assert.ok(summary.slice(0,20).some(a=>a.parent));assert.equal(news.press.articles.filter(a=>a.special).length,52);
 console.log('OK: 80 noticias, 52 publicaciones únicas, continuidad, cinco categorías en 20 semanas, efectos idempotentes y fórmula DB exacta sin premio por volumen.');
 const old=fixture('haru');delete old.social;delete old.competition;old.week=12;const ownership={...old.owned},credits=old.credits;social.upgrade(old);competition.competitionState(old);assert.deepEqual(old.owned,ownership);assert.equal(old.credits,credits);
 const partial=fixture();partial.social={};social.upgrade(partial);assert.deepEqual(partial.social.history,[]);const aligned=fixture('haru');foundation(aligned);const lineup=[...aligned.active],captain=aligned.captain;rivalRecruit(aligned,()=>.1);assert.deepEqual(aligned.active,lineup);assert.equal(aligned.captain,captain);
 const locked=fixture('mujica');locked.week=5;locked.characterNews={published:characterNews.filter(n=>n.id!=='person-3-1').map(n=>({...n,template:n.id,week:1})),ledger:{},rivalries:[]};assert.equal(publishCharacterNews(locked),null);locked.social.history.push({character:3,passed:true,week:4});assert.equal(publishCharacterNews(locked).template,'person-3-1');
 const loyalty=fixture('mujica');loyalty.owned[2]=loyalty.team;loyalty.circuit.decks[2].trust=0;loyalty.circuit.decks[2].since=1;memberState(loyalty,2).belonging=10;memberState(loyalty,2).lowWeeks=4;loyalty.week=8;assert.equal(social.reviewCommitment(loyalty)[0].left,false);loyalty.week=12;assert.equal(social.reviewCommitment(loyalty)[0].left,true);assert.equal(loyalty.owned[2],null);
 for(const p of players){const file=readFileSync(new URL('./public/assets/characters/duelist-'+String(p.id).padStart(2,'0')+'.webp',import.meta.url));assert.equal(file.toString('ascii',8,12),'WEBP');}
 writeFileSync(new URL('./news-v14-test-results.json',import.meta.url),JSON.stringify(summary,null,2));
 writeFileSync(new URL('./limits-v14.json',import.meta.url),JSON.stringify(players.map(p=>({id:p.id,name:p.name,personality:personality(p.id),darkBook:competition.dbLimit(p),locals:competition.localLimit(p),rest:social.restRecovery(p)})),null,2));
 console.log('OK: migración sin pérdida, abandono con advertencias, bajas desde semana 5 y 40 WebP existentes.');
}
if(process.argv[1]&&new URL(import.meta.url).pathname.toLowerCase().endsWith(process.argv[1].replaceAll('\\','/').split('/').at(-1).toLowerCase()))runTests();
