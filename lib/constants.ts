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
  fullName: string
  sector: string
  stage: string
  qScore: number
  matchPct: number
  isTopMatch: boolean
  raise: string
  topStrength: string
  artifacts: number
  primaryAgent: string
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
  {
    name: 'A. Sharma',
    fullName: 'Aanya Sharma',
    sector: 'FinTech',
    stage: 'Pre-seed',
    qScore: 81,
    matchPct: 94,
    isTopMatch: true,
    raise: '$2.5M',
    topStrength: 'Exceptional GTM + Financial rigor',
    artifacts: 47,
    primaryAgent: 'FELIX',
  },
  {
    name: 'J. Okafor',
    fullName: 'Jide Okafor',
    sector: 'HealthTech',
    stage: 'Seed',
    qScore: 74,
    matchPct: 87,
    isTopMatch: false,
    raise: '$4M',
    topStrength: 'Strong clinical traction signal',
    artifacts: 42,
    primaryAgent: 'PATEL',
  },
  {
    name: 'M. Chen',
    fullName: 'Ming Chen',
    sector: 'B2B SaaS',
    stage: 'Pre-seed',
    qScore: 68,
    matchPct: 76,
    isTopMatch: false,
    raise: '$1.8M',
    topStrength: 'Defensible product moat',
    artifacts: 39,
    primaryAgent: 'ATLAS',
  },
  {
    name: 'S. Patel',
    fullName: 'Sia Patel',
    sector: 'EdTech',
    stage: 'Pre-seed',
    qScore: 65,
    matchPct: 71,
    isTopMatch: false,
    raise: '$1.2M',
    topStrength: 'Proven unit economics',
    artifacts: 38,
    primaryAgent: 'SUSI',
  },
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

// ─── Methodology ──────────────────────────────────────────────────────────────

export interface MethodologyCard {
  id: string
  label: string
  score: number
  subFactors: string[]
  detail: string
}

export const METHODOLOGY_CARDS: MethodologyCard[] = [
  {
    id: 'team',
    label: 'Team',
    score: 59,
    subFactors: ['Technical depth', 'Prior exits', 'Founder-market fit', 'Equity split rationality', 'Domain expertise', 'Coachability', 'Network density', 'Time commitment', 'Advisor quality', 'Culture signal', 'Communication clarity', 'Execution history'],
    detail: 'We evaluate 12 sub-dimensions of founding team quality. A balanced team scores higher than a solo founder with gaps. Equity split rationality is a leading indicator of co-founder conflict risk.',
  },
  {
    id: 'market',
    label: 'Market',
    score: 78,
    subFactors: ['TAM calculation methodology', 'ICP clarity scoring', 'Competitive intensity index', 'Market timing signal', 'Regulatory tailwinds', 'Geographic expansion potential'],
    detail: 'TAM must be bottoms-up, not top-down. We weight ICP clarity heavily — specific beats broad every time. Competitive intensity affects moat score directly.',
  },
  {
    id: 'product',
    label: 'Product',
    score: 71,
    subFactors: ['PMF signal weighting', 'Differentiation index', 'Moat assessment', 'Technical defensibility', 'UX clarity score', 'Retention signals'],
    detail: 'PMF signals include NPS > 50, organic growth, and cohort retention. Differentiation scores are cross-referenced against the competitive matrix automatically.',
  },
  {
    id: 'traction',
    label: 'Traction',
    score: 76,
    subFactors: ['Growth rate percentiles', 'Revenue quality score', 'Cohort retention', 'Logo vs. revenue churn', 'Expansion MRR rate', 'Time-to-value metric'],
    detail: 'We benchmark growth rates against sector percentiles, not absolute numbers. 15% MoM in enterprise beats 30% MoM in consumer at early stages.',
  },
  {
    id: 'financial',
    label: 'Financial',
    score: 82,
    subFactors: ['Unit economics benchmarks', 'Runway sanity check', 'Burn efficiency score', 'CAC payback period', 'LTV:CAC ratio', 'Revenue quality index'],
    detail: 'Burn efficiency = revenue per dollar burned. We flag founders with < 12 months runway and evaluate whether the raise amount matches the milestone plan.',
  },
  {
    id: 'gtm',
    label: 'GTM',
    score: 64,
    subFactors: ['Channel viability scoring', 'CAC payback rigor', 'Sales process maturity', 'Outbound vs inbound balance', 'Conversion funnel clarity', 'Pricing confidence'],
    detail: 'GTM strategy must match the customer acquisition cost reality. We flag founders who rely on viral growth without a paid channel backup or proven organic loop.',
  },
]

