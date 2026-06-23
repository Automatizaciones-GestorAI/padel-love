'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const move = (e: MouseEvent) => {
      if (!visible) setVisible(true)
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.28, ease: 'power2.out' })
    }

    const onLeaveWindow = () => setVisible(false)
    const onEnterWindow = () => setVisible(true)

    const onEnterBook = () => {
      setLabel('BOOK')
      gsap.to(ring, { scale: 2.5, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }
    const onEnterPlay = () => {
      setLabel('PLAY')
      gsap.to(ring, { scale: 2.5, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }
    const onEnterLink = () => {
      setLabel('')
      gsap.to(ring, { scale: 1.6, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 0.4, duration: 0.2 })
    }
    const onLeave = () => {
      setLabel('')
      gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', onLeaveWindow)
    document.addEventListener('mouseenter', onEnterWindow)

    const bindAll = () => {
      document.querySelectorAll('[data-cursor="book"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterBook)
        el.addEventListener('mouseleave', onLeave)
      })
      document.querySelectorAll('[data-cursor="play"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterPlay)
        el.addEventListener('mouseleave', onLeave)
      })
      document.querySelectorAll('a, button').forEach(el => {
        if (!el.getAttribute('data-cursor')) {
          el.addEventListener('mouseenter', onEnterLink)
          el.addEventListener('mouseleave', onLeave)
        }
      })
    }

    bindAll()
    const interval = setInterval(bindAll, 2000)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', onLeaveWindow)
      document.removeEventListener('mouseenter', onEnterWindow)
      clearInterval(interval)
    }
  }, [visible])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: '6px',
          height: '6px',
          background: '#C8FF00',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:flex items-center justify-center"
        style={{
          width: '36px',
          height: '36px',
          border: '1px solid rgba(200,255,0,0.4)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      >
        {label && (
          <span style={{
            fontSize: '7px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#C8FF00',
            fontFamily: 'var(--font-inter)',
            whiteSpace: 'nowrap',
          }}>
            {label}
          </span>
        )}
      </div>
    </>
  )
}
