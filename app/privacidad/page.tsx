import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — GoLegit",
  robots: { index: false },
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-paper py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-brand-600 hover:text-brand-700 mb-8 inline-block">
          ← Volver al inicio
        </Link>
        <h1
          className="text-4xl font-light text-ink mb-6"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Política de Privacidad
        </h1>
        <div className="prose prose-sm text-ink-muted space-y-4">
          <p>
            <strong>Última actualización:</strong> Marzo 2026
          </p>
          <p>
            Este documento describe cómo Cubillos y Compañía Limitada (RUT
            78.048.033-5), operadora de GoLegit, trata los datos personales de
            sus usuarios, en cumplimiento de la Ley 19.628 sobre Protección de
            la Vida Privada y la Ley 21.719.
          </p>
          <p className="text-ink-light text-xs border border-amber-200 bg-amber-50 rounded-lg p-3">
            ⚠️ Este documento está en preparación. Se publicará la versión
            completa antes del lanzamiento público.
          </p>
        </div>
      </div>
    </main>
  );
}
