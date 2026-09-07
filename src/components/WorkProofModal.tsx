import { useEffect, useState } from 'react'
import { Eye, Grid, Layers, X } from 'lucide-react'
import { tadarabProofs } from '../data/tadarabProofs'
import { ProofDetailView } from './ProofDetailView'
import { ProofGridView } from './ProofGridView'

interface WorkProofModalProps {
  onClose: () => void
  initialIndex?: number
}

const WorkProofModal = ({ onClose, initialIndex = 0 }: WorkProofModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [viewMode, setViewMode] = useState<'detail' | 'grid'>('detail')

  // Lock body/html scroll while modal is mounted
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight' && viewMode === 'detail') {
        setCurrentIndex((prev) => (prev + 1) % tadarabProofs.length)
      } else if (e.key === 'ArrowLeft' && viewMode === 'detail') {
        setCurrentIndex((prev) => (prev - 1 + tadarabProofs.length) % tadarabProofs.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, viewMode])

  const currentItem = tadarabProofs[currentIndex]

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Tadarab GHL Automation Work Showcase"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
      <div
        data-lenis-prevent
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-neutral-950 border border-zinc-700/60 rounded-2xl shadow-[0_0_60px_-15px_rgba(255,255,255,0.15)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-200">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-semibold text-white">Tadarab</h3>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5">
                  GoHighLevel Automation
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                Production automation systems &amp; workflows engineered inside GoHighLevel (GHL)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('detail')}
                aria-label="Detail view"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                  viewMode === 'detail'
                    ? 'bg-zinc-800 text-white font-medium shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-zinc-800 text-white font-medium shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">All 4 Proofs</span>
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-6"
        >
          {viewMode === 'detail' ? (
            <ProofDetailView
              currentIndex={currentIndex}
              currentItem={currentItem}
              onSelectIndex={setCurrentIndex}
            />
          ) : (
            <ProofGridView
              onSelectProof={(index) => {
                setCurrentIndex(index)
                setViewMode('detail')
              }}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-zinc-800/80 bg-zinc-950/90 text-xs text-zinc-500 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div>
            <span className="text-zinc-400 font-medium">Production Automation Job:</span> All
            systems, branching flows, and pipelines configured inside GoHighLevel (GHL).
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-xs font-medium cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  )
}

export default WorkProofModal