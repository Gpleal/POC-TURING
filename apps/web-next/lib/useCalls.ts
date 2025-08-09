"use client"

import { useEffect, useState } from 'react'
import { z } from 'zod'

const CallsSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    agentName: z.string(),
    duration: z.number(),
    cost: z.number(),
    status: z.string(),
  })),
  total: z.number(),
  page: z.number(),
  size: z.number(),
})

export function useCalls() {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [data, setData] = useState<z.infer<typeof CallsSchema> | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const params = new URLSearchParams({ page: String(page), size: String(size) })
        const res = await fetch(`/api/calls?${params.toString()}`)
        if (!res.ok) throw new Error('Failed to fetch calls')
        const json = await res.json()
        const parsed = CallsSchema.safeParse(json)
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
  }, [page, size])

  return { data, error, isLoading, setPage, setSize }
}
