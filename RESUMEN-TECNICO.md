# Resumen Técnico — Proyecto Toyota Cuautitlán

**Fecha del reporte:** 20 de agosto de 2026 · **Última actualización:** 22 de agosto de 2026
**Propósito:** documento de referencia para cualquier persona que se integre al proyecto — no asume contexto previo.

**Alcance de este documento (reorganizado 22 de agosto de 2026):** aquí solo vive lo que es relativamente **estable** — qué es cada plataforma, cómo se relacionan, cómo se da de alta un colaborador, dónde están las variables de entorno. Todo lo que **cambia con el tiempo** (qué está hecho, qué falta, estado de accesos de cada persona, próximos pasos) vive en `PROYECTO.md` (checklist) y `CHANGELOG.md` (historial) — este documento los referencia en vez de repetirlos, para no tener que mantener la misma información sincronizada en varios lugares a la vez.

---

## 1 · Repositorio de código

| Dato | Valor |
|---|---|
| Plataforma | GitHub |
| Nombre exacto del repositorio | `moleculaworks/toyotacuautitlan` |
| URL | https://github.com/moleculaworks/toyotacuautitlan |
| Cuenta dueña | `moleculaworks` — cuenta personal de GitHub, no una organización |
| Rama principal | `main` — la única que se despliega. Se crean ramas por tarea temporalmente (ver `AGENTS.md` para el flujo completo), pero se fusionan a `main` y no quedan como ramas activas de desarrollo paralelo |
| Visibilidad | Privado |

---

## 2 · Publicación del sitio (hosting)

| Dato | Valor |
|---|---|
| Plataforma | Vercel |
| URL pública actual | https://toyotacuautitlan.vercel.app |
| Workspace/equipo en Vercel | "Molécula" |
| Plan | Hobby (gratuito) |
| Conexión | Importado directo desde el repositorio de GitHub — cada `git push` a `main` dispara un deploy automático en Vercel, sin pasos manuales |
| Dominio propio | `toyotacuautitlan.com.mx` — pospuesto a propósito hasta terminar el desarrollo completo del sitio (ver `PROYECTO.md`) |

**Importante:** no existe una carpeta `.vercel` en el proyecto local — el vínculo con Vercel se hizo desde el dashboard web, no desde el CLI. Cualquier cambio de configuración de Vercel (variables de entorno, dominio, etc.) debe hacerse desde vercel.com, no desde este repositorio.

---

## 3 · Estructura del proyecto

**Framework:** Next.js 16 (App Router) con React 19 y TypeScript. Estilos con Tailwind CSS 4.

Next.js es un framework para construir sitios web donde las páginas se generan en el servidor antes de llegar al navegador (esto ayuda a que carguen rápido y a que Google las indexe bien). El "App Router" es el sistema de rutas actual de Next.js: cada carpeta dentro de `app/` se convierte automáticamente en una URL del sitio.

### Carpetas principales

```
toyotacuautitlan/
├── app/                    → Cada carpeta = una página del sitio (App Router de Next.js)
│   ├── page.tsx            → Homepage (/)
│   ├── modelos/
│   │   ├── page.tsx        → Catálogo (/modelos)
│   │   ├── corolla/        → Página específica del Corolla (/modelos/corolla)
│   │   └── [slug]/         → Plantilla genérica para cualquier otro modelo (/modelos/lo-que-sea)
│   ├── cotizacion/         → Formulario de cotización
│   ├── cita-de-servicio/   → Formulario de cita
│   ├── contacto/           → Página de contacto
│   ├── promociones/        → Listado de promociones
│   ├── studio/              → Panel de edición de contenido (Sanity Studio embebido)
│   ├── api/                → Endpoints que reciben los formularios (cotización, cita)
│   ├── fonts/               → Archivos de la tipografía de marca (ToyotaType)
│   └── fonts.ts             → Carga la fuente de marca una sola vez, aplicada a todo el sitio en layout.tsx
│
├── components/              → Piezas de interfaz reutilizables
│   ├── layout/               → Navbar y Footer (aparecen en todas las páginas)
│   ├── forms/                → Formularios de cotización y cita
│   ├── ui/                   → Piezas pequeñas reutilizables (tarjeta de modelo, íconos de marca)
│   └── corolla/               → Componentes interactivos específicos de la página del Corolla
│                                 (carrusel de versiones, selector de color, galería)
│
├── lib/                     → Lógica que no es visual
│   ├── sanity/                → Conexión y consultas al CMS (Sanity)
│   ├── validations/           → Reglas de validación de los formularios (con Zod)
│   └── data/                  → Solo "modelos similares" del Corolla (fallback, pendiente migrar a Sanity)
│
├── sanity/                  → Configuración del CMS: qué tipo de contenido existe
│   └── schemaTypes/            → Define los "moldes" de contenido: Modelo, Promoción, Configuración
│
├── types/                   → Definiciones de TypeScript (la forma que deben tener los datos)
│
└── public/                  → Archivos estáticos servidos tal cual (imágenes, etc.)
```

