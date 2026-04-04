"use client";

const problems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="9" y1="15" x2="15" y2="15"/>
        <line x1="12" y1="12" x2="12" y2="18"/>
      </svg>
    ),
    title: "El contrato es un Word de internet",
    description:
      "Copiado de algún sitio, con los datos a mano. Sin cláusulas actualizadas para puertas adentro ni AFP vigente.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <line x1="8" y1="7" x2="16" y2="7"/>
        <line x1="8" y1="11" x2="16" y2="11"/>
        <line x1="8" y1="15" x2="12" y2="15"/>
      </svg>
    ),
    title: "La liquidación la hace el contador (o nadie)",
    description:
      "AFP, Isapre, AFC, cotización adicional — cada mes distinto, fácil de equivocarse. Y un error puede costar más caro que el cálculo.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="21,8 21,21 3,21 3,8"/>
        <rect x="1" y="3" width="22" height="5"/>
        <line x1="10" y1="12" x2="14" y2="12"/>
      </svg>
    ),
    title: "Los cambios quedan en papelitos",
    description:
      "El sueldo subió. La jornada cambió. Pero el contrato de 2019 sigue siendo el mismo. Nadie tiene el registro.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <line x1="17" y1="8" x2="23" y2="14"/>
        <line x1="23" y1="8" x2="17" y2="14"/>
      </svg>
    ),
    title: "La trabajadora no tiene copia de nada",
    description:
      "Ni del contrato, ni de las liquidaciones, ni de nada. Si hay un desacuerdo, no hay evidencia.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm text-ink-light mb-4">El problema</p>
          <h2
            className="text-4xl lg:text-5xl font-light text-ink mt-2 mb-5 leading-tight"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Lo que hoy no está en regla{" "}
            <em className="not-italic text-ink-muted">te puede salir caro</em>
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed">
            Contratar a una trabajadora de casa particular en Chile tiene requisitos
            legales concretos: contrato firmado dentro de los primeros 15 días,
            liquidación con cotizaciones correctas, y documentos válidos en caso
            de desacuerdo.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-50 text-ink-muted flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors">
                {problem.icon}
              </div>
              <h3 className="font-semibold text-ink mb-2">{problem.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="mt-12 p-6 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-ink flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div>
            <p className="font-medium text-ink mb-1">
              La Inspección del Trabajo puede fiscalizar en cualquier momento.
            </p>
            <p className="text-sm text-ink-muted">
              Las multas por contrato mal hecho o liquidación incorrecta pueden superar
              con creces lo que cuesta tenerlo en regla.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
