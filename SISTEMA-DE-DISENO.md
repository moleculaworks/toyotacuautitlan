# Sistema de diseño — base técnica del sitio

Referencia técnica de resolución/ancho, colores y tipografía. El objetivo es que
cualquier página nueva (otro modelo, home, servicios, etc.) parta de la misma
base en vez de reinventar valores. **Fuente de la verdad**: si algo aquí no
coincide con el código, el código manda — hay que actualizar este documento.

**Estado actual (22 de agosto de 2026):** ancho de página, colores y
tipografía de marca ya son consistentes en todo el sitio (no solo en el
Corolla) — ver la sección "Pendientes" al final para lo que sigue sin cerrar
(Header/Footer genéricos).

---

## 1. Resolución / ancho de página

| | |
|---|---|
| Ancho máximo del contenido | **1280px** (`max-w-7xl` de Tailwind) |
| Padding lateral (desktop) | `px-6` (24px) |
| Padding lateral (móvil) | `px-4` (16px) |
| Contenedor | `max-w-7xl mx-auto px-6 max-desktop:px-4` |

Este es el mismo ancho que usan el Navbar y el Footer — todas las secciones de
una página de modelo deben usar exactamente esta combinación de clases para
que el contenido quede alineado con el menú y el pie de página.

### Breakpoints

| Nombre | Valor | Uso |
|---|---|---|
| `sm:` / `md:` / `lg:` / `xl:` / `2xl:` | 640 / 768 / 1024 / 1280 / 1536px | Breakpoints estándar de Tailwind — usados en el resto del sitio (home, contacto, cotización, catálogo, Navbar, Footer). |
| `desktop:` / `max-desktop:` | **880px** | Breakpoint propio de las páginas de modelo (definido en `app/globals.css` como `--breakpoint-desktop`). Es el punto donde el layout pasa de apilado en móvil a multi-columna en escritorio. Antes era un valor repetido a mano (`max-[880px]:`) en cada archivo — ahora es una sola variable. |

**Regla práctica:** al construir una página de modelo nueva, usar `desktop:` /
`max-desktop:` para todo lo que sea layout específico de esa página (como ya
hace el Corolla). Para páginas que no son de modelo (home, servicios, etc.),
usar los breakpoints estándar de Tailwind, igual que el Navbar/Footer.

---

## 2. Colores

Definidos como variables en `app/globals.css` (bloque `:root` y expuestos a
Tailwind vía `@theme inline`). Nunca escribir el hex a mano — usar la clase o
`var(--token)`.

| Token | Hex | Clase Tailwind | Uso |
|---|---|---|---|
| `--background` | `#FFFFFF` | `bg-background` | Fondo base del sitio |
| `--foreground` | `#1A1A1A` | `text-foreground` / `bg-foreground` | Texto principal, negro casi puro |
| `--toyota-red` | `#EB0A1E` | `bg-toyota-red` / `text-toyota-red` / `border-toyota-red` | Rojo de marca — CTAs, acentos, íconos |
| `--toyota-red-dark` | `#C5091A` | `hover:bg-toyota-red-dark` | Tono hover/presionado del rojo de marca |
| `--toyota-dark` | `#1A1A1A` | `bg-toyota-dark` | Igual valor que `--foreground` (nota: duplicado bajo dos nombres, ver Pendientes) |
| `--toyota-gray` | `#F5F5F5` | `bg-toyota-gray` | Fondo gris de secciones alternas |

Grises finos de UI (bordes, texto secundario — `#999`, `#888`, `#777`, `#666`,
`#555`, `#DDD`, `#E0E0E0`, etc.) no están tokenizados a propósito: son valores
puntuales de detalle visual, no colores de marca. No hace falta crear una
variable por cada uno.

---

## 3. Tipografía

### Fuente de marca: ToyotaType

Archivos en `app/fonts/`, cargados una sola vez en `app/fonts.ts` y aplicados
a todo el sitio desde `app/layout.tsx` (clase en el `<body>`):

| Peso | Archivo | Valor numérico (`font-*`) |
|---|---|---|
| Book (regular) | `ToyotaType-Book.ttf` / `-BookIt.ttf` (itálica) | `400` → `font-normal` |
| Semibold | `ToyotaType-Semibold.ttf` / `-SemiboldIt.ttf` | `600` → `font-semibold` |
| Black | `ToyotaType-Black.ttf` / `-BlackIt.ttf` | `900` → `font-black` |

**Solo existen estos 3 pesos, en todo el sitio.** Usar únicamente
`font-normal`, `font-semibold` o `font-black`. **No usar** `font-medium`
(500) ni `font-bold` (700) — no existe un archivo real para esos pesos en
ToyotaType, así que el navegador los aproxima ("faux bold"), lo que se puede
ver ligeramente distinto entre navegadores y sistemas operativos.

