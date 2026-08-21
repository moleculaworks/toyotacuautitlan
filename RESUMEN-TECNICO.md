# Resumen Técnico — Proyecto Toyota Cuautitlán

**Fecha del reporte:** 20 de agosto de 2026
**Propósito:** documento de referencia completo para cualquier persona que se integre al proyecto — no asume contexto previo.

---

## 1 · Repositorio de código

| Dato | Valor |
|---|---|
| Plataforma | GitHub |
| Nombre exacto del repositorio | `moleculaworks/toyotacuautitlan` |
| URL | https://github.com/moleculaworks/toyotacuautitlan |
| Cuenta dueña | `moleculaworks` |
| Rama principal | `main` (única rama en uso; no hay ramas de desarrollo separadas) |
| Visibilidad | Privado |

**A confirmar:** si `moleculaworks` es una cuenta personal o una organización de GitHub, y quién tiene el rol de "Owner" — eso determina quién puede otorgar accesos a terceros. Se debe verificar directamente en la configuración de GitHub antes de invitar a nadie.

---

## 2 · Publicación del sitio (hosting)

| Dato | Valor |
|---|---|
| Plataforma | Vercel |
| URL pública actual | https://toyotacuautitlan.vercel.app |
| Workspace/equipo en Vercel | "Molécula" (creado durante el alta del proyecto) |
| Plan | Hobby (gratuito) |
| Conexión | Importado directo desde el repositorio de GitHub — cada `git push` a `main` dispara un deploy automático en Vercel, sin pasos manuales |
| Dominio propio | `toyotacuautitlan.com.mx` — **aún no conectado**, es un pendiente del proyecto |

