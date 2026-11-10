import {players} from './data.js';
import {profiles, profileRevisionKey, profileFor} from './encyclopedia.js';
import {favorite,styles} from './circuit.js';
const draftsKey='duel-circuit-profile-drafts-v1';
const load=key=>{try{return JSON.parse(localStorage.getItem(key)||'{}');}catch{return {};}};
const chooser=document.querySelector('#editor-character'),fields=document.querySelector('#editor-fields'),form=document.querySelector('#editor');
const message=text=>document.querySelector('#editor-message').textContent=text;
const names={history:'Historia',behavior:'Comportamiento',habit:'Hábitos',mentality:'Mentalidad',relationship:'Compañeros',loss:'Reacción ante derrotas',win:'Reacción ante victorias',positive:'Nombres de pasivas (tres líneas)',negative:'Nombres de negativas (tres líneas)',exclusive:'Nombre de la mecánica exclusiva',rulesProposal:'Propuesta de cambios de efectos o condiciones',styleProposal:'Estilo favorito propuesto',potentialProposal:'Potencial propuesto'};
for(const p of players)chooser.append(new Option(p.id+' · '+p.name,p.id));
function show(){
 const id=Number(chooser.value),p=players.find(p=>p.id===id);
 const data={...profileFor(id,localStorage),styleProposal:styles[favorite(p)],potentialProposal:p.potential??'',...load(draftsKey)[id]};
 fields.replaceChildren();
 for(const [key,name] of Object.entries(names)){
  const label=document.createElement('label'),input=document.createElement('textarea');
  label.textContent=name;
  input.rows=key==='history'?8:key==='positive'||key==='negative'?3:2;
  input.name=key;
  input.value=Array.isArray(data[key])?data[key].join('\n'):(data[key]??'');
  label.append(input);fields.append(label);
 }
 message('');
}
function values(){return Object.fromEntries(new FormData(form));}
function store(key,id,data){const all=load(key);all[id]=data;localStorage.setItem(key,JSON.stringify(all));}
chooser.addEventListener('change',show);
form.addEventListener('submit',e=>{e.preventDefault();store(draftsKey,chooser.value,values());message('Borrador guardado para este personaje.');});
document.querySelector('#approve').addEventListener('click',()=>{
 const data=values(),words=data.history.trim().split(/\s+/).length;
 const positive=data.positive.split('\n').map(s=>s.trim()).filter(Boolean),negative=data.negative.split('\n').map(s=>s.trim()).filter(Boolean);
 if(words<100||words>180||positive.length!==3||negative.length!==3){message('La historia necesita 100 a 180 palabras y tres nombres por grupo de habilidades.');return;}
 if(!confirm('¿Aprobar solo los cambios de texto para esta ficha?'))return;
 store(draftsKey,chooser.value,data);
 const {styleProposal,potentialProposal,rulesProposal,...text}=data;
 store(profileRevisionKey,chooser.value,{...text,positive,negative,review:'Texto aprobado en este navegador'});
 message('Textos aprobados. Las propuestas de reglas, estilo y potencial quedaron en el borrador.');
});
document.querySelector('#export-editor').addEventListener('click',()=>{
 const id=Number(chooser.value),payload={id,source:profiles[id],draft:values()};
 const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));
 const a=document.createElement('a');a.href=url;a.download='revision-duelista-'+String(id).padStart(2,'0')+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
show();
