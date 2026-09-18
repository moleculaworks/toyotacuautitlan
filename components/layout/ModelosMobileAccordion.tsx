'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CATEGORIAS } from '@/lib/categorias'
import type { Modelo } from '@/types'

const CATEGORIAS_MENU = CATEGORIAS.filter((c) => c.value !== 'todos')

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className={`flex-shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}
    >
      <path
        d="M6 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ModelosMobileAccordion({
  modelos,
  onNavigate,
}: {
  modelos: Modelo[]
  onNavigate: () => void
}) {
  const [modelosAbierto, setModelosAbierto] = useState(false)
  const [categoriaAbierta, setCategoriaAbierta] = useState<string | null>(null)

  return (
    <div>
      <button
        onClick={() => setModelosAbierto((v) => !v)}
        className="w-full flex items-center justify-between text-sm font-semibold text-[#1A1A1A]"
      >
        Modelos
        <Chevron open={modelosAbierto} />
      </button>

      {modelosAbierto && (
        <div className="mt-3 pl-3 flex flex-col gap-1">
          {CATEGORIAS_MENU.map((cat) => {
            const catAbierta = categoriaAbierta === cat.value
            const modelosCategoria =
              cat.value === 'Híbridos Eléctricos (HEV y PHEV)'
                ? modelos.filter((m) => m.esHibridoElectrico)
                : modelos.filter((m) => m.categoria === cat.value)

            return (
              <div key={cat.value} className="border-b border-[#F0F0F0] last:border-b-0">
                <button
                  onClick={() => setCategoriaAbierta(catAbierta ? null : cat.value)}
                  className={`w-full flex items-center justify-between text-left py-2.5 text-[15px] font-semibold transition-colors ${
                    catAbierta ? 'text-[#EB0A1E]' : 'text-[#1A1A1A]'
                  }`}
                >
                  {cat.label}
                  <Chevron open={catAbierta} />
                </button>

                {catAbierta && (
                  <div className="pb-4">
                    {modelosCategoria.length === 0 ? (
                      <p className="text-sm text-[#999] py-1 pl-3">Próximamente en esta categoría.</p>
                    ) : (
                      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mr-4 pr-4">
                        {modelosCategoria.map((modelo) => (
                          <Link
                            key={modelo._id}
                            href={`/modelos/${modelo.slug.current}`}
                            onClick={onNavigate}
                            className="flex-shrink-0 w-[150px]"
                          >
                            <div className="relative aspect-[16/9] bg-[#F5F5F5] rounded overflow-hidden">
                              {modelo.imagenTarjeta?.asset?.url ? (
                                <Image
                                  src={modelo.imagenTarjeta.asset.url}
                                  alt={modelo.nombre}
                                  fill
                                  sizes="150px"
                                  className="object-cover"
                                />
                              ) : null}
                            </div>
                            <p className="mt-2 text-[15px] font-semibold text-[#1A1A1A]">{modelo.nombre}</p>
                            <p className="text-sm font-normal text-[#555] mt-0.5">
                              Desde ${modelo.precioDesde.toLocaleString('es-MX')} M.N.
                            </p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}

          <Link
            href="/modelos"
            onClick={onNavigate}
            className="text-sm font-semibold text-toyota-red mt-2 py-1"
          >
            Ver todos los modelos →
          </Link>
        </div>
      )}
    </div>
  )
}
