import { ArrowUpRight, LayoutDashboard, Rocket, Video } from 'lucide-react'
import Reveal from './Reveal'
import Section from './Section'
import SpotlightCard from './SpotlightCard'

const DEMO_VIDEO_URL = import.meta.env.VITE_DEMO_VIDEO_URL ?? ''

const caseStudies = [
  {
    icon: LayoutDashboard,
    client: 'GMC LLC',
    title: 'Corporate Portal & Multi-Funnel Ecosystem',
    summary:
      'Full business infrastructure built from scratch — CRM pipelines, onboarding flows, and a multi-funnel ecosystem spanning booking, eBook, and high-ticket offers.',
    metrics: [
      { value: '6+', label: 'Funnels Deployed' },
      { value: '30–40%', label: 'Efficiency Gain' },
      { value: '24/7', label: 'AI Lead Capture' },
    ],
    stack: ['GoHighLevel', 'n8n', 'Make.com', 'Hostinger'],
    href: 'https://gmc-llc.net/',
  },
  {
    icon: Video,
    client: 'GMC LLC',
    title: 'High-Ticket VSL & Call Booking System',
    summary:
      'Multi-step video sales letter and calendar booking funnel with automated GHL qualification, upsells, and instant AI follow-up.',
    metrics: [
      { value: '3-Step', label: 'VSL Funnel' },
      { value: 'Auto', label: 'GHL Qualification' },
      { value: '0', label: 'Manual Touchpoints' },
    ],
    stack: ['GoHighLevel', 'AI Voice Agents', 'VSL'],
    href: 'https://book-a-call.gmc-llc.net/step1-page',
  },
  {
    icon: Rocket,
    client: 'Fusion 44X',
    title: 'Fusion 44X Lead Engine',
    summary:
      'Next-gen product funnel with futuristic metallic aesthetics, sub-second load speeds, and fully automated lead capture into the CRM.',
    metrics: [
      { value: '100%', label: 'Automated Capture' },
      { value: '0', label: 'Manual Follow-ups' },
      { value: 'Fast', label: 'Load Speeds' },
    ],
    stack: ['Vite', 'React', 'Make.com'],
    href: 'https://go.fusion44x.com/',
  },
]

const CaseStudies = () => {
  return (
    <Section
      id="case-studies"
      className="bg-zinc-950/30"
      eyebrow="Case Studies"
      title="Automation Systems Built for Real Revenue"
      subtitle="End-to-end infrastructure that runs itself — from lead capture to booking, qualification, and follow-up."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {caseStudies.map((study, i) => {
          const Icon = study.icon
          return (
            <Reveal key={study.title} className="h-full" delay={i * 0.08}>
              <SpotlightCard className="h-full flex flex-col bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/50 hover:border-zinc-600/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-zinc-300" />
                  </div>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    {study.client}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{study.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-5">{study.summary}</p>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl bg-zinc-950/60 border border-zinc-800/70 px-2 py-3 text-center">
                      <div className="text-lg font-bold text-white leading-none mb-1.5">{m.value}</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {study.stack.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-full px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={study.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-sm text-zinc-300 hover:text-white transition-colors"
                >
                  View Live Funnel
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </SpotlightCard>
            </Reveal>
          )
        })}
      </div>

      {DEMO_VIDEO_URL && (
        <Reveal className="mt-16" y={16}>
          <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden border border-zinc-800 shadow-[0_0_50px_-15px_rgba(255,255,255,0.15)]">
            <video src={DEMO_VIDEO_URL} controls className="w-full h-full object-cover" />
          </div>
        </Reveal>
      )}
    </Section>
  )
}

export default CaseStudies
