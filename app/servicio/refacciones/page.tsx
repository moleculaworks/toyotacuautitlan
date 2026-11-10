import type { Metadata } from 'next'
import SectionHero from '@/components/ui/SectionHero'
import { placeholders } from '@/lib/data/financiamiento'

export const metadata: Metadata = {
  title: 'Refacciones',
  description: 'Refacciones Toyota en Toyota Cuautitlán.',
}

// Página provisional: el contenido de Refacciones está por definir (10 nov 2026). Hero heredado
// de las páginas de sección con las imágenes placeholder. No subir a producción hasta que
// exista el contenido real.
export default function RefaccionesPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SectionHero
        titulo="Refacciones"
        subtitulo={'Estamos preparando esta sección.'}
        imagenDesktop={placeholders.heroDesktop}
        imagenMobile={placeholders.heroMobile}
        alt="Refacciones"
      />
      <section id="intro" className="bg-white py-10 max-desktop:pt-0 pb-20 max-desktop:pb-[52px]">
        <div className="max-w-7xl mx-auto px-6 max-desktop:px-4">
          <div className="desktop:hidden w-7 h-[2px] bg-toyota-red mb-5 mx-auto" />
          <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7]">
            Muy pronto encontrarás aquí la información de refacciones.
          </p>
        </div>
      </section>
    </div>
  )
}
