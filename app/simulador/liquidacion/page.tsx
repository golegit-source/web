"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/config";

// ─────────────────────────────────────────────────────────────
// CONSTANTES LEGALES — actualizar cuando cambien
// ─────────────────────────────────────────────────────────────
const IMM = 530_000;           // Ingreso Mínimo Mensual — verificar en previred.com
const TOPE_IMPONIBLE = 3_300_000; // ~81.6 UF × UF vigente — verificar en previred.com

const AFPS = [
  { nombre: "AFP Capital",   comision: 1.44 },
  { nombre: "AFP Cuprum",    comision: 1.44 },
  { nombre: "AFP Habitat",   comision: 1.27 },
  { nombre: "AFP Modelo",    comision: 0.58 },
  { nombre: "AFP PlanVital", comision: 1.16 },
  { nombre: "AFP ProVida",   comision: 1.45 },
  { nombre: "AFP Uno",       comision: 0.49 },
];

// Tasas de cargo del empleador TCP (Previred)
const TASAS_EMP = {
  sis:         0.0154,  // Seguro Invalidez y Sobrevivencia
  afcTcp:      0.0300,  // AFC Seguro Cesantía TCP (2,2% empleador + 0,8% trabajador → Previred)
  mutual:      0.0093,  // Mutual Acc. Trabajo y Enf. Profesionales
  cotAdicional: 0.0100, // Cotización adicional empleador (0,9% + 0,1%)
  indemnizacion: 0.0111,// Indemnización a todo evento TCP (AFC Chile)
};

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
const clp = (n: number) => "$" + Math.round(n).toLocaleString("es-CL");
const pct = (n: number) => (n * 100).toFixed(2).replace(".", ",") + "%";

// ─────────────────────────────────────────────────────────────
// CÁLCULO LIQUIDACIÓN — Contrato de Trabajo TCP
//
// Descuentos trabajador: AFP (10% + comisión) + Fonasa (7%)
//   Solo sobre la base imponible. Los haberes no imponibles NO se descuentan.
//
// Aportes empleador a Previred (no descuentan al trabajador):
//   SIS 1,54% · AFC TCP 3% · Mutual 0,93% · Cot. adic. 1% · Indem. 1,11%
// ─────────────────────────────────────────────────────────────
function calcLiq({
  sueldoBase,
  movilizacion,
  colacionAlimentaria,
  afpIdx,
  dias,
}: {
  sueldoBase: number;
  movilizacion: number;
  colacionAlimentaria: number;
  afpIdx: number;
  dias: number;
}) {
  const f = dias / 30;

  const baseImponibleMensual = Math.min(sueldoBase, TOPE_IMPONIBLE);
  const topeAplicado = sueldoBase > TOPE_IMPONIBLE;
  const sueldoImponible = Math.round(baseImponibleMensual * f);

  const habNoProp = Math.round((movilizacion + colacionAlimentaria) * f);
  const movilizacionProp = Math.round(movilizacion * f);
  const colacionProp = Math.round(colacionAlimentaria * f);

  // Sueldo bruto: imponible + no imponibles
  const bruto = sueldoImponible + habNoProp;

  // ── Descuentos del trabajador ──────────────────────────────
  const afp = AFPS[afpIdx];
  const tasaAfp = 10 + afp.comision;
  const descAfp   = Math.round((sueldoImponible * tasaAfp) / 100);
  const descSalud = Math.round(sueldoImponible * 0.07);
  const totalDesc = descAfp + descSalud;
  const liquido   = bruto - totalDesc;

  // ── Aportes del empleador a Previred ──────────────────────
  const sis          = Math.round(sueldoImponible * TASAS_EMP.sis);
  const afcTcp       = Math.round(sueldoImponible * TASAS_EMP.afcTcp);
  const mutual       = Math.round(sueldoImponible * TASAS_EMP.mutual);
  const cotAdicional = Math.round(sueldoImponible * TASAS_EMP.cotAdicional);
  const indem        = Math.round(sueldoImponible * TASAS_EMP.indemnizacion);
  const totalEmp     = sis + afcTcp + mutual + cotAdicional + indem;
  const costoTotal   = bruto + totalEmp;

  return {
    sueldoImponible,
    movilizacionProp,
    colacionProp,
    habNoProp,
    bruto,
    descAfp,
    tasaAfp,
    descSalud,
    totalDesc,
    liquido,
    sis,
    afcTcp,
    mutual,
    cotAdicional,
    indem,
    totalEmp,
    costoTotal,
    afpNombre: afp.nombre,
    topeAplicado,
  };
}

