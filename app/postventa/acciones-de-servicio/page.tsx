import type { Metadata } from 'next'
import SeccionProvisional from '@/components/ui/SeccionProvisional'

export const metadata: Metadata = {
  title: 'Acciones de servicio',
  description: 'Acciones de servicio de Toyota en Toyota Cuautitlán.',
}

// Página provisional (10 nov 2026): el contenido está por definir.
export default function AccionesDeServicioPage() {
  return <SeccionProvisional titulo="Acciones de servicio" aviso="Muy pronto encontrarás aquí la información de las acciones de servicio." />
}
