import Link from 'next/link'
import type { ReactNode } from 'react'

// Botón compartido de todo el sitio. Los 5 `variant` de abajo son los
// tratamientos de color/hover reales ya usados en las páginas de modelo
// (ver SISTEMA-DE-DISENO.md, sección 5) — no inventar un sexto sin
// documentarlo ahí primero. El componente NO impone tamaño de texto ni
// padding (ver prop `className`): esos varían por contexto (tarjeta vs.
// CTA de sección vs. botón con ícono) y hoy no están 100% homologados
// entre sí — ver "Pendientes" en SISTEMA-DE-DISENO.md.

export type ButtonVariant = 'primary' | 'secondary' | 'outline-hero' | 'invert-red' | 'invert-black'

const variantClasses: Record<ButtonVariant, string> = {
  // Acción principal — ej. "Cotízalo", "Descargar Ficha Técnica". Relleno rojo de marca.
  primary: 'bg-toyota-red text-white hover:bg-toyota-red-dark',
  // Acción secundaria emparejada con un primario — ej. "Manéjalo". Contorno negro, invierte a relleno negro.
  secondary: 'border-[1.5px] border-foreground text-foreground hover:bg-foreground hover:text-white',
  // CTA aislado sobre fondo claro — ej. "Ver versiones y precios" en el Hero. Contorno negro, invierte a rojo.
  'outline-hero': 'border-2 border-foreground text-foreground hover:bg-toyota-red hover:border-toyota-red hover:text-white',
  // Botón blanco sobre fondo rojo de marca (ej. sección CTA intermedia). Invierte a negro.
  'invert-red': 'bg-white text-toyota-red hover:bg-foreground hover:text-white',
  // Botón blanco sobre fondo negro (ej. sección CTA final). Invierte a gris claro.
  'invert-black': 'bg-white text-black hover:bg-[#EBEBEB]',
}

type ButtonProps = {
  variant: ButtonVariant
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  children: ReactNode
  // Renderiza <Link>/<a> cuando se pasa `href`, <button> en caso contrario
  // (ej. submit de un formulario) — un solo Button, no dos componentes.
  href?: string
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function Button(props: ButtonProps) {
  const { variant, icon, iconPosition = 'right', className = '', children } = props

  // El gap entre ícono y texto no se fija aquí a propósito (evita pisar la
  // clase de `className` en el CSS compilado, donde dos utilidades `gap-*`
  // pueden chocar según el orden de generación, no el orden en el JSX) —
  // si `icon` está presente, pasar la clase `gap-*` correspondiente en
  // `className`.
  const classes = [
    'inline-flex items-center justify-center font-semibold no-underline transition-colors',
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  )

  if (props.href) {
    if (props.external) {
      return (
        <a href={props.href} className={classes} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      )
    }
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {content}
    </button>
  )
}
