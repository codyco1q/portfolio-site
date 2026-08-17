import { ArrowRight } from 'lucide-react'
import Magnetic from './Magnetic'
import Reveal from './Reveal'

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-8 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-neutral-950 to-neutral-950" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-zinc-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative">
        <Reveal y={16}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-500/20 bg-zinc-900/50 backdrop-blur-sm text-zinc-400 text-xs mb-8 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ~/cody
            <span className="text-zinc-600">$</span> deploy --autonomous
            <span className="inline-block w-2 h-4 bg-zinc-400 animate-blink" aria-hidden="true" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-6">
            <span className="text-white">Autonomous Systems.</span>
            <br />
            <span className="bg-gradient-to-r from-zinc-200 via-white to-zinc-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              Infinite Scalability.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
            I architect AI-powered voice agents, multi-platform automation engines, and high-converting
            sales funnels that run without you.
          </p>
        </Reveal>

        <Reveal delay={0.3} immediate>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Magnetic>
              <a
                href="#funnels"
                className="inline-flex items-center gap-2 bg-white text-neutral-950 px-8 py-4 rounded-full text-sm font-medium hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)]"
              >
                Explore Live Funnels
                <ArrowRight className="w-4 h-4" />
              </a>
            </Magnetic>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium text-zinc-300 border border-zinc-500/30 hover:bg-zinc-900 transition-colors"
            >
              View Services
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.45} y={0}>
          <div className="mt-16 text-zinc-600" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto animate-bounce">
              <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Hero
