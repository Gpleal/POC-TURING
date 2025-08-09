import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui']
      },
      container: {
        center: true,
        padding: '1.5rem',
      },
      transitionDuration: {
        300: '300ms'
      }
    },
  },
  plugins: [],
} satisfies Config
