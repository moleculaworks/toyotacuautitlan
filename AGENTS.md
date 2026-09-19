<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Flujo de trabajo del equipo (acordado 21 de agosto de 2026)

Este repo lo trabajan dos personas (Beto y Raúl), cada una con su propia sesión de Claude Code. Ninguno de los dos tiene el conocimiento técnico para revisar y aprobar el código del otro — confían en el trabajo de cada quien. Por eso **se descartó a propósito** el esquema de Pull Request con aprobación humana obligatoria. En su lugar:

1. **`git pull` antes de empezar cualquier tarea**, para partir de lo último que subió el otro.
2. **Rama por tarea** (`git checkout -b nombre-de-la-tarea`), no directo sobre `main` — solo para aislar el trabajo mientras está a medias, no para que alguien lo revise.
3. **Subir y fusionar a `main` directamente**, sin esperar aprobación del otro.
4. **Registrar el cambio en `CHANGELOG.md`** (raíz del repo) — reemplaza el rol que iba a cumplir la revisión de PR: que el otro se entere de qué cambió y por qué, sin leer código. Cada entrada lleva fecha, autor y descripción breve.
5. Cuando el cambio lo hace una sesión de Claude Code, la revisión de código sí ocurre — la hace la IA antes de subir el cambio. Esa es la capa de control real de este flujo.

Si estás iniciando una sesión en este repo: sigue este flujo por defecto. No propongas ni configures Pull Requests con aprobación obligatoria — ya se evaluó y se descartó conscientemente por falta de expertise técnica de ambos colaboradores para revisar código.

## Base de diseño (acordado 22 de agosto de 2026)

**Antes de cualquier decisión de diseño** (ancho, breakpoints, colores, tipografía, jerarquía de encabezados, o crear un componente/sección nueva): consultar `SISTEMA-DE-DISENO.md` (raíz del repo) como fuente de verdad — no inventar valores nuevos si ya existe un token o convención definida ahí. Si hace falta un valor que no está cubierto, agregarlo a ese archivo en vez de dejarlo suelto en el componente.

## Publicación de contenido en Sanity (acordado 22 de agosto de 2026, actualizado 19 de septiembre de 2026)

**Regla vigente:** un cambio de contenido pedido explícitamente por la persona dueña del contenido (ej. "reemplaza esta imagen", "corrige este precio") se puede publicar directo en Sanity, sin pausar en borrador a esperar una segunda confirmación. Contenido que la IA redacta o arma por su cuenta (copy nuevo de un modelo, un destacado, texto de una sección) sigue revisándose primero de forma visual en local (`/preview-borrador` o equivalente) **antes** de tocar Sanity — una vez aprobado ahí, también se sube y publica directo.

**Por qué cambió:** la versión original de esta regla (guardar borrador + esperar "sí, publícalo") asumía que la persona dueña del contenido podía revisar el borrador antes de que fuera público. En la práctica eso nunca pasó — nadie revisa borradores en Sanity Studio, y hoy tampoco se podría aunque se quisiera: Next.js Draft Mode sigue sin implementarse (ver `PROYECTO.md`), así que un borrador en Sanity no tiene forma de previsualizarse en el sitio. La revisión real siempre fue la visual en local.

**Corrección importante (15 de septiembre de 2026):** este documento decía que el contenido publicado en Sanity se ve "al instante" en el sitio — **no es cierto**. Las páginas de modelo (`/modelos/[slug]`) se generan como HTML estático en el build (confirmado con los headers de producción: `x-nextjs-prerender: 1`, `x-vercel-cache: HIT`, sin revalidación configurada) — publicar en Sanity actualiza el contenido del CMS, pero el sitio en vivo sigue mostrando la versión anterior **hasta el siguiente deploy en Vercel**. Nunca se había notado porque hasta ahora cada publicación de contenido venía acompañada de un cambio de código que igual disparaba un deploy nuevo. Mientras no se resuelva con revalidación automática (pendiente, ver `PROYECTO.md`), publicar contenido puro en Sanity (sin cambio de código) requiere un push adicional a `main` para que se refleje en vivo.
