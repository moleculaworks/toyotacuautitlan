import { defineArrayMember, defineField, defineType } from 'sanity'

// Página /financiamiento/seguros (documento único, sin lista: ver sanity/structure.ts).
// Todos los textos se editan aquí. Las imágenes son opcionales: si no hay una subida, la página usa
// las de public/images/seguros/. Sin guion largo (—) en ningún texto, ver SISTEMA-DE-DISENO.md sección 6.

export const paginaSegurosType = defineType({
  name: 'paginaSeguros',
  title: 'Página: Seguros',
  type: 'document',
  groups: [
    { name: 'portada', title: 'Portada', default: true },
    { name: 'ventajas', title: 'Por qué con nosotros' },
    { name: 'coberturas', title: 'Coberturas' },
    { name: 'cierre', title: 'Cierre' },
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
      description: 'Opcional. Si está vacía se usa la imagen incluida en el sitio.',
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

    defineField({ name: 'ventajasTitulo', title: 'Título de la franja gris', type: 'string', group: 'ventajas', validation: (r) => r.required() }),
    defineField({
      name: 'ventajas',
      title: 'Ventajas',
      description: 'Se muestran en 4 columnas. Cada una lleva un ícono de marca.',
      type: 'array',
      group: 'ventajas',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'ventaja',
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
                  { title: 'Refacciones originales (caja con engrane)', value: 'refacciones' },
                  { title: 'Técnicos certificados (persona con llave)', value: 'tecnicos' },
                  { title: 'Regresa a la agencia (pin de ubicación)', value: 'agencia' },
                  { title: 'Atención (audífonos con micrófono)', value: 'atencion' },
                  { title: 'Seguridad (escudo con palomita)', value: 'seguridad' },
                  { title: 'Sello de garantía (respaldo)', value: 'sello' },
                  { title: 'Protección (escudo con auto)', value: 'proteccion' },
                  { title: 'Confianza (candado)', value: 'confianza' },
                  { title: 'Tranquilidad', value: 'tranquilidad' },
                  { title: 'Engranes (ajuste)', value: 'engranes' },
                ],
              },
            }),
          ],
          preview: { select: { title: 'titulo', subtitle: 'texto' } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),

    defineField({ name: 'coberturasTitulo', title: 'Título de la sección de coberturas', type: 'string', group: 'coberturas', validation: (r) => r.required() }),
    defineField({
      name: 'grupos',
      title: 'Grupos de coberturas',
      description: 'Cada grupo es una tarjeta con su título y la lista de coberturas. Se muestran 3 por renglón en escritorio.',
      type: 'array',
      group: 'coberturas',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'grupoCoberturas',
          fields: [
            defineField({ name: 'titulo', title: 'Título del grupo', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'coberturas',
              title: 'Coberturas del grupo',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'cobertura',
                  fields: [
                    defineField({ name: 'titulo', title: 'Nombre de la cobertura', type: 'string', validation: (r) => r.required() }),
                    defineField({ name: 'texto', title: 'Explicación breve', type: 'text', rows: 3, validation: (r) => r.required() }),
                  ],
                  preview: { select: { title: 'titulo', subtitle: 'texto' } },
                }),
              ],
              validation: (r) => r.required().min(1),
            }),
          ],
          preview: { select: { title: 'titulo' } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'coberturasNota',
      title: 'Nota debajo de las coberturas',
      description: 'Opcional. Texto chico sobre condiciones. Si está vacío no se muestra.',
      type: 'text',
      rows: 2,
      group: 'coberturas',
    }),

    defineField({ name: 'cierreTitulo', title: 'Título del cierre', type: 'string', group: 'cierre', validation: (r) => r.required() }),
    defineField({ name: 'cierreTexto', title: 'Texto del cierre', type: 'text', rows: 5, group: 'cierre', validation: (r) => r.required() }),
    defineField({ name: 'cierreBoton', title: 'Texto del botón', type: 'string', group: 'cierre', validation: (r) => r.required() }),
    defineField({
      name: 'cierreEnlace',
      title: 'Destino del botón (enlace)',
      description:
        'Por definir. Mientras esté vacío el botón no lleva a ningún lado. Cuando se defina, escribe aquí la dirección completa (por ejemplo https://wa.me/525536728897).',
      type: 'url',
      group: 'cierre',
      validation: (r) => r.uri({ scheme: ['http', 'https', 'tel', 'mailto'], allowRelative: true }),
    }),
  ],
  preview: { prepare: () => ({ title: 'Página: Seguros' }) },
})
