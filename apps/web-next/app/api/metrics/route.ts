import { NextRequest, NextResponse } from 'next/server'
import { getMetrics } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  agentId: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  range: z.enum(['7d','14d','30d','90d']).optional()
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const parsed = schema.safeParse(Object.fromEntries(searchParams))
  if (!parsed.success) return NextResponse.json({ error: 'invalid query' }, { status: 400 })

  const { agentId, from, to, range } = parsed.data
  const res = getMetrics({ agentId, from: from ? new Date(from) : undefined, to: to ? new Date(to) : undefined, range })
  return NextResponse.json(res)
}
