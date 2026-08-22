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
- [x] Schema: Modelos (nombre, slug, categoría, precio, imágenes, características, SEO)
- [x] Schema: Promociones (título, vigencia, modelo relacionado, activa/destacada)
- [x] Schema: Configuración del sitio (teléfono, WhatsApp, dirección, horario, redes, banners)
- [x] Studio disponible en: toyotacuautitlan.vercel.app/studio
- [x] Studio registrado y conectado al proyecto

### Páginas
- [x] Homepage (/) — hero con CTA
- [x] Catálogo (/modelos) — grid con filtros por categoría
- [x] Detalle de modelo (/modelos/[slug]) — imagen, características, galería, CTA
- [x] Promociones (/promociones) — cards con vigencia
- [x] Cotización (/cotizacion) — formulario validado
- [x] Cita de servicio (/cita-de-servicio) — formulario validado
- [x] Contacto (/contacto) — datos + mapa

### Formularios
- [x] Validación con Zod (cotización y cita)
- [x] API routes /api/cotizacion y /api/cita (listas para conectar CRMs)

### Equipo
- [x] Raúl invitado a GitHub (moleculaworks/toyotacuautitlan) — acceso de escritura confirmado
- [x] Raúl invitado a Sanity (proyecto tuhugumb) — conectado con raulpontones@gmail.com
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
- [ ] Validar página Corolla con el equipo → replicar patrón en los demás modelos
- [x] Imagen hero mobile dedicada (frontal 4:3) vía <picture>
- [x] Viewer 360° real: 7 colores × 16 ángulos, drag/swipe + flechas
- [ ] Pendiente del handoff: PDF ficha técnica
- [ ] Rediseño visual de tarjetas de modelo según wireframe aprobado
- [ ] Diseño de homepage con hero real (imagen de auto)

### Contenido
- [ ] Cargar los 20 modelos Toyota en Sanity con imágenes y precios
- [ ] Definir estructura de versiones por modelo (LE, SE, HEV, etc.)
- [ ] Cargar promociones vigentes
- [ ] Llenar Configuración del sitio (teléfono, WhatsApp, horario, redes)

### SEO
- [ ] Sitemap.xml dinámico
- [ ] robots.txt
- [ ] Schema.org (LocalBusiness + AutoDealer)
- [ ] Meta tags Open Graph por página

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
      (descartado a propósito, ninguno de los dos puede revisar código del otro). Documentado en
      AGENTS.md, CLAUDE.md y RESUMEN-TECNICO.md.
- [ ] Confirmar acceso de Raúl a Vercel
- [ ] Asignar secciones del proyecto para no duplicar esfuerzo entre Beto y Raúl

### Precios
- [ ] Definir estructura de versiones por modelo
- [ ] Implementar actualización masiva por CSV o Google Sheets

### Antes del lanzamiento
- [ ] Pruebas en mobile (iOS y Android)
- [ ] Velocidad y Core Web Vitals (objetivo: >90 en PageSpeed)
- [ ] Reemplazar sitio WordPress actual con el nuevo

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
