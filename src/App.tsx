import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import PortfolioFunnels from './components/PortfolioFunnels'
import ProofShowcase from './components/ProofShowcase'
import Services from './components/Services'
import Experience from './components/Experience'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback)
    }
  }, [])

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      <Navbar />

      <main>
        <Hero />
        <Stats />
        <PortfolioFunnels />
        <ProofShowcase />
        <Services />
        <Experience />
        <CTA />
      </main>

      <Footer />
    </div>
  )
}

export default App
