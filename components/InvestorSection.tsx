'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MOCK_FOUNDERS, MockFounder, EASE } from '@/lib/constants'
import { useCountUp } from '@/hooks/useCountUp'

const INVESTOR_STATS = [
  { value: 65, suffix: '+', label: 'Q-Score threshold' },
  { value: 7, suffix: 'min', label: 'avg eval time' },
  { value: 45, suffix: '', label: 'artifacts per founder' },
]

function StatBox({
  value,
  suffix,
  label,
  delay,
}: {
  value: number
  suffix: string
  label: string
  delay: number
}) {
  const { ref, displayValue } = useCountUp({ target: value, duration: 1200, delay: delay * 1000 })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '8px',
        padding: '1.25rem 1.5rem',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 'clamp(24px, 3vw, 32px)',
          fontWeight: 700,
          color: '#ededed',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}
      >
        {displayValue}
      </div>
      <div style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>{label}</div>
    </div>
  )
}

function MockDealFlow({ inView }: { inView: boolean }) {
  function initials(name: string) {
    return name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
  }

  return (
    <div
      style={{
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '1.5rem',
        width: '100%',
        maxWidth: '420px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-jetbrains)',
            color: '#555',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Your Deal Flow
        </span>
        <span
          style={{
            fontSize: '11px',
            color: '#333',
            fontFamily: 'var(--font-jetbrains)',
          }}
        >
          Thesis matched
        </span>
      </div>

      {/* Founder rows */}
      {MOCK_FOUNDERS.map((founder: MockFounder, i: number) => (
        <motion.div
          key={founder.name}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: EASE }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            marginBottom: '6px',
            borderRadius: '8px',
            background: founder.isTopMatch
              ? 'rgba(200,255,0,0.04)'
              : 'rgba(255,255,255,0.02)',
            border: founder.isTopMatch
              ? '1px solid rgba(200,255,0,0.15)'
              : '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {/* Left: avatar + name + sector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: '#1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontFamily: 'var(--font-jetbrains)',
                color: '#555',
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              {initials(founder.name)}
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#ededed', fontWeight: 500 }}>
                {founder.name}
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: '#444',
                  fontFamily: 'var(--font-jetbrains)',
                  letterSpacing: '0.05em',
                  marginTop: '1px',
                }}
              >
                {founder.sector}
              </div>
            </div>
          </div>

          {/* Right: Q-Score + match */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '14px',
                fontWeight: 700,
                color: founder.isTopMatch ? '#c8ff00' : '#ededed',
              }}
            >
              Q{founder.qScore}
            </span>
            <span style={{ fontSize: '11px', color: '#444' }}>
              {founder.matchPct}% match
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function InvestorSection() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const leftInView = useInView(leftRef, { once: true, amount: 0.3 })
  const rightInView = useInView(rightRef, { once: true, amount: 0.2 })

  return (
    <section
      id="investors"
      className="section-py"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <div className="max-container container-px grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center w-full">
        {/* Left — copy */}
        <div ref={leftRef}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="label-micro"
            style={{ display: 'block', marginBottom: '1.25rem' }}
          >
            For Investors
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: '#ededed',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}
          >
            Deal flow,{' '}
            <span style={{ color: '#888' }}>filtered by AI.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '420px',
            }}
          >
            Stop reading pitch decks. Start reading Q-Scores. Every founder on the
            marketplace has been independently evaluated across 6 dimensions by 9 AI agents.
          </motion.p>

          {/* Stat boxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {INVESTOR_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={leftInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE }}
              >
                <StatBox
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  delay={0.3 + i * 0.1}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — mock UI */}
        <motion.div
          ref={rightRef}
          initial={{ opacity: 0, x: 40 }}
          animate={rightInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex justify-center md:justify-center"
        >
          <MockDealFlow inView={rightInView} />
        </motion.div>
      </div>
    </section>
  )
}
