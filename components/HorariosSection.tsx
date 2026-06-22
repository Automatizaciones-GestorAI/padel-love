'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
const HORARIOS = [
  { day: 'Lunes — Viernes', time: '08:00 — 23:00', tag: 'Todos los días' },
  { day: 'Sábado', time: '08:00 — 22:00', tag: 'Fin de semana' },
  { day: 'Domingo', time: '09:00 — 21:00', tag: 'Fin de semana' },
  { day: 'Festivos', time: '10:00 — 20:00', tag: 'Horario especial' },
]
export function HorariosSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.horarios-title', { y: '100%' }, { y: '0%', duration: 1, ease: 'power4.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } })
      gsap.fromTo('.horario-row', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.horarios-list', start: 'top 75%' } })
      gsap.fromTo('.horarios-right', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={sectionRef} id="horarios" className="bg-mid py-36 px-10 md:px-20">
      <p className="text-neon text-xs tracking-[0.3em] uppercase mb-6" style={{ fontFamily: 'var(--font-inter)' }}>Cuándo jugamos</p>
      <div className="overflow-hidden mb-16">
        <h2 className="horarios-title block" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(3rem,8vw,7rem)', lineHeight: 0.88 }}>HORARIOS</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="horarios-list">
          {HORARIOS.map((h, i) => (
            <div key={i} className="horario-row flex items-center justify-between py-6 border-b border-white/6 group hover:border-neon/30 transition-colors duration-300">
              <span className="text-white/40 text-xs tracking-widest uppercase group-hover:text-white/60 transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>{h.day}</span>
              <span className="text-white group-hover:text-neon transition-colors duration-300" style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem' }}>{h.time}</span>
              <span className="text-[10px] tracking-widest uppercase text-neon/60 border border-neon/20 px-3 py-1" style={{ fontFamily: 'var(--font-inter)' }}>{h.tag}</span>
            </div>
          ))}
        </div>
        <div className="horarios-right space-y-6">
          <div className="border border-white/6 p-8 hover:border-neon/20 transition-colors duration-500">
            <p className="text-neon text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Reserva online</p>
            <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>Reserva tu pista en segundos desde el móvil. Sin llamadas, sin esperas. Confirmación instantánea.</p>
          </div>
          <div className="border border-white/6 p-8 hover:border-neon/20 transition-colors duration-500">
            <p className="text-neon text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Iluminación nocturna</p>
            <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>Todas las pistas exteriores con iluminación LED. Juega hasta las 23:00 con visibilidad de competición.</p>
          </div>
          <button data-magnetic className="w-full bg-neon text-dark text-xs font-bold tracking-widest uppercase py-4 hover:opacity-90 transition-opacity" style={{ fontFamily: 'var(--font-inter)' }}>Reservar ahora →</button>
        </div>
      </div>
    </section>
  )
}
