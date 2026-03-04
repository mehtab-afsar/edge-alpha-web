'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { EASE } from '@/lib/constants'

// ─── Node positions ────────────────────────────────────────────────────────────

const VW = 680
const VH = 475

const NODES = {
  investor:  { x: 340, y: 62,  r: 22, label: 'INVESTOR X',   sub: 'Thesis matched',      color: '#888',    accent: false },
  founderA:  { x: 88,  y: 200, r: 20, label: 'FOUNDER A',    sub: 'Q-Score: 52 → 81',    color: '#888',    accent: false },
  founderB:  { x: 592, y: 200, r: 20, label: 'FOUNDER B',    sub: 'Q-Score: 61 → 74',    color: '#888',    accent: false },
  model:     { x: 340, y: 200, r: 46, label: 'MODEL BRAIN',  sub: '12,841 evals',        color: '#c8ff00', accent: true  },
  patel:     { x: 340, y: 338, r: 24, label: 'PATEL',        sub: '89% success rate',    color: '#ededed', accent: false },
}

// ─── Edge definitions ──────────────────────────────────────────────────────────

// Each edge: from/to coords, color, dashed, bidirectional, packet speed
const EDGES = [
  // Founder A → PATEL
  { id: 'fA-patel',    d: `M 108 210 C 200 280, 240 330, 316 338`,    stroke: 'rgba(255,255,255,0.12)', lime: false, dur: 3.2,  delay: 0    },
  // Founder B → PATEL
  { id: 'fB-patel',    d: `M 572 210 C 480 280, 440 330, 364 338`,    stroke: 'rgba(255,255,255,0.12)', lime: false, dur: 3.6,  delay: 0.6  },
  // PATEL → Model Brain
  { id: 'patel-model', d: `M 340 314 L 340 246`,                      stroke: 'rgba(200,255,0,0.55)',   lime: true,  dur: 1.8,  delay: 0.3  },
  // Model → Investor (lime)
  { id: 'model-inv',   d: `M 340 154 L 340 84`,                       stroke: 'rgba(200,255,0,0.55)',   lime: true,  dur: 2.2,  delay: 0.5  },
  // Investor → Model (feedback back, offset)
  { id: 'inv-model',   d: `M 352 84 C 390 70, 410 130, 395 170`,      stroke: 'rgba(255,255,255,0.08)', lime: false, dur: 4.0,  delay: 1.2  },
  // Model → Founder A (insight back)
  { id: 'model-fA',    d: `M 295 188 C 220 185, 155 195, 108 200`,    stroke: 'rgba(200,255,0,0.2)',    lime: false, dur: 4.4,  delay: 0.9  },
  // Model → Founder B (insight back)
  { id: 'model-fB',    d: `M 385 188 C 460 185, 525 195, 572 200`,    stroke: 'rgba(200,255,0,0.2)',    lime: false, dur: 4.8,  delay: 1.5  },
]

// ─── Node hover card data ──────────────────────────────────────────────────────

const NODE_CARDS: Record<string, { title: string; stats: { k: string; v: string }[] }> = {
  investor: {
    title: 'INVESTOR X',
    stats: [
      { k: 'Thesis match', v: '94%' },
      { k: 'Q threshold', v: '65+' },
      { k: 'Deals via EA', v: '12' },
    ],
  },
  founderA: {
    title: 'FOUNDER A',
    stats: [
      { k: 'Q-Score', v: '52 → 81' },
      { k: 'Artifacts', v: '47' },
      { k: 'Raise', v: '$2.5M' },
    ],
  },
  founderB: {
    title: 'FOUNDER B',
    stats: [
      { k: 'Q-Score', v: '61 → 74' },
      { k: 'Artifacts', v: '42' },
      { k: 'Raise', v: '$4M' },
    ],
  },
  model: {
    title: 'MODEL BRAIN',
    stats: [
      { k: 'Evals', v: '12,841' },
      { k: 'Accuracy', v: '94.2%' },
      { k: 'Improves', v: '+2.3%/100' },
    ],
  },
  patel: {
    title: 'PATEL AGENT',
    stats: [
      { k: 'Success', v: '89%' },
      { k: 'Avg time', v: '4.2 min' },
      { k: 'Boost', v: '+12 GTM' },
    ],
  },
}

