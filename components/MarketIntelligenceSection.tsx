'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { SCORE_DISTRIBUTION, EASE } from '@/lib/constants'

const BarChart = dynamic(() => import('recharts').then((m) => m.BarChart), { ssr: false })
const Bar = dynamic(() => import('recharts').then((m) => m.Bar), { ssr: false })
const XAxis = dynamic(() => import('recharts').then((m) => m.XAxis), { ssr: false })
const YAxis = dynamic(() => import('recharts').then((m) => m.YAxis), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then((m) => m.Tooltip), { ssr: false })
const ResponsiveContainer = dynamic(() => import('recharts').then((m) => m.ResponsiveContainer), { ssr: false })
const Cell = dynamic(() => import('recharts').then((m) => m.Cell), { ssr: false })

const COMPETITORS = [
  {
    id: 'edge',
    label: 'Edge Alpha',
    x: 52, y: 16,
    highlight: true,
    tagline: 'Scores + executes + connects',
    weakness: '',
    advantage: 'The only platform that does all three — for every founder, any time.',
  },
  {
    id: 'yc',
    label: 'Y Combinator',
    x: 22, y: 24,
    highlight: false,
    tagline: 'Cohort-based accelerator',
    weakness: 'Accepts <2% of applicants. No scoring feedback for the rest.',
    advantage: 'Edge Alpha is open to all 500K+ pre-seed founders per year.',
  },
  {
    id: 'al',
    label: 'AngelList',
    x: 74, y: 52,
    highlight: false,
    tagline: 'Investor marketplace',
    weakness: 'Investor-facing. Founders get no actionable score or feedback.',
    advantage: 'Edge Alpha gives founders a verified credential before they apply anywhere.',
  },
  {
    id: 'ds',
    label: 'DocSend',
    x: 70, y: 74,
    highlight: false,
    tagline: 'Pitch deck analytics',
    weakness: 'Analytics only. Tracks views — builds nothing, improves nothing.',
    advantage: 'Edge Alpha improves the pitch with 47 agent-built artifacts, not just tracks it.',
  },
  {
    id: 'tc',
    label: 'Techstars',
    x: 26, y: 64,
    highlight: false,
    tagline: 'Accelerator network',
    weakness: 'Cohort-based. Most founders never get in — no path for the rest.',
    advantage: 'Edge Alpha evaluates any founder, any stage, any time.',
  },
]

const FEATURES = [
  { feature: 'Quantified founder score', edgeAlpha: true, yc: false, angelList: false, docSend: false },
  { feature: 'Agent-built deliverables', edgeAlpha: true, yc: false, angelList: false, docSend: false },
  { feature: 'Bluff detection', edgeAlpha: true, yc: false, angelList: false, docSend: false },
  { feature: 'Real-time score improvement', edgeAlpha: true, yc: false, angelList: false, docSend: false },
  { feature: 'Investor match marketplace', edgeAlpha: true, yc: true, angelList: true, docSend: false },
  { feature: 'Open to all founders', edgeAlpha: true, yc: false, angelList: true, docSend: true },
  { feature: 'VC thesis encoding', edgeAlpha: true, yc: false, angelList: false, docSend: false },
]

const TIER_LABELS: Record<string, string> = {
  '40–50': 'Early stage',
  '50–60': 'Developing',
  '60–70': 'Getting there',
  '70–80': 'Investor ready',
  '80–90': 'Strong signal',
  '90+': 'Elite',
}

const EDGE_X = 52
const EDGE_Y = 16

