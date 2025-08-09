'use client'

import React, { useState } from 'react'
import clsx from 'clsx'

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hello! I am your assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    const text = input
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: text }])
    setLoading(true)
    // simulate response
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', content: `You said: ${text}` }])
      setLoading(false)
    }, 600)
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
      <div className="mx-auto">
        <div className="text-center py-6">
          <h1 className="text-2xl font-semibold tracking-tight">Chat</h1>
          <p className="text-sm text-zinc-500">Chat exactly like ChatGPT.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm">
          <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={clsx('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={clsx('max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm',
                  m.role === 'user' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                )}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-center text-xs text-zinc-500">Assistant is typing…</div>
            )}
          </div>
          <form onSubmit={onSend} className="border-t border-zinc-200 dark:border-zinc-800 p-3 flex items-center gap-3">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
              placeholder="Send a message" aria-label="Message input" />
            <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 transition-all" disabled={loading}>Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}
