import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getConfiguracion, getPaginaContacto } from '@/lib/sanity/queries'
import { datosContacto, formatoTelefono } from '@/lib/contacto'
import SectionHero from '@/components/ui/SectionHero'
import Button from '@/components/ui/Button'
import BotonContacto from '@/components/ui/BotonContacto'
import HighlightIcon from '@/components/ui/HighlightIcon'

// Los textos, el directorio (extensión, WhatsApp y horarios de cada departamento) y los enlaces del mapa se editan
// en Sanity ("Página: Contacto", documento único). La dirección, el teléfono general y los WhatsApp de Ventas y
// Servicio salen de "Configuración del sitio" (los usa también el menú), así nunca se desalinean.
// Se actualiza sola al publicar en Sanity, sin deploy (aviso en app/api/revalidate; respaldo en app/layout.tsx).
// Estructura tipo directorio: ubicación con mapa de Google y un botón por aplicación de navegación (Google Maps y
// Waze, las más usadas en el Estado de México y la zona metropolitana), y una tarjeta por departamento con el
// teléfono general más su extensión, WhatsApp y horarios. Ningún enlace sirve para todos los teléfonos y deja
// elegir la app, por eso un botón por aplicación. Probar Waze y las llamadas con extensión en teléfonos reales.

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPaginaContacto()
  return {
    title: 'Contacto',
    description:
      p?.seoDescripcion || 'Contáctanos en Toyota Cuautitlán. Dirección, teléfonos y horarios de cada departamento.',
  }
}

// Respaldo si el documento no trae estos enlaces: la ficha exacta de la agencia (identificador de lugar
// 0x85d21e2d007fdac1:0x3f474dfd93cdfb5c, del enlace de "Compartir") y las coordenadas de la agencia
// (19.6707, -99.1994552).
const MAPA_INCRUSTADO =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2400!2d-99.1994552!3d19.6707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d21e2d007fdac1%3A0x3f474dfd93cdfb5c!2sToyota%20Cuautitl%C3%A1n!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx'
const GOOGLE_MAPS = 'https://www.google.com/maps/dir/?api=1&destination=19.6707,-99.1994552'
const WAZE = 'https://www.waze.com/ul?ll=19.6707%2C-99.1994552&navigate=yes&zoom=17'

// Imágenes del hero de respaldo (la fachada de la agencia): se sustituyen subiendo otra en el Studio.
const HERO_DESKTOP = '/images/contacto/contacto-hero-desktop.webp'
const HERO_MOBILE = '/images/contacto/contacto-hero-mobile.webp'

const contenedor = 'max-w-7xl mx-auto px-6 max-desktop:px-4'
const h2 = 'text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] text-black leading-[1.05]'

type Linea = { _key: string; dias: string; horas: string }
type GrupoHorario = { _key: string; titulo?: string; lineas: Linea[] }
type Departamento = {
  _key: string
  nombre: string
  extension?: string
  canalWhatsapp?: 'ninguno' | 'ventas' | 'servicio' | 'propio'
  whatsappPropio?: string
  horarios?: GrupoHorario[]
}

