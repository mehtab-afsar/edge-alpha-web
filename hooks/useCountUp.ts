'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface UseCountUpOptions {
  target: number
  duration?: number
  delay?: number
  suffix?: string
}

interface UseCountUpResult {
  ref: React.RefObject<HTMLElement>
  displayValue: string
}

export function useCountUp({
  target,
  duration = 1500,
  delay = 0,
  suffix = '',
}: UseCountUpOptions): UseCountUpResult {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [value, setValue] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setValue(target)
      return
    }

    let startTime: number | null = null

    const tick = (now: number) => {
      if (startTime === null) {
        startTime = now + delay
      }

      const elapsed = Math.max(0, now - startTime)
      const progress = Math.min(elapsed / duration, 1)
      // ease-out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setValue(Math.round(eased * target))

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setValue(target)
      }
    }

    requestAnimationFrame(tick)
  }, [inView, target, duration, delay])

  const displayValue = `${value.toLocaleString()}${suffix}`

  return { ref: ref as React.RefObject<HTMLElement>, displayValue }
}
