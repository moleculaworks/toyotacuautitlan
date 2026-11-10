'use client'

import { useId, useState } from 'react'

// Notas y excepciones de una sección de precios. TODAS van detrás de un único desplegable
// "Ver notas y excepciones" (cerrado por defecto), igual en toda la página, para que no ocupen
// altura. El panel abarca el ancho completo del contenido (el componente se coloca fuera de las
// columnas). Reutiliza el patrón de "Ver detalles" de las tarjetas de Financiamiento (botón rojo
// 15 px, panel gris con viñetas rojas); el texto de las notas es de 14 px.
export default function NotasServicio({ notas }: { notas?: string[] | null }) {
  const [abierto, setAbierto] = useState(false)
  const panelId = useId()
  if (!notas || notas.length === 0) return null

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls={panelId}
        className="inline-flex items-center gap-1.5 py-2 text-[15px] font-semibold text-toyota-red hover:underline"
      >
        {abierto ? 'Ocultar notas y excepciones' : 'Ver notas y excepciones'}
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
      <div id={panelId} hidden={!abierto} className="mt-2">
        <ul className="bg-toyota-gray py-4 pl-9 pr-5 list-disc marker:text-toyota-red flex flex-col gap-2.5">
          {notas.map((n, i) => (
            <li key={i} className="text-sm text-[#555] leading-[1.6]">
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
