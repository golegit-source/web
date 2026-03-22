"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/config";
import CtaButton from "@/components/CtaButton";

// ─────────────────────────────────────────────────────────────
// CONSTANTES LEGALES — actualizar cuando cambien
// ─────────────────────────────────────────────────────────────
const IMM = 530_000;
const TOPE_IMPONIBLE = 3_300_000;

const AFPS = [
  { nombre: "AFP Capital",   comision: 1.44 },
  { nombre: "AFP Cuprum",    comision: 1.44 },
  { nombre: "AFP Habitat",   comision: 1.27 },
  { nombre: "AFP Modelo",    comision: 0.58 },
  { nombre: "AFP PlanVital", comision: 1.16 },
  { nombre: "AFP ProVida",   comision: 1.45 },
  { nombre: "AFP Uno",       comision: 0.49 },
];

const TASAS_EMP = {
  sis:          0.0154,
  afcTcp:       0.0300,
  mutual:       0.0093,
  cotAdicional: 0.0100,
  indemnizacion: 0.0111,
};

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
const clp = (n: number) => "$" + Math.round(n).toLocaleString("es-CL");
const pct = (n: number) => (n * 100).toFixed(2).replace(".", ",") + "%";

// ─────────────────────────────────────────────────────────────
// COMPONENTES — definidos FUERA del componente página para evitar
// que React los destruya y recree en cada render (bug input focus)
// ─────────────────────────────────────────────────────────────
const inputCls =
  "w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all";
const labelCls = "block text-xs font-medium text-ink-muted mb-1.5";

