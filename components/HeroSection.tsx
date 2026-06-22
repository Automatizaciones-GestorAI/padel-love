'use client'

import { useEffect, useRef, Suspense } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'

gsap.registerPlugin(ScrollTrigger)

const HeroThree = dynamic(() => import('./HeroThree').then(m => ({ default: m.HeroThree })), { ssr: false })

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      tl.fromTo(rightRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' })
        .fromTo([line1Ref.current, line2Ref.current, line3Ref.current],
          { y: '110%', skewY: 5 },
          { y: '0%', skewY: 0, duration: 1, stagger: 0.12, ease: 'power4.out' }, '-=1')
        .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .fromTo(actionsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')

      // Parallax on scroll
      gsap.to('.hero-content', {
        y: '-10%',
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(rightRef.current, {
        y: '-5%',
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-dark">

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        backgroundImage: 'linear-gradient(rgba(200,255,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.025) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px z-[2] opacity-30"
        style={{ background: 'linear-gradient(to bottom, transparent, #C8FF00 30%, #C8FF00 70%, transparent)' }} />

      {/* Layout: text left, 3D right */}
      <div className="relative z-10 w-full grid grid-cols-2 min-h-screen">

        {/* LEFT — text content */}
        <div className="hero-content flex flex-col justify-center px-10 md:px-20 pt-32 pb-32">
          <p className="text-neon text-xs tracking-[0.4em] uppercase mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
            — Seseña · Toledo · España
          </p>

          <div className="mb-10" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(4.5rem,10vw,10rem)', lineHeight: 0.88 }}>
            <div className="overflow-hidden"><div ref={line1Ref} className="text-white">JUEGA</div></div>
            <div className="overflow-hidden"><div ref={line2Ref} className="text-neon">DIFERENTE.</div></div>
            <div className="overflow-hidden"><div ref={line3Ref} className="text-white/12">VIVE EL PÁDEL.</div></div>
          </div>

          <p ref={subRef} className="text-white/50 text-sm leading-relaxed max-w-sm mb-12" style={{ fontFamily: 'var(--font-inter)' }}>
            El club donde la intensidad del juego se encuentra con el amor por el deporte. 6 pistas indoor premium en Seseña, Toledo.
          </p>

          <div ref={actionsRef} className="flex gap-4 items-center">
            <button data-magnetic className="bg-neon text-dark text-xs font-bold tracking-widest uppercase px-10 py-4 hover:opacity-90 transition-opacity" style={{ fontFamily: 'var(--font-inter)' }}>
              Reservar pista
            </button>
            <button data-magnetic className="text-white/50 text-xs tracking-widest uppercase border border-white/15 px-8 py-4 hover:border-neon hover:text-neon transition-all duration-300" style={{ fontFamily: 'var(--font-inter)' }}>
              Ver pistas →
            </button>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-10 left-20 flex items-center gap-4">
            <div className="w-12 h-px bg-white/20" />
            <span className="text-white/25 text-[10px] tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>Scroll</span>
          </div>
        </div>

        {/* RIGHT — Three.js ball */}
        <div ref={rightRef} className="relative flex items-center justify-center">
          {/* Glow behind ball */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{
              width: '500px', height: '500px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,255,0,0.08) 0%, transparent 70%)',
            }} />
          </div>
          <div className="w-full h-full" style={{ minHeight: '100vh' }}>
            <HeroThree />
          </div>
        </div>
      </div>

      {/* Stats bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 grid grid-cols-4 z-10"
        style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)' }}>
        {[
          { num: '6', label: 'Pistas indoor' },
          { num: '400+', label: 'Jugadores' },
          { num: '12', label: 'Torneos/año' },
          { num: '5★', label: 'Valoración' },
        ].map((stat, i) => (
          <div key={i} className="py-5 px-8 border-r border-white/5 last:border-r-0 group hover:bg-neon/5 transition-colors duration-500">
            <span className="block text-2xl text-neon" style={{ fontFamily: 'var(--font-bebas)' }}>{stat.num}</span>
            <span className="block text-[10px] text-white/30 tracking-widest uppercase mt-1" style={{ fontFamily: 'var(--font-inter)' }}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
