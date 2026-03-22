// Utilidades compartidas entre Server y Client Components de novedades

const CATEGORIA_COLORS: Record<string, string> = {
  Laboral:        "bg-blue-50   text-blue-700   border-blue-200",
  Remuneraciones: "bg-green-50  text-green-700  border-green-200",
  Contratos:      "bg-purple-50 text-purple-700 border-purple-200",
  Previsión:      "bg-amber-50  text-amber-700  border-amber-200",
  General:        "bg-gray-50   text-gray-600   border-gray-200",
  Novedades:      "bg-brand-50  text-brand-700  border-brand-200",
};

export function categoriaColor(cat: string) {
  return CATEGORIA_COLORS[cat] ?? "bg-gray-50 text-gray-600 border-gray-200";
}

export function formatFecha(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const meses = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  return `${parseInt(d)} ${meses[parseInt(m) - 1]} ${y}`;
}
