# Changelog

Registro cronológico de cambios relevantes al proyecto. Complementa a `PROYECTO.md`
(que lleva el checklist de qué falta) — este archivo responde qué cambió y cuándo.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## 2026-09-15 — Raúl (Claude Sonnet 5) (3)

### Corregido — precios desactualizados de las versiones HEV del Corolla
LE HEV: $515,300 → **$524,400**. XLE HEV: $567,300 → **$576,400**. Precio
real vigente confirmado en toyota.mx y toyotaoaxaca.com.mx (mismo grupo).
Publicado en Sanity tras confirmación explícita.

### Hallazgo — publicar en Sanity NO actualiza el sitio en vivo al instante
Al publicar el cambio de arriba, el sitio en producción (Vercel) siguió
mostrando los precios viejos. Causa: `/modelos/[slug]` se pre-renderiza
como HTML estático en el build (confirmado con headers de producción:
`x-nextjs-prerender: 1`, `x-vercel-cache: HIT`, sin revalidación
configurada) — el contenido de Sanity solo se refleja en el siguiente
deploy. `AGENTS.md` decía lo contrario ("se ve al instante"); se corrigió
esa nota — era una suposición nunca antes puesta a prueba con una
publicación de solo-contenido (siempre coincidía con un push de código que
ya disparaba deploy). **Pendiente:** agregar revalidación automática
(ISR o webhook de Sanity → Vercel) para que publicar contenido puro
vuelva a reflejarse sin necesitar un push adicional — ver `PROYECTO.md`.

## 2026-09-15 — Raúl (Claude Sonnet 5) (2)

### Cambiado — página de modelo genérica: `/modelos/corolla` → `/modelos/[slug]`
Primer paso para replicar la página rica del Corolla a los demás modelos.
La plantilla completa (hero, intro, highlights, versiones, exterior/colores
360°, destacado, seguridad, galería, rendimiento, CTAs) se movió de
`app/modelos/corolla/page.tsx` (hardcodeada) a `app/modelos/[slug]/page.tsx`
(genérica, ya existía como plantilla simple de respaldo — se reemplazó por
completo). La consulta `getModeloBySlug` de `lib/sanity/queries.ts` ya traía
todos los campos necesarios sin cambios; solo hacía falta parametrizar la
página. `/modelos/corolla` sigue funcionando exactamente igual (ahora vía
`[slug]`, verificado con `next build`: se pre-renderiza como página estática
gracias a `generateStaticParams`).

- **Componentes renombrados:** `components/corolla/` → `components/modelo/`
  (`VersionesCarousel`, `ExteriorColores`, `Galeria`) — ya no eran
  específicos del Corolla, el nombre de carpeta era engañoso.
- **"Modelos similares" ahora es dinámico**, no una lista fija de 3 modelos
  hardcodeados en `lib/data/corolla.ts` (archivo eliminado, ya estaba
  obsoleto salvo por ese uso). Nueva función `getModelosSimilares(slug)` en
  `lib/sanity/queries.ts` trae hasta 3 modelos de Sanity distintos al
  actual; la sección se oculta sola si no hay otros modelos cargados
  todavía (como ahora, que solo existe el Corolla).
- Verificado: build de producción limpio, `/modelos/corolla` renderiza
  idéntico a antes, `/modelos/algo-inexistente` da 404 correctamente.

## 2026-09-15 — Raúl (Claude Sonnet 5)

### Añadido — botones "Cotízalo" / "Manéjalo" en la tarjeta de versión (Corolla)
Se agregaron los dos botones a `VersionCard` en
`components/corolla/VersionesCarousel.tsx` (aplica tanto a la vista desktop
como mobile, comparten el mismo componente): "Cotízalo" como botón primario
(relleno rojo) arriba, "Manéjalo" como botón secundario (contorno negro)
debajo — Propuesta A de las 3 variantes comparadas en una página de prueba
local (`app/preview-versiones/`, ya borrada, nunca subida a git).

**Ninguno de los dos botones tiene destino todavía** (`href="#"`) — las
páginas y formularios de Cotización y Prueba de Manejo por versión no están
definidos (ver Obsidian: `formularios-cotizacion-y-prueba-de-manejo.md`).
Se conecta el enlace real cuando se construyan esos formularios.

Se documentó el patrón primario/secundario como parte formal del sistema de
diseño — ver `SISTEMA-DE-DISENO.md` §5 (Botones), nuevo.

## 2026-09-11 — Beto (Claude Sonnet 5)

