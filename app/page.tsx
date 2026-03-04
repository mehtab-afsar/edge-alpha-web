'use client'

import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/HeroSection'
import { ProblemSection } from '@/components/ProblemSection'
import { QScoreSection } from '@/components/QScoreSection'
import { HowItWorksSection } from '@/components/HowItWorksSection'
import { AgentShowcase } from '@/components/AgentShowcase'
import { InvestorSection } from '@/components/InvestorSection'
import { TractionSection } from '@/components/TractionSection'
import { CTASection } from '@/components/CTASection'
import { Footer } from '@/components/Footer'
import { SmoothScroll } from '@/components/SmoothScroll'
import { CustomCursor } from '@/components/CustomCursor'

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <SmoothScroll>
        <main id="main-content">
          <HeroSection />
          <ProblemSection />
          <QScoreSection />
          <HowItWorksSection />
          <AgentShowcase />
          <InvestorSection />
          <TractionSection />
          <CTASection />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  )
}
