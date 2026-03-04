'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Q_SCORE_TARGET, Q_SCORE_LABEL, DIMENSIONS, EASE } from '@/lib/constants'
import { useCountUp } from '@/hooks/useCountUp'

const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const FILLED_OFFSET = CIRCUMFERENCE * (1 - Q_SCORE_TARGET / 100)

// 18 deterministic particles — no Math.random()
const PARTICLE_COUNT = 18
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (i / PARTICLE_COUNT) * 2 * Math.PI
  const distance = 55 + (i % 3) * 18
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: i % 2 === 0 ? 3 : 2,
  }
})

const DIMENSION_TOOLTIPS: Record<string, string> = {
  Market: 'TAM ≥ $1B, growing 20%+ YoY. Strong timing signal.',
  Product: 'MVP shipped, clear product-market fit signals in interviews.',
  GTM: 'Outbound motion defined. CAC:LTV ratio within acceptable range.',
  Financial: 'Healthy unit economics. Runway > 12 months. Clean cap table.',
  Team: 'Technical co-founder present. Some advisor gaps noted.',
  Traction: 'MoM growth 15%, retention 68%. Leading indicators strong.',
}

export function QScoreSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.35 })
  const [scoreComplete, setScoreComplete] = useState(false)
  const [hoveredDim, setHoveredDim] = useState<string | null>(null)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setScoreComplete(true), 1600)
    return () => clearTimeout(t)
  }, [inView])

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
              <div style={{ flexShrink: 0, position: 'relative' }}>
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

                {/* Particle burst */}
                {scoreComplete && (
                  <div
                    aria-hidden="true"
                    style={{ position: 'absolute', top: '50%', left: '50%', pointerEvents: 'none' }}
                  >
                    {PARTICLES.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        style={{
                          position: 'absolute',
                          width: p.size,
                          height: p.size,
                          borderRadius: '50%',
                          background: '#c8ff00',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Score number */}
              <div>
                <div
                  ref={counterRef as React.RefObject<HTMLDivElement>}
                  className={scoreComplete ? 'score-glitch' : ''}
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

          {/* Right — dimension bars with tooltips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {DIMENSIONS.map((dim, i) => (
              <motion.div
                key={dim.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.8 + i * 0.1, ease: EASE }}
                style={{ position: 'relative' }}
                onMouseEnter={() => setHoveredDim(dim.label)}
                onMouseLeave={() => setHoveredDim(null)}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '6px',
                    cursor: 'default',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: hoveredDim === dim.label ? '#ededed' : '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      transition: 'color 150ms',
                    }}
                  >
                    {dim.label}
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      fontFamily: 'var(--font-jetbrains)',
                      color: hoveredDim === dim.label ? '#c8ff00' : '#555',
                      transition: 'color 150ms',
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
                    style={{
                      height: '100%',
                      borderRadius: '2px',
                      background: hoveredDim === dim.label ? '#c8ff00' : '#ededed',
                      transition: 'background 200ms',
                    }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${dim.value}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 2.0 + i * 0.1, ease: EASE }}
                  />
                </div>

                {/* Hover tooltip */}
                {hoveredDim === dim.label && DIMENSION_TOOLTIPS[dim.label] && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      marginTop: '6px',
                      background: '#111',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      color: '#666',
                      lineHeight: 1.55,
                      fontFamily: 'var(--font-jetbrains)',
                      zIndex: 10,
                      pointerEvents: 'none',
                    }}
                  >
                    {DIMENSION_TOOLTIPS[dim.label]}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
