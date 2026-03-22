"use client";

const problems = [
  {
    icon: "📄",
    title: "El contrato es un Word de internet",
    description:
      "Copiado de algún sitio, con los datos a mano. Sin cláusulas actualizadas para puertas adentro ni AFP vigente.",
  },
  {
    icon: "🔢",
    title: "La liquidación la hace el contador (o nadie)",
    description:
      "AFP, Isapre, AFC, cotización adicional — cada mes distinto, fácil de equivocarse. Y un error puede costar más caro que el cálculo.",
  },
  {
    icon: "📦",
    title: "Los cambios quedan en papelitos",
    description:
      "El sueldo subió. La jornada cambió. Pero el contrato de 2019 sigue siendo el mismo. Nadie tiene el registro.",
  },
  {
    icon: "👩",
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
          <span className="text-brand-600 text-sm font-medium tracking-wide uppercase">
            El problema
          </span>
          <h2
            className="text-4xl lg:text-5xl font-light text-ink mt-3 mb-5 leading-tight"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Lo que hoy no está en regla{" "}
            <em className="not-italic italic text-ink-muted">te puede salir caro</em>
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed">
            Contratar a una trabajadora de casa particular en Chile tiene requisitos
            legales concretos: contrato firmado dentro de los primeros 15 días,
            liquidación con cotizaciones correctas, y documentos válidos en caso
            de desacuerdo.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-red-100 bg-red-50/30 hover:bg-red-50/60 transition-colors"
            >
              <div className="text-2xl mb-3">{problem.icon}</div>
              <h3 className="font-semibold text-ink mb-2">{problem.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Transition */}
        <div className="mt-16 p-6 rounded-2xl bg-ink text-white flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="text-3xl">⚖️</div>
          <div>
            <p className="font-medium mb-1">
              La Inspección del Trabajo puede fiscalizar en cualquier momento.
            </p>
            <p className="text-sm text-ink-light">
              Las multas por contrato mal hecho o liquidación incorrecta pueden superar 
              con creces lo que cuesta tenerlo en regla.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
