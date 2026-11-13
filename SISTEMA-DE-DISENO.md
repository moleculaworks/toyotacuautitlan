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

`font-black` está reservado para un solo caso: el titular gigante del Hero (`h1`)
de cada modelo (ej. "COROLLA" en la portada) y, desde el 10 de noviembre de 2026,
el `h1` del hero de las páginas de sección (ej. "FINANCIAMIENTO"), que heredan
ese mismo hero. Todo lo demás —encabezados de
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
| `primary` | `bg-toyota-red text-white hover:bg-toyota-red-dark` | Acción principal — "Cotízalo", "Descargar Ficha Técnica". Relleno rojo de marca. Cuando un modelo tiene varias fichas (ej. 4Runner HEV), se muestra un `primary` por ficha ("Ficha Técnica <versión>"), lado a lado en escritorio y apilados en móvil (`max-desktop:flex-col`). |
| `secondary` | `border-[1.5px] border-foreground text-foreground hover:bg-foreground hover:text-white` | Acción alternativa emparejada con un primario — "Manéjalo". Contorno negro, invierte a relleno negro. |
| `outline-hero` | `border-[1.5px] border-foreground text-foreground hover:bg-foreground hover:text-white` | CTA aislado sobre fondo claro — "Ver versiones y precios" en el Hero. Contorno negro, se rellena de negro. |
| `invert-red` | `bg-white text-toyota-red hover:bg-[#EBEBEB]` | Botón blanco sobre fondo rojo de marca — CTA intermedio ("¿Listo para dar el siguiente paso?"). |
| `invert-black` | `bg-white text-black hover:bg-[#EBEBEB]` | Botón blanco sobre fondo negro — CTA final ("¿Listo para estrenar tu [Modelo]?"). |

**Regla de hover (acordada el 10 de noviembre de 2026):** los botones **rellenos** (`primary`, `invert-red`, `invert-black`) cambian de tono de forma suave (más oscuro o gris claro `#EBEBEB`); los de **contorno** (`secondary`, `outline-hero`) se rellenan de negro con texto blanco. Ningún botón cambia a otro color de marca al pasar el cursor. Los enlaces de texto ("Ver detalles", "Ver modelo") se subrayan. Tamaño de texto de los botones: solo 14 px (`text-sm`) o 16 px (`text-base`), nunca más. Contorno de `secondary` y `outline-hero`: 1.5 px en ambos.

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
`px-14 py-5` en el final). **El hover ya se unificó el 10 de noviembre de
2026** (ambos pasan a gris claro `#EBEBEB`, ver la regla de hover más
arriba). El padding no se unificó todavía porque cambiaría el aspecto
visual de una pieza ya publicada — antes de tocarlo, confirmar con Raúl si
se homologa a un solo tamaño o si la diferencia es intencional por el
contraste de fondo (rojo vs. negro).

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
| Tamaño de render | `36×36` (era `32×32` hasta el 25 de sep de 2026 — se agrandó levemente en la barra de destacados) |
| `viewBox` | `0 0 24 24` |
| `fill` | `none` (solo trazo, nunca relleno) |
| `stroke` | `var(--toyota-red)` |
| `strokeWidth` | `1.0` (hasta el 23 de sep de 2026 era `1.8` — se redujo al rediseñar el set para permitir trazos más detallados sin verse amontonados) |
| `strokeLinecap` / `strokeLinejoin` | `round` / `round` |

