'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' })
  }, [])
  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.9), transparent)', backdropFilter: 'blur(8px)' }}>
      <span className="font-bebas text-2xl tracking-widest text-neon">PADEL LOVE</span>
      <ul className="flex gap-10 list-none">
        {['Pistas','Horarios','Club','Torneos'].map((item) => (
          <li key={item}><a href={`#${item.toLowerCase()}`} className="text-white/50 text-xs tracking-widest uppercase hover:text-neon transition-colors duration-300">{item}</a></li>
        ))}
      </ul>
      <button data-magnetic className="text-dark bg-neon px-6 py-3 text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity">Reservar</button>
    </nav>
  )
}
