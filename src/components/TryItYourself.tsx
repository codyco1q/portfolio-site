import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  Bot,
  Calendar,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock,
  Database,
  FileText,
  Play,
  Repeat,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  Terminal,
  UserCircle,
  Zap,
} from 'lucide-react'
import { inputClass, prefersReducedMotion } from '../lib/utils'
import Section from './Section'
import Reveal from './Reveal'

const DATE_OPTIONS = (() => {
  const opts: { value: string; weekday: string; day: number; month: string }[] = []
  const today = new Date()
  for (let i = 1; i <= 10; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    opts.push({
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
      day: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    })
  }
  return opts
})()

const TIME_SLOTS = Array.from({ length: 12 }, (_, i) => {
  const minutes = 9 * 60 + i * 30
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
})

const formatTime = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

const STEPS = [
  {
    icon: Send,
    label: 'Webhook Received',
    detail: 'Booking POST received by Make.com',
    delay: 600,
    accent: 'emerald' as const,
    run: (data: Record<string, unknown>) => ({
      payload: JSON.stringify(
        {
          event: 'booking.created',
          name: data.name,
          email: data.email,
          date: data.date,
          time: data.time,
          startDateTime: `${data.date}T${data.time}:00`,
          source: 'portfolio_demo',
          webhookId: data.webhookId,
        },
        null,
        2,
      ),
      log: `[${data.timestamp}] POST /webhook/booking → 200 OK (${(Math.random() * 40 + 20).toFixed(0)}ms)`,
    }),
  },
  {
    icon: Shield,
    label: 'Data Validated',
    detail: 'Schema check & email verification',
    delay: 500,
    accent: 'sky' as const,
    run: (data: Record<string, unknown>) => ({
      payload: JSON.stringify(
        {
          schema: 'v2.1',
          fields: {
            name: { valid: true, sanitised: data.name },
            email: { valid: true, disposable: false, provider: (data.email as string).split('@')[1] },
            date: { valid: true, businessHours: true },
            time: { valid: true, slotAvailable: true },
          },
          result: 'ALL_FIELDS_VALID',
        },
        null,
        2,
      ),
      log: `[${data.timestamp}] ✓ Validation passed — all 4 fields conform to schema`,
    }),
  },
  {
    icon: Database,
    label: 'CRM Pipeline',
    detail: 'Contact created & deal staged',
    delay: 800,
    accent: 'violet' as const,
    run: (data: Record<string, unknown>) => ({
      payload: JSON.stringify(
        {
          action: 'upsert_contact',
          contact: {
            name: data.name,
            email: data.email,
            tags: ['portfolio_demo', 'strategy_call', 'inbound'],
            source: 'website_form',
          },
          deal: {
            title: `Strategy Call — ${data.name}`,
            stage: 'qualified_lead',
            value: 2500,
            currency: 'USD',
          },
          pipeline: 'Inbound Leads',
        },
        null,
        2,
      ),
      log: `[${data.timestamp}] CRM: contact upserted, deal created in "Inbound Leads" pipeline`,
    }),
  },
  {
    icon: CalendarCheck,
    label: 'Calendar Event',
    detail: 'Google Meet link generated',
    delay: 700,
    accent: 'emerald' as const,
    run: (data: Record<string, unknown>) => ({
      payload: JSON.stringify(
        {
          action: 'create_event',
          summary: `Strategy Call with ${data.name}`,
          start: `${data.date}T${data.time}:00`,
          end: `${data.date}T${String(Number((data.time as string).split(':')[0]) + 1).padStart(2, '0')}:${(data.time as string).split(':')[1]}:00`,
          attendees: [data.email],
          meetLink: `https://meet.google.com/abc-defg-hij`,
          icsAttachment: true,
        },
        null,
        2,
      ),
      log: `[${data.timestamp}] Calendar: event created, Google Meet link generated`,
    }),
  },
  {
    icon: Send,
    label: 'Email + Telegram',
    detail: 'Confirmation sent to client & team',
    delay: 600,
    accent: 'sky' as const,
    run: (data: Record<string, unknown>) => ({
      payload: JSON.stringify(
        {
          email: {
            to: data.email,
            subject: `Strategy Call Confirmed — ${data.date}`,
            template: 'booking_confirmation',
            includeICS: true,
          },
          telegram: {
            chatId: '@cody_automations',
            message: `📅 New booking!\n👤 ${data.name}\n📧 ${data.email}\n📆 ${data.date} at ${formatTime(data.time as string)}`,
          },
        },
        null,
        2,
      ),
      log: `[${data.timestamp}] Notifications: email delivered, Telegram alert sent`,
    }),
  },
  {
    icon: Repeat,
    label: 'Auto Follow-Up',
    detail: 'Smart nurture sequence scheduled',
    delay: 500,
    accent: 'amber' as const,
    run: (data: Record<string, unknown>) => ({
      payload: JSON.stringify(
        {
          sequence: [
            { delay: '1h', action: 'send_reminder', channel: 'email' },
            { delay: '24h', action: 'send_prep_guide', channel: 'email' },
            { delay: '-2h', action: 'send_meeting_link', channel: 'sms' },
          ],
          rules: { cancelOnReply: true, rescheduleLimit: 2 },
          status: 'SCHEDULED',
        },
        null,
        2,
      ),
      log: `[${data.timestamp}] Follow-up: 3-step nurture sequence scheduled`,
    }),
  },
  {
    icon: Zap,
    label: 'Complete',
    detail: 'Full pipeline live — all systems green',
    delay: 400,
    accent: 'emerald' as const,
    run: () => ({
      payload: null,
      log: '',
    }),
  },
]

