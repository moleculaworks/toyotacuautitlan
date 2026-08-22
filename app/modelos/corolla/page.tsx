import type { Metadata } from 'next'
import Image, { getImageProps } from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import HighlightIcon from '@/components/ui/HighlightIcon'
import VersionesCarousel from '@/components/corolla/VersionesCarousel'
import ExteriorColores, { type ColorExterior } from '@/components/corolla/ExteriorColores'
import Galeria from '@/components/corolla/Galeria'
import { modelosSimilares } from '@/lib/data/corolla'
import { getModeloBySlug } from '@/lib/sanity/queries'
import { sanityImgWidth } from '@/lib/sanity/image'

// Respaldo del contenido real del Corolla — se usa solo si el campo
// correspondiente todavía no se ha cargado en Sanity, para que la página
// nunca se vea vacía. Es el mismo contenido que ya vive en el documento
// del Corolla en Sanity (ver sección "Textos de sección" en el Studio).
const FALLBACK = {
  seoTitulo: 'Toyota Corolla 2026 — Versiones y Precios',
  seoDescripcion:
    'Toyota Corolla 2026 desde $428,600 MXN. Conoce las 6 versiones CVT e híbridas, colores, galería y Toyota Safety Sense. Cotiza en Toyota Cuautitlán.',
  categoria: 'Sedanes & Hatchbacks',
  anio: 2026,
  heroSubtitulo: 'El sedán más vendido del mundo.\nPor algo será.',
  caracteristicas: [
    { icono: 'motor', titulo: 'Motor', valor: '2.0L · 168 HP' },
    { icono: 'pasajeros', titulo: 'Pasajeros', valor: '5' },
    { icono: 'traccion', titulo: 'Tracción', valor: 'Delantera FWD' },
    { icono: 'tecnologia', titulo: 'Tecnología', valor: 'Toyota Safety Sense' },
  ],
  exteriorTitulo: 'Diseño que impone',
  destacadoEyebrow: 'Tecnología',
  destacadoTitulo: 'Toyota Safety Sense',
  destacadoTexto:
    'Corolla incluye Toyota Safety Sense en versiones XLE y SE — un conjunto de sistemas de asistencia activa que detecta peatones, mantiene el carril, alerta cambios de vía y regula la velocidad automáticamente. Tecnología que trabaja contigo antes de que la necesites.',
  seguridadTitulo: 'Seguridad es mi segundo nombre',
  seguridadTexto:
    'Una fama internacional construida con los componentes de seguridad y tecnología de conducción más avanzados.',
  seguridadItems: [
    '8 bolsas de aire',
    'Frenos ABS + EBD',
    'Seguros eléctricos',
    'Seguros para niños en puertas traseras',
    'Sistema ISO-FIX / LATCH',
    'Alarmas e inmovilizados',
    'Kit de seguridad',
    'Control de estabilidad VSC',
  ],
  galeriaTitulo: 'El auto más vendido del mundo',
  rendimientoEyebrow: 'Modo Ahorro',
  rendimientoTitulo: 'Muévete, ahorra y contribuye',
  rendimientoTexto: 'Tecnología pensada para maximizar cada gota. Rendimiento real, eficiencia medible.',
  rendimientoFilas: [
    { transmision: 'CVT', valor: '19.14', unidad: 'KM/L' },
    { transmision: 'HEV', valor: '26.3', unidad: 'KM/L' },
  ],
}

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
  mobileUrl: string
  nombreModelo: string
}) {
  const common = {
    alt: `Toyota ${nombreModelo} 2026 · ¾ ángulo frontal`,
    sizes: '100vw',
    priority: true,
  }
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...common,
    width: 1600,
    height: 1200,
    src: mobileUrl,
  })
  const { props: rest } = getImageProps({
    ...common,
    width: 1920,
    height: 680,
    src: desktopUrl,
  })

  return (
    <picture>
      <source media="(max-width: 880px)" srcSet={mobileSrcSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        {...rest}
        className="w-full h-full object-cover object-[right_center] max-desktop:object-center"
      />
    </picture>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const modelo = await getModeloBySlug('corolla')
  return {
    title: modelo?.seoTitulo ?? FALLBACK.seoTitulo,
    description: modelo?.seoDescripcion ?? FALLBACK.seoDescripcion,
  }
}

export default async function CorollaPage() {
  const modelo = await getModeloBySlug('corolla')
  const nombreModelo = modelo?.nombre ?? 'Corolla'
  const versiones = modelo?.versiones ?? []
  const categoria = modelo?.categoria ?? FALLBACK.categoria
  const anio = modelo?.anio ?? FALLBACK.anio
  const heroSubtitulo = modelo?.heroSubtitulo ?? FALLBACK.heroSubtitulo
  const caracteristicas: { icono?: string; titulo: string; valor: string }[] = modelo
    ?.caracteristicas?.length
    ? modelo.caracteristicas
    : FALLBACK.caracteristicas
  const exteriorTitulo = modelo?.exteriorTitulo ?? FALLBACK.exteriorTitulo
  const destacadoEyebrow = modelo?.destacadoEyebrow ?? FALLBACK.destacadoEyebrow
  const destacadoTitulo = modelo?.destacadoTitulo ?? FALLBACK.destacadoTitulo
  const destacadoTexto = modelo?.destacadoTexto ?? FALLBACK.destacadoTexto
  const seguridadTitulo = modelo?.seguridadTitulo ?? FALLBACK.seguridadTitulo
  const seguridadTexto = modelo?.seguridadTexto ?? FALLBACK.seguridadTexto
  const seguridadItems: string[] = modelo?.seguridadItems?.length
    ? modelo.seguridadItems
    : FALLBACK.seguridadItems
  const galeriaTitulo = modelo?.galeriaTitulo ?? FALLBACK.galeriaTitulo
  const rendimientoEyebrow = modelo?.rendimientoEyebrow ?? FALLBACK.rendimientoEyebrow
  const rendimientoTitulo = modelo?.rendimientoTitulo ?? FALLBACK.rendimientoTitulo
  const rendimientoTexto = modelo?.rendimientoTexto ?? FALLBACK.rendimientoTexto
  const rendimientoFilas: { transmision: string; valor: string; unidad?: string }[] = modelo
    ?.rendimientoFilas?.length
    ? modelo.rendimientoFilas
    : FALLBACK.rendimientoFilas
  const modeloSlug = modelo?.slug?.current ?? 'corolla'

  const coloresExterior: ColorExterior[] = (modelo?.coloresExterior ?? []).map(
    (c: {
      label: string
      hex: string
      necesitaBorde: boolean
      imagenes360: { asset?: { url: string } }[]
    }) => ({
      id: c.label,
      label: c.label,
      hex: c.hex,
      needsBorder: c.necesitaBorde,
      imagenes: c.imagenes360
        .filter((img) => img.asset?.url)
        .map((img) => sanityImgWidth(img.asset!.url, 950)),
    })
  )

  const galeriaExterior = (modelo?.galeriaExteriorDetalle ?? [])
    .filter((img: { asset?: { url: string } }) => img.asset?.url)
    .map((img: { asset: { url: string; metadata?: { lqip?: string } } }) => ({
      src: img.asset.url,
      lqip: img.asset.metadata?.lqip,
    }))
  const galeriaInterior = (modelo?.galeriaInteriorDetalle ?? [])
    .filter((img: { asset?: { url: string } }) => img.asset?.url)
    .map((img: { asset: { url: string; metadata?: { lqip?: string } } }) => ({
      src: img.asset.url,
      lqip: img.asset.metadata?.lqip,
    }))

  const heroDesktopUrl = modelo?.heroDesktop?.asset?.url ?? '/images/corolla/corolla2.webp'
  const heroMobileUrl =
    modelo?.heroMobile?.asset?.url ?? '/images/corolla/corolla-hero-mobile@2x.webp'
  const imagenDestacadoUrl = modelo?.imagenDestacado?.asset?.url ?? '/images/corolla/TSS.webp'
  const imagenRendimientoUrl =
    modelo?.imagenRendimiento?.asset?.url ?? '/images/corolla/corolla-rendimiento.webp'

  return (
    <div className="bg-background text-foreground antialiased">
      {/* § 1 · HERO */}
      <section id="hero" className="relative overflow-hidden bg-[#D8D8D8] max-desktop:bg-white h-[clamp(420px,42vw,560px)] max-desktop:h-auto">
        <div className="absolute inset-0 max-desktop:relative max-desktop:h-[260px]">
          <HeroPicture desktopUrl={heroDesktopUrl} mobileUrl={heroMobileUrl} nombreModelo={nombreModelo} />
          {/* Gradiente blanco para legibilidad — solo desktop */}
          <div
            className="absolute inset-0 pointer-events-none max-desktop:hidden"
            style={{
              background:
                'linear-gradient(to right, #fff 20%, rgba(255,255,255,0.5) 32%, rgba(255,255,255,0) 44%)',
            }}
          />
        </div>

        <div className="relative z-[1] max-w-7xl mx-auto px-6 max-desktop:px-4 h-full flex items-center max-desktop:h-auto max-desktop:pt-8 max-desktop:pb-11">
          <div className="w-[46%] max-desktop:w-full flex flex-col gap-[18px] max-desktop:text-center max-desktop:items-center">
            <div>
              <span className="inline-block border-[1.5px] border-[#666] text-[#555] text-xs font-semibold tracking-[3.5px] px-[15px] py-[5px] uppercase">
                {categoria}
              </span>
            </div>
            <h1 className="text-[clamp(40px,5.5vw,72px)] font-black tracking-[-.02em] leading-none text-black uppercase">
              {nombreModelo}
            </h1>
            <p className="text-[clamp(16px,1.6vw,18px)] font-semibold text-[#555] leading-[1.55] max-w-[340px] whitespace-pre-line">
              {heroSubtitulo}
            </p>
            <div>
              <span className="text-[11px] font-semibold text-[#888] uppercase tracking-[1.5px] block mb-[5px]">
                Desde
              </span>
              <span className="text-[clamp(24px,2.8vw,32px)] font-semibold text-foreground tracking-tight">
                ${(modelo?.precioDesde ?? 428600).toLocaleString('es-MX')} MXN
              </span>
            </div>
            <div className="flex max-desktop:flex-col max-desktop:w-full gap-3">
              <a
                href="#versiones"
                className="inline-flex items-center justify-center gap-2.5 text-foreground text-[13px] font-semibold tracking-[.3px] border-2 border-foreground px-5 py-[11px] w-fit max-desktop:w-full no-underline transition-colors hover:bg-toyota-red hover:border-toyota-red hover:text-white"
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
          </div>
        </div>
      </section>

      {/* § 1.5 · INTRO */}
      <section id="intro" className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-6 max-desktop:px-4 [&_p]:text-[clamp(16px,1.2vw,18px)] [&_p]:text-[#1a1a1a] [&_p]:leading-[1.7] [&_strong]:font-semibold">
          {modelo?.descripcion ? (
            <PortableText value={modelo.descripcion} />
          ) : (
            <p>
              <span className="font-semibold">
                Hay autos que funcionan. Y hay autos que te hacen querer manejar.
              </span>{' '}
              El {nombreModelo} es de los segundos. Con un diseño más definido, una cabina que
              equilibra confort y tecnología, y un sistema de seguridad activa que trabaja
              contigo en cada trayecto, es el sedán que combina todo lo que buscas sin
              sacrificar nada de lo que necesitas.
            </p>
          )}
        </div>
      </section>

      {/* § 1.7 · HIGHLIGHTS BAR */}
      <section id="highlights" className="bg-toyota-gray py-5">
        <div className="max-w-7xl mx-auto px-6 max-desktop:px-4 grid grid-cols-4 max-desktop:grid-cols-2">
          {caracteristicas.map((h, i, arr) => (
            <div key={h.titulo} className="relative flex flex-col items-center gap-1.5 px-3 py-4">
              <HighlightIcon nombre={h.icono} />
              <span className="text-[11px] font-semibold tracking-[2.5px] text-[#888] uppercase">
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

      {/* § 2 · VERSIONES Y PRECIOS */}
      <section id="versiones" className="bg-white py-20 max-desktop:py-[52px] border-t border-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-6 max-desktop:px-4">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="text-xs font-semibold tracking-[3px] text-toyota-red uppercase">
                Versiones {anio}
              </span>
              <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] mt-1.5 text-black leading-[1.05]">
                Elige tu versión
              </h2>
            </div>
          </div>

          <VersionesCarousel versiones={versiones} nombreModelo={nombreModelo} />

          <p className="text-xs text-[#777] mt-5 leading-[1.6]">
            Precios y especificaciones sujetos a cambio sin previo aviso. Las imágenes mostradas
            son únicamente ilustrativas. Consulte disponibilidad, equipamiento y precio vigente
            con un Asesor Toyota.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3.5 text-center">
            <p className="text-sm text-[#444] leading-normal">
              Para ver más detalles de cada versión consulta la ficha técnica.
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
              Descargar ficha técnica (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* § 3 · EXTERIOR Y COLORES */}
      <section id="exterior" className="bg-white py-20 max-desktop:py-[52px] border-t border-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-6 max-desktop:px-4">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-[3px] text-toyota-red uppercase">
              Exterior
            </span>
            <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] mt-1.5 text-black leading-[1.05]">
              {exteriorTitulo}
            </h2>
          </div>
          <ExteriorColores colores={coloresExterior} nombreModelo={nombreModelo} />
        </div>
      </section>

      {/* § 5 · CTA INTERMEDIO */}
      <section id="mid-cta" className="bg-toyota-red py-[72px] max-desktop:py-12">
        <div className="max-w-7xl mx-auto px-6 max-desktop:px-4 flex max-desktop:flex-col justify-between max-desktop:justify-start items-center max-desktop:items-start gap-7">
          <div>
            <h2 className="text-[clamp(24px,3.5vw,40px)] font-semibold text-white tracking-[-.02em] leading-[1.1]">
              ¿Listo para dar el siguiente paso?
            </h2>
            <p className="text-[clamp(15px,1.6vw,17px)] text-white mt-2.5">
              Un asesor de Toyota Cuautitlán te contacta hoy.
            </p>
          </div>
          <Link
            href={`/cotizacion?modelo=${modeloSlug}`}
            className="flex-shrink-0 inline-block bg-white text-toyota-red px-11 py-[18px] text-[15px] font-semibold no-underline tracking-[.3px] whitespace-nowrap transition-colors hover:bg-foreground hover:text-white max-desktop:w-full max-desktop:text-center"
          >
            Solicitar cotización
          </Link>
        </div>
      </section>

      {/* § 4 · TECNOLOGÍA (TSS) */}
      <section id="tecnologia" className="bg-toyota-gray py-20 max-desktop:py-[52px]">
        <div className="max-w-7xl mx-auto px-6 max-desktop:px-4 grid grid-cols-2 max-desktop:grid-cols-1 gap-16 max-desktop:gap-8 items-center">
          <div>
            <span className="text-xs font-semibold tracking-[3px] text-toyota-red uppercase">
              {destacadoEyebrow}
            </span>
            <h2 className="text-[clamp(28px,3.5vw,42px)] font-semibold tracking-[-.02em] mt-2 text-black leading-[1.05]">
              {destacadoTitulo}
            </h2>
            <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7] mt-5">
              {destacadoTexto}
            </p>
          </div>
          <div className="aspect-[4/3] bg-white overflow-hidden relative">
            <Image
              src={imagenDestacadoUrl}
              alt={`${nombreModelo} · ${destacadoTitulo}`}
              fill
              className="object-cover"
              sizes="(max-width: 880px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* § 4b · SEGURIDAD */}
      <section id="seguridad" className="bg-foreground py-20 max-desktop:py-[52px]">
        <div className="max-w-7xl mx-auto px-6 max-desktop:px-4">
          <div className="mb-12">
            <span className="text-xs font-semibold tracking-[3px] text-toyota-red uppercase">
              Seguridad
            </span>
            <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] mt-2 text-white leading-[1.05]">
              {seguridadTitulo}
            </h2>
            <p className="text-base text-white mt-3.5 max-w-[560px] leading-[1.6]">
              {seguridadTexto}
            </p>
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

      {/* § 6 · GALERÍA */}
      <section id="galeria" className="bg-white py-20 max-desktop:py-[52px]">
        <div className="max-w-7xl mx-auto px-6 max-desktop:px-4">
          <div className="mb-9">
            <span className="text-xs font-semibold tracking-[3px] text-toyota-red uppercase">
              Galería
            </span>
            <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] mt-1.5 text-black leading-[1.05]">
              {galeriaTitulo}
            </h2>
          </div>
          <Galeria exterior={galeriaExterior} interior={galeriaInterior} nombreModelo={nombreModelo} />
        </div>
      </section>

      {/* § 7 · RENDIMIENTO */}
      <section id="rendimiento" className="bg-white py-20 max-desktop:py-[52px]">
        <div className="max-w-7xl mx-auto px-6 max-desktop:px-4 grid grid-cols-2 max-desktop:grid-cols-1 gap-20 max-desktop:gap-8 items-center">
          <div className="aspect-[4/3] max-desktop:max-h-[300px] bg-white overflow-hidden relative">
            <Image
              src={imagenRendimientoUrl}
              alt={`${nombreModelo} · vista trasera ¾`}
              fill
              className="object-contain"
              sizes="(max-width: 880px) 100vw, 50vw"
            />
          </div>

          <div>
            <span className="text-xs font-semibold tracking-[3px] text-toyota-red uppercase">
              {rendimientoEyebrow}
            </span>
            <h2 className="text-[clamp(26px,3.5vw,42px)] font-semibold tracking-[-.02em] mt-2 text-black leading-[1.08]">
              {rendimientoTitulo}
            </h2>
            <p className="text-[15px] text-[#666] mt-3 leading-[1.6]">
              {rendimientoTexto}
            </p>

            <div className="mt-8 bg-toyota-gray rounded-md overflow-hidden">
              <div className="grid grid-cols-2 border-b-2 border-[#E0E0E0]">
                <div className="px-6 py-[18px] text-sm font-semibold text-foreground border-r border-[#E0E0E0]">
                  Transmisión
                </div>
                <div className="px-6 py-[18px] text-sm font-semibold text-foreground">
                  Rendimiento de Combustible<sup className="text-[10px]">**</sup>
                </div>
              </div>
              {rendimientoFilas.map((row, i) => (
                <div
                  key={row.transmision}
                  className={`grid grid-cols-2 ${i === 0 ? 'border-b border-[#E8E8E8]' : ''}`}
                >
                  <div className="px-6 py-5 text-sm font-semibold text-toyota-red border-r border-[#E0E0E0]">
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

      {/* § 8 · CTA FINAL */}
      <section id="final-cta" className="bg-black py-24 max-desktop:py-16">
        <div className="max-w-7xl mx-auto px-6 max-desktop:px-4 text-center flex flex-col items-center gap-4">
          <h2 className="text-[clamp(28px,4.5vw,52px)] font-semibold text-white tracking-[-.02em] leading-[1.08] desktop:whitespace-nowrap">
            ¿Listo para manejar tu {nombreModelo}?
          </h2>
          <p className="text-[clamp(15px,1.8vw,18px)] text-white/60 max-w-[440px] leading-[1.6]">
            Un asesor te contactará a la brevedad.
          </p>
          <div className="mt-2 max-desktop:w-full">
            <Link
              href={`/cotizacion?modelo=${modeloSlug}`}
              className="inline-block bg-white text-black px-14 py-5 text-base font-semibold no-underline tracking-[.3px] transition-colors hover:bg-[#EBEBEB] max-desktop:w-full"
            >
              Solicitar cotización
            </Link>
          </div>
        </div>
      </section>

      {/* § 9 · MODELOS SIMILARES */}
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
            {modelosSimilares.map((m) => (
              <div
                key={m.nombre}
                className="bg-white border border-[#E8E8E8] flex flex-col max-desktop:min-w-[80vw] max-desktop:flex-shrink-0"
              >
                <div className="h-[180px] bg-white flex items-center justify-center overflow-hidden relative">
                  <Image
                    src={m.imagen}
                    alt={m.nombre}
                    fill
                    className="object-contain"
                    sizes="(max-width: 880px) 80vw, 33vw"
                  />
                </div>
                <div className="px-6 pt-6 pb-7 flex flex-col gap-2.5 flex-1">
                  <span className="border border-[#AAA] text-[10px] font-semibold tracking-[2px] px-2 py-[3px] text-[#777] uppercase self-start">
                    {m.categoria}
                  </span>
                  <div className="text-[clamp(20px,2.5vw,26px)] font-semibold tracking-[-.02em] text-foreground leading-none">
                    {m.nombre}
                  </div>
                  <div className="text-sm text-[#555] mt-0.5">
                    Desde <strong className="text-foreground font-semibold">{m.precio}</strong>
                  </div>
                  <Link
                    href={m.href}
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
    </div>
  )
}
