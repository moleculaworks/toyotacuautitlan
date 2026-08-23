'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export interface VersionSanity {
  nombre: string
  precio: number
  caracteristicas: string[]
  imagen?: { asset?: { url: string; metadata?: { lqip?: string } } }
}

const CARDS_VISIBLE = 4
const MOBILE_CARD_WIDTH = 264
const MOBILE_GAP = 8

export default function VersionesCarousel({
  versiones,
  nombreModelo,
}: {
  versiones: VersionSanity[]
  nombreModelo: string
}) {
  const [index, setIndex] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(0)
  const [mobileAtEnd, setMobileAtEnd] = useState(false)
  const mobileScrollRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const [pitch, setPitch] = useState(0)

  // Distancia real en px entre el inicio de una tarjeta y la siguiente
  // (ancho + gap ya renderizados) — evita el desfase que da calcular el
  // desplazamiento por porcentaje cuando el ancho de las tarjetas viene
  // de un cálculo CSS (calc(25% - Npx)).
  useEffect(() => {
    function medir() {
      const row = rowRef.current
      if (!row || row.children.length < 2) return
      const primera = row.children[0] as HTMLElement
      const segunda = row.children[1] as HTMLElement
      setPitch(segunda.offsetLeft - primera.offsetLeft)
    }
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [versiones.length])

  function onMobileScroll() {
    const el = mobileScrollRef.current
    if (!el) return
    const step = MOBILE_CARD_WIDTH + MOBILE_GAP
    setMobileIndex(Math.round(el.scrollLeft / step))
    setMobileAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }

  function goToMobileCard(d: number) {
    const step = MOBILE_CARD_WIDTH + MOBILE_GAP
    mobileScrollRef.current?.scrollTo({ left: d * step, behavior: 'smooth' })
  }

  const TOTAL_CARDS = versiones.length
  const MAX_INDEX = Math.max(0, TOTAL_CARDS - CARDS_VISIBLE)
  const dotLabels = Array.from({ length: MAX_INDEX + 1 }, (_, d) => `${d + 1}–${d + CARDS_VISIBLE}`)

  const canPrev = index > 0
  const canNext = index < MAX_INDEX
  const offset = -(index * (100 / CARDS_VISIBLE))
  const transform = pitch ? `translateX(${-(index * pitch)}px)` : `translateX(${offset}%)`

  return (
    <div>
      {/* Desktop: carrusel con flechas */}
      <div className="relative hidden desktop:block">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={!canPrev}
          aria-label="Versiones anteriores"
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border-none text-2xl flex items-center justify-center transition-all cursor-pointer disabled:cursor-default hover:opacity-85"
          style={{
            background: canPrev ? 'var(--toyota-red)' : '#F0F0F0',
            color: canPrev ? 'var(--background)' : '#CCC',
            boxShadow: canPrev ? '0 4px 12px rgba(235,10,30,0.25)' : 'none',
          }}
        >
          ‹
        </button>
        <button
          onClick={() => setIndex((i) => Math.min(MAX_INDEX, i + 1))}
          disabled={!canNext}
          aria-label="Versiones siguientes"
          className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border-none text-2xl flex items-center justify-center transition-all cursor-pointer disabled:cursor-default hover:opacity-85"
          style={{
            background: canNext ? 'var(--toyota-red)' : '#F0F0F0',
            color: canNext ? 'var(--background)' : '#CCC',
            boxShadow: canNext ? '0 4px 12px rgba(235,10,30,0.25)' : 'none',
          }}
        >
          ›
        </button>

        <div className="overflow-hidden">
          <div
            ref={rowRef}
            className="flex gap-2"
            style={{
              transform,
              transition: 'transform .35s cubic-bezier(.4,0,.2,1)',
            }}
          >
            {versiones.map((v) => (
              <VersionCard key={v.nombre} version={v} nombreModelo={nombreModelo} />
            ))}
          </div>
        </div>

        {/* Dots + contador */}
        <div className="flex justify-center items-center gap-2 mt-5">
          <div className="flex items-center gap-1.5">
            {dotLabels.map((_, d) => (
              <button
                key={d}
                onClick={() => setIndex(d)}
                aria-label={`Ir a posición ${d + 1}`}
                className="h-2 rounded border-none cursor-pointer p-0"
                style={{
                  width: index === d ? 28 : 8,
                  borderRadius: 4,
                  background: index === d ? 'var(--toyota-red)' : '#CCC',
                  transition: 'all .25s linear',
                }}
              />
            ))}
          </div>
          <span className="text-xs text-[#222] ml-2">
            {dotLabels[index]} de {TOTAL_CARDS} versiones
          </span>
        </div>
      </div>

      {/* Mobile: scroll horizontal nativo con snap */}
      <div className="hidden max-desktop:block relative">
        <div
          ref={mobileScrollRef}
          onScroll={onMobileScroll}
          className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory"
        >
          {versiones.map((v) => (
            <div key={v.nombre} className="w-[264px] min-w-[264px] max-w-[264px] flex-shrink-0 snap-start">
              <VersionCard version={v} mobile nombreModelo={nombreModelo} />
            </div>
          ))}
        </div>
        {!mobileAtEnd && (
          <div className="absolute top-0 right-0 bottom-2 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        )}
        {TOTAL_CARDS > 1 && (
          <div className="flex items-center gap-4 mt-4">
            <div className="flex-1 h-[3px] bg-[#DDD] rounded-full overflow-hidden">
              <div
                className="h-full bg-foreground rounded-full transition-all duration-300"
                style={{ width: `${((mobileIndex + 1) / TOTAL_CARDS) * 100}%` }}
              />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => goToMobileCard(Math.max(0, mobileIndex - 1))}
                disabled={mobileIndex === 0}
                aria-label="Versión anterior"
                className="w-11 h-11 rounded-full border-none text-xl flex items-center justify-center cursor-pointer disabled:cursor-default transition-all"
                style={{
                  background: mobileIndex > 0 ? 'var(--toyota-red)' : '#F0F0F0',
                  color: mobileIndex > 0 ? 'var(--background)' : '#CCC',
                }}
              >
                ‹
              </button>
              <button
                onClick={() => goToMobileCard(Math.min(TOTAL_CARDS - 1, mobileIndex + 1))}
                disabled={mobileIndex >= TOTAL_CARDS - 1}
                aria-label="Versión siguiente"
                className="w-11 h-11 rounded-full border-none text-xl flex items-center justify-center cursor-pointer disabled:cursor-default transition-all"
                style={{
                  background: mobileIndex < TOTAL_CARDS - 1 ? 'var(--toyota-red)' : '#F0F0F0',
                  color: mobileIndex < TOTAL_CARDS - 1 ? 'var(--background)' : '#CCC',
                }}
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function VersionCard({
  version,
  mobile,
  nombreModelo,
}: {
  version: VersionSanity
  mobile?: boolean
  nombreModelo: string
}) {
  return (
    <div
      className={`border-[1.5px] border-[#E0E0E0] bg-white flex flex-col ${mobile ? 'h-full' : ''}`}
      style={
        mobile
          ? undefined
          : {
              minWidth: 'calc(25% - 6px)',
              flex: '0 0 calc(25% - 6px)',
            }
      }
    >
      <div className="aspect-video bg-white overflow-hidden flex items-center justify-center relative">
        {version.imagen?.asset?.url && (
          <Image
            src={version.imagen.asset.url}
            alt={`${nombreModelo} ${version.nombre}`}
            fill
            className="object-contain"
            sizes="(max-width: 880px) 264px, 25vw"
          />
        )}
      </div>
      <div className="bg-[#F7F7F7] px-[22px] pt-[22px] pb-[18px] border-b border-[#E8E8E8]">
        <h3 className="text-2xl font-semibold text-foreground tracking-tight leading-[1.1]">
          {version.nombre}
        </h3>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-[22px] font-semibold text-toyota-red tracking-tight">
            ${version.precio.toLocaleString('es-MX')}
          </span>
          <span className="text-xs font-semibold text-toyota-red opacity-70">MXN</span>
        </div>
      </div>
      <div className="px-[22px] py-5 flex-1">
        {version.caracteristicas.map((c) => (
          <div key={c} className="py-2 border-b border-[#F2F2F2] text-[13px] text-[#222]">
            {c}
          </div>
        ))}
      </div>
    </div>
  )
}
