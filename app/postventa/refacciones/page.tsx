import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPaginaRefacciones } from '@/lib/sanity/queries'
import SectionHero from '@/components/ui/SectionHero'
import Button from '@/components/ui/Button'
import IconoGenerico from '@/components/ui/IconoGenerico'
import HighlightIcon, { TAMANO_ICONO_BENEFICIOS } from '@/components/ui/HighlightIcon'

// Los textos, el contacto y las ventajas se editan en Sanity ("Página: Refacciones", documento único).
// Regenera cada 60 s, sin deploy. Las imágenes de public/images/postventa/ son el respaldo si no hay
// una subida en Sanity.
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPaginaRefacciones()
  return {
    title: 'Refacciones',
    description: p?.seoDescripcion || 'Consulta y cotiza refacciones originales Toyota en Toyota Cuautitlán.',
  }
}

const HERO_DESKTOP = '/images/postventa/refacciones-hero-desktop.webp'
const HERO_MOBILE = '/images/postventa/refacciones-hero-mobile.webp'

const contenedor = 'max-w-7xl mx-auto px-6 max-desktop:px-4'
const h2 = 'text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] text-black leading-[1.05]'

type Canal = { _key: string; tipo: 'telefono' | 'whatsapp'; titulo: string; numero: string; texto: string; boton: string }
type Ventaja = { _key: string; titulo: string; texto: string; icono?: string }

// "5512345678" -> "55 1234 5678"
const formatoNumero = (n: string) => `${n.slice(0, 2)} ${n.slice(2, 6)} ${n.slice(6)}`

// El tipo define el enlace y el estilo del botón: WhatsApp lleva el botón rojo; Teléfono, el de contorno.
const propiedadesCanal = (c: Canal) =>
  c.tipo === 'whatsapp'
    ? { href: `https://wa.me/52${c.numero}`, externo: true, variante: 'primary' as const }
    : { href: `tel:${c.numero}`, externo: false, variante: 'secondary' as const }

export default async function RefaccionesPage() {
  const p = await getPaginaRefacciones()
  if (!p) notFound()

  const canales: Canal[] = p.canales ?? []
  const ventajas: Ventaja[] = p.ventajas ?? []

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

      <section id="contacto" className="bg-white border-t border-[#E8E8E8] pt-12 pb-20 max-desktop:pt-10 max-desktop:pb-[52px]">
        <div className={contenedor}>
          <h2 className={h2}>{p.contactoTitulo}</h2>
          <div className="mt-10 max-desktop:mt-8 grid grid-cols-2 max-desktop:grid-cols-1 gap-6">
            {canales.map((c) => {
              const { href, externo, variante } = propiedadesCanal(c)
              return (
                <div key={c._key} className="border border-[#E8E8E8] bg-white p-8 max-desktop:p-6 flex flex-col">
                  <HighlightIcon nombre={c.tipo} size={TAMANO_ICONO_BENEFICIOS} />
                  <h3 className="mt-4 text-lg font-semibold text-foreground tracking-tight">{c.titulo}</h3>
                  <p className="mt-2 text-[clamp(24px,3vw,32px)] font-semibold text-toyota-red tracking-[-.01em] leading-[1.1]">
                    {formatoNumero(c.numero)}
                  </p>
                  <p className="mt-3 text-[clamp(16px,1.2vw,18px)] text-[#555] leading-[1.7]">{c.texto}</p>
                  <div className="mt-auto pt-6">
                    <Button href={href} external={externo} variant={variante} className="w-full text-center text-base py-3.5">
                      {c.boton}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="ventajas" className="bg-toyota-gray py-20 max-desktop:py-[52px]">
        <div className={contenedor}>
          <h2 className={h2}>{p.ventajasTitulo}</h2>
          <div className="mt-12 max-desktop:mt-9 grid grid-cols-4 max-desktop:grid-cols-2 max-sm:grid-cols-1 gap-x-10 gap-y-10">
            {ventajas.map((v) => (
              <div key={v._key} className="flex flex-col gap-3">
                {v.icono ? (
                  <HighlightIcon nombre={v.icono} size={TAMANO_ICONO_BENEFICIOS} />
                ) : (
                  <IconoGenerico size={TAMANO_ICONO_BENEFICIOS} />
                )}
                <h3 className="text-lg font-semibold text-foreground tracking-tight">{v.titulo}</h3>
                <p className="text-[clamp(16px,1.2vw,18px)] text-[#555] leading-[1.7]">{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
