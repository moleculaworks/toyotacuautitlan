# Changelog

Registro cronológico de cambios relevantes al proyecto. Complementa a `PROYECTO.md`
(que lleva el checklist de qué falta) — este archivo responde qué cambió y cuándo.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## 2026-09-20 — Raúl (Claude Sonnet 5) (39)

### Cambiado — bloque de 4 iconos destacados (debajo del Hero)
Raúl cuestionó si "Pasajeros" (dato genérico, igual en casi todo el
catálogo) merecía uno de los 4 iconos principales en modelos donde no es
distintivo:
- **RAV4 HEV**: se quitaron "Pasajeros · 5" y "Capacidad de carga · 504
  kg" (única unidad en KG del catálogo, sin base de comparación) a favor
  de "Tracción · FWD / AWD" (primera SUV del catálogo con AWD disponible,
  en Woodland y Limited) y "Rendimiento · Hasta 27.70 KM/L". También se
  quitó "Bolsas de aire · 8" a favor de "Tecnología · Toyota Safety Sense
  4.0" (primer modelo del catálogo con TSS 4.0/RSA).
- **Yaris Sedán HEV**: se quitó "Pasajeros · 5" a favor de "Rendimiento ·
  29.4 KM/L" — dato ya presente en la tabla de rendimiento del modelo,
  consistente con Corolla HEV y RAV4 HEV, que ya usan Rendimiento como
  uno de sus 4 iconos. Único modelo 100% híbrido del catálogo que no lo
  tenía todavía en ese bloque.

## 2026-09-20 — Raúl (Claude Sonnet 5) (38)

### Corregido — 2 ajustes menores
- **Avanza XLE CVT**: typo "Rines de aluminio de 16x6"" → "Rines de
  aluminio de 16"" (la ficha no trae el "x6", era un error de captura).
- **RAV4 HEV** — primer caso real aplicado de la regla de texto breve
  (ver README.md): "Potencia total del sistema híbrido de [226/236] HP"
  → "Potencia total del sistema · [226/236] HP" en LE HEV, Woodland HEV
  y Limited HEV — la ficha técnica nombra esa fila solo "Potencia total
  del sistema" (sin "híbrido"), así que acortar usa el nombre real de
  Toyota, no parafraseo propio.

## 2026-09-20 — Raúl (Claude Sonnet 5) (37)

### Corregido — segunda pasada de "equipo heredado" en todo el catálogo
A partir de la lección de Yaris Hatchback (entrada 36), se revisó el
equipo completo (Exterior/Interior/Seguridad) de cada versión contra lo
anunciado en versiones más baratas del mismo carrusel, en los 9
carruseles del catálogo:
- **Yaris Hatchback S CVT**: 2 ítems más heredados de S MT sin repetirse
  en su propio resumen — "Asiento para conductor tipo cubo con ajuste
  manual de 6 direcciones" y "Conectores traseros USB tipo C (2)".
- **Corolla/Corolla HEV — XLE CVT y XLE HEV**: ambas heredan "Faros con
  encendido y apagado automático" de LE, sin repetirlo en su propio
  resumen — agregado a las 6 tarjetas correspondientes (gasolina + HEV).
- **Avanza XLE CVT**: le faltaba "Pantalla multiinformación (MID) 4.2\""
  — confirmado que LE MT no la trae en su Interior, es una mejora real
  de XLE no mencionada antes.
- **Sin hallazgos adicionales** en Corolla Cross/Corolla Cross HEV, RAV4
  HEV, Raize, Camry HEV, Prius, Yaris Sedán/Yaris Sedán HEV — revisados
  a fondo, las diferencias entre sus tarjetas ya reflejan distinciones
  reales de equipo entre versiones, no heredos sin anunciar.

## 2026-09-20 — Raúl (Claude Sonnet 5) (36)

### Corregido — refinamiento del criterio de `versiones[].caracteristicas`
Dos ajustes al criterio nuevo (entrada 35), documentados en
`JSON Modelos/README.md`:

1. **"Características Generales" puede omitir equipo real que sí está
   instalado.** Raúl encontró que Yaris Hatchback S CVT también trae
   "Faros de niebla LED" (confirmado en la sección Exterior completa de
   esa misma versión en toyota.mx) — no aparecía en su resumen de
   "Características Generales" porque ya se había introducido en S MT y
   Toyota no lo vuelve a destacar como novedad en el trim superior.
   Corregido en `yaris-hatchback.json` y en Sanity. Regla nueva: antes de
   cerrar una tarjeta, contrastar contra el equipo completo de esa
   versión (Exterior/Interior/Seguridad de la misma página, o la ficha
   técnica), no solo el resumen curado.
2. **Reglas para acortar texto largo, acotadas a 2 técnicas seguras**
   (usar una forma corta que Toyota mismo use en otra parte de la misma
   fuente oficial, o quitar una palabra redundante) — **con la excepción
   explícita de que "Android Auto" y "Apple CarPlay" siempre van
   completos**, nunca como sigla ("AA"/"ACP"), a pedido directo de Raúl:
   nadie está familiarizado con esas siglas aunque toyota.mx a veces las
   use así en su propia copy.

## 2026-09-20 — Raúl (Claude Sonnet 5) (35)

### Corregido — nuevo criterio para `versiones[].caracteristicas`, aplicado a todo el catálogo
Raúl encontró que la tarjeta "Limited HEV" de RAV4 HEV no mencionaba su
potencia (236 HP, igual que Woodland) porque toyota.mx no la lista en la
sección "Características Generales" de esa versión específica, aunque sí
la confirma su ficha técnica. Al investigar el porqué, se detectó que el
criterio usado hasta ahora (recortar a 5 ítems por tarjeta, priorizando lo
que Claude consideraba "más distintivo") era subjetivo y en algunos casos
había quitado ítems reales de toyota.mx sin justificación.

**Regla nueva, documentada en `JSON Modelos/README.md`:** cada tarjeta de
versión lleva la lista completa de "Características Generales" de
toyota.mx tal cual, sin parafrasear. Solo se puede omitir un ítem si
aparece **literalmente igual en todas las versiones** del carrusel (ej.
Toyota Safety Sense repetido en las 4 HEV de RAV4). Se puede **agregar**
un dato verificado en la ficha técnica aunque toyota.mx lo omita en la
lista de esa versión específica, si es relevante (como el caso de
potencia/AWD de Limited HEV). Tope de **8 ítems** por tarjeta (no una
meta, solo un techo).

**Auditoría completa de los 9 carruseles del catálogo (12 modelos
publicados) contra toyota.mx en vivo:**
- **Corregidos** (tenían texto truncado, parafraseado, ítems tomados de
  Interior/Seguridad en vez de Características Generales, o ítems reales
  faltantes): Yaris Hatchback, Raize, Corolla/Corolla HEV (par, la
  corrección más grande — nunca se había hecho con este rigor desde que
  se armó, incluyendo agregar 'Potencia total del sistema híbrido 138 HP'
  que no estaba en ninguna tarjeta), Corolla Cross/Corolla Cross HEV
  (par), RAV4 HEV (LE +1 ítem, XLE +3, Woodland +3, RAV4 PHEV +1, además
  de la corrección de potencia/AWD de Limited ya aplicada antes).
- **Ya estaban correctos, sin cambios:** Avanza, Prius, Camry HEV, Yaris
  Sedán/Yaris Sedán HEV (par) — coincidían exacto con toyota.mx.
- Todos los cambios publicados directo en Sanity (contenido explícito) y
  reflejados en `JSON Modelos/`.

## 2026-09-20 — Raúl (Claude Sonnet 5) (34)

