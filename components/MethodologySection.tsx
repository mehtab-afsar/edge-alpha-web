'use client'

import { useRef, useState, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { METHODOLOGY_CARDS, DIMENSIONS, EASE } from '@/lib/constants'

const RADIUS = 36
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function MiniGauge({ score, inView }: { score: number; inView: boolean }) {
  const offset = CIRCUMFERENCE * (1 - score / 100)
  return (
    <svg width="84" height="84" viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r={RADIUS} fill="none" stroke="#1a1a1a" strokeWidth="2" />
      <motion.circle
        cx="40"
        cy="40"
        r={RADIUS}
        fill="none"
        stroke="#c8ff00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        initial={{ strokeDashoffset: CIRCUMFERENCE }}
        animate={inView ? { strokeDashoffset: offset } : {}}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        style={{ transformOrigin: '40px 40px', rotate: '-90deg' }}
      />
      <text
        x="40"
        y="44"
        textAnchor="middle"
        fill="#ededed"
        fontSize="14"
        fontFamily="var(--font-jetbrains)"
        fontWeight="600"
      >
        {score}
      </text>
    </svg>
  )
}

export function MethodologySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [weights, setWeights] = useState<Record<string, number>>({
    Market: 78,
    Product: 71,
    GTM: 64,
    Financial: 82,
    Team: 59,
    Traction: 76,
  })

  const simulatedScore = useMemo(() => {
    const total = Object.values(weights).reduce((a, b) => a + b, 0)
    return Math.round(total / Object.keys(weights).length)
  }, [weights])

  const scoreColor =
    simulatedScore >= 80 ? '#c8ff00' : simulatedScore >= 65 ? '#ededed' : '#888'

  return (
    <section
      id="methodology"
      ref={sectionRef}
      className="section-py"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: '#0a0a0a' }}
    >
      <div className="max-container container-px">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: '4rem' }}
        >
          <span className="label-micro" style={{ display: 'block', marginBottom: '1.25rem' }}>
            The Methodology
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: '#ededed',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: '560px',
            }}
          >
            How we score what others guess
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginTop: '1rem', maxWidth: '480px', lineHeight: 1.65 }}>
            Q-Score isn&apos;t a black box. Every dimension has a rubric. Every rubric has sub-factors. Hover to explore — then adjust the weights yourself.
          </p>
        </motion.div>

        {/* 3-column card grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '5rem',
          }}
        >
          {METHODOLOGY_CARDS.map((card, i) => {
            const isExpanded = expandedCard === card.id
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
                onClick={() => setExpandedCard(isExpanded ? null : card.id)}
                style={{
                  background: isExpanded ? '#111' : '#0a0a0a',
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'background 200ms',
                  position: 'relative',
                }}
              >
                {/* Card top */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div>
                    <span className="label-micro" style={{ color: '#555', display: 'block', marginBottom: '0.5rem' }}>
                      Dimension
                    </span>
                    <span
                      style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: isExpanded ? '#c8ff00' : '#ededed',
                        letterSpacing: '-0.01em',
                        transition: 'color 200ms',
                      }}
                    >
                      {card.label}
                    </span>
                  </div>
                  <MiniGauge score={card.score} inView={inView} />
                </div>

                {/* Sub-factors (always visible, compact) */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: isExpanded ? '1.25rem' : 0 }}>
                  {card.subFactors.slice(0, isExpanded ? card.subFactors.length : 4).map((f) => (
                    <span
                      key={f}
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-jetbrains)',
                        color: '#555',
                        background: '#151515',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '4px',
                        padding: '3px 8px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {f}
                    </span>
                  ))}
                  {!isExpanded && card.subFactors.length > 4 && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-jetbrains)',
                        color: '#444',
                        padding: '3px 4px',
                      }}
                    >
                      +{card.subFactors.length - 4} more
                    </span>
                  )}
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        fontSize: '13px',
                        color: '#666',
                        lineHeight: 1.65,
                        fontFamily: 'var(--font-jetbrains)',
                        overflow: 'hidden',
                        marginTop: '0.5rem',
                      }}
                    >
                      {card.detail}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Expand indicator */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    right: '1.25rem',
                    fontSize: '11px',
                    color: isExpanded ? '#c8ff00' : '#333',
                    fontFamily: 'var(--font-jetbrains)',
                    transition: 'color 200ms',
                  }}
                >
                  {isExpanded ? '↑ collapse' : '↓ expand'}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Scoring Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          style={{
            background: '#0d0d0d',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
            padding: '2.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="label-micro" style={{ display: 'block', marginBottom: '0.75rem' }}>
                Scoring Simulator
              </span>
              <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6, maxWidth: '400px' }}>
                Adjust dimension scores to see how Q-Score responds. This is the exact formula we use — no secrets.
              </p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div
                style={{
                  fontSize: 'clamp(48px, 6vw, 72px)',
                  fontFamily: 'var(--font-jetbrains)',
                  fontWeight: 700,
                  color: scoreColor,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  transition: 'color 300ms',
                }}
              >
                {simulatedScore}
              </div>
              <div style={{ fontSize: '11px', color: '#444', fontFamily: 'var(--font-jetbrains)', letterSpacing: '0.12em', marginTop: '4px' }}>
                Q-SCORE PREVIEW
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {DIMENSIONS.map((dim) => (
              <div key={dim.label}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
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
                      color: '#c8ff00',
                      fontWeight: 600,
                    }}
                  >
                    {weights[dim.label]}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={weights[dim.label]}
                  onChange={(e) =>
                    setWeights((prev) => ({ ...prev, [dim.label]: parseInt(e.target.value) }))
                  }
                  style={{
                    width: '100%',
                    appearance: 'none',
                    height: '3px',
                    background: `linear-gradient(to right, #c8ff00 ${weights[dim.label]}%, #1a1a1a ${weights[dim.label]}%)`,
                    borderRadius: '2px',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                />
              </div>
            ))}
          </div>

          <p style={{ fontSize: '12px', color: '#333', marginTop: '1.75rem', fontFamily: 'var(--font-jetbrains)' }}>
            * Real Q-Score weights are learned from 2,400+ founder evaluations and VC feedback loops — this simulator uses equal weights for transparency.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
