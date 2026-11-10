import { client } from './client'
import { groq } from 'next-sanity'
import type { Modelo } from '@/types'

// Modelos
// Ordenados por precio de menor a mayor (acordado 9 nov 2026, igual que el menú de
// toyota.mx): lo usan el mega-menú de escritorio, el acordeón móvil y el catálogo
// /modelos, que filtran por categoría sin cambiar este orden. `nombre` desempata.
// El campo `orden` de Sanity ya no manda aquí (valía 99 o vacío en los 24 modelos).
export async function getModelos() {
  return client.fetch(groq`
    *[_type == "modelo"] | order(precioDesde asc, nombre asc) {
      _id, nombre, slug, categoria, esHibridoElectrico, precioDesde, descripcionCorta, destacado,
      imagenTarjeta { asset->{ url, metadata { lqip } } }
    }
  `)
}

export async function getModeloDestacados() {
  return client.fetch(groq`
    *[_type == "modelo" && destacado == true] | order(orden asc) [0...6] {
      _id, nombre, slug, categoria, precioDesde, descripcionCorta,
      imagenTarjeta { asset->{ url, metadata { lqip } } }
    }
  `)
}

// Modelos para la sección "Modelos similares" al final de una página de modelo
// (acordado 9 nov 2026). Primero los de la misma categoría, del más cercano en
// precio al que se está viendo; si la categoría no alcanza para `limite`
// (ej. Gazoo Racing solo tiene 2 modelos), se completa con los de otras
// categorías, también por cercanía de precio. Nunca incluye el modelo actual.
// Se muestran de menor a mayor precio. El campo `orden` de Sanity ya no interviene.
export async function getModelosSimilares(slugActual: string, limite = 3) {
  const todos: Modelo[] = await client.fetch(groq`
    *[_type == "modelo"] {
      _id, nombre, slug, categoria, precioDesde, descripcionCorta,
      imagenTarjeta { asset->{ url, metadata { lqip } } }
    }
  `)

  const actual = todos.find((m) => m.slug.current === slugActual)
  if (!actual) return []

  const distancia = (m: Modelo) =>
    Math.abs((m.precioDesde ?? 0) - (actual.precioDesde ?? 0))
  const porCercania = (a: Modelo, b: Modelo) =>
    distancia(a) - distancia(b)

  const otros = todos.filter((m) => m.slug.current !== slugActual)
  const mismaCategoria = otros.filter((m) => m.categoria === actual.categoria).sort(porCercania)
  const restoDeCategorias = otros.filter((m) => m.categoria !== actual.categoria).sort(porCercania)

  return [...mismaCategoria, ...restoDeCategorias]
    .slice(0, limite)
    .sort((a, b) => (a.precioDesde ?? 0) - (b.precioDesde ?? 0))
}

export async function getModeloBySlug(slug: string) {
  return client.fetch(groq`
    *[_type == "modelo" && slug.current == $slug][0] {
      _id, nombre, slug, categoria, anio, precioDesde, descripcion,
      descripcionCorta, caracteristicas, heroSubtitulo,
      imagenTarjeta { asset->{ url, metadata { lqip } } },
      versiones[] {
        nombre, precio, caracteristicas,
        imagen { asset->{ url, metadata { lqip } } }
      },
      heroDesktop { asset->{ url } },
      heroMobile { asset->{ url } },
      imagenDestacado { asset->{ url } },
      imagenRendimiento { asset->{ url } },
      coloresExterior[] {
        label, hex, hexSecundario, necesitaBorde,
        imagenes360[] { asset->{ url } }
      },
      galeriaExteriorDetalle[] { asset->{ url, metadata { lqip } } },
      galeriaInteriorDetalle[] { asset->{ url, metadata { lqip } } },
      versionesTexto,
      disenoTitulo, disenoTexto,
      destacadoEyebrow, destacadoTitulo, destacadoTexto,
      seguridadTitulo, seguridadTexto, seguridadItems,
      galeriaTitulo, galeriaTexto,
      rendimientoEyebrow, rendimientoTitulo, rendimientoTexto,
      rendimientoColumnaTitulo,
      rendimientoFilas[] { transmision, detalle, valor, unidad },
      fichasTecnicas[] { nombre, "url": archivo.asset->url },
      seoTitulo, seoDescripcion
    }
  `, { slug })
}

// Promociones
export async function getPromociones() {
  return client.fetch(groq`
    *[_type == "promocion" && activa == true] | order(_createdAt desc) {
      _id, titulo, slug, descripcion, etiqueta, vigenciaHasta, destacada,
      imagen { asset->{ url, metadata { lqip } } },
      modelo->{ nombre, slug }
    }
  `)
}

export async function getPromocionesDestacadas() {
  return client.fetch(groq`
    *[_type == "promocion" && activa == true && destacada == true] | order(_createdAt desc) [0...3] {
      _id, titulo, slug, descripcion, etiqueta, vigenciaHasta,
      imagen { asset->{ url, metadata { lqip } } },
      modelo->{ nombre, slug }
    }
  `)
}

// Configuración
export async function getConfiguracion() {
  return client.fetch(groq`
    *[_type == "configuracion"][0] {
      telefono, telefonoWhatsApp, email, direccion, horario,
      googleMapsUrl, facebook, instagram,
      bannersHomepage[] {
        titulo, subtitulo, ctaTexto, ctaUrl,
        imagen { asset->{ url, metadata { lqip } } }
      }
    }
  `)
}

// Página de sección /financiamiento (documento único, id fijo: paginaFinanciamiento)
export async function getPaginaFinanciamiento() {
  return client.fetch(groq`
    *[_type == "paginaFinanciamiento" && _id == "paginaFinanciamiento"][0] {
      heroTitulo, heroSubtitulo, heroAlt, intro, seoDescripcion,
      heroDesktop { asset->{ url } },
      heroMobile { asset->{ url } },
      planesTitulo, planesDestacado, planesTexto,
      planes[] { _key, titulo, descripcion, detalles, imagenAlt, imagen { asset->{ url } } },
      arrendamientosTitulo, arrendamientosDestacado, arrendamientosTexto,
      arrendamientos[] { _key, titulo, descripcion, detalles, imagenAlt, imagen { asset->{ url } } },
      beneficiosTitulo,
      beneficios[] { _key, titulo, texto, icono }
    }
  `)
}
