import { NextResponse } from 'next/server'
import { citaSchema } from '@/lib/validations/cita'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = citaSchema.parse(body)

    // TODO: Enviar a CRM(s) y/o email
    // await enviarAZeenvia(data)
    // await enviarEmail(data)

    console.log('[Cita recibida]', data)

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }
}
