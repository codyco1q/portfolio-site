import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import Stats from './components/Stats'
import PortfolioFunnels from './components/PortfolioFunnels'
import ProofShowcase from './components/ProofShowcase'
import CaseStudies from './components/CaseStudies'
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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-neutral-950 focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <Navbar />

      <main id="main">
        <Hero />
        <TechMarquee />
        <Stats />
        <PortfolioFunnels />
        <ProofShowcase />
        <CaseStudies />
        <Services />
        <Experience />
        <CTA />
      </main>

      <Footer />
    </div>
  )
}

export default App
