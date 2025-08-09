import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import { registerAgentRoutes } from './routes/agents'
import { registerWorkflowRoutes } from './routes/workflows'

const app = Fastify({ logger: true })
app.register(cors, { origin: true })

export const prisma = new PrismaClient()

app.get('/api/health', async () => ({ ok: true }))

registerAgentRoutes(app)
registerWorkflowRoutes(app)

const port = Number(process.env.PORT ?? 3333)
app.listen({ port, host: '0.0.0.0' }).then(() => {
  app.log.info(`API listening on http://localhost:${port}`)
})
