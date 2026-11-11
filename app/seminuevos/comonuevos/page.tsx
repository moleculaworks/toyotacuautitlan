import type { Metadata } from 'next'
import SeccionProvisional from '@/components/ui/SeccionProvisional'

export const metadata: Metadata = {
  title: 'Comonuevos',
  description: 'Seminuevos Comonuevos en Toyota Cuautitlán.',
}

// Página provisional (10 nov 2026): el contenido está por definir.
export default function ComonuevosPage() {
  return <SeccionProvisional titulo="Comonuevos" aviso="Muy pronto encontrarás aquí la información de Comonuevos." />
}
