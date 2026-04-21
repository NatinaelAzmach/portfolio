import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDown, Building2 } from 'lucide-react'
import { EXPERIENCES } from '@/lib/data'

function ExperienceItem({ exp, index }: { exp: typeof EXPERIENCES[0]; index: number }) {
  const [expanded, setExpanded] = useState(index === 0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
      {/* Timeline dot */}
      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-[#0d0d0d]" />

      <div
        className="glass rounded-2xl p-6 cursor-pointer hover:border-indigo-500/30 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <Building2 size={18} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-lg">{exp.role}</h3>
              <p className="text-indigo-400 text-sm">{exp.company}</p>
              <p className="text-white/30 text-xs font-mono mt-0.5">{exp.period}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-white/30 flex-shrink-0 mt-1"
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-white/10">
                <p className="text-white/60 text-sm mb-4">{exp.description}</p>

                {/* Achievements */}
                <ul className="space-y-2 mb-4">
                  {exp.achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="text-indigo-400 mt-0.5 flex-shrink-0">▸</span>
                      {a}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map(t => (
                    <span key={t} className="px-2 py-0.5 text-xs font-mono bg-indigo-500/15 text-indigo-300 rounded-md border border-indigo-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="experience" className="py-32 bg-[#0d0d0d] relative">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div ref={ref} className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 font-mono text-sm mb-3 tracking-widest uppercase">Career</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Experience</h2>
        </motion.div>

        <div>
          {EXPERIENCES.map((exp, i) => (
            <ExperienceItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
