"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ModelosMegaMenu from "./ModelosMegaMenu";
import ModelosMobileAccordion from "./ModelosMobileAccordion";
import GrupoMobileAccordion from "./GrupoMobileAccordion";
import Button from "@/components/ui/Button";
import HighlightIcon from "@/components/ui/HighlightIcon";
import IconoExterno from "@/components/ui/IconoExterno";
import { URL_PROTECCION_EXTENDIDA } from "@/lib/enlaces";
import type { Modelo } from "@/types";

// Orden del menú: Modelos (mega menú), y luego ITEMS_MENU en este orden. Un elemento con `links` es un
// GRUPO (encabezado SIN página propia que solo despliega sus páginas); uno con `href` es un enlace directo.
// La página /cita-de-servicio (formulario de muestra) ya no está en el menú.
type ItemMenu = { label: string; href: string; externo?: boolean } | { label: string; links: { label: string; href: string }[] };
const ITEMS_MENU: ItemMenu[] = [
  { label: "Promociones", href: "/promociones" },
  {
    label: "Financiamiento",
    links: [
      { label: "Planes y Arrendamientos", href: "/financiamiento/planes-y-arrendamientos" },
      { label: "Seguros", href: "/financiamiento/seguros" },
    ],
  },
  {
    label: "Seminuevos",
    links: [
      { label: "Comonuevos", href: "/seminuevos/comonuevos" },
      { label: "Catálogo", href: "/seminuevos/catalogo" },
    ],
  },
  {
    label: "Postventa",
    links: [
      { label: "Precios de servicio", href: "/postventa/precios" },
      { label: "Refacciones", href: "/postventa/refacciones" },
      { label: "Acciones de servicio", href: "/postventa/acciones-de-servicio" },
    ],
  },
  // Enlace EXTERNO: sale del sitio, se abre en otra pestaña y lleva el ícono ↗.
  { label: "Protección extendida", href: URL_PROTECCION_EXTENDIDA, externo: true },
  { label: "Contacto", href: "/contacto" },
];

