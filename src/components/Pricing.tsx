import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Starter',
    price: '2,500',
    description: 'A clean, responsive single-page site to establish your online presence.',
    features: [
      'Single-page design',
      'Responsive layout',
      'Basic animations',
      'SEO optimization',
      '1 revision round',
    ],
  },
  {
    name: 'Professional',
    price: '6,500',
    description: 'A multi-page web app with custom interactions and a polished backend.',
    featured: true,
    features: [
      'Up to 5 pages',
      'Custom UI/UX design',
      'GSAP animations',
      'CMS integration',
      'Performance tuning',
      '3 revision rounds',
    ],
  },
  {
    name: 'Enterprise',
    price: '12,000',
    description: 'A fully custom platform with advanced features and ongoing support.',
    features: [
      'Unlimited pages',
      'Full-stack development',
      'Complex animations',
      'Database & auth',
      'CI/CD & hosting setup',
      'Unlimited revisions',
      '30 days support',
    ],
  },
]

const Pricing = () => {
  return (
    <section className="py-24 px-8 bg-neutral-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Flat-rate projects with no hidden fees. Every engagement starts with a discovery call.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                tier.featured
                  ? 'bg-white text-neutral-950 border-white scale-105 md:scale-110'
                  : 'bg-neutral-900 border-white/10 hover:border-white/30 text-white'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-950 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                  Most Popular
                </div>
              )}
              <h3 className={`text-lg font-semibold mb-1 ${tier.featured ? 'text-neutral-950' : 'text-white'}`}>{tier.name}</h3>
              <p className={`text-sm mb-4 ${tier.featured ? 'text-neutral-600' : 'text-neutral-400'}`}>{tier.description}</p>
              <div className={`text-3xl font-bold mb-6 ${tier.featured ? 'text-neutral-950' : 'text-white'}`}>
                ${tier.price}
                <span className={`text-base font-normal ${tier.featured ? 'text-neutral-500' : 'text-neutral-500'}`}> USD</span>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.featured ? 'text-neutral-950' : 'text-neutral-400'}`} />
                    <span className={`text-sm ${tier.featured ? 'text-neutral-700' : 'text-neutral-300'}`}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center text-sm font-medium py-3 rounded-full transition-colors ${
                  tier.featured
                    ? 'bg-neutral-950 text-white hover:bg-neutral-800'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
