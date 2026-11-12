export const personalityGroups={
 serios:[5,6,11,13,14,16,34,38],amables:[1,7,18,28,29,32,33,37],
 extrovertidos:[2,3,8,10,19,22,24,36],villanos:[9,12,15,17,31,35,39,40],deprimidos:[4,20,21,23,25,26,27,30]
};
export const personalityNames={serios:'Serio',amables:'Amable',extrovertidos:'Extrovertido',villanos:'Villano',deprimidos:'Deprimido'};
export const personality=id=>Object.keys(personalityGroups).find(k=>personalityGroups[k].includes(Number(id)));
export const personalityLabel=id=>Number(id)===35?'Villano alegre':personalityNames[personality(id)];
// Each line is an individual voice, not a diagnosis or a real-world biography.
export const voices=[
 'Quiero compartir mis rutas sin descuidar la escuela.', '¡Que el grupo vea lo que puede salir de esta marea!',
 'Me importa que la mesa tenga una voz para todos, incluida la mía.', 'Hoy cuesta encontrar el ritmo; me serviría un primer paso posible.',
 'Una hipótesis merece una prueba que otro pueda repetir.', 'Acordemos una agenda y conclusiones que podamos defender.',
 'Si el registro me ayudó, también puede ayudarle a otro.', 'La alternativa merece una presentación tan cuidada como la lista.',
 'Quiero que nuestros tres lugares sean una ventaja negociada, no una concesión.', 'Puedo encender la serie, pero quiero que mis hermanos participen del plan.',
 'Repartamos responsabilidades antes de buscar culpables.', 'No voy a vivir del pasado: negociemos qué lugar puedo volver a ganar.',
 'Dame tiempo para analizar; después discutimos una conclusión concreta.', 'Mi preparación necesita objetivos exigentes y un calendario serio.',
 'Puedo desafiar al favorito sin regalarle mi concentración.', 'La rareza también debe rendir cuentas: traigamos resultados del experimento.',
 'Si querés mi lectura de control, ofreceme una negociación que respete mi espacio.', 'Podemos ayudar, pero también tenemos que cuidar al que ayuda.',
 'Quiero mostrar cómo cierro el espacio y escuchar qué vio el grupo.', 'Estoy cansado de empujar solo; una tarea compartida me haría bien.',
 'Quiero volver a confiar en mis dragones sin negar lo que tengo que corregir.', 'Esta historia merece una buena entrevista y datos comprobados.',
 'Puedo explicar esa ventana de juego, aunque hoy me cueste encontrar palabras.', 'Me entusiasma presentar algo distinto y dejar que otros lo pongan a prueba.',
 'Me equivoqué otra vez; ayudame a encontrar una cosa que sí pueda mejorar.', 'No quiero que cada derrota borre el sentido de mi carta favorita.',
 'En la pantalla encuentro algo de confianza; quiero llevarla también a la mesa.', 'Podemos compartir las respuestas para no empezar siempre desde atrás.',
 'Quiero que quien llega a una sala nueva encuentre un compañero.', 'También necesito apoyo; a veces me olvido de pedírselo al equipo.',
 'Si el rival cree que ya conoce mis respuestas, preparemos una segunda amenaza.', 'Prefiero aprender ese cierre con alguien antes que pelearme con el apodo.',
 'Quiero que las rutas de Korium sirvan a todo el grupo.', 'Primero el presupuesto completo; después decidimos la inversión.',
 'Puedo hacerte reír y disputarte el puesto en la misma tarde. Traé un plan.', 'Tengo una lectura que quiero compartir; denme una mesa para demostrarla.',
 'Sekai funciona mejor cuando también reservamos un turno para quien ayuda.', 'No responderé una interacción sin reconstruir su orden.',
 'Una amenaza bien elegida vale más que fingir que lo sé todo.', 'Negociemos la autoridad: aceptar un criterio no es obedecer a ciegas.'
];
export const socialWeights={serios:{trust:2,motivation:2,synergy:0},amables:{trust:3,motivation:2,synergy:1},extrovertidos:{trust:1,motivation:3,synergy:1},villanos:{trust:2,motivation:3,synergy:0},deprimidos:{trust:2,motivation:4,synergy:0}};
