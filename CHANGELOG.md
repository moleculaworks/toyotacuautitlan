# Changelog

Registro cronológico de cambios relevantes al proyecto. Complementa a `PROYECTO.md`
(que lleva el checklist de qué falta) — este archivo responde qué cambió y cuándo.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

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
- Visor 360°: las imágenes se piden a Sanity ya redimensionadas a 700px de ancho
  (`sanityImgWidth`) en vez de servir el asset original de 1200px para un visor que
  se muestra como máximo a 520px — reduce el peso de las 16 imágenes por color.

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
