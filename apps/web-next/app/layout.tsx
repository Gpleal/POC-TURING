import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppFrame } from '@/components/AppFrame'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500', '600'] })

export const metadata: Metadata = {
  title: 'Dashboard — Chat All-In',
  description: 'Minimal, clean, and accessible analytics dashboard',
}

function ThemeScript() {
  // Prevent FOUC: set initial theme from localStorage or prefers-color-scheme
  const code = `
  try {
    const ls = localStorage.getItem('theme');
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const theme = ls || (mql.matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch {}
  `
  // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted inline
  return <script dangerouslySetInnerHTML={{ __html: code }} />
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 antialiased">
        <ThemeScript />
  <AppFrame>{children}</AppFrame>
      </body>
    </html>
  )
}