### Añadido — resumen cualitativo de material de "Seguros de Contado" (DTMAC)
DTMAC (comercializadora) compartió una presentación de 24 páginas comparando
coberturas entre tres aseguradoras (Qualitas, GNP, HDI), pensada para nueva
sección "Seguros" del sitio. Se revisó el PDF completo y se documentó en
`RESUMEN-SEGUROS-DTMAC.md` qué contenido sirve para una página pública (tipos
de paquete, coberturas en lenguaje simple, el diferenciador "Toyota Siempre
Contigo", promociones de meses sin intereses) y qué no (tablas de deducibles
por aseguradora, montos en UMAs, ejemplos de precios de modelos específicos,
reglas operativas de financiamiento/tipos de carga) — ese material es para
capacitación de asesores, no para publicarse tal cual. Incluye propuesta de
estructura de 5 bloques para la sección.

Nota de sincronización: al hacer `git push` se encontró que `origin/main` había
avanzado con la sesión de trabajo de Raúl del 21-22 de agosto (migración del
Corolla a Sanity, `SISTEMA-DE-DISENO.md`, robots.txt, UX mobile, reorganización
de `PROYECTO.md`/`RESUMEN-TECNICO.md`). Se hizo `git merge origin/main` sin
conflictos antes de subir — el nuevo documento no toca ningún archivo que Raúl
haya modificado.

## 2026-08-22 — Raúl (21)

### Cambiado — revisión de UX mobile: visor 360°, colores, versiones y CTAs
Sesión de revisión visual completa en mobile de la página de modelo,
aplicada primero solo en local y publicada tras confirmación. Cambios,
todos en `app/modelos/corolla/page.tsx`, `components/corolla/ExteriorColores.tsx`
y `components/corolla/VersionesCarousel.tsx` salvo donde se indique:

- **Visor 360° (mobile):** se quitaron los dos botones de flecha que
  flanqueaban el texto "Arrastra para girar" — eran confusos (parecía que
  había que arrastrar los botones) y redundantes, ya que el visor
  siempre funcionó arrastrando la imagen directamente. Ahora solo queda
  el texto, más visible, como "Desliza para girar".
- **Colores disponibles (mobile):** el degradado que insinuaba "hay más
  a la derecha" no comunicaba bien y quedó descartado antes (ver entrada
  anterior); se reemplazó por una barra de progreso tipo scrollbar
  (posición + ancho proporcional al contenido visible).
- **Scrollbar nativo oculto** (`app/globals.css`, clase `.no-scrollbar`):
  el navegador mostraba su propio scrollbar al deslizar, superpuesto a
  la barra de progreso propia — se ocultó en los carruseles de colores y
  de versiones (mobile) ya que ambos tienen su propio indicador.
- **Texto y botón de "ficha técnica" (sección Versiones):** el párrafo
  legal ("Precios y especificaciones...") no estaba centrado como el
  bloque de abajo — se centró. El texto "Para ver más detalles..." se
  acortó a "Para más detalles...". El botón pasó de "Descargar ficha
  técnica (PDF)" a "Descargar Ficha Técnica".
- **Botones "Solicitar Cotización" (CTA intermedio y CTA final,
  únicamente en la página del Corolla — no se tocaron las apariciones en
  `/contacto`, la plantilla genérica de modelo, ni el botón del
  formulario, que siguen pendientes de revisión):** se corrigió a
  "Solicitar Cotización" (mayúscula en Cotización) y se quitó el ancho
  forzado al 100% en mobile (`max-desktop:w-full`) — en pantallas
  angostas el botón llegaba casi de borde a borde y no se leía como
  botón. El CTA intermedio también se centró en mobile (antes quedaba
  alineado a la izquierda, inconsistente con el CTA final que sí estaba
  centrado).

## 2026-08-22 — Raúl (20)

### Quitado — degradado blanco en versiones mobile
Raúl notó que el degradado que insinuaba "hay más hacia la derecha" ya no
hacía falta con las flechas explícitas, y además se extendía hacia abajo
tapando levemente las flechas (estaba posicionado respecto al contenedor
completo, no solo la tira de tarjetas). Se quitó el degradado y el estado
`mobileAtEnd` que solo servía para eso.

## 2026-08-22 — Raúl (19)

### Cambiado — flechas de versiones simétricas (izquierda también roja)
Raúl notó que la flecha izquierda del carrusel de versiones nunca se ponía
roja al estar disponible (solo blanca con borde), a diferencia de la
derecha — inconsistencia heredada del diseño original de escritorio, que
se replicó igual en las flechas nuevas de mobile. Ahora ambas flechas
(escritorio y mobile) usan la misma lógica de 2 estados: rojo cuando hay
hacia dónde moverse, gris cuando no.

