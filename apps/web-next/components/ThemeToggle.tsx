'use client'

import React, { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [dark, setDark] = useState(false)
  useEffect(() => { setMounted(true); setDark(document.documentElement.classList.contains('dark')) }, [])
  if (!mounted) return null
  return (
    <button
      aria-label="Toggle theme"
      className="btn"
      onClick={() => {
        const next = !dark
        setDark(next)
        document.documentElement.classList.toggle('dark', next)
        try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch {}
      }}
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
