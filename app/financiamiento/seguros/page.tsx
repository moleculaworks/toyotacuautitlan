import type { Metadata } from 'next'
import SeccionProvisional from '@/components/ui/SeccionProvisional'

export const metadata: Metadata = {
  title: 'Seguros',
  description: 'Seguros para tu Toyota en Toyota Cuautitlán.',
}

// Página provisional (10 nov 2026): el contenido está por definir.
export default function SegurosPage() {
  return <SeccionProvisional titulo="Seguros" aviso="Muy pronto encontrarás aquí la información de los seguros." />
}
