'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, CLUB } from '@/lib/data'

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: 'power3.out' }
    )

    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 transition-all duration-500"
        style={{ background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(16px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent' }}>

        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.4rem', letterSpacing: '0.15em', color: '#C8FF00' }}>
            PADEL LOVE
          </span>
          <span className="text-[9px] text-white/30 tracking-widest uppercase hidden md:block" style={{ fontFamily: 'var(--font-inter)' }}>
            Indoor
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href}
              className="text-white/40 text-[11px] tracking-[0.12em] uppercase hover:text-neon transition-colors duration-300"
              style={{ fontFamily: 'var(--font-inter)' }}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <a href={`tel:${CLUB.phone.replace(/\s/g, '')}`}
            className="hidden md:block text-white/30 text-[11px] tracking-widest hover:text-white/60 transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}>
            {CLUB.phone}
          </a>
          <a href={CLUB.whatsapp} target="_blank" rel="noopener noreferrer"
            className="bg-neon text-dark text-[10px] font-bold tracking-widest uppercase px-5 py-2.5 hover:opacity-90 transition-opacity hidden md:block"
            style={{ fontFamily: 'var(--font-inter)' }} data-cursor="book">
            Reservar
          </a>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menú">
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="block w-6 h-px bg-white" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-6 h-px bg-white" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block w-6 h-px bg-white" />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center px-8"
            style={{ background: '#080808' }}>

            <nav className="flex flex-col gap-6 mb-12">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="text-white/70 hover:text-neon transition-colors"
                  style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', letterSpacing: '0.05em' }}>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <a href={`tel:${CLUB.phone}`} className="text-white/30 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
                {CLUB.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
