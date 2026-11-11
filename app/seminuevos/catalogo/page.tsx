import type { Metadata } from 'next'
import SeccionProvisional from '@/components/ui/SeccionProvisional'

export const metadata: Metadata = {
  title: 'Catálogo',
  description: 'Catálogo de seminuevos en Toyota Cuautitlán.',
}

// Página provisional (10 nov 2026): el contenido está por definir.
export default function CatalogoSeminuevosPage() {
  return <SeccionProvisional titulo="Catálogo" aviso="Muy pronto encontrarás aquí el catálogo de seminuevos." />
}
