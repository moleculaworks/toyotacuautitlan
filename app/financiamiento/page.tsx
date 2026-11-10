import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Button from '@/components/ui/Button'
import SectionHero from '@/components/ui/SectionHero'
import HighlightIcon from '@/components/ui/HighlightIcon'
import IconoGenerico from '@/components/ui/IconoGenerico'
import PlanGrid from '@/components/financiamiento/PlanGrid'
import type { PlanCardData } from '@/components/financiamiento/PlanCard'
import { getPaginaFinanciamiento } from '@/lib/sanity/queries'
import { placeholders } from '@/lib/data/financiamiento'

// Los textos se editan en Sanity ("Página: Financiamiento"). Se regenera cada 60 s,
// así un cambio hecho en el Studio se ve sin esperar un deploy.
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPaginaFinanciamiento()
  return {
    title: 'Financiamiento',
    description:
      p?.seoDescripcion ||
      'Planes de financiamiento y arrendamiento Toyota en Toyota Cuautitlán.',
  }
}

// Estructura de la página de sección (acordado 10 nov 2026): hereda del modelo el
// hero, el ancho (max-w-7xl), los h2, la franja gris y el CTA final negro. Sin
// etiquetas rojas sobre los títulos. Breakpoint único: desktop (880px), el mismo
// del hero de modelo, para que toda la página cambie de layout al mismo punto.
const contenedor = 'max-w-7xl mx-auto px-6 max-desktop:px-4'
const h2 = 'text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] text-black leading-[1.05]'
const textoSeccion = 'text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7] mt-4'

type ImgRef = { asset?: { url?: string } } | null
type PlanSanity = { _key: string; titulo: string; descripcion: string; detalles: string[]; imagenAlt?: string; imagen?: ImgRef }

function tarjetas(items: PlanSanity[] | undefined, fallback: string[]): PlanCardData[] {
  return (items ?? []).map((p, i) => ({
    titulo: p.titulo,
    descripcion: p.descripcion,
    detalles: p.detalles ?? [],
    imagen: p.imagen?.asset?.url || fallback[i] || fallback[0],
    alt: p.imagenAlt || p.titulo,
  }))
}

export default async function FinanciamientoPage() {
  const p = await getPaginaFinanciamiento()
  if (!p) notFound()

  return (
    <div className="bg-background text-foreground antialiased">
      <SectionHero
        titulo={p.heroTitulo}
        subtitulo={p.heroSubtitulo}
        imagenDesktop={p.heroDesktop?.asset?.url || placeholders.heroDesktop}
        imagenMobile={p.heroMobile?.asset?.url || placeholders.heroMobile}
        alt={p.heroAlt || p.heroTitulo}
      />

      <section id="intro" className="bg-white py-10">
        <div className={contenedor}>
          <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7]">{p.intro}</p>
        </div>
      </section>

      <section id="planes" className="bg-white pt-10 pb-20 max-desktop:pb-[52px]">
        <div className={contenedor}>
          <h2 className={h2}>{p.planesTitulo}</h2>
          {(p.planesDestacado || p.planesTexto) && (
            <p className={textoSeccion}>
              {p.planesDestacado && <strong className="font-semibold">{p.planesDestacado}</strong>} {p.planesTexto}
            </p>
          )}
          <PlanGrid planes={tarjetas(p.planes, placeholders.planes)} />
        </div>
      </section>

      <section id="arrendamientos" className="bg-white pb-20 max-desktop:pb-[52px]">
        <div className={contenedor}>
          <h2 className={h2}>{p.arrendamientosTitulo}</h2>
          {(p.arrendamientosDestacado || p.arrendamientosTexto) && (
            <p className={textoSeccion}>
              {p.arrendamientosDestacado && <strong className="font-semibold">{p.arrendamientosDestacado}</strong>}{' '}
              {p.arrendamientosTexto}
            </p>
          )}
          <PlanGrid planes={tarjetas(p.arrendamientos, placeholders.arrendamientos)} />
        </div>
      </section>

      <section id="beneficios" className="bg-toyota-gray py-20 max-desktop:py-[52px]">
        <div className={contenedor}>
          <h2 className={`${h2} max-w-[760px]`}>{p.beneficiosTitulo}</h2>
          <div className="mt-12 max-desktop:mt-9 grid grid-cols-3 max-desktop:grid-cols-2 max-sm:grid-cols-1 gap-x-10 gap-y-10">
            {(p.beneficios ?? []).map((b: { _key: string; titulo: string; texto: string; icono?: string }) => (
              <div key={b._key} className="flex flex-col gap-3">
                {b.icono ? <HighlightIcon nombre={b.icono} /> : <IconoGenerico />}
                <h3 className="text-lg font-semibold text-foreground tracking-tight">{b.titulo}</h3>
                <p className="text-[clamp(16px,1.2vw,18px)] text-[#555] leading-[1.7]">{b.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final: mismo patrón que el cierre de las páginas de modelo (§ 8) */}
      <section id="final-cta" className="bg-black py-20 max-desktop:py-[52px]">
        <div className={`${contenedor} text-center flex flex-col items-center gap-4`}>
          <h2 className="text-[clamp(28px,4.5vw,52px)] font-semibold text-white tracking-[-.02em] leading-[1.08] desktop:whitespace-nowrap">
            {p.ctaTitulo}
          </h2>
          {p.ctaTexto && (
            <p className="text-[clamp(15px,1.8vw,18px)] text-white/60 max-w-[440px] leading-[1.6]">{p.ctaTexto}</p>
          )}
          <div className="mt-2">
            <Button href={p.ctaEnlace || '/contacto'} variant="invert-black" className="px-14 py-5 text-base tracking-[.3px]">
              {p.ctaBoton}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
