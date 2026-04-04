import { SITE_CONFIG } from "@/lib/config";
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
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-sm text-ink-light mb-4">Precios</p>
          <h2
            className="text-4xl lg:text-5xl font-light text-ink mt-2 mb-4 leading-tight"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Menos de lo que imaginas
          </h2>
          <p className="text-ink-muted">
            La competencia cobra $24.000/mes y lo hacen personas. GoLegit es
            automatizado, cuesta menos y funciona mejor.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-xl p-6 border ${
                plan.featured
                  ? "bg-ink border-ink text-white"
                  : "bg-white border-gray-100"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Más popular
                </span>
              )}

              <p
                className={`text-sm font-medium mb-5 ${
                  plan.featured ? "text-white/50" : "text-ink-light"
                }`}
              >
                {plan.label}
              </p>

              <div className="flex items-end gap-1 mb-2">
                <span
                  className={`text-4xl font-light ${
                    plan.featured ? "text-white" : "text-ink"
                  }`}
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm pb-1 ${
                    plan.featured ? "text-white/40" : "text-ink-light"
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              <p
                className={`text-sm mb-7 ${
                  plan.featured ? "text-white/60" : "text-ink-muted"
                }`}
              >
                {plan.description}
              </p>

              <CtaButton
                className={`block text-center text-sm font-medium py-2.5 px-4 rounded-lg transition-colors ${
                  plan.featured
                    ? "bg-white text-ink hover:bg-gray-100"
                    : "bg-ink text-white hover:bg-ink-soft"
                }`}
              >
                Empezar gratis
              </CtaButton>
            </div>
          ))}
        </div>

        {/* What's included */}
        <div className="bg-white rounded-xl border border-gray-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="font-semibold text-ink mb-1">Todo incluido en todos los planes</h3>
              <p className="text-sm text-ink-muted mb-6">Sin costos ocultos. Sin add-ons.</p>
              <ul className="space-y-2.5">
                {included.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-ink-muted">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <div className="p-4 border border-gray-100 rounded-lg">
                <p className="text-sm font-medium text-ink mb-1">1 mes gratis para empezar</p>
                <p className="text-xs text-ink-muted">
                  Sin tarjeta de crédito. Sin contrato de permanencia. Si no te sirve, no pagas nada.
                </p>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <p className="text-sm font-medium text-ink mb-1">Pago anual con 20% de descuento</p>
                <p className="text-xs text-ink-muted">
                  Equivale a 2 meses gratis al año.
                </p>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <p className="text-sm font-medium text-ink mb-1">Pago vencido = solo lectura</p>
                <p className="text-xs text-ink-muted">
                  Si un mes no pagas, puedes consultar todo lo anterior pero no generar documentos nuevos hasta regularizar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
