import type { FastifyInstance } from 'fastify'
import { prisma } from '../index'
import { z } from 'zod'

const demoAgents = [
  { slug:'agendamento', name:'Agente de Agendamento', kind:'agendamento' },
  { slug:'cobranca', name:'Agente de Cobrança', kind:'cobranca' },
]

export function registerAgentRoutes(app: FastifyInstance){
  app.get('/api/agents', async () => {
    try {
      return await prisma.agent.findMany({ orderBy: { createdAt: 'desc' } })
    } catch {
      return demoAgents
    }
  })

  app.get('/api/agents/:slug', async (req) => {
    const Params = z.object({ slug: z.string() })
    const { slug } = Params.parse((req as any).params)
    try {
      return await prisma.agent.findUnique({ where: { slug } })
    } catch {
      return demoAgents.find(a=>a.slug===slug) ?? null
    }
  })
}