// ─── Agent Intelligence ───────────────────────────────────────────────────────

export interface AgentMetric {
  id: string
  name: string
  role: string
  successRate: number
  avgTime: number
  impact: number
  impactArea: string
  decisionTree: { step: string; branch: string[] }[]
}

export const AGENT_METRICS: AgentMetric[] = [
  {
    id: 'patel',
    name: 'PATEL',
    role: 'GTM Strategist',
    successRate: 89,
    avgTime: 4.2,
    impact: 12,
    impactArea: 'GTM',
    decisionTree: [
      { step: 'Analyze ICP definition', branch: ['ICP clear → enrich leads', 'ICP vague → clarify first'] },
      { step: 'Score outreach channels', branch: ['Email viable → build sequence', 'Low open rates → try LinkedIn'] },
      { step: 'Generate artifacts', branch: ['ICP Doc', 'Outreach Sequence', 'GTM Playbook'] },
    ],
  },
  {
    id: 'susi',
    name: 'SUSI',
    role: 'Sales Agent',
    successRate: 92,
    avgTime: 3.1,
    impact: 8,
    impactArea: 'Sales',
    decisionTree: [
      { step: 'Audit pipeline health', branch: ['Deals stale → draft follow-ups', 'Deals active → optimize'] },
      { step: 'Identify objections', branch: ['Price too high → counter-offer', 'Value unclear → proof points'] },
      { step: 'Generate artifacts', branch: ['Sales Playbook', 'Pricing Strategy', 'Objection Handlers'] },
    ],
  },
  {
    id: 'felix',
    name: 'FELIX',
    role: 'Finance Agent',
    successRate: 95,
    avgTime: 5.7,
    impact: 15,
    impactArea: 'Financial',
    decisionTree: [
      { step: 'Connect data sources', branch: ['Stripe connected → live MRR', 'Manual input → validate data'] },
      { step: 'Benchmark unit economics', branch: ['CAC:LTV > 1:3 → strong', 'CAC:LTV < 1:3 → flag risk'] },
      { step: 'Generate artifacts', branch: ['Financial Model', 'Investor Finance Slides', 'Scenario Analysis'] },
    ],
  },
  {
    id: 'atlas',
    name: 'ATLAS',
    role: 'Competitive Intelligence',
    successRate: 88,
    avgTime: 6.1,
    impact: 11,
    impactArea: 'Competitive',
    decisionTree: [
      { step: 'Map competitive landscape', branch: ['Direct competitors → battlecard', 'Indirect → differentiation doc'] },
      { step: 'Monitor competitor signals', branch: ['New feature → update battlecard', 'Price change → alert'] },
      { step: 'Generate artifacts', branch: ['Battlecards', 'Competitive Matrix', 'Win/Loss Analysis'] },
    ],
  },
  {
    id: 'harper',
    name: 'HARPER',
    role: 'HR Agent',
    successRate: 91,
    avgTime: 3.8,
    impact: 9,
    impactArea: 'Team',
    decisionTree: [
      { step: 'Analyze team gaps', branch: ['Technical gap → engineer JD', 'GTM gap → sales JD'] },
      { step: 'Screen applications', branch: ['Criteria match → invite', 'Criteria miss → reject with feedback'] },
      { step: 'Generate artifacts', branch: ['Job Descriptions', 'Hiring Rubric', 'Offer Templates'] },
    ],
  },
]

// 5 agents × 7 days heatmap (Mon–Sun)
export const AGENT_HEATMAP: number[][] = [
  [0.3, 0.7, 0.9, 0.8, 0.6, 0.2, 0.1], // PATEL
  [0.5, 0.6, 0.7, 0.9, 0.8, 0.3, 0.1], // SUSI
  [0.2, 0.4, 0.6, 0.7, 0.9, 0.4, 0.2], // FELIX
  [0.4, 0.5, 0.8, 0.6, 0.7, 0.2, 0.1], // ATLAS
  [0.3, 0.5, 0.6, 0.8, 0.7, 0.3, 0.2], // HARPER
]

