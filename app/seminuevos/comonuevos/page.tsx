import type { Metadata } from 'next'
import Image from 'next/image'
import SectionHero from '@/components/ui/SectionHero'
import Button from '@/components/ui/Button'
import HighlightIcon, { TAMANO_ICONO_BENEFICIOS } from '@/components/ui/HighlightIcon'

// Sección Comonuevos (12 nov 2026). Contenido tomado de toyotacuautitlan.com.mx/comonuevos y de toyota.mx,
// condensado. Los textos viven aquí (sin documento en Sanity por ahora; si se quieren editar desde el Studio,
// pasan a un documento único, como Seguros y Refacciones). Referencia: Secciones/Comonuevos/Comonuevos.md.

export const metadata: Metadata = {
  title: 'Comonuevos',
  description: 'Seminuevos Comonuevos en Toyota Cuautitlán.',
}

// Destino de los dos botones: por definir (formulario, WhatsApp o teléfono; Raúl lo consulta con el departamento).
// Quedan en '#' hasta decidirlo.
const ENLACE_COMPRAR = '#'
const ENLACE_VENDER = '#'

const contenedor = 'max-w-7xl mx-auto px-6 max-desktop:px-4'
const h2 = 'text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] text-black leading-[1.05]'

const VENTAJAS = [
  { src: '/images/comonuevos/comonuevos-ventaja-garantia.webp', alt: 'Tablero de un Toyota seminuevo con el odómetro marcando 45,200 km', titulo: 'Garantía incluida', texto: '3 años o 60,000 km a partir de la fecha de compra (o hasta que el odómetro marque 160,000 km).' },
  { src: '/images/comonuevos/comonuevos-ventaja-profesionales.webp', alt: 'Técnico de Toyota revisando el motor de un auto con una tableta de inspección', titulo: 'Respaldado por profesionales', texto: 'Un equipo técnico altamente capacitado y certificado garantiza el perfecto estado del auto.' },
  { src: '/images/comonuevos/comonuevos-ventaja-tranquilidad.webp', alt: 'Mujer sonriente junto a un Toyota seminuevo con las llaves en la mano', titulo: 'Tranquilidad y confianza', texto: 'Compra un auto de la forma más segura y ahorra en ajustes, reparaciones y servicios viales.' },
]

const REQUISITOS = [
  { icono: 'distribuidor', titulo: 'De un distribuidor autorizado', texto: 'Cualquier Toyota que haya sido comercializado en México por un distribuidor autorizado de Toyota Motor Sales de México.' },
  { icono: 'velocimetro', titulo: 'Hasta 150,000 km y 8 años', texto: 'Con un máximo de 150,000 kilómetros en el odómetro y 8 años de antigüedad desde su comercialización.' },
  { icono: 'mantenimiento', titulo: 'Mantenimientos al día', texto: 'Sus servicios se hicieron en tiempo y forma, de acuerdo con el manual del usuario.' },
  { icono: 'inspeccion', titulo: 'Inspección de más de 160 puntos', texto: 'Aprobó la inspección mecánica y eléctrica completa, punto por punto.' },
]

const INSPECCION = [
  {
    titulo: 'Exterior y estructura',
    puntos: [
      { titulo: 'Apariencia exterior', texto: 'La carrocería no tiene abolladuras.' },
      { titulo: 'Estructura y carrocería', texto: 'El marco y la parte inferior de la carrocería no tienen daños.' },
      { titulo: 'Llantas y suspensión', texto: 'Las cuatro llantas son de la misma marca, modelo, tamaño, diseño, velocidad y capacidad de carga.' },
    ],
  },
  {
    titulo: 'Motor y manejo',
    puntos: [
      { titulo: 'Compartimento del motor', texto: 'El aceite, los frenos, el clutch, la dirección y los demás fluidos están en óptimas condiciones.' },
      { titulo: 'Transmisión y cambios', texto: 'La transmisión y el clutch funcionan con suavidad.' },
      { titulo: 'Sistema de frenado', texto: 'Las balatas conservan al menos el 50% de su vida útil.' },
    ],
  },
  {
    titulo: 'Interior y electrónica',
    puntos: [
      { titulo: 'Apariencia interior', texto: 'Los interiores de piel, vinilo, plástico, tapetes y tela no tienen hoyos, rasgaduras, manchas ni decoloraciones, ni un desgaste exagerado.' },
      { titulo: 'Alarma y audio', texto: 'La alarma y el sistema de audio funcionan correctamente.' },
      { titulo: 'Panel de instrumentos y sistema eléctrico', texto: 'El velocímetro y el odómetro funcionan correctamente.' },
    ],
  },
]

