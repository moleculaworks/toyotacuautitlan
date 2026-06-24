import type { Metadata } from 'next'
import CitaForm from '@/components/forms/CitaForm'

export const metadata: Metadata = {
  title: 'Cita de Servicio',
  description: 'Agenda tu cita de servicio en Toyota Cuautitlán. Mantenimiento, garantía, revisión y más.',
}

export default function CitaPage() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Agenda tu cita de servicio</h1>
          <p className="mt-2 text-gray-500">
            Servicio certificado Toyota. Te confirmaremos tu cita por teléfono.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-8">
          <CitaForm />
        </div>

        <div className="mt-6 bg-white rounded-lg border border-gray-100 p-4">
          <h2 className="text-sm font-semibold text-[#1A1A1A] mb-3">Nuestro taller ofrece:</h2>
          <ul className="grid grid-cols-2 gap-2">
            {[
              'Mantenimiento preventivo',
              'Afinaciones',
              'Servicio de garantía',
              'Diagnóstico computarizado',
              'Hojalatería y pintura',
              'Asistencia 24/7 en ruta',
            ].map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EB0A1E] flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
