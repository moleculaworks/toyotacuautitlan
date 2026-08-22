'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

// Visor 360: secuencia de N ángulos por color que se intercambian
// al arrastrar (drag/swipe) o con las flechas. Las URLs ya vienen
// redimensionadas desde Sanity (ver lib/sanity/image.ts), se sirven
// directo sin pasar por next/image.

export interface ColorExterior {
  id: string
  label: string
  hex: string
  needsBorder: boolean
  imagenes: string[]
}

// Píxeles de arrastre necesarios para avanzar un ángulo
const PX_POR_ANGULO = 25

function DragIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3L4 7l4 4" />
      <path d="M4 7h16" />
      <path d="M16 21l4-4-4-4" />
      <path d="M20 17H4" />
    </svg>
  )
}

export default function ExteriorColores({ colores }: { colores: ColorExterior[] }) {
  const [activeColor, setActiveColor] = useState(colores[0]?.id)
  const [angulo, setAngulo] = useState(1) // 1..N
  const [cargado, setCargado] = useState<Record<string, boolean>>({})

  const dragStart = useRef<{ x: number; angulo: number } | null>(null)
  const viewerRef = useRef<HTMLDivElement>(null)

  const color = colores.find((c) => c.id === activeColor) ?? colores[0]
  const totalAngulos = color.imagenes.length

  // Precarga los ángulos del color activo
  useEffect(() => {
    if (cargado[activeColor]) return
    let pendientes = totalAngulos
    for (const src of color.imagenes) {
      const img = new window.Image()
      img.onload = img.onerror = () => {
        pendientes--
        if (pendientes === 0) setCargado((c) => ({ ...c, [activeColor]: true }))
      }
      img.src = src
    }
  }, [activeColor, color.imagenes, totalAngulos, cargado])

  const rotar = useCallback(
    (dir: number) => {
      setAngulo((a) => ((a - 1 + dir + totalAngulos) % totalAngulos) + 1)
    },
    [totalAngulos]
  )

  // Drag con pointer events (funciona mouse y touch)
  function onPointerDown(e: React.PointerEvent) {
    dragStart.current = { x: e.clientX, angulo }
    viewerRef.current?.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragStart.current) return
    const delta = e.clientX - dragStart.current.x
    const pasos = Math.round(delta / PX_POR_ANGULO)
    const nuevo =
      ((dragStart.current.angulo - 1 - pasos) % totalAngulos + totalAngulos) % totalAngulos + 1
    setAngulo(nuevo)
  }

  function onPointerUp() {
    dragStart.current = null
  }

  return (
    <div className="flex max-[880px]:flex-col items-stretch border border-[#EBEBEB]">
      {/* Viewer 360 */}
      <div className="flex-1 relative bg-white flex items-center justify-center min-h-[420px] max-[880px]:min-h-[300px] overflow-hidden p-10 max-[880px]:p-4">
        <div
          ref={viewerRef}
          className="w-full max-w-[520px] aspect-[3/2] relative overflow-hidden cursor-grab active:cursor-grabbing select-none touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          role="img"
          aria-label={`Corolla ${color.label} · vista 360, ángulo ${angulo} de ${totalAngulos}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={color.imagenes[angulo - 1]}
            alt=""
            draggable={false}
            className="w-full h-full object-contain pointer-events-none"
          />
          {!cargado[activeColor] && (
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] text-[#999] bg-white/80 px-3 py-1 rounded">
              Cargando vistas…
            </span>
          )}
        </div>

        {/* Desktop: flechas flotantes a los lados + hint abajo */}
        <span className="max-[880px]:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-[#888] pointer-events-none">
          <DragIcon />
          Arrastra para girar
        </span>
        <button
          onClick={() => rotar(-1)}
          aria-label="Ángulo anterior"
          className="max-[880px]:hidden absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#EB0A1E] hover:bg-[#C5091A] border-none text-white text-[22px] cursor-pointer flex items-center justify-center shadow-[0_4px_12px_rgba(235,10,30,0.3)]"
        >
          ‹
        </button>
        <button
          onClick={() => rotar(1)}
          aria-label="Ángulo siguiente"
          className="max-[880px]:hidden absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#EB0A1E] hover:bg-[#C5091A] border-none text-white text-[22px] cursor-pointer flex items-center justify-center shadow-[0_4px_12px_rgba(235,10,30,0.3)]"
        >
          ›
        </button>
      </div>

      {/* Mobile: fila de controles debajo de la imagen — sin tapar el auto */}
      <div className="min-[881px]:hidden flex items-center justify-center gap-4 py-3 border-t border-[#EBEBEB] bg-white">
        <button
          onClick={() => rotar(-1)}
          aria-label="Ángulo anterior"
          className="w-11 h-11 rounded-full bg-[#EB0A1E] border-none text-white text-xl cursor-pointer flex items-center justify-center flex-shrink-0"
        >
          ‹
        </button>
        <span className="flex items-center gap-2 text-xs text-[#888]">
          <DragIcon />
          Arrastra para girar
        </span>
        <button
          onClick={() => rotar(1)}
          aria-label="Ángulo siguiente"
          className="w-11 h-11 rounded-full bg-[#EB0A1E] border-none text-white text-xl cursor-pointer flex items-center justify-center flex-shrink-0"
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
          {colores.map((c) => {
            const isActive = c.id === activeColor
            return (
              <button
                key={c.id}
                onClick={() => setActiveColor(c.id)}
                className="flex items-center gap-3.5 px-3 py-2.5 border-none cursor-pointer w-full max-[880px]:w-auto max-[880px]:flex-shrink-0 text-left rounded transition-transform hover:bg-[#F4F4F4]"
                style={{ background: isActive ? '#F8F8F8' : '#fff' }}
              >
                <span
                  className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: c.hex,
                    border: `1.5px solid ${
                      isActive ? '#EB0A1E' : c.needsBorder ? '#C5C5C5' : 'rgba(0,0,0,0.1)'
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
                  {c.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
