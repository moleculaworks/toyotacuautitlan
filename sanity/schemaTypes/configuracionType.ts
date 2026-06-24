import { defineField, defineType } from 'sanity'

export const configuracionType = defineType({
  name: 'configuracion',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'telefono',
      title: 'Teléfono principal',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'telefonoWhatsApp',
      title: 'WhatsApp (con código de país, ej: 5255...)',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email de contacto',
      type: 'string',
    }),
    defineField({
      name: 'direccion',
      title: 'Dirección',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'horario',
      title: 'Horario de atención',
      type: 'string',
      placeholder: 'Lun-Sab 9:00-19:00 | Dom 10:00-15:00',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'URL de Google Maps',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'bannersHomepage',
      title: 'Banners del hero (homepage)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'imagen', title: 'Imagen', type: 'image', options: { hotspot: true } },
            { name: 'titulo', title: 'Título', type: 'string' },
            { name: 'subtitulo', title: 'Subtítulo', type: 'string' },
            { name: 'ctaTexto', title: 'Texto del botón', type: 'string' },
            { name: 'ctaUrl', title: 'URL del botón', type: 'string' },
          ],
          preview: {
            select: { title: 'titulo', media: 'imagen' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Configuración del sitio' }
    },
  },
})
