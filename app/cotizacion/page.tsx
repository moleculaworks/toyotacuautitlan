import type { Metadata } from 'next'
import CotizacionForm from '@/components/forms/CotizacionForm'

export const metadata: Metadata = {
  title: 'Cotización',
  description: 'Solicita tu cotización personalizada en Toyota Cuautitlán. Un asesor te contactará en menos de 24 horas.',
}

export default async function CotizacionPage({
  searchParams,
}: {
  searchParams: Promise<{ modelo?: string }>
}) {
  const { modelo } = await searchParams

  const modeloInicial = modelo
    ? modelo.charAt(0).toUpperCase() + modelo.slice(1).replace(/-/g, ' ')
    : undefined

  return (
    <div className="bg-[#F5F5F5] min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Solicita tu cotización</h1>
          <p className="mt-2 text-gray-500">
            Un asesor Toyota te contactará en menos de 24 horas con tu precio personalizado.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-8">
          <CotizacionForm modeloInicial={modeloInicial} />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: '📞', label: 'Teléfono', value: '(55) 5870-6655' },
            { icon: '📍', label: 'Ubicación', value: 'Autopista México–Qro Km. 37.5' },
            { icon: '🕐', label: 'Horario', value: 'Lun–Sáb 9:00–19:00' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-lg p-3 border border-gray-100">
              <p className="text-xl">{item.icon}</p>
              <p className="text-xs text-gray-400 mt-1">{item.label}</p>
              <p className="text-xs font-medium text-[#1A1A1A] mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