const TryItYourself = () => {
  const [phase, setPhase] = useState<'form' | 'running'>('form')

  // Form state
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')

  // Automation state
  const [activeStep, setActiveStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [logs, setLogs] = useState<string[]>([])
  const [payloads, setPayloads] = useState<(string | null)[]>([])
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set())
  const [elapsed, setElapsed] = useState(0)
  const [automationDone, setAutomationDone] = useState(false)

  // Refs for cleanup
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef(0)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const canSubmit = name.trim() !== '' && emailValid && selectedDate !== '' && selectedTime !== ''

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const runAutomation = () => {
    const webhookId = `wh_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
    const ts = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

    const data: Record<string, unknown> = {
      name: name.trim(),
      email: email.trim(),
      date: selectedDate,
      time: selectedTime,
      notes: notes.trim(),
      webhookId,
      timestamp: ts,
    }

    setPhase('running')
    startTimeRef.current = Date.now()
    setElapsed(0)

    intervalRef.current = setInterval(() => {
      setElapsed((Date.now() - startTimeRef.current) / 1000)
    }, 100)

    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    let cumDelay = 300

    STEPS.forEach((step, i) => {
      const stepDelay = cumDelay
      const activateTimer = setTimeout(() => {
        setActiveStep(i)
        const result = step.run(data)
        if (result.log) {
          setLogs((prev) => [...prev, result.log])
        }
        setPayloads((prev) => {
          const next = [...prev]
          next[i] = result.payload
          return next
        })
      }, stepDelay)
      timersRef.current.push(activateTimer)

      const completeTimer = setTimeout(() => {
        setCompletedSteps((prev) => new Set(prev).add(i))
        if (i === STEPS.length - 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setAutomationDone(true)
        }
      }, stepDelay + step.delay)
      timersRef.current.push(completeTimer)

      cumDelay += step.delay + 200
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    runAutomation()
  }

  const togglePayload = (index: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const reset = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    if (intervalRef.current) clearInterval(intervalRef.current)
    setPhase('form')
    setActiveStep(-1)
    setCompletedSteps(new Set())
    setLogs([])
    setPayloads([])
    setExpandedSteps(new Set())
    setElapsed(0)
    setAutomationDone(false)
    setSelectedDate('')
    setSelectedTime('')
    setName('')
    setEmail('')
    setNotes('')
  }

  /* ── FORM PHASE ─────────────────────────────────────────────────── */
  if (phase === 'form') {
    return (
      <Section
        id="demo"
        eyebrow="Try It Yourself"
        title="Test a Booking Automation, Live"
        subtitle="This is a simulated demo — not a real booking. Fill in any name and email, submit, and watch the automation pipeline process your test lead step by step in real time."
        innerClassName="max-w-2xl"
      >
        <Reveal className="mt-4" y={16}>
          {/* Demo mode banner */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 mb-6 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-px" />
            <p className="text-xs text-amber-200/80 leading-relaxed">
              <span className="font-semibold text-amber-300">Demo mode.</span> This is a simulated
              test — no data leaves your browser. Fill in anything, submit, and watch how every lead
              booking gets captured, validated, and followed up automatically.
            </p>
          </div>

          {/* Form card */}
          <div className="rounded-2xl bg-gradient-to-b from-zinc-200/40 via-zinc-600/30 to-zinc-900/70 p-px shadow-[0_0_60px_-15px_rgba(255,255,255,0.15)]">
            <div className="bg-neutral-950 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide">
                    Booking Automation · Interactive Demo
                  </h3>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Simulated test — nothing is sent or stored
                  </p>
                </div>
                <span className="shrink-0 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-amber-300">
                  Demo
                </span>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Date picker */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-1.5 mb-3">
                    <Calendar className="w-3.5 h-3.5" /> 1 · Pick a test date
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                    {DATE_OPTIONS.map((d) => {
                      const selected = d.value === selectedDate
                      return (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => setSelectedDate(d.value)}
                          className={`shrink-0 w-16 py-3 rounded-xl border flex flex-col items-center gap-0.5 transition-all duration-200 cursor-pointer ${
                            selected
                              ? 'bg-gradient-to-b from-zinc-100 to-zinc-300 text-neutral-950 border-transparent shadow-[0_0_20px_-4px_rgba(255,255,255,0.45)]'
                              : 'bg-zinc-900/50 border-zinc-700/60 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                          }`}
                        >
                          <span className="text-[10px] uppercase tracking-wider font-semibold">{d.weekday}</span>
                          <span className="text-lg font-bold leading-none">{d.day}</span>
                          <span className="text-[10px] uppercase tracking-wider">{d.month}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Time picker */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-1.5 mb-3">
                    <Clock className="w-3.5 h-3.5" /> 2 · Pick a test time
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {TIME_SLOTS.map((t) => {
                      const selected = t === selectedTime
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className={`py-2.5 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer ${
                            selected
                              ? 'bg-gradient-to-r from-zinc-100 to-zinc-300 text-neutral-950 border-transparent shadow-[0_0_16px_-4px_rgba(255,255,255,0.4)]'
                              : 'bg-zinc-900/50 border-zinc-700/60 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                          }`}
                        >
                          {formatTime(t)}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-1.5 mb-3">
                    <UserCircle className="w-3.5 h-3.5" /> 3 · Enter any name &amp; email
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Test Name"
                      aria-label="Test name"
                      className={inputClass}
                      required
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="test@example.com"
                      aria-label="Test email"
                      className={inputClass}
                      required
                    />
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Notes / goals (optional — try something fun)"
                      aria-label="Notes"
                      rows={3}
                      className={`${inputClass} sm:col-span-2 resize-none`}
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 text-neutral-950 px-8 py-4 rounded-full text-sm font-medium hover:from-zinc-100 hover:via-zinc-50 hover:to-zinc-300 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(255,255,255,0.25)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer"
                >
                  <Bot className="w-4 h-4" />
                  Submit Test Booking &amp; Watch Automation Run
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-xs text-zinc-600 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% demo — nothing is sent, stored, or real.
                </p>
              </form>
            </div>
          </div>
        </Reveal>
      </Section>
    )
  }

  /* ── RUNNING PHASE ──────────────────────────────────────────────── */
  return (
    <Section
      id="demo"
      eyebrow="Try It Yourself"
      title="Your Test Booking, Being Processed"
      subtitle="Watch the automation pipeline handle your simulated booking — every step, in real time."
      innerClassName="max-w-6xl"
    >
      <Reveal className="mt-4" y={16}>
        {/* Status bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 rounded-xl border border-zinc-800/70 bg-zinc-900/30 backdrop-blur-sm px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
            {!automationDone && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
            )}
            {automationDone ? (
              <span className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">DEMO PIPELINE COMPLETE</span>
              </span>
            ) : (
              'DEMO RUNNING'
            )}
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-500">
            <span className="tabular-nums">Elapsed: {elapsed.toFixed(1)}s</span>
            <span className="text-zinc-700">|</span>
            <span className="tabular-nums">Step {Math.min(activeStep + 1, STEPS.length)}/{STEPS.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: submitted data */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/30 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/70 bg-zinc-950/60">
                <FileText className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[11px] font-mono text-zinc-500">booking_data.json</span>
              </div>
              <div className="p-4 space-y-2.5">
                {[
                  ['name', name],
                  ['email', email],
                  ['date', selectedDate],
                  ['time', formatTime(selectedTime)],
                  ['notes', notes || '(none)'],
                ].map(([k, v]) => (
                  <div key={k as string} className="flex items-start gap-2 text-xs font-mono">
                    <span className="text-violet-400 shrink-0">"{k}"</span>
                    <span className="text-zinc-600 shrink-0">:</span>
                    <span className="text-emerald-300 break-all">"{v}"</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live log */}
            <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/30 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/70 bg-zinc-950/60">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[11px] font-mono text-zinc-500">live_backend.log</span>
              </div>
              <div className="p-3 max-h-64 overflow-y-auto" data-lenis-prevent>
                {logs.length === 0 ? (
                  <p className="text-xs font-mono text-zinc-600">Waiting for webhook…</p>
                ) : (
                  <div className="space-y-1.5">
                    {logs.map((log, i) => (
                      <div key={i} className="animate-fadeSlide text-[11px] font-mono text-zinc-400 leading-relaxed">
                        {log}
                      </div>
                    ))}
                    {!automationDone && (
                      <span className="inline-block w-1.5 h-3.5 bg-emerald-400 animate-blink" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: automation steps */}
          <div className="lg:col-span-3 rounded-xl border border-zinc-800/70 bg-zinc-900/30 backdrop-blur-sm overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/70 bg-zinc-950/60">
              <Bot className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-[11px] font-mono text-zinc-500">automation_pipeline</span>
              <span className="ml-auto text-[10px] font-mono text-zinc-600">make.com</span>
            </div>

            <div className="p-5 space-y-0.5">
              {STEPS.map((step, i) => {
                const Icon = step.icon
                const isActive = i === activeStep && !completedSteps.has(i)
                const isDone = completedSteps.has(i)
                const isExpanded = expandedSteps.has(i)
                const payload = payloads[i]
                const accentColors = {
                  emerald: { tile: 'bg-emerald-400/15 text-emerald-300', border: 'border-emerald-400/50', glow: 'shadow-[0_0_20px_-4px_rgba(52,211,153,0.6)]' },
                  sky: { tile: 'bg-sky-400/15 text-sky-300', border: 'border-sky-400/50', glow: 'shadow-[0_0_20px_-4px_rgba(56,189,248,0.6)]' },
                  violet: { tile: 'bg-violet-400/15 text-violet-300', border: 'border-violet-400/50', glow: 'shadow-[0_0_20px_-4px_rgba(167,139,250,0.6)]' },
                  amber: { tile: 'bg-amber-400/15 text-amber-300', border: 'border-amber-400/50', glow: 'shadow-[0_0_20px_-4px_rgba(251,191,36,0.6)]' },
                }
                const ac = accentColors[step.accent]

                return (
                  <div
                    key={step.label}
                    className={`rounded-xl border p-4 transition-all duration-500 ${
                      isActive
                        ? `bg-zinc-900/90 ${ac.border} ${ac.glow}`
                        : isDone
                          ? 'bg-zinc-900/50 border-emerald-400/20'
                          : 'bg-zinc-900/30 border-zinc-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500 ${
                          isActive
                            ? ac.tile
                            : isDone
                              ? 'bg-emerald-400/15 text-emerald-300/80'
                              : 'bg-zinc-800/50 text-zinc-600'
                        }`}
                      >
                        {isDone ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-sm font-semibold transition-colors duration-500 ${
                              isActive ? 'text-white' : isDone ? 'text-zinc-300' : 'text-zinc-500'
                            }`}
                          >
                            {step.label}
                          </span>
                          {isActive && !prefersReducedMotion() && (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 animate-pulse">
                              <Play className="w-2.5 h-2.5 fill-current" />
                              running
                            </span>
                          )}
                          {isDone && (
                            <span className="text-[10px] font-mono text-emerald-400/70">
                              done · {(step.delay / 1000).toFixed(1)}s
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-xs transition-colors duration-500 ${
                            isActive ? 'text-zinc-400' : isDone ? 'text-zinc-500' : 'text-zinc-600'
                          }`}
                        >
                          {step.detail}
                        </p>
                      </div>
                    </div>

                    {/* Payload toggle (hidden by default) */}
                    {isDone && payload && (
                      <div className="mt-3">
                        <button
                          onClick={() => togglePayload(i)}
                          aria-expanded={isExpanded}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono border transition-colors cursor-pointer ${
                            isExpanded
                              ? 'text-zinc-300 border-zinc-600/60 bg-zinc-900/80 hover:border-zinc-500'
                              : 'text-zinc-500 border-zinc-800 bg-zinc-950/40 hover:border-zinc-600 hover:text-zinc-300'
                          }`}
                        >
                          <ChevronDown
                            className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                          {isExpanded ? 'Hide JSON payload' : 'View JSON payload'}
                        </button>
                        {isExpanded && (
                          <div className="mt-2 rounded-lg bg-zinc-950/60 border border-zinc-800/40 p-3 overflow-x-auto">
                            <pre className="text-[10px] font-mono text-zinc-500 whitespace-pre leading-relaxed">
                              {payload.length > 500 ? payload.slice(0, 500) + '\n  ...' : payload}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Completion summary */}
            {automationDone && (
              <div className="border-t border-zinc-800/70 p-5">
                <div className="rounded-xl bg-emerald-400/5 border border-emerald-400/20 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-400/15 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">That&rsquo;s the whole pipeline</h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        Webhook → validation → CRM → calendar → email + Telegram → follow-up — completed in{' '}
                        <span className="text-emerald-300 font-mono">{elapsed.toFixed(1)}s</span>.
                        This is exactly how a real lead booking flows through an automated system. Want to
                        see it again with different data?
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        {['Webhook', 'CRM', 'Calendar', 'Email', 'Telegram', 'Follow-Up'].map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-300 border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 rounded-full"
                          >
                            <Check className="w-2.5 h-2.5" />
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reset */}
        <div className="flex justify-center mt-8">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-zinc-300 border border-zinc-500/30 hover:bg-zinc-900 hover:border-zinc-400/50 transition-all duration-300 cursor-pointer"
          >
            <Repeat className="w-4 h-4" />
            {automationDone ? 'Try Again With New Data' : 'Reset Demo'}
          </button>
        </div>
      </Reveal>
    </Section>
  )
}

export default TryItYourself