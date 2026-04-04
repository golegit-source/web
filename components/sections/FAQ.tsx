"use client";

import { useState } from "react";
import CtaButton from "@/components/CtaButton";

const faqs = [
  {
    q: "¿Necesito instalar alguna app?",
    a: "No. GoLegit opera completamente por WhatsApp. Si ya tienes WhatsApp instalado, ya tienes todo lo que necesitas para empezar.",
  },
  {
    q: "¿El contrato que genera GoLegit es legalmente válido?",
    a: "Sí. Las plantillas fueron diseñadas por un abogado y cumplen con la Ley 20.786 y el Código del Trabajo chileno. Incluyen las cláusulas obligatorias para trabajo de casa particular, con variantes específicas para puertas adentro y puertas afuera.",
  },
  {
    q: "¿Y si mi trabajadora ya tiene contrato de antes?",
    a: "GoLegit lo maneja. Puedes ingresar la relación laboral existente — incluyendo la fecha real de inicio — y el sistema genera un Anexo de Texto Refundido que actualiza y formaliza todo. La antigüedad para indemnizaciones se calcula desde la fecha de inicio real.",
  },
  {
    q: "¿Cómo le llega el contrato a mi trabajadora?",
    a: "El sistema le envía el PDF por WhatsApp y por email directamente a ella. No pasa por ti — queda registro de que lo recibió.",
  },
  {
    q: "¿Puedo calcular la liquidación aunque no sepa de cotizaciones?",
    a: "Sí. GoLegit aplica automáticamente las tasas vigentes de AFP, Isapre, AFC, cotización adicional y los aportes del empleador. Tú solo confirmas los días trabajados si hubo ausencias.",
  },
  {
    q: "¿Qué pasa si un mes no pago?",
    a: "Tu cuenta queda en modo lectura — puedes consultar documentos anteriores, pero no generar nuevos. Se reactiva apenas regularizas el pago.",
  },
  {
    q: "¿Puedo modificar el contrato después?",
    a: "Sí. Cualquier modificación se hace a través de un Anexo de Modificación, que es el mecanismo legal correcto. El contrato original no se toca y el historial queda completo.",
  },
  {
    q: "¿Cómo se identifica mi trabajadora en el sistema?",
    a: "Mediante su número de WhatsApp. Al registrarla, el sistema le envía una notificación directa. Si tiene más de un empleador, elige con cuál interactuar al inicio de cada conversación.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-ink text-sm leading-snug">{q}</span>
        <div
          className={`w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform ${
            open ? "rotate-180 bg-ink border-ink" : ""
          }`}
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke={open ? "white" : "currentColor"} strokeWidth="1.5">
            <path d="M2 4l4 4 4-4" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="pb-5 pr-8">
          <p className="text-sm text-ink-muted leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[#fafaf8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold tracking-widest text-ink-light uppercase mb-5">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-ink leading-tight tracking-tight mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              ¿Tienes otra pregunta?{" "}
              <CtaButton className="text-brand-600 hover:text-brand-700 font-semibold underline underline-offset-2">
                Escríbenos por WhatsApp
              </CtaButton>{" "}
              y te respondemos.
            </p>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 px-6">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
