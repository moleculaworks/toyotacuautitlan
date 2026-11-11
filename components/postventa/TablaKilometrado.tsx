import NotasServicio from './NotasServicio'
import { formatoPrecio } from './formato'

export type TablaKilometradoData = {
  _key: string
  titulo?: string
  detalle?: string
  encabezadoPrimera?: string
  filas?: { _key: string; intervalo: string; detalle?: string; precio?: number; precioTexto?: string }[]
  notas?: string[]
}

// Tabla "kilometraje a precio". Mismo estilo que la tabla de rendimiento de las páginas de
// modelo (fondo gris, encabezado con línea gruesa, filas con línea fina, cifra grande en
// rojo, tamaño de precio estándar de la sección, igual al de las tarjetas de frenos: 18 px y 16 px en móvil), pero con <table> real para accesibilidad. En móvil el precio mantiene
// su tamaño y el kilometraje se parte en varios renglones, sin desplazamiento lateral.
export default function TablaKilometrado({
  tabla,
  enColumna = false,
  nivelBajo = enColumna,
  reservarDetalle = false,
  sinNotas = false,
}: {
  tabla: TablaKilometradoData
  enColumna?: boolean
  // true cuando arriba ya hay un h3 (nombre del modelo): el título de la tabla baja a h4
  nivelBajo?: boolean
  // true cuando la tabla vecina (en una fila) tiene línea de detalle y esta no: reserva el renglón
  // para que las dos arranquen a la misma altura
  reservarDetalle?: boolean
  sinNotas?: boolean
}) {
  const Titulo = nivelBajo ? 'h4' : 'h3'
  return (
    <div className="mt-6 first:mt-5">
      {tabla.titulo && <Titulo className="text-lg font-semibold text-foreground tracking-tight">{tabla.titulo}</Titulo>}
      {/* En columnas se reserva el renglón del detalle aunque esté vacío, para que las tablas de
          columnas vecinas arranquen a la misma altura. */}
      {(tabla.detalle || (reservarDetalle && tabla.titulo)) && (
        <p className="text-sm text-[#555] mt-1 min-h-[1.25rem]">{tabla.detalle || '\u00A0'}</p>
      )}

      <div className={`${tabla.titulo || tabla.detalle ? 'mt-4' : ''} bg-toyota-gray overflow-hidden`}>
        <table className="w-full text-left border-collapse">
          {/* Encabezado solo para lectores de pantalla: a la vista ya lo dicen el título de la tabla
              ("Servicio kilometrado en miles") y la línea "Precios en M.N., I.V.A. incluido" del bloque. */}
          <thead className="sr-only">
            <tr>
              <th scope="col">{tabla.encabezadoPrimera || 'Kilometraje (en miles)'}</th>
              <th scope="col">Precio (M.N.)</th>
            </tr>
          </thead>
          <tbody>
            {(tabla.filas ?? []).map((f) => (
              <tr key={f._key} className="border-b border-[#E8E8E8] last:border-b-0">
                <td className="px-5 max-desktop:px-4 py-2.5 align-middle border-r border-[#E8E8E8]">
                  <span className="block text-base font-normal text-foreground leading-[1.4]">{f.intervalo}</span>
                  {f.detalle && <span className="block text-sm text-[#555] mt-0.5">{f.detalle}</span>}
                </td>
                <td className="px-5 max-desktop:px-4 py-2.5 align-middle text-right whitespace-nowrap text-lg max-sm:text-base font-semibold text-toyota-red tracking-[-.02em] leading-none">
                  {f.precioTexto || formatoPrecio(f.precio)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!sinNotas && <NotasServicio notas={tabla.notas} />}
    </div>
  )
}
