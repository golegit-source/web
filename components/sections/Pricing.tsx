"use client";

import { useState } from "react";
import CtaButton from "@/components/CtaButton";

const plans = [
  {
    label: "1 trabajadora",
    monthlyPrice: 9990,
    featured: true,
    description: "Para el empleador que tiene una trabajadora",
  },
  {
    label: "2 o más trabajadoras",
    monthlyPrice: 17990,
    featured: false,
    description: "Para familias con más de una trabajadora",
  },
];

const liteIncluded = [
  "Contrato de trabajo",
  "Anexos de modificación",
  "Finiquito",
  "PDF descargable",
];

const liteExcluded = [
  "Liquidación mensual automática",
  "Entrega por WhatsApp y email",
  "Notificaciones a la trabajadora",
  "Recordatorios de pago y vencimientos",
  "Historial con registro probatorio",
  "Soporte por WhatsApp",
];

const included = [
  "Contrato de trabajo completo",
  "Anexos de modificación ilimitados",
  "Liquidación mensual automática",
  "PDF entregado por WhatsApp y email",
  "Historial con registro probatorio",
  "Notificaciones a la trabajadora",
  "Recordatorios de pago y vencimientos",
  "Soporte por WhatsApp",
];

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

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

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 mt-8 bg-white border border-gray-200 rounded-xl p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                !annual ? "bg-ink text-white shadow-sm" : "text-ink-muted hover:text-ink"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                annual ? "bg-ink text-white shadow-sm" : "text-ink-muted hover:text-ink"
              }`}
            >
              Anual
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${annual ? "bg-brand-500 text-white" : "bg-brand-100 text-brand-700"}`}>
                −20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Plan Lite — coming soon */}
          <div className="relative rounded-2xl p-6 border border-gray-100 bg-gray-50/50 opacity-60">
            <span className="absolute top-4 right-4 text-[10px] font-semibold text-ink-light bg-gray-100 px-2 py-0.5 rounded-full">
              Próximamente
            </span>
            <p className="text-sm font-semibold text-ink-light mb-5">Lite</p>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-extrabold tracking-tight text-ink">—</span>
            </div>
            <p className="text-sm text-ink-muted mb-7">
              Solo generación de documentos legales. Sin automatización de liquidaciones.
            </p>
            <div className="block text-center text-sm font-semibold py-2.5 px-4 rounded-xl bg-gray-200 text-gray-400 cursor-not-allowed">
              Próximamente
            </div>
          </div>

          {plans.map((plan, i) => {
            const displayMonthly = annual
              ? Math.round(plan.monthlyPrice * 0.8)
              : plan.monthlyPrice;
            const annualTotal = Math.round(plan.monthlyPrice * 12 * 0.8);

            return (
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

                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-4xl font-extrabold tracking-tight ${plan.featured ? "text-white" : "text-ink"}`}>
                    {formatPrice(displayMonthly)}
                  </span>
                  <span className={`text-sm pb-1 ${plan.featured ? "text-white/40" : "text-ink-light"}`}>
                    /mes
                  </span>
                </div>

                {annual && (
                  <p className={`text-xs mb-3 ${plan.featured ? "text-brand-400" : "text-brand-600"}`}>
                    {formatPrice(annualTotal)} al año · ahorras {formatPrice(plan.monthlyPrice * 12 - annualTotal)}
                  </p>
                )}

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
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Lite features */}
          <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 opacity-70">
            <p className="text-xs font-semibold text-ink-light uppercase tracking-widest mb-4">Lite incluye</p>
            <ul className="space-y-2 mb-5">
              {liteIncluded.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-ink-muted">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                    <path d="M2 6l3 3 5-5" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs font-semibold text-ink-light uppercase tracking-widest mb-3">No incluye</p>
              <ul className="space-y-2">
                {liteExcluded.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-400">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                      <path d="M2 2l8 8M10 2l-8 8" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Full plans — spans 2 columns */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
              <div>
                <h3 className="font-bold text-ink mb-1">Todo incluido en los planes activos</h3>
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
      </div>
    </section>
  );
}
