import React from 'react'

export function StatCard({ label, value, hint, children }: {
  label: string; value: string; hint?: string; children?: React.ReactNode;
}) {
  return (
    <div className="group rounded-2xl bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm ring-1 ring-zinc-200 dark:ring-zinc-800 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:ring-zinc-300 dark:hover:ring-zinc-700">
      <div className="p-5">
        <div className="text-sm font-medium text-zinc-500">{label}</div>
        <div className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{value}</div>
        {hint ? <div className="mt-1 text-xs text-zinc-500">{hint}</div> : null}
        {children}
      </div>
    </div>
  );
}