**Cómo se relaciona todo:** las páginas en `app/` piden datos usando las funciones de `lib/sanity/`, que a su vez consultan el contenido cargado en el Sanity Studio (`sanity/`). Los formularios en `components/forms/` usan las reglas de `lib/validations/` y, al enviarse, llaman a los endpoints en `app/api/`. Ancho de página, colores y tipografía siguen la referencia en `SISTEMA-DE-DISENO.md`.

---

## 4 · Imágenes y archivos pesados

**No se usa ningún servicio externo de almacenamiento** (no hay Cloudinary, S3, R2, ni Vercel Blob). Todas las imágenes viven en **Sanity**, que tiene su propio sistema de almacenamiento incluido:

- **Imágenes de contenido general** (banners, fotos que carga el equipo desde el panel de edición) se suben directo desde el Studio, sin tocar código.
- **Imágenes de cada modelo** (hero, versiones, visor 360°, galerías) también viven en Sanity, subidas como assets del documento `modelo` correspondiente. El código las consume desde ahí vía `next/image`.

**No hay que subir imágenes de modelos al repositorio de GitHub** — ese patrón se usó al inicio para el Corolla y se abandonó por no escalar a los 20 modelos (ver `CHANGELOG.md`, 21 de agosto de 2026, para el detalle de esa migración).

**PDFs u otros archivos:** no hay ningún PDF ni video alojado en el proyecto todavía (ej. la ficha técnica de cada modelo, aún no existe como archivo — ver `PROYECTO.md`).

---

## 5 · Base de datos

**Sí, el proyecto usa una base de datos: Sanity.**

Sanity no es una base de datos tradicional tipo Postgres — es un **CMS headless** (gestor de contenido sin interfaz visual propia) que internamente guarda todo como documentos estructurados, con una API para consultarlos. En este proyecto se usa tanto para editar contenido como fuente única de datos.

| Dato | Valor |
|---|---|
| Servicio | Sanity |
| Project ID | `tuhugumb` |
| Dataset | `production` |
| Cuenta dueña | Cuenta de Google `moleculaworks` (login inicial vía `npx sanity login --provider google`) |
| Tipos de contenido definidos | `modelo`, `promocion`, `configuracion` — el detalle completo de campos de cada uno vive en `sanity/schemaTypes/`, no se duplica aquí para no desincronizarse |
| Panel de edición | `toyotacuautitlan.vercel.app/studio` — ahí el equipo comercial edita el contenido sin tocar código |

**Todo el contenido de un modelo vive en Sanity, no en código** — versiones, precios, colores + visor 360°, hero, año, categoría, textos de cada sección, íconos de la barra de datos destacados, SEO. `lib/data/corolla.ts` es la única excepción que sigue viva en código, y solo para `modelosSimilares` (pendiente a propósito, ver `PROYECTO.md`). Este es el patrón a replicar en los demás modelos.

---

## 6 · Función de cada plataforma

| Plataforma | Rol en el flujo del sitio |
|---|---|
| **GitHub** | Guarda el código fuente y su historial de cambios. Es el punto de partida de todo: cualquier cambio de código empieza aquí. |
| **Vercel** | Toma el código de GitHub, lo construye y lo publica en internet. Cada vez que se sube un cambio a la rama `main`, Vercel genera una nueva versión pública automáticamente — no hay que "subir archivos" a mano. |
| **Sanity (CMS)** | Guarda todo el contenido editable, incluyendo el de los modelos, y sus imágenes asociadas. El equipo comercial entra al Studio, edita, y el cambio aparece en el sitio público sin necesidad de tocar código ni volver a desplegar nada. |

**Flujo completo, de la edición a la publicación:**

- **Si el cambio es de contenido** (precio, promoción, teléfono): equipo comercial → entra al Studio (`/studio`) → edita y publica → el cambio aparece en el sitio al instante, sin pasar por GitHub ni Vercel.
- **Si el cambio es de código** (una nueva página, un ajuste visual, un componente nuevo): se edita el código → se sube a GitHub (`git push`) → Vercel detecta el cambio, reconstruye el sitio automáticamente → en 2-3 minutos el cambio está en línea.

