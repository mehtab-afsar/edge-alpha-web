'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const rafRef = useRef<number>(0)
  const menuRef = useRef<HTMLDivElement>(null)

  // Read Lenis scroll position via CSS var
  useEffect(() => {
    const check = () => {
      const scroll = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--lenis-scroll') || '0'
      )
      setScrolled(scroll > 80)
      rafRef.current = requestAnimationFrame(check)
    }
    rafRef.current = requestAnimationFrame(check)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Trap focus in mobile menu
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          transition: 'background 300ms ease, backdrop-filter 300ms ease, border-bottom 300ms ease',
          background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div
          className="max-container container-px"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
        >
          {/* Wordmark */}
          <a
            href="/"
            data-cursor="interactive"
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#ededed',
              textDecoration: 'none',
            }}
          >
            EDGE ALPHA
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex"
            style={{ alignItems: 'center', gap: '2rem' }}
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="interactive"
                style={{
                  fontSize: '13px',
                  color: '#888',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  transition: 'color 200ms ease',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#ededed')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#888')}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#qscore"
              data-cursor="cta"
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#050505',
                background: '#c8ff00',
                padding: '7px 18px',
                borderRadius: '4px',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'opacity 200ms ease',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.85')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
            >
              Request Access
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: '#ededed',
                transition: 'transform 300ms ease, opacity 300ms ease',
                transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: '#ededed',
                transition: 'opacity 300ms ease',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: '#ededed',
                transition: 'transform 300ms ease, opacity 300ms ease',
                transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: '#050505',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#ededed',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#qscore"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: NAV_LINKS.length * 0.08 }}
              onClick={() => setMobileOpen(false)}
              style={{
                marginTop: '1rem',
                fontSize: '16px',
                fontWeight: 600,
                color: '#050505',
                background: '#c8ff00',
                padding: '12px 32px',
                borderRadius: '4px',
                textDecoration: 'none',
              }}
            >
              Request Access
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
