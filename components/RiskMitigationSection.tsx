'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { RISK_MATRIX, EASE } from '@/lib/constants'

export function RiskMitigationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      id="risk"
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
            Risk &amp; Mitigation
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
            What could go wrong — and how we win anyway
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginTop: '1rem', maxWidth: '480px', lineHeight: 1.65 }}>
            We know what could kill us. VCs appreciate founders who think this clearly.
          </p>
        </motion.div>

        {/* Risk grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', overflow: 'hidden' }}>
          {RISK_MATRIX.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                background: '#0a0a0a',
              }}
            >
              {/* Risk */}
              <div
                style={{
                  padding: '1.75rem',
                  borderRight: '1px solid rgba(255,255,255,0.04)',
                  borderLeft: '3px solid rgba(239,68,68,0.25)',
                }}
              >
                <div
                  style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-jetbrains)',
                    color: 'rgba(239,68,68,0.7)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    marginBottom: '0.625rem',
                  }}
                >
                  Risk
                </div>
                <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>{item.risk}</p>
              </div>

              {/* Mitigation + contingency */}
              <div
                style={{
                  padding: '1.75rem',
                  borderLeft: '3px solid rgba(200,255,0,0.2)',
                }}
              >
                <div
                  style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-jetbrains)',
                    color: 'rgba(200,255,0,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    marginBottom: '0.625rem',
                  }}
                >
                  Mitigation
                </div>
                <p style={{ fontSize: '14px', color: '#ededed', lineHeight: 1.6, marginBottom: '0.875rem' }}>
                  {item.mitigation}
                </p>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#444',
                    lineHeight: 1.55,
                    fontFamily: 'var(--font-jetbrains)',
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    paddingTop: '0.75rem',
                  }}
                >
                  <span style={{ color: '#333' }}>Contingency: </span>
                  {item.contingency}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
          style={{
            fontSize: '13px',
            color: '#333',
            marginTop: '2rem',
            fontFamily: 'var(--font-jetbrains)',
            textAlign: 'center',
          }}
        >
          We&apos;re not fluffy about risk. These are real risks with specific mitigations — because we&apos;ve thought them through.
        </motion.p>
      </div>
    </section>
  )
}
