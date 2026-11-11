import SectionHero from '@/components/ui/SectionHero'
import { placeholders } from '@/lib/data/financiamiento'

// Página provisional de una sección que todavía no tiene contenido (10 nov 2026): hero heredado con las
// imágenes de reserva y una frase de aviso. Se usa mientras se define cada sección; al construirla de
// verdad, la página deja de usar este componente.
export default function SeccionProvisional({ titulo, aviso }: { titulo: string; aviso: string }) {
  return (
    <div className="bg-background text-foreground antialiased">
      <SectionHero
        titulo={titulo}
        subtitulo={'Estamos preparando esta sección.'}
        imagenDesktop={placeholders.heroDesktop}
        imagenMobile={placeholders.heroMobile}
        alt={titulo}
      />
      <section id="intro" className="bg-white py-10 max-desktop:pt-0 pb-20 max-desktop:pb-[52px]">
        <div className="max-w-7xl mx-auto px-6 max-desktop:px-4">
          <div className="desktop:hidden w-7 h-[2px] bg-toyota-red mb-5 mx-auto" />
          <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7]">{aviso}</p>
        </div>
      </section>
    </div>
  )
}
