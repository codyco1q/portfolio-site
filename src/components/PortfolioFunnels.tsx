import { useState } from 'react'
import { ExternalLink, Images, Sparkles } from 'lucide-react'
import Reveal from './Reveal'
import Section from './Section'
import SpotlightCard from './SpotlightCard'
import WorkProofModal from './WorkProofModal'

interface FunnelItem {
  title: string
  badge?: string
  description: string
  urls?: { label: string; href: string }[]
  isProofGallery?: boolean
  proofCount?: number
}

const funnels: FunnelItem[] = [
  {
    title: 'Fusion 44X Lead Engine',
    badge: 'Most Recent — 2026',
    urls: [{ label: 'Live Lead Engine Funnel', href: 'https://go.fusion44x.com/' }],
    description:
      'Flagship 2026 direct-response funnel integrated with Supabase database architecture and a centralized live dashboard. Features full Meta event tracking, unique visitor session creation with lead source attribution, and automated zero-latency follow-up sequences across form and calendar submissions.',
  },
  {
    title: 'LingoVantage English Teaching Platform & LMS',
    badge: 'Full EdTech Platform · Supabase & Telegram',
    urls: [{ label: 'Live Platform', href: 'https://lingovantage.pages.dev/' }],
    description:
      'Complete online English learning academy featuring tiered student portals (A1/A2), automated auth, Supabase database with access governance, free auto-graded placement exams, interactive tests, homework submissions, and automated Telegram-to-WhatsApp registration dispatch.',
  },
  {
    title: 'Automated Webinar Registration Engine',
    urls: [{ label: 'Live Registration Funnel', href: 'https://webinar.gmc-llc.net/register' }],
    description:
      'High-converting webinar registration funnel built for deadline-driven campaign launches, automated attendee tagging, and instant reminder triggers.',
  },
  {
    title: 'Jarvis AI Platform & Conversion Funnel',
    urls: [
      { label: 'Core Platform & AI Chatbot', href: 'https://jarvisalgo.ai/' },
      { label: '7-Day Trial Sales Funnel', href: 'https://funnel.jarvisalgo.ai/' },
    ],
    description:
      'AI-powered market analysis ecosystem featuring an interactive intelligent chatbot, an automated merchandise store, and a high-converting 7-day trial sales funnel.',
  },
  {
    title: 'Tadarab Enterprise GHL Automation Engine',
    badge: 'Automation Job · GHL Infrastructure',
    description:
      'Full GoHighLevel backend automation architecture — featuring dynamic bilingual language-filtered nurture sequences, custom CRM sales & student pipelines, and high-conversion branded email templates.',
    isProofGallery: true,
    proofCount: 4,
  },
  {
    title: 'GMC Skool Community Onboarding Funnel',
    urls: [{ label: 'Join Community Funnel', href: 'https://skool.gmc-llc.net/join-page' }],
    description:
      'High-converting one-page direct onboarding funnel engineered to drive members directly into the GMC Skool community ecosystem with seamless lead capture.',
  },
  {
    title: 'High-Ticket VSL & Call Booking System',
    urls: [{ label: 'Multi-Step VSL Funnel', href: 'https://book-a-call.gmc-llc.net/step1-page' }],
    description:
      'Conversion-optimized multi-step video sales letter and calendar booking funnel with automated GHL qualification.',
  },
  {
    title: 'Special Offer E-Commerce Funnel',
    urls: [{ label: 'Product Landing Page', href: 'https://ebooks.gmc-llc.net/special-offer' }],
    description:
      'Direct-response digital product landing page optimized for high cold-traffic conversion rates.',
  },
]

const PortfolioFunnels = () => {
  const [proofModalOpen, setProofModalOpen] = useState(false)

  return (
    <>
      <Section
        id="funnels"
        eyebrow="Featured Live Systems"
        title="Featured Live Funnels, Systems &amp; Work Proofs"
        subtitle="Custom high-converting sales systems, automated workflow architectures, and client production systems."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {funnels.map((funnel, i) => (
            <Reveal key={funnel.title} className="h-full" delay={i * 0.08}>
              <SpotlightCard className="h-full flex flex-col justify-between bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-zinc-800/50 hover:border-zinc-600/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    {funnel.badge && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-300/90 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-0.5">
                        <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
                        {funnel.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 leading-snug break-words">
                    {funnel.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5 break-words">
                    {funnel.description}
                  </p>
                </div>

                <div>
                  {funnel.isProofGallery ? (
                    <div className="space-y-2.5">
                      <button
                        type="button"
                        onClick={() => setProofModalOpen(true)}
                        className="w-full flex items-center justify-between gap-2 text-sm text-emerald-300/90 bg-emerald-400/10 hover:bg-emerald-400/20 border border-emerald-400/25 hover:border-emerald-400/40 rounded-xl px-3.5 py-2.5 transition-all group/btn cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Images className="w-4 h-4 text-emerald-400" />
                          <span className="font-medium">View Work Screenshots (4 Proofs)</span>
                        </span>
                        <span className="text-xs text-emerald-400 group-hover/btn:translate-x-0.5 transition-transform">
                          Open &rarr;
                        </span>
                      </button>
                      <div className="text-[11px] font-mono text-zinc-500 text-center">
                        All workflows &amp; branching flows built natively on GHL
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {funnel.urls?.map((url) => (
                        <a
                          key={url.href}
                          href={url.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${url.label} (opens in new tab)`}
                          className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors group/link min-w-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5 shrink-0 text-zinc-500 group-hover/link:text-zinc-300" />
                          <span className="border-b border-zinc-700 group-hover/link:border-zinc-400 truncate">
                            {url.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {proofModalOpen && <WorkProofModal onClose={() => setProofModalOpen(false)} />}
    </>
  )
}

export default PortfolioFunnels
