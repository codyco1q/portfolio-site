import type { ReactNode } from 'react'
import Reveal from './Reveal'

type SectionProps = {
  id?: string
  eyebrow: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  innerClassName?: string
}

const Section = ({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
  innerClassName = 'max-w-7xl',
}: SectionProps) => {
  return (
    <section id={id} className={`py-24 px-8 relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-zinc-950/20 to-neutral-950" />
      <div className={`relative mx-auto ${innerClassName}`}>
        <Reveal className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">{eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">{title}</h2>
          {subtitle && (
            <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  )
}

export default Section
