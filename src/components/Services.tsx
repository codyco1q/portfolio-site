import { Phone, Sparkles, Globe, Workflow } from 'lucide-react'

const services = [
  {
    icon: Phone,
    title: 'AI Voice Agents & Cold Calling Systems',
    description:
      'Deploy inbound/outbound Retell AI agents for lead qualification, booking, and instant follow-up — no human dialer needed.',
  },
  {
    icon: Sparkles,
    title: 'Multi-Modal AI Content Engines',
    description:
      'Build zero-human content dispatches using OpenAI, Gemini AI, and Cloudinary pipelines that generate, host, and publish autonomously.',
  },
  {
    icon: Globe,
    title: 'High-Converting Sales Funnels & Web Systems',
    description:
      'Design and deploy high-speed VSLs, webinar funnels, and corporate web platforms engineered for conversion at scale.',
  },
  {
    icon: Workflow,
    title: 'Complex CRM & Workflow Architecture',
    description:
      'Implement multi-branch GoHighLevel, n8n, and Make.com backend engines that route, nurture, and alert across 10,000+ contacts.',
  },
]

const Services = () => {
  return (
    <section id="services" className="py-24 px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-zinc-950/20 to-neutral-950" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">
            What I Build
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Enterprise AI Automation &amp; Funnel Engineering
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            End-to-end autonomous systems that replace manual workflows with intelligent, scalable architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/50 hover:border-zinc-600/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-zinc-300" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
