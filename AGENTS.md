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
