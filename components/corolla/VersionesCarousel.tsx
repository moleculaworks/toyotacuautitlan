'use client'

import { useState, useRef } from 'react'
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

  return (
    <div>
      {/* Desktop: carrusel con flechas */}
      <div className="relative hidden min-[881px]:block">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={!canPrev}
          aria-label="Versiones anteriores"
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border-[1.5px] border-[#DDD] text-2xl flex items-center justify-center shadow-md transition-all cursor-pointer disabled:cursor-default"
          style={{
            background: canPrev ? '#fff' : '#F0F0F0',
            color: canPrev ? '#111' : '#CCC',
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
            background: canNext ? '#EB0A1E' : '#F0F0F0',
            color: canNext ? '#fff' : '#CCC',
            boxShadow: canNext ? '0 4px 12px rgba(235,10,30,0.25)' : 'none',
          }}
        >
          ›
        </button>

        <div className="overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(${offset}%)`,
              transition: 'transform .35s cubic-bezier(.4,0,.2,1)',
            }}
          >
            {versiones.map((v, i) => (
              <VersionCard
                key={v.nombre}
                version={v}
                isLast={i === TOTAL_CARDS - 1}
                nombreModelo={nombreModelo}
              />
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
                  background: index === d ? '#EB0A1E' : '#CCC',
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
      <div className="hidden max-[880px]:block relative">
        <div
          ref={mobileScrollRef}
          onScroll={onMobileScroll}
          className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory"
        >
          {versiones.map((v) => (
            <div key={v.nombre} className="w-[264px] min-w-[264px] max-w-[264px] flex-shrink-0 snap-start">
              <VersionCard version={v} isLast mobile nombreModelo={nombreModelo} />
            </div>
          ))}
        </div>
        {!mobileAtEnd && (
          <div className="absolute top-0 right-0 bottom-2 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        )}
        {TOTAL_CARDS > 1 && (
          <div className="flex justify-center items-center gap-1.5 mt-3">
            {versiones.map((_, d) => (
              <button
                key={d}
                onClick={() => goToMobileCard(d)}
                aria-label={`Ir a la versión ${d + 1}`}
                className="h-1.5 rounded-full border-none cursor-pointer p-0 transition-all"
                style={{
                  width: mobileIndex === d ? 18 : 6,
                  background: mobileIndex === d ? '#EB0A1E' : '#CCC',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function VersionCard({
  version,
  isLast,
  mobile,
  nombreModelo,
}: {
  version: VersionSanity
  isLast?: boolean
  mobile?: boolean
  nombreModelo: string
}) {
  return (
    <div
      className="border-[1.5px] border-[#E0E0E0] bg-white flex flex-col h-full"
      style={
        mobile
          ? undefined
          : {
              minWidth: 'calc(25% - 6px)',
              flex: '0 0 calc(25% - 6px)',
              marginRight: isLast ? 0 : 8,
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
        <h3 className="text-2xl font-semibold text-[#111] tracking-tight leading-[1.1]">
          {version.nombre}
        </h3>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-[22px] font-semibold text-[#EB0A1E] tracking-tight">
            ${version.precio.toLocaleString('es-MX')}
          </span>
          <span className="text-xs font-medium text-[#EB0A1E] opacity-70">MXN</span>
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
