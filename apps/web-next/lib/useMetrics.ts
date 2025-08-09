"use client"

import { useEffect, useState } from 'react'
import { z } from 'zod'

export type Range = '7d' | '14d' | '30d' | '90d'

const MetricsSchema = z.object({
  agents: z.array(z.object({ id: z.string(), name: z.string() })),
  totals: z.object({
    calls: z.number(),
    avgDuration: z.number(),
    credits: z.number(),
    llmCost: z.number(),
    successRate: z.number(),
  }),
  series: z.array(z.object({ name: z.string(), value: z.number() }))
})

export function useMetrics() {
  const [agentId, setAgentId] = useState<string | undefined>(undefined)
  const [range, setRange] = useState<Range>('30d')
  const [data, setData] = useState<z.infer<typeof MetricsSchema> | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (agentId) params.set('agentId', agentId)
        params.set('range', range)
        const res = await fetch(`/api/metrics?${params.toString()}`)
        if (!res.ok) throw new Error('Failed to fetch metrics')
        const json = await res.json()
        const parsed = MetricsSchema.safeParse(json)
        if (!parsed.success) throw new Error('Invalid response shape')
        if (!cancelled) setData(parsed.data)
        setError(null)
      } catch (e: any) {
        if (!cancelled) setError(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [agentId, range])

  return { data, error, isLoading, setAgentId, setRange }
}
