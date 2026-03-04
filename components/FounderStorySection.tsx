'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { EASE } from '@/lib/constants'

const STORY_PANELS = [
  {
    id: 1,
    qScore: 52,
    label: 'Starting point',
    headline: 'Rejected 3 times. No feedback.',
    detail: 'Great product. Terrible pitch. Investors couldn\'t see what Sarah knew was true.',
    agent: null,
    artifact: null,
    accentColor: '#555',
  },
  {
    id: 2,
    qScore: 61,
    label: 'Week 1',
    headline: 'PATEL rebuilt her ICP in 4 minutes.',
    detail: 'Patel identified 47 enterprise ICPs she\'d been ignoring. New outreach sequence sent.',
    agent: 'PATEL',
    artifact: 'ICP Document',
    accentColor: '#888',
  },
  {
    id: 3,
    qScore: 68,
    label: 'Week 2',
    headline: 'SUSI wrote the sales script.',
    detail: 'Her close rate went from 8% to 23% in 2 weeks. Three enterprise demos booked.',
    agent: 'SUSI',
    artifact: 'Sales Playbook',
    accentColor: '#aaa',
  },
  {
    id: 4,
    qScore: 74,
    label: 'Week 3',
    headline: 'FELIX modeled the unit economics.',
    detail: 'First time her financial story held up to a CFO\'s scrutiny. CAC:LTV = 1:4.8.',
    agent: 'FELIX',
    artifact: 'Financial Model',
    accentColor: '#ccc',
  },
  {
    id: 5,
    qScore: null,
    label: 'Week 6',
    headline: 'Raised $2.1M from Accel.',
    detail: '14 days after her final evaluation. Term sheet signed on a Thursday.',
    agent: null,
    artifact: null,
    accentColor: '#c8ff00',
    isOutcome: true,
  },
  {
    id: 6,
    qScore: 81,
    label: 'Portfolio tracking',
    headline: '"Best $99 I ever spent."',
    detail: 'Now on the investor side. Her Q-Score keeps improving as her company scales.',
    agent: null,
    artifact: null,
    accentColor: '#c8ff00',
    isEpilogue: true,
  },
]

export function FounderStorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      id="founder-story"
      ref={sectionRef}
      className="section-py"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: '#050505', overflow: 'hidden' }}
    >
      <div className="max-container container-px" style={{ marginBottom: '2.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="label-micro" style={{ display: 'block', marginBottom: '1.25rem' }}>
            The Founders Who Beat the System
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: '#ededed',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: '580px',
            }}
          >
            Sarah went from Q-Score 52 to raising $2.1M. In 6 weeks.
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginTop: '1rem', lineHeight: 1.65 }}>
            Scroll through her story →
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '1px',
          paddingLeft: 'max(1.5rem, calc((100vw - 1200px) / 2 + 1.5rem))',
          paddingRight: '3rem',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {STORY_PANELS.map((panel, i) => (
          <motion.div
            key={panel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: EASE }}
            style={{
              minWidth: 'min(340px, 85vw)',
              background: panel.isOutcome ? 'rgba(200,255,0,0.04)' : '#0a0a0a',
              border: `1px solid ${panel.isOutcome ? 'rgba(200,255,0,0.2)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: '12px',
              padding: '2rem',
              scrollSnapAlign: 'start',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '300px',
            }}
          >
            {/* Top: label + score */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-jetbrains)',
                    color: panel.accentColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  {panel.label}
                </span>
                {panel.qScore !== null && (
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-jetbrains)',
                        fontSize: '36px',
                        fontWeight: 700,
                        color: panel.accentColor,
                        lineHeight: 1,
                      }}
                    >
                      {panel.qScore}
                    </div>
                    <div style={{ fontSize: '9px', color: '#333', fontFamily: 'var(--font-jetbrains)', marginTop: '2px' }}>
                      Q-SCORE
                    </div>
                  </div>
                )}
                {panel.isOutcome && (
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-jetbrains)',
                        fontSize: '28px',
                        fontWeight: 700,
                        color: '#c8ff00',
                        lineHeight: 1,
                      }}
                    >
                      $2.1M
                    </div>
                    <div style={{ fontSize: '9px', color: '#555', fontFamily: 'var(--font-jetbrains)', marginTop: '2px' }}>
                      RAISED
                    </div>
                  </div>
                )}
              </div>

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: panel.isOutcome ? '#c8ff00' : '#ededed',
                  lineHeight: 1.2,
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {panel.headline}
              </h3>

              <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6 }}>
                {panel.detail}
              </p>
            </div>

            {/* Bottom: agent + artifact */}
            {panel.agent && (
              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#ededed',
                    background: '#111',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '4px',
                    padding: '4px 10px',
                  }}
                >
                  {panel.agent}
                </div>
                <span style={{ fontSize: '12px', color: '#333', fontFamily: 'var(--font-jetbrains)' }}>→</span>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#555',
                    fontFamily: 'var(--font-jetbrains)',
                    background: '#0d0d0d',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '4px',
                    padding: '4px 10px',
                  }}
                >
                  {panel.artifact}
                </div>
              </div>
            )}

            {/* Score delta arrow for non-first panels */}
            {panel.qScore !== null && i > 0 && STORY_PANELS[i - 1].qScore !== null && (
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '11px', color: '#333', fontFamily: 'var(--font-jetbrains)' }}>
                  {STORY_PANELS[i - 1].qScore}
                </span>
                <span style={{ color: '#c8ff00', fontSize: '12px' }}>→</span>
                <span style={{ fontSize: '13px', fontFamily: 'var(--font-jetbrains)', fontWeight: 700, color: '#c8ff00' }}>
                  {panel.qScore}
                </span>
                <span style={{ fontSize: '10px', color: '#444', fontFamily: 'var(--font-jetbrains)' }}>
                  (+{(panel.qScore as number) - (STORY_PANELS[i - 1].qScore as number)})
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="max-container container-px" style={{ marginTop: '1.5rem' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <div style={{ display: 'flex', gap: '4px' }}>
            {STORY_PANELS.map((_, i) => (
              <div
                key={i}
                style={{
                  width: '20px',
                  height: '2px',
                  borderRadius: '1px',
                  background: i === 0 ? '#c8ff00' : 'rgba(255,255,255,0.1)',
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: '11px', color: '#333', fontFamily: 'var(--font-jetbrains)' }}>
            Scroll to follow Sarah&apos;s journey
          </span>
        </motion.div>
      </div>
    </section>
  )
}
