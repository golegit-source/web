"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/config";

// ─────────────────────────────────────────────────────────────
// CONSTANTES LEGALES — actualizar cuando cambien los valores
// ─────────────────────────────────────────────────────────────
const IMM = 530_000; // Ingreso Mínimo Mensual (estimado 2025 — verificar)
const TOPE_IMPONIBLE = 3_300_000; // ~81.6 UF × ~$40,441 (verificar UF vigente)
const FECHA_42H = new Date("2026-04-26");

const AFPS = [
  { nombre: "AFP Capital", comision: 1.44 },
  { nombre: "AFP Cuprum", comision: 1.44 },
  { nombre: "AFP Habitat", comision: 1.27 },
  { nombre: "AFP Modelo", comision: 0.58 },
  { nombre: "AFP PlanVital", comision: 1.16 },
  { nombre: "AFP ProVida", comision: 1.45 },
  { nombre: "AFP Uno", comision: 0.49 },
];

const DIAS_SEMANA = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function clp(n: number) {
  return "$" + Math.round(n).toLocaleString("es-CL");
}

function timeToMinutes(t: string): number {
  if (!t) return 0;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
}

// ─────────────────────────────────────────────────────────────
// LÓGICA DE LIQUIDACIÓN
// ─────────────────────────────────────────────────────────────
interface LiqInput {
  sueldoBase: number;
  conGratificacion: boolean;
  afpIdx: number;
  salud: "fonasa" | "isapre";
  isapre: number; // monto mensual en pesos
  dias: number;
}

function calcLiquidacion(i: LiqInput) {
  const f = i.dias / 30;
  const sBase = i.sueldoBase * f;
  const gratTope = (4.75 * IMM) / 12;
  const grat = i.conGratificacion ? Math.min(i.sueldoBase * 0.25, gratTope) * f : 0;
  const bruto = sBase + grat;
  const imponible = Math.min(bruto, TOPE_IMPONIBLE);

  const afp = AFPS[i.afpIdx];
  const tasaAfp = 10 + afp.comision;
  const dAfp = (imponible * tasaAfp) / 100;
  const dSalud =
    i.salud === "fonasa"
      ? imponible * 0.07
      : Math.max(imponible * 0.07, i.isapre * f);
  const dAfc = imponible * 0.006;
  const totalDesc = dAfp + dSalud + dAfc;
  const liquido = bruto - totalDesc;

  // Costos del empleador (adicionales al bruto)
  const sis = imponible * 0.0149;
  const afcEmp = imponible * 0.024;
  const mutual = imponible * 0.0093;
  const costoExtra = sis + afcEmp + mutual;

  return {
    sBase,
    grat,
    bruto,
    imponible,
    dAfp,
    tasaAfp,
    dSalud,
    dAfc,
    totalDesc,
    liquido,
    sis,
    afcEmp,
    mutual,
    costoExtra,
    costoTotal: bruto + costoExtra,
    afpNombre: afp.nombre,
  };
}

