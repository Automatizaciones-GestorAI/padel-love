'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-line', { y: '110%', skewY: 3 }, { y: '0%', skewY: 0, duration: 1.1, stagger: 0.1, ease: 'power4.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } })
      gsap.fromTo('.cta-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } })
      gsap.fromTo('.cta-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } })
      gsap.to('.cta-img', { scale: 1.05, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-48 px-10 md:px-20 text-center overflow-hidden">
      {/* Imagen de fondo — fachada exterior */}
      <div className="absolute inset-0">
        <div className="cta-img absolute inset-0">
          <Image src="/images/pl2.jpg" alt="Padel Love exterior" fill className="object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.88)' }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />

      <div className="relative z-10">
        <p className="cta-sub text-neon text-xs tracking-[0.3em] uppercase mb-10 opacity-0" style={{ fontFamily: 'var(--font-inter)' }}>— Únete al club</p>
        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(4rem,10vw,9rem)', lineHeight: 0.88 }}>
          <div className="overflow-hidden"><div className="cta-line">¿LISTO PARA</div></div>
          <div className="overflow-hidden"><div className="cta-line text-neon">JUGAR?</div></div>
        </div>
        <p className="cta-sub text-white/40 text-sm leading-relaxed max-w-sm mx-auto mt-8 mb-12 opacity-0" style={{ fontFamily: 'var(--font-inter)' }}>
          Reserva tu pista ahora mismo. Sin complicaciones, sin esperas. Solo tú, tu pareja y la pista.
        </p>
        <div className="cta-actions flex gap-4 justify-center opacity-0">
          <button data-magnetic className="bg-neon text-dark text-xs font-bold tracking-widest uppercase px-12 py-5 hover:opacity-90 transition-opacity" style={{ fontFamily: 'var(--font-inter)' }}>Reservar pista</button>
          <button data-magnetic className="text-white/50 text-xs tracking-widest uppercase border border-white/10 px-8 py-5 hover:border-neon hover:text-neon transition-all duration-300" style={{ fontFamily: 'var(--font-inter)' }}>Llamar al club</button>
        </div>
      </div>
    </section>
  )
}
