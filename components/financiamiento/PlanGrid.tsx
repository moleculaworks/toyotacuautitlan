'use client'

import { useEffect, useRef, useState } from 'react'
import PlanCard, { type PlanCardData } from './PlanCard'

// Cuadrícula de tarjetas de plan. Cerradas, las tarjetas de una fila se igualan en altura
// (comportamiento normal de la cuadrícula). Al abrir una, la vecina NO debe estirarse con
// ella: su botón "Ver detalles" se iría al fondo y cambiaría de lugar. Por eso, justo antes
// de abrir la primera, se miden las alturas cerradas del cuerpo de cada tarjeta (todo menos el
// panel de detalles), se fijan como altura mínima y la cuadrícula pasa a `items-start`; así
// ningún botón cambia de lugar, ni el de la tarjeta que se abre ni el de su vecina. Al cerrar
// todas se libera y vuelven a igualarse solas.
export default function PlanGrid({ planes }: { planes: PlanCardData[] }) {
  const [abiertas, setAbiertas] = useState<Set<number>>(new Set())
  const [alturas, setAlturas] = useState<number[] | null>(null)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  // Si cambia el ancho de la ventana, las alturas fijadas dejan de valer: se liberan.
  useEffect(() => {
    const liberar = () => setAlturas(null)
    window.addEventListener('resize', liberar)
    return () => window.removeEventListener('resize', liberar)
  }, [])

  function alternar(i: number) {
    const siguiente = new Set(abiertas)
    if (siguiente.has(i)) {
      siguiente.delete(i)
    } else {
      // Primera en abrirse: fijar las alturas de ahora (todas cerradas) antes de que crezca.
      if (siguiente.size === 0) setAlturas(refs.current.map((el) => el?.offsetHeight ?? 0))
      siguiente.add(i)
    }
    if (siguiente.size === 0) setAlturas(null)
    setAbiertas(siguiente)
  }

  return (
    <div className={`mt-9 grid grid-cols-2 max-desktop:grid-cols-1 gap-6 ${alturas ? 'items-start' : ''}`}>
      {planes.map((plan, i) => (
        <PlanCard
          key={plan.titulo}
          plan={plan}
          abierto={abiertas.has(i)}
          onToggle={() => alternar(i)}
          minHeight={alturas?.[i]}
          cuerpoRef={(el) => {
            refs.current[i] = el
          }}
        />
      ))}
    </div>
  )
}
