import CtaButton from "@/components/CtaButton";

export default function Solution() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand-600 uppercase mb-5">La solución</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-ink leading-tight tracking-tight mb-6">
              Todo resuelto
              <br />
              desde tu WhatsApp.
            </h2>
            <p className="text-lg text-ink-muted leading-relaxed mb-10">
              Sin instalar nada. Sin crear una cuenta. Le escribes a GoLegit
              por WhatsApp y el sistema te guía paso a paso para generar
              todos los documentos que necesitas.
            </p>

            <div className="flex flex-col gap-4 mb-10">
              {[
                "Contratos con cláusulas correctas por ley",
                "Liquidaciones calculadas automáticamente",
                "Historial completo con registro de fecha y hora",
                "Los documentos le llegan a tu trabajadora también",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-ink-muted text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <CtaButton className="inline-flex items-center gap-2 bg-ink hover:bg-ink-soft text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Empieza gratis — 1 mes sin costo
            </CtaButton>
          </div>

          {/* Right: Key stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "$9.990", label: "al mes", sub: "vs $24.000 de la competencia" },
              { value: "1 mes", label: "de prueba gratis", sub: "Sin tarjeta de crédito" },
              { value: "0 apps", label: "que instalar", sub: "Solo necesitas WhatsApp" },
              { value: "100%", label: "automatizado", sub: "Sin intermediarios humanos" },
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors bg-white">
                <p className="text-3xl font-extrabold text-ink tracking-tight mb-1">{stat.value}</p>
                <p className="text-sm font-semibold text-ink-muted mb-1">{stat.label}</p>
                <p className="text-xs text-ink-light">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
