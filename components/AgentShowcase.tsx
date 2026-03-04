'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { AGENTS, EASE } from '@/lib/constants'

// ─── Types ────────────────────────────────────────────────────────────────────

type AgentData = {
  id: string
  name: string
  role: string
  quote: string
  delivers: string[]
  executes: string[]
}

// ─── All 9 agents ─────────────────────────────────────────────────────────────

const ALL_AGENTS: AgentData[] = [
  ...AGENTS,
  {
    id: 'maya',
    name: 'MAYA',
    role: 'Legal Agent',
    quote: 'Reviewed your SAFE. Found 3 non-standard clauses. MFN carve-outs too broad, pro-rata rights missing. Redline prepared. Founder-friendly version sent.',
    delivers: ['Term Sheet Analysis', 'Contract Redline', 'IP Audit'],
    executes: ['Document parsing', 'Clause flagging', 'Risk scoring'],
  },
  {
    id: 'leo',
    name: 'LEO',
    role: 'Product Agent',
    quote: 'Analyzed 142 user interviews. Top 3 pain points: onboarding friction (68%), missing integrations (54%), reporting gaps (41%). Roadmap updated.',
    delivers: ['Feature Roadmap', 'User Research Synthesis', 'PRD Draft'],
    executes: ['Interview analysis', 'Feedback clustering', 'Roadmap scoring'],
  },
  {
    id: 'nova',
    name: 'NOVA',
    role: 'Brand Agent',
    quote: 'Brand voice scores 62/100 on distinctiveness. Rewritten messaging increases clarity by 40%. Positioning differentiated from 3 key competitors. Guidelines shipped.',
    delivers: ['Brand Guidelines', 'Messaging Framework', 'Pitch Narrative'],
    executes: ['Voice analysis', 'Competitor audit', 'Story generation'],
  },
  {
    id: 'sage',
    name: 'SAGE',
    role: 'Operations Agent',
    quote: 'Found 3 bottlenecks costing 8 hours/week. Onboarding (3.2h), reporting (2.8h), vendor invoicing (2h). Automation deployed. Dashboard live.',
    delivers: ['Process Playbooks', 'Vendor Analysis', 'KPI Dashboard'],
    executes: ['Workflow mapping', 'Cost analysis', 'Dashboard build'],
  },
]

// ─── Agent metadata ───────────────────────────────────────────────────────────

const AGENT_STATS: Record<string, { successRate: number; avgTime: number; impact: string }> = {
  patel:  { successRate: 89, avgTime: 4.2, impact: '+12 GTM' },
  felix:  { successRate: 95, avgTime: 5.7, impact: '+15 Financial' },
  susi:   { successRate: 92, avgTime: 3.1, impact: '+8 Sales' },
  atlas:  { successRate: 88, avgTime: 6.1, impact: '+11 Intel' },
  harper: { successRate: 91, avgTime: 3.8, impact: '+9 Team' },
  maya:   { successRate: 87, avgTime: 7.2, impact: '+6 Legal' },
  leo:    { successRate: 90, avgTime: 5.5, impact: '+8 Product' },
  nova:   { successRate: 85, avgTime: 4.8, impact: '+5 Brand' },
  sage:   { successRate: 93, avgTime: 3.4, impact: '+7 Ops' },
}

// Steps shown while agent is "executing"
const EXECUTION_STEPS: Record<string, string[]> = {
  patel:  ['Scanning LinkedIn for ICP matches...', 'Enriching lead profiles...', 'Writing personalized sequences...'],
  felix:  ['Connecting to Stripe API...', 'Pulling MRR & burn data...', 'Modeling 3 scenarios...'],
  susi:   ['Auditing pipeline stages...', 'Flagging 7 stale deals...', 'Drafting follow-up sequences...'],
  atlas:  ['Scraping competitor signals...', 'Updating battlecard matrix...', 'Flagging 2 prospect mentions...'],
  harper: ['Screening 34 applications...', 'Matching against rubric...', 'Sending screening emails...'],
  maya:   ['Parsing document clauses...', 'Flagging non-standard terms...', 'Preparing founder-friendly redline...'],
  leo:    ['Clustering user feedback...', 'Scoring feature requests by impact...', 'Updating roadmap priorities...'],
  nova:   ['Auditing brand voice signals...', 'Benchmarking 3 competitors...', 'Generating messaging framework...'],
  sage:   ['Mapping workflow steps...', 'Identifying bottlenecks...', 'Building automation templates...'],
}