### Corregido — labels de color de RAV4 HEV, formato real de toyota.mx
Raúl notó que los nombres de color en el visor 360° ("Azul Woodland",
"Blanco Woodland") no dejaban claro que "Woodland"/"Limited" es la
versión, no parte del nombre del color — podía leerse como si el color
se llamara "Azul Woodland". Se corrigieron los 10 labels de
`coloresExterior` en `rav4-hev-modelo` para replicar tal cual el formato
real de toyota.mx: nombre + versiones entre paréntesis (ej. "Azul
(Woodland)", "Negro (LE / XLE / Limited)"). De paso se corrigió un
agrupamiento erróneo: "Blanco" se había etiquetado como exclusivo de
Woodland, cuando toyota.mx lo marca compartido entre LE y Woodland
("Blanco (LE / Woodland)") — el label original del DOM ya traía esta
información completa, no hacía falta simplificarla. Publicado directo
en Sanity (cambio de contenido explícito). Forzado un redeploy con
commit vacío (`efbc30b`) ya que no había ningún cambio de código
pendiente que disparara el webhook.

## 2026-09-20 — Raúl (Claude Sonnet 5) (33)

### Agregado — RAV4 HEV publicado (décimo segundo modelo, tercero de los pares con motorización doble)
Nuevo documento en Sanity (slug `rav4-hev`, `rav4-hev-modelo`), publicado
directo sin borrador (202 imágenes: hero, tarjeta, destacado, rendimiento,
5 versiones, visor 360° de 10 colores × 18 ángulos, galería 6+6). Tercero
de los 5 nameplates con motorización doble — único donde ninguna de las
dos motorizaciones (HEV/PHEV) es 100% gasolina, así que el carrusel
duplica LE/XLE/Woodland/Limited HEV + RAV4 PHEV. **Primer modelo con
Toyota Safety Sense 4.0** (los demás traen TSS sin número o 3.0) — se
comparó el desglose real contra los modelos ya publicados y se confirmó
que agrega **RSA (Asistente de Señales de Tránsito)**, un componente que
no existía antes en el catálogo. Destacado = "Connected Services" (Safety
Connect, Remote Connect, Service Connect, Drive Connect, Drive Recorder)
en vez de TSS, por ser la primera vez que aparece este concepto — TSS 4.0
quedó documentado dentro de `seguridadItems` en su lugar. **Capacidad de
carga en KG, no en litros** (504 kg en LE) — primer modelo del catálogo
sin dato de cajuela en litros, la ficha técnica solo da peso de carga
útil. **Primer modelo con rendimiento de combustible por VERSIÓN en vez
de por transmisión** (LE/XLE 27.70, Woodland 25.30, Limited 23.20 KM/L)
— Toyota no publica este dato para RAV4 HEV ni en su página ni en su
ficha técnica (primera vez que pasa en el catálogo); Raúl autorizó una
excepción puntual usando expansion.mx y carglobe.mx como fuente, con la
aclaración explícita de que no es precedente para el resto del catálogo.
Ajuste de código compartido: la línea divisoria entre filas de la tabla
de "Rendimiento" (`app/modelos/[slug]/page.tsx`) solo funcionaba para
exactamente 2 filas (`i === 0`) — extendida a `i < longitud - 1` para
que funcione con cualquier número de filas, y sincronizada la misma
lógica en `app/preview-borrador/page.tsx` (estaba desincronizado, sin
línea divisoria en absoluto). Verificado que Yaris Sedán (2 filas) sigue
viéndose igual tras el cambio.

### Corregido — 3 hallazgos al revisar fichas técnicas ya guardadas localmente
Raúl recordó que las fichas técnicas en PDF de casi todo el catálogo ya
viven en `Fichas Tecnicas/` (carpeta del proyecto, fuera del repo) — no
hacía falta pelear con el 403 de toyota.mx para conseguirlas. Al
revisarlas de nuevo se encontraron y corrigieron 3 cosas:
1. **Corolla Cross HEV** (`corolla-cross-hev-modelo`): `seguridadItems`
   incluía BSM (Monitoreo de Punto Ciego), copiado sin verificar del
   documento gasolina gemelo — la ficha real del HEV no lo incluye. Se
   corrigió la lista completa contra la sección SEGURIDAD real (que usa
   el término "Kit de seguridad" en vez de desglosar VSC/TRAC/HAC/ABS).
2. **Corolla** (`corolla-modelo` y `corolla.json`): typo "Alarmas e
   inmovilizados" → "Alarma e inmovilizador" en `seguridadItems`.
3. **Corolla Cross** (`corolla-cross-modelo`): las versiones "SE HEV" y
   "XSE HEV" del carrusel de versiones no tenían imagen desde que se
   publicó (19 de septiembre) — pendiente hasta que existiera el
   documento Corolla Cross HEV con esas fotos. Ya publicado ese par,
   se referenciaron las mismas imágenes (sin volver a subirlas) en el
   documento de gasolina.

## 2026-09-20 — Raúl (Claude Sonnet 5) (32)

### Agregado — Corolla Cross HEV publicado (décimo primer modelo, par HEV de Corolla Cross)
Nuevo documento en Sanity (slug `corolla-cross-hev`, `corolla-cross-hev-modelo`),
publicado directo sin borrador (91 imágenes: hero, tarjeta, destacado,
rendimiento, 4 versiones, galería 6+4, visor 360° de 4 colores × 18
ángulos). Cierra el segundo de los 5 nameplates con motorización doble
del catálogo (después de Corolla/Corolla HEV) — mismas 4 versiones que
Corolla Cross (LE, XLE, SE HEV, XSE HEV) duplicadas en el carrusel de
ambos documentos. **Sistema híbrido de 196 HP combinados** (toyota.mx no
desglosa cilindrada, y la ficha técnica en PDF no se pudo descargar —
bloqueada por WAF/Cloudflare del sitio en todos los intentos, 403 tanto
por `curl` como por navegación directa). Cajuela de 349 L (menor a los
434 L del gasolina, por la batería) — **no se dejó como destacado**: al
compararla contra las SUV's ya publicadas (Avanza 498 L, Raize 369 L,
Corolla Cross 434 L) resultó ser la más baja del catálogo, así que en su
lugar el cuarto ícono de la barra es Rendimiento (25.88 KM/L). **4
colores, todos bi-tono, sin ningún sólido** (Rojo/Negro, Azul/Negro,
Blanco/Negro, Plata/Negro) — confirma lo documentado al construir el
Corolla Cross de gasolina. Destacado con Toyota Safety Sense (5
componentes, incluye "Control Crucero Full Speed Range", que no aparece
en el documento de gasolina). Intro reescrita 2 veces con Raúl: la
primera versión era demasiado técnica (HP, KM/L, transición automática,
cajuela) y tenía un dato incorrecto (afirmaba la misma versatilidad de
carga que el gasolina); se corrigió con un ángulo de uso real (tráfico
diario + fin de semana) y la transición eléctrico/gasolina descrita de
forma sensorial en vez de como dato duro. Texto de "Diseño" también
reescrito — la primera versión usaba una tarjeta *highlight* real de
toyota.mx (defensas/espejos abatibles) que Raúl marcó como genérica, sin
vender nada; se cambió por iluminación BI-LED (de serie en las 4
versiones, dato real y distintivo).

### Documentado — nuevo rango de caracteres para `disenoTexto`
Al construir Corolla Cross HEV se encontró que `disenoTexto` sí tiene un
tope duro en el schema de Sanity (`validation: r.max(160)`, antes sin
regla explícita en el borrador) — dos documentos ya publicados lo
excedían (Corolla Cross 177, Corolla Cross HEV en su primer borrador
173). Se acordó con Raúl un rango de **120-160 caracteres** (agregado a
`JSON Modelos/README.md`) — además de respetar el tope, sirve para
"engordar" los modelos que quedaron muy cortos (86-103 caracteres) por
valor de SEO, pendiente de aplicarse al resto del catálogo.

## 2026-09-19 — Raúl (Claude Sonnet 5) (31)

### Cambiado — 3 íconos de la barra de destacados rediseñados
Raúl reportó que el ícono nuevo de "Bolsas de aire" (cojín con
pliegues) no se entendía — se probaron varias alternativas (escudo con
estrella, airbag con estallido, cinturón diagonal) comparadas en un
artefacto visual antes de decidir; quedó un **escudo simple**, sin
elementos extra. De paso se corrigieron dos íconos más: **"Pasajeros"**
se veía como un símbolo de infinito por el arco de hombros compartido
entre las dos cabezas — ahora son dos personas con arcos separados.
**"Maletero"** parecía una tarjeta de crédito — se probó primero un
auto de perfil con la cajuela abierta (inspirado en una referencia de
Raúl), pero a 32px con trazo fino se veía ilegible; se descartó a favor
de una **maleta simple**. Los 3 aplican automáticamente a los 10
modelos publicados (código compartido en `HighlightIcon.tsx`, no
Sanity).

### Cambiado — "Maletero" renombrado a "Cajuela"
A pedido de Raúl (término más común). Corregido en los 3 documentos de
Sanity que lo usaban (Avanza, Raize, Corolla Cross) y en sus JSON
locales correspondientes. Documentado como convención en
`JSON Modelos/README.md` para los modelos siguientes.

## 2026-09-19 — Raúl (Claude Sonnet 5) (30)

### Corregido — deploy de Vercel que no se disparó (webhook fallido)
Raúl notó que el ícono nuevo de "Bolsas de aire" no aparecía en
`toyotacuautitlan.vercel.app/modelos/corolla-cross`, aunque el
contenido de texto (9 bolsas, intro nueva) sí se veía actualizado.
Diagnóstico: en el dashboard de Vercel (pestaña Deployments) se
confirmó que el commit `0c84b57` (el que traía el ícono y publicaba
Corolla Cross) **nunca llegó a desplegarse** — el último deploy exitoso
era el commit anterior (`41f5416`). El contenido de texto sí se veía
"actualizado" porque la página se genera bajo demanda en el primer
request (ruta dinámica sin `dynamicParams: false`) consultando Sanity
en vivo, pero usando el código del último deploy real, sin el ícono
nuevo. Se confirmó que el push sí había llegado bien a GitHub
(`origin/main` en `0c84b57`) — el fallo fue puntual del webhook
GitHub→Vercel. Se forzó un nuevo deploy con un commit vacío (`a323797`)
y esta vez sí se disparó correctamente; verificado que el ícono ya
aparece en el HTML servido en vivo. Se revisó también
`Project Settings → Git` en Vercel (repo conectado sin errores,
eventos `deployment_status`/`repository_dispatch` activos) — sin
hallazgos, se confirma que fue un fallo aislado del webhook, no un
problema de configuración persistente.

## 2026-09-19 — Raúl (Claude Sonnet 5) (29)

