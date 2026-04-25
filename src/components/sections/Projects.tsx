import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, X } from 'lucide-react'
import { PROJECTS } from '@/lib/data'
import type { Project } from '@/types'

type Filter = 'all' | 'fullstack' | 'aiml' | 'mobile'

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'AI / ML', value: 'aiml' },
  { label: 'Mobile', value: 'mobile' },
]

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/70 dark:bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="glass-dark rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-56 object-cover rounded-t-2xl"
        />
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
            <button onClick={onClose} className="text-slate-900/40 dark:text-white/40 hover:text-slate-900 dark:text-white transition-colors p-1">
              <X size={20} />
            </button>
          </div>
          <p className="text-slate-900/60 dark:text-white/60 leading-relaxed mb-6">{project.longDescription}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-xs font-mono bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-xl transition-colors">
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 glass text-slate-900 dark:text-white text-sm rounded-xl border border-slate-900/10 dark:border-white/20 hover:bg-slate-900/5 dark:bg-white/10 transition-colors">
                <Github size={14} /> Source
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden group/image">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        {project.featured && (
          <span className="absolute top-3 right-3 px-2 py-1 text-xs font-mono bg-indigo-600 text-white rounded-full z-10 pointer-events-none">
            Featured
          </span>
        )}
        
        {/* Hover overlay for the Visit link */}
        {project.demoUrl && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-transform hover:scale-105 shadow-lg shadow-black/20"
            >
              <ExternalLink size={16} /> Visit Project
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg mb-2">{project.title}</h3>
        <p className="text-slate-900/50 dark:text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-0.5 text-xs font-mono bg-slate-900/5 dark:bg-white/5 text-slate-900/50 dark:text-white/50 rounded-md">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs font-mono text-slate-900/30 dark:text-white/30">+{project.tags.length - 3}</span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3" onClick={e => e.stopPropagation()}>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
              <ExternalLink size={12} /> Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-900/40 dark:text-white/40 hover:text-slate-900/70 dark:text-white/70 transition-colors">
              <Github size={12} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Project | null>(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  const filtered = PROJECTS.filter(p => filter === 'all' || p.category === filter)

  return (
    <section id="projects" className="py-32 bg-slate-50/50 dark:bg-[#0d0d0d] relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 font-mono text-sm mb-3 tracking-widest uppercase">Work</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Selected Projects
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === f.value
                  ? 'bg-indigo-600 text-white neo-shadow-sm'
                  : 'glass text-slate-900/60 dark:text-white/60 hover:text-slate-900 dark:text-white border border-slate-900/10 dark:border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} onClick={() => setSelected(project)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
