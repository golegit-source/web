"use client";

import { SITE_CONFIG } from "@/lib/config";
import CtaButton from "@/components/CtaButton";

function ChatMockup() {
  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      {/* Phone frame */}
      <div
        className="relative bg-[#1c1c1e] rounded-[2.8rem] shadow-2xl overflow-hidden border-4 border-[#2c2c2e]"
        style={{ aspectRatio: "9/18" }}
      >
        {/* Dynamic island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1c1c1e] rounded-full z-20" />

        {/* App header */}
        <div className="bg-brand-700 pt-12 pb-3 px-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-white/15 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            GL
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold leading-tight">GoLegit</p>
            <p className="text-brand-200 text-[10px]">en línea</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.6">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </div>

        {/* Chat area */}
        <div
          className="h-full px-3 py-3 flex flex-col gap-2.5 overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #f0fdf4 0%, #f8fafc 100%)",
          }}
        >
          {/* Date pill */}
          <div className="flex justify-center">
            <span className="text-[9px] bg-brand-100 text-brand-700 px-2.5 py-0.5 rounded-full font-medium">
              Hoy
            </span>
          </div>

          {/* GoLegit message */}
          <div className="self-start max-w-[82%]">
            <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm border border-gray-100">
              <p className="text-[11px] text-gray-800 leading-snug">
                ¡Hola! Soy GoLegit 👋
              </p>
              <p className="text-[11px] text-gray-700 leading-snug mt-1">
                Vamos a crear el contrato de tu trabajadora.
              </p>
              <p className="text-[9px] text-gray-400 text-right mt-1.5">09:14</p>
            </div>
          </div>

          {/* User message */}
          <div className="self-end max-w-[78%]">
            <div className="bg-brand-600 rounded-2xl rounded-tr-sm px-3 py-2 shadow-sm">
              <p className="text-[11px] text-white leading-snug">
                Puertas adentro, $520.000 brutos.
              </p>
              <p className="text-[9px] text-brand-200 text-right mt-1.5">09:15 ✓✓</p>
            </div>
          </div>

          {/* GoLegit response */}
          <div className="self-start max-w-[88%]">
            <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm border border-gray-100">
              <p className="text-[11px] text-gray-800 leading-snug font-medium">
                ✅ Contrato generado
              </p>
              <p className="text-[11px] text-gray-600 leading-snug mt-0.5">
                Te lo envié por email. También le llegó a Cecilia.
              </p>
              <div className="mt-2 bg-brand-50 border border-brand-100 rounded-xl p-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="#ef4444">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-gray-700">Contrato_Cecilia.pdf</p>
                  <p className="text-[9px] text-gray-400">124 KB · PDF</p>
                </div>
              </div>
              <p className="text-[9px] text-gray-400 text-right mt-1.5">09:16</p>
            </div>
          </div>

          {/* Typing indicator */}
          <div className="self-start">
            <div className="bg-white rounded-full px-3.5 py-2.5 shadow-sm border border-gray-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: "160ms" }} />
              <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: "320ms" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute -inset-4 bg-brand-400/10 rounded-[3.5rem] blur-2xl -z-10" />
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-8 bg-brand-500/20 blur-2xl -z-10" />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-paper" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 10% 40%, rgba(187,247,208,0.35) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 90% 10%, rgba(209,250,229,0.25) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 80% 80%, rgba(187,247,208,0.15) 0%, transparent 50%)
          `,
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#16a34a 1px, transparent 1px), linear-gradient(90deg, #16a34a 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Copy */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-brand-200 text-brand-700 text-xs font-medium px-3.5 py-1.5 rounded-full mb-8 shadow-sm animate-fade-up">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
            1 mes gratis · Sin tarjeta de crédito
          </div>

          {/* Headline */}
          <h1
            className="text-5xl lg:text-6xl xl:text-7xl font-light text-ink leading-[1.05] tracking-tight mb-6 animate-fade-up animate-delay-100"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            El contrato de tu{" "}
            <em className="not-italic text-brand-600">trabajadora</em>
            <br />
            por WhatsApp.
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-ink-muted leading-relaxed max-w-lg mb-8 animate-fade-up animate-delay-200">
            GoLegit genera contratos legales, calcula liquidaciones y mantiene
            el historial laboral de tu trabajadora de casa particular. Sin apps,
            sin formularios.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-up animate-delay-300">
            <CtaButton className="inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-medium px-6 py-3.5 rounded-full transition-all shadow-lg shadow-brand-600/25 hover:shadow-brand-600/35 hover:-translate-y-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Empieza gratis por WhatsApp
            </CtaButton>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 text-ink-muted hover:text-ink font-medium px-6 py-3.5 rounded-full border border-ink/10 hover:border-ink/20 transition-all bg-white/70 backdrop-blur-sm hover:-translate-y-0.5"
            >
              Ver cómo funciona
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex items-center gap-4 animate-fade-up animate-delay-400">
            <div className="flex -space-x-2">
              {["EC", "MR", "PV", "AL"].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-sm"
                  style={{
                    backgroundColor: ["#16a34a", "#0891b2", "#7c3aed", "#d97706"][i],
                  }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-ink-muted">
              Construido por y para empleadores en Chile
            </p>
          </div>
        </div>

        {/* Right: Chat mockup */}
        <div className="flex justify-center lg:justify-end animate-fade-up animate-delay-200">
          <div className="animate-float">
            <ChatMockup />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-30">
        <div className="w-0.5 h-8 bg-ink rounded-full" />
      </div>
    </section>
  );
}
