import { useEffect, useRef, useState } from 'react'
import { Check, type LucideIcon } from 'lucide-react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export type WorkflowStep = {
  icon: LucideIcon
  label: string
  detail: string
  duration: string
}

type WorkflowSimProps = {
  steps: WorkflowStep[]
  interval?: number
  startIndex?: number
}

const WorkflowSim = ({ steps, interval = 1600, startIndex = 0 }: WorkflowSimProps) => {
  const reduced = useRef(prefersReducedMotion())
  const [tick, setTick] = useState(reduced.current ? 0 : startIndex)

  useEffect(() => {
    if (reduced.current) return
    const id = setInterval(() => setTick((t) => t + 1), interval)
    return () => clearInterval(id)
  }, [interval])

  const n = steps.length
  const active = tick % n
  const run = Math.floor(tick / n) + 1
  const elapsed = tick * (interval / 1000)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg bg-zinc-950/60 border border-zinc-800 px-3 py-2">
        <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-300">
          {!reduced.current && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
          )}
          {reduced.current && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
          SCENARIO RUNNING
        </div>
        <div className="text-[11px] font-mono text-zinc-500 tabular-nums">
          RUN #{String(run).padStart(2, '0')} · {elapsed.toFixed(1)}s
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute left-[17px] top-2 bottom-2 w-px bg-zinc-800"
          aria-hidden="true"
        />
        {steps.map((s, i) => {
          const Icon = s.icon
          const isActive = i === active
          const isDone = !reduced.current && i < active
          return (
            <div key={s.label} className="relative flex gap-4 pb-4 last:pb-0">
              <div className="relative z-10 shrink-0 mt-0.5">
                <div
                  className={`relative w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-500 ${
                    isActive
                      ? 'bg-emerald-400/15 border-emerald-400/50 text-emerald-300 shadow-[0_0_16px_-3px_rgba(52,211,153,0.55)]'
                      : isDone
                        ? 'bg-zinc-900 border-emerald-400/25 text-emerald-300/70'
                        : 'bg-zinc-900/60 border-zinc-700/60 text-zinc-500'
                  }`}
                >
                  {!reduced.current && isActive && (
                    <span className="absolute inset-0 rounded-lg bg-emerald-400/30 animate-ping" />
                  )}
                  {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
              </div>
              <div className="min-w-0 pt-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span
                    className={`text-sm font-semibold transition-colors duration-500 ${
                      isActive ? 'text-white' : isDone ? 'text-zinc-300' : 'text-zinc-500'
                    }`}
                  >
                    {s.label}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded border transition-all duration-500 ${
                      isActive
                        ? 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10'
                        : 'text-zinc-600 border-zinc-800 bg-zinc-900/50'
                    }`}
                  >
                    {s.duration}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 animate-pulse">
                      ▶ running
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs mt-0.5 leading-relaxed transition-colors duration-500 ${
                    isActive ? 'text-zinc-300' : isDone ? 'text-zinc-500' : 'text-zinc-600'
                  }`}
                >
                  {s.detail}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 border-t border-zinc-800/60 pt-3">
        <span className="text-emerald-400" aria-hidden="true">
          →
        </span>
        <span className="truncate">
          {steps[active].label.toLowerCase()} · {steps[active].duration} · 200 OK
        </span>
      </div>
    </div>
  )
}

export default WorkflowSim
