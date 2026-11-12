import {players} from './data.js';
import {abilities} from './mechanics.js';
import {profileStats} from './encyclopedia.js';
const clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,n));
export const dbLimit=p=>p.id===7?4:p.id===32?3:(abilities[p.id-1].book>0||profileStats(p)[2]>=65?2:1);
export const localLimit=p=>abilities[p.id-1].absence||abilities[p.id-1].book>0?1:2;
export const fatigueRules=f=>({xp:f<=3?1:0,penalty:f<8?0:f<10?.35:.85});
export const exemptPlace=(level,type)=>level==='local'?(type==='team'?4:8):level==='regional'?8:32;
export const eventWear=(level,type,place,count=1)=>place<=exemptPlace(level,type)?0:level==='local'?(count===1?1:2):3;
export function competitionState(s){
 const c=s.competition??={version:14,days:{},resolved:{},online:{},national:{},previous:{national:[],online:[]},rankingWeek:0};
 for(const p of players){
  c.national[p.id]??={points:0,events:0};
  // Historical priors seed the first ranking only; observed averages replace them.
  c.online[p.id]??={matches:0,wins:0,qualitySum:0,sessions:0,history:[]};
 }
 return c;
}
export function setDays(s,id,days,allowed=true){
 const p=players.find(p=>p.id===id);if(!p||!allowed||s.owned[id]!==s.team||!Number.isInteger(days)||days<0||days>dbLimit(p))return false;
 competitionState(s).days[id]=days;return true;
}
const specialty=p=>clamp(p.stars*10+profileStats(p)[2]*.25+(abilities[p.id-1].book||0)*70+(abilities[p.id-1].bookXP||0));
const priorPerformance=p=>p.id===7?96:p.id===32?90:clamp(p.stars*12+(abilities[p.id-1].book||0)*45);
const priorQuality=p=>p.id===7?92:p.id===32?88:clamp(profileStats(p)[2]*.8+(abilities[p.id-1].bookXP||0));
export function onlineComponents(s,p){
 const r=competitionState(s).online[p.id];
 return {performance:r.matches?100*r.wins/r.matches:priorPerformance(p),quality:r.sessions?r.qualitySum/r.sessions:priorQuality(p),specialty:specialty(p)};
}
export function rankings(s,kind){
 const c=competitionState(s),previous=c.previous[kind]||[];
 return players.map(p=>{
  const parts=onlineComponents(s,p),r=c.national[p.id];
  const prior=p.stars*12+profileStats(p)[0]*.2+(abilities[p.id-1].official||0)*20+(abilities[p.id-1].national||0)*25;
  const score=kind==='online'?.6*parts.performance+.25*parts.quality+.15*parts.specialty:r.points+prior*Math.max(0,1-((s.week||1)-1)/8);
  return {id:p.id,score,parts,previous:previous.indexOf(p.id)+1};
 }).sort((a,b)=>b.score-a.score||a.id-b.id).map((p,i)=>({...p,place:i+1,change:p.previous?p.previous-i-1:0}));
}
export function startRankingWeek(s){const c=competitionState(s);if(c.rankingWeek===s.week)return;c.previous={national:rankings(s,'national').map(r=>r.id),online:rankings(s,'online').map(r=>r.id)};c.rankingWeek=s.week;}
export function recordTournament(s,event,standings,starts,used,points){
 const c=competitionState(s),gains={};
 for(const row of standings){
  const ids=row.members?.filter(p=>p.real).map(p=>p.id)||(row.real?[row.id]:[]);
  for(const id of ids){
   const xp=(row.wins*5+row.losses*3)*fatigueRules(starts[id]||0).xp;
   s.xp[id]=(s.xp[id]||0)+xp;gains[id]=xp;
   s.fatigue[id]=clamp((s.fatigue[id]||0)+eventWear(event.level,event.type,row.place,used[id]||1),0,12);
   if(event.level!=='local'){c.national[id].points+=points(event.level,row.place);c.national[id].events++;}
  }
 }
 return gains;
}
export function resolveTesting(s,allowed,chance,random=Math.random){
 const c=competitionState(s);if(c.resolved[s.week])return c.resolved[s.week];
 const results=[];c.resolved[s.week]=results;
 if(!allowed){c.days={};return results;}
 const days={...c.days};for(const p of players)if(s.owned[p.id]&&s.owned[p.id]!==s.team)days[p.id]=Math.min(dbLimit(p),1+(s.week+p.id)%2);
 for(const p of players){
  const count=Math.min(dbLimit(p),Math.max(0,days[p.id]||0));
  if(s.owned[p.id]===s.team&&!count)continue;
  if(!s.owned[p.id]||!count)continue;
  for(let day=1;day<=count;day++){
   const initial=s.fatigue[p.id]||0,matches=[];let wins=0;
   for(let round=0;round<4;round++){
    const pool=players.filter(q=>q.id!==p.id),q=pool[Math.floor(random()*pool.length)];
    const won=random()<chance(p,q);wins+=Number(won);matches.push({round:round+1,opponent:q.name,opponentId:q.id,won});
   }
   const d=s.circuit.decks[p.id],known=s.circuit.scouting[s.owned[p.id]],style=d.style;
   const learned=Math.min(3,100-known[style]);known[style]+=learned;
   const adapted=Math.min(4,d.adaptation);d.adaptation-=adapted;d.mastery[style]=clamp(d.mastery[style]+2);
   const quality=clamp(35+learned*10+adapted*5+(profileStats(p)[2]/100)*15);
   const xp=Math.round((12+wins*3+(abilities[p.id-1].bookXP||0)*.4)*fatigueRules(initial).xp);
   s.xp[p.id]=(s.xp[p.id]||0)+xp;
   const record=c.online[p.id];record.matches+=4;record.wins+=wins;record.sessions++;record.qualitySum+=quality;
   record.history.push({week:s.week,day,wins,quality,xp});record.history=record.history.slice(-24);
   results.push({id:p.id,name:p.name,club:s.owned[p.id],day,wins,losses:4-wins,matches,xp,initialFatigue:initial,fatigue:s.fatigue[p.id]||0,quality,learned,adapted});
  }
 }
 c.days={};return results;
}
