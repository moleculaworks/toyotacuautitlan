import { defineArrayMember, defineField, defineType } from 'sanity'

// Página /servicio/precios (documento único, sin lista: ver sanity/structure.ts).
// TODO se edita aquí, en cualquier momento (los precios, las notas legales y las
// vigencias cambian a fin de año y a veces a medio año). La página se regenera sola
// cada 60 s, sin deploy. Sin guion largo (—) en ningún texto, ver SISTEMA-DE-DISENO.md
// sección 6.
//
// Estructura: la página es una lista ordenable de BLOQUES. Cada bloque es una sección
// con su título y puede llevar tablas de dos tipos:
//   - Tabla de kilometrado: filas "kilometraje → precio" (ej. servicio kilometrado en miles)
//   - Tabla de frenos: tarjetas por modelo o grupo de modelos (4 ruedas, delanteras, traseras)
// Se pueden agregar, quitar y reordenar bloques y tablas sin tocar código.

const notasFields = [
  defineField({
    name: 'notas',
    title: 'Notas y excepciones',
    description:
      'Todo lo que va bajo la tabla: IVA incluido, vigencia, aceite genuino, asteriscos y excepciones. Se muestran dentro de "Ver notas y excepciones" (cerrado hasta que el visitante lo abre), a todo el ancho de la página. Una nota por renglón.',
    type: 'array',
    of: [defineArrayMember({ type: 'text', rows: 2 })],
  }),
]

export const tablaKilometradoType = defineType({
  name: 'tablaKilometrado',
  title: 'Tabla de kilometrado',
  type: 'object',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título de la tabla',
      description: 'Ej: "Servicio kilometrado en miles". Opcional si el bloque ya tiene el título.',
      type: 'string',
    }),
    defineField({
      name: 'detalle',
      title: 'Línea bajo el título',
      description: 'Ej: "Servicio cada 12 meses o 10,000 km". Opcional.',
      type: 'string',
    }),
    defineField({
      name: 'encabezadoPrimera',
      title: 'Encabezado de la columna de kilometraje',
      description: 'Por defecto: "Kilometraje (en miles)".',
      type: 'string',
    }),
    defineField({
      name: 'filas',
      title: 'Filas',
      type: 'array',
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'intervalo',
              title: 'Kilometraje o intervalo',
              description: 'Ej: "10, 30, 50, 70, 90, 110, 130, 150, 170 y 190" o "100 y 200 (4 cilindros) *".',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({ name: 'detalle', title: 'Detalle (opcional, texto pequeño)', type: 'string' }),
            defineField({
              name: 'precio',
              title: 'Precio en pesos (M.N., con IVA)',
              description: 'Solo el número, sin signo ni comas. Ej: 2195.',
              type: 'number',
              validation: (r) => r.required().min(0),
            }),
            defineField({
              name: 'precioTexto',
              title: 'Texto en lugar del precio (opcional)',
              description: 'Si se llena, se muestra este texto y no el número. Ej: "Consultar".',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'intervalo', precio: 'precio' },
            prepare: ({ title, precio }: { title?: string; precio?: number }) => ({
              title,
              subtitle: precio === undefined ? '' : `$${precio.toLocaleString('es-MX')}`,
            }),
          },
        }),
      ],
    }),
    ...notasFields,
  ],
  preview: {
    select: { title: 'titulo', filas: 'filas' },
    prepare: ({ title, filas }: { title?: string; filas?: unknown[] }) => ({
      title: title || 'Tabla de kilometrado',
      subtitle: `Kilometrado, ${filas?.length ?? 0} filas`,
    }),
  },
})

export const tablaFrenosType = defineType({
  name: 'tablaFrenos',
  title: 'Tabla de frenos',
  type: 'object',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título de la tabla',
      description: 'Ej: "Servicio de frenos". Opcional si el bloque ya tiene el título.',
      type: 'string',
    }),
    defineField({ name: 'detalle', title: 'Línea bajo el título', type: 'string' }),
    defineField({
      name: 'tarjetas',
      title: 'Tarjetas (una por modelo o grupo de modelos)',
      type: 'array',
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'modelos',
              title: 'Modelo o grupo de modelos',
              description:
                'Ej: "HILUX" o "COROLLA, CAMRY, RAV4, PRIUS". Se puede dejar vacío cuando el título del bloque o de la columna ya dice el modelo.',
              type: 'string',
            }),
            defineField({
              name: 'detalle',
              title: 'Detalle (opcional, texto pequeño)',
              description: 'Ej: "Gasolina, diésel, MHEV".',
              type: 'string',
            }),
            defineField({
              name: 'anchoDoble',
              title: 'Ocupar dos columnas',
              description: 'Actívalo para una tarjeta con un nombre muy largo (por ejemplo, un grupo de varios modelos), para que se acomode mejor.',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({ name: 'cuatroRuedas', title: 'Precio de 4 ruedas', type: 'number', validation: (r) => r.required().min(0) }),
            defineField({ name: 'delanteras', title: 'Precio de delanteras', type: 'number', validation: (r) => r.required().min(0) }),
            defineField({ name: 'traseras', title: 'Precio de traseras', type: 'number', validation: (r) => r.required().min(0) }),
          ],
          preview: {
            select: { title: 'modelos', subtitle: 'detalle' },
          },
        }),
      ],
    }),
    ...notasFields,
  ],
  preview: {
    select: { title: 'titulo', tarjetas: 'tarjetas' },
    prepare: ({ title, tarjetas }: { title?: string; tarjetas?: unknown[] }) => ({
      title: title || 'Tabla de frenos',
      subtitle: `Frenos, ${tarjetas?.length ?? 0} tarjetas`,
    }),
  },
})

