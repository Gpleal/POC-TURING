import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
  const agents = [
    { slug:'agendamento', name:'Agente de Agendamento', kind:'agendamento', description:'Confirma horários e notifica clientes', workflow: { id:'agendamento' } },
    { slug:'lembretes', name:'Agente de Lembretes', kind:'lembretes', description:'Envia lembretes automáticos', workflow: { id:'lembretes' } },
    { slug:'cobranca', name:'Agente de Cobrança', kind:'cobranca', description:'Gera boletos e envia cobranças', workflow: { id:'cobranca' } },
    { slug:'nf', name:'Agente de Notas Fiscais', kind:'nf', description:'Emite NFs e envia por e-mail', workflow: { id:'nf' } },
    { slug:'classificador-emails', name:'Agente de Classificação de E-mails', kind:'classificador-emails', description:'Classifica por categorias', workflow: { id:'classificador-emails' } },
    { slug:'resposta-automatica', name:'Agente de Resposta Automática', kind:'resposta-automatica', description:'Responde com base em FAQ', workflow: { id:'resposta-automatica' } },
    { slug:'triagem-cvs', name:'Agente de Triagem de Currículos', kind:'triagem-cvs', description:'Pré-seleciona candidatos', workflow: { id:'triagem-cvs' } },
    { slug:'estoque', name:'Agente de Controle de Estoque', kind:'estoque', description:'Monitora entradas/saídas', workflow: { id:'estoque' } },
    { slug:'envio-documentos', name:'Agente de Envio de Documentos', kind:'envio-documentos', description:'Gera e envia documentos', workflow: { id:'envio-documentos' } },
    { slug:'relatorios-financeiros', name:'Agente de Relatórios Financeiros', kind:'relatorios-financeiros', description:'Relatórios mensais', workflow: { id:'relatorios-financeiros' } },
    { slug:'conferencia-pagamentos', name:'Agente de Conferência de Pagamentos', kind:'conferencia-pagamentos', description:'Confere pendências e conclusão', workflow: { id:'conferencia-pagamentos' } },
  ]

  for (const a of agents){
    await prisma.agent.upsert({
      where: { slug: a.slug },
      create: a as any,
      update: a as any,
    })
  }
}

main().then(()=>prisma.$disconnect())