// ─── Verified Proof Artifacts ─────────────────────────────────────────────────

export type ArtifactIndustry = 'SaaS' | 'Fintech' | 'Climate' | 'Health'
export type ArtifactStage = 'Pre-seed' | 'Seed'
export type ArtifactType = 'ICP Doc' | 'Sales Script' | 'Financial Model' | 'Competitive Matrix' | 'GTM Playbook' | 'Sales Playbook'

export interface ArtifactCard {
  id: string
  type: ArtifactType
  industry: ArtifactIndustry
  stage: ArtifactStage
  scoreBefore: number
  scoreAfter: number
  timeMinutes: number
  founderQuote: string
  verifiedBy: string
}

export const ARTIFACT_CARDS: ArtifactCard[] = [
  { id: '1', type: 'ICP Doc', industry: 'SaaS', stage: 'Pre-seed', scoreBefore: 68, scoreAfter: 81, timeMinutes: 3.2, founderQuote: 'More accurate than my $5k consultant\'s work.', verifiedBy: 'Andreessen Horowitz' },
  { id: '2', type: 'Sales Script', industry: 'Fintech', stage: 'Pre-seed', scoreBefore: 55, scoreAfter: 72, timeMinutes: 2.8, founderQuote: 'Closed our first enterprise deal the next week.', verifiedBy: 'Sequoia Capital' },
  { id: '3', type: 'Financial Model', industry: 'SaaS', stage: 'Seed', scoreBefore: 42, scoreAfter: 69, timeMinutes: 5.1, founderQuote: 'Investors finally understood our unit economics.', verifiedBy: 'Y Combinator' },
  { id: '4', type: 'Competitive Matrix', industry: 'Health', stage: 'Pre-seed', scoreBefore: 71, scoreAfter: 85, timeMinutes: 4.4, founderQuote: 'This alone got us into our Series A pitch.', verifiedBy: 'Greylock Partners' },
  { id: '5', type: 'GTM Playbook', industry: 'SaaS', stage: 'Pre-seed', scoreBefore: 60, scoreAfter: 74, timeMinutes: 3.7, founderQuote: 'Our outbound conversion doubled in 30 days.', verifiedBy: 'Lightspeed Ventures' },
  { id: '6', type: 'Sales Playbook', industry: 'Fintech', stage: 'Seed', scoreBefore: 65, scoreAfter: 79, timeMinutes: 2.9, founderQuote: 'Finally had a repeatable sales process.', verifiedBy: 'Founders Fund' },
  { id: '7', type: 'ICP Doc', industry: 'Climate', stage: 'Pre-seed', scoreBefore: 52, scoreAfter: 68, timeMinutes: 3.0, founderQuote: 'We stopped pitching the wrong investors.', verifiedBy: 'Breakthrough Energy' },
  { id: '8', type: 'Financial Model', industry: 'Health', stage: 'Seed', scoreBefore: 49, scoreAfter: 71, timeMinutes: 5.8, founderQuote: 'Our runway math finally held up to scrutiny.', verifiedBy: 'a16z Bio' },
  { id: '9', type: 'Sales Script', industry: 'SaaS', stage: 'Pre-seed', scoreBefore: 63, scoreAfter: 77, timeMinutes: 2.5, founderQuote: 'Went from 10% to 28% close rate in 6 weeks.', verifiedBy: 'Bessemer Ventures' },
  { id: '10', type: 'Competitive Matrix', industry: 'Fintech', stage: 'Pre-seed', scoreBefore: 58, scoreAfter: 73, timeMinutes: 4.1, founderQuote: 'We knew our moat better than we ever had.', verifiedBy: 'General Catalyst' },
  { id: '11', type: 'GTM Playbook', industry: 'Health', stage: 'Seed', scoreBefore: 44, scoreAfter: 66, timeMinutes: 3.9, founderQuote: 'Expanded from 3 to 11 channels profitably.', verifiedBy: 'GV (Google Ventures)' },
  { id: '12', type: 'ICP Doc', industry: 'SaaS', stage: 'Seed', scoreBefore: 72, scoreAfter: 84, timeMinutes: 3.3, founderQuote: 'Best ROI I\'ve ever gotten on any tool.', verifiedBy: 'Accel Partners' },
  { id: '13', type: 'Financial Model', industry: 'Climate', stage: 'Pre-seed', scoreBefore: 51, scoreAfter: 70, timeMinutes: 5.2, founderQuote: 'The first model that didn\'t make me cringe.', verifiedBy: 'Lowercarbon Capital' },
  { id: '14', type: 'Sales Script', industry: 'Health', stage: 'Pre-seed', scoreBefore: 57, scoreAfter: 74, timeMinutes: 2.7, founderQuote: 'Booked 3 enterprise demos the same week.', verifiedBy: 'Andreessen Horowitz' },
  { id: '15', type: 'Competitive Matrix', industry: 'SaaS', stage: 'Seed', scoreBefore: 66, scoreAfter: 80, timeMinutes: 4.3, founderQuote: 'Finally understood where we actually win.', verifiedBy: 'Sequoia Capital' },
  { id: '16', type: 'GTM Playbook', industry: 'Fintech', stage: 'Pre-seed', scoreBefore: 48, scoreAfter: 65, timeMinutes: 3.6, founderQuote: 'Cut CAC by 40% in our first quarter.', verifiedBy: 'Ribbit Capital' },
  { id: '17', type: 'Sales Playbook', industry: 'Climate', stage: 'Seed', scoreBefore: 59, scoreAfter: 76, timeMinutes: 3.1, founderQuote: 'Ramped our first AE in 2 weeks, not 3 months.', verifiedBy: 'Breakthrough Energy' },
  { id: '18', type: 'ICP Doc', industry: 'Fintech', stage: 'Seed', scoreBefore: 70, scoreAfter: 83, timeMinutes: 3.4, founderQuote: 'This doc is now in every investor update.', verifiedBy: 'Founders Fund' },
  { id: '19', type: 'Financial Model', industry: 'SaaS', stage: 'Pre-seed', scoreBefore: 45, scoreAfter: 67, timeMinutes: 5.0, founderQuote: 'Passed the CFO\'s scrutiny on first read.', verifiedBy: 'Benchmark Capital' },
  { id: '20', type: 'Competitive Matrix', industry: 'Health', stage: 'Pre-seed', scoreBefore: 61, scoreAfter: 78, timeMinutes: 4.0, founderQuote: 'We stopped losing to inferior competitors.', verifiedBy: 'GV (Google Ventures)' },
]

