'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATS } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export function ImpactStats() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo('.stats-title', { y: '100%' }, {
        y: '0%', duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })

      // Cards
      gsap.fromTo('.stat-card', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-grid', start: 'top 80%' }
      })

      // Counters
      STATS.forEach((stat, i) => {
        const el = document.querySelector(`.stat-num-${i}`)
        if (!el) return
        const target = parseInt(stat.num)
        if (isNaN(target)) return
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: target,
              duration: 2,
              ease: 'power2.out',
              delay: i * 0.15,
              onUpdate: function() {
                el.textContent = Math.round(this.targets()[0].val) + stat.suffix
              }
            })
          }
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-carbon py-28 px-6 md:px-16 overflow-hidden" id="stats">
      <div className="overflow-hidden mb-16">
        <h2 className="stats-title" style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          lineHeight: 0.9,
          letterSpacing: '0.02em',
        }}>
          PADEL LOVE <span className="text-neon">EN NÚMEROS</span>
        </h2>
      </div>

      <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
        {STATS.map((stat, i) => (
          <div key={i} className="stat-card bg-carbon p-8 md:p-12 group hover:bg-mid transition-colors duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-neon scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <span
              className={`stat-num-${i} block text-neon mb-3`}
              style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(3.5rem, 8vw, 6rem)', lineHeight: 1 }}
            >
              0{stat.suffix}
            </span>
            <span className="block text-white/35 text-xs tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-inter)' }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
