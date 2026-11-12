import {duelChance} from './circuit.js';
export const venues = {sekai:'Sekai',dima:'Dima',lair:'Lair',haru:'Haru Card Shop (virtual)'};
export const structures = {
 local:{size:30,day1:5,day2:0,top:0,cut:0},
 regional:{size:120,day1:8,day2:0,top:8,cut:0},
 national:{size:700,day1:8,day2:2,top:32,cut:128},
 ycs:{size:500,day1:8,day2:2,top:32,cut:128},
 continental:{size:1000,day1:8,day2:3,top:32,cut:160}
};
const prizes={
 regional:[45,30,20,10],national:[100,70,50,35,22,12],continental:[150,105,75,50,32,18]
};
export function levelOf(event){
 if(event.level)return event.level;
 if(event.name.startsWith('Regional'))return 'regional';
 if(event.name.startsWith('Nacional'))return 'national';
 if(event.name.startsWith('YCS'))return 'ycs';
 if(event.name.startsWith('Continental'))return 'continental';
 return event.name.startsWith('Clasificatorio')?'regional':'local';
}
export const rankingPrize=(level,place)=>(prizes[level==='ycs'?'national':level]||[])[Math.ceil(Math.log2(place))]||0;
export const roleWeight=(id,active,captain)=>id===captain?2:active.includes(id)?1:.5;

function npc(i,random,weights){
 const styles=['Aggro','Control','Combo','Push','Mixto'];
 let sample=random();
 const chosen=weights?.findIndex(weight=>(sample-=weight)<0);
 const style=chosen>=0?chosen:i%styles.length, stars=Math.round((1.5+random()*3.25)*2)/2;
 return {id:'npc-'+i,name:['Álex','Cris','Dani','Fran','Jules','Max','Nico','Sam'][i%8]+' '+['Vega','Ríos','Luna','Sosa','Costa','Solís'][Math.floor(i/8)%6]+' #'+(i+1),
  stars,style:styles[style],deck:['Ataque relámpago','Bastión táctico','Cadena arcana','Presión de campo','Caja de herramientas'][style],
  power:stars,stats:{technique:Math.round(stars*18),consistency:Math.round(stars*15+10)}};
}
export function buildField(event,participants,random=Math.random,weights){
 const level=levelOf(event), team=event.type==='team';
 const size=team?(level==='local'?10:Math.floor(structures[level].size/3)):structures[level].size;
 const field=[...participants].slice(0,size);
 while(field.length<size){
  const i=field.length;
  if(!team){field.push(npc(i,random,weights));continue}
  const members=Array.from({length:3},(_,j)=>npc(i*3+j,random,weights));
  field.push({id:'team-npc-'+i,name:'Trío invitado '+(i+1),members,styles:members.map(p=>p.style),power:members.reduce((n,p)=>n+p.power,0)/3});
 }
 return field;
}

export function swissTournament(field,config,random=Math.random){
 const rows=field.map(p=>({...p,points:0,wins:0,losses:0,opponents:[],matches:[],bye:false}));
 const byId=new Map(rows.map(r=>[r.id,r]));
 const cut=Math.max(config.top,config.cut);
 const strength=r=>r.opponents.reduce((sum,id)=>{const o=byId.get(id);return sum+Math.max(1/3,o.wins/Math.max(1,o.wins+o.losses))},0)/Math.max(1,r.opponents.length);
 const order=list=>list.sort((a,b)=>b.points-a.points||strength(b)-strength(a)||String(a.id).localeCompare(String(b.id),'en',{numeric:true}));
 const match=(a,b)=>random()<duelChance(a,b)?a:b;
 let round=0;
 const rounds=(list,count)=>{
  for(let k=0;k<count;k++){
   round++;
   const pool=order([...list]);
   if(pool.length%2){
    let i=pool.length-1;while(i>0&&pool[i].bye)i--;
    const [p]=pool.splice(i,1);p.bye=true;p.points+=3;p.wins++;p.matches.push({round,opponent:'Bye',won:true});
   }
   while(pool.length){
    const a=pool.shift(), next=pool.findIndex(b=>!a.opponents.includes(b.id));
    const [b]=pool.splice(Math.max(0,next),1), winner=match(a,b), loser=winner===a?b:a;
    winner.points+=3;winner.wins++;loser.losses++;
    a.opponents.push(b.id);b.opponents.push(a.id);
    a.matches.push({round,opponent:b.name,won:winner===a});b.matches.push({round,opponent:a.name,won:winner===b});
   }
  }
 };
 rounds(rows,config.day1);
 const first=order([...rows]), day2=config.day2?first.slice(0,cut):first;
 if(config.day2)rounds(day2,config.day2);
 const swiss=[...order(day2),...(config.day2?first.slice(cut):[])];
 const bracket=[];
 let live=swiss.slice(0,config.top);
 const seed=ids=>ids.length<=2?ids:seed(ids.slice(0,ids.length/2)).flatMap(x=>[x,ids.length+1-x]);
 // Recursively mirror seeds so 1 and 2 can only meet in the final.
 if(live.length>1&&Number.isInteger(Math.log2(live.length)))live=seed(live.map((_,i)=>i+1)).map(i=>live[i-1]);
 while(live.length>1){
  const next=[];
  for(let i=0;i<live.length;i+=2){
   const a=live[i],b=live[i+1];if(!b){next.push(a);continue}
   const winner=match(a,b), loser=winner===a?b:a;
   loser.place=live.length/2+1;
   bracket.push({stage:live.length,winner:winner.name,loser:loser.name,winnerId:winner.id,loserId:loser.id});
   next.push(winner);
  }
  live=next;
 }
 if(live.length)live[0].place=1;
 const standings=swiss.map((r,i)=>({...r,place:r.place||i+1,tiebreak:strength(r),day2:Boolean(config.day2&&day2.includes(r))})).sort((a,b)=>a.place-b.place);
 return {standings,bracket,day1:config.day1,day2:config.day2,top:config.top,cut:config.day2?day2.length:0};
}

export function updateLocal(leagues,venue,mode,rows){
 leagues[venue]??={};
 leagues[venue][mode]??={};
 const league=leagues[venue][mode];
 for(const p of rows){
  if(!p.real)continue;
  const row=league[p.id]??={name:p.name,played:0,wins:0,losses:0,points:0,tiebreakSum:0,events:0};
  row.name=p.name;
  row.played+=p.wins+p.losses;row.wins+=p.wins;row.losses+=p.losses;
  row.points=row.wins*3;row.tiebreakSum+=p.tiebreak;row.events++;
 }
}