## 2026-08-22 — Raúl (18)

### Cambiado — flechas de navegación en el carrusel de versiones (mobile)
Raúl pidió reemplazar los puntos de paginación del carrusel de versiones
en mobile por una barra de progreso + flechas abajo a la derecha (ejemplo
de Toyota.mx), para que quede más claro que se puede navegar. Mismo
estilo (gris deshabilitado / rojo activo) que ya usan las flechas de
escritorio. Verificado el estado (barra al 16.7% al inicio, 100% al
final, flechas deshabilitándose en cada extremo); el desplazamiento
animado en sí no se pudo probar visualmente en la herramienta de
navegador de esta sesión (no ejecuta `scrollTo` con `behavior:'smooth'`
en este entorno), pero es una limitación de la herramienta de prueba, no
del código — confirmado forzando `behavior:'auto'` en el mismo elemento.

## 2026-08-22 — Raúl (17)

### Corregido — tarjetas de versión desalineadas en mobile
Raúl reportó que las tarjetas de versión no quedaban alineadas en mobile
(bordes terminando a distinta altura). Causa: cada tarjeta va dentro de un
contenedor que sí se estira parejo por el flex del carrusel (`align-items:
stretch` por default), pero la tarjeta interna (`VersionCard`) no tenía
`h-full` para llenar ese contenedor — se quedaba con su altura natural,
distinta según cuántas características tenga cada versión. Es el mismo
patrón que ya se había corregido en escritorio, pero al revés: ahí sobraba
`h-full` (rompía el stretch), en mobile faltaba. Se agregó `h-full`
condicional solo para la variante mobile de la tarjeta.

## 2026-08-22 — Raúl (16)

### Ajustado — tamaño y nitidez del visor 360°
Tras el cambio anterior (visor sin tope de ancho), Raúl reportó dos cosas:
el auto quedó demasiado pegado a los botones de flecha, y se ve borrosa en
escritorio. Se restauró un tope de ancho, ahora en `540px` (~15% más chico
que el ancho sin tope, ~14% en la práctica: 630px→540px) — deja espacio
otra vez entre el auto y los botones. Sobre el borroneo: se encontró que el
código pedía las imágenes redimensionadas a Sanity a 950px de ancho — con
el visor agrandado a 630px en pantallas retina/2x, hacían falta ~1260px
reales, muy por encima de lo que se pedía. Los archivos fuente del visor
360° están subidos a 1200×800px (spec documentada, no un error de carga),
así que se ajustó la petición a 1200px — el techo real de nitidez
disponible con los archivos actuales. Pedir más que eso (se probó 1400px)
no ayuda: Sanity solo interpola/estira la imagen, no agrega detalle real.
Documentado en la guía de imágenes en Obsidian.

## 2026-08-22 — Raúl (15)

### Cambiado — visor 360° más grande
El auto en el visor 360° (`ExteriorColores.tsx`) tenía un tope de
`max-width: 520px` aunque el contenedor disponible medía 710px en
desktop, dejando ~190px de espacio blanco sin usar a cada lado. Se quitó
el tope — ahora el auto usa todo el ancho disponible (710px menos el
padding existente), ~21% más grande, similar a la referencia de
Toyota.mx que compartió Raúl. Sin cambios en mobile (el tope nunca
aplicaba ahí, la pantalla ya es más angosta que 520px).

## 2026-08-22 — Raúl (14)

### Agregado — robots.txt de bloqueo temporal
Motivo: a diferencia de WP Local, el sitio vive en una URL pública
(`toyotacuautitlan.vercel.app`) mientras se desarrolla — nada impedía que
Google la indexara por accidente antes del lanzamiento real con el dominio
de la agencia. Se agregó `app/robots.ts` con `Disallow: /` para bloquear
toda indexación mientras tanto. **Pendiente crítico antes del lanzamiento:**
quitar ese bloqueo — ver `PROYECTO.md`, sección "Antes del lanzamiento".
Sitemap.xml, Schema.org y Open Graph se dejaron pendientes a propósito
hasta que el dominio final esté conectado (no tiene caso construirlos dos
veces).

## 2026-08-22 — Raúl (13)

