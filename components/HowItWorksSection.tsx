'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { STEPS, EASE } from '@/lib/constants'

export function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="section-py"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <div className="max-container container-px" style={{ width: '100%' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '4rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              className="label-micro"
              style={{ display: 'block', marginBottom: '1rem' }}
            >
              How It Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              style={{
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 700,
                color: '#ededed',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Three steps. One outcome.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            style={{ fontSize: '14px', color: '#555', maxWidth: '260px' }}
          >
            From raw ambition to investor-ready in under 10 minutes.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap: '1.5px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: EASE }}
              style={{
                background: '#050505',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                position: 'relative',
              }}
            >
              {/* Step number */}
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '11px',
                  color: '#333',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}
              >
                {step.number}
              </div>

              {/* Title */}
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#ededed',
                  letterSpacing: '0.06em',
                }}
              >
                {step.title}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '14px',
                  color: '#555',
                  lineHeight: 1.65,
                  flex: 1,
                }}
              >
                {step.description}
              </p>

              {/* Metric badge */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.15, ease: EASE }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: '3px',
                  border: '1px solid rgba(200,255,0,0.2)',
                  background: 'rgba(200,255,0,0.04)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-jetbrains)',
                  color: '#c8ff00',
                  fontWeight: 500,
                  width: 'fit-content',
                }}
              >
                {step.metric}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
