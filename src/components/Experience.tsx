import { useEffect, useState } from 'react'
import { Briefcase, Calendar, Download, FileText, MapPin, Mail, X } from 'lucide-react'
import Reveal from './Reveal'
import Section from './Section'

const roles = [
  {
    role: 'Founder & AI Automation Specialist',
    company: 'Mortal VA',
    period: '2023 – Present',
    location: 'Global (Remote)',
    highlights: [
      'Founded and scaled a virtual assistant agency delivering AI automation solutions globally.',
      'Built custom AI chatbots and voice agents for lead gen, appointment setting, and customer support.',
      'Developed complete CRM pipelines, onboarding flows, and automated websites achieving 30-40% efficiency gains.',
    ],
  },
  {
    role: 'AI Automation Consultant',
    company: 'GMC LLC',
    period: '2024 – 2026',
    location: 'Remote',
    highlights: [
      'Built full business infrastructure from scratch using GoHighLevel, n8n, Make.com, Zapier, and Hostinger.',
      'Architected multi-funnel ecosystem: Book-a-Call (with upsell/downsell), eBook, and high-ticket offer funnels.',
      'Integrated AI agents, WhatsApp automation, VoIP systems, and multi-stage GHL pipeline logic.',
    ],
  },
  {
    role: 'AI Automation Specialist',
    company: 'Helping Hands Systems',
    period: '2025',
    location: 'Remote',
    highlights: [
      'Engineered custom automation workflows for digital operations, lead acquisition, and onboarding.',
      'Integrated native APIs across no-code platforms to unify data streams and client communications.',
    ],
  },
  {
    role: 'Sales & Client Operations Lead',
    company: 'Total Post N Print',
    period: '2024 – 2025',
    highlights: [
      'Managed client relationships, closed deals, and handled internal coordination and invoicing.',
      'Mentored and trained incoming team members in pipeline management and support.',
    ],
  },
  {
    role: 'Lead Generation & Cold Outreach Specialist',
    company: 'Wholesale Real Estate & Solar',
    period: '2019 – 2022',
    highlights: [
      'Prospected and qualified high-ticket leads across real estate and solar sectors.',
      'Mastered phone sales negotiation, establishing the core domain expertise used in voice AI agent scripting.',
    ],
  },
]

const ResumeModal = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Resume"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-4xl bg-neutral-950 border border-zinc-700/60 rounded-2xl shadow-[0_0_60px_-15px_rgba(255,255,255,0.15)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <FileText className="w-4 h-4 text-zinc-400" />
            Resume — Moaz Shahin (Cody Axton)
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 transition-colors"
            aria-label="Close resume"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        <div className="h-[72vh]">
          <iframe
            src="/Moaz-Shahin-Resume.pdf"
            title="Moaz Shahin Resume"
            className="w-full h-full border-0 bg-white"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-zinc-800">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Mail className="w-3.5 h-3.5" />
            codyaxton@outlook.com
            <span className="text-zinc-700">|</span>
            <MapPin className="w-3.5 h-3.5" />
            Egypt (Remote)
          </div>
          <a
            href="/Moaz-Shahin-Resume.pdf"
            download
            className="inline-flex items-center gap-2 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 text-neutral-950 px-6 py-2.5 rounded-full text-sm font-medium hover:from-zinc-100 hover:via-zinc-50 hover:to-zinc-300 transition-all duration-300 shadow-[0_0_25px_-5px_rgba(255,255,255,0.25)]"
          >
            <Download className="w-4 h-4" />
            Download Resume (PDF)
          </a>
        </div>
      </div>
    </div>
  )
}

const Experience = () => {
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <>
      <Section
        id="experience"
        className="bg-zinc-950/30"
        eyebrow="Career Evolution"
        title="Engineering Autonomous Revenue Systems"
        subtitle="6+ years of building end-to-end automation infrastructures, high-converting sales funnels, and enterprise AI workflows."
        innerClassName="max-w-4xl"
      >

        <div className="relative space-y-8 before:absolute before:left-[19px] before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-zinc-600 before:via-zinc-800 before:to-zinc-600">
          {roles.map((role, i) => (
            <Reveal key={role.role} className="relative pl-14" delay={i * 0.06}>
              <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 via-zinc-900 to-zinc-800 border border-zinc-500/60 shadow-[0_0_15px_-3px_rgba(255,255,255,0.15)] flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-zinc-200" />
              </div>
              <div className="group relative bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/40 overflow-hidden hover:border-zinc-500/60 transition-all duration-300 shadow-[0_0_25px_-10px_rgba(255,255,255,0.12)]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent" />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h3 className="text-base font-semibold text-white">{role.role}</h3>
                  <span className="text-sm bg-gradient-to-r from-zinc-200 to-zinc-500 bg-clip-text text-transparent font-medium">
                    — {role.company}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {role.period}
                  </span>
                  {role.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {role.location}
                    </span>
                  )}
                </div>
                <ul className="space-y-2">
                  {role.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-zinc-400 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-zinc-200 to-zinc-600 mt-1.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setResumeOpen(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 text-neutral-950 px-8 py-4 rounded-full text-sm font-medium hover:from-zinc-100 hover:via-zinc-50 hover:to-zinc-300 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(255,255,255,0.25)]"
          >
            <FileText className="w-4 h-4" />
            View Full Resume
          </button>
          <a
            href="/Moaz-Shahin-Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium text-zinc-300 border border-zinc-500/30 hover:bg-zinc-900 hover:border-zinc-400/50 transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            Download Resume (PDF)
          </a>
        </div>
      </Section>

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </>
  )
}

export default Experience
