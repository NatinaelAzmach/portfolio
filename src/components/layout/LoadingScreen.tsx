import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate asset loading progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 400)
          return 100
        }
        return p + Math.random() * 15
      })
    }, 120)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0a0a0a]"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo / Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <span className="font-display text-5xl font-bold gradient-text">{'<Dev />'}</span>
        <p className="mt-2 text-sm text-slate-900/40 dark:text-white/40 tracking-widest uppercase">Portfolio</p>
      </motion.div>

      {/* Progress bar */}
      <div className="w-64 h-[2px] bg-slate-900/5 dark:bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
          style={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ ease: 'easeOut' }}
        />
      </div>
      <p className="mt-4 text-slate-900/30 dark:text-white/30 text-xs font-mono">
        {Math.min(Math.round(progress), 100)}%
      </p>
    </motion.div>
  )
}
