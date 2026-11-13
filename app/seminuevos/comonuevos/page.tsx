import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPaginaComonuevos } from '@/lib/sanity/queries'
import SectionHero from '@/components/ui/SectionHero'
import Button from '@/components/ui/Button'
import IconoGenerico from '@/components/ui/IconoGenerico'
import HighlightIcon, { TAMANO_ICONO_BENEFICIOS } from '@/components/ui/HighlightIcon'

// Los textos, las ventajas, los requisitos, los puntos de inspección y el cierre se editan en Sanity
// ("Página: Comonuevos", documento único). Se actualiza sola al publicar, sin deploy (aviso en
// app/api/revalidate; respaldo en app/layout.tsx). Las imágenes de public/images/comonuevos/ son el
// respaldo si no hay una subida en Sanity; el logo de Comonuevos (sello de la franja de inspección)
// vive aquí. Referencia de textos: Secciones/Comonuevos/Comonuevos.md.

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPaginaComonuevos()
  return {
    title: 'Comonuevos',
    description: p?.seoDescripcion || 'Seminuevos Comonuevos en Toyota Cuautitlán.',
  }
}

const HERO_DESKTOP = '/images/comonuevos/comonuevos-hero-desktop.webp'
const HERO_MOBILE = '/images/comonuevos/comonuevos-hero-mobile.webp'
// Imagen de respaldo de cada ventaja, por posición (garantía, profesionales, tranquilidad)
const IMAGENES_VENTAJAS = [
  '/images/comonuevos/comonuevos-ventaja-garantia.webp',
  '/images/comonuevos/comonuevos-ventaja-profesionales.webp',
  '/images/comonuevos/comonuevos-ventaja-tranquilidad.webp',
]

const contenedor = 'max-w-7xl mx-auto px-6 max-desktop:px-4'
const h2 = 'text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] text-black leading-[1.05]'
// Mismo título para las franjas oscuras (negro oficial `bg-toyota-dark`, 13 nov 2026)
const h2Claro = h2.replace('text-black', 'text-white')

type Ventaja = { _key: string; titulo: string; texto: string; imagenAlt?: string; imagen?: { asset?: { url?: string } } }
type Requisito = { _key: string; titulo: string; texto: string; icono?: string }
type Punto = { _key: string; titulo: string; texto: string }
type GrupoInspeccion = { _key: string; titulo: string; puntos: Punto[] }
type Accion = { _key: string; titulo: string; texto: string; boton: string; enlace?: string }

