import React from 'react'
import clsx from 'clsx'

export function DashboardShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('container max-w-7xl px-6 lg:px-10', className)}>
      {children}
    </div>
  )
}
