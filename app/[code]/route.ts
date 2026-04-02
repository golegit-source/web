import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params

  if (!code || code.length > 20) {
    return NextResponse.redirect('https://golegit.cl', { status: 302 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.redirect('https://golegit.cl', { status: 302 })
  }

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/url_cortas?codigo=eq.${encodeURIComponent(code)}&select=url_destino&limit=1`,
      { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } }
    )
    const rows = await res.json() as { url_destino: string }[]
    const destino = rows?.[0]?.url_destino
    if (destino) return NextResponse.redirect(destino, { status: 302 })
  } catch {}

  return NextResponse.redirect('https://golegit.cl', { status: 302 })
}
