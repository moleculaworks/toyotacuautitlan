import { getImageProps } from 'next/image'

// Hero de las páginas de sección (Financiamiento, Servicio, etc.). Hereda
// EXACTAMENTE los valores del hero de modelo (app/modelos/[slug]/page.tsx §1):
// altura clamp(420px,42vw,560px), degradado blanco desde la izquierda, columna
// de texto del 46%, h1 font-black uppercase y subtítulo semibold. Sin etiqueta de
// categoría, precio ni botón (esos son propios del modelo). No se modificó la
// página de modelo: este componente es una copia aparte para no tocarla.
// Imágenes: desktop 1920x680 y móvil 1600x1200 (mismas medidas que el modelo).

type Props = {
  titulo: string
  subtitulo?: string
  imagenDesktop: string
  imagenMobile?: string
  alt: string
}

export default function SectionHero({ titulo, subtitulo, imagenDesktop, imagenMobile, alt }: Props) {
  // quality 85 (el sitio usa 75 por defecto): el hero de sección lleva personas y se nota más la compresión
  const common = { alt, sizes: '100vw', priority: true, quality: 85 }
  const mobileSrcSet = imagenMobile
    ? getImageProps({ ...common, width: 1600, height: 1200, src: imagenMobile }).props.srcSet
    : undefined
  const { props: rest } = getImageProps({ ...common, width: 1920, height: 680, src: imagenDesktop })

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#D8D8D8] max-desktop:bg-white h-[clamp(420px,42vw,560px)] max-desktop:h-auto"
    >
      <div className="absolute inset-0 max-desktop:relative max-desktop:h-[260px]">
        <picture>
          {mobileSrcSet && <source media="(max-width: 880px)" srcSet={mobileSrcSet} />}
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img {...rest} className="w-full h-full object-cover object-[right_center] max-desktop:object-center" />
        </picture>
        {/* Gradiente blanco para legibilidad, solo desktop */}
        <div
          className="absolute inset-0 pointer-events-none max-desktop:hidden"
          style={{
            background: 'linear-gradient(to right, #fff 25%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0) 55%)',
          }}
        />
      </div>

      <div className="relative z-[1] max-w-7xl mx-auto px-6 max-desktop:px-4 h-full flex items-center max-desktop:h-auto max-desktop:pt-8 max-desktop:pb-11">
        <div className="w-[46%] max-desktop:w-full flex flex-col gap-[18px] max-desktop:text-center max-desktop:items-center">
          <h1 className="text-[clamp(40px,5.5vw,72px)] font-black tracking-[-.02em] leading-none text-black uppercase">
            {titulo}
          </h1>
          {subtitulo && (
            <p className="text-[clamp(18px,1.8vw,20px)] font-semibold text-[#555] leading-[1.55] max-w-[340px] whitespace-pre-line">
              {subtitulo}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