const ACCIONES = [
  {
    id: 'comprar',
    titulo: 'Compra un Comonuevo',
    texto: 'Elige un Toyota seminuevo certificado, con garantía y a un precio accesible.',
    boton: 'Comprar un Comonuevo',
    href: ENLACE_COMPRAR,
  },
  {
    id: 'vender',
    titulo: 'Vende tu Toyota',
    texto: 'Descubre si tu Toyota califica para el programa y estrena uno del año.',
    boton: 'Vender mi Toyota',
    href: ENLACE_VENDER,
  },
]

export default function ComonuevosPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SectionHero
        titulo="Comonuevos"
        subtitulo={'Compra o vende con la misma\nconfianza que un Toyota nuevo.'}
        imagenDesktop="/images/comonuevos/comonuevos-hero-desktop.webp"
        imagenMobile="/images/comonuevos/comonuevos-hero-mobile.webp"
        alt="Comonuevos, seminuevos certificados Toyota"
      />

      <section id="intro" className="bg-white py-10 max-desktop:pt-0">
        <div className={contenedor}>
          <div className="desktop:hidden w-7 h-[2px] bg-toyota-red mb-5 mx-auto" />
          <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7]">
            <strong className="font-semibold">Comonuevos es el programa de seminuevos certificados de Toyota. </strong>
            Adquiere un Toyota seminuevo en perfectas condiciones de funcionamiento y a un precio accesible. Si ya
            eres propietario de un Toyota, el programa también recibe tu seminuevo para que estrenes uno del año.
          </p>
        </div>
      </section>

      <section id="ventajas" className="bg-toyota-gray py-20 max-desktop:py-[52px]">
        <div className={contenedor}>
          <h2 className={h2}>Por qué elegir un Comonuevo</h2>
          <div className="mt-12 max-desktop:mt-9 grid grid-cols-3 max-desktop:grid-cols-1 gap-x-10 gap-y-10">
            {VENTAJAS.map((v) => (
              <div key={v.titulo} className="flex flex-col gap-3">
                <Image
                  src={v.src}
                  alt={v.alt}
                  width={800}
                  height={450}
                  sizes="(max-width: 880px) 100vw, 400px"
                  className="mb-2 h-auto w-full"
                />
                <h3 className="text-lg font-semibold text-foreground tracking-tight">{v.titulo}</h3>
                <p className="text-[clamp(16px,1.2vw,18px)] text-[#555] leading-[1.7]">{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="requisitos" className="bg-white pt-20 pb-20 max-desktop:pt-[52px] max-desktop:pb-[52px]">
        <div className={contenedor}>
          <h2 className={h2}>Qué debe cumplir un auto para ser Comonuevo</h2>
          <div className="mt-12 max-desktop:mt-9 grid grid-cols-4 max-desktop:grid-cols-2 max-sm:grid-cols-1 gap-x-10 gap-y-10">
            {REQUISITOS.map((r) => (
              <div key={r.titulo} className="flex flex-col gap-3">
                <HighlightIcon nombre={r.icono} size={TAMANO_ICONO_BENEFICIOS} />
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
              <h2 className={h2}>Más de 160 puntos de inspección</h2>
              <p className="mt-4 text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7]">
                Cada auto pasa por una revisión mecánica y eléctrica completa. Estos son algunos de los puntos que se revisan.
              </p>
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
            {INSPECCION.map((g) => (
              <div key={g.titulo} className="border border-[#E8E8E8] bg-white p-8 max-desktop:p-6 flex flex-col">
                <h3 className="text-[clamp(20px,2.5vw,26px)] font-semibold tracking-[-.02em] text-foreground leading-none">
                  {g.titulo}
                </h3>
                <div className="w-7 h-[2px] bg-toyota-red mt-3.5" />
                <div className="mt-6 flex flex-col gap-5">
                  {g.puntos.map((pt, i) => (
                    <div key={pt.titulo} className={i > 0 ? 'border-t border-[#E8E8E8] pt-5' : ''}>
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
          <h2 className={h2}>¿Qué quieres hacer?</h2>
          <div className="mt-10 max-desktop:mt-8 grid grid-cols-2 max-desktop:grid-cols-1 gap-6">
            {ACCIONES.map((a) => (
              <div key={a.id} className="border border-[#E8E8E8] bg-white p-8 max-desktop:p-6 flex flex-col">
                <h3 className="text-[clamp(20px,2.5vw,26px)] font-semibold tracking-[-.02em] text-foreground leading-none">
                  {a.titulo}
                </h3>
                <div className="w-7 h-[2px] bg-toyota-red mt-3.5" />
                <p className="mt-5 text-[clamp(16px,1.2vw,18px)] text-[#555] leading-[1.7]">{a.texto}</p>
                <div className="mt-auto pt-6">
                  <Button href={a.href} variant="primary" className="w-full text-center text-base py-3.5">
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