// ─────────────────────────────────────────────────────────────
// SIMULADOR DE LIQUIDACIÓN
// ─────────────────────────────────────────────────────────────
function LiquidacionSimulador() {
  const [sueldoRaw, setSueldoRaw] = useState("520000");
  const [conGratificacion, setConGratificacion] = useState(true);
  const [afpIdx, setAfpIdx] = useState(3); // AFP Modelo por defecto
  const [salud, setSalud] = useState<"fonasa" | "isapre">("fonasa");
  const [isapreRaw, setIsapreRaw] = useState("80000");
  const [dias, setDias] = useState(30);

  const sueldoBase = Math.max(0, parseInt(sueldoRaw.replace(/\D/g, "")) || 0);
  const isapre = Math.max(0, parseInt(isapreRaw.replace(/\D/g, "")) || 0);

  const r = useMemo(
    () => calcLiquidacion({ sueldoBase, conGratificacion, afpIdx, salud, isapre, dias }),
    [sueldoBase, conGratificacion, afpIdx, salud, isapre, dias]
  );

  const inputCls =
    "w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all";
  const labelCls = "block text-xs font-medium text-ink-muted mb-1.5";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-5">
        {/* Sueldo base */}
        <div>
          <label className={labelCls}>Sueldo base bruto (mensual)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink-light font-medium">$</span>
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
            <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
              Bajo el IMM ({clp(IMM)})
            </p>
          )}
        </div>

        {/* Gratificación */}
        <div className="flex items-start gap-3 p-4 bg-brand-50 border border-brand-100 rounded-xl">
          <button
            role="switch"
            aria-checked={conGratificacion}
            onClick={() => setConGratificacion(!conGratificacion)}
            className={`relative mt-0.5 w-9 h-5 rounded-full transition-colors flex-shrink-0 ${
              conGratificacion ? "bg-brand-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                conGratificacion ? "translate-x-4" : ""
              }`}
            />
          </button>
          <div>
            <p className="text-sm font-medium text-ink">Incluir gratificación mensual</p>
            <p className="text-xs text-ink-muted mt-0.5">
              25% del sueldo base, tope {clp((4.75 * IMM) / 12)}/mes (Art. 47 CT)
            </p>
          </div>
        </div>

        {/* AFP */}
        <div>
          <label className={labelCls}>AFP</label>
          <select
            className={inputCls}
            value={afpIdx}
            onChange={(e) => setAfpIdx(Number(e.target.value))}
          >
            {AFPS.map((a, i) => (
              <option key={i} value={i}>
                {a.nombre} — comisión {a.comision}%
              </option>
            ))}
          </select>
        </div>

        {/* Salud */}
        <div>
          <label className={labelCls}>Previsión de salud</label>
          <div className="grid grid-cols-2 gap-2">
            {(["fonasa", "isapre"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSalud(s)}
                className={`py-2.5 px-4 rounded-xl text-sm font-medium border transition-all ${
                  salud === s
                    ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                    : "bg-white text-ink-muted border-gray-200 hover:border-gray-300"
                }`}
              >
                {s === "fonasa" ? "Fonasa (7%)" : "Isapre"}
              </button>
            ))}
          </div>
          {salud === "isapre" && (
            <div className="mt-2">
              <label className={labelCls}>Monto plan Isapre (mensual)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink-light font-medium">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  className={inputCls + " pl-7"}
                  value={isapreRaw}
                  onChange={(e) => setIsapreRaw(e.target.value.replace(/\D/g, ""))}
                  placeholder="80000"
                />
              </div>
            </div>
          )}
        </div>

        {/* Días */}
        <div>
          <label className={labelCls}>
            Días trabajados: <span className="text-ink font-semibold">{dias}</span>
          </label>
          <input
            type="range"
            min={1}
            max={30}
            value={dias}
            onChange={(e) => setDias(Number(e.target.value))}
            className="w-full accent-brand-600"
          />
          <div className="flex justify-between text-xs text-ink-light mt-1">
            <span>1 día</span>
            <span>30 días (mes completo)</span>
          </div>
        </div>

        <p className="text-xs text-ink-light leading-relaxed bg-gray-50 border border-gray-100 rounded-xl p-3">
          Valores estimados. No incluye semana corrida, horas extra, ni impuesto único (renta). IMM utilizado: {clp(IMM)}.
          Verificar tasas y topes vigentes en previred.com.
        </p>
      </div>

      {/* Resultados */}
      <div className="lg:sticky lg:top-24 space-y-4">
        {/* Haberes */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-ink-light uppercase tracking-wide mb-4">Haberes</p>
          <div className="space-y-2.5">
            <ResultRow label="Sueldo base" value={clp(r.sBase)} />
            {conGratificacion && (
              <ResultRow label="Gratificación mensual" value={clp(r.grat)} />
            )}
            <div className="h-px bg-gray-100 my-2" />
            <ResultRow label="Sueldo bruto" value={clp(r.bruto)} bold />
            <ResultRow
              label="Sueldo imponible"
              value={clp(r.imponible)}
              sub={r.imponible < r.bruto ? "Tope legal aplicado" : undefined}
              muted
            />
          </div>
        </div>

        {/* Descuentos */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-ink-light uppercase tracking-wide mb-4">Descuentos legales</p>
          <div className="space-y-2.5">
            <ResultRow
              label={`AFP — ${r.afpNombre} (${r.tasaAfp.toFixed(2)}%)`}
              value={`−${clp(r.dAfp)}`}
              negative
            />
            <ResultRow
              label={`Salud — ${salud === "fonasa" ? "Fonasa (7%)" : "Isapre"}`}
              value={`−${clp(r.dSalud)}`}
              negative
            />
            <ResultRow label="AFC trabajador (0.6%)" value={`−${clp(r.dAfc)}`} negative />
            <div className="h-px bg-gray-100 my-2" />
            <ResultRow label="Total descuentos" value={`−${clp(r.totalDesc)}`} bold negative />
          </div>
        </div>

        {/* Líquido */}
        <div className="bg-brand-600 rounded-2xl p-5 text-white">
          <p className="text-xs font-semibold text-brand-200 uppercase tracking-wide mb-2">Sueldo líquido a pagar</p>
          <p className="text-4xl font-light" style={{ fontFamily: "var(--font-fraunces)" }}>
            {clp(r.liquido)}
          </p>
          <p className="text-brand-200 text-sm mt-1">Lo que recibe la trabajadora</p>
        </div>

        {/* Costo empleador */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-ink-light uppercase tracking-wide mb-4">Costo adicional del empleador</p>
          <div className="space-y-2.5">
            <ResultRow label="SIS — Seguro invalidez y sobrevivencia (1.49%)" value={clp(r.sis)} />
            <ResultRow label="AFC empleador (2.4%)" value={clp(r.afcEmp)} />
            <ResultRow label="Mutual / accidentes del trabajo (0.93%)" value={clp(r.mutual)} />
            <div className="h-px bg-gray-100 my-2" />
            <ResultRow label="Costo adicional empleador" value={clp(r.costoExtra)} bold />
            <div className="h-px bg-brand-100 my-2" />
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-ink">Costo total relación laboral</span>
              <span className="text-lg font-semibold text-brand-700" style={{ fontFamily: "var(--font-fraunces)" }}>
                {clp(r.costoTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  sub,
  bold,
  negative,
  muted,
}: {
  label: string;
  value: string;
  sub?: string;
  bold?: boolean;
  negative?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <span className={`text-sm leading-snug ${muted ? "text-ink-light" : "text-ink-muted"} ${bold ? "font-semibold text-ink" : ""}`}>
          {label}
        </span>
        {sub && <p className="text-xs text-ink-light mt-0.5">{sub}</p>}
      </div>
      <span
        className={`text-sm font-medium flex-shrink-0 ${
          negative ? "text-red-600" : bold ? "text-ink" : "text-ink-muted"
        } ${bold ? "font-semibold" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SIMULADOR DE JORNADA LABORAL
// ─────────────────────────────────────────────────────────────
interface DaySchedule {
  activo: boolean;
  entrada: string;
  salida: string;
}

function JornadaSimulador() {
  const jornadaMax = new Date() < FECHA_42H ? 44 : 42;
  const diasParaCambio = Math.ceil(
    (FECHA_42H.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const proximoCambio = new Date() < FECHA_42H;

  const [colacion, setColacion] = useState<30 | 60>(60);
  const [dias, setDias] = useState<DaySchedule[]>([
    { activo: true, entrada: "08:00", salida: "17:30" },
    { activo: true, entrada: "08:00", salida: "17:30" },
    { activo: true, entrada: "08:00", salida: "17:30" },
    { activo: true, entrada: "08:00", salida: "17:30" },
    { activo: true, entrada: "08:00", salida: "17:30" },
    { activo: false, entrada: "08:00", salida: "13:00" },
  ]);

  const horasPorDia = useMemo(
    () =>
      dias.map((d) => {
        if (!d.activo || !d.entrada || !d.salida) return 0;
        const mins = timeToMinutes(d.salida) - timeToMinutes(d.entrada) - colacion;
        return Math.max(0, mins / 60);
      }),
    [dias, colacion]
  );

  const totalHoras = horasPorDia.reduce((a, b) => a + b, 0);
  const horasExtra = Math.max(0, totalHoras - jornadaMax);
  const horasExtraProximo = proximoCambio ? Math.max(0, totalHoras - 42) : null;

  function updateDia(idx: number, field: keyof DaySchedule, value: string | boolean) {
    setDias((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, [field]: value } : d))
    );
  }

  const inputCls =
    "bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        {/* Colación */}
        <div>
          <label className="block text-xs font-medium text-ink-muted mb-2">
            Tiempo de colación (no cuenta como jornada)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {([30, 60] as const).map((min) => (
              <button
                key={min}
                onClick={() => setColacion(min)}
                className={`py-2.5 px-4 rounded-xl text-sm font-medium border transition-all ${
                  colacion === min
                    ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                    : "bg-white text-ink-muted border-gray-200 hover:border-gray-300"
                }`}
              >
                {min} minutos
              </button>
            ))}
          </div>
        </div>

        {/* Horario por día */}
        <div>
          <label className="block text-xs font-medium text-ink-muted mb-3">
            Horario de la semana
          </label>
          <div className="space-y-2">
            {DIAS_SEMANA.map((nombre, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  dias[i].activo
                    ? "bg-white border-gray-200"
                    : "bg-gray-50 border-gray-100 opacity-60"
                }`}
              >
                {/* Toggle */}
                <button
                  onClick={() => updateDia(i, "activo", !dias[i].activo)}
                  className={`w-8 h-5 rounded-full transition-colors flex-shrink-0 relative ${
                    dias[i].activo ? "bg-brand-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      dias[i].activo ? "translate-x-3" : ""
                    }`}
                  />
                </button>

                {/* Nombre día */}
                <span className="text-sm font-medium text-ink w-20 flex-shrink-0">
                  {nombre}
                </span>

                {/* Horas */}
                {dias[i].activo ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="time"
                      className={inputCls + " flex-1"}
                      value={dias[i].entrada}
                      onChange={(e) => updateDia(i, "entrada", e.target.value)}
                    />
                    <span className="text-ink-light text-xs">→</span>
                    <input
                      type="time"
                      className={inputCls + " flex-1"}
                      value={dias[i].salida}
                      onChange={(e) => updateDia(i, "salida", e.target.value)}
                    />
                    <span className="text-xs text-ink-light w-10 text-right flex-shrink-0">
                      {horasPorDia[i] > 0 ? horasPorDia[i].toFixed(1) + "h" : "—"}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-ink-light">Día libre</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-ink-light leading-relaxed bg-gray-50 border border-gray-100 rounded-xl p-3">
          Ley 21.561 — Reducción gradual de jornada. Para trabajadoras de casa
          particular puertas adentro, la jornada diaria máxima es de 12 horas con
          un descanso mínimo de 2 horas (no imputables a la jornada).
        </p>
      </div>

      {/* Resultados */}
      <div className="lg:sticky lg:top-24 space-y-4">
        {/* Jornada vigente */}
        <div className={`rounded-2xl p-5 border ${horasExtra > 0 ? "bg-red-50 border-red-200" : "bg-brand-600 border-brand-600 text-white"}`}>
          <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${horasExtra > 0 ? "text-red-500" : "text-brand-200"}`}>
            Jornada esta semana
          </p>
          <div className="flex items-end gap-3">
            <p className={`text-5xl font-light ${horasExtra > 0 ? "text-ink" : "text-white"}`} style={{ fontFamily: "var(--font-fraunces)" }}>
              {totalHoras.toFixed(1)}
            </p>
            <p className={`text-lg pb-1 ${horasExtra > 0 ? "text-ink-muted" : "text-brand-200"}`}>horas</p>
          </div>
          <div className={`mt-3 flex items-center gap-2 text-sm ${horasExtra > 0 ? "text-red-600" : "text-brand-100"}`}>
            {horasExtra > 0 ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
                Excede el máximo legal en {horasExtra.toFixed(1)} horas extra
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                Dentro del máximo legal ({jornadaMax} h/semana)
              </>
            )}
          </div>
        </div>

        {/* Tabla detalle */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-ink-light uppercase tracking-wide mb-4">Detalle por día</p>
          <div className="space-y-2">
            {DIAS_SEMANA.map((nombre, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className={`text-sm ${dias[i].activo ? "text-ink-muted" : "text-ink-light"}`}>
                  {nombre}
                </span>
                <span className={`text-sm font-medium ${horasPorDia[i] > 0 ? "text-ink" : "text-ink-light"}`}>
                  {horasPorDia[i] > 0 ? `${horasPorDia[i].toFixed(1)} h` : "—"}
                </span>
              </div>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">Total semanal</span>
              <span className="text-sm font-semibold text-ink">{totalHoras.toFixed(1)} h</span>
            </div>
          </div>
        </div>

        {/* Estado legal */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
          <p className="text-xs font-semibold text-ink-light uppercase tracking-wide">Estado legal</p>

          <div className="flex items-start gap-3">
            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${horasExtra > 0 ? "bg-red-500" : "bg-brand-500"}`} />
            <div>
              <p className="text-sm font-medium text-ink">
                Máximo legal actual: {jornadaMax} h/semana
              </p>
              <p className="text-xs text-ink-muted mt-0.5">
                {horasExtra > 0
                  ? `Exceso: ${horasExtra.toFixed(1)} horas extra`
                  : `Disponible: ${(jornadaMax - totalHoras).toFixed(1)} horas`}
              </p>
            </div>
          </div>

          {proximoCambio && (
            <div className="flex items-start gap-3 pt-2 border-t border-gray-100">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${horasExtraProximo! > 0 ? "bg-amber-500" : "bg-gray-300"}`} />
              <div>
                <p className="text-sm font-medium text-ink">
                  Desde el 26 de abril de 2026: 42 h/semana
                </p>
                <p className="text-xs text-ink-muted mt-0.5">
                  {horasExtraProximo! > 0
                    ? `Con esta jornada habrá ${horasExtraProximo!.toFixed(1)} h extra`
                    : `Esta jornada estará dentro del nuevo límite`}
                  {" · "}Faltan {diasParaCambio} días
                </p>
              </div>
            </div>
          )}
        </div>

        {horasExtra > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-sm font-medium text-amber-800 mb-1">Recargo por horas extra</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              Las horas extraordinarias se pagan con un recargo mínimo del 50%
              sobre el valor hora ordinaria (Art. 32 CT). Deben ser pactadas por escrito.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PÁGINA PRINCIPAL
// ─────────────────────────────────────────────────────────────
export default function SimuladorPage() {
  const [tab, setTab] = useState<"liquidacion" | "jornada">("liquidacion");

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />

      {/* Header */}
      <div className="relative pt-28 pb-12 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 60% 60% at 15% 60%, rgba(187,247,208,0.3) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 85% 30%, rgba(209,250,229,0.2) 0%, transparent 55%)
            `,
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink transition-colors mb-6"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Volver al inicio
          </Link>
          <div className="inline-flex items-center gap-2 bg-white border border-brand-200 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full mb-5 shadow-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3M18 2l4 4-10 10H8v-4L18 2z" />
            </svg>
            Herramientas gratuitas
          </div>
          <h1
            className="text-4xl lg:text-5xl font-light text-ink leading-tight mb-4"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Simuladores{" "}
            <em className="not-italic text-brand-600">laborales</em>
          </h1>
          <p className="text-lg text-ink-muted leading-relaxed max-w-2xl">
            Calcula liquidaciones de sueldo y verifica jornadas laborales según
            la ley chilena vigente. Resultados instantáneos, sin registrarse.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-2xl p-1.5 mb-8 shadow-sm">
          {(
            [
              {
                key: "liquidacion",
                label: "Liquidación de sueldo",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                ),
              },
              {
                key: "jornada",
                label: "Jornada laboral",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
              },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                tab === t.key
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Simulador activo */}
        {tab === "liquidacion" ? <LiquidacionSimulador /> : <JornadaSimulador />}

        {/* CTA */}
        <div className="mt-16 bg-brand-950 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-semibold text-lg mb-1" style={{ fontFamily: "var(--font-fraunces)" }}>
              ¿Te resultó útil?
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              GoLegit hace estos cálculos automáticamente cada mes y genera la
              liquidación en PDF para la trabajadora y el empleador.
            </p>
          </div>
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2.5 bg-brand-500 hover:bg-brand-400 text-white font-medium px-6 py-3.5 rounded-full transition-all shadow-lg shadow-brand-600/30"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Prueba GoLegit gratis
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
