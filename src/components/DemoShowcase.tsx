import { CalendarCheck, Database, Repeat, Send } from 'lucide-react'
import Reveal from './Reveal'
import Section from './Section'
import Magnetic from './Magnetic'
import WorkflowCanvas, { type WorkflowNode } from './WorkflowCanvas'

const DEMO_VIDEO_URL = import.meta.env.VITE_DEMO_VIDEO_URL ?? ''
const DEMO_YOUTUBE_ID = import.meta.env.VITE_DEMO_YOUTUBE_ID ?? ''
const DEMO_LABEL = import.meta.env.VITE_DEMO_LABEL ?? ''

const hasVideo = DEMO_VIDEO_URL !== '' || DEMO_YOUTUBE_ID !== ''

const DEMO_WORKFLOW: WorkflowNode[] = [
  {
    icon: CalendarCheck,
    label: 'Appointment Booked',
    detail: 'Client submits — slot instantly confirmed',
    duration: '0.0s',
    accent: 'emerald',
  },
  {
    icon: Database,
    label: 'CRM + Pipeline',
    detail: 'Contact tagged & added to pipeline',
    duration: '0.4s',
    accent: 'sky',
  },
  {
    icon: Send,
    label: 'Email · Telegram',
    detail: 'Client + team alerted via both channels',
    duration: '0.3s',
    accent: 'violet',
  },
  {
    icon: Repeat,
    label: 'Auto Follow-Up',
    detail: 'Reminds, nurtures, escalates until reply',
    duration: '2.0s',
    accent: 'amber',
  },
]

const DemoShowcase = () => {
  return (
    <Section
      id="demo"
      eyebrow="See It In Action"
      title="Watch the Systems Run Live"
      subtitle="A single form submission flowing through the CRM, notifications, and auto follow-up — simulated live exactly like a production n8n or Make.com scenario."
    >
      <Reveal className="mt-4" y={16}>
        {hasVideo ? (
          <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden border border-zinc-800 shadow-[0_0_50px_-15px_rgba(255,255,255,0.15)]">
            {DEMO_YOUTUBE_ID ? (
              <iframe
                src={`https://www.youtube.com/embed/${DEMO_YOUTUBE_ID}`}
                title={DEMO_LABEL || 'Live automation demo'}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={DEMO_VIDEO_URL} controls className="w-full h-full object-contain bg-black" />
            )}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-8">
            <WorkflowCanvas
              nodes={DEMO_WORKFLOW}
              loopNote="Auto follow-up loops every 2 days until the client replies or converts."
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Magnetic>
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 bg-white text-neutral-950 px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
                >
                  <CalendarCheck className="w-4 h-4" />
                  See It Live
                </a>
              </Magnetic>
              <p className="text-xs font-mono text-zinc-500">
                GoHighLevel · Make.com · n8n
              </p>
            </div>
          </div>
        )}
      </Reveal>
    </Section>
  )
}

export default DemoShowcase
