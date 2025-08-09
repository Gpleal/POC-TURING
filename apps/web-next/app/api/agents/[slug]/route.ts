import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db.prisma'
import { getAgents } from '@/lib/db'
import { z } from 'zod'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const item = await prisma.agent.findUnique({ where: { slug: params.slug } as any })
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ item })
  } catch {
    const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)+/g,'')
    const mem = getAgents().find(a => toSlug(a.name) === params.slug)
    if (!mem) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ item: mem })
  }
}

const PatchSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
  status: z.enum(['draft','active','paused','archived']).optional(),
  config: z.record(z.any()).optional(),
})

export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json()
    const input = PatchSchema.parse(body)
    const updated = await prisma.agent.update({ where: { slug: params.slug } as any, data: input as any })
    return NextResponse.json({ item: updated })
  } catch (e: any) {
    // In in-memory mode, just echo back the requested update
    return NextResponse.json({ item: { slug: params.slug, ...(await req.json().catch(() => ({}))) } })
  }
}
