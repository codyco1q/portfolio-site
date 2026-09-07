import {
  BellRing,
  Brain,
  CalendarClock,
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  FileAudio,
  GitBranch,
  GitFork,
  Languages,
  Layers,
  MessageSquareText,
  Mic,
  PhoneCall,
  ScanLine,
  Send,
  Share2,
  Sparkles,
  Tag,
  UserPlus,
  Wand2,
  Webhook,
  Zap,
} from 'lucide-react'
import Reveal from './Reveal'
import Section from './Section'
import SpotlightCard from './SpotlightCard'
import WorkflowSim, { type WorkflowStep } from './WorkflowSim'

const proofs: {
  icon: typeof Cpu
  title: string
  tech: string
  steps: WorkflowStep[]
}[] = [
  {
    icon: Cpu,
    title: 'Multi-Modal AI Asset & Image Generator',
    tech: 'Make.com · OpenAI · Gemini AI · Cloudinary',
    steps: [
      {
        icon: Webhook,
        label: 'Trigger',
        detail: 'Webhook fires when a new content request arrives',
        duration: '0.1s',
      },
      {
        icon: Sparkles,
        label: 'Generate',
        detail: 'Chains Gemini AI + DALL-E prompt pipeline',
        duration: '2.8s',
      },
      {
        icon: Wand2,
        label: 'Enhance',
        detail: 'Refines the image with AI post-processing',
        duration: '1.1s',
      },
      {
        icon: Cloud,
        label: 'Host',
        detail: 'Uploads to Cloudinary CDN',
        duration: '0.6s',
      },
      {
        icon: Database,
        label: 'Log',
        detail: 'Writes row to Google Sheets + notifies',
        duration: '0.3s',
      },
    ],
  },
  {
    icon: Share2,
    title: 'Autonomous Multi-Platform Social Publisher',
    tech: 'Make.com · Meta API · LinkedIn API',
    steps: [
      {
        icon: CalendarClock,
        label: 'Trigger',
        detail: 'Scheduled to run every 30 minutes',
        duration: '0.0s',
      },
      {
        icon: Layers,
        label: 'Dequeue',
        detail: 'Pulls next item from the media queue',
        duration: '0.2s',
      },
      {
        icon: GitFork,
        label: 'Route',
        detail: 'Applies channel rules to route content',
        duration: '0.4s',
      },
      {
        icon: Send,
        label: 'Publish',
        detail: 'Posts natively to Facebook, IG & LinkedIn',
        duration: '1.5s',
      },
      {
        icon: CheckCircle2,
        label: 'Confirm',
        detail: 'Validates 200 status & logs result',
        duration: '0.2s',
      },
    ],
  },
  {
    icon: GitBranch,
    title: 'Bilingual Conditional GHL Nurture Workflows',
    tech: 'GoHighLevel · Meta Lead Forms · Conditional Logic',
    steps: [
      {
        icon: Zap,
        label: 'Trigger',
        detail: 'Meta Lead Form fires on new lead',
        duration: '0.0s',
      },
      {
        icon: UserPlus,
        label: 'Enrich',
        detail: 'Appends contact + tags in GHL CRM',
        duration: '0.8s',
      },
      {
        icon: Languages,
        label: 'Branch',
        detail: 'Detects EN vs AR and splits the flow',
        duration: '0.2s',
      },
      {
        icon: MessageSquareText,
        label: 'Nurture',
        detail: 'Runs conditional email / SMS sequence',
        duration: '2.4s',
      },
      {
        icon: Tag,
        label: 'Update',
        detail: 'Syncs tags across 14,000+ contacts',
        duration: '1.8s',
      },
    ],
  },
  {
    icon: Mic,
    title: 'AI Voice & Audio Risk Analysis',
    tech: 'n8n · OpenAI Whisper · Retell AI',
    steps: [
      {
        icon: PhoneCall,
        label: 'Trigger',
        detail: 'Inbound / outbound call connects',
        duration: '0.0s',
      },
      {
        icon: FileAudio,
        label: 'Capture',
        detail: 'Records & streams the audio',
        duration: '0.5s',
      },
      {
        icon: ScanLine,
        label: 'Transcribe',
        detail: 'Whisper converts speech to text',
        duration: '1.6s',
      },
      {
        icon: Brain,
        label: 'Analyze',
        detail: 'LLM scores compliance risk',
        duration: '1.0s',
      },
      {
        icon: BellRing,
        label: 'Alert',
        detail: 'Fires Telegram + CRM alert',
        duration: '0.3s',
      },
    ],
  },
]

const ProofShowcase = () => {
  return (
    <Section
      id="automations"
      className="bg-zinc-950/30"
      eyebrow="Production Automation Engines"
      title="Battle-Tested AI &amp; Automation Architecture"
      subtitle="Simulated live execution — watch n8n, Make.com, Gemini AI, OpenAI, and GoHighLevel scenarios run end-to-end."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {proofs.map((item, i) => {
          const Icon = item.icon
          return (
            <Reveal key={item.title} className="h-full" delay={i * 0.08}>
              <SpotlightCard className="h-full bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-zinc-800/50 hover:border-zinc-600/50 transition-all duration-300 overflow-hidden">
                <div className="flex items-start gap-4 mb-5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-zinc-300" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-white break-words">{item.title}</h3>
                    <p className="text-xs text-zinc-500 mt-1 font-mono break-words">{item.tech}</p>
                  </div>
                </div>
                <WorkflowSim steps={item.steps} startIndex={i} />
              </SpotlightCard>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

export default ProofShowcase
