import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db.prisma'
import { getAgents } from '@/lib/db'
import { z } from 'zod'
import { Queue } from '@/lib/queue'

const runQueue = new Queue('agent-runs')

const RunSchema = z.object({ input: z.any(), dedupeKey: z.string().optional() })

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json()
    const input = RunSchema.parse(body)
    try {
      const agent = await prisma.agent.findUnique({ where: { slug: params.slug } as any })
      if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      const run = await (prisma as any).taskRun.create({ data: {
        agentId: agent.id,
        status: 'queued' as any,
        input: input.input as any,
        startedAt: new Date(),
      } as any })
      await runQueue.add('run', { agentId: agent.id, input: input.input })
      return NextResponse.json({ item: run })
    } catch (dbErr) {
      // Fallback to in-memory stub when Prisma is not available
      const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)+/g,'')
      const mem = getAgents().find(a => toSlug(a.name) === params.slug)
      if (!mem) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      const item = {
        id: `local-${Date.now()}`,
        agentId: mem.id,
        status: 'queued',
        input: input.input,
        startedAt: new Date().toISOString(),
      }
      await runQueue.add('run', { agentId: mem.id, input: input.input })
      return NextResponse.json({ item })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Invalid' }, { status: 400 })
  }
}

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const agent = await prisma.agent.findUnique({ where: { slug: params.slug } as any })
    if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const items = await (prisma as any).taskRun.findMany({ where: { agentId: agent.id } as any, orderBy: { startedAt: 'desc' } as any, take: 50 })
    return NextResponse.json({ items, total: items.length })
  } catch {
    // Fallback to empty list for in-memory mode
    return NextResponse.json({ items: [], total: 0 })
  }
}
