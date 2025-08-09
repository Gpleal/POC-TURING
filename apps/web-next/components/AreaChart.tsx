"use client"

import React from 'react'
import { AreaChart as RC_AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function AreaChart({ data, color = '#6366F1' }: { data: Array<{ name: string; value: number }>; color?: string }) {
  return (
    <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm ring-1 ring-zinc-200 dark:ring-zinc-800 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:ring-zinc-300 dark:hover:ring-zinc-700">
      <div className="p-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RC_AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" className="dark:opacity-20" />
              <XAxis dataKey="name" tick={{ fill: '#71717a' }} tickLine={false} axisLine={{ stroke: '#e4e4e7' }} />
              <YAxis tick={{ fill: '#71717a' }} tickLine={false} axisLine={{ stroke: '#e4e4e7' }} />
              <Tooltip contentStyle={{ background: 'rgba(24,24,27,0.9)', border: '1px solid #27272a', borderRadius: 12, color: '#fafafa' }} cursor={{ stroke: '#94a3b8', strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="value" stroke={color} fill="url(#fillColor)" strokeWidth={2} />
            </RC_AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export function AreaChartSkeleton() {
  return (
    <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm ring-1 ring-zinc-200 dark:ring-zinc-800 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.2)] animate-pulse">
      <div className="p-4 h-64" />
    </div>
  )
}
