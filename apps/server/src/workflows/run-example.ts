import { createWorkflow } from '@shared/utils'
import type { WorkflowSpec } from '@shared/types'

async function stepLog({ input }: any){
  return input
}

export async function runExample(agentId: string, input: any){
  let wf: WorkflowSpec<any, any>
  switch(agentId){
    case 'agendamento':
  wf = (await import('./examples/agendamento')).default
      break
    case 'cobranca':
  wf = (await import('./examples/cobranca')).default
      break
    default:
      wf = createWorkflow([stepLog])
  }
  return wf.run(input)
}
