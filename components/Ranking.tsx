'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTitle } from './SectionTitle'
import { RANKING_DATA, CLUB } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export function Ranking() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.rank-row', { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: { trigger: '.rank-table', start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-carbon py-28 px-6 md:px-16" id="ranking">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          eyebrow="Clasificación"
          title="RANKING"
          accent="PADEL LOVE"
          subtitle="Clasificación actualizada de los jugadores del club. Datos de muestra — se actualizan con la temporada."
        />

        <div className="rank-table mt-14 border border-white/5">
          {/* Header */}
          <div className="grid grid-cols-12 px-6 py-3 border-b border-white/5 bg-mid">
            {['#', 'Jugador', 'Nivel', 'Puntos', 'Último'].map((h, i) => (
              <span key={i} className={`text-[10px] text-white/25 tracking-widest uppercase ${i === 0 ? 'col-span-1' : i === 1 ? 'col-span-4' : i === 2 ? 'col-span-3' : i === 3 ? 'col-span-2' : 'col-span-2'}`}
                style={{ fontFamily: 'var(--font-inter)' }}>
                {h}
              </span>
            ))}
          </div>

          {RANKING_DATA.map((player, i) => (
            <div key={i} className="rank-row grid grid-cols-12 px-6 py-4 border-b border-white/5 last:border-b-0 group hover:bg-mid transition-colors duration-200 items-center">
              <span className={`col-span-1 font-bold ${i < 3 ? 'text-neon' : 'text-white/20'}`}
                style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.2rem' }}>
                {player.pos < 10 ? `0${player.pos}` : player.pos}
              </span>
              <span className="col-span-4 text-white/80 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>{player.nombre}</span>
              <span className="col-span-3">
                <span className="text-[10px] border border-white/10 text-white/35 px-2 py-0.5 tracking-wider uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
                  {player.nivel}
                </span>
              </span>
              <span className="col-span-2 text-neon font-bold text-sm" style={{ fontFamily: 'var(--font-inter)' }}>{player.puntos}</span>
              <span className={`col-span-2 text-[10px] tracking-wider uppercase ${player.ultimo === 'Victoria' ? 'text-neon/70' : 'text-white/25'}`}
                style={{ fontFamily: 'var(--font-inter)' }}>
                {player.ultimo}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => window.open(`${CLUB.whatsapp}?text=${encodeURIComponent('Hola Padel Love, quiero información sobre el ranking.')}`, '_blank')}
            className="text-white/40 text-xs tracking-widest uppercase border border-white/10 px-8 py-3 hover:border-neon hover:text-neon transition-all duration-300"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Consultar ranking completo →
          </button>
        </div>
      </div>
    </section>
  )
}
