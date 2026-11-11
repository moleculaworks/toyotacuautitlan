import { defineField, defineType } from 'sanity'

// Configuración del sitio (documento único, sin lista: ver sanity/structure.ts).
// Hoy solo guarda los datos de contacto que ya son DEFINITIVOS (10 nov 2026): teléfono, los dos WhatsApp
// y la dirección. Horario, correo, redes, extensiones y otros números siguen en revisión: se agregan
// aquí cuando estén definidos. Lo leen el menú (teléfono y WhatsApp) y los datos estructurados para Google.

export const configuracionType = defineType({
  name: 'configuracion',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'telefono',
      title: 'Teléfono principal (10 dígitos, sin espacios ni guiones)',
      description: 'Ejemplo: 5558706655. El sitio lo muestra como "55 5870 6655" y arma solo el enlace de llamada.',
      type: 'string',
      validation: (r) =>
        r.required().regex(/^\d{10}$/, { name: '10 dígitos' }).error('Escribe exactamente 10 dígitos, sin espacios ni guiones.'),
    }),
    defineField({
      name: 'whatsappVentas',
      title: 'WhatsApp de Ventas (10 dígitos, sin espacios ni guiones)',
      description: 'Ejemplo: 5536728897. El sitio arma solo el enlace de WhatsApp (con la lada 52).',
      type: 'string',
      validation: (r) =>
        r.required().regex(/^\d{10}$/, { name: '10 dígitos' }).error('Escribe exactamente 10 dígitos, sin espacios ni guiones.'),
    }),
    defineField({
      name: 'whatsappServicio',
      title: 'WhatsApp de Servicio (10 dígitos, sin espacios ni guiones)',
      description: 'Ejemplo: 5545844859. El sitio arma solo el enlace de WhatsApp (con la lada 52).',
      type: 'string',
      validation: (r) =>
        r.required().regex(/^\d{10}$/, { name: '10 dígitos' }).error('Escribe exactamente 10 dígitos, sin espacios ni guiones.'),
    }),
    defineField({
      name: 'direccion',
      title: 'Dirección física',
      description: 'Un salto de línea parte la dirección en dos renglones.',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Configuración del sitio' }
    },
  },
})
