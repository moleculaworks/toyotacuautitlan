import { defineArrayMember, defineField, defineType } from 'sanity'

// Página /contacto (documento único, sin lista: ver sanity/structure.ts).
// Aquí se editan los textos, el directorio por departamento (extensión, WhatsApp y horarios) y los enlaces del
// mapa. La dirección, el teléfono general y los WhatsApp de Ventas y Servicio NO se repiten aquí: viven en
// "Configuración del sitio" (los usa también el menú), para que nunca se desalineen. Las imágenes son opcionales:
// si no hay una subida, la página usa una provisional. Sin guion largo (—) en ningún texto, ver
// SISTEMA-DE-DISENO.md sección 6.

export const paginaContactoType = defineType({
  name: 'paginaContacto',
  title: 'Página: Contacto',
  type: 'document',
  groups: [
    { name: 'portada', title: 'Portada', default: true },
    { name: 'ubicacion', title: 'Ubicación y mapa' },
    { name: 'directorio', title: 'Directorio' },
  ],
  fields: [
    defineField({ name: 'heroTitulo', title: 'Título de la portada', type: 'string', group: 'portada', validation: (r) => r.required() }),
    defineField({
      name: 'heroSubtitulo',
      title: 'Subtítulo de la portada',
      description: 'Un salto de línea parte el texto en dos renglones (unos 30 caracteres por renglón).',
      type: 'text',
      rows: 2,
      group: 'portada',
    }),
    defineField({
      name: 'heroDesktop',
      title: 'Imagen de portada, escritorio (1920 × 680 px, WebP)',
      description: 'Opcional. Si está vacía se usa una imagen provisional.',
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
      name: 'introDestacado',
      title: 'Párrafo introductorio: primera frase en negrita',
      type: 'string',
      group: 'portada',
    }),
    defineField({
      name: 'intro',
      title: 'Párrafo introductorio: texto que sigue a la frase en negrita',
      type: 'text',
      rows: 4,
      group: 'portada',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'seoDescripcion',
      title: 'Descripción para Google y para compartir (máx. 160 caracteres)',
      description: 'Sin precio ni año. Frase corta con el tema de la página.',
      type: 'text',
      rows: 2,
      group: 'portada',
      validation: (r) => r.max(160),
    }),

    defineField({ name: 'ubicacionTitulo', title: 'Título de la sección de ubicación', type: 'string', group: 'ubicacion', validation: (r) => r.required() }),
    defineField({
      name: 'ubicacionNombre',
      title: 'Nombre que encabeza la dirección',
      description: 'Va arriba de la dirección. La dirección y el teléfono general se editan en "Configuración del sitio".',
      type: 'string',
      group: 'ubicacion',
    }),
    defineField({
      name: 'mapaIncrustado',
      title: 'Mapa incrustado (dirección del iframe)',
      description:
        'En Google Maps abre la ficha de la agencia, Compartir, Insertar un mapa, y copia solo la dirección que aparece después de src=" (empieza con https://www.google.com/maps/embed). Si está vacío se usa el mapa actual.',
      type: 'url',
      group: 'ubicacion',
      validation: (r) => r.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'googleMapsEnlace',
      title: 'Botón "Abrir en Google Maps" (enlace)',
      description: 'Ruta o ficha de la agencia en Google Maps. Si está vacío se usa la ruta hasta las coordenadas de la agencia.',
      type: 'url',
      group: 'ubicacion',
      validation: (r) => r.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'wazeEnlace',
      title: 'Botón "Abrir en Waze" (enlace)',
      description: 'Enlace de Waze a la agencia. Si está vacío se usa el de las coordenadas de la agencia.',
      type: 'url',
      group: 'ubicacion',
      validation: (r) => r.uri({ scheme: ['https'] }),
    }),

    defineField({ name: 'directorioTitulo', title: 'Título del directorio', type: 'string', group: 'directorio', validation: (r) => r.required() }),
    defineField({ name: 'directorioTexto', title: 'Texto debajo del título', type: 'text', rows: 3, group: 'directorio' }),
    defineField({
      name: 'departamentos',
      title: 'Departamentos',
      description:
        'Una tarjeta por departamento, en el orden en que se muestran. El teléfono es siempre el general, más la extensión de cada área.',
      type: 'array',
      group: 'directorio',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'departamento',
          fields: [
            defineField({ name: 'nombre', title: 'Nombre del departamento', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'extension',
              title: 'Extensión (opcional)',
              description:
                'Solo dígitos, por ejemplo 123. Mientras esté vacía, el botón llama al número general sin extensión y no se muestra "Ext.". Agregarla cuando se tenga la real. Antes de ponerla, probar con el conmutador.',
              type: 'string',
              validation: (r) => r.regex(/^\d{2,6}$/, { name: 'dígitos' }).error('Escribe solo dígitos (de 2 a 6).'),
            }),
            defineField({
              name: 'canalWhatsapp',
              title: 'WhatsApp del departamento',
              description:
                'Ventas y Servicio usan el número de "Configuración del sitio" (el mismo del menú), así nunca se desalinea. Para otro número, elige "Otro número" y escríbelo abajo.',
              type: 'string',
              options: {
                list: [
                  { title: 'Sin WhatsApp', value: 'ninguno' },
                  { title: 'El de Ventas (Configuración del sitio)', value: 'ventas' },
                  { title: 'El de Servicio (Configuración del sitio)', value: 'servicio' },
                  { title: 'Otro número', value: 'propio' },
                ],
                layout: 'radio',
              },
              initialValue: 'ninguno',
            }),
            defineField({
              name: 'whatsappPropio',
              title: 'Otro número de WhatsApp (10 dígitos, sin espacios ni guiones)',
              description: 'Solo si arriba elegiste "Otro número". Ejemplo: 5512345678.',
              type: 'string',
              hidden: ({ parent }) => parent?.canalWhatsapp !== 'propio',
              validation: (r) =>
                r.custom((valor, ctx) => {
                  const parent = ctx.parent as { canalWhatsapp?: string } | undefined
                  if (parent?.canalWhatsapp !== 'propio') return true
                  return typeof valor === 'string' && /^\d{10}$/.test(valor) ? true : 'Escribe exactamente 10 dígitos, sin espacios ni guiones.'
                }),
            }),
            defineField({
              name: 'horarios',
              title: 'Horarios',
              description:
                'Uno o varios grupos. Cada grupo puede llevar un título opcional (por ejemplo "Taller" o "Citas de servicio") y sus renglones de días y horas. Si está vacío se muestra "Por confirmar".',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'grupoHorario',
                  fields: [
                    defineField({ name: 'titulo', title: 'Título del grupo (opcional)', type: 'string' }),
                    defineField({
                      name: 'lineas',
                      title: 'Renglones',
                      type: 'array',
                      of: [
                        defineArrayMember({
                          type: 'object',
                          name: 'lineaHorario',
                          fields: [
                            defineField({ name: 'dias', title: 'Días', description: 'Por ejemplo: Lunes a viernes', type: 'string', validation: (r) => r.required() }),
                            defineField({ name: 'horas', title: 'Horas', description: 'Por ejemplo: 9:00 a 19:00 hrs.', type: 'string', validation: (r) => r.required() }),
                          ],
                          preview: { select: { title: 'dias', subtitle: 'horas' } },
                        }),
                      ],
                      validation: (r) => r.required().min(1),
                    }),
                  ],
                  preview: { select: { title: 'titulo', subtitle: 'lineas.0.dias' }, prepare: ({ title, subtitle }) => ({ title: title || 'Horario', subtitle }) },
                }),
              ],
            }),
          ],
          preview: { select: { title: 'nombre', subtitle: 'extension' }, prepare: ({ title, subtitle }) => ({ title, subtitle: `Ext. ${subtitle ?? ''}` }) },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: { prepare: () => ({ title: 'Página: Contacto' }) },
})
