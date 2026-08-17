export const inputClass =
  'w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-700/60 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 transition-colors'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
