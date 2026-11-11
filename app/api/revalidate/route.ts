import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Aviso automático de Sanity: cuando alguien publica un cambio en el Studio,
// Sanity llama a esta ruta y el sitio vuelve a generar sus páginas al momento
// (sin esperar el `revalidate = 60` de app/layout.tsx, que queda como respaldo).
// Solo acepta llamadas firmadas con el secreto compartido con el webhook de Sanity.

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    // Sin secreto configurado la ruta se niega a funcionar: nunca queda abierta.
    return NextResponse.json({ error: 'Secreto no configurado' }, { status: 500 })
  }

  try {
    // Valida la firma y espera a que Sanity termine de propagar el cambio,
    // para que la página regenerada lea el contenido nuevo y no el anterior.
    const { isValidSignature, body } = await parseBody<{ _type?: string; _id?: string }>(req, secret, true)

    if (!isValidSignature) {
      return NextResponse.json({ error: 'Firma inválida' }, { status: 401 })
    }

    // El menú, el pie y los datos de contacto viven en el layout y se usan en todas las
    // páginas, así que se marcan todas para regenerar (cada una lo hace en su próxima visita).
    revalidatePath('/', 'layout')

    return NextResponse.json({ ok: true, tipo: body?._type ?? null, id: body?._id ?? null })
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 })
  }
}
