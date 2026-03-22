import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Simuladores laborales — GoLegit",
  description:
    "Calcula liquidaciones de sueldo y verifica jornadas laborales según la ley chilena vigente. Gratis, sin registrarse.",
};

export default function SimuladorLanding() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar />

      {/* Header */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 70% 60% at 10% 50%, rgba(187,247,208,0.32) 0%, transparent 60%),
              radial-gradient(ellipse 45% 45% at 90% 20%, rgba(209,250,229,0.22) 0%, transparent 55%)
            `,
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink transition-colors mb-8"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Volver al inicio
          </Link>

          <div className="inline-flex items-center gap-2 bg-white border border-brand-200 text-brand-700 text-xs font-medium px-3.5 py-1.5 rounded-full mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
            Herramientas gratuitas — sin registrarse
          </div>

          <h1
            className="text-4xl lg:text-5xl font-light text-ink leading-tight mb-4"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Simuladores{" "}
            <em className="not-italic text-brand-600">laborales</em>
          </h1>
          <p className="text-lg text-ink-muted leading-relaxed max-w-2xl">
            Calculadoras precisas basadas en la ley chilena vigente para empleadores
            de trabajadoras de casa particular. Resultados instantáneos.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Liquidación */}
          <Link
            href="/simulador/liquidacion"
            className="group relative flex flex-col bg-white border border-gray-200 rounded-3xl p-8 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-600/8 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Icon */}
            <div className="w-14 h-14 bg-brand-50 border border-brand-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-100 transition-colors">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.7">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-brand-600 bg-brand-50 border border-brand-100 px-2.5 py-0.5 rounded-full">
                Mensual
              </span>
            </div>

            <h2
              className="text-2xl font-light text-ink mb-3 leading-tight"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Liquidación de sueldo
            </h2>

            <p className="text-ink-muted leading-relaxed mb-6 flex-1">
              Calcula el sueldo líquido exacto con todos los descuentos legales —
              AFP, Fonasa o Isapre — y el costo total de la relación laboral para
              el empleador.
            </p>

            {/* Feature list */}
            <ul className="space-y-2 mb-8">
              {[
                "7 AFP con tasas de comisión vigentes",
                "Haberes no imponibles (movilización, colación)",
                "Costo directo del empleador (SIS, AFC, Mutual)",
                "Proporcional a los días trabajados",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ink-muted">
                  <div className="w-4 h-4 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            {/* Preview */}
            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4 mb-6">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-ink-light">Sueldo base</span>
                  <span className="text-ink-muted font-medium">$520.000</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-ink-light">AFP Habitat (11,27%)</span>
                  <span className="text-red-500">−$58.604</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-ink-light">Fonasa (7%)</span>
                  <span className="text-red-500">−$36.400</span>
                </div>
                <div className="h-px bg-brand-200 my-1" />
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-ink">Sueldo líquido</span>
                  <span className="text-brand-700">$474.996</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 group-hover:gap-3 transition-all">
              Ir al simulador
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Jornada */}
          <Link
            href="/simulador/jornada"
            className="group relative flex flex-col bg-white border border-gray-200 rounded-3xl p-8 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-600/8 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Icon */}
            <div className="w-14 h-14 bg-brand-50 border border-brand-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-100 transition-colors">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.7">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-brand-600 bg-brand-50 border border-brand-100 px-2.5 py-0.5 rounded-full">
                Semanal
              </span>
              <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                44h → 42h el 26/4/2026
              </span>
            </div>

            <h2
              className="text-2xl font-light text-ink mb-3 leading-tight"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Jornada laboral
            </h2>

            <p className="text-ink-muted leading-relaxed mb-6 flex-1">
              Define el horario día a día, excluye la colación y verifica si la
              jornada cumple la ley. Genera la cláusula de jornada lista para
              pegar en el contrato.
            </p>

            {/* Feature list */}
            <ul className="space-y-2 mb-8">
              {[
                "Horario semanal día a día con colación excluida",
                "Detección de horas extra con recargo del 50%",
                "Alerta automática ante la reducción a 42h (26/4/2026)",
                "Texto de jornada listo para copiar al contrato",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ink-muted">
                  <div className="w-4 h-4 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            {/* Preview */}
            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4 mb-6">
              <p className="text-[11px] text-ink-muted leading-relaxed italic">
                &ldquo;Lunes a jueves de 09:00 a 18:30 hrs., viernes de 09:00 a
                17:30 hrs., con 30 minutos de descanso diario no imputables a la
                jornada.&rdquo;
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 group-hover:gap-3 transition-all">
              Ir al simulador
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-ink-light mt-10 leading-relaxed">
          Los valores calculados son referenciales. Verificar tasas de AFP, UF y topes imponibles en{" "}
          <span className="text-ink-muted">previred.com</span> antes de emitir liquidaciones oficiales.
        </p>
      </section>

      <Footer />
    </main>
  );
}
