import Link from "next/link";

export default function HomePage() {
  return (
    <section className="bg-[#F5F5F5] min-h-[calc(100vh-4rem)] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight">
          Maneja el auto{" "}
          <span className="text-[#EB0A1E]">que siempre quisiste</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Concesionario oficial Toyota en Cuautitlán Izcalli. Nuevos modelos,
          financiamiento a tu medida y servicio certificado.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/modelos"
            className="px-8 py-3 bg-[#EB0A1E] text-white font-semibold rounded hover:bg-red-700 transition-colors text-sm"
          >
            Ver modelos
          </Link>
          <Link
            href="/cotizacion"
            className="px-8 py-3 border-2 border-[#1A1A1A] text-[#1A1A1A] font-semibold rounded hover:bg-[#1A1A1A] hover:text-white transition-colors text-sm"
          >
            Cotizar ahora
          </Link>
        </div>
      </div>
    </section>
  );
}
