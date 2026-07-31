import { Cpu, Share2, GitBranch, Mic } from 'lucide-react'

const proofs = [
  {
    icon: Cpu,
    title: 'Multi-Modal AI Asset & Image Generator',
    tech: 'Make.com, OpenAI, Google Gemini AI, Cloudinary, Google Sheets',
    features: [
      'Dynamic image generation chaining Gemini AI and DALL-E',
      'Automatic cloud hosting via Cloudinary',
      'Real-time database row logging',
    ],
  },
  {
    icon: Share2,
    title: 'Autonomous Multi-Platform Social Publisher',
    tech: 'Make.com, Webhooks, Router logic, Meta API, LinkedIn API',
    features: [
      'Iterates through media queues and processes dynamic HTTP payloads',
      'Routes content based on channel rules',
      'Posts natively to Facebook Pages, Instagram, and LinkedIn',
    ],
  },
  {
    icon: GitBranch,
    title: 'Bilingual Conditional GHL Nurture Workflows',
    tech: 'GoHighLevel, Meta Lead Forms, Conditional Logic',
    features: [
      'Multi-branching campaign architecture splitting EN/AR languages automatically',
      'Tracks email opens/timeouts with conditional follow-ups',
      'Executes tag updates across 14,000+ contacts',
    ],
  },
  {
    icon: Mic,
    title: 'AI Voice & Audio Risk Analysis Systems',
    tech: 'n8n, OpenAI Whisper, Retell AI, Documentero',
    features: [
      'Inbound/outbound AI calling agents for lead qualification',
      'Transcription analysis and automatic compliance report generation',
      'Instant Telegram/CRM alerts',
    ],
  },
]

const ProofShowcase = () => {
  return (
    <section id="proof" className="py-24 px-8 relative">
      <div className="absolute inset-0 bg-zinc-950/30" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">
            Battle-Tested AI &amp; Automation Architecture
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Battle-Tested AI &amp; Automation Architecture
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Live backend visual execution nodes powered by n8n, Make.com, Gemini AI, OpenAI, and GoHighLevel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proofs.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/50 hover:border-zinc-600/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-zinc-300" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="text-xs text-zinc-500 mt-1 font-mono">{item.tech}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProofShowcase
