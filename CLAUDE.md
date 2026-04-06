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
| Fuente | Plus Jakarta Sans (Google Fonts, pesos 400–800) |
| CMS | Notion API (`@notionhq/client`) |
| URL shortener | Supabase (tabla `url_cortas`) |
| Hosting | Vercel — deploy automático desde `main` |

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
  layout.tsx              # Root layout, metadata global, favicon
  icon.svg                # Favicon adaptivo (light/dark via prefers-color-scheme)
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
    liquidacion/page.tsx  # Calculadora liquidación
    jornada/page.tsx      # Calculadora jornada
  privacidad/page.tsx
  terminos/page.tsx

components/
  layout/
    Navbar.tsx            # Header sticky — logo SVG adaptivo light/dark
    Footer.tsx            # Footer oscuro con logo dark
  sections/               # Secciones de la landing page
    Hero.tsx              # Hero oscuro con mockup chat (hidden en móvil)
    Problem.tsx
    Solution.tsx
    HowItWorks.tsx
    Features.tsx
    Pricing.tsx           # Client component — toggle mensual/anual
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

public/
  favicon.ico             # Fallback para browsers sin soporte SVG
  apple-touch-icon.png    # 180x180 para iOS
  logo/
    golegit-logo.svg          # Logo horizontal — fondos claros
    golegit-logo-dark.svg     # Logo horizontal — fondos oscuros
    golegit-icon.svg          # Ícono con fondo verde (referencia/backup)
    golegit-icon-light.svg    # Ícono outline verde, sin fondo (fondos claros)
    golegit-icon-dark.svg     # Ícono trazo blanco + checkmark brand-400 (fondos oscuros)
    golegit-icon-512.png      # PNG 512x512 del ícono oficial
    golegit-whatsapp.svg      # Avatar WhatsApp Business (outline, fondo blanco)
    golegit-whatsapp-512.png  # PNG 512x512 para subir a WhatsApp Business
```

---

## Branding

### Identidad visual

GoLegit usa un sistema de diseño sobrio, moderno y sin decoraciones innecesarias. La inspiración es el design language de productos SaaS como Linear y Clerk: oscuro, tipografía extrabold, acentos de color contenidos.

**Tres adjetivos:** Confiable · Simple · Preciso

### Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `brand-400` | `#4ade80` | Acento en fondos oscuros, checkmark dark mode |
| `brand-500` | `#22c55e` | Hover states |
| `brand-600` | `#16a34a` | Color principal de marca |
| `brand-700` | `#15803d` | Header del chat mockup |
| `ink` | `#0d1117` | Texto principal |
| `ink-muted` | `#6b7280` | Texto secundario |
| `ink-light` | `#9ca3af` | Texto terciario |
| `paper` | `#fafaf8` | Fondo general del sitio |
| `zinc-950` | `#09090b` | Hero, FinalCTA (secciones oscuras) |

### Tipografía

**Plus Jakarta Sans** — única fuente del sitio, todos los pesos.

- Headings principales: `font-extrabold` (800), `tracking-tight`
- Body: `font-normal` (400) o `font-medium` (500)
- Nunca usar `font-light` en headings — fue lo que daba el aspecto "Times New Roman"
- Las variables CSS `--font-fraunces` y `--font-instrument-sans` apuntan ambas a Plus Jakarta Sans por compatibilidad con código antiguo

### Ícono / Logo

El ícono de GoLegit es una **burbuja de chat rectangular** (no circular como WhatsApp) con un checkmark dentro y la cola abajo-izquierda. La forma rectangular evoca documento/contrato. La cola a la izquierda significa que GoLegit habla hacia el empleador (mensaje recibido).

**Reglas del ícono:**
- Nunca usar fill verde sólido en la burbuja para el logo — solo outline (trazo)
- El fill verde sólido con burbuja blanca es exclusivo del favicon y app icon (necesario para legibilidad a 16px)
- El checkmark en fondos claros: verde `#16a34a`. En fondos oscuros: `#4ade80` (brand-400)

**Archivos y cuándo usar cada uno:**

