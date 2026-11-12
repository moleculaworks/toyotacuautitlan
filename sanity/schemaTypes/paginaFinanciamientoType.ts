import { defineArrayMember, defineField, defineType } from 'sanity'

// Página /financiamiento (documento único, sin lista: ver sanity/structure.ts).
// Todos los textos se editan aquí. Las imágenes son opcionales: mientras no se
// suba una, la página muestra el placeholder de public/images/financiamiento/.
// Sin guion largo (—) en ningún texto, ver SISTEMA-DE-DISENO.md sección 6.

const planFields = [
  defineField({ name: 'titulo', title: 'Nombre del plan', type: 'string', validation: (r) => r.required() }),
  defineField({
    name: 'descripcion',
    title: 'Descripción corta (se ve en la tarjeta)',
    type: 'text',
    rows: 3,
    validation: (r) => r.required().max(220),
  }),
  defineField({
    name: 'detalles',
    title: 'Detalles (se ven en "Ver detalles", una viñeta por línea)',
    type: 'array',
    of: [defineArrayMember({ type: 'string' })],
    validation: (r) => r.required().min(1),
  }),
  defineField({
    name: 'imagen',
    title: 'Imagen de la tarjeta (1400 × 400 px, WebP)',
    description: 'Opcional. Si está vacía se muestra el placeholder.',
    type: 'image',
    options: { hotspot: false },
  }),
  defineField({
    name: 'imagenAlt',
    title: 'Texto alternativo de la imagen',
    description: 'Describe lo que se ve en la foto, para accesibilidad y SEO.',
    type: 'string',
  }),
]

export const paginaFinanciamientoType = defineType({
  name: 'paginaFinanciamiento',
  title: 'Página: Financiamiento',
  type: 'document',
  groups: [
    { name: 'portada', title: 'Portada', default: true },
    { name: 'planes', title: 'Planes' },
    { name: 'arrendamientos', title: 'Arrendamientos' },
    { name: 'beneficios', title: 'Beneficios' },
    { name: 'franja', title: 'Franja final' },
  ],
  fields: [
    defineField({ name: 'heroTitulo', title: 'Título de la portada', type: 'string', group: 'portada', validation: (r) => r.required() }),
    defineField({
      name: 'heroSubtitulo',
      title: 'Subtítulo de la portada',
      description: 'Un salto de línea parte el texto en dos renglones.',
      type: 'text',
      rows: 2,
      group: 'portada',
    }),
    defineField({
      name: 'heroDesktop',
      title: 'Imagen de portada, escritorio (1920 × 680 px, WebP)',
      description: 'Opcional. Si está vacía se muestra el placeholder.',
      type: 'image',
      group: 'portada',
    }),
    defineField({
      name: 'heroMobile',
      title: 'Imagen de portada, móvil (1600 × 1200 px, WebP)',
      description: 'Opcional. Encuadre más vertical, no la misma imagen reducida.',
      type: 'image',
      group: 'portada',
    }),
    defineField({ name: 'heroAlt', title: 'Texto alternativo de la portada', type: 'string', group: 'portada' }),
    defineField({
      name: 'intro',
      title: 'Párrafo introductorio',
      type: 'text',
      rows: 4,
      group: 'portada',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'seoDescripcion',
      title: 'Descripción para Google (máx. 160 caracteres)',
      description: 'Sin precio ni año. Formato: frase corta con el tema de la página.',
      type: 'text',
      rows: 2,
      group: 'portada',
      validation: (r) => r.max(160),
    }),

    defineField({ name: 'planesTitulo', title: 'Título de la sección', type: 'string', group: 'planes', validation: (r) => r.required() }),
    defineField({
      name: 'planesDestacado',
      title: 'Primera frase en negrita',
      type: 'string',
      group: 'planes',
    }),
    defineField({ name: 'planesTexto', title: 'Texto que sigue a la frase en negrita', type: 'text', rows: 3, group: 'planes' }),
    defineField({
      name: 'planes',
      title: 'Planes de financiamiento',
      type: 'array',
      group: 'planes',
      of: [defineArrayMember({ type: 'object', name: 'plan', fields: planFields, preview: { select: { title: 'titulo', subtitle: 'descripcion' } } })],
      validation: (r) => r.required().min(1),
    }),

    defineField({ name: 'arrendamientosTitulo', title: 'Título de la sección', type: 'string', group: 'arrendamientos', validation: (r) => r.required() }),
    defineField({
      name: 'arrendamientosDestacado',
      title: 'Primera frase en negrita',
      type: 'string',
      group: 'arrendamientos',
    }),
    defineField({ name: 'arrendamientosTexto', title: 'Texto que sigue a la frase en negrita', type: 'text', rows: 3, group: 'arrendamientos' }),
    defineField({
      name: 'arrendamientos',
      title: 'Arrendamientos',
      type: 'array',
      group: 'arrendamientos',
      of: [defineArrayMember({ type: 'object', name: 'arrendamiento', fields: planFields, preview: { select: { title: 'titulo', subtitle: 'descripcion' } } })],
      validation: (r) => r.required().min(1),
    }),

    defineField({ name: 'beneficiosTitulo', title: 'Título de la franja gris', type: 'string', group: 'beneficios', validation: (r) => r.required() }),
    defineField({
      name: 'beneficios',
      title: 'Beneficios',
      description: 'Se muestran en 3 columnas. Cada uno lleva un ícono (por ahora uno genérico; los definitivos se dibujan aparte).',
      type: 'array',
      group: 'beneficios',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'beneficio',
          fields: [
            defineField({ name: 'titulo', title: 'Título', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'texto', title: 'Texto', type: 'text', rows: 3, validation: (r) => r.required() }),
            defineField({
              name: 'icono',
              title: 'Ícono',
              type: 'string',
              description:
                'Íconos de marca ya dibujados (components/ui/HighlightIcon.tsx). Si necesitas un concepto que no está en la lista, pídelo antes de usar uno parecido.',
              options: {
                list: [
                  { title: 'Rapidez (rayo con líneas de velocidad)', value: 'rapidez' },
                  { title: 'Tranquilidad (barras con porcentaje)', value: 'tranquilidad' },
                  { title: 'Protección (escudo con auto)', value: 'proteccion' },
                  { title: 'Comodidad (tarjeta de pago)', value: 'comodidad' },
                  { title: 'Confianza (candado)', value: 'confianza' },
                  { title: 'Flexibilidad (flecha con tres caminos)', value: 'flexibilidad' },
                ],
              },
            }),
          ],
          preview: { select: { title: 'titulo', subtitle: 'texto' } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'franjaTitulo',
      title: 'Franja final: título',
      description: 'Se ve en la franja roja que cierra la página, antes del pie. Ej: "¿No sabes qué plan elegir?"',
      type: 'string',
      group: 'franja',
    }),
    defineField({
      name: 'franjaApoyo',
      title: 'Franja final: texto de apoyo',
      description: 'Una línea bajo el título. No prometas confirmaciones ni procesos que no estén definidos.',
      type: 'string',
      group: 'franja',
    }),
    defineField({
      name: 'franjaBoton',
      title: 'Franja final: texto del botón',
      description: 'Ej: "Quiero asesoría". A dónde lleva el botón todavía se define en el código.',
      type: 'string',
      group: 'franja',
    }),
  ],
  preview: { prepare: () => ({ title: 'Página: Financiamiento' }) },
})
