import type { ReactNode } from 'react'

// Set de íconos de línea para la barra de datos destacados (debajo del Hero,
// en cada página de modelo). Vive en código — no se sube como imagen por
// modelo — para garantizar el mismo trazo, grosor y color en los 20 modelos.
// Para agregar un concepto nuevo: dibujar el SVG aquí y agregar su `value` a
// la lista de opciones del campo `caracteristicas.icono` en
// sanity/schemaTypes/modeloType.ts.

const commonProps = {
  width: 36,
  height: 36,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'var(--toyota-red)',
  strokeWidth: 1.0,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const icons: Record<string, ReactNode> = {
  motor: (
    <svg {...commonProps}>
      <rect x="7.53" y="5.11" width="8.25" height="1.41" rx="0.7" />
      <path d="M10.28 6.52v1.7M13.03 6.52v1.7" />
      <path d="M8.13 8.22h6.72q.6 0 .6.6v.82q0 .6.6.6h1.23q.6 0 .6.6v7.45q0 .6-.6.6H9.55l-2.18-2.19H5.71q-.6 0-.6-.6v-5.91q0-.6.6-.6h1.22q.6 0 .6-.6v-.17q0-.6.6-.6Z" />
      <rect x="2" y="9.51" width="1.37" height="7.07" rx="0.69" />
      <path d="M3.37 12.02h1.74M3.37 14.08h1.74" />
      <rect x="19.25" y="11.78" width="2.75" height="6.22" rx="0.97" />
      <path d="M17.88 12.99h1.37M17.88 16.38h1.37" />
    </svg>
  ),
  pasajeros: (
    <svg {...commonProps}>
      <circle cx="8" cy="9" r="2.3" />
      <path d="M3.3 19c0-3 2.1-5 4.7-5s4.7 2 4.7 5" />
      <circle cx="16.5" cy="10" r="2" />
      <path d="M12.6 19c0-2.6 1.7-4.3 3.9-4.3s3.9 1.7 3.9 4.3" />
    </svg>
  ),
  traccion: (
    <svg {...commonProps}>
      <rect x="4.93" y="2" width="2.49" height="5.07" rx="0.9" />
      <rect x="16.58" y="2" width="2.49" height="5.07" rx="0.9" />
      <rect x="4.93" y="16.93" width="2.49" height="5.07" rx="0.9" />
      <rect x="16.58" y="16.93" width="2.49" height="5.07" rx="0.9" />
      <path d="M7.42 4.58H9.5M14.48 4.58h2.1" />
      <path d="M10.3 3.44H13.68Q14.48 3.44 14.48 4.24V5.2Q14.48 5.72 13.76 5.72Q13.24 5.72 13.24 6.24V7.84Q13.24 8.64 12.44 8.64H11.54Q10.74 8.64 10.74 7.84V6.24Q10.74 5.72 10.22 5.72Q9.5 5.72 9.5 5.2V4.24Q9.5 3.44 10.3 3.44Z" />
      <path d="M12 8.64v10.95M7.42 19.59h9.16" />
    </svg>
  ),
  tecnologia: (
    <svg {...commonProps}>
      <rect x="3.2" y="7.77" width="17.6" height="8.43" rx="2.6" />
      <path d="M4.69 8.95v6.22M4.69 8.95 6.91 9.69M4.69 15.17l2.22-.74" />
      <path d="M12.83 9.69H6.91Q6.3 12.06 6.91 14.43h5.92Z" />
      <path d="M12.83 9.69 15.49 8.8 15.64 15.32 12.83 14.43" />
      <path d="M19.1 8.9q.6.7.3 1.4M19.4 13.7q.3.7-.3 1.4" />
      <path d="M7.4 8.9q.3-.7 1-1M7.4 15.1q.3.7 1 1" />
      <path d="M9.72 5.26Q13 3.18 16.24 5.26M8.68 3.93Q13 .77 17.27 3.93" />
      <path d="M9.72 18.72Q13 20.8 16.24 18.72M8.68 20.05Q13 23.1 17.27 20.05" />
    </svg>
  ),
  'capacidad-carga': (
    <svg {...commonProps}>
      <circle cx="12" cy="5.38" r="2.43" />
      <path d="M6.3 7.73H17.7Q18.44 7.73 18.62 8.45L21.8 20.1Q22 21.05 21.1 21.05H2.9Q2 21.05 2.2 20.1L5.38 8.45Q5.56 7.73 6.3 7.73Z" />
      <path d="M8.1 12.2v5.35M10.8 12.2 8.3 15.1l2.8 2.45" />
      <path d="M15.7 13.3Q15.2 12.2 13.9 12.2Q12.1 12.2 12.1 14.2v1.4Q12.1 17.55 13.95 17.55Q15.8 17.55 15.8 15.6V15.1H14.1" />
    </svg>
  ),
  potencia: (
    <svg {...commonProps}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
  transmision: (
    <svg {...commonProps}>
      <path d="M10.55 2.81 13.45 2.81 13.73 4.8 15.87 5.69 17.47 4.48 19.52 6.53 18.31 8.13 19.2 10.27 21.19 10.55 21.19 13.45 19.2 13.73 18.31 15.87 19.52 17.47 17.47 19.52 15.87 18.31 13.73 19.2 13.45 21.19 10.55 21.19 10.27 19.2 8.13 18.31 6.53 19.52 4.48 17.47 5.69 15.87 4.8 13.73 2.81 13.45 2.81 10.55 4.8 10.27 5.69 8.13 4.48 6.53 6.53 4.48 8.13 5.69 10.27 4.8Z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  maletero: (
    <svg {...commonProps}>
      <path d="M6 7.6C5.6 6.3 5.3 5.3 4.3 5.3H3.4C2.6 5.3 2.6 3.9 3.4 3.8Q12 2.2 20.6 3.8C21.4 3.9 21.4 5.3 20.6 5.3H19.7C18.7 5.3 18.4 6.3 18 7.6Z" />
      <path d="M7.2 7.6v1.3M16.8 7.6v1.3" />
      <path d="M5.6 8.9h12.8l2.7 3.7q.6.7.6 1.6V19a2 2 0 0 1-2 2H4.3a2 2 0 0 1-2-2v-4.8q0-.9.6-1.6Z" />
      <path d="M6.7 8.9 4.9 12.6v3.9a1.4 1.4 0 0 0 1.4 1.4h11.4a1.4 1.4 0 0 0 1.4-1.4v-3.9l-1.8-3.7" />
      <path d="M2.3 13.3h2.6M2.3 15.9h2.6M19.1 13.3h2.6M19.1 15.9h2.6" />
    </svg>
  ),
  'modos-manejo': (
    <svg {...commonProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="M4.48 10A7.78 7.78 0 0 1 19.52 10H16.9Q16.5 10 16.2 9.65L15.5 8.95Q15.25 8.69 14.85 8.69H9.15Q8.75 8.69 8.5 8.95L7.8 9.65Q7.5 10 7.1 10Z" />
      <circle cx="12" cy="12.67" r="1.81" />
      <path d="M4.29 13.04A7.78 7.78 0 0 0 10.5 19.62Q10.12 14.06 4.29 13.04Z" />
      <path d="M19.71 13.04A7.78 7.78 0 0 1 13.5 19.62Q13.88 14.06 19.71 13.04Z" />
    </svg>
  ),
  seguridad: (
    <svg {...commonProps}>
      <path d="M12 2 20.82 5.6V11C20.82 16.5 16.5 20.5 12 22 7.5 20.5 3.18 16.5 3.18 11V5.6Z" />
      <path d="M7.68 11.9 10.97 14.6 16 9.65" />
    </svg>
  ),
}

export default function HighlightIcon({ nombre }: { nombre?: string }) {
  if (!nombre || !icons[nombre]) return null
  return icons[nombre]
}