Todos comparten este mismo objeto `commonProps` — para agregar un concepto
nuevo (ej. un ícono para Financiamiento o Servicio), dibujar el SVG con
estas mismas 6 propiedades y agregarlo al diccionario `icons` del
componente. Hoy vive el set usado en la barra de datos destacados de
modelo (`motor`, `pasajeros`, `traccion`, `tecnologia`, `capacidad-carga`,
`potencia`, `transmision`, `maletero`, `modos-manejo`, `seguridad`,
`remolque` — 11 íconos; `autonomia` y `rendimiento` se eliminaron el 25 de
sep de 2026 por no usarse en ningún modelo; `remolque` se eliminó ese día
y volvió el 24 de oct de 2026 con diseño nuevo, a partir de un ejemplo de
Raúl: bola de enganche con collarín abierto sobre un soporte cerrado, para
la capacidad de arrastre del Sequoia HEV y futuros Tacoma/Tundra). **Desde el 10 de nov de 2026 el diccionario tiene 6 íconos más, 17 en total, para la franja de beneficios de Financiamiento** (`rapidez`, `tranquilidad`, `proteccion`, `comodidad`, `confianza`, `flexibilidad`), dibujados a partir de la referencia de Raúl con el mismo trazo (1.0, lado mayor de 19 en la cuadrícula de 24). **No están en la lista `caracteristicas.icono` de los modelos**: se eligen desde el campo `icono` de cada beneficio en "Página: Financiamiento" (Studio). Si un beneficio no tiene ícono, la página muestra `IconoGenerico` como respaldo — el componente no está atado a
esa barra específica, cualquier sección puede importar `HighlightIcon` y
pasar un `nombre` de la lista.

**10 nov 2026: el diccionario llega a 22 íconos** con los de la franja de ventajas y las tarjetas de contacto de Refacciones, todos a partir de referencias de Raúl: `seguridad` (ya existía, se reutiliza para "Calidad y confianza"), `engranes` (dos engranes que no se tocan, 8 y 6 dientes), `velocimetro`, `sello` (medalla con estrella y dos cintas), `telefono` y `whatsapp`. **Tamaño:** `HighlightIcon` y `IconoGenerico` aceptan `size` (36 px por defecto, que es el de la barra de destacados de los modelos); las franjas de beneficios/ventajas de Financiamiento y Refacciones y las tarjetas de contacto usan **48 px** (`TAMANO_ICONO_BENEFICIOS`, una sola constante). El trazo vive en unidades del viewBox, así que escala con el ícono. **Excepción a "sin relleno":** `telefono` (auricular sólido con dos ondas, contornos extraídos de la referencia de Raúl) y el auricular de `whatsapp` (relleno, como el logo de la plataforma; el globo lleva trazo 1.25 en vez de 1.0). Son los únicos íconos con relleno y se reservan para los canales de contacto. Los íconos de un solo trazo se dibujan con `strokeWidth` 1.0 y esquinas redondeadas como el resto; los detalles que a 36 px dejarían aberturas de menos de 1 px se simplifican (se descartó un apretón de manos con nudillos por eso).

**11 nov 2026: el diccionario llega a 26 íconos** con los 4 de la franja de ventajas de Seguros, dibujados uno por uno a partir de referencias de Raúl (método: leer los trazos de la referencia, comprobar la superposición, revisar en `/preview-iconos`, esperar "aplica"): `refacciones` (caja abierta con un engrane de 6 dientes encima, para "refacciones originales"), `tecnicos` (persona con una llave de boca abierta), `agencia` (pin de ubicación con anillo y base elíptica abierta arriba) y `atencion` (audífonos con brazo y micrófono). Trazo 1.0, remates redondos, sin relleno, lado mayor de 19 en la cuadrícula de 24, 48 px en la franja de ventajas.

**12 nov 2026: el diccionario llega a 29 íconos** con los 3 nuevos de la franja de requisitos de Comonuevos, dibujados a partir de referencias de Raúl con el mismo método: `distribuidor` (agencia con toldo y puerta, un solo trazo), `mantenimiento` (llave de boca en U cruzada con una herramienta de boca abierta, 3 trazos; geometría construida limpia en un marco girado 45°) e `inspeccion` (portapapeles con tres casillas marcadas, 4 trazos). Trazo 1.0, remates redondos, sin relleno, lado mayor de 19 en la cuadrícula de 24, 48 px en la franja. En esa misma franja se reutiliza `velocimetro`. Referencias y trazos finales en `Secciones/Comonuevos/iconos/`.

