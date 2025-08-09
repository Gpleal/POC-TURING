import { NextResponse } from 'next/server'
import { getAgentMetrics } from '@/lib/db'
import { z } from 'zod'
import { prisma } from '@/lib/db.prisma'
import { AGENT_PRESETS } from '@/presets/agents'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page') ?? '1')
  const size = Number(searchParams.get('size') ?? '12')
  const q = (searchParams.get('q') ?? '').toLowerCase()
  const type = searchParams.get('type') ?? ''
  const status = searchParams.get('status') ?? ''

  let items = getAgentMetrics()
  if (q) items = items.filter(a => a.name.toLowerCase().includes(q))
  if (type) items = items.filter(a => a.type === type)
  if (status) items = items.filter(a => a.status === status)
  const total = items.length
  const start = (page - 1) * size
  const paged = items.slice(start, start + size)
  return NextResponse.json({ items: paged, total, page, size })
}

const CreateAgentSchema = z.object({
  type: z.enum([
    'SCHEDULER','REMINDER','BILLING','INVOICE_ISSUER','EMAIL_CLASSIFIER','AUTO_REPLY','CV_SCREENING','STOCK_CONTROL','DOC_DISPATCH','FIN_REPORTS','PAYMENT_RECON'
  ]),
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
  configOverrides: z.record(z.any()).optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const input = CreateAgentSchema.parse(body)
    const preset = AGENT_PRESETS.find(p => p.type === input.type)
    if (!preset) return NextResponse.json({ error: 'Unknown preset' }, { status: 400 })

      const name = input.name ?? preset.displayName
      const toSlug = (str: string) => str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
      const base = toSlug(name)
      let slug = base || `agent-${Date.now()}`
    // ensure unique slug
    let i = 1
      while (await prisma.agent.findUnique({ where: { slug } as any })) {
        slug = `${base}-${i++}`
    }

    const config = { ...preset.defaultConfig, ...(input.configOverrides ?? {}) }
    try {
      const created = await prisma.agent.create({
        data: {
          name,
          slug,
          // Casting to any to avoid schema/type drift before prisma generate
          type: preset.type as any,
          status: 'active' as any,
          description: input.description,
          config: config as any,
        } as any
      })
      return NextResponse.json({ item: created })
    } catch {
      // In-memory mode: return a stub item
      return NextResponse.json({ item: { id: `local-${Date.now()}`, name, slug, type: preset.type, status: 'active', description: input.description, config } })
    }
  } catch (e: any) {
    const msg = e?.message ?? 'Invalid request'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
