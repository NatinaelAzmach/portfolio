import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react'

const SOCIALS = [
  { icon: Github, href: 'https://github.com/NatinaelAzmach/meh', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/natinael-azmach-1b9ab5404/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/natinael', label: 'Twitter' },
]

export function Footer() {
  const year = new Date().getFullYear()

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-[#080808] border-t border-slate-900/10 dark:border-white/5 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <span className="font-display font-bold text-xl gradient-text">{'<Dev />'}</span>

        {/* Copyright */}
        <p className="text-slate-900/30 dark:text-white/30 text-sm text-center">
          © {year} Natinael Azmach. Built with React, Three.js & ☕
        </p>

        {/* Social + back to top */}
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -3 }}
              className="text-slate-900/30 dark:text-white/30 hover:text-slate-900 dark:text-white transition-colors"
            >
              <Icon size={18} />
            </motion.a>
          ))}

          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -3 }}
            aria-label="Back to top"
            className="ml-2 w-8 h-8 glass rounded-lg flex items-center justify-center text-slate-900/40 dark:text-white/40 hover:text-slate-900 dark:text-white border border-slate-900/10 dark:border-white/10 transition-colors"
          >
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
