"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { Post } from "@/lib/notion";

// ── Utilidades definidas aquí (no pueden pasarse como props desde Server Component) ──

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

function CoverPlaceholder({ categoria }: { categoria: string }) {
  const colors: Record<string, string> = {
    Laboral: "#3b82f6", Remuneraciones: "#16a34a",
    Contratos: "#9333ea", Previsión: "#f59e0b",
    General: "#6b7280", Novedades: "#16a34a",
  };
  const color = colors[categoria] ?? "#16a34a";
  return (
    <div className="w-full h-full flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)` }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
      </svg>
    </div>
  );
}

// ── Componente principal ──

interface Props {
  posts: Post[];
  categorias: string[];
  categoriaActiva: string;
}

export default function NovedadesClient({ posts, categorias, categoriaActiva }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function setCategoria(cat: string) {
    const url = cat === "Todas" ? pathname : `${pathname}?cat=${encodeURIComponent(cat)}`;
    router.push(url);
  }

  return (
    <>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              categoriaActiva === cat
                ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                : "bg-white text-ink-muted border-gray-200 hover:border-gray-300 hover:text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de cards */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-ink-muted">No hay publicaciones en esta categoría todavía.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/novedades/${post.slug}`}
              className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-brand-300 hover:shadow-lg hover:shadow-brand-600/6 transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Imagen */}
              <div className="h-44 overflow-hidden bg-gray-50 flex-shrink-0">
                {post.portada ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.portada}
                    alt={post.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <CoverPlaceholder categoria={post.categoria} />
                )}
              </div>

              {/* Contenido */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${categoriaColor(post.categoria)}`}>
                    {post.categoria}
                  </span>
                  {post.fecha && (
                    <span className="text-[11px] text-ink-light">{formatFecha(post.fecha)}</span>
                  )}
                </div>

                <h2 className="text-sm font-semibold text-ink leading-snug mb-2 line-clamp-2 group-hover:text-brand-700 transition-colors">
                  {post.titulo}
                </h2>

                {post.resumen && (
                  <p className="text-xs text-ink-muted leading-relaxed line-clamp-3 flex-1">
                    {post.resumen}
                  </p>
                )}

                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-700 group-hover:gap-2 transition-all">
                  Leer más
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
