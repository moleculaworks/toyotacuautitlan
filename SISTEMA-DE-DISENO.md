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
