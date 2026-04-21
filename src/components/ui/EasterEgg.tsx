import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Terminal } from 'lucide-react'
import { useKonamiCode } from '@/hooks/useKonamiCode'

const COMMANDS: Record<string, string> = {
  help: 'Available: help, about, skills, contact, clear, exit',
  about: 'Natinael Azmach — CS Graduate. Builds solutions for real community problems. Coffee-driven.',
  skills: 'Kotlin, Android, React, React Native, Node.js, Python, PHP, MySQL, MongoDB, Firebase, TypeScript',
  contact: 'Email: natinaelazmach0941421023@gmail.com | GitHub: github.com/NatinaelAzmach/meh',
  clear: '__CLEAR__',
  exit: '__EXIT__',
}

interface Line {
  type: 'input' | 'output' | 'system'
  text: string
}

export function EasterEgg() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<Line[]>([
    { type: 'system', text: '🎮 Konami code activated! Welcome to the terminal.' },
    { type: 'system', text: 'Type "help" to see available commands.' },
  ])
  const bottomRef = useRef<HTMLDivElement>(null)

  useKonamiCode(() => setOpen(true))

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const run = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const output = COMMANDS[trimmed] ?? `Command not found: ${trimmed}. Try "help".`

    if (output === '__EXIT__') { setOpen(false); return }
    if (output === '__CLEAR__') { setLines([]); return }

    setLines(l => [
      ...l,
      { type: 'input', text: `> ${cmd}` },
      { type: 'output', text: output },
    ])
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-6 right-6 z-[9990] w-[420px] max-w-[calc(100vw-2rem)] glass-dark rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/30"
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/10">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Terminal size={14} className="text-indigo-400" />
              <span className="font-mono">portfolio-terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <button onClick={() => setOpen(false)} className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-400 transition-colors" aria-label="Close terminal" />
            </div>
          </div>

          {/* Output */}
          <div className="h-56 overflow-y-auto p-4 font-mono text-xs space-y-1">
            {lines.map((line, i) => (
              <p key={i} className={
                line.type === 'input' ? 'text-indigo-400' :
                line.type === 'system' ? 'text-yellow-400' :
                'text-white/70'
              }>
                {line.text}
              </p>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-black/20">
            <span className="text-indigo-400 font-mono text-xs">$</span>
            <input
              autoFocus
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && input.trim()) {
                  run(input)
                  setInput('')
                }
              }}
              className="flex-1 bg-transparent text-white font-mono text-xs outline-none placeholder:text-white/20"
              placeholder="type a command..."
              aria-label="Terminal input"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
