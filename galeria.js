import {players} from './data.js';
import {avatar,ranks} from './avatars.js';

const gallery=document.querySelector('#portrait-gallery');
for(const player of players){
 const card=document.createElement('article');
 card.className='duel-card';
 card.innerHTML=avatar(player);
 const name=document.createElement('strong');
 name.textContent=player.name;
 const description=document.createElement('div');
 description.className='muted small';
 description.textContent=player.alias+' · #'+ranks[player.id]+' del ranking inicial';
 card.append(name,description);
 gallery.append(card);
}
