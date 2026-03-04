'use client'

import { useEffect, useRef } from 'react'

type CursorState = 'default' | 'interactive' | 'cta'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<CursorState>('default')
  const posRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Only on pointer-capable desktop devices
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return
    }

    document.body.classList.add('cursor-active')

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    // Event delegation — picks up all [data-cursor] elements including dynamically rendered ones
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null
      if (target) {
        stateRef.current = (target.dataset.cursor as CursorState) || 'interactive'
      } else {
        stateRef.current = 'default'
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)

    // RAF render loop — direct DOM manipulation for 60fps
    const render = () => {
      if (dotRef.current) {
        const { x, y } = posRef.current
        const state = stateRef.current

        const size = state === 'default' ? 8 : 32
        const bg = state === 'default' ? 'rgba(255,255,255,0.6)' : 'transparent'
        const border =
          state === 'cta'
            ? '1px solid rgba(200,255,0,0.7)'
            : state === 'interactive'
            ? '1px solid rgba(255,255,255,0.35)'
            : 'none'
        const opacity = x === -100 ? '0' : '1'

        const el = dotRef.current
        el.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px)`
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.background = bg
        el.style.border = border
        el.style.opacity = opacity
      }
      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      document.body.classList.remove('cursor-active')
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        willChange: 'transform',
        transition: 'width 180ms ease, height 180ms ease, border 180ms ease',
        opacity: 0,
      }}
    />
  )
}
