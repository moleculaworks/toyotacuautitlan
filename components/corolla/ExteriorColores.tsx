'use client'

import { useState } from 'react'
import Image from 'next/image'
import { colores } from '@/lib/data/corolla'

// El viewer usa una imagen de referencia estática por ahora.
// Producción (pendiente handoff): secuencia de 16 ángulos por color, 1200×800 WebP.
const VIEWER_SRC = '/images/corolla/referencia_360.webp'

export default function ExteriorColores() {
  const [activeColor, setActiveColor] = useState('grisMetalico')

  const activeLabel = colores.find((c) => c.id === activeColor)?.label ?? ''

  return (
    <div className="flex max-[880px]:flex-col items-stretch border border-[#EBEBEB]">
      {/* Viewer */}
      <div className="flex-1 relative bg-white flex items-center justify-center min-h-[420px] max-[880px]:min-h-[300px] overflow-hidden p-10 max-[880px]:p-4">
        <div className="w-full max-w-[520px] aspect-[4/3] relative overflow-hidden">
          <Image
            src={VIEWER_SRC}
            alt={`Corolla 360° · ${activeLabel}`}
            fill
            className="object-contain"
            sizes="(max-width: 880px) 100vw, 520px"
          />
        </div>

        <button
          aria-label="Ángulo anterior"
          className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#EB0A1E] hover:bg-[#C5091A] border-none text-white text-[22px] cursor-pointer flex items-center justify-center shadow-[0_4px_12px_rgba(235,10,30,0.3)]"
        >
          ‹
        </button>
        <button
          aria-label="Ángulo siguiente"
          className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#EB0A1E] hover:bg-[#C5091A] border-none text-white text-[22px] cursor-pointer flex items-center justify-center shadow-[0_4px_12px_rgba(235,10,30,0.3)]"
        >
          ›
        </button>
      </div>

      {/* Panel de colores */}
      <div className="w-[260px] max-[880px]:w-full flex-shrink-0 border-l max-[880px]:border-l-0 max-[880px]:border-t border-[#EBEBEB] bg-white px-7 py-8 max-[880px]:px-4 max-[880px]:py-5">
        <h3 className="text-base font-semibold text-[#111] mb-6 max-[880px]:mb-4 tracking-tight">
          Colores disponibles
        </h3>
        <div className="flex flex-col max-[880px]:flex-row max-[880px]:overflow-x-auto gap-1 max-[880px]:gap-2 max-[880px]:pb-2">
          {colores.map((color) => {
            const isActive = color.id === activeColor
            return (
              <button
                key={color.id}
                onClick={() => setActiveColor(color.id)}
                className="flex items-center gap-3.5 px-3 py-2.5 border-none cursor-pointer w-full max-[880px]:w-auto max-[880px]:flex-shrink-0 text-left rounded transition-transform hover:bg-[#F4F4F4]"
                style={{ background: isActive ? '#F8F8F8' : '#fff' }}
              >
                <span
                  className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: color.hex,
                    border: `1.5px solid ${
                      isActive ? '#EB0A1E' : color.needsBorder ? '#C5C5C5' : 'rgba(0,0,0,0.1)'
                    }`,
                  }}
                >
                  {isActive && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2.5 7.5L5.5 10.5L11.5 4"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span
                  className="text-sm text-[#333] max-[880px]:whitespace-nowrap"
                  style={{ fontWeight: isActive ? 700 : 400 }}
                >
                  {color.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