`font-black` está reservado para un solo caso: el titular gigante del Hero de
cada modelo (ej. "COROLLA" en la portada). Todo lo demás —encabezados de
sección, labels, botones, texto de formularios— usa `font-semibold`. Si algo
"se siente" como que necesita más peso que `font-semibold` pero no es un
titular de Hero, no uses `font-black` ahí — pregunta primero, para no
banalizar el peso más pesado de la fuente.

(22 de agosto de 2026: se corrigieron 46 usos de `font-medium`/`font-bold` en
todo el sitio — 2 en el Corolla, 44 en el resto de las páginas y componentes
— cambiados a `font-semibold`, y se conectó ToyotaType a nivel global.)

---

## 4. Jerarquía de encabezados (h1–h3)

El nivel del tag (`h1`/`h2`/`h3`) refleja jerarquía semántica del documento,
nunca tamaño visual — el tamaño se controla con clases de Tailwind. Nunca
saltar un nivel (ej. `h1` directo a `h3`).

| Nivel | Uso |
|---|---|
| `h1` | Una sola vez por página. En páginas de modelo: el nombre del modelo en el Hero. En el resto de páginas: el título principal de la página (ej. "Catálogo de modelos", "Contacto"). |
| `h2` | Cada sección de contenido con título visible dentro de la página (Versiones, Exterior, Destacado, Seguridad, Galería, Rendimiento, CTAs, Modelos similares). También el título de cada tarjeta en un listado cuando no hay ningún `h2` de sección entre el `h1` y las tarjetas (ej. catálogo, promociones). |
| `h3` | Subtítulos o títulos de ítem *dentro* de una sección `h2` (ej. nombre de cada versión dentro de la sección "Versiones", "Colores disponibles" dentro de "Exterior"). |

Secciones sin título propio (intro, barra de highlights justo después del
Hero) no llevan encabezado — no son secciones nuevas, son continuación visual
del `h1`.

Encabezados de columna en el Footer (landmark `<footer>`, fuera del flujo de
contenido principal) no usan tag de heading — son labels visuales de cada
grupo de links, no secciones del documento; usar un `<p>` con el mismo
estilo en vez de `h3` para no generar un salto de nivel en cada página.

---

## 5. Botones

**Componente compartido: `components/ui/Button.tsx`** (20 de septiembre de
2026) — antes cada botón era clases de Tailwind copiadas a mano en cada
archivo; ahora los 5 tratamientos de color/hover reales del sitio viven en
un solo lugar como `variant`. Cualquier sección nueva (Financiamiento,
Servicio, etc.) debe importar este componente para sus botones en vez de
volver a escribir las clases de color a mano — así un cambio de tono de
marca se hace en un solo archivo, no se busca y reemplaza en todo el repo.

| `variant` | Clase de color/hover | Uso real hoy |
|---|---|---|
| `primary` | `bg-toyota-red text-white hover:bg-toyota-red-dark` | Acción principal — "Cotízalo", "Descargar Ficha Técnica". Relleno rojo de marca. |
| `secondary` | `border-[1.5px] border-foreground text-foreground hover:bg-foreground hover:text-white` | Acción alternativa emparejada con un primario — "Manéjalo". Contorno negro, invierte a relleno negro. |
| `outline-hero` | `border-2 border-foreground text-foreground hover:bg-toyota-red hover:border-toyota-red hover:text-white` | CTA aislado sobre fondo claro — "Ver versiones y precios" en el Hero. Contorno negro, invierte a rojo. |
| `invert-red` | `bg-white text-toyota-red hover:bg-foreground hover:text-white` | Botón blanco sobre fondo rojo de marca — CTA intermedio ("¿Listo para dar el siguiente paso?"). |
| `invert-black` | `bg-white text-black hover:bg-[#EBEBEB]` | Botón blanco sobre fondo negro — CTA final ("¿Listo para estrenar tu [Modelo]?"). |

**El componente NO impone tamaño de texto, padding ni tracking** — eso se
pasa vía `className` en cada uso, porque hoy varía por contexto y no está
100% homologado entre sí (ver "CTA de sección" abajo). `variant` solo fija
el tratamiento de color/hover — la parte que sí debe ser idéntica en todo
el sitio. `icon` + `iconPosition` (`'left'` | `'right'`) para botones con
ícono — si se pasa `icon`, agregar también la clase `gap-*` en `className`
(el componente no la fija sola, para no chocar con el `className` propio en
el CSS compilado). `href` renderiza `<Link>` (o `<a target="_blank">` con
`external`); sin `href`, renderiza `<button>` (acepta `onClick`, `type`,
`disabled` — útil para submits de formulario).

