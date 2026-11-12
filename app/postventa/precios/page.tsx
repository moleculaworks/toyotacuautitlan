import { Fragment } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPaginaPreciosServicio } from '@/lib/sanity/queries'
import SectionHero from '@/components/ui/SectionHero'
import TablaKilometrado, { type TablaKilometradoData } from '@/components/postventa/TablaKilometrado'
import TarjetasFrenos, { type TablaFrenosData } from '@/components/postventa/TarjetasFrenos'
import Button from '@/components/ui/Button'
import FranjaCta from '@/components/ui/FranjaCta'
import NotasServicio from '@/components/postventa/NotasServicio'
import { anclaDe } from '@/components/postventa/formato'
import { placeholders } from '@/lib/data/financiamiento'

// Los precios, las notas y las vigencias se editan en Sanity en cualquier momento; la página
// se actualiza sola al publicar (aviso en app/api/revalidate; respaldo en app/layout.tsx), sin deploy.

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPaginaPreciosServicio()
  return {
    title: 'Precios de servicio',
    description:
      p?.seoDescripcion || 'Precios del servicio de mantenimiento y de frenos para tu Toyota en Toyota Cuautitlán.',
  }
}

// Misma estructura que Financiamiento (acordado 10 nov 2026): hero y párrafo inicial heredados,
// línea gris entre secciones blancas, línea roja corta solo en móvil, h2 de sección sin etiqueta
// roja. De ahí en adelante, una sección por bloque de Sanity, con tablas de kilometrado o de frenos.
// Destino de las franjas de cita. Todavía no hay a dónde llevarlo (formulario real de cita o WhatsApp de
// servicio): queda en '#', igual que los botones "Cotizar ahora" de Financiamiento. Cambiar cuando exista.
const ENLACE_CITA = '#'

// Textos de las franjas rojas: se editan en Sanity (grupo "Franjas de cita"). Estos son el respaldo si un
// campo está vacío. Sin prometer confirmaciones ni procesos que todavía no están definidos.
const FRANJA_MEDIO = { titulo: '¿Listo para agendar tu servicio?', apoyo: 'Programa el mantenimiento de tu Toyota.' }
const FRANJA_FINAL = { titulo: 'Mantén tu Toyota al día', apoyo: 'Agenda tu cita de servicio y cuida tu Toyota.' }
const BOTON_CITA = 'Agenda tu cita de servicio'

const contenedor = 'max-w-7xl mx-auto px-6 max-desktop:px-4'
const h2 = 'text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.02em] text-black leading-[1.05]'
const textoSeccion = 'text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7] mt-4'

type TablaBloque = (TablaKilometradoData | TablaFrenosData) & { _type: string }

type Bloque = {
  _key: string
  titulo: string
  acceso?: string
  texto?: string
  vigencia?: string
  // Notas compartidas por todo el bloque (una sola vez, al final)
  notas?: string[]
  tablas?: TablaBloque[]
  // Varios modelos en un solo bloque (ej. "GR y Supra"): cada uno en su fila
  modelos?: { _key: string; titulo: string; detalle?: string; tablas?: TablaBloque[] }[]
}

function Tablas({ tablas, enColumna = false }: { tablas?: TablaBloque[]; enColumna?: boolean }) {
  return (
    <>
      {(tablas ?? []).map((t) =>
        t._type === 'tablaFrenos' ? (
          <TarjetasFrenos key={t._key} tabla={t as TablaFrenosData} enColumna={enColumna} />
        ) : (
          <TablaKilometrado key={t._key} tabla={t as TablaKilometradoData} enColumna={enColumna} />
        ),
      )}
    </>
  )
}

// Fila de un modelo: kilometrado a la izquierda, frenos a la derecha y las notas de ambas debajo
// (en móvil y tableta, todo en una columna). Se usa en los bloques por modelo (RAV4 PHEV) y en
// cada modelo de un bloque con `modelos` (GR y Supra).
function FilaServicio({ tablas, conTituloModelo = false }: { tablas: TablaBloque[]; conTituloModelo?: boolean }) {
  const km = tablas.filter((t) => t._type === 'tablaKilometrado')
  const fr = tablas.filter((t) => t._type === 'tablaFrenos')
  const reservarDetalle = tablas.some((t) => !!t.detalle)
  return (
    <>
      <div className="grid grid-cols-2 max-desktop:grid-cols-1 gap-x-10 gap-y-2 items-start">
        <div>
          {km.map((t) => (
            <TablaKilometrado key={t._key} tabla={t as TablaKilometradoData} enColumna nivelBajo={conTituloModelo} reservarDetalle={reservarDetalle} sinNotas />
          ))}
        </div>
        <div>
          {fr.map((t) => (
            <TarjetasFrenos key={t._key} tabla={t as TablaFrenosData} enColumna nivelBajo={conTituloModelo} reservarDetalle={reservarDetalle} sinNotas />
          ))}
        </div>
      </div>
      <NotasServicio notas={tablas.flatMap((t) => t.notas ?? [])} />
    </>
  )
}

// Un bloque con tablas de kilometrado Y de frenos va en fila; con un solo tipo, se apilan.
const tieneAmbas = (tablas?: TablaBloque[]) =>
  !!tablas?.some((t) => t._type === 'tablaKilometrado') && !!tablas?.some((t) => t._type === 'tablaFrenos')

