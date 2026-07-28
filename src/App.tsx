import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'

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
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-tight">Portfolio</h1>
        <nav className="flex gap-6 text-sm text-neutral-400">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
      </header>

      <main>
        <section className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
          <p className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Welcome to my portfolio</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
            Crafting digital<br />experiences
          </h2>
          <p className="mt-6 text-neutral-400 max-w-md">
            Scroll down to verify smooth scrolling is working.
          </p>
          <div className="mt-12 animate-bounce text-neutral-600">
            ↓
          </div>
        </section>

        <section id="about" className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-2xl text-center">
            <h3 className="text-3xl font-bold tracking-tight mb-4">About</h3>
            <p className="text-neutral-400 leading-relaxed">
              This project is set up with React, TypeScript, Tailwind CSS, GSAP, and Lenis for buttery smooth scroll animations.
            </p>
          </div>
        </section>

        <section id="work" className="min-h-screen flex items-center justify-center px-8 bg-neutral-900/50">
          <div className="max-w-2xl text-center">
            <h3 className="text-3xl font-bold tracking-tight mb-4">Work</h3>
            <p className="text-neutral-400 leading-relaxed">
              Projects and case studies will live here.
            </p>
          </div>
        </section>

        <section id="contact" className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-2xl text-center">
            <h3 className="text-3xl font-bold tracking-tight mb-4">Contact</h3>
            <p className="text-neutral-400 leading-relaxed">
              Get in touch section.
            </p>
          </div>
        </section>
      </main>

      <footer className="px-8 py-8 border-t border-white/10 text-center text-sm text-neutral-600">
        portfolio-site
      </footer>
    </div>
  )
}

export default App
