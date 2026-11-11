import type { Configuracion } from '@/types'

// Datos de contacto DEFINITIVOS del sitio (10 nov 2026). La fuente es el documento "Configuración del sitio"
// de Sanity; los valores de abajo son el respaldo si el documento no existe o un campo está vacío, para que
// el menú nunca se quede sin teléfono. Horario, correo, extensiones y otros números siguen en revisión y
// todavía no viven aquí. Las páginas de muestra (Contacto, Cotización, Cita de servicio) NO se conectan a
// esto a propósito: no son definitivas.
const RESPALDO = {
  telefono: '5558706655',
  whatsappVentas: '5536728897',
  whatsappServicio: '5545844859',
  direccion:
    'Autopista México – Querétaro Km. 37.5\nEsq. Calzada de Guadalupe Col. Fracc. Industrial Cuamatla, Cuautitlán Izcalli, México. C.P. 54730',
}

// "5512345678" -> "55 1234 5678"
export const formatoTelefono = (n: string) => `${n.slice(0, 2)} ${n.slice(2, 6)} ${n.slice(6)}`

export type DatosContacto = {
  telefono: string
  telefonoHref: string
  whatsappVentas: string
  whatsappVentasHref: string
  whatsappServicio: string
  whatsappServicioHref: string
  direccion: string
}

const valido = (n?: string) => (n && /^\d{10}$/.test(n) ? n : undefined)

export function datosContacto(c: Configuracion | null | undefined): DatosContacto {
  const telefono = valido(c?.telefono) ?? RESPALDO.telefono
  const whatsappVentas = valido(c?.whatsappVentas) ?? RESPALDO.whatsappVentas
  const whatsappServicio = valido(c?.whatsappServicio) ?? RESPALDO.whatsappServicio
  return {
    telefono,
    telefonoHref: `tel:${telefono}`,
    whatsappVentas,
    whatsappVentasHref: `https://wa.me/52${whatsappVentas}`,
    whatsappServicio,
    whatsappServicioHref: `https://wa.me/52${whatsappServicio}`,
    direccion: c?.direccion?.trim() || RESPALDO.direccion,
  }
}