// ─── Canned responses ─────────────────────────────────────────────────────────

type CannedItem = { patterns: string[]; response: string; artifact: string; badge: string }

const AGENT_RESPONSES: Record<string, CannedItem[]> = {
  patel: [
    { patterns: ['lead', 'icp', 'prospect', 'find'], response: 'Found 47 leads matching your ICP. Personalized emails written. 12 sent. 3 opened. 1 replied. Response drafted. Call booked for Thursday.', artifact: 'ICP Document v2', badge: '+4 to GTM' },
    { patterns: ['gtm', 'go to market', 'strategy', 'outreach', 'email'], response: "GTM gap found in enterprise segment. New playbook drafted targeting mid-market SaaS buyers — sequencing 3 channels: cold email, LinkedIn, partner referrals.", artifact: 'GTM Playbook v1', badge: '+3 to GTM' },
  ],
  felix: [
    { patterns: ['mrr', 'revenue', 'stripe', 'money', 'arr', 'show'], response: 'Connected to Stripe. Live MRR: $24,800. Burn rate: $18,200/mo. Runway: 14 months. Unit economics strong — CAC:LTV ratio is 1:4.2.', artifact: 'Financial Model Q1', badge: '+5 to Financial' },
    { patterns: ['runway', 'burn', 'cash', 'scenario', 'model'], response: 'Burn rate gives 14 months runway. 3 scenarios: aggressive growth (+$42k spend), maintain pace, or extend to 20 months with 2 hires paused.', artifact: 'Scenario Analysis', badge: '+3 to Financial' },
  ],
  susi: [
    { patterns: ['deal', 'pipeline', 'sales', 'crm', 'stale', 'analyze'], response: 'Pipeline has 23 open deals. 7 are stale >14 days. Follow-ups drafted. 3 deals at pricing objection — counter-offer templates ready.', artifact: 'Sales Playbook v3', badge: '+4 to GTM' },
    { patterns: ['pricing', 'objection', 'close', 'churn', 'handle'], response: "Pricing analysis: 3 of 5 lost deals cited 'too expensive.' Competitor is $40/mo cheaper on entry. Recommendation: add freemium tier or sharpen ROI messaging.", artifact: 'Pricing Strategy', badge: '+3 to Product' },
  ],
  atlas: [
    { patterns: ['competitor', 'compete', 'market', 'battlecard', 'monitor'], response: "Competitor X launched a new feature yesterday. Here's how you're differentiated. Battlecard updated. 2 prospect mentions flagged for outreach.", artifact: 'Competitive Battlecard', badge: '+3 to Market' },
    { patterns: ['win', 'loss', 'why', 'lose', 'analysis'], response: 'Win/loss: you win 72% when demo leads. You lose 68% when pricing is discussed first. Recommendation: demo before pricing in sales flow.', artifact: 'Win/Loss Analysis', badge: '+4 to GTM' },
  ],
  harper: [
    { patterns: ['hire', 'engineer', 'talent', 'recruit', 'apply', 'screen'], response: 'Reviewed 34 applications for senior engineer. 6 match criteria. Screening emails sent. 3 replied — calendar links attached. First interviews set.', artifact: 'Hiring Rubric v1', badge: '+3 to Team' },
    { patterns: ['team', 'culture', 'offer', 'comp', 'salary', 'benchmark'], response: 'Offer templates are 12% below market for senior roles. Updated comp benchmarks attached. Equity ranges adjusted to Series A norms.', artifact: 'Offer Templates', badge: '+4 to Team' },
  ],
  maya: [
    { patterns: ['safe', 'term', 'legal', 'contract', 'invest', 'review'], response: 'Reviewed your SAFE. Found 3 non-standard clauses: MFN carve-outs too broad, pro-rata rights missing, discount cap needs adjustment. Redline prepared.', artifact: 'SAFE Redline v1', badge: '+4 to Financial' },
    { patterns: ['ip', 'patent', 'copyright', 'trademark', 'audit'], response: 'IP audit complete. Core technology has no protection. Provisional patent recommended for your differentiated algorithm. Filing process outlined.', artifact: 'IP Audit Report', badge: '+3 to Product' },
  ],
  leo: [
    { patterns: ['roadmap', 'feature', 'product', 'user', 'build', 'prioritize'], response: 'Analyzed 142 user interviews. Top pain points: onboarding friction (68%), missing integrations (54%), reporting gaps (41%). Roadmap updated with effort/impact matrix.', artifact: 'Feature Roadmap v2', badge: '+4 to Product' },
    { patterns: ['prd', 'spec', 'requirement', 'write', 'draft'], response: 'PRD drafted for top-priority feature. User stories written, acceptance criteria defined, API contract outlined. Ready for first engineering sprint.', artifact: 'PRD Draft', badge: '+3 to Product' },
  ],
  nova: [
    { patterns: ['brand', 'messaging', 'voice', 'story', 'pitch', 'rewrite'], response: 'Brand voice audit complete. Distinctiveness: 62/100. Rewritten messaging increases clarity by 40%. Now differentiated from 3 key competitors.', artifact: 'Messaging Framework', badge: '+5 to Brand' },
    { patterns: ['narrative', 'investor', 'deck', 'structure', 'audit'], response: 'Pitch narrative restructured: Problem → Solution → Traction → Ask. Emotional hook added to slide 1. Tested against 3 investor archetypes.', artifact: 'Pitch Narrative', badge: '+4 to GTM' },
  ],
  sage: [
    { patterns: ['ops', 'operation', 'process', 'workflow', 'bottleneck', 'find'], response: 'Found 3 bottlenecks costing 8 hours/week: onboarding (3.2h), reporting (2.8h), vendor invoicing (2h). Automation deployed for all 3.', artifact: 'Process Playbook', badge: '+3 to Ops' },
    { patterns: ['vendor', 'cost', 'spend', 'kpi', 'metric', 'dashboard'], response: 'KPI dashboard live. 14 metrics tracked. 2 vendors overpriced — renegotiation templates ready. Monthly savings: $2,400.', artifact: 'KPI Dashboard', badge: '+4 to Financial' },
  ],
}

