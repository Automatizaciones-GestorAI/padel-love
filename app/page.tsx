import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { PistasScroll } from '@/components/PistasScroll'
import { HorariosSection } from '@/components/HorariosSection'
import { CTASection } from '@/components/CTASection'
import { Footer } from '@/components/Footer'
export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <PistasScroll />
      <HorariosSection />
      <CTASection />
      <Footer />
    </main>
  )
}
