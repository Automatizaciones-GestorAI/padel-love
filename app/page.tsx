'use client'

import dynamic from 'next/dynamic'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

const CourtWorld = dynamic(
  () => import('@/components/court/CourtWorld').then(m => ({ default: m.CourtWorld })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-dark gap-4">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-neon to-transparent animate-pulse" />
        <p className="text-neon text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
          Cargando pista...
        </p>
      </div>
    )
  }
)

export default function Home() {
  return (
    <main className="bg-dark">
      <CourtWorld />
      <WhatsAppFloat />
    </main>
  )
}
