import { useEffect, useRef, useState } from 'react'
import { Database, Globe, TrendingUp, Cpu } from 'lucide-react'

const stats = [
  {
    icon: Database,
    countTo: 20000,
    prefix: '',
    suffix: '+',
    label: 'Records Processed & Managed',
  },
  {
    icon: Globe,
    countTo: 6,
    prefix: '',
    suffix: '+',
    label: 'Production Websites & VSL Engines Deployed',
  },
  {
    icon: TrendingUp,
    countTo: 40,
    prefix: '30 – ',
    suffix: '%',
    label: 'Measurable Operations Efficiency Gain',
  },
  {
    icon: Cpu,
    value: '100% Autonomous',
    label: 'AI Content, Voice & Lead Routing',
  },
]

const useInViewOnce = (ref: React.RefObject<Element | null>) => {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return inView
}

const useCountUp = (target: number, inView: boolean, duration = 1600) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  return value
}

const StatValue = ({ stat }: { stat: (typeof stats)[number] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInViewOnce(ref)
  const count = useCountUp(stat.countTo ?? 0, inView)

  return (
    <div
      ref={ref}
      className="bg-neutral-950/80 p-8 text-center group hover:bg-zinc-900/60 transition-colors"
    >
      <div className="w-12 h-12 rounded-xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
        <stat.icon className="w-6 h-6 text-zinc-300" />
      </div>
      <div className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight tabular-nums">
        {stat.countTo !== undefined ? (
          <>
            {stat.prefix}
            {count.toLocaleString()}
            {stat.suffix}
          </>
        ) : (
          stat.value
        )}
      </div>
      <div className="text-xs text-zinc-500 uppercase tracking-wider leading-relaxed">{stat.label}</div>
    </div>
  )
}

const Stats = () => {
  return (
    <section className="py-20 px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-zinc-950/30 to-neutral-950" />
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800/50 rounded-2xl overflow-hidden border border-zinc-800/50 backdrop-blur-xl">
          {stats.map((stat) => (
            <StatValue key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
