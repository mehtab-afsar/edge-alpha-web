'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { EASE } from '@/lib/constants'

type Direction = 'up' | 'down' | 'left' | 'right'

interface ScrollRevealResult {
  ref: React.RefObject<HTMLElement>
  initial: object
  animate: object
  transition: object
}

export function useScrollReveal(
  direction: Direction = 'up',
  delay = 0,
  amount = 0.3
): ScrollRevealResult {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount })

  const offset = 30

  const initial = {
    opacity: 0,
    x: direction === 'left' ? -offset : direction === 'right' ? offset : 0,
    y: direction === 'up' ? offset : direction === 'down' ? -offset : 0,
  }

  const animate = inView ? { opacity: 1, x: 0, y: 0 } : initial

  const transition = {
    duration: 0.6,
    delay,
    ease: EASE,
  }

  return { ref: ref as React.RefObject<HTMLElement>, initial, animate, transition }
}