### Corregido — auditoría de documentación (2da del día)
Segunda auditoría de "¿quedó algo desactualizado?" en el mismo día, tras los
cambios de la tarde (jerarquía de encabezados, secciones condicionales,
textos SEO, regla de publicación en Sanity). Se encontraron y corrigieron:
`PROYECTO.md` sin reflejar ninguno de esos cambios; `AGENTS.md` sin la regla
de confirmación antes de publicar en Sanity (acordada en esta sesión — sin
esto, solo yo la recordaba, no quedaba disponible para la sesión de Beto);
`SISTEMA-DE-DISENO.md` §4 todavía listaba "Tecnología" como sección `h2`,
contradiciendo el renombre a "Destacado" del mismo día; y en Obsidian, la
guía de imágenes por modelo con un título desactualizado y la guía de
estructura de secciones sin los 3 campos de texto SEO nuevos.

## 2026-08-22 — Raúl (12)

### Agregado — textos breves en Versiones, Exterior y Galería (SEO)
A raíz de revisar qué tan delgado es el texto real de la página de modelo
para SEO, se agregaron 3 campos nuevos al schema (`versionesTexto`,
`exteriorTexto`, `galeriaTexto` — `text`, máx. 160 caracteres, mismo patrón
que `seguridadTexto`) y se renderiza cada uno como un párrafo corto debajo
del título de su sección respectiva, solo si está cargado. Contenido real
del Corolla ya cargado y publicado en Sanity (~100 caracteres cada uno).
Es un primer paso, no resuelve el tema de contenido delgado por completo —
seguirá evaluándose más adelante.

## 2026-08-22 — Raúl (11)

### Cambiado — secciones condicionales por datos + sección "destacado" genérica
Motivo: cuando sale un modelo nuevo, a veces Toyota solo comparte parte de la
información y de todas formas hay que publicarlo. Antes, cualquier campo vacío
caía en un `FALLBACK` con texto/imágenes reales del Corolla — en otro modelo
eso mostraría contenido equivocado en vez de ocultar la sección. Se quitó el
`FALLBACK` por completo: cada sección de `/modelos/corolla` ahora se muestra
solo si su dato obligatorio ya está cargado en Sanity (intro, highlights,
versiones, exterior, destacado, seguridad, galería, rendimiento) — aparece
sola en cuanto se llena el campo, sin tocar código. También se corrigió que
el precio y las imágenes del Hero/destacado/rendimiento ya no caían en un
valor o imagen fija del Corolla cuando faltaban.

Aparte, se renombró la sección `id="tecnologia"` a `id="destacado"` (y el
comentario del código) para que quede claro que es un destacado genérico —
en Corolla es Toyota Safety Sense, pero en otro modelo podría ser cualquier
otro tema. El schema de Sanity ya usaba el nombre genérico (`destacadoTitulo`,
etc.); solo el `id` de la sección se había quedado con el nombre específico.

## 2026-08-22 — Raúl (10)

### Corregido — jerarquía de encabezados (h1–h3)
Auditoría completa de todos los `h1`/`h2`/`h3` del sitio. Se encontraron dos
saltos de nivel: el catálogo (`/modelos`) pasaba de `h1` directo a `h3` en las
tarjetas (`components/ui/ModeloCard.tsx`) — corregido a `h2`, igual que ya
hacían las tarjetas de Promociones. Los títulos de columna del Footer
(`components/layout/Footer.tsx`) usaban `h3` sin ningún `h2` de por medio en
ninguna página — corregido a `<p>`, ya que son labels visuales dentro del
landmark `<footer>`, no secciones del documento. Se documentó la regla
completa (qué va en `h1`/`h2`/`h3`) en `SISTEMA-DE-DISENO.md` §4, con espejo
en Obsidian, para que se siga igual al construir los 19 modelos restantes.

## 2026-08-22 — Raúl (9)

### Agregado — regla en AGENTS.md
Se agregó a `AGENTS.md` la instrucción de consultar `SISTEMA-DE-DISENO.md` antes
de cualquier decisión de diseño (ancho, breakpoints, colores, tipografía, jerarquía
de encabezados) o al crear un componente/sección nueva — para que quede como base
de las decisiones automáticamente, sin tener que pedirlo cada vez.

## 2026-08-22 — Raúl (8)

### Cambiado — reorganización de documentación
A raíz de la auditoría anterior, se replanteó por qué `RESUMEN-TECNICO.md` se
desactualiza tan seguido: mezclaba referencia estable (qué es cada plataforma,
cómo se relacionan) con estado que cambia todo el tiempo (qué está resuelto,
accesos confirmados, próximos pasos) — y ese segundo tipo de contenido requiere
edición manual constante, a diferencia de `CHANGELOG.md` (solo se agrega, nunca
se edita lo viejo) que por eso mismo nunca se desactualizó.