export default async function ContactoPage() {
  const [p, cfg] = await Promise.all([getPaginaContacto(), getConfiguracion()])
  if (!p) notFound()
  const d = datosContacto(cfg)

  // El WhatsApp de Ventas y el de Servicio son los de la configuración (los mismos del menú); otro número se
  // escribe en el propio departamento.
  const whatsappDe = (dep: Departamento): string | undefined => {
    if (dep.canalWhatsapp === 'ventas') return d.whatsappVentas
    if (dep.canalWhatsapp === 'servicio') return d.whatsappServicio
    if (dep.canalWhatsapp === 'propio') return dep.whatsappPropio
    return undefined
  }
  const departamentos: Departamento[] = p.departamentos ?? []
  const lineasDireccion = d.direccion.split('\n').filter(Boolean)

  return (
    <div className="bg-background text-foreground antialiased">
      <SectionHero
        titulo={p.heroTitulo}
        subtitulo={p.heroSubtitulo}
        imagenDesktop={p.heroDesktop?.asset?.url || HERO_DESKTOP}
        imagenMobile={p.heroMobile?.asset?.url || HERO_MOBILE}
        alt={p.heroAlt || 'Fachada de la agencia Toyota Cuautitlán'}
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

      <section id="ubicacion" className="bg-white border-t border-[#E8E8E8] pt-12 pb-20 max-desktop:pt-10 max-desktop:pb-[52px]">
        <div className={contenedor}>
          <h2 className={h2}>{p.ubicacionTitulo}</h2>
          <div className="mt-10 max-desktop:mt-8 grid grid-cols-5 max-desktop:grid-cols-1 gap-10 max-desktop:gap-8 items-stretch">
            <div className="col-span-2 max-desktop:col-span-1 flex flex-col">
              {p.ubicacionNombre && (
                <h3 className="text-lg font-semibold text-foreground tracking-tight">{p.ubicacionNombre}</h3>
              )}
              <p className="mt-2 text-[clamp(16px,1.2vw,18px)] text-[#555] leading-[1.7]">
                {lineasDireccion.map((l, i) => (
                  <span key={i} className="block">
                    {l}
                  </span>
                ))}
              </p>

              <h3 className="mt-8 text-lg font-semibold text-foreground tracking-tight">Teléfono general</h3>
              <a
                href={d.telefonoHref}
                className="mt-2 inline-flex w-fit items-center gap-3 text-[clamp(24px,3vw,32px)] font-semibold text-toyota-red tracking-[-.01em] leading-[1.1] hover:underline"
              >
                <span aria-hidden="true" className="flex">
                  <HighlightIcon nombre="telefono" />
                </span>
                {formatoTelefono(d.telefono)}
              </a>

              <div className="mt-auto pt-8 flex flex-col gap-3">
                <Button
                  href={p.googleMapsEnlace || GOOGLE_MAPS}
                  external
                  variant="secondary"
                  className="w-full text-center text-base py-3.5"
                >
                  Abrir en Google Maps
                </Button>
                <Button
                  href={p.wazeEnlace || WAZE}
                  external
                  variant="secondary"
                  className="w-full text-center text-base py-3.5"
                >
                  Abrir en Waze
                </Button>
              </div>
            </div>

            <div className="col-span-3 max-desktop:col-span-1 border border-[#E8E8E8] overflow-hidden min-h-[420px] max-desktop:min-h-[320px]">
              <iframe
                title="Mapa de la ubicación de Toyota Cuautitlán"
                src={p.mapaIncrustado || MAPA_INCRUSTADO}
                className="w-full h-full min-h-[420px] max-desktop:min-h-[320px] block"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="directorio" className="bg-toyota-gray py-20 max-desktop:py-[52px]">
        <div className={contenedor}>
          <h2 className={h2}>{p.directorioTitulo}</h2>
          {p.directorioTexto && (
            <p className="mt-4 text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7]">{p.directorioTexto}</p>
          )}
          <div className="mt-12 max-desktop:mt-9 grid grid-cols-2 max-desktop:grid-cols-1 gap-6">
            {departamentos.map((dep) => {
              const whatsapp = whatsappDe(dep)
              const horarios = dep.horarios ?? []
              return (
                <div key={dep._key} className="border border-[#E8E8E8] bg-white p-8 max-desktop:p-6 flex flex-col">
                  <h3 className="text-[clamp(20px,2.5vw,26px)] font-semibold tracking-[-.02em] text-foreground leading-none">
                    {dep.nombre}
                  </h3>
                  <div className="w-7 h-[2px] bg-toyota-red mt-3.5" />

                  {/* El teléfono y el WhatsApp van dentro de los botones (ícono y número como texto del botón) */}
                  <dl className="mt-6">
                    <div>
                      <dt className="text-[clamp(16px,1.2vw,18px)] text-[#555] leading-[1.7]">Horario</dt>
                      <dd className="flex flex-col gap-3">
                        {horarios.length > 0 ? (
                          horarios.map((g) => (
                            <div key={g._key}>
                              {g.titulo && (
                                <p className="text-lg font-semibold text-foreground tracking-tight">{g.titulo}</p>
                              )}
                              <ul className="mt-0.5">
                                {g.lineas.map((l) => (
                                  <li
                                    key={l._key}
                                    className="flex flex-wrap justify-between gap-x-4 text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7]"
                                  >
                                    <span>{l.dias}</span>
                                    <span className="font-semibold">{l.horas}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))
                        ) : (
                          <span className="text-lg text-[#555]">Por confirmar</span>
                        )}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-auto pt-6 flex flex-col gap-3">
                    {/* El ícono y el número son el botón (BotonContacto, el mismo de Refacciones). Con extensión, el enlace
                        marca el número general, espera y teclea la extensión: ver las notas en el componente. */}
                    <BotonContacto
                      tipo="telefono"
                      numero={d.telefono}
                      extension={dep.extension || undefined}
                      accion="Llamar"
                      contexto={dep.nombre}
                    />
                    {whatsapp && (
                      <BotonContacto
                        tipo="whatsapp"
                        numero={whatsapp}
                        accion="Escribir por WhatsApp"
                        contexto={dep.nombre}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
