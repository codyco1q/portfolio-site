import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: 'Working with this developer was a game-changer for our startup. The site they built is fast, beautiful, and our users love it. Could not recommend more highly.',
    name: 'Sarah Chen',
    role: 'Founder, Lumina Health',
  },
  {
    quote: 'Incredible attention to detail. Every animation, every transition — it all feels intentional and polished. Exactly the level of quality we needed for our brand.',
    name: 'Marcus Webb',
    role: 'Creative Director, Studio Haze',
  },
  {
    quote: 'We came to them with a vague concept and left with a fully realized product. The entire process was smooth, communicative, and exceeded expectations.',
    name: 'Aisha Patel',
    role: 'Product Manager, Vertix',
  },
]

const Testimonials = () => {
  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            What Clients Say
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Real feedback from people I have had the pleasure of working with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-neutral-900 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-neutral-600 mb-4" />
              <p className="text-neutral-300 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="border-t border-white/10 pt-4">
                <div className="font-semibold text-white text-sm">{t.name}</div>
                <div className="text-neutral-500 text-xs mt-0.5">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