| Archivo | Cuándo usar |
|---|---|
| `golegit-logo.svg` | Navbar (fondo claro), documentos, emails |
| `golegit-logo-dark.svg` | Navbar (hero oscuro), footer, fondos oscuros |
| `golegit-icon-light.svg` | Ícono solo sobre fondo claro (sin wordmark) |
| `golegit-icon-dark.svg` | Ícono solo sobre fondo oscuro (sin wordmark) |
| `golegit-icon.svg` | Referencia/backup. No usar directamente en la UI |
| `golegit-whatsapp-512.png` | Subir como foto de perfil en WhatsApp Business |
| `app/icon.svg` | Favicon — adaptivo light/dark automático |

### Favicon

`app/icon.svg` usa `@media (prefers-color-scheme: dark)` para cambiar automáticamente:
- **Modo claro:** trazo verde `#16a34a` sobre fondo blanco
- **Modo oscuro:** trazo blanco + checkmark `#4ade80` sobre fondo `#18181b`
- `public/favicon.ico` actúa de fallback (16px + 32px, PNG-in-ICO)

---

## Diseño UI — lineamientos

### Estructura de la landing

El hero y el FinalCTA son `bg-zinc-950` (oscuro) — enmarcan la página. Las secciones intermedias alternan entre `bg-white` y `bg-[#fafaf8]` (paper).

### Navbar

- Transparente con texto blanco solo en homepage antes de hacer scroll (`isDark = isHome && !scrolled`)
- Al hacer scroll o en cualquier subpágina: `bg-white/95 backdrop-blur-md border-b border-gray-100` con texto oscuro
- Logo: `<img>` con src condicional (`golegit-logo-dark.svg` vs `golegit-logo.svg`) según `isDark`
- Altura: `h-16` (64px)

### Hero

- `h-[100dvh]` — usa `dvh` (dynamic viewport height) para móvil correcto
- Grid: `grid-cols-1 lg:grid-cols-[1fr_280px]` — texto a la izquierda, mockup a la derecha
- **Mockup chat:** `hidden lg:flex` — se oculta en móvil para evitar recortes
- Dos glows radiales verdes como decoración de fondo (no grid, no ruido)
- Stats row debajo de los CTAs: $9.990/mes · 0 apps · 100% automatizado

### Mockup del teléfono (Hero)

- Contenedor con `height: "min(480px, calc(100dvh - 220px))"` y `aspectRatio: "9/18"`
- Frame: `flex flex-col overflow-hidden rounded-[2.8rem]`
- Header chat: `flex-shrink-0` — nunca comprime
- Área de chat: `flex-1 min-h-0 overflow-hidden` — `min-h-0` es crítico para que flex shrink funcione
- Avatar: SVG inline del ícono oficial (burbuja + checkmark), fondo blanco circular sobre header verde

### Pricing

- Client component con `useState` para toggle mensual/anual
- 3 columnas: Lite (izq, pendiente) · 1 trabajadora (centro, featured dark) · 2+ (der)
- Anual: descuento 20% (`monthlyPrice * 0.8`), muestra ahorro total al año
- Sección inferior: misma grilla de 3 cols — Lite features a la izq, "Todo incluido" col-span-2 a la der
- Lite: `opacity-60`, badge "Próximamente", sin precio, botón deshabilitado

### Secciones generales

- Sin emojis en ningún componente
- Sin gradientes de texto (evitar el look genérico de SaaS barato)
- Cards con `border border-gray-100 rounded-2xl` o `rounded-3xl`
- Shadows: `shadow-sm` en cards normales, `shadow-xl shadow-brand-600/8` en hover
- Badges de estado: `text-xs font-medium px-2.5 py-0.5 rounded-full border`

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

1. **Server vs Client Components:** Las funciones `categoriaColor` y `formatFecha` viven en `app/novedades/utils.ts` **sin** `"use client"`. Importarlas desde un módulo `"use client"` dentro de un Server Component causa error de runtime en Next.js 15.

2. **Anchor links en Navbar:** Usan `/#como-funciona` (con `/` al inicio) para funcionar desde cualquier subpágina, no solo desde `/`.

