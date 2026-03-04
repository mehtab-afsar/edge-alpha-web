

# Edge Alpha — Website Design Blueprint

---

## Philosophy

The website should feel like opening a Bloomberg terminal for the first time — dense with intelligence, zero fluff, everything earns its pixel. Not a typical SaaS landing page with gradient blobs and stock photos. This is a financial instrument for startup evaluation. It should feel like money.

---

## Technical Stack

- Next.js 14 App Router (you already have this)
- Framer Motion for all animations
- No external UI libraries — hand-built everything
- No Tailwind prose/typography plugin — custom type scale
- Lenis or Locomotive Scroll for smooth scrolling
- GSAP ScrollTrigger for pinned sections (optional, Framer Motion intersection observer works too)
- Custom cursor on desktop (subtle, not gimmicky)
- Vercel Analytics for visitor tracking during the investor meet

---

## Color System

```
Background:          #050505 (near black, not pure #000)
Surface:             #0a0a0a (cards, elevated sections)
Surface hover:       #111111
Border:              rgba(255,255,255,0.06)
Border hover:        rgba(255,255,255,0.12)

Text primary:        #ededed (not pure white — easier on eyes)
Text secondary:      #888888
Text tertiary:       #555555
Text ghost:          #333333

Accent primary:      #c8ff00 (electric lime — this is the "edge")
Accent muted:        rgba(200,255,0,0.15) (for glows, backgrounds)
Accent text:         #a8d900 (readable on dark bg)

Error:               #ff3333
Success:             #00cc88

No blues, no purples, no gradients between colors.
The lime accent is used SPARINGLY — maybe 5% of the page surface area.
Everything else is grayscale. The restraint IS the brand.
```

### Why Lime
- It's unexpected for fintech — stands out from the sea of blue/purple SaaS sites
- It connotes signal, edge, alpha — think terminal green, trading screens, night vision
- It photographs well on dark backgrounds for investor deck screenshots
- It's aggressive without being juvenile

---

## Typography

```
Primary:             "Inter" or "Geist" — geometric, clean, Swiss
Mono:                "Geist Mono" or "JetBrains Mono" — for scores, metrics, data
Display (optional):  "Inter Tight" or just Inter at heavy weight — for hero headline only

Size Scale:
  Hero headline:     clamp(48px, 8vw, 96px) — massive, commanding
  Section headline:  clamp(32px, 5vw, 56px)
  Sub-headline:      clamp(20px, 3vw, 28px)
  Body:              16px (desktop), 15px (mobile)
  Small:             13px
  Micro:             11px — labels, badges, metadata
  Score display:     clamp(64px, 10vw, 120px) — mono, for the Q-Score number

Weight Scale:
  300 — secondary text, descriptions
  400 — body text
  500 — labels, navigation
  600 — sub-headlines, emphasis
  700 — section headlines
  800 — hero headline only

Letter Spacing:
  Headlines:         -0.03em (tight, premium feel)
  Body:              0 (default)
  Uppercase labels:  0.1em
  Mono/scores:       -0.02em

Line Height:
  Headlines:         1.05 — very tight, creates density
  Sub-headlines:     1.2
  Body:              1.6
  Mono:              1.4
```

---

## Page Structure — Single Scroll Experience

Three logical pages but built as one continuous scroll with distinct sections. Navigation anchors to sections. Investor clicks one link, scrolls through everything.

---

## Navigation

### Design
- Fixed top, 64px height
- Background: transparent initially, transitions to `rgba(5,5,5,0.8)` with `backdrop-filter: blur(12px)` after 100px scroll
- Left: "EDGE ALPHA" wordmark in 14px, 600 weight, letter-spacing 0.08em, all caps
- Right: Section links in 13px, 400 weight — "Product" "Agents" "Score" "For Investors" — `#888` default, `#ededed` on hover
- Far right: "Request Access" button — outlined, 1px border `rgba(255,255,255,0.2)`, 12px text, 500 weight, padding 8px 20px, border-radius 6px
- On hover: button fills to `#c8ff00` background with `#050505` text — the ONLY moment the accent takes over a surface
- Transition: `all 200ms ease`

