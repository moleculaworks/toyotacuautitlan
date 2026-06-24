import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getModeloBySlug, getModelos } from '@/lib/sanity/queries'
import type { Modelo } from '@/types'

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
  const modelo: Modelo | null = await getModeloBySlug(slug)
  if (!modelo) return {}
  return {
    title: modelo.seoTitulo ?? `Toyota ${modelo.nombre}`,
    description:
      modelo.seoDescripcion ??
      modelo.descripcionCorta ??
      `Conoce el Toyota ${modelo.nombre} en Toyota Cuautitlán Izcalli.`,
  }
}

export default async function ModeloPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const modelo: Modelo | null = await getModeloBySlug(slug)
  if (!modelo) notFound()

  return (
    <div className="bg-white">
      {/* Hero del modelo */}
      <div className="bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/modelos" className="hover:text-[#EB0A1E]">
              Modelos
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#1A1A1A]">Toyota {modelo.nombre}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Imagen */}
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-white shadow-sm">
              {modelo.imagenPrincipal?.asset?.url ? (
                <Image
                  src={modelo.imagenPrincipal.asset.url}
                  alt={`Toyota ${modelo.nombre}`}
                  fill
                  className="object-cover"
                  priority
                  placeholder={modelo.imagenPrincipal.asset.metadata?.lqip ? 'blur' : 'empty'}
                  blurDataURL={modelo.imagenPrincipal.asset.metadata?.lqip}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                  Sin imagen
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <p className="text-sm font-medium text-[#EB0A1E] uppercase tracking-wider">
                Toyota
              </p>
              <h1 className="text-4xl font-bold text-[#1A1A1A] mt-1">{modelo.nombre}</h1>
              {modelo.descripcionCorta && (
                <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                  {modelo.descripcionCorta}
                </p>
              )}
              <div className="mt-6">
                <p className="text-sm text-gray-400">Precio desde</p>
                <p className="text-3xl font-bold text-[#1A1A1A]">
                  {modelo.precioDesde
                    ? `$${modelo.precioDesde.toLocaleString('es-MX')} MXN`
                    : 'Consultar precio'}
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/cotizacion?modelo=${modelo.slug.current}`}
                  className="px-6 py-3 bg-[#EB0A1E] text-white font-semibold rounded hover:bg-red-700 transition-colors text-center"
                >
                  Cotizar este modelo
                </Link>
                <Link
                  href="/cita-de-servicio"
                  className="px-6 py-3 border-2 border-[#1A1A1A] text-[#1A1A1A] font-semibold rounded hover:bg-[#1A1A1A] hover:text-white transition-colors text-center"
                >
                  Agendar cita
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Características */}
      {modelo.caracteristicas && modelo.caracteristicas.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Características principales</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {modelo.caracteristicas.map((c, i) => (
              <div key={i} className="bg-[#F5F5F5] rounded-lg p-4">
                {c.icono && <p className="text-2xl mb-2">{c.icono}</p>}
                <p className="text-xs text-gray-400 uppercase tracking-wide">{c.titulo}</p>
                <p className="text-sm font-semibold text-[#1A1A1A] mt-0.5">{c.valor}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Galería */}
      {modelo.galeria && modelo.galeria.length > 0 && (
        <div className="bg-[#F5F5F5] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Galería</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {modelo.galeria.map((img, i) => (
                <div key={i} className="relative aspect-[16/9] rounded-lg overflow-hidden bg-white">
                  <Image
                    src={img.asset.url}
                    alt={`Toyota ${modelo.nombre} - imagen ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    placeholder={img.asset.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={img.asset.metadata?.lqip}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA final */}
      <div className="bg-[#1A1A1A] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            ¿Te interesa el Toyota {modelo.nombre}?
          </h2>
          <p className="mt-2 text-gray-400">
            Un asesor te contactará en menos de 24 horas con tu cotización personalizada.
          </p>
          <Link
            href={`/cotizacion?modelo=${modelo.slug.current}`}
            className="mt-6 inline-block px-8 py-3 bg-[#EB0A1E] text-white font-semibold rounded hover:bg-red-700 transition-colors"
          >
            Solicitar cotización gratuita
          </Link>
        </div>
      </div>
    </div>
  )
}
