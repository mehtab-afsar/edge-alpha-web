'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AGENTS, AgentData, EASE } from '@/lib/constants'
import { useTypewriter } from '@/hooks/useTypewriter'

function AgentCard({ agent, index }: { agent: AgentData; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const { displayText, isComplete } = useTypewriter(agent.quote, 28, inView)

  const fromLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start"
      style={{
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '2rem',
      }}
    >
      {/* Left: identity + quote */}
      <div>
        {/* Agent identity */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '13px',
              fontWeight: 700,
              color: '#ededed',
              letterSpacing: '0.1em',
              marginBottom: '4px',
            }}
          >
            {agent.name}
          </div>
          <div style={{ fontSize: '12px', color: '#555', letterSpacing: '0.04em' }}>
            {agent.role}
          </div>
        </div>

        {/* Typewriter quote */}
        <div
          style={{
            borderLeft: '2px solid #c8ff00',
            paddingLeft: '1.25rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '14px',
              color: '#888',
              lineHeight: 1.75,
              minHeight: '5rem',
            }}
          >
            {displayText}
            {!isComplete && (
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '14px',
                  background: '#c8ff00',
                  marginLeft: '2px',
                  verticalAlign: 'text-bottom',
                  animation: 'blink 1s step-end infinite',
                }}
                aria-hidden="true"
              />
            )}
          </p>
        </div>
      </div>

      {/* Right: delivers + executes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* Delivers */}
        <div>
          <div
            style={{
              fontSize: '11px',
              color: '#333',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            Delivers
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {agent.delivers.map((item) => (
              <li
                key={item}
                style={{
                  fontSize: '13px',
                  color: '#555',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#333', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Executes */}
        <div>
          <div
            style={{
              fontSize: '11px',
              color: '#333',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            Executes
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {agent.executes.map((item) => (
              <li
                key={item}
                style={{
                  fontSize: '13px',
                  color: '#c8ff00',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#c8ff00', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export function AgentShowcase() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 })

  return (
    <section
      id="agents"
      className="section-py"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <div className="max-container container-px" style={{ width: '100%' }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: '3.5rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="label-micro"
            style={{ display: 'block', marginBottom: '1rem' }}
          >
            9 AI Agents
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: '#ededed',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              maxWidth: '600px',
            }}
          >
            Not just insights.{' '}
            <span style={{ color: '#555' }}>Actual execution.</span>
          </motion.h2>
        </div>

        {/* Agent cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {AGENTS.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} />
          ))}
        </div>

        {/* +4 more agents note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            marginTop: '2rem',
            fontSize: '13px',
            color: '#333',
            textAlign: 'center',
            fontFamily: 'var(--font-jetbrains)',
          }}
        >
          + 4 more agents: Maya (Legal), Leo (Product), Nova (Brand), Sage (Operations)
        </motion.p>
      </div>

    </section>
  )
}