export default async function PreciosServicioPage() {
  const p = await getPaginaPreciosServicio()
  if (!p) notFound()

  const bloques: Bloque[] = p.bloques ?? []
  const hayNotasGenerales = (p.notasGenerales ?? []).length > 0
  const franjaMedio = { titulo: p.franjaMedioTitulo || FRANJA_MEDIO.titulo, apoyo: p.franjaMedioApoyo || FRANJA_MEDIO.apoyo }
  const franjaFinal = { titulo: p.franjaFinalTitulo || FRANJA_FINAL.titulo, apoyo: p.franjaFinalApoyo || FRANJA_FINAL.apoyo }
  const textoBoton: string = p.franjaBoton || BOTON_CITA

  return (
    <div className="bg-background text-foreground antialiased">
      <SectionHero
        titulo={p.heroTitulo}
        subtitulo={p.heroSubtitulo}
        imagenDesktop={p.heroDesktop?.asset?.url || placeholders.heroDesktop}
        imagenMobile={p.heroMobile?.asset?.url || placeholders.heroMobile}
        alt={p.heroAlt || p.heroTitulo}
      />

      <section id="intro" className="bg-white py-10 max-desktop:pt-0">
        <div className={contenedor}>
          <div className="desktop:hidden w-7 h-[2px] bg-toyota-red mb-5 mx-auto" />
          <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7]">{p.intro}</p>

          {/* Acceso rápido a cada bloque: la página es larga. Usa el estilo de los botones de
              filtro del catálogo (pastilla con borde que se pone roja al pasar el cursor). */}
          {/* Botón de cita en la misma franja: a la derecha en escritorio (las pastillas a la
              izquierda) y, en móvil, en su propia línea a todo el ancho bajo las pastillas. */}
          <div className="mt-6 flex max-desktop:flex-col items-center max-desktop:items-stretch justify-between gap-x-6 gap-y-4">
            {bloques.length > 1 && (
              <nav aria-label="Secciones de la página" className="flex flex-wrap gap-2">
                {bloques.map((b) => (
                  <a
                    key={b._key}
                    href={`#${anclaDe(b.acceso || b.titulo)}`}
                    className="px-4 py-1.5 text-sm font-semibold border bg-white text-foreground border-gray-200 hover:border-toyota-red hover:text-toyota-red transition-colors"
                  >
                    {b.acceso || b.titulo}
                  </a>
                ))}
              </nav>
            )}
            <Button
              href={ENLACE_CITA}
              variant="primary"
              className="flex-shrink-0 text-base py-3 px-8 whitespace-nowrap"
            >
              {textoBoton}
            </Button>
          </div>
        </div>
      </section>

      {bloques.map((b, i) => {
        return (
          <Fragment key={b._key}>
          <section
            id={anclaDe(b.acceso || b.titulo)}
            className="bg-white border-t border-[#E8E8E8] pt-12 max-desktop:pt-10 pb-12 max-desktop:pb-10 scroll-mt-16 xl:scroll-mt-20"
          >
            <div className={contenedor}>
              <h2 className={h2}>{b.titulo}</h2>
              {b.texto && <p className={textoSeccion}>{b.texto}</p>}
              {b.vigencia && <p className="text-sm font-semibold text-[#555] mt-3">{b.vigencia}</p>}

              {tieneAmbas(b.tablas) ? (
                <div className="mt-2">
                  <FilaServicio tablas={b.tablas!} />
                </div>
              ) : (
                <Tablas tablas={b.tablas} />
              )}

              {(b.modelos ?? []).length > 0 && (
                // Cada modelo en su fila: kilometrado a la izquierda, frenos a la derecha y las notas
                // de ambas debajo (en móvil y tableta, todo en una columna).
                <div className="mt-8 flex flex-col gap-12 max-desktop:gap-10">
                  {b.modelos!.map((m) => {
                    return (
                      <div key={m._key}>
                        <h3 className="text-[clamp(20px,2.5vw,26px)] font-semibold tracking-[-.02em] text-foreground leading-none">
                          {m.titulo}
                        </h3>
                        <div className="w-7 h-[2px] bg-toyota-red mt-3.5" />
                        {m.detalle && <p className="text-sm text-[#555] mt-2">{m.detalle}</p>}
                        <FilaServicio tablas={m.tablas ?? []} conTituloModelo />
                      </div>
                    )
                  })}
                </div>
              )}
              <NotasServicio notas={b.notas} />
            </div>
          </section>
          {/* Franja del medio: después de los dos bloques generales (kilometrado y frenos), antes de
              los modelos con precios propios */}
          {i === 1 && bloques.length > 2 && <FranjaCta id="cita-medio" titulo={franjaMedio.titulo} apoyo={franjaMedio.apoyo} boton={textoBoton} href={ENLACE_CITA} />}
          </Fragment>
        )
      })}

      {hayNotasGenerales && (
        // Notas generales de la página: el mismo desplegable "Ver notas y excepciones" que en cada sección
        <section id="notas" className="bg-white border-t border-[#E8E8E8] pt-4 pb-12 max-desktop:pb-10">
          <div className={contenedor}>
            <NotasServicio notas={p.notasGenerales as string[]} />
          </div>
        </section>
      )}

      {/* Franja del final, antes del pie de página */}
      <FranjaCta id="cita-final" titulo={franjaFinal.titulo} apoyo={franjaFinal.apoyo} boton={textoBoton} href={ENLACE_CITA} />
    </div>
  )
}
