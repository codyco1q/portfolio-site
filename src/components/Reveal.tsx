import { useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/utils'

gsap.registerPlugin(ScrollTrigger)

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  immediate?: boolean
}

const Reveal = ({ children, className, delay = 0, y = 24, immediate }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y },
      { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power2.out' },
    )

    if (immediate) {
      tween.play()
      return () => { tween.kill() }
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      animation: tween,
    })

    return () => {
      trigger.kill()
      tween.kill()
    }
  }, [delay, y, immediate])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export default Reveal
