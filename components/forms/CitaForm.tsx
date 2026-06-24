'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { citaSchema, type CitaData } from '@/lib/validations/cita'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-500">{message}</p>
}

const minDate = new Date()
minDate.setDate(minDate.getDate() + 1)
const minDateStr = minDate.toISOString().split('T')[0]

export default function CitaForm() {
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CitaData>({ resolver: zodResolver(citaSchema) })

  async function onSubmit(data: CitaData) {
    setEnviando(true)
    try {
      const res = await fetch('/api/cita', {
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
        <h2 className="text-2xl font-bold text-[#1A1A1A]">¡Cita agendada!</h2>
        <p className="mt-2 text-gray-500">Te confirmaremos tu cita por teléfono a la brevedad.</p>
        <p className="mt-1 text-sm text-gray-400">¿Dudas? Llámanos al (55) 5870-6655</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
            Modelo del vehículo <span className="text-red-500">*</span>
          </label>
          <input
            {...register('modelo')}
            className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#EB0A1E]"
            placeholder="Ej: Corolla, Hilux..."
          />
          <FieldError message={errors.modelo?.message} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
            Año <span className="text-red-500">*</span>
          </label>
          <input
            {...register('anio')}
            type="number"
            min="2000"
            max="2026"
            className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#EB0A1E]"
            placeholder="2024"
          />
          <FieldError message={errors.anio?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
            Tipo de servicio <span className="text-red-500">*</span>
          </label>
          <select
            {...register('servicio')}
            className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#EB0A1E] bg-white"
          >
            <option value="">Selecciona</option>
            <option value="mantenimiento">Mantenimiento</option>
            <option value="revision">Revisión general</option>
            <option value="garantia">Garantía</option>
            <option value="colision">Colisión / Hojalatería</option>
            <option value="otro">Otro</option>
          </select>
          <FieldError message={errors.servicio?.message} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
            Fecha preferida <span className="text-red-500">*</span>
          </label>
          <input
            {...register('fecha')}
            type="date"
            min={minDateStr}
            className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#EB0A1E]"
          />
          <FieldError message={errors.fecha?.message} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Comentarios</label>
        <textarea
          {...register('comentarios')}
          rows={3}
          className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#EB0A1E] resize-none"
          placeholder="Describe el problema o servicio que necesitas"
        />
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="w-full py-3 bg-[#EB0A1E] text-white font-semibold rounded hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {enviando ? 'Enviando...' : 'Agendar cita'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Lun–Sáb 9:00–19:00 · Dom 10:00–15:00 · (55) 5870-6655
      </p>
    </form>
  )
}
