'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Don't mount on touch/pointer-coarse devices
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const glow = glowRef.current
    if (!glow) return

    let x = -1000
    let y = -1000
    let rafId: number
    let hasMoved = false

    const onMouseMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (!hasMoved) {
        hasMoved = true
        glow.style.opacity = '1'
      }
    }

    const render = () => {
      glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`
      rafId = requestAnimationFrame(render)
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    rafId = requestAnimationFrame(render)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0,
        transition: 'opacity 0.6s ease',
        willChange: 'transform',
      }}
    />
  )
}
