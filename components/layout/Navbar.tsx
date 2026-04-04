"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/config";
import CtaButton from "@/components/CtaButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Texto blanco solo en home antes de hacer scroll
  const isDark = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md border-b border-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 bg-brand-600 rounded-md flex items-center justify-center transition-colors group-hover:bg-brand-700">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 4h10M3 8h7M3 12h5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="13" cy="12" r="2" fill="white" />
            </svg>
          </div>
          <span className={`font-bold text-[17px] tracking-tight transition-colors ${isDark ? "text-white" : "text-ink"}`}>
            GoLegit
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: "/#como-funciona", label: "Cómo funciona" },
            { href: "/#precios", label: "Precios" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isDark ? "text-white/60 hover:text-white" : "text-ink-muted hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/simulador"
            className={`text-sm font-medium transition-colors ${
              isDark ? "text-white/60 hover:text-white" : "text-ink-muted hover:text-ink"
            }`}
          >
            Simuladores
          </Link>
          <Link
            href="/novedades"
            className={`text-sm font-medium transition-colors ${
              isDark ? "text-white/60 hover:text-white" : "text-ink-muted hover:text-ink"
            }`}
          >
            Novedades
          </Link>
          <CtaButton
            className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
              isDark
                ? "bg-white text-ink hover:bg-white/90"
                : "bg-ink text-white hover:bg-ink-soft"
            }`}
          >
            Empieza gratis
          </CtaButton>
        </nav>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 transition-colors ${isDark ? "text-white/60 hover:text-white" : "text-ink-muted hover:text-ink"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-5">
          <a href="/#como-funciona" className="text-sm font-medium text-ink-muted" onClick={() => setMenuOpen(false)}>
            Cómo funciona
          </a>
          <a href="/#precios" className="text-sm font-medium text-ink-muted" onClick={() => setMenuOpen(false)}>
            Precios
          </a>
          <a href="/#faq" className="text-sm font-medium text-ink-muted" onClick={() => setMenuOpen(false)}>
            Preguntas frecuentes
          </a>
          <Link href="/simulador" className="text-sm font-medium text-ink-muted" onClick={() => setMenuOpen(false)}>
            Simuladores
          </Link>
          <Link href="/novedades" className="text-sm font-medium text-ink-muted" onClick={() => setMenuOpen(false)}>
            Novedades
          </Link>
          <CtaButton className="inline-flex items-center justify-center gap-2 bg-ink text-white text-sm font-semibold px-4 py-3 rounded-lg">
            Empieza gratis — 1 mes sin costo
          </CtaButton>
        </div>
      )}
    </header>
  );
}
