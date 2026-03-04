import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        surface: '#0a0a0a',
        'surface-2': '#111111',
        primary: '#ededed',
        secondary: '#888888',
        tertiary: '#555555',
        ghost: '#333333',
        border: 'rgba(255,255,255,0.06)',
        'border-hi': 'rgba(255,255,255,0.12)',
        accent: '#c8ff00',
        'accent-muted': 'rgba(200,255,0,0.15)',
        'accent-dim': '#a8d900',
        error: '#ff3333',
        success: '#00cc88',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        micro: ['11px', { lineHeight: '1.4', letterSpacing: '0.15em' }],
        sm2: ['13px', { lineHeight: '1.5' }],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(200,255,0,0.35)' },
          '70%': { boxShadow: '0 0 0 10px rgba(200,255,0,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(200,255,0,0)' },
        },
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
