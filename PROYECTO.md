# Toyota Cuautitlán — Control de Proyecto

## ✅ Completado

### Infraestructura
- [x] Scaffold Next.js 16 con TypeScript + Tailwind CSS
- [x] Instalación de dependencias (Sanity, React Hook Form, Zod, next-seo)
- [x] Colores de marca Toyota configurados — ver `SISTEMA-DE-DISENO.md` para la referencia completa (colores, ancho de página, tipografía)
- [x] Repositorio en GitHub: github.com/moleculaworks/toyotacuautitlan
- [x] Deploy en Vercel: toyotacuautitlan.vercel.app
- [x] Variables de entorno configuradas en Vercel

### CMS — Sanity Studio
- [x] Proyecto Sanity creado (Project ID: tuhugumb)
- [x] Schema: Modelos — detalle completo de campos en `sanity/schemaTypes/modeloType.ts` (no se duplica aquí)
- [x] Schema: Promociones (título, vigencia, modelo relacionado, activa/destacada)
- [x] Schema: Configuración del sitio (teléfono, WhatsApp, dirección, horario, redes, banners)
- [x] Studio disponible en: toyotacuautitlan.vercel.app/studio
- [x] Studio registrado y conectado al proyecto

### Páginas
- [x] Homepage (/) — hero con CTA
- [x] Catálogo (/modelos) — grid con filtros por categoría
- [x] Detalle de modelo genérico (/modelos/[slug]) — plantilla de respaldo simple para modelos sin página dedicada (no confundir con /modelos/corolla, la página rica que es el patrón a replicar)
- [x] Promociones (/promociones) — cards con vigencia
- [x] Cotización (/cotizacion) — formulario validado
- [x] Cita de servicio (/cita-de-servicio) — formulario validado
- [x] Contacto (/contacto) — datos + mapa

### Formularios
- [x] Validación con Zod (cotización y cita)
- [x] API routes /api/cotizacion y /api/cita (listas para conectar CRMs)

### Equipo
- [x] Raúl invitado a GitHub (moleculaworks/toyotacuautitlan) — acceso de escritura confirmado.
      Token de acceso personal (PAT) configurado en el llavero de macOS — `git push` funciona
      sin pedir credenciales cada vez
- [x] Raúl invitado a Sanity (proyecto tuhugumb) — conectado con raulpontones@gmail.com,
      confirmado vía MCP que el proyecto muestra 2 miembros
- [x] Auditoría del repo: sin archivos ajenos al sitio, limpio para clonar

---

## 🔲 Pendiente

### Diseño visual (en progreso)
- [x] Wireframe de página de modelo individual (handoff Corolla 2026)
- [x] Página piloto /modelos/corolla implementada según handoff:
  - Hero full-bleed, intro, highlights, carrusel de 6 versiones,
    selector de 7 colores, TSS, CTA rojo intermedio, seguridad,
    galería con lightbox (exterior/interior), rendimiento, CTA final,
    modelos similares
  - Fuente ToyotaType integrada en todo el sitio, no solo el Corolla (pendiente confirmar licencia web)
