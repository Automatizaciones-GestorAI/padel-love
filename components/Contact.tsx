'use client'

import { SectionTitle } from './SectionTitle'
import { CLUB, HORARIOS } from '@/lib/data'
import { motion } from 'framer-motion'

export function Contact() {
  return (
    <section className="bg-carbon py-28 px-6 md:px-16" id="contacto">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Encuéntranos"
          title="CONTACTO Y"
          accent="LOCALIZACIÓN"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 mt-14">

          {/* Left — info */}
          <div className="bg-mid p-8 md:p-12 space-y-10">
            <div>
              <p className="text-[10px] text-white/25 tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Dirección</p>
              <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                {CLUB.address}<br />{CLUB.city}
              </p>
            </div>

            <div>
              <p className="text-[10px] text-white/25 tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Horarios</p>
              <div className="space-y-3">
                {HORARIOS.map((h, i) => (
                  <div key={i} className="flex justify-between items-start border-b border-white/5 pb-3 last:border-0">
                    <span className="text-white/40 text-xs" style={{ fontFamily: 'var(--font-inter)' }}>{h.dia}</span>
                    <span className="text-white/70 text-xs text-right" style={{ fontFamily: 'var(--font-inter)' }}>{h.hora}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <motion.a
                href={`tel:${CLUB.phone.replace(/\s/g, '')}`}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 bg-neon text-dark text-xs font-bold tracking-widest uppercase px-6 py-4 hover:opacity-90 transition-opacity justify-center"
                style={{ fontFamily: 'var(--font-inter)' }}
                data-cursor="book"
              >
                Llamar — {CLUB.phone}
              </motion.a>
              <motion.a
                href={`${CLUB.whatsapp}?text=${encodeURIComponent(CLUB.whatsappMsg)}`}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 text-white/70 text-xs font-medium tracking-widest uppercase border border-white/15 px-6 py-4 hover:border-neon hover:text-neon transition-all duration-300 justify-center"
                style={{ fontFamily: 'var(--font-inter)' }}
                data-cursor="book"
              >
                WhatsApp
              </motion.a>
              <motion.a
                href={CLUB.mapsUrl}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 text-white/40 text-xs tracking-widest uppercase border border-white/8 px-6 py-4 hover:border-white/20 hover:text-white/60 transition-all duration-300 justify-center"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Cómo llegar →
              </motion.a>
            </div>
          </div>

          {/* Right — map placeholder */}
          <div className="bg-panel relative overflow-hidden" style={{ minHeight: '400px' }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
              <div className="text-center">
                <p className="text-white/20 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'var(--font-inter)' }}>Ubicación</p>
                <p className="text-white/50 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>Ctra. Andalucía (N-IV), KM 35,5</p>
                <p className="text-white/30 text-xs mt-1" style={{ fontFamily: 'var(--font-inter)' }}>Seseña Nuevo, Toledo</p>
              </div>
              <a
                href={CLUB.mapsUrl}
                target="_blank" rel="noopener noreferrer"
                className="bg-neon text-dark text-xs font-bold tracking-widest uppercase px-8 py-3 hover:opacity-90 transition-opacity"
                style={{ fontFamily: 'var(--font-inter)' }}
                data-cursor="book"
              >
                Abrir en Google Maps →
              </a>
            </div>
            {/* Grid decoration */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'linear-gradient(rgba(200,255,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.5) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }} />
          </div>
        </div>
      </div>
    </section>
  )
}
