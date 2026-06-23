'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const move = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' })
    }

    const onEnterBook = () => {
      setLabel('BOOK')
      gsap.to(ring, { scale: 2.8, borderColor: '#C8FF00', duration: 0.3 })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }

    const onEnterPlay = () => {
      setLabel('PLAY')
      gsap.to(ring, { scale: 2.8, borderColor: '#00A8FF', duration: 0.3 })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }

    const onEnterLink = () => {
      setLabel('')
      gsap.to(ring, { scale: 1.8, borderColor: 'rgba(200,255,0,0.6)', duration: 0.3 })
      gsap.to(dot, { scale: 0.5, duration: 0.2 })
    }

    const onLeave = () => {
      setLabel('')
      gsap.to(ring, { scale: 1, borderColor: 'rgba(200,255,0,0.3)', duration: 0.3 })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', move)

    const addListeners = () => {
      document.querySelectorAll('[data-cursor="book"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterBook)
        el.addEventListener('mouseleave', onLeave)
      })
      document.querySelectorAll('[data-cursor="play"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterPlay)
        el.addEventListener('mouseleave', onLeave)
      })
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    addListeners()
    const interval = setInterval(addListeners, 2000)

    return () => {
      window.removeEventListener('mousemove', move)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-neon rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" />
      <div ref={ringRef} className="fixed top-0 left-0 w-9 h-9 border border-neon/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hidden md:flex">
        {label && (
          <span className="text-[8px] font-bold tracking-widest text-neon" style={{ fontFamily: 'var(--font-inter)' }}>
            {label}
          </span>
        )}
      </div>
    </>
  )
}
