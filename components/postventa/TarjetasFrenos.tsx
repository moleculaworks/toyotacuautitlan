import NotasServicio from './NotasServicio'
import { formatoPrecio } from './formato'

export type TablaFrenosData = {
  _key: string
  titulo?: string
  detalle?: string
  tarjetas?: { _key: string; modelos?: string; detalle?: string; anchoDoble?: boolean; cuatroRuedas?: number; delanteras?: number; traseras?: number }[]
  notas?: string[]
}

// Frenos: una tarjeta por modelo o grupo de modelos, con los tres precios (4 ruedas, delanteras,
// traseras). Mismo borde y relleno que las tarjetas de Financiamiento y de "Modelos similares".
// La cifra va en rojo, 18 px semibold (16 px en móvil, donde las tarjetas van en 2 columnas). Los precios quedan
// alineados abajo aunque los títulos tengan distinto largo. Una tarjeta con `anchoDoble` ocupa dos
// columnas (para un grupo largo de modelos). El nombre del modelo es opcional (sin
// él no se dibuja título ni línea roja). `enColumna`: la tabla vive dentro de una columna de
// modelo (bloque de columnas), así que va en una sola columna de tarjetas.
export default function TarjetasFrenos({
  tabla,
  enColumna = false,
  nivelBajo = enColumna,
  reservarDetalle = false,
  sinNotas = false,
}: {
  tabla: TablaFrenosData
  enColumna?: boolean
  // true cuando arriba ya hay un h3 (nombre del modelo): los títulos bajan un nivel
  nivelBajo?: boolean
  // true cuando la tabla vecina (en una fila) tiene línea de detalle y esta no
  reservarDetalle?: boolean
  sinNotas?: boolean
}) {
  // Niveles de título: bloque h2; columna h3 (si hay); título de tabla h3 o h4; tarjeta un nivel más abajo.
  const TituloTabla = nivelBajo ? 'h4' : 'h3'
  const Titulo = tabla.titulo ? (nivelBajo ? 'h5' : 'h4') : nivelBajo ? 'h4' : 'h3'
  return (
    <div className="mt-6 first:mt-5">
      {tabla.titulo && (
        <TituloTabla className="text-lg font-semibold text-foreground tracking-tight">{tabla.titulo}</TituloTabla>
      )}
      {/* En una fila de modelo se reserva el renglón del detalle aunque esté vacío, para que quede a
          la misma altura que la tabla de kilometrado de al lado. */}
      {(tabla.detalle || (reservarDetalle && tabla.titulo)) && (
        <p className="text-sm text-[#555] mt-1 min-h-[1.25rem]">{tabla.detalle || '\u00A0'}</p>
      )}

      <div
        className={`${tabla.titulo || tabla.detalle ? 'mt-4' : ''} grid ${
          enColumna ? 'grid-cols-1' : 'grid-cols-2 desktop:grid-cols-3 xl:grid-cols-4'
        } gap-4 max-sm:gap-3`}
      >
        {(tabla.tarjetas ?? []).map((t) => (
          <div
            key={t._key}
            className={`bg-white border border-[#E8E8E8] px-5 pb-2 max-sm:px-3 flex flex-col ${
              // Con nombre de modelo hay título arriba; sin nombre (filas de modelo) no se deja hueco
              t.modelos ? 'pt-5 max-sm:pt-4' : 'pt-0'
            } ${t.anchoDoble && !enColumna ? 'col-span-2' : ''}`}
          >
            {t.modelos && (
              <>
                <Titulo className="text-lg max-sm:text-base font-semibold text-foreground tracking-tight leading-[1.25]">{t.modelos}</Titulo>
                {t.detalle && <p className="text-sm text-[#555] mt-1">{t.detalle}</p>}
                <div className="w-7 h-[2px] bg-toyota-red mt-3" />
              </>
            )}
            <dl className={`mt-auto ${t.modelos ? 'pt-2' : 'pt-0'}`}>
              {[
                ['4 ruedas', t.cuatroRuedas],
                ['Delanteras', t.delanteras],
                ['Traseras', t.traseras],
              ].map(([etiqueta, valor]) => (
                <div
                  key={etiqueta as string}
                  className="flex items-baseline justify-between gap-4 max-sm:gap-2 py-2 border-b border-[#E8E8E8] last:border-b-0"
                >
                  <dt className="text-base max-sm:text-sm text-[#1a1a1a]">{etiqueta as string}</dt>
                  <dd className="text-lg max-sm:text-base font-semibold text-toyota-red tracking-[-.02em] leading-none">
                    {formatoPrecio(valor as number)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {!sinNotas && <NotasServicio notas={tabla.notas} />}
    </div>
  )
}
