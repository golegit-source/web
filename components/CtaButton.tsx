"use client";

import { SITE_CONFIG } from "@/lib/config";

interface Props {
  className?: string;
  children: React.ReactNode;
  /** Reemplaza "Próximamente" cuando está deshabilitado */
  disabledLabel?: string;
}

/**
 * Botón de CTA principal que apunta a WhatsApp.
 * Cuando SITE_CONFIG.whatsappEnabled === false muestra "Próximamente"
 * con la misma apariencia visual pero sin ser clicable.
 * Para reactivar: cambiar whatsappEnabled a true en lib/config.ts.
 */
export default function CtaButton({
  className = "",
  children,
  disabledLabel = "Próximamente",
}: Props) {
  if (!SITE_CONFIG.whatsappEnabled) {
    return (
      <span
        aria-disabled="true"
        className={`inline-flex items-center gap-2 cursor-default select-none opacity-70 ${className}`}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
        </svg>
        {disabledLabel}
      </span>
    );
  }

  return (
    <a
      href={SITE_CONFIG.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
