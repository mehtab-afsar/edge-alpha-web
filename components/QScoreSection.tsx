'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Q_SCORE_TARGET, Q_SCORE_LABEL, DIMENSIONS, EASE } from '@/lib/constants'
import { useCountUp } from '@/hooks/useCountUp'

const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const FILLED_OFFSET = CIRCUMFERENCE * (1 - Q_SCORE_TARGET / 100)

export function QScoreSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.35 })

  const { ref: counterRef, displayValue } = useCountUp({
    target: Q_SCORE_TARGET,
    duration: 1500,
  })

  return (
    <section
      id="qscore"
      ref={sectionRef}
      className="section-py"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        background: '#050505',
      }}
    >
      <div className="max-container container-px" style={{ width: '100%' }}>
        {/* Header */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="label-micro"
          style={{ display: 'block', marginBottom: '3rem' }}
        >
          The Q-Score
        </motion.span>

        {/* Main content: score display + dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left — score */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Score + gauge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
              {/* SVG Gauge */}
              <div style={{ flexShrink: 0 }}>
                <svg
                  width="140"
                  height="140"
                  viewBox="0 0 120 120"
                  aria-label={`Q-Score gauge showing ${Q_SCORE_TARGET} out of 100`}
                  role="img"
                >
                  {/* Track */}
                  <circle
                    cx="60"
                    cy="60"
                    r={RADIUS}
                    fill="none"
                    stroke="#1a1a1a"
                    strokeWidth="2.5"
                  />
                  {/* Filled arc */}
                  <motion.circle
                    cx="60"
                    cy="60"
                    r={RADIUS}
                    fill="none"
                    stroke="#c8ff00"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    initial={{ strokeDashoffset: CIRCUMFERENCE }}
                    animate={inView ? { strokeDashoffset: FILLED_OFFSET } : {}}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{
                      transformOrigin: '60px 60px',
                      rotate: '-90deg',
                    }}
                  />
                </svg>
              </div>

              {/* Score number */}
              <div>
                <div
                  ref={counterRef as React.RefObject<HTMLDivElement>}
                  style={{
                    fontSize: 'clamp(64px, 9vw, 112px)',
                    fontFamily: 'var(--font-jetbrains)',
                    fontWeight: 700,
                    color: '#ededed',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {inView ? displayValue : '0'}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.6, ease: EASE }}
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-jetbrains)',
                    letterSpacing: '0.14em',
                    color: '#c8ff00',
                    marginTop: '0.5rem',
                    fontWeight: 500,
                  }}
                >
                  {Q_SCORE_LABEL}
                </motion.div>
              </div>
            </div>

            {/* Supporting copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              style={{
                fontSize: '15px',
                color: '#555',
                lineHeight: 1.65,
                maxWidth: '380px',
              }}
            >
              Scored across a 25-question AI interview. Bluff detection included.
              Evaluated on 6 business dimensions.
            </motion.p>
          </div>

          {/* Right — dimension bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {DIMENSIONS.map((dim, i) => (
              <motion.div
                key={dim.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.8 + i * 0.1, ease: EASE }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '6px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {dim.label}
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      fontFamily: 'var(--font-jetbrains)',
                      color: '#555',
                    }}
                  >
                    {dim.value}
                  </span>
                </div>
                <div
                  style={{
                    height: '3px',
                    background: '#151515',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    style={{ height: '100%', borderRadius: '2px', background: '#ededed' }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${dim.value}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 2.0 + i * 0.1, ease: EASE }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
