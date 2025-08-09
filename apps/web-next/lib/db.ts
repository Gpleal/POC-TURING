export type Agent = { id: string; name: string; slug: string; role: string; department: string; status: 'active' | 'paused'; type: AgentType }
export type Call = { id: string; agentId: string; agentName: string; duration: number; cost: number; status: 'success' | 'error'; createdAt: string }

function rand(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min }

export type Range = '7d' | '14d' | '30d' | '90d'

export type AgentType =
  | 'SCHEDULER' | 'REMINDER' | 'BILLING' | 'INVOICE_ISSUER' | 'EMAIL_CLASSIFIER'
  | 'AUTO_REPLY' | 'CV_SCREENING' | 'STOCK_CONTROL' | 'DOC_DISPATCH' | 'FIN_REPORTS' | 'PAYMENT_RECON'

function toSlug(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') }
function guessType(name: string): AgentType {
  const n = name.toLowerCase()
  if (n.includes('schedule')) return 'SCHEDULER'
  if (n.includes('remind')) return 'REMINDER'
  if (n.includes('bill')) return 'BILLING'
  if (n.includes('invoice') || n.includes('nota')) return 'INVOICE_ISSUER'
  if (n.includes('email') && n.includes('class')) return 'EMAIL_CLASSIFIER'
  if (n.includes('reply') || n.includes('faq')) return 'AUTO_REPLY'
  if (n.includes('cv') || n.includes('resume') || n.includes('talent')) return 'CV_SCREENING'
  if (n.includes('stock') || n.includes('estoque')) return 'STOCK_CONTROL'
  if (n.includes('doc') || n.includes('pdf')) return 'DOC_DISPATCH'
  if (n.includes('report') || n.includes('dre') || n.includes('fluxo')) return 'FIN_REPORTS'
  if (n.includes('pay') || n.includes('recon')) return 'PAYMENT_RECON'
  return 'AUTO_REPLY'
}

const db = {
  agents: [] as Agent[],
  calls: [] as Call[],
}

export function seed() {
  if (db.agents.length) return
  const agentNames = [
    'Billing Bot','Support AI','Sales Assistant','Scheduler','Onboarding','Compliance','QA Tester','Notifier','Summarizer','Translator',
    'Invoice Issuer','Email Classifier','Auto Reply','CV Screening','Stock Control','Document Dispatch','Finance Reports','Payment Recon'
  ]
  const roles = ['Billing Bot','Support','Sales','Scheduler','Onboarding','Compliance','QA','Notifier','Summarizer','Translator']
  const depts = ['Finance','Support','Sales','Ops','People','Legal','QA','Ops','Ops','Localization']
  db.agents = agentNames.map((name, i) => ({
    id: String(i+1),
    name,
    slug: toSlug(name),
    role: roles[i % roles.length],
    department: depts[i % depts.length],
    status: Math.random() > 0.15 ? 'active' : 'paused',
    type: guessType(name),
  }))

  const now = new Date()
  for (let i = 0; i < 500; i++) {
    const daysAgo = rand(0, 89)
    const created = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000 - rand(0, 86_400_000))
  const agent = db.agents[rand(0, db.agents.length - 1)]
    const duration = rand(10, 300)
    const cost = Math.random() * 0.5
    const status = Math.random() < 0.9 ? 'success' : 'error'
    db.calls.push({ id: String(i+1), agentId: agent.id, agentName: agent.name, duration, cost, status, createdAt: created.toISOString() })
  }
}

export function getAgents() { seed(); return db.agents }

export function getMetrics(opts: { from?: Date; to?: Date; agentId?: string; range?: Range }) {
  seed()
  const to = opts.to ?? new Date()
  const days = opts.range === '7d' ? 7 : opts.range === '14d' ? 14 : opts.range === '90d' ? 90 : 30
  const from = opts.from ?? new Date(to.getTime() - days*24*60*60*1000)
  const calls = db.calls.filter(c => new Date(c.createdAt) >= from && new Date(c.createdAt) <= to && (!opts.agentId || c.agentId === opts.agentId))
  const callsCount = calls.length
  const avgDuration = callsCount ? Math.round(calls.reduce((a, b) => a + b.duration, 0) / callsCount) : 0
  const credits = Math.round(calls.reduce((a, b) => a + b.duration/60, 0))
  const llmCost = calls.reduce((a, b) => a + b.cost, 0)
  const successRate = callsCount ? Math.round((calls.filter(c => c.status === 'success').length / callsCount) * 100) : 0

  // series by day
  const byDay: Record<string, number> = {}
  calls.forEach(c => {
    const d = new Date(c.createdAt)
    const key = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    byDay[key] = (byDay[key] ?? 0) + 1
  })
  const series = Array.from({ length: days }).map((_, i) => {
    const d = new Date(to.getTime() - (days-1-i)*24*60*60*1000)
    const key = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    return { name: `${d.getMonth()+1}/${d.getDate()}`, value: byDay[key] ?? 0 }
  })

  return {
    agents: db.agents,
    totals: { calls: callsCount, avgDuration, credits, llmCost, successRate },
    series,
  }
}

export function getCalls(page = 1, size = 10) {
  seed()
  const start = (page - 1) * size
  const items = db.calls
    .slice()
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(start, start + size)
  return { items, total: db.calls.length, page, size }
}

export function getAgentMetrics() {
  seed()
  const now = new Date()
  const from = new Date(now.getTime() - 30*24*60*60*1000)
  return db.agents.map(a => {
    const calls30 = db.calls.filter(c => c.agentId === a.id && new Date(c.createdAt) >= from)
    const callsCount = calls30.length
    const roi = (1 + Math.random()*3).toFixed(2) + 'x'
  return { id: a.id, name: a.name, slug: a.slug, type: a.type, role: a.role, department: a.department, status: a.status, calls30d: callsCount, roi }
  })
}
