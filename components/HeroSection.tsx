'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.fromTo(imgRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out' })
        .fromTo([line1Ref.current, line2Ref.current, line3Ref.current], { y: '110%', skewY: 4 }, { y: '0%', skewY: 0, duration: 1, stagger: 0.12, ease: 'power4.out' }, '-=1.2')
        .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .fromTo(actionsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')

      // Parallax en la imagen de fondo
      gsap.to(imgRef.current, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Contenido se mueve más lento = profundidad
      gsap.to('.hero-content', {
        y: '-8%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-start overflow-hidden bg-dark">

      {/* Imagen de fondo con parallax */}
      <div ref={imgRef} className="absolute inset-0 w-full h-full">
        <Image
          src="/images/pl4.jpg"
          alt="Padel Love pistas"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.92) 50%, rgba(10,10,10,0.5) 100%)' }} />
        {/* Overlay inferior */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 40%)' }} />
      </div>

      {/* Grid sutil encima */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        backgroundImage: 'linear-gradient(rgba(200,255,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Línea vertical accent */}
      <div className="absolute left-0 top-0 bottom-0 w-px z-[1] opacity-30" style={{ background: 'linear-gradient(to bottom, transparent, #C8FF00, transparent)' }} />

      {/* Content */}
      <div className="hero-content relative z-10 px-10 md:px-20 pt-32 pb-32 w-full">
        <p className="text-neon text-xs tracking-[0.4em] uppercase mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
          — Seseña · Toledo · España
        </p>

        <div className="mb-10" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(5.5rem,14vw,13rem)', lineHeight: 0.88 }}>
          <div className="overflow-hidden"><div ref={line1Ref} className="text-white">JUEGA</div></div>
          <div className="overflow-hidden"><div ref={line2Ref} className="text-neon">DIFERENTE.</div></div>
          <div className="overflow-hidden"><div ref={line3Ref} className="text-white/15">VIVE EL PÁDEL.</div></div>
        </div>

        <p ref={subRef} className="text-white/60 text-base leading-relaxed max-w-md mb-12" style={{ fontFamily: 'var(--font-inter)' }}>
          El club donde la intensidad del juego se encuentra con el amor por el deporte. 6 pistas indoor premium en Seseña, Toledo.
        </p>

        <div ref={actionsRef} className="flex gap-4 items-center">
          <button data-magnetic className="bg-neon text-dark text-xs font-bold tracking-widest uppercase px-10 py-4 hover:opacity-90 transition-opacity" style={{ fontFamily: 'var(--font-inter)' }}>
            Reservar pista
          </button>
          <button data-magnetic className="text-white/60 text-xs tracking-widest uppercase border border-white/20 px-8 py-4 hover:border-neon hover:text-neon transition-all duration-300" style={{ fontFamily: 'var(--font-inter)' }}>
            Ver pistas →
          </button>
        </div>
      </div>

      {/* Stats bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 grid grid-cols-4 z-10" style={{ background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(10px)' }}>
        {[{ num: '6', label: 'Pistas indoor' }, { num: '400+', label: 'Jugadores' }, { num: '12', label: 'Torneos/año' }, { num: '5★', label: 'Valoración' }].map((stat, i) => (
          <div key={i} className="py-5 px-8 border-r border-white/5 last:border-r-0 group hover:bg-neon/5 transition-colors duration-500">
            <span className="block text-2xl text-neon" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}>{stat.num}</span>
            <span className="block text-[10px] text-white/30 tracking-widest uppercase mt-1" style={{ fontFamily: 'var(--font-inter)' }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-24 right-10 flex flex-col items-center gap-3 z-10">
        <span className="text-white/25 text-[10px] tracking-widest uppercase" style={{ writingMode: 'vertical-rl', fontFamily: 'var(--font-inter)' }}>Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  )
}
