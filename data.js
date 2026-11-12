// Duel Circuit: contenido original para prototipo independiente.
// Ratings y potenciales reflejan decisiones de diseño; lo no confirmado es provisional.
export const teams = [
 {id:'korium',name:'Korium',kind:'Organización',focus:'Presupuesto y preparación',budget:33000,color:'#1bbab5'},
 {id:'garden',name:'Garden Team',kind:'Organización',focus:'Estrategias alternativas',budget:23000,color:'#91c65a'},
 {id:'mujica',name:'Mujica Team',kind:'Organización',focus:'Trillizos sincronizados',budget:25000,color:'#e0a854'},
 {id:'sekai',name:'Sekai',kind:'Local TCG',focus:'Comunidad y comercio',budget:26000,color:'#5194e0'},
 {id:'obelisk',name:'Obelisk',kind:'Medio',focus:'Información y audiencia',budget:25000,color:'#df9c48'},
 {id:'dima',name:'Dima',kind:'Local TCG',focus:'Competitivo',budget:26500,color:'#ac7bdc'},
 {id:'lair',name:'Lair',kind:'Local TCG',focus:'Experiencia presencial',budget:24500,color:'#d3778d'},
 {id:'haru',name:'Haru Card Shop',kind:'Local virtual',focus:'Dark Book',budget:24000,color:'#7fbcda'}
];
// favoriteDeck: etiqueta de estilo abstracta, no representación de cartas reales.
// traitCode usado por el motor de simulación.
const raw = [
 [1,'Mati Pico','La Joven Promesa',4.5,5,'combo','presion','Escolaridad','Niño prodigio',8600],
 [2,'Pulpoul McCartney','El Chico Sireno Man',3.5,4.5,'combo','offmeta','Pez Fuera del Agua','Monstruo de las Profundidades',4900],
 [3,'Julito','El Gordo Carisma',3,4.5,'control','social','No Nací para el Banco','Julito House',4200],
 [4,'Nico Morilla','El Samurái del Meta',3.5,null,'combo','racha','Bajón del Samurái','Racha del Samurái',4800],
 [5,'Julián Alegretti','El Científico Loco',4,5,'flex','universal','Fatiga de Testeo','Dominio de Laboratorio',7800],
 [6,'Felipe Zapata','El Abogado del Meta',5,5,'control','consistente','Agenda de Abogado','Mentalidad de Campeón',11000],
 [7,'Franco Parzano','El Barista del Dark Book',5,5,'combo','online','Enemigo de los Locales','Adicto al Dark Book',11000],
 [8,'Tayel Fernández','El Loco Elegante',5,5,'flex','consistente','Ausencia Estelar','Elegancia o Locura',11000],
 [9,'Thiago Mujica','El Jefe de los Trillizos',4,5,'combo','mujica','Dependencia Familiar','El Hermano Menor Manda',6200],
 [10,'Kevin Mujica','El Caos de los Mujica',3.5,5,'aggro','mujica','Una de Cal y Una de Arena','Día de Gloria',4500],
 [11,'Johnny Mujica','La Voz de la Razón',4,4.5,'control','mujica','Dependencia Familiar','Equilibrio del Trío',5700],
 [12,'Matías López','Acevedo',3,5,'flex','retirado','Óxido Competitivo','Viejo Rey',4300],
 [13,'Mikazuchi','El Campeón del Ayer',4,5,'control','veterano','Lobo Solitario','Instinto de Campeón',5900],
 [14,'Juli Jiménez','El Jujeño Campeón',4.5,5,'flex','nacional','Apariciones Selectivas','El Jujeño Campeón',7200],
 [15,'Krawler','El Grito del Circuito',2.5,4,'aggro','caos','Silencio, por Favor','Frecuencia Insoportable',2400],
 [16,'Carlitos Vala','El Rey Raro',4,4.5,'offmeta','caos','Experimentos Fallidos','El Rey Raro',5500],
 [17,'Therian','La Bestia del Circuito',2,4.5,'control','caos','Lobo Solitario','Aura Fétida',2000],
 [18,'Alan','El Héroe',1,3.5,'flex','apoyo','¡Hay una emergencia!','Compañero Ejemplar',400],
 [19,'Fabio','El Estuñador',3.5,4.5,'control','asfixia','Juego Lento','Constrictor Mental',4800],
 [20,'Franquito','El Pilar',3,4,'control','tester','Carácter Agresivo','Pilar del Testeo',3800],
 [21,'Mateo Blanco','El Experto en Dragones',2.5,4,'combo','medio','Demasiado Dragón','Sangre de Dragón',3000],
 [22,'Julián Malek','El Periodista',3,5,'flex','medio','Siempre Hay una Noticia','Primicia Exclusiva',5000],
 [23,'Tomás Dark Duguera','El Emo del Lluvio',4.5,5,'control','consistente','Pocas Palabras','Presión Silenciosa',8300],
 [24,'Joaquín Pohaji','El Inconvencional',4.5,5,'offmeta','offmeta','Demasiado Experimental','Estratega Inconvencional',8300],
 [25,'Gaby Kaibaman','El Novato Incansable',1,4.5,'flex','aprendiz','Errores de Principiante','Aprendizaje sin Límites',700],
 [26,'Joako Polonia','El Jugador de una Sola Carta',1.5,3,'combo','especialista','No Me Cambies Nada','Mi Mazo, Mis Reglas',1100],
 [27,'El Pollo','El Rey del Dark Book',2,4,'flex','online','Fuera de la Pantalla','Guerrero del Teclado',1800],
 [28,'Juani el Gigante','El Estratega del Side Deck',2.5,4,'control','side','Siempre Arranco Perdiendo','Plan B',2600],
 [29,'Johan Cruif','El Especialista de Locales',3,3.5,'aggro','local','La Cancha de Afuera','Dueño de Casa',3300],
 [30,'Aquiles','El Capitán Solidario',3,4,'flex','apoyo','Primero los Demás','Todos Juntos',3900],
 [31,'Cavero','El Cazador de Metas',3.5,4.5,'control','antimeta','No Estaba en la Lista','Antimeta',5200],
 [32,'Manu','El Subcampeón Eterno',4,5,'combo','online2','La Maldición del Noveno','El Segundo del Servidor',6400],
 [33,"Julián D'Angelo",'El Primer Guerrero de Korium',4,4.5,'combo','korium','Odio al Stun','Habitual del Top',6500],
 [34,'Mauro','El Dueño de Korium',2,3.5,'flex','finanzas','No Soy el Duelista','La Billetera de Korium',3200],
 [35,'Christopher Morán','El Payaso',2.5,3.5,'offmeta','garden','Top 14 Legendario','Nunca el Mejor Mazo',2800],
 [36,'Leo Rosendorn','El Intenso',4,5,'control','garden','Modo Monólogo','Pasión sin Fin',7000],
 [37,'Nico TCG','El Gigante de Sekai',3.5,5,'flex','sekai','Demasiado Buen Compañero','El Vendedor de Sekai',5800],
 [38,'Facundo Pacini','El Genio del Ruling',4,5,'control','ruling','Todos Preguntan','La Enciclopedia del Ruling',7300],
 [39,'Valeria Noctis','La Reina de las Sombras',4,4.5,'antimeta','espia','Información Insuficiente','Los Secretos del Rival',6000],
 [40,'Dante Voss','El Tirano del Duelo',4.5,5,'control','tirano','Nadie Me Da Órdenes','Dominio Absoluto',8000]
];
export const players=raw.map(([id,name,alias,stars,potential,style,traitCode,negative,positive,price])=>({id,name,alias,stars,potential,style,traitCode,negative,positive,price}));
export const styleNames={aggro:'Aggro',combo:'Combo',control:'Control',offmeta:'Off-Meta',antimeta:'Anti-Meta',flex:'Flexible'};
export const approaches = [
 {name:'Combo', styles:['combo']}, {name:'Control', styles:['control']},
 {name:'Aggro', styles:['aggro']}, {name:'Mixto', styles:['flex','offmeta']},
 {name:'Push', styles:['antimeta','aggro']}
];
export const formats = Array.from({length:25}, (_, i) => {
 const approach = approaches[i % 5];
 const breadth = 2 + ((Math.floor(i / 5) + i + 1) % 5);
 return {...approach, breadth, axis:i % 5, name:`${breadth===6?'Abierto (6+)':breadth+' mazos'} · ${approach.name}`};
});
export const initialAssignments={
 korium:[33,34,5,1,19], garden:[35,36,24,26,18], mujica:[9,10,11,20,30],
 sekai:[37,38,29,28,25], obelisk:[21,22,23,31,27], dima:[6,12,13,15,16],
 lair:[8,14,17,39,40],haru:[7,32,2,3,4]
};
// Obelisk y algunos otros miembros son distribuciones *provisionales* de beta.
export const defaultTraitText={
 escolaridad:'Puede perder eventos por obligaciones escolares.',ruling:'Disminuye errores en interacciones complejas.'
};