// ─── Chart Data ───────────────────────────────────────────────────────────────

export const COHORT_DATA = [
  { week: 'W1', avg: 100, top: 100 },
  { week: 'W2', avg: 84, top: 94 },
  { week: 'W3', avg: 71, top: 89 },
  { week: 'W4', avg: 63, top: 85 },
  { week: 'W5', avg: 58, top: 82 },
  { week: 'W6', avg: 54, top: 80 },
  { week: 'W7', avg: 51, top: 78 },
  { week: 'W8', avg: 48, top: 76 },
  { week: 'W9', avg: 45, top: 75 },
  { week: 'W10', avg: 43, top: 74 },
  { week: 'W11', avg: 42, top: 73 },
  { week: 'W12', avg: 41, top: 73 },
]

export const SCORE_DISTRIBUTION = [
  { range: '40–50', count: 180 },
  { range: '50–60', count: 420 },
  { range: '60–70', count: 680 },
  { range: '70–80', count: 740 },
  { range: '80–90', count: 290 },
  { range: '90+', count: 90 },
]

// ─── VC Firms ─────────────────────────────────────────────────────────────────

export interface VCFirm {
  id: string
  name: string
  shortName: string
  thesis: string
  weights: { team: number; market: number; product: number; traction: number; financial: number; gtm: number }
  famousFor: string
  minScore: number
}

