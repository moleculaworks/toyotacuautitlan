import { defineArrayMember, defineField, defineType } from 'sanity'

// Página /postventa/refacciones (documento único, sin lista: ver sanity/structure.ts).
// Todos los textos se editan aquí. Las imágenes son opcionales: si no hay una subida, la página usa
// las de public/images/postventa/. Sin guion largo (—) en ningún texto, ver SISTEMA-DE-DISENO.md sección 6.

export const paginaRefaccionesType = defineType({
  name: 'paginaRefacciones',
  title: 'Página: Refacciones',
  type: 'document',
  groups: [
    { name: 'portada', title: 'Portada', default: true },
    { name: 'contacto', title: 'Contacto' },
    { name: 'ventajas', title: 'Ventajas' },
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
      title: 'Imagen de portada, escritorio (2880 × 1020 px, WebP)',
      description: 'Opcional. Si está vacía se usa la imagen incluida en el sitio.',
      type: 'image',
      group: 'portada',
    }),
    defineField({
      name: 'heroMobile',
      title: 'Imagen de portada, móvil (2400 × 1800 px, WebP)',
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

    defineField({ name: 'contactoTitulo', title: 'Título de la sección de contacto', type: 'string', group: 'contacto', validation: (r) => r.required() }),
    defineField({
      name: 'canales',
      title: 'Formas de contacto',
      description:
        'Se muestran en tarjetas, una junto a la otra. El tipo define el ícono y el enlace (llamada o WhatsApp); los dos botones llevan el mismo estilo.',
      type: 'array',
      group: 'contacto',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'canal',
          fields: [
            defineField({
              name: 'tipo',
              title: 'Tipo',
              type: 'string',
              options: {
                list: [
                  { title: 'Teléfono', value: 'telefono' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                ],
                layout: 'radio',
              },
              validation: (r) => r.required(),
            }),
            defineField({ name: 'titulo', title: 'Título de la tarjeta', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'numero',
              title: 'Número (10 dígitos, sin espacios ni guiones)',
              description:
                'Ejemplo: 5512345678. El sitio lo muestra como "55 1234 5678" y arma solo el enlace de llamada o de WhatsApp (con la lada 52).',
              type: 'string',
              validation: (r) => r.required().regex(/^\d{10}$/, { name: '10 dígitos' }).error('Escribe exactamente 10 dígitos, sin espacios ni guiones.'),
            }),
            defineField({ name: 'texto', title: 'Texto de apoyo', type: 'text', rows: 3, validation: (r) => r.required() }),
            defineField({ name: 'boton', title: 'Texto del botón', type: 'string', validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'titulo', subtitle: 'numero' } },
        }),
      ],
      validation: (r) => r.required().min(1).max(2),
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
                  { title: 'Seguridad (escudo con palomita)', value: 'seguridad' },
                  { title: 'Engranes (ajuste)', value: 'engranes' },
                  { title: 'Velocímetro (desempeño)', value: 'velocimetro' },
                  { title: 'Sello de garantía (respaldo)', value: 'sello' },
                  { title: 'Protección (escudo con auto)', value: 'proteccion' },
                  { title: 'Confianza (candado)', value: 'confianza' },
                ],
              },
            }),
          ],
          preview: { select: { title: 'titulo', subtitle: 'texto' } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: { prepare: () => ({ title: 'Página: Refacciones' }) },
})
