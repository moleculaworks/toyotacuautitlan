'use client'

import { useState } from 'react'
import Link from 'next/link'

// "Servicio" es un grupo del menú SIN página propia (10 nov 2026): despliega sus páginas.
// Mismo patrón y mismas medidas que el acordeón de Modelos (fila de 16 px semibold con flecha,
// sub-filas con sangría de 8 px). Las opciones salen de SERVICIO_LINKS (Navbar.tsx).
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`flex-shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}
    >
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ServicioMobileAccordion({
  links,
  onNavigate,
}: {
  links: { label: string; href: string }[]
  onNavigate: () => void
}) {
  const [abierto, setAbierto] = useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        className={`w-full flex items-center justify-between py-4 border-b border-[#F0F0F0] text-base font-semibold transition-colors ${
          abierto ? 'text-toyota-red' : 'text-foreground'
        }`}
      >
        Postventa
        <Chevron open={abierto} />
      </button>

      {abierto && (
        <div className="pl-2 flex flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className="w-full flex items-center justify-between py-4 border-b border-[#F0F0F0] text-base font-semibold text-foreground hover:text-toyota-red transition-colors"
            >
              {link.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0" aria-hidden="true">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
