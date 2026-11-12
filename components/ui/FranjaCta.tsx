import Button from '@/components/ui/Button'

// Franja roja de cierre con botón blanco: copia de la CTA intermedia de las páginas de modelo
// (bg-toyota-red, título y apoyo a la izquierda, botón `invert-red` a la derecha; en móvil, centrado
// y apilado). La usan Precios de servicio (a media página y al final) y Planes y Arrendamientos (al final).
export default function FranjaCta({
  id,
  titulo,
  apoyo,
  boton,
  href,
}: {
  id: string
  titulo: string
  apoyo: string
  boton: string
  href: string
}) {
  return (
    <section id={id} className="bg-toyota-red py-[72px] max-desktop:py-12">
      <div className="max-w-7xl mx-auto px-6 max-desktop:px-4 flex max-desktop:flex-col justify-between max-desktop:justify-start items-center gap-7">
        <div className="max-desktop:text-center">
          <h2 className="text-[clamp(24px,3.5vw,40px)] font-semibold text-white tracking-[-.02em] leading-[1.1]">{titulo}</h2>
          <p className="text-[clamp(15px,1.6vw,17px)] text-white mt-2.5">{apoyo}</p>
        </div>
        <Button
          href={href}
          variant="invert-red"
          className="flex-shrink-0 px-11 py-[18px] text-base tracking-[.3px] whitespace-nowrap"
        >
          {boton}
        </Button>
      </div>
    </section>
  )
}
