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

function DragIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3L4 7l4 4" />
      <path d="M4 7h16" />
      <path d="M16 21l4-4-4-4" />
      <path d="M20 17H4" />
    </svg>
  )
}

export default function ExteriorColores({
  colores,
  nombreModelo,
}: {
  colores: ColorExterior[]
  nombreModelo: string
}) {
  const [activeColor, setActiveColor] = useState(colores[0]?.id)
  const [angulo, setAngulo] = useState(1) // 1..N
  const [cargado, setCargado] = useState<Record<string, boolean>>({})
  const [coloresProgress, setColoresProgress] = useState({ left: 0, width: 100 })

  const dragStart = useRef<{ x: number; angulo: number } | null>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const coloresScrollRef = useRef<HTMLDivElement>(null)

  // Posición/ancho (en %) de la barra de progreso del scroll horizontal
  // de colores en mobile — simula el thumb de un scrollbar nativo.
  const medirColoresScroll = useCallback(() => {
    const el = coloresScrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    if (scrollWidth <= clientWidth) {
      setColoresProgress({ left: 0, width: 100 })
      return
    }
    setColoresProgress({
      left: (scrollLeft / scrollWidth) * 100,
      width: (clientWidth / scrollWidth) * 100,
    })
  }, [])

  function onColoresScroll() {
    medirColoresScroll()
  }

  useEffect(() => {
    medirColoresScroll()
    window.addEventListener('resize', medirColoresScroll)
    return () => window.removeEventListener('resize', medirColoresScroll)
  }, [medirColoresScroll, colores.length])

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
    <div className="flex max-desktop:flex-col items-stretch border border-[#EBEBEB]">
      {/* Viewer 360 */}
      <div className="flex-1 relative bg-white flex items-center justify-center min-h-[420px] max-desktop:min-h-[300px] overflow-hidden p-10 max-desktop:p-4">
        <div
          ref={viewerRef}
          className="w-full max-w-[540px] aspect-[3/2] relative overflow-hidden cursor-grab active:cursor-grabbing select-none touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          role="img"
          aria-label={`${nombreModelo} ${color.label} · vista 360, ángulo ${angulo} de ${totalAngulos}`}
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
        <span className="max-desktop:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-[#888] pointer-events-none">
          <DragIcon />
          Arrastra para girar
        </span>
        <button
          onClick={() => rotar(-1)}
          aria-label="Ángulo anterior"
          className="max-desktop:hidden absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-toyota-red hover:bg-toyota-red-dark border-none text-white text-[22px] cursor-pointer flex items-center justify-center shadow-[0_4px_12px_rgba(235,10,30,0.3)]"
        >
          ‹
        </button>
        <button
          onClick={() => rotar(1)}
          aria-label="Ángulo siguiente"
          className="max-desktop:hidden absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-toyota-red hover:bg-toyota-red-dark border-none text-white text-[22px] cursor-pointer flex items-center justify-center shadow-[0_4px_12px_rgba(235,10,30,0.3)]"
        >
          ›
        </button>
      </div>

      {/* Mobile: solo instrucción — la interacción real es arrastrar la imagen */}
      <div className="desktop:hidden flex items-center justify-center gap-2 py-3 border-t border-[#EBEBEB] bg-white">
        <DragIcon size={18} />
        <span className="text-sm font-semibold text-[#555]">Desliza para girar</span>
      </div>

      {/* Panel de colores */}
      <div className="w-[260px] max-desktop:w-full flex-shrink-0 border-l max-desktop:border-l-0 max-desktop:border-t border-[#EBEBEB] bg-white px-7 py-8 max-desktop:px-4 max-desktop:py-5">
        <h3 className="text-base font-semibold text-foreground mb-6 max-desktop:mb-4 tracking-tight">
          Colores disponibles
        </h3>
        <div>
          <div
            ref={coloresScrollRef}
            onScroll={onColoresScroll}
            className="flex flex-col max-desktop:flex-row max-desktop:overflow-x-auto no-scrollbar gap-1 max-desktop:gap-2 max-desktop:pb-2"
          >
            {colores.map((c) => {
              const isActive = c.id === activeColor
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveColor(c.id)}
                  className="flex items-center gap-3.5 px-3 py-2.5 border-none cursor-pointer w-full max-desktop:w-auto max-desktop:flex-shrink-0 text-left rounded transition-transform hover:bg-[#F4F4F4]"
                  style={{ background: isActive ? '#F8F8F8' : 'var(--background)' }}
                >
                  <span
                    className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: c.hex,
                      border: `1.5px solid ${
                        isActive ? 'var(--toyota-red)' : c.needsBorder ? '#C5C5C5' : 'rgba(0,0,0,0.1)'
                      }`,
                    }}
                  >
                    {isActive && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2.5 7.5L5.5 10.5L11.5 4"
                          stroke="var(--background)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span
                    className="text-sm text-[#333] max-desktop:whitespace-nowrap"
                    style={{ fontWeight: isActive ? 700 : 400 }}
                  >
                    {c.label}
                  </span>
                </button>
              )
            })}
          </div>
          <div className="hidden max-desktop:block h-[3px] bg-[#DDD] rounded-full overflow-hidden relative mt-1">
            <div
              className="absolute top-0 h-full bg-foreground rounded-full transition-all duration-150"
              style={{ left: `${coloresProgress.left}%`, width: `${coloresProgress.width}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