const DEFAULT_RESPONSES: Record<string, { response: string; artifact: string; badge: string }> = {
  patel:  { response: "Analyzing your go-to-market. Running lead enrichment — I'll identify your top 50 prospects and draft personalized sequences.", artifact: 'GTM Analysis', badge: '+3 to GTM' },
  felix:  { response: "Running financial analysis. Unit economics look healthy. I'll model 3 scenarios and prepare investor-grade slides.", artifact: 'Financial Overview', badge: '+3 to Financial' },
  susi:   { response: "Scanning your pipeline. I'll prioritize your highest-value deals and draft follow-ups for anything that's gone cold.", artifact: 'Pipeline Report', badge: '+3 to GTM' },
  atlas:  { response: "Monitoring competitor activity across 8 signals. I'll flag significant moves and update your battlecards.", artifact: 'Market Intel Report', badge: '+3 to Market' },
  harper: { response: "Reviewing team structure and open roles. I'll benchmark compensation and identify the 3 highest-impact hires for your next stage.", artifact: 'Team Roadmap', badge: '+3 to Team' },
  maya:   { response: "Parsing your legal documents. I'll flag any non-standard clauses and prepare a founder-friendly redline.", artifact: 'Legal Review', badge: '+3 to Financial' },
  leo:    { response: "Analyzing user feedback and interview data. I'll prioritize your feature roadmap by effort vs. impact.", artifact: 'Product Analysis', badge: '+3 to Product' },
  nova:   { response: "Auditing brand voice and messaging. I'll benchmark against competitors and rewrite for clarity and distinctiveness.", artifact: 'Brand Audit', badge: '+3 to Brand' },
  sage:   { response: "Mapping operational workflows. I'll identify bottlenecks and deploy automation where it saves the most time.", artifact: 'Ops Analysis', badge: '+3 to Ops' },
}

const SUGGESTED_QUESTIONS: Record<string, string[]> = {
  patel:  ['Find leads in my ICP', 'Build GTM strategy', 'Write outreach emails'],
  felix:  ['Show MRR & runway', 'Model burn scenarios', 'Prep investor slides'],
  susi:   ['Analyze my pipeline', 'Handle pricing objection', 'Score my deals'],
  atlas:  ['Monitor competitors', 'Update battlecards', 'Win/loss analysis'],
  harper: ['Screen applicants', 'Benchmark comp', 'Draft job descriptions'],
  maya:   ['Review my SAFE', 'Audit IP rights', 'Check my term sheet'],
  leo:    ['Prioritize roadmap', 'Write a PRD', 'Synthesize user feedback'],
  nova:   ['Audit brand voice', 'Rewrite messaging', 'Structure pitch narrative'],
  sage:   ['Find bottlenecks', 'Build KPI dashboard', 'Analyze vendor costs'],
}