**Otros SVG puntuales del sitio no pasan por este componente** (ej. el
check rojo de "Características Generales" en `page.tsx`, la flecha del
Hero, el ícono de descarga de "Ficha Técnica") — son de un solo uso, con
`strokeWidth="1.8"` y `strokeLinecap`/`strokeLinejoin` `"round"` también
(mismo trazo que HighlightIcon, por consistencia), pero dibujados inline
donde se usan en vez de vivir en el diccionario compartido. Si un ícono
puntual se vuelve a necesitar en un segundo lugar, ese es el momento de
moverlo a `HighlightIcon.tsx`.

---

## 8. Tabla de rendimiento (página de modelo)

La tabla de Transmisión / Rendimiento de combustible (`#rendimiento` en `app/modelos/[slug]/page.tsx`) tiene dos versiones, elegidas **solo por el número de filas**, sin campo en Sanity:

- **1 a 3 filas (todos los modelos publicados menos la Tacoma):** versión de siempre. Fila de 88 px (espacio de 20 px arriba y abajo, número rojo de 32 px con interlineado de 48 px); con aclaración (`detalle`) apilada debajo en `text-base` gris, la fila sube a 115 px. Encabezado de 62 px.
- **4 o más filas (hoy solo la Tacoma, desde el 9 de noviembre de 2026):** versión compacta. La aclaración va **en la misma línea** que la transmisión (`flex-wrap`, así una aclaración larga baja sola a la línea siguiente), espacio de 14 px arriba y abajo, interlineado del número de 40 px (fila de 68 px) y encabezado de 12 px de espacio (50 px). El número rojo conserva sus 32 px. En móvil el espacio horizontal baja de 24 a 16 px para que la aclaración quepa junto a "AT".

Si otro modelo llega a 4 filas, usa la versión compacta sin cambios; si se quiere que aplique también a 3 filas, el límite está en `rendimientoCompacto` (`rendimientoFilas.length >= 4`).

---

## 9. Páginas de sección (Financiamiento, Servicio, etc.)

Acordado el 10 de noviembre de 2026 con Financiamiento, la primera página que no
es de modelo. Las secciones diseñadas fuera del sitio (ej. en Claude Design) se
**adaptan a este sistema**, no al revés: se reutilizan los valores existentes y
lo que el diseño trae fuera de ellos se consulta antes de construirlo.

| Bloque | Cómo se resuelve |
|---|---|
| Hero | `components/ui/SectionHero.tsx`: copia exacta del hero de modelo (altura `clamp(420px,42vw,560px)`, degradado blanco, columna del 46%, `h1` font-black uppercase, subtítulo semibold). Opción `degradadoAmplio` (apagada por defecto): degradado blanco más largo (35 %/52 %/68 % en vez de 25 %/40 %/55 %) para títulos muy largos; hoy solo la usa Planes y Arrendamientos ("ARRENDAMIENTOS" se perdía sobre la foto). Sin categoría, precio ni botón. Imágenes 1920×680 (escritorio) y 1600×1200 (móvil). |
| Calidad de imagen del hero | `SectionHero` pide `quality: 85` (el resto del sitio usa 75). Declarado en `next.config.ts` → `images.qualities: [75, 85]`. |
| Introducción y textos de contenido | Párrafo con `clamp(16px,1.2vw,18px)`, interlineado 1.7. Es el tamaño de todo el texto corrido de la página: descripción de las tarjetas (negro `#1a1a1a`) y textos de beneficios (gris `#555`). Las viñetas de "Ver detalles" van un escalón abajo: 16 px fijo, gris `#555` |
| Títulos de sección | `h2` `clamp(28px,4vw,44px)` semibold, **sin etiqueta roja encima** (los modelos la llevan, las páginas de sección no) |
| Tarjetas con "Ver detalles" | `components/financiamiento/PlanCard.tsx` (nuevo): foto 3.5:1, `h3`, línea roja corta, texto y despliegue con viñetas. Solo usa valores de las tarjetas de "Modelos similares". |
| Franja gris de beneficios | `bg-toyota-gray`, 3 columnas (2 en tablet, 1 en móvil), ícono + `h3` + texto |
| Íconos de beneficios | `components/ui/IconoGenerico.tsx` solo marca la posición de un ícono aún no dibujado. Los definitivos se dibujan uno por uno con referencia de Raúl, mismo trazo (1.0), a 48 px en las franjas de beneficios y ventajas. |
| CTA | Sin franja de cierre (se quitó el 10 nov 2026: el negro se fundía con el pie de página). Cada tarjeta lleva un botón "Cotizar ahora" (`primary`, ancho completo, `text-base`: los botones del sitio solo usan 14 px o 16 px, nunca más) al final de sus viñetas, con `href="#"` hasta que exista el formulario |
| Separadores entre secciones blancas | La **línea fina gris** `border-t border-[#E8E8E8]` (de borde a borde) arriba de cada sección blanca que sigue a otra blanca, como en las páginas de modelo. En móvil, **línea roja corta** (28×2 px, la de las tarjetas) **centrada** entre el subtítulo del hero y el párrafo introductorio; en escritorio no se muestra. En el párrafo introductorio de los modelos, el relleno superior en móvil es 0 (`max-desktop:pt-0`): del botón del hero al párrafo quedan 44 px. |
| Breakpoint | `desktop:` / `max-desktop:` (880px), el del hero heredado, en toda la página. Para las páginas sin SectionHero rige la regla de la sección 1. |
| Textos | Editables en Sanity (documento único "Página: ..."), con regeneración cada 60 s (`revalidate = 60`). Imágenes opcionales en Sanity con placeholder local mientras no se suban. |

