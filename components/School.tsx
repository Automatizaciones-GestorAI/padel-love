'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { SectionTitle } from './SectionTitle'
import { ESCUELA_NIVELES, CLUB } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export function School() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.school-card', { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.school-grid', start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-mid py-28 px-6 md:px-16" id="escuela">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <SectionTitle
            eyebrow="Aprende y mejora"
            title="ESCUELA"
            accent="PADEL LOVE"
            subtitle="Entrena con grupos adaptados a tu nivel y mejora técnica, táctica y ritmo de partido. Profesores titulados y metodología progresiva."
          />

          <motion.button
            onClick={() => window.open(`${CLUB.whatsapp}?text=${encodeURIComponent('Hola Padel Love, quiero información sobre la escuela de pádel.')}`, '_blank')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 bg-neon text-dark text-xs font-bold tracking-widest uppercase px-10 py-4 hover:opacity-90 transition-opacity"
            style={{ fontFamily: 'var(--font-inter)' }}
            data-cursor="book"
          >
            Apuntarme a la escuela →
          </motion.button>
        </div>

        {/* Right — levels grid */}
        <div className="school-grid grid grid-cols-1 gap-px bg-white/5">
          {ESCUELA_NIVELES.map((nivel, i) => (
            <motion.div
              key={i}
              className="school-card bg-carbon px-6 py-5 flex items-center gap-5 group hover:bg-mid transition-colors duration-300 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-neon scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-top" />
              <span className="text-2xl shrink-0">{nivel.icon}</span>
              <div>
                <p className="text-white text-sm font-medium mb-0.5" style={{ fontFamily: 'var(--font-inter)' }}>{nivel.nivel}</p>
                <p className="text-white/35 text-xs leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>{nivel.desc}</p>
              </div>
              <span className="ml-auto text-white/15 group-hover:text-neon/50 transition-colors text-sm">→</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
