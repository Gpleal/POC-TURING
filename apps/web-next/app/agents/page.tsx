'use client'

import React, { useEffect, useMemo, useState } from 'react'

type Row = { id: string; name: string; slug?: string; type?: string; role: string; calls30d: number; status: string; department: string; roi: string }

const TYPES = ['SCHEDULER','REMINDER','BILLING','INVOICE_ISSUER','EMAIL_CLASSIFIER','AUTO_REPLY','CV_SCREENING','STOCK_CONTROL','DOC_DISPATCH','FIN_REPORTS','PAYMENT_RECON']
const STATUSES = ['active','paused']

export default function AgentsPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [showNew, setShowNew] = useState(false)

  async function load(params?: { q?: string; type?: string; status?: string }) {
    setLoading(true)
    const usp = new URLSearchParams()
    if (params?.q) usp.set('q', params.q)
    if (params?.type) usp.set('type', params.type)
    if (params?.status) usp.set('status', params.status)
    try {
      const res = await fetch(`/api/agents?${usp.toString()}`)
      if (!res.ok) throw new Error('Failed to load agents')
      const json = await res.json()
      setRows(json.items as Row[])
      setError(null)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filteredText = useMemo(() => {
    const bits = [] as string[]
    if (q) bits.push(`“${q}”`)
    if (type) bits.push(type)
    if (status) bits.push(status)
    return bits.join(' · ')
  }, [q, type, status])

  return (
    <div className="container max-w-7xl px-6 lg:px-10">
      <div className="py-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Agents</h1>
          <p className="text-sm text-zinc-500">{filteredText || 'Overview of your agents and performance.'}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowNew(true)} className="rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-3 py-2 text-sm">New Agent</button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name" className="px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950" />
        <select className="px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950" value={type} onChange={e=>setType(e.target.value)}>
          <option value="">All types</option>
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950" value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="">All status</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={()=>load({ q, type, status })} className="px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800">Apply</button>
        <button onClick={()=>{ setQ(''); setType(''); setStatus(''); load({}) }} className="px-3 py-2 text-sm rounded-lg">Reset</button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_,i)=>(<div key={i} className="h-32 rounded-xl border border-zinc-200 dark:border-zinc-800 animate-pulse" />))}
        </div>
      ) : error ? (
        <div className="text-red-600 text-sm">{error}</div>
      ) : rows.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rows.map(a => (
            <div key={a.id} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
              <div className="flex items-center justify-between">
                <div className="font-medium">{a.name}</div>
                <span className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs ring-1 ring-zinc-200 dark:ring-zinc-800">
                  <span className={a.status === 'active' ? 'h-2 w-2 rounded-full bg-green-500' : 'h-2 w-2 rounded-full bg-zinc-400'} />
                  {a.status}
                </span>
              </div>
              <div className="text-xs text-zinc-500 mt-1">{a.type || a.role}</div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="text-zinc-500">Calls (30d)</div>
                <div className="font-medium">{a.calls30d}</div>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <div className="text-zinc-500">ROI</div>
                <div className="font-medium">{a.roi}</div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <a className="text-xs text-indigo-600 hover:underline" href={a.slug ? `/agents/${a.slug}` : '#'}>Details</a>
                <button onClick={()=>{
                  fetch(`/api/agents/${a.slug ?? a.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}/runs`, { method: 'POST', body: JSON.stringify({ input: { test: true } }), headers: { 'Content-Type': 'application/json' } })
                }} className="text-xs text-zinc-600 hover:underline">Run now</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 p-8 text-center text-sm text-zinc-500">
          No agents yet. <button onClick={()=>setShowNew(true)} className="text-indigo-600 hover:underline">Create your first agent</button>
        </div>
      )}

      {showNew && <NewAgentModal onClose={()=>setShowNew(false)} />}
    </div>
  )
}

function NewAgentModal({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState('BILLING')
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  async function save() {
    setSaving(true)
    try {
      const res = await fetch('/api/agents', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, name: name || undefined }) })
      if (!res.ok) throw new Error('Failed to create')
      onClose()
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setSaving(false)
    }
  }
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">New Agent</div>
          <button onClick={onClose} className="text-sm text-zinc-500">Close</button>
        </div>
        <div className="space-y-3">
          <label className="block">
            <div className="text-xs text-zinc-500 mb-1">Preset</div>
            <select value={type} onChange={e=>setType(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <label className="block">
            <div className="text-xs text-zinc-500 mb-1">Name</div>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Optional" className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950" />
          </label>
          {err && <div className="text-xs text-red-600">{err}</div>}
          <div className="flex items-center justify-end gap-2">
            <button onClick={onClose} className="px-3 py-2 text-sm rounded-lg">Cancel</button>
            <button onClick={save} disabled={saving} className="px-3 py-2 text-sm rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">{saving ? 'Creating…' : 'Create'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
