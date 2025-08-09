import { z } from 'zod'

export type BaseConfig = {
  model: { provider: 'openai'|'local'; name: string; temperature: number };
  embeddings?: { provider: 'openai'|'local'; name: string };
  schedule?: { cron: string; timezone: string };
  webhooks?: { url: string; secret?: string }[];
  integrations: {
    calendar?: { accountId: string };
    email?: { accountId: string; sender: string };
    whatsapp?: { accountId: string; template?: string };
    billing?: { gateway: 'asaas'|'iugu'|'pagarme'|'gerencianet'; accountId: string };
    invoice?: { provider: 'enotas'|'nfeio'|'plugnotas'|'tecnospeed'; accountId: string; certificateAlias?: string };
    bank?: { provider: 'belvo'|'pluggy'|'quanto'; accountId: string };
    erp?: { provider: 'bling'|'tiny'|'sap_b1'|'totvs'; accountId: string };
  };
  routing?: { autoApproveThreshold?: number; humanApprovalEmails?: string[] };
  rules?: Record<string, any>;
}

export type AgentPreset = {
  type: 'SCHEDULER'|'REMINDER'|'BILLING'|'INVOICE_ISSUER'|'EMAIL_CLASSIFIER'|'AUTO_REPLY'|'CV_SCREENING'|'STOCK_CONTROL'|'DOC_DISPATCH'|'FIN_REPORTS'|'PAYMENT_RECON'
  displayName: string
  icon: string
  shortDesc: string
  defaultConfig: BaseConfig
  fields: Array<{ key: string; label: string; type: 'text'|'select'|'number'|'json'; required?: boolean; options?: string[] }>
}

const base: BaseConfig = {
  model: { provider: 'openai', name: 'gpt-4o-mini', temperature: 0.2 },
  embeddings: { provider: 'openai', name: 'text-embedding-3-small' },
  integrations: {},
}

function preset(type: AgentPreset['type'], displayName: string, shortDesc: string, extra: Partial<BaseConfig>): AgentPreset {
  return {
    type, displayName, icon: '⚙️', shortDesc,
    defaultConfig: { ...base, ...extra },
    fields: [
      { key: 'model.name', label: 'Model Name', type: 'text', required: true },
      { key: 'model.temperature', label: 'Temperature', type: 'number' },
    ]
  }
}

export const AGENT_PRESETS: AgentPreset[] = [
  preset('SCHEDULER','Scheduler','Create calendar events from intents', { schedule: { cron: '0 9 * * 1-5', timezone: 'America/Sao_Paulo' }, integrations: { calendar: { accountId: '' }, email: { accountId: '', sender: 'noreply@acme.com' }, whatsapp: { accountId: '' } } }),
  preset('REMINDER','Reminders','Send reminders with cron windows', { schedule: { cron: '0 * * * *', timezone: 'UTC' } }),
  preset('BILLING','Billing','Scan open invoices and send charges', { integrations: { billing: { gateway: 'asaas', accountId: '' } } }),
  preset('INVOICE_ISSUER','Invoice Issuer','Emit fiscal notes via provider', { integrations: { invoice: { provider: 'enotas', accountId: '' } } }),
  preset('EMAIL_CLASSIFIER','Email Classifier','Classify incoming emails with embeddings + SLM', { integrations: { email: { accountId: '', sender: 'ops@acme.com' } } }),
  preset('AUTO_REPLY','Auto Reply','RAG FAQ responder', {}),
  preset('CV_SCREENING','CV Screening','Parse and score CVs', {}),
  preset('STOCK_CONTROL','Stock Control','ERP sync + reorder alerts', { integrations: { erp: { provider: 'bling', accountId: '' } } }),
  preset('DOC_DISPATCH','Document Dispatch','Generate and send PDFs', {}),
  preset('FIN_REPORTS','Finance Reports','ETL ledger to DRE/Fluxo', {}),
  preset('PAYMENT_RECON','Payment Recon','Match payments and alert divergences', { integrations: { bank: { provider: 'belvo', accountId: '' } } as any }),
]
