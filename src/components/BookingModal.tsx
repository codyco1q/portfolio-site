import { useEffect, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  Calendar,
  CalendarCheck,
  Check,
  Clock,
  Loader2,
  ShieldCheck,
  UserCircle,
  X,
} from 'lucide-react'

const MAKE_WEBHOOK_URL =
  import.meta.env.VITE_MAKE_WEBHOOK_URL ?? 'https://hook.make.com/your-webhook-url'

const getDateOptions = () => {
  const options: { value: string; weekday: string; day: number; month: string }[] = []
  const today = new Date()
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    options.push({
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
      day: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    })
  }
  return options
}

const timeSlots = Array.from({ length: 18 }, (_, i) => {
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

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-700/60 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 transition-colors'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const BookingModal = ({ onClose }: { onClose: () => void }) => {
  const [dateOptions] = useState(getDateOptions)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<Status>('idle')

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

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const canSubmit =
    name.trim() !== '' && emailValid && selectedDate !== '' && selectedTime !== '' && status !== 'submitting'

  const resetForm = () => {
    setName('')
    setEmail('')
    setWebsite('')
    setNotes('')
    setSelectedDate('')
    setSelectedTime('')
    setStatus('idle')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setStatus('submitting')
    try {
      const res = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          date: selectedDate,
          time: selectedTime,
          startDateTime: `${selectedDate}T${selectedTime}:00`,
          notes: notes.trim(),
        }),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label="Booking confirmed"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <div
          className="relative w-full max-w-md bg-neutral-950 border border-zinc-700/60 rounded-2xl p-8 text-center shadow-[0_0_60px_-15px_rgba(255,255,255,0.15)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_0_30px_-5px_rgba(52,211,153,0.5)]">
            <Check className="w-8 h-8 text-neutral-950" />
          </div>
          <h3 className="text-2xl font-bold text-white mt-6">Strategy Call Confirmed!</h3>
          <p className="text-sm text-zinc-400 mt-2">Check your inbox for calendar details.</p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-zinc-400 font-mono bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {selectedDate} · {formatTime(selectedTime)}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
            <button
              onClick={resetForm}
              className="px-5 py-2.5 rounded-full text-sm font-medium text-zinc-300 border border-zinc-500/30 hover:bg-zinc-900 hover:border-zinc-400/50 transition-all duration-300"
            >
              Book Another Call
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white text-neutral-950 hover:bg-zinc-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Book a strategy call"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-gradient-to-b from-zinc-200/40 via-zinc-600/30 to-zinc-900/70 p-px shadow-[0_0_60px_-15px_rgba(255,255,255,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-neutral-950 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-zinc-300" />
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  Book an Automation Strategy Call
                </h3>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">30 minutes · Google Meet</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close booking modal"
              className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4 text-zinc-400" />
            </button>
          </div>

          <div data-lenis-prevent className="max-h-[75vh] overflow-y-auto px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-1.5 mb-3">
                  <Calendar className="w-3.5 h-3.5" /> 1 · Select a date
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                  {dateOptions.map((d) => {
                    const selected = d.value === selectedDate
                    return (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => setSelectedDate(d.value)}
                        className={`shrink-0 w-16 py-3 rounded-xl border flex flex-col items-center gap-0.5 transition-all duration-200 ${
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

              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-1.5 mb-3">
                  <Clock className="w-3.5 h-3.5" /> 2 · Select a time
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {timeSlots.map((t) => {
                    const selected = t === selectedTime
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`py-2.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
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

              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-1.5 mb-3">
                  <UserCircle className="w-3.5 h-3.5" /> 3 · Your details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className={inputClass}
                    required
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className={inputClass}
                    required
                  />
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="yourdomain.com"
                    className={`${inputClass} sm:col-span-2`}
                  />
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Automation goals / notes (optional)"
                    rows={3}
                    className={`${inputClass} sm:col-span-2 resize-none`}
                  />
                </div>
              </div>

              {status === 'error' && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  Something went wrong sending your request. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 text-neutral-950 px-8 py-4 rounded-full text-sm font-medium hover:from-zinc-100 hover:via-zinc-50 hover:to-zinc-300 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(255,255,255,0.25)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Confirming…
                  </>
                ) : (
                  <>
                    Confirm Strategy Call
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-zinc-600 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                No spam, ever. Your details go straight to my automation.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingModal
