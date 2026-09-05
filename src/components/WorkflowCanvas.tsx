import { Fragment, useEffect, useRef, useState } from 'react'
import {
  Check,
  ChevronRight,
  Pause,
  Play,
  Repeat,
  type LucideIcon,
} from 'lucide-react'
import { prefersReducedMotion } from '../lib/utils'

export type Accent = 'emerald' | 'sky' | 'violet' | 'amber'

export type WorkflowNode = {
  icon: LucideIcon
  label: string
  detail: string
  duration: string
  accent: Accent
}

type WorkflowCanvasProps = {
  nodes: WorkflowNode[]
  interval?: number
  loopNote?: string
}

const accents: Record<
  Accent,
  { tile: string; ring: string; chip: string }
> = {
  emerald: {
    tile: 'bg-emerald-400/15 text-emerald-300',
    ring: 'border-emerald-400/60',
    chip: 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10',
  },
  sky: {
    tile: 'bg-sky-400/15 text-sky-300',
    ring: 'border-sky-400/60',
    chip: 'text-sky-300 border-sky-400/40 bg-sky-400/10',
  },
  violet: {
    tile: 'bg-violet-400/15 text-violet-300',
    ring: 'border-violet-400/60',
    chip: 'text-violet-300 border-violet-400/40 bg-violet-400/10',
  },
  amber: {
    tile: 'bg-amber-400/15 text-amber-300',
    ring: 'border-amber-400/60',
    chip: 'text-amber-300 border-amber-400/40 bg-amber-400/10',
  },
}

const flowGlow: Record<Accent, string> = {
  emerald: 'shadow-[0_0_34px_-6px_rgba(52,211,153,0.7)]',
  sky: 'shadow-[0_0_34px_-6px_rgba(56,189,248,0.7)]',
  violet: 'shadow-[0_0_34px_-6px_rgba(167,139,250,0.7)]',
  amber: 'shadow-[0_0_34px_-6px_rgba(251,191,36,0.7)]',
}

const WorkflowCanvas = ({
  nodes,
  interval = 1500,
  loopNote,
}: WorkflowCanvasProps) => {
  const reduced = useRef(prefersReducedMotion())
  const [tick, setTick] = useState(0)
  const [paused, setPaused] = useState(false)
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced.current || paused) return
    const el = railRef.current
    if (!el) return

    let id: ReturnType<typeof setInterval> | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!id) id = setInterval(() => setTick((t) => t + 1), interval)
        } else if (id) {
          clearInterval(id)
          id = null
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (id) clearInterval(id)
    }
  }, [interval, paused])

  const n = nodes.length
  const active = tick % n
  const run = Math.floor(tick / n) + 1
  const elapsed = tick * (interval / 1000)
  const ActiveIcon = nodes[active].icon
  const activeAccent = accents[nodes[active].accent]

  return (
    <div
      ref={railRef}
      className="rounded-2xl border border-zinc-800/70 bg-zinc-900/30 backdrop-blur-sm overflow-hidden"
    >
      <div className="flex items-center justify-between gap-3 border-b border-zinc-800/70 bg-zinc-950/60 px-4 py-2.5">
        <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-300">
          {!reduced.current && !paused && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
          )}
          {reduced.current || paused ? 'SCENARIO PAUSED' : 'SCENARIO RUNNING'}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-[11px] font-mono text-zinc-500 tabular-nums">
            RUN #{String(run).padStart(2, '0')} · {elapsed.toFixed(1)}s
          </div>
          {!reduced.current && (
            <button
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500 transition-colors"
            >
              {paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              {paused ? 'Resume' : 'Pause'}
            </button>
          )}
        </div>
      </div>

      <div className="bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:18px_18px] px-4 md:px-7 py-7">
        <div className="overflow-x-auto pb-1 -mx-1 px-1">
          <div className="flex items-start min-w-max">
            {nodes.map((node, i) => {
              const Icon = node.icon
              const a = accents[node.accent]
              const isActive = i === active
              const isDone = !reduced.current && i < active
              const reached = i <= active
              return (
                <Fragment key={node.label}>
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className={`relative w-44 sm:w-52 md:w-56 rounded-xl border p-4 transition-all duration-500 ${
                        isActive
                          ? `bg-zinc-900/90 ${flowGlow[node.accent]}`
                          : isDone
                            ? 'bg-zinc-900/70 border-emerald-400/40'
                            : 'bg-zinc-900/70 border-zinc-800/80'
                      }`}
                    >
                      {isActive && !reduced.current && (
                        <span
                          className={`absolute inset-0 rounded-xl border ${a.ring} animate-ping`}
                        />
                      )}
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                            isActive
                              ? a.tile
                              : isDone
                                ? 'bg-emerald-400/15 text-emerald-300/80'
                                : 'bg-zinc-800/70 text-zinc-500'
                          }`}
                        >
                          {isDone ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Icon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p
                            className={`text-sm font-semibold leading-snug transition-colors duration-500 ${
                              isActive
                                ? 'text-white'
                                : isDone
                                  ? 'text-zinc-300'
                                  : 'text-zinc-400'
                            }`}
                          >
                            {node.label}
                          </p>
                          <p className="text-[11px] text-zinc-500 leading-snug mt-1.5">
                            {node.detail}
                          </p>
                          <p className="text-[10px] font-mono text-zinc-600 mt-2 tabular-nums">
                            ⏱ {node.duration}
                          </p>
                        </div>
                      </div>
                      {isActive && !paused && (
                        <span
                          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${a.chip} animate-pulse`}
                        >
                          RUNNING
                        </span>
                      )}
                    </div>
                  </div>

                  {i < n - 1 && (
                    <div className="flex items-center self-start mt-6 h-7 shrink-0">
                      <div className="relative w-8 sm:w-12 md:w-16 h-7">
                        <span
                          className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full transition-colors duration-500 ${
                            i === active
                              ? 'bg-emerald-400'
                              : i < active
                                ? 'bg-emerald-400/40'
                                : 'bg-zinc-800'
                          }`}
                        />
                        {reached && !reduced.current && !paused && (
                          <>
                            <span className="absolute top-1/2 -translate-y-1/2 left-0 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-flow" />
                            <span className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-1 rounded-full bg-emerald-300/80 animate-flow [animation-delay:0.55s]" />
                          </>
                        )}
                      </div>
                      {reached && (
                        <ChevronRight
                          className={`w-3 h-3 -ml-1 shrink-0 ${
                            i === active ? 'text-emerald-400' : 'text-emerald-400/40'
                          }`}
                        />
                      )}
                    </div>
                  )}
                </Fragment>
              )
            })}
          </div>
        </div>

        {loopNote && (
          <div className="mt-6 flex items-center gap-2 text-[11px] font-mono text-zinc-500 border-t border-dashed border-zinc-800 pt-3 px-1">
            <Repeat className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
            <span className="truncate">{loopNote}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-zinc-800/70 bg-zinc-950/60 px-4 py-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activeAccent.tile}`}
        >
          <ActiveIcon className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-white truncate">
            Step {active + 1}/{n} · {nodes[active].label}
            {!reduced.current && (
              <span className="ml-2 text-[10px] font-mono text-emerald-300">
                {paused ? '⏸ PAUSED' : '● LIVE'}
              </span>
            )}
          </p>
          <p className="text-[11px] text-zinc-400 truncate">
            {nodes[active].detail}
          </p>
        </div>
        <span className="text-[10px] font-mono text-emerald-400/80 shrink-0">
          200 OK
        </span>
      </div>
    </div>
  )
}

export default WorkflowCanvas