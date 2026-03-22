import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import CtaButton from "@/components/CtaButton";

export default function Footer() {
  return (
    <footer className="bg-ink text-ink-faint">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 4h10M3 8h7M3 12h5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="13" cy="12" r="2" fill="white" />
                </svg>
              </div>
              <span
                className="font-semibold text-white text-base"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                GoLegit
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ink-light">
              Gestión laboral legal para trabajadoras de casa particular.
              Todo por WhatsApp.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-medium mb-4">Producto</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#como-funciona" className="text-sm hover:text-white transition-colors">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#precios" className="text-sm hover:text-white transition-colors">
                  Precios
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm hover:text-white transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <Link href="/simulador" className="text-sm hover:text-white transition-colors">
                  Simuladores
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-medium mb-4">Contacto</h4>
            <ul className="space-y-2.5">
              <li>
                <CtaButton className="text-sm hover:text-white transition-colors">
                  WhatsApp
                </CtaButton>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.supportEmail}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {SITE_CONFIG.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-ink-light">
            © {new Date().getFullYear()} Cubillos y Compañía Limitada · RUT 78.048.033-5
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="text-xs hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-xs hover:text-white transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