- `RESUMEN-TECNICO.md` (221 → 187 líneas): se quitó todo el contenido de estado
  vivo — la narrativa "Resuelto (fecha)" de cada sección ahora es una sola
  frase con pointer a `CHANGELOG.md`; la tabla de "Estado de accesos de Raúl"
  se quitó completa (ya vive en `PROYECTO.md` → Equipo); la sección 8 que
  repetía casi palabra por palabra el flujo de trabajo de `AGENTS.md` ahora
  solo lo referencia; se quitó la sección 10 completa ("Próximos pasos, en
  orden"), que a esta altura contradecía al resto del propio documento.
  También se corrigió "Rama principal: única rama en uso" — ya no es cierto,
  se crean ramas por tarea rutinariamente (se fusionan y no quedan activas).
- `PROYECTO.md`: absorbió el detalle operativo que sí vale la pena conservar
  (PAT de GitHub en el llavero de macOS, confirmación de 2 miembros en Sanity
  vía MCP) en la sección Equipo. También se aclaró que `/modelos/[slug]` es
  la plantilla de respaldo genérica, no equivalente a la página rica del
  Corolla — antes ambas aparecían igual de "completadas" en el checklist.

## 2026-08-22 — Raúl (7)

### Corregido — auditoría de documentación
A petición explícita, se auditó honestamente si `PROYECTO.md` y `RESUMEN-TECNICO.md`
seguían al día. `RESUMEN-TECNICO.md` tenía información arquitectónica falsa:
- Sección 4 (Imágenes) seguía describiendo las imágenes del Corolla como si vivieran
  en `public/images/` del repo, con una recomendación "a evaluar" de moverlas a
  Sanity — eso se resolvió el 21 de agosto, nunca se actualizó esta sección.
- Sección 5 (Base de datos) seguía diciendo que los datos del Corolla "no están en
  Sanity todavía" — también resuelto desde el 21 de agosto.
- Sección 10 tenía una lista de "próximos pasos" desactualizada que contradecía el
  resto del propio documento (pasos ya completados listados como pendientes).
- `PROYECTO.md` decía "Next.js 14" (el proyecto corre en Next.js 16).

Se corrigieron ambos documentos. También se actualizaron `CLAUDE.md` (local, no
versionado) y su espejo en Obsidian, y la memoria de sesión de Claude Code — tenían
el mismo tipo de drift (el visor 360° seguía mencionado en 700px en vez de 950px,
y la barra de destacados todavía se describía con emoji en vez del set de íconos
de marca).

## 2026-08-22 — Raúl (6)

### Cambiado
- Fuente de marca (ToyotaType) conectada a nivel sitio: se movió su carga de
  `app/modelos/corolla/page.tsx` a un módulo compartido (`app/fonts.ts`) y se
  aplica ahora en `app/layout.tsx` (clase en el `<body>`) — antes solo la
  página del Corolla la usaba y el resto del sitio caía en Arial/Helvetica
  del navegador.
- Se corrigieron 44 usos de `font-medium`/`font-bold` en el resto del sitio
  (home, Navbar, Footer, contacto, cotización, cita de servicio, catálogo de
  modelos, formularios) — pesos que no existen como archivo real en
  ToyotaType (solo tiene 400/600/900), así que antes de conectar la fuente a
  todo el sitio se cambiaron a `font-semibold` (600), el mismo criterio ya
  aplicado en el Corolla.
- `app/globals.css`: quitado el `font-family: Arial, Helvetica, sans-serif`
  del `body` — ya no hace falta, ToyotaType cubre todo el sitio con su propio
  fallback generado por Next.js.
- `SISTEMA-DE-DISENO.md` actualizado: el pendiente de "fuente solo en
  Corolla" queda resuelto.

## 2026-08-22 — Raúl (5)

### Agregado
- `SISTEMA-DE-DISENO.md` (raíz del repo, con copia espejo en Obsidian): documento
  de referencia técnica con ancho de página/breakpoints, colores y tipografía —
  pensado para que cualquier página nueva (otros modelos, home, servicios) parta
  de la misma base. Documenta también lo que falta: Header/Footer genéricos aún
  sin cerrar, y que la fuente de marca (ToyotaType) hoy solo aplica en la página
  del Corolla, no en el resto del sitio.

### Corregido — cerrar la base antes de replicar
Antes de seguir construyendo más modelos, se revisó si la base de diseño (no
solo el contenido) era consistente en todo el sitio:
- **Ancho de página**: la página del Corolla usaba `max-w-[1200px]`, mientras
  que el Navbar, el Footer y el resto del sitio usan `max-w-7xl` (1280px) —
  quedaban 80px de desalineado lateral. Se ajustó el Corolla a 1280px.
- **Breakpoint móvil**: el valor `880px` estaba repetido a mano como clase
  arbitraria (`max-[880px]:`/`min-[881px]:`) en 4 archivos. Se convirtió en una
  variable nombrada (`--breakpoint-desktop` en `app/globals.css`), habilitando
  las utilidades `desktop:`/`max-desktop:` — mismo comportamiento visual, ya
  no es un número mágico repetido.
- **Colores**: existían tokens de color ya definidos (`--toyota-red`, etc.)
  pero el código seguía repitiendo el hex a mano. Se reemplazaron todos los usos
  dentro de la página del Corolla y sus componentes (clases Tailwind, objetos
  `style={{}}` y atributos SVG vía `var(--token)`). Se agregó un token nuevo
  (`--toyota-red-dark`, #C5091A) para el tono hover del rojo de marca, que no
  tenía variable.
- **Tipografía**: se encontraron 2 usos de `font-medium` (peso 500) dentro del
  Corolla, peso que no existe como archivo real en la fuente ToyotaType (solo
  tiene 400/600/900 cargados) — el navegador lo aproximaba. Cambiados a
  `font-semibold` (600, el peso real más cercano).

## 2026-08-22 — Raúl (4)

### Quitado
- Campo `galeria` del schema `modelo` — era un campo genérico sin categorizar que no tenía
  relación con `galeriaExteriorDetalle`/`galeriaInteriorDetalle` (las que sí usa la página
  del Corolla). Solo lo consumía `app/modelos/[slug]/page.tsx`, la plantilla de respaldo
  genérica para modelos sin página dedicada — nunca se le cargó contenido porque el Corolla
  usa su propia página. Se quitó del schema, de la consulta GROQ, de esa plantilla genérica
  y del tipo `Modelo` para no dejarlo como campo huérfano al replicar a otros modelos.
- De paso se corrigió el tipo `categoria` en `types/index.ts`, que seguía con el enum viejo
  (sedan/suv/pickup/hatchback/hibrido/van/comercial) en vez de las 5 categorías reales del
  negocio ya aplicadas en el schema.

## 2026-08-22 — Raúl (3)

### Corregido
- Bug en el carrusel de versiones (`VersionesCarousel.tsx`): la última tarjeta perdía el
  borde derecho porque el desplazamiento del carrusel se calculaba por porcentaje
  (asumiendo un ancho de tarjeta que no coincidía exactamente con el CSS real), acumulando
  un desfase de unos pixeles. Se cambió a medir la distancia real entre tarjetas ya
  renderizadas y desplazar por esa cantidad exacta en px — elimina el desfase de raíz.
- Altura despareja entre tarjetas de versión: tenían `height: 100%` sin que el contenedor
  padre tuviera una altura definida, lo que rompía el `align-items: stretch` automático de
  Flexbox. Se quitó esa clase y ahora las tarjetas igualan su altura a la más alta,
  como debe ser por defecto.

### Agregado — auditoría de contenido antes de replicar a otros modelos
Antes de replicar el patrón del Corolla a los 19 modelos restantes, se hizo una revisión
completa de qué contenido de la página está realmente conectado a Sanity vs. hardcodeado
en el código (ver detalle de la conversación). Se encontró que buena parte de las secciones
—incluyendo campos que ya existían en el schema pero nunca se leían en el código
(`descripcion`, `caracteristicas`)— estaban fijas en `page.tsx`, lo cual habría heredado
los mismos huecos multiplicado por cada modelo nuevo.

- **Schema (`sanity/schemaTypes/modeloType.ts`):**
  - Nuevo campo `anio` (número) — reemplaza el texto fijo "Versiones 2026"; ahora "Versiones
    {año}" se lee de Sanity, así que en 2027 solo hay que editar el campo, no el código.
  - `categoria` actualizado a las 5 categorías reales del negocio (Sedanes & Hatchbacks,
    Suv's & Minivans, Pickup's & Comerciales, Toyota Gazoo Racing, Híbridos Eléctricos
    (HEV y PHEV)) — antes tenía un enum genérico (sedán/SUV/pickup/hatchback/híbrido) que no
    coincidía con las categorías reales del catálogo.
  - Nuevos campos de contenido por sección (grupo "Textos de sección" en el Studio):
    `heroSubtitulo`, `exteriorTitulo`, `destacadoEyebrow`/`destacadoTitulo`/`destacadoTexto`,
    `seguridadTitulo`/`seguridadTexto`/`seguridadItems`, `galeriaTitulo`,
    `rendimientoEyebrow`/`rendimientoTitulo`/`rendimientoTexto`/`rendimientoFilas`.
  - Campos `descripcion` (intro) y `caracteristicas` (barra de datos destacados debajo del
    Hero) ya existían pero nunca se consumían en el código — ahora sí.
- **`app/modelos/corolla/page.tsx`:**
  - Todas las secciones anteriores ahora leen de Sanity con un valor de respaldo (constante
    `FALLBACK`) que replica el contenido actual del Corolla, para que la página nunca se vea
    vacía si un campo aún no se llenó en Sanity.
  - `descripcion` se renderiza con `@portabletext/react` (nueva dependencia) en vez de texto
    fijo.
  - Barra de datos destacados (Motor/Pasajeros/Tracción/Tecnología): pasó de 4 tarjetas fijas
    con SVGs a un array dinámico con emoji como ícono — permite que cada modelo tenga datos
    distintos (ej. una pick-up podría mostrar "Capacidad de carga" en vez de "Pasajeros").
  - `<title>`/`<meta description>` (SEO) ahora usan `generateMetadata` leyendo
    `seoTitulo`/`seoDescripcion` de Sanity en vez de estar fijos.
  - Bugs puntuales corregidos: el `<h1>` decía "COROLLA" fijo en vez de usar `nombreModelo`;
    el `alt` de la imagen de Tecnología no estaba parametrizado; los links de cotización
    tenían `?modelo=corolla` fijo en dos lugares en vez de usar `slug.current`; el CTA final
    decía "tu Corolla" fijo en vez de interpolar el nombre real del modelo.
  - `components/ui/ModeloCard.tsx` y `app/modelos/page.tsx`: se quitó un mapeo de categorías
    con el enum viejo (ya no aplicaba con las 5 categorías reales) y se actualizó el filtro
    del catálogo a las categorías correctas.
- **Contenido:** se cargó y publicó en Sanity todo el contenido real del Corolla para los
  campos nuevos, para que la página deje de depender de los valores de respaldo en código.
- **Pendiente (deferido a propósito):** la sección "Modelos similares" sigue usando datos
  fijos de `lib/data/corolla.ts` con modelos que aún no existen como páginas reales — se
  deja así hasta que haya más de un modelo publicado en Sanity, momento en el que debe
  convertirse en una consulta real (excluyendo el modelo actual).

## 2026-08-22 — Raúl (2)

### Agregado
- Indicador de scroll horizontal en móvil, en la página del Corolla — al revisar el sitio en
  móvil se detectó que tanto el carrusel de "Versiones" como el listado de "Colores
  disponibles" requieren deslizar a la derecha sin ninguna señal visual de que hay más
  contenido:
  - `components/corolla/VersionesCarousel.tsx`: agregado fade (degradado blanco) en el borde
    derecho del carrusel móvil, que desaparece al llegar a la última tarjeta, más una fila de
    dots debajo (igual que ya tenía la versión de escritorio) sincronizada con la posición real
    del scroll — cada dot es clickeable para saltar a esa versión.
  - `components/corolla/ExteriorColores.tsx`: mismo fade en el borde derecho del listado de
    colores, con la misma lógica de ocultarse al llegar al último color.
  - Verificado en el navegador en viewport móvil (375px): el fade y los dots responden
    correctamente al hacer scroll.

## 2026-08-22 — Raúl

### Corregido
- `imagenPrincipal` del Corolla en Sanity: era un JPG de prueba casi cuadrado (1179×1193px)
  cargado directo en el Studio, que se recortaba mal en la tarjeta del catálogo (`ModeloCard.tsx`
  usa `aspect-[16/9]` con `object-cover`). Se generó una versión correcta en WebP 1200×675 (16:9),
  luego reemplazada por una segunda versión con mejor encuadre hecha por Raúl.
- `components/ui/ModeloCard.tsx`: faltaba la propiedad `sizes` en el `<Image>` — pedía la
  imagen a ancho completo de pantalla aunque la tarjeta ocupa solo un tercio en escritorio.
  Agregado `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`.

### Cambiado
- Visor 360° (`app/modelos/corolla/page.tsx`): ancho de imagen solicitado a Sanity subido de
  700px a 950px — 700 dejaba sin margen a pantallas de alta densidad (iPhone Pro y similares,
  DPR 3x), donde el visor puede necesitar hasta ~1050-1170px físicos para verse nítido.
- `alt`/`aria-label` de imágenes en la página del Corolla (`HeroPicture`, `VersionesCarousel`,
  `ExteriorColores`, `Galeria`, imagen de rendimiento): tenían el texto "Corolla" fijo en el
  código. Se parametrizaron para recibir `nombreModelo` (derivado de `modelo.nombre` en Sanity)
  por props, para que al replicar el patrón a otro modelo no digan "Corolla" por error.

### Documentado
- Guía de imágenes por modelo (en Obsidian, `01 Proyectos/Sitio Web Cuautitlan/guia-imagenes-por-modelo.md`,
  no como archivo local a propósito): agregada convención de nombres de archivo
  (`[modelo]-[categoría].webp`) y aclaración de que el nombre de archivo NO afecta el SEO en
  este sitio (Sanity asigna URLs con hash, el `alt` en código es lo que sí importa para SEO).
  Carpeta local `uploads/` renombrada a `Imagenes Ejemplo Modelo/`, actualizada con las
  imágenes en su formato/resolución final (no las originales sin optimizar).

## 2026-08-21 — Raúl (3)

### Agregado
- Schema de Sanity (`modelo`): nueva pestaña "Detalle de página" con `heroDesktop`,
  `heroMobile`, `versiones` (nombre, precio, características, imagen — fusionado en un
  solo array), `coloresExterior` (label, hex, borde, imágenes del giro), `imagenDestacado`,
  `galeriaExteriorDetalle`, `galeriaInteriorDetalle`, `imagenRendimiento`.
- `lib/sanity/image.ts`: helper `sanityImgWidth()` para pedir a la CDN de Sanity una
  imagen ya redimensionada en vez de servir el asset original completo.

### Migrado
- Página del Corolla (`/modelos/corolla`) migrada de datos fijos en código
  (`lib/data/corolla.ts`) a Sanity: versiones, hero, visor 360° (7 colores × 16 ángulos),
  imagen del destacado (Toyota Safety Sense), galerías exterior/interior, e imagen de
  rendimiento. Documento del Corolla en Sanity cargado con las 138 imágenes originales
  subidas como assets y publicado.
- `lib/sanity/queries.ts` (`getModeloBySlug`): extendida para traer todos los campos
  nuevos del modelo.
- `components/corolla/VersionesCarousel.tsx`, `ExteriorColores.tsx`, `Galeria.tsx`:
  ya no importan datos fijos — reciben todo por props desde la página (Server Component
  async que consulta Sanity). El conteo de versiones/ángulos ahora es dinámico en vez de
  asumir siempre 6 versiones o 16 ángulos fijos.
- Galería sin descripción por imagen (antes tenía labels tipo "Vista ¾ frontal" que no
  se necesitaban) — alt text genérico por posición en su lugar.

### Optimizado
- Galería exterior/interior (12 imágenes): convertidas de JPEG (180–450 KB, 2048px de
  ancho) a WebP (58–152 KB, redimensionadas a 1400px) antes de subir a Sanity.
- Visor 360°: las imágenes se piden a Sanity ya redimensionadas (`sanityImgWidth`) en vez
  de servir el asset original de 1200px para un visor que se muestra como máximo a 520px —
  reduce el peso de las 16 imágenes por color. (Ancho ajustado de 700 a 950px el 22 de
  agosto — ver entrada de esa fecha.)

## 2026-08-21 — Raúl (2)

### Documentado
- Acuerdo de flujo de trabajo entre Raúl y Beto: rama por tarea + `git pull` antes de
  empezar + registro en `CHANGELOG.md`, sin Pull Request con aprobación humana obligatoria
  (se descartó a propósito — ninguno de los dos tiene el conocimiento técnico para revisar
  código del otro). Agregado a `AGENTS.md` (para que cualquier sesión de Claude Code lo
  aplique automáticamente), y actualizado en `RESUMEN-TECNICO.md` y `PROYECTO.md` para
  reemplazar la versión anterior de Beto que sí mencionaba Pull Request con revisión cruzada.

## 2026-08-21 — Raúl

### Corregido
- `next.config.ts`: las imágenes de Sanity (`cdn.sanity.io`) fallaban al cargar en
  `next/image` porque el hostname no estaba permitido (`Invalid src prop ... hostname
  "cdn.sanity.io" is not configured`). Afectaba las tarjetas de modelos en `/modelos`.
  Se agregó `cdn.sanity.io` a `images.remotePatterns`. Verificado: la imagen ahora
  responde `200 OK` vía `/_next/image`.

### Agregado
- Repo clonado y entorno local confirmado funcional (`npm install`, `.env.local`,
  `npm run dev` — homepage y `/modelos/corolla` cargan sin errores).
