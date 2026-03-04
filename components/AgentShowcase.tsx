'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { AGENTS, AgentData, EASE } from '@/lib/constants'

// ─── Canned responses per agent ──────────────────────────────────────────────

type CannedItem = { patterns: string[]; response: string; artifact: string; badge: string }

const AGENT_RESPONSES: Record<string, CannedItem[]> = {
  patel: [
    {
      patterns: ['lead', 'icp', 'prospect'],
      response:
        'Found 47 leads matching your ICP. Personalized emails written. 12 sent. 3 opened. 1 replied. Response drafted. Call booked for Thursday.',
      artifact: 'ICP Document v2',
      badge: '+4 to GTM',
    },
    {
      patterns: ['gtm', 'go to market', 'strategy', 'outreach'],
      response:
        "Your GTM shows gaps in the enterprise segment. I've drafted a new playbook targeting mid-market SaaS buyers — sequencing 3 channels: cold email, LinkedIn, and partner referrals.",
      artifact: 'GTM Playbook v1',
      badge: '+3 to GTM',
    },
  ],
  felix: [
    {
      patterns: ['mrr', 'revenue', 'stripe', 'money', 'arr'],
      response:
        'Connected to Stripe. Live MRR: $24,800. Burn rate: $18,200/mo. Runway: 14 months. Unit economics look strong — CAC:LTV ratio is 1:4.2.',
      artifact: 'Financial Model Q1',
      badge: '+5 to Financial',
    },
    {
      patterns: ['runway', 'burn', 'cash', 'scenario'],
      response:
        'Current burn rate gives 14 months runway. Scenario analysis shows 3 paths: aggressive growth (+$42k spend), maintain pace, or extend to 20 months with 2 key hires paused.',
      artifact: 'Scenario Analysis',
      badge: '+3 to Financial',
    },
  ],
  susi: [
    {
      patterns: ['deal', 'pipeline', 'sales', 'crm', 'stale'],
      response:
        'Your pipeline has 23 open deals. 7 are stale over 14 days. Draft follow-ups written. 3 deals are at pricing objection — counter-offer templates ready.',
      artifact: 'Sales Playbook v3',
      badge: '+4 to GTM',
    },
    {
      patterns: ['pricing', 'objection', 'close', 'churn'],
      response:
        "Pricing objection analysis: 3 of 5 lost deals cited 'too expensive.' Your competitor is $40/mo cheaper on entry. Recommendation: add a freemium tier or increase ROI messaging.",
      artifact: 'Pricing Strategy',
      badge: '+3 to Product',
    },
  ],
  atlas: [
    {
      patterns: ['competitor', 'compete', 'market', 'battlecard'],
      response:
        "Competitor X launched a new feature yesterday. Here's how you're differentiated. Battlecard updated. 2 prospect mentions flagged for outreach.",
      artifact: 'Competitive Battlecard',
      badge: '+3 to Market',
    },
    {
      patterns: ['win', 'loss', 'why', 'lose'],
      response:
        'Win/loss analysis shows you win 72% when demo leads. You lose 68% when pricing is discussed first. Recommendation: resequence your sales flow — demo before pricing.',
      artifact: 'Win/Loss Analysis',
      badge: '+4 to GTM',
    },
  ],
  harper: [
    {
      patterns: ['hire', 'engineer', 'talent', 'recruit', 'apply'],
      response:
        'Reviewed 34 applications for your senior engineer role. 6 match your criteria. Screening emails sent. 3 replied — calendar links attached. First interviews set.',
      artifact: 'Hiring Rubric v1',
      badge: '+3 to Team',
    },
    {
      patterns: ['team', 'culture', 'offer', 'comp', 'salary'],
      response:
        'Your offer templates are below market by 12% for senior roles. Updated comp benchmarks attached. Equity ranges adjusted to match Series A norms in your sector.',
      artifact: 'Offer Templates',
      badge: '+4 to Team',
    },
  ],
}

