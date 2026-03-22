const trustItems = [
  {
    icon: "⚖️",
    title: "Construido por un abogado",
    body: "GoLegit fue diseñado por un abogado especializado en derecho laboral chileno. Las plantillas cumplen con el Art. 10 del Código del Trabajo y la Ley 20.786. No son formularios genéricos descargados de internet.",
  },
  {
    icon: "📋",
    title: "Valor probatorio real",
    body: "Cada documento queda almacenado con registro de fecha, hora y quién lo inició. Ese historial tiene valor ante la Inspección del Trabajo. Si hay un desacuerdo, tienes evidencia.",
  },
  {
    icon: "🔺",
    title: "La trabajadora también recibe los documentos",
    body: "No es solo para el empleador. GoLegit le envía los contratos y liquidaciones directamente a la trabajadora por WhatsApp y email. Transparencia que protege a ambas partes.",
  },
  {
    icon: "🔐",
    title: "Datos seguros",
    body: "Los datos se almacenan en infraestructura certificada. Los documentos PDF tienen enlaces de acceso con tiempo limitado. Sin terceros con acceso a tu información.",
  },
];

export default function Trust() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-brand-600 text-sm font-medium tracking-wide uppercase">
            Por qué confiar
          </span>
          <h2
            className="text-4xl lg:text-5xl font-light text-ink mt-3 leading-tight"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Legal desde el diseño,{" "}
            <em className="not-italic italic text-ink-muted">no desde el marketing</em>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {trustItems.map((item, i) => (
            <div key={i} className="flex gap-4 p-6 rounded-2xl border border-gray-100 bg-paper hover:border-brand-100 transition-colors group">
              <div className="text-2xl flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Legal note */}
        <div className="flex flex-col sm:flex-row items-start gap-6 p-6 rounded-2xl bg-ink text-white">
          <div className="text-3xl flex-shrink-0">📌</div>
          <div>
            <p className="font-medium mb-1">
              Alerta automática: registro en la Inspección del Trabajo
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              El contrato de trabajo debe registrarse en la Dirección del Trabajo dentro
              de los 15 días siguientes a su firma (Art. 146 ter Ley 20.786). GoLegit
              te lo recuerda automáticamente para que no pierdas el plazo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
