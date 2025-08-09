import { prisma } from '@/lib/db.prisma'
import { AGENT_PRESETS } from '@/presets/agents'

async function main() {
  // create a few agents from presets
  const chosen = ['BILLING','INVOICE_ISSUER','SCHEDULER'] as const
  for (const t of chosen) {
    const p = AGENT_PRESETS.find(a => a.type === t)!
    const slug = p.displayName.toLowerCase().replace(/[^a-z0-9]+/g,'-')
    const exists = await prisma.agent.findUnique({ where: { slug } as any })
    if (exists) continue
    await prisma.agent.create({ data: {
      name: p.displayName,
      slug,
      type: p.type as any,
      status: 'active' as any,
      description: p.shortDesc,
      config: p.defaultConfig as any,
    } as any })
  }
  console.log('Seed complete')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(async () => { await prisma.$disconnect() })
