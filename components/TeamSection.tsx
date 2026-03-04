'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TEAM_MEMBERS, EASE } from '@/lib/constants'

const RADIUS = 36
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function MiniGauge({ score, inView, delay = 0 }: { score: number; inView: boolean; delay?: number }) {
  const offset = CIRCUMFERENCE * (1 - score / 100)
  return (
    <svg width="88" height="88" viewBox="0 0 80 80" aria-label={`Q-Score ${score}`} role="img">
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
        transition={{ duration: 1.4, ease: 'easeOut', delay }}
        style={{ transformOrigin: '40px 40px', rotate: '-90deg' }}
      />
      <text x="40" y="36" textAnchor="middle" fill="#ededed" fontSize="15" fontFamily="var(--font-jetbrains)" fontWeight="700">
        {score}
      </text>
      <text x="40" y="50" textAnchor="middle" fill="#555" fontSize="8" fontFamily="var(--font-jetbrains)">
        Q-SCORE
      </text>
    </svg>
  )
}

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      id="team"
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
            Team of Operators
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
            We built Edge Alpha with Edge Alpha
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginTop: '1rem', maxWidth: '480px', lineHeight: 1.65 }}>
            Radical transparency. Here are our actual Q-Scores — and which agents we used to improve them.
          </p>
        </motion.div>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(200,255,0,0.06)',
            border: '1px solid rgba(200,255,0,0.2)',
            borderRadius: '6px',
            padding: '8px 16px',
            marginBottom: '3rem',
          }}
        >
          <span style={{ color: '#c8ff00', fontSize: '14px' }}>✓</span>
          <span style={{ fontSize: '13px', fontFamily: 'var(--font-jetbrains)', color: '#888' }}>
            We raised our pre-seed using our own platform
          </span>
        </motion.div>

        {/* Team cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.initials}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: EASE }}
              style={{
                background: '#0a0a0a',
                padding: '2.5rem',
              }}
            >
              {/* Top row: avatar + gauge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.75rem' }}>
                {/* Avatar placeholder */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#111',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#ededed',
                    }}
                  >
                    {member.initials}
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#ededed', marginBottom: '4px' }}>
                    {member.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#555' }}>{member.title}</div>
                </div>

                <MiniGauge score={member.qScore} inView={inView} delay={0.4 + i * 0.1} />
              </div>

              {/* Trajectory */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#111',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  marginBottom: '1.25rem',
                }}
              >
                <span style={{ fontSize: '11px', color: '#333', fontFamily: 'var(--font-jetbrains)' }}>Q-Score trajectory</span>
                <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '13px', fontWeight: 700, color: '#c8ff00' }}>
                  {member.trajectory}
                </span>
              </div>

              {/* Strengths */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.25rem' }}>
                {member.strengths.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-jetbrains)',
                      color: '#555',
                      background: '#111',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '4px',
                      padding: '3px 8px',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Agent usage */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '11px', color: '#333', fontFamily: 'var(--font-jetbrains)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Agent usage
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '13px', fontWeight: 700, color: '#ededed' }}>
                      {member.primaryAgent}
                    </div>
                    <div style={{ fontSize: '11px', color: '#555', fontFamily: 'var(--font-jetbrains)' }}>
                      {member.primaryAgentUsage}% sessions
                    </div>
                  </div>
                  <div style={{ width: '1px', background: 'rgba(255,255,255,0.05)' }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '13px', fontWeight: 700, color: '#888' }}>
                      {member.secondaryAgent}
                    </div>
                    <div style={{ fontSize: '11px', color: '#444', fontFamily: 'var(--font-jetbrains)' }}>
                      {member.secondaryAgentUsage}% sessions
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <blockquote
                style={{
                  margin: 0,
                  padding: '1rem',
                  background: '#0d0d0d',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderLeft: '3px solid rgba(200,255,0,0.3)',
                  borderRadius: '0 6px 6px 0',
                }}
              >
                <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
                  &ldquo;{member.quote}&rdquo;
                </p>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
