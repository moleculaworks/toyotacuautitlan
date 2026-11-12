import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SectionHero from '@/components/ui/SectionHero'
import HighlightIcon, { TAMANO_ICONO_BENEFICIOS } from '@/components/ui/HighlightIcon'
import IconoGenerico from '@/components/ui/IconoGenerico'
import FranjaCta from '@/components/ui/FranjaCta'
import PlanGrid from '@/components/financiamiento/PlanGrid'
import type { PlanCardData } from '@/components/financiamiento/PlanCard'
import { getPaginaFinanciamiento } from '@/lib/sanity/queries'
import { placeholders } from '@/lib/data/financiamiento'

// Los textos se editan en Sanity ("Página: Financiamiento"). Se actualiza sola al publicar
// (aviso en app/api/revalidate; respaldo en app/layout.tsx), sin esperar un deploy.

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPaginaFinanciamiento()
  return {
    title: 'Planes y Arrendamientos',
    description:
      p?.seoDescripcion ||
      'Planes de financiamiento y arrendamiento Toyota en Toyota Cuautitlán.',
  }
}

// Destino de la franja final ("No sé qué plan elegir"). Todavía no hay formulario: queda en '#', igual que los
// botones "Cotizar" de cada plan. Cuando exista /financiamiento/solicitud, llevará ahí con el plan "No lo sé,
// quiero asesoría" ya marcado.
const ENLACE_ASESORIA = '#'

// Textos de la franja roja final: se editan en Sanity (grupo "Franja final"). Estos son el respaldo si un
// campo está vacío. Sin prometer confirmaciones ni procesos que todavía no están definidos.
const FRANJA = {
  titulo: '¿No sabes qué plan elegir?',
  apoyo: 'Cuéntanos qué buscas y un asesor te ayuda a encontrar la mejor opción.',
  boton: 'Quiero asesoría',
}

// Estructura de la página de sección (acordado 10 nov 2026): hereda del modelo el
// hero, el ancho (max-w-7xl), los h2, la franja gris. Cada plan lleva su botón Cotizar; al final, una franja roja general para quien no sabe qué plan elegir (propuesta 12 nov). Sin
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
        degradadoAmplio
      />

      <section id="intro" className="bg-white py-10 max-desktop:pt-0">
        <div className={contenedor}>
          <div className="desktop:hidden w-7 h-[2px] bg-toyota-red mb-5 mx-auto" />
          <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7]">{p.intro}</p>
        </div>
      </section>

      <section id="planes" className="bg-white border-t border-[#E8E8E8] pt-12 pb-12 max-desktop:pt-10 max-desktop:pb-10">
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

      <section id="arrendamientos" className="bg-white border-t border-[#E8E8E8] pt-12 pb-20 max-desktop:pt-10 max-desktop:pb-[52px]">
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
                {b.icono ? <HighlightIcon nombre={b.icono} size={TAMANO_ICONO_BENEFICIOS} /> : <IconoGenerico size={TAMANO_ICONO_BENEFICIOS} />}
                <h3 className="text-lg font-semibold text-foreground tracking-tight">{b.titulo}</h3>
                <p className="text-[clamp(16px,1.2vw,18px)] text-[#555] leading-[1.7]">{b.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Franja del final, antes del pie de página: acceso general para quien no sabe qué plan elegir */}
      <FranjaCta
        id="asesoria"
        titulo={p.franjaTitulo || FRANJA.titulo}
        apoyo={p.franjaApoyo || FRANJA.apoyo}
        boton={p.franjaBoton || FRANJA.boton}
        href={ENLACE_ASESORIA}
      />
    </div>
  )
}
