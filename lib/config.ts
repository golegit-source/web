export const SITE_CONFIG = {
  // ─── WhatsApp ────────────────────────────────────────────────
  // Cambiar whatsappEnabled a `true` cuando el número esté listo
  whatsappEnabled: false,
  whatsappNumber: "56912345678", // TODO: reemplazar con número real
  whatsappUrl: "https://wa.me/56912345678",

  // ─── Contacto ─────────────────────────────────────────────────
  email: "hola@golegit.cl",
  supportEmail: "soporte@golegit.cl",
  siteUrl: "https://golegit.cl",
};

export const PRICING = [
  {
    label: "1 trabajadora",
    price: "$9.990",
    period: "/mes",
    featured: false,
  },
  {
    label: "2 trabajadoras",
    price: "$17.990",
    period: "/mes",
    featured: true,
  },
  {
    label: "3 o más",
    price: "$7.990",
    period: "/mes por cada una",
    featured: false,
  },
];
