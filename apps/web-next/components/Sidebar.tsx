'use client'

import React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MessageSquare, Users, Plug2, Settings, CreditCard } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

const nav: { href: Route; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/agents', label: 'Agents', icon: Users },
  { href: '/integrations', label: 'Integrations', icon: Plug2 },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="flex h-full w-64 flex-col border-r border-zinc-200/70 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm">
      <div className="px-4 py-4">
        <div className="text-sm font-medium text-zinc-500">Chat All-In</div>
      </div>
      <nav className="flex-1 px-2">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname?.startsWith(href)
          return (
            <Link key={href} href={href} className={clsx(
              'group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all',
              'hover:bg-zinc-100/70 dark:hover:bg-zinc-900/60',
              active ? 'bg-zinc-100/70 dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'
            )}>
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-3">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-left text-sm hover:bg-zinc-100/70 dark:hover:bg-zinc-900/60 flex items-center gap-3">
              <img alt="avatar" src="https://i.pravatar.cc/48" className="h-8 w-8 rounded-full" />
              <div className="truncate">
                <div className="text-zinc-900 dark:text-zinc-100">Alex Johnson</div>
                <div className="text-xs text-zinc-500 truncate">alex@example.com</div>
              </div>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="min-w-[200px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1 text-sm shadow-xl">
            <Link href={'/settings' as Route} className="flex items-center gap-2 rounded-md px-3 py-2 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800"><Settings className="h-4 w-4" /> Settings</Link>
            <Link href={'/billing' as Route} className="flex items-center gap-2 rounded-md px-3 py-2 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800"><CreditCard className="h-4 w-4" /> Billing</Link>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </aside>
  )
}
