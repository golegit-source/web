import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPosts, getCategories } from "@/lib/notion";
import NovedadesClient, { categoriaColor, formatFecha } from "./NovedadesClient";

export const revalidate = 3600;

export const metadata = {
  title: "Novedades — GoLegit",
  description:
    "Alertas laborales, novedades en remuneraciones y actualizaciones legales para empleadores de trabajadoras de casa particular.",
};

export default async function NovedadesPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const categoria = cat && cat !== "Todas" ? cat : undefined;

  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DB_ID) {
    return (
      <main className="min-h-screen bg-paper">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 pt-36 pb-24 text-center">
          <div className="w-16 h-16 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.8">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h1 className="text-2xl font-light text-ink mb-3" style={{ fontFamily: "var(--font-fraunces)" }}>
            CMS no configurado
          </h1>
          <p className="text-ink-muted mb-2 leading-relaxed max-w-md mx-auto">
            Agrega las variables de entorno en Vercel para conectar con Notion:
          </p>
          <code className="block bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-left max-w-sm mx-auto mb-6">
            NOTION_TOKEN=secret_...<br/>
            NOTION_DB_ID=b844dffae5ca4ee8983d5ee3d098a70b
          </code>
          <Link href="/" className="text-sm text-brand-700 hover:text-brand-800 underline">
            ← Volver al inicio
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const [posts, categorias] = await Promise.all([
    getPosts(categoria),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />

      {/* Header */}
      <section className="relative pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 55% at 5% 50%, rgba(187,247,208,0.25) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 95% 20%, rgba(209,250,229,0.18) 0%, transparent 55%)
          `,
        }} />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-white border border-brand-200 text-brand-700 text-xs font-medium px-3.5 py-1.5 rounded-full mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
            Actualizaciones legales para empleadores
          </div>
          <h1 className="text-4xl lg:text-5xl font-light text-ink leading-tight mb-4"
            style={{ fontFamily: "var(--font-fraunces)" }}>
            Novedades
          </h1>
          <p className="text-lg text-ink-muted leading-relaxed max-w-xl">
            Alertas laborales, cambios en remuneraciones y actualizaciones legales
            que te afectan como empleador.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-28">
        <NovedadesClient
          posts={posts}
          categorias={categorias}
          categoriaActiva={cat ?? "Todas"}
        />
      </section>

      <Footer />
    </main>
  );
}
