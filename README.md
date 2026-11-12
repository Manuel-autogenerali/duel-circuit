# Duel Circuit · Beta 2.0

[Jugá en GitHub Pages](https://manuel-autogenerali.github.io/duel-circuit/). En Windows, podés abrir **Probar Beta 2.0.cmd** para jugar en local.

La Beta 2.0 incluye el rediseño visual, el tutorial de Mili, las tarjetas de personajes, las entrevistas, los informes semanales por duelista y los ajustes de economía, fichajes y navegación de la Actualización 15.

Si ya jugaste en GitHub Pages, usá **Continuar** en el mismo navegador. Para llevar una partida desde la versión local, exportá el JSON desde Ajustes e importalo desde la portada.


En Windows, hacé doble clic en **Jugar.cmd** y abrí la dirección que aparece en la consola. Habitualmente es http://127.0.0.1:8080/. Si ese puerto está ocupado, el lanzador prueba el 8081 y luego pide un puerto libre al sistema. Dejá abierta la consola. También podés ejecutar `npm start` desde esta carpeta.

## Primera semana

Elegí **Nueva carrera**, seleccioná a tu duelista, confirmá la identidad del club y seguí el tutorial. Empezás con un integrante y 100 CR. Inscribilo en un local y elegí una acción semanal antes de **Finalizar semana**. El informe muestra los resultados, la experiencia y los créditos. Los ingresos operativos semanales y los premios permiten ahorrar para fichajes. Las ofertas vencen al cerrar la semana.

Los guardados anteriores conservan su modo de juego. Podés exportar la carrera desde **Archivo y ajustes** e importarla desde la portada. Cada dirección y navegador tiene su propio almacenamiento.

## Reglas de esta versión

- Un fundador conserva su organización. Una identidad nueva ocupa la plaza del club de origen y sus antiguos compañeros quedan disponibles.
- Las ofertas usan la rareza sorteada y, si no hay candidatos de esa categoría, la categoría más cercana. Los Mujica restantes se ofrecen juntos, si entran en el plantel.
- El debut 3v3 se anuncia al alcanzar tres integrantes y se juega cuatro semanas después, si quedan cuatro fechas en la temporada 2027. Los demás torneos por equipos se habilitan después del debut.
- Los retratos son ilustraciones digitales originales en WebP. La galería se abre desde el pie del juego o en /galeria.html. El manifiesto de IDs vive en public/assets/characters/manifest.json. Durante la carrera, el color del marco sigue el ranking por nivel actual, potencial e ID.
- Los vínculos con clubes mejoran las negociaciones. Las charlas profesionales usan un único nivel de costo y los eventos personales se modelan con disponibilidad y fatiga. Dark Book sigue como práctica aparte.

## Android

Para probar por Wi‑Fi, desde PowerShell ejecutá `$env:DUEL_HOST='0.0.0.0'; npm start`. En el celular, abrí la IP local de la computadora con el puerto 8080. Ambas máquinas deben estar en la misma red. La instalación como PWA y el modo sin conexión requieren HTTPS en Android.

## Pruebas

`npm test` cubre el motor anterior, las 40 identidades iniciales, fichajes, 100.000 tiradas, los límites de participación, persistencia y cierre de semana. Los torneos y Dark Book son simulaciones estadísticas. El escenario es ficticio e independiente.

## Torneos y ligas

En **Torneos**, elegí el local y la modalidad, confirmá y marcá los duelistas que querés inscribir. Individual permite varios. 3v3 exige tres. El local elegido ocupa una franja semanal y las competencias adicionales usan franjas separadas. Al finalizar la semana se muestran los resultados, rondas, llaves y clasificaciones. Las tablas locales están en **Calendario y liga**.

Los locales juegan cinco rondas suizas. Nacional y YCS clasifican a 128 al Día 2, y Continental a 160. Las cantidades indicadas para los eventos grandes corresponden a individuos. En 3v3 se convierten en equipos de tres. Los clasificatorios internacionales usan la estructura Regional. Los puntos de ranking ya existentes se conservan al abrir una partida anterior.

## Meta, Dark Book y relaciones

- En **Meta actual** hay dos ruedas: ventajas entre estilos y posicionamiento en el formato. El panel revela estimaciones según la investigación. Al rotar el formato se conserva parte del conocimiento. Los resultados de estrategias poco usadas reducen gradualmente su factor sorpresa.
- Cada duelista elige su mazo al rotar el formato. En su ficha se puede conversar cada cuatro semanas. Probar un estilo dura una semana. El dominio y la adaptación cambian con práctica y torneos sin cambiar por sí solos las estrellas.
- **Dark Book** permite inscribirse en cuatro fechas por semana. Los torneos son simulados y se resuelven al finalizar la semana, después de los presenciales. Dan experiencia e información, pero no puntos nacionales ni de liga local. Franco Parzano, El Pollo y Manu pueden competir online tras dos eventos físicos por su especialización. La fatiga y la obsesión requieren descanso.
- **Fichajes** incluye reputación por local, descuentos e historial de negociaciones. Relación 50 o reputación 35 en el local de origen desbloquean oportunidades dirigidas. La aceptación todavía depende de la negociación. Los descuentos combinados tienen un tope del 40%.
- Las partidas previas conservan sus planteles y balances. Los mazos y el conocimiento se inicializan al cargarlas. Las carreras antiguas que ya tienen un plantel completo conservan su modalidad de intercambio.

## Plantel y enciclopedia

En **Plantel**, tocá el retrato para abrir la ficha y **Cambiar** para intercambiar posiciones. La Enciclopedia reúne los 40 duelistas con filtros. Las fichas públicas muestran información limitada. Entrenamientos, torneos, Dark Book y conversaciones aportan conocimiento sobre los integrantes contratados.

**Archivo y ajustes → Revisión editorial** abre el catálogo de trabajo. Cada ficha fuente vive en `profiles/01.json` a `profiles/40.json`. Para recompilar después de editar un archivo fuente, ejecutá `node build-profiles.mjs`. Los borradores editoriales del navegador se guardan separados de las partidas.

## Nuevo inicio y objetivo de temporada

Elegí **Nueva carrera**, conocé a Mili y seleccioná una de las ocho organizaciones. La dirección deportiva queda a tu cargo. Los fundadores o referentes siguen como duelistas. Mujica arranca con tres integrantes y Obelisk con dos. Todas las organizaciones reciben 100 CR.

Nico TCG, ID 37, es el fundador de Sekai. En Lair se conserva el registro Carlistos Bala como referente provisional mientras se confirma la correspondencia con Carlitos Vala.

El Continental de Equipos se disputa en la semana 52 en las nuevas carreras. El corte de beta es configurable en opening.js y se congela al inicio de esa semana. Clasifican hasta cuatro organizaciones del ranking con al menos tres integrantes. Los empates se ordenan por nombre. El cuadro se completa con equipos invitados del circuito. La clasificación se registra por separado del resultado final.

**Continuar** abre la partida guardada. Si confirmás una carrera nueva cuando ya existe una, la anterior se conserva como respaldo del mismo navegador y se puede recuperar desde el título. Las carreras anteriores mantienen sus planteles, créditos y calendario.

## Informe visual y mercado progresivo

El informe semanal separa el balance, los resultados propios, el rendimiento del plantel, el progreso del equipo y hasta tres titulares. En **Ver estadísticas completas** queda el detalle de ingresos, gastos e historial. **Acción semanal** también aparece en la navegación.

El primer fichaje usa el precio base; los siguientes aplican ×1,40, ×1,90, ×2,50 y ×3,20. Después sube ×0,35 por integrante hasta un tope de ×5. El límite es una operación por organización y semana. Un contrato indivisible de los Mujica usa un cupo, pero cada integrante ocupa un tramo de la escala. Los descuentos siguen sujetos al tope del 40%. La IA tiene su propio presupuesto y puede esperar a juntar fondos.

## Fichas compactas

Las ventajas y desventajas conocidas se despliegan dentro de la ficha. Los candados y pistas se renderizan sin valores ni explicaciones de las habilidades ocultas. La biografía, el mazo, las estadísticas y el historial quedan en secciones plegables. La revisión editorial sigue siendo una vista aparte del catálogo completo.

Haru comienza con Alan y un refuerzo gratuito elegido en el plantel inicial. Se puede elegir a cualquier otro duelista de menos de 4,5 estrellas, incluso si pertenece al plantel inicial de otro club. En ese caso se lo traslada sin duplicarlo. Esta elección inicial también permite elegir a un Mujica elegible por separado. Las operaciones posteriores mantienen el paquete indivisible. El refuerzo queda registrado como integrante inicial y no consume créditos ni cupo.

## GitHub Pages

Duel Circuit es un juego estático de HTML, CSS y JavaScript. Node.js se utiliza para las pruebas, la copia de producción y el servidor de desarrollo. No hay dependencias de npm, Vite, base de datos o servidor de aplicación en producción.

1. Creá el repositorio público `duel-circuit` en tu cuenta de GitHub. Si ya existe, usá ese repositorio y conservá su historial.
2. Copiá el contenido del paquete de publicación a la raíz del repositorio, incluida la carpeta `.github` y el archivo `.gitignore`. El `index.html` debe quedar en la raíz.
3. En GitHub abrí **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Subí los cambios a `main`. Si ya estaban subidos antes de activar Pages, ejecutá **Actions → Deploy Duel Circuit to GitHub Pages → Run workflow** en `main`.
5. Cuando termine el despliegue, usá **Settings → Pages → Visit site**. La URL estándar es `https://manuel-autogenerali.github.io/duel-circuit/`.

Para publicar una actualización, corré `npm test` y `npm run build` en la carpeta del proyecto y subí los cambios de código a `main`. GitHub Actions vuelve a correr las pruebas, crea `dist/` y publica únicamente ese artefacto. `dist/` se genera en cada ejecución y no se sube al repositorio.

Las partidas usan el almacenamiento del navegador. Se conservan al recargar y al actualizar el juego en la misma dirección. Para llevar una partida de la versión local al sitio publicado, exportala desde **Archivo y ajustes** en la versión local y usá **Importar partida** en el título de la versión pública. Guardá el JSON en tu dispositivo y mantenelo fuera del repositorio.
