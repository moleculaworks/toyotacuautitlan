import type { Metadata } from 'next'
import SectionHero from '@/components/ui/SectionHero'
import { placeholders } from '@/lib/data/financiamiento'

export const metadata: Metadata = {
  title: 'Acciones de servicio',
  description: 'Acciones de servicio de Toyota en Toyota Cuautitlán.',
}

// Página provisional (10 nov 2026): el contenido de Acciones de servicio está por definir.
// Mismo patrón que Refacciones: hero heredado con las imágenes placeholder.
export default function AccionesDeServicioPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SectionHero
        titulo="Acciones de servicio"
        subtitulo={'Estamos preparando esta sección.'}
        imagenDesktop={placeholders.heroDesktop}
        imagenMobile={placeholders.heroMobile}
        alt="Acciones de servicio"
      />
      <section id="intro" className="bg-white py-10 max-desktop:pt-0 pb-20 max-desktop:pb-[52px]">
        <div className="max-w-7xl mx-auto px-6 max-desktop:px-4">
          <div className="desktop:hidden w-7 h-[2px] bg-toyota-red mb-5 mx-auto" />
          <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7]">
            Muy pronto encontrarás aquí la información de las acciones de servicio.
          </p>
        </div>
      </section>
    </div>
  )
}