const DEFAULT_RESPONSES: Record<string, { response: string; artifact: string; badge: string }> = {
  patel: {
    response:
      "Analyzing your go-to-market strategy. Running lead enrichment now — I'll identify your top 50 prospects and draft personalized sequences for each.",
    artifact: 'GTM Analysis',
    badge: '+3 to GTM',
  },
  felix: {
    response:
      "Running financial analysis. Your unit economics look healthy. I'll model 3 scenarios and prepare investor-grade slides with the key metrics.",
    artifact: 'Financial Overview',
    badge: '+3 to Financial',
  },
  susi: {
    response:
      "Scanning your pipeline for opportunities. I'll prioritize your highest-value deals and draft follow-up sequences for any that have gone cold.",
    artifact: 'Pipeline Report',
    badge: '+3 to GTM',
  },
  atlas: {
    response:
      "Monitoring competitor activity across 8 signals. I'll flag any significant moves and update your battlecards with the latest positioning.",
    artifact: 'Market Intel Report',
    badge: '+3 to Market',
  },
  harper: {
    response:
      "Reviewing your team structure and open roles. I'll benchmark compensation and identify the 3 highest-impact hires for your next stage.",
    artifact: 'Team Roadmap',
    badge: '+3 to Team',
  },
}

const SUGGESTED_QUESTIONS: Record<string, string[]> = {
  patel: ['Find leads in my ICP', 'Build GTM strategy', 'Write outreach emails'],
  felix: ['Show MRR & runway', 'Model burn scenarios', 'Prep investor slides'],
  susi: ['Analyze my pipeline', 'Handle pricing objection', 'Score my deals'],
  atlas: ['Monitor competitors', 'Update battlecards', 'Win/loss analysis'],
  harper: ['Screen applicants', 'Benchmark comp', 'Draft job descriptions'],
}

// Deterministic bar widths for artifact skeleton (no Math.random)
const ARTIFACT_BAR_WIDTHS = [72, 55, 85, 48, 78, 62, 90]

// ─── Sub-components ───────────────────────────────────────────────────────────

type Message = { role: 'agent' | 'user'; text: string }
type Artifact = { name: string; badge: string }

