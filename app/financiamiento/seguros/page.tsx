import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPaginaSeguros } from '@/lib/sanity/queries'
import SectionHero from '@/components/ui/SectionHero'
import Button from '@/components/ui/Button'
import IconoGenerico from '@/components/ui/IconoGenerico'
import HighlightIcon, { TAMANO_ICONO_BENEFICIOS } from '@/components/ui/HighlightIcon'

// Los textos, las ventajas, las coberturas y el cierre se editan en Sanity ("Página: Seguros", documento único).
// Se actualiza sola al publicar en Sanity, sin deploy (aviso en app/api/revalidate; respaldo en app/layout.tsx).
// Las imágenes de public/images/seguros/ son el respaldo si no hay una subida en Sanity.
// Patrón de Refacciones: hero heredado, párrafo de invitación, franja gris de ventajas, tarjetas y cierre.

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPaginaSeguros()
  return {
    title: 'Seguros',
    description: p?.seoDescripcion || 'Asegura tu Toyota con quien mejor lo conoce. Cotiza tu seguro en Toyota Cuautitlán.',
  }
}

const HERO_DESKTOP = '/images/seguros/seguros-hero-desktop.webp'
const HERO_MOBILE = '/images/seguros/seguros-hero-mobile.webp'

const contenedor = 'max-w-7xl mx-auto px-6 max-desktop:px-4'
const h2 = 'text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] text-black leading-[1.05]'
// Mismo título para las franjas oscuras (negro oficial `bg-toyota-dark`, 13 nov 2026)
const h2Claro = h2.replace('text-black', 'text-white')

type Ventaja = { _key: string; titulo: string; texto: string; icono?: string }
type Cobertura = { _key: string; titulo: string; texto: string }
type Grupo = { _key: string; titulo: string; coberturas: Cobertura[] }

export default async function SegurosPage() {
  const p = await getPaginaSeguros()
  if (!p) notFound()

  const ventajas: Ventaja[] = p.ventajas ?? []
  const grupos: Grupo[] = p.grupos ?? []

  // Destino del botón de cierre: aún no se define (11 nov 2026). Mientras el campo esté vacío en Sanity
  // no lleva a ningún lado (`#`), igual que los demás botones de cotizar del sitio.
  const enlace: string = p.cierreEnlace || '#'
  const externo = /^https?:\/\//.test(enlace)

  return (
    <div className="bg-background text-foreground antialiased">
      <SectionHero
        titulo={p.heroTitulo}
        subtitulo={p.heroSubtitulo}
        imagenDesktop={p.heroDesktop?.asset?.url || HERO_DESKTOP}
        imagenMobile={p.heroMobile?.asset?.url || HERO_MOBILE}
        alt={p.heroAlt || p.heroTitulo}
      />

      <section id="intro" className="bg-white py-10 max-desktop:pt-0">
        <div className={contenedor}>
          <div className="desktop:hidden w-7 h-[2px] bg-toyota-red mb-5 mx-auto" />
          <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7]">
            {p.introDestacado && <strong className="font-semibold">{p.introDestacado} </strong>}
            {p.intro}
          </p>
        </div>
      </section>

      <section id="por-que" className="bg-toyota-dark py-20 max-desktop:py-[52px]">
        <div className={contenedor}>
          <h2 className={h2Claro}>{p.ventajasTitulo}</h2>
          <div className="mt-12 max-desktop:mt-9 grid grid-cols-4 max-desktop:grid-cols-2 max-sm:grid-cols-1 gap-x-10 gap-y-10">
            {ventajas.map((v) => (
              <div key={v._key} className="flex flex-col gap-3">
                {v.icono ? (
                  <HighlightIcon nombre={v.icono} size={TAMANO_ICONO_BENEFICIOS} />
                ) : (
                  <IconoGenerico size={TAMANO_ICONO_BENEFICIOS} />
                )}
                <h3 className="text-lg font-semibold text-white tracking-tight">{v.titulo}</h3>
                <p className="text-[clamp(16px,1.2vw,18px)] text-white leading-[1.7]">{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="coberturas" className="bg-white pt-20 pb-20 max-desktop:pt-[52px] max-desktop:pb-[52px]">
        <div className={contenedor}>
          <h2 className={h2}>{p.coberturasTitulo}</h2>
          <div className="mt-12 max-desktop:mt-9 grid grid-cols-3 max-desktop:grid-cols-1 gap-6">
            {grupos.map((g) => (
              <div key={g._key} className="border border-[#E8E8E8] bg-white p-8 max-desktop:p-6 flex flex-col">
                <h3 className="text-[clamp(20px,2.5vw,26px)] font-semibold tracking-[-.02em] text-foreground leading-none">
                  {g.titulo}
                </h3>
                <div className="w-7 h-[2px] bg-toyota-red mt-3.5" />
                <div className="mt-6 flex flex-col gap-5">
                  {(g.coberturas ?? []).map((c, i) => (
                    <div key={c._key} className={i > 0 ? 'border-t border-[#E8E8E8] pt-5' : ''}>
                      <h4 className="text-lg font-semibold text-foreground tracking-tight leading-snug">{c.titulo}</h4>
                      <p className="mt-1.5 text-[clamp(16px,1.2vw,18px)] text-[#555] leading-[1.7]">{c.texto}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {p.coberturasNota && <p className="mt-8 text-base text-[#555] leading-[1.7]">{p.coberturasNota}</p>}
        </div>
      </section>

      <section id="cotiza" className="bg-toyota-gray py-20 max-desktop:py-[52px]">
        <div className={`${contenedor} flex items-center justify-between gap-12 max-desktop:flex-col max-desktop:items-start max-desktop:gap-8`}>
          <div className="max-w-3xl">
            <h2 className={h2}>{p.cierreTitulo}</h2>
            <p className="mt-6 text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7]">{p.cierreTexto}</p>
          </div>
          <Button
            href={enlace}
            external={externo}
            variant="primary"
            className="text-base px-10 py-3.5 max-desktop:w-full text-center shrink-0"
          >
            {p.cierreBoton}
          </Button>
        </div>
      </section>
    </div>
  )
}
