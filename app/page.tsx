'use client'

import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/HeroSection'
import { ProblemSection } from '@/components/ProblemSection'
import { MethodologySection } from '@/components/MethodologySection'
import { QScoreSection } from '@/components/QScoreSection'
import { HowItWorksSection } from '@/components/HowItWorksSection'
import { AgentShowcase } from '@/components/AgentShowcase'
import { AgentIntelligenceSection } from '@/components/AgentIntelligenceSection'
import { InvestorSection } from '@/components/InvestorSection'
import { VerifiedProofSection } from '@/components/VerifiedProofSection'
import { MarketIntelligenceSection } from '@/components/MarketIntelligenceSection'
import { NetworkEffectSection } from '@/components/NetworkEffectSection'
import { TeamSection } from '@/components/TeamSection'
import { ThesisLibrarySection } from '@/components/ThesisLibrarySection'
import { TimelineSection } from '@/components/TimelineSection'
import { RiskMitigationSection } from '@/components/RiskMitigationSection'
import { FounderStorySection } from '@/components/FounderStorySection'
import { CTASection } from '@/components/CTASection'
import { Footer } from '@/components/Footer'
import { SmoothScroll } from '@/components/SmoothScroll'
import { CustomCursor } from '@/components/CustomCursor'
import { NoiseOverlay } from '@/components/NoiseOverlay'
import { CursorGlow } from '@/components/CursorGlow'
import { EasterEgg } from '@/components/EasterEgg'

export default function HomePage() {
  return (
    <>
      <NoiseOverlay />
      <CursorGlow />
      <EasterEgg />
      <CustomCursor />
      <Navigation />
      <SmoothScroll>
        <main id="main-content">
          <HeroSection />
          <ProblemSection />
          <MethodologySection />
          <QScoreSection />
          <HowItWorksSection />
          <AgentShowcase />
          <AgentIntelligenceSection />
          <InvestorSection />
          <VerifiedProofSection />
          <MarketIntelligenceSection />
          <NetworkEffectSection />
          <TeamSection />
          <ThesisLibrarySection />
          <TimelineSection />
          <RiskMitigationSection />
          <FounderStorySection />
          <CTASection />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  )
}