function AgentChat({ agent }: { agent: AgentData }) {
  const [messages, setMessages] = useState<Message[]>([{ role: 'agent', text: agent.quote }])
  const [input, setInput] = useState('')
  const [artifact, setArtifact] = useState<Artifact | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages([{ role: 'agent', text: agent.quote }])
    setInput('')
    setArtifact(null)
    setIsTyping(false)
  }, [agent.id])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

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
    setTimeout(() => {
      const res = getResponse(query)
      setIsTyping(false)
      setMessages((prev) => [...prev, { role: 'agent', text: res.response }])
      setArtifact({ name: res.artifact, badge: res.badge })
    }, 1100)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    send(input)
  }

  return (
    <div style={{ display: 'flex', gap: '1rem', height: '400px' }}>
      {/* Chat panel */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#080808',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '10px',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}
        >
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '82%',
                  padding: '9px 13px',
                  borderRadius:
                    msg.role === 'user' ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
                  background: msg.role === 'user' ? 'rgba(200,255,0,0.08)' : '#111',
                  border:
                    msg.role === 'user'
                      ? '1px solid rgba(200,255,0,0.18)'
                      : '1px solid rgba(255,255,255,0.05)',
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

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'flex', gap: '4px', padding: '6px 12px', alignItems: 'center' }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: '#333',
                    animation: `blink 1.2s step-end ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </motion.div>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggested questions */}
        <div
          style={{
            padding: '0.5rem 0.75rem',
            display: 'flex',
            gap: '0.4rem',
            flexWrap: 'wrap',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {SUGGESTED_QUESTIONS[agent.id]?.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              disabled={isTyping}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '3px 11px',
                fontSize: '11px',
                color: '#555',
                cursor: isTyping ? 'default' : 'pointer',
                fontFamily: 'var(--font-jetbrains)',
                transition: 'border-color 150ms, color 150ms',
                opacity: isTyping ? 0.4 : 1,
              }}
              onMouseEnter={(e) => {
                if (isTyping) return
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(200,255,0,0.3)'
                el.style.color = '#c8ff00'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.08)'
                el.style.color = '#555'
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
            display: 'flex',
            gap: '0.5rem',
            padding: '0.65rem 0.75rem',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${agent.name}…`}
            disabled={isTyping}
            style={{
              flex: 1,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '6px',
              padding: '7px 11px',
              fontSize: '13px',
              color: '#ededed',
              fontFamily: 'var(--font-jetbrains)',
              outline: 'none',
              opacity: isTyping ? 0.5 : 1,
            }}
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            style={{
              background: '#c8ff00',
              border: 'none',
              borderRadius: '6px',
              padding: '7px 14px',
              fontSize: '14px',
              fontWeight: 700,
              color: '#050505',
              cursor: isTyping ? 'default' : 'pointer',
              opacity: isTyping || !input.trim() ? 0.4 : 1,
              transition: 'opacity 150ms',
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{
              width: '200px',
              flexShrink: 0,
              background: '#080808',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px',
              padding: '1.1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              overflow: 'hidden',
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 9px',
                background: 'rgba(200,255,0,0.08)',
                border: '1px solid rgba(200,255,0,0.2)',
                borderRadius: '3px',
                fontSize: '10px',
                fontFamily: 'var(--font-jetbrains)',
                color: '#c8ff00',
                fontWeight: 700,
                letterSpacing: '0.05em',
                width: 'fit-content',
              }}
            >
              {artifact.badge}
            </div>

            {/* Name */}
            <div
              style={{
                fontSize: '12px',
                color: '#ededed',
                fontFamily: 'var(--font-jetbrains)',
                fontWeight: 600,
              }}
            >
              {artifact.name}
            </div>

            {/* Skeleton lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {ARTIFACT_BAR_WIDTHS.map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.28, delay: i * 0.055, ease: EASE }}
                  style={{
                    height: '7px',
                    background: '#1a1a1a',
                    borderRadius: '2px',
                    width: `${w}%`,
                    transformOrigin: 'left',
                  }}
                />
              ))}
            </div>

            <div
              style={{
                fontSize: '10px',
                color: '#333',
                fontFamily: 'var(--font-jetbrains)',
                marginTop: 'auto',
              }}
            >
              Generated just now
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AgentShowcase() {
  const [activeAgent, setActiveAgent] = useState<AgentData>(AGENTS[0])
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
        <div ref={headerRef} style={{ marginBottom: '3rem' }}>
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

        {/* Agent tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.4rem',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          {AGENTS.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setActiveAgent(agent)}
              style={{
                background:
                  activeAgent.id === agent.id ? 'rgba(200,255,0,0.08)' : 'transparent',
                border: `1px solid ${activeAgent.id === agent.id ? 'rgba(200,255,0,0.28)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '6px',
                padding: '7px 16px',
                color: activeAgent.id === agent.id ? '#c8ff00' : '#555',
                cursor: 'pointer',
                fontSize: '12px',
                fontFamily: 'var(--font-jetbrains)',
                fontWeight: 600,
                letterSpacing: '0.08em',
                transition: 'all 150ms',
              }}
            >
              {agent.name}
            </button>
          ))}
        </div>

        {/* Active agent meta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              color: '#555',
              fontFamily: 'var(--font-jetbrains)',
            }}
          >
            {activeAgent.role}
          </span>
          <span
            style={{
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: '#333',
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: '11px', color: '#333', fontFamily: 'var(--font-jetbrains)' }}>
            Delivers: {activeAgent.delivers.join(' · ')}
          </span>
        </div>

        {/* Chat (keyed by agent so it resets on switch) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAgent.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <AgentChat agent={activeAgent} />
          </motion.div>
        </AnimatePresence>

        {/* +4 more agents */}
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
