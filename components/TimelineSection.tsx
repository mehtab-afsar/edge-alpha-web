'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TIMELINE_MILESTONES, EASE } from '@/lib/constants'

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="section-py"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: '#050505' }}
    >
      <div className="max-container container-px">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: '5rem', textAlign: 'center' }}
        >
          <span className="label-micro" style={{ display: 'block', marginBottom: '1.25rem' }}>
            The Vision
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: '#ededed',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            The cap table of the future
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginTop: '1rem', lineHeight: 1.65 }}>
            By 2029, Q-Score is as common as market cap.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, rgba(200,255,0,0.4), rgba(200,255,0,0.05))',
              transformOrigin: 'top',
            }}
          />

          {TIMELINE_MILESTONES.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: EASE }}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-end' : 'flex-start',
                  paddingLeft: isLeft ? 0 : 'calc(50% + 2rem)',
                  paddingRight: isLeft ? 'calc(50% + 2rem)' : 0,
                  marginBottom: '3rem',
                  position: 'relative',
                }}
              >
                {/* Dot on center line */}
                <div
                  style={{
                    position: 'absolute',
                    left: 'calc(50% - 5px)',
                    top: '1.25rem',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#c8ff00',
                    boxShadow: '0 0 12px rgba(200,255,0,0.5)',
                  }}
                />

                {/* Card */}
                <div
                  style={{
                    background: '#0a0a0a',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    maxWidth: '340px',
                    width: '100%',
                  }}
                >
                  {/* Year badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '0.875rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-jetbrains)',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#c8ff00',
                        background: 'rgba(200,255,0,0.08)',
                        border: '1px solid rgba(200,255,0,0.2)',
                        borderRadius: '4px',
                        padding: '2px 8px',
                      }}
                    >
                      {item.year}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#ededed',
                      marginBottom: '0.625rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '13px',
                      color: '#555',
                      lineHeight: 1.6,
                      marginBottom: '1rem',
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Metrics row */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      borderTop: '1px solid rgba(255,255,255,0.05)',
                      paddingTop: '0.875rem',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '12px',
                          fontFamily: 'var(--font-jetbrains)',
                          color: '#c8ff00',
                          fontWeight: 600,
                        }}
                      >
                        {item.arrTarget}
                      </div>
                      <div style={{ fontSize: '10px', color: '#333', marginTop: '2px', fontFamily: 'var(--font-jetbrains)' }}>
                        ARR target
                      </div>
                    </div>
                    <div
                      style={{
                        width: '1px',
                        background: 'rgba(255,255,255,0.05)',
                        margin: '0 0.5rem',
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: '12px',
                          fontFamily: 'var(--font-jetbrains)',
                          color: '#ededed',
                          fontWeight: 600,
                        }}
                      >
                        {item.founders}
                      </div>
                      <div style={{ fontSize: '10px', color: '#333', marginTop: '2px', fontFamily: 'var(--font-jetbrains)' }}>
                        platform reach
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