### Agregado — Corolla Cross publicado (décimo modelo, primero de los pares con motorización doble desde Raize)
Nuevo documento en Sanity (slug `corolla-cross`, `corolla-cross-modelo`).
Primero de los 5 nameplates con motorización doble en construirse tras
Raize (par con Corolla Cross HEV, aún no construido). 4 versiones en el
carrusel: LE ($547,000) y XLE ($617,900) propias + SE HEV ($631,900) y
XSE HEV ($684,900) duplicadas del par HEV, mismo patrón que
Corolla/Corolla HEV. Motor 2.0L · 169 HP, CVT (sin manual). **Toyota
Safety Sense completo (4 componentes: PCS, LKA, LTA, AHB)** — comparado
contra los 4 modelos con TSS ya publicados antes de confirmarlo como
destacado (Corolla/Corolla HEV/Camry HEV tienen 6 componentes, Yaris
Sedán 4 distintos — Corolla Cross tiene AHB pero no LDA, DRCC queda
listado aparte en seguridad en vez de dentro del bloque TSS, a
diferencia de los demás). **9 bolsas de aire — el número más alto del
catálogo hasta ahora** (2 frontales, 4 laterales, 2 cortina, 1 rodillas;
el resto del catálogo va de 6 a 8), subido a la barra de 4 destacados en
vez de "Transmisión" — requirió un ícono nuevo (`seguridad`) en
`components/ui/HighlightIcon.tsx` y en la lista de opciones de
`sanity/schemaTypes/modeloType.ts` (no existía uno para este concepto).
6 colores sólidos (sin bi-tono en esta versión de gasolina — el bi-tono
es exclusivo de XSE HEV, documentado para cuando se construya el
documento HEV). **Primer modelo del catálogo con 18 ángulos por color**
en el visor 360° (número nuevo, antes solo se había visto 4/8/16/36).
Galería interior con solo 4 fotos (no 6) — confirmado por Raúl, no
pendiente. Intro revisada en 3 rondas con Raúl: de lista de ficha
técnica → enfoque 100% familiar (rechazado, ángulo mejor reservado para
Sienna) → enfoque general de día a día sin cerrarse a un perfil de
usuario. Subtítulo del Hero también reescrito (`Se adapta a tu ritmo`,
redacción propia) para no contrastar con la intro más general — antes
usaba el subtítulo real de toyota.mx ("Ideal para cualquier familia").
125 imágenes propias de Raúl, documento completo armado con
`create_documents`. **Publicado directo sin pausa de borrador**, a
pedido explícito de Raúl (ver entrada anterior sobre el criterio
actualizado de publicación).

## 2026-09-19 — Raúl (Claude Sonnet 5) (28)

### Cambiado — imagen de tarjeta reemplazada en Prius y Yaris Sedán HEV
Raúl subió `prius-tarjeta.webp` y `yaris-sedan-hev-tarjeta.webp` nuevas
(1200×675, mismo estándar). Subidas a Sanity y aplicadas con
`sanity exec` (patch directo, no `patch_documents` del MCP — su schema
no cargó correctamente en esta sesión). Verificado contra
`perspective: "published"`.

### Documentado — criterio actualizado de cuándo publicar directo en Sanity
El patch de arriba terminó publicando directo por un detalle del
script (`client.patch(id).commit()` sobre el `_id` publicado, sin pasar
por borrador) — se le avisó a Raúl de inmediato. Su respuesta aclaró
que el paso de "borrador + confirmación" nunca le daba nada revisable
en la práctica (no revisa Sanity Studio, y hoy tampoco podría — Draft
Mode de Next.js sigue sin implementarse): su revisión real siempre fue
la visual en local. **Regla nueva:** un cambio de contenido pedido
explícitamente se publica directo; contenido que la IA redacta por su
cuenta sigue revisándose primero en local antes de tocar Sanity.
Actualizado en `AGENTS.md` y en memoria de Claude
(`feedback_sanity_publish_confirmation.md`).

## 2026-09-19 — Raúl (Claude Sonnet 5) (27)

### Cambiado — degradado del Hero de modelo extendido a la derecha
`app/modelos/[slug]/page.tsx`: el degradado blanco que da legibilidad al
texto sobre la foto del Hero (solo desktop) ahora abarca más espacio
hacia la derecha (`20/32/44%` → `25/40/55%`). Probado primero en local,
confirmado por Raúl.

## 2026-09-19 — Raúl (Claude Sonnet 5) (26)

### Agregado — Raize publicado (noveno modelo, segundo de Suv's & Minivans)
Nuevo documento en Sanity (slug `raize`, `raize-modelo`). Modelo único
(sin par de motorización doble). 3 versiones (XLE MT $390,400, XLE CVT
$404,900, XLE CVT Bi-Tono $418,200). Motor Turbo 1.0L · 97 HP — único
turbo del catálogo hasta ahora. **Segundo modelo sin Toyota Safety
Sense** (después de Avanza); el "destacado" usa el área de carga
versátil (asientos abatibles + Tonneau Cover) en vez de TSS. **Primer
modelo del catálogo con colores bi-tono** (6 sólidos + 4 combinaciones
con techo negro, 10 en total) — requirió agregar el campo
`coloresExterior[].hexSecundario` al schema de Sanity
(`sanity/schemaTypes/modeloType.ts`), a la query
(`lib/sanity/queries.ts`), al tipo y al componente
`components/modelo/ExteriorColores.tsx` (el swatch se pinta partido en
diagonal cuando existe `hexSecundario`), confirmado con Raúl antes de
implementarlo. Primer modelo con conteo de ángulos del visor 360°
distinto **por color dentro del mismo modelo** (5 colores × 8 ángulos,
5 colores × 4 ángulos — así los tiene toyota.mx, confirmado con Raúl).
80 imágenes propias de Raúl subidas y documento completo creado de una
sola vez con `create_documents`. Publicado con confirmación explícita
y verificado contra `perspective: "published"`.

### Corregido — copy de Raize revisado en dos rondas antes de publicar
1) Intro y destacado iniciales mencionaban la variedad de colores como
argumento de venta ("10 colores para elegir") — Raúl lo rechazó: el
distribuidor no siempre tiene en existencia todos los colores que el
modelo ofrece en catálogo, así que no conviene destacarlo como venta.
Reescrito sin esa mención (intro, destacado y `seoDescripcion`) y sin
guion largo (regla de estilo ya acordada, se había colado en 3 campos
de este borrador). Documentado como convención nueva en `JSON
Modelos/README.md` y en memoria de Claude. 2) Intro reescrita una
segunda vez a pedido de Raúl: menos lista de equipo de ficha técnica,
más ángulo de uso real (ciudad entre semana / escapada de fin de
semana). Detalle completo en Obsidian `catalogo-de-modelos.md`.

## 2026-09-19 — Raúl (Claude Sonnet 5) (25)

### Agregado — Open Graph y URL canónica por página de modelo
`generateMetadata` en `app/modelos/[slug]/page.tsx` ahora incluye
`openGraph` (title, description, url, image) y `alternates.canonical`.
Reutiliza `imagenTarjeta` (1200×675, prácticamente el estándar OG de
1200×630) como `og:image` — no hizo falta pedirle una imagen nueva a
Raúl. Se aplica automáticamente a cada modelo conforme se publique,
sin tocar código de nuevo. Verificado en local (Corolla y Avanza).

## 2026-09-19 — Raúl (Claude Sonnet 5) (24)

### Agregado — datos estructurados Schema.org (AutoDealer + Car)
Preparado antes del lanzamiento, sin depender del dominio final ni de
quitar el bloqueo de `app/robots.ts`. Nuevo `lib/structured-data.ts`
arma dos bloques JSON-LD: `AutoDealer` (todo el sitio, alimentado desde
el documento "Configuración del sitio" en Sanity — hoy vacío, degrada
a solo `name`/`url` sin inventar datos) y `Car` (cada página de modelo,
con precio, moneda MXN, imagen, descripción y URL). Componente nuevo
`components/JsonLd.tsx` inyecta el `<script type="application/ld+json">`.
`lib/site.ts` centraliza `SITE_URL` (antes repetido como string suelto
en `app/layout.tsx`). Verificado en local (homepage y `/modelos/corolla`)
que ambos bloques se generan bien formados.

## 2026-09-17 — Raúl (Claude Sonnet 5) (23)

### Eliminado — 19 imágenes huérfanas depuradas de Sanity
Segunda ronda de depuración (la primera fue el 17 de septiembre, 15
imágenes). Script `sanity exec` compara todos los `sanity.imageAsset`
contra las referencias (`_ref`) usadas en cualquier documento `modelo`
(raw, incluye borradores) — encontró 19 sin referencia (1.16 MB), todas
rastreables a los reemplazos de imagen de esta sesión (hero viejo de
Camry HEV/Corolla HEV/Prius/Yaris Hatchback/Yaris Sedán/Yaris Sedán HEV,
destacado viejo de Corolla HEV/Yaris Sedán) más 2 sobrantes antiguos sin
relación (`corolla-hero-mobile@2x.webp`, `corolla2.webp`). Confirmado con
Raúl antes de borrar (acción irreversible). Scripts temporales borrados
después de usarlos, nunca versionados.

## 2026-09-17 — Raúl (Claude Sonnet 5) (22)

### Cambiado — mega-menú de escritorio: más espacio en categorías, tarjetas más chicas
Raúl notó que las categorías del panel izquierdo se veían apretadas y que
las tarjetas de modelo (imagen/nombre/precio) ocupaban demasiado espacio en
pantalla. Probado primero en local (`components/layout/ModelosMegaMenu.tsx`):
padding vertical de cada categoría de `py-3` a `py-5`, y grilla de tarjetas
de 3 a 4 columnas (`grid-cols-3`→`grid-cols-4`, `gap-5`→`gap-4`,
`sizes="200px"`→`"160px"`). Confirmado visualmente antes de subir.

## 2026-09-17 — Raúl (Claude Sonnet 5) (21)

