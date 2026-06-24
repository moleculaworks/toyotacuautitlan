import { z } from 'zod'

export const cotizacionSchema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre completo'),
  telefono: z.string().min(10, 'Ingresa un teléfono válido de 10 dígitos').max(15),
  email: z.string().email('Ingresa un correo válido'),
  modelo: z.string().min(1, 'Selecciona un modelo'),
  formaPago: z.enum(['contado', 'credito']).refine((v) => v, { message: 'Selecciona una forma de pago' }),
  plazoCompra: z.enum(['inmediato', '1-3meses', '3-6meses', 'solo-info']).refine((v) => v, {
    message: 'Selecciona un plazo',
  }),
  comentarios: z.string().max(500).optional(),
})

export type CotizacionData = z.infer<typeof cotizacionSchema>
