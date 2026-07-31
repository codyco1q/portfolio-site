import { Globe, Palette, Sparkles, Gauge } from 'lucide-react'

const features = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Responsive, performant web applications built with modern frameworks like React, Next.js, and TypeScript.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Intuitive interfaces and seamless user experiences crafted through research, iteration, and attention to detail.',
  },
  {
    icon: Sparkles,
    title: 'Animation & Motion',
    description: 'Buttery-smooth GSAP animations and micro-interactions that bring digital products to life.',
  },
  {
    icon: Gauge,
    title: 'Performance Optimization',
    description: 'Lightning-fast load times, SEO best practices, and accessibility-first development out of the box.',
  },
]

const Features = () => {
  return (
    <section id="work" className="py-24 px-8 bg-neutral-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-neutral-500 mb-4">What I Do</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Services & Expertise
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            From concept to deployment, I deliver polished digital experiences that perform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group bg-neutral-900 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-neutral-300" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
