import { NextRequest, NextResponse } from 'next/server'
import { getCalls } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({ page: z.coerce.number().default(1), size: z.coerce.number().default(10) })

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const parsed = schema.safeParse(Object.fromEntries(searchParams))
  if (!parsed.success) return NextResponse.json({ error: 'invalid query' }, { status: 400 })

  const { page, size } = parsed.data
  const res = getCalls(page, size)
  return NextResponse.json(res)
}
