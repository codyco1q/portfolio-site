const Logo = () => (
  <a href="#" aria-label="Cody — Go to homepage" className="group flex items-center gap-2.5">
    <span aria-hidden="true" className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-500 flex items-center justify-center font-mono text-[10px] font-bold text-neutral-950 shadow-[0_0_18px_-4px_rgba(255,255,255,0.35)] transition-shadow group-hover:shadow-[0_0_22px_-4px_rgba(255,255,255,0.55)]">
      {'</>'}
    </span>
    <span aria-hidden="true" className="font-mono text-lg font-bold tracking-tight">
      <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">{'<'}</span>
      <span className="bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent">
        Cody
      </span>
      <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">{' />'}</span>
    </span>
  </a>
)

export default Logo
