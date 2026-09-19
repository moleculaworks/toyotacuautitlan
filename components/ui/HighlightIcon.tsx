import type { ReactNode } from 'react'

// Set de íconos de línea para la barra de datos destacados (debajo del Hero,
// en cada página de modelo). Vive en código — no se sube como imagen por
// modelo — para garantizar el mismo trazo, grosor y color en los 20 modelos.
// Para agregar un concepto nuevo: dibujar el SVG aquí y agregar su `value` a
// la lista de opciones del campo `caracteristicas.icono` en
// sanity/schemaTypes/modeloType.ts.

const commonProps = {
  width: 32,
  height: 32,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'var(--toyota-red)',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const icons: Record<string, ReactNode> = {
  motor: (
    <svg {...commonProps}>
      <rect x="2" y="7" width="20" height="10" rx="2" />
      <path d="M6 7V5h4v2" />
      <path d="M14 7V5h4v2" />
      <path d="M2 12h2M20 12h2" />
    </svg>
  ),
  pasajeros: (
    <svg {...commonProps}>
      <circle cx="9" cy="7" r="2.5" />
      <circle cx="15" cy="7" r="2.5" />
      <path d="M4 19c0-3.3 2.2-5.5 5-5.5h6c2.8 0 5 2.2 5 5.5" />
    </svg>
  ),
  traccion: (
    <svg {...commonProps}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </svg>
  ),
  tecnologia: (
    <svg {...commonProps}>
      <path d="M12 3l7 4v5c0 4.4-3 8.5-7 9.5C8 20.5 5 16.4 5 12V7l7-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  'capacidad-carga': (
    <svg {...commonProps}>
      <path d="M3 16V8a1 1 0 0 1 1-1h9l5 5v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <circle cx="7.5" cy="18" r="1.6" />
      <circle cx="16.5" cy="18" r="1.6" />
      <path d="M13 7v5h7" />
    </svg>
  ),
  potencia: (
    <svg {...commonProps}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
  autonomia: (
    <svg {...commonProps}>
      <rect x="2" y="9" width="17" height="9" rx="1.5" />
      <path d="M19 12h2v3h-2" />
      <path d="M7.5 13.5h3l-1.5 3" />
    </svg>
  ),
  remolque: (
    <svg {...commonProps}>
      <circle cx="6" cy="17" r="2.2" />
      <circle cx="16" cy="17" r="2.2" />
      <path d="M8.2 17h5.6" />
      <path d="M14 17V9a2 2 0 0 1 2-2h4v6h-4" />
    </svg>
  ),
  transmision: (
    <svg {...commonProps}>
      <circle cx="12" cy="12" r="6.5" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
    </svg>
  ),
  maletero: (
    <svg {...commonProps}>
      <path d="M3 10h18v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8z" />
      <path d="M3 10V7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3" />
      <path d="M9 14h6" />
    </svg>
  ),
  rendimiento: (
    <svg {...commonProps}>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
      <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
    </svg>
  ),
  'modos-manejo': (
    <svg {...commonProps}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.3" />
      <path d="M12 9.7V6" />
      <path d="M9.7 13.5 6.5 16" />
      <path d="M14.3 13.5l3.2 2.5" />
    </svg>
  ),
  seguridad: (
    <svg {...commonProps}>
      <rect x="4" y="6" width="16" height="13" rx="4" />
      <path d="M8 10v5M12 9v7M16 10v5" />
    </svg>
  ),
}

export default function HighlightIcon({ nombre }: { nombre?: string }) {
  if (!nombre || !icons[nombre]) return null
  return icons[nombre]
}
