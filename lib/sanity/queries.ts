import { client } from './client'
import { groq } from 'next-sanity'

// Modelos
export async function getModelos() {
  return client.fetch(groq`
    *[_type == "modelo"] | order(orden asc) {
      _id, nombre, slug, categoria, precioDesde, descripcionCorta, destacado,
      imagenPrincipal { asset->{ url, metadata { lqip } } }
    }
  `)
}

export async function getModeloDestacados() {
  return client.fetch(groq`
    *[_type == "modelo" && destacado == true] | order(orden asc) [0...6] {
      _id, nombre, slug, categoria, precioDesde, descripcionCorta,
      imagenPrincipal { asset->{ url, metadata { lqip } } }
    }
  `)
}

// Otros modelos para la sección "Modelos similares" al final de una página
// de modelo — cualquier otro modelo (sin filtrar por categoría todavía),
// excluyendo el que se está viendo.
export async function getModelosSimilares(slugActual: string, limite = 3) {
  return client.fetch(
    groq`
      *[_type == "modelo" && slug.current != $slugActual] | order(orden asc) [0...$limite] {
        nombre, slug, categoria, precioDesde,
        imagenPrincipal { asset->{ url, metadata { lqip } } }
      }
    `,
    { slugActual, limite }
  )
}

export async function getModeloBySlug(slug: string) {
  return client.fetch(groq`
    *[_type == "modelo" && slug.current == $slug][0] {
      _id, nombre, slug, categoria, anio, precioDesde, descripcion,
      descripcionCorta, caracteristicas, heroSubtitulo,
      imagenPrincipal { asset->{ url, metadata { lqip } } },
      versiones[] {
        nombre, precio, caracteristicas,
        imagen { asset->{ url, metadata { lqip } } }
      },
      heroDesktop { asset->{ url } },
      heroMobile { asset->{ url } },
      imagenDestacado { asset->{ url } },
      imagenRendimiento { asset->{ url } },
      coloresExterior[] {
        label, hex, necesitaBorde,
        imagenes360[] { asset->{ url } }
      },
      galeriaExteriorDetalle[] { asset->{ url, metadata { lqip } } },
      galeriaInteriorDetalle[] { asset->{ url, metadata { lqip } } },
      versionesTexto,
      exteriorTitulo, exteriorTexto,
      destacadoEyebrow, destacadoTitulo, destacadoTexto,
      seguridadTitulo, seguridadTexto, seguridadItems,
      galeriaTitulo, galeriaTexto,
      rendimientoEyebrow, rendimientoTitulo, rendimientoTexto,
      rendimientoFilas[] { transmision, valor, unidad },
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
