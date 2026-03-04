'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/constants'

const HEADLINE = "Your startup has a score. You just don't know it yet."
const HIGHLIGHT_WORD = 'score.'

export function HeroSection() {
  const words = HEADLINE.split(' ')

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '64px',
      }}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '600px',
          background:
            'radial-gradient(ellipse at center, rgba(200,255,0,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-container container-px" style={{ width: '100%', paddingTop: '6rem', paddingBottom: '6rem' }}>
        {/* Micro label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          style={{ marginBottom: '2rem' }}
        >
          <span className="label-micro">The Founder Evaluation Platform</span>
        </motion.div>

        {/* Hero Headline — word by word */}
        <h1
          style={{
            fontSize: 'clamp(40px, 7vw, 88px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#ededed',
            maxWidth: '900px',
            marginBottom: '2rem',
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + i * 0.06,
                ease: EASE,
              }}
              style={{
                display: 'inline-block',
                marginRight: '0.28em',
                color: word === HIGHLIGHT_WORD ? '#c8ff00' : '#ededed',
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#888',
            maxWidth: '520px',
            lineHeight: 1.65,
            marginBottom: '3rem',
          }}
        >
          Edge Alpha quantifies founder quality into a single number — the{' '}
          <strong style={{ color: '#ededed', fontWeight: 500 }}>Q-Score</strong> — then
          deploys 9 AI agents to improve every dimension of your business.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5, ease: EASE }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
        >
          <a
            href="#qscore"
            data-cursor="cta"
            className="animate-pulse-ring"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#c8ff00',
              color: '#050505',
              padding: '14px 28px',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'opacity 200ms ease, transform 80ms ease',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.opacity = '1'
              el.style.transform = 'scale(1)'
            }}
            onMouseDown={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(0.97)')}
            onMouseUp={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
            onClick={() => { try { navigator.vibrate?.(10) } catch (_) {} }}
          >
            See Your Score
          </a>
          <a
            href="#how-it-works"
            data-cursor="interactive"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              color: '#ededed',
              padding: '14px 28px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.12)',
              fontWeight: 500,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'border-color 200ms ease',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)')
            }
          >
            Watch Demo
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.2 }}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
          aria-hidden="true"
        >
          <span style={{ fontSize: '11px', color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, #333, transparent)',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