## 10. Cabecera, logo y menú móvil (10 de noviembre de 2026)

- **Altura de la cabecera:** 64 px en móvil y tableta (menos de 1280 px) y **80 px desde `xl:`**. Esa altura aparece en 4 lugares que hay que mover juntos: la cabecera, el contenedor del mega-menú, el `top` del mega-menú y el `pt` de `main` (`app/layout.tsx`).
- **Cambio de menú: `xl:` (1280 px)** (hasta el 10 nov 2026 era `lg:`, 1024 px). Menos de 1280 px: hamburguesa a la izquierda (✕ al abrir), logo centrado e ícono de teléfono a la derecha; desde 1280 px: logo, barra de 7 elementos con mega-menú, ícono de WhatsApp y botón "Cotizar". Motivo: con 7 elementos la barra completa no cabe por debajo de 1280 px (el contenedor `max-w-7xl` deja 1216 px a partir de ahí).
- **Panel del menú móvil:** pantalla completa bajo la cabecera (`top-16 bottom-0`), lista con scroll propio, zona fija al fondo con el botón rojo "Cotizar" y "Ventas" / "Servicio" en contorno (`secondary`, 16 px, con el ícono de WhatsApp de 26 px; sin la palabra "WhatsApp" porque a 375 px no cabe en una línea). `body` bloqueado mientras está abierto; cierra con ✕, Escape o al tocar un enlace. Filas con flecha, igual que las categorías del acordeón.
- **Logo:** SVG oficial en `public/images/logo/`. `toyota-cuautitlan-logo.svg` (fondo claro) en la cabecera, 32 px de alto en móvil y 40 px desde `xl:`; `toyota-cuautitlan-logo-blanco.svg` en el pie de página, 40 px. Los archivos fuente viven en la carpeta de trabajo `Logotipo/` (con el favicon). Nunca recrear el logo en texto.
- **Elementos del menú (10 nov 2026, 2.ª parte):** Modelos (mega menú), Promociones, Financiamiento (grupo: Planes y Arrendamientos, Seguros), Seminuevos (grupo: Comonuevos, Catálogo), Postventa (grupo), Protección extendida (enlace externo) y Contacto; una sola lista `ITEMS_MENU` en `Navbar.tsx` alimenta escritorio y móvil. Un elemento con `links` es un grupo sin página propia; uno con `href` es un enlace directo.
- **Tamaños de texto del menú de escritorio:** 15 px semibold en la barra, en los desplegables y en las categorías y nombres del mega menú (lo que se despliega no es más grande que su encabezado); precio del mega menú 14 px; etiquetas del desplegable de WhatsApp 13 px; "Cotizar" 16 px (botón). Menú móvil 16 px. Separación entre elementos 24 px (`gap-6`). Mega menú: filas de categoría `py-6` (unos 72 px, como toyota.mx), columna de categorías de 300 px, tarjetas con `gap-x-6 gap-y-8`.
- **WhatsApp:** en escritorio, solo el ícono `whatsapp` de la familia (línea roja, 30 px; texto "WhatsApp" oculto para lectores de pantalla) junto a "Cotizar", con desplegable de Ventas y Servicio (número en 15 px semibold, etiqueta pequeña con el ícono de 17 px). Los números viven en dos constantes de `Navbar.tsx` (`WHATSAPP_VENTAS_NUMERO`, `WHATSAPP_SERVICIO_NUMERO`) hasta que exista el documento `configuracion`. Se evaluó el logo verde de WhatsApp (`#25D366`) y se descartó: el rojo de línea se ve más integrado; no hay excepción de color verde en el sistema.
- **Enlaces externos:** todo enlace que sale del sitio se abre en otra pestaña (`target="_blank"`, `rel="noopener noreferrer"`) y lleva la flecha ↗ (`components/ui/IconoExterno.tsx`, `currentColor`, con texto oculto "se abre en una pestaña nueva"); en el menú móvil la flecha reemplaza al chevron. Las URL externas viven en `lib/enlaces.ts`. Hoy: Protección extendida (menú y pie de página).
- **Favicon:** `app/favicon.ico`, `app/icon.png` (512) y `app/apple-icon.png` (180), generados de `Logotipo/favicon.png`.
- **Imagen para compartir (Open Graph):** `public/images/toyota-cuautitlan-compartir.jpg`, 1200×630, JPG de menos de 300 KB, sin precios, años ni teléfonos (logo + fachada + "Pasión por servir."). Se declara en `app/layout.tsx`; las páginas de modelo usan la foto de tarjeta del modelo. Mientras el dominio propio no apunte a este sitio, la URL absoluta usa el dominio de Vercel (ver comentario en `layout.tsx`).

