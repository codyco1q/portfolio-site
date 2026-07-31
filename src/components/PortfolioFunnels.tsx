import { ExternalLink } from 'lucide-react'

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
    <section id="funnels" className="py-24 px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-zinc-950/20 to-neutral-950" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">
            Featured Live Funnels
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Featured Live Funnels &amp; Web Architectures
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Custom high-converting sales systems, webinar engines, and product landing pages built for global clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {funnels.map((funnel) => (
            <div
              key={funnel.title}
              className="group bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/50 hover:border-zinc-600/50 transition-all duration-300 hover:-translate-y-1"
            >
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PortfolioFunnels
