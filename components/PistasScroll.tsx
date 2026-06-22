'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
const PISTAS = [
  { num: '01', name: 'Pista Central', type: 'Cristal panorámico · Cubierta · Climatizada', price: '12€', tag: 'PREMIUM', desc: 'La joya del club. Visibilidad total de 360° con cristal panorámico. Superficie certificada FEP.' },
  { num: '02', name: 'Pista VIP', type: 'Privada · Sonido ambiente · Bar exclusivo', price: '18€', tag: 'VIP', desc: 'Experiencia exclusiva. Reserva privada garantizada, servicio de bebidas en pista y ambiente premium.' },
  { num: '03', name: 'Pista Pro', type: 'Competición · Gradas · Iluminación LED', price: '15€', tag: 'COMPETICIÓN', desc: 'Diseñada para torneos. Iluminación LED de 1.500 lux, gradas para espectadores y marcador digital.' },
  { num: '04', name: 'Pista Norte', type: 'Exterior · Iluminación nocturna · Acceso directo', price: '10€', tag: 'EXTERIOR', desc: 'Para los que disfrutan bajo el cielo abierto. Superficie rápida y líneas de pintado profesional.' },
]
export function PistasScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.pista-slide')
      gsap.set(cards.slice(1), { opacity: 0, y: 60, scale: 0.96 })
      gsap.set(cards[0], { opacity: 1, y: 0, scale: 1 })
      gsap.fromTo('.pistas-title-inner', { y: '100%' }, { y: '0%', duration: 1, ease: 'power4.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } })
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${cards.length * 100}%`,
        pin: stickyRef.current,
        pinSpacing: false,
        scrub: false,
        onUpdate: (self) => {
          const cardIndex = Math.min(Math.floor(self.progress * cards.length), cards.length - 1)
          cards.forEach((card, i) => {
            if (i < cardIndex) gsap.to(card, { opacity: 0, y: -40, scale: 1.02, duration: 0.4, ease: 'power2.in' })
            else if (i === cardIndex) gsap.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' })
            else gsap.to(card, { opacity: 0, y: 60, scale: 0.96, duration: 0.4 })
          })
          if (progressRef.current) gsap.to(progressRef.current, { scaleX: self.progress, duration: 0.1, ease: 'none' })
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={sectionRef} id="pistas" className="relative bg-dark" style={{ height: `${(PISTAS.length + 1) * 100}vh` }}>
      <div ref={stickyRef} className="sticky top-0 h-screen flex flex-col justify-center px-10 md:px-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5">
          <div ref={progressRef} className="h-full bg-neon origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
        <div className="mb-12">
          <p className="text-neon text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'var(--font-inter)' }}>Nuestras instalaciones</p>
          <div className="overflow-hidden">
            <h2 className="pistas-title-inner block" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(3rem,7vw,6rem)', lineHeight: 0.9 }}>PISTAS <span className="text-neon">PREMIUM</span></h2>
          </div>
        </div>
        <div className="relative" style={{ height: '420px' }}>
          {PISTAS.map((pista, i) => (
            <div key={i} className="pista-slide absolute inset-0 grid grid-cols-2 border border-white/6" style={{ willChange: 'transform, opacity' }}>
              <div className="bg-mid p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-white/10 leading-none" style={{ fontFamily: 'var(--font-bebas)', fontSize: '5rem' }}>{pista.num}</span>
                    <span className="text-[10px] tracking-widest uppercase border border-neon/30 text-neon px-3 py-1" style={{ fontFamily: 'var(--font-inter)' }}>{pista.tag}</span>
                  </div>
                  <h3 className="text-white mb-3" style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.2rem' }}>{pista.name}</h3>
                  <p className="text-white/30 text-xs tracking-wider uppercase mb-6" style={{ fontFamily: 'var(--font-inter)' }}>{pista.type}</p>
                  <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>{pista.desc}</p>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-neon leading-none" style={{ fontFamily: 'var(--font-bebas)', fontSize: '3rem' }}>{pista.price}</span>
                    <span className="text-white/30 text-xs ml-2" style={{ fontFamily: 'var(--font-inter)' }}> / hora</span>
                  </div>
                  <button className="text-dark bg-neon text-xs font-bold tracking-widest uppercase px-6 py-3 hover:opacity-90 transition-opacity" style={{ fontFamily: 'var(--font-inter)' }}>Reservar →</button>
                </div>
              </div>
              <div className="relative overflow-hidden" style={{ background: '#0D0D0D' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/4 opacity-40">
                    <rect x="20" y="20" width="360" height="240" stroke="#C8FF00" strokeWidth="2"/>
                    <line x1="200" y1="20" x2="200" y2="260" stroke="#C8FF00" strokeWidth="2"/>
                    <rect x="20" y="80" width="360" height="120" stroke="#C8FF00" strokeWidth="1" strokeDasharray="6 4" opacity="0.4"/>
                    <line x1="20" y1="140" x2="380" y2="140" stroke="#C8FF00" strokeWidth="2.5"/>
                    <circle cx="200" cy="140" r="8" fill="#C8FF00" opacity="0.9"/>
                  </svg>
                </div>
                <div className="absolute bottom-6 right-8 text-white/5 leading-none select-none pointer-events-none" style={{ fontFamily: 'var(--font-bebas)', fontSize: '9rem' }}>{pista.num}</div>
                <div className="absolute top-6 left-6 flex gap-2">
                  {PISTAS.map((_,idx) => <div key={idx} className="w-6 h-px" style={{ background: idx === i ? '#C8FF00' : 'rgba(255,255,255,0.15)' }} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-white/20 text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>Sigue scrolleando para ver todas las pistas ↓</p>
      </div>
    </section>
  )
}
