import { Search, Workflow, Rocket, TrendingUp } from 'lucide-react'
import Reveal from './Reveal'
import Section from './Section'

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Diagnose',
    description:
      'Free audit of your current funnel, CRM, and operations to pinpoint the bottlenecks and revenue leaks.',
  },
  {
    icon: Workflow,
    step: '02',
    title: 'Architect',
    description:
      'I design the full system — funnels, voice agents, and workflow logic mapped to your exact offer and audience.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Deploy',
    description:
      'Live builds in GoHighLevel, n8n, Make.com, and custom web systems — wired to your CRM and tested end-to-end.',
  },
  {
    icon: TrendingUp,
    step: '04',
    title: 'Optimize',
    description:
      'Ongoing monitoring, A/B testing, and iteration so the system keeps converting as your business scales.',
  },
]

const Process = () => {
  return (
    <Section
      id="process"
      className="bg-zinc-950/30"
      eyebrow="How I Work"
      title="From Diagnosis to Full Autonomy"
      subtitle="A proven delivery model — no black boxes, no surprises, just systems that run themselves."
      innerClassName="max-w-6xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => {
          const Icon = s.icon
          return (
            <Reveal key={s.step} className="h-full" delay={i * 0.08}>
              <div className="h-full relative bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/50 hover:border-zinc-600/50 transition-all duration-300 overflow-hidden">
                <div
                  className="absolute top-3 right-5 text-4xl font-bold text-zinc-800/40 select-none"
                  aria-hidden="true"
                >
                  {s.step}
                </div>
                <div className="w-10 h-10 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-zinc-300" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.description}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

export default Process
