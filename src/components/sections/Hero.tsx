import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react'

// Lazy-load the heavy 3D scene
const FloatingShapes = lazy(() =>
  import('@/components/three/FloatingShapes').then(m => ({ default: m.FloatingShapes }))
)

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* 3D Background */}
      <Suspense fallback={null}>
        <FloatingShapes />
      </Suspense>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/20 to-[#0a0a0a] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={item} className="inline-flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-white/60 font-mono">Open to opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-display text-6xl md:text-8xl font-bold mb-4 leading-none"
        >
          <span className="text-white">Natinael</span>{' '}
          <span className="gradient-text">Azmach</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={item}
          className="text-xl md:text-2xl text-white/60 font-light mb-8 max-w-2xl mx-auto"
        >
          CS Graduate building{' '}
          <span className="text-indigo-400">solutions that matter</span> — web, mobile &amp; beyond
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all duration-200 neo-shadow hover:translate-x-[-2px] hover:translate-y-[-2px]"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 glass text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-200 border border-white/20"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={item} className="flex items-center justify-center gap-6">
          {[
            { icon: Github, href: 'https://github.com/NatinaelAzmach/meh', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/natinael', label: 'LinkedIn' },
            { icon: Twitter, href: 'https://twitter.com/natinael', label: 'Twitter' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 text-white/40 hover:text-white transition-colors duration-200"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  )
}
