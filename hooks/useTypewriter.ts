'use client'

import { useEffect, useRef, useState } from 'react'

interface UseTypewriterResult {
  displayText: string
  isComplete: boolean
}

export function useTypewriter(
  text: string,
  speed = 30,
  trigger = false
): UseTypewriterResult {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!trigger || hasStarted.current) return
    hasStarted.current = true

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setDisplayText(text)
      setIsComplete(true)
      return
    }

    let charIndex = 0

    intervalRef.current = setInterval(() => {
      charIndex++
      setDisplayText(text.slice(0, charIndex))

      if (charIndex >= text.length) {
        clearInterval(intervalRef.current!)
        setIsComplete(true)
      }
    }, speed)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [trigger, text, speed])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return { displayText, isComplete }
}
