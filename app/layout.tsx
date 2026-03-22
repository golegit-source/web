import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoLegit — Contratos y liquidaciones para trabajadoras de casa particular",
  description:
    "GoLegit genera contratos legales, calcula liquidaciones y mantiene el historial laboral de tu trabajadora de casa particular. Todo por WhatsApp, sin apps ni papelería.",
  keywords: [
    "contrato trabajadora de casa particular Chile",
    "liquidación trabajadora de casa particular",
    "contrato puertas adentro puertas afuera",
    "ley 20786 trabajadora casa particular",
    "calcular liquidación nana Chile",
    "gestión laboral doméstica Chile",
  ],
  openGraph: {
    title: "GoLegit — El contrato de tu trabajadora, por WhatsApp",
    description:
      "Contratos legales, liquidaciones y documentos laborales para trabajadoras de casa particular. Todo desde WhatsApp.",
    url: "https://golegit.cl",
    siteName: "GoLegit",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoLegit — El contrato de tu trabajadora, por WhatsApp",
    description:
      "Contratos legales y liquidaciones para trabajadoras de casa particular. Sin apps, sin formularios.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://golegit.cl",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
