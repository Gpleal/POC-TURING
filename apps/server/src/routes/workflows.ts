import type { FastifyInstance } from 'fastify'
import { prisma } from '../index'
import { runExample } from '../workflows/run-example'
import { z } from 'zod'

export function registerWorkflowRoutes(app: FastifyInstance){
  app.post('/api/workflows/run', async (req) => {
  const Body = z.object({ agentId: z.string(), input: z.any().optional() })
  const { agentId, input } = Body.parse((req as any).body)
    const result = await runExample(agentId, input)
    return { result }
  })

  app.get('/api/logs', async () => prisma.executionLog.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }))
}
