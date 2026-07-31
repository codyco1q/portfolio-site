import { Database, Globe, TrendingUp, Cpu } from 'lucide-react'

const stats = [
  {
    icon: Database,
    value: '20,000+',
    label: 'Records Processed & Managed',
  },
  {
    icon: Globe,
    value: '6+ Live Funnels',
    label: 'Production Websites & VSL Engines Deployed',
  },
  {
    icon: TrendingUp,
    value: '30 – 40%',
    label: 'Measurable Operations Efficiency Gain',
  },
  {
    icon: Cpu,
    value: '100% Autonomous',
    label: 'AI Content, Voice & Lead Routing',
  },
]

const Stats = () => {
  return (
    <section className="py-20 px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-zinc-950/30 to-neutral-950" />
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800/50 rounded-2xl overflow-hidden border border-zinc-800/50 backdrop-blur-xl">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="bg-neutral-950/80 p-8 text-center group hover:bg-zinc-900/60 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-zinc-300" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider leading-relaxed">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Stats
