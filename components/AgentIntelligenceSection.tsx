'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { AGENT_METRICS, EASE } from '@/lib/constants'

export function AgentIntelligenceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const selectedData = AGENT_METRICS.find((a) => a.id === selectedAgent)

  return (
    <section
      id="agent-intelligence"
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
          style={{ marginBottom: '4rem' }}
        >
          <span className="label-micro" style={{ display: 'block', marginBottom: '1.25rem' }}>
            Agent Intelligence
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: '#ededed',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: '520px',
            }}
          >
            Not ChatGPT wrappers. Specialized operators.
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginTop: '1rem', maxWidth: '460px', lineHeight: 1.65 }}>
            Every agent has a measured success rate, performance benchmark, and documented decision tree. Click any agent to see how it thinks.
          </p>
        </motion.div>

        {/* Performance table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          style={{
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '2rem',
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 140px 130px 160px 120px',
              padding: '0.875rem 1.5rem',
              background: '#0a0a0a',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {['Agent', 'Success Rate', 'Avg Time', 'Impact', 'Decision Tree'].map((h) => (
              <span
                key={h}
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-jetbrains)',
                  color: '#444',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {AGENT_METRICS.map((agent, i) => {
            const isSelected = selectedAgent === agent.id
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: EASE }}
                onClick={() => setSelectedAgent(isSelected ? null : agent.id)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 140px 130px 160px 120px',
                  padding: '1.125rem 1.5rem',
                  borderBottom: i < AGENT_METRICS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  background: isSelected ? 'rgba(200,255,0,0.04)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 200ms',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent'
                }}
              >
                {/* Agent name + role */}
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontWeight: 700,
                      color: isSelected ? '#c8ff00' : '#ededed',
                      fontSize: '14px',
                      display: 'block',
                      transition: 'color 200ms',
                    }}
                  >
                    {agent.name}
                  </span>
                  <span style={{ fontSize: '12px', color: '#444', marginTop: '2px', display: 'block' }}>
                    {agent.role}
                  </span>
                </div>

                {/* Success rate */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      height: '3px',
                      width: `${agent.successRate * 0.8}px`,
                      background: '#c8ff00',
                      borderRadius: '2px',
                      opacity: 0.7,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: '14px',
                      color: '#ededed',
                      fontWeight: 600,
                    }}
                  >
                    {agent.successRate}%
                  </span>
                </div>

                {/* Avg time */}
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '14px',
                    color: '#888',
                  }}
                >
                  {agent.avgTime} min
                </span>

                {/* Impact */}
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '14px',
                    color: '#c8ff00',
                    fontWeight: 600,
                  }}
                >
                  +{agent.impact} {agent.impactArea}
                </span>

                {/* CTA */}
                <span
                  style={{
                    fontSize: '12px',
                    color: isSelected ? '#c8ff00' : '#333',
                    fontFamily: 'var(--font-jetbrains)',
                    transition: 'color 200ms',
                  }}
                >
                  {isSelected ? '↑ hide' : '→ view'}
                </span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Decision tree panel */}
        <AnimatePresence mode="wait">
          {selectedData && (
            <motion.div
              key={selectedData.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: '#0a0a0a',
                border: '1px solid rgba(200,255,0,0.15)',
                borderRadius: '12px',
                padding: '2rem',
                overflow: 'hidden',
                marginBottom: '2rem',
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="label-micro" style={{ color: '#c8ff00' }}>
                  {selectedData.name} · Decision Tree
                </span>
                <p style={{ fontSize: '13px', color: '#555', marginTop: '6px', fontFamily: 'var(--font-jetbrains)' }}>
                  How {selectedData.name} decides what to build and in what order.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {selectedData.decisionTree.map((node, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    {/* Step number */}
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: '1px solid rgba(200,255,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        color: '#c8ff00',
                        fontFamily: 'var(--font-jetbrains)',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', color: '#ededed', fontWeight: 500, marginBottom: '6px' }}>
                        {node.step}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {node.branch.map((b) => (
                          <span
                            key={b}
                            style={{
                              fontSize: '11px',
                              fontFamily: 'var(--font-jetbrains)',
                              color: b.includes('→') ? '#888' : '#555',
                              background: '#111',
                              border: '1px solid rgba(255,255,255,0.06)',
                              borderRadius: '4px',
                              padding: '4px 10px',
                            }}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
