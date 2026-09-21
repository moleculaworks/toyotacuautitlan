"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ModelosMegaMenu from "./ModelosMegaMenu";
import ModelosMobileAccordion from "./ModelosMobileAccordion";
import Button from "@/components/ui/Button";
import type { Modelo } from "@/types";

const navLinks = [
  { label: "Promociones", href: "/promociones" },
  { label: "Servicio", href: "/cita-de-servicio" },
  { label: "Contacto", href: "/contacto" },
];

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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl font-semibold text-toyota-red tracking-tight">
              TOYOTA
            </span>
            <span className="text-sm text-foreground font-semibold hidden sm:block">
              Cuautitlán
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <div
              className="h-16 flex items-center"
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
                <div className="fixed left-0 right-0 top-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white border border-[#EEE] shadow-xl p-8 mt-3">
                      <ModelosMegaMenu modelos={modelos} onNavigate={() => setModelosOpen(false)} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
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
          <div className="hidden md:block">
            <Button href="/cotizacion" variant="primary" className="px-5 py-2.5 text-sm">
              Cotizar
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <nav className="flex flex-col">
            <ModelosMobileAccordion modelos={modelos} onNavigate={() => setMenuOpen(false)} />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="w-full py-4 border-b border-[#F0F0F0] text-base font-semibold text-foreground hover:text-toyota-red transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button
              href="/cotizacion"
              variant="primary"
              onClick={() => setMenuOpen(false)}
              className="px-5 py-3 mt-4 text-sm"
            >
              Cotizar
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