// ─── Right column steps ────────────────────────────────────────────────────────

const STEPS = [
  { id: 'founderA',  label: 'Founders enter raw',        sub: 'Q-Score assessed on 6 dimensions'  },
  { id: 'patel',     label: 'Agents process & build',    sub: 'Artifacts generated in minutes'    },
  { id: 'model',     label: 'Model brain learns',        sub: 'Every eval improves accuracy'      },
  { id: 'investor',  label: 'Investors get signal',      sub: 'Thesis-matched deal flow'          },
  { id: 'founderB',  label: 'Moat compounds',            sub: 'Data advantage grows permanently'  },
]

// ─── Stats ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '+2.3%', label: 'Score accuracy per 100 founders added' },
  { value: '100%',  label: 'of artifacts feed the scoring model'   },
  { value: '∞',     label: 'Data moat grows with each evaluation'  },
]

// ─── Component ─────────────────────────────────────────────────────────────────

export function NetworkEffectSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [moatHovered, setMoatHovered] = useState(false)

  const activeStep = STEPS.findIndex((s) => s.id === hoveredNode)
  const card = hoveredNode ? NODE_CARDS[hoveredNode] : null

  // Card placement helpers — offset from node center
  function cardOffset(id: string): { cx: number; cy: number } {
    const n = NODES[id as keyof typeof NODES]
    if (id === 'founderA')  return { cx: n.x + 78,  cy: n.y - 40 }
    if (id === 'founderB')  return { cx: n.x - 78,  cy: n.y - 40 }
    if (id === 'investor')  return { cx: n.x + 82,  cy: n.y + 10 }
    if (id === 'patel')     return { cx: n.x + 88,  cy: n.y }
    return                         { cx: n.x + 70,  cy: n.y - 60 }  // model
  }

  return (
    <section
      id="network-effect"
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
            The Neural Graph
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
            Every founder makes the platform smarter for everyone else
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginTop: '1rem', maxWidth: '480px', lineHeight: 1.65 }}>
            Each evaluation flows through PATEL, trains the Model Brain, and compounds your data moat. Hover any node to see what&apos;s flowing.
          </p>
        </motion.div>

        {/* Graph + steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 280px',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '4rem',
          }}
        >

          {/* ── SVG Neural Graph ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: '#080808',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '14px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              aria-label="Edge Alpha neural graph"
            >
              <defs>
                {/* Glow filters */}
                <filter id="ng-glow-xl" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="b1" />
                  <feGaussianBlur in="SourceGraphic" stdDeviation="5"  result="b2" />
                  <feMerge><feMergeNode in="b1" /><feMergeNode in="b2" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="ng-glow-md" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="ng-glow-sm" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>

                {/* Model brain gradient */}
                <radialGradient id="brain-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="rgba(200,255,0,0.22)" />
                  <stop offset="60%"  stopColor="rgba(200,255,0,0.06)" />
                  <stop offset="100%" stopColor="rgba(200,255,0,0)"    />
                </radialGradient>

                {/* PATEL processor gradient */}
                <radialGradient id="patel-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="rgba(255,255,255,0.12)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
                </radialGradient>

                {/* Moat gradient */}
                <linearGradient id="moat-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="rgba(200,255,0,0.18)" />
                  <stop offset="100%" stopColor="rgba(200,255,0,0.04)" />
                </linearGradient>

                {/* Arrowheads */}
                <marker id="arr-lime" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
                  <path d="M 0 0.5 L 0 6.5 L 6 3.5 Z" fill="rgba(200,255,0,0.7)" />
                </marker>
                <marker id="arr-dim" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
                  <path d="M 0 0.5 L 0 6.5 L 6 3.5 Z" fill="rgba(255,255,255,0.14)" />
                </marker>
                <marker id="arr-lime-sm" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                  <path d="M 0 0.5 L 0 4.5 L 4 2.5 Z" fill="rgba(200,255,0,0.35)" />
                </marker>

                {/* Clip for moat */}
                <clipPath id="moat-clip">
                  <rect x="20" y="406" width={VW - 40} height="50" rx="6" />
                </clipPath>
              </defs>

              {/* ── Dot grid ── */}
              {Array.from({ length: 10 }).flatMap((_, row) =>
                Array.from({ length: 15 }).map((_, col) => (
                  <circle
                    key={`d-${row}-${col}`}
                    cx={col * 48 + 12} cy={row * 48 + 10}
                    r={0.8} fill="rgba(255,255,255,0.025)"
                  />
                ))
              )}

              {/* ── Edges (draw-in on scroll) ── */}
              {EDGES.map((e, i) => (
                <motion.path
                  key={e.id}
                  d={e.d}
                  fill="none"
                  stroke={e.stroke}
                  strokeWidth={e.lime ? 1.6 : 1}
                  strokeDasharray={e.lime ? '5 4' : undefined}
                  markerEnd={e.lime ? 'url(#arr-lime)' : e.id.includes('model-f') ? 'url(#arr-lime-sm)' : 'url(#arr-dim)'}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.13, ease: 'easeOut' }}
                />
              ))}

              {/* ── Animated data packets ── */}
              {inView && EDGES.map((e) => {
                const MotionEl = 'animateMotion' as unknown as React.ElementType
                return (
                  <circle
                    key={`pkt-${e.id}`}
                    r={e.lime ? 3.2 : 2}
                    fill={e.lime ? '#c8ff00' : 'rgba(255,255,255,0.3)'}
                    opacity={0.9}
                  >
                    <MotionEl
                      dur={`${e.dur}s`}
                      repeatCount="indefinite"
                      begin={`${e.delay}s`}
                      path={e.d}
                    />
                  </circle>
                )
              })}

              {/* ── Model Brain (center) ── */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: `${NODES.model.x}px ${NODES.model.y}px`, cursor: 'default' }}
                onMouseEnter={() => setHoveredNode('model')}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Outer glow halo */}
                <circle cx={NODES.model.x} cy={NODES.model.y} r={80}
                  fill="url(#brain-grad)" filter="url(#ng-glow-xl)" />

                {/* Pulse rings */}
                <motion.circle
                  cx={NODES.model.x} cy={NODES.model.y} r={58}
                  fill="none" stroke="rgba(200,255,0,0.08)" strokeWidth={1}
                  animate={{ r: [54, 72], opacity: [0.3, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.circle
                  cx={NODES.model.x} cy={NODES.model.y} r={54}
                  fill="none" stroke="rgba(200,255,0,0.06)" strokeWidth={0.8}
                  animate={{ r: [50, 70], opacity: [0.2, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut', delay: 1.4 }}
                />

                {/* Outer ring */}
                <circle cx={NODES.model.x} cy={NODES.model.y} r={NODES.model.r + 8}
                  fill="none" stroke="rgba(200,255,0,0.14)" strokeWidth={0.8}
                  strokeDasharray="4 8" />

                {/* Body */}
                <circle cx={NODES.model.x} cy={NODES.model.y} r={NODES.model.r}
                  fill="#0a0a0a" stroke="#c8ff00" strokeWidth={1.8}
                  filter={hoveredNode === 'model' ? 'url(#ng-glow-md)' : undefined} />

                {/* Labels */}
                <text x={NODES.model.x} y={NODES.model.y - 14} textAnchor="middle"
                  fill="#c8ff00" fontSize={9} fontFamily="var(--font-jetbrains)"
                  fontWeight="700" letterSpacing="0.08em">
                  MODEL
                </text>
                <text x={NODES.model.x} y={NODES.model.y} textAnchor="middle"
                  fill="#c8ff00" fontSize={9} fontFamily="var(--font-jetbrains)"
                  fontWeight="700" letterSpacing="0.08em">
                  BRAIN
                </text>
                <text x={NODES.model.x} y={NODES.model.y + 16} textAnchor="middle"
                  fill="rgba(200,255,0,0.4)" fontSize={7} fontFamily="var(--font-jetbrains)"
                  letterSpacing="0.06em">
                  12,841 evals
                </text>
                <text x={NODES.model.x} y={NODES.model.y + 28} textAnchor="middle"
                  fill="rgba(200,255,0,0.25)" fontSize={6} fontFamily="var(--font-jetbrains)">
                  94.2% accuracy
                </text>
              </motion.g>

              {/* ── PATEL processor node ── */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: `${NODES.patel.x}px ${NODES.patel.y}px`, cursor: 'default' }}
                onMouseEnter={() => setHoveredNode('patel')}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Processor glow */}
                <circle cx={NODES.patel.x} cy={NODES.patel.y} r={38}
                  fill="url(#patel-grad)" filter="url(#ng-glow-sm)" />

                {/* Hex-ish outer ring: dashed */}
                <circle cx={NODES.patel.x} cy={NODES.patel.y} r={NODES.patel.r + 6}
                  fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={0.8}
                  strokeDasharray="3 7" />

                {/* Body */}
                <circle cx={NODES.patel.x} cy={NODES.patel.y} r={NODES.patel.r}
                  fill={hoveredNode === 'patel' ? 'rgba(255,255,255,0.06)' : '#0d0d0d'}
                  stroke={hoveredNode === 'patel' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.18)'}
                  strokeWidth={1.2}
                  style={{ transition: 'fill 200ms, stroke 200ms' }} />

                <text x={NODES.patel.x} y={NODES.patel.y - 4} textAnchor="middle"
                  fill={hoveredNode === 'patel' ? '#ededed' : '#aaa'}
                  fontSize={8.5} fontFamily="var(--font-jetbrains)" fontWeight="700" letterSpacing="0.08em"
                  style={{ transition: 'fill 200ms' }}>
                  PATEL
                </text>
                <text x={NODES.patel.x} y={NODES.patel.y + 9} textAnchor="middle"
                  fill="rgba(255,255,255,0.2)" fontSize={6} fontFamily="var(--font-jetbrains)">
                  processor
                </text>
              </motion.g>

              {/* ── Outer nodes (Investor, Founder A, Founder B) ── */}
              {(['investor', 'founderA', 'founderB'] as const).map((id, i) => {
                const n = NODES[id]
                const isHov = hoveredNode === id
                return (
                  <motion.g
                    key={id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{ transformOrigin: `${n.x}px ${n.y}px`, cursor: 'default' }}
                    onMouseEnter={() => setHoveredNode(id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Hover halo */}
                    {isHov && (
                      <circle cx={n.x} cy={n.y} r={n.r + 10}
                        fill="rgba(255,255,255,0.03)" filter="url(#ng-glow-sm)" />
                    )}

                    {/* Body */}
                    <circle cx={n.x} cy={n.y} r={n.r}
                      fill={isHov ? 'rgba(255,255,255,0.05)' : '#0d0d0d'}
                      stroke={isHov ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)'}
                      strokeWidth={1}
                      style={{ transition: 'fill 200ms, stroke 200ms' }} />

                    {/* Label */}
                    <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle"
                      fill={isHov ? '#ededed' : '#666'}
                      fontSize={id === 'investor' ? 6.5 : 7}
                      fontFamily="var(--font-jetbrains)" fontWeight="700" letterSpacing="0.07em"
                      style={{ transition: 'fill 200ms' }}>
                      {n.label}
                    </text>

                    {/* Sub-label below */}
                    <text
                      x={n.x}
                      y={n.y + n.r + 10}
                      textAnchor="middle"
                      fill={isHov ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)'}
                      fontSize={6.5} fontFamily="var(--font-jetbrains)"
                      style={{ transition: 'fill 200ms' }}>
                      {n.sub}
                    </text>
                  </motion.g>
                )
              })}

              {/* ── Data Moat pool ── */}
              <motion.g
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.7 }}
                onMouseEnter={() => setMoatHovered(true)}
                onMouseLeave={() => setMoatHovered(false)}
                style={{ cursor: 'default' }}
              >
                {/* Connector line from PATEL down to moat */}
                <line x1={340} y1={362} x2={340} y2={406}
                  stroke="rgba(200,255,0,0.18)" strokeWidth={1} strokeDasharray="3 5" />

                {/* Pool background */}
                <rect x={20} y={406} width={VW - 40} height={50} rx={8}
                  fill={moatHovered ? 'rgba(200,255,0,0.07)' : 'rgba(200,255,0,0.03)'}
                  stroke={moatHovered ? 'rgba(200,255,0,0.3)' : 'rgba(200,255,0,0.12)'}
                  strokeWidth={0.8}
                  style={{ transition: 'fill 300ms, stroke 300ms' }} />

                {/* Wave animation inside pool */}
                <motion.path
                  d={`M 20 420 Q 115 410 210 420 Q 305 430 400 420 Q 495 410 590 420 Q 640 425 ${VW - 20} 420 L ${VW - 20} 456 L 20 456 Z`}
                  fill="url(#moat-grad)"
                  clipPath="url(#moat-clip)"
                  animate={{ d: [
                    `M 20 420 Q 115 410 210 420 Q 305 430 400 420 Q 495 410 590 420 Q 640 425 ${VW - 20} 420 L ${VW - 20} 456 L 20 456 Z`,
                    `M 20 424 Q 115 432 210 424 Q 305 416 400 424 Q 495 432 590 424 Q 640 420 ${VW - 20} 424 L ${VW - 20} 456 L 20 456 Z`,
                    `M 20 420 Q 115 410 210 420 Q 305 430 400 420 Q 495 410 590 420 Q 640 425 ${VW - 20} 420 L ${VW - 20} 456 L 20 456 Z`,
                  ]}}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Moat label */}
                <text x={50} y={424} fill="rgba(200,255,0,0.55)"
                  fontSize={8} fontFamily="var(--font-jetbrains)" fontWeight="700" letterSpacing="0.1em">
                  DATA MOAT
                </text>

                {/* Stats */}
                <text x={50} y={440} fill="rgba(200,255,0,0.28)"
                  fontSize={6.5} fontFamily="var(--font-jetbrains)">
                  12,841 evaluations · growing
                </text>

                {/* Depth gauge bar */}
                <rect x={VW - 110} y={416} width={90} height={4} rx={2}
                  fill="rgba(255,255,255,0.04)" />
                <motion.rect
                  x={VW - 110} y={416} height={4} rx={2}
                  fill="#c8ff00"
                  initial={{ width: 0 }}
                  animate={inView ? { width: 74 } : {}}
                  transition={{ duration: 1.2, delay: 0.9, ease: 'easeOut' }}
                />
                <text x={VW - 110} y={430} fill="rgba(200,255,0,0.4)"
                  fontSize={6} fontFamily="var(--font-jetbrains)">
                  depth 82% vs competitors
                </text>

                {/* Floating particle dots inside moat */}
                {[0.15, 0.3, 0.5, 0.65, 0.8].map((t, pi) => (
                  <motion.circle
                    key={`mp-${pi}`}
                    cx={20 + t * (VW - 40)}
                    cy={430}
                    r={1.5}
                    fill="rgba(200,255,0,0.4)"
                    animate={{ cy: [428, 432, 428], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.5 + pi * 0.4, repeat: Infinity, ease: 'easeInOut', delay: pi * 0.5 }}
                  />
                ))}
              </motion.g>

              {/* ── Hover info cards (SVG foreignObject approach → use g+rect) ── */}
              {hoveredNode && card && (() => {
                const off = cardOffset(hoveredNode)
                const cw = 110
                const ch = 16 + card.stats.length * 18 + 12
                // clamp so card stays in viewbox
                const cx = Math.min(Math.max(off.cx - cw / 2, 4), VW - cw - 4)
                const cy = Math.max(off.cy - ch / 2, 4)

                return (
                  <motion.g
                    key={hoveredNode + '-card'}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ pointerEvents: 'none' }}
                  >
                    {/* Card shadow/glow */}
                    <rect x={cx - 2} y={cy - 2} width={cw + 4} height={ch + 4} rx={8}
                      fill="rgba(200,255,0,0.06)" filter="url(#ng-glow-sm)" />
                    {/* Card body */}
                    <rect x={cx} y={cy} width={cw} height={ch} rx={6}
                      fill="#0e0e0e" stroke="rgba(200,255,0,0.22)" strokeWidth={0.8} />
                    {/* Title */}
                    <text x={cx + 10} y={cy + 14}
                      fill="#c8ff00" fontSize={7} fontFamily="var(--font-jetbrains)"
                      fontWeight="700" letterSpacing="0.09em">
                      {card.title}
                    </text>
                    {/* Stats */}
                    {card.stats.map((s, si) => (
                      <g key={si}>
                        <text x={cx + 10} y={cy + 28 + si * 18}
                          fill="rgba(255,255,255,0.35)" fontSize={6.5}
                          fontFamily="var(--font-jetbrains)">
                          {s.k}
                        </text>
                        <text x={cx + cw - 10} y={cy + 28 + si * 18}
                          textAnchor="end" fill="#ededed" fontSize={6.5}
                          fontFamily="var(--font-jetbrains)" fontWeight="700">
                          {s.v}
                        </text>
                      </g>
                    ))}
                  </motion.g>
                )
              })()}

            </svg>
          </motion.div>

          {/* ── Right column: flywheel steps ── */}
          <div>
            {STEPS.map((step, i) => {
              const isActive = activeStep === i || (moatHovered && i === STEPS.length - 1)
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1, ease: EASE }}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: isActive ? 'rgba(200,255,0,0.04)' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(200,255,0,0.12)' : 'transparent'}`,
                    transition: 'background 200ms, border-color 200ms',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '3px' }}>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: isActive || i === STEPS.length - 1 ? '#c8ff00' : '#111',
                        border: `1px solid ${isActive ? '#c8ff00' : 'rgba(200,255,0,0.3)'}`,
                        transition: 'background 200ms, border-color 200ms',
                        flexShrink: 0,
                      }}
                    />
                    {i < STEPS.length - 1 && (
                      <div
                        style={{
                          width: '1px',
                          height: '28px',
                          background: isActive
                            ? 'linear-gradient(to bottom, rgba(200,255,0,0.4), rgba(200,255,0,0.1))'
                            : 'linear-gradient(to bottom, rgba(200,255,0,0.15), rgba(200,255,0,0.04))',
                          transition: 'background 200ms',
                        }}
                      />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < STEPS.length - 1 ? '0.75rem' : 0 }}>
                    <p
                      style={{
                        fontSize: '13px',
                        color: isActive ? '#ededed' : '#555',
                        fontWeight: isActive ? 500 : 400,
                        lineHeight: 1.4,
                        marginBottom: '2px',
                        transition: 'color 200ms',
                      }}
                    >
                      {step.label}
                    </p>
                    <p
                      style={{
                        fontSize: '11px',
                        color: isActive ? 'rgba(200,255,0,0.6)' : '#333',
                        fontFamily: 'var(--font-jetbrains)',
                        transition: 'color 200ms',
                      }}
                    >
                      {step.sub}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Stat cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.1, ease: EASE }}
              style={{ background: '#050505', padding: '2rem' }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#c8ff00',
                  marginBottom: '0.5rem',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.5 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
