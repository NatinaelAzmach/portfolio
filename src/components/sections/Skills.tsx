import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, Tooltip
} from 'recharts'
import { SKILLS } from '@/lib/data'
import { useThemeContext } from '@/context/ThemeContext'

const CATEGORIES = ['frontend', 'backend', 'devops', 'other'] as const

const RADAR_DATA = [
  { subject: 'Frontend', value: 90 },
  { subject: 'Backend', value: 78 },
  { subject: 'Database', value: 75 },
  { subject: 'DevOps', value: 65 },
  { subject: 'AI/ML', value: 55 },
  { subject: 'Mobile', value: 55 },
]

function SkillBar({ name, level, years, delay }: { name: string; level: number; years: number; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-slate-900/80 dark:text-white/80">{name}</span>
        <span className="text-xs font-mono text-indigo-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-slate-900/5 dark:bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
      {/* Tooltip */}
      <AnimatedTooltip show={hovered} text={`${years} year${years !== 1 ? 's' : ''} experience`} />
    </div>
  )
}

function AnimatedTooltip({ show, text }: { show: boolean; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 4 }}
      className="absolute -top-8 right-0 px-2 py-1 bg-indigo-600 text-white text-xs rounded-lg pointer-events-none whitespace-nowrap z-10"
    >
      {text}
    </motion.div>
  )
}

export function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('frontend')

  const { theme } = useThemeContext()
  const isDark = theme === 'dark'

  const filtered = SKILLS.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className="py-32 bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/30 dark:bg-[#0a0a0a] dark:bg-none relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 font-mono text-sm mb-3 tracking-widest uppercase">Expertise</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Skills & Tools</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Radar chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <p className="text-slate-900/40 dark:text-white/40 text-xs font-mono uppercase tracking-widest mb-4">Skill Radar</p>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', fontSize: 12 }} />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{ background: isDark ? '#1a1a2e' : '#ffffff', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8 }}
                  labelStyle={{ color: isDark ? 'white' : 'black' }}
                  itemStyle={{ color: '#6366f1' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Skill bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                    activeCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'glass text-slate-900/50 dark:text-white/50 hover:text-slate-900 dark:text-white border border-slate-900/10 dark:border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              {filtered.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  years={skill.years}
                  delay={i * 0.1}
                />
              ))}
              {filtered.length === 0 && (
                <p className="text-slate-900/30 dark:text-white/30 text-sm">No skills in this category yet.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
