'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { PROBLEM_CARDS, EASE } from '@/lib/constants'

export function ProblemSection() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const leftInView = useInView(leftRef, { once: true, amount: 0.3 })
  const rightInView = useInView(rightRef, { once: true, amount: 0.2 })

  const statement = 'Founders raise blind. Investors drown in noise. Nobody has signal.'
  const lines = statement.split('. ').filter(Boolean)

  return (
    <section
      id="problem"
      className="section-py"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <div className="max-container container-px grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Left — statement */}
        <div ref={leftRef}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="label-micro"
            style={{ display: 'block', marginBottom: '2rem' }}
          >
            The Problem
          </motion.span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={leftInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: EASE }}
                style={{
                  fontSize: 'clamp(22px, 3vw, 36px)',
                  fontWeight: 600,
                  color: i === lines.length - 1 ? '#ededed' : '#555',
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  paddingBottom: '1.25rem',
                }}
              >
                {line}.
              </motion.p>
            ))}
          </div>
        </div>

        {/* Right — stat cards */}
        <div
          ref={rightRef}
          className="md:pt-14"
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {PROBLEM_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 32 }}
              animate={rightInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.14, ease: EASE }}
              style={{
                background: '#0a0a0a',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '8px',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  fontWeight: 700,
                  color: '#ededed',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.4rem',
                  lineHeight: 1,
                }}
              >
                {card.stat}
              </div>
              <div
                style={{
                  fontSize: '15px',
                  color: '#888',
                  lineHeight: 1.5,
                  marginBottom: '0.5rem',
                }}
              >
                {card.headline}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: '#444',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                }}
              >
                {card.subtext}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
