export interface Modelo {
  _id: string
  nombre: string
  slug: { current: string }
  categoria: 'sedan' | 'suv' | 'pickup' | 'hatchback' | 'hibrido' | 'van' | 'comercial'
  precioDesde: number
  descripcionCorta?: string
  descripcion?: unknown[]
  caracteristicas?: { icono?: string; titulo: string; valor: string }[]
  destacado?: boolean
  imagenPrincipal?: { asset: { url: string; metadata: { lqip: string } } }
  galeria?: { asset: { url: string; metadata: { lqip: string } } }[]
  seoTitulo?: string
  seoDescripcion?: string
}

export interface Promocion {
  _id: string
  titulo: string
  slug: { current: string }
  descripcion: string
  etiqueta?: string
  vigenciaHasta?: string
  activa: boolean
  destacada?: boolean
  imagen?: { asset: { url: string; metadata: { lqip: string } } }
  modelo?: { nombre: string; slug: { current: string } }
}

export interface Configuracion {
  telefono?: string
  telefonoWhatsApp?: string
  email?: string
  direccion?: string
  horario?: string
  googleMapsUrl?: string
  facebook?: string
  instagram?: string
  bannersHomepage?: {
    titulo?: string
    subtitulo?: string
    ctaTexto?: string
    ctaUrl?: string
    imagen?: { asset: { url: string; metadata: { lqip: string } } }
  }[]
}