- [x] Contenido de texto del Corolla 100% dirigido por Sanity (año, categoría real, textos de sección, íconos de marca) — ya no hay texto/dato fijo en código
- [x] Base de diseño cerrada (22 de agosto): ancho/breakpoints/colores/tipografía consistentes en todo el sitio — ver `SISTEMA-DE-DISENO.md`
- [x] Jerarquía de encabezados (h1-h3) auditada y corregida en todo el sitio — ver `SISTEMA-DE-DISENO.md` §4
- [x] Secciones de la página de modelo se ocultan automáticamente si falta el dato en Sanity (se quitó el `FALLBACK` que mostraba contenido fijo del Corolla) — permite publicar un modelo nuevo con información parcial
- [x] Textos breves de SEO en Versiones/Exterior/Galería (primer paso, no resuelve el tema de contenido delgado por completo)
- [x] Página de modelo convertida a ruta dinámica `/modelos/[slug]` (15 de septiembre de 2026) — antes vivía hardcodeada en `/modelos/corolla`; ahora cualquier modelo cargado en Sanity con el mismo esquema de contenido obtiene la página rica automáticamente. Componentes movidos de `components/corolla/` a `components/modelo/`. Ver `CHANGELOG.md`.
- [x] Catálogo completo de 24 modelos definido (15 de septiembre de 2026), comparando toyota.mx y toyotaoaxaca.com.mx — incluye qué modelos existen, su categoría/precio, y los 5 nameplates con motorización doble físicamente distinta (Corolla, Corolla Cross, Yaris Sedán, Tacoma, RAV4) que requieren dos documentos separados con carrusel de versiones duplicado. Ver Obsidian `catalogo-de-modelos.md`.
- [x] Precios y datos del Corolla corregidos y publicados (15 de septiembre de 2026): LE HEV $515,300 → $524,400, XLE HEV $567,300 → $576,400; XLE CVT/XLE HEV ya no comparten foto; rendimiento corregido a una fila por modelo (CVT 19.14, se quitó la fila HEV con dato viejo de 26.3). Nota: "Quemacocos" se quitó de XLE HEV por no aparecer en la ficha técnica y **se restauró el mismo día** — Raúl confirmó contra fotos de toyota.mx que sí lo trae de serie. Ver `CHANGELOG.md`.
- [x] Campo `imagenPrincipal` renombrado a `imagenTarjeta` en todo el stack (schema, código, dato del Corolla migrado) — el nombre viejo no describía su uso real (miniatura de catálogo/"Modelos similares"). Ver `CHANGELOG.md`.
- [x] `Imagenes Ejemplo Modelo/` renombrada a `Imagenes por Modelo/`, con convención definitiva de carpetas/nombres para los 24 modelos (una carpeta por página, slug siempre como prefijo del archivo). Ver `CLAUDE.md` del proyecto.
- [x] Página de prueba visual reutilizable (`app/preview-borrador/page.tsx`, temporal/local) para revisar el copy de cualquier borrador de `JSON Modelos/` con el diseño real de la página, usando fotos del Corolla como marcador de posición. Pensada para repetirse con los 24 modelos. Ver `CHANGELOG.md`.
- [x] **Corolla HEV publicado en Sanity** (15 de septiembre de 2026) — documento nuevo (slug `corolla-hev`), separado del Corolla CVT, con las 119 imágenes propias ya producidas por Raúl (hero, tarjeta, destacado, rendimiento, 6 versiones, visor 360° de 6 colores × 16 ángulos, galería exterior/interior). Colores del 360° ajustados a los reales de toyota.mx (Blanco Perlado de la ficha técnica no está disponible ahí; se usó Negro en su lugar). Pendiente: deploy en Vercel para que la página exista en el sitio (publicar en Sanity no actualiza el HTML estático — ver `AGENTS.md`).
- [ ] Cargar el resto de los 22 modelos (datos desde fichas técnicas + toyota.mx, precio siempre desde toyota.mx; imágenes las trabaja Raúl en Photoshop) — proceso ya probado con Corolla HEV: borrador en JSON (`JSON Modelos/`) → revisión visual → aprobación → Sanity → publicar
- [ ] Campo `categoria` del schema: dejar de usar "Híbridos Eléctricos (HEV y PHEV)" como valor de categoría física — es un filtro/índice adicional, no una categoría excluyente (ver Obsidian `catalogo-de-modelos.md`). Falta implementar ese filtro en `/modelos`.
- [x] Imagen hero mobile dedicada (frontal 4:3) vía <picture>
- [x] Viewer 360° real: 7 colores × 16 ángulos — drag/swipe + flechas en escritorio, solo drag/swipe en mobile (22 de agosto: se quitaron los botones de flecha en mobile por ser confusos/redundantes con el gesto de arrastre)
- [x] Revisión de UX mobile (22 de agosto): visor 360°, "colores disponibles" (scrollbar propio en vez de degradado), texto/botón de ficha técnica, botones "Solicitar Cotización" del Corolla (ancho y centrado) — ver `CHANGELOG.md`
- [ ] Pendiente del handoff: PDF ficha técnica
- [ ] Rediseño visual de tarjetas de modelo según wireframe aprobado
- [x] Botones "Cotízalo"/"Manéjalo" en la tarjeta de versión del Corolla (15 de septiembre de 2026) — Propuesta A decidida tras comparar 3 variantes en local; sin destino todavía (`href="#"`), pendiente de que existan los formularios de Cotización (por versión) y Prueba de Manejo — ver `CHANGELOG.md` y Obsidian `formularios-cotizacion-y-prueba-de-manejo.md`
- [ ] Diseño de homepage con hero real (imagen de auto)

### Contenido
- [ ] Cargar los modelos Toyota en Sanity con imágenes y precios — 24 en el catálogo completo de toyota.mx (probablemente un subconjunto real para Cuautitlán), ver Obsidian `catalogo-de-modelos.md` para la lista y estructura completa
- [ ] Vista previa de borradores **ya publicados en Sanity** (Next.js Draft Mode) — pendiente, no urgente todavía. No confundir con `/preview-borrador` (ya construido): ese resuelve revisar copy/specs de un JSON *antes* de tocar Sanity con fotos prestadas; esto otro resolvería ver un borrador que *ya está en Sanity* (ej. un refresh de año-modelo sobre un documento existente) con el diseño real antes de publicar. Hoy eso solo se puede ver en el editor de Sanity Studio (campos sueltos). Construirlo antes del primer refresh de año-modelo (ej. Corolla 2026 → 2027). Ver Obsidian `catalogo-de-modelos.md`.
- [ ] Definir estructura de versiones por modelo (LE, SE, HEV, etc.)
- [ ] Cargar promociones vigentes
- [ ] Llenar Configuración del sitio (teléfono, WhatsApp, horario, redes)

