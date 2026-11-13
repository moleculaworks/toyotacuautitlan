import { defineArrayMember, defineField, defineType } from 'sanity'

// Página /seminuevos/comonuevos (documento único, sin lista: ver sanity/structure.ts).
// Todos los textos se editan aquí. Las imágenes son opcionales: si no hay una subida, la página usa las de
// public/images/comonuevos/. El logo de Comonuevos (sello de la franja de inspección) vive en el código.
// Sin guion largo (—) en ningún texto, ver SISTEMA-DE-DISENO.md sección 6.

export const paginaComonuevosType = defineType({
  name: 'paginaComonuevos',
  title: 'Página: Comonuevos',
  type: 'document',
  groups: [
    { name: 'portada', title: 'Portada', default: true },
    { name: 'ventajas', title: 'Por qué elegir' },
    { name: 'requisitos', title: 'Requisitos' },
    { name: 'inspeccion', title: 'Inspección' },
    { name: 'cierre', title: 'Cierre' },
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
      description:
        'Se muestran en 3 columnas, cada una con su imagen (800 × 450 px, WebP). Si no subes imagen, se usa la incluida en el sitio según la posición (1: garantía, 2: profesionales, 3: tranquilidad).',
      type: 'array',
      group: 'ventajas',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'ventaja',
          fields: [
            defineField({ name: 'titulo', title: 'Título', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'texto', title: 'Texto', type: 'text', rows: 3, validation: (r) => r.required() }),
            defineField({ name: 'imagen', title: 'Imagen (800 × 450 px, WebP)', description: 'Opcional.', type: 'image' }),
            defineField({ name: 'imagenAlt', title: 'Texto alternativo de la imagen', type: 'string' }),
          ],
          preview: { select: { title: 'titulo', subtitle: 'texto' } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),

    defineField({ name: 'requisitosTitulo', title: 'Título de la sección de requisitos', type: 'string', group: 'requisitos', validation: (r) => r.required() }),
    defineField({
      name: 'requisitos',
      title: 'Requisitos',
      description: 'Se muestran en 4 columnas. Cada uno lleva un ícono de marca.',
      type: 'array',
      group: 'requisitos',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'requisito',
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
                  { title: 'De un distribuidor autorizado (agencia con toldo)', value: 'distribuidor' },
                  { title: 'Kilometraje (velocímetro)', value: 'velocimetro' },
                  { title: 'Mantenimientos (herramientas)', value: 'mantenimiento' },
                  { title: 'Inspección (portapapeles con casillas)', value: 'inspeccion' },
                  { title: 'Seguridad (escudo con palomita)', value: 'seguridad' },
                  { title: 'Sello de garantía (respaldo)', value: 'sello' },
                  { title: 'Técnicos certificados (persona con llave)', value: 'tecnicos' },
                  { title: 'Refacciones originales (caja con engrane)', value: 'refacciones' },
                  { title: 'Confianza (candado)', value: 'confianza' },
                  { title: 'Tranquilidad', value: 'tranquilidad' },
                ],
              },
            }),
          ],
          preview: { select: { title: 'titulo', subtitle: 'texto' } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),

    defineField({ name: 'inspeccionTitulo', title: 'Título de la franja de inspección', type: 'string', group: 'inspeccion', validation: (r) => r.required() }),
    defineField({
      name: 'inspeccionTexto',
      title: 'Texto debajo del título',
      type: 'text',
      rows: 3,
      group: 'inspeccion',
    }),
    defineField({
      name: 'inspeccionGrupos',
      title: 'Grupos de puntos de inspección',
      description: 'Cada grupo es una tarjeta con su título y la lista de puntos. Se muestran 3 por renglón en escritorio. El logo de Comonuevos va como sello arriba de la tercera tarjeta.',
      type: 'array',
      group: 'inspeccion',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'grupoInspeccion',
          fields: [
            defineField({ name: 'titulo', title: 'Título del grupo', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'puntos',
              title: 'Puntos del grupo',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'puntoInspeccion',
                  fields: [
                    defineField({ name: 'titulo', title: 'Nombre del punto', type: 'string', validation: (r) => r.required() }),
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

    defineField({ name: 'cierreTitulo', title: 'Título del cierre', type: 'string', group: 'cierre', validation: (r) => r.required() }),
    defineField({
      name: 'acciones',
      title: 'Tarjetas del cierre',
      description: 'Una tarjeta por acción (comprar, vender), con su botón. Se muestran 2 por renglón en escritorio.',
      type: 'array',
      group: 'cierre',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'accion',
          fields: [
            defineField({ name: 'titulo', title: 'Título', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'texto', title: 'Texto', type: 'text', rows: 3, validation: (r) => r.required() }),
            defineField({ name: 'boton', title: 'Texto del botón', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'enlace',
              title: 'Destino del botón (enlace)',
              description:
                'Por definir. Mientras esté vacío el botón no lleva a ningún lado. Cuando se defina, escribe aquí la dirección completa (por ejemplo https://wa.me/525536728897).',
              type: 'url',
              validation: (r) => r.uri({ scheme: ['http', 'https', 'tel', 'mailto'], allowRelative: true }),
            }),
          ],
          preview: { select: { title: 'titulo', subtitle: 'boton' } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: { prepare: () => ({ title: 'Página: Comonuevos' }) },
})
