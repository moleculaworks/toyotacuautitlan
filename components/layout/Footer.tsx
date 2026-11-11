import Image from "next/image";
import Link from "next/link";

const links = {
  Vehículos: [
    { label: "Todos los modelos", href: "/modelos" },
    { label: "Promociones", href: "/promociones" },
    { label: "Financiamiento", href: "/financiamiento" },
    { label: "Cotizar", href: "/cotizacion" },
  ],
  Servicios: [
    { label: "Precios de servicio", href: "/postventa/precios" },
    { label: "Refacciones", href: "/postventa/refacciones" },
    { label: "Acciones de servicio", href: "/postventa/acciones-de-servicio" },
    { label: "Cita de servicio", href: "/cita-de-servicio" },
    { label: "Contacto", href: "/contacto" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-toyota-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo/toyota-cuautitlan-logo-blanco.svg"
              alt="Toyota Cuautitlán"
              width={193}
              height={40}
              className="h-10 w-auto"
            />
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Concesionario oficial Toyota en Cuautitlán Izcalli, Estado de México.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                {section}
              </p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Toyota Cuautitlán. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
