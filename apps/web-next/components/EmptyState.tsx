import React from 'react'

export function EmptyState({ title = 'No metrics', ctaLabel, onCta }: { title?: string; ctaLabel?: string; onCta?: () => void }) {
  return (
    <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm ring-1 ring-zinc-200 dark:ring-zinc-800 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:ring-zinc-300 dark:hover:ring-zinc-700">
      <div className="p-8 text-center">
        <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">ℹ️</div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{title}</h3>
        <p className="mt-1 text-sm text-zinc-500">Get started by creating your first agent to see analytics here.</p>
        {ctaLabel ? (
          <button onClick={onCta} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 transition-all">{ctaLabel}</button>
        ) : null}
      </div>
    </div>
  )
}
