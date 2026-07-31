import { Globe, ExternalLink } from 'lucide-react'
import Logo from './Logo'

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 text-zinc-400"
    aria-hidden="true"
  >
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
  </svg>
)

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 text-zinc-400"
    aria-hidden="true"
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.27 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.15 0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
)

const footerLinks = [
  { href: '#funnels', label: 'Funnels' },
  { href: '#proof', label: 'Proof' },
  { href: '#services', label: 'Services' },
  { href: '#experience', label: 'Experience' },
  { href: '#cta', label: 'Contact' },
]

const quickLinks = [
  { label: 'GMC Corporate Portal', href: 'https://gmc-llc.net/' },
  { label: 'VSL Booking Funnel', href: 'https://book-a-call.gmc-llc.net/step1-page' },
  { label: 'Webinar Registration', href: 'https://webinar.gmc-llc.net/register' },
  { label: 'Fusion 44X Lead Engine', href: 'https://go.fusion44x.com/' },
]

const Footer = () => {
  return (
    <footer className="relative border-t border-zinc-800">
      <div className="absolute inset-0 bg-neutral-950" />
      <div className="relative max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="mb-3">
              <Logo />
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed mb-4">
              Autonomous AI systems, high-converting funnels, and enterprise workflow architecture for global operations.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/moaz-shahin/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://github.com/codyco1q"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors"
              >
                <GithubIcon />
              </a>
              <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                <Globe className="w-3.5 h-3.5" />
                October City, Egypt
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider">Navigation</h4>
            <nav className="space-y-2.5">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider">Portfolio Funnels</h4>
            <nav className="space-y-2.5">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-600">
            Cody &copy; {new Date().getFullYear()} — Moaz Shahin. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-xs text-zinc-700">
            <Globe className="w-3 h-3" />
            Serving globally from October City, Egypt
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
