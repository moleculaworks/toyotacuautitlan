'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export interface GaleriaImagen {
  src: string
  lqip?: string
}

type Tab = 'exterior' | 'interior'

export default function Galeria({
  exterior,
  interior,
  nombreModelo,
}: {
  exterior: GaleriaImagen[]
  interior: GaleriaImagen[]
  nombreModelo: string
}) {
  const tieneInterior = interior.length > 0
  const [tab, setTab] = useState<Tab>('exterior')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const items = tab === 'exterior' || !tieneInterior ? exterior : interior
  const total = items.length
  const tabLabel = tab === 'exterior' ? 'Exterior' : 'Interior'

  const navLightbox = useCallback(
    (dir: number) => setLightboxIndex((i) => (i + dir + total) % total),
    [total]
  )

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft') navLightbox(-1)
      if (e.key === 'ArrowRight') navLightbox(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lightboxOpen, navLightbox])

  function switchTab(next: Tab) {
    setTab(next)
    setLightboxOpen(false)
  }

  return (
    <div>
      {/* Tabs — solo si hay imágenes de interior; si no, Exterior es la única opción */}
      {tieneInterior && (
        <div className="flex mb-7 border-[1.5px] border-foreground w-fit">
          <button
            onClick={() => switchTab('exterior')}
            className="px-8 py-3 text-sm font-semibold border-none cursor-pointer tracking-[.3px] transition-all hover:opacity-85"
            style={{
              background: tab === 'exterior' ? 'var(--foreground)' : 'var(--background)',
              color: tab === 'exterior' ? 'var(--background)' : '#555',
            }}
          >
            Exterior
          </button>
          <button
            onClick={() => switchTab('interior')}
            className="px-8 py-3 text-sm font-semibold border-none cursor-pointer tracking-[.3px] transition-all hover:opacity-85 border-l-[1.5px] border-l-foreground"
            style={{
              background: tab === 'interior' ? 'var(--foreground)' : 'var(--background)',
              color: tab === 'interior' ? 'var(--background)' : '#555',
              borderLeft: '1.5px solid #111',
            }}
          >
            Interior
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-3 max-desktop:grid-cols-2 gap-2.5">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              setLightboxIndex(idx)
              setLightboxOpen(true)
            }}
            className="group aspect-[3/2] relative overflow-hidden cursor-pointer border-none p-0 bg-[#F0F0F0]"
            aria-label={`Ampliar: ${nombreModelo} ${tabLabel} ${idx + 1}`}
          >
            <Image
              src={item.src}
              alt={`${nombreModelo} ${tabLabel} ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 880px) 50vw, 33vw"
            />
            <span className="absolute inset-0 bg-black/[.32] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 3H21V9M21 3L13 11M9 21H3V15M3 21L11 13"
                  stroke="var(--background)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.93)', animation: 'lbIn .2s ease' }}
          role="dialog"
          aria-modal="true"
          aria-label={`${nombreModelo} ${tabLabel} ${lightboxIndex + 1}`}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Cerrar galería"
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/[.22] border-none text-white text-[22px] w-12 h-12 cursor-pointer flex items-center justify-center rounded-full"
          >
            ✕
          </button>

          <button
            onClick={() => navLightbox(-1)}
            aria-label="Imagen anterior"
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/[.22] border-none text-white text-3xl w-[52px] h-[52px] cursor-pointer flex items-center justify-center rounded-full z-10"
          >
            ‹
          </button>

          <div className="max-w-[820px] w-[88vw]" style={{ animation: 'lbIn .25s ease' }}>
            <div className="w-full aspect-[3/2] relative">
              <Image
                src={items[lightboxIndex].src}
                alt={`${nombreModelo} ${tabLabel} ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="88vw"
              />
            </div>
          </div>

          <button
            onClick={() => navLightbox(1)}
            aria-label="Imagen siguiente"
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/[.22] border-none text-white text-3xl w-[52px] h-[52px] cursor-pointer flex items-center justify-center rounded-full z-10"
          >
            ›
          </button>

          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center flex flex-col gap-1.5 items-center pointer-events-none">
            <span className="text-white/50 text-xs">
              {lightboxIndex + 1} / {total}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
