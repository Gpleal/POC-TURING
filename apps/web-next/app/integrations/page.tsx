'use client'

import React from 'react'

const firstRow = ['Slack','Notion','Gmail','Google Calendar','HubSpot','Salesforce']
const rest = Array.from({ length: 100 }).map((_, i) => `Integration ${i+1}`)

export default function IntegrationsPage() {
  return (
    <div className="container max-w-7xl px-6 lg:px-10">
      <div className="py-6">
        <h1 className="text-2xl font-semibold tracking-tight">Integrations</h1>
        <p className="text-sm text-zinc-500">Connect your tools to power your agents.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {firstRow.map((name) => (
          <div key={name} className="rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm p-4 flex items-center justify-between">
            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{name}</div>
            <button className="inline-flex items-center rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 transition-all">Activate</button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-sm font-medium text-zinc-500">More integrations</h2>
        <ul className="mt-3 space-y-2">
          {rest.map((name) => (
            <li key={name} className="rounded-xl ring-1 ring-zinc-200 dark:ring-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm px-4 py-2 text-sm flex items-center justify-between">
              <span>{name}</span>
              <button className="inline-flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 px-2 py-1 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 transition-all">Activate</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
