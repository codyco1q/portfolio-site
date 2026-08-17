import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Loader2, Search, ShieldCheck } from 'lucide-react'
import { inputClass } from '../lib/utils'

const AUDIT_ENDPOINT = '/api/audit'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const AuditForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const canSubmit = name.trim() !== '' && emailValid && status !== 'submitting'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    if (honeypot) {
      setStatus('success')
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch(AUDIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          website: website.trim(),
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
      <div className="flex flex-col items-center text-center py-8">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-5 shadow-[0_0_30px_-5px_rgba(52,211,153,0.5)]">
          <Check className="w-7 h-7 text-neutral-950" />
        </div>
        <h3 className="text-lg font-semibold text-white">Audit Request Received</h3>
        <p className="text-sm text-zinc-400 mt-2 max-w-sm">
          I&rsquo;ll review your setup and reply with a breakdown of the highest-impact automation
          opportunities within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-gradient-to-b from-zinc-200/40 via-zinc-600/30 to-zinc-900/70 p-px shadow-[0_0_40px_-12px_rgba(255,255,255,0.15)]">
      <div className="bg-neutral-950 rounded-2xl p-6 sm:p-8">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center shrink-0">
            <Search className="w-5 h-5 text-zinc-300" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Get a Free Automation Audit</h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              I&rsquo;ll map your funnel, CRM, and workflows and tell you exactly where you&rsquo;re
              leaking time and revenue.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              aria-label="Full Name"
              className={inputClass}
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              aria-label="Email Address"
              className={inputClass}
              required
            />
          </div>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="yourdomain.com (optional)"
            aria-label="Your website (optional)"
            className={inputClass}
          />
          <input
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          {status === 'error' && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              Something went wrong. Please email me directly at{' '}
              <a
                href="mailto:codyaxton@outlook.com"
                className="text-red-200 underline underline-offset-2 hover:text-white"
              >
                codyaxton@outlook.com
              </a>
              .
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full inline-flex items-center justify-center gap-2 bg-white text-neutral-950 px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Get My Free Audit
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-zinc-600 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            No spam, ever. Response within 24 hours.
          </p>
        </form>
      </div>
    </div>
  )
}

export default AuditForm
