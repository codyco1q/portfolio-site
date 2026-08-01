import { Play, CalendarCheck } from 'lucide-react'
import Reveal from './Reveal'
import Section from './Section'
import Magnetic from './Magnetic'

const DEMO_VIDEO_URL = import.meta.env.VITE_DEMO_VIDEO_URL ?? ''
const DEMO_YOUTUBE_ID = import.meta.env.VITE_DEMO_YOUTUBE_ID ?? ''
const DEMO_LABEL = import.meta.env.VITE_DEMO_LABEL ?? ''

const hasVideo = DEMO_VIDEO_URL !== '' || DEMO_YOUTUBE_ID !== ''

const DemoShowcase = () => {
  return (
    <Section
      id="demo"
      eyebrow="See It In Action"
      title="Watch the Systems Run Live"
      subtitle="A 60-second walkthrough of the AI voice agents, automation engines, and funnels working end-to-end."
    >
      <Reveal className="mt-4" y={16}>
        {hasVideo ? (
          <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden border border-zinc-800 shadow-[0_0_50px_-15px_rgba(255,255,255,0.15)]">
            {DEMO_YOUTUBE_ID ? (
              <iframe
                src={`https://www.youtube.com/embed/${DEMO_YOUTUBE_ID}`}
                title={DEMO_LABEL || 'Live automation demo'}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={DEMO_VIDEO_URL} controls className="w-full h-full object-cover" />
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl border border-dashed border-zinc-700/60 bg-zinc-900/30 flex flex-col items-center justify-center gap-5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/10 via-transparent to-transparent" />
              <div className="w-16 h-16 rounded-full bg-zinc-800/60 border border-zinc-700 flex items-center justify-center">
                <Play className="w-6 h-6 text-zinc-400 ml-0.5" />
              </div>
              <div className="text-center px-6">
                <p className="text-sm text-zinc-400 mb-1">
                  Live walkthrough of the AI voice agents &amp; automation engines
                </p>
                <p className="text-xs text-zinc-600">
                  Demo video drops in soon — request the private walkthrough below.
                </p>
              </div>
              <Magnetic>
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 bg-white text-neutral-950 px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
                >
                  <CalendarCheck className="w-4 h-4" />
                  See It Live
                </a>
              </Magnetic>
            </div>
          </div>
        )}
      </Reveal>
    </Section>
  )
}

export default DemoShowcase