// Desplegable sencillo de escritorio para un grupo del menú (sin página propia).
function GrupoEscritorio({ label, links }: { label: string; links: { label: string; href: string }[] }) {
  const [abierto, setAbierto] = useState(false);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  function abrir() {
    if (temporizador.current) clearTimeout(temporizador.current);
    setAbierto(true);
  }

  function programarCierre() {
    temporizador.current = setTimeout(() => setAbierto(false), 150);
  }

  return (
    <div
      className="relative h-16 xl:h-20 flex items-center"
      onMouseEnter={abrir}
      onMouseLeave={programarCierre}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setAbierto(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={abierto}
        onClick={() => setAbierto((v) => !v)}
        className={`text-[15px] font-semibold transition-colors ${
          abierto ? "text-toyota-red" : "text-foreground hover:text-toyota-red"
        }`}
      >
        {label}
      </button>

      {abierto && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full">
          <div className="bg-white border border-[#EEE] shadow-xl py-2 min-w-[240px]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setAbierto(false)}
                className="block px-5 py-3.5 text-[15px] font-semibold text-foreground hover:text-toyota-red transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Acceso "WhatsApp" de escritorio (10 nov 2026): solo el ícono de WhatsApp de la familia (línea roja; el texto
// "WhatsApp" queda para lectores de pantalla), junto a "Cotizar". Se quitó el texto porque el menú ya no
// cabe con él. Despliega dos opciones (ventas y servicio), mismo patrón de desplegable que Financiamiento
// y Postventa.
function WhatsAppEscritorio() {
  const [abierto, setAbierto] = useState(false);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  function abrir() {
    if (temporizador.current) clearTimeout(temporizador.current);
    setAbierto(true);
  }

  function programarCierre() {
    temporizador.current = setTimeout(() => setAbierto(false), 150);
  }

  const opciones = [
    { label: "Ventas", numero: WHATSAPP_VENTAS_NUMERO, href: WHATSAPP_VENTAS_HREF },
    { label: "Servicio", numero: WHATSAPP_SERVICIO_NUMERO, href: WHATSAPP_SERVICIO_HREF },
  ];

  return (
    <div
      className="relative h-16 xl:h-20 flex items-center"
      onMouseEnter={abrir}
      onMouseLeave={programarCierre}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setAbierto(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={abierto}
        onClick={() => setAbierto((v) => !v)}
        className={`flex items-center gap-2 text-base font-semibold transition-colors ${
          abierto ? "text-toyota-red" : "text-foreground hover:text-toyota-red"
        }`}
      >
        <HighlightIcon nombre="whatsapp" size={30} />
        <span className="sr-only">WhatsApp</span>
      </button>

      {abierto && (
        <div className="absolute right-0 top-full">
          <div className="bg-white border border-[#EEE] shadow-xl py-2 min-w-[220px]">
            {opciones.map((o) => (
              <a
                key={o.label}
                href={o.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setAbierto(false)}
                className="group block px-5 py-3 transition-colors"
              >
                <span className="flex items-center gap-1.5 text-[13px] font-normal text-[#555]">
                  <HighlightIcon nombre="whatsapp" size={17} />
                  {o.label}
                </span>
                <span className="block text-[15px] font-semibold text-foreground group-hover:text-toyota-red transition-colors">
                  {formatoNumero(o.numero)}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FilaMovil({
  link,
  onNavigate,
}: {
  link: { label: string; href: string; externo?: boolean };
  onNavigate: () => void;
}) {
  const clases =
    "w-full flex items-center justify-between py-4 border-b border-[#F0F0F0] text-base font-semibold text-foreground hover:text-toyota-red transition-colors";
  // Enlace externo: se abre en otra pestaña y el chevron se cambia por la flecha ↗ (sale del sitio).
  if (link.externo) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={clases}>
        {link.label}
        <IconoExterno size={16} />
      </a>
    );
  }
  return (
    <Link href={link.href} onClick={onNavigate} className={clases}>
      {link.label}
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0" aria-hidden="true">
        <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

// Datos de contacto del menú. El teléfono es el mismo que /contacto (escrito a mano); cuando exista el
// documento `configuracion` en Sanity, el origen de estos datos cambia ahí.
const TELEFONO_HREF = "tel:5558706655";
// WhatsApp de ventas y de servicio (números reales, 10 nov 2026). Los usan el desplegable de escritorio y los
// botones del menú móvil.
const WHATSAPP_VENTAS_NUMERO = "5536728897";
const WHATSAPP_SERVICIO_NUMERO = "5545844859";
const WHATSAPP_VENTAS_HREF = `https://wa.me/52${WHATSAPP_VENTAS_NUMERO}`;
const WHATSAPP_SERVICIO_HREF = `https://wa.me/52${WHATSAPP_SERVICIO_NUMERO}`;
// "5512345678" -> "55 1234 5678"
const formatoNumero = (n: string) => `${n.slice(0, 2)} ${n.slice(2, 6)} ${n.slice(6)}`;

export default function Navbar({ modelos }: { modelos: Modelo[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modelosOpen, setModelosOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menú móvil a pantalla completa: bloquea el scroll de la página y cierra con Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  function openModelos() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setModelosOpen(true);
  }

  function scheduleCloseModelos() {
    closeTimer.current = setTimeout(() => setModelosOpen(false), 150);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 bg-white ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 xl:h-20">
          {/* Móvil: hamburguesa a la izquierda (se vuelve ✕ al abrir) */}
          <button
            className="xl:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0" aria-label="Toyota Cuautitlán, inicio">
            <Image
              src="/images/logo/toyota-cuautitlan-logo.svg"
              alt="Toyota Cuautitlán"
              width={193}
              height={40}
              priority
              className="h-8 xl:h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-6">
            <div
              className="h-16 xl:h-20 flex items-center"
              onMouseEnter={openModelos}
              onMouseLeave={scheduleCloseModelos}
            >
              <Link
                href="/modelos"
                className={`text-[15px] font-semibold transition-colors ${
                  modelosOpen ? "text-toyota-red" : "text-foreground hover:text-toyota-red"
                }`}
              >
                Modelos
              </Link>

              {modelosOpen && (
                <div className="fixed left-0 right-0 top-16 xl:top-20">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white border border-[#EEE] shadow-xl p-8 mt-3">
                      <ModelosMegaMenu modelos={modelos} onNavigate={() => setModelosOpen(false)} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {ITEMS_MENU.map((item) =>
              "links" in item ? (
                <GrupoEscritorio key={item.label} label={item.label} links={item.links} />
              ) : (
                item.externo ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[15px] font-semibold text-foreground hover:text-toyota-red transition-colors whitespace-nowrap"
                  >
                    {item.label}
                    <IconoExterno />
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[15px] font-semibold text-foreground hover:text-toyota-red transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                )
              ),
            )}
          </nav>

          {/* CTA */}
          <div className="hidden xl:flex items-center gap-5">
            <WhatsAppEscritorio />
            <Button href="/cotizacion" variant="primary" className="px-5 py-2.5 text-base">
              Cotizar
            </Button>
          </div>

          {/* Móvil: teléfono a la derecha (mismo ancho que la hamburguesa para que el logo quede centrado) */}
          <a
            href={TELEFONO_HREF}
            className="xl:hidden p-2 text-foreground"
            aria-label="Llamar a Toyota Cuautitlán"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
            </svg>
          </a>
        </div>
      </div>

      {/* Menú móvil a pantalla completa bajo la cabecera */}
      {menuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white flex flex-col border-t border-gray-100">
          <nav className="flex-1 overflow-y-auto overscroll-contain px-4 flex flex-col">
            <ModelosMobileAccordion modelos={modelos} onNavigate={() => setMenuOpen(false)} />
            {ITEMS_MENU.map((item) =>
              "links" in item ? (
                <GrupoMobileAccordion key={item.label} label={item.label} links={item.links} onNavigate={() => setMenuOpen(false)} />
              ) : (
                <FilaMovil key={item.href} link={item} onNavigate={() => setMenuOpen(false)} />
              ),
            )}
          </nav>

          <div className="shrink-0 px-4 py-4 border-t border-[#F0F0F0] bg-white flex flex-col gap-3">
            <Button
              href="/cotizacion"
              variant="primary"
              onClick={() => setMenuOpen(false)}
              className="w-full py-3.5 text-base"
            >
              Cotizar
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button href={WHATSAPP_VENTAS_HREF} external variant="secondary" icon={<HighlightIcon nombre="whatsapp" size={26} />} iconPosition="left" className="gap-2 py-3 text-base">
                Ventas
              </Button>
              <Button href={WHATSAPP_SERVICIO_HREF} external variant="secondary" icon={<HighlightIcon nombre="whatsapp" size={26} />} iconPosition="left" className="gap-2 py-3 text-base">
                Servicio
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
