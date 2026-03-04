// ─── Types ───────────────────────────────────────────────────────────────────

export interface AgentData {
  id: string
  name: string
  role: string
  quote: string
  delivers: string[]
  executes: string[]
}

export interface DimensionData {
  label: string
  value: number
}

export interface MockFounder {
  name: string
  sector: string
  qScore: number
  matchPct: number
  isTopMatch: boolean
}

export interface ProblemCard {
  stat: string
  headline: string
  subtext: string
}

export interface StepData {
  number: string
  title: string
  description: string
  metric: string
}

export interface TractionStat {
  value: number
  suffix: string
  label: string
}

// ─── Animation Constants ─────────────────────────────────────────────────────

export const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

// ─── Q-Score ─────────────────────────────────────────────────────────────────

export const Q_SCORE_TARGET = 73
export const Q_SCORE_LABEL = 'INVESTOR READY'

// ─── Agents ──────────────────────────────────────────────────────────────────

export const AGENTS: AgentData[] = [
  {
    id: 'patel',
    name: 'PATEL',
    role: 'GTM Strategist',
    quote:
      'Found 47 leads matching your ICP. Personalized emails written. 12 sent. 3 opened. 1 replied. Response drafted. Call booked for Thursday.',
    delivers: ['ICP Document', 'Outreach Sequence', 'GTM Playbook'],
    executes: ['Lead enrichment', 'Email sends', 'Landing page deploy'],
  },
  {
    id: 'felix',
    name: 'FELIX',
    role: 'Finance Agent',
    quote:
      'Connected to Stripe. Live MRR: $24,800. Burn rate: $18,200/mo. Runway: 14 months. Unit economics look strong — CAC:LTV ratio is 1:4.2.',
    delivers: ['Financial Model', 'Investor Deck (Finance Slides)', 'Scenario Analysis'],
    executes: ['Stripe connect', 'Live MRR tracking', 'Automated P&L'],
  },
  {
    id: 'susi',
    name: 'SUSI',
    role: 'Sales Agent',
    quote:
      'Your pipeline has 23 open deals. 7 are stale over 14 days. Draft follow-ups written. 3 deals are at pricing objection — counter-offer templates ready.',
    delivers: ['Sales Playbook', 'Pricing Strategy', 'Objection Handlers'],
    executes: ['CRM sync', 'Follow-up sequences', 'Deal scoring'],
  },
  {
    id: 'atlas',
    name: 'ATLAS',
    role: 'Competitive Intelligence',
    quote:
      "Competitor X launched a new feature yesterday. Here's how you're differentiated. Battlecard updated. 2 prospect mentions flagged for outreach.",
    delivers: ['Battlecards', 'Competitive Matrix', 'Win/Loss Analysis'],
    executes: ['Competitor monitoring', 'Web scraping', 'Alert triggers'],
  },
  {
    id: 'harper',
    name: 'HARPER',
    role: 'HR Agent',
    quote:
      'Reviewed 34 applications for your senior engineer role. 6 match your criteria. Screening emails sent. 3 replied — calendar links attached. First interviews set.',
    delivers: ['Job Descriptions', 'Hiring Rubric', 'Offer Templates'],
    executes: ['Resume screening', 'Email outreach', 'Calendar booking'],
  },
]

// ─── Q-Score Dimensions ───────────────────────────────────────────────────────

export const DIMENSIONS: DimensionData[] = [
  { label: 'Market', value: 78 },
  { label: 'Product', value: 71 },
  { label: 'GTM', value: 64 },
  { label: 'Financial', value: 82 },
  { label: 'Team', value: 59 },
  { label: 'Traction', value: 76 },
]

// ─── Problem Cards ────────────────────────────────────────────────────────────

export const PROBLEM_CARDS: ProblemCard[] = [
  {
    stat: '87%',
    headline: 'of founders get rejected without feedback',
    subtext: 'No signal. No direction. No second chance.',
  },
  {
    stat: '1,000+',
    headline: 'decks per year reviewed by the average VC',
    subtext: 'Less than 3% get a first meeting.',
  },
  {
    stat: '≠',
    headline: 'Best founders aren\'t always best pitchers',
    subtext: 'The current system rewards performance, not substance.',
  },
]

// ─── How It Works Steps ───────────────────────────────────────────────────────

export const STEPS: StepData[] = [
  {
    number: '01',
    title: 'INTERVIEW',
    description:
      'Talk to our AI evaluator across 7 dimensions. Bluff detection included. 25 questions, 7 minutes average.',
    metric: '7 min avg',
  },
  {
    number: '02',
    title: 'IMPROVE',
    description:
      '9 specialist agents analyze every dimension of your business and produce 45 actionable deliverables.',
    metric: '45 deliverables',
  },
  {
    number: '03',
    title: 'CONNECT',
    description:
      'Score 65+ unlocks the investor marketplace. Your Q-Score becomes your verified credential.',
    metric: '65+ unlocks access',
  },
]

// ─── Mock Founders (Investor Section) ────────────────────────────────────────

export const MOCK_FOUNDERS: MockFounder[] = [
  { name: 'A. Sharma', sector: 'FinTech', qScore: 81, matchPct: 94, isTopMatch: true },
  { name: 'J. Okafor', sector: 'HealthTech', qScore: 74, matchPct: 87, isTopMatch: false },
  { name: 'M. Chen', sector: 'B2B SaaS', qScore: 68, matchPct: 76, isTopMatch: false },
  { name: 'S. Patel', sector: 'EdTech', qScore: 65, matchPct: 71, isTopMatch: false },
]

// ─── Traction Stats ───────────────────────────────────────────────────────────

export const TRACTION_STATS: TractionStat[] = [
  { value: 2400, suffix: '+', label: 'Founders evaluated' },
  { value: 9, suffix: '', label: 'AI agents deployed' },
  { value: 45, suffix: '', label: 'Deliverables per founder' },
  { value: 7, suffix: 'min', label: 'Average eval time' },
]

// ─── Navigation Links ─────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Product', href: '#how-it-works' },
  { label: 'Agents', href: '#agents' },
  { label: 'Q-Score', href: '#qscore' },
  { label: 'Investors', href: '#investors' },
]