### Animation
- Nav fades in on load: `opacity 0→1, translateY(-10px)→0` over 600ms, 200ms delay after page load
- Blur background transition: `opacity 0→1` over 300ms triggered by scroll position

---

## Section 1 — Hero

### Layout
- Full viewport height — `100vh`, centered content
- No background image, no illustration — pure typography
- Content centered vertically and horizontally
- Max-width 900px for text block

### Content
```
[micro label]    THE FOUNDER EVALUATION PLATFORM

[hero headline]  Your startup has a
                 score. You just don't
                 know it yet.

[sub-headline]   Edge Alpha quantifies founder quality into a single number —
                 the Q-Score — then deploys 9 AI agents to improve it.
                 Investors see signal. Founders see a path.

[CTA row]        [◆ See Your Score]     [Watch Demo →]
```

### Typography Styling
- Micro label: 11px, mono, uppercase, `#c8ff00`, letter-spacing 0.15em, 500 weight
- Hero headline: `clamp(48px, 8vw, 88px)`, 800 weight, `#ededed`, line-height 1.05, letter-spacing -0.03em
- "score" in the headline: rendered in `#c8ff00` — the only colored word
- Sub-headline: 18px, 300 weight, `#888`, line-height 1.6, max-width 580px, centered
- Primary CTA: `#c8ff00` background, `#050505` text, 14px, 600 weight, padding 14px 32px, border-radius 8px, small diamond icon ◆ before text
- Secondary CTA: ghost button, no border, just text + arrow, `#888`, 14px, hover `#ededed`

### Animation
- Micro label: fades in first, `opacity 0→1, translateY(20px)→0`, 400ms, delay 300ms
- Hero headline: word-by-word reveal, each word fades in with `translateY(30px)→0`, 60ms stagger between words, 500ms duration per word, delay 500ms — this creates a typewriter-like cascade effect
- Sub-headline: fades in, `opacity 0→1, translateY(20px)→0`, 600ms, delay 1200ms
- CTA row: fades in, `opacity 0→1, translateY(20px)→0`, 500ms, delay 1600ms
- Entire sequence takes ~2 seconds — fast enough to not annoy, slow enough to feel cinematic

### Background Element
- Very subtle: a radial gradient glow behind the headline area — `radial-gradient(ellipse at 50% 40%, rgba(200,255,0,0.03) 0%, transparent 70%)` — barely visible, creates depth
- Optional: a single thin horizontal line at bottom of hero, full width, `rgba(255,255,255,0.04)`, separating hero from next section

---

## Section 2 — The Problem (Scroll-Triggered)

### Layout
- Two columns on desktop, stacked on mobile
- Left column: large statement text
- Right column: three problem cards stacked vertically
- Padding: 120px vertical

### Content

Left column:
```
[section label]   THE PROBLEM

[statement]       Founders raise blind.
                  Investors drown in noise.
                  Nobody has signal.
```

Right column — three cards:
```
Card 1:
  "87% of founders get rejected without any feedback"
  — They never know what to fix

Card 2:
  "VCs see 1,000+ decks per year"
  — Less than 3% get a meeting

Card 3:
  "The best founders aren't always the best pitchers"
  — Signal gets lost in presentation
```

### Card Design
- Background: `#0a0a0a`
- Border: `1px solid rgba(255,255,255,0.04)`
- Padding: 28px
- Border-radius: 10px
- Stat number: 24px, 700 weight, `#ededed`
- Description: 14px, 400 weight, `#888`
- Dash + italic line: 13px, 300 weight, italic, `#555`
- 16px gap between cards

### Animation
- Section label fades in on scroll intersection (50% viewport trigger)
- Statement text: line-by-line reveal, each line `opacity 0→1, translateX(-20px)→0`, 100ms stagger
- Cards: stagger in from right, each card `opacity 0→1, translateX(30px)→0`, 150ms stagger, 500ms duration
- Cards get a subtle `border-color: rgba(255,255,255,0.08)` transition on viewport entry — like they're "activating"

---

## Section 3 — Q-Score (The Centerpiece)

