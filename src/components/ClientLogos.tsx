import Reveal from './Reveal'

const clients = ['GMC LLC', 'Fusion 44X', 'Mortal VA', 'Helping Hands Systems', 'Total Post N Print']

const ClientLogos = () => {
  return (
    <section className="py-16 px-8 relative">
      <div className="absolute inset-0 bg-neutral-950" />
      <div className="relative max-w-6xl mx-auto">
        <Reveal y={8}>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-zinc-600 mb-10">
            Trusted by teams scaling with automation
          </p>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {clients.map((name, i) => (
            <Reveal key={name} delay={i * 0.05} y={8}>
              <div className="flex items-center justify-center h-14 px-4 rounded-xl border border-zinc-800/50 bg-zinc-900/30 text-sm font-mono tracking-widest text-zinc-500 uppercase text-center hover:text-zinc-300 hover:border-zinc-600/50 transition-colors">
                {name}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientLogos
