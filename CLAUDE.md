# CLAUDE.md — golegit.cl web

Contexto técnico y operacional para Claude Code. Este archivo es la fuente de verdad del proyecto.

---

## Qué es este proyecto

Landing page + herramientas públicas de **GoLegit**, plataforma legal por WhatsApp para gestionar contratos y liquidaciones de trabajadoras de casa particular (TCP) en Chile. El sitio cumple dos roles:

1. **Marketing:** Landing page que explica el producto y convierte visitantes a usuarios de WhatsApp.
2. **Herramientas gratuitas:** Simuladores laborales (liquidación + jornada) y blog de novedades legales.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15.1 (App Router) |
| UI | React 19, Tailwind CSS 3.4, Framer Motion |
| Lenguaje | TypeScript 5 (strict) |
| CMS | Notion API (`@notionhq/client`) |
| URL shortener | Supabase (tabla `url_cortas`) |
| Hosting | Vercel — deploy automático desde `main` |
| Iconos | Lucide React |

---

## Comandos

```bash
npm run dev      # Servidor de desarrollo (localhost:3000)
npm run build    # Build de producción
npm run start    # Servidor de producción local
npm run lint     # ESLint
```

No hay tests configurados (ni Jest, ni Vitest, ni Playwright).

---

## Estructura de rutas

| Ruta | Descripción |
|---|---|
| `/` | Landing page (10 secciones) |
| `/simulador` | Landing de simuladores |
| `/simulador/liquidacion` | Calculadora de liquidación TCP |
| `/simulador/jornada` | Calculadora de jornada laboral |
| `/novedades` | Blog (CMS Notion) |
| `/novedades/[slug]` | Artículo individual |
| `/[code]` | Edge Function — URL shortener (go.golegit.cl/XXXXX) |
| `/privacidad` | Política de privacidad (placeholder, pendiente) |
| `/terminos` | Términos de servicio (placeholder, pendiente) |

---

## Estructura de directorios

```
app/
  layout.tsx              # Root layout, metadata global
  page.tsx                # Landing (ensambla secciones)
  globals.css             # Estilos globales y fuentes
  [code]/route.ts         # Edge Function — URL shortener
  novedades/
    page.tsx              # Listado de artículos
    [slug]/page.tsx       # Artículo individual
    NovedadesClient.tsx   # Filtro por categoría (client)
    utils.ts              # categoriaColor, formatFecha (sin "use client")
  simulador/
    page.tsx              # Landing simuladores
    liquidacion/page.tsx  # Calculadora liquidación (509 líneas)
    jornada/page.tsx      # Calculadora jornada (551 líneas)
  privacidad/page.tsx
  terminos/page.tsx

components/
  layout/
    Navbar.tsx            # Header sticky con scroll transparente
    Footer.tsx
  sections/               # Secciones de la landing page
    Hero.tsx              # Mockup animado de WhatsApp
    Problem.tsx
    Solution.tsx
    HowItWorks.tsx
    Features.tsx
    Pricing.tsx
    Trust.tsx
    FAQ.tsx
    FinalCTA.tsx
  notion/
    BlockRenderer.tsx     # Renderiza bloques Notion en artículos
  CtaButton.tsx           # Botón WhatsApp controlado por whatsappEnabled

lib/
  config.ts               # Config central del sitio
  notion.ts               # Cliente Notion y queries
  utils.ts                # Utilidad cn()
```

---

## Configuración central — `lib/config.ts`

**El archivo más importante para operaciones.** Controla:

- `whatsappEnabled` — `false` = todos los botones dicen "Próximamente". Cambiar a `true` para activar WhatsApp.
- `whatsappNumber` / `whatsappUrl` — Número y enlace de WhatsApp (actualmente placeholder `56912345678`).
- `email` / `supportEmail` — Correos de contacto.
- `siteUrl` — URL de producción.
- `PRICING` — Precios de los planes.

---

## Variables de entorno

Se configuran en Vercel → Settings → Environment Variables. No existe `.env.local` en producción.

| Variable | Descripción |
|---|---|
| `NOTION_TOKEN` | Internal Integration Secret de la integración GoLegit |
| `NOTION_DB_ID` | `b844dffae5ca4ee8983d5ee3d098a70b` (fijo) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anon de Supabase |

---

## CMS de Novedades (Notion)

Los artículos se administran en la base de datos **Novedades — CMS** en Notion. La web los lee vía API con ISR cada 3600 segundos.

### Columnas de la DB

| Columna | Tipo | Notas |
|---|---|---|
| `Título` | Título | Nombre del artículo |
| `Slug` | Texto | URL (`/novedades/slug`). Sin espacios ni tildes. |
| `Resumen` | Texto | ~200 caracteres |
| `Categoría` | Select | Laboral, Remuneraciones, Contratos, Previsión, General, Novedades |
| `Fecha` | Fecha | Fecha de publicación |
| `Publicado` | Checkbox | Solo aparece en la web si está marcado ✅ |
| `Imagen` | Archivo | Subir por getpronto.io y adjuntar |

### Bloques soportados en artículos

Párrafo, Heading 1/2/3, Cita, Callout, Divisor, Código, Imagen, Toggle, Lista con viñetas, Lista numerada. Bloques no reconocidos se ignoran silenciosamente.

### ISR y generación dinámica

`generateStaticParams` retorna `[]` con `dynamicParams = true` → los artículos se generan on-demand, sin llamar a Notion en build time. Esto acelera el build.

---

## Simuladores laborales

### Liquidación (`/simulador/liquidacion`)

Calculadora de liquidación para TCP. Lógica enteramente client-side.

- **Descuentos trabajadora:** AFP (tasa + comisión según AFP elegida) + Fonasa 7%. No descuenta AFC.
- **Aportes empleador (Previred TCP):** SIS 1,54% · AFC TCP 3,00% · Mutual 0,93% · Cotización adicional 1,00% · Indemnización todo evento 1,11%.
- **Dos modos:** sueldo base → calcula líquido; o desde líquido pactado → calcula sueldo base necesario.
- **AFPs:** 7 opciones con tasas de comisión vigentes (1,27%–1,45%).
- **Constantes clave:** IMM $530.000, Tope imponible AFP $3.300.000.
- La lógica legal está documentada en `reglas liquidación.txt` en la raíz del proyecto.

### Jornada (`/simulador/jornada`)

Generador de cláusula de jornada para contratos TCP.

- Calcula horas semanales día por día.
- Alerta si se supera el límite legal.
- Genera texto listo para pegar en el contrato.
- **Límite legal:** 44 horas hasta el **26 de abril de 2026**, luego 42 horas (Ley 21.561).
- La colación (30–120 min) no es imputable a la jornada (Art. 34 CT).

---

## URL Shortener (`/[code]`)

Edge Function (Vercel Edge Network — sin cold starts). Consulta la tabla `url_cortas` en Supabase. Si el código no existe, redirige al home.

---

## Decisiones arquitectónicas importantes

1. **Server vs Client Components:** Las funciones `categoriaColor` y `formatFecha` viven en `app/novedades/utils.ts` **sin** `"use client"`. Importarlas desde un módulo `"use client"` dentro de un Server Component causa error de runtime en Next.js 15. Si se añaden utilidades compartidas, deben seguir este patrón.

2. **Anchor links en Navbar:** Usan `/#como-funciona` (con `/` al inicio) para funcionar desde cualquier subpágina, no solo desde `/`.

3. **Error handling en Notion:** `getPost` y `getBlocks` tienen try/catch — los errores devuelven `null`/`[]` en vez de 500.

4. **Path alias:** `@/*` apunta a la raíz del proyecto (`tsconfig.json`).

5. **Imágenes remotas permitidas:** `notion.so`, `amazonaws.com`, `images.unsplash.com`, `getpronto.io` (configurado en `next.config.ts`).

---

## Deploy

- **Plataforma:** Vercel (`web-page-lake.vercel.app`)
- **Rama principal:** `main` → deploy automático en cada push
- **Flujo habitual:** rama `feat/...` → PR → merge a `main` → Vercel deploya
- **Security headers** configurados en `vercel.json`: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.

---

## Pendientes antes de lanzar al público

- [ ] Activar WhatsApp: cambiar `whatsappEnabled: true` y el número real en `lib/config.ts`
- [ ] Completar `app/privacidad/page.tsx` (Ley 19.628 + 21.719)
- [ ] Completar `app/terminos/page.tsx`
- [ ] Configurar dominio `golegit.cl` en Vercel
- [ ] Activar analytics (Vercel Analytics o similar)

---

## Contexto del producto

GoLegit automatiza la burocracia legal de contratar TCP en Chile: contrato, anexos, liquidación mensual e historial probatorio — todo por WhatsApp, sin app, sin portal.

**Público objetivo:** Empleadores personas naturales con 1–3 TCP. Secundario: contadores.

**Tono del sitio:** Directo, claro, sin jerga legal. Como un abogado amigo. Tres adjetivos: Confiable · Simple · Preciso.

**Vocabulario prohibido:** "plataforma", "solución SaaS", "compliance", "herramienta digital", "gestión integral", "instrumento probatorio fehaciente".

**Mensajes clave:**
- "El contrato correcto desde el primer día."
- "Todo por WhatsApp. Sin apps, sin portales."
- "La liquidación exacta, sin hacer cuentas."
- "Menos de la mitad del precio de la competencia." ($9.990/mes vs $24.000/mes Pipol)

**SEO keywords principales:** contrato trabajadora de casa particular Chile, liquidación TCP, ley 20786, calcular liquidación nana Chile.
