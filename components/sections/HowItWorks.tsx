const steps = [
  {
    number: "01",
    title: "Te registras por WhatsApp",
    description:
      "Escríbenos por WhatsApp. Te pedimos tu nombre, RUT y los datos básicos de tu trabajadora. En minutos tu perfil está listo.",
    detail: "Sin formularios. Sin crear contraseña. Tu número de WhatsApp es tu cuenta.",
  },
  {
    number: "02",
    title: "Generas el contrato",
    description:
      "GoLegit te hace las preguntas correctas: modalidad, sueldo, jornada, domicilio, AFP, Isapre. Tú respondes.",
    detail: "El contrato llega en PDF a tu correo y al de tu trabajadora. Con cláusulas válidas según la Ley 20.786.",
  },
  {
    number: "03",
    title: "Cada mes, cierras la liquidación",
    description:
      "GoLegit calcula la liquidación exacta con todos los descuentos y aportes. La genera en PDF y la envía a ambas partes.",
    detail: "AFP, Isapre, AFC, cotización adicional y costos del empleador — todo según la ley vigente.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-[#fafaf8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-widest text-ink-light uppercase mb-5">Cómo funciona</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-ink leading-tight tracking-tight">
            Tres pasos para tener
            <br />
            <span className="text-ink-muted font-bold">todo en regla.</span>
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-5 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gray-200" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="flex items-center gap-4 mb-7">
                  <div className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="lg:hidden flex-1 h-px bg-gray-200" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-ink mb-3">{step.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-4">{step.description}</p>
                <p className="text-sm text-ink-light leading-relaxed border-l-2 border-gray-200 pl-3">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm text-ink-light">
            Así todos los meses.{" "}
            <span className="text-ink-muted font-semibold">Sin recordatorios manuales, sin errores de cálculo.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
