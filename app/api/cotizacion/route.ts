import { NextResponse } from 'next/server'
import { cotizacionSchema } from '@/lib/validations/cotizacion'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = cotizacionSchema.parse(body)

    // TODO: Enviar a CRM(s) y/o email
    // await enviarAZeenvia(data)
    // await enviarEmail(data)

    console.log('[Cotización recibida]', data)

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }
}
