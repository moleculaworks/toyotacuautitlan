'use client'

import Image from 'next/image'
import Button from '@/components/ui/Button'
import { useId } from 'react'

const ENLACE_COTIZAR = '#'

export type PlanCardData = {
  titulo: string
  descripcion: string
  detalles: string[]
  imagen: string
  alt: string
}

// Tarjeta de plan de financiamiento o arrendamiento: foto arriba, h3, línea roja
// corta, descripción y "Ver detalles" que despliega las condiciones con viñetas.
// Componente nuevo (no existía uno equivalente); usa solo valores ya existentes
// en las tarjetas de "Modelos similares" (borde #E8E8E8, padding, tamaños de texto).
// El estado abierto/cerrado y la altura mínima los maneja PlanGrid (ver ahí por qué).
export default function PlanCard({
  plan,
  abierto,
  onToggle,
  minHeight,
  cuerpoRef,
}: {
  plan: PlanCardData
  abierto: boolean
  onToggle: () => void
  minHeight?: number
  cuerpoRef?: (el: HTMLDivElement | null) => void
}) {
  const panelId = useId()

  return (
    <div className="bg-white border border-[#E8E8E8] flex flex-col">
      <div className="relative aspect-[3.5/1] bg-toyota-gray overflow-hidden">
        <Image src={plan.imagen} alt={plan.alt} fill className="object-cover" sizes="(max-width: 880px) 100vw, 50vw" />
      </div>

      {/* Cuerpo cerrado (título, texto y botón). Es lo que se estira o se fija en PlanGrid; el
          panel de detalles va fuera, debajo, para que abrirlo no mueva el botón. */}
      <div
        ref={cuerpoRef}
        style={minHeight ? { minHeight } : undefined}
        className="px-6 pt-6 pb-7 flex flex-col flex-1"
      >
        <h3 className="text-[clamp(20px,2.5vw,26px)] font-semibold tracking-[-.02em] text-foreground leading-none">
          {plan.titulo}
        </h3>
        <div className="w-7 h-[2px] bg-toyota-red mt-3.5" />
        <p className="text-[clamp(16px,1.2vw,18px)] text-[#1a1a1a] leading-[1.7] mt-3.5">{plan.descripcion}</p>

        <div className="mt-auto pt-3 flex justify-end">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={abierto}
            aria-controls={panelId}
            className="inline-flex items-center gap-1.5 py-2 text-[15px] font-semibold text-toyota-red hover:underline"
          >
            {abierto ? 'Ocultar' : 'Ver detalles'}
            <svg
              width="13"
              height="13"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className={`transition-transform ${abierto ? 'rotate-180' : ''}`}
            >
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div id={panelId} hidden={!abierto} className="px-6 pb-7 -mt-3">
        <ul className="bg-toyota-gray py-4 pl-9 pr-5 list-disc marker:text-toyota-red flex flex-col gap-2.5">
          {plan.detalles.map((d) => (
            <li key={d} className="text-base text-[#555] leading-[1.6]">
              {d}
            </li>
          ))}
        </ul>
        {/* Cotizar: lleva a un formulario que todavía no existe; hasta entonces href="#", igual que
            los botones "Cotízalo" de las versiones de los modelos. Cambiar ENLACE_COTIZAR cuando exista. */}
        <div className="mt-5">
          <Button href={ENLACE_COTIZAR} variant="primary" className="w-full text-center text-base py-3.5">
            Cotizar ahora
          </Button>
        </div>
      </div>
    </div>
  )
}
