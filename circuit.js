import {onlineResistance,relation} from './social.js';
import {players,teams,formats} from './data.js';
import {abilities} from './mechanics.js';
export const styles=['Aggro','Combo','Control','Push','Mixto'];
const wins=[[1,3],[2,4],[0,3],[1,4],[0,2]];
export const matchup=(a,b)=>a===b?0:wins[a].includes(b)?1:-1;
export const favorite=p=>({aggro:0,combo:1,control:2,antimeta:3,offmeta:4,flex:4})[p.style];
export const clamp=(n,min=0,max=100)=>Math.max(min,Math.min(max,n));
export const dominant=f=>styles.indexOf(f.name.split(' · ').at(-1));
export function distribution(f){
 const pivot=dominant(f),weights=[50,24,13,8,5];
 const spread=clamp((f.breadth-2)/4,0,1);
 return styles.map((_,i)=>(weights[(i-pivot+5)%5]*(1-spread*.67)+20*spread*.67)/100);
}
export const affinity=(p,f)=>{
 const fit=matchup(favorite(p),dominant(f));
 const value=3+fit+Number(p.style==='flex')+Number(f.breadth>=5&&p.style==='offmeta')-Number(f.breadth>=5&&p.traitCode==='korium');
 return ['D','C','B','A','S'][clamp(value-1,0,4)];
};
export function ensureCircuit(state){
 state.circuit??={};
 const c=state.circuit;
 c.decks??={};c.scouting??={};c.discovery??={};c.online??={};c.bookEntries??={};c.bookHistory??=[];
 c.reputation??={};c.negotiations??=[];c.relationships??={};
 for(const t of teams)c.scouting[t.id]??=[0,0,0,0,0];
 c.scouting.free??=[0,0,0,0,0];
 for(const p of players)c.decks[p.id]??={style:favorite(p),mastery:styles.map((_,i)=>i===favorite(p)?72:24+(p.id+i*7)%24),adaptation:0,trust:50,lastTalk:-4,history:[],since:state.week};
 const index=state.formatIndex||0;
 if(c.format!==index){
  if(c.format!==undefined){
   for(const t of Object.keys(c.scouting))c.scouting[t]=c.scouting[t].map(n=>Math.round(n*.35));
   c.discovery={};
  }
  c.format=index;
  const format=formats[c.format%formats.length];
  const popular=distribution(format);
  for(const p of players){
   const d=c.decks[p.id],versatile=p.id===5||p.style==='flex';
   const preferences=styles.map((_,i)=>d.mastery[i]*.22+(i===favorite(p)?8:0)+(i===d.style?(versatile?2:8):0)+matchup(i,dominant(format))*(versatile?13:8)+popular[i]*15+(p.id+i*13)%11);
   const chosen=preferences.indexOf(Math.max(...preferences));
   changeDeck(d,chosen,p,state.week,'Elección propia');
  }
 }
 return c;
}
function changeDeck(d,style,p,week,reason){
 if(style===d.style)return;
 d.history.push({week,from:d.style,to:style,reason});
 d.style=style;d.adaptation=clamp(75-d.mastery[style]+(p.id===2?14:0)-(p.id===5?18:0),8,85);
}
export function practice(c,id,amount){
 const d=c.decks[id];d.mastery[d.style]=clamp(d.mastery[d.style]+amount*.65);
 d.adaptation=clamp(d.adaptation-amount);
}
export function learn(c,club,style,amount){
 const info=c.scouting[club||'free'];
 if(info)info[style]=clamp(info[style]+amount);
}
export function metaPosition(style,f,c,club){
 const pop=distribution(f);
 const research=c.scouting[club||'free'];
 const discovery=c.discovery[style]||0;
 const rivals=Object.entries(c.scouting).filter(([id])=>id!==club&&id!=='free');
 const rivalKnowledge=rivals.reduce((sum,[,levels])=>sum+levels[style],0)/Math.max(1,rivals.length);
 const surprise=(1-pop[style])*Math.max(0,1-discovery/12)*(.18-rivalKnowledge*.0016);
 return pop.reduce((sum,w,i)=>sum+w*matchup(style,i),0)*.28+surprise+(research[dominant(f)]||0)*.0015;
}
export function duelChance(a,b){
 const normalize=x=>Number.isInteger(x)?x:Math.max(0,styles.indexOf(x));
 const stylesA=(a.styles||[a.style]).map(normalize),stylesB=(b.styles||[b.style]).map(normalize);
 const tactical=stylesA.reduce((sum,x)=>sum+stylesB.reduce((n,y)=>n+matchup(x,y),0),0)/(stylesA.length*stylesB.length);
 return clamp(1/(1+Math.exp(-((a.power-b.power)*1.25+tactical*.52))),.08,.92);
}
export function talk(state,p,style,mode,near,random=Math.random){
 const c=ensureCircuit(state),d=c.decks[p.id];
 if(state.week-d.lastTalk<4||state.owned[p.id]!==state.team||!Number.isInteger(style)||style<0||style>4)return null;
 d.lastTalk=state.week;
 const chance=mode==='keep'?95:clamp(25+relation(state,p.id)*.18+d.trust*.42+d.mastery[style]*.18+(state.synergy||0)*.9+Math.min(8,state.week-d.since)+(state.morale[state.team]||0)*2+(p.id===5?10:p.id===2?-10:0)-(near?12:0),12,95);
 const ok=random()*100<chance;
 if(ok){if(mode==='change'||mode==='try'){d.trial=mode==='try'&&style!==d.style?d.style:null;changeDeck(d,style,p,state.week,mode==='try'?'Prueba acordada':'Cambio acordado');}else if(mode==='adapt')practice(c,p.id,12);d.trust=clamp(d.trust+4);}
 else if(style!==favorite(p))d.trust=clamp(d.trust-2);
 return {ok,chance};
}
export const bond=(c,a,b)=>c.relationships[[a,b].sort().join(':')]||0;
export function relate(c,a,b,amount){
 if(a&&b&&a!==b){const key=[a,b].sort().join(':');c.relationships[key]=clamp(bond(c,a,b)+amount);}
}
export const unlocked=(relation,reputation)=>relation>=50||reputation>=35;
export const discount=(relation,reputation=0)=>Math.min(.4,(relation>=85?.30:relation>=70?.20:relation>=50?.10:relation>=25?.05:0)+Math.min(.1,reputation/1000));
export function valuation(p,stars,form,demand){
 const [lo,hi]=stars<=1.5?[80,140]:stars<=2.5?[150,240]:stars<=3.5?[250,400]:stars<=4?[450,600]:stars<=4.5?[650,850]:[900,1200];
 return Math.round(lo+(hi-lo)*clamp(.33+(p.potential??stars)-stars+(abilities[p.id-1].team||0)+form*.07+demand*.35,0,1));
}
export const onlineStatus=(c,id)=>c.online[id]??={count:0,streak:0,obsession:0,exhaustion:0};
export const onlineEligible=(state,id,physical)=>Boolean(state.circuit.decks[id])&&(physical<2||[7,27,32].includes(id));
export function onlineLoad(state,p,wins,physical,random=Math.random){
 const c=state.circuit,o=onlineStatus(c,p.id),d=c.decks[p.id];
 if(o.count>=4)return 0;
 o.count++;
 const fatigue=state.social?(p.id===7?0:Math.max(0,o.count-onlineResistance(p))*2):[1,2,3,4][Math.min(o.count-1,3)]+(physical?1:0)+(o.obsession?1:0);
 state.fatigue[p.id]=clamp((state.fatigue[p.id]||0)+fatigue,0,10);
 const bonus=abilities[p.id-1].bookXP||0;
 const xp=Math.max(2,Math.round((12+wins*3+bonus*.4)*[1,.65,.35,.17][Math.min(o.count-1,3)]));
 state.xp[p.id]=(state.xp[p.id]||0)+xp;
 practice(c,p.id,Math.max(2,8-o.count)+(o.obsession?3:0));
 if(o.count>=3&&o.streak>=1&&random()<clamp(.1+o.streak*.13+(state.fatigue[p.id]||0)*.035+wins*.015+(bonus? .08:0)+(state.morale[state.team]||0)*.02+(d.trust<35?.04:0),.1,.9))o.obsession=3;
 if(o.count>=4&&random()<clamp(.30+(state.fatigue[p.id]||0)*.02-(bonus?.12:0),.1,.65)){o.exhaustion=1;d.trust=clamp(d.trust-3);state.morale[state.team]=Math.max(-2,(state.morale[state.team]||0)-1);}
 return xp;
}
export function advanceCircuit(state){
 const c=state.circuit;
 for(const p of players){
  const o=onlineStatus(c,p.id),d=c.decks[p.id];
  if(o.count<2)o.obsession=Math.max(0,o.obsession-1);
  o.streak=o.count>=3?o.streak+1:Math.max(0,o.streak-1);
  if(o.count>=3)d.trust=clamp(d.trust-(relation(state,p.id)>=30?0:2));
  if(o.obsession&&o.count>=2){d.trust=clamp(d.trust-2);if(state.owned[p.id]===state.team)state.morale[state.team]=Math.max(-2,(state.morale[state.team]||0)-1);}
  if(!o.count)o.exhaustion=0;
  if(Number.isInteger(d.trial)){changeDeck(d,d.trial,p,state.week+1,'Fin de la prueba');d.trial=null;}
  o.count=0;
 }
 c.bookEntries={};
 for(const i of styles.keys())c.discovery[i]=Math.max(0,(c.discovery[i]||0)-.4);
}
