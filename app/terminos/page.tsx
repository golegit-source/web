import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Servicio — GoLegit",
  robots: { index: false },
};

export default function TerminosPage() {
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
          Términos de Servicio
        </h1>
        <div className="prose prose-sm text-ink-muted space-y-4">
          <p>
            <strong>Última actualización:</strong> Marzo 2026
          </p>
          <p>
            Al utilizar GoLegit, el usuario acepta los presentes Términos de
            Servicio establecidos por Cubillos y Compañía Limitada (RUT
            78.048.033-5).
          </p>
          <p className="text-ink-light text-xs border border-amber-200 bg-amber-50 rounded-lg p-3">
            ⚠️ Este documento está en preparación. Se publicará la versión
            completa antes del lanzamiento público (Decisión 19).
          </p>
        </div>
      </div>
    </main>
  );
}
