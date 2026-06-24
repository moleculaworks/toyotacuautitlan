import Link from "next/link";

const links = {
  Vehículos: [
    { label: "Todos los modelos", href: "/modelos" },
    { label: "Promociones", href: "/promociones" },
    { label: "Cotizar", href: "/cotizacion" },
  ],
  Servicios: [
    { label: "Cita de servicio", href: "/cita-de-servicio" },
    { label: "Contacto", href: "/contacto" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <span className="text-2xl font-bold text-[#EB0A1E]">TOYOTA</span>
            <p className="mt-1 text-sm text-gray-400">Cuautitlán</p>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Concesionario oficial Toyota en Cuautitlán Izcalli, Estado de México.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                {section}
              </h3>
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
