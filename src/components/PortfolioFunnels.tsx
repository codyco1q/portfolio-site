import { ExternalLink } from 'lucide-react'
import Reveal from './Reveal'
import Section from './Section'
import SpotlightCard from './SpotlightCard'

const funnels = [
  {
    title: 'GMC Corporate Portal & Sales Ecosystem',
    urls: [
      { label: 'Core Platform', href: 'https://gmc-llc.net/' },
      { label: 'Lead Intake Funnel', href: 'https://funnel.gmc-llc.net/start' },
    ],
    description:
      'Core corporate platform and interactive lead intake funnel engineered for seamless client onboarding.',
  },
  {
    title: 'High-Ticket VSL & Call Booking System',
    urls: [{ label: 'Multi-Step VSL Funnel', href: 'https://book-a-call.gmc-llc.net/step1-page' }],
    description:
      'Conversion-optimized multi-step video sales letter and calendar booking funnel with automated GHL qualification.',
  },
  {
    title: 'Automated Webinar Registration Engine',
    urls: [{ label: 'Registration Page', href: 'https://webinar.gmc-llc.net/register' }],
    description:
      'High-converting webinar registration funnel built for deadline-driven campaign launches and instant notification triggers.',
  },
  {
    title: 'Special Offer E-Commerce Funnel',
    urls: [{ label: 'Product Landing Page', href: 'https://ebooks.gmc-llc.net/special-offer' }],
    description:
      'Direct-response digital product landing page optimized for high cold-traffic conversion rates.',
  },
  {
    title: 'Fusion 44X Lead Engine',
    urls: [{ label: 'Live Funnel', href: 'https://go.fusion44x.com/' }],
    description:
      'Next-gen product funnel featuring futuristic metallic aesthetics, fast load speeds, and automated lead capture.',
  },
]

const PortfolioFunnels = () => {
  return (
    <Section
      id="funnels"
      eyebrow="Featured Live Funnels"
      title="Featured Live Funnels &amp; Web Architectures"
      subtitle="Custom high-converting sales systems, webinar engines, and product landing pages built for global clients."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {funnels.map((funnel, i) => (
          <Reveal key={funnel.title} className="h-full" delay={i * 0.08}>
            <SpotlightCard className="h-full bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/50 hover:border-zinc-600/50 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-white mb-3 leading-snug">{funnel.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-5">{funnel.description}</p>
              <div className="space-y-2">
                {funnel.urls.map((url) => (
                  <a
                    key={url.href}
                    href={url.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors group/link"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 text-zinc-500 group-hover/link:text-zinc-300" />
                    <span className="border-b border-zinc-700 group-hover/link:border-zinc-400">
                      {url.label}
                    </span>
                  </a>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default PortfolioFunnels