### Layout
- Full width, centered
- This section should feel like a product reveal — cinematic pacing
- Padding: 160px vertical (more space than other sections — it's important)

### Content Structure

Top area — the score reveal:
```
[section label]   THE Q-SCORE

[headline]        One number.
                  Every dimension.

[score display]   
                      73
                  ──────────────
                  INVESTOR READY
```

Below — dimension breakdown:
```
Six horizontal bars, each showing a dimension:

  Market        ████████████████████░░░░░  78
  Product       ██████████████████░░░░░░░  71
  GTM           ████████████████░░░░░░░░░  64
  Financial     ██████████████████████░░░  82
  Team          ███████████████░░░░░░░░░░  59
  Traction      █████████████████████░░░░  76
```

### Score Display Design
- The number "73": `clamp(80px, 12vw, 140px)`, mono font, 700 weight, `#ededed`
- Thin horizontal line below: 120px wide, 1px, `rgba(255,255,255,0.2)`, centered
- "INVESTOR READY" label: 11px, mono, uppercase, letter-spacing 0.15em, `#c8ff00`
- Subtle ring/arc behind the number — a thin circular gauge (SVG, 2px stroke) showing 73% filled, stroke color `#c8ff00` for filled portion, `#1a1a1a` for unfilled

### Dimension Bars Design
- Each bar: 100% width of container (max 600px), 4px height, border-radius 2px
- Track color: `#1a1a1a`
- Fill color: `#ededed` (NOT the accent — the accent is reserved for the main score)
- Score number: right-aligned, mono, 14px, `#888`
- Dimension label: left-aligned, 13px, 500 weight, `#ededed`, uppercase, letter-spacing 0.05em
- 20px gap between each bar row

### Animation (The Money Shot)
- Score number counts up from 0 to 73: counter animation over 1.5 seconds, `ease-out` curve — starts fast, decelerates. Use `useMotionValue` + `useTransform` from Framer Motion
- The circular gauge arc draws itself simultaneously: SVG `stroke-dashoffset` animation from full to 73%, 1.5 seconds, `ease-out`
- "INVESTOR READY" label fades in AFTER the counter finishes — 300ms delay, `opacity 0→1`
- Dimension bars animate one by one: each bar's fill width grows from 0% to its value, 800ms each, 100ms stagger between bars, `ease-out`
- Entire sequence is triggered when section scrolls to 40% viewport — NOT on page load

### Below the Score
- A single line of text: "Scored across a 25-question AI interview. Bluff detection included." — 13px, `#555`, centered
- Optional: a subtle "See how it works ↓" link that smooth-scrolls to the next section

---

## Section 4 — How It Works (Three Steps)

### Layout
- Three columns on desktop, stacked on mobile
- Each step is a tall card
- Padding: 120px vertical

### Content
```
Step 01                    Step 02                    Step 03
──────                     ──────                     ──────
INTERVIEW                  IMPROVE                    CONNECT

Talk to Q — our AI         9 specialized agents       Score 65+ unlocks the
evaluator. 25 questions    close your gaps. Not       investor marketplace.
across market, product,    advice — real              Ranked by thesis match.
GTM, financials, team,     deliverables.              Real connections.
and traction.              ICP docs. Financial        Investors see signal,
                           models. Sales scripts.     not noise.
                           Outreach sequences
                           that actually send.

[7 topics scanned]         [45 deliverables]          [Match score algorithm]
```

### Card Design
- Background: transparent (no card surface — just content on the page background)
- Step number: 11px, mono, `#555`, letter-spacing 0.1em
- Thin line below step number: 40px wide, 1px, `#333`
- Step title: 24px, 700 weight, `#ededed`, uppercase, letter-spacing 0.05em
- Description: 14px, 300 weight, `#888`, line-height 1.7, max-width 280px
- Bottom metric: 12px, mono, `#c8ff00`, with a subtle box outline — `1px solid rgba(200,255,0,0.2)`, padding 4px 10px, border-radius 4px

### Animation
- Each step card enters on scroll: `opacity 0→1, translateY(40px)→0`, 600ms, 200ms stagger between columns
- The step number and line enter first (100ms before the rest of the card)
- Bottom metric badge pulses once on entry — a single `scale(1.05)→scale(1)` over 300ms

---

## Section 5 — Agent Showcase (Horizontal Scroll or Pinned Section)

### Concept
This is where you show the 9 agents are not chatbots — they execute. This section should feel like flipping through a command center.

### Layout Option A — Pinned Horizontal Scroll
- Section is pinned (sticky) while content scrolls horizontally
- As user scrolls down, agent cards move left
- Each card takes roughly 60% viewport width
- Total scroll distance: ~5x viewport widths
- This is the most impressive option for investors but hardest to build

### Layout Option B — Stacked Cards with Scroll Reveal (Easier, Still Premium)
- Each agent gets a wide card (80% viewport width, centered)
- Cards stack vertically with 80px gaps
- Each card reveals on scroll with a different animation direction (alternating left/right)
- This is easier to build and still impressive

### Agent Card Design (For Either Option)
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  PATEL                                          GTM STRATEGIST   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │  "Found 47 leads matching your ICP.                         │ │
│  │   Personalized emails written.                              │ │
│  │   12 sent. 3 opened. 1 replied.                            │ │
│  │   Response drafted. Call booked for Thursday."              │ │
│  │                                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Delivers:  ICP Document · Outreach Sequence · GTM Playbook     │
│  Executes:  Lead enrichment · Email sends · Landing page deploy  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

- Agent name: 20px, 700 weight, `#ededed`, uppercase, letter-spacing 0.05em
- Role: 13px, 400 weight, `#555`, right-aligned (or same line, right side)
- Quote block: `#0a0a0a` background, `1px solid rgba(255,255,255,0.04)`, padding 24px, border-radius 8px, left border 2px solid `#c8ff00` (the only accent in the card)
- Quote text: 15px, 400 weight, `#ededed`, line-height 1.7, italic or regular — your call
- "Delivers" label: 11px, mono, uppercase, `#555`, letter-spacing 0.1em
- Deliverable list: 13px, 400 weight, `#888`, separated by `·` characters
- "Executes" label: same as Delivers
- Execute list: 13px, 400 weight, `#c8ff00` — this is the differentiation. These are ACTIONS, not documents

### Show Only 4-5 Agents (Not All 9)
- Patel (GTM) — the outreach story
- Felix (Finance) — the Stripe connect + live MRR story
- Susi (Sales) — the deal pipeline story
- Atlas (Competitive) — the monitoring story
- Harper (HR) — the auto-screening story
- End with a text: "Plus 4 more: Maya (Brand), Leo (Legal), Nova (PMF), Sage (Strategy)" — 13px, `#555`

### Animation
- Option A (horizontal scroll): cards slide in from right as scroll progresses, parallax at 0.8x speed for the quote block
- Option B (stacked): alternating `translateX(-40px)→0` and `translateX(40px)→0` per card, 600ms, triggered at 30% viewport intersection
- Quote text inside each card types out character by character as the card enters viewport — 30ms per character, mono cursor blink at end. This makes it feel like the agent is talking in real-time

---

## Section 6 — For Investors (The Pitch)

### Layout
- Split into two halves: left side is content, right side is a mock UI screenshot/component
- Padding: 120px vertical

### Left Content
```
[section label]   FOR INVESTORS

[headline]        Deal flow,
                  filtered by AI.

[body]            Every founder is scored before you see them.
                  Our AI reads your thesis at signup and ranks
                  every founder against it.

                  No cold decks. No noise. Just signal.

[three stats in a row]
  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │  65+     │  │  7min    │  │  45      │
  │ Q-Score  │  │ avg eval │  │ artifacts│
  │ threshold│  │ time     │  │ per      │
  │          │  │          │  │ founder  │
  └──────────┘  └──────────┘  └──────────┘
```

### Right Side — Mock Deal Flow UI
- Build an actual component (not a screenshot) showing a mini deal flow list
- 3-4 founder cards with: name (fake), Q-Score badge, sector tag, match score percentage
- Styled exactly like your real product but miniaturized
- One card has a subtle lime glow/highlight indicating "top match"
- This is a LIVE component rendered in the browser, not an image — it feels real

### Stat Box Design
- Background: `#0a0a0a`
- Border: `1px solid rgba(255,255,255,0.06)`
- Padding: 20px
- Number: 28px, mono, 700 weight, `#ededed`
- Label: 12px, 400 weight, `#555`, line-height 1.4
- Border-radius: 8px

### Animation
- Content enters from left: `translateX(-30px)→0, opacity 0→1`, 600ms
- Mock UI enters from right: `translateX(30px)→0, opacity 0→1`, 600ms, 200ms delay
- Stat numbers count up on scroll intersection (like Q-Score counter)
- Mock deal flow cards stagger in: `translateY(10px)→0`, 100ms stagger

---

## Section 7 — Social Proof / Traction (If You Have Any)

### If You Have Users/Data
```
[centered stats row]

  200+              9                12              73
  Founders          AI Agents        Artifact        Avg Q-Score
  Scored            Active           Types

[optional: logo strip of accelerators, universities, or partner logos]
[optional: 2-3 short testimonial quotes]
```

### If You Don't Have Users Yet
- Skip this section entirely. Don't fake it. Investors respect honesty
- OR: show product stats instead:
```
  45                9               12              25
  Deliverable       AI Agents       Integrations    Interview
  Types                                             Questions
```

### Design
- Stats in a single row, evenly spaced, centered
- Number: 40px, mono, 700 weight, `#ededed`
- Label: 12px, 400 weight, `#555`
- Thin line above and below the stats row: full width, 1px, `rgba(255,255,255,0.04)`
- Padding: 80px vertical (compact section)

### Animation
- Each number counts up on scroll intersection, staggered left-to-right, 100ms stagger

---

## Section 8 — CTA / Closing (Final Screen)

### Layout
- Full viewport height: `100vh`, centered
- Minimal — just the ask

### Content
```
[headline]        The edge is
                  knowing your number.

[sub-headline]    Score your startup in 7 minutes.
                  Deploy agents that actually execute.
                  Connect with investors who match.

[CTA]             [◆ Get Your Q-Score]

[below CTA]       Free to score. Agents unlock at Q-Score 40+.
                  Investor marketplace at 65+.
```

### Design
- Headline: same scale as hero headline, 800 weight, `#ededed`, "number" in `#c8ff00`
- Sub-headline: 16px, 300 weight, `#888`, line-height 1.8
- CTA: same as hero primary CTA — `#c8ff00` bg, `#050505` text, larger here: padding 16px 40px, 15px text
- Below CTA text: 12px, `#555`, 300 weight
- Background: subtle radial glow behind the headline — same as hero but `rgba(200,255,0,0.04)` — bookend effect

### Animation
- Mirror the hero animation but simpler: headline fades in `opacity 0→1, translateY(20px)→0`, 600ms
- CTA pulses VERY subtly — a `box-shadow: 0 0 0 0 rgba(200,255,0,0.3)` that expands to `0 0 0 8px rgba(200,255,0,0)` over 2 seconds, repeating. Not a blink — a breath

---

## Footer

### Design
- Minimal, 80px height
- Left: "© 2025 Edge Alpha" — 12px, `#333`
- Center: "Built for founders who want to know." — 12px, italic, `#333`
- Right: links — "Twitter" "LinkedIn" "Contact" — 12px, `#555`, hover `#888`
- Top border: 1px solid `rgba(255,255,255,0.04)`
- No sitemap, no massive footer grid — this is a focused product

---

## Global Animation Rules

### Scroll Animations
- Use `IntersectionObserver` or Framer Motion `whileInView` — NOT scroll-hijacking
- Trigger threshold: 30-40% of element visible
- Every animation: `once: true` — plays once, never resets on scroll-up
- Duration: 400-700ms for most elements, never over 1000ms
- Easing: `[0.25, 0.1, 0.25, 1]` (custom cubic bezier) — smooth deceleration, not bouncy
- Stagger: 80-150ms between sibling elements — fast enough to feel connected, slow enough to perceive sequence

### Page Load Animations
- Only the hero section animates on load
- Everything else animates on scroll intersection
- Total hero animation sequence: 2 seconds
- No loading screen, no splash — content is visible immediately, animations enhance

### Hover Animations
- Duration: 150-200ms for all hovers
- Easing: `ease` — simple, fast
- Never scale on hover (feels cheap)
- Color/opacity transitions only
- Buttons: background/border/text color transitions
- Links: color transition, optional underline reveal

### What NOT To Animate
- No parallax backgrounds
- No floating particles or dots
- No 3D transforms or perspective effects
- No scroll-jacking (don't override native scroll)
- No loading bars or progress indicators on the page
- No animated gradients or color-shifting backgrounds
- No cursor trails or custom cursor effects beyond a simple dot replacement
- No auto-playing video backgrounds

---

## Custom Cursor (Desktop Only, Optional)

- Replace default cursor with a small circle: 8px, `rgba(255,255,255,0.5)`, border-radius 50%
- On hovering interactive elements: circle expands to 32px, border becomes `1px solid rgba(255,255,255,0.3)`, fill becomes transparent — "ring" effect
- On hovering CTA buttons: ring changes to `rgba(200,255,0,0.3)` — picks up the accent
- Use `mix-blend-mode: difference` for a premium inversion effect over light text
- Transition: `width, height, border 200ms ease`
- Hide on mobile/touch devices entirely
- If this feels like too much, skip it — the site works perfectly without it

---

## Responsive Breakpoints

```
Desktop:    1200px+    — full layout as described
Tablet:     768-1199px — single column, reduce type scale by 15%, stack columns
Mobile:     <768px     — single column, hero headline clamp handles sizing,
                         agents section becomes vertical scroll (no horizontal),
                         stat rows become 2×2 grid, navigation becomes hamburger

Mobile-specific:
- Hamburger menu: full-screen overlay, `#050505` background, nav links centered vertically, 24px, 600 weight
- Hero headline: drops to ~36px, still impactful
- Q-Score ring: drops to 80px number size
- Dimension bars: still work, just narrower
- Agent cards: full width, no alternating animations — all enter from bottom
- Section padding: 80px vertical instead of 120px
```

---

## Page Performance Targets

- First Contentful Paint: <1.2s
- Largest Contentful Paint: <2.5s (the hero headline)
- Total page weight: <500KB (excluding fonts)
- Font loading: `font-display: swap`, preload Inter/Geist woff2
- Images: zero raster images on the page — everything is SVG, CSS, or rendered components
- JavaScript: minimal — Framer Motion is the heaviest dependency. No GSAP unless you do the pinned horizontal scroll
- Lighthouse score target: 95+ performance, 100 accessibility

---

## Files To Create

```
app/(marketing)/
  page.tsx                    ← landing page (or layout + sections)
  layout.tsx                  ← marketing layout (different nav from app)

components/marketing/
  Navigation.tsx              ← fixed nav with blur effect
  HeroSection.tsx             ← hero with word-by-word animation
  ProblemSection.tsx           ← problem cards
  QScoreSection.tsx            ← score counter + dimension bars
  HowItWorksSection.tsx        ← three steps
  AgentShowcase.tsx            ← agent cards with typing effect
  InvestorSection.tsx          ← deal flow mock + stats
  TractionSection.tsx          ← stats row
  CTASection.tsx               ← closing CTA
  Footer.tsx                   ← minimal footer
  
hooks/
  useCountUp.ts               ← counter animation hook
  useScrollReveal.ts           ← intersection observer wrapper
  useSmoothScroll.ts           ← Lenis initialization

lib/
  marketing-constants.ts       ← all copy, stats, agent data for the marketing site
```

---

## What To Show Investors Specifically

When you present this at the investor meet, the website should answer these in order as they scroll:

1. **What is this?** (Hero — they get it in 3 seconds)
2. **Why does this need to exist?** (Problem section — they feel the pain)
3. **What's the core innovation?** (Q-Score section — the "aha" moment)
4. **How does it work?** (Three steps — simple, not overwhelming)
5. **What makes this defensible?** (Agent showcase — the moat is the agents executing, not just advising)
6. **What's in it for me as an investor?** (Investor section — filtered deal flow, ranked by thesis)
7. **Is this real?** (Traction section — whatever numbers you have)
8. **What do I do next?** (CTA — clear ask)

Total scroll time: 45-60 seconds at comfortable reading speed. An investor should be able to understand everything in under a minute.