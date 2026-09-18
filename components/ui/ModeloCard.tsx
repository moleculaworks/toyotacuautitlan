import Link from 'next/link'
import Image from 'next/image'
import type { Modelo } from '@/types'

export default function ModeloCard({ modelo }: { modelo: Modelo }) {
  return (
    <Link
      href={`/modelos/${modelo.slug.current}`}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className="relative aspect-[16/9] bg-toyota-gray">
        {modelo.imagenTarjeta?.asset?.url ? (
          <Image
            src={modelo.imagenTarjeta.asset.url}
            alt={modelo.nombre}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            placeholder={modelo.imagenTarjeta.asset.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={modelo.imagenTarjeta.asset.metadata?.lqip}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">
            Sin imagen
          </div>
        )}
        {modelo.categoria && (
          <span className="absolute top-3 left-3 bg-white text-[#1A1A1A] text-xs font-semibold px-2 py-1 rounded">
            {modelo.categoria}
          </span>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-[clamp(20px,2.5vw,26px)] font-semibold tracking-[-.02em] leading-none text-[#1A1A1A] group-hover:text-toyota-red transition-colors">
          {modelo.nombre}
        </h2>
        {modelo.descripcionCorta && (
          <p className="mt-1 text-sm text-[#555] line-clamp-2">{modelo.descripcionCorta}</p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#888]">Desde</p>
            <p className="text-lg font-semibold text-[#1A1A1A]">
              {modelo.precioDesde
                ? `$${modelo.precioDesde.toLocaleString('es-MX')} M.N.`
                : 'Consultar precio'}
            </p>
          </div>
          <span className="text-sm font-semibold text-toyota-red group-hover:underline">
            Ver más →
          </span>
        </div>
      </div>
    </Link>
  )
}
