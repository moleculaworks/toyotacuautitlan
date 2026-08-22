import type { MetadataRoute } from 'next'

// Bloquea toda indexación mientras el sitio vive en la URL temporal de
// Vercel (aún no en el dominio final de la agencia). IMPORTANTE: quitar
// este bloqueo (permitir "/") antes del lanzamiento real, o Google nunca
// indexará el sitio — ver PROYECTO.md, sección SEO.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
