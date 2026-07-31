const tech = [
  'Make.com',
  'n8n',
  'GoHighLevel',
  'OpenAI',
  'Gemini AI',
  'Retell AI',
  'Zapier',
  'Cloudinary',
  'Whisper',
  'Webhooks',
]

const TechMarquee = () => {
  const items = [...tech, ...tech]
  return (
    <div
      className="relative py-8 border-y border-zinc-800/60 overflow-hidden bg-neutral-950/60"
      aria-hidden="true"
    >
      <div
        className="flex whitespace-nowrap animate-marquee"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
      >
        {items.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="mx-10 text-sm text-zinc-600 font-mono uppercase tracking-[0.25em]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TechMarquee
