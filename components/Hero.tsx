'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { MagneticButton } from './MagneticButton'
import { CLUB } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master timeline
      const tl = gsap.timeline({ delay: 0.1 })

      tl.fromTo(imgRef.current,
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power3.out' }
      )
      .fromTo('.hero-line',
        { y: '110%', skewY: 3 },
        { y: '0%', skewY: 0, duration: 1, stagger: 0.1, ease: 'power4.out' },
        '-=1.4'
      )
      .fromTo('.hero-sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo('.hero-btns',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.hero-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      )

      // Scroll parallax — image moves slower
      gsap.to(imgRef.current, {
        y: '18%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Content moves up on scroll
      gsap.to('.hero-content', {
        y: '-12%',
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '60% top',
          scrub: true,
        },
      })

      // Scroll indicator bounce
      gsap.to('.hero-scroll', {
        y: 8,
        duration: 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const openWhatsApp = (msg: string) => {
    window.open(`https://wa.me/${CLUB.phoneRaw}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-dark" id="hero" data-cursor="play">

      {/* BG Image with parallax */}
      <div ref={imgRef} className="absolute inset-0 w-full h-[115%] -top-[7%]">
        <Image
          src="/images/pl4.jpg"
          alt="Padel Love Indoor — pistas"
          fill
          className="object-cover object-center"
          priority
          quality={95}
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.75) 40%, rgba(8,8,8,0.3) 70%, rgba(8,8,8,0.5) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.6) 0%, transparent 60%)' }} />
        {/* LED light effect */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(200,255,0,0.04) 0%, transparent 60%)' }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        backgroundImage: 'linear-gradient(rgba(200,255,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] z-[2]" style={{ background: 'linear-gradient(to bottom, transparent 0%, #C8FF00 30%, #C8FF00 70%, transparent 100%)', opacity: 0.4 }} />

      {/* HERO CONTENT */}
      <div className="hero-content relative z-10 px-6 md:px-16 lg:px-24 pb-28 md:pb-36 pt-32 w-full">

        {/* Eyebrow */}
        <p className="hero-line text-neon text-xs tracking-[0.4em] uppercase mb-6 md:mb-8 block overflow-hidden" style={{ fontFamily: 'var(--font-inter)' }}>
          <span className="block">Club de pádel indoor · Seseña Nuevo, Toledo</span>
        </p>

        {/* Main title — HUGE */}
        <div style={{ fontFamily: 'var(--font-bebas)', lineHeight: 0.85, letterSpacing: '0.01em' }}>
          <div className="overflow-hidden">
            <div className="hero-line" style={{ fontSize: 'clamp(5rem, 18vw, 18rem)', color: '#F0F0F0' }}>PADEL</div>
          </div>
          <div className="overflow-hidden">
            <div className="hero-line" style={{ fontSize: 'clamp(5rem, 18vw, 18rem)', color: '#C8FF00' }}>LOVE</div>
          </div>
          <div className="overflow-hidden">
            <div className="hero-line" style={{ fontSize: 'clamp(5rem, 18vw, 18rem)', color: 'rgba(240,240,240,0.08)' }}>INDOOR</div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="hero-sub text-white/50 text-sm md:text-base leading-relaxed max-w-md mt-6 mb-10" style={{ fontFamily: 'var(--font-inter)' }}>
          Reserva pista, encuentra partido, compite en torneos y entrena en una comunidad pensada para todos los niveles.
        </p>

        {/* CTAs */}
        <div className="hero-btns flex flex-wrap gap-3 md:gap-4">
          <MagneticButton data-cursor="book">
            <button
              onClick={() => openWhatsApp('Hola Padel Love, quiero reservar una pista.')}
              className="bg-neon text-dark text-xs font-bold tracking-widest uppercase px-8 md:px-12 py-4 hover:opacity-90 transition-opacity"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Reservar pista
            </button>
          </MagneticButton>

          <MagneticButton data-cursor="play">
            <button
              onClick={() => openWhatsApp('Hola Padel Love, quiero que me busquéis partido.')}
              className="text-white/70 text-xs font-medium tracking-widest uppercase border border-white/20 px-8 md:px-10 py-4 hover:border-neon hover:text-neon transition-all duration-300"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Te buscamos partido
            </button>
          </MagneticButton>

          <MagneticButton>
            <a
              href="#torneos"
              className="text-white/40 text-xs tracking-widest uppercase px-4 py-4 hover:text-white/70 transition-colors duration-300 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Ver torneos <span className="text-neon">→</span>
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-2 md:grid-cols-4 border-t border-white/5"
        style={{ background: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(16px)' }}>
        {[
          { num: '6', label: 'Pistas indoor' },
          { num: '400+', label: 'Jugadores' },
          { num: '12', label: 'Torneos/año' },
          { num: '5★', label: 'Valoración media' },
        ].map((s, i) => (
          <div key={i} className="py-4 px-6 md:px-8 border-r border-white/5 last:border-r-0 group hover:bg-neon/5 transition-colors duration-500">
            <span className="block text-xl md:text-2xl text-neon" style={{ fontFamily: 'var(--font-bebas)' }}>{s.num}</span>
            <span className="block text-[10px] text-white/25 tracking-widest uppercase mt-0.5" style={{ fontFamily: 'var(--font-inter)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-24 right-6 md:right-12 flex flex-col items-center gap-2 z-10">
        <span className="text-white/20 text-[9px] tracking-[0.25em] uppercase" style={{ writingMode: 'vertical-rl', fontFamily: 'var(--font-inter)' }}>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-neon/30 to-transparent" />
      </div>
    </section>
  )
}
