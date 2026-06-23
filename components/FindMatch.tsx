'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionTitle } from './SectionTitle'
import { CLUB } from '@/lib/data'

const NIVELES = ['Iniciación', 'Medio', 'Avanzado', 'Competición']
const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const FRANJAS = ['Mañana (8-14h)', 'Tarde (14-18h)', 'Noche (18-23h)']

export function FindMatch() {
  const [form, setForm] = useState({ nombre: '', telefono: '', nivel: '', dia: '', franja: '', comentarios: '' })

  const handleSubmit = () => {
    const msg = `Hola Padel Love, quiero que me ayudéis a encontrar partido.\n\nNombre: ${form.nombre}\nTeléfono: ${form.telefono}\nNivel: ${form.nivel}\nDía preferido: ${form.dia}\nFranja horaria: ${form.franja}\nComentarios: ${form.comentarios}`
    window.open(`https://wa.me/${CLUB.phoneRaw}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section className="bg-mid py-28 px-6 md:px-16" id="buscar-partido" data-cursor="play">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          eyebrow="Comunidad activa"
          title="¿QUIERES JUGAR Y"
          accent="NO TIENES PARTIDO?"
          subtitle="Dinos tu nivel, horario y disponibilidad. En Padel Love te ayudamos a encontrar partido con jugadores de tu nivel."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {/* Left — form */}
          <div className="bg-carbon p-8 md:p-12 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-white/30 tracking-widest uppercase mb-2" style={{ fontFamily: 'var(--font-inter)' }}>Nombre</label>
                <input
                  value={form.nombre}
                  onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                  placeholder="Tu nombre"
                  className="w-full bg-mid border border-white/8 text-white/80 text-sm px-4 py-3 placeholder-white/20 focus:border-neon/50 focus:outline-none transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                />
              </div>
              <div>
                <label className="block text-[10px] text-white/30 tracking-widest uppercase mb-2" style={{ fontFamily: 'var(--font-inter)' }}>Teléfono</label>
                <input
                  value={form.telefono}
                  onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
                  placeholder="600 000 000"
                  className="w-full bg-mid border border-white/8 text-white/80 text-sm px-4 py-3 placeholder-white/20 focus:border-neon/50 focus:outline-none transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                />
              </div>
            </div>

            {/* Nivel */}
            <div>
              <label className="block text-[10px] text-white/30 tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Nivel</label>
              <div className="flex flex-wrap gap-2">
                {NIVELES.map(n => (
                  <button key={n} onClick={() => setForm(f => ({ ...f, nivel: n }))}
                    className="text-xs px-4 py-2 border transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      borderColor: form.nivel === n ? '#C8FF00' : 'rgba(255,255,255,0.1)',
                      color: form.nivel === n ? '#C8FF00' : 'rgba(255,255,255,0.4)',
                      background: form.nivel === n ? 'rgba(200,255,0,0.08)' : 'transparent',
                    }}>
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Día */}
            <div>
              <label className="block text-[10px] text-white/30 tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Día preferido</label>
              <div className="flex flex-wrap gap-2">
                {DIAS.map(d => (
                  <button key={d} onClick={() => setForm(f => ({ ...f, dia: d }))}
                    className="text-xs px-3 py-2 border transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      borderColor: form.dia === d ? '#C8FF00' : 'rgba(255,255,255,0.1)',
                      color: form.dia === d ? '#C8FF00' : 'rgba(255,255,255,0.4)',
                      background: form.dia === d ? 'rgba(200,255,0,0.08)' : 'transparent',
                    }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Franja */}
            <div>
              <label className="block text-[10px] text-white/30 tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Franja horaria</label>
              <div className="flex flex-wrap gap-2">
                {FRANJAS.map(f => (
                  <button key={f} onClick={() => setForm(frm => ({ ...frm, franja: f }))}
                    className="text-xs px-4 py-2 border transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      borderColor: form.franja === f ? '#C8FF00' : 'rgba(255,255,255,0.1)',
                      color: form.franja === f ? '#C8FF00' : 'rgba(255,255,255,0.4)',
                      background: form.franja === f ? 'rgba(200,255,0,0.08)' : 'transparent',
                    }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-white/30 tracking-widest uppercase mb-2" style={{ fontFamily: 'var(--font-inter)' }}>Comentarios</label>
              <textarea
                value={form.comentarios}
                onChange={e => setForm(f => ({ ...f, comentarios: e.target.value }))}
                placeholder="Cualquier info adicional..."
                rows={3}
                className="w-full bg-mid border border-white/8 text-white/80 text-sm px-4 py-3 placeholder-white/20 focus:border-neon/50 focus:outline-none transition-colors resize-none"
                style={{ fontFamily: 'var(--font-inter)' }}
              />
            </div>

            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-neon text-dark text-xs font-bold tracking-widest uppercase py-4 hover:opacity-90 transition-opacity"
              style={{ fontFamily: 'var(--font-inter)' }}
              data-cursor="book"
            >
              Quiero que me busquéis partido →
            </motion.button>
          </div>

          {/* Right — visual */}
          <div className="bg-panel p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'linear-gradient(rgba(200,255,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.5) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
            <div className="relative z-10">
              <p className="text-neon text-xs tracking-[0.3em] uppercase mb-6" style={{ fontFamily: 'var(--font-inter)' }}>Cómo funciona</p>
              {[
                { n: '01', t: 'Rellena el formulario', d: 'Cuéntanos tu nivel, disponibilidad y lo que buscas.' },
                { n: '02', t: 'Te contactamos', d: 'Nuestro equipo te llama o escribe por WhatsApp.' },
                { n: '03', t: 'A jugar', d: 'Te asignamos partido con jugadores de tu nivel.' },
              ].map(step => (
                <div key={step.n} className="flex gap-5 mb-8 last:mb-0">
                  <span className="text-neon/30 shrink-0" style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', lineHeight: 1 }}>{step.n}</span>
                  <div>
                    <p className="text-white/80 text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-inter)' }}>{step.t}</p>
                    <p className="text-white/35 text-xs leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative z-10 pt-8 border-t border-white/5">
              <p className="text-white/20 text-xs" style={{ fontFamily: 'var(--font-inter)' }}>O llámanos directamente</p>
              <a href={`tel:${CLUB.phone}`} className="text-neon text-xl mt-1 block hover:opacity-80 transition-opacity" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}>
                {CLUB.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
