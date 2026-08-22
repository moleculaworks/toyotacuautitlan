# Changelog

Registro cronológico de cambios relevantes al proyecto. Complementa a `PROYECTO.md`
(que lleva el checklist de qué falta) — este archivo responde qué cambió y cuándo.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## 2026-08-22 — Raúl (2)

### Agregado
- Indicador de scroll horizontal en móvil, en la página del Corolla — al revisar el sitio en
  móvil se detectó que tanto el carrusel de "Versiones" como el listado de "Colores
  disponibles" requieren deslizar a la derecha sin ninguna señal visual de que hay más
  contenido:
  - `components/corolla/VersionesCarousel.tsx`: agregado fade (degradado blanco) en el borde
    derecho del carrusel móvil, que desaparece al llegar a la última tarjeta, más una fila de
    dots debajo (igual que ya tenía la versión de escritorio) sincronizada con la posición real
    del scroll — cada dot es clickeable para saltar a esa versión.
  - `components/corolla/ExteriorColores.tsx`: mismo fade en el borde derecho del listado de
    colores, con la misma lógica de ocultarse al llegar al último color.
  - Verificado en el navegador en viewport móvil (375px): el fade y los dots responden
    correctamente al hacer scroll.

## 2026-08-22 — Raúl

### Corregido
- `imagenPrincipal` del Corolla en Sanity: era un JPG de prueba casi cuadrado (1179×1193px)
  cargado directo en el Studio, que se recortaba mal en la tarjeta del catálogo (`ModeloCard.tsx`
  usa `aspect-[16/9]` con `object-cover`). Se generó una versión correcta en WebP 1200×675 (16:9),
  luego reemplazada por una segunda versión con mejor encuadre hecha por Raúl.
- `components/ui/ModeloCard.tsx`: faltaba la propiedad `sizes` en el `<Image>` — pedía la
  imagen a ancho completo de pantalla aunque la tarjeta ocupa solo un tercio en escritorio.
  Agregado `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`.

### Cambiado
- Visor 360° (`app/modelos/corolla/page.tsx`): ancho de imagen solicitado a Sanity subido de
  700px a 950px — 700 dejaba sin margen a pantallas de alta densidad (iPhone Pro y similares,
  DPR 3x), donde el visor puede necesitar hasta ~1050-1170px físicos para verse nítido.
- `alt`/`aria-label` de imágenes en la página del Corolla (`HeroPicture`, `VersionesCarousel`,
  `ExteriorColores`, `Galeria`, imagen de rendimiento): tenían el texto "Corolla" fijo en el
  código. Se parametrizaron para recibir `nombreModelo` (derivado de `modelo.nombre` en Sanity)
  por props, para que al replicar el patrón a otro modelo no digan "Corolla" por error.

### Documentado
- Guía de imágenes por modelo (en Obsidian, `01 Proyectos/Sitio Web Cuautitlan/guia-imagenes-por-modelo.md`,
  no como archivo local a propósito): agregada convención de nombres de archivo
  (`[modelo]-[categoría].webp`) y aclaración de que el nombre de archivo NO afecta el SEO en
  este sitio (Sanity asigna URLs con hash, el `alt` en código es lo que sí importa para SEO).
  Carpeta local `uploads/` renombrada a `Imagenes Ejemplo Modelo/`, actualizada con las
  imágenes en su formato/resolución final (no las originales sin optimizar).

## 2026-08-21 — Raúl (3)

### Agregado
- Schema de Sanity (`modelo`): nueva pestaña "Detalle de página" con `heroDesktop`,
  `heroMobile`, `versiones` (nombre, precio, características, imagen — fusionado en un
  solo array), `coloresExterior` (label, hex, borde, imágenes del giro), `imagenDestacado`,
  `galeriaExteriorDetalle`, `galeriaInteriorDetalle`, `imagenRendimiento`.
- `lib/sanity/image.ts`: helper `sanityImgWidth()` para pedir a la CDN de Sanity una
  imagen ya redimensionada en vez de servir el asset original completo.

### Migrado
- Página del Corolla (`/modelos/corolla`) migrada de datos fijos en código
  (`lib/data/corolla.ts`) a Sanity: versiones, hero, visor 360° (7 colores × 16 ángulos),
  imagen del destacado (Toyota Safety Sense), galerías exterior/interior, e imagen de
  rendimiento. Documento del Corolla en Sanity cargado con las 138 imágenes originales
  subidas como assets y publicado.
- `lib/sanity/queries.ts` (`getModeloBySlug`): extendida para traer todos los campos
  nuevos del modelo.
- `components/corolla/VersionesCarousel.tsx`, `ExteriorColores.tsx`, `Galeria.tsx`:
  ya no importan datos fijos — reciben todo por props desde la página (Server Component
  async que consulta Sanity). El conteo de versiones/ángulos ahora es dinámico en vez de
  asumir siempre 6 versiones o 16 ángulos fijos.
- Galería sin descripción por imagen (antes tenía labels tipo "Vista ¾ frontal" que no
  se necesitaban) — alt text genérico por posición en su lugar.

### Optimizado
- Galería exterior/interior (12 imágenes): convertidas de JPEG (180–450 KB, 2048px de
  ancho) a WebP (58–152 KB, redimensionadas a 1400px) antes de subir a Sanity.
- Visor 360°: las imágenes se piden a Sanity ya redimensionadas (`sanityImgWidth`) en vez
  de servir el asset original de 1200px para un visor que se muestra como máximo a 520px —
  reduce el peso de las 16 imágenes por color. (Ancho ajustado de 700 a 950px el 22 de
  agosto — ver entrada de esa fecha.)

## 2026-08-21 — Raúl (2)

### Documentado
- Acuerdo de flujo de trabajo entre Raúl y Beto: rama por tarea + `git pull` antes de
  empezar + registro en `CHANGELOG.md`, sin Pull Request con aprobación humana obligatoria
  (se descartó a propósito — ninguno de los dos tiene el conocimiento técnico para revisar
  código del otro). Agregado a `AGENTS.md` (para que cualquier sesión de Claude Code lo
  aplique automáticamente), y actualizado en `RESUMEN-TECNICO.md` y `PROYECTO.md` para
  reemplazar la versión anterior de Beto que sí mencionaba Pull Request con revisión cruzada.

## 2026-08-21 — Raúl

### Corregido
- `next.config.ts`: las imágenes de Sanity (`cdn.sanity.io`) fallaban al cargar en
  `next/image` porque el hostname no estaba permitido (`Invalid src prop ... hostname
  "cdn.sanity.io" is not configured`). Afectaba las tarjetas de modelos en `/modelos`.
  Se agregó `cdn.sanity.io` a `images.remotePatterns`. Verificado: la imagen ahora
  responde `200 OK` vía `/_next/image`.

### Agregado
- Repo clonado y entorno local confirmado funcional (`npm install`, `.env.local`,
  `npm run dev` — homepage y `/modelos/corolla` cargan sin errores).
