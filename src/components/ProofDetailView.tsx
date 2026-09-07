import { ChevronLeft, ChevronRight, ExternalLink, Sparkles } from 'lucide-react'
import { tadarabProofs, type ProofItem } from '../data/tadarabProofs'

interface ProofDetailViewProps {
  currentIndex: number
  currentItem: ProofItem
  onSelectIndex: (index: number) => void
}

export const ProofDetailView = ({
  currentIndex,
  currentItem,
  onSelectIndex,
}: ProofDetailViewProps) => {
  return (
    <div className="space-y-5">
      {/* Active Preview Canvas - Perfectly Centered */}
      <div className="relative group rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-2xl flex items-center justify-center p-2 sm:p-4 min-h-[280px] sm:min-h-[380px] max-h-[56vh]">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="max-h-[50vh] w-auto max-w-full object-contain rounded-lg shadow-md mx-auto block"
          />

          {/* Full Resolution Link */}
          <a
            href={currentItem.image}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs px-3 py-1.5 rounded-lg border border-zinc-700/80 flex items-center gap-1.5 shadow-lg backdrop-blur-md"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Full Resolution</span>
          </a>
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={() =>
            onSelectIndex((currentIndex - 1 + tadarabProofs.length) % tadarabProofs.length)
          }
          aria-label="Previous proof"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-700/80 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 hover:scale-105 transition-all shadow-xl backdrop-blur-md z-10 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => onSelectIndex((currentIndex + 1) % tadarabProofs.length)}
          aria-label="Next proof"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-700/80 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 hover:scale-105 transition-all shadow-xl backdrop-blur-md z-10 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Description & Metadata Card */}
      <div className="bg-zinc-900/40 rounded-xl p-5 border border-zinc-800/60">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Proof {currentIndex + 1} of {tadarabProofs.length} — {currentItem.badge}
          </span>
          <a
            href={currentItem.image}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 hover:text-zinc-200 underline flex items-center gap-1"
          >
            Open raw image
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <h4 className="text-lg font-semibold text-white mb-1">{currentItem.title}</h4>
        <p className="text-xs text-zinc-400 font-mono mb-3">{currentItem.subtitle}</p>
        <p className="text-sm text-zinc-300 leading-relaxed mb-4">{currentItem.description}</p>

        <div className="flex flex-wrap gap-2">
          {currentItem.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Thumbnails Navigation */}
      <div>
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
          Click screenshot to inspect:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tadarabProofs.map((item, idx) => {
            const isSelected = idx === currentIndex
            return (
              <button
                key={item.id}
                onClick={() => onSelectIndex(idx)}
                className={`text-left rounded-xl p-2 border transition-all duration-200 ${
                  isSelected
                    ? 'bg-zinc-800/80 border-zinc-500 shadow-[0_0_15px_-3px_rgba(255,255,255,0.15)] ring-1 ring-zinc-400/50'
                    : 'bg-zinc-900/40 border-zinc-800/70 hover:border-zinc-700 hover:bg-zinc-900/80'
                }`}
              >
                <div className="aspect-[16/10] rounded-lg overflow-hidden bg-black mb-2 border border-zinc-800">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-xs font-medium text-zinc-200 truncate">{item.badge}</div>
                <div className="text-[10px] text-zinc-500 truncate mt-0.5">{item.title}</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
