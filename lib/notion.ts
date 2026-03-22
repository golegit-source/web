import { Client, isFullPage } from "@notionhq/client";
import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

// ─────────────────────────────────────────────────────────────
// Cliente — se instancia una sola vez (server-side only)
// ─────────────────────────────────────────────────────────────
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB_ID = process.env.NOTION_DB_ID ?? "";

// ─────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────
export interface Post {
  id: string;
  slug: string;
  titulo: string;
  resumen: string;
  categoria: string;
  fecha: string;         // ISO YYYY-MM-DD
  portada: string | null; // URL imagen de portada
}

export type Block = BlockObjectResponse;

// ─────────────────────────────────────────────────────────────
// Helpers de extracción de propiedades Notion
// ─────────────────────────────────────────────────────────────
function richTextToString(rt: RichTextItemResponse[]): string {
  return rt.map((t) => t.plain_text).join("");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pageToPost(page: any): Post {
  const props = page.properties;

  const titulo =
    props["Título"]?.title?.map((t: RichTextItemResponse) => t.plain_text).join("") ??
    props["Name"]?.title?.map((t: RichTextItemResponse) => t.plain_text).join("") ??
    "Sin título";

  const slugRaw =
    richTextToString(props["Slug"]?.rich_text ?? []).trim() ||
    page.id.replace(/-/g, "");

  const resumen = richTextToString(props["Resumen"]?.rich_text ?? []);
  const categoria = props["Categoría"]?.select?.name ?? "General";
  const fecha = props["Fecha"]?.date?.start ?? page.created_time?.split("T")[0] ?? "";

  // Imagen de portada (Notion page cover o propiedad Imagen)
  let portada: string | null = null;
  if (page.cover?.type === "external") portada = page.cover.external.url;
  else if (page.cover?.type === "file") portada = page.cover.file.url;
  if (!portada) {
    // Soporta columna tipo "url" o tipo "files"
    const imgProp = props["Imagen"];
    if (imgProp?.type === "url") {
      portada = imgProp.url ?? null;
    } else if (imgProp?.files?.[0]) {
      const f = imgProp.files[0];
      portada = f.type === "external" ? f.external.url : f.file?.url ?? null;
    }
  }

  return { id: page.id, slug: slugRaw, titulo, resumen, categoria, fecha, portada };
}

// ─────────────────────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────────────────────
export async function getPosts(categoria?: string): Promise<Post[]> {
  if (!DB_ID) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any =
    categoria && categoria !== "Todas"
      ? {
          and: [
            { property: "Publicado", checkbox: { equals: true } },
            { property: "Categoría", select: { equals: categoria } },
          ],
        }
      : { property: "Publicado", checkbox: { equals: true } };

  const res = await notion.databases.query({
    database_id: DB_ID,
    filter,
    sorts: [{ property: "Fecha", direction: "descending" }],
  });

  return res.results.filter(isFullPage).map(pageToPost);
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!DB_ID) return null;

  try {
    // Buscar primero por propiedad Slug
    const bySlug = await notion.databases.query({
      database_id: DB_ID,
      filter: { property: "Slug", rich_text: { equals: slug } },
    });

    if (bySlug.results.length > 0 && isFullPage(bySlug.results[0])) {
      return pageToPost(bySlug.results[0]);
    }

    // Fallback: buscar por ID (slug = page ID sin guiones)
    const allRes = await notion.databases.query({
      database_id: DB_ID,
      filter: { property: "Publicado", checkbox: { equals: true } },
    });

    const match = allRes.results
      .filter(isFullPage)
      .find((p: { id: string }) => p.id.replace(/-/g, "") === slug);

    return match ? pageToPost(match) : null;
  } catch (err) {
    console.error("[Notion] getPost error:", err);
    return null;
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  if (!DB_ID) return null;
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    if (isFullPage(page)) return pageToPost(page);
  } catch {
    return null;
  }
  return null;
}

export async function getBlocks(pageId: string): Promise<Block[]> {
  if (!process.env.NOTION_TOKEN) return [];
  const blocks: Block[] = [];
  let cursor: string | undefined;

  try {
    do {
      const res = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100,
      });
      blocks.push(...(res.results as Block[]));
      cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
    } while (cursor);
  } catch (err) {
    console.error("[Notion] getBlocks error:", err);
  }

  return blocks;
}

export async function getCategories(): Promise<string[]> {
  if (!DB_ID) return [];
  const schema = await notion.databases.retrieve({ database_id: DB_ID });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const catProp = (schema as any).properties?.["Categoría"];
  if (catProp?.type === "select") {
    return ["Todas", ...catProp.select.options.map((o: { name: string }) => o.name)];
  }
  return ["Todas"];
}
