// ÍCONO DE RESPALDO. Se muestra solo cuando un elemento no tiene ícono elegido en el Studio
// (ej. un beneficio nuevo cuyo ícono todavía no se dibuja). Los íconos de marca viven en
// HighlightIcon.tsx (trazo 1.0, render 36px, rojo de marca).
export default function IconoGenerico({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--toyota-red)"
      strokeWidth={1.0}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
