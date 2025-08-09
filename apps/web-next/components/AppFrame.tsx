'use client'

import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

type Children = React.ReactNode | undefined
export type AppFrameProps = { children?: Children }
export function AppFrame({ children }: AppFrameProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-dvh grid grid-cols-1 md:grid-cols-[16rem_1fr]">
      {/* Desktop sidebar */}
      <div className="hidden md:block"><Sidebar /></div>
      <div className="min-w-0">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-30 border-b border-zinc-200/70 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm md:hidden">
          <div className="container max-w-7xl px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between">
            <button aria-label="Open menu" className="rounded-lg p-2 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/60" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div className="text-sm font-medium text-zinc-500">Chat All-In</div>
            <ThemeToggle />
          </div>
        </div>
        {/* Content */}
        <main className="py-6">{children}</main>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} aria-label="Close menu overlay" />
          <div className="absolute inset-y-0 left-0 w-64 shadow-xl">
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  )
}
