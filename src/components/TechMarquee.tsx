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
  'Google Cloud',
  'Hostinger',
  'Netlify',
  'Vercel',
  'Cloudflare',
  'GoDaddy',
  'ManyChat',
]

const TechMarquee = () => {
  return (
    <div
      className="relative py-8 border-y border-zinc-800/60 overflow-hidden bg-neutral-950/60"
      aria-hidden="true"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
    >
      <div className="flex w-max animate-marquee">
        <div className="flex whitespace-nowrap">
          {tech.map((t) => (
            <span key={t} className="mx-10 text-sm text-zinc-600 font-mono uppercase tracking-[0.25em]">
              {t}
            </span>
          ))}
        </div>
        <div className="flex whitespace-nowrap" aria-hidden="true">
          {tech.map((t) => (
            <span key={`dup-${t}`} className="mx-10 text-sm text-zinc-600 font-mono uppercase tracking-[0.25em]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TechMarquee