## 11. Sección Servicio: Precios de servicio (10 de noviembre de 2026)

Reglas acordadas con Raúl para las tablas de precios (`components/postventa/`, `app/postventa/precios/page.tsx`); sirven de base para cualquier tabla de precios futura.

- **Precio estándar:** **18 px en escritorio y 16 px en móvil**, semibold, rojo `#EB0A1E`. Igual en las tablas de kilometrado y en las tarjetas de frenos (no mezclar tamaños).
- **Kilometraje / intervalo:** peso normal (400), 16 px; los encabezados y los precios van en negritas (600).
- **Encabezados de tabla:** el de kilometrado queda solo para lectores de pantalla (`sr-only`); a la vista, el título de la tabla ("Servicio kilometrado en miles") y las notas dicen el resto. Las tarjetas de frenos no llevan encabezado. La moneda y el I.V.A. van en las notas y excepciones de cada sección.
- **Notas y excepciones:** un solo desplegable por sección, **"Ver notas y excepciones"** (botón rojo 15 px, cerrado por defecto, panel gris a todo el ancho con viñetas rojas, texto de 14 px). No hay listas de notas visibles ni línea de vigencia en la parte principal del bloque. Las notas compartidas por varios modelos van una sola vez, al final del bloque.
- **Filas de modelo:** kilometrado a la izquierda, frenos a la derecha, notas debajo; apiladas en móvil y tableta (menos de 880 px). Es automático para cualquier bloque que tenga tabla de kilometrado y de frenos. El renglón de detalle bajo el título de tabla solo se reserva si la tabla vecina lo trae.
- **Tarjetas de frenos:** 4 por fila desde 1280 px, 3 entre 880 y 1279 px, 2 en móvil (cada una de unos 166 px a 375 px, con 12 px de relleno lateral en móvil); un grupo largo de modelos puede ocupar dos columnas. El precio queda alineado abajo aunque los títulos tengan distinto largo.
- **Accesos rápidos:** una caja por bloque con el estilo de los filtros del catálogo (borde gris fino, texto 14 px semibold, hover rojo), **de esquinas rectas** (10 nov 2026). A la derecha en escritorio, y debajo en móvil, va el botón `primary` "Agenda tu cita de servicio".
- **Probado y descartado:** limitar el ancho de la tabla de kilometrado y ponerla junto a los frenos; convertir los frenos en tabla con encabezado de dos niveles (no convenció, se revirtió).
- **Franjas de cita:** dos franjas rojas con botón blanco (copia de la CTA intermedia de los modelos), una en medio (después de los dos primeros bloques) y otra al final, antes del pie. No se usa la franja negra al final (se funde con el pie oscuro) ni botones sueltos sobre fondo blanco (se ven aislados). Textos en Sanity (grupo "Franjas de cita"); sin prometer confirmaciones ni procesos no definidos. Es el componente compartido `components/ui/FranjaCta.tsx`; también cierra Planes y Arrendamientos (12 nov 2026, grupo "Franja final" en Sanity, "¿No sabes qué plan elegir?").
- **Tarjeta de frenos sin nombre de modelo** (filas de modelo): sin relleno superior (9 px sobre "4 ruedas", 17 px abajo); con nombre, el relleno de siempre.
- **Menú:** "Postventa" (antes "Servicio"; desde el 10 nov 2026 las URL son `/postventa/…`) y "Financiamiento" (con Planes y Arrendamientos y Seguros, URL `/financiamiento/…`) son grupos sin página propia; lista `ITEMS_MENU` en `Navbar.tsx`, desplegable sencillo en escritorio (`GrupoEscritorio`) y acordeón en móvil (`GrupoMobileAccordion.tsx`). Subtítulo del hero: máximo unos 31 caracteres por renglón (contenedor de 340 px).

