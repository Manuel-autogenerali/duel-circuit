export const events15 = [
  {
    "id": 1,
    "code": "DC-E001",
    "character_index": 1,
    "character": "Mati Pico",
    "event_index_for_character": 1,
    "title": "La silla junto al capitán",
    "mili_intro": "Terminó un torneo local. Varios jugadores siguen en la tienda analizando partidas. Estás sentado con el capitán revisando una lista para el próximo fin de semana. Mati llega con sus anotaciones y ve una silla libre.",
    "stages": [
      {
        "index": 1,
        "speaker": "Mati Pico",
        "dialogue": "Che, ¿está libre esta silla? Quería revisar una mano que jugué hoy, pero veo que están ocupados con la lista del torneo. ¿Qué hacemos?",
        "options": [
          {
            "id": "A",
            "text": "Sentate. Revisemos tu mano antes de seguir con la lista.",
            "reaction": "Mati deja sus cartas sobre la mesa. «Dale, son dos minutos. Me quedó re picando una decisión».",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Dame unos minutos para cerrar esto con el capitán y después la vemos tranquilos.",
            "reaction": "«Dale, no hay drama», dice Mati. Se queda cerca, aunque guarda sus anotaciones por ahora.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Sumate a lo que estamos revisando; después usamos esa misma idea para analizar tu partida.",
            "reaction": "«Bueno, puede servir», responde. Escucha la discusión, aunque todavía quiere hablar de su jugada.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Mati Pico",
        "dialogue": "Ahí está. Tenía dos líneas posibles y elegí esta. Los chicos me dijeron que la otra era mejor, pero no termino de entender por qué. ¿Vos qué opinás?",
        "options": [
          {
            "id": "A",
            "text": "Si varios jugadores vieron la otra línea, probablemente tengan razón.",
            "reaction": "«Puede ser, pero quería entender el razonamiento, no solamente saber cuál era mejor», explica.",
            "delta": -1
          },
          {
            "id": "B",
            "text": "Probemos las dos líneas ahora y quedémonos con la que gane más veces.",
            "reaction": "«Podemos hacerlo, pero creo que faltaría mirar qué información tenía del rival en ese momento», responde.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Contame qué estabas pensando en ese momento y comparemos las dos opciones.",
            "reaction": "«Eso. Porque en mi cabeza había una razón para hacer esta jugada», dice mientras acomoda las cartas.",
            "delta": 1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Mati Pico",
        "dialogue": "Me sirvió revisarlo. Igual, cuando todos opinan al mismo tiempo me cuesta explicar lo que pensé. ¿Cómo podríamos hacerlo la próxima?",
        "options": [
          {
            "id": "A",
            "text": "Podés traer la jugada escrita y la revisamos cuando haya menos gente.",
            "reaction": "«Sí, me sirve tenerla anotada. Aunque también me gustaría poder discutirla con los demás», responde.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Podemos pedirle a uno solo que la analice y después compartimos su conclusión.",
            "reaction": "«Es otra posibilidad, aunque está bueno escuchar distintas miradas», dice.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Primero explicás tu línea completa y después escuchamos las alternativas del grupo.",
            "reaction": "«Me gusta. Así por lo menos puedo terminar la idea antes de que me tiren cinco opciones», se ríe.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Mati guarda sus cartas y se queda un rato más compartiendo ideas con el grupo.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 4,
    "code": "DC-E004",
    "character_index": 2,
    "character": "Pulpoul McCartney",
    "event_index_for_character": 1,
    "title": "Peces fuera del agua",
    "mili_intro": "Pulpoul lleva años con sus mazos de peces. En una sesión de pruebas descubre que el formato cambió y su arquetipo ya no resuelve ciertos enfrentamientos como antes.",
    "stages": [
      {
        "index": 1,
        "speaker": "Pulpoul McCartney",
        "dialogue": "Me sale todo natural con peces, pero ahora me están pasando por arriba. ¿Cambio de mazo o sigo insistiendo?",
        "options": [
          {
            "id": "A",
            "text": "Probemos qué enfrentamientos fallan antes de decidir si el problema es el mazo o el plan.",
            "reaction": "«¡Ahí va! Eso sí que me entusiasma», dice con una sonrisa.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Elegí el mazo más popular y jugalo una semana; así al menos vas sobre seguro.",
            "reaction": "«Puede ser, pero así perdemos un poco de la gracia», bromea.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Seguí con peces hasta tener veinte partidas más, aunque los resultados sean malos.",
            "reaction": "«Mmm, no está mal, aunque me imaginaba otra cosa», comenta.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Pulpoul McCartney",
        "dialogue": "El mazo nuevo me funciona, pero siento que juego de memoria y no entiendo nada. ¿Cómo entrenamos?",
        "options": [
          {
            "id": "A",
            "text": "Que otro jugador lo pilotee mientras vos observás desde atrás.",
            "reaction": "«Te sigo, pero dejame darte otra vuelta a la idea», responde.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Armemos situaciones específicas y que me expliques en voz alta por qué elegís cada línea.",
            "reaction": "«¡Listo! Así hacemos algo de verdad», responde animado.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Sumemos partidas completas hasta que los combos salgan solos.",
            "reaction": "«Es una opción; quizá se nos quede un poco corta», considera.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Pulpoul McCartney",
        "dialogue": "Si termino compitiendo sin peces, ¿qué va a quedar del Pulpo?",
        "options": [
          {
            "id": "A",
            "text": "Podés reservar peces para las competencias donde no haya tantos puntos en juego.",
            "reaction": "«Podría salir bien, pero no termino de verlo», admite.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Te acostumbrarás enseguida cuando ganes un par de rondas con otra cosa.",
            "reaction": "«Bueno, lo intento; no te prometo estar convencido», se ríe.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Tu forma de pensar las partidas no depende de un solo arquetipo; usemos eso como ventaja.",
            "reaction": "«¡Perfecto! Después te cuento cómo salió», cierra con energía.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Pulpoul guarda la vieja caja de peces sin decidir todavía si será un recuerdo o una opción más.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 7,
    "code": "DC-E007",
    "character_index": 3,
    "character": "Julito «El Gordo Carisma»",
    "event_index_for_character": 1,
    "title": "La casa llena",
    "mili_intro": "Julito ofrece su casa para una juntada de testeo. Aparecen más personas de las que esperaba, y varias quieren quedarse jugando hasta la madrugada.",
    "stages": [
      {
        "index": 1,
        "speaker": "Julito «El Gordo Carisma»",
        "dialogue": "Che, yo dije que vinieran a probar, pero esto parece una YCS en el living. ¿Cómo ordenamos?",
        "options": [
          {
            "id": "A",
            "text": "Pediles que se organicen solos; vos sos el anfitrión, no el árbitro.",
            "reaction": "«Mmm, no está mal, aunque me imaginaba otra cosa», comenta.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Definamos mesas y horarios para que todos puedan testear sin invadir la casa.",
            "reaction": "«¡Ahí va! Eso sí que me entusiasma», dice con una sonrisa.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Aprovechemos que vino tanta gente y armemos un minitorneo improvisado.",
            "reaction": "«Puede ser, pero así perdemos un poco de la gracia», bromea.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Julito «El Gordo Carisma»",
        "dialogue": "Hay dos jugadores que quieren discutir una partida a los gritos. ¿Intervenís?",
        "options": [
          {
            "id": "A",
            "text": "Separemos a los dos por un rato, sin meternos en el análisis.",
            "reaction": "«Es una opción; quizá se nos quede un poco corta», considera.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Que lo resuelvan jugando otra partida y listo.",
            "reaction": "«Te sigo, pero dejame darte otra vuelta a la idea», responde.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Bajemos el tono y hagamos que expliquen sus jugadas de a uno.",
            "reaction": "«¡Listo! Así hacemos algo de verdad», responde animado.",
            "delta": 1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Julito «El Gordo Carisma»",
        "dialogue": "Algunos se quieren quedar una hora más. Yo estoy muerto, ¿cómo les digo que se terminó?",
        "options": [
          {
            "id": "A",
            "text": "Dejales una mesa y andate a descansar; que se encarguen ellos.",
            "reaction": "«Bueno, lo intento; no te prometo estar convencido», se ríe.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Avisá que se cierra a una hora concreta y agradecé que hayan venido.",
            "reaction": "«¡Perfecto! Después te cuento cómo salió», cierra con energía.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Apagá las luces de golpe, ya van a entender.",
            "reaction": "«Podría salir bien, pero no termino de verlo», admite.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "La casa vuelve a quedar en orden, con más anécdotas que rondas completas.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 10,
    "code": "DC-E010",
    "character_index": 4,
    "character": "Nico Morilla",
    "event_index_for_character": 1,
    "title": "La racha que pesa",
    "mili_intro": "Después de varias buenas actuaciones con Artmage, Nico empieza a recibir mensajes de gente que espera verlo ganar siempre. Una derrota en semifinales lo deja incómodo.",
    "stages": [
      {
        "index": 1,
        "speaker": "Nico Morilla",
        "dialogue": "Hasta ayer decían que era invencible y hoy preguntan qué me pasó. ¿Les respondo?",
        "options": [
          {
            "id": "A",
            "text": "Mejor no respondas a nadie hasta que vuelvas a ganar.",
            "reaction": "«Quizá. Igual me cuesta verlo tan sencillo», reconoce.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Si querés hablar, contá qué aprendiste sin convertir una derrota en un juicio sobre vos.",
            "reaction": "«Puede ser... al menos así sé por dónde empezar», responde despacio.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Mostrá tus resultados de las últimas semanas para que vean que seguís jugando bien.",
            "reaction": "«No sé, siento que quedaría algo pendiente», murmura.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Nico Morilla",
        "dialogue": "Me cuesta revisar esa semifinal sin enojarme conmigo. ¿Por dónde empiezo?",
        "options": [
          {
            "id": "A",
            "text": "Elegí una decisión puntual para analizar y separala del resultado final.",
            "reaction": "«Eso me resulta más manejable. Gracias», contesta.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Mirá la repetición completa varias veces hasta encontrar cada error.",
            "reaction": "«Podría intentarlo, aunque no estoy muy convencido», dice.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Dejá esa partida y enfocá toda la semana en el próximo rival.",
            "reaction": "«Entiendo, pero me da miedo que salga peor», admite.",
            "delta": -1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Nico Morilla",
        "dialogue": "¿Y si en el próximo local vuelvo a quedar afuera del top?",
        "options": [
          {
            "id": "A",
            "text": "Cambiá de mazo si el resultado vuelve a salir mal.",
            "reaction": "«No lo descarto, pero necesito pensarlo», responde.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Tomate una semana sin competir para no sumar otra frustración.",
            "reaction": "«Ojalá fuera tan fácil. Lo voy a considerar», dice.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Evaluemos la preparación y las decisiones; un puesto aislado no define tu nivel.",
            "reaction": "«Bueno... voy a probarlo. Me sirve tener algo concreto», cierra.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Nico conserva sus anotaciones y empieza a mirarlas como herramientas, no como un veredicto.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 13,
    "code": "DC-E013",
    "character_index": 5,
    "character": "Julián Alegretti",
    "event_index_for_character": 1,
    "title": "El científico y la hipótesis",
    "mili_intro": "Julián Alegretti presenta una teoría sobre el formato que contradice los resultados de una prueba reciente. Quiere decidir si refinarla o descartarla.",
    "stages": [
      {
        "index": 1,
        "speaker": "Julián Alegretti",
        "dialogue": "Mi hipótesis decía que Control debía ganar este cruce, pero perdimos seis partidas. ¿Cómo seguimos?",
        "options": [
          {
            "id": "A",
            "text": "Sigamos hasta ganar seis partidas para compensar el dato.",
            "reaction": "«No descarto esa opción. Me falta información para respaldarla», dice.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Revisemos el tamaño de la muestra y qué decisiones pudieron alterar el resultado.",
            "reaction": "«Eso es razonable. Prefiero tener un criterio claro», responde.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Cambiemos la hipótesis; seis partidas ya son una señal suficiente.",
            "reaction": "«Es viable, pero habría que revisar las condiciones», señala.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Julián Alegretti",
        "dialogue": "Un compañero insiste en cambiar tres cartas a la vez. ¿Lo probamos así?",
        "options": [
          {
            "id": "A",
            "text": "Cambiemos una variable por vez para poder atribuir el efecto.",
            "reaction": "«Bien. Así podemos comparar sin improvisar», afirma.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Probémoslo todo junto y después analizamos qué funcionó.",
            "reaction": "«Podría aceptarlo, aunque no resuelve todo el problema», observa.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Dejemos la lista sin tocar hasta el siguiente torneo oficial.",
            "reaction": "«Me parece prematuro. Evaluaría otra alternativa», replica.",
            "delta": -1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Julián Alegretti",
        "dialogue": "La mesa se aburre de anotar cada resultado. ¿Cómo mantenemos el método sin quemarlos?",
        "options": [
          {
            "id": "A",
            "text": "Dejá que los resultados los recuerde cada uno y los juntamos al final.",
            "reaction": "«Entiendo la intención. Preferiría definirlo con más precisión», dice.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Registramos solo los datos necesarios y alternamos quién toma notas.",
            "reaction": "«De acuerdo. Queda una decisión concreta y verificable», concluye.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Que anote quien pierda cada partida; así todos colaboran.",
            "reaction": "«Es un compromiso posible, pero demasiado abierto», considera.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Julián reorganiza su cuaderno: menos ruido, mejores preguntas y una hipótesis que vuelve a ponerse a prueba.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 16,
    "code": "DC-E016",
    "character_index": 6,
    "character": "Felipe Zapata",
    "event_index_for_character": 1,
    "title": "La planilla que no cierra",
    "mili_intro": "Felipe lleva un registro detallado de testeo y descubre que un compañero cargó resultados duplicados. El informe semanal ya está casi listo.",
    "stages": [
      {
        "index": 1,
        "speaker": "Felipe Zapata",
        "dialogue": "Nos aparecen más partidas de las que jugamos. ¿Publicamos el informe igual y corregimos después?",
        "options": [
          {
            "id": "A",
            "text": "Publicalo aclarando que los números son aproximados.",
            "reaction": "«Es viable, pero habría que revisar las condiciones», señala.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Quitá las partidas más recientes para compensar el exceso.",
            "reaction": "«No descarto esa opción. Me falta información para respaldarla», dice.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Frenemos el informe hasta identificar y depurar los datos duplicados.",
            "reaction": "«Eso es razonable. Prefiero tener un criterio claro», responde.",
            "delta": 1
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Felipe Zapata",
        "dialogue": "El compañero que cargó los datos se sintió señalado. ¿Cómo lo hablamos?",
        "options": [
          {
            "id": "A",
            "text": "Revisemos el procedimiento juntos sin convertir un error de carga en una acusación.",
            "reaction": "«Bien. Así podemos comparar sin improvisar», afirma.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Pedile que rehaga toda la planilla él solo para aprender.",
            "reaction": "«Podría aceptarlo, aunque no resuelve todo el problema», observa.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Hacé vos la corrección en silencio y evitá volver sobre el tema.",
            "reaction": "«Me parece prematuro. Evaluaría otra alternativa», replica.",
            "delta": -1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Felipe Zapata",
        "dialogue": "Necesito que esto no vuelva a pasar. ¿Qué control sumarías?",
        "options": [
          {
            "id": "A",
            "text": "Que cada jugador lleve su propia planilla y después unimos todo.",
            "reaction": "«Es un compromiso posible, pero demasiado abierto», considera.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Que solamente yo pueda cargar resultados para evitar errores ajenos.",
            "reaction": "«Entiendo la intención. Preferiría definirlo con más precisión», dice.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Un chequeo simple de duplicados antes de cerrar la semana, con responsable rotativo.",
            "reaction": "«De acuerdo. Queda una decisión concreta y verificable», concluye.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Felipe corrige el informe y mejora el proceso sin romper la confianza del equipo.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 19,
    "code": "DC-E019",
    "character_index": 7,
    "character": "Franco Parzano",
    "event_index_for_character": 1,
    "title": "Cuatro días conectados",
    "mili_intro": "Franco tiene capacidad para testear cuatro días en Dark Book, pero un amigo le pide ayuda presencial justo cuando preparaba su última sesión online.",
    "stages": [
      {
        "index": 1,
        "speaker": "Franco Parzano",
        "dialogue": "Quiero ayudarlo en persona, pero también quería usar mis cuatro días. ¿Qué priorizamos?",
        "options": [
          {
            "id": "A",
            "text": "Andá a ayudarlo sin mirar el plan; los datos online se recuperan solos.",
            "reaction": "«Entiendo lo que decís. No sé si es lo que necesito ahora», contesta.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Revisemos qué prueba online es realmente necesaria y coordinemos un rato presencial posible.",
            "reaction": "«Me gusta esa idea. Siento que así todos podemos participar», responde.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Completá primero el Dark Book y después fijate si te queda energía.",
            "reaction": "«Puede funcionar, aunque me gustaría hablarlo un poco más», comenta.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Franco Parzano",
        "dialogue": "En el online aprendí algo que contradice nuestra lista presencial. ¿A quién le creemos?",
        "options": [
          {
            "id": "A",
            "text": "El presencial es más parecido al torneo; descartemos el resto.",
            "reaction": "«Lo veo, aunque preferiría no cerrar el tema tan rápido», agrega.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Contrastemos rivales y condiciones antes de trasladar el resultado al local.",
            "reaction": "«Dale, así me quedo más tranquilo con la decisión», dice.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "El online tiene más partidas; usemos ese resultado como referencia.",
            "reaction": "«Podría probarlo, pero hay algo que todavía me hace ruido», reconoce.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Franco Parzano",
        "dialogue": "Mis amigos dicen que parezco conectado a una computadora. ¿Debería salir más?",
        "options": [
          {
            "id": "A",
            "text": "Si te hace bien, organizá una actividad presencial sin perder de vista tus límites.",
            "reaction": "«Gracias por escucharlo. Creo que con eso podemos avanzar», concluye.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Prometé ir a todos los locales del mes para compensarlo.",
            "reaction": "«Me sirve una parte de eso, pero todavía tengo mis dudas», admite.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "No cambies nada; tu especialidad es online y punto.",
            "reaction": "«Bueno, lo voy a pensar. No quiero decidirlo apurado», responde.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Franco acomoda su semana con espacio tanto para sus datos como para sus vínculos.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 22,
    "code": "DC-E022",
    "character_index": 8,
    "character": "Tayel Fernández",
    "event_index_for_character": 1,
    "title": "El desafío del escenario",
    "mili_intro": "Durante una exhibición, Tayel propone una entrada llamativa para animar al público. El organizador teme que retrase el comienzo de las rondas.",
    "stages": [
      {
        "index": 1,
        "speaker": "Tayel Fernández",
        "dialogue": "Tengo una idea para entrar que dura dos minutos. ¿Se la propongo al organizador?",
        "options": [
          {
            "id": "A",
            "text": "Preguntale si hay margen en el cronograma y adaptá la idea a lo que autorice.",
            "reaction": "«¡Ahí va! Eso sí que me entusiasma», dice con una sonrisa.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Hacela igual y pedí disculpas si se demora un poco.",
            "reaction": "«Puede ser, pero así perdemos un poco de la gracia», bromea.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Mejor descartala, en una exhibición también hay que ser sobrios.",
            "reaction": "«Mmm, no está mal, aunque me imaginaba otra cosa», comenta.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Tayel Fernández",
        "dialogue": "Me dijeron que solo tengo treinta segundos. ¿Cómo la recorto sin perder la gracia?",
        "options": [
          {
            "id": "A",
            "text": "Quedate con un solo detalle reconocible y respetá el tiempo.",
            "reaction": "«¡Listo! Así hacemos algo de verdad», responde animado.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Hacé la entrada completa, pero caminando más rápido.",
            "reaction": "«Es una opción; quizá se nos quede un poco corta», considera.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Sacá todo y simplemente saludá al entrar.",
            "reaction": "«Te sigo, pero dejame darte otra vuelta a la idea», responde.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Tayel Fernández",
        "dialogue": "Un compañero siente que toda la atención se va a mí. ¿Qué hacemos?",
        "options": [
          {
            "id": "A",
            "text": "Pensemos una presentación donde también pueda tener su momento.",
            "reaction": "«¡Perfecto! Después te cuento cómo salió», cierra con energía.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Explicale que la idea se te ocurrió a vos y no hay mucho que hacer.",
            "reaction": "«Podría salir bien, pero no termino de verlo», admite.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Que él invente otra entrada para equilibrar el espectáculo.",
            "reaction": "«Bueno, lo intento; no te prometo estar convencido», se ríe.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Tayel descubre que un buen show puede incluir a otros sin perder personalidad.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 25,
    "code": "DC-E025",
    "character_index": 9,
    "character": "Thiago Mujica",
    "event_index_for_character": 1,
    "title": "La tercera silla",
    "mili_intro": "Los hermanos Mujica suelen decidir todo juntos. Thiago recibe una propuesta de invitación para una práctica importante, pero solo hay lugar para dos integrantes de su grupo.",
    "stages": [
      {
        "index": 1,
        "speaker": "Thiago Mujica",
        "dialogue": "Nos ofrecen dos lugares. Si vamos los tres, no entramos; si uno queda afuera, se pudre. ¿Qué hacemos?",
        "options": [
          {
            "id": "A",
            "text": "Consultemos quién necesita realmente esa prueba y acordemos una rotación entre los tres.",
            "reaction": "«Interesante. Eso me deja margen para moverme», responde con media sonrisa.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Elegí a los dos que mejor estén jugando y que el tercero entienda.",
            "reaction": "«No es una mala jugada, aunque cedemos bastante», comenta.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Rechazá de entrada; el equipo no se separa.",
            "reaction": "«Puede funcionar, pero no voy a dar nada por sentado», advierte.",
            "delta": -1
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Thiago Mujica",
        "dialogue": "Kevin dice que le da igual, pero Johnny se queda callado. ¿A quién le pregunto primero?",
        "options": [
          {
            "id": "A",
            "text": "Preguntemos a cada uno en privado qué espera sacar de la sesión.",
            "reaction": "«Ahora sí estamos negociando algo útil», sonríe.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Si Kevin se ofreció, tomemos su palabra y listo.",
            "reaction": "«Es una opción diplomática; quizá demasiado», señala.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Hablemos todos juntos hasta que alguno ceda.",
            "reaction": "«No me disgusta, pero el costo puede ser mayor de lo que parece», dice.",
            "delta": -1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Thiago Mujica",
        "dialogue": "Me preocupa que otros equipos crean que pueden dividirnos con invitaciones. ¿Cómo respondemos?",
        "options": [
          {
            "id": "A",
            "text": "Marquemos reglas de participación claras, sin cerrar puertas útiles.",
            "reaction": "«Perfecto. Que cada uno se haga cargo de su parte», concluye.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Anunciemos públicamente que nunca competiremos por separado.",
            "reaction": "«Quizá. Prefiero no regalar esa ventaja todavía», responde.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Aceptemos invitaciones solo si son para los tres al mismo tiempo.",
            "reaction": "«Lo tendré en cuenta; todavía no estoy convencido», termina.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Thiago mantiene unida la dinámica familiar sin convertirla en una obligación rígida.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 28,
    "code": "DC-E028",
    "character_index": 10,
    "character": "Kevin Mujica",
    "event_index_for_character": 1,
    "title": "El plan improvisado",
    "mili_intro": "Kevin tiene una idea inesperada para cambiar una jugada del equipo durante una práctica. Johnny quiere seguir el plan acordado y Thiago empieza a impacientarse.",
    "stages": [
      {
        "index": 1,
        "speaker": "Kevin Mujica",
        "dialogue": "Tengo una línea que puede funcionar mejor, pero Johnny quiere seguir la lista. ¿La probamos?",
        "options": [
          {
            "id": "A",
            "text": "Probala en la siguiente partida y decidimos según si ganás.",
            "reaction": "«Puede ser, pero así perdemos un poco de la gracia», bromea.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Guardala para otro día; hoy el programa ya está definido.",
            "reaction": "«Mmm, no está mal, aunque me imaginaba otra cosa», comenta.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Reservemos una tanda corta para compararla sin desarmar toda la práctica.",
            "reaction": "«¡Ahí va! Eso sí que me entusiasma», dice con una sonrisa.",
            "delta": 1
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Kevin Mujica",
        "dialogue": "Mi idea funcionó una vez y ya quiero armar todo alrededor. ¿Me frenás o me seguís?",
        "options": [
          {
            "id": "A",
            "text": "Antes de cambiar la lista, busquemos en qué enfrentamientos se sostiene.",
            "reaction": "«¡Listo! Así hacemos algo de verdad», responde animado.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Aprovechemos el impulso y juguemos diez partidas seguidas.",
            "reaction": "«Es una opción; quizá se nos quede un poco corta», considera.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Dejá que Johnny tenga la última palabra, que es el más metódico.",
            "reaction": "«Te sigo, pero dejame darte otra vuelta a la idea», responde.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Kevin Mujica",
        "dialogue": "Si al final era mala, no quiero que Johnny me lo recuerde todo el mes. ¿Qué hacemos?",
        "options": [
          {
            "id": "A",
            "text": "Acordar que nadie mencione más esa jugada si falla.",
            "reaction": "«Podría salir bien, pero no termino de verlo», admite.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Dejar que cada uno se haga cargo de sus inventos.",
            "reaction": "«Bueno, lo intento; no te prometo estar convencido», se ríe.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Tratar las ideas como pruebas, no como medallas ni fracasos personales.",
            "reaction": "«¡Perfecto! Después te cuento cómo salió», cierra con energía.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Kevin conserva su espontaneidad y el equipo aprende a probar sin pelear.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 31,
    "code": "DC-E031",
    "character_index": 11,
    "character": "Johnny Mujica",
    "event_index_for_character": 1,
    "title": "La libreta de los tres",
    "mili_intro": "Johnny lleva semanas registrando el entrenamiento de sus hermanos. Kevin acusa a la libreta de hacer que todas las sesiones parezcan una evaluación y Thiago quiere ver los números antes de decidir la formación.",
    "stages": [
      {
        "index": 1,
        "speaker": "Johnny Mujica",
        "dialogue": "Anoto los resultados para mejorar, pero Kevin dice que parece un examen. ¿Cómo lo equilibramos?",
        "options": [
          {
            "id": "A",
            "text": "Pasemos los números a una aplicación y que nadie los vea durante el testeo.",
            "reaction": "«No descarto esa opción. Me falta información para respaldarla», dice.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Dejemos claro qué datos nos sirven y qué conversaciones no necesitan anotarse.",
            "reaction": "«Eso es razonable. Prefiero tener un criterio claro», responde.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Mantengamos el registro completo; si no lo valoran ahora lo agradecerán después.",
            "reaction": "«Es viable, pero habría que revisar las condiciones», señala.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Johnny Mujica",
        "dialogue": "Thiago quiere usar la planilla para elegir quién juega. ¿Es suficiente?",
        "options": [
          {
            "id": "A",
            "text": "Sí; una clasificación objetiva evita discusiones familiares.",
            "reaction": "«Podría aceptarlo, aunque no resuelve todo el problema», observa.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "No, la formación tiene que decidirse por experiencia entre los tres.",
            "reaction": "«Me parece prematuro. Evaluaría otra alternativa», replica.",
            "delta": -1
          },
          {
            "id": "C",
            "text": "Usemos los registros como una parte de la evaluación, junto con preparación y rol.",
            "reaction": "«Bien. Así podemos comparar sin improvisar», afirma.",
            "delta": 1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Johnny Mujica",
        "dialogue": "Kevin pide ver únicamente sus mejoras, sin compararse con los demás. ¿Se puede?",
        "options": [
          {
            "id": "A",
            "text": "Preparemos resúmenes individuales y una parte compartida necesaria para el equipo.",
            "reaction": "«De acuerdo. Queda una decisión concreta y verificable», concluye.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Que cada uno vea todo, porque no hay secretos entre hermanos.",
            "reaction": "«Es un compromiso posible, pero demasiado abierto», considera.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Suspendamos el registro hasta que todos estén conformes.",
            "reaction": "«Entiendo la intención. Preferiría definirlo con más precisión», dice.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Johnny mantiene un método útil sin convertir cada entrenamiento familiar en una competencia interna.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 34,
    "code": "DC-E034",
    "character_index": 12,
    "character": "Matías López «Acevedo»",
    "event_index_for_character": 1,
    "title": "La oferta de último minuto",
    "mili_intro": "Acevedo recibe una propuesta para jugar con otra organización durante un fin de semana. La oferta llega pocas horas antes del cierre de inscripciones y contiene condiciones poco claras.",
    "stages": [
      {
        "index": 1,
        "speaker": "Matías López «Acevedo»",
        "dialogue": "Dicen que me quieren de titular, pero no aclaran cuánto tiempo. ¿Firmarías?",
        "options": [
          {
            "id": "A",
            "text": "Exigiría un beneficio adicional por la urgencia antes de escuchar nada más.",
            "reaction": "«Puede funcionar, pero no voy a dar nada por sentado», advierte.",
            "delta": -1
          },
          {
            "id": "B",
            "text": "Pediría duración, responsabilidades y condiciones por escrito antes de comprometerme.",
            "reaction": "«Interesante. Eso me deja margen para moverme», responde con media sonrisa.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Aprovecharía la oportunidad y resolvería los detalles después.",
            "reaction": "«No es una mala jugada, aunque cedemos bastante», comenta.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Matías López «Acevedo»",
        "dialogue": "Ahora insisten en que no se lo cuente a mi equipo hasta después del torneo. ¿Eso es normal?",
        "options": [
          {
            "id": "A",
            "text": "Contalo en un grupo general para que todos opinen.",
            "reaction": "«No me disgusta, pero el costo puede ser mayor de lo que parece», dice.",
            "delta": -1
          },
          {
            "id": "B",
            "text": "No ocultes un compromiso que puede afectar a tu organización actual.",
            "reaction": "«Ahora sí estamos negociando algo útil», sonríe.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Guardá silencio hasta saber si la oferta es seria.",
            "reaction": "«Es una opción diplomática; quizá demasiado», señala.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Matías López «Acevedo»",
        "dialogue": "Me dicen que la propuesta vence hoy. ¿Cómo les respondo?",
        "options": [
          {
            "id": "A",
            "text": "Pediles una prórroga sin decirles qué información necesitás.",
            "reaction": "«Lo tendré en cuenta; todavía no estoy convencido», termina.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Si no pueden aclarar los términos a tiempo, preferimos dejar pasar esta oferta.",
            "reaction": "«Perfecto. Que cada uno se haga cargo de su parte», concluye.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Aceptá provisionalmente y reservate el derecho de cambiar de opinión.",
            "reaction": "«Quizá. Prefiero no regalar esa ventaja todavía», responde.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Acevedo aprende que la urgencia puede ser parte de la negociación y no una obligación de aceptar.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 37,
    "code": "DC-E037",
    "character_index": 13,
    "character": "Mikazuchi",
    "event_index_for_character": 1,
    "title": "La rutina interrumpida",
    "mili_intro": "Mikazuchi organiza sus prácticas con horarios y objetivos. El local anuncia una competencia inesperada que coincide con su sesión individual más importante.",
    "stages": [
      {
        "index": 1,
        "speaker": "Mikazuchi",
        "dialogue": "El evento extra coincide con mi rutina. ¿Tiene sentido cambiar el plan?",
        "options": [
          {
            "id": "A",
            "text": "Mantené la rutina: cambiar horarios rompe la disciplina.",
            "reaction": "«No descarto esa opción. Me falta información para respaldarla», dice.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Compará el valor competitivo del torneo con el objetivo de la sesión antes de elegir.",
            "reaction": "«Eso es razonable. Prefiero tener un criterio claro», responde.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Andá al torneo, la experiencia siempre vale más que practicar.",
            "reaction": "«Es viable, pero habría que revisar las condiciones», señala.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Mikazuchi",
        "dialogue": "Si voy, no podré completar todas mis partidas de prueba. ¿Qué sacrificamos?",
        "options": [
          {
            "id": "A",
            "text": "Recuperá todo de madrugada después del torneo.",
            "reaction": "«Podría aceptarlo, aunque no resuelve todo el problema», observa.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Hacé una prueba rápida de cada mazo para tocar todos los temas.",
            "reaction": "«Me parece prematuro. Evaluaría otra alternativa», replica.",
            "delta": -1
          },
          {
            "id": "C",
            "text": "Priorizá el enfrentamiento donde aún tenés menos información.",
            "reaction": "«Bien. Así podemos comparar sin improvisar», afirma.",
            "delta": 1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Mikazuchi",
        "dialogue": "Perdí el torneo y no cumplí la rutina. ¿Cómo evaluamos la semana?",
        "options": [
          {
            "id": "A",
            "text": "Marcala como semana fallida para recordarlo al planificar.",
            "reaction": "«Es un compromiso posible, pero demasiado abierto», considera.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Olvidemos el torneo y repitamos exactamente la rutina anterior.",
            "reaction": "«Entiendo la intención. Preferiría definirlo con más precisión», dice.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Consideremos lo que aprendiste y ajustemos el plan sin castigarte por el resultado.",
            "reaction": "«De acuerdo. Queda una decisión concreta y verificable», concluye.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Mikazuchi vuelve a su esquema con una disciplina capaz de adaptarse.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 40,
    "code": "DC-E040",
    "character_index": 14,
    "character": "Juli Jiménez",
    "event_index_for_character": 1,
    "title": "La corrección en público",
    "mili_intro": "En un testeo colectivo, Juli Jiménez detecta un error importante de reglas. Corregirlo implica interrumpir a un jugador que está explicando una jugada delante de varios principiantes.",
    "stages": [
      {
        "index": 1,
        "speaker": "Juli Jiménez",
        "dialogue": "La regla está mal y varios la van a copiar. ¿Lo interrumpo ahora?",
        "options": [
          {
            "id": "A",
            "text": "Decile a los principiantes que consulten las reglas después de la charla.",
            "reaction": "«No descarto esa opción. Me falta información para respaldarla», dice.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Intervení con respeto y explicá la corrección sin ridiculizar a quien hablaba.",
            "reaction": "«Eso es razonable. Prefiero tener un criterio claro», responde.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Esperá hasta el final de la explicación para no dejarlo mal.",
            "reaction": "«Es viable, pero habría que revisar las condiciones», señala.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Juli Jiménez",
        "dialogue": "El jugador me responde que esa resolución se usa siempre en su tienda. ¿Qué hacemos?",
        "options": [
          {
            "id": "A",
            "text": "Dejemos que cada tienda juegue como suele hacerlo en las prácticas.",
            "reaction": "«Me parece prematuro. Evaluaría otra alternativa», replica.",
            "delta": -1
          },
          {
            "id": "B",
            "text": "Verifiquemos la fuente oficial juntos antes de seguir discutiendo.",
            "reaction": "«Bien. Así podemos comparar sin improvisar», afirma.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Explicale que la costumbre de una tienda no cambia el reglamento.",
            "reaction": "«Podría aceptarlo, aunque no resuelve todo el problema», observa.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Juli Jiménez",
        "dialogue": "Una persona me agradece, pero dice que fui demasiado estricta. ¿Cómo lo tomo?",
        "options": [
          {
            "id": "A",
            "text": "Preguntá qué parte de la corrección resultó brusca sin renunciar a la precisión.",
            "reaction": "«De acuerdo. Queda una decisión concreta y verificable», concluye.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Si agradeció la ayuda, no hay más que revisar.",
            "reaction": "«Es un compromiso posible, pero demasiado abierto», considera.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "La próxima vez dejá que alguien más corrija el error.",
            "reaction": "«Entiendo la intención. Preferiría definirlo con más precisión», dice.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Juli consigue que el aprendizaje sea claro y que el grupo quiera seguir preguntando.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 43,
    "code": "DC-E043",
    "character_index": 15,
    "character": "Krawler",
    "event_index_for_character": 1,
    "title": "El intercambio incómodo",
    "mili_intro": "Krawler propone cambiar información de dos mazos con otro grupo. El rival acepta a medias y pretende recibir primero todos los datos de Krawler.",
    "stages": [
      {
        "index": 1,
        "speaker": "Krawler",
        "dialogue": "Quieren que mostremos nuestras pruebas antes de compartir las suyas. ¿Accedemos?",
        "options": [
          {
            "id": "A",
            "text": "Organicemos un intercambio simultáneo y limitado a lo que ambas partes acuerden.",
            "reaction": "«Interesante. Eso me deja margen para moverme», responde con media sonrisa.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Mostremos algo pequeño primero para medir su buena fe.",
            "reaction": "«No es una mala jugada, aunque cedemos bastante», comenta.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Exijamos una garantía escrita antes de hablar de cartas.",
            "reaction": "«Puede funcionar, pero no voy a dar nada por sentado», advierte.",
            "delta": -1
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Krawler",
        "dialogue": "Nos dan resultados sin decir cuántas partidas jugaron. ¿Qué valor tienen?",
        "options": [
          {
            "id": "A",
            "text": "Descartémoslos por completo: información incompleta no sirve.",
            "reaction": "«No me disgusta, pero el costo puede ser mayor de lo que parece», dice.",
            "delta": -1
          },
          {
            "id": "B",
            "text": "Pidamos contexto y muestras antes de usarlos para tomar decisiones.",
            "reaction": "«Ahora sí estamos negociando algo útil», sonríe.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Sumémoslos como estimaciones, no como datos firmes.",
            "reaction": "«Es una opción diplomática; quizá demasiado», señala.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Krawler",
        "dialogue": "Quieren que digamos públicamente que trabajamos juntos. ¿Nos conviene?",
        "options": [
          {
            "id": "A",
            "text": "Puede convenir para dar imagen de grupo fuerte, aunque haya sido una sola sesión.",
            "reaction": "«Quizá. Prefiero no regalar esa ventaja todavía», responde.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "No digamos nada; una colaboración útil tiene que ser secreta.",
            "reaction": "«Lo tendré en cuenta; todavía no estoy convencido», termina.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Acordemos qué colaboración existió realmente y cómo describirla.",
            "reaction": "«Perfecto. Que cada uno se haga cargo de su parte», concluye.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Krawler sale del intercambio con menos promesas y datos que realmente puede interpretar.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 46,
    "code": "DC-E046",
    "character_index": 16,
    "character": "Carlitos Vala",
    "event_index_for_character": 1,
    "title": "Las llaves de Lair",
    "mili_intro": "Carlitos Vala se ocupa de abrir el local Lair para un torneo. Un colaborador propone dejar las llaves a un grupo que quiere testear de madrugada.",
    "stages": [
      {
        "index": 1,
        "speaker": "Carlitos Vala",
        "dialogue": "Me piden las llaves para quedarse después del cierre. Son conocidos, ¿qué hacemos?",
        "options": [
          {
            "id": "A",
            "text": "Deciles que no a cualquier horario fuera de apertura.",
            "reaction": "«No descarto esa opción. Me falta información para respaldarla», dice.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Permitamos un horario extra solo con alguien responsable y reglas claras de uso.",
            "reaction": "«Eso es razonable. Prefiero tener un criterio claro», responde.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Prestales las llaves: la confianza también construye comunidad.",
            "reaction": "«Es viable, pero habría que revisar las condiciones», señala.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Carlitos Vala",
        "dialogue": "Uno ofrece hacerse cargo de cualquier daño, pero no dice cómo. ¿Alcanza?",
        "options": [
          {
            "id": "A",
            "text": "Definamos responsabilidades concretas y las condiciones del espacio antes de aceptar.",
            "reaction": "«Bien. Así podemos comparar sin improvisar», afirma.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Si se ofrece a responder, tomemos su palabra.",
            "reaction": "«Podría aceptarlo, aunque no resuelve todo el problema», observa.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Cobremos una garantía a todos los que se queden.",
            "reaction": "«Me parece prematuro. Evaluaría otra alternativa», replica.",
            "delta": -1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Carlitos Vala",
        "dialogue": "Al final nadie quiere ordenar las mesas. ¿Cómo evitamos repetirlo?",
        "options": [
          {
            "id": "A",
            "text": "No volvamos a prestar el lugar durante un mes.",
            "reaction": "«Entiendo la intención. Preferiría definirlo con más precisión», dice.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Establezcamos una rutina de cierre que se acuerde antes de cada sesión.",
            "reaction": "«De acuerdo. Queda una decisión concreta y verificable», concluye.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Designá siempre al último en irse para limpiar.",
            "reaction": "«Es un compromiso posible, pero demasiado abierto», considera.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Carlitos protege la tienda sin cerrar oportunidades a la comunidad que la usa.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 49,
    "code": "DC-E049",
    "character_index": 17,
    "character": "Therian",
    "event_index_for_character": 1,
    "title": "La palabra ambigua",
    "mili_intro": "Therian interpreta un acuerdo de testeo de una forma que le favorece. El otro jugador sostiene que había entendido algo distinto. Ambos te piden que medies.",
    "stages": [
      {
        "index": 1,
        "speaker": "Therian",
        "dialogue": "Dijimos «compartir resultados», pero no especificamos cuáles. ¿De quién es la culpa?",
        "options": [
          {
            "id": "A",
            "text": "Antes de culpar, aclaremos qué entendió cada parte y definamos el alcance.",
            "reaction": "«Interesante. Eso me deja margen para moverme», responde con media sonrisa.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Si no lo escribió, el rival asumió el riesgo.",
            "reaction": "«No es una mala jugada, aunque cedemos bastante», comenta.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Como Therian estaba presente, su interpretación debería prevalecer.",
            "reaction": "«Puede funcionar, pero no voy a dar nada por sentado», advierte.",
            "delta": -1
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Therian",
        "dialogue": "El rival quiere cancelar el acuerdo entero. ¿Aceptamos?",
        "options": [
          {
            "id": "A",
            "text": "Ofrezcamos un ajuste concreto y que pueda retirarse si no lo acepta.",
            "reaction": "«Ahora sí estamos negociando algo útil», sonríe.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Insistamos en que ya había un compromiso verbal.",
            "reaction": "«Es una opción diplomática; quizá demasiado», señala.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Cancelémoslo sin más, así no perdemos tiempo.",
            "reaction": "«No me disgusta, pero el costo puede ser mayor de lo que parece», dice.",
            "delta": -1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Therian",
        "dialogue": "Therian pregunta si conviene cerrar futuros acuerdos por escrito. ¿Qué le decís?",
        "options": [
          {
            "id": "A",
            "text": "Solo en tratos grandes; para testear entre conocidos alcanza hablar.",
            "reaction": "«Quizá. Prefiero no regalar esa ventaja todavía», responde.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Es mejor mantener los acuerdos flexibles para negociar después.",
            "reaction": "«Lo tendré en cuenta; todavía no estoy convencido», termina.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Sí, una nota clara protege a ambos y evita malentendidos.",
            "reaction": "«Perfecto. Que cada uno se haga cargo de su parte», concluye.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Therian descubre que la precisión también puede ser una ventaja a largo plazo.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 52,
    "code": "DC-E052",
    "character_index": 18,
    "character": "Alan «El Héroe»",
    "event_index_for_character": 1,
    "title": "Un rival sin funda",
    "mili_intro": "Antes de una ronda, un jugador novato descubre que algunas fundas de su mazo están dañadas. Alan se ofrece a prestarle las suyas, pero también debe preparar su propia partida.",
    "stages": [
      {
        "index": 1,
        "speaker": "Alan «El Héroe»",
        "dialogue": "Le faltan fundas y está desesperado. ¿Voy yo a buscarle un paquete?",
        "options": [
          {
            "id": "A",
            "text": "Ayudémoslo a encontrar una solución rápida sin descuidar tu preparación.",
            "reaction": "«Me gusta esa idea. Siento que así todos podemos participar», responde.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Prestale directamente tus fundas y después resolvemos las tuyas.",
            "reaction": "«Puede funcionar, aunque me gustaría hablarlo un poco más», comenta.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Buscá a alguien del local que tenga tiempo para encargarse.",
            "reaction": "«Entiendo lo que decís. No sé si es lo que necesito ahora», contesta.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Alan «El Héroe»",
        "dialogue": "Ahora me pide que le explique una interacción justo antes de mi ronda. ¿Lo ayudo?",
        "options": [
          {
            "id": "A",
            "text": "Ayudalo todo lo que necesite; todos empezamos alguna vez.",
            "reaction": "«Podría probarlo, pero hay algo que todavía me hace ruido», reconoce.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Decile que no podés hablar porque hoy sos competidor.",
            "reaction": "«Lo veo, aunque preferiría no cerrar el tema tan rápido», agrega.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Dale una orientación breve y ofrecé continuar después o consultar al juez.",
            "reaction": "«Dale, así me quedo más tranquilo con la decisión», dice.",
            "delta": 1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Alan «El Héroe»",
        "dialogue": "Perdí mi primera ronda y siento que por ayudar llegué sin concentrarme. ¿Qué aprendo?",
        "options": [
          {
            "id": "A",
            "text": "La próxima vez no ayudes a nadie antes de competir.",
            "reaction": "«Me sirve una parte de eso, pero todavía tengo mis dudas», admite.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "No pasa nada, perder una ronda por ayudar es hasta una buena historia.",
            "reaction": "«Bueno, lo voy a pensar. No quiero decidirlo apurado», responde.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Tu generosidad vale, pero necesitamos límites que también te cuiden.",
            "reaction": "«Gracias por escucharlo. Creo que con eso podemos avanzar», concluye.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Alan descubre que ser generoso también incluye hacerse responsable de sus propias necesidades.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 55,
    "code": "DC-E055",
    "character_index": 19,
    "character": "Fabio «El Estuñador»",
    "event_index_for_character": 1,
    "title": "La lista que explota",
    "mili_intro": "Fabio prueba un mazo de alto riesgo que puede ganar rápido, pero falla con frecuencia. Quiere llevarlo al próximo torneo porque las victorias son espectaculares.",
    "stages": [
      {
        "index": 1,
        "speaker": "Fabio «El Estuñador»",
        "dialogue": "Cuando sale bien, esto destruye a cualquiera. ¿Lo llevamos al local?",
        "options": [
          {
            "id": "A",
            "text": "Lleválo, el factor sorpresa puede compensar la inconsistencia.",
            "reaction": "«Puede ser, pero así perdemos un poco de la gracia», bromea.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "No lo uses en un torneo hasta que sea totalmente estable.",
            "reaction": "«Mmm, no está mal, aunque me imaginaba otra cosa», comenta.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Midamos la frecuencia con que funciona y qué pasa cuando no abre bien.",
            "reaction": "«¡Ahí va! Eso sí que me entusiasma», dice con una sonrisa.",
            "delta": 1
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Fabio «El Estuñador»",
        "dialogue": "Uno del equipo dice que las partidas perdidas no importan porque fueron malas manos. ¿Qué hacemos?",
        "options": [
          {
            "id": "A",
            "text": "Cambiemos las manos iniciales hasta que el mazo pueda demostrar lo que hace.",
            "reaction": "«Te sigo, pero dejame darte otra vuelta a la idea», responde.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Contemos también esas manos; forman parte del rendimiento real del mazo.",
            "reaction": "«¡Listo! Así hacemos algo de verdad», responde animado.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Analicemos solo partidas donde pudiste ejecutar tu plan.",
            "reaction": "«Es una opción; quizá se nos quede un poco corta», considera.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Fabio «El Estuñador»",
        "dialogue": "Un espectador nos pide mostrar el combo más vistoso. ¿Qué enseñamos?",
        "options": [
          {
            "id": "A",
            "text": "Mejor no revelar combos antes de la competencia.",
            "reaction": "«Bueno, lo intento; no te prometo estar convencido», se ríe.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Mostremos el combo y expliquemos sus condiciones y riesgos.",
            "reaction": "«¡Perfecto! Después te cuento cómo salió», cierra con energía.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Mostremos el mejor escenario para entusiasmarlo.",
            "reaction": "«Podría salir bien, pero no termino de verlo», admite.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Fabio aprende que un mazo espectacular necesita algo más que momentos memorables.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 58,
    "code": "DC-E058",
    "character_index": 20,
    "character": "Franquito «El Pilar»",
    "event_index_for_character": 1,
    "title": "El que sostiene la mesa",
    "mili_intro": "Durante varias semanas, Franquito ayuda a organizar pruebas y resolver problemas del grupo. Nadie parece notar ese trabajo y empieza a retirarse antes de terminar las reuniones.",
    "stages": [
      {
        "index": 1,
        "speaker": "Franquito «El Pilar»",
        "dialogue": "Siempre termino acomodando todo y nadie lo menciona. ¿Debería decir algo?",
        "options": [
          {
            "id": "A",
            "text": "Esperá a ver si alguien se da cuenta por sí solo.",
            "reaction": "«No sé, siento que quedaría algo pendiente», murmura.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Dejá de ayudar de golpe para que lo noten.",
            "reaction": "«Quizá. Igual me cuesta verlo tan sencillo», reconoce.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Podés pedir que repartamos tareas; no tenés que cargar con todo en silencio.",
            "reaction": "«Puede ser... al menos así sé por dónde empezar», responde despacio.",
            "delta": 1
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Franquito «El Pilar»",
        "dialogue": "Uno de los chicos me agradece, pero mañana vuelve a dejarme todo. ¿Cómo lo hablo?",
        "options": [
          {
            "id": "A",
            "text": "Agradecé el gesto y planteá una distribución concreta de tareas.",
            "reaction": "«Eso me resulta más manejable. Gracias», contesta.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Decile que agradecer no sirve si no cambia nada.",
            "reaction": "«Podría intentarlo, aunque no estoy muy convencido», dice.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Pedile al capitán que se encargue de corregirlo.",
            "reaction": "«Entiendo, pero me da miedo que salga peor», admite.",
            "delta": -1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Franquito «El Pilar»",
        "dialogue": "Si digo que necesito un descanso, siento que abandono al grupo. ¿Qué pensás?",
        "options": [
          {
            "id": "A",
            "text": "Seguís siendo el pilar del equipo, pero a veces tocará apretar los dientes.",
            "reaction": "«Ojalá fuera tan fácil. Lo voy a considerar», dice.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Descansar es compatible con ser un buen compañero; organicemos el relevo.",
            "reaction": "«Bueno... voy a probarlo. Me sirve tener algo concreto», cierra.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Tomate solo una reunión libre y después retomá como antes.",
            "reaction": "«No lo descarto, pero necesito pensarlo», responde.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Franquito comprueba que el equipo puede sostenerlo también a él.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 61,
    "code": "DC-E061",
    "character_index": 21,
    "character": "Mateo Blanco",
    "event_index_for_character": 1,
    "title": "El error que sigue ahí",
    "mili_intro": "Mateo Blanco revisa una ronda perdida y señala siempre el mismo error. Sus compañeros ya pasaron al siguiente enfrentamiento y él siente que todavía no entendió qué ocurrió.",
    "stages": [
      {
        "index": 1,
        "speaker": "Mateo Blanco",
        "dialogue": "Todos dicen que fue mala suerte, pero creo que jugué mal. ¿Cómo lo revisamos?",
        "options": [
          {
            "id": "A",
            "text": "Dejemos esa ronda atrás; el próximo torneo trae oportunidades nuevas.",
            "reaction": "«Quizá. Igual me cuesta verlo tan sencillo», reconoce.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Reconstruyamos la decisión con la información que tenías en ese momento.",
            "reaction": "«Puede ser... al menos así sé por dónde empezar», responde despacio.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Repitamos la partida completa hasta encontrar una línea ganadora.",
            "reaction": "«No sé, siento que quedaría algo pendiente», murmura.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Mateo Blanco",
        "dialogue": "Encontré otra jugada posible, pero no sé si era mejor. ¿Cómo la comparamos?",
        "options": [
          {
            "id": "A",
            "text": "Consultemos al mejor jugador del equipo para que nos diga cuál elegiría.",
            "reaction": "«Entiendo, pero me da miedo que salga peor», admite.",
            "delta": -1
          },
          {
            "id": "B",
            "text": "Definamos qué resultados esperábamos de cada línea antes de mirar cómo terminaron.",
            "reaction": "«Eso me resulta más manejable. Gracias», contesta.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Probemos las dos y quedémonos con la que gane más partidas.",
            "reaction": "«Podría intentarlo, aunque no estoy muy convencido», dice.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Mateo Blanco",
        "dialogue": "Si después de revisarlo sigo pensando que fue mi culpa, ¿qué hago?",
        "options": [
          {
            "id": "A",
            "text": "Aceptá que te equivocaste y exigite no repetirlo nunca más.",
            "reaction": "«No lo descarto, pero necesito pensarlo», responde.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Sacate esa ronda de la cabeza; no sirve seguir hablando de ella.",
            "reaction": "«Ojalá fuera tan fácil. Lo voy a considerar», dice.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Convertí el error en un objetivo de práctica concreto, sin juzgar toda tu capacidad.",
            "reaction": "«Bueno... voy a probarlo. Me sirve tener algo concreto», cierra.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Mateo anota una mejora posible y deja de usar una sola decisión como medida de todo su rendimiento.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 64,
    "code": "DC-E064",
    "character_index": 22,
    "character": "Julián Malek",
    "event_index_for_character": 1,
    "title": "La bandera de Obelisk",
    "mili_intro": "Julián Malek prepara una bandera nueva para Obelisk y quiere que todos la lleven durante un regional. Un integrante considera que distrae de la competencia.",
    "stages": [
      {
        "index": 1,
        "speaker": "Julián Malek",
        "dialogue": "Quiero que el equipo se vea desde la otra punta del salón. ¿Le ponemos bandera a todos?",
        "options": [
          {
            "id": "A",
            "text": "Hagamos una identidad común sin obligar a nadie a llevarla durante las partidas.",
            "reaction": "«¡Ahí va! Eso sí que me entusiasma», dice con una sonrisa.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Si somos Obelisk, todos tienen que representar los colores.",
            "reaction": "«Puede ser, pero así perdemos un poco de la gracia», bromea.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Mejor dejemos las banderas solo para las fotos de después.",
            "reaction": "«Mmm, no está mal, aunque me imaginaba otra cosa», comenta.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Julián Malek",
        "dialogue": "Mateo Blanco dice que no quiere aparecer en un video promocional. ¿Qué hago?",
        "options": [
          {
            "id": "A",
            "text": "Respetá que no quiera salir y buscá otra forma de incluir su aporte.",
            "reaction": "«¡Listo! Así hacemos algo de verdad», responde animado.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Decile que es solo un clip corto y que lo vas a editar bien.",
            "reaction": "«Es una opción; quizá se nos quede un poco corta», considera.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Grabalo de espaldas para que no se lo reconozca.",
            "reaction": "«Te sigo, pero dejame darte otra vuelta a la idea», responde.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Julián Malek",
        "dialogue": "Al final varios piden sacar una foto grupal con el logo. ¿Dónde la hacemos?",
        "options": [
          {
            "id": "A",
            "text": "En la puerta de la tienda sin avisarle al organizador.",
            "reaction": "«Bueno, lo intento; no te prometo estar convencido», se ríe.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "En un lugar habilitado que no obstaculice el torneo ni muestre rivales sin permiso.",
            "reaction": "«¡Perfecto! Después te cuento cómo salió», cierra con energía.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "En el centro del salón, que se note que vino Obelisk.",
            "reaction": "«Podría salir bien, pero no termino de verlo», admite.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Julián Malek consigue una presencia reconocible sin convertirla en un peso para sus compañeros.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 67,
    "code": "DC-E067",
    "character_index": 23,
    "character": "Tomás «Dark» Duguera",
    "event_index_for_character": 1,
    "title": "El mazo que se apaga",
    "mili_intro": "Tomás llega a una jornada de pruebas convencido de que su mazo ya no funciona. Perdió varios enfrentamientos contra las mismas cartas y quiere archivarlo.",
    "stages": [
      {
        "index": 1,
        "speaker": "Tomás «Dark» Duguera",
        "dialogue": "Siento que este mazo dejó de existir en el formato. ¿Lo guardo?",
        "options": [
          {
            "id": "A",
            "text": "Separá los enfrentamientos realmente malos de las partidas que todavía podemos trabajar.",
            "reaction": "«Puede ser... al menos así sé por dónde empezar», responde despacio.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Cambiá de arquetipo; insistir demasiado puede frenarte.",
            "reaction": "«No sé, siento que quedaría algo pendiente», murmura.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Seguí jugándolo una semana más sin tocar nada para estar seguro.",
            "reaction": "«Quizá. Igual me cuesta verlo tan sencillo», reconoce.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Tomás «Dark» Duguera",
        "dialogue": "Cada vez que encuentro una mejora aparece otro problema. ¿Hasta dónde testear?",
        "options": [
          {
            "id": "A",
            "text": "Probemos todas las variantes hasta agotar las posibilidades.",
            "reaction": "«Podría intentarlo, aunque no estoy muy convencido», dice.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Dejá de cambiar la lista; en algún momento hay que aceptar las cartas que tenemos.",
            "reaction": "«Entiendo, pero me da miedo que salga peor», admite.",
            "delta": -1
          },
          {
            "id": "C",
            "text": "Definamos un objetivo acotado y evaluemos si mejora lo suficiente.",
            "reaction": "«Eso me resulta más manejable. Gracias», contesta.",
            "delta": 1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Tomás «Dark» Duguera",
        "dialogue": "¿Y si el formato cambia de nuevo cuando por fin lo ajuste?",
        "options": [
          {
            "id": "A",
            "text": "Esperemos a la siguiente banlist antes de invertir más tiempo.",
            "reaction": "«No lo descarto, pero necesito pensarlo», responde.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Elegí el mazo con menos cartas afectables por futuras listas.",
            "reaction": "«Ojalá fuera tan fácil. Lo voy a considerar», dice.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Nadie puede garantizar estabilidad; prepará una base flexible y revisiones periódicas.",
            "reaction": "«Bueno... voy a probarlo. Me sirve tener algo concreto», cierra.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Tomás deja el mazo abierto sobre la mesa, con un plan de prueba y no una despedida definitiva.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 70,
    "code": "DC-E070",
    "character_index": 24,
    "character": "Joaquín Pohaji",
    "event_index_for_character": 1,
    "title": "El desafío relámpago",
    "mili_intro": "Joaquín Pohaji quiere organizar una serie de partidas muy rápidas antes de un torneo. El capitán teme que la dinámica genere más ruido que información útil.",
    "stages": [
      {
        "index": 1,
        "speaker": "Joaquín Pohaji",
        "dialogue": "Se me ocurrió hacer duelos cortos para practicar decisiones bajo presión. ¿Te prende?",
        "options": [
          {
            "id": "A",
            "text": "Probémoslo como ejercicio y definamos qué estamos entrenando exactamente.",
            "reaction": "«¡Ahí va! Eso sí que me entusiasma», dice con una sonrisa.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Organicemos una competencia con premio para que todos se motiven.",
            "reaction": "«Puede ser, pero así perdemos un poco de la gracia», bromea.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Mejor sigamos jugando partidas normales, que eso ya entrena suficiente.",
            "reaction": "«Mmm, no está mal, aunque me imaginaba otra cosa», comenta.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Joaquín Pohaji",
        "dialogue": "A algunos les divierte y otros se quedan afuera. ¿Cómo hacemos para que funcione?",
        "options": [
          {
            "id": "A",
            "text": "Que se sumen los que tengan reflejos, los demás pueden observar.",
            "reaction": "«Es una opción; quizá se nos quede un poco corta», considera.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Cambiemos por completo a partidas normales para no dividir al grupo.",
            "reaction": "«Te sigo, pero dejame darte otra vuelta a la idea», responde.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Alternemos un bloque rápido y uno tradicional, dejando participar a quien quiera.",
            "reaction": "«¡Listo! Así hacemos algo de verdad», responde animado.",
            "delta": 1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Joaquín Pohaji",
        "dialogue": "Uno pierde una jugada por apresurarse y queda enojado. ¿Qué le digo?",
        "options": [
          {
            "id": "A",
            "text": "Decile que precisamente esa era la gracia del entrenamiento.",
            "reaction": "«Podría salir bien, pero no termino de verlo», admite.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Repetí la ronda para que tenga una nueva oportunidad.",
            "reaction": "«Bueno, lo intento; no te prometo estar convencido», se ríe.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Aclaremos que el ejercicio busca detectar esas decisiones, no juzgar al jugador.",
            "reaction": "«¡Perfecto! Después te cuento cómo salió», cierra con energía.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Joaquín descubre que la intensidad puede ser útil cuando todos entienden qué se pretende practicar.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 73,
    "code": "DC-E073",
    "character_index": 25,
    "character": "Gaby Kaibaman",
    "event_index_for_character": 1,
    "title": "La carpeta vieja",
    "mili_intro": "Gaby encuentra una carpeta con listas de temporadas anteriores. Un compañero se ríe porque varias cartas ya no se juegan y Gaby se pregunta si vale la pena revisarlas.",
    "stages": [
      {
        "index": 1,
        "speaker": "Gaby Kaibaman",
        "dialogue": "Encontré mis listas viejas. ¿Sirven de algo o son puro recuerdo?",
        "options": [
          {
            "id": "A",
            "text": "Revisemos qué ideas siguen funcionando y qué dependía de aquel formato.",
            "reaction": "«Puede ser... al menos así sé por dónde empezar», responde despacio.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Guardalas por nostalgia; lo competitivo requiere empezar de cero.",
            "reaction": "«No sé, siento que quedaría algo pendiente», murmura.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Probemos una lista entera tal como estaba, por curiosidad.",
            "reaction": "«Quizá. Igual me cuesta verlo tan sencillo», reconoce.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Gaby Kaibaman",
        "dialogue": "Una carta antigua parece útil contra el meta actual. ¿La incorporamos enseguida?",
        "options": [
          {
            "id": "A",
            "text": "Mejor no, si fuera buena ya estaría en las listas populares.",
            "reaction": "«Entiendo, pero me da miedo que salga peor», admite.",
            "delta": -1
          },
          {
            "id": "B",
            "text": "Testeémosla con enfrentamientos concretos antes de modificar la construcción.",
            "reaction": "«Eso me resulta más manejable. Gracias», contesta.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Si nadie la juega, tenemos factor sorpresa; usémosla.",
            "reaction": "«Podría intentarlo, aunque no estoy muy convencido», dice.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Gaby Kaibaman",
        "dialogue": "Un jugador nuevo me pide que le cuente cómo era competir antes. ¿Qué le muestro?",
        "options": [
          {
            "id": "A",
            "text": "Mostrale las listas más famosas de esa época y que investigue.",
            "reaction": "«No lo descarto, pero necesito pensarlo», responde.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Decile que el juego cambió demasiado y no vale comparar.",
            "reaction": "«Ojalá fuera tan fácil. Lo voy a considerar», dice.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Elegí una partida que explique algo que todavía se aplica hoy y contá el contexto.",
            "reaction": "«Bueno... voy a probarlo. Me sirve tener algo concreto», cierra.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Gaby descubre que su experiencia anterior todavía puede aportar sin tener que revivirla exactamente.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 76,
    "code": "DC-E076",
    "character_index": 26,
    "character": "Joako Polonia",
    "event_index_for_character": 1,
    "title": "La mesa de Dima",
    "mili_intro": "Como responsable de Dima, Joako Polonia organiza un torneo y descubre que algunos jugadores sienten que sus opiniones nunca llegan a quienes toman decisiones.",
    "stages": [
      {
        "index": 1,
        "speaker": "Joako Polonia",
        "dialogue": "Me dijeron que nunca escuchamos sugerencias. ¿Cómo abro el diálogo sin prometer todo?",
        "options": [
          {
            "id": "A",
            "text": "Dejá una caja de sugerencias y leelas cuando haya tiempo.",
            "reaction": "«Quizá. Igual me cuesta verlo tan sencillo», reconoce.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Preparemos un canal concreto, con plazos para responder y criterios claros.",
            "reaction": "«Puede ser... al menos así sé por dónde empezar», responde despacio.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Hagamos una reunión abierta esta noche para que opinen todos.",
            "reaction": "«No sé, siento que quedaría algo pendiente», murmura.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Joako Polonia",
        "dialogue": "Una propuesta es buena, pero cuesta créditos que no tenemos. ¿Cómo la comunicamos?",
        "options": [
          {
            "id": "A",
            "text": "Agradezcamos la idea y expliquemos qué tendría que cambiar para financiarla.",
            "reaction": "«Eso me resulta más manejable. Gracias», contesta.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Aprobémosla igual y recortemos otra cosa más adelante.",
            "reaction": "«Podría intentarlo, aunque no estoy muy convencido», dice.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Respondamos que por presupuesto no se puede y pasemos a la próxima.",
            "reaction": "«Entiendo, pero me da miedo que salga peor», admite.",
            "delta": -1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Joako Polonia",
        "dialogue": "Dos jugadores proponen cosas incompatibles y esperan que elija. ¿Qué hago?",
        "options": [
          {
            "id": "A",
            "text": "Buscá una solución intermedia aunque ninguna funcione bien.",
            "reaction": "«Ojalá fuera tan fácil. Lo voy a considerar», dice.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Compará las necesidades que cubre cada propuesta y explicá la decisión final.",
            "reaction": "«Bueno... voy a probarlo. Me sirve tener algo concreto», cierra.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Votá con el grupo para que nadie pueda culparte.",
            "reaction": "«No lo descarto, pero necesito pensarlo», responde.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Joako consigue que la tienda escuche más sin dejar de tomar decisiones responsables.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 79,
    "code": "DC-E079",
    "character_index": 27,
    "character": "El Pollo",
    "event_index_for_character": 1,
    "title": "No me sale una",
    "mili_intro": "El Pollo atraviesa una semana de manos iniciales muy malas. Está convencido de que el mazo lo traiciona y quiere modificar muchas cartas a la vez.",
    "stages": [
      {
        "index": 1,
        "speaker": "El Pollo",
        "dialogue": "Me salen todas las manos horribles. ¿Cambio medio mazo?",
        "options": [
          {
            "id": "A",
            "text": "Revisemos probabilidades y una muestra razonable antes de cambiar cartas.",
            "reaction": "«Puede ser... al menos así sé por dónde empezar», responde despacio.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Cambiá las cartas que te quedaron muertas en las últimas cinco partidas.",
            "reaction": "«No sé, siento que quedaría algo pendiente», murmura.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "No cambies nada, la mala suerte se corrige sola.",
            "reaction": "«Quizá. Igual me cuesta verlo tan sencillo», reconoce.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "El Pollo",
        "dialogue": "Probé dos cambios y ahora robo otra cosa que no funciona. ¿Qué registramos?",
        "options": [
          {
            "id": "A",
            "text": "Volvamos a la primera lista y olvidemos todo lo probado.",
            "reaction": "«Entiendo, pero me da miedo que salga peor», admite.",
            "delta": -1
          },
          {
            "id": "B",
            "text": "Anotemos qué problema buscaba resolver cada cambio y si apareció uno nuevo.",
            "reaction": "«Eso me resulta más manejable. Gracias», contesta.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Contá solo las manos que no pudieron jugar para detectar el bloqueo.",
            "reaction": "«Podría intentarlo, aunque no estoy muy convencido», dice.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "El Pollo",
        "dialogue": "Me invitan a competir mañana. Siento que voy a perder de nuevo. ¿Qué me decís?",
        "options": [
          {
            "id": "A",
            "text": "No te anotes hasta volver a ganar en testeo.",
            "reaction": "«Ojalá fuera tan fácil. Lo voy a considerar», dice.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Elegí si querés jugar según tu preparación y ganas, no para vengarte de las manos anteriores.",
            "reaction": "«Bueno... voy a probarlo. Me sirve tener algo concreto», cierra.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Andá para cortar la racha, a veces hace falta exponerse.",
            "reaction": "«No lo descarto, pero necesito pensarlo», responde.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "El Pollo deja de tratar a cada robo como una señal del destino.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 82,
    "code": "DC-E082",
    "character_index": 28,
    "character": "Juani el Gigante",
    "event_index_for_character": 1,
    "title": "El lugar en la mesa",
    "mili_intro": "Juani llega a un local donde hay una mesa de testeo muy ajustada y un jugador tímido se queda sin silla. Juani ofrece cederle la suya, pero también necesita practicar.",
    "stages": [
      {
        "index": 1,
        "speaker": "Juani el Gigante",
        "dialogue": "Le puedo dar mi silla, pero yo también vine a testear. ¿Cómo lo resolvemos?",
        "options": [
          {
            "id": "A",
            "text": "Cedé tu lugar y mirá las partidas desde atrás.",
            "reaction": "«Puede funcionar, aunque me gustaría hablarlo un poco más», comenta.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Pedile al organizador que agregue una silla aunque quede todo apretado.",
            "reaction": "«Entiendo lo que decís. No sé si es lo que necesito ahora», contesta.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Busquemos una rotación de mesas para que ambos participen.",
            "reaction": "«Me gusta esa idea. Siento que así todos podemos participar», responde.",
            "delta": 1
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Juani el Gigante",
        "dialogue": "El chico dice que prefiere mirar porque no quiere molestar. ¿Le insistimos?",
        "options": [
          {
            "id": "A",
            "text": "Ofrezcamos una partida sin presión y dejemos que él decida.",
            "reaction": "«Dale, así me quedo más tranquilo con la decisión», dice.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Sentémoslo igual: cuando empiece a jugar se le pasa.",
            "reaction": "«Podría probarlo, pero hay algo que todavía me hace ruido», reconoce.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Respetemos que quiera mirar y no volvamos a ofrecerle.",
            "reaction": "«Lo veo, aunque preferiría no cerrar el tema tan rápido», agrega.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Juani el Gigante",
        "dialogue": "Después se anima, pero pierde rápido y quiere irse. ¿Qué hacemos?",
        "options": [
          {
            "id": "A",
            "text": "Preguntale si quiere revisar una jugada o simplemente descansar, sin exigirle revancha.",
            "reaction": "«Gracias por escucharlo. Creo que con eso podemos avanzar», concluye.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Jugale otra partida para que tenga la oportunidad de ganar.",
            "reaction": "«Me sirve una parte de eso, pero todavía tengo mis dudas», admite.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Decile que perder rápido es normal y no debería afectarle.",
            "reaction": "«Bueno, lo voy a pensar. No quiero decidirlo apurado», responde.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Juani termina jugando menos manos de las previstas y compartiendo mejor la experiencia.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 85,
    "code": "DC-E085",
    "character_index": 29,
    "character": "Johan Cruif",
    "event_index_for_character": 1,
    "title": "El pase que nadie vio",
    "mili_intro": "Johan compara una jugada de cartas con una jugada de fútbol: un movimiento aparentemente defensivo abre una ventaja futura. Sus compañeros prefieren ir directo al combo.",
    "stages": [
      {
        "index": 1,
        "speaker": "Johan Cruif",
        "dialogue": "Les explico que hay que mover primero para abrir espacio después, pero quieren atacar ya. ¿Cómo lo mostramos?",
        "options": [
          {
            "id": "A",
            "text": "Probemos ambas líneas y comparemos qué recursos dejan para el siguiente turno.",
            "reaction": "«Me gusta esa idea. Siento que así todos podemos participar», responde.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Seguí con la metáfora hasta que entiendan la idea.",
            "reaction": "«Puede funcionar, aunque me gustaría hablarlo un poco más», comenta.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Dejales jugar el combo y después mostrá lo que salió mal.",
            "reaction": "«Entiendo lo que decís. No sé si es lo que necesito ahora», contesta.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Johan Cruif",
        "dialogue": "Un jugador dice que las comparaciones con fútbol le distraen. ¿Las dejo?",
        "options": [
          {
            "id": "A",
            "text": "Evitá usar analogías en cualquier sesión futura.",
            "reaction": "«Lo veo, aunque preferiría no cerrar el tema tan rápido», agrega.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Adaptá la explicación a términos del juego sin cambiar el concepto.",
            "reaction": "«Dale, así me quedo más tranquilo con la decisión», dice.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Pedile que escuche igual; la analogía ayuda a los demás.",
            "reaction": "«Podría probarlo, pero hay algo que todavía me hace ruido», reconoce.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Johan Cruif",
        "dialogue": "La línea lenta funcionó, pero solo en este cruce. ¿Qué conclusión sacamos?",
        "options": [
          {
            "id": "A",
            "text": "Incluyamos esa línea en el plan principal del mazo.",
            "reaction": "«Me sirve una parte de eso, pero todavía tengo mis dudas», admite.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Guardemos el ejemplo como anécdota sin aplicarlo más.",
            "reaction": "«Bueno, lo voy a pensar. No quiero decidirlo apurado», responde.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Identifiquemos los contextos donde conviene en vez de elevarla a regla general.",
            "reaction": "«Gracias por escucharlo. Creo que con eso podemos avanzar», concluye.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Johan convierte una metáfora divertida en una herramienta flexible de análisis.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 88,
    "code": "DC-E088",
    "character_index": 30,
    "character": "Aquiles",
    "event_index_for_character": 1,
    "title": "La armadura agrietada",
    "mili_intro": "Aquiles llega a un local decidido a no mostrar nervios. Pierde una partida y se retira a un rincón antes de que lo feliciten o consuelen.",
    "stages": [
      {
        "index": 1,
        "speaker": "Aquiles",
        "dialogue": "No quiero que los demás me vean mal por una ronda. ¿Me quedo apartado?",
        "options": [
          {
            "id": "A",
            "text": "Andate a casa para evitar comentarios que te molesten.",
            "reaction": "«Quizá. Igual me cuesta verlo tan sencillo», reconoce.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Tomate un momento si lo necesitás, pero no conviertas la pausa en una obligación de aislarte.",
            "reaction": "«Puede ser... al menos así sé por dónde empezar», responde despacio.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Volvé a la mesa enseguida y demostrá que no te afecta.",
            "reaction": "«No sé, siento que quedaría algo pendiente», murmura.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Aquiles",
        "dialogue": "Un compañero quiere revisar la partida conmigo ahora. ¿Le digo que no?",
        "options": [
          {
            "id": "A",
            "text": "Podés acordar revisarla más tarde y decirle cuándo te vendría bien.",
            "reaction": "«Eso me resulta más manejable. Gracias», contesta.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Aprovechá ahora que la jugada está fresca.",
            "reaction": "«Podría intentarlo, aunque no estoy muy convencido», dice.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Rechazá la revisión porque esa partida ya terminó.",
            "reaction": "«Entiendo, pero me da miedo que salga peor», admite.",
            "delta": -1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Aquiles",
        "dialogue": "Si vuelvo a perder, siento que no voy a levantar nunca. ¿Cómo lo encaro?",
        "options": [
          {
            "id": "A",
            "text": "Descansá de competir hasta recuperar confianza total.",
            "reaction": "«Ojalá fuera tan fácil. Lo voy a considerar», dice.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Definamos objetivos de juego concretos y evaluemos más que el resultado inmediato.",
            "reaction": "«Bueno... voy a probarlo. Me sirve tener algo concreto», cierra.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Jugá más torneos hasta que la racha cambie.",
            "reaction": "«No lo descarto, pero necesito pensarlo», responde.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Aquiles se permite seguir compitiendo sin fingir invulnerabilidad.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 91,
    "code": "DC-E091",
    "character_index": 31,
    "character": "Cavero",
    "event_index_for_character": 1,
    "title": "La oferta demasiado buena",
    "mili_intro": "Cavero recibe una propuesta para representar a otra tienda en una exhibición. Le prometen visibilidad y premios, pero el organizador evita explicar las condiciones de participación.",
    "stages": [
      {
        "index": 1,
        "speaker": "Cavero",
        "dialogue": "Suena espectacular, pero no me dicen qué esperan de mí. ¿Negocio ahora o espero?",
        "options": [
          {
            "id": "A",
            "text": "Aceptá la exhibición y ajustá las condiciones cuando llegues.",
            "reaction": "«No es una mala jugada, aunque cedemos bastante», comenta.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Subí el precio que te ofrecen; si hay más dinero, compensa el riesgo.",
            "reaction": "«Puede funcionar, pero no voy a dar nada por sentado», advierte.",
            "delta": -1
          },
          {
            "id": "C",
            "text": "Pidamos condiciones, obligaciones y uso de imagen por escrito antes de aceptar.",
            "reaction": "«Interesante. Eso me deja margen para moverme», responde con media sonrisa.",
            "delta": 1
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Cavero",
        "dialogue": "Dicen que quieren exclusividad para anunciar mi nombre. ¿Eso afecta al equipo?",
        "options": [
          {
            "id": "A",
            "text": "Que anuncien lo que quieran, mientras no interfiera con nuestros torneos.",
            "reaction": "«Es una opción diplomática; quizá demasiado», señala.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Exigí que también anuncien a nuestra organización como condición.",
            "reaction": "«No me disgusta, pero el costo puede ser mayor de lo que parece», dice.",
            "delta": -1
          },
          {
            "id": "C",
            "text": "Verifiquemos si la exclusividad choca con compromisos existentes y aclaremos el alcance.",
            "reaction": "«Ahora sí estamos negociando algo útil», sonríe.",
            "delta": 1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Cavero",
        "dialogue": "El plazo vence esta noche. ¿Cómo cierro la negociación?",
        "options": [
          {
            "id": "A",
            "text": "Respondamos solo cuando los términos estén claros; si no, podemos rechazar.",
            "reaction": "«Perfecto. Que cada uno se haga cargo de su parte», concluye.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Aceptá verbalmente y revisemos el acuerdo mañana.",
            "reaction": "«Quizá. Prefiero no regalar esa ventaja todavía», responde.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Pediles una última mejora económica antes de dar el sí.",
            "reaction": "«Lo tendré en cuenta; todavía no estoy convencido», termina.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Cavero conserva margen de decisión porque no se dejó impresionar por el anuncio.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 94,
    "code": "DC-E094",
    "character_index": 32,
    "character": "Manu «El Subcampeón Eterno»",
    "event_index_for_character": 1,
    "title": "Una final más",
    "mili_intro": "Manu llega a otra final importante y todos empiezan a bromear con que volverá a quedar segundo. Él sonríe en público, pero admite que la etiqueta ya le pesa.",
    "stages": [
      {
        "index": 1,
        "speaker": "Manu «El Subcampeón Eterno»",
        "dialogue": "Otra vez me dicen que voy a ser subcampeón. ¿Les sigo el juego o lo paro?",
        "options": [
          {
            "id": "A",
            "text": "Usá los comentarios como motivación para ganar la final.",
            "reaction": "«Entiendo lo que decís. No sé si es lo que necesito ahora», contesta.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Si ya no te divierte, podés marcarlo sin tener que justificarte.",
            "reaction": "«Me gusta esa idea. Siento que así todos podemos participar», responde.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Reíte con ellos; así se nota que no te afecta.",
            "reaction": "«Puede funcionar, aunque me gustaría hablarlo un poco más», comenta.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Manu «El Subcampeón Eterno»",
        "dialogue": "Me preguntan si cambiaría algo de mi preparación por tantas finales perdidas. ¿Qué analizamos?",
        "options": [
          {
            "id": "A",
            "text": "Dejá de preparar finales de manera especial; tratálas como otra ronda.",
            "reaction": "«Lo veo, aunque preferiría no cerrar el tema tan rápido», agrega.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Revisemos partidas y decisiones concretas, sin asumir que todas las finales tuvieron la misma causa.",
            "reaction": "«Dale, así me quedo más tranquilo con la decisión», dice.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Busquemos qué patrón se repite y cambiemos la rutina entera.",
            "reaction": "«Podría probarlo, pero hay algo que todavía me hace ruido», reconoce.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Manu «El Subcampeón Eterno»",
        "dialogue": "Si vuelvo a quedar segundo, ¿qué me digo a mí mismo?",
        "options": [
          {
            "id": "A",
            "text": "Que el resultado importa, pero una final no borra el trabajo ni lo aprendido.",
            "reaction": "«Gracias por escucharlo. Creo que con eso podemos avanzar», concluye.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Que al menos llegaste más lejos que casi todos.",
            "reaction": "«Me sirve una parte de eso, pero todavía tengo mis dudas», admite.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Que el próximo torneo es la única manera de sacarte la espina.",
            "reaction": "«Bueno, lo voy a pensar. No quiero decidirlo apurado», responde.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Manu encara la final como una partida nueva y no como un juicio sobre todos sus segundos puestos.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 97,
    "code": "DC-E097",
    "character_index": 33,
    "character": "Julián D’Angelo",
    "event_index_for_character": 1,
    "title": "El mazo de bienvenida",
    "mili_intro": "Julián D’Angelo conoce a un jugador nuevo en Korium. Le propone prestarle un mazo para su primera práctica, pero la lista contiene cartas difíciles de conseguir.",
    "stages": [
      {
        "index": 1,
        "speaker": "Julián D’Angelo",
        "dialogue": "Quiero que se sume, pero mi mazo tiene cartas caras. ¿Con qué lo hago probar?",
        "options": [
          {
            "id": "A",
            "text": "Armemos una versión accesible que conserve el estilo que quiere conocer.",
            "reaction": "«Me gusta esa idea. Siento que así todos podemos participar», responde.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Prestale tu mazo completo; así experimenta la versión real.",
            "reaction": "«Puede funcionar, aunque me gustaría hablarlo un poco más», comenta.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Elegí un mazo barato distinto, aunque no sea del estilo que le gusta.",
            "reaction": "«Entiendo lo que decís. No sé si es lo que necesito ahora», contesta.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Julián D’Angelo",
        "dialogue": "El chico pierde varias partidas y dice que el mazo es demasiado difícil. ¿Qué ajustamos?",
        "options": [
          {
            "id": "A",
            "text": "Cambiemos el mazo por otro más sencillo de inmediato.",
            "reaction": "«Podría probarlo, pero hay algo que todavía me hace ruido», reconoce.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Que siga jugando, la dificultad se supera con horas.",
            "reaction": "«Lo veo, aunque preferiría no cerrar el tema tan rápido», agrega.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Simplifiquemos una interacción y practiquémosla antes de sumar más decisiones.",
            "reaction": "«Dale, así me quedo más tranquilo con la decisión», dice.",
            "delta": 1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Julián D’Angelo",
        "dialogue": "Ahora quiere comprarse todas las cartas mañana. ¿Qué le sugerís?",
        "options": [
          {
            "id": "A",
            "text": "Decile que primero gane un local con el mazo prestado.",
            "reaction": "«Bueno, lo voy a pensar. No quiero decidirlo apurado», responde.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Que pruebe un poco más y revise su presupuesto antes de gastar.",
            "reaction": "«Gracias por escucharlo. Creo que con eso podemos avanzar», concluye.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Si le gustó, ayudalo a buscar ofertas hoy mismo.",
            "reaction": "«Me sirve una parte de eso, pero todavía tengo mis dudas», admite.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Julián D’Angelo ayuda a un nuevo jugador a empezar sin convertir la bienvenida en una compra apurada.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 100,
    "code": "DC-E100",
    "character_index": 34,
    "character": "Mauro",
    "event_index_for_character": 1,
    "title": "La primera decisión de Korium",
    "mili_intro": "Korium empieza una semana con recursos limitados. Mauro debe elegir entre mejorar el espacio de testeo o cubrir gastos para un torneo importante, y los jugadores están divididos.",
    "stages": [
      {
        "index": 1,
        "speaker": "Mauro",
        "dialogue": "Tenemos créditos para una sola mejora. ¿Cómo elegimos entre local y viaje?",
        "options": [
          {
            "id": "A",
            "text": "Mejorá el espacio; se usa todas las semanas.",
            "reaction": "«No descarto esa opción. Me falta información para respaldarla», dice.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Comparemos impacto, urgencia y compromisos ya asumidos antes de decidir.",
            "reaction": "«Eso es razonable. Prefiero tener un criterio claro», responde.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Priorizá el torneo: los resultados pueden traer más recursos.",
            "reaction": "«Es viable, pero habría que revisar las condiciones», señala.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Mauro",
        "dialogue": "El equipo reclama que nadie conoce el presupuesto real. ¿Qué mostramos?",
        "options": [
          {
            "id": "A",
            "text": "Deciles solo cuánto queda, el resto es gestión interna.",
            "reaction": "«Me parece prematuro. Evaluaría otra alternativa», replica.",
            "delta": -1
          },
          {
            "id": "B",
            "text": "Compartamos una síntesis clara de ingresos, gastos y margen disponible.",
            "reaction": "«Bien. Así podemos comparar sin improvisar», afirma.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Mostrales cada comprobante para que sepan todo.",
            "reaction": "«Podría aceptarlo, aunque no resuelve todo el problema», observa.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Mauro",
        "dialogue": "Uno propone financiar la diferencia con dinero personal. ¿Lo aceptamos?",
        "options": [
          {
            "id": "A",
            "text": "Rechazá cualquier aporte personal para evitar conflictos.",
            "reaction": "«Entiendo la intención. Preferiría definirlo con más precisión», dice.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Antes de aceptar, aclaremos si es donación o préstamo y cómo se documentaría.",
            "reaction": "«De acuerdo. Queda una decisión concreta y verificable», concluye.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Aceptá para no perder oportunidades, después se compensa.",
            "reaction": "«Es un compromiso posible, pero demasiado abierto», considera.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Mauro toma una decisión con respaldo y sin comprometer más créditos de los disponibles.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 103,
    "code": "DC-E103",
    "character_index": 35,
    "character": "Christopher Morán",
    "event_index_for_character": 1,
    "title": "La sonrisa del rival",
    "mili_intro": "Christopher Morán felicita a un rival por una victoria mientras, entre bromas, le pregunta detalles de su próxima lista. El rival se ríe, pero después sospecha que quería sacarle información.",
    "stages": [
      {
        "index": 1,
        "speaker": "Christopher Morán",
        "dialogue": "Le pregunté por su mazo jugando, pero parece que se ofendió. ¿Cómo lo arreglo?",
        "options": [
          {
            "id": "A",
            "text": "Aclará que no tiene obligación de revelar nada y dejá de insistir.",
            "reaction": "«Interesante. Eso me deja margen para moverme», responde con media sonrisa.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Hacé otro chiste para que vea que no era tan serio.",
            "reaction": "«No es una mala jugada, aunque cedemos bastante», comenta.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Decile que solo intentabas conversar como cualquier jugador.",
            "reaction": "«Puede funcionar, pero no voy a dar nada por sentado», advierte.",
            "delta": -1
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Christopher Morán",
        "dialogue": "Ahora me ofrecen un testeo privado para demostrar que no hay mala onda. ¿Voy?",
        "options": [
          {
            "id": "A",
            "text": "Rechazá; no tenés que dar explicaciones por una pregunta.",
            "reaction": "«No me disgusta, pero el costo puede ser mayor de lo que parece», dice.",
            "delta": -1
          },
          {
            "id": "B",
            "text": "Si interesa a ambos, definamos objetivos y límites de información.",
            "reaction": "«Ahora sí estamos negociando algo útil», sonríe.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Aceptá para recuperar su confianza cuanto antes.",
            "reaction": "«Es una opción diplomática; quizá demasiado», señala.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Christopher Morán",
        "dialogue": "Si me pregunta qué aprendí de esa charla, ¿se lo cuento?",
        "options": [
          {
            "id": "A",
            "text": "Contá lo que realmente conversaron sin exagerar ni fingir ignorancia.",
            "reaction": "«Perfecto. Que cada uno se haga cargo de su parte», concluye.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Mostrale un ajuste de tu lista para equilibrar el intercambio.",
            "reaction": "«Quizá. Prefiero no regalar esa ventaja todavía», responde.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Decile que no aprendiste nada aunque sí te haya servido.",
            "reaction": "«Lo tendré en cuenta; todavía no estoy convencido», termina.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Christopher conserva su carisma sin usar cada sonrisa como puerta a una negociación.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 106,
    "code": "DC-E106",
    "character_index": 36,
    "character": "Leo Rosendorn",
    "event_index_for_character": 1,
    "title": "El discurso previo",
    "mili_intro": "Leo quiere dar una arenga antes de un torneo de Garden. Un compañero prefiere prepararse en silencio y otro le pide que haga algo más largo y espectacular.",
    "stages": [
      {
        "index": 1,
        "speaker": "Leo Rosendorn",
        "dialogue": "Quiero levantar al equipo, pero parece que no todos quieren escuchar. ¿Qué hacemos?",
        "options": [
          {
            "id": "A",
            "text": "Suspendé la arenga para no alterar la concentración.",
            "reaction": "«Mmm, no está mal, aunque me imaginaba otra cosa», comenta.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Preguntemos quién se suma y mantengamos un mensaje breve para los que quieran.",
            "reaction": "«¡Ahí va! Eso sí que me entusiasma», dice con una sonrisa.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Hacelo igual: treinta segundos de energía no molestan a nadie.",
            "reaction": "«Puede ser, pero así perdemos un poco de la gracia», bromea.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Leo Rosendorn",
        "dialogue": "Me piden que nombre a los jugadores que mejor vienen rindiendo. ¿Los destaco?",
        "options": [
          {
            "id": "A",
            "text": "Elegí al que más mejoró, así se motiva a seguir.",
            "reaction": "«Te sigo, pero dejame darte otra vuelta a la idea», responde.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Reconozcamos el trabajo colectivo sin convertirlo en una clasificación pública.",
            "reaction": "«¡Listo! Así hacemos algo de verdad», responde animado.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Nombrá a los líderes para que contagien al resto.",
            "reaction": "«Es una opción; quizá se nos quede un poco corta», considera.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Leo Rosendorn",
        "dialogue": "Después del discurso perdemos la primera ronda. ¿Digo algo otra vez?",
        "options": [
          {
            "id": "A",
            "text": "Hacé una arenga más fuerte para dar vuelta la energía.",
            "reaction": "«Podría salir bien, pero no termino de verlo», admite.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "No vuelvas a hablar hasta que el equipo gane una ronda.",
            "reaction": "«Bueno, lo intento; no te prometo estar convencido», se ríe.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Esperemos a que procesen la partida y ofrezcamos apoyo concreto.",
            "reaction": "«¡Perfecto! Después te cuento cómo salió», cierra con energía.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Leo aprende a contagiar entusiasmo sin exigir que todos lo expresen igual.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 109,
    "code": "DC-E109",
    "character_index": 37,
    "character": "Nico TCG",
    "event_index_for_character": 1,
    "title": "El consejo del desconocido",
    "mili_intro": "Nico TCG encuentra a un principiante preguntando por cartas en una tienda. Un vendedor está ocupado y la persona necesita ayuda para elegir por dónde empezar.",
    "stages": [
      {
        "index": 1,
        "speaker": "Nico TCG",
        "dialogue": "Me preguntó qué mazo comprar, pero no sé su presupuesto. ¿Le recomiendo uno?",
        "options": [
          {
            "id": "A",
            "text": "Dale una lista competitiva económica que conozcamos bien.",
            "reaction": "«Puede funcionar, aunque me gustaría hablarlo un poco más», comenta.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Mejor que espere al vendedor, él conoce los precios.",
            "reaction": "«Entiendo lo que decís. No sé si es lo que necesito ahora», contesta.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Primero averigüemos cuánto puede gastar y qué estilo le llama la atención.",
            "reaction": "«Me gusta esa idea. Siento que así todos podemos participar», responde.",
            "delta": 1
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Nico TCG",
        "dialogue": "Dice que le gusta Combo, pero lo preocupa equivocarse con tantos pasos. ¿Qué hacemos?",
        "options": [
          {
            "id": "A",
            "text": "Dale el combo completo escrito para que lo memorice.",
            "reaction": "«Lo veo, aunque preferiría no cerrar el tema tan rápido», agrega.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Busquemos una versión accesible y practiquemos una línea básica.",
            "reaction": "«Dale, así me quedo más tranquilo con la decisión», dice.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Recomendale Aggro para empezar y después pasar a Combo.",
            "reaction": "«Podría probarlo, pero hay algo que todavía me hace ruido», reconoce.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Nico TCG",
        "dialogue": "El chico quiere comprar hoy todo el mazo sin haberlo probado. ¿Qué le digo?",
        "options": [
          {
            "id": "A",
            "text": "Decile que no compre nada hasta que gane partidas casuales.",
            "reaction": "«Bueno, lo voy a pensar. No quiero decidirlo apurado», responde.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Invitálo a testear una versión prestada antes de hacer el gasto grande.",
            "reaction": "«Gracias por escucharlo. Creo que con eso podemos avanzar», concluye.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Si le entusiasma, ayudalo a encontrar las piezas más baratas.",
            "reaction": "«Me sirve una parte de eso, pero todavía tengo mis dudas», admite.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Nico TCG ayuda al nuevo jugador a elegir con información, no por entusiasmo prestado.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 112,
    "code": "DC-E112",
    "character_index": 38,
    "character": "Facundo Pacini",
    "event_index_for_character": 1,
    "title": "Una prueba sin margen",
    "mili_intro": "Facundo prepara un cronograma de testeo para un Nacional. El equipo recibe una invitación a un evento extra, pero aceptarla dejaría poco tiempo para analizar resultados.",
    "stages": [
      {
        "index": 1,
        "speaker": "Facundo Pacini",
        "dialogue": "El evento suma experiencia, pero nos quita preparación. ¿Cómo calculamos si conviene?",
        "options": [
          {
            "id": "A",
            "text": "Rechazá cualquier evento que no estuviera en el plan original.",
            "reaction": "«No descarto esa opción. Me falta información para respaldarla», dice.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Compará aprendizaje, desgaste y tiempo restante antes de cambiar el programa.",
            "reaction": "«Eso es razonable. Prefiero tener un criterio claro», responde.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Aceptá; competir suele enseñar más que practicar.",
            "reaction": "«Es viable, pero habría que revisar las condiciones», señala.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Facundo Pacini",
        "dialogue": "Una pareja de testeo se cancela a último momento. ¿Qué reemplazo priorizamos?",
        "options": [
          {
            "id": "A",
            "text": "Practiquemos el cruce más frecuente del meta para no desperdiciar tiempo.",
            "reaction": "«Podría aceptarlo, aunque no resuelve todo el problema», observa.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Dediquemos la jornada a revisar videos en lugar de jugar.",
            "reaction": "«Me parece prematuro. Evaluaría otra alternativa», replica.",
            "delta": -1
          },
          {
            "id": "C",
            "text": "Elijamos el enfrentamiento menos cubierto con los recursos que sí tenemos.",
            "reaction": "«Bien. Así podemos comparar sin improvisar», afirma.",
            "delta": 1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Facundo Pacini",
        "dialogue": "El cronograma quedó corto. ¿Qué incluimos en el informe final?",
        "options": [
          {
            "id": "A",
            "text": "Señalemos qué se probó, qué sigue incierto y qué decisiones se toman igual.",
            "reaction": "«De acuerdo. Queda una decisión concreta y verificable», concluye.",
            "delta": 1
          },
          {
            "id": "B",
            "text": "Redondeemos las estimaciones para que el informe sea fácil de usar.",
            "reaction": "«Es un compromiso posible, pero demasiado abierto», considera.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Expliquemos solo las conclusiones más firmes y omitamos lo pendiente.",
            "reaction": "«Entiendo la intención. Preferiría definirlo con más precisión», dice.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Facundo entrega un plan más modesto pero útil porque reconoce sus límites.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 115,
    "code": "DC-E115",
    "character_index": 39,
    "character": "Valeria Noctis",
    "event_index_for_character": 1,
    "title": "La sala de los secretos",
    "mili_intro": "Valeria encuentra una sala de preparación vacía y escucha a dos rivales discutir su estrategia. Uno deja apuntes sobre la mesa al retirarse.",
    "stages": [
      {
        "index": 1,
        "speaker": "Valeria Noctis",
        "dialogue": "Dejaron las notas a la vista. ¿Las leo si nadie me vio entrar?",
        "options": [
          {
            "id": "A",
            "text": "Mirá solo el título para saber de qué estrategia hablaban.",
            "reaction": "«No es una mala jugada, aunque cedemos bastante», comenta.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Entregá las notas al organizador sin siquiera acercarte a ellas.",
            "reaction": "«Puede funcionar, pero no voy a dar nada por sentado», advierte.",
            "delta": -1
          },
          {
            "id": "C",
            "text": "No usemos información ajena que claramente no fue compartida con nosotros.",
            "reaction": "«Interesante. Eso me deja margen para moverme», responde con media sonrisa.",
            "delta": 1
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Valeria Noctis",
        "dialogue": "Uno vuelve a buscar el cuaderno y me pregunta si vi algo. ¿Qué contesto?",
        "options": [
          {
            "id": "A",
            "text": "Respondé simplemente que estaba ahí cuando llegaste.",
            "reaction": "«Es una opción diplomática; quizá demasiado», señala.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "No digas nada para evitar que crea que lo espiabas.",
            "reaction": "«No me disgusta, pero el costo puede ser mayor de lo que parece», dice.",
            "delta": -1
          },
          {
            "id": "C",
            "text": "Decile de manera precisa qué viste y devolvé el cuaderno.",
            "reaction": "«Ahora sí estamos negociando algo útil», sonríe.",
            "delta": 1
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Valeria Noctis",
        "dialogue": "Los otros me invitan después a una prueba abierta. ¿Participo?",
        "options": [
          {
            "id": "A",
            "text": "Rechazá porque sería incómodo competir después de lo ocurrido.",
            "reaction": "«Lo tendré en cuenta; todavía no estoy convencido», termina.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Sí, si la actividad es voluntaria y quedan claras las reglas de intercambio.",
            "reaction": "«Perfecto. Que cada uno se haga cargo de su parte», concluye.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Aceptá para conocer lo que no viste en sus apuntes.",
            "reaction": "«Quizá. Prefiero no regalar esa ventaja todavía», responde.",
            "delta": 0
          }
        ]
      }
    ],
    "ending_success": "Valeria protege una reputación que le será más útil que unas notas obtenidas por accidente.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  },
  {
    "id": 118,
    "code": "DC-E118",
    "character_index": 40,
    "character": "Dante Voss",
    "event_index_for_character": 1,
    "title": "El pacto de caballeros",
    "mili_intro": "Dante propone con solemnidad un acuerdo de testeo entre rivales: compartir una sola estrategia y mantener secreto el resto. Nadie sabe exactamente qué significa compartir una estrategia.",
    "stages": [
      {
        "index": 1,
        "speaker": "Dante Voss",
        "dialogue": "Quiero un pacto claro. ¿Qué entra exactamente en una estrategia?",
        "options": [
          {
            "id": "A",
            "text": "Compartamos una lista completa y que el otro haga lo mismo.",
            "reaction": "«Puede funcionar, pero no voy a dar nada por sentado», advierte.",
            "delta": -1
          },
          {
            "id": "B",
            "text": "Definamos por escrito qué datos, listas y resultados se incluyen y cuáles no.",
            "reaction": "«Interesante. Eso me deja margen para moverme», responde con media sonrisa.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Dejemos la definición amplia para resolverla según avance el testeo.",
            "reaction": "«No es una mala jugada, aunque cedemos bastante», comenta.",
            "delta": 0
          }
        ]
      },
      {
        "index": 2,
        "speaker": "Dante Voss",
        "dialogue": "Durante la prueba aparece una variante que nadie había previsto. ¿A quién pertenece ese descubrimiento?",
        "options": [
          {
            "id": "A",
            "text": "Todos los presentes pueden usarla libremente porque salió durante el testeo.",
            "reaction": "«No me disgusta, pero el costo puede ser mayor de lo que parece», dice.",
            "delta": -1
          },
          {
            "id": "B",
            "text": "Acordemos cómo se pueden usar hallazgos conjuntos antes de divulgarlos.",
            "reaction": "«Ahora sí estamos negociando algo útil», sonríe.",
            "delta": 1
          },
          {
            "id": "C",
            "text": "Quien la jugó primero tiene derecho a reservarla.",
            "reaction": "«Es una opción diplomática; quizá demasiado», señala.",
            "delta": 0
          }
        ]
      },
      {
        "index": 3,
        "speaker": "Dante Voss",
        "dialogue": "El otro equipo rompe una condición menor del pacto. ¿Cortamos relaciones?",
        "options": [
          {
            "id": "A",
            "text": "Terminá el acuerdo de inmediato; un pacto sin honor no sirve.",
            "reaction": "«Quizá. Prefiero no regalar esa ventaja todavía», responde.",
            "delta": 0
          },
          {
            "id": "B",
            "text": "Dejalo pasar esta vez para cuidar la colaboración.",
            "reaction": "«Lo tendré en cuenta; todavía no estoy convencido», termina.",
            "delta": 0
          },
          {
            "id": "C",
            "text": "Señalemos el incumplimiento y evaluemos si puede corregirse antes de decidir.",
            "reaction": "«Perfecto. Que cada uno se haga cargo de su parte», concluye.",
            "delta": 1
          }
        ]
      }
    ],
    "ending_success": "Dante aprende que un compromiso respetable necesita términos más concretos que una ceremonia.",
    "ending_failure": "La conversación termina sin conflicto abierto, pero quedan inquietudes pendientes que podrán retomarse en otro momento.",
    "required": 1
  }
];