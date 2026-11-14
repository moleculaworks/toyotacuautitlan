import Button from '@/components/ui/Button'
import HighlightIcon from '@/components/ui/HighlightIcon'
import { formatoTelefono } from '@/lib/contacto'

// Botón de contacto (13 nov 2026): el ícono (teléfono o WhatsApp) y el número SON el botón, de contorno, sin
// verbo ("Llamar", "Escribir por WhatsApp"). Lo usan Refacciones y Contacto, para que el mismo canal se vea y se
// comporte igual en las dos páginas.
// - Teléfono: `tel:` con el número y, si hay extensión, dos comas (cada coma es una pausa de unos 2 s: el teléfono
//   marca el número general, espera a que el conmutador conteste y teclea la extensión). Sin extensión, solo marca el
//   número. Ajustar a 1 o 3 comas tras probar con el conmutador real desde un iPhone y un Android. Los marcadores
//   (000) sirven mientras el sitio no sea público; antes del lanzamiento hay que poner las extensiones reales o
//   dejar el campo vacío, porque se teclearían en el conmutador de la agencia.
// - WhatsApp: `wa.me` con la lada 52, en pestaña nueva.
// - Contorno porque el ícono es rojo y no se vería sobre un botón rojo.
// - El número va a 18 a 20 px, un poco arriba del texto de la descripción (probados 16, 32, 23: 16 se veía chico y
//   23 y 32 grandes; excepción a la regla de botones de 14 o 16 px porque aquí el número es el contenido);
//   la extensión va más pequeña y en peso normal para que quepa en pantallas de 360 px.
// - Lectores de pantalla: el texto visible y el ícono se ocultan y se lee una frase completa con el número,
//   la extensión y, si se pasa, el departamento.

const PAUSAS = ',,'

type Props = {
  tipo: 'telefono' | 'whatsapp'
  numero: string // 10 dígitos, sin espacios
  extension?: string
  accion: string // verbo para lectores de pantalla, p. ej. "Llamar" o "Escribir por WhatsApp"
  contexto?: string // p. ej. el departamento: "Ventas"
}

export default function BotonContacto({ tipo, numero, extension, accion, contexto }: Props) {
  const whatsapp = tipo === 'whatsapp'
  const href = whatsapp ? `https://wa.me/52${numero}` : `tel:${numero}${extension ? `${PAUSAS}${extension}` : ''}`
  const formato = formatoTelefono(numero)
  const frase = `${accion} al número ${formato}${extension ? `, extensión ${extension}` : ''}${contexto ? `, de ${contexto}` : ''}`

  return (
    <Button
      href={href}
      external={whatsapp}
      variant="secondary"
      icon={
        <span aria-hidden="true" className="flex">
          <HighlightIcon nombre={tipo} />
        </span>
      }
      iconPosition="left"
      className="w-full gap-3 text-center text-base py-2.5"
    >
      <span aria-hidden="true" className="flex items-baseline gap-2">
        <span className="text-[clamp(18px,1.4vw,20px)] leading-[1.1] tracking-[-.01em]">{formato}</span>
        {extension && <span className="text-base font-normal">Ext. {extension}</span>}
      </span>
      <span className="sr-only">{frase}</span>
    </Button>
  )
}
