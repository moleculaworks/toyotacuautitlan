import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctanos en Toyota Cuautitlán Izcalli. Teléfono, dirección y horarios de atención.',
}

const datos = [
  {
    icon: '📞',
    titulo: 'Teléfono',
    lineas: ['(55) 5870-6655'],
    href: 'tel:5558706655',
    ctaTexto: 'Llamar ahora',
  },
  {
    icon: '💬',
    titulo: 'WhatsApp',
    lineas: ['Escríbenos directo'],
    href: 'https://wa.me/525558706655',
    ctaTexto: 'Abrir WhatsApp',
  },
  {
    icon: '📍',
    titulo: 'Dirección',
    lineas: ['Autopista México–Querétaro Km. 37.5', 'Cuautitlán Izcalli, México. C.P. 54730'],
    href: 'https://maps.google.com/?q=Toyota+Cuautitlan',
    ctaTexto: 'Ver en mapa',
  },
  {
    icon: '🕐',
    titulo: 'Horario',
    lineas: ['Lun–Sáb: 9:00–19:00', 'Dom: 10:00–15:00'],
  },
]

export default function ContactoPage() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Contacto</h1>
          <p className="mt-2 text-gray-500">Estamos para ayudarte.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {datos.map((d) => (
            <div key={d.titulo} className="bg-white rounded-lg border border-gray-100 p-6">
              <p className="text-3xl">{d.icon}</p>
              <h2 className="mt-3 text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide">
                {d.titulo}
              </h2>
              <div className="mt-2 space-y-0.5">
                {d.lineas.map((l) => (
                  <p key={l} className="text-sm text-gray-600">{l}</p>
                ))}
              </div>
              {d.href && (
                <a
                  href={d.href}
                  target={d.href.startsWith('http') ? '_blank' : undefined}
                  rel={d.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="mt-4 inline-block text-sm font-medium text-[#EB0A1E] hover:underline"
                >
                  {d.ctaTexto} →
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Mapa placeholder */}
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3756.0!2d-99.2!3d19.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDQyJzAwLjAiTiA5OcKwMTInMDAuMCJX!5e0!3m2!1ses!2smx!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Toyota Cuautitlán - Ubicación"
          />
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">¿Prefieres que te contactemos nosotros?</p>
          <Link
            href="/cotizacion"
            className="inline-block px-8 py-3 bg-[#EB0A1E] text-white font-semibold rounded hover:bg-red-700 transition-colors"
          >
            Solicitar cotización
          </Link>
        </div>
      </div>
    </div>
  )
}
