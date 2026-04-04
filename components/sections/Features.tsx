const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
      </svg>
    ),
    title: "Contrato de trabajo",
    description: "Puertas adentro o puertas afuera, con cláusulas correctas según la Ley 20.786 y el Código del Trabajo.",
    status: "live",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"/>
      </svg>
    ),
    title: "Anexos de modificación",
    description: "Cambios de sueldo, jornada, domicilio u otras condiciones. Cada modificación queda como documento independiente.",
    status: "live",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    title: "Liquidación mensual",
    description: "AFP, Isapre, AFC, cotización adicional y costos del empleador calculados automáticamente. Genera PDF y notifica a ambas partes.",
    status: "live",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: "Historial completo",
    description: "Cada documento guardado con fecha, hora y quién lo inició. Ese historial tiene valor probatorio ante la Inspección del Trabajo.",
    status: "live",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
    title: "Vacaciones y licencias",
    description: "Registro de días acumulados, solicitudes, licencias médicas y ausencias con su impacto en la liquidación.",
    status: "soon",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
    ),
    title: "Finiquito y XML Previred",
    description: "Finiquito con causal correcta y cálculo de indemnizaciones. XML listo para cargar en Previred.",
    status: "soon",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold tracking-widest text-ink-light uppercase mb-5">Qué incluye</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-ink leading-tight tracking-tight">
            Todo lo que necesitas,
            <br />
            <span className="text-ink-muted font-bold">en un solo lugar.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`relative p-6 rounded-2xl border transition-all group ${
                feature.status === "live"
                  ? "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                  : "border-gray-100 bg-gray-50/50 opacity-60"
              }`}
            >
              {feature.status === "soon" && (
                <span className="absolute top-4 right-4 text-[10px] font-semibold text-ink-light bg-gray-100 px-2 py-0.5 rounded-full">
                  Próximamente
                </span>
              )}
              {feature.status === "live" && (
                <span className="absolute top-4 right-4 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                  <span className="text-[10px] font-semibold text-brand-600">Disponible</span>
                </span>
              )}

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  feature.status === "live"
                    ? "bg-brand-50 text-brand-600 group-hover:bg-brand-100"
                    : "bg-gray-100 text-gray-400"
                } transition-colors`}
              >
                {feature.icon}
              </div>

              <h3 className="font-bold text-ink mb-2">{feature.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