function MoneyInput({
  value, onChange, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
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
// CÁLCULO — desde sueldo base hacia líquido
// ─────────────────────────────────────────────────────────────
function calcDesdeBase({
  sueldoBase, movilizacion, colacion, afpIdx, dias,
}: {
  sueldoBase: number; movilizacion: number; colacion: number;
  afpIdx: number; dias: number;
}) {
  const f = dias / 30;
  const topeAplicado = sueldoBase > TOPE_IMPONIBLE;
  const sueldoImponible = Math.round(Math.min(sueldoBase, TOPE_IMPONIBLE) * f);
  const movilizacionProp = Math.round(movilizacion * f);
  const colacionProp = Math.round(colacion * f);
  const bruto = sueldoImponible + movilizacionProp + colacionProp;

  const afp = AFPS[afpIdx];
  const tasaAfp = 10 + afp.comision;
  const descAfp   = Math.round((sueldoImponible * tasaAfp) / 100);
  const descSalud = Math.round(sueldoImponible * 0.07);
  const totalDesc = descAfp + descSalud;
  const liquido   = bruto - totalDesc;

  const sis          = Math.round(sueldoImponible * TASAS_EMP.sis);
  const afcTcp       = Math.round(sueldoImponible * TASAS_EMP.afcTcp);
  const mutual       = Math.round(sueldoImponible * TASAS_EMP.mutual);
  const cotAdicional = Math.round(sueldoImponible * TASAS_EMP.cotAdicional);
  const indem        = Math.round(sueldoImponible * TASAS_EMP.indemnizacion);
  const totalEmp     = sis + afcTcp + mutual + cotAdicional + indem;

  return {
    sueldoImponible, movilizacionProp, colacionProp, bruto,
    descAfp, tasaAfp, descSalud, totalDesc, liquido,
    sis, afcTcp, mutual, cotAdicional, indem, totalEmp,
    costoTotal: bruto + totalEmp,
    afpNombre: afp.nombre, topeAplicado,
  };
}

// ─────────────────────────────────────────────────────────────
// CÁLCULO INVERSO — desde líquido pactado hacia sueldo base
//
// El líquido pactado INCLUYE movilización y colación (no imponibles).
// Por tanto:
//   liquido = sueldoImponible × (1 − tasaTotal) + mov + col
//   sueldoImponible = (liquido − mov − col) / (1 − tasaTotal)
// ─────────────────────────────────────────────────────────────
function calcDesdeLiquido({
  liquidoPactado, movilizacion, colacion, afpIdx, dias,
}: {
  liquidoPactado: number; movilizacion: number; colacion: number;
  afpIdx: number; dias: number;
}) {
  const f = dias / 30;
  const afp = AFPS[afpIdx];
  const tasaAfp = 10 + afp.comision;
  const tasaTotal = tasaAfp / 100 + 0.07; // AFP + Fonasa

  // Despejar imponible mensual desde el líquido proporcional
  const movilizacionProp = Math.round(movilizacion * f);
  const colacionProp = Math.round(colacion * f);
  const baseNetoSinHab = liquidoPactado - movilizacionProp - colacionProp;
  const sueldoImponible = Math.round(baseNetoSinHab / (1 - tasaTotal));

  // Sueldo base mensual (sin proporcionar)
  const sueldoBaseMensual = dias < 30 ? Math.round(sueldoImponible / f) : sueldoImponible;
  const topeAplicado = sueldoBaseMensual > TOPE_IMPONIBLE;

  const bruto = sueldoImponible + movilizacionProp + colacionProp;
  const descAfp   = Math.round((sueldoImponible * tasaAfp) / 100);
  const descSalud = Math.round(sueldoImponible * 0.07);
  const totalDesc = descAfp + descSalud;
  const liquidoReal = bruto - totalDesc;

  const sis          = Math.round(sueldoImponible * TASAS_EMP.sis);
  const afcTcp       = Math.round(sueldoImponible * TASAS_EMP.afcTcp);
  const mutual       = Math.round(sueldoImponible * TASAS_EMP.mutual);
  const cotAdicional = Math.round(sueldoImponible * TASAS_EMP.cotAdicional);
  const indem        = Math.round(sueldoImponible * TASAS_EMP.indemnizacion);
  const totalEmp     = sis + afcTcp + mutual + cotAdicional + indem;

  return {
    sueldoBaseMensual, sueldoImponible, movilizacionProp, colacionProp, bruto,
    descAfp, tasaAfp, descSalud, totalDesc, liquidoReal,
    sis, afcTcp, mutual, cotAdicional, indem, totalEmp,
    costoTotal: bruto + totalEmp,
    afpNombre: afp.nombre, topeAplicado,
  };
}

// ─────────────────────────────────────────────────────────────
// PÁGINA
// ─────────────────────────────────────────────────────────────
export default function LiquidacionPage() {
  const [modo, setModo] = useState<"base" | "liquido">("base");

  // Modo base → líquido
  const [sueldoRaw,       setSueldoRaw]       = useState("700000");
  // Modo líquido → base
  const [liquidoRaw,      setLiquidoRaw]      = useState("600000");

  // Compartidos
  const [movilizacionRaw, setMovilizacionRaw] = useState("30000");
  const [colacionRaw,     setColacionRaw]     = useState("0");
  const [afpIdx,          setAfpIdx]          = useState(2); // Habitat
  const [dias,            setDias]            = useState(30);

  const sueldoBase  = Math.max(0, parseInt(sueldoRaw.replace(/\D/g, ""))         || 0);
  const liquidoPact = Math.max(0, parseInt(liquidoRaw.replace(/\D/g, ""))        || 0);
  const movilizacion = Math.max(0, parseInt(movilizacionRaw.replace(/\D/g, "")) || 0);
  const colacion     = Math.max(0, parseInt(colacionRaw.replace(/\D/g, ""))      || 0);

  const rBase = useMemo(
    () => calcDesdeBase({ sueldoBase, movilizacion, colacion, afpIdx, dias }),
    [sueldoBase, movilizacion, colacion, afpIdx, dias]
  );

  const rLiq = useMemo(
    () => calcDesdeLiquido({ liquidoPactado: liquidoPact, movilizacion, colacion, afpIdx, dias }),
    [liquidoPact, movilizacion, colacion, afpIdx, dias]
  );

  const r = modo === "base" ? null : null; // usamos rBase / rLiq directamente

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
            Sueldo líquido, descuentos legales y aportes del empleador a Previred. Resultado en tiempo real.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 pb-24">

        {/* Selector de modo */}
        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-6 w-fit">
          {([
            { key: "base",    label: "Desde sueldo base" },
            { key: "liquido", label: "Desde líquido pactado" },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setModo(key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                modo === key
                  ? "bg-white text-ink shadow-sm"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">

          {/* ── Inputs ── */}
          <div className="space-y-5">

            {/* Remuneración */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-semibold text-ink mb-4">
                {modo === "base" ? "Remuneración" : "Liquidación objetivo"}
              </p>
              <div className="space-y-4">

                {modo === "base" ? (
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
                ) : (
                  <div>
                    <label className={labelCls}>Líquido a pagar</label>
                    <MoneyInput value={liquidoRaw} onChange={setLiquidoRaw} placeholder="600000" />
                    <p className="text-xs text-ink-light mt-1.5 leading-relaxed bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                      Ingresa el monto total que recibirá la trabajadora, <strong>incluyendo</strong> movilización y colación. El sistema descontará esos haberes antes de calcular el imponible.
                    </p>
                  </div>
                )}

                <div className="h-px bg-gray-100" />
                <p className="text-xs font-medium text-ink-muted">
                  Haberes no imponibles{" "}
                  <span className="font-normal text-ink-light">
                    {modo === "liquido" ? "— incluidos en el líquido pactado" : ""}
                  </span>
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Movilización</label>
                    <MoneyInput value={movilizacionRaw} onChange={setMovilizacionRaw} placeholder="0" />
                  </div>
                  <div>
                    <label className={labelCls}>Colación</label>
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
                type="range" min={1} max={30} value={dias}
                onChange={(e) => setDias(Number(e.target.value))}
                className="w-full accent-brand-600"
              />
              <div className="flex justify-between text-xs text-ink-light mt-1">
                <span>1 día</span>
                <span className="font-medium text-brand-600">
                  {dias === 30 ? "Mes completo" : `${dias} días (${Math.round((dias / 30) * 100)}%)`}
                </span>
                <span>30 días</span>
              </div>
            </div>

            <p className="text-xs text-ink-light leading-relaxed px-1">
              Valores referenciales. IMM: {clp(IMM)} · Tope imponible: {clp(TOPE_IMPONIBLE)}.
              Tasas Previred vigentes a marzo 2026 — verificar antes de emitir liquidaciones oficiales.
            </p>
          </div>

          {/* ── Resultados sticky ── */}
          <div className="lg:sticky lg:top-24 space-y-3">

            {modo === "liquido" && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="text-xs font-semibold text-amber-800 mb-1">Sueldo base requerido</p>
                <p className="text-2xl font-light text-amber-900" style={{ fontFamily: "var(--font-fraunces)" }}>
                  {clp(rLiq.sueldoBaseMensual)}
                  <span className="text-sm font-normal text-amber-700 ml-2">/mes</span>
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Este es el imponible mensual a pactar en el contrato
                  {rLiq.topeAplicado && " — supera el tope imponible"}
                </p>
              </div>
            )}

            {/* Haberes */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-[11px] font-semibold text-ink-light uppercase tracking-widest mb-4">Haberes</p>
              <div className="space-y-3">
                {modo === "base" ? (
                  <Row label="Sueldo base (imponible)" value={clp(rBase.sueldoImponible)}
                    sub={rBase.topeAplicado ? `Tope legal aplicado (${clp(TOPE_IMPONIBLE)}/mes)` : undefined} />
                ) : (
                  <Row label="Sueldo imponible (proporcional)" value={clp(rLiq.sueldoImponible)}
                    sub={rLiq.topeAplicado ? `Supera tope (${clp(TOPE_IMPONIBLE)}/mes)` : undefined} />
                )}
                {(modo === "base" ? rBase.movilizacionProp : rLiq.movilizacionProp) > 0 && (
                  <Row label="Movilización" value={clp(modo === "base" ? rBase.movilizacionProp : rLiq.movilizacionProp)} muted />
                )}
                {(modo === "base" ? rBase.colacionProp : rLiq.colacionProp) > 0 && (
                  <Row label="Colación" value={clp(modo === "base" ? rBase.colacionProp : rLiq.colacionProp)} muted />
                )}
                <div className="h-px bg-gray-100" />
                <Row label="Sueldo bruto" value={clp(modo === "base" ? rBase.bruto : rLiq.bruto)} bold />
              </div>
            </div>

            {/* Descuentos */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-[11px] font-semibold text-ink-light uppercase tracking-widest mb-4">
                Descuentos del trabajador
              </p>
              <div className="space-y-3">
                {(() => {
                  const x = modo === "base" ? rBase : rLiq;
                  return (
                    <>
                      <Row label={`${x.afpNombre} (${x.tasaAfp.toFixed(2)}%)`} value={`−${clp(x.descAfp)}`} negative />
                      <Row label="Fonasa (7%)" value={`−${clp(x.descSalud)}`} negative />
                      <div className="h-px bg-gray-100" />
                      <Row label="Total descuentos" value={`−${clp(x.totalDesc)}`} bold negative />
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Sueldo líquido */}
            <div className="bg-brand-600 rounded-2xl p-6 text-white">
              <p className="text-[11px] font-semibold text-brand-200 uppercase tracking-widest mb-2">
                Sueldo líquido
              </p>
              <p className="text-5xl font-light text-white mb-1" style={{ fontFamily: "var(--font-fraunces)" }}>
                {clp(modo === "base" ? rBase.liquido : rLiq.liquidoReal)}
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
              {(() => {
                const x = modo === "base" ? rBase : rLiq;
                return (
                  <div className="space-y-3">
                    <Row label={`SIS — Seg. Invalidez y Sobrevivencia (${pct(TASAS_EMP.sis)})`}       value={clp(x.sis)} />
                    <Row label={`AFC Seg. Cesantía TCP (${pct(TASAS_EMP.afcTcp)}: 2,2%+0,8%)`}        value={clp(x.afcTcp)} />
                    <Row label={`Mutual Acc. Trabajo y Enf. Prof. (${pct(TASAS_EMP.mutual)})`}         value={clp(x.mutual)} />
                    <Row label={`Cot. adicional empleador (${pct(TASAS_EMP.cotAdicional)}: 0,9%+0,1%)`} value={clp(x.cotAdicional)} />
                    <Row label={`Indem. a todo evento TCP (${pct(TASAS_EMP.indemnizacion)} — AFC Chile)`} value={clp(x.indem)} />
                    <div className="h-px bg-gray-100" />
                    <Row label="Total aportes empleador" value={clp(x.totalEmp)} bold />
                  </div>
                );
              })()}
            </div>

            {/* Costo total */}
            <div className="border-2 border-brand-200 bg-brand-50 rounded-2xl p-5">
              <p className="text-[11px] font-semibold text-brand-600 uppercase tracking-widest mb-2">
                Costo total de la relación laboral
              </p>
              <p className="text-3xl font-light text-brand-800" style={{ fontFamily: "var(--font-fraunces)" }}>
                {clp(modo === "base" ? rBase.costoTotal : rLiq.costoTotal)}
              </p>
              <p className="text-xs text-brand-600 mt-1">Sueldo bruto + aportes empleador</p>
            </div>

            {/* CTA */}
            <CtaButton className="flex items-center justify-center gap-2.5 bg-ink text-white text-sm font-medium py-3.5 px-6 rounded-2xl hover:bg-ink-soft transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              GoLegit lo hace automáticamente cada mes
            </CtaButton>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
