'use client'

import React from 'react'
import * as Select from '@radix-ui/react-select'
import { ThemeToggle } from './ThemeToggle'

export function Header({ setAgentId, setRange, agents }: {
  setAgentId: (id?: string) => void;
  setRange: (r: '7d' | '14d' | '30d' | '90d') => void;
  agents: Array<{ id: string; name: string }> | undefined
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Good evening, Alex</h1>
        <p className="text-sm text-zinc-500">Here’s what’s happening with your agents.</p>
      </div>
      <div className="flex items-center gap-3">
        <Select.Root onValueChange={(v: string) => setAgentId(v === 'all' ? undefined : v)}>
          <Select.Trigger className="input min-w-[180px] justify-between">
            <Select.Value placeholder="All agents" />
          </Select.Trigger>
          <Select.Content className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1 text-sm shadow-lg">
            <Select.Item value="all" className="px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md">All agents</Select.Item>
            {agents?.map((a) => (
              <Select.Item key={a.id} value={a.id} className="px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md">{a.name}</Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <Select.Root onValueChange={(v: string) => setRange(v as any)}>
          <Select.Trigger className="input min-w-[150px] justify-between">
            <Select.Value placeholder="Last month" />
          </Select.Trigger>
          <Select.Content className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1 text-sm shadow-lg">
            {['7d','14d','30d','90d'].map((r) => (
              <Select.Item key={r} value={r} className="px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md">{r}</Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <ThemeToggle />
      </div>
    </div>
  )
}
