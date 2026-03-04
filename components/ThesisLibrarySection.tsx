'use client'

import { useRef, useState, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { VC_FIRMS, DIMENSIONS, EASE } from '@/lib/constants'

// Simulate a founder's dimension scores (matches the QScore default)
const FOUNDER_SCORES: Record<string, number> = {
  team: 59,
  market: 78,
  product: 71,
  traction: 76,
  financial: 82,
  gtm: 64,
}

function computeMatch(firmWeights: Record<string, number>, founderScores: Record<string, number>): number {
  const totalWeight = Object.values(firmWeights).reduce((a, b) => a + b, 0)
  let weightedScore = 0
  for (const [key, weight] of Object.entries(firmWeights)) {
    weightedScore += (founderScores[key] ?? 70) * (weight / totalWeight)
  }
  return Math.round(weightedScore)
}

export function ThesisLibrarySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [expandedFirm, setExpandedFirm] = useState<string | null>(null)
  const [selectedFirm, setSelectedFirm] = useState<string | null>(null)

  const selectedFirmData = useMemo(
    () => VC_FIRMS.find((f) => f.id === selectedFirm),
    [selectedFirm]
  )

  const matchScore = useMemo(() => {
    if (!selectedFirmData) return null
    return computeMatch(selectedFirmData.weights, FOUNDER_SCORES)
  }, [selectedFirmData])

  return (
    <section
      id="thesis-library"
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
            The Investor Thesis Library
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
            We encode how top VCs actually invest
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginTop: '1rem', maxWidth: '500px', lineHeight: 1.65 }}>
            Click a firm to see their scoring weights. Select one to see how aligned your Q-Score is with their thesis.
          </p>
        </motion.div>

        {/* Founder match display */}
        <AnimatePresence>
          {selectedFirmData && matchScore !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'rgba(200,255,0,0.04)',
                border: '1px solid rgba(200,255,0,0.2)',
                borderRadius: '10px',
                padding: '1.5rem 2rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                overflow: 'hidden',
              }}
            >
              <div>
                <div style={{ fontSize: '13px', color: '#888', fontFamily: 'var(--font-jetbrains)', marginBottom: '4px' }}>
                  Founder–{selectedFirmData.shortName} alignment
                </div>
                <div style={{ fontSize: '13px', color: '#555' }}>
                  Based on Q-Score dimension distribution vs. {selectedFirmData.shortName}&apos;s published investment weights
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '48px',
                    fontWeight: 700,
                    color: '#c8ff00',
                    lineHeight: 1,
                  }}
                >
                  {matchScore}%
                </div>
                <div style={{ fontSize: '11px', color: '#444', fontFamily: 'var(--font-jetbrains)', marginTop: '2px' }}>
                  THESIS ALIGNMENT
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* VC firm grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {VC_FIRMS.map((firm, i) => {
            const isExpanded = expandedFirm === firm.id
            const isSelected = selectedFirm === firm.id
            return (
              <motion.div
                key={firm.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: EASE }}
                style={{
                  background: isSelected ? '#0e110a' : '#050505',
                  padding: '1.75rem',
                  cursor: 'pointer',
                  transition: 'background 200ms',
                  borderLeft: isSelected ? '3px solid rgba(200,255,0,0.4)' : '3px solid transparent',
                }}
                onClick={() => {
                  setExpandedFirm(isExpanded ? null : firm.id)
                  setSelectedFirm(firm.id)
                }}
              >
                {/* Firm name */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: isSelected ? '#c8ff00' : '#ededed',
                      marginBottom: '4px',
                      transition: 'color 200ms',
                    }}
                  >
                    {firm.shortName}
                  </div>
                  <div style={{ fontSize: '11px', color: '#333', fontFamily: 'var(--font-jetbrains)' }}>
                    Min Q-Score: {firm.minScore}
                  </div>
                </div>

                {/* Thesis */}
                <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.55, marginBottom: '1rem' }}>
                  {firm.thesis}
                </p>

                {/* Famous for */}
                <div
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-jetbrains)',
                    color: '#444',
                    marginBottom: isExpanded ? '1.25rem' : 0,
                  }}
                >
                  Known for: {firm.famousFor}
                </div>

                {/* Expanded: weight breakdown */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                        {Object.entries(firm.weights).map(([key, weight]) => (
                          <div key={key} style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                              <span style={{ fontSize: '11px', color: '#555', textTransform: 'capitalize', fontFamily: 'var(--font-jetbrains)' }}>
                                {key}
                              </span>
                              <span style={{ fontSize: '11px', fontFamily: 'var(--font-jetbrains)', color: '#888', fontWeight: 600 }}>
                                {weight}%
                              </span>
                            </div>
                            <div style={{ height: '3px', background: '#111', borderRadius: '2px', overflow: 'hidden' }}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${weight}%` }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                style={{
                                  height: '100%',
                                  borderRadius: '2px',
                                  background: key === 'team' ? '#c8ff00' : '#ededed',
                                  opacity: key === 'team' ? 1 : 0.35,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  style={{
                    fontSize: '11px',
                    color: isExpanded ? '#c8ff00' : '#333',
                    fontFamily: 'var(--font-jetbrains)',
                    marginTop: '0.75rem',
                    transition: 'color 200ms',
                  }}
                >
                  {isExpanded ? '↑ hide weights' : '↓ show weights'}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{ fontSize: '12px', color: '#222', marginTop: '1.5rem', fontFamily: 'var(--font-jetbrains)', textAlign: 'center' }}
        >
          Weights derived from public investment theses, LP letters, and portfolio analysis. Not affiliated with any firm.
        </motion.p>
      </div>
    </section>
  )
}
