import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, User } from 'lucide-react'
import { useThemeContext } from '@/context/ThemeContext'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { NAV_LINKS } from '@/lib/data'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { theme, toggle } = useThemeContext()
  const progress = useScrollProgress()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-slate-900/5 dark:bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
          style={{ scaleX: progress, transformOrigin: 'left' }}
        />
      </div>

      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-2 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl rounded-2xl px-6 py-3 transition-all duration-300',
          scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-display font-bold text-xl gradient-text">
            {'<Dev />'}
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-slate-900/70 dark:text-white/70 hover:text-slate-900 dark:text-white transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-indigo-400 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
            <li>
              <a
                href="/about"
                className="flex items-center gap-1.5 text-sm text-slate-900/70 dark:text-white/70 hover:text-slate-900 dark:text-white transition-colors duration-200 relative group"
              >
                <User size={13} />
                Profile
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-indigo-400 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-900/70 dark:text-white/70 hover:text-slate-900 dark:text-white hover:bg-slate-900/5 dark:bg-white/10 transition-all"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="#contact"
              className="hidden md:block px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors neo-shadow-sm"
            >
              Hire Me
            </a>
            <button
              className="md:hidden p-2 text-slate-900/70 dark:text-white/70 hover:text-slate-900 dark:text-white"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-30 glass rounded-2xl p-6"
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-slate-900/80 dark:text-white/80 hover:text-slate-900 dark:text-white text-lg font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-slate-900/80 dark:text-white/80 hover:text-slate-900 dark:text-white text-lg font-medium transition-colors"
                >
                  <User size={16} /> Profile
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
