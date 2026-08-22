import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import Stats from './components/Stats'
import ClientLogos from './components/ClientLogos'
import PortfolioFunnels from './components/PortfolioFunnels'
import ProofShowcase from './components/ProofShowcase'
import DemoShowcase from './components/DemoShowcase'
import CaseStudies from './components/CaseStudies'
import Testimonials from './components/Testimonials'
import Services from './components/Services'
import Process from './components/Process'
import Experience from './components/Experience'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null
      if (!anchor) return
      const hash = anchor.getAttribute('href')
      if (!hash) return
      event.preventDefault()
      lenis.scrollTo(hash, { offset: -80 })
      if (hash !== '#' && window.location.hash !== hash) {
        history.pushState(null, '', hash)
      }
    }

    document.addEventListener('click', onAnchorClick)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      document.removeEventListener('click', onAnchorClick)
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
        <ClientLogos />
        <PortfolioFunnels />
        <ProofShowcase />
        <DemoShowcase />
        <CaseStudies />
        <Testimonials />
        <Services />
        <Process />
        <Experience />
        <CTA />
      </main>

      <Footer />
    </div>
  )
}

export default App
