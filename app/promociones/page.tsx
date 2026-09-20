import type { Metadata } from 'next'
import Image from 'next/image'
import { getPromociones } from '@/lib/sanity/queries'
import Button from '@/components/ui/Button'
import type { Promocion } from '@/types'

export const metadata: Metadata = {
  title: 'Promociones',
  description: 'Aprovecha las mejores ofertas y promociones en Toyota Cuautitlán Izcalli. Enganche especial, tasa preferencial y más.',
}

export default async function PromocionesPage() {
  const promociones: Promocion[] = await getPromociones()

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-semibold text-foreground">Promociones</h1>
          <p className="mt-2 text-gray-500">Ofertas vigentes en Toyota Cuautitlán</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {promociones.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No hay promociones activas en este momento.</p>
            <p className="mt-2 text-gray-400 text-sm">Llámanos al <a href="tel:5558706655" className="text-toyota-red hover:underline">(55) 5870-6655</a> para conocer ofertas especiales.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promociones.map((promo) => (
              <div key={promo._id} className="bg-white overflow-hidden border border-[#E8E8E8] flex flex-col">
                <div className="relative aspect-[16/9] bg-[#F5F5F5]">
                  {promo.imagen?.asset?.url ? (
                    <Image
                      src={promo.imagen.asset.url}
                      alt={promo.titulo}
                      fill
                      className="object-cover"
                      placeholder={promo.imagen.asset.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={promo.imagen.asset.metadata?.lqip}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">Sin imagen</div>
                  )}
                  {promo.etiqueta && (
                    <span className="absolute top-3 left-3 bg-toyota-red text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {promo.etiqueta}
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {promo.modelo && (
                    <p className="text-xs font-semibold text-toyota-red uppercase tracking-wide mb-1">
                      Toyota {promo.modelo.nombre}
                    </p>
                  )}
                  <h2 className="text-lg font-semibold text-foreground">{promo.titulo}</h2>
                  <p className="mt-2 text-sm text-gray-500 flex-1">{promo.descripcion}</p>

                  {promo.vigenciaHasta && (
                    <p className="mt-3 text-xs text-gray-400">
                      Vigente hasta: {new Date(promo.vigenciaHasta + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  )}

                  <Button
                    href={promo.modelo ? `/cotizacion?modelo=${promo.modelo.slug.current}` : '/cotizacion'}
                    variant="primary"
                    className="mt-4 w-full text-center px-4 py-2.5 text-sm"
                  >
                    Aprovechar promoción
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
