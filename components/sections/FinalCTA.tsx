import { SITE_CONFIG } from "@/lib/config";
import CtaButton from "@/components/CtaButton";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, #bbf7d0 0%, transparent 50%), 
                            radial-gradient(circle at 70% 30%, #d1fae5 0%, transparent 40%)`,
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-brand-600/20">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>

        <h2
          className="text-4xl lg:text-6xl font-light text-ink mb-5 leading-tight"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Empieza hoy.
          <br />
          <em className="not-italic text-brand-600">El primer mes es gratis.</em>
        </h2>

        <p className="text-lg text-ink-muted mb-10 max-w-xl mx-auto leading-relaxed">
          Sin app, sin portal, sin contrato de permanencia. En 5 minutos puedes
          tener el contrato de tu trabajadora generado y enviado.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <CtaButton className="inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium px-8 py-4 rounded-xl transition-all shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30 hover:-translate-y-0.5 text-base">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escríbenos por WhatsApp
          </CtaButton>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="inline-flex items-center justify-center gap-2 text-ink-muted hover:text-ink font-medium px-8 py-4 rounded-xl border border-ink/10 hover:border-ink/20 transition-all bg-white/60 text-base"
          >
            Prefiero el email
          </a>
        </div>

        {/* Reassurance */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {[
            "✓ 1 mes gratis",
            "✓ Sin tarjeta de crédito",
            "✓ Sin permanencia",
            "✓ Cancela cuando quieras",
          ].map((item, i) => (
            <span key={i} className="text-xs text-ink-light">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
