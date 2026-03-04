'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EASE } from '@/lib/constants'

const HEADLINE_WORDS = ['The', 'edge', 'is', 'knowing', 'your', 'number.']
const HIGHLIGHT_WORD = 'number.'

export function CTASection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      ref={ref}
      id="cta"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,255,0,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top border */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'rgba(255,255,255,0.04)',
        }}
      />

      <div
        className="max-container container-px"
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '2rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Micro label */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="label-micro"
        >
          Get Started
        </motion.span>

        {/* Headline — word by word */}
        <h2
          style={{
            fontSize: 'clamp(40px, 7vw, 88px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#ededed',
            maxWidth: '760px',
          }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: EASE }}
              style={{
                display: 'inline-block',
                marginRight: '0.28em',
                color: word === HIGHLIGHT_WORD ? '#c8ff00' : '#ededed',
              }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
          style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            color: '#555',
            lineHeight: 1.65,
            maxWidth: '440px',
          }}
        >
          Complete a 25-question AI interview. Get your Q-Score. Unlock 9 agents and 45
          deliverables ready to execute.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.85, ease: EASE }}
        >
          <a
            href="#qscore"
            data-cursor="cta"
            className="animate-pulse-ring"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#c8ff00',
              color: '#050505',
              padding: '16px 40px',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '16px',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'opacity 200ms ease',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            Get Your Q-Score
          </a>
        </motion.div>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.1, ease: EASE }}
          style={{
            fontSize: '13px',
            color: '#333',
            fontFamily: 'var(--font-jetbrains)',
          }}
        >
          Free to evaluate. Agents unlock after score.
        </motion.p>
      </div>
    </section>
  )
}
