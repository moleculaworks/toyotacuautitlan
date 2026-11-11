// Indicador de enlace que sale del sitio: flecha hacia arriba y a la derecha. Usa el color del texto (currentColor),
// así cambia con el hover del enlace. Lleva un texto oculto para lectores de pantalla.
export default function IconoExterno({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className={`flex-shrink-0 ${className}`}
      >
        <path d="M5 11L11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </>
  )
}
