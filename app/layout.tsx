import type { Metadata } from 'next'
import './globals.css'
import { LenisProvider } from '@/lib/lenis'
import { CustomCursor } from '@/components/CustomCursor'
export const metadata: Metadata = {
  title: 'Padel Love — Club Premium · Seseña, Toledo',
  description: 'Pistas premium de pádel en Seseña, Toledo.',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
