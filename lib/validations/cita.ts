import { z } from 'zod'

export const citaSchema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre completo'),
  telefono: z.string().min(10, 'Ingresa un teléfono válido de 10 dígitos').max(15),
  email: z.string().email('Ingresa un correo válido'),
  modelo: z.string().min(2, 'Ingresa el modelo de tu vehículo'),
  anio: z.string().min(4, 'Ingresa el año').max(4),
  servicio: z.enum(['mantenimiento', 'revision', 'garantia', 'colision', 'otro']).refine((v) => v, {
    message: 'Selecciona el tipo de servicio',
  }),
  fecha: z.string().min(1, 'Selecciona una fecha'),
  comentarios: z.string().max(500).optional(),
})

export type CitaData = z.infer<typeof citaSchema>
