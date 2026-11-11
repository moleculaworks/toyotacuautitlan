import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-23',
  // Sin la copia intermedia (CDN) de Sanity: el aviso automático (app/api/revalidate) regenera
  // las páginas al publicar, y con la CDN podían leer todavía el dato anterior (hasta ~5 min).
  // Solo se consulta al regenerar una página, no en cada visita, así que el volumen es bajo.
  useCdn: false,
})
