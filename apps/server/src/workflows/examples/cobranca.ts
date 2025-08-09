import { createWorkflow, sleep } from '@shared/utils'

export default createWorkflow<any, any>([
  async ({ input }: { input: any }) => ({ ...input, boletoId: 'blt_demo_001' }),
  async ({ input }: { input: any }) => { await sleep(150); return { ...input, enviado: true } },
  async ({ input }: { input: any }) => ({ ok: true, resultado: input })
])
