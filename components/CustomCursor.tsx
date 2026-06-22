'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' })
    }
    const magneticEls = document.querySelectorAll('[data-magnetic]')
    magneticEls.forEach((el) => {
      el.addEventListener('mouseenter', () => { gsap.to(follower, { scale: 2.5, duration: 0.3 }); gsap.to(cursor, { scale: 0.4, duration: 0.3 }) })
      el.addEventListener('mouseleave', () => { gsap.to(follower, { scale: 1, duration: 0.3 }); gsap.to(cursor, { scale: 1, duration: 0.3 }); gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.3)' }) })
    })
    window.addEventListener('mousemove', onMouseMove)
    return () => { window.removeEventListener('mousemove', onMouseMove) }
  }, [])
  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-neon rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference" />
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-neon/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2" />
    </>
  )
}
