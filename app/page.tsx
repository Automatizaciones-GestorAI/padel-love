import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ImpactStats } from '@/components/ImpactStats'
import { FindMatch } from '@/components/FindMatch'
import { Tournaments } from '@/components/Tournaments'
import { School } from '@/components/School'
import { Ranking } from '@/components/Ranking'
import { Facilities } from '@/components/Facilities'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ImpactStats />
      <FindMatch />
      <Tournaments />
      <School />
      <Ranking />
      <Facilities />
      <Contact />
      <Footer />
    </main>
  )
}