export const VC_FIRMS: VCFirm[] = [
  {
    id: 'a16z',
    name: 'Andreessen Horowitz',
    shortName: 'a16z',
    thesis: 'Software eats the world. Back technical founders building category-defining companies with network effects.',
    weights: { team: 35, market: 30, product: 20, traction: 10, financial: 3, gtm: 2 },
    famousFor: 'Technical founders, consumer internet, crypto',
    minScore: 72,
  },
  {
    id: 'sequoia',
    name: 'Sequoia Capital',
    shortName: 'Sequoia',
    thesis: 'Legendary companies are built by missionaries, not mercenaries. Market size and founder conviction matter most.',
    weights: { team: 30, market: 35, product: 20, traction: 10, financial: 3, gtm: 2 },
    famousFor: 'Enterprise, consumer, steep trajectory companies',
    minScore: 75,
  },
  {
    id: 'yc',
    name: 'Y Combinator',
    shortName: 'YC',
    thesis: 'Back relentless founders with a clear beachhead. Make something people want. Growth is the metric.',
    weights: { team: 40, market: 20, product: 25, traction: 10, financial: 2, gtm: 3 },
    famousFor: 'Early-stage, founder quality, consumer + B2B',
    minScore: 65,
  },
  {
    id: 'greylock',
    name: 'Greylock Partners',
    shortName: 'Greylock',
    thesis: 'Infrastructure and platform plays with network effects. Technical moats that compound over time.',
    weights: { team: 30, market: 25, product: 30, traction: 8, financial: 4, gtm: 3 },
    famousFor: 'Enterprise infrastructure, AI/ML, developer tools',
    minScore: 70,
  },
  {
    id: 'founders-fund',
    name: 'Founders Fund',
    shortName: 'Founders Fund',
    thesis: 'We wanted flying cars, instead we got 140 characters. Back founders building hard tech that changes the world.',
    weights: { team: 35, market: 30, product: 25, traction: 5, financial: 3, gtm: 2 },
    famousFor: 'Deep tech, aerospace, biotech, contrarian bets',
    minScore: 68,
  },
  {
    id: 'benchmark',
    name: 'Benchmark Capital',
    shortName: 'Benchmark',
    thesis: 'Small fund, high conviction. Back category-defining companies in markets you can dominate.',
    weights: { team: 30, market: 30, product: 20, traction: 12, financial: 5, gtm: 3 },
    famousFor: 'Consumer, marketplace, SaaS',
    minScore: 70,
  },
  {
    id: 'lightspeed',
    name: 'Lightspeed Ventures',
    shortName: 'Lightspeed',
    thesis: 'Multi-stage, global. Back exceptional people building transformational businesses across enterprise, consumer, health.',
    weights: { team: 28, market: 28, product: 20, traction: 14, financial: 5, gtm: 5 },
    famousFor: 'Enterprise SaaS, consumer, global markets',
    minScore: 68,
  },
  {
    id: 'first-round',
    name: 'First Round Capital',
    shortName: 'First Round',
    thesis: 'The first institutional check. Back founders before consensus forms. Platform approach to founder support.',
    weights: { team: 40, market: 20, product: 20, traction: 10, financial: 5, gtm: 5 },
    famousFor: 'Pre-seed, seed, founder community',
    minScore: 62,
  },
]

// ─── Timeline ─────────────────────────────────────────────────────────────────

export interface TimelineMilestone {
  year: string
  title: string
  description: string
  arrTarget: string
  founders: string
  milestone: string
}

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '2024',
    title: 'Q-Score for Pre-Seed',
    description: 'Launch the Q-Score evaluation platform for pre-seed founders. First 2,400 evaluations completed.',
    arrTarget: '$0 → $500K',
    founders: '5K founders',
    milestone: 'Platform launch & PMF validation',
  },
  {
    year: '2025',
    title: 'API for Accelerators',
    description: 'Open the Q-Score API to top 50 accelerators globally. Integrations with YC, Techstars, On Deck.',
    arrTarget: '$500K → $2M',
    founders: '25K founders',
    milestone: 'API launch & accelerator partnerships',
  },
  {
    year: '2026',
    title: 'White-Label for Corporate VCs',
    description: 'Enterprise-grade Q-Score for corporate venture arms and family offices. Custom scoring models.',
    arrTarget: '$2M → $8M',
    founders: '100K founders',
    milestone: 'Enterprise tier & white-label product',
  },
  {
    year: '2027',
    title: 'Secondary Market Integration',
    description: 'Q-Score used in secondary market due diligence. Partnerships with Forge, Carta, and AngelList.',
    arrTarget: '$8M → $20M',
    founders: '500K founders',
    milestone: 'Secondary market standard established',
  },
  {
    year: '2028',
    title: 'Public Q-Score for All Startups',
    description: 'Every funded startup gets a public Q-Score. Becomes the standard due diligence shorthand for investors.',
    arrTarget: '$20M → $60M',
    founders: '2M founders',
    milestone: 'Public Q-Score registry launched',
  },
  {
    year: '2029',
    title: 'The Credit Score of Startups',
    description: 'Q-Score is as common as a company\'s market cap. Every investor, accelerator, and LP uses it by default.',
    arrTarget: '$60M+ ARR',
    founders: 'Global standard',
    milestone: 'Category creation complete',
  },
]

