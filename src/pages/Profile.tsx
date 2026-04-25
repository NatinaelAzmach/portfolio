import { lazy, Suspense } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Github, Linkedin, Twitter, Mail, MapPin,
  GraduationCap, Heart, Coffee, Zap, Download,
  Code2, Smartphone, Globe, Database,
} from 'lucide-react'
import { Footer } from '@/components/sections/Footer'

// ─── Static data ────────────────────────────────────────────────────────────

const VALUES = [
  {
    icon: Heart,
    title: 'Purpose-driven',
    desc: 'Every project I take on has to solve a real problem for real people. If it doesn\'t matter to someone\'s daily life, I\'m not interested.',
  },
  {
    icon: Zap,
    title: 'Bias for action',
    desc: 'I\'d rather ship something imperfect and iterate than wait for perfect. Learning happens in production.',
  },
  {
    icon: Coffee,
    title: 'Relentless curiosity',
    desc: 'I pick up new stacks fast because I genuinely enjoy the process of figuring things out. Kotlin one week, Python the next.',
  },
  {
    icon: Code2,
    title: 'Clean by default',
    desc: 'Readable code is a form of respect for the next developer — who is usually future me at 2am.',
  },
]

const FOCUS_AREAS = [
  { icon: Smartphone, label: 'Android / Mobile', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { icon: Globe, label: 'Web (React + Node)', color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { icon: Database, label: 'Backend & APIs', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { icon: Code2, label: 'Civic & Community Tech', color: 'text-purple-400', bg: 'bg-purple-400/10' },
]

const FUN_FACTS = [
  'Built my first app to solve a problem my own neighborhood had',
  'Can context-switch between Kotlin and JavaScript in the same afternoon',
  'Believe emerging markets are the most interesting design constraint',
  'Favourite debugging tool: a long walk and a coffee',
  'Currently reading: "The Pragmatic Programmer"',
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-indigo-400 font-mono text-xs tracking-widest uppercase mb-3">
      {children}
    </p>
  )
}

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Profile avatar placeholder (initials) ───────────────────────────────────

function Avatar() {
  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto">
      {/* Glow ring */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 blur-2xl opacity-30 scale-105" />
      {/* Card */}
      <div className="relative glass rounded-3xl w-full h-full flex flex-col items-center justify-center gap-4 border border-slate-900/10 dark:border-white/10 overflow-hidden">
        {/* Initials */}
        <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
          <span className="font-display text-4xl font-bold text-slate-900 dark:text-white select-none">NA</span>
        </div>
        <div className="text-center px-6">
          <p className="font-display font-bold text-slate-900 dark:text-white text-xl">Natinael Azmach</p>
          <p className="text-slate-900/50 dark:text-white/50 text-sm mt-1">CS Graduate · Developer</p>
          {/* Location */}
          <div className="flex items-center justify-center gap-1.5 mt-3 text-slate-900/40 dark:text-white/40 text-xs">
            <MapPin size={12} />
            <span>Ethiopia</span>
          </div>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-xs font-medium">Open to opportunities</span>
        </div>

        {/* Quick links */}
        <div className="flex gap-3 pb-6">
          {[
            { icon: Github, href: 'https://github.com/NatinaelAzmach/meh', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/natinael-azmach-1b9ab5404/', label: 'LinkedIn' },
            { icon: Twitter, href: 'https://twitter.com/natinael', label: 'Twitter' },
            { icon: Mail, href: 'mailto:natinaelazmach@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -3, scale: 1.1 }}
              className="w-9 h-9 glass rounded-xl flex items-center justify-center text-slate-900/50 dark:text-white/50 hover:text-slate-900 dark:text-white border border-slate-900/10 dark:border-white/10 hover:border-indigo-500/40 transition-colors"
            >
              <Icon size={15} />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function Profile() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>About Natinael Azmach — Developer Profile</title>
        <meta
          name="description"
          content="Get to know Natinael Azmach — CS graduate, mobile & web developer, and builder of community-focused software."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a]">
        {/* ── Hero banner ── */}
        <div className="relative pt-28 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.18)_0%,transparent_65%)] pointer-events-none" />

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left: avatar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Avatar />
            </motion.div>

            {/* Right: intro */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <SectionLabel>Who I am</SectionLabel>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                A developer who builds for{' '}
                <span className="gradient-text">people, not portfolios</span>
              </h1>
              <p className="text-slate-900/60 dark:text-white/60 leading-relaxed mb-4">
                I'm Natinael — a Computer Science graduate with an insatiable curiosity for
                solving real-world problems through code. My journey has taken me from building
                utility apps that help communities cope with power outages, to creating social
                platforms that connect university students in meaningful ways.
              </p>
              <p className="text-slate-900/60 dark:text-white/60 leading-relaxed mb-8">
                I recently graduated and I'm at my best when the problem is messy, the
                constraints are real, and the people who'll use the solution are right in
                front of me. That's the kind of work I want to do more of.
              </p>

              {/* Education */}
              <div className="flex items-start gap-3 glass rounded-xl p-4 mb-6">
                <GraduationCap size={20} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-900 dark:text-white font-medium text-sm">B.Sc. Computer Science</p>
                  <p className="text-slate-900/40 dark:text-white/40 text-xs mt-0.5">Graduated 2026 · Computer Science</p>
                </div>
              </div>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  onClick={e => { e.preventDefault(); window.location.href = '/#contact' }}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors neo-shadow-sm"
                >
                  Work with me
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 px-6 py-2.5 glass text-slate-900 dark:text-white text-sm font-medium rounded-xl border border-slate-900/10 dark:border-white/20 hover:bg-slate-900/5 dark:bg-white/10 transition-colors"
                >
                  <Download size={14} />
                  Download CV
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── What I focus on ── */}
        <section className="py-20 px-4 border-t border-slate-900/10 dark:border-white/5">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <SectionLabel>Focus areas</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-10">
                What I actually work on
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FOCUS_AREAS.map((area, i) => (
                <FadeIn key={area.label} delay={i * 0.08}>
                  <div className="glass rounded-2xl p-5 h-full hover:border-slate-900/10 dark:border-white/20 transition-colors border border-slate-900/10 dark:border-white/5">
                    <div className={`w-10 h-10 rounded-xl ${area.bg} flex items-center justify-center mb-4`}>
                      <area.icon size={18} className={area.color} />
                    </div>
                    <p className="text-slate-900 dark:text-white font-medium text-sm">{area.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Philosophy / values ── */}
        <section className="py-20 px-4 bg-white dark:bg-[#0d0d0d]">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <SectionLabel>How I work</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-4">
                What you can expect from me
              </h2>
              <blockquote className="border-l-2 border-indigo-500 pl-5 text-slate-900/50 dark:text-white/50 italic text-lg mb-12 max-w-2xl">
                "I don't just build apps — I build solutions for problems that people face every
                day. Technology should serve humanity, and that's the philosophy I bring to every
                project."
              </blockquote>
            </FadeIn>

            <div className="grid sm:grid-cols-2 gap-5">
              {VALUES.map((v, i) => (
                <FadeIn key={v.title} delay={i * 0.1}>
                  <div className="glass rounded-2xl p-6 h-full border border-slate-900/10 dark:border-white/5 hover:border-indigo-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center">
                        <v.icon size={16} className="text-indigo-400" />
                      </div>
                      <p className="font-display font-semibold text-slate-900 dark:text-white">{v.title}</p>
                    </div>
                    <p className="text-slate-900/50 dark:text-white/50 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tech toolbox ── */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <SectionLabel>Tech toolbox</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-10">
                Tools I reach for
              </h2>
            </FadeIn>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                {
                  category: 'Mobile',
                  color: 'border-emerald-500/30',
                  dot: 'bg-emerald-400',
                  tools: ['Kotlin', 'Android SDK', 'React Native', 'Firebase', 'Room DB', 'Jetpack Compose'],
                },
                {
                  category: 'Frontend',
                  color: 'border-indigo-500/30',
                  dot: 'bg-indigo-400',
                  tools: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
                },
                {
                  category: 'Backend',
                  color: 'border-cyan-500/30',
                  dot: 'bg-cyan-400',
                  tools: ['Node.js', 'Python', 'PHP', 'REST APIs', 'WebSockets'],
                },
                {
                  category: 'Data & Infra',
                  color: 'border-purple-500/30',
                  dot: 'bg-purple-400',
                  tools: ['MySQL', 'MongoDB', 'Firebase', 'Git', 'Linux'],
                },
              ].map((group, gi) => (
                <FadeIn key={group.category} delay={gi * 0.1}>
                  <div className={`glass rounded-2xl p-6 border ${group.color}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`w-2 h-2 rounded-full ${group.dot}`} />
                      <p className="text-slate-900/60 dark:text-white/60 text-xs font-mono uppercase tracking-widest">
                        {group.category}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.tools.map(tool => (
                        <span
                          key={tool}
                          className="px-3 py-1 text-xs font-medium text-slate-900/70 dark:text-white/70 bg-slate-900/5 dark:bg-white/5 rounded-lg border border-slate-900/10 dark:border-white/10"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Fun facts ── */}
        <section className="py-20 px-4 bg-white dark:bg-[#0d0d0d]">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <SectionLabel>A bit more</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-10">
                Things worth knowing
              </h2>
            </FadeIn>
            <div className="space-y-3">
              {FUN_FACTS.map((fact, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="flex items-start gap-4 glass rounded-xl px-5 py-4 border border-slate-900/10 dark:border-white/5">
                    <span className="text-indigo-400 font-mono text-sm flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-slate-900/70 dark:text-white/70 text-sm leading-relaxed">{fact}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA banner ── */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none" />
          <FadeIn className="max-w-2xl mx-auto text-center relative">
            <p className="text-indigo-400 font-mono text-xs tracking-widest uppercase mb-4">
              Let's collaborate
            </p>
            <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to build something that matters?
            </h2>
            <p className="text-slate-900/50 dark:text-white/50 mb-8">
              I'm looking to work with people who care about impact. If that sounds like you,
              let's talk.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:natinaelazmach@gmail.com"
                className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all neo-shadow"
              >
                <Mail size={16} />
                Get in touch
              </a>
              <a
                href="/"
                className="px-8 py-3 glass text-slate-900 dark:text-white font-medium rounded-xl border border-slate-900/10 dark:border-white/20 hover:bg-slate-900/5 dark:bg-white/10 transition-all"
              >
                View my work
              </a>
            </div>
          </FadeIn>
        </section>

        <Footer />
      </div>
    </HelmetProvider>
  )
}
