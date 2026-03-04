'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import { ARTIFACT_CARDS, COHORT_DATA, EASE, type ArtifactIndustry, type ArtifactStage } from '@/lib/constants'

const LineChart = dynamic(
  () => import('recharts').then((m) => m.LineChart),
  { ssr: false }
)
const Line = dynamic(() => import('recharts').then((m) => m.Line), { ssr: false })
const XAxis = dynamic(() => import('recharts').then((m) => m.XAxis), { ssr: false })
const YAxis = dynamic(() => import('recharts').then((m) => m.YAxis), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then((m) => m.Tooltip), { ssr: false })
const ResponsiveContainer = dynamic(() => import('recharts').then((m) => m.ResponsiveContainer), { ssr: false })

const ARTIFACT_TYPE_ICON: Record<string, string> = {
  'ICP Doc': '◎',
  'Sales Script': '◈',
  'Financial Model': '◆',
  'Competitive Matrix': '◉',
  'GTM Playbook': '◐',
  'Sales Playbook': '◑',
}

type FilterIndustry = ArtifactIndustry | 'All'
type FilterStage = ArtifactStage | 'All'

const INDUSTRIES: FilterIndustry[] = ['All', 'SaaS', 'Fintech', 'Climate', 'Health']
const STAGES: FilterStage[] = ['All', 'Pre-seed', 'Seed']

export function VerifiedProofSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [industry, setIndustry] = useState<FilterIndustry>('All')
  const [stage, setStage] = useState<FilterStage>('All')

  const filtered = ARTIFACT_CARDS.filter((a) => {
    const matchIndustry = industry === 'All' || a.industry === industry
    const matchStage = stage === 'All' || a.stage === stage
    return matchIndustry && matchStage
  })

  return (
    <section
      id="verified-proof"
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
          style={{ marginBottom: '3rem' }}
        >
          <span className="label-micro" style={{ display: 'block', marginBottom: '1.25rem' }}>
            Verified Proof
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
            Real artifacts. Real score deltas. Real outcomes.
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginTop: '1rem', maxWidth: '480px', lineHeight: 1.65 }}>
            Anonymized, VC-verified. Every artifact shown here moved a real founder&apos;s Q-Score — and their fundraise.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: '#333', fontFamily: 'var(--font-jetbrains)', alignSelf: 'center', marginRight: '4px' }}>Industry:</span>
            {INDUSTRIES.map((f) => (
              <button
                key={f}
                onClick={() => setIndustry(f)}
                style={{
                  fontSize: '12px',
                  fontFamily: 'var(--font-jetbrains)',
                  color: industry === f ? '#050505' : '#555',
                  background: industry === f ? '#c8ff00' : 'transparent',
                  border: `1px solid ${industry === f ? '#c8ff00' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '4px',
                  padding: '4px 12px',
                  cursor: 'pointer',
                  transition: 'all 150ms',
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: '#333', fontFamily: 'var(--font-jetbrains)', alignSelf: 'center', marginRight: '4px' }}>Stage:</span>
            {STAGES.map((f) => (
              <button
                key={f}
                onClick={() => setStage(f)}
                style={{
                  fontSize: '12px',
                  fontFamily: 'var(--font-jetbrains)',
                  color: stage === f ? '#050505' : '#555',
                  background: stage === f ? '#c8ff00' : 'transparent',
                  border: `1px solid ${stage === f ? '#c8ff00' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '4px',
                  padding: '4px 12px',
                  cursor: 'pointer',
                  transition: 'all 150ms',
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <span style={{ fontSize: '12px', color: '#333', fontFamily: 'var(--font-jetbrains)', marginLeft: 'auto' }}>
            {filtered.length} artifacts
          </span>
        </motion.div>

        {/* Masonry grid */}
        <div
          style={{
            columns: '4 280px',
            columnGap: '12px',
            marginBottom: '5rem',
          }}
        >
          {filtered.map((artifact, i) => (
            <motion.div
              key={artifact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + (i % 8) * 0.05, ease: EASE }}
              whileHover={{ scale: 1.02 }}
              style={{
                breakInside: 'avoid',
                marginBottom: '12px',
                background: '#0d0d0d',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px',
                padding: '1.25rem',
                cursor: 'default',
                display: 'block',
              }}
            >
              {/* Type + icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.875rem' }}>
                <span style={{ color: '#c8ff00', fontSize: '16px' }}>{ARTIFACT_TYPE_ICON[artifact.type]}</span>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-jetbrains)', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {artifact.type}
                </span>
              </div>

              {/* Score delta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '22px', fontWeight: 700, color: '#555' }}>
                  {artifact.scoreBefore}
                </span>
                <span style={{ color: '#c8ff00', fontSize: '14px' }}>→</span>
                <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '22px', fontWeight: 700, color: '#c8ff00' }}>
                  {artifact.scoreAfter}
                </span>
                <span style={{ fontSize: '11px', color: '#333', fontFamily: 'var(--font-jetbrains)', marginLeft: '2px' }}>
                  (+{artifact.scoreAfter - artifact.scoreBefore})
                </span>
              </div>

              {/* Quote */}
              <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.55, marginBottom: '0.875rem', fontStyle: 'italic' }}>
                &ldquo;{artifact.founderQuote}&rdquo;
              </p>

              {/* Footer row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-jetbrains)',
                      color: '#444',
                      background: '#111',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '3px',
                      padding: '2px 6px',
                    }}
                  >
                    {artifact.industry}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-jetbrains)',
                      color: '#444',
                      background: '#111',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '3px',
                      padding: '2px 6px',
                    }}
                  >
                    {artifact.stage}
                  </span>
                </div>
                <span style={{ fontSize: '10px', color: '#333', fontFamily: 'var(--font-jetbrains)' }}>
                  {artifact.timeMinutes} min
                </span>
              </div>

              {/* Verified badge */}
              <div
                style={{
                  marginTop: '0.75rem',
                  paddingTop: '0.625rem',
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                  fontSize: '10px',
                  color: '#333',
                  fontFamily: 'var(--font-jetbrains)',
                }}
              >
                ✓ Verified by {artifact.verifiedBy}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cohort retention chart */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          style={{
            background: '#0d0d0d',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            padding: '2rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="label-micro" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Founder Cohort Retention
              </span>
              <p style={{ fontSize: '13px', color: '#444', fontFamily: 'var(--font-jetbrains)' }}>
                % of founders returning weekly to track & improve their Q-Score
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '16px', height: '2px', background: '#c8ff00' }} />
                <span style={{ fontSize: '11px', color: '#555', fontFamily: 'var(--font-jetbrains)' }}>Top cohort</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '16px', height: '2px', background: '#ededed', opacity: 0.4 }} />
                <span style={{ fontSize: '11px', color: '#555', fontFamily: 'var(--font-jetbrains)' }}>Platform avg</span>
              </div>
            </div>
          </div>

          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={COHORT_DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="week"
                  tick={{ fill: '#333', fontSize: 11, fontFamily: 'var(--font-jetbrains)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#333', fontSize: 11, fontFamily: 'var(--font-jetbrains)' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    background: '#111',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-jetbrains)',
                    color: '#ededed',
                  }}
                  formatter={(value: unknown) => `${value}%`}
                />
                <Line type="monotone" dataKey="top" stroke="#c8ff00" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="avg" stroke="#ededed" strokeWidth={1.5} strokeOpacity={0.4} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
