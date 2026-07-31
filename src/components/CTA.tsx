import { useState } from 'react'
import { ArrowRight, Phone } from 'lucide-react'
import BookingModal from './BookingModal'
import Magnetic from './Magnetic'

const CTA = () => {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <section id="cta" className="py-24 px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-zinc-950/40 to-neutral-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-500/20 bg-zinc-900/50 backdrop-blur-sm text-zinc-400 text-xs mb-8">
          <Phone className="w-3.5 h-3.5" />
          Let&rsquo;s Build Together
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Ready to Automate Your Funnels &amp; Workflows?
        </h2>
        <p className="text-base text-zinc-400 mb-10 max-w-lg mx-auto leading-relaxed">
          Let&rsquo;s build an autonomous revenue system tailored specifically for your offer. No fluff, just architecture.
        </p>
        <Magnetic>
          <button
            onClick={() => setBookingOpen(true)}
            className="inline-flex items-center gap-2 bg-white text-neutral-950 px-8 py-4 rounded-full text-sm font-medium hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)] group cursor-pointer"
          >
            Book an Automation Strategy Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </Magnetic>
      </div>
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    </section>
  )
}

export default CTA