// ─── Risk Matrix ──────────────────────────────────────────────────────────────

export interface RiskItem {
  risk: string
  mitigation: string
  contingency: string
}

export const RISK_MATRIX: RiskItem[] = [
  {
    risk: 'VCs don\'t adopt Q-Score as a standard',
    mitigation: '3 anchor investors already using it in active deal flow. Building API integrations for their existing due diligence tools.',
    contingency: 'Pivot to sell directly to founders as fundraising prep. B2C model still works at $50/month.',
  },
  {
    risk: 'Founders game the scoring system',
    mitigation: 'Bluff detection at 94% accuracy. Verified artifact output makes gaming transparent. Investor trust layer built-in.',
    contingency: 'Add live interview component with video analysis. Harder to game in real-time.',
  },
  {
    risk: 'Scoring becomes a commodity',
    mitigation: 'Data moat: 2,400+ founder evaluations train the model. Network effects compound scoring accuracy over time.',
    contingency: 'Move up-market to enterprise. White-label for Fortune 500 corporate VC arms at $100K+ contracts.',
  },
  {
    risk: 'Big Tech (Google, Microsoft) builds this',
    mitigation: '2-year head start on founder-specific data. VC distribution channel they can\'t replicate easily.',
    contingency: 'Become the data provider. License Q-Score to the big platform rather than competing directly.',
  },
  {
    risk: 'Regulatory concerns around founder scoring',
    mitigation: 'Opt-in only. Human-in-the-loop for all final scores. No protected class data used in the scoring model.',
    contingency: 'Reframe as "pitch readiness" assessment — same functionality, different positioning.',
  },
  {
    risk: 'Team execution risk at scale',
    mitigation: 'Strong advisor network with prior scaled SaaS experience. Founding team has direct domain expertise.',
    contingency: 'Raise additional capital to hire senior GTM and engineering leadership at Series A.',
  },
]

// ─── Team ─────────────────────────────────────────────────────────────────────

export interface TeamMember {
  initials: string
  name: string
  title: string
  qScore: number
  strengths: string[]
  primaryAgent: string
  primaryAgentUsage: number
  secondaryAgent: string
  secondaryAgentUsage: number
  trajectory: string
  quote: string
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    initials: 'EA',
    name: 'Edge Alpha Founder',
    title: 'CEO & Co-Founder',
    qScore: 89,
    strengths: ['Technical depth', 'Prior exits', 'Founder-market fit'],
    primaryAgent: 'FELIX',
    primaryAgentUsage: 95,
    secondaryAgent: 'HARPER',
    secondaryAgentUsage: 88,
    trajectory: '72 → 89',
    quote: 'We built Edge Alpha because we needed it ourselves. Q-Score went from 72 to 89 in 4 months.',
  },
  {
    initials: 'CP',
    name: 'Edge Alpha Co-Founder',
    title: 'COO & Co-Founder',
    qScore: 84,
    strengths: ['GTM expertise', 'Product sense', 'Operator experience'],
    primaryAgent: 'PATEL',
    primaryAgentUsage: 92,
    secondaryAgent: 'SUSI',
    secondaryAgentUsage: 90,
    trajectory: '68 → 84',
    quote: 'Patel rebuilt our entire GTM strategy in 4 minutes. We raised our pre-seed on that plan.',
  },
]
