'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CATEGORIAS } from '@/lib/categorias'
import type { Modelo } from '@/types'

const CATEGORIAS_MENU = CATEGORIAS.filter((c) => c.value !== 'todos')

export default function ModelosMegaMenu({
  modelos,
  onNavigate,
}: {
  modelos: Modelo[]
  onNavigate?: () => void
}) {
  const [activa, setActiva] = useState<string>(CATEGORIAS_MENU[0].value)

  const filtrados =
    activa === 'Híbridos Eléctricos (HEV y PHEV)'
      ? modelos.filter((m) => m.esHibridoElectrico)
      : modelos.filter((m) => m.categoria === activa)

  return (
    <div className="grid grid-cols-[260px_1fr] gap-8">
      {/* Categorías */}
      <div>
        {CATEGORIAS_MENU.map((cat) => {
          const isActive = cat.value === activa
          return (
            <button
              key={cat.value}
              onMouseEnter={() => setActiva(cat.value)}
              onFocus={() => setActiva(cat.value)}
              className={`w-full flex items-center justify-between text-left py-5 border-b border-[#EDEDED] text-[15px] font-semibold transition-colors ${
                isActive ? 'text-toyota-red' : 'text-[#1A1A1A] hover:text-toyota-red'
              }`}
            >
              {cat.label}
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className={isActive ? 'text-toyota-red' : 'text-[#CCC]'}
              >
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )
        })}
      </div>

      {/* Modelos de la categoría activa */}
      <div>
        {filtrados.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-[#999] py-10">
            Próximamente en esta categoría.
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {filtrados.map((modelo) => (
              <Link
                key={modelo._id}
                href={`/modelos/${modelo.slug.current}`}
                onClick={onNavigate}
                className="group"
              >
                <div className="relative aspect-[16/9] bg-[#F5F5F5] rounded overflow-hidden">
                  {modelo.imagenTarjeta?.asset?.url ? (
                    <Image
                      src={modelo.imagenTarjeta.asset.url}
                      alt={modelo.nombre}
                      fill
                      sizes="160px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : null}
                </div>
                <p className="mt-2.5 text-[15px] font-semibold text-[#1A1A1A] group-hover:text-toyota-red transition-colors">
                  {modelo.nombre}
                </p>
                <p className="text-sm font-normal text-[#555] mt-0.5">
                  Desde ${modelo.precioDesde.toLocaleString('es-MX')} M.N.
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
