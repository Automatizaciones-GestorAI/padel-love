import type { Metadata } from 'next'
import './globals.css'
import { LenisProvider } from '@/lib/lenis'
import { CustomCursor } from '@/components/CustomCursor'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

export const metadata: Metadata = {
  title: 'Padel Love Indoor | Club de pádel en Seseña Nuevo',
  description: 'Reserva pista, encuentra partido, entrena en la escuela y compite en torneos en Padel Love Indoor, club de pádel en Seseña Nuevo, Toledo.',
  keywords: 'padel seseña, club padel seseña nuevo, padel indoor toledo, reservar pista padel seseña, escuela padel seseña, torneos padel toledo',
  openGraph: {
    title: 'Padel Love Indoor | Club de pádel en Seseña Nuevo',
    description: 'Tu club de pádel en Seseña Nuevo. Reserva pista, torneos, escuela y más.',
    type: 'website',
    locale: 'es_ES',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <LenisProvider>
          <CustomCursor />
          {children}
          <WhatsAppFloat />
        </LenisProvider>
      </body>
    </html>
  )
}
