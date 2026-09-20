import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image, { getImageProps } from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import HighlightIcon from '@/components/ui/HighlightIcon'
import VersionesCarousel from '@/components/modelo/VersionesCarousel'
import ExteriorColores, { type ColorExterior } from '@/components/modelo/ExteriorColores'
import Galeria from '@/components/modelo/Galeria'
import { getModeloBySlug, getModelos, getModelosSimilares } from '@/lib/sanity/queries'
import { sanityImgWidth } from '@/lib/sanity/image'
import { buildVehicleJsonLd } from '@/lib/structured-data'
import { SITE_URL } from '@/lib/site'
import JsonLd from '@/components/JsonLd'
import type { Modelo } from '@/types'

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
      <circle cx="9" cy="9" r="9" fill="var(--toyota-red)" />
      <path
        d="M5 9.5L7.5 12L13 6.5"
        stroke="var(--background)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HeroPicture({
  desktopUrl,
  mobileUrl,
  nombreModelo,
}: {
  desktopUrl: string
  mobileUrl?: string
  nombreModelo: string
}) {
  const common = {
    alt: `Toyota ${nombreModelo} 2026 · ¾ ángulo frontal`,
    sizes: '100vw',
    priority: true,
  }
  const mobileSrcSet = mobileUrl
    ? getImageProps({ ...common, width: 1600, height: 1200, src: mobileUrl }).props.srcSet
    : undefined
  const { props: rest } = getImageProps({
    ...common,
    width: 1920,
    height: 680,
    src: desktopUrl,
  })

  return (
    <picture>
      {mobileSrcSet && <source media="(max-width: 880px)" srcSet={mobileSrcSet} />}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        {...rest}
        className="w-full h-full object-cover object-[right_center] max-desktop:object-center"
      />
    </picture>
  )
}

