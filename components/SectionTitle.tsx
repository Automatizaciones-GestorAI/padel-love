'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  eyebrow?: string
  title: string
  accent?: string
  subtitle?: string
  center?: boolean
}

export function SectionTitle({ eyebrow, title, accent, subtitle, center = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.st-eyebrow', { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' }
      })
      gsap.fromTo('.st-line', { y: '105%' }, {
        y: '0%', duration: 0.9, stagger: 0.08, ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%' }
      })
      gsap.fromTo('.st-sub', { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%' }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className={center ? 'text-center' : ''}>
      {eyebrow && (
        <p className="st-eyebrow text-neon text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
          {eyebrow}
        </p>
      )}
      <div className="overflow-hidden">
        <h2 className="st-line" style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(2.8rem, 7vw, 6rem)',
          lineHeight: 0.9,
          letterSpacing: '0.02em',
        }}>
          {title}{accent && <span className="text-neon"> {accent}</span>}
        </h2>
      </div>
      {subtitle && (
        <p className="st-sub text-white/40 text-sm leading-relaxed mt-4 max-w-lg" style={{ fontFamily: 'var(--font-inter)' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