## 12. Sección Postventa: Refacciones (10 de noviembre de 2026)

`app/postventa/refacciones/page.tsx`. Hero heredado (`SectionHero`, imágenes en `public/images/postventa/refacciones-hero-*.webp`), texto de invitación (primera frase en semibold), luego **"Cotiza tus refacciones"** con dos tarjetas de contacto y al final la franja gris **"Por qué elegir refacciones originales"**. Orden acordado con Raúl: el contacto va justo después del texto que invita a escribir o llamar, y las ventajas cierran como refuerzo (antes iban primero y el contacto quedaba lejos).

- **Tarjetas de contacto:** `border border-[#E8E8E8]`, sin sombra ni redondeo; ícono de 48 px arriba (`telefono` / `whatsapp`), título 18 px semibold, número en rojo (`clamp(24px,3vw,32px)`), texto de apoyo y botón a todo el ancho (los dos `primary`, en rojo: son canales de igual peso, 10 nov 2026). El ícono va arriba y no junto al número a propósito: sigue el patrón de las franjas de beneficios y evita un tamaño más.
- **Ventajas:** 4 columnas (2×2 en tableta, 1 en móvil), mismo patrón que los beneficios de Financiamiento (icono 48 px, título 18 px, texto `clamp(16px,1.2vw,18px)`), título del `h2` sin tope de ancho para que quepa en una línea en escritorio.
- **Datos:** todo se edita en Sanity (documento único "Página: Refacciones", `revalidate = 60`). Las tarjetas se definen por `tipo` (Teléfono o WhatsApp) y un número de 10 dígitos; el sitio arma el formato, el enlace, el ícono y el estilo del botón. **Pendiente:** los números siguen siendo ficticios (`55 0000 0000`); ponerlos reales en el Studio, pestaña Contacto.

## 13. Sección Seguros (11 de noviembre de 2026)

`app/financiamiento/seguros/page.tsx`. Mismo patrón que Refacciones: hero heredado (`SectionHero`; las imágenes vigentes viven en Sanity y `public/images/seguros/` es el respaldo), párrafo de invitación con la primera frase en semibold, franja gris de 4 ventajas con ícono de 48 px, **"Qué cubre tu seguro"** y cierre.

