import { createWorkflow, sleep } from '@shared/utils'

export default createWorkflow<any, any>([
  async ({ input }: { input: any }) => {
    // Validar entrada
    return { ...input, valid: true }
  },
  async ({ input }: { input: any }) => {
    // Simular criação evento
    await sleep(200)
    return { ...input, eventId: 'evt_demo_123', status: 'scheduled' }
  },
  async ({ input }: { input: any }) => {
    // Simular notificação
    await sleep(100)
    return { ok: true, confirmation: input }
  }
])
