'use client'

import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '@/lib/constants'

const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

const TERMINAL_LINES = [
  '> Initializing EDGE-ALPHA terminal...',
  '> Loading founder profile...',
  '> Running deep evaluation scan...',
  '> Market signal: HIGH CONVICTION',
  '> Team quality: EXCEPTIONAL',
  '> Investor Q-Score: 91',
  '> Status: PRIORITY CANDIDATE',
  '',
  '> Early access code: EDGE-ALPHA-FIRST50',
  '> Use this at checkout for 50% off founding plan.',
  '',
  '> Welcome to the future of founder evaluation.',
]

export function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false)
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const keysRef = useRef<string[]>([])

  // Listen for Konami sequence
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keysRef.current = [...keysRef.current, e.key].slice(-KONAMI.length)
      if (keysRef.current.join(',') === KONAMI.join(',')) {
        setIsOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Listen for Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  // Reveal lines with staggered timeouts
  useEffect(() => {
    if (!isOpen) {
      setVisibleLines([])
      return
    }
    setVisibleLines([])
    const timeouts: ReturnType<typeof setTimeout>[] = []
    TERMINAL_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line])
      }, 300 + i * 260)
      timeouts.push(t)
    })
    return () => timeouts.forEach(clearTimeout)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9000,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Edge Alpha secret terminal"
            style={{
              background: '#080808',
              border: '1px solid rgba(200,255,0,0.25)',
              borderRadius: '8px',
              padding: '2rem',
              width: '100%',
              maxWidth: '560px',
              fontFamily: 'var(--font-jetbrains)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#c8ff00',
                    animation: 'blink 1.5s step-end infinite',
                  }}
                />
                <span
                  style={{
                    fontSize: '11px',
                    color: '#c8ff00',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  EDGE-ALPHA TERMINAL v1.0
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#555',
                  cursor: 'pointer',
                  fontSize: '20px',
                  lineHeight: 1,
                  padding: '2px 6px',
                }}
                aria-label="Close terminal"
              >
                ×
              </button>
            </div>

            {/* Terminal lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    fontSize: '13px',
                    lineHeight: 1.7,
                    minHeight: line === '' ? '10px' : 'auto',
                    color: line.includes('EDGE-ALPHA-FIRST50')
                      ? '#c8ff00'
                      : line.includes('Investor Q-Score')
                      ? '#c8ff00'
                      : line.includes('PRIORITY') || line.includes('EXCEPTIONAL') || line.includes('HIGH CONVICTION')
                      ? '#ededed'
                      : line.startsWith('>')
                      ? '#888'
                      : '#555',
                    fontWeight: line.includes('EDGE-ALPHA-FIRST50') ? 700 : 400,
                    letterSpacing: line.includes('EDGE-ALPHA-FIRST50') ? '0.06em' : 'normal',
                  }}
                >
                  {line}
                  {i === visibleLines.length - 1 &&
                    visibleLines.length < TERMINAL_LINES.length && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '13px',
                          background: '#c8ff00',
                          marginLeft: '2px',
                          verticalAlign: 'text-bottom',
                          animation: 'blink 1s step-end infinite',
                        }}
                        aria-hidden="true"
                      />
                    )}
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                fontSize: '11px',
                color: '#333',
              }}
            >
              Press ESC or click outside to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
