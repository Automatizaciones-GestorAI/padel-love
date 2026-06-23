'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { SectionTitle } from './SectionTitle'
import { INSTALACIONES } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export function Facilities() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.facility-item', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.facility-grid', start: 'top 75%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-mid py-28 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Nuestras instalaciones"
          title="PÁDEL INDOOR EN"
          accent="SESEÑA NUEVO"
          subtitle="Pistas cubiertas, ambiente deportivo y una comunidad activa para jugar durante todo el año, sin depender del tiempo."
        />

        <div className="facility-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 mt-14">
          {INSTALACIONES.map((item, i) => (
            <div key={i} className="facility-item relative overflow-hidden group" style={{ height: '320px' }}>
              <Image
                src={item.img}
                alt={item.titulo}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 transition-opacity duration-500"
                style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.4) 50%, rgba(8,8,8,0.2) 100%)' }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'rgba(8,8,8,0.15)' }} />
              {/* Top neon line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-neon scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-white mb-2" style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', letterSpacing: '0.04em' }}>
                  {item.titulo}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