export function MarketIntelligenceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null)
  const [hoveredCompetitor, setHoveredCompetitor] = useState<string | null>(null)
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null)

  const panelId = selectedCompetitor ?? hoveredCompetitor
  const panelData = COMPETITORS.find((c) => c.id === panelId && !c.highlight)

  const totalFounders = SCORE_DISTRIBUTION.reduce((s, d) => s + d.count, 0)

  const handleNodeClick = (id: string) => {
    if (id === 'edge') return
    setSelectedCompetitor((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="market-intelligence"
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
            Market Intelligence
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
            We understand this market better than the incumbents
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginTop: '1rem', maxWidth: '480px', lineHeight: 1.65 }}>
            The only platform that <em style={{ color: '#ededed', fontStyle: 'normal' }}>executes</em>, not advises.
            500K pre-seed founders/year × $50/month = <strong style={{ color: '#c8ff00' }}>$300M ARR TAM</strong>.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>

          {/* Competitive positioning map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            style={{
              background: '#0d0d0d',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span className="label-micro">Competitive Positioning Map</span>
              <span style={{ fontSize: '10px', color: '#333', fontFamily: 'var(--font-jetbrains)' }}>
                click to compare
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', aspectRatio: '1', display: 'block', overflow: 'visible' }}>
                {/* Quadrant tints */}
                <rect x="0" y="0" width="50" height="50" fill="rgba(200,255,0,0.018)" />
                <rect x="50" y="0" width="50" height="50" fill="rgba(200,255,0,0.03)" />
                <rect x="0" y="50" width="50" height="50" fill="rgba(255,255,255,0.008)" />
                <rect x="50" y="50" width="50" height="50" fill="rgba(255,255,255,0.013)" />

                {/* Axis lines */}
                <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

                {/* Axis labels */}
                <text x="50" y="5" textAnchor="middle" fill="#3a3a3a" fontSize="3.5" fontFamily="var(--font-jetbrains)">Executes</text>
                <text x="50" y="98.5" textAnchor="middle" fill="#3a3a3a" fontSize="3.5" fontFamily="var(--font-jetbrains)">Advises</text>
                <text x="2.5" y="52" fill="#3a3a3a" fontSize="3.5" fontFamily="var(--font-jetbrains)">Founder</text>
                <text x="76" y="52" fill="#3a3a3a" fontSize="3.5" fontFamily="var(--font-jetbrains)">Investor</text>

                {/* Animated dashed path from Edge Alpha to active competitor */}
                {panelData && (
                  <motion.path
                    d={`M ${EDGE_X} ${EDGE_Y} L ${panelData.x} ${panelData.y}`}
                    stroke="rgba(200,255,0,0.22)"
                    strokeWidth="0.7"
                    strokeDasharray="2 2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  />
                )}

                {/* Nodes */}
                {COMPETITORS.map((c, i) => {
                  const isHovered = hoveredCompetitor === c.id
                  const isSelected = selectedCompetitor === c.id
                  const isActive = isHovered || isSelected

                  return (
                    <g
                      key={c.id}
                      onClick={() => handleNodeClick(c.id)}
                      onMouseEnter={() => setHoveredCompetitor(c.id)}
                      onMouseLeave={() => setHoveredCompetitor(null)}
                      style={{ cursor: c.highlight ? 'default' : 'pointer' }}
                    >
                      {/* Pulse ring — Edge Alpha */}
                      {c.highlight && (
                        <motion.circle
                          cx={c.x} cy={c.y} r={8}
                          fill="none"
                          stroke="#c8ff00"
                          strokeWidth={0.8}
                          initial={{ opacity: 0.6, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.9 }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                          style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                        />
                      )}

                      {/* Selection dashed ring */}
                      {isSelected && !c.highlight && (
                        <motion.circle
                          cx={c.x} cy={c.y} r={7.5}
                          fill="none"
                          stroke="rgba(239,68,68,0.5)"
                          strokeWidth={0.5}
                          strokeDasharray="1.5 1.5"
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                        />
                      )}

                      {/* Node */}
                      <motion.circle
                        cx={c.x} cy={c.y}
                        r={c.highlight ? 5 : isActive ? 4.5 : 3.5}
                        fill={c.highlight ? 'rgba(200,255,0,0.2)' : isActive ? 'rgba(239,68,68,0.15)' : '#111'}
                        stroke={c.highlight ? '#c8ff00' : isActive ? 'rgba(239,68,68,0.8)' : 'rgba(255,255,255,0.2)'}
                        strokeWidth={c.highlight ? 1.5 : 1}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={inView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.25 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                        style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                      />

                      {/* Label */}
                      <text
                        x={c.x}
                        y={c.y - (c.highlight ? 8 : 6.5)}
                        textAnchor="middle"
                        fill={c.highlight ? '#c8ff00' : isActive ? 'rgba(239,68,68,0.9)' : '#3a3a3a'}
                        fontSize={c.highlight ? 4 : isActive ? 3.8 : 3.5}
                        fontFamily="var(--font-jetbrains)"
                        fontWeight={c.highlight ? '700' : isActive ? '600' : '400'}
                        style={{ transition: 'fill 150ms' }}
                      >
                        {c.label}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Comparison panel */}
            <AnimatePresence mode="wait">
              {panelData && (
                <motion.div
                  key={panelData.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: 'hidden', marginTop: '1rem' }}
                >
                  <div
                    style={{
                      background: '#111',
                      border: '1px solid rgba(239,68,68,0.18)',
                      borderRadius: '8px',
                      padding: '1rem 1.125rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.625rem' }}>
                      <div>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#ededed', display: 'block', marginBottom: '2px' }}>
                          {panelData.label}
                        </span>
                        <span style={{ fontSize: '11px', color: '#444', fontFamily: 'var(--font-jetbrains)' }}>
                          {panelData.tagline}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '9px',
                          letterSpacing: '0.07em',
                          textTransform: 'uppercase',
                          color: 'rgba(239,68,68,0.8)',
                          fontFamily: 'var(--font-jetbrains)',
                          background: 'rgba(239,68,68,0.08)',
                          border: '1px solid rgba(239,68,68,0.2)',
                          borderRadius: '3px',
                          padding: '2px 7px',
                          flexShrink: 0,
                          marginLeft: '8px',
                        }}
                      >
                        gap
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'rgba(239,68,68,0.65)', fontFamily: 'var(--font-jetbrains)', marginBottom: '0.5rem', lineHeight: 1.5 }}>
                      ✗ {panelData.weakness}
                    </p>
                    <p style={{ fontSize: '12px', color: 'rgba(200,255,0,0.75)', fontFamily: 'var(--font-jetbrains)', lineHeight: 1.5 }}>
                      ✓ {panelData.advantage}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Q-Score distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            style={{
              background: '#0d0d0d',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span className="label-micro" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Q-Score Distribution
            </span>
            <p style={{ fontSize: '12px', color: '#333', fontFamily: 'var(--font-jetbrains)', marginBottom: '1.5rem' }}>
              {totalFounders.toLocaleString()}+ evaluated founders — hover a bar to explore
            </p>

            <div style={{ height: '200px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={SCORE_DISTRIBUTION}
                  margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                  onMouseLeave={() => setActiveBarIndex(null)}
                >
                  <XAxis
                    dataKey="range"
                    tick={{ fill: '#333', fontSize: 10, fontFamily: 'var(--font-jetbrains)' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#333', fontSize: 10, fontFamily: 'var(--font-jetbrains)' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    contentStyle={{
                      background: '#111',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontFamily: 'var(--font-jetbrains)',
                      color: '#ededed',
                    }}
                    labelFormatter={(label) => {
                      const tier = TIER_LABELS[label as string]
                      return tier ? `${label} — ${tier}` : label
                    }}
                    formatter={(value: unknown) => {
                      const count = value as number
                      const pct = Math.round((count / totalFounders) * 100)
                      return [`${count} founders (${pct}%)`, 'cohort']
                    }}
                  />
                  <Bar
                    dataKey="count"
                    radius={[3, 3, 0, 0]}
                    onMouseEnter={(_: unknown, index: number) => setActiveBarIndex(index)}
                  >
                    {SCORE_DISTRIBUTION.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          activeBarIndex === index
                            ? '#c8ff00'
                            : index === 3
                            ? 'rgba(200,255,0,0.45)'
                            : 'rgba(255,255,255,0.1)'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Active bar detail */}
            <AnimatePresence mode="wait">
              {activeBarIndex !== null ? (
                <motion.div
                  key={activeBarIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1rem',
                    background: '#111',
                    border: activeBarIndex === 3
                      ? '1px solid rgba(200,255,0,0.2)'
                      : '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '14px', fontWeight: 700, color: activeBarIndex === 3 ? '#c8ff00' : '#ededed' }}>
                      {SCORE_DISTRIBUTION[activeBarIndex]?.range}
                    </span>
                    <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '12px', color: '#555', marginLeft: '8px' }}>
                      {TIER_LABELS[SCORE_DISTRIBUTION[activeBarIndex]?.range] ?? ''}
                      {activeBarIndex === 3 && (
                        <span style={{ color: 'rgba(200,255,0,0.7)', marginLeft: '6px' }}>✓ investor ready</span>
                      )}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '20px', fontWeight: 700, color: activeBarIndex === 3 ? '#c8ff00' : '#888', lineHeight: 1 }}>
                      {Math.round(((SCORE_DISTRIBUTION[activeBarIndex]?.count ?? 0) / totalFounders) * 100)}%
                    </div>
                    <div style={{ fontSize: '10px', color: '#333', fontFamily: 'var(--font-jetbrains)', marginTop: '2px' }}>
                      of cohort
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ fontSize: '11px', color: '#2a2a2a', fontFamily: 'var(--font-jetbrains)', marginTop: '10px' }}
                >
                  70–80 range highlighted — sweet spot for investor readiness
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Feature comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 120px 120px 120px 120px',
              padding: '0.875rem 1.5rem',
              background: '#111',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {['Feature', 'Edge Alpha', 'YC', 'AngelList', 'DocSend'].map((h, i) => (
              <span
                key={h}
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-jetbrains)',
                  color: i === 1 ? '#c8ff00' : '#444',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  textAlign: i > 0 ? 'center' : 'left',
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {FEATURES.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 120px 120px 120px',
                padding: '0.875rem 1.5rem',
                borderBottom: i < FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                background: row.edgeAlpha && !row.yc && !row.angelList && !row.docSend
                  ? 'rgba(200,255,0,0.02)'
                  : 'transparent',
              }}
            >
              <span style={{ fontSize: '13px', color: '#888' }}>{row.feature}</span>
              {[row.edgeAlpha, row.yc, row.angelList, row.docSend].map((has, j) => (
                <span
                  key={j}
                  style={{
                    textAlign: 'center',
                    fontSize: '14px',
                    color: has ? (j === 0 ? '#c8ff00' : '#555') : 'rgba(239,68,68,0.4)',
                  }}
                >
                  {has ? '✓' : '✗'}
                </span>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