- **Tarjetas de coberturas (patrón nuevo de lectura):** 3 tarjetas con `border border-[#E8E8E8]`, sin sombra ni redondeo, relleno `p-8` (`p-6` en móvil). Cada una lleva su título (`h3`, `clamp(20px,2.5vw,26px)` semibold, con la línea roja corta debajo) y la lista de coberturas: nombre (`h4`, 18 px semibold, primer uso de `h4` en el sitio) y explicación (`clamp(16px,1.2vw,18px)`, gris `#555`), separadas por una línea fina `border-t border-[#E8E8E8]`. 3 columnas en escritorio y 1 columna desde 880 px hacia abajo (a 900 px las tarjetas quedan estrechas pero legibles). Debajo, una nota chica opcional (16 px, gris `#555`) sobre condiciones de la póliza.
- **Agrupación:** las 12 coberturas se agrupan en 3 tarjetas de 4 (Tu Toyota; Tus ocupantes y terceros; Apoyo cuando lo necesitas) para no mostrar una lista larga. Sin un ícono por cobertura (evita 12 íconos nuevos).
- **Cierre:** franja gris (`bg-toyota-gray`) con título y texto a la izquierda y el botón `primary` a la derecha (en móvil se apilan y el botón ocupa el ancho completo). Sin franja negra, igual que el resto de las secciones.
- **Datos:** todo se edita en Sanity (documento único "Página: Seguros", `paginaSeguros`). Las ventajas llevan ícono elegible, los grupos y las coberturas son listas ordenables y la nota es opcional. El campo `cierreEnlace` define el destino del botón; mientras esté vacío el botón apunta a `#` (destino por definir, 11 nov 2026).

## 14. Sección Comonuevos (12 de noviembre de 2026)

`app/seminuevos/comonuevos/page.tsx`. Mismo patrón de sección: hero heredado (`SectionHero`, imágenes en `public/images/comonuevos/`), párrafo de introducción con la primera frase en semibold (sin logo: junto al título se leía el nombre dos veces) y franjas alternadas blanco/gris.

