import { useEffect, useState } from 'react'
import { Briefcase, ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from './Reveal'
import Section from './Section'

const clientResults = [
  {
    company: 'GMC LLC',
    tag: 'AI Automation Consultant · 2024–2026',
    summary:
      'Full business infrastructure built from scratch — GoHighLevel CRM with smart lists, tagging, and pipelines, a Book-a-Call funnel with upsell/downsell, eBook and high-ticket offer funnels, plus AI agents, WhatsApp automation, and phone systems.',
    metrics: ['Multi-funnel ecosystem', '30–40% efficiency gain', 'Fully automated ops'],
  },
  {
    company: 'Mortal VA',
    tag: 'Founder & AI Automation Specialist · 2023–Present',
    summary:
      'Scaled a virtual assistant agency on AI-powered automation — chatbots and voice agents for lead generation, customer service, and appointment setting, plus CRM pipelines, onboarding flows, and 5+ automated websites and funnels with integrated lead capture.',
    metrics: ['AI chat + voice agents', '5+ automated websites', 'Measured cost reduction'],
  },
  {
    company: 'Helping Hands Systems',
    tag: 'AI Automation Specialist · 2025',
    summary:
      'Designed and implemented automation systems for digital business operations — lead generation, onboarding, and communication workflows with APIs and tools integrated to streamline operations end-to-end.',
    metrics: ['Lead-gen workflows', 'API integrations', 'Streamlined operations'],
  },
]

const Testimonials = () => {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % clientResults.length), 6000)
    return () => clearInterval(id)
  }, [paused])

  const current = clientResults[index]

  return (
    <Section
      id="results"
      eyebrow="Client Results"
      title="Real Systems, Real Client Results"
      subtitle="Outcomes delivered for global clients — built, launched, and running autonomously."
      innerClassName="max-w-4xl"
    >
      <Reveal>
        <div
          className="relative bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-zinc-800/50"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="w-12 h-12 rounded-xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center mb-6">
            <Briefcase className="w-5 h-5 text-zinc-300" />
          </div>

          <div key={index} className="min-h-[230px] flex flex-col">
            <p className="text-lg md:text-xl text-zinc-200 leading-relaxed mb-8">{current.summary}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {current.metrics.map((m) => (
                <span
                  key={m}
                  className="text-xs font-mono text-emerald-300/90 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1.5"
                >
                  {m}
                </span>
              ))}
            </div>
            <div className="mt-auto">
              <div className="text-sm font-semibold text-white">{current.company}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{current.tag}</div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-between">
            <div className="flex gap-2">
              {clientResults.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Show result ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-zinc-200' : 'w-3 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIndex((index - 1 + clientResults.length) % clientResults.length)}
                aria-label="Previous result"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 hover:border-zinc-500 transition-colors text-zinc-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIndex((index + 1) % clientResults.length)}
                aria-label="Next result"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 hover:border-zinc-500 transition-colors text-zinc-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export default Testimonials
