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
  ],
  groups: [
    { name: 'seo', title: 'SEO' },
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
