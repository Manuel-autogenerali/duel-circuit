export const financeRules={maintenance:18,administration:12,perPlayer:8,physicalShop:12,virtualShop:8,evaluationInterval:4,penalty:35};
const shops={sekai:'physical',dima:'physical',lair:'physical',haru:'virtual'};
export function financeState(state){
 const f=state.finance??={regionalWeeks:[],activeSince:null,clubs:{},lastWeek:0};
 const old=[...(state.suspensions||[]).map(e=>({week:e.week,name:e.event})),...(state.history||[])];
 for(const e of old)if(e.name?.startsWith('Regional')&&!f.regionalWeeks.includes(e.week))f.regionalWeeks.push(e.week);
 f.regionalWeeks.sort((a,b)=>a-b);
 if(f.activeSince===null&&f.regionalWeeks.length>=2)f.activeSince=f.regionalWeeks[1]+1;
 return f;
}
export function costs(team,size){
 return {maintenance:financeRules.maintenance,administration:financeRules.administration,roster:size*financeRules.perPlayer,shop:shops[team]==='physical'?financeRules.physicalShop:shops[team]==='virtual'?financeRules.virtualShop:0};
}
const account=(f,id)=>f.clubs[id]??={debt:0,played:0,good:0};
export function settleFinance(state,week,events,teamIds){
 const f=financeState(state);
 for(const e of events)if(e.name?.startsWith('Regional')&&!f.regionalWeeks.includes(week))f.regionalWeeks.push(week);
 if(f.activeSince===null&&f.regionalWeeks.length>=2)f.activeSince=week+1;
 if(f.activeSince===null||week<f.activeSince||f.lastWeek>=week)return null;
 f.lastWeek=week;
 const details={};
 for(const id of teamIds){
  const club=account(f,id);
  const rows=events.map(e=>({size:e.standings?.length||0,rows:(e.standings||[]).filter(p=>p.club===id)}));
  club.played+=rows.filter(e=>e.rows.length).length; club.good+=rows.filter(e=>e.rows.some(p=>p.place<=Math.ceil(e.size/2))).length;
  const evaluation=(week-f.activeSince+1)%financeRules.evaluationInterval===0;
  const passed=evaluation?club.played>=2&&club.good>=1:null;
  const review=evaluation?{passed,played:club.played,good:club.good}:null;
  const charges=costs(id,Object.values(state.owned).filter(t=>t===id).length);
  if(state.social){charges.roster=0;charges.maintenance=0;}
  const penalty=passed===false?financeRules.penalty:0;
  const previousDebt=club.debt;
  const due=Object.values(charges).reduce((n,v)=>n+v,0)+penalty+previousDebt;
  if(id!==state.team)state.rivalBudgets??={};
  const balance=id===state.team?state.credits:(state.rivalBudgets[id]??100);
  const paid=Math.min(Math.max(0,balance),due);
  if(id===state.team)state.credits-=paid;
  else state.rivalBudgets[id]=balance-paid;
  club.debt=due-paid;
  if(evaluation){club.played=0;club.good=0;}
  details[id]={charges,paid,debt:club.debt,previousDebt,penalty,review};
 }
 return details[state.team];
}
export function settleRivalDebt(state,id){
 const club=state.finance?.clubs[id];
 if(!club?.debt)return;
 const amount=Math.min(state.rivalBudgets[id],club.debt);
 state.rivalBudgets[id]-=amount;club.debt-=amount;
}

