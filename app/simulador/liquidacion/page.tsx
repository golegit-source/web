"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/config";

// ─────────────────────────────────────────────────────────────
// CONSTANTES LEGALES — actualizar cuando cambien
// ─────────────────────────────────────────────────────────────
const IMM = 530_000; // Ingreso Mínimo Mensual (estimado 2025 — verificar)
const TOPE_IMPONIBLE = 3_300_000; // ~81.6 UF × UF vigente — verificar en previred.com

const AFPS = [
  { nombre: "AFP Capital", comision: 1.44 },
  { nombre: "AFP Cuprum", comision: 1.44 },
  { nombre: "AFP Habitat", comision: 1.27 },
  { nombre: "AFP Modelo", comision: 0.58 },
  { nombre: "AFP PlanVital", comision: 1.16 },
  { nombre: "AFP ProVida", comision: 1.45 },
  { nombre: "AFP Uno", comision: 0.49 },
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
const clp = (n: number) => "$" + Math.round(n).toLocaleString("es-CL");

// ─────────────────────────────────────────────────────────────
// CÁLCULO LIQUIDACIÓN
//
// Reglas:
//   - Descuentos del trabajador: AFP (10% + comisión) + Salud (7%)
//     Solo sobre la base imponible — los haberes no imponibles NO se descuentan
//   - Costo directo del empleador: SIS + AFC empleador + Mutual (sobre imponible)
//     Estos NO son descuentos del trabajador — son costos adicionales del empleador
// ─────────────────────────────────────────────────────────────
function calcLiq({
  sueldoBase,
  conGratificacion,
  habNoImponibles,
  afpIdx,
  salud,
  isapreMonto,
  dias,
}: {
  sueldoBase: number;
  conGratificacion: boolean;
  habNoImponibles: number;
  afpIdx: number;
  salud: "fonasa" | "isapre";
  isapreMonto: number;
  dias: number;
}) {
  const f = dias / 30;

  // Gratificación mensual: 25% del sueldo base, tope = 4.75 IMM / 12
  const gratTope = (4.75 * IMM) / 12;
  const gratMensual = conGratificacion ? Math.min(sueldoBase * 0.25, gratTope) : 0;

  // Base imponible mensual (antes de proporcionar)
  const baseImponibleMensual = Math.min(sueldoBase + gratMensual, TOPE_IMPONIBLE);
  const topeAplicado = sueldoBase + gratMensual > TOPE_IMPONIBLE;

  // Proporcional al período
  const sueldoImponible = Math.round(baseImponibleMensual * f);
  const gratProp = Math.round(gratMensual * f);
  const baseProp = Math.round(sueldoBase * f); // solo base sin grat
  const habNoProp = Math.round(habNoImponibles * f);

  // Sueldo bruto total (lo que percibe el trabajador antes de descuentos)
  const bruto = sueldoImponible + habNoProp;

  // ── Descuentos del trabajador ──────────────────────────────
  const afp = AFPS[afpIdx];
  const tasaAfp = 10 + afp.comision;
  const descAfp = Math.round((sueldoImponible * tasaAfp) / 100);

  const saludBase = Math.round(sueldoImponible * 0.07);
  const descSalud =
    salud === "isapre"
      ? Math.round(Math.max(saludBase, isapreMonto * f))
      : saludBase;

  const totalDesc = descAfp + descSalud;
  const liquido = bruto - totalDesc;

  // ── Costo directo del empleador (no se descuenta al trabajador) ──
  const sis = Math.round(sueldoImponible * 0.0149);      // Seguro invalidez y sobrevivencia
  const afcEmp = Math.round(sueldoImponible * 0.024);    // AFC empleador
  const mutual = Math.round(sueldoImponible * 0.0093);   // Mutual accidentes del trabajo
  const costoAdicional = sis + afcEmp + mutual;
  const costoTotal = bruto + costoAdicional;

  return {
    baseProp,
    gratProp,
    sueldoImponible,
    habNoProp,
    bruto,
    descAfp,
    tasaAfp,
    descSalud,
    totalDesc,
    liquido,
    sis,
    afcEmp,
    mutual,
    costoAdicional,
    costoTotal,
    afpNombre: afp.nombre,
    topeAplicado,
  };
}

// ─────────────────────────────────────────────────────────────
// COMPONENTES AUXILIARES
// ─────────────────────────────────────────────────────────────
function Row({
  label,
  value,
  negative,
  bold,
  muted,
  sub,
}: {
  label: string;
  value: string;
  negative?: boolean;
  bold?: boolean;
  muted?: boolean;
  sub?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 min-w-0">
      <div className="min-w-0">
        <p className={`text-sm leading-snug ${bold ? "font-semibold text-ink" : muted ? "text-ink-light" : "text-ink-muted"}`}>
          {label}
        </p>
        {sub && <p className="text-[11px] text-ink-light mt-0.5">{sub}</p>}
      </div>
      <span className={`text-sm font-medium flex-shrink-0 tabular-nums ${negative ? "text-red-600" : bold ? "text-ink" : "text-ink-muted"}`}>
        {value}
      </span>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-6 rounded-full flex-shrink-0 transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 ${
        checked ? "bg-brand-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
          checked ? "translate-x-4" : ""
        }`}
      />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// PÁGINA
// ─────────────────────────────────────────────────────────────
export default function LiquidacionPage() {
  const [sueldoRaw, setSueldoRaw] = useState("520000");
  const [conGrat, setConGrat] = useState(false);
  const [habRaw, setHabRaw] = useState("0");
  const [afpIdx, setAfpIdx] = useState(2); // Habitat
  const [salud, setSalud] = useState<"fonasa" | "isapre">("fonasa");
  const [isapreRaw, setIsapreRaw] = useState("80000");
  const [dias, setDias] = useState(30);

  const sueldoBase = Math.max(0, parseInt(sueldoRaw.replace(/\D/g, "")) || 0);
  const habNoImponibles = Math.max(0, parseInt(habRaw.replace(/\D/g, "")) || 0);
  const isapreMonto = Math.max(0, parseInt(isapreRaw.replace(/\D/g, "")) || 0);

  const r = useMemo(
    () =>
      calcLiq({
        sueldoBase,
        conGratificacion: conGrat,
        habNoImponibles,
        afpIdx,
        salud,
        isapreMonto,
        dias,
      }),
    [sueldoBase, conGrat, habNoImponibles, afpIdx, salud, isapreMonto, dias]
  );

  const inputCls =
    "w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all";
  const labelCls = "block text-xs font-medium text-ink-muted mb-1.5";

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />

      {/* Header */}
      <div className="relative pt-28 pb-10 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse 60% 60% at 10% 60%, rgba(187,247,208,0.28) 0%, transparent 60%)`,
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6">
          <Link
            href="/simulador"
            className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink transition-colors mb-8"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Volver a simuladores
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-50 border border-brand-100 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>
            <span className="text-xs font-medium text-brand-600 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full">
              Mensual · Gratis
            </span>
          </div>
          <h1
            className="text-3xl lg:text-4xl font-light text-ink leading-tight mb-3"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Liquidación de sueldo
          </h1>
          <p className="text-ink-muted leading-relaxed max-w-xl">
            Sueldo líquido, descuentos legales y costo total del empleador.
            Actualiza los campos y el resultado cambia en tiempo real.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
          {/* ── Inputs ── */}
          <div className="space-y-5">
            {/* Sueldo base */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-semibold text-ink mb-4">Remuneración</p>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Sueldo base (imponible)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink-light select-none">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      className={inputCls + " pl-7"}
                      value={sueldoRaw}
                      onChange={(e) => setSueldoRaw(e.target.value.replace(/\D/g, ""))}
                      placeholder="520000"
                    />
                  </div>
                  {sueldoBase > 0 && sueldoBase < IMM && (
                    <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1.5">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
                      Por debajo del IMM ({clp(IMM)})
                    </p>
                  )}
                </div>

                {/* Gratificación */}
                <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <Toggle checked={conGrat} onChange={setConGrat} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">Incluir gratificación mensual</p>
                    <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
                      25% del sueldo base — tope {clp((4.75 * IMM) / 12)}/mes (Art. 47 CT)
                      {conGrat && sueldoBase > 0 && (
                        <span className="text-brand-600 font-medium">
                          {" "}→ {clp(Math.min(sueldoBase * 0.25, (4.75 * IMM) / 12))}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Haberes no imponibles */}
                <div>
                  <label className={labelCls}>
                    Haberes no imponibles{" "}
                    <span className="text-ink-light font-normal">(movilización, colación, etc.)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink-light select-none">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      className={inputCls + " pl-7"}
                      value={habRaw}
                      onChange={(e) => setHabRaw(e.target.value.replace(/\D/g, ""))}
                      placeholder="0"
                    />
                  </div>
                  <p className="text-xs text-ink-light mt-1.5">
                    No están sujetos a cotizaciones. Se suman al bruto pero no afectan los descuentos.
                  </p>
                </div>
              </div>
            </div>

            {/* AFP */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-semibold text-ink mb-4">Previsión</p>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>AFP</label>
                  <select
                    className={inputCls}
                    value={afpIdx}
                    onChange={(e) => setAfpIdx(Number(e.target.value))}
                  >
                    {AFPS.map((a, i) => (
                      <option key={i} value={i}>
                        {a.nombre} — comisión {a.comision}% (total {(10 + a.comision).toFixed(2)}%)
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-ink-light mt-1.5">
                    10% cuenta individual + {AFPS[afpIdx].comision}% comisión AFP
                  </p>
                </div>

                <div>
                  <label className={labelCls}>Salud</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["fonasa", "isapre"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSalud(s)}
                        className={`py-2.5 px-4 rounded-xl text-sm font-medium border transition-all ${
                          salud === s
                            ? "bg-brand-600 text-white border-brand-600"
                            : "bg-white text-ink-muted border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {s === "fonasa" ? "Fonasa (7%)" : "Isapre"}
                      </button>
                    ))}
                  </div>
                  {salud === "isapre" && (
                    <div className="mt-3">
                      <label className={labelCls}>Monto plan Isapre (mensual)</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink-light select-none">$</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          className={inputCls + " pl-7"}
                          value={isapreRaw}
                          onChange={(e) => setIsapreRaw(e.target.value.replace(/\D/g, ""))}
                          placeholder="80000"
                        />
                      </div>
                      <p className="text-xs text-ink-light mt-1.5">
                        Se aplica el mayor entre el 7% del imponible y el monto del plan
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Días trabajados */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-baseline justify-between mb-3">
                <p className="text-sm font-semibold text-ink">Período</p>
                <span className="text-sm font-medium text-brand-700">
                  {dias === 30 ? "Mes completo" : `${dias} días`}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={dias}
                onChange={(e) => setDias(Number(e.target.value))}
                className="w-full accent-brand-600 mb-2"
              />
              <div className="flex justify-between text-xs text-ink-light">
                <span>1 día</span>
                <span>30 días</span>
              </div>
              {dias < 30 && (
                <p className="text-xs text-ink-muted mt-3 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                  Proporcional: todos los haberes se calculan como {dias}/30 del mensual.
                </p>
              )}
            </div>

            <p className="text-xs text-ink-light leading-relaxed px-1">
              Valores referenciales. IMM utilizado: {clp(IMM)} · Tope imponible: {clp(TOPE_IMPONIBLE)}.
              Verifica tasas vigentes en previred.com antes de emitir liquidaciones oficiales.
            </p>
          </div>

          {/* ── Resultados (sticky) ── */}
          <div className="lg:sticky lg:top-24 space-y-3">
            {/* Haberes */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-[11px] font-semibold text-ink-light uppercase tracking-widest mb-4">
                Haberes
              </p>
              <div className="space-y-3">
                <Row label="Sueldo base" value={clp(r.baseProp)} />
                {conGrat && <Row label="Gratificación mensual (25%)" value={clp(r.gratProp)} />}
                {habNoImponibles > 0 && (
                  <Row
                    label="Haberes no imponibles"
                    value={clp(r.habNoProp)}
                    sub="No afectan las cotizaciones"
                  />
                )}
                <div className="h-px bg-gray-100" />
                <Row label="Sueldo bruto" value={clp(r.bruto)} bold />
                <Row
                  label="Base imponible"
                  value={clp(r.sueldoImponible)}
                  muted
                  sub={r.topeAplicado ? `Tope legal aplicado (${clp(TOPE_IMPONIBLE)}/mes)` : "Sobre este valor se calculan las cotizaciones"}
                />
              </div>
            </div>

            {/* Descuentos trabajador */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-[11px] font-semibold text-ink-light uppercase tracking-widest mb-4">
                Descuentos del trabajador
              </p>
              <div className="space-y-3">
                <Row
                  label={`${r.afpNombre} (${r.tasaAfp.toFixed(2)}%)`}
                  value={`−${clp(r.descAfp)}`}
                  negative
                />
                <Row
                  label={salud === "fonasa" ? "Fonasa (7%)" : "Isapre"}
                  value={`−${clp(r.descSalud)}`}
                  negative
                />
                <div className="h-px bg-gray-100" />
                <Row label="Total descuentos" value={`−${clp(r.totalDesc)}`} bold negative />
              </div>
            </div>

            {/* Sueldo líquido — hero */}
            <div className="bg-brand-600 rounded-2xl p-6 text-white">
              <p className="text-[11px] font-semibold text-brand-200 uppercase tracking-widest mb-2">
                Sueldo líquido
              </p>
              <p
                className="text-5xl font-light text-white mb-1"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                {clp(r.liquido)}
              </p>
              <p className="text-sm text-brand-200">Lo que percibe la trabajadora</p>
            </div>

            {/* Costo empleador */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-[11px] font-semibold text-ink-light uppercase tracking-widest mb-1">
                Costo directo del empleador
              </p>
              <p className="text-xs text-ink-light mb-4 leading-snug">
                Cargas adicionales sobre el imponible, pagadas directamente por el empleador a Previred.
              </p>
              <div className="space-y-3">
                <Row label="SIS — Seguro invalidez y sobrevivencia (1,49%)" value={clp(r.sis)} />
                <Row label="AFC empleador (2,4%)" value={clp(r.afcEmp)} />
                <Row label="Mutual de seguridad (0,93%)" value={clp(r.mutual)} />
                <div className="h-px bg-gray-100" />
                <Row label="Costo adicional del empleador" value={clp(r.costoAdicional)} bold />
              </div>
            </div>

            {/* Costo total */}
            <div className="border-2 border-brand-200 bg-brand-50 rounded-2xl p-5">
              <p className="text-[11px] font-semibold text-brand-600 uppercase tracking-widest mb-2">
                Costo total de la relación laboral
              </p>
              <p
                className="text-3xl font-light text-brand-800"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                {clp(r.costoTotal)}
              </p>
              <p className="text-xs text-brand-600 mt-1">
                Sueldo bruto + cargas del empleador
              </p>
            </div>

            {/* CTA */}
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-ink text-white text-sm font-medium py-3.5 px-6 rounded-2xl hover:bg-ink-soft transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              GoLegit lo hace automáticamente cada mes
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
