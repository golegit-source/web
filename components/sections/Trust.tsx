const trustItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Construido por un abogado",
    body: "GoLegit fue diseñado por un abogado especializado en derecho laboral chileno. Las plantillas cumplen con el Art. 10 del Código del Trabajo y la Ley 20.786. No son formularios genéricos descargados de internet.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    title: "Valor probatorio real",
    body: "Cada documento queda almacenado con registro de fecha, hora y quién lo inició. Ese historial tiene valor ante la Inspección del Trabajo. Si hay un desacuerdo, tienes evidencia.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22,2 15,22 11,13 2,9"/>
      </svg>
    ),
    title: "La trabajadora también recibe los documentos",
    body: "No es solo para el empleador. GoLegit le envía los contratos y liquidaciones directamente a la trabajadora por WhatsApp y email. Transparencia que protege a ambas partes.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
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
          <p className="text-sm text-ink-light mb-4">Por qué confiar</p>
          <h2
            className="text-4xl lg:text-5xl font-light text-ink mt-2 leading-tight"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Legal desde el diseño,{" "}
            <em className="not-italic text-ink-muted">no desde el marketing</em>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {trustItems.map((item, i) => (
            <div key={i} className="flex gap-4 p-6 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-ink/5 text-ink-muted flex items-center justify-center flex-shrink-0 group-hover:bg-ink/8 transition-colors">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Legal note */}
        <div className="flex flex-col sm:flex-row items-start gap-5 p-6 rounded-xl border border-gray-200">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-ink flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          </div>
          <div>
            <p className="font-medium text-ink mb-1">
              Alerta automática: registro en la Inspección del Trabajo
            </p>
            <p className="text-sm text-ink-muted leading-relaxed">
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
