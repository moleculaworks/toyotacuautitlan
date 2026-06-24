'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { cotizacionSchema, type CotizacionData } from '@/lib/validations/cotizacion'

const modelos = [
  'Yaris Hatchback', 'Yaris Sedán', 'Corolla', 'Corolla HEV', 'Camry', 'Camry HEV',
  'Corolla Cross', 'Corolla Cross HEV', 'Raize', 'RAV4', 'RAV4 HEV',
  'Highlander', 'Highlander HEV', '4Runner', 'Sequoia HEV',
  'Sienna HEV', 'Avanza', 'Prius', 'Supra', 'GR Corolla', 'GR Yaris',
  'Hilux', 'Tacoma', 'Tacoma HEV', 'Tundra', 'Tundra HEV', 'Hiace',
]

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-500">{message}</p>
}

export default function CotizacionForm({ modeloInicial }: { modeloInicial?: string }) {
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CotizacionData>({
    resolver: zodResolver(cotizacionSchema),
    defaultValues: { modelo: modeloInicial ?? '' },
  })

  async function onSubmit(data: CotizacionData) {
    setEnviando(true)
    try {
      const res = await fetch('/api/cotizacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setEnviado(true)
    } finally {
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-[#1A1A1A]">¡Solicitud recibida!</h2>
        <p className="mt-2 text-gray-500">
          Un asesor se pondrá en contacto contigo en menos de 24 horas.
        </p>
        <p className="mt-1 text-sm text-gray-400">También puedes llamarnos al (55) 5870-6655</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
            Nombre completo <span className="text-red-500">*</span>
          </label>
          <input
            {...register('nombre')}
            className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#EB0A1E]"
            placeholder="Tu nombre"
          />
          <FieldError message={errors.nombre?.message} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
            Teléfono <span className="text-red-500">*</span>
          </label>
          <input
            {...register('telefono')}
            type="tel"
            className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#EB0A1E]"
            placeholder="55 1234 5678"
          />
          <FieldError message={errors.telefono?.message} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input
          {...register('email')}
          type="email"
          className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#EB0A1E]"
          placeholder="correo@ejemplo.com"
        />
        <FieldError message={errors.email?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
          Modelo de interés <span className="text-red-500">*</span>
        </label>
        <select
          {...register('modelo')}
          className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#EB0A1E] bg-white"
        >
          <option value="">Selecciona un modelo</option>
          {modelos.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <FieldError message={errors.modelo?.message} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
            Forma de pago <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            {[{ value: 'contado', label: 'Contado' }, { value: 'credito', label: 'Crédito' }].map((op) => (
              <label key={op.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register('formaPago')}
                  type="radio"
                  value={op.value}
                  className="accent-[#EB0A1E]"
                />
                <span className="text-sm">{op.label}</span>
              </label>
            ))}
          </div>
          <FieldError message={errors.formaPago?.message} />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
            ¿Cuándo planeas comprar? <span className="text-red-500">*</span>
          </label>
          <select
            {...register('plazoCompra')}
            className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#EB0A1E] bg-white"
          >
            <option value="">Selecciona</option>
            <option value="inmediato">Inmediatamente</option>
            <option value="1-3meses">1 a 3 meses</option>
            <option value="3-6meses">3 a 6 meses</option>
            <option value="solo-info">Solo quiero información</option>
          </select>
          <FieldError message={errors.plazoCompra?.message} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
          Comentarios adicionales
        </label>
        <textarea
          {...register('comentarios')}
          rows={3}
          className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#EB0A1E] resize-none"
          placeholder="¿Alguna pregunta o detalle especial?"
        />
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="w-full py-3 bg-[#EB0A1E] text-white font-semibold rounded hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {enviando ? 'Enviando...' : 'Solicitar cotización'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Al enviar aceptas que un asesor de Toyota Cuautitlán te contacte.
      </p>
    </form>
  )
}