Todos los botones reales de página de modelo ya usan este componente
(`app/modelos/[slug]/page.tsx`, `components/modelo/VersionesCarousel.tsx`)
— revisado visualmente en `/preview-borrador` y en vivo tras el cambio, sin
diferencia de un solo pixel contra la versión anterior.

### CTA de sección (un solo botón, ocupa su propia franja)

Distinto del patrón de tarjeta de arriba — es el botón "Solicitar
Cotización" que aparece dos veces en la página de modelo (CTA intermedio a
media página, `variant="invert-red"`; CTA final antes del footer,
`variant="invert-black"`). Al ser un CTA de sección completa, no uno dentro
de una tarjeta chica, usa un tamaño de texto mayor: `text-base` (16px) en
vez de `text-sm`. Las dos apariciones ya comparten ese tamaño (corregido el
15 de septiembre de 2026, antes estaban en 15px y 16px sin razón).

**Pendiente de decisión (no es un error, es una inconsistencia sin
resolver, detectada el 20 de septiembre de 2026):** el padding de estos dos
botones no es idéntico entre sí (`px-11 py-[18px]` en el intermedio,
`px-14 py-5` en el final) y su tratamiento de hover tampoco (invierte a
negro/blanco vs. a un gris claro fijo `#EBEBEB`). No se unificó todavía
porque cambiaría el aspecto visual de una pieza ya publicada — antes de
tocarlo, confirmar con Raúl si se homologan a un solo tamaño/hover o si la
diferencia es intencional por el contraste de fondo (rojo vs. negro).

---

## 6. Redacción / copy

**No usar guión largo (—) en ningún texto del sitio** (acordado 15 de
septiembre de 2026, tras encontrarlo en varios textos: `descripcionCorta`,
`destacadoTexto`, `rendimientoTexto`, `seoTitulo`). Usar en su lugar, según
el caso:
- Punto y seguido, si son dos ideas independientes.
- Dos puntos (`:`), si la segunda parte explica o desarrolla la primera.
- Coma, si es una pausa corta dentro de la misma idea.
- Pipe (`|`), específicamente en títulos SEO (`seoTitulo`) para separar el
  nombre del modelo del resto — ej. `Toyota Corolla 2026 | Versiones y
  Precios`.

Esto aplica tanto a contenido cargado en Sanity como a texto fijo en código
(ej. el `title` de respaldo en `generateMetadata`, `app/modelos/[slug]/page.tsx`).

**`descripcionCorta` (tarjetas de modelo): máximo ~85 caracteres reales**,
no los 160 que permitía el schema hasta ahora. El campo se corta visualmente
a 2 líneas (`line-clamp-2` en `ModeloCard.tsx`) — un texto más largo termina
en "..." a media palabra. Escribir corto y comercial, sin citar datos/specs
(esos van en el cuerpo de la página del modelo, no en la tarjeta de catálogo).

