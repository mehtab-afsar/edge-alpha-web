'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TRACTION_STATS, EASE } from '@/lib/constants'
import { useCountUp } from '@/hooks/useCountUp'

function StatItem({
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
  const { ref, displayValue } = useCountUp({ target: value, duration: 1400, delay: delay * 1000 })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
    >
      <div
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 700,
          color: '#ededed',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        {displayValue}
      </div>
      <div style={{ fontSize: '13px', color: '#444', letterSpacing: '0.02em' }}>
        {label}
      </div>
    </div>
  )
}

export function TractionSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section
      ref={ref}
      id="traction"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        padding: '5rem 0',
      }}
    >
      <div className="max-container container-px" style={{ width: '100%' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {TRACTION_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            >
              <StatItem
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 0.1}
              />
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