3. **Navbar isDark:** `isDark = isHome && !scrolled` — lógica de color invertida. Texto blanco solo en homepage antes de scroll. Al hacer scroll o en subpáginas siempre es fondo blanco con texto oscuro.

4. **`min-h-0` en flex children:** Patrón crítico en el mockup del teléfono. Sin `min-h-0` en el área de chat, el contenido overflow en vez de comprimir.

5. **`h-[100dvh]` en Hero:** Usar `dvh` (dynamic viewport height) y no `vh` para que en móvil el hero no quede tapado por la barra del browser.

6. **Pricing como Client Component:** `"use client"` necesario por el toggle anual/mensual con `useState`. El resto de las secciones son Server Components.

7. **Error handling en Notion:** `getPost` y `getBlocks` tienen try/catch — los errores devuelven `null`/`[]` en vez de 500.

8. **Path alias:** `@/*` apunta a la raíz del proyecto (`tsconfig.json`).

9. **Imágenes remotas permitidas:** `notion.so`, `amazonaws.com`, `images.unsplash.com`, `getpronto.io` (configurado en `next.config.ts`).

---

## Deploy

- **Plataforma:** Vercel (`web-page-lake.vercel.app` / `golegit.cl`)
- **Rama principal:** `main` → deploy automático en cada push (~60s)
- **Flujo habitual:** editar → commit → push → Vercel deploya solo
- **Security headers** configurados en `vercel.json`: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.

---

## Pendientes antes de lanzar al público

- [ ] Activar WhatsApp: cambiar `whatsappEnabled: true` y el número real en `lib/config.ts`
- [ ] Completar `app/privacidad/page.tsx` — base: Ley 19.628 + Ley 21.719. Puntos críticos a cubrir:
  - Datos recopilados: nombre, RUT, domicilio, teléfono WhatsApp, email
  - **Datos biométricos sensibles** (cuando se implemente verificación de identidad): selfie, hash facial, liveness score, IP, timestamp — requiere consentimiento explícito, finalidad declarada y plazo de retención definido (Ley 21.719, Art. 16 letra b)
  - Finalidad del tratamiento: generación de documentos laborales, firma electrónica simple (Ley 19.799)
  - Responsable del tratamiento: Cubillos y Compañía Limitada, RUT 78.048.033-5
  - Transferencia a terceros: Supabase (almacenamiento), Resend (email), Meta/WhatsApp (canal)
  - Derechos ARCOP: acceso, rectificación, cancelación, oposición, portabilidad
  - Contacto: soporte@golegit.cl
  - Retención de datos biométricos: definir plazo (sugerencia: duración del contrato + 5 años para prescripción laboral)

- [ ] Completar `app/terminos/page.tsx` — puntos críticos a cubrir:
  - Descripción del servicio: plataforma de gestión laboral TCP por WhatsApp
  - **PIN de firma electrónica**: es firma electrónica simple (FES) bajo Ley 19.799. No equivale a firma electrónica avanzada (FEA). El usuario acepta expresamente este alcance.
  - **Verificación de identidad**: el proceso de verificación biométrica (selfie + cédula) genera un registro de auditoría con valor probatorio. El usuario consiente expresamente antes de activar la cámara.
  - Responsabilidad del empleador: la veracidad de los datos ingresados es responsabilidad del usuario
  - Limitación de responsabilidad: GoLegit genera documentos basados en los datos proporcionados; la validez legal depende de la exactitud de esos datos
  - Jurisdicción: tribunales de Santiago, ley chilena
  - Operado por: Cubillos y Compañía Limitada, RUT 78.048.033-5
- [ ] Configurar dominio `golegit.cl` en Vercel
- [ ] Activar analytics (Vercel Analytics o similar)
- [ ] Plan Lite: desarrollar feature de solo generación de documentos

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

**Planes:**
- **1 trabajadora:** $9.990/mes (featured)
- **2 o más trabajadoras:** $17.990/mes
- **Lite:** pendiente de desarrollo — solo generación de documentos, sin automatizaciones

**SEO keywords principales:** contrato trabajadora de casa particular Chile, liquidación TCP, ley 20786, calcular liquidación nana Chile.
