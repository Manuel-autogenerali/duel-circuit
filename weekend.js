import {levelOf,venues} from './tournaments.js';
export const professionals={
 analyst:['Analista de metajuego',180,'Investigación de los cinco estilos',1,15,0,3,0],
 judge:['Especialista en rulings',145,'Experiencia técnica y dominio',1,4,0,7,14],
 trainer:['Entrenador competitivo',220,'Preparación y sinergia para competir',3,3,2,5,8],
 coach:['Coach de preparación',170,'Moral, recuperación y preparación',2,2,1,4,5],
 deck:['Especialista en mazos',195,'Adaptación acelerada de mazos',1,5,0,18,4]
};
export const importance={local:0,regional:1,national:2,ycs:2,continental:3};
export function weekend(week,calendar,legacyVenue){
 const venuesList=Object.keys(venues);
 const locals=venuesList.map((venue,i)=>{
  const day=(i+Math.floor((week-1)/2))%2;
  const type=(week+i)%4===0?'team':'individual';
  return {key:'venue:'+venue,venue,day,name:type==='team'?'Local 3v3':'Local individual',type,level:'local',context:type==='team'?'team':'local',stakes:3};
 });
 const legacy=locals.find(e=>e.venue===legacyVenue);
 if(legacy){legacy.key='local';locals.splice(locals.indexOf(legacy),1);locals.unshift(legacy);}
 const official=calendar.filter(e=>e.week===week).map(e=>({...e,key:e.name,day:e.day??1,level:levelOf(e)}));
 const candidates=[...locals,...official.filter(e=>e.level==='local').map(e=>({...e,venue:e.venue||venuesList[week%4]}))];
 const ranked=official.filter(e=>importance[e.level]).sort((a,b)=>importance[b.level]-importance[a.level]);
 return ranked.length?{events:[ranked[0]],special:ranked[0],suspended:[...candidates,...ranked.slice(1)].map(e=>({...e,status:'suspendido'})),online:false}
 :{events:candidates,special:null,suspended:[],online:true};
}
export function entryReason(state,event,id,events,cap){
 const limit=cap(state,id);
 if(!limit)return 'Ausente esta semana';
 const other=events.filter(e=>e.key!==event.key&&state.entries[e.key]?.includes(id));
 if(other.some(e=>e.day===event.day))return 'Ya tiene un torneo ese día';
 if(other.length>=limit)return 'Límite físico semanal alcanzado';
 return '';
}
export const guestChance=(relation,trust)=>Math.min(95,25+relation*.65+trust*.15);
