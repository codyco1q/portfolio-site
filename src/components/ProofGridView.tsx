import { Eye } from 'lucide-react'
import { tadarabProofs } from '../data/tadarabProofs'

interface ProofGridViewProps {
  onSelectProof: (index: number) => void
}

export const ProofGridView = ({ onSelectProof }: ProofGridViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {tadarabProofs.map((item, idx) => (
        <div
          key={item.id}
          className="bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-600/70 rounded-xl p-4 transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div
              className="aspect-[16/10] rounded-lg overflow-hidden bg-black mb-3 border border-zinc-800 cursor-pointer group relative"
              onClick={() => onSelectProof(idx)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium">
                <Eye className="w-4 h-4" />
                Click to Inspect
              </div>
            </div>
            <div className="text-xs font-mono text-emerald-400 mb-1">{item.badge}</div>
            <h4 className="text-sm font-semibold text-white mb-2">{item.title}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">{item.description}</p>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-zinc-800/60">
            <div className="flex flex-wrap gap-1.5">
              {item.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800"
                >
                  {t}
                </span>
              ))}
            </div>
            <button
              onClick={() => onSelectProof(idx)}
              className="text-xs text-zinc-300 hover:text-white font-medium flex items-center gap-1"
            >
              View Details &rarr;
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
