import { DashboardShell } from './DashboardShell'
import { Header } from './Header'
import { StatCard } from './StatCard'
import { AreaChart, AreaChartSkeleton } from './AreaChart'
import { getMetrics } from '@/lib/db'

// Simple server component for initial render using in-memory provider
export default async function DashboardPageServer() {
  const metrics = getMetrics({})
  return (
    <DashboardShell className="space-y-6">
      <Header setAgentId={() => {}} setRange={() => {}} agents={metrics.agents} />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Number of calls" value={String(metrics?.totals?.calls ?? 0)} />
        <StatCard label="Average duration" value={`${metrics?.totals?.avgDuration ?? 0}s`} />
        <StatCard label="Total cost (credits)" value={String(metrics?.totals?.credits ?? 0)} />
        <StatCard label="Total LLM cost ($)" value={`$${metrics?.totals?.llmCost?.toFixed(2) ?? '0.00'}`} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <AreaChart data={metrics?.series ?? []} />
        </div>
        <div className="card p-4">
          <h3 className="text-sm font-medium text-zinc-500">Overall success rate</h3>
          <div className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{metrics?.totals?.successRate ?? 0}%</div>
          <p className="mt-1 text-xs text-zinc-500">Across selected period.</p>
        </div>
      </section>
    </DashboardShell>
  )
}
