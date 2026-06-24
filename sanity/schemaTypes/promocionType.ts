import { defineField, defineType } from 'sanity'

export const promocionType = defineType({
  name: 'promocion',
  title: 'Promociones',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título de la promoción',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: { source: 'titulo' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'modelo',
      title: 'Modelo relacionado',
      type: 'reference',
      to: [{ type: 'modelo' }],
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción corta',
      type: 'text',
      rows: 2,
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: 'detalle',
      title: 'Detalle completo',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'etiqueta',
      title: 'Etiqueta (ej: "Enganche 0%", "Tasa especial")',
      type: 'string',
    }),
    defineField({
      name: 'vigenciaDesde',
      title: 'Vigencia desde',
      type: 'date',
    }),
    defineField({
      name: 'vigenciaHasta',
      title: 'Vigencia hasta',
      type: 'date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'activa',
      title: '¿Promoción activa?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'destacada',
      title: '¿Mostrar en homepage?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'vigenciaHasta',
      media: 'imagen',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `Vigente hasta: ${subtitle}` : 'Sin fecha de vigencia',
        media,
      }
    },
  },
})
