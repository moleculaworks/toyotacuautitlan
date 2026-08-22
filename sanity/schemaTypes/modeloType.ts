import { defineField, defineType } from 'sanity'

export const modeloType = defineType({
  name: 'modelo',
  title: 'Modelos',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del modelo',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL del modelo',
      type: 'slug',
      options: { source: 'nombre' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Sedán', value: 'sedan' },
          { title: 'SUV', value: 'suv' },
          { title: 'Pick-up', value: 'pickup' },
          { title: 'Hatchback', value: 'hatchback' },
          { title: 'Híbrido', value: 'hibrido' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'precioDesde',
      title: 'Precio desde (MXN)',
      type: 'number',
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: 'imagenPrincipal',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'galeria',
      title: 'Galería de imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'descripcionCorta',
      title: 'Descripción corta (para tarjetas)',
      type: 'text',
      rows: 2,
      validation: (r) => r.max(160),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción completa',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'caracteristicas',
      title: 'Características principales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icono', title: 'Ícono (emoji o nombre)', type: 'string' },
            { name: 'titulo', title: 'Título', type: 'string' },
            { name: 'valor', title: 'Valor', type: 'string' },
          ],
          preview: {
            select: { title: 'titulo', subtitle: 'valor' },
          },
        },
      ],
    }),
    defineField({
      name: 'destacado',
      title: '¿Mostrar en homepage?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'orden',
      title: 'Orden en el catálogo',
      type: 'number',
      initialValue: 99,
    }),
    defineField({
      name: 'seoTitulo',
      title: 'SEO: Título (deja vacío para usar el nombre)',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescripcion',
      title: 'SEO: Descripción',
      type: 'text',
      rows: 2,
      validation: (r) => r.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'heroDesktop',
      title: 'Hero (escritorio)',
      type: 'image',
      options: { hotspot: true },
      group: 'detalle',
    }),
    defineField({
      name: 'heroMobile',
      title: 'Hero (móvil)',
      type: 'image',
      group: 'detalle',
    }),
    defineField({
      name: 'versiones',
      title: 'Versiones y precios',
      type: 'array',
      group: 'detalle',
      of: [
        {
          type: 'object',
          name: 'version',
          fields: [
            { name: 'nombre', title: 'Nombre (ej: LE CVT)', type: 'string', validation: (r) => r.required() },
            { name: 'precio', title: 'Precio (MXN)', type: 'number', validation: (r) => r.required().min(0) },
            { name: 'imagen', title: 'Imagen de la versión', type: 'image', options: { hotspot: true } },
            {
              name: 'caracteristicas',
              title: 'Características',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
          preview: {
            select: { title: 'nombre', subtitle: 'precio', media: 'imagen' },
          },
        },
      ],
    }),
    defineField({
      name: 'coloresExterior',
      title: 'Colores y visor 360°',
      type: 'array',
      group: 'detalle',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Nombre del color', type: 'string', validation: (r) => r.required() },
            { name: 'hex', title: 'Color (hex, para el swatch)', type: 'string', validation: (r) => r.required() },
            { name: 'necesitaBorde', title: '¿Necesita borde en el swatch?', type: 'boolean', initialValue: false },
            {
              name: 'imagenes360',
              title: 'Imágenes del giro (en orden)',
              type: 'array',
              of: [{ type: 'image' }],
            },
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'imagenDestacado',
      title: 'Imagen del destacado (ej: Tecnología / Safety Sense)',
      type: 'image',
      options: { hotspot: true },
      group: 'detalle',
    }),
    defineField({
      name: 'galeriaExteriorDetalle',
      title: 'Galería exterior',
      type: 'array',
      group: 'detalle',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'galeriaInteriorDetalle',
      title: 'Galería interior',
      type: 'array',
      group: 'detalle',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'imagenRendimiento',
      title: 'Imagen de rendimiento',
      type: 'image',
      options: { hotspot: true },
      group: 'detalle',
    }),
  ],
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'detalle', title: 'Detalle de página (versiones, 360°, galería)' },
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'ordenAsc',
      by: [{ field: 'orden', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'categoria',
      media: 'imagenPrincipal',
    },
  },
})