// ─────────────────────────────────────────────────────────────
// COMPONENTES AUXILIARES
// ─────────────────────────────────────────────────────────────
function Row({
  label, value, negative, bold, muted, sub,
}: {
  label: string; value: string;
  negative?: boolean; bold?: boolean; muted?: boolean; sub?: string;
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

// ─────────────────────────────────────────────────────────────
// PÁGINA
// ─────────────────────────────────────────────────────────────
export default function LiquidacionPage() {
  // Defaults → líquido ≈ $602.000 (Habitat + Fonasa, mes completo)
  const [sueldoRaw,      setSueldoRaw]      = useState("700000");
  const [movilizacionRaw, setMovilizacionRaw] = useState("30000");
  const [colacionRaw,    setColacionRaw]    = useState("0");
  const [afpIdx,         setAfpIdx]         = useState(2); // Habitat
  const [dias,           setDias]           = useState(30);

  const sueldoBase         = Math.max(0, parseInt(sueldoRaw.replace(/\D/g, ""))         || 0);
  const movilizacion       = Math.max(0, parseInt(movilizacionRaw.replace(/\D/g, ""))   || 0);
  const colacionAlimentaria = Math.max(0, parseInt(colacionRaw.replace(/\D/g, ""))      || 0);

  const r = useMemo(
    () => calcLiq({ sueldoBase, movilizacion, colacionAlimentaria, afpIdx, dias }),
    [sueldoBase, movilizacion, colacionAlimentaria, afpIdx, dias]
  );

  const inputCls =
    "w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all";
  const labelCls = "block text-xs font-medium text-ink-muted mb-1.5";

  function MoneyInput({
    value, onChange, placeholder,
  }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
    return (
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink-light select-none">$</span>
        <input
          type="text"
          inputMode="numeric"
          className={inputCls + " pl-7"}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
          placeholder={placeholder ?? "0"}
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />

      {/* Header */}
      <div className="relative pt-28 pb-10 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse 60% 60% at 10% 60%, rgba(187,247,208,0.28) 0%, transparent 60%)`,
        }} />
        <div className="relative max-w-5xl mx-auto px-6">
          <Link href="/simulador" className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink transition-colors mb-8">
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
          <h1 className="text-3xl lg:text-4xl font-light text-ink leading-tight mb-3" style={{ fontFamily: "var(--font-fraunces)" }}>
            Liquidación de sueldo
          </h1>
          <p className="text-ink-muted leading-relaxed max-w-xl">
            Sueldo líquido, descuentos legales y aportes del empleador a Previred.
            Resultado en tiempo real.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">

          {/* ── Inputs ── */}
          <div className="space-y-5">

            {/* Remuneración */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-semibold text-ink mb-4">Remuneración</p>
              <div className="space-y-4">

                <div>
                  <label className={labelCls}>Sueldo base (imponible)</label>
                  <MoneyInput value={sueldoRaw} onChange={setSueldoRaw} placeholder="700000" />
                  {sueldoBase > 0 && sueldoBase < IMM && (
                    <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1.5">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
                      Por debajo del IMM ({clp(IMM)})
                    </p>
                  )}
                </div>

                <div className="h-px bg-gray-100" />
                <p className="text-xs font-medium text-ink-muted">Haberes no imponibles</p>
                <p className="text-[11px] text-ink-light -mt-2 leading-relaxed">
                  No afectan las cotizaciones. Se suman al bruto sin generar descuentos.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Movilización</label>
                    <MoneyInput value={movilizacionRaw} onChange={setMovilizacionRaw} placeholder="0" />
                  </div>
                  <div>
                    <label className={labelCls}>Colación alimentaria</label>
                    <MoneyInput value={colacionRaw} onChange={setColacionRaw} placeholder="0" />
                  </div>
                </div>

              </div>
            </div>

            {/* AFP */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-semibold text-ink mb-4">Previsión</p>
              <div className="space-y-4">

                <div>
                  <label className={labelCls}>AFP</label>
                  <select className={inputCls} value={afpIdx} onChange={(e) => setAfpIdx(Number(e.target.value))}>
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

                <div className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-100 rounded-xl">
                  <p className="text-sm text-ink">Salud</p>
                  <span className="text-sm font-medium text-ink-muted">Fonasa — 7% del imponible</span>
                </div>

              </div>
            </div>

            {/* Período */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-ink">Días trabajados</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={dias}
                    onChange={(e) => {
                      const v = Math.min(30, Math.max(1, parseInt(e.target.value.replace(/\D/g, "")) || 1));
                      setDias(v);
                    }}
                    className="w-14 text-center bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400"
                  />
                  <span className="text-sm text-ink-muted">/ 30</span>
                </div>
              </div>
              <input
                type="range"
                min={1} max={30} value={dias}
                onChange={(e) => setDias(Number(e.target.value))}
                className="w-full accent-brand-600"
              />
              <div className="flex justify-between text-xs text-ink-light mt-1">
                <span>1 día</span>
                <span className="font-medium text-brand-600">{dias === 30 ? "Mes completo" : `${dias} días (${Math.round((dias / 30) * 100)}%)`}</span>
                <span>30 días</span>
              </div>
            </div>

            <p className="text-xs text-ink-light leading-relaxed px-1">
              Valores referenciales. IMM: {clp(IMM)} · Tope imponible: {clp(TOPE_IMPONIBLE)}.
              Tasas de Previred vigentes a marzo 2026 — verificar antes de emitir liquidaciones oficiales.
            </p>
          </div>

          {/* ── Resultados sticky ── */}
          <div className="lg:sticky lg:top-24 space-y-3">

            {/* Haberes */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-[11px] font-semibold text-ink-light uppercase tracking-widest mb-4">Haberes</p>
              <div className="space-y-3">
                <Row label="Sueldo base (imponible)" value={clp(r.sueldoImponible)}
                  sub={r.topeAplicado ? `Tope legal aplicado (${clp(TOPE_IMPONIBLE)}/mes)` : undefined} />
                {r.movilizacionProp > 0 && (
                  <Row label="Movilización" value={clp(r.movilizacionProp)} muted />
                )}
                {r.colacionProp > 0 && (
                  <Row label="Colación alimentaria" value={clp(r.colacionProp)} muted />
                )}
                <div className="h-px bg-gray-100" />
                <Row label="Sueldo bruto" value={clp(r.bruto)} bold />
              </div>
            </div>

            {/* Descuentos trabajador */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-[11px] font-semibold text-ink-light uppercase tracking-widest mb-4">
                Descuentos del trabajador
              </p>
              <div className="space-y-3">
                <Row label={`${r.afpNombre} (${r.tasaAfp.toFixed(2)}%)`} value={`−${clp(r.descAfp)}`} negative />
                <Row label="Fonasa (7%)" value={`−${clp(r.descSalud)}`} negative />
                <div className="h-px bg-gray-100" />
                <Row label="Total descuentos" value={`−${clp(r.totalDesc)}`} bold negative />
              </div>
            </div>

            {/* Sueldo líquido */}
            <div className="bg-brand-600 rounded-2xl p-6 text-white">
              <p className="text-[11px] font-semibold text-brand-200 uppercase tracking-widest mb-2">
                Sueldo líquido
              </p>
              <p className="text-5xl font-light text-white mb-1" style={{ fontFamily: "var(--font-fraunces)" }}>
                {clp(r.liquido)}
              </p>
              <p className="text-sm text-brand-200">Lo que recibe la trabajadora</p>
            </div>

            {/* Aportes empleador */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-[11px] font-semibold text-ink-light uppercase tracking-widest mb-1">
                Aportes del empleador — Previred
              </p>
              <p className="text-[11px] text-ink-light mb-4 leading-relaxed">
                Pagados directamente por el empleador. No se descuentan del sueldo de la trabajadora.
              </p>
              <div className="space-y-3">
                <Row label={`SIS — Seg. Invalidez y Sobrevivencia (${pct(TASAS_EMP.sis)})`}      value={clp(r.sis)} />
                <Row label={`AFC Seg. Cesantía TCP (${pct(TASAS_EMP.afcTcp)}: 2,2% + 0,8%)`}     value={clp(r.afcTcp)} />
                <Row label={`Mutual Acc. Trabajo y Enf. Prof. (${pct(TASAS_EMP.mutual)})`}        value={clp(r.mutual)} />
                <Row label={`Cot. adicional empleador (${pct(TASAS_EMP.cotAdicional)}: 0,9%+0,1%)`} value={clp(r.cotAdicional)} />
                <Row label={`Indem. a todo evento TCP (${pct(TASAS_EMP.indemnizacion)} — AFC Chile)`} value={clp(r.indem)} />
                <div className="h-px bg-gray-100" />
                <Row label="Total aportes empleador" value={clp(r.totalEmp)} bold />
              </div>
            </div>

            {/* Costo total */}
            <div className="border-2 border-brand-200 bg-brand-50 rounded-2xl p-5">
              <p className="text-[11px] font-semibold text-brand-600 uppercase tracking-widest mb-2">
                Costo total de la relación laboral
              </p>
              <p className="text-3xl font-light text-brand-800" style={{ fontFamily: "var(--font-fraunces)" }}>
                {clp(r.costoTotal)}
              </p>
              <p className="text-xs text-brand-600 mt-1">Sueldo bruto + aportes empleador</p>
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
