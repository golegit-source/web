import CtaButton from "@/components/CtaButton";

const plans = [
  {
    label: "1 trabajadora",
    price: "$9.990",
    period: "/mes",
    featured: false,
    description: "Para el empleador que tiene una trabajadora",
  },
  {
    label: "2 trabajadoras",
    price: "$17.990",
    period: "/mes",
    featured: true,
    description: "El plan más popular entre nuestros usuarios",
  },
  {
    label: "3 o más",
    price: "$7.990",
    period: "/mes por cada una",
    featured: false,
    description: "Para familias con más necesidades",
  },
];

const included = [
  "Contrato de trabajo completo",
  "Anexos de modificación ilimitados",
  "Liquidación mensual automática",
  "PDF entregado por WhatsApp y email",
  "Historial con registro probatorio",
  "Notificaciones a la trabajadora",
  "Soporte por WhatsApp",
];

export default function Pricing() {
  return (
    <section id="precios" className="py-24 bg-[#fafaf8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-widest text-ink-light uppercase mb-5">Precios</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-ink leading-tight tracking-tight mb-4">
            Menos de lo que imaginas.
          </h2>
          <p className="text-ink-muted">
            La competencia cobra $24.000/mes. GoLegit es automatizado,
            cuesta menos y funciona mejor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-6 border ${
                plan.featured
                  ? "bg-zinc-950 border-zinc-800 text-white"
                  : "bg-white border-gray-100"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Más popular
                </span>
              )}

              <p className={`text-sm font-semibold mb-5 ${plan.featured ? "text-white/40" : "text-ink-light"}`}>
                {plan.label}
              </p>

              <div className="flex items-end gap-1 mb-2">
                <span className={`text-4xl font-extrabold tracking-tight ${plan.featured ? "text-white" : "text-ink"}`}>
                  {plan.price}
                </span>
                <span className={`text-sm pb-1 ${plan.featured ? "text-white/40" : "text-ink-light"}`}>
                  {plan.period}
                </span>
              </div>

              <p className={`text-sm mb-7 ${plan.featured ? "text-white/50" : "text-ink-muted"}`}>
                {plan.description}
              </p>

              <CtaButton
                className={`block text-center text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors ${
                  plan.featured
                    ? "bg-brand-600 text-white hover:bg-brand-500"
                    : "bg-ink text-white hover:bg-ink-soft"
                }`}
              >
                Empezar gratis
              </CtaButton>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="font-bold text-ink mb-1">Todo incluido en todos los planes</h3>
              <p className="text-sm text-ink-muted mb-6">Sin costos ocultos. Sin add-ons.</p>
              <ul className="space-y-2.5">
                {included.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-ink-muted">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                      <path d="M2 6l3 3 5-5" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <div className="p-4 border border-gray-100 rounded-xl">
                <p className="text-sm font-bold text-ink mb-1">1 mes gratis para empezar</p>
                <p className="text-xs text-ink-muted">Sin tarjeta de crédito. Sin permanencia. Si no te sirve, no pagas nada.</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-xl">
                <p className="text-sm font-bold text-ink mb-1">Pago anual con 20% de descuento</p>
                <p className="text-xs text-ink-muted">Equivale a 2 meses gratis al año.</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-xl">
                <p className="text-sm font-bold text-ink mb-1">Pago vencido = solo lectura</p>
                <p className="text-xs text-ink-muted">Puedes consultar todo lo anterior, pero no generar documentos nuevos hasta regularizar.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