- **Ventajas con imagen (patrón nuevo):** franja gris con 3 columnas (1 en móvil); cada una lleva una imagen de **800 × 450 px** (WebP, 16:9; `sizes` 400 px en escritorio y 100vw en móvil), un `h3` y un texto. Es la variante con foto de la franja de ventajas con ícono; las columnas quedan del mismo alto. Los nombres siguen `comonuevos-ventaja-<tema>.webp`.
- **Requisitos:** 4 íconos de 48 px (4 columnas, 2 en tablet, 1 en móvil), mismo patrón que las ventajas de Seguros.
- **Inspección:** franja gris con tres tarjetas (`border border-[#E8E8E8]`, `p-8`, línea roja corta bajo el `h3`, puntos con `h4` y filete fino), como las coberturas de Seguros. El encabezado usa la cuadrícula de 3 columnas y 24 px de separación de las tarjetas: título y texto en las dos primeras y el **logo de Comonuevos centrado sobre la tercera** (56 px de alto en escritorio; **centrado y de 48 px arriba del título en móvil**). Es el único lugar de la página donde va el logo como elemento propio (también aparece en la placa del auto del hero).
- **Logo:** `public/images/comonuevos/comonuevos-logo.svg`, solo `viewBox`, rutas planas, rojo `#EB0A1E` (el del sitio) y texto negro, fondo transparente. Se carga con `next/image`, como el logo de la cabecera.
- **Cierre:** "¿Qué quieres hacer?" con dos tarjetas (borde, línea roja corta) y un botón `primary` de ancho completo en cada una, hoy a `#` (destino por definir).
- **Datos:** todo se edita en Sanity (documento único "Página: Comonuevos", `paginaComonuevos`, desde el 12 nov 2026): portada, ventajas (con imagen opcional), requisitos (con ícono elegible), grupos de inspección y tarjetas del cierre con el destino de cada botón (`enlace`, opcional; vacío = `#`). El logo y la cuadrícula viven en el código.

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
    muestras sin terminar** (ver `formularios-del-sitio.md`
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
- **Segunda pasada, mismo día:** Raúl notó que la caja de la tabla de
  Transmisión/Rendimiento en página de modelo (`bg-toyota-gray rounded-md`)
  era la única esquina redondeada de esa página — corregida (quitado
  `rounded-md`, sincronizado en `app/modelos/[slug]/page.tsx` y
  `preview-borrador`). Al revisar, se encontró que **el resto de páginas
  del sitio (home, `/promociones`, `/cotizacion`, `/contacto`,
  `/cita-de-servicio`) tampoco seguían el documento** — mismo patrón que
  Navbar/ModeloCard: hex directo, `hover:bg-red-700`, tarjetas
  `rounded-lg`/`shadow-sm`/`border-gray-100`. Homologadas todas: botones
  reales migrados a `<Button>`, tarjetas a `border border-[#E8E8E8]` sin
  sombra ni redondeo, textos de `#EB0A1E`/`#1A1A1A` a `text-toyota-red`/
  `text-foreground`. Verificado visualmente en las 5 páginas antes de
  subir. **No se tocó:** los `rounded-full` de pills/badges/indicadores (los filtros de categoría del catálogo y los accesos rápidos de Precios de servicio dejaron de ser pills el 10 nov 2026: hoy son rectos)
  circulares (etiqueta de promoción, bullets de lista, flechas de
  carrusel) — es una convención distinta (chips/indicadores), no la
  esquina recta de botones y tarjetas que sí se documentó aquí; tampoco
  los inputs de los formularios de muestra (mismo criterio que la entrada
  anterior).
- **Tercera pasada, 21 de septiembre de 2026:** cerrado el pendiente de la
  entrada anterior — el panel del mega-menú de "Modelos" en el Navbar
  (`Navbar.tsx`, `ModelosMegaMenu.tsx`, `ModelosMobileAccordion.tsx`)
  también usaba `rounded-lg`/`rounded` en el panel desktop y en las
  miniaturas de modelo (desktop y móvil), además de hex directo
  (`#EB0A1E`/`#1A1A1A`) en varios textos del propio Navbar que no se
  habían tocado en la primera pasada (logo, links de "Modelos"/nav,
  botón de hamburguesa). Corregido: sin esquinas redondeadas, colores por
  token. El `shadow-xl` del panel del mega-menú **sí se dejó** — a
  diferencia de una tarjeta en el flujo normal de la página, es un panel
  flotante superpuesto al contenido, y ahí la sombra cumple una función
  real (separarlo visualmente de lo que hay debajo), no es decoración
  redundante. Verificado en desktop (hover del mega-menú) y móvil
  (acordeón).
- **Cuarta pasada, mismo día — barrido final de todo el repo:** Raúl
  preguntó si ya estaba toda la documentación de diseño al día; en vez de
  asumirlo, se volvió a hacer `grep` de hex directo/rounded en `app/` y
  `components/` completos (no solo lo ya tocado) y aparecieron 2 archivos
  sin pasar por ninguna ronda anterior: **`Footer.tsx`** (fondo y logo con
  hex directo) y **`app/modelos/page.tsx`** (título y pills de filtro de
  categoría con hex directo). Ninguno tenía esquinas mal usadas — el
  catálogo solo usa `rounded-full` en los pills de filtro, que entonces era la
  convención aceptada de chip (desde el 10 nov 2026 son rectos). Corregido: `bg-[#1A1A1A]` → `bg-toyota-dark`,
  `text-[#EB0A1E]` → `text-toyota-red`, `text-[#1A1A1A]` → `text-foreground`.
  Verificado por estilos computados (`getComputedStyle`) en vez de captura
  de pantalla — el panel del navegador estaba oculto ese turno — mismos
  valores de color exactos que antes (`rgb(26,26,26)`/`rgb(235,10,30)`),
  cero cambio visual. **Con esta pasada, un `grep` de `#EB0A1E`/`#1A1A1A`/
  `hover:bg-red-700`/`rounded-lg`/`shadow-sm`/`border-gray-100` sobre todo
  `app/`+`components/` ya no encuentra nada fuera de las excepciones
  documentadas arriba** (formularios de muestra, chips `rounded-full`,
  overlay del mega-menú).
