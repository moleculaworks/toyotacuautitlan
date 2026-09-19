import { SITE_URL } from '@/lib/site'
import type { Configuracion } from '@/types'

// Arma los objetos JSON-LD (Schema.org) del sitio. No se renderiza nada
// aquí directamente — ver components/JsonLd.tsx para el <script> que los
// inyecta. Mismo criterio que el resto del sitio: un campo solo se incluye
// si el dato ya existe en Sanity, nunca se inventa un valor de relleno.

export function buildAutoDealerJsonLd(configuracion: Configuracion | null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'Toyota Cuautitlán',
    url: SITE_URL,
    ...(configuracion?.telefono && { telephone: configuracion.telefono }),
    ...(configuracion?.email && { email: configuracion.email }),
    ...(configuracion?.direccion && {
      address: { '@type': 'PostalAddress', streetAddress: configuracion.direccion },
    }),
    ...(configuracion?.googleMapsUrl && { hasMap: configuracion.googleMapsUrl }),
    ...((configuracion?.facebook || configuracion?.instagram) && {
      sameAs: [configuracion.facebook, configuracion.instagram].filter(Boolean),
    }),
  }
}

interface ModeloParaJsonLd {
  nombre: string
  slug: { current: string }
  anio?: number
  precioDesde: number
  descripcionCorta?: string
  seoDescripcion?: string
  imagenTarjeta?: { asset?: { url: string } }
  heroDesktop?: { asset?: { url: string } }
}

export function buildVehicleJsonLd(modelo: ModeloParaJsonLd) {
  const url = `${SITE_URL}/modelos/${modelo.slug.current}`
  const imagen = modelo.heroDesktop?.asset?.url ?? modelo.imagenTarjeta?.asset?.url

  return {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `Toyota ${modelo.nombre}`,
    brand: { '@type': 'Brand', name: 'Toyota' },
    model: modelo.nombre,
    url,
    ...(modelo.anio && { vehicleModelDate: String(modelo.anio) }),
    ...(imagen && { image: imagen }),
    description: modelo.seoDescripcion ?? modelo.descripcionCorta ?? `Toyota ${modelo.nombre} en Toyota Cuautitlán.`,
    offers: {
      '@type': 'Offer',
      price: modelo.precioDesde,
      priceCurrency: 'MXN',
      availability: 'https://schema.org/InStock',
      url,
      seller: { '@type': 'AutoDealer', name: 'Toyota Cuautitlán' },
    },
  }
}