**Importante:** no existe una carpeta `.vercel` en el proyecto local, lo que significa que el vínculo con Vercel se hizo desde el dashboard web (no desde la terminal con el CLI de Vercel). Cualquier cambio de configuración de Vercel (variables de entorno, dominio, etc.) debe hacerse desde vercel.com, no desde este repositorio.

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
│   └── fonts/               → Archivos de la tipografía de marca (ToyotaType)
│
├── components/              → Piezas de interfaz reutilizables
│   ├── layout/               → Navbar y Footer (aparecen en todas las páginas)
│   ├── forms/                → Formularios de cotización y cita
│   ├── ui/                   → Piezas pequeñas reutilizables (ej. tarjeta de modelo)
│   └── corolla/               → Componentes interactivos específicos de la página del Corolla
│                                 (carrusel de versiones, selector de color, galería)
│
├── lib/                     → Lógica que no es visual
│   ├── sanity/                → Conexión y consultas al CMS (Sanity)
│   ├── validations/           → Reglas de validación de los formularios (con Zod)
│   └── data/                  → Datos específicos del Corolla (precios, versiones, colores)
│
├── sanity/                  → Configuración del CMS: qué tipo de contenido existe
│   └── schemaTypes/            → Define los "moldes" de contenido: Modelo, Promoción, Configuración
│
├── types/                   → Definiciones de TypeScript (la forma que deben tener los datos)
│
└── public/                  → Archivos estáticos servidos tal cual (imágenes, etc.)
```

**Cómo se relaciona todo:** las páginas en `app/` piden datos usando las funciones de `lib/sanity/`, que a su vez consultan el contenido cargado en el Sanity Studio (`sanity/`). Los formularios en `components/forms/` usan las reglas de `lib/validations/` y, al enviarse, llaman a los endpoints en `app/api/`.

---

## 4 · Imágenes y archivos pesados

**No se usa ningún servicio externo de almacenamiento** (no hay Cloudinary, S3, R2, ni Vercel Blob). Las imágenes viven en dos lugares distintos, según su origen:

1. **Imágenes de contenido general** (banners, fotos que carga el equipo desde el panel de edición): se guardan dentro de **Sanity**, que tiene su propio sistema de almacenamiento de imágenes incluido. Se suben directo desde el Studio, sin tocar código.

2. **Imágenes del sitio piloto del Corolla** (las 138 imágenes actuales, incluyendo el visor 360°): están guardadas dentro de la carpeta `public/images/` **del propio repositorio de GitHub**, y pesan actualmente 7.5 MB en total. Este es un método válido para el volumen actual, pero **no escala bien**: si se repite este patrón con los 19 modelos restantes (cada uno con su set de 360°, galería, etc.), el repositorio de GitHub puede crecer a cientos de MB, lo que hace más lento clonar el proyecto y cada despliegue.

**Recomendación a evaluar antes de escalar a más modelos:** mover las imágenes de los modelos también a Sanity (que ya está integrado) o a un servicio de almacenamiento dedicado, en vez de seguir el patrón del repositorio para todo.

**PDFs u otros archivos:** no hay ningún PDF ni video alojado en el proyecto todavía (ej. la ficha técnica del Corolla, mencionada en pendientes, aún no existe como archivo).

---

## 5 · Base de datos

**Sí, el proyecto usa una base de datos: Sanity.**

Sanity no es una base de datos tradicional tipo Postgres — es un **CMS headless** (gestor de contenido sin interfaz visual propia) que internamente guarda todo como documentos estructurados, con una API para consultarlos. En este proyecto se usa tanto para editar contenido como fuente única de datos.

| Dato | Valor |
|---|---|
| Servicio | Sanity |
| Project ID | `tuhugumb` |
| Dataset | `production` |
| Cuenta dueña | La cuenta de Google con la que se hizo login (`npx sanity login --provider google`) durante la configuración inicial — **a confirmar cuál cuenta de Google específica**, para saber quién es el administrador |
| Tipos de contenido definidos | `modelo` (nombre, precio, categoría, imágenes, características, SEO), `promocion` (título, vigencia, modelo relacionado), `configuracion` (teléfono, WhatsApp, dirección, horario, redes sociales, banners de homepage) |
| Panel de edición | `toyotacuautitlan.vercel.app/studio` — ahí el equipo comercial edita el contenido sin tocar código |

**Nota aparte:** los datos específicos del Corolla (versiones, precios, colores, rutas de imágenes del 360°) **no** están en Sanity todavía — viven como código fijo en el archivo `lib/data/corolla.ts`. Es la página piloto y aún no se migró ese contenido al CMS. Cuando se replique el patrón a los demás modelos, hay que decidir si ese tipo de dato pasa a Sanity o se queda como código.

---

## 6 · Función de cada plataforma

| Plataforma | Rol en el flujo del sitio |
|---|---|
| **GitHub** | Guarda el código fuente y su historial de cambios. Es el punto de partida de todo: cualquier cambio de código empieza aquí. |
| **Vercel** | Toma el código de GitHub, lo construye y lo publica en internet. Cada vez que se sube un cambio a la rama `main`, Vercel genera una nueva versión pública automáticamente — no hay que "subir archivos" a mano. |
| **Sanity (CMS)** | Guarda el contenido editable (modelos, promociones, configuración del sitio) y las imágenes asociadas a ese contenido. El equipo comercial entra al Studio, edita, y el cambio aparece en el sitio público sin necesidad de tocar código ni volver a desplegar nada. |
| **Repositorio de GitHub (carpeta `public/`)** | Guarda las imágenes específicas de la página piloto del Corolla (fotos, visor 360°). A diferencia de Sanity, estas imágenes solo cambian si alguien edita código y hace un nuevo `push`. |

**Flujo completo, de la edición a la publicación:**

- **Si el cambio es de contenido** (precio, promoción, teléfono): equipo comercial → entra al Studio (`/studio`) → edita y publica → el cambio aparece en el sitio al instante, sin pasar por GitHub ni Vercel.
- **Si el cambio es de código** (una nueva página, un ajuste visual, un componente nuevo): se edita el código → se sube a GitHub (`git push`) → Vercel detecta el cambio, reconstruye el sitio automáticamente → en 2-3 minutos el cambio está en línea.

---

## 7 · Accesos necesarios para un segundo colaborador

Dependiendo de qué vaya a hacer esa persona, estos son los accesos posibles:

| Cuenta / plataforma | ¿Para qué se necesita? | ¿Imprescindible? |
|---|---|---|
| **GitHub** (`moleculaworks/toyotacuautitlan`) | Para leer, modificar y subir código | Sí, si va a programar |
| **Vercel** (workspace "Molécula") | Para ver despliegues, logs de errores, y configurar variables de entorno o el dominio | Sí, si va a hacer debugging de producción o configurar el dominio |
| **Sanity** (proyecto `tuhugumb`) | Para editar contenido desde el Studio, o para cambiar la estructura de los tipos de contenido | Depende: si solo va a cargar modelos/promociones, con rol de **Editor** basta; si va a modificar los schemas (código), necesita ser desarrollador con acceso al repo |
| **Dominio `toyotacuautitlan.com.mx`** (DNS/registrador) | Solo si va a conectar el dominio a Vercel | Solo si le toca esa tarea específica |

**No aplica / no existe todavía:** no hay cuentas de CRM conectadas (Zeenvia, Seekop, SaleU siguen como pendiente), no hay servicio de almacenamiento externo, no hay base de datos aparte de Sanity, no hay ninguna otra integración de terceros (analytics, pagos, etc.) en este momento.

---

## 8 · Proceso recomendado para sumar al segundo colaborador

**Antes que nada — decisión de Beto:** definir si el segundo colaborador va a programar directamente, o solo va a cargar contenido en Sanity. Eso cambia todo el orden de los pasos.

### Si solo va a cargar contenido (el caso más simple)

1. Invitarlo desde **sanity.io/manage** → proyecto `tuhugumb` → Members → Invite → asignarle rol **Editor**.
2. Compartirle la URL `toyotacuautitlan.vercel.app/studio` (o el dominio propio cuando esté conectado).
3. Listo — no necesita GitHub, no necesita instalar nada, no toca código.

### Si va a programar

1. **Invitarlo a GitHub primero**, con permiso de escritura sobre el repositorio (`moleculaworks/toyotacuautitlan`). Esto es lo primero porque sin esto no puede ni clonar ni subir cambios.
2. **Definir la convención de trabajo antes de que empiece a tocar código** — hoy todo el equipo trabaja directo sobre `main`. Con dos personas escribiendo código a la vez, eso genera conflictos. Lo mínimo recomendable:
   - Cada quien trabaja en su propia rama (`git checkout -b nombre-de-la-tarea`) y sube cambios vía Pull Request en vez de subir directo a `main`.
   - Definir quién revisa y aprueba esos cambios antes de fusionarlos.
   - Esto evita que un `git push` de una persona borre o pise el trabajo de la otra sin que nadie se dé cuenta.
3. **Compartir el archivo `.env.local`** (ver punto 9) por un canal seguro — no por chat abierto ni email. Sin este archivo, el proyecto no corre en su máquina.
4. **Que clone el repositorio y corra `npm install`** para instalar las dependencias, y `npm run dev` para levantar el proyecto en su computadora.
5. **Darle acceso a Vercel** (como mínimo para ver los despliegues y logs; solo si va a tocar configuración, darle permisos de administrador del proyecto).
6. **Que lea `PROYECTO.md`** — el archivo de control del proyecto donde está el checklist completo de qué está hecho y qué falta, para que no reinvente ni repita trabajo ya resuelto.

**Para evitar duplicar esfuerzo específicamente:** antes de que la nueva persona empiece cualquier tarea, revisar juntos `PROYECTO.md` y asignarle explícitamente una sección (ej. "tú te encargas de replicar el patrón del Corolla en los demás modelos" o "tú te encargas de la integración con CRM") para que no haya dos personas trabajando en lo mismo sin saberlo.

---

## 9 · Variables de entorno o llaves necesarias

El proyecto usa un archivo `.env.local` en la raíz, que **no está subido a GitHub** (está excluido intencionalmente vía `.gitignore`, como buena práctica de seguridad — evita que las llaves queden públicas en el historial del repositorio).

Contenido actual de ese archivo:

```
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_PROJECT_ID="tuhugumb"
```

Estos dos valores **no son secretos** (el prefijo `NEXT_PUBLIC_` significa que quedan visibles en el navegador de cualquier visitante del sitio), pero sin ellos el proyecto no puede conectarse a Sanity y no correrá localmente ni en Vercel.

**Cómo se lo pasa Beto al nuevo colaborador:** copiar y pegar ese mismo contenido en un archivo nuevo llamado `.env.local` dentro de la raíz del proyecto en su máquina (no existe automáticamente al clonar, hay que crearlo a mano cada vez).

**No hay ninguna otra llave secreta en este momento** — no hay API keys de CRM, no hay tokens de pago, no hay credenciales de terceros. El día que se conecte un CRM (Zeenvia, Seekop, SaleU) o cualquier otro servicio, ese será el momento de empezar a manejar variables verdaderamente sensibles, y ahí sí será clave no compartirlas por canales inseguros.