export const paginaPreciosServicioType = defineType({
  name: 'paginaPreciosServicio',
  title: 'Página: Precios de servicio',
  type: 'document',
  groups: [
    { name: 'portada', title: 'Portada', default: true },
    { name: 'bloques', title: 'Bloques y tablas' },
    { name: 'notas', title: 'Notas generales' },
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
    defineField({ name: 'intro', title: 'Párrafo introductorio', type: 'text', rows: 4, group: 'portada', validation: (r) => r.required() }),
    defineField({
      name: 'seoDescripcion',
      title: 'Descripción para Google y para compartir (máx. 160 caracteres)',
      description: 'Sin precio ni año. Es el texto que sale junto al enlace en WhatsApp y Google.',
      type: 'text',
      rows: 2,
      group: 'portada',
      validation: (r) => r.max(160),
    }),

    defineField({
      name: 'bloques',
      title: 'Bloques de la página (en orden)',
      description:
        'Cada bloque es una sección con su título. Dentro lleva tablas de kilometrado o de frenos. Se pueden agregar, quitar y reordenar arrastrando.',
      type: 'array',
      group: 'bloques',
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'bloqueServicio',
          title: 'Bloque',
          fields: [
            defineField({
              name: 'titulo',
              title: 'Título del bloque',
              description: 'Ej: "Servicio kilometrado", "Servicio de frenos" o "RAV4 PHEV".',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'acceso',
              title: 'Nombre corto para el acceso rápido',
              description: 'Es el texto del botón de arriba que salta a este bloque. Si se deja vacío se usa el título.',
              type: 'string',
            }),
            defineField({ name: 'texto', title: 'Texto breve bajo el título (opcional)', type: 'text', rows: 3 }),
            defineField({
              name: 'vigencia',
              title: 'Línea de precios y vigencia (opcional)',
              description:
                'Ej: "Precios en M.N., I.V.A. incluido. Vigencia: del 1 de julio al 31 de diciembre de 2026". Se muestra bajo el título y cubre todas las tablas del bloque (por eso aquí se dice la moneda).',
              type: 'string',
            }),
            defineField({
              name: 'notas',
              title: 'Notas y excepciones del bloque (una sola vez, al final del bloque)',
              description:
                'Para las notas que comparten varios modelos de un bloque (por ejemplo, GR y Supra), para no repetirlas en cada uno. Se muestran en un "Ver notas y excepciones" debajo de todo el bloque. Una nota por renglón.',
              type: 'array',
              of: [defineArrayMember({ type: 'text', rows: 2 })],
            }),
            defineField({
              name: 'tablas',
              title: 'Tablas del bloque (una debajo de otra)',
              description: 'Para un bloque normal. Si el bloque usa modelos en filas (abajo), déjalo vacío.',
              type: 'array',
              of: [defineArrayMember({ type: 'tablaKilometrado' }), defineArrayMember({ type: 'tablaFrenos' })],
            }),
            defineField({
              name: 'modelos',
              title: 'Modelos (cada uno en su propia fila)',
              description:
                'Para agrupar varios modelos en un solo bloque. Cada modelo se ve en una fila: tabla de kilometrado a la izquierda, frenos a la derecha y las notas de ambas debajo. En móvil, todo en una columna.',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'modeloServicio',
                  title: 'Modelo',
                  fields: [
                    defineField({ name: 'titulo', title: 'Nombre del modelo', type: 'string', validation: (r) => r.required() }),
                    defineField({ name: 'detalle', title: 'Línea bajo el nombre (opcional)', type: 'string' }),
                    defineField({
                      name: 'tablas',
                      title: 'Tablas del modelo',
                      description: 'Normalmente una de kilometrado y una de frenos.',
                      type: 'array',
                      validation: (r) => r.required().min(1),
                      of: [defineArrayMember({ type: 'tablaKilometrado' }), defineArrayMember({ type: 'tablaFrenos' })],
                    }),
                  ],
                  preview: {
                    select: { title: 'titulo', tablas: 'tablas' },
                    prepare: ({ title, tablas }: { title?: string; tablas?: unknown[] }) => ({
                      title,
                      subtitle: `${tablas?.length ?? 0} tabla(s)`,
                    }),
                  },
                }),
              ],
            }),
          ],
          validation: (r) =>
            r.custom((b) => {
              const bloque = b as { tablas?: unknown[]; modelos?: unknown[] } | undefined
              return (bloque?.tablas?.length ?? 0) + (bloque?.modelos?.length ?? 0) > 0
                ? true
                : 'El bloque necesita tablas o modelos.'
            }),
          preview: {
            select: { title: 'titulo', tablas: 'tablas', modelos: 'modelos', vigencia: 'vigencia' },
            prepare: ({
              title,
              tablas,
              modelos,
              vigencia,
            }: {
              title?: string
              tablas?: unknown[]
              modelos?: unknown[]
              vigencia?: string
            }) => ({
              title,
              subtitle: `${
                modelos?.length ? `${modelos.length} modelo(s)` : `${tablas?.length ?? 0} tabla(s)`
              }${vigencia ? ` · ${vigencia}` : ''}`,
            }),
          },
        }),
      ],
    }),

    defineField({
      name: 'notasGenerales',
      title: 'Notas y excepciones generales (al final de la página)',
      description: 'Avisos que aplican a toda la página. Se muestran en un "Ver notas y excepciones" al final. Una nota por renglón.',
      type: 'array',
      group: 'notas',
      of: [defineArrayMember({ type: 'text', rows: 2 })],
    }),
  ],
  preview: { prepare: () => ({ title: 'Página: Precios de servicio' }) },
})
