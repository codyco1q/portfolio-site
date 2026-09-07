import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { inputClass } from '../lib/utils'

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  options: string[]
  ariaLabel: string
  className?: string
}

const CustomSelect = ({
  value,
  onChange,
  placeholder,
  options,
  ariaLabel,
  className = '',
}: CustomSelectProps) => {
  const [open, setOpen] = useState(false)
  const [openUp, setOpenUp] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const toggle = () => {
    if (!open && rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect()
      const panelEstimate = options.length * 44 + 24
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      setOpenUp(spaceBelow < panelEstimate && spaceAbove > spaceBelow)
    }
    setOpen((o) => !o)
  }

  const selectOption = (option: string) => {
    onChange(option)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        title={value || placeholder}
        className={`${inputClass} flex items-center justify-between gap-2 cursor-pointer text-left ${
          value ? 'text-white' : 'text-zinc-400'
        }`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className={`absolute left-0 right-0 z-50 ${openUp ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
          <div className="overflow-hidden rounded-xl border border-zinc-700/80 bg-zinc-900 shadow-2xl shadow-black/60 animate-fadeSlide">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/40 to-transparent" />
            <ul role="listbox" aria-label={ariaLabel} className="max-h-64 overflow-y-auto py-1.5">
              {options.map((option) => {
                const isSelected = option === value
                return (
                  <li key={option}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      title={option}
                      onClick={() => selectOption(option)}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-left transition-colors duration-150 ${
                        isSelected
                          ? 'text-emerald-300 bg-emerald-400/10'
                          : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                      }`}
                    >
                      <span className="whitespace-normal">{option}</span>
                      {isSelected && <Check className="w-4 h-4 shrink-0 text-emerald-400" />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomSelect