import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Retro gaming 404 page */
export function NotFound() {
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-mono">
      {/* Scanline effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
      />

      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-8xl mb-6"
        >
          👾
        </motion.div>

        <h1 className="text-green-400 text-6xl font-bold mb-2 tracking-widest">404</h1>
        <p className="text-green-400/70 text-lg mb-1">GAME OVER</p>
        <p className="text-green-400/40 text-sm mb-8">
          PAGE NOT FOUND{blink ? '_' : ' '}
        </p>

        <div className="glass rounded-xl p-4 mb-8 text-left max-w-xs mx-auto">
          <p className="text-green-400/60 text-xs">
            <span className="text-green-400">ERROR:</span> The page you're looking for<br />
            has been eaten by a grue.<br /><br />
            <span className="text-green-400">HINT:</span> Try going back home.
          </p>
        </div>

        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-3 border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-200 text-sm tracking-widest uppercase"
        >
          ▶ INSERT COIN / GO HOME
        </motion.a>

        <p className="mt-8 text-white/20 text-xs">
          Press ↑↑↓↓←→←→BA for a surprise
        </p>
      </div>
    </div>
  )
}
