'use client'

import React from 'react'
import * as Select from '@radix-ui/react-select'
import { DashboardShell } from './DashboardShell'
import { StatCard } from './StatCard'
import { AreaChart, AreaChartSkeleton } from './AreaChart'
import { ThemeToggle } from './ThemeToggle'
import { useMetrics } from '@/lib/useMetrics'
import { useCalls } from '@/lib/useCalls'

export function DashboardPage() {
  const { data: metrics, isLoading: loadingMetrics, error: metricsError, setAgentId, setRange } = useMetrics()
  const { data: calls, isLoading: loadingCalls, error: callsError, setPage } = useCalls()

  const loading = loadingMetrics || loadingCalls
  const hasData = (metrics?.totals?.calls ?? 0) > 0

  return (
    <DashboardShell className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Good evening, Alex</h1>
          <p className="text-sm text-zinc-500">Here’s what’s happening with your agents.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select.Root onValueChange={(v) => setAgentId(v === 'all' ? undefined : v)}>
            <Select.Trigger className="min-w-[180px] justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700 inline-flex items-center gap-2">
              <Select.Value placeholder="All agents" />
            </Select.Trigger>
            <Select.Content className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1 text-sm shadow-lg">
              <Select.Item value="all" className="px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md">All agents</Select.Item>
              {metrics?.agents?.map(a => (
                <Select.Item key={a.id} value={a.id} className="px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md">{a.name}</Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
          <Select.Root onValueChange={(v) => setRange(v as any)}>
            <Select.Trigger className="min-w-[150px] justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700 inline-flex items-center gap-2">
              <Select.Value placeholder="Last month" />
            </Select.Trigger>
            <Select.Content className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1 text-sm shadow-lg">
              {['7d','14d','30d','90d'].map(r => (
                <Select.Item key={r} value={r} className="px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md">{r}</Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
          <ThemeToggle />
        </div>
      </header>

      {/* Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card animate-pulse"><div className="p-5 h-24" /></div>
          ))
        ) : metricsError ? (
          <div className="sm:col-span-2 lg:col-span-4 card p-5 text-sm text-red-600">Failed to load metrics.</div>
        ) : (
          <>
            <StatCard label="Number of calls" value={String(metrics?.totals?.calls ?? 0)} />
            <StatCard label="Average duration" value={`${metrics?.totals?.avgDuration ?? 0}s`} />
            <StatCard label="Total cost (credits)" value={String(metrics?.totals?.credits ?? 0)} />
            <StatCard label="Total LLM cost ($)" value={`$${metrics?.totals?.llmCost?.toFixed(2) ?? '0.00'}`} />
          </>
        )}
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {loading ? <AreaChartSkeleton /> : <AreaChart data={metrics?.series ?? []} />}
        </div>
        <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm ring-1 ring-zinc-200 dark:ring-zinc-800 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:ring-zinc-300 dark:hover:ring-zinc-700 p-4">
          <h3 className="text-sm font-medium text-zinc-500">Overall success rate</h3>
          <div className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{metrics?.totals?.successRate ?? 0}%</div>
          <p className="mt-1 text-xs text-zinc-500">Across selected period.</p>
        </div>
      </section>

      {/* Recent calls table */}
      <section className="rounded-2xl bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm ring-1 ring-zinc-200 dark:ring-zinc-800 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:ring-zinc-300 dark:hover:ring-zinc-700">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-500">Recent calls</h3>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 transition-all" onClick={() => setPage(Math.max(1, (calls?.page ?? 1) - 1))} aria-label="Previous page">Prev</button>
              <div>Page {calls?.page ?? 1} of {Math.max(1, Math.ceil((calls?.total ?? 0)/(calls?.size ?? 10)) )}</div>
              <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 transition-all" onClick={() => setPage((calls?.page ?? 1) + 1)} aria-label="Next page">Next</button>
            </div>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-zinc-500">
                  <th className="py-2">ID</th>
                  <th className="py-2">Agent</th>
                  <th className="py-2">Duration</th>
                  <th className="py-2">Cost</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse"><td className="py-3" colSpan={5}></td></tr>
                  ))
                ) : callsError ? (
                  <tr><td className="py-3 text-red-600" colSpan={5}>Failed to load calls.</td></tr>
                ) : (calls?.items?.length ? calls.items.map((c: { id: string; agentName: string; duration: number; cost: number; status: string }) => (
                  <tr key={c.id} className="border-t border-zinc-100 dark:border-zinc-800">
                    <td className="py-2">{c.id}</td>
                    <td className="py-2">{c.agentName}</td>
                    <td className="py-2">{c.duration}s</td>
                    <td className="py-2">{c.cost.toFixed(2)}</td>
                    <td className="py-2">{c.status}</td>
                  </tr>
                )) : (
                  <tr><td className="py-6" colSpan={5}><div className="text-center text-zinc-500">No metrics</div></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Empty banner */}
    {!loading && !hasData ? (
        <section>
      <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm ring-1 ring-zinc-200 dark:ring-zinc-800 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:ring-zinc-300 dark:hover:ring-zinc-700">
            <div className="p-6 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">No data yet</div>
                <div className="text-sm text-zinc-500">Create your first agent to see metrics</div>
              </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 transition-all">Create agent</button>
            </div>
          </div>
        </section>
      ) : null}
    </DashboardShell>
  )
}