### Cambiado — imagen de destacado reemplazada en Yaris Sedán y Corolla HEV
Raúl produjo fotos nuevas de la sección "Destacado" para ambos modelos
(`yaris-sedan-destacado.webp`, `corolla-hev-destacado.webp`). Subidas
directo a Sanity (sin prueba local previa, a petición explícita), guardadas
como borrador y publicadas con confirmación explícita ("si publica"),
verificadas contra `perspective: "published"`.

## 2026-09-17 — Raúl (Claude Sonnet 5) (20)

### Agregado — Avanza publicado (octavo modelo, primero de Suv's & Minivans)
Nuevo documento en Sanity (slug `avanza`, `avanza-modelo`). Datos desde
`Ficha_Tecnica_AVANZA_26_web.pdf` + toyota.mx en vivo, borrador revisado
primero en `/preview-borrador?json=avanza`. Modelo único, 2 versiones
(LE MT $367,300, XLE CVT $400,200) — el que menos versiones tiene del
catálogo. Sin Toyota Safety Sense (primer modelo del catálogo sin TSS);
el destacado usa el tema de versatilidad/espacio familiar en su lugar
("Todos viajan con comodidad", copy real de toyota.mx). 99 imágenes
propias de Raúl (hero, tarjeta, destacado, rendimiento, 2 versiones,
360° de 5 colores × 16 ángulos, galería 6+6), subidas con un script en
batch y el documento completo creado de una sola vez con
`create_documents` (en vez del patrón incremental de `patch_documents`
usado en modelos anteriores). Publicado con confirmación explícita de
Raúl y verificado contra `perspective: "published"`.

### Corregido — estructura de carpeta de imágenes del Avanza
La carpeta `Imagenes por Modelo/avanza/` se creó inicialmente solo con
la carpeta raíz, sin las subcarpetas `versiones/`, `360/<color>/` ni
`galeria/exterior|interior/` — corregido antes de que Raúl empezara a
producir fotos. Ya con fotos subidas, se detectaron y corrigieron 2
archivos de versiones (`avanza-le-mt.webp`, `avanza-xle-cvt.webp`) que
habían quedado en la raíz en vez de `versiones/`, y un typo en el
nombre del archivo de destacado (`avanza-detacado.webp` →
`avanza-destacado.webp`).

## 2026-09-17 — Raúl (Claude Sonnet 5) (19)

### Cambiado — imágenes hero-desktop y hero-mobile reemplazadas en los 7 modelos publicados
Raúl reemplazó las fotos hero (desktop y mobile) de Corolla, Corolla
HEV, Yaris Hatchback, Yaris Sedán, Yaris Sedán HEV, Prius y Camry
HEV en `Imagenes por Modelo/`. Antes de subirlas a Sanity se probó
el reemplazo en un entorno 100% local (código temporal en
`app/modelos/[slug]/page.tsx` apuntando a copias en `public/`,
revertido después, nunca commiteado) para que Raúl pudiera revisar
las 14 imágenes en su propio navegador sin tocar el CMS. Una vez
confirmado, se subieron como assets nuevos a Sanity y se
reemplazaron los campos `heroDesktop`/`heroMobile` de los 7
documentos (patch en borrador → confirmación explícita → publicado
y verificado contra `perspective: "published"`). De paso se detectó
y corrigió que la convención de nombre de archivo había quedado
inconsistente (`-hero-movil.webp` en vez de `-hero-mobile.webp` como
documenta `CLAUDE.md`) — ya corregida en las carpetas locales.

## 2026-09-17 — Raúl (Claude Sonnet 5) (18)

