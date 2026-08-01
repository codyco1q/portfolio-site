import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Logo from './Logo'

const navLinks = [
  { href: '#funnels', label: 'Funnels' },
  { href: '#automations', label: 'Automations' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#experience', label: 'Experience' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 w-full bg-neutral-950/85 backdrop-blur-md border-b border-zinc-800 z-50">
      <div
        className="h-0.5 bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-8">
        <div className="h-20 flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <span className="inline-flex items-center gap-2 text-xs text-emerald-300/90 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open for new projects
            </span>
            <a
              href="#cta"
              className="text-sm px-4 py-2 rounded-full bg-white text-neutral-950 font-medium hover:bg-zinc-200 transition-colors"
            >
              Book a Call
            </a>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-zinc-900 transition-colors text-zinc-400"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-6">
            <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-zinc-100 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#cta"
                  className="text-center px-4 py-2 rounded-full bg-white text-neutral-950 font-medium hover:bg-zinc-200 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Book a Call
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