### SEO
- [ ] Sitemap.xml dinámico — esperar a tener el dominio final conectado (no tiene caso construirlo antes)
- [x] robots.txt (22 de agosto de 2026) — `app/robots.ts` bloquea toda indexación (`Disallow: /`) mientras el sitio vive en la URL temporal de Vercel. **CRÍTICO antes del lanzamiento real: quitar el bloqueo (permitir "/"), o Google nunca indexará el sitio.**
- [ ] Schema.org (LocalBusiness + AutoDealer) — esperar a tener el dominio final conectado
- [ ] Meta tags Open Graph por página — esperar a tener el dominio final conectado
- [ ] Revalidación de contenido Sanity → sitio en vivo (encontrado 15 de septiembre de 2026): las páginas de modelo son HTML estático sin revalidación — publicar en Sanity no se refleja en Vercel hasta el siguiente deploy. **Aplazado a propósito** (decisión 15 de septiembre): mientras el sitio no tenga visitantes reales, no urge — hoy se resuelve solo, porque cada cierre de sesión empuja un commit a `main` que dispara un deploy nuevo. Antes del lanzamiento real, implementar ISR o un webhook de Sanity → ruta de revalidación en Next.js. Ver `CHANGELOG.md` y `AGENTS.md`.

### Dominio — pospuesto a propósito hasta terminar el desarrollo
- [ ] Conectar toyotacuautitlan.com.mx a Vercel
- [ ] Configurar DNS en el registrador del dominio
- [ ] SSL automático (Vercel lo hace solo)

### Formularios y CRM — pospuesto a propósito hasta terminar el desarrollo
- [ ] Definir qué CRMs conectar en el lanzamiento (Zeenvia, Seekop, SaleU, propio)
- [ ] Integrar API de CRM(s) en /api/cotizacion y /api/cita
- [ ] Notificación por email al equipo de ventas cuando llega un lead

### Flujo de trabajo con equipo
- [x] Compartir .env.local con Raúl por canal seguro
- [x] Repo clonado por Raúl, npm install + npm run dev verificados
- [x] Acordar convención de trabajo (21 de agosto de 2026): rama por tarea + `git pull` antes
      de empezar + registro en CHANGELOG.md — sin Pull Request con aprobación humana obligatoria
      (descartado a propósito, ninguno de los dos puede revisar código del otro). `AGENTS.md` es
      la fuente de verdad de este flujo — cualquier sesión de Claude Code en el repo lo lee solo.
- [x] Regla de diseño (22 de agosto de 2026): consultar `SISTEMA-DE-DISENO.md` antes de cualquier
      decisión de diseño o al crear un componente/sección nueva — documentado en `AGENTS.md`.
- [x] Regla de publicación en Sanity (22 de agosto de 2026): el contenido se guarda como borrador
      y solo se publica (se ve en vivo en el sitio) con confirmación explícita del dueño del
      contenido — documentado en `AGENTS.md`.
- [ ] Confirmar acceso de Raúl a Vercel
- [ ] Asignar secciones del proyecto para no duplicar esfuerzo entre Beto y Raúl

### Precios
- [ ] Definir estructura de versiones por modelo
- [ ] Implementar actualización masiva por CSV o Google Sheets

### Antes del lanzamiento
- [ ] Pruebas en mobile (iOS y Android)
- [ ] Velocidad y Core Web Vitals (objetivo: >90 en PageSpeed)
- [ ] Reemplazar sitio WordPress actual con el nuevo
- [ ] **Quitar el bloqueo de `app/robots.ts`** (permitir "/") — hoy bloquea toda indexación a propósito

### Seguridad — CRÍTICO, pendiente de implementar
- [ ] Rate limiting en formularios de cotización y cita (evitar spam/saturación al CRM)
- [ ] Captcha invisible (ej. Cloudflare Turnstile) en formularios públicos
- [ ] Roles correctos en Sanity al invitar equipo (Editor, no Administrator)
- [ ] Confirmar política de retención/backups de versiones en Sanity
- [ ] Activar Dependabot en GitHub (alertas de vulnerabilidades en dependencias)
- [ ] Revisar permisos de acceso en Vercel al sumar colaboradores

Nota: gran parte de lo básico ya viene resuelto por el stack (sin panel admin público
tipo wp-admin, sin plugins de terceros, SSL automático, CDN de Vercel filtra tráfico
malicioso). Lo de arriba es lo que falta configurar activamente antes de manejar
leads reales de producción.
