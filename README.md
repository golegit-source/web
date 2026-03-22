# GoLegit — Web (Landing Page)

Sitio de marketing y punto de entrada para GoLegit. Construido en Next.js 15 + Tailwind CSS + TypeScript.

## Stack

- **Next.js 15** — App Router
- **Tailwind CSS 3** — Estilos
- **TypeScript** — Tipado
- **Framer Motion** — Animaciones (preparado, usar según necesidad)
- **Lucide React** — Iconos (preparado)

## Estructura

```
app/
  layout.tsx          # Root layout + metadata global
  page.tsx            # Landing page (ensambla todas las secciones)
  globals.css         # Estilos globales + fuentes
  privacidad/page.tsx # Placeholder política de privacidad
  terminos/page.tsx   # Placeholder términos de servicio

components/
  layout/
    Navbar.tsx        # Navegación sticky + responsive
    Footer.tsx        # Footer con links y datos legales
  sections/
    Hero.tsx          # Hero con mockup de chat WhatsApp animado
    Problem.tsx       # 4 problemas del empleador
    Solution.tsx      # Propuesta de valor con stats
    HowItWorks.tsx    # 3 pasos del flujo
    Features.tsx      # Grid de funcionalidades (live + próximamente)
    Pricing.tsx       # Planes de precio
    Trust.tsx         # Señales de confianza
    FAQ.tsx           # 8 preguntas con accordion
    FinalCTA.tsx      # CTA final

lib/
  config.ts           # ⚠️  NÚMERO DE WHATSAPP Y EMAILS — editar antes de publicar
  utils.ts            # Utilidades (cn)
```

## Antes de publicar — checklist obligatorio

1. **`lib/config.ts`** → Reemplazar `56912345678` con el número real de WhatsApp de GoLegit
2. **`app/privacidad/page.tsx`** → Agregar contenido legal completo (Ley 19.628 + Ley 21.719)
3. **`app/terminos/page.tsx`** → Agregar TyC completos (Decisión 19 del proyecto)
4. **`app/layout.tsx`** → Verificar metadata (título, descripción, og:image si se agrega)
5. Configurar dominio `golegit.cl` en Vercel
6. Activar analytics (Vercel Analytics o similar)

## Setup local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Deploy en Vercel

1. Subir este repo a GitHub
2. Importar en [vercel.com](https://vercel.com) → "Import Git Repository"
3. Framework detectado automáticamente: Next.js
4. Sin variables de entorno requeridas para el MVP (todo está en `lib/config.ts`)
5. Click Deploy

## Agregar fuentes locales (opcional)

Las fuentes se cargan desde Google Fonts en `globals.css`. Para producción con mejor rendimiento, descargarlas y servirlas localmente usando `next/font`.

## Ampliar el sitio

El repo está preparado para crecer. Rutas sugeridas para fases futuras:

- `/blog` — Contenido SEO sobre legislación laboral doméstica
- `/simulador` — Calculadora de liquidación (ya referenciada en el flujo de WhatsApp)
- `/para-contadores` — Landing específica para el segmento contador
- `/api/...` — Endpoints si se necesita formulario de contacto o lista de espera

---

Operado por **Cubillos y Compañía Limitada** · RUT 78.048.033-5 · golegit.cl
