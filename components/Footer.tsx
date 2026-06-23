import { CLUB, NAV_LINKS } from '@/lib/data'

export function Footer() {
  return (
    <footer className="bg-carbon border-t border-white/5">
      <div className="px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', letterSpacing: '0.1em', color: '#C8FF00' }}>
            PADEL LOVE
          </p>
          <p className="text-white/25 text-xs mt-1 mb-4 tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>Indoor</p>
          <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
            {CLUB.address}<br />{CLUB.city}
          </p>
        </div>
        <div>
          <p className="text-white/20 text-[10px] tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-inter)' }}>Navegación</p>
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href}
                className="text-white/40 text-sm hover:text-neon transition-colors duration-300"
                style={{ fontFamily: 'var(--font-inter)' }}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <p className="text-white/20 text-[10px] tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-inter)' }}>Contacto</p>
          <a href={`tel:${CLUB.phone}`} className="text-white/50 text-sm hover:text-neon transition-colors block mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
            {CLUB.phone}
          </a>
          <a href={CLUB.whatsapp} target="_blank" rel="noopener noreferrer"
            className="text-white/50 text-sm hover:text-neon transition-colors block mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
            WhatsApp
          </a>
          <a href={CLUB.instagram} target="_blank" rel="noopener noreferrer"
            className="text-white/50 text-sm hover:text-neon transition-colors block" style={{ fontFamily: 'var(--font-inter)' }}>
            Instagram
          </a>
        </div>
      </div>
      <div className="border-t border-white/5 px-6 md:px-16 py-5 flex flex-col md:flex-row justify-between gap-2">
        <p className="text-white/15 text-xs" style={{ fontFamily: 'var(--font-inter)' }}>
          © 2025 Padel Love Indoor. Todos los derechos reservados.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-white/15 text-xs hover:text-white/30 transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>Aviso legal</a>
          <a href="#" className="text-white/15 text-xs hover:text-white/30 transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>Privacidad</a>
        </div>
      </div>
    </footer>
  )
}