---

## 7 · Accesos necesarios para un nuevo colaborador

Dependiendo de qué vaya a hacer esa persona, estos son los accesos posibles:

| Cuenta / plataforma | ¿Para qué se necesita? | ¿Imprescindible? |
|---|---|---|
| **GitHub** (`moleculaworks/toyotacuautitlan`) | Para leer, modificar y subir código | Sí, si va a programar |
| **Vercel** (workspace "Molécula") | Para ver despliegues, logs de errores, y configurar variables de entorno o el dominio | Sí, si va a hacer debugging de producción o configurar el dominio |
| **Sanity** (proyecto `tuhugumb`) | Para editar contenido desde el Studio, o para cambiar la estructura de los tipos de contenido | Depende: si solo va a cargar modelos/promociones, con rol de **Editor** basta; si va a modificar los schemas (código), necesita ser desarrollador con acceso al repo |
| **Dominio `toyotacuautitlan.com.mx`** (DNS/registrador) | Solo si va a conectar el dominio a Vercel | Solo si le toca esa tarea específica |

**No aplica / no existe todavía:** no hay cuentas de CRM conectadas, no hay servicio de almacenamiento externo, no hay base de datos aparte de Sanity, no hay ninguna otra integración de terceros (analytics, pagos, etc.) — ver `PROYECTO.md` para el estado de esos pendientes.

**Estado de accesos de cada colaborador:** ver la sección "Equipo" en `PROYECTO.md` — es la que se mantiene al día, para no tener dos lugares tratando de responder la misma pregunta.

---

## 8 · Proceso para sumar un nuevo colaborador

**Primero decidir:** ¿va a programar directamente, o solo va a cargar contenido en Sanity? Eso cambia todo el orden de los pasos.

### Si solo va a cargar contenido (el caso más simple)

1. Invitarlo desde **sanity.io/manage** → proyecto `tuhugumb` → Members → Invite → asignarle rol **Editor**.
2. Compartirle la URL `toyotacuautitlan.vercel.app/studio` (o el dominio propio cuando esté conectado).
3. Listo — no necesita GitHub, no necesita instalar nada, no toca código.

### Si va a programar

1. **Invitarlo a GitHub primero**, con permiso de escritura sobre el repositorio. Sin esto no puede ni clonar ni subir cambios.
2. **Explicarle el flujo de trabajo acordado** — ver `AGENTS.md`, que es la fuente de verdad de ese flujo (rama por tarea + `git pull` antes de empezar + registro en `CHANGELOG.md`, sin Pull Request con aprobación obligatoria). No repetir las reglas aquí para no desincronizarse.
3. **Compartir el archivo `.env.local`** (ver sección 9) por un canal seguro — no por chat abierto ni email. Sin este archivo, el proyecto no corre en su máquina.
4. **Que clone el repositorio y corra `npm install`** para instalar las dependencias, y `npm run dev` para levantar el proyecto en su computadora.
5. **Darle acceso a Vercel** (como mínimo para ver los despliegues y logs; solo si va a tocar configuración, darle permisos de administrador del proyecto).
6. **Que lea `PROYECTO.md`** — el checklist completo de qué está hecho y qué falta, para que no reinvente ni repita trabajo ya resuelto. Ahí también se le asigna explícitamente una sección para evitar que dos personas trabajen en lo mismo sin saberlo.

---

## 9 · Variables de entorno o llaves necesarias

El proyecto usa un archivo `.env.local` en la raíz, que **no está subido a GitHub** (excluido vía `.gitignore`, para que las llaves no queden públicas en el historial del repositorio).

Contenido actual de ese archivo:

```
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_PROJECT_ID="tuhugumb"
```

Estos dos valores **no son secretos** (el prefijo `NEXT_PUBLIC_` significa que quedan visibles en el navegador de cualquier visitante del sitio), pero sin ellos el proyecto no puede conectarse a Sanity y no correrá localmente ni en Vercel.

**Cómo compartirlo con un nuevo colaborador:** copiar y pegar ese mismo contenido en un archivo nuevo llamado `.env.local` dentro de la raíz del proyecto en su máquina (no existe automáticamente al clonar, hay que crearlo a mano cada vez).

**No hay ninguna otra llave secreta en este momento** — no hay API keys de CRM, no hay tokens de pago, no hay credenciales de terceros. El día que se conecte un CRM o cualquier otro servicio, ese será el momento de empezar a manejar variables verdaderamente sensibles, y ahí sí será clave no compartirlas por canales inseguros.