**`destacadoTexto` admite viñetas (16 de septiembre de 2026).** Migrado de
texto plano a Portable Text (`array` de `block`, igual que `descripcion`) —
antes solo aceptaba un párrafo corrido, ahora también acepta listas con
viñetas. Útil cuando conviene enumerar componentes puntuales (ej. "Sistema
de Pre-Colisión", "Asistencia de Mantenimiento de Carril"...) en vez de un
párrafo genérico tipo "un conjunto de sistemas de asistencia activa que...".
Sigue siendo válido usar solo un párrafo sin viñetas cuando el contenido no
se presta a lista — no es obligatorio enumerar. Migrados a este formato:
Corolla, Corolla HEV (sin viñetas, prosa igual que antes) y Camry HEV (con
viñetas, primer caso real). Renderizado en `app/modelos/[slug]/page.tsx` con
`<PortableText>` dentro de un `<div>` con estilos para `p`/`strong`/`ul`/`ol`
(antes era un `<p>` simple).

---

## 7. Íconos

**Set de íconos de línea en código: `components/ui/HighlightIcon.tsx`.**
Se dibujan como SVG directo en el componente (no se suben como imagen por
modelo) para garantizar el mismo trazo, grosor y color en todo el catálogo.
Especificación para dibujar un ícono nuevo con el mismo estilo:

| Propiedad | Valor |
|---|---|
| Tamaño de render | `32×32` |
| `viewBox` | `0 0 24 24` |
| `fill` | `none` (solo trazo, nunca relleno) |
| `stroke` | `var(--toyota-red)` |
| `strokeWidth` | `1.8` |
| `strokeLinecap` / `strokeLinejoin` | `round` / `round` |

Todos comparten este mismo objeto `commonProps` — para agregar un concepto
nuevo (ej. un ícono para Financiamiento o Servicio), dibujar el SVG con
estas mismas 6 propiedades y agregarlo al diccionario `icons` del
componente. Hoy vive el set usado en la barra de datos destacados de
modelo (`motor`, `pasajeros`, `traccion`, `tecnologia`, `capacidad-carga`,
`potencia`, `autonomia`, `remolque`, `transmision`, `maletero`,
`rendimiento`, `modos-manejo`, `seguridad`) — el componente no está atado a
esa barra específica, cualquier sección puede importar `HighlightIcon` y
pasar un `nombre` de la lista.

**Otros SVG puntuales del sitio no pasan por este componente** (ej. el
check rojo de "Características Generales" en `page.tsx`, la flecha del
Hero, el ícono de descarga de "Ficha Técnica") — son de un solo uso, con
`strokeWidth="1.8"` y `strokeLinecap`/`strokeLinejoin` `"round"` también
(mismo trazo que HighlightIcon, por consistencia), pero dibujados inline
donde se usan en vez de vivir en el diccionario compartido. Si un ícono
puntual se vuelve a necesitar en un segundo lugar, ese es el momento de
moverlo a `HighlightIcon.tsx`.

---

## Pendientes (a propósito, no resueltos hoy)

- **Header y Footer no están cerrados.** Son genéricos por ahora; el diseño
  final se define cuando haya más secciones del sitio construidas (nota del
  22 de agosto de 2026).
- `--toyota-dark` y `--foreground` son el mismo hex (`#1A1A1A`) bajo dos
  nombres distintos — no es un error funcional, pero podría consolidarse en
  una sola variable más adelante.
- `app/layout.tsx` sigue cargando el font de Google "Geist", que no se usa en
  ningún lado (queda solo como variable CSS sin aplicar, ahora que ToyotaType
  es la fuente real del `<body>`) — evaluar si quitarlo del todo o si se
  pensaba usar para algo específico.
- **Hallazgo del 20 de septiembre de 2026, corregido el mismo día:** el
  Navbar (botón "Cotizar", desktop y móvil), los formularios de muestra
  (`CotizacionForm.tsx`, `CitaForm.tsx`, botón de submit) y la tarjeta de
  catálogo (`components/ui/ModeloCard.tsx`) usaban un sistema de estilo
  distinto y nunca documentado — hex directo `bg-[#EB0A1E]` en vez del
  token `bg-toyota-red`, `hover:bg-red-700` (rojo genérico de Tailwind) en
  vez de `hover:bg-toyota-red-dark`, y esquinas redondeadas (`rounded`,
  `rounded-lg`) que no existen en ningún botón/tarjeta de página de modelo.
  Homologados los 3: Navbar y formularios ahora usan `components/ui/Button.tsx`
  (variant `primary`); `ModeloCard.tsx` quitó `rounded-lg`/`shadow`/
  `border-gray-100` a favor de `border border-[#E8E8E8]` (mismo borde que
  la tarjeta de "Modelos similares") y su badge de categoría pasó de pill
  sólido redondeado a contorno, igual que el resto del sitio. Verificado
  visualmente en `/`, `/modelos`, `/cotizacion` y `/cita-de-servicio`
  (desktop y móvil) — sin romper el cierre del menú móvil al hacer clic en
  "Cotizar" (el componente `Button` ahora propaga `onClick` también en modo
  `href`, no solo en modo `<button>`).
  - **Los formularios (`CotizacionForm.tsx`/`CitaForm.tsx`) siguen siendo
    muestras sin terminar** (ver `formularios-cotizacion-y-prueba-de-manejo.md`
    en Obsidian) — solo se corrigió el botón de submit a la marca real, no
    se tocaron los inputs (siguen con `rounded` y `focus:border-[#EB0A1E]`
    hardcodeado) para no invertir esfuerzo en una pieza que se reconstruye
    después.
  - **Oportunidad sin resolver, no es un bug:** `ModeloCard.tsx` y la
    tarjeta inline de "Modelos similares" en `app/modelos/[slug]/page.tsx`
    son dos implementaciones separadas del mismo concepto de tarjeta
    (ahora con el mismo borde/badge, pero el badge sigue en posición
    distinta — sobre la foto en una, encima del título en la otra, y el
    link "Ver más"/"Ver modelo" no está unificado). Extraerlas a un solo
    componente evitaría que se desalineen de nuevo — no se hizo en esta
    pasada por ser un cambio de estructura, no solo de color.
