import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import localFont from 'next/font/local'
import VersionesCarousel from '@/components/corolla/VersionesCarousel'
import ExteriorColores from '@/components/corolla/ExteriorColores'
import Galeria from '@/components/corolla/Galeria'
import { modelosSimilares } from '@/lib/data/corolla'

// Fuente de marca — pendiente confirmar licencia web antes del lanzamiento (nota del handoff)
const toyotaType = localFont({
  src: [
    { path: '../../fonts/ToyotaType-Book.ttf', weight: '400', style: 'normal' },
    { path: '../../fonts/ToyotaType-BookIt.ttf', weight: '400', style: 'italic' },
    { path: '../../fonts/ToyotaType-Semibold.ttf', weight: '600', style: 'normal' },
    { path: '../../fonts/ToyotaType-SemiboldIt.ttf', weight: '600', style: 'italic' },
    { path: '../../fonts/ToyotaType-Black.ttf', weight: '900', style: 'normal' },
    { path: '../../fonts/ToyotaType-BlackIt.ttf', weight: '900', style: 'italic' },
  ],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Toyota Corolla 2026 — Versiones y Precios',
  description:
    'Toyota Corolla 2026 desde $428,600 MXN. Conoce las 6 versiones CVT e híbridas, colores, galería y Toyota Safety Sense. Cotiza en Toyota Cuautitlán.',
}

const seguridadItems = [
  '8 bolsas de aire',
  'Frenos ABS + EBD',
  'Seguros eléctricos',
  'Seguros para niños en puertas traseras',
  'Sistema ISO-FIX / LATCH',
  'Alarmas e inmovilizados',
  'Kit de seguridad',
  'Control de estabilidad VSC',
]

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
      <circle cx="9" cy="9" r="9" fill="#EB0A1E" />
      <path
        d="M5 9.5L7.5 12L13 6.5"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CorollaPage() {
  return (
    <div className={`${toyotaType.className} bg-white text-[#111] antialiased`}>
      {/* § 1 · HERO */}
      <section id="hero" className="relative overflow-hidden bg-[#D8D8D8] max-[880px]:bg-white h-[clamp(420px,42vw,560px)] max-[880px]:h-auto">
        <div className="absolute inset-0 max-[880px]:relative max-[880px]:h-[260px]">
          <Image
            src="/images/corolla/corolla2.webp"
            alt="Toyota Corolla 2026 · ¾ ángulo frontal"
            fill
            priority
            className="object-cover object-[right_center]"
            sizes="100vw"
          />
          {/* Gradiente blanco para legibilidad — solo desktop */}
          <div
            className="absolute inset-0 pointer-events-none max-[880px]:hidden"
            style={{
              background:
                'linear-gradient(to right, #fff 20%, rgba(255,255,255,0.5) 32%, rgba(255,255,255,0) 44%)',
            }}
          />
        </div>

        <div className="relative z-[1] max-w-[1200px] mx-auto px-6 max-[880px]:px-4 h-full flex items-center max-[880px]:h-auto max-[880px]:pt-8 max-[880px]:pb-11">
          <div className="w-[46%] max-[880px]:w-full flex flex-col gap-[18px] max-[880px]:text-center max-[880px]:items-center">
            <div>
              <span className="inline-block border-[1.5px] border-[#666] text-[#555] text-xs font-semibold tracking-[3.5px] px-[15px] py-[5px]">
                SEDANES &amp; HATCHBACKS
              </span>
            </div>
            <h1 className="text-[clamp(40px,5.5vw,72px)] font-black tracking-[-.02em] leading-none text-black uppercase">
              COROLLA
            </h1>
            <p className="text-[clamp(16px,1.6vw,18px)] font-semibold text-[#555] leading-[1.55] max-w-[340px]">
              El sedán más vendido del mundo.
              <br />
              Por algo será.
            </p>
            <div>
              <span className="text-[11px] font-semibold text-[#888] uppercase tracking-[1.5px] block mb-[5px]">
                Desde
              </span>
              <span className="text-[clamp(24px,2.8vw,32px)] font-semibold text-[#111] tracking-tight">
                $428,600 MXN
              </span>
            </div>
            <div className="flex max-[880px]:flex-col max-[880px]:w-full gap-3">
              <a
                href="#versiones"
                className="inline-flex items-center justify-center gap-2.5 text-[#111] text-[13px] font-semibold tracking-[.3px] border-2 border-[#111] px-5 py-[11px] w-fit max-[880px]:w-full no-underline transition-colors hover:bg-[#EB0A1E] hover:border-[#EB0A1E] hover:text-white"
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
        <div className="max-w-[1200px] mx-auto px-6 max-[880px]:px-4">
          <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7]">
            <span className="font-semibold">
              Hay autos que funcionan. Y hay autos que te hacen querer manejar.
            </span>{' '}
            El Corolla es de los segundos. Con un diseño más definido, una cabina que equilibra
            confort y tecnología, y un sistema de seguridad activa que trabaja contigo en cada
            trayecto, es el sedán que combina todo lo que buscas sin sacrificar nada de lo que
            necesitas.
          </p>
        </div>
      </section>

      {/* § 1.7 · HIGHLIGHTS BAR */}
      <section id="highlights" className="bg-[#F5F5F5] py-5">
        <div className="max-w-[1200px] mx-auto px-6 max-[880px]:px-4 grid grid-cols-4 max-[880px]:grid-cols-2">
          {[
            {
              label: 'Motor',
              value: '2.0L · 168 HP',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EB0A1E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="10" rx="2" />
                  <path d="M6 7V5h4v2" />
                  <path d="M14 7V5h4v2" />
                  <path d="M2 12h2M20 12h2" />
                </svg>
              ),
            },
            {
              label: 'Pasajeros',
              value: '5',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EB0A1E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="7" r="2.5" />
                  <circle cx="15" cy="7" r="2.5" />
                  <path d="M4 19c0-3.3 2.2-5.5 5-5.5h6c2.8 0 5 2.2 5 5.5" />
                </svg>
              ),
            },
            {
              label: 'Tracción',
              value: 'Delantera FWD',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EB0A1E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                </svg>
              ),
            },
            {
              label: 'Tecnología',
              value: 'Toyota Safety Sense',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EB0A1E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 4v5c0 4.4-3 8.5-7 9.5C8 20.5 5 16.4 5 12V7l7-4z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              ),
            },
          ].map((h, i, arr) => (
            <div key={h.label} className="relative flex flex-col items-center gap-1.5 px-3 py-4">
              {h.icon}
              <span className="text-[11px] font-semibold tracking-[2.5px] text-[#888] uppercase">
                {h.label}
              </span>
              <span className="text-lg font-semibold text-[#111] tracking-tight text-center">
                {h.value}
              </span>
              {i < arr.length - 1 && (
                <div className="absolute right-0 top-[20%] bottom-[20%] w-px bg-[#D8D8D8] max-[880px]:hidden" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* § 2 · VERSIONES Y PRECIOS */}
      <section id="versiones" className="bg-white py-20 max-[880px]:py-[52px] border-t border-[#F0F0F0]">
        <div className="max-w-[1200px] mx-auto px-6 max-[880px]:px-4">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="text-xs font-semibold tracking-[3px] text-[#EB0A1E] uppercase">
                Versiones 2026
              </span>
              <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] mt-1.5 text-black leading-[1.05]">
                Elige tu versión
              </h2>
            </div>
          </div>

          <VersionesCarousel />

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
              className="inline-flex items-center gap-2 text-white no-underline text-sm font-semibold bg-[#EB0A1E] hover:bg-[#C5091A] px-7 py-[13px] transition-colors"
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
      <section id="exterior" className="bg-white py-20 max-[880px]:py-[52px] border-t border-[#F0F0F0]">
        <div className="max-w-[1200px] mx-auto px-6 max-[880px]:px-4">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-[3px] text-[#EB0A1E] uppercase">
              Exterior
            </span>
            <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] mt-1.5 text-black leading-[1.05]">
              Diseño que impone
            </h2>
          </div>
          <ExteriorColores />
        </div>
      </section>

      {/* § 5 · CTA INTERMEDIO */}
      <section id="mid-cta" className="bg-[#EB0A1E] py-[72px] max-[880px]:py-12">
        <div className="max-w-[1200px] mx-auto px-6 max-[880px]:px-4 flex max-[880px]:flex-col justify-between max-[880px]:justify-start items-center max-[880px]:items-start gap-7">
          <div>
            <h2 className="text-[clamp(24px,3.5vw,40px)] font-semibold text-white tracking-[-.02em] leading-[1.1]">
              ¿Listo para dar el siguiente paso?
            </h2>
            <p className="text-[clamp(15px,1.6vw,17px)] text-white mt-2.5">
              Un asesor de Toyota Cuautitlán te contacta hoy.
            </p>
          </div>
          <Link
            href="/cotizacion?modelo=corolla"
            className="flex-shrink-0 inline-block bg-white text-[#EB0A1E] px-11 py-[18px] text-[15px] font-semibold no-underline tracking-[.3px] whitespace-nowrap transition-colors hover:bg-[#111] hover:text-white max-[880px]:w-full max-[880px]:text-center"
          >
            Solicitar cotización
          </Link>
        </div>
      </section>

      {/* § 4 · TECNOLOGÍA (TSS) */}
      <section id="tecnologia" className="bg-[#F5F5F5] py-20 max-[880px]:py-[52px]">
        <div className="max-w-[1200px] mx-auto px-6 max-[880px]:px-4 grid grid-cols-2 max-[880px]:grid-cols-1 gap-16 max-[880px]:gap-8 items-center">
          <div>
            <span className="text-xs font-semibold tracking-[3px] text-[#EB0A1E] uppercase">
              Tecnología
            </span>
            <h2 className="text-[clamp(28px,3.5vw,42px)] font-semibold tracking-[-.02em] mt-2 text-black leading-[1.05]">
              Toyota Safety Sense
            </h2>
            <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7] mt-5">
              Corolla incluye Toyota Safety Sense en versiones XLE y SE — un conjunto de sistemas
              de asistencia activa que detecta peatones, mantiene el carril, alerta cambios de vía
              y regula la velocidad automáticamente. Tecnología que trabaja contigo antes de que
              la necesites.
            </p>
          </div>
          <div className="aspect-[4/3] bg-white overflow-hidden relative">
            <Image
              src="/images/corolla/TSS.webp"
              alt="Toyota Safety Sense"
              fill
              className="object-cover"
              sizes="(max-width: 880px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* § 4b · SEGURIDAD */}
      <section id="seguridad" className="bg-[#111] py-20 max-[880px]:py-[52px]">
        <div className="max-w-[1200px] mx-auto px-6 max-[880px]:px-4">
          <div className="mb-12">
            <span className="text-xs font-semibold tracking-[3px] text-[#EB0A1E] uppercase">
              Seguridad
            </span>
            <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] mt-2 text-white leading-[1.05]">
              Seguridad es mi segundo nombre
            </h2>
            <p className="text-base text-white mt-3.5 max-w-[560px] leading-[1.6]">
              Una fama internacional construida con los componentes de seguridad y tecnología de
              conducción más avanzados.
            </p>
          </div>

          <div className="grid grid-cols-2 max-[880px]:grid-cols-1 border-t border-white/10">
            {seguridadItems.map((item, i) => (
              <div
                key={item}
                className={`flex items-center gap-4 py-5 border-b border-white/10 ${
                  i % 2 === 0
                    ? 'pr-6 min-[881px]:border-r min-[881px]:border-r-white/10'
                    : 'min-[881px]:pl-6'
                }`}
              >
                <CheckIcon />
                <span className="text-[15px] text-white font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* § 6 · GALERÍA */}
      <section id="galeria" className="bg-white py-20 max-[880px]:py-[52px]">
        <div className="max-w-[1200px] mx-auto px-6 max-[880px]:px-4">
          <div className="mb-9">
            <span className="text-xs font-semibold tracking-[3px] text-[#EB0A1E] uppercase">
              Galería
            </span>
            <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] mt-1.5 text-black leading-[1.05]">
              El auto más vendido del mundo
            </h2>
          </div>
          <Galeria />
        </div>
      </section>

      {/* § 7 · RENDIMIENTO */}
      <section id="rendimiento" className="bg-white py-20 max-[880px]:py-[52px]">
        <div className="max-w-[1200px] mx-auto px-6 max-[880px]:px-4 grid grid-cols-2 max-[880px]:grid-cols-1 gap-20 max-[880px]:gap-8 items-center">
          <div className="aspect-[4/3] max-[880px]:max-h-[300px] bg-white overflow-hidden relative">
            <Image
              src="/images/corolla/corolla-rendimiento.webp"
              alt="Corolla · vista trasera ¾"
              fill
              className="object-contain"
              sizes="(max-width: 880px) 100vw, 50vw"
            />
          </div>

          <div>
            <span className="text-xs font-semibold tracking-[3px] text-[#EB0A1E] uppercase">
              Modo Ahorro
            </span>
            <h2 className="text-[clamp(26px,3.5vw,42px)] font-semibold tracking-[-.02em] mt-2 text-black leading-[1.08]">
              Muévete, ahorra y contribuye
            </h2>
            <p className="text-[15px] text-[#666] mt-3 leading-[1.6]">
              Tecnología pensada para maximizar cada gota. Rendimiento real, eficiencia medible.
            </p>

            <div className="mt-8 bg-[#F5F5F5] rounded-md overflow-hidden">
              <div className="grid grid-cols-2 border-b-2 border-[#E0E0E0]">
                <div className="px-6 py-[18px] text-sm font-semibold text-[#111] border-r border-[#E0E0E0]">
                  Transmisión
                </div>
                <div className="px-6 py-[18px] text-sm font-semibold text-[#111]">
                  Rendimiento de Combustible<sup className="text-[10px]">**</sup>
                </div>
              </div>
              {[
                { trans: 'CVT', valor: '19.14' },
                { trans: 'HEV', valor: '26.3' },
              ].map((row, i) => (
                <div
                  key={row.trans}
                  className={`grid grid-cols-2 ${i === 0 ? 'border-b border-[#E8E8E8]' : ''}`}
                >
                  <div className="px-6 py-5 text-sm font-semibold text-[#EB0A1E] border-r border-[#E0E0E0]">
                    {row.trans}
                  </div>
                  <div className="px-6 py-5 flex items-baseline gap-1.5">
                    <span className="text-[32px] font-semibold text-[#EB0A1E] tracking-[-.02em]">
                      {row.valor}
                    </span>
                    <span className="text-[13px] font-semibold text-[#888]">KM/L</span>
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
      <section id="final-cta" className="bg-black py-24 max-[880px]:py-16">
        <div className="max-w-[1200px] mx-auto px-6 max-[880px]:px-4 text-center flex flex-col items-center gap-4">
          <h2 className="text-[clamp(28px,4.5vw,52px)] font-semibold text-white tracking-[-.02em] leading-[1.08] min-[881px]:whitespace-nowrap">
            ¿Listo para manejar tu Corolla?
          </h2>
          <p className="text-[clamp(15px,1.8vw,18px)] text-white/60 max-w-[440px] leading-[1.6]">
            Un asesor te contactará a la brevedad.
          </p>
          <div className="mt-2 max-[880px]:w-full">
            <Link
              href="/cotizacion?modelo=corolla"
              className="inline-block bg-white text-black px-14 py-5 text-base font-semibold no-underline tracking-[.3px] transition-colors hover:bg-[#EBEBEB] max-[880px]:w-full"
            >
              Solicitar cotización
            </Link>
          </div>
        </div>
      </section>

      {/* § 9 · MODELOS SIMILARES */}
      <section id="similares" className="bg-[#F5F5F5] py-20 max-[880px]:py-[52px]">
        <div className="max-w-[1200px] mx-auto px-6 max-[880px]:px-4">
          <div className="mb-9">
            <span className="text-xs font-semibold tracking-[3px] text-[#EB0A1E] uppercase">
              Modelos similares
            </span>
            <h2 className="text-[clamp(24px,3.5vw,38px)] font-semibold tracking-[-.02em] mt-2 text-[#111] leading-[1.05]">
              Descubre otras opciones
            </h2>
          </div>

          <div className="grid grid-cols-3 max-[880px]:flex max-[880px]:overflow-x-auto gap-6 pb-1">
            {modelosSimilares.map((m) => (
              <div
                key={m.nombre}
                className="bg-white border border-[#E8E8E8] flex flex-col max-[880px]:min-w-[80vw] max-[880px]:flex-shrink-0"
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
                  <div className="text-[clamp(20px,2.5vw,26px)] font-semibold tracking-[-.02em] text-[#111] leading-none">
                    {m.nombre}
                  </div>
                  <div className="text-sm text-[#555] mt-0.5">
                    Desde <strong className="text-[#111] font-semibold">{m.precio}</strong>
                  </div>
                  <Link
                    href={m.href}
                    className="text-[#EB0A1E] text-sm font-semibold no-underline mt-auto pt-2 hover:underline"
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
