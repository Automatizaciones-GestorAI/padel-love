'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { SectionTitle } from './SectionTitle'
import { COMPETICIONES, CLUB } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export function Tournaments() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.comp-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.comp-grid', start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-dark py-28 px-6 md:px-16" id="torneos">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Competición"
          title="TORNEOS, POZOS"
          accent="Y AMERICANOS"
          subtitle="Compite en el formato que más te guste. Para todos los niveles, todos los fines de semana."
        />

        <div className="comp-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 mt-14">
          {COMPETICIONES.map((comp, i) => (
            <motion.div
              key={i}
              className="comp-card bg-carbon p-8 flex flex-col justify-between group relative overflow-hidden"
              whileHover={{ backgroundColor: '#141414' }}
              transition={{ duration: 0.3 }}
            >
              {/* Top accent */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${comp.color === 'neon' ? 'bg-neon' : 'bg-electric'}`} />

              {/* Number */}
              <span className={`text-6xl mb-6 block opacity-10 group-hover:opacity-20 transition-opacity ${comp.color === 'neon' ? 'text-neon' : 'text-electric'}`}
                style={{ fontFamily: 'var(--font-bebas)' }}>
                0{i + 1}
              </span>

              <div className="flex-1">
                <h3 className="text-white mb-3" style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', letterSpacing: '0.04em' }}>
                  {comp.tipo}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                  {comp.desc}
                </p>
              </div>

              <div>
                <p className={`text-xs font-bold tracking-widest uppercase mb-4 ${comp.color === 'neon' ? 'text-neon' : 'text-electric'}`}
                  style={{ fontFamily: 'var(--font-inter)' }}>
                  {comp.precio} / jugador
                </p>
                <button
                  onClick={() => window.open(`${CLUB.whatsapp}?text=${encodeURIComponent(`Hola Padel Love, quiero información sobre ${comp.tipo}.`)}`, '_blank')}
                  className="w-full text-xs tracking-widest uppercase py-3 border transition-all duration-300"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    borderColor: comp.color === 'neon' ? 'rgba(200,255,0,0.25)' : 'rgba(0,168,255,0.25)',
                    color: comp.color === 'neon' ? 'rgba(200,255,0,0.6)' : 'rgba(0,168,255,0.6)',
                  }}
                  data-cursor="book"
                >
                  {comp.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
