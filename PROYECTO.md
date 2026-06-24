# Toyota Cuautitlán — Control de Proyecto

## ✅ Completado

### Infraestructura
- [x] Scaffold Next.js 14 con TypeScript + Tailwind CSS
- [x] Instalación de dependencias (Sanity, React Hook Form, Zod, next-seo)
- [x] Colores de marca Toyota configurados (#EB0A1E, #1A1A1A, #F5F5F5)
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

---

## 🔲 Pendiente

### Diseño visual (en progreso)
- [ ] Wireframe de página de modelo individual — **SIGUIENTE PASO**
- [ ] Rediseño visual de tarjetas de modelo según wireframe aprobado
- [ ] Sección a sección hasta completar todas las páginas
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

### Dominio
- [ ] Conectar toyotacuautitlan.com.mx a Vercel
- [ ] Configurar DNS en el registrador del dominio
- [ ] SSL automático (Vercel lo hace solo)

### Formularios y CRM
- [ ] Definir qué CRMs conectar en el lanzamiento (Zeenvia, Seekop, SaleU, propio)
- [ ] Integrar API de CRM(s) en /api/cotizacion y /api/cita
- [ ] Notificación por email al equipo de ventas cuando llega un lead

### Precios
- [ ] Definir estructura de versiones por modelo
- [ ] Implementar actualización masiva por CSV o Google Sheets

### Antes del lanzamiento
- [ ] Pruebas en mobile (iOS y Android)
- [ ] Velocidad y Core Web Vitals (objetivo: >90 en PageSpeed)
- [ ] Reemplazar sitio WordPress actual con el nuevo
