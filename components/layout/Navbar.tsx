"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ModelosMegaMenu from "./ModelosMegaMenu";
import ModelosMobileAccordion from "./ModelosMobileAccordion";
import GrupoMobileAccordion from "./GrupoMobileAccordion";
import Button from "@/components/ui/Button";
import type { Modelo } from "@/types";

// Orden del menú: Modelos, Promociones, Financiamiento (grupo), Postventa (grupo), Contacto.
// Financiamiento y Postventa son encabezados SIN página propia: solo despliegan sus páginas
// (GRUPOS_MENU, 10 nov 2026). La página /cita-de-servicio (formulario de muestra) ya no está en el menú.
const navLinksAntes = [{ label: "Promociones", href: "/promociones" }];
const navLinksDespues = [{ label: "Contacto", href: "/contacto" }];
const GRUPOS_MENU = [
  {
    label: "Financiamiento",
    links: [
      { label: "Planes y Arrendamientos", href: "/financiamiento/planes-y-arrendamientos" },
      { label: "Seguros", href: "/financiamiento/seguros" },
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
      className="relative h-16 lg:h-20 flex items-center"
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
        className={`text-sm font-semibold transition-colors ${
          abierto ? "text-toyota-red" : "text-foreground hover:text-toyota-red"
        }`}
      >
        {label}
      </button>

      {abierto && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full">
          <div className="bg-white border border-[#EEE] shadow-xl py-2 min-w-[220px]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setAbierto(false)}
                className="block px-5 py-3 text-sm font-semibold text-foreground hover:text-toyota-red transition-colors"
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

function FilaMovil({ link, onNavigate }: { link: { label: string; href: string }; onNavigate: () => void }) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className="w-full flex items-center justify-between py-4 border-b border-[#F0F0F0] text-base font-semibold text-foreground hover:text-toyota-red transition-colors"
    >
      {link.label}
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0" aria-hidden="true">
        <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

// Datos de contacto del menú móvil. Hoy son los mismos que /contacto (escritos a mano);
// cuando exista el documento `configuracion` en Sanity, el origen cambia ahí.
// PENDIENTE (10 nov 2026): los números definitivos de ventas y servicio se definen más
// adelante; por ahora ambos botones usan el WhatsApp que ya existe en /contacto.
const TELEFONO_HREF = "tel:5558706655";
const WHATSAPP_VENTAS_HREF = "https://wa.me/525558706655";
const WHATSAPP_SERVICIO_HREF = "https://wa.me/525558706655";

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
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Móvil: hamburguesa a la izquierda (se vuelve ✕ al abrir) */}
          <button
            className="lg:hidden p-2 text-foreground"
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
              className="h-8 lg:h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <div
              className="h-16 lg:h-20 flex items-center"
              onMouseEnter={openModelos}
              onMouseLeave={scheduleCloseModelos}
            >
              <Link
                href="/modelos"
                className={`text-sm font-semibold transition-colors ${
                  modelosOpen ? "text-toyota-red" : "text-foreground hover:text-toyota-red"
                }`}
              >
                Modelos
              </Link>

              {modelosOpen && (
                <div className="fixed left-0 right-0 top-16 lg:top-20">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white border border-[#EEE] shadow-xl p-8 mt-3">
                      <ModelosMegaMenu modelos={modelos} onNavigate={() => setModelosOpen(false)} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinksAntes.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-foreground hover:text-toyota-red transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Financiamiento y Postventa: grupos sin página propia, desplegable con sus páginas */}
            {GRUPOS_MENU.map((g) => (
              <GrupoEscritorio key={g.label} label={g.label} links={g.links} />
            ))}

            {navLinksDespues.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-foreground hover:text-toyota-red transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Button href="/cotizacion" variant="primary" className="px-5 py-2.5 text-sm">
              Cotizar
            </Button>
          </div>

          {/* Móvil: teléfono a la derecha (mismo ancho que la hamburguesa para que el logo quede centrado) */}
          <a
            href={TELEFONO_HREF}
            className="lg:hidden p-2 text-foreground"
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
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white flex flex-col border-t border-gray-100">
          <nav className="flex-1 overflow-y-auto overscroll-contain px-4 flex flex-col">
            <ModelosMobileAccordion modelos={modelos} onNavigate={() => setMenuOpen(false)} />
            {navLinksAntes.map((link) => (
              <FilaMovil key={link.href} link={link} onNavigate={() => setMenuOpen(false)} />
            ))}
            {GRUPOS_MENU.map((g) => (
              <GrupoMobileAccordion key={g.label} label={g.label} links={g.links} onNavigate={() => setMenuOpen(false)} />
            ))}
            {navLinksDespues.map((link) => (
              <FilaMovil key={link.href} link={link} onNavigate={() => setMenuOpen(false)} />
            ))}
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
              <Button href={WHATSAPP_VENTAS_HREF} external variant="secondary" className="py-3 text-base">
                WhatsApp ventas
              </Button>
              <Button href={WHATSAPP_SERVICIO_HREF} external variant="secondary" className="py-3 text-base">
                WhatsApp servicio
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
