import type { Metadata } from 'next'
import SectionHero from '@/components/ui/SectionHero'
import Button from '@/components/ui/Button'
import IconoGenerico from '@/components/ui/IconoGenerico'
import HighlightIcon, { TAMANO_ICONO_BENEFICIOS } from '@/components/ui/HighlightIcon'

export const metadata: Metadata = {
  title: 'Refacciones',
  description: 'Consulta y cotiza refacciones originales Toyota. Contáctanos por teléfono o WhatsApp en Toyota Cuautitlán.',
}

// PENDIENTE (10 nov 2026): los números son FICTICIOS (55 0000 0000) y los textos viven en el código;
// falta poner los números reales y decidir si los textos pasan a Sanity (como Financiamiento y Precios
// de servicio). Reemplazar las cuatro constantes de abajo.
const TELEFONO_TEXTO = '55 0000 0000'
const TELEFONO_HREF = 'tel:5500000000'
const WHATSAPP_TEXTO = '55 0000 0000'
const WHATSAPP_HREF = 'https://wa.me/525500000000'

const contenedor = 'max-w-7xl mx-auto px-6 max-desktop:px-4'
const h2 = 'text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] text-black leading-[1.05]'

// Íconos de HighlightIcon: seguridad (existía), engranes, velocimetro y sello (nuevos, 10 nov 2026).
const ventajas = [
  {
    titulo: 'Calidad y confianza',
    icono: 'seguridad',
    texto: 'Fabricadas bajo los estándares de calidad de Toyota, para ofrecerte la confianza y tranquilidad que buscas en cada recorrido.',
  },
  {
    titulo: 'Ajuste perfecto',
    icono: 'engranes',
    texto: 'Diseñadas específicamente para cada modelo, aseguran una compatibilidad precisa y una integración adecuada con los componentes de tu Toyota.',
  },
  {
    titulo: 'Desempeño óptimo',
    icono: 'velocimetro',
    texto: 'Ayudan a conservar el funcionamiento y rendimiento de tu vehículo, manteniendo las características para las que fue diseñado desde el inicio.',
  },
  {
    titulo: 'Durabilidad y respaldo',
    icono: 'sello',
    texto: 'Elige componentes respaldados por los estándares de Toyota y ten la tranquilidad de contar con el respaldo de un distribuidor autorizado.',
  },
]

const canales = [
  {
    titulo: 'Teléfono',
    icono: 'telefono',
    dato: TELEFONO_TEXTO,
    texto: 'Llama y un asesor de refacciones te atenderá.',
    boton: 'Llamar ahora',
    href: TELEFONO_HREF,
    externo: false,
    variante: 'secondary' as const,
  },
  {
    titulo: 'WhatsApp',
    icono: 'whatsapp',
    dato: WHATSAPP_TEXTO,
    texto: 'Escríbenos con los datos de tu vehículo y la pieza que buscas.',
    boton: 'Escribir por WhatsApp',
    href: WHATSAPP_HREF,
    externo: true,
    variante: 'primary' as const,
  },
]

export default function RefaccionesPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SectionHero
        titulo="Refacciones"
        subtitulo={'Refacciones originales Toyota\npara tu vehículo.'}
        imagenDesktop="/images/postventa/refacciones-hero-desktop.webp"
        imagenMobile="/images/postventa/refacciones-hero-mobile.webp"
        alt="Anaqueles de refacciones Toyota con aceite, anticongelante y filtros originales"
      />

      <section id="intro" className="bg-white py-10 max-desktop:pt-0">
        <div className={contenedor}>
          <div className="desktop:hidden w-7 h-[2px] bg-toyota-red mb-5 mx-auto" />
          <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7]">
            <strong className="font-semibold">¿Buscas una refacción para tu Toyota o necesitas una cotización?</strong>{' '}
            Comunícate con nuestro departamento de refacciones y un asesor te ayudará a encontrar la pieza que necesitas.
            Ten a la mano el modelo y el año de tu vehículo y, si es posible, el número de serie (VIN) para atenderte más rápido.
          </p>
        </div>
      </section>

      <section id="contacto" className="bg-white border-t border-[#E8E8E8] pt-12 pb-20 max-desktop:pt-10 max-desktop:pb-[52px]">
        <div className={contenedor}>
          <h2 className={h2}>Cotiza tus refacciones</h2>
          <div className="mt-10 max-desktop:mt-8 grid grid-cols-2 max-desktop:grid-cols-1 gap-6">
            {canales.map((c) => (
              <div key={c.titulo} className="border border-[#E8E8E8] bg-white p-8 max-desktop:p-6 flex flex-col">
                <HighlightIcon nombre={c.icono} size={TAMANO_ICONO_BENEFICIOS} />
                <h3 className="mt-4 text-lg font-semibold text-foreground tracking-tight">{c.titulo}</h3>
                <p className="mt-2 text-[clamp(24px,3vw,32px)] font-semibold text-toyota-red tracking-[-.01em] leading-[1.1]">
                  {c.dato}
                </p>
                <p className="mt-3 text-[clamp(16px,1.2vw,18px)] text-[#555] leading-[1.7]">{c.texto}</p>
                <div className="mt-auto pt-6">
                  <Button
                    href={c.href}
                    external={c.externo}
                    variant={c.variante}
                    className="w-full text-center text-base py-3.5"
                  >
                    {c.boton}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ventajas" className="bg-toyota-gray py-20 max-desktop:py-[52px]">
        <div className={contenedor}>
          <h2 className={h2}>Por qué elegir refacciones originales</h2>
          <div className="mt-12 max-desktop:mt-9 grid grid-cols-4 max-desktop:grid-cols-2 max-sm:grid-cols-1 gap-x-10 gap-y-10">
            {ventajas.map((v) => (
              <div key={v.titulo} className="flex flex-col gap-3">
                {v.icono ? <HighlightIcon nombre={v.icono} size={TAMANO_ICONO_BENEFICIOS} /> : <IconoGenerico size={TAMANO_ICONO_BENEFICIOS} />}
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