### Cambiado — botones del menú móvil más grandes y fáciles de tocar
Raúl reportó (con captura del menú móvil de toyota.mx como
referencia) que los botones de categoría dentro de "Modelos"
(Sedanes, SUV's, etc.) eran incómodos de tocar con el dedo —
confirmado en código: solo tenían `py-2.5` (~10px), un área de toque
de ~35-38px, por debajo del mínimo recomendado (~44px). Se evaluaron
2 alcances: (A) agrandar el padding y agregar divisores de ancho
completo sin tocar la arquitectura del menú, o (B) rediseñar el menú
móvil completo como overlay de pantalla completa (como toyota.mx).
Se eligió A por atacar el problema puntual reportado con mucho menos
riesgo — B toca `Navbar.tsx` completo (overlay, scroll-lock,
animaciones) sin resolver directamente el problema de tamaño de
botón. Aplicado a los 4 links de nivel superior (Modelos,
Promociones, Servicio, Contacto) y a las 5 categorías dentro de
Modelos (`py-4`, línea divisoria de ancho completo, `text-base` en
vez de `text-sm`) en `Navbar.tsx` y `ModelosMobileAccordion.tsx`.
Verificado visualmente en móvil (375px) antes de subir, con
confirmación explícita de Raúl.

## 2026-09-17 — Raúl (Claude Sonnet 5) (17)

### Cambiado — "Más espacio" → "Espacio" en la barra de destacados del Prius
Raúl cuestionó el ícono de distancia entre ejes (2,750mm) que se
había agregado al Prius en lugar de Rendimiento: contra el Corolla
HEV (2,700mm) la diferencia es mínima, así que "Más" sonaba a una
ventaja que en realidad no es tan contundente. Se exploraron varias
alternativas (Autonomía estimada calculada a partir de KM/L × tanque,
Altura, Diámetro de giro, y un campo nuevo de "detalle chico" en el
schema para achicar solo "entre ejes") — Raúl decidió no agregar
código nuevo por un ajuste de texto tan chico y simplemente quitar
"Más": el dato se queda como información neutra ("Espacio: 2,750mm
entre ejes"), igual que Motor o Pasajeros, sin pretender ser una
ventaja competitiva. Publicado con confirmación explícita.

## 2026-09-17 — Raúl (Claude Sonnet 5) (16)

### Corregido — CTA final decía "manejar" en vez de "estrenar"
El copy "¿Listo para estrenar tu [Modelo]?" ya se había acordado y
aplicado en `app/preview-borrador/page.tsx` durante una revisión de
borrador anterior, pero el cambio nunca se llevó a la plantilla real
(`app/modelos/[slug]/page.tsx`), que seguía diciendo "manejar" — se
quedó a medias entre las dos sesiones. Corregido en los 24 modelos
del catálogo (plantilla compartida). Detectado y reportado por Raúl.

## 2026-09-17 — Raúl (Claude Sonnet 5) (15)

### Corregido — 2 ajustes a la barra de destacados tras revisión de Raúl
(1) El ícono "Transmisión" (círculo con 8 rayos) parecía un sol, no
tenía relación visual con una transmisión — rediseñado como un
engrane real (círculo con dientes y centro hueco) en
`HighlightIcon.tsx`. (2) En el Yaris Sedán HEV, el valor de "Modos de
manejo" ("ECO/NORMAL/POWER/EV") se desbordaba de su columna en la
vista de 2 columnas de móvil, cortándose por la izquierda — acortado
a solo "4" (el detalle completo de los modos sigue visible en la
tarjeta de la versión S HEV, más abajo en la página). Publicado con
confirmación explícita y verificado en `perspective: "published"`.

## 2026-09-17 — Raúl (Claude Sonnet 5) (14)

### Cambiado — "Tracción" reemplazado en la barra de destacados de 5 modelos
Raúl notó que 5 de los 7 modelos publicados mostraban "Tracción:
Delantera FWD" en la barra de 4 íconos — un dato idéntico y sin
ningún valor distintivo, ya que todos los Sedanes & Hatchbacks del
catálogo son FWD (donde sí importará es al llegar a Suv's/Pickup's
con opciones 4x4/AWD). Reemplazado por un dato real y distinto por
modelo:
- Corolla → Capacidad de carga (470 KG, verificado en la sección
  "Corolla en números" de toyota.mx — no aparece en la ficha técnica
  PDF).
- Corolla HEV → Rendimiento (31.31 KM/L, el más alto de los 7
  modelos publicados).
- Yaris Hatchback y Yaris Sedán → Transmisión (CVT y MT) — ambos
  ofrecen versión de manual, a diferencia del Corolla (solo CVT).
- Yaris Sedán HEV → Modos de manejo (ECO/NORMAL/POWER/EV) — es lo
  primero que destaca toyota.mx de este modelo en sus
  "Características Generales". Se mantuvo su Destacado de sección
  (Toyota Safety Sense) sin cambios, para no repetir el mismo ángulo
  que se usó en Prius.
- Nuevo ícono "Modos de manejo" agregado a `HighlightIcon.tsx` y al
  schema de Sanity (`modeloType.ts`) — un volante de 3 rayos, a
  petición de Raúl (la primera propuesta fue un dial con marcas, se
  descartó por menos reconocible).
Los 5 documentos publicados con confirmación explícita y verificados
en `perspective: "published"`.

## 2026-09-17 — Raúl (Claude Sonnet 5) (13)

### Corregido — 2 bugs de contenido en el Prius
Raúl reportó ambos revisando el sitio en vivo: (1) la intro
(`descripcion`) no empezaba con la frase en negrita que sí tienen los
otros 6 modelos publicados — corregida con una frase de apertura en
el mismo estilo ("El rediseño más atrevido de la historia del
Prius."); (2) los círculos de "Colores disponibles" se veían todos en
blanco — causa: los 6 valores `hex` de `coloresExterior` se guardaron
sin el símbolo `#` (copiados directo del atributo `data-color1` del
DOM de toyota.mx, que no lo trae), a diferencia de los demás modelos
que sí lo tienen (`#FFFFFF`, no `FFFFFF`). Corregidos los 6.
`JSON Modelos/prius.json` sincronizado con ambos cambios. Publicado
con confirmación explícita y verificado en `perspective: "published"`.

## 2026-09-17 — Raúl (Claude Sonnet 5) (12)

### Cambiado — "MXN" reemplazado por "M.N." en todo el sitio
Raúl notó que toyota.mx usa "M.N." (moneda nacional) en vez del código
de divisa "MXN" para mostrar precios. Corregido en las 6 ubicaciones
donde el precio se renderiza: hero de la página de modelo, "modelos
similares", catálogo (`ModeloCard.tsx`), mega-menú y acordeón móvil de
navegación, carrusel de versiones (`VersionesCarousel.tsx`), y el
borrador local de revisión (`app/preview-borrador/`, no versionado).
También actualizadas las etiquetas internas del Studio de Sanity
(`title: 'Precio desde (MXN)'` → `'(M.N.)'` en `modeloType.ts`) para
que concuerden aunque no sean visibles al público, a petición
explícita de Raúl.

## 2026-09-17 — Raúl (Claude Sonnet 5) (11)

### Añadido — Prius publicado en Sanity (séptimo modelo del catálogo)
Modelo único, 100% HEV, sin par de motorización doble. Año 2027 (ficha
"MY 27"). 2 versiones: Base HEV ($525,500) y Premium HEV ($599,500),
138 HP total. 6 colores — la ficha técnica solo lista 5, pero
toyota.mx en vivo trae un sexto ("Mostaza") con visor 360° completo;
sus 16 imágenes llegaron con fondo transparente (fuente PNG, mismo
caso que Yaris Sedán HEV) y se compusieron sobre blanco antes de
subir. Destacado final: "Modos de manejo" (ECO/NORMAL/PWR/EV) — se
descartó "Hybrid Synergy Drive" al confirmar contra las fichas de
Corolla HEV/Camry HEV/Yaris Sedán HEV que es el nombre genérico de
Toyota para cualquier híbrido, no algo exclusivo del Prius. También se
descartó "Rendimiento" (31.12 KM/L) de la barra de destacados por el
mismo motivo de criterio (Corolla HEV ya tiene 31.31 KM/L, casi
empatado) — reemplazado por "Más espacio" (2,750mm entre ejes).
Sensores de estacionamiento con AEB y BSM agregados a Seguridad,
marcados como exclusivos de Premium. 115 imágenes propias de Raúl,
documento armado vía `sanity exec`. Publicado con confirmación
explícita y verificado en `perspective: "published"`.

## 2026-09-17 — Raúl (Claude Sonnet 5) (10)

### Cambiado — descripcionCorta del Corolla HEV alargada
Raúl notó en el catálogo que era la única tarjeta de las 6 publicadas
que quedaba en una sola línea (45 caracteres vs. 54-75 de las demás),
desalineando el precio respecto al resto del grid. Reescrita
manteniendo el mismo mensaje ("Un Corolla que además de moverte, te
ahorra") con más contexto — de 45 a 67 caracteres, dentro del rango de
las otras tarjetas. Publicada con confirmación explícita.

## 2026-09-17 — Raúl (Claude Sonnet 5) (9)

### Cambiado — heroDesktop del Yaris Sedán HEV reemplazada
Mismo motivo que la imagenTarjeta de esta sesión — nuevo encuadre
producido por Raúl mientras trabajaba las imágenes del Prius. Se
verificó por hash SHA-1 que el primer archivo entregado era idéntico
al ya publicado (sin cambio real) antes de que Raúl reemplazara el
archivo correcto; subida como nuevo asset a Sanity y publicada con
confirmación explícita.

## 2026-09-17 — Raúl (Claude Sonnet 5) (8)

### Cambiado — imagenTarjeta del Yaris Sedán HEV reemplazada
Raúl produjo un nuevo encuadre de `yaris-sedan-hev-tarjeta.webp` mientras
trabajaba las imágenes del Prius. Subida como nuevo asset a Sanity
(confirmado por hash SHA-1 que era un archivo distinto al publicado) y
publicada con confirmación explícita.

## 2026-09-17 — Raúl (Claude Sonnet 5) (7)

### Cambiado — imagenTarjeta del Yaris Hatchback reexportada
Tras comparar en el borrador local del mega-menú, se reexportó
`yaris-hatchback-tarjeta.webp` con más aire alrededor del auto (el
encuadre anterior lo mostraba muy grande/ajustado al cuadro). Subida
como nuevo asset a Sanity y publicada. Se probó el mismo ajuste en
`corolla-tarjeta.webp`, pero se descartó — el archivo se quedó igual al
publicado, sin cambios.

## 2026-09-17 — Raúl (Claude Sonnet 5) (6)

### Añadido — mega-menú de Modelos (escritorio) + acordeón (móvil)
Reemplaza el link simple "Modelos" del navbar por el patrón de
toyota.mx: en escritorio, un panel al hacer hover con las 5 categorías
a la izquierda y tarjetas (imagen, nombre, precio) de la categoría
activa a la derecha (`components/layout/ModelosMegaMenu.tsx`); en
móvil, un acordeón anidado Modelos → categoría → tarjetas en scroll
horizontal dentro del menú hamburguesa
(`components/layout/ModelosMobileAccordion.tsx`), reemplazando el link
simple anterior. Ambos leen los modelos en vivo vía `getModelos()`
desde el layout raíz (`app/layout.tsx`, ahora async) — crecen solos
conforme se publiquen los 18 modelos restantes. Categorías compartidas
extraídas a `lib/categorias.ts` (antes duplicadas en
`app/modelos/page.tsx`). Categorías sin modelos muestran "Próximamente
en esta categoría" en vez de verse vacías.

Se decidió **conservar** `/modelos` como página de respaldo (enlace al
final del acordeón) aunque toyota.mx no tenga una — nos sirve de SEO y
red de seguridad mientras el catálogo esté incompleto; se puede
reconsiderar más adelante.

Tamaños de texto ajustados tras varias rondas de revisión con Raúl:
categorías y nombre de modelo a 15px/semibold, precio ("Desde $X MXN")
a 14px/normal — antes 12px con gris muy claro, poco legible.

Probado primero en local (mega-menú, acordeón, encuadre de imágenes de
tarjeta) antes de subir — ver historial de la sesión para el detalle de
las iteraciones de espaciado, aspect-ratio y tipografía.

## 2026-09-17 — Raúl (Claude Sonnet 5) (5)

### Corte de auditoría — sincronización y depuración
A petición explícita de Raúl, corte completo antes de seguir con más
modelos: (1) diff campo por campo de los 6 modelos publicados contra
`JSON Modelos/` — se encontró y corrigió 1 desfase real (`corolla-hev.json`
le faltaban las características de las 4 versiones de gasolina
compartidas); (2) verificado en el sitio en vivo (no solo Sanity) que el
reordenamiento de secciones y el rename "Diseño" ya están desplegados;
(3) `CLAUDE.md` del proyecto (+ espejo en Obsidian) corregido: el campo es
`imagenTarjeta` no `imagenPrincipal`, y el número de ángulos del 360° no
siempre es 16; (4) **15 imágenes huérfanas borradas de Sanity (3.35 MB)** —
12 JPEG de 2048px de la galería del Corolla (previas a la conversión a
WebP 1400px), la imagen de prueba `Tiktok.jpg`, la tarjeta equivocada del
Yaris Sedán HEV, y un sobrante de antes del rename de campo — las 4
categorías ya estaban documentadas como correcciones previas, no eran un
misterio. Confirmado con el usuario antes de borrar (acción irreversible).

## 2026-09-17 — Raúl (Claude Sonnet 5) (4)

### Añadido — Yaris Hatchback publicado en Sanity
Sexto modelo del catálogo (slug `yaris-hatchback`, documento `yaris-hatchback-modelo`).
No tiene par HEV — 3 versiones: Base CVT ($326,500), S MT ($357,000), S CVT
($383,300). Motor 1.5L · 106 HP (verificado en su propia ficha técnica, distinto
a los 105 HP del Yaris Sedán). 6 colores (Blanco, Plata, Gris, Escarlata,
Cemento, Negro) — "Cemento" es nombre de color nuevo en el catálogo. Visor
360° con **8 ángulos por color** (no 16), primer modelo del catálogo con este
rango más chico, extensión `.jpeg`. Destacado = "Comodidad" en vez de Toyota
Safety Sense (decisión explícita para variar respecto a los últimos modelos).
68 imágenes subidas sin hallazgos en la revisión previa (nombres, resoluciones
y hashes MD5 correctos de punta a punta).

## 2026-09-17 — Raúl (Claude Sonnet 5) (3)

### Sincronizado — `JSON Modelos/` contra lo realmente publicado en Sanity
Se estableció que la intro (`descripcion`) debe medir 300-350 caracteres. Al
verificar contra el Yaris Sedán HEV se encontró que el archivo local tenía
128 caracteres cuando lo publicado real eran 336 — auditando los otros 4
modelos publicados se confirmó que **los 5 tenían la intro desactualizada**
localmente, y que `corolla.json` además tenía las características de las
versiones LE HEV/XLE HEV completamente distintas a lo publicado (specs, no
solo texto). Los 5 archivos se corrigieron y verificaron campo por campo
contra `query_documents` con `perspective: "published"`. **Lección: los JSON
locales pueden desincronizarse de Sanity tras publicarse — no son fuente de
verdad confiable por sí solos.**

## 2026-09-17 — Raúl (Claude Sonnet 5) (2)

### Corregido — contador de versiones con menos de 4 tarjetas
`components/modelo/VersionesCarousel.tsx`: el texto bajo el carrusel ("1–4 de
N versiones") sumaba siempre 4 al índice sin acotarlo al total real —
detectado al armar Yaris Hatchback, primer modelo del catálogo con solo 3
versiones ("1–4 de 3 versiones", debería decir "1–3"). Se limita el extremo
superior del rango con `Math.min(d + CARDS_VISIBLE, TOTAL_CARDS)`. Verificado
que no cambia el comportamiento en modelos con 4+ versiones (Yaris Sedán
sigue mostrando "1–4 de 6 versiones").

## 2026-09-17 — Raúl (Claude Sonnet 5)

### Cambiado — nuevo orden de secciones en la página de modelo + "Exterior" → "Diseño"
`app/modelos/[slug]/page.tsx`: probado primero en `app/preview-borrador/` (borrador
local, nunca subido a git) y aprobado por Raúl antes de aplicarlo a la plantilla real
que usan los 24 modelos. Orden nuevo: Hero, Intro, Highlights, **Diseño** (antes
"Exterior"), Galería, CTA intermedio, Destacado, Seguridad, Rendimiento, Versiones,
CTA final, Modelos similares — inspirado en cómo toyota.mx presenta primero diseño/
tecnología/seguridad y deja las tarjetas de versión (con su propio Cotízalo/Manéjalo)
para el final, ya que el usuario conoce el producto. La sección "Exterior" se
renombra a "Diseño" porque el sitio no tiene una sección "Interior" aparte que la
justifique como contraparte.

Esto implicó renombrar el campo de Sanity `exteriorTitulo`/`exteriorTexto` a
`disenoTitulo`/`disenoTexto` (`sanity/schemaTypes/modeloType.ts`,
`lib/sanity/queries.ts`) — **no** se tocaron `coloresExterior` ni
`galeriaExteriorDetalle`, que son conceptos distintos (colores del 360° y fotos de
exterior vs interior en Galería), no el título de esta sección. Los 5 modelos ya
publicados (Corolla, Corolla HEV, Camry HEV, Yaris Sedán, Yaris Sedán HEV) se
migraron con `patch_documents` (borrador) y se publicaron con confirmación explícita
("Sí, publícalo y súbelo") **antes** de subir el código, para no dejar la sección
vacía en producción durante la transición. Los 5 JSON de borrador en
`JSON Modelos/` y `app/preview-borrador/page.tsx` se actualizaron igual, para no
quedar desincronizados.

## 2026-09-16 — Raúl (Claude Sonnet 5) (9)

### Cambiado — tarjeta de versión más compacta en mobile
`components/modelo/VersionesCarousel.tsx`: con los botones Cotízalo/Manéjalo
agregados, la tarjeta de versión creció demasiado en mobile — mucho scroll
para comparar versiones dentro del carrusel horizontal. Se descartó poner
los botones lado a lado (le resta prioridad visual a "Cotízalo" y reduce
el tamaño de toque, ambos malos en mobile) y en su lugar se apretó el
espaciado en dos puntos sin tocar tamaño de texto ni botones: el header
de nombre/precio (`pt-[22px]/pb-[18px]` → `pt-4/pb-[14px]`) y la lista de
características (contenedor `py-5` → `py-3`, cada ítem `py-2` → `py-1.5`).
Recorta ~50px de alto por tarjeta con 6 características.

## 2026-09-16 — Raúl (Claude Sonnet 5) (8)

### Cambiado — disclaimer de precios bajo el carrusel de versiones
`app/modelos/[slug]/page.tsx`: se quitó la línea "Las imágenes mostradas
son únicamente ilustrativas" (ya no aplica, las fotos son reales) y se
ajustó el tono ("Consulte" → "Consulta", "Asesor Toyota" → "asesor
Toyota"). Texto fijo en la plantilla compartida, no es campo de Sanity —
aplica a los 24 modelos de un jalón.

## 2026-09-16 — Raúl (Claude Sonnet 5) (7)

### Añadido — Yaris Sedán HEV publicado en Sanity
Cuarto modelo del catálogo completado de punta a punta (slug `yaris-sedan-hev`,
documento `ca984df4-2f37-46eb-8784-cd83b8fc7621`). Par HEV del Yaris Sedán —
carrusel `versiones` con las mismas 6 tarjetas, reutilizando por referencia las
imágenes ya subidas para el documento `yaris-sedan` (no se volvieron a exportar
ni subir). Colores del 360° (Blanco, Rojo, Plata, Escarlata, Gris, Negro — sin
Blanco Perlado) leídos de los atributos `data-color1` del DOM de toyota.mx, no
aproximados. Primer modelo del catálogo con **36 ángulos por color** en el
visor 360° (216 imágenes) en vez de los 16 habituales — detectado en vivo
contra el sitio, no asumido por ser el mismo rango que otros modelos. Las
imágenes fuente de este 360° vienen en PNG con transparencia y proporción real
~1.415 (no 3:2 exacta como en los modelos anteriores) — se compusieron sobre
fondo blanco y se ajustaron a 1200×800 sin recorte para no deformar el auto,
en vez de estirarlas directo. Este modelo **no tiene galería de interior**
(decisión del proyecto) — ver el cambio de `Galeria.tsx` abajo. 226 imágenes
subidas vía `sanity exec` + `client.assets.upload()` (mismo mecanismo que
Corolla HEV, Camry HEV y Yaris Sedán). Publicado con confirmación explícita
("Súbelo a Sanity y publica").

### Añadido — `Galeria.tsx` oculta la pestaña "Interior" si no hay imágenes
Antes, un modelo sin `galeriaInteriorDetalle` (como el nuevo Yaris Sedán HEV)
mostraba igual el botón "Interior" — al hacer clic, el visitante veía un grid
completamente vacío sin aviso. Ahora la barra de pestañas (`Exterior`/`Interior`)
solo se renderiza si `interior.length > 0`; si no hay imágenes, se muestra
directo el grid de Exterior sin selector, ya que es la única opción. No afecta
a los modelos que sí tienen ambas galerías. Commiteado y subido a `main`
(rama `galeria-oculta-boton-interior`, fusionada directo) — dispara deploy en
Vercel.

### Corregido — imagen de tarjeta del Yaris Sedán HEV
Raúl subió por error la imagen de tarjeta del Yaris Sedán (gasolina) en vez
de la del HEV — detectado comparando el hash SHA-1 del archivo local contra
el ID del asset ya publicado en Sanity (coincidían exactamente, señal de que
no había cambio real que aplicar). Corregido con el archivo correcto
(`yaris-sedan-hev-tarjeta.webp`, 1200×675) y publicado con confirmación
explícita.

## 2026-09-16 — Raúl (Claude Sonnet 5) (6)

### Corregido — aspect-ratio de Destacado, Rendimiento y Galería
Raúl reportó que la imagen de "Destacado" del Yaris Sedán se veía
recortada de los lados comparándola con el archivo original. La imagen
exportada estaba bien (1200×800, 3:2, tal como pide `guia-imagenes-por-modelo.md`)
— el bug estaba en el contenedor de `app/modelos/[slug]/page.tsx`, fijado
a `aspect-[4/3]` en vez de `aspect-[3/2]`; con `object-cover` eso recortaba
los lados de la imagen más ancha para forzarla en una caja más angosta.
Auditando el resto de la plantilla se encontró el mismo error en 3
lugares más: "Rendimiento" (`page.tsx`, mismo bug pero con `object-contain`,
así que dejaba espacio en blanco en vez de recortar) y la Galería —grid de
miniaturas y lightbox— en `components/modelo/Galeria.tsx` (una recortaba,
la otra dejaba espacio en blanco). Los 4 se corrigieron a `aspect-[3/2]`,
que es la proporción real de esas imágenes en toda la guía. Hero,
Versiones, Visor 360° y Tarjeta ya estaban correctos, se revisaron y se
descartaron como afectados. Al ser la plantilla compartida, aplica de
inmediato a los 4 modelos ya publicados (Corolla, Corolla HEV, Camry HEV,
Yaris Sedán).

### Corregido — copy del Yaris Sedán sin lenguaje de "renovación"
Raúl señaló que el rediseño de este Yaris Sedán tiene varios años y ya no
es un factor a destacar — los textos originales (copiados de toyota.mx)
insistían en "renovado"/"renovación"/"redescubre" en `heroSubtitulo`,
`descripcion`, `descripcionCorta`, `exteriorTitulo` y `seoDescripcion`.
Reemplazados con líneas propias de Toyota sin enfoque de novedad ("El
sedán perfecto para tu día a día", "Más que un Sedán es un Toyota Yaris",
"Se adapta a tu vida"). Publicado con confirmación explícita.

## 2026-09-16 — Raúl (Claude Sonnet 5) (4)

### Añadido — Yaris Sedán publicado en Sanity
Tercer modelo del catálogo completado de punta a punta (slug `yaris-sedan`,
documento `48ea9a87-6a82-4860-ad55-265d893fa710`). Uno de los 5 nameplates
con motorización doble (par con Yaris Sedán HEV, aún no construido) — el
carrusel `versiones` ya trae 6 tarjetas (5 de gasolina + 1 "HEV" a
$450,000, siguiendo el patrón de Corolla/Corolla HEV). Primer modelo del
catálogo con 2 filas de rendimiento (CVT 18.54 / MT 20.10 KM/L, porque
ofrece ambas transmisiones). Revisión previa de las 135 imágenes de Raúl
encontró y corrigió un nombre sin guión (`yaris-sedan-shi-cvt.webp` →
`yaris-sedan-s-hi-cvt.webp`) y confirmó dos cosas que parecían errores pero
no lo eran: la foto de "Base CVT" y "S MT" es el mismo archivo a propósito
(toyota.mx también las muestra idénticas), y los colores Blanco/Blanco
Perlado del 360° comparten algunos ángulos por el mismo motivo. Colores
(7: Blanco, Rojo, Plata, Escarlata, Gris, Negro, Blanco Perlado) leídos
directo de los atributos `data-color1` del DOM del configurador de
toyota.mx, no aproximados a ojo. `destacadoTexto` (Toyota Safety Sense)
solo tiene 4 componentes en vez de los 6 habituales — la ficha técnica de
este modelo no incluye AHB ni DRCC, no se inventaron por consistencia.
Publicado con confirmación explícita de Raúl.

### Cambiado — subtítulo del Hero de modelo más grande
`app/modelos/[slug]/page.tsx`: el párrafo bajo el nombre del modelo (ej.
"Imponente por fuera y por dentro.") pasó de `clamp(16px,1.6vw,18px)` a
`clamp(18px,1.8vw,20px)` — se veía chico junto al `h1`. Al ser la plantilla
compartida por los 24 modelos, aplica a todos de un jalón.

## 2026-09-16 — Raúl (Claude Sonnet 5) (2)

### Añadido — Camry HEV publicado en Sanity
Segundo modelo del catálogo completado de punta a punta (slug `camry-hev`,
documento `f2e94d37-fe57-4ebe-89bd-4dc850c237cd`). Revisión previa de las
101 imágenes locales producidas por Raúl: 2 nombres de archivo corregidos
para llevar el prefijo completo del slug (`camry-destacado.webp` →
`camry-hev-destacado.webp`, y las 4 imágenes de `versiones/` que tenían
"hev" al final en vez de al inicio). Confirmado que Blanco y Blanco Perlado
comparten intencionalmente las mismas fotos del visor 360° (13/16 ángulos
idénticos byte a byte) — replica lo que hace toyota.mx, no es un error.
Subida de assets vía `npx @sanity/cli assets upload` (101 imágenes: hero
desktop/móvil, tarjeta, destacado, rendimiento, 4 versiones, 5 colores ×
16 ángulos del 360°, galería exterior/interior de 6+6) y creación del
documento vía `create_documents`. Corregido en el momento: el primer
`create_documents` se envió sin el campo `slug` (requerido por el schema)
por descuido — se resolvió con un `patch_documents` inmediato antes de
publicar. Publicado con confirmación explícita de Raúl. Pendiente: deploy
en Vercel (este mismo commit) para que la página exista en el sitio en
vivo — ver `AGENTS.md`.

### Añadido — `destacadoTexto` admite viñetas (Portable Text)
Antes era texto plano (`type: 'text'`), solo aceptaba un párrafo corrido —
ahora es `array` de `block` (igual que `descripcion`), admite listas con
viñetas además de párrafos y negritas. `app/modelos/[slug]/page.tsx`
actualizado para renderizar con `<PortableText>` en vez de `<p>` simple.
Corolla y Corolla HEV migrados con contenido real: los 6 componentes de
Toyota Safety Sense según su ficha técnica (Sistema de Pre-Colisión,
Asistencia de Mantenimiento de Carril, Asistencia de Trazado de Carril,
Alerta de Cambio de Carril, Sistema de Luces Altas Automáticas, Control
Crucero Adaptativo Dinámico) en vez de un párrafo genérico. Publicado antes
de subir el código, para no dejar la sección en blanco en producción (el
componente de Portable Text no sabe interpretar el string viejo).

### Añadido — borrador de Camry HEV (`JSON Modelos/camry-hev.json`)
Reconstruido desde cero (reemplaza al `camry.json` viejo, formato
pre-Sanity, borrado) — datos y textos verificados contra la ficha técnica +
toyota.mx en vivo. Modelo único, sin par CVT/gasolina. Pendiente de
aprobación final y carga a Sanity.

### Cambiado — `/preview-borrador` generalizado
Antes leía siempre `corolla-hev.json` a mano. Ahora acepta
`?json=<archivo>` como parámetro, y el marcador de posición de colores se
filtra dinámicamente por los nombres de color del borrador en vez de una
exclusión fija ("no Negro") — reutilizable para cualquiera de los 24
modelos sin tocar el archivo.

## 2026-09-15 — Raúl (Claude Sonnet 5) (12)

### Cambiado — visor 360° más grande
El ancho máximo del visor (`components/modelo/ExteriorColores.tsx`) estaba
limitado a 540px dentro de un contenedor mucho más ancho — se veía chico
con demasiado espacio en blanco alrededor, notorio al compararlo con
toyota.mx. Subido a 800px (se probó primero en 880px, resultaba muy pegado
a las flechas de navegación). El archivo fuente sigue siendo 1200×800px sin
cambios — solo se ajustó el límite de despliegue, no la resolución. Nota
actualizada en `guia-imagenes-por-modelo.md` (Obsidian).

## 2026-09-15 — Raúl (Claude Sonnet 5) (11)

### Cambiado — consistencia de botones y otras inconsistencias visuales menores
Auditoría completa de la plantilla de modelo buscando más deriva visual
(mismo tema que las correcciones anteriores del día):
- **Botones:** "Ver versiones y precios" (Hero) de 13px a `text-sm` (14px),
  igual que "Cotízalo"/"Manéjalo". Los dos "Solicitar Cotización" (CTA
  intermedio y final) tenían 15px y 16px entre sí — unificados a
  `text-base` (16px), tamaño mayor a propósito por ser CTA de sección
  completa, no de tarjeta. Documentado en `SISTEMA-DE-DISENO.md` §5.
- **Títulos de sección:** "Destacado" y "Rendimiento" usaban su propio
  `clamp()` (28-3.5-42 y 26-3.5-42) en vez del estándar `clamp(28px,4vw,44px)`
  que ya usan Versiones/Exterior/Seguridad/Galería — unificados.
- **Grises de borde:** `#E0E0E0`, `#E8E8E8` y `#F0F0F0` (tres grises casi
  idénticos para líneas finas/bordes) consolidados en un solo valor
  (`#E8E8E8`).
- **CTA final:** tenía `py-24 max-desktop:py-16` (más grande en escritorio,
  más chico en mobile que cualquier otra sección) — igualado al estándar
  `py-20 max-desktop:py-[52px]` del resto de las secciones.

## 2026-09-15 — Raúl (Claude Sonnet 5) (10)

### Cambiado — regla de estilo: sin guión largo (—) en ningún texto del sitio
Encontrado en `descripcionCorta`, `destacadoTexto`, `rendimientoTexto` y
`seoTitulo` de Corolla y Corolla HEV, y en el `title` de respaldo de
`generateMetadata`. Reemplazado por punto, dos puntos, coma o pipe (`|`,
en títulos SEO) según el caso. Regla documentada en `SISTEMA-DE-DISENO.md`
§6 (nueva sección de redacción/copy).

### Corregido — `descripcionCorta` se cortaba a media palabra en las tarjetas
El campo permitía hasta 160 caracteres en el schema, pero la tarjeta lo
recorta visualmente a 2 líneas (`line-clamp-2`) — un texto más largo
terminaba en "..." sin avisar. Bajado el límite del schema a 85 caracteres
(con nota explicando por qué) y reescritos los textos de Corolla y Corolla
HEV para que quepan completos. De paso, el de Corolla HEV ya no cita el
dato de rendimiento (31.31 km/l) — queda para el cuerpo de su propia
página, la tarjeta ahora es más comercial ("Un Corolla que además de
moverte, te ahorra.").

### Cambiado — tarjetas del catálogo (`ModeloCard.tsx`)
- Nombre del modelo: de `text-lg` (18px) fijo a `clamp(20px,2.5vw,26px)` —
  igual tamaño fluido que ya usa el nombre en "Modelos similares".
- Descripción corta y label "Desde": usaban grises por defecto de Tailwind
  (`gray-500`/`gray-400`), que no se usan en ningún otro lado del sitio —
  cambiados a `#555`/`#888`, la escala de grises ya establecida.

## 2026-09-15 — Raúl (Claude Sonnet 5) (9)

### Añadido — filtro "Híbridos Eléctricos (HEV y PHEV)" funcional en `/modelos`
Nuevo campo booleano `esHibridoElectrico` en el schema `modelo` — no reemplaza
a `categoria` (que sigue siendo siempre la categoría física real), es un
filtro adicional. Corolla HEV marcado con `true` y publicado. Se quitó
"Híbridos Eléctricos (HEV y PHEV)" de la lista de valores de `categoria`
(nunca debió usarse ahí, y ningún documento lo tenía). Filtro de
`app/modelos/page.tsx` actualizado para usar el campo nuevo en vez de
comparar contra `categoria`.

### Cambiado — recorte de imagen en tarjetas de "Modelos similares"
Usaba una caja fija de 180px con `object-contain` (dejaba espacio en blanco
arriba/abajo de la imagen) — cambiado a `aspect-[16/9]` + `object-cover`,
igual que `ModeloCard.tsx` en el catálogo `/modelos`. Mismo recurso
`imagenTarjeta` de siempre, sin necesidad de imágenes nuevas.

### Cambiado — consistencia de tamaño/color en textos de sección
Los textos breves de Versiones, Exterior, Galería y Rendimiento tenían 3
estilos distintos entre sí (y con el texto de Introducción). Unificados
todos a `clamp(16px,1.2vw,18px)` / `#1a1a1a` — el mismo estilo que ya usaban
Introducción y Destacado. El texto de Seguridad (fondo oscuro) solo cambió
de tamaño, se queda en blanco por legibilidad.

### Cambiado — "Toyota" quitado del nombre en tarjetas del catálogo
`ModeloCard.tsx` mostraba "Toyota Corolla" — ahora solo "Corolla".

### Cambiado — `descripcionCorta` pulida en Corolla y Corolla HEV
Los textos originales estaban en minúsculas y con tono de borrador. Nuevos
textos propuestos y aprobados, publicados en Sanity y en `JSON Modelos/`.

## 2026-09-15 — Raúl (Claude Sonnet 5) (8)

### Cambiado — textos del recuadro de rendimiento más grandes
En `app/modelos/[slug]/page.tsx` (plantilla genérica, aplica a todos los
modelos): "Transmisión" y "Rendimiento de Combustible" de `text-sm` (14px) a
`text-base` (16px); la etiqueta de transmisión de cada fila (ej. "HEV") de
14px a 32px, para quedar proporcional en tamaño al valor numérico junto a
ella (ej. "31.31").

## 2026-09-15 — Raúl (Claude Sonnet 5) (7)

### Corregido — carrusel duplicado desincronizado entre Corolla y Corolla HEV
Las tarjetas "LE HEV" y "XLE HEV" del documento "Corolla" todavía tenían la
lista de características simple/genérica (escrita antes de la revisión a
fondo contra la ficha técnica), mientras que el documento nuevo "Corolla HEV"
ya usaba la lista detallada y verificada. Sincronizadas ambas al mismo
contenido (el detallado) para que el carrusel compartido sea idéntico en las
dos páginas, como debe ser. Publicado con confirmación explícita.

## 2026-09-15 — Raúl (Claude Sonnet 5) (6)

### Añadido — documento "Corolla HEV" creado y publicado en Sanity
Nuevo documento del modelo (slug `corolla-hev`), separado del "Corolla" (CVT)
según el patrón de carrusel duplicado ya decidido. Cargadas y referenciadas
119 imágenes: hero desktop/mobile, tarjeta, destacado, rendimiento, las 6
fotos de versiones (carrusel compartido con el Corolla CVT), y el visor 360°
completo (16 ángulos × 6 colores = 96 imágenes) más galería exterior/interior
(6 + 6). Contenido armado desde `JSON Modelos/corolla-hev.json`, ya aprobado
en sesiones previas. Publicado con confirmación explícita.

**Nota de proceso:** publicar en Sanity no actualiza el HTML estático del
sitio — hace falta un deploy nuevo en Vercel (de ahí este mismo commit) para
que `/modelos/corolla-hev` exista en producción.

### Corregido — "Quemacocos" restaurado en XLE HEV
Se había quitado de las características de XLE HEV (documento "Corolla", ya
publicado) por no aparecer en la ficha técnica del HEV. Raúl confirmó contra
las fotos de interior de toyota.mx que sí lo trae de serie. Restaurado como
característica adicional (no se quitó "Espejo retrovisor electrocromático",
que sigue verificado contra la ficha) — corregido en Sanity, `corolla.json` y
`corolla-hev.json`.

### Cambiado — colores del visor 360° del Corolla HEV: Blanco Perlado → Negro
La ficha técnica del HEV lista Blanco Perlado (no Negro) entre sus 6 colores,
pero toyota.mx — la fuente real de las fotos del 360° — no tiene Blanco
Perlado disponible para este modelo y sí tiene Negro. Se usaron los 6 colores
reales de toyota.mx en vez de los de la ficha técnica.

### Corregido — guía de imágenes por modelo (Obsidian)
`guia-imagenes-por-modelo.md`: el peso de referencia del visor 360° decía
"3–6 KB por imagen" — incorrecto, verificado contra las imágenes reales del
Corolla (24,944–29,834 bytes). Corregido a 19–38 KB. También se aclaró que
el número de ángulos por color **no es fijo en 16** — varía por vehículo, el
visor (`components/modelo/ExteriorColores.tsx`) soporta cualquier cantidad.

## 2026-09-15 — Raúl (Claude Sonnet 5) (5)

### Añadido — catálogo completo de 24 modelos definido
Comparando toyota.mx y toyotaoaxaca.com.mx (mismo grupo que Cuautitlán) se
definió la lista completa de modelos, su categoría/precio, y se identificaron
**5 nameplates con motorización doble físicamente distinta** (diseño exterior
y/o colores diferentes entre versiones): Corolla, Corolla Cross, Yaris Sedán,
Tacoma, RAV4 — cada uno va en **dos documentos separados** (uno por
motorización), pero con el **carrusel de versiones duplicado** (mismas 6
tarjetas en ambas páginas, sin campo ni schema nuevo — solo se repiten los
datos). Detalle completo en Obsidian `catalogo-de-modelos.md`.

### Cambiado — campo `imagenPrincipal` renombrado a `imagenTarjeta`
No describía para qué se usa (miniatura de catálogo y "Modelos similares",
no algo de la propia página). Schema desplegado por CLI, dato migrado en el
documento Corolla, código actualizado en 4 archivos
(`lib/sanity/queries.ts`, `types/index.ts`, `components/ui/ModeloCard.tsx`,
`app/modelos/[slug]/page.tsx`).

### Cambiado — reorganización completa de `Imagenes por Modelo/`
Carpeta renombrada (antes `Imagenes Ejemplo Modelo/`) al dejar de ser un
solo ejemplo. Nueva convención, aplicada al Corolla y documentada en
`CLAUDE.md`: una subcarpeta por página de modelo (nombrada con su slug),
con siempre el slug como prefijo de cada archivo — incluso dentro de sus
propias subcarpetas (`versiones/`, `360/<color>/`, `galeria/exterior|interior/`)
— para poder identificar de qué modelo es un archivo aunque salga de su
carpeta. Las carpetas se crean conforme se trabaja cada modelo, no todas de
una vez.

### Corregido — precios y datos del Corolla desactualizados
- LE HEV $515,300 → **$524,400**, XLE HEV $567,300 → **$576,400** (precio
  real vigente en toyota.mx/toyotaoaxaca.com.mx).
- XLE CVT y XLE HEV ya no comparten la misma foto — cada una tiene su
  propia imagen subida a Sanity.
- Rendimiento: se corrigió que cada modelo muestra **una sola fila**, la
  suya (Corolla CVT = 19.14 KM/L, sin la fila HEV que tenía un dato viejo
  de 26.3) — confirmado con Raúl que así se ve en toyota.mx, a diferencia
  del carrusel de versiones que sí duplica ambas motorizaciones.
- XLE HEV: se quitó "Quemacocos" de sus características (no está en la
  ficha técnica del HEV) y se agregó "Espejo retrovisor electrocromático"
  en su lugar (sí confirmado en la ficha técnica).

### Añadido — hallazgo: publicar en Sanity no garantiza quedarse en borrador
Durante el trabajo de imágenes de hoy, dos `patch_documents` (borrador)
terminaron reflejándose parcialmente en producción sin que se llamara
`publish_documents` — causa no confirmada del todo. Se corrigió el estado
publicado y se adoptó una salvaguarda: verificar explícitamente con
`perspective: "published"` después de cada `patch_documents`, no asumir
que se quedó solo en borrador. Detalle en memoria interna.

### Añadido — borrador completo del Corolla HEV (`corolla-hev`)
Datos y specs extraídos de `Ficha_Tecnica_COROLLA_HEV_26_web.pdf` +
toyota.mx, con textos de sección redactados y aprobados por Raúl. Vive en
`JSON Modelos/corolla-hev.json` (fuera del repo) — pendiente de imágenes
propias (Raúl, Photoshop) antes de cargarlo a Sanity. Carpeta
`Imagenes por Modelo/corolla-hev/` ya creada, con las 6 fotos de versiones
listas (reutilizadas del carrusel duplicado) — faltan hero, tarjeta,
destacado, rendimiento, colores/360° y galería.

### Añadido — página de prueba visual reutilizable para revisar borradores
`app/preview-borrador/page.tsx` (temporal, nunca en git, se borra al
decidir) renderiza cualquier borrador de `JSON Modelos/` con el diseño
real de la página, usando fotos del Corolla como marcador de posición
("Foto temporal") donde el modelo en borrador aún no tiene las propias.
Pensado para repetirse con cada uno de los 24 modelos, no solo el Corolla
HEV — resuelve que revisar copy en JSON crudo era poco práctico.

## 2026-09-15 — Raúl (Claude Sonnet 5) (4)

### Cambiado — texto de la barra de highlights un poco más grande
Los labels "MOTOR", "PASAJEROS", "TRACCIÓN", "TECNOLOGÍA" en
`app/modelos/[slug]/page.tsx` pasaron de `text-[11px]` a `text-xs` (12px) —
ajuste leve pedido tras revisar la página del Corolla.

### Decidido — revalidación de Sanity aplazada a propósito
Mientras el sitio no tenga visitantes reales, no urge resolver que el
contenido publicado en Sanity tarde en reflejarse en Vercel (ver hallazgo
de hoy más abajo) — cada cierre de sesión ya dispara un deploy nuevo al
subir los cambios de documentación. Se movió el pendiente a la sección
"SEO" de `PROYECTO.md`, junto con sitemap/Schema.org/Open Graph, que
esperan por la misma razón (dominio final).

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
