import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const TECH_STACK = [
  { name: 'React', emoji: '⚛️' },
  { name: 'Python', emoji: '🐍' },
  { name: 'PHP', emoji: '🐘' },
  { name: 'Node.js', emoji: '🟢' },
  { name: 'TypeScript', emoji: '🔷' },
  { name: 'Tailwind', emoji: '🎨' },
  { name: 'Firebase', emoji: '🔥' },
  { name: 'MongoDB', emoji: '🍃' },
  { name: 'Android', emoji: '📱' },
  { name: 'Kotlin', emoji: '🤖' },
]

const TIMELINE = [
  { year: '2022', event: 'Fell in love with web dev — started building with React and PHP' },
  { year: '2023', event: 'Expanded deeper into web — Node.js, APIs, and full-stack projects' },
  { year: '2024', event: 'Built a real estate web app for the local market' },
  { year: '2025', event: 'Built first real-world mobile app: Power Outage Utility for the community' },
  { year: '2026', event: 'Graduated — ready to build things that matter at scale' },
]

export function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Bio */}
          <div>
            <p className="text-indigo-400 font-mono text-sm mb-3 tracking-widest uppercase">About Me</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              I build solutions, not just apps
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Hey, I'm Natinael — a Computer Science graduate with an insatiable curiosity for
                solving real-world problems through code. My journey has taken me from building
                utility apps that help communities cope with power outages, to creating social
                platforms that connect university students in meaningful ways.
              </p>
              <p>
                What drives me? Problems that matter. Whether it's improving civic engagement
                through city administration websites or streamlining real estate transactions in
                emerging markets, I thrive on creating solutions that make a tangible difference
                in people's lives.
              </p>
              <p className="italic text-white/40 border-l-2 border-indigo-500 pl-4">
                "I don't just build apps — I build solutions for problems that people face every
                day. Technology should serve humanity, and that's the philosophy I bring to every
                project."
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="/resume.pdf"
                download
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors neo-shadow-sm"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 glass text-white text-sm font-medium rounded-xl border border-white/20 hover:bg-white/10 transition-colors"
              >
                Let's Talk
              </a>
            </div>
          </div>

          {/* Right column: tech stack + timeline */}
          <div className="space-y-10">
            {/* Floating tech icons */}
            <div>
              <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-3">
                {TECH_STACK.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="glass px-3 py-2 rounded-xl text-sm text-white/80 flex items-center gap-2 cursor-default"
                  >
                    <span>{tech.emoji}</span>
                    <span>{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-4">Journey</p>
              <div className="relative pl-6 border-l border-white/10 space-y-6">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-[25px] w-3 h-3 rounded-full bg-indigo-500 border-2 border-[#0a0a0a]" />
                    <span className="text-indigo-400 font-mono text-xs">{item.year}</span>
                    <p className="text-white/70 text-sm mt-1">{item.event}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