export async function generateStaticParams() {
  const modelos: Modelo[] = await getModelos()
  return modelos.map((m) => ({ slug: m.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const modelo = await getModeloBySlug(slug)
  if (!modelo) return {}

  const titulo = modelo.seoTitulo ?? `Toyota ${modelo.nombre} | Toyota Cuautitlán`
  const descripcion =
    modelo.seoDescripcion ??
    `Conoce el Toyota ${modelo.nombre} en Toyota Cuautitlán: versiones, precios, colores y más.`
  const imagenTarjetaUrl = modelo.imagenTarjeta?.asset?.url
  const url = `${SITE_URL}/modelos/${slug}`

  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: url },
    openGraph: {
      title: titulo,
      description: descripcion,
      url,
      type: 'website',
      ...(imagenTarjetaUrl && {
        images: [{ url: imagenTarjetaUrl, width: 1200, height: 675, alt: `Toyota ${modelo.nombre}` }],
      }),
    },
  }
}

export default async function ModeloPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const modelo = await getModeloBySlug(slug)
  if (!modelo) notFound()

  const nombreModelo = modelo.nombre
  const modeloSlug = modelo.slug?.current ?? slug

  const versiones = modelo.versiones ?? []
  const caracteristicas: { icono?: string; titulo: string; valor: string }[] =
    modelo.caracteristicas ?? []
  const seguridadItems: string[] = modelo.seguridadItems ?? []
  const rendimientoFilas: { transmision: string; valor: string; unidad?: string }[] =
    modelo.rendimientoFilas ?? []

  const coloresExterior: ColorExterior[] = (modelo.coloresExterior ?? []).map(
    (c: {
      label: string
      hex: string
      hexSecundario?: string
      necesitaBorde: boolean
      imagenes360: { asset?: { url: string } }[]
    }) => ({
      id: c.label,
      label: c.label,
      hex: c.hex,
      hexSecundario: c.hexSecundario,
      needsBorder: c.necesitaBorde,
      imagenes: c.imagenes360
        .filter((img) => img.asset?.url)
        .map((img) => sanityImgWidth(img.asset!.url, 1200)),
    })
  )

  const galeriaExterior = (modelo.galeriaExteriorDetalle ?? [])
    .filter((img: { asset?: { url: string } }) => img.asset?.url)
    .map((img: { asset: { url: string; metadata?: { lqip?: string } } }) => ({
      src: img.asset.url,
      lqip: img.asset.metadata?.lqip,
    }))
  const galeriaInterior = (modelo.galeriaInteriorDetalle ?? [])
    .filter((img: { asset?: { url: string } }) => img.asset?.url)
    .map((img: { asset: { url: string; metadata?: { lqip?: string } } }) => ({
      src: img.asset.url,
      lqip: img.asset.metadata?.lqip,
    }))

  const otrosModelos = await getModelosSimilares(modeloSlug, 3)

  const heroDesktopUrl = modelo.heroDesktop?.asset?.url
  const heroMobileUrl = modelo.heroMobile?.asset?.url
  const imagenDestacadoUrl = modelo.imagenDestacado?.asset?.url
  const imagenRendimientoUrl = modelo.imagenRendimiento?.asset?.url

  // Cada sección se muestra solo si su contenido obligatorio ya está
  // cargado en Sanity — así un modelo nuevo con información parcial no
  // muestra huecos ni contenido de otro modelo, y la sección aparece sola
  // en cuanto se llena el campo correspondiente en el Studio.
  const mostrarIntro = !!modelo.descripcion
  const mostrarHighlights = caracteristicas.length > 0
  const mostrarVersiones = versiones.length > 0
  const mostrarExterior = coloresExterior.length > 0
  const mostrarDestacado = !!modelo.destacadoTitulo && !!imagenDestacadoUrl
  const mostrarSeguridad = seguridadItems.length > 0
  const mostrarGaleria = galeriaExterior.length > 0 || galeriaInterior.length > 0
  const mostrarRendimiento = rendimientoFilas.length > 0
  const mostrarSimilares = otrosModelos.length > 0

  return (
    <div className="bg-background text-foreground antialiased">
      <JsonLd data={buildVehicleJsonLd(modelo)} />
      {/* § 1 · HERO */}
      <section id="hero" className="relative overflow-hidden bg-[#D8D8D8] max-desktop:bg-white h-[clamp(420px,42vw,560px)] max-desktop:h-auto">
        <div className="absolute inset-0 max-desktop:relative max-desktop:h-[260px]">
          {heroDesktopUrl && (
            <HeroPicture desktopUrl={heroDesktopUrl} mobileUrl={heroMobileUrl} nombreModelo={nombreModelo} />
          )}
          {/* Gradiente blanco para legibilidad — solo desktop */}
          <div
            className="absolute inset-0 pointer-events-none max-desktop:hidden"
            style={{
              background:
                'linear-gradient(to right, #fff 25%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0) 55%)',
            }}
          />
        </div>

        <div className="relative z-[1] max-w-7xl mx-auto px-6 max-desktop:px-4 h-full flex items-center max-desktop:h-auto max-desktop:pt-8 max-desktop:pb-11">
          <div className="w-[46%] max-desktop:w-full flex flex-col gap-[18px] max-desktop:text-center max-desktop:items-center">
            {modelo.categoria && (
              <div>
                <span className="inline-block border-[1.5px] border-[#666] text-[#555] text-xs font-semibold tracking-[3.5px] px-[15px] py-[5px] uppercase">
                  {modelo.categoria}
                </span>
              </div>
            )}
            <h1 className="text-[clamp(40px,5.5vw,72px)] font-black tracking-[-.02em] leading-none text-black uppercase">
              {nombreModelo}
            </h1>
            {modelo.heroSubtitulo && (
              <p className="text-[clamp(18px,1.8vw,20px)] font-semibold text-[#555] leading-[1.55] max-w-[340px] whitespace-pre-line">
                {modelo.heroSubtitulo}
              </p>
            )}
            {modelo.precioDesde && (
              <div>
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-[1.5px] block mb-[5px]">
                  Desde
                </span>
                <span className="text-[clamp(24px,2.8vw,32px)] font-semibold text-foreground tracking-tight">
                  ${modelo.precioDesde.toLocaleString('es-MX')} M.N.
                </span>
              </div>
            )}
            {mostrarVersiones && (
              <div className="flex max-desktop:flex-col max-desktop:w-full gap-3">
                <a
                  href="#versiones"
                  className="inline-flex items-center justify-center gap-2.5 text-foreground text-sm font-semibold tracking-[.3px] border-2 border-foreground px-5 py-[11px] w-fit max-desktop:w-full no-underline transition-colors hover:bg-toyota-red hover:border-toyota-red hover:text-white"
                >
                  Ver versiones y precios
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 3L8 13M4 9L8 13L12 9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* § 1.5 · INTRO */}
      {mostrarIntro && (
        <section id="intro" className="bg-white py-10">
          <div className="max-w-7xl mx-auto px-6 max-desktop:px-4 [&_p]:text-[clamp(16px,1.2vw,18px)] [&_p]:text-[#1a1a1a] [&_p]:leading-[1.7] [&_strong]:font-semibold">
            <PortableText value={modelo.descripcion!} />
          </div>
        </section>
      )}

      {/* § 1.7 · HIGHLIGHTS BAR */}
      {mostrarHighlights && (
        <section id="highlights" className="bg-toyota-gray py-5">
          <div className="max-w-7xl mx-auto px-6 max-desktop:px-4 grid grid-cols-4 max-desktop:grid-cols-2">
            {caracteristicas.map((h, i, arr) => (
              <div key={h.titulo} className="relative flex flex-col items-center gap-1.5 px-3 py-4">
                <HighlightIcon nombre={h.icono} />
                <span className="text-xs font-semibold tracking-[2.5px] text-[#888] uppercase">
                  {h.titulo}
                </span>
                <span className="text-lg font-semibold text-foreground tracking-tight text-center">
                  {h.valor}
                </span>
                {i < arr.length - 1 && (
                  <div className="absolute right-0 top-[20%] bottom-[20%] w-px bg-[#D8D8D8] max-desktop:hidden" />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* § 3 · DISEÑO Y COLORES (antes "Exterior") */}
      {mostrarExterior && (
        <section id="diseno" className="bg-white pt-20 pb-8 max-desktop:pt-[52px] max-desktop:pb-6 border-t border-[#E8E8E8]">
          <div className="max-w-7xl mx-auto px-6 max-desktop:px-4">
            <div className="mb-10">
              <span className="text-xs font-semibold tracking-[3px] text-toyota-red uppercase">
                Diseño
              </span>
              {modelo.disenoTitulo && (
                <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] mt-1.5 text-black leading-[1.05]">
                  {modelo.disenoTitulo}
                </h2>
              )}
              {modelo.disenoTexto && (
                <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] mt-2.5 max-w-[560px] leading-[1.6]">
                  {modelo.disenoTexto}
                </p>
              )}
            </div>
            <ExteriorColores colores={coloresExterior} nombreModelo={nombreModelo} />
          </div>
        </section>
      )}

      {/* § 6 · GALERÍA */}
      {mostrarGaleria && (
        <section id="galeria" className="bg-white pt-8 pb-20 max-desktop:pt-6 max-desktop:pb-[52px]">
          <div className="max-w-7xl mx-auto px-6 max-desktop:px-4">
            <div className="mb-9">
              <span className="text-xs font-semibold tracking-[3px] text-toyota-red uppercase">
                Galería
              </span>
              {modelo.galeriaTitulo && (
                <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] mt-1.5 text-black leading-[1.05]">
                  {modelo.galeriaTitulo}
                </h2>
              )}
              {modelo.galeriaTexto && (
                <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] mt-2.5 max-w-[560px] leading-[1.6]">
                  {modelo.galeriaTexto}
                </p>
              )}
            </div>
            <Galeria exterior={galeriaExterior} interior={galeriaInterior} nombreModelo={nombreModelo} />
          </div>
        </section>
      )}

      {/* § 5 · CTA INTERMEDIO */}
      <section id="mid-cta" className="bg-toyota-red py-[72px] max-desktop:py-12">
        <div className="max-w-7xl mx-auto px-6 max-desktop:px-4 flex max-desktop:flex-col justify-between max-desktop:justify-start items-center gap-7">
          <div className="max-desktop:text-center">
            <h2 className="text-[clamp(24px,3.5vw,40px)] font-semibold text-white tracking-[-.02em] leading-[1.1]">
              ¿Listo para dar el siguiente paso?
            </h2>
            <p className="text-[clamp(15px,1.6vw,17px)] text-white mt-2.5">
              Un asesor de Toyota Cuautitlán te contacta hoy.
            </p>
          </div>
          <Link
            href={`/cotizacion?modelo=${modeloSlug}`}
            className="flex-shrink-0 inline-block bg-white text-toyota-red px-11 py-[18px] text-base font-semibold no-underline tracking-[.3px] whitespace-nowrap transition-colors hover:bg-foreground hover:text-white"
          >
            Solicitar Cotización
          </Link>
        </div>
      </section>

      {/* § 4 · DESTACADO (ej: Tecnología / Safety Sense — puede ser cualquier tema según el modelo) */}
      {mostrarDestacado && (
        <section id="destacado" className="bg-toyota-gray py-20 max-desktop:py-[52px]">
          <div className="max-w-7xl mx-auto px-6 max-desktop:px-4 grid grid-cols-2 max-desktop:grid-cols-1 gap-16 max-desktop:gap-8 items-center">
            <div>
              {modelo.destacadoEyebrow && (
                <span className="text-xs font-semibold tracking-[3px] text-toyota-red uppercase">
                  {modelo.destacadoEyebrow}
                </span>
              )}
              <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] mt-2 text-black leading-[1.05]">
                {modelo.destacadoTitulo}
              </h2>
              {modelo.destacadoTexto && (
                <div className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7] mt-5 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:my-3">
                  <PortableText value={modelo.destacadoTexto} />
                </div>
              )}
            </div>
            <div className="aspect-[3/2] bg-white overflow-hidden relative">
              <Image
                src={imagenDestacadoUrl!}
                alt={`${nombreModelo} · ${modelo.destacadoTitulo}`}
                fill
                className="object-cover"
                sizes="(max-width: 880px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
      )}

      {/* § 4b · SEGURIDAD */}
      {mostrarSeguridad && (
        <section id="seguridad" className="bg-foreground py-20 max-desktop:py-[52px]">
          <div className="max-w-7xl mx-auto px-6 max-desktop:px-4">
            <div className="mb-12">
              <span className="text-xs font-semibold tracking-[3px] text-toyota-red uppercase">
                Seguridad
              </span>
              {modelo.seguridadTitulo && (
                <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] mt-2 text-white leading-[1.05]">
                  {modelo.seguridadTitulo}
                </h2>
              )}
              {modelo.seguridadTexto && (
                <p className="text-[clamp(16px,1.2vw,18px)] text-white mt-3.5 max-w-[560px] leading-[1.6]">
                  {modelo.seguridadTexto}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 max-desktop:grid-cols-1 border-t border-white/10">
              {seguridadItems.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-center gap-4 py-5 border-b border-white/10 ${
                    i % 2 === 0
                      ? 'pr-6 desktop:border-r desktop:border-r-white/10'
                      : 'desktop:pl-6'
                  }`}
                >
                  <CheckIcon />
                  <span className="text-[15px] text-white font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* § 7 · RENDIMIENTO */}
      {mostrarRendimiento && (
        <section id="rendimiento" className="bg-white py-20 max-desktop:py-[52px]">
          <div
            className={`max-w-7xl mx-auto px-6 max-desktop:px-4 grid max-desktop:grid-cols-1 items-center ${
              imagenRendimientoUrl ? 'grid-cols-2 gap-20 max-desktop:gap-8' : 'grid-cols-1'
            }`}
          >
            {imagenRendimientoUrl && (
              <div className="aspect-[3/2] max-desktop:max-h-[300px] bg-white overflow-hidden relative">
                <Image
                  src={imagenRendimientoUrl}
                  alt={`${nombreModelo} · vista trasera ¾`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 880px) 100vw, 50vw"
                />
              </div>
            )}

            <div>
              {modelo.rendimientoEyebrow && (
                <span className="text-xs font-semibold tracking-[3px] text-toyota-red uppercase">
                  {modelo.rendimientoEyebrow}
                </span>
              )}
              {modelo.rendimientoTitulo && (
                <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] mt-2 text-black leading-[1.08]">
                  {modelo.rendimientoTitulo}
                </h2>
              )}
              {modelo.rendimientoTexto && (
                <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] mt-3 leading-[1.6]">
                  {modelo.rendimientoTexto}
                </p>
              )}

              <div className="mt-8 bg-toyota-gray rounded-md overflow-hidden">
                <div className="grid grid-cols-2 border-b-2 border-[#E8E8E8]">
                  <div className="px-6 py-[18px] text-base font-semibold text-foreground border-r border-[#E8E8E8]">
                    Transmisión
                  </div>
                  <div className="px-6 py-[18px] text-base font-semibold text-foreground">
                    Rendimiento de Combustible<sup className="text-[10px]">**</sup>
                  </div>
                </div>
                {rendimientoFilas.map((row, i) => (
                  <div
                    key={row.transmision}
                    className={`grid grid-cols-2 ${i < rendimientoFilas.length - 1 ? 'border-b border-[#E8E8E8]' : ''}`}
                  >
                    <div className="px-6 py-5 flex items-center text-[32px] font-semibold text-toyota-red tracking-[-.02em] border-r border-[#E8E8E8]">
                      {row.transmision}
                    </div>
                    <div className="px-6 py-5 flex items-baseline gap-1.5">
                      <span className="text-[32px] font-semibold text-toyota-red tracking-[-.02em]">
                        {row.valor}
                      </span>
                      <span className="text-[13px] font-semibold text-[#888]">{row.unidad}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-[#999] mt-4 leading-[1.6] italic">
                **IMPORTANTE: los valores de rendimiento de combustible son informativos y se
                obtuvieron en condiciones controladas de laboratorio. El rendimiento real puede
                variar según condiciones de manejo, infraestructura, climatología y otros factores.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* § 2 · VERSIONES Y PRECIOS */}
      {mostrarVersiones && (
        <section id="versiones" className="bg-white py-20 max-desktop:py-[52px] border-t border-[#E8E8E8]">
          <div className="max-w-7xl mx-auto px-6 max-desktop:px-4">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <span className="text-xs font-semibold tracking-[3px] text-toyota-red uppercase">
                  {modelo.anio ? `Versiones ${modelo.anio}` : 'Versiones'}
                </span>
                <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] mt-1.5 text-black leading-[1.05]">
                  Elige tu versión
                </h2>
                {modelo.versionesTexto && (
                  <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] mt-2.5 max-w-[560px] leading-[1.6]">
                    {modelo.versionesTexto}
                  </p>
                )}
              </div>
            </div>

            <VersionesCarousel versiones={versiones} nombreModelo={nombreModelo} />

            <p className="text-xs text-[#777] mt-5 leading-[1.6] text-center">
              Precios y especificaciones sujetos a cambio sin previo aviso. Consulta
              disponibilidad, equipamiento y precio vigente con un asesor Toyota.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3.5 text-center">
              <p className="text-sm text-[#444] leading-normal">
                Para más detalles de cada versión consulta la ficha técnica.
              </p>
              {/* Pendiente: enlace real al PDF de ficha técnica */}
              <a
                href="#"
                className="inline-flex items-center gap-2 text-white no-underline text-sm font-semibold bg-toyota-red hover:bg-toyota-red-dark px-7 py-[13px] transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M7.5 2.5V10M4 8L7.5 11.5L11 8M2.5 13H12.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Descargar Ficha Técnica
              </a>
            </div>
          </div>
        </section>
      )}

      {/* § 8 · CTA FINAL */}
      <section id="final-cta" className="bg-black py-20 max-desktop:py-[52px]">
        <div className="max-w-7xl mx-auto px-6 max-desktop:px-4 text-center flex flex-col items-center gap-4">
          <h2 className="text-[clamp(28px,4.5vw,52px)] font-semibold text-white tracking-[-.02em] leading-[1.08] desktop:whitespace-nowrap">
            ¿Listo para estrenar tu {nombreModelo}?
          </h2>
          <p className="text-[clamp(15px,1.8vw,18px)] text-white/60 max-w-[440px] leading-[1.6]">
            Un asesor te contactará a la brevedad.
          </p>
          <div className="mt-2">
            <Link
              href={`/cotizacion?modelo=${modeloSlug}`}
              className="inline-block bg-white text-black px-14 py-5 text-base font-semibold no-underline tracking-[.3px] transition-colors hover:bg-[#EBEBEB]"
            >
              Solicitar Cotización
            </Link>
          </div>
        </div>
      </section>

      {/* § 9 · MODELOS SIMILARES */}
      {mostrarSimilares && (
        <section id="similares" className="bg-toyota-gray py-20 max-desktop:py-[52px]">
          <div className="max-w-7xl mx-auto px-6 max-desktop:px-4">
            <div className="mb-9">
              <span className="text-xs font-semibold tracking-[3px] text-toyota-red uppercase">
                Modelos similares
              </span>
              <h2 className="text-[clamp(24px,3.5vw,38px)] font-semibold tracking-[-.02em] mt-2 text-foreground leading-[1.05]">
                Descubre otras opciones
              </h2>
            </div>

            <div className="grid grid-cols-3 max-desktop:flex max-desktop:overflow-x-auto gap-6 pb-1">
              {otrosModelos.map((m: Modelo) => (
                <div
                  key={m.slug.current}
                  className="bg-white border border-[#E8E8E8] flex flex-col max-desktop:min-w-[80vw] max-desktop:flex-shrink-0"
                >
                  <div className="relative aspect-[16/9] bg-toyota-gray overflow-hidden">
                    {m.imagenTarjeta?.asset?.url && (
                      <Image
                        src={m.imagenTarjeta.asset.url}
                        alt={m.nombre}
                        fill
                        className="object-cover"
                        sizes="(max-width: 880px) 80vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="px-6 pt-6 pb-7 flex flex-col gap-2.5 flex-1">
                    <span className="border border-[#AAA] text-[10px] font-semibold tracking-[2px] px-2 py-[3px] text-[#777] uppercase self-start">
                      {m.categoria}
                    </span>
                    <div className="text-[clamp(20px,2.5vw,26px)] font-semibold tracking-[-.02em] text-foreground leading-none">
                      {m.nombre}
                    </div>
                    {m.precioDesde && (
                      <div className="text-sm text-[#555] mt-0.5">
                        Desde{' '}
                        <strong className="text-foreground font-semibold">
                          ${m.precioDesde.toLocaleString('es-MX')} M.N.
                        </strong>
                      </div>
                    )}
                    <Link
                      href={`/modelos/${m.slug.current}`}
                      className="text-toyota-red text-sm font-semibold no-underline mt-auto pt-2 hover:underline"
                    >
                      Ver modelo →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
