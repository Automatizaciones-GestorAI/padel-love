import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { PistasScroll } from '@/components/PistasScroll'
import { HorariosSection } from '@/components/HorariosSection'
import { CTASection } from '@/components/CTASection'
import { Footer } from '@/components/Footer'
import { NoiseBackground } from '@/components/NoiseBackground'

export default function Home() {
  return (
    <main>
      <NoiseBackground />
      <Navbar />
      <HeroSection />
      <PistasScroll />
      <HorariosSection />
      <CTASection />
      <Footer />
    </main>
  )
}
