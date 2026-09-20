import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <section className="bg-[#F5F5F5] min-h-[calc(100vh-4rem)] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
          Maneja el auto{" "}
          <span className="text-toyota-red">que siempre quisiste</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Concesionario oficial Toyota en Cuautitlán Izcalli. Nuevos modelos,
          financiamiento a tu medida y servicio certificado.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/modelos" variant="primary" className="px-8 py-3 text-sm">
            Ver modelos
          </Button>
          <Button href="/cotizacion" variant="secondary" className="px-8 py-3 text-sm">
            Cotizar ahora
          </Button>
        </div>
      </div>
    </section>
  );
}
