import type { Metadata } from 'next'
import { getModelos } from '@/lib/sanity/queries'
import ModeloCard from '@/components/ui/ModeloCard'
import type { Modelo } from '@/types'

export const metadata: Metadata = {
  title: 'Modelos',
  description: 'Conoce toda la línea Toyota disponible en Cuautitlán Izcalli. Sedanes, SUVs, pick-ups e híbridos.',
}

const categorias = [
  { value: 'todos', label: 'Todos' },
  { value: 'sedan', label: 'Sedán' },
  { value: 'suv', label: 'SUV' },
  { value: 'pickup', label: 'Pick-up' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'hibrido', label: 'Híbrido' },
  { value: 'van', label: 'Van' },
  { value: 'comercial', label: 'Comercial' },
]

export default async function ModelosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>
}) {
  const { categoria } = await searchParams
  const modelos: Modelo[] = await getModelos()

  const filtrados =
    !categoria || categoria === 'todos'
      ? modelos
      : modelos.filter((m) => m.categoria === categoria)

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Catálogo de modelos</h1>
          <p className="mt-2 text-gray-500">
            {modelos.length} modelos disponibles en Toyota Cuautitlán
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categorias.map((cat) => (
            <a
              key={cat.value}
              href={cat.value === 'todos' ? '/modelos' : `/modelos?categoria=${cat.value}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                (categoria ?? 'todos') === cat.value
                  ? 'bg-[#EB0A1E] text-white border-[#EB0A1E]'
                  : 'bg-white text-[#1A1A1A] border-gray-200 hover:border-[#EB0A1E] hover:text-[#EB0A1E]'
              }`}
            >
              {cat.label}
            </a>
          ))}
        </div>

        {/* Grid */}
        {filtrados.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No hay modelos en esta categoría todavía.</p>
            <a href="/modelos" className="mt-4 inline-block text-[#EB0A1E] font-medium hover:underline">
              Ver todos los modelos
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtrados.map((modelo) => (
              <ModeloCard key={modelo._id} modelo={modelo} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
