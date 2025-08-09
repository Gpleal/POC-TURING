import { createWorker, JobPayload } from '@/lib/queue'
import { prisma } from '@/lib/db.prisma'

const worker = createWorker<JobPayload>('agent-runs', async ({ agentId, input }) => {
  const start = new Date()
  let output: any = null
  let error: string | null = null
  try {
    // Simulated handler work
    await new Promise(r => setTimeout(r, 300))
    output = { echo: input, note: 'Processed by worker stub' }
  } catch (e: any) {
    error = e?.message ?? 'Unknown error'
  } finally {
    const end = new Date()
    await (prisma as any).taskRun.updateMany({
      where: { agentId, startedAt: { lte: end } },
      data: { status: error ? ('failed' as any) : ('success' as any), output: output as any, error: error ?? undefined, endedAt: end }
    })
  }
})

if (!worker) {
  console.log('Worker running in fallback mode (no Redis).')
}
