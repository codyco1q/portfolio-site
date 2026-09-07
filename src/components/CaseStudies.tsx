import { ArrowUpRight, Bot, GraduationCap, Rocket, Video } from 'lucide-react'
import Reveal from './Reveal'
import Section from './Section'
import SpotlightCard from './SpotlightCard'

const DEMO_VIDEO_URL = import.meta.env.VITE_DEMO_VIDEO_URL ?? ''

const caseStudies = [
  {
    icon: Rocket,
    client: 'Fusion 44X',
    title: 'Fusion 44X Lead Engine & CRM Funnel',
    summary:
      'Most recent 2026 flagship project: connected to a Supabase database with a real-time metrics dashboard. Fully tracked with all Meta events, per-visit session creation, lead source attribution, and automated follow-ups across form and calendar submissions.',
    metrics: [
      { value: '100%', label: 'Meta Events Tracked' },
      { value: 'Supabase', label: 'Database & Dash' },
      { value: 'Auto', label: 'Follow-Up Engine' },
    ],
    stack: ['Supabase', 'Meta Pixel & CAPI', 'Session Tracking', 'React', 'Make.com'],
    href: 'https://go.fusion44x.com/',
  },
  {
    icon: GraduationCap,
    client: 'LingoVantage',
    title: 'English Learning Platform & Automated Student Portal',
    summary:
      'Comprehensive online English academy featuring an automated student portal with A1/A2 tiered levels, Supabase database with admin access governance, auto-graded placement exams, homework submission pipelines, and real-time Telegram-to-WhatsApp registration dispatch.',
    metrics: [
      { value: 'A1–A2+', label: 'Student Portals' },
      { value: 'Instant', label: 'Auto-Graded Exam' },
      { value: 'Supabase', label: 'Access Control' },
    ],
    stack: ['Supabase', 'Student Portal', 'Telegram Bot', 'WhatsApp API', 'Auto Grading'],
    href: 'https://lingovantage.pages.dev/',
  },
  {
    icon: Bot,
    client: 'Jarvis AI',
    title: 'AI Trading Platform & Conversion Funnel',
    summary:
      'Full web architecture for an AI market analysis platform — featuring a 24/7 intelligent chatbot, automated merchandise store, and high-converting 7-day trial funnel.',
    metrics: [
      { value: '24/7', label: 'AI Chatbot' },
      { value: 'E-Com', label: 'Merch Portal' },
      { value: '7-Day', label: 'Trial Funnel' },
    ],
    stack: ['AI Chatbot', 'React', 'E-Commerce', 'Signal Engine'],
    href: 'https://jarvisalgo.ai/',
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {caseStudies.map((study, i) => {
          const Icon = study.icon
          return (
            <Reveal key={study.title} className="h-full" delay={i * 0.08}>
              <SpotlightCard className="h-full flex flex-col bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-zinc-800/50 hover:border-zinc-600/50 transition-all duration-300 overflow-hidden">
                <div className="flex items-center justify-between mb-4 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-zinc-300" />
                  </div>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider truncate ml-3">
                    {study.client}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-white mb-2 leading-snug">{study.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5">{study.summary}</p>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl bg-zinc-950/60 border border-zinc-800/70 px-1 sm:px-2 py-2 sm:py-3 text-center min-w-0 overflow-hidden">
                      <div className="text-sm sm:text-base lg:text-lg font-bold text-white leading-none mb-1 truncate" title={m.value}>{m.value}</div>
                      <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider leading-tight break-words">
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
                  aria-label={`${study.title} — View live funnel (opens in new tab)`}
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
            <video src={DEMO_VIDEO_URL} controls className="w-full h-full object-contain bg-black" />
          </div>
        </Reveal>
      )}
    </Section>
  )
}

export default CaseStudies