const ARTIFACT_BAR_WIDTHS = [72, 55, 85, 48, 78, 62, 90, 41, 68]

// ─── Agent card ───────────────────────────────────────────────────────────────

function AgentCard({ agent, isActive, onClick }: { agent: AgentData; isActive: boolean; onClick: () => void }) {
  const stats = AGENT_STATS[agent.id]
  return (
    <button
      onClick={onClick}
      style={{
        background: isActive ? 'rgba(200,255,0,0.06)' : '#0a0a0a',
        border: `1px solid ${isActive ? 'rgba(200,255,0,0.3)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '10px',
        padding: '12px 14px',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 150ms',
        width: '100%',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'rgba(255,255,255,0.02)'
          el.style.borderColor = 'rgba(255,255,255,0.1)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          const el = e.currentTarget as HTMLElement
          el.style.background = '#0a0a0a'
          el.style.borderColor = 'rgba(255,255,255,0.06)'
        }
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontWeight: 700,
            fontSize: '12px',
            color: isActive ? '#c8ff00' : '#ededed',
            transition: 'color 150ms',
            letterSpacing: '0.05em',
          }}
        >
          {agent.name}
        </span>
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: isActive ? '#c8ff00' : '#1a1a1a',
            boxShadow: isActive ? '0 0 8px rgba(200,255,0,0.7)' : 'none',
            transition: 'all 200ms',
            marginTop: '2px',
            flexShrink: 0,
          }}
        />
      </div>
      <div
        style={{
          fontSize: '10px',
          color: isActive ? '#666' : '#2a2a2a',
          marginBottom: '8px',
          fontFamily: 'var(--font-jetbrains)',
          transition: 'color 150ms',
          lineHeight: 1.3,
        }}
      >
        {agent.role}
      </div>
      {stats && (
        <div>
          <div style={{ height: '2px', background: '#111', borderRadius: '1px', overflow: 'hidden', marginBottom: '4px' }}>
            <div
              style={{
                height: '100%',
                width: `${stats.successRate}%`,
                background: isActive ? '#c8ff00' : 'rgba(255,255,255,0.1)',
                borderRadius: '1px',
                transition: 'background 200ms',
              }}
            />
          </div>
          <span style={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains)', color: isActive ? 'rgba(200,255,0,0.5)' : '#1e1e1e', transition: 'color 200ms' }}>
            {stats.successRate}%
          </span>
        </div>
      )}
    </button>
  )
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

type Message = { role: 'agent' | 'user'; text: string }
type Artifact = { name: string; badge: string }

function AgentChat({ agent }: { agent: AgentData }) {
  const [messages, setMessages] = useState<Message[]>([{ role: 'agent', text: agent.quote }])
  const [input, setInput] = useState('')
  const [artifact, setArtifact] = useState<Artifact | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [executionStep, setExecutionStep] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const stats = AGENT_STATS[agent.id]

  useEffect(() => {
    setMessages([{ role: 'agent', text: agent.quote }])
    setInput('')
    setArtifact(null)
    setIsTyping(false)
    setExecutionStep(null)
  }, [agent.id])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, executionStep])

  function getResponse(query: string) {
    const lower = query.toLowerCase()
    const canned = AGENT_RESPONSES[agent.id] || []
    for (const item of canned) {
      if (item.patterns.some((p) => lower.includes(p))) {
        return { response: item.response, artifact: item.artifact, badge: item.badge }
      }
    }
    return DEFAULT_RESPONSES[agent.id]
  }

  function send(text: string) {
    if (!text.trim() || isTyping) return
    const query = text.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: query }])
    setIsTyping(true)
    setArtifact(null)

    const steps = EXECUTION_STEPS[agent.id] || []
    steps.forEach((step, i) => setTimeout(() => setExecutionStep(step), i * 360))

    setTimeout(() => {
      const res = getResponse(query)
      setIsTyping(false)
      setExecutionStep(null)
      setMessages((prev) => [...prev, { role: 'agent', text: res.response }])
      setArtifact({ name: res.artifact, badge: res.badge })
    }, 1200)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    send(input)
  }

  return (
    <div style={{ display: 'flex', gap: '12px', height: '440px' }}>
      {/* Chat panel */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#070707',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        {/* Agent header bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            background: '#0a0a0a',
            flexShrink: 0,
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#c8ff00',
                boxShadow: '0 0 8px rgba(200,255,0,0.6)',
                flexShrink: 0,
              }}
            />
            <span style={{ fontFamily: 'var(--font-jetbrains)', fontWeight: 700, fontSize: '13px', color: '#ededed', letterSpacing: '0.06em', marginRight: '6px' }}>
              {agent.name}
            </span>
            <span style={{ fontSize: '11px', color: '#333' }}>{agent.role}</span>
          </div>
          {stats && (
            <div style={{ display: 'flex', gap: '20px' }}>
              {[
                { label: 'Success', val: `${stats.successRate}%` },
                { label: 'Avg', val: `${stats.avgTime}m` },
                { label: 'Impact', val: stats.impact },
              ].map(({ label, val }) => (
                <div key={label} style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontFamily: 'var(--font-jetbrains)', fontWeight: 600, color: '#c8ff00', lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: '9px', color: '#2a2a2a', fontFamily: 'var(--font-jetbrains)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '8px' }}
            >
              {msg.role === 'agent' && (
                <div
                  style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: '#0d0d0d', border: '1px solid rgba(200,255,0,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: '8px', fontFamily: 'var(--font-jetbrains)',
                    fontWeight: 700, color: '#c8ff00',
                  }}
                >
                  {agent.name[0]}
                </div>
              )}
              <div
                style={{
                  maxWidth: '80%',
                  padding: '9px 13px',
                  borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: msg.role === 'user' ? 'rgba(200,255,0,0.07)' : '#111',
                  border: msg.role === 'user' ? '1px solid rgba(200,255,0,0.14)' : '1px solid rgba(255,255,255,0.05)',
                  fontSize: '13px',
                  color: msg.role === 'user' ? '#c8ff00' : '#888',
                  lineHeight: 1.6,
                  fontFamily: 'var(--font-jetbrains)',
                }}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Execution log */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}
            >
              <div
                style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: '#0d0d0d', border: '1px solid rgba(200,255,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: '8px', fontFamily: 'var(--font-jetbrains)',
                  fontWeight: 700, color: '#c8ff00',
                }}
              >
                {agent.name[0]}
              </div>
              <div
                style={{
                  padding: '9px 13px',
                  borderRadius: '12px 12px 12px 2px',
                  background: '#0d0d0d',
                  border: '1px solid rgba(200,255,0,0.1)',
                  fontSize: '12px',
                  color: '#555',
                  fontFamily: 'var(--font-jetbrains)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={executionStep || 'init'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {executionStep || 'Initializing...'}
                  </motion.span>
                </AnimatePresence>
                <div style={{ display: 'flex', gap: '3px', flexShrink: 0 }}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: '3px', height: '3px', borderRadius: '50%', background: '#333',
                        animation: `blink 1.2s step-end ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={endRef} />
        </div>

        {/* Delivers */}
        <div
          style={{
            padding: '8px 12px', display: 'flex', gap: '6px', flexWrap: 'wrap',
            borderTop: '1px solid rgba(255,255,255,0.03)', background: '#070707',
          }}
        >
          <span style={{ fontSize: '10px', color: '#1e1e1e', fontFamily: 'var(--font-jetbrains)', alignSelf: 'center' }}>Delivers:</span>
          {agent.delivers.map((d) => (
            <span
              key={d}
              style={{
                fontSize: '10px', fontFamily: 'var(--font-jetbrains)', color: '#2e2e2e',
                background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: '4px', padding: '2px 7px', whiteSpace: 'nowrap',
              }}
            >
              {d}
            </span>
          ))}
        </div>

        {/* Suggested prompts */}
        <div style={{ padding: '8px 12px', display: 'flex', gap: '6px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
          {SUGGESTED_QUESTIONS[agent.id]?.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              disabled={isTyping}
              style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px', padding: '4px 12px', fontSize: '11px',
                color: '#444', cursor: isTyping ? 'default' : 'pointer',
                fontFamily: 'var(--font-jetbrains)', transition: 'all 150ms',
                opacity: isTyping ? 0.3 : 1,
              }}
              onMouseEnter={(e) => {
                if (isTyping) return
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(200,255,0,0.3)'
                el.style.color = '#c8ff00'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.07)'
                el.style.color = '#444'
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={onSubmit}
          style={{
            display: 'flex', gap: '8px', padding: '10px 12px',
            borderTop: '1px solid rgba(255,255,255,0.04)', background: '#0a0a0a',
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${agent.name}…`}
            disabled={isTyping}
            style={{
              flex: 1, background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px',
              padding: '8px 12px', fontSize: '13px', color: '#ededed',
              fontFamily: 'var(--font-jetbrains)', outline: 'none',
              opacity: isTyping ? 0.4 : 1,
            }}
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            style={{
              background: '#c8ff00', border: 'none', borderRadius: '8px',
              padding: '8px 16px', fontSize: '15px', fontWeight: 700,
              color: '#050505', cursor: isTyping || !input.trim() ? 'default' : 'pointer',
              opacity: isTyping || !input.trim() ? 0.3 : 1, transition: 'opacity 150ms',
              flexShrink: 0,
            }}
          >
            →
          </button>
        </form>
      </div>

      {/* Artifact panel */}
      <AnimatePresence>
        {artifact && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              width: '220px', flexShrink: 0,
              background: '#070707', border: '1px solid rgba(200,255,0,0.15)',
              borderRadius: '12px', padding: '1.25rem',
              display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                padding: '4px 10px', background: 'rgba(200,255,0,0.08)',
                border: '1px solid rgba(200,255,0,0.2)', borderRadius: '4px',
                fontSize: '10px', fontFamily: 'var(--font-jetbrains)',
                color: '#c8ff00', fontWeight: 700, letterSpacing: '0.06em', width: 'fit-content',
              }}
            >
              ↑ {artifact.badge}
            </div>

            <div>
              <div style={{ fontSize: '10px', color: '#2a2a2a', fontFamily: 'var(--font-jetbrains)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                Artifact generated
              </div>
              <div style={{ fontSize: '13px', color: '#ededed', fontFamily: 'var(--font-jetbrains)', fontWeight: 600, lineHeight: 1.3 }}>
                {artifact.name}
              </div>
            </div>

            <div
              style={{
                background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: '6px', padding: '10px',
                display: 'flex', flexDirection: 'column', gap: '5px',
              }}
            >
              {ARTIFACT_BAR_WIDTHS.map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.05, ease: EASE }}
                  style={{
                    height: i === 0 ? '8px' : '5px',
                    background: i === 0 ? 'rgba(200,255,0,0.15)' : '#1a1a1a',
                    borderRadius: '2px', width: `${w}%`, transformOrigin: 'left',
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {agent.executes.slice(0, 3).map((ex) => (
                <div key={ex} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#2a2a2a', fontFamily: 'var(--font-jetbrains)' }}>
                  <span style={{ color: '#c8ff00', fontSize: '8px', flexShrink: 0 }}>✓</span>
                  {ex}
                </div>
              ))}
            </div>

            <div
              style={{
                fontSize: '10px', color: '#1a1a1a', fontFamily: 'var(--font-jetbrains)',
                marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.03)',
              }}
            >
              Generated just now · {stats?.avgTime}m avg
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function AgentShowcase() {
  const [activeAgent, setActiveAgent] = useState<AgentData>(ALL_AGENTS[0])
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })

  const coreAgents = ALL_AGENTS.slice(0, 5)
  const previewAgents = ALL_AGENTS.slice(5)

  return (
    <section
      id="agents"
      ref={sectionRef}
      className="section-py"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: '#050505' }}
    >
      <div className="max-container container-px" style={{ width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="label-micro"
            style={{ display: 'block', marginBottom: '1rem' }}
          >
            9 AI Agents
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
              maxWidth: '600px',
            }}
          >
            Not just insights.{' '}
            <span style={{ color: '#555' }}>Actual execution.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            style={{ fontSize: '15px', color: '#555', marginTop: '1rem', maxWidth: '480px', lineHeight: 1.65 }}
          >
            Each agent is a specialist. Select one and talk to it — every response generates a real artifact that moves your Q-Score.
          </motion.p>
        </div>

        {/* Agent grid: 5 core + 4 preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
          style={{ marginBottom: '1.5rem' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '8px' }}>
            {coreAgents.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.05, ease: EASE }}
              >
                <AgentCard agent={agent} isActive={activeAgent.id === agent.id} onClick={() => setActiveAgent(agent)} />
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {previewAgents.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.55 + i * 0.05, ease: EASE }}
              >
                <AgentCard agent={agent} isActive={activeAgent.id === agent.id} onClick={() => setActiveAgent(agent)} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chat */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAgent.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <AgentChat agent={activeAgent} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
