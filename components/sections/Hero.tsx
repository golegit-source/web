"use client";

import { useEffect, useRef } from "react";
import { SITE_CONFIG } from "@/lib/config";

// Animated WhatsApp chat mockup
function ChatMockup() {
  return (
    <div className="relative w-full max-w-xs mx-auto">
      {/* Phone frame */}
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl border border-gray-200 overflow-hidden"
        style={{ aspectRatio: "9/17" }}>
        {/* Status bar */}
        <div className="bg-[#075e54] px-5 pt-10 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              GL
            </div>
            <div>
              <p className="text-white text-xs font-semibold">GoLegit</p>
              <p className="text-green-200 text-[10px]">en línea</p>
            </div>
          </div>
        </div>

        {/* Chat background */}
        <div className="bg-[#e5ddd5] h-full px-3 py-4 overflow-hidden flex flex-col gap-2"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>

          {/* System message */}
          <div className="text-center">
            <span className="text-[10px] bg-[#ffe082] text-amber-800 px-2 py-0.5 rounded-full">
              Hoy
            </span>
          </div>

          {/* GoLegit message */}
          <div className="self-start max-w-[80%]">
            <div className="bg-white rounded-r-xl rounded-bl-xl px-3 py-2 shadow-sm">
              <p className="text-[11px] text-gray-800 leading-snug">
                ¡Hola! Soy GoLegit 👋
              </p>
              <p className="text-[11px] text-gray-800 leading-snug mt-1">
                Vamos a crear el contrato de tu trabajadora en minutos.
              </p>
              <p className="text-[10px] text-gray-400 text-right mt-1">09:14</p>
            </div>
          </div>

          {/* User message */}
          <div className="self-end max-w-[80%]">
            <div className="bg-[#dcf8c6] rounded-l-xl rounded-br-xl px-3 py-2 shadow-sm">
              <p className="text-[11px] text-gray-800">Puertas adentro, $520.000 brutos.</p>
              <p className="text-[10px] text-gray-400 text-right mt-1">09:15 ✓✓</p>
            </div>
          </div>

          {/* GoLegit response */}
          <div className="self-start max-w-[85%]">
            <div className="bg-white rounded-r-xl rounded-bl-xl px-3 py-2 shadow-sm">
              <p className="text-[11px] text-gray-800 leading-snug">
                ✅ <strong>Contrato generado</strong>
              </p>
              <p className="text-[11px] text-gray-800 leading-snug mt-1">
                Te lo envié por email. También le llegó a Cecilia.
              </p>
              <div className="mt-2 bg-brand-50 border border-brand-200 rounded-lg p-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-gray-700">Contrato_Cecilia.pdf</p>
                  <p className="text-[9px] text-gray-400">124 KB</p>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 text-right mt-1">09:16</p>
            </div>
          </div>

          {/* Typing indicator */}
          <div className="self-start">
            <div className="bg-white rounded-full px-3 py-2 shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0ms"}}/>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "150ms"}}/>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "300ms"}}/>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-brand-100 rounded-full blur-xl opacity-60" />
      <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-brand-200 rounded-full blur-2xl opacity-40" />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-paper via-paper to-brand-50" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #bbf7d0 0%, transparent 50%), 
                            radial-gradient(circle at 80% 20%, #d1fae5 0%, transparent 40%)`,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Copy */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full mb-8 animate-fade-up">
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
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-medium px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30 hover:-translate-y-0.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Empieza gratis por WhatsApp
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 text-ink-muted hover:text-ink font-medium px-6 py-3.5 rounded-xl border border-ink/10 hover:border-ink/20 transition-all bg-white/60 backdrop-blur-sm"
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
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white"
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
        <div className="w-0.5 h-8 bg-ink/30 rounded-full" />
      </div>
    </section>
  );
}
