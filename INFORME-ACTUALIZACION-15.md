# Duel Circuit · Actualización 15

La copia jugable está en `C:\Users\user\Documents\ChatGPT\duel circuit\duel-circuit`. Se extrajo del ZIP de recuperación de la versión 14, creado directamente desde `C:\Users\user\Desktop\duel-circuit\duel-circuit`. El archivo `app.js` de la copia coincidía por SHA-256 con el original antes de la implementación. La carpeta original del Escritorio carecía de repositorio y rama Git. La carpeta contenedora del espacio de trabajo tenía un Git vacío en `master`, sin remoto.

## Cómo probar

Abrí `Probar actualizacion 15.cmd` o visitá http://127.0.0.1:8085/ mientras esté activo el servidor. La compilación estática se genera en `dist` con `node build-pages.mjs`. La carpeta base incluía un flujo de GitHub Pages para `main`, sin un remoto del que se pudiera verificar un sitio publicado. Para publicarlo hay que conectar la copia a un repositorio autorizado y activar ese flujo en GitHub Pages.

El puerto 8085 tiene almacenamiento propio. Para seguir una carrera existente, exportá el JSON en **Archivo y ajustes** de la versión 14 y elegí **Importar partida** en el título de la 15.

## Implementación

- Inicio azul y dorado, seis secciones, contador de preparación con decisiones explícitas y confirmación de cierre con aviso de borradores. Equipo conserva los retratos originales, los cinco roles en una fila, el acceso directo a fichas y las ventajas y desventajas conocidas en paralelo.
- Meta conserva los dos pentágonos y la simulación de las 25 combinaciones. Incluye explicaciones consultables, afinidad del plantel y un aviso persistente al cambiar la firma del formato o la banlist. Acciones abre cinco tarjetas antes de confirmar. Los encuentros entre clubes se bloquean si no hay integrantes disponibles.
- Torneos tiene pestañas de sábado, domingo y Dark Book. El borrador se guarda antes de confirmar. El resumen reúne los tres grupos. El motor valida habilitación, calendario, cupo físico compartido, cruces de día, formaciones de tres y límites de testeo antes de registrar el conjunto.
- El mercado fundacional usa los pools indicados para los seis clubes elegibles. La incorporación es gratuita y suma mantenimiento. Las entrevistas muestran tres tandas de dos preguntas comunes, con 240 respuestas escritas por duelista. La incorporación requiere una decisión expresa.
- Se importaron los 40 primeros eventos, sus IDs y textos originales. Cada uno tiene introducción de Mili, tres decisiones y tres reacciones por etapa. La clave adjunta define las respuestas favorables. Asigné −1 a reacciones que expresan un rechazo, temor o costo explícito, y 0 a las alternativas neutrales restantes. Los eventos especiales modifican amistad. El historial guarda respuesta, cambio y semana, y reanuda en la fase guardada. Entrevista, evento y charla cotidiana tienen cupos independientes. El motor anterior conserva sus datos para recuperar conversaciones de la 14 y para la IA.
- Mili usa las ilustraciones WebP recuperadas. El tutorial de inicio tiene 19 pasos y resalta los controles reales. Se guarda por carrera, se puede volver a ver desde Ajustes y se conserva la guía del primer informe. Las reacciones a torneos mayores usan los puestos y puntos del informe.
- Los campos nuevos viven en el guardado de la carrera. Los datos de torneos, plantel, noticias, economía, rankings y fatiga continúan en sus estructuras anteriores.

## Archivos y verificación

Interfaz y entrada: `app.js`, `style.css`, `index.html`. Estado, contenido y simulación: `update15.js`, `events15.js`, `interviews15.js`, `opening.js`, `social.js`, `relationships.js`, `career.js`. Ejecución, compilación y caché: `preview-launcher.mjs`, `Probar actualizacion 15.cmd`, `server.mjs`, `build-pages.mjs`, `sw.js`, `package.json` y `README.md`.

Pasaron las pruebas de regresión de la 14, las pruebas de datos y persistencia de la 15 y la compilación estática. En navegador se comprobó una carrera de Korium, el tutorial con resaltado dorado, la entrevista y el fichaje gratuito de Mati Pico, el evento con +1, −1 y 0, la recarga durante una reacción, la charla en la misma semana, las explicaciones de Meta y la asignación física y persistencia del borrador. Un diálogo nativo interrumpió esa sesión del navegador. Se reemplazaron las confirmaciones de acción, tablero y cierre por cuadros del juego, y se verificó por automatización del código de interfaz el registro conjunto, el informe de la semana 1, la llegada a la semana 2 y la protección contra el cierre duplicado.

Queda pendiente repetir en navegador el cierre completo con los cuadros nuevos y la revisión visual en un celular real, incluido arrastre físico con mouse y ajustes de tamaño en distintas pantallas. Los otros 80 eventos no forman parte del catálogo de la Actualización 15.
