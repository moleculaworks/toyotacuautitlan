import Link from 'next/link'
import Image from 'next/image'
import type { Modelo } from '@/types'

const categoriaLabel: Record<string, string> = {
  sedan: 'Sedán',
  suv: 'SUV',
  pickup: 'Pick-up',
  hatchback: 'Hatchback',
  hibrido: 'Híbrido',
  van: 'Van',
  comercial: 'Comercial',
}

export default function ModeloCard({ modelo }: { modelo: Modelo }) {
  return (
    <Link
      href={`/modelos/${modelo.slug.current}`}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className="relative aspect-[16/9] bg-[#F5F5F5]">
        {modelo.imagenPrincipal?.asset?.url ? (
          <Image
            src={modelo.imagenPrincipal.asset.url}
            alt={modelo.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            placeholder={modelo.imagenPrincipal.asset.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={modelo.imagenPrincipal.asset.metadata?.lqip}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">
            Sin imagen
          </div>
        )}
        {modelo.categoria && (
          <span className="absolute top-3 left-3 bg-white text-[#1A1A1A] text-xs font-semibold px-2 py-1 rounded">
            {categoriaLabel[modelo.categoria] ?? modelo.categoria}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#EB0A1E] transition-colors">
          Toyota {modelo.nombre}
        </h3>
        {modelo.descripcionCorta && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{modelo.descripcionCorta}</p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Desde</p>
            <p className="text-lg font-bold text-[#1A1A1A]">
              {modelo.precioDesde
                ? `$${modelo.precioDesde.toLocaleString('es-MX')} MXN`
                : 'Consultar precio'}
            </p>
          </div>
          <span className="text-sm font-semibold text-[#EB0A1E] group-hover:underline">
            Ver más →
          </span>
        </div>
      </div>
    </Link>
  )
}