export default async function ComonuevosPage() {
  const p = await getPaginaComonuevos()
  if (!p) notFound()

  const ventajas: Ventaja[] = p.ventajas ?? []
  const requisitos: Requisito[] = p.requisitos ?? []
  const grupos: GrupoInspeccion[] = p.inspeccionGrupos ?? []
  const acciones: Accion[] = p.acciones ?? []

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

      <section id="ventajas" className="bg-toyota-dark py-20 max-desktop:py-[52px]">
        <div className={contenedor}>
          <h2 className={h2Claro}>{p.ventajasTitulo}</h2>
          <div className="mt-12 max-desktop:mt-9 grid grid-cols-3 max-desktop:grid-cols-1 gap-x-10 gap-y-10">
            {ventajas.map((v, i) => {
              const src = v.imagen?.asset?.url || IMAGENES_VENTAJAS[i]
              return (
                <div key={v._key} className="flex flex-col gap-3">
                  {src && (
                    <Image
                      src={src}
                      alt={v.imagenAlt || v.titulo}
                      width={800}
                      height={450}
                      sizes="(max-width: 880px) 100vw, 400px"
                      className="mb-2 h-auto w-full"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-white tracking-tight">{v.titulo}</h3>
                  <p className="text-[clamp(16px,1.2vw,18px)] text-white leading-[1.7]">{v.texto}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="requisitos" className="bg-white pt-20 pb-20 max-desktop:pt-[52px] max-desktop:pb-[52px]">
        <div className={contenedor}>
          <h2 className={h2}>{p.requisitosTitulo}</h2>
          <div className="mt-12 max-desktop:mt-9 grid grid-cols-4 max-desktop:grid-cols-2 max-sm:grid-cols-1 gap-x-10 gap-y-10">
            {requisitos.map((r) => (
              <div key={r._key} className="flex flex-col gap-3">
                {r.icono ? (
                  <HighlightIcon nombre={r.icono} size={TAMANO_ICONO_BENEFICIOS} />
                ) : (
                  <IconoGenerico size={TAMANO_ICONO_BENEFICIOS} />
                )}
                <h3 className="text-lg font-semibold text-foreground tracking-tight">{r.titulo}</h3>
                <p className="text-[clamp(16px,1.2vw,18px)] text-[#555] leading-[1.7]">{r.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="inspeccion" className="bg-toyota-gray py-20 max-desktop:py-[52px]">
        <div className={contenedor}>
          {/* Logo como sello de certificación: en escritorio, centrado sobre la tercera tarjeta (misma cuadrícula de 3 columnas); en móvil, centrado arriba del título */}
          <div className="flex flex-col-reverse items-start gap-6 desktop:grid desktop:grid-cols-3 desktop:items-end">
            <div className="desktop:col-span-2">
              <h2 className={h2}>{p.inspeccionTitulo}</h2>
              {p.inspeccionTexto && (
                <p className="mt-4 text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7]">{p.inspeccionTexto}</p>
              )}
            </div>
            <Image
              src="/images/comonuevos/comonuevos-logo.svg"
              alt="Comonuevos, autos certificados Toyota"
              width={648}
              height={122}
              className="h-12 w-auto max-desktop:self-center desktop:col-start-3 desktop:h-14 desktop:justify-self-center"
            />
          </div>
          <div className="mt-12 max-desktop:mt-9 grid grid-cols-3 max-desktop:grid-cols-1 gap-6">
            {grupos.map((g) => (
              <div key={g._key} className="border border-[#E8E8E8] bg-white p-8 max-desktop:p-6 flex flex-col">
                <h3 className="text-[clamp(20px,2.5vw,26px)] font-semibold tracking-[-.02em] text-foreground leading-none">
                  {g.titulo}
                </h3>
                <div className="w-7 h-[2px] bg-toyota-red mt-3.5" />
                <div className="mt-6 flex flex-col gap-5">
                  {(g.puntos ?? []).map((pt, i) => (
                    <div key={pt._key} className={i > 0 ? 'border-t border-[#E8E8E8] pt-5' : ''}>
                      <h4 className="text-lg font-semibold text-foreground tracking-tight leading-snug">{pt.titulo}</h4>
                      <p className="mt-1.5 text-[clamp(16px,1.2vw,18px)] text-[#555] leading-[1.7]">{pt.texto}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="acciones" className="bg-white pt-20 pb-20 max-desktop:pt-[52px] max-desktop:pb-[52px]">
        <div className={contenedor}>
          <h2 className={h2}>{p.cierreTitulo}</h2>
          <div className="mt-10 max-desktop:mt-8 grid grid-cols-2 max-desktop:grid-cols-1 gap-6">
            {acciones.map((a) => (
              <div key={a._key} className="border border-[#E8E8E8] bg-white p-8 max-desktop:p-6 flex flex-col">
                <h3 className="text-[clamp(20px,2.5vw,26px)] font-semibold tracking-[-.02em] text-foreground leading-none">
                  {a.titulo}
                </h3>
                <div className="w-7 h-[2px] bg-toyota-red mt-3.5" />
                <p className="mt-5 text-[clamp(16px,1.2vw,18px)] text-[#555] leading-[1.7]">{a.texto}</p>
                <div className="mt-auto pt-6">
                  {/* Destino por definir (formulario, teléfono o WhatsApp): mientras el campo esté vacío, `#` */}
                  <Button
                    href={a.enlace || '#'}
                    external={/^https?:\/\//.test(a.enlace || '')}
                    variant="primary"
                    className="w-full text-center text-base py-3.5"
                  >
                    {a.boton}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
