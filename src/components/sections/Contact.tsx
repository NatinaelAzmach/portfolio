import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, Github, Linkedin, Twitter, Mail, Download } from 'lucide-react'

interface FormState {
  name: string
  email: string
  message: string
}

/** Floating label input */
function FloatingInput({
  id, label, type = 'text', value, onChange, multiline,
}: {
  id: string; label: string; type?: string
  value: string; onChange: (v: string) => void; multiline?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  const shared = {
    id,
    value,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className:
      'w-full bg-transparent border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white text-sm outline-none focus:border-indigo-500 transition-colors',
  }

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          {...shared}
          rows={5}
          onChange={e => onChange(e.target.value)}
          style={{ resize: 'none' }}
        />
      ) : (
        <input
          {...shared}
          type={type}
          onChange={e => onChange(e.target.value)}
        />
      )}
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none text-white/40 ${
          active ? 'top-2 text-xs text-indigo-400' : 'top-4 text-sm'
        }`}
      >
        {label}
      </label>
    </div>
  )
}

export function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Replace with your Formspree endpoint or EmailJS call
    try {
      await fetch('https://formspree.io/f/xzdyawoo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div ref={ref} className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 font-mono text-sm mb-3 tracking-widest uppercase">Get In Touch</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            I'm actively looking to collaborate with passionate developers, designers, and
            innovators. Let's build something relevant. Let's build something that matters.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <FloatingInput id="name" label="Your Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
            <FloatingInput id="email" label="Email Address" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
            <FloatingInput id="message" label="Your Message" value={form.message} onChange={v => setForm(f => ({ ...f, message: v }))} multiline />

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium rounded-xl transition-all neo-shadow"
            >
              {status === 'sending' ? (
                <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                <Send size={16} />
              )}
              {status === 'sent' ? 'Message Sent!' : status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'error' && (
              <p className="text-red-400 text-sm text-center">Something went wrong. Try emailing me directly.</p>
            )}
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Availability */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-medium">Open to opportunities</span>
              </div>
              <p className="text-white/50 text-sm">
                Recently graduated and actively looking for full-time roles or exciting
                collaborations. Response time: within 24h.
              </p>
            </div>

            {/* Email */}
            <div>
              <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-3">Direct Email</p>
              <a href="mailto:natinaelazmach0941421023@gmail.com" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <Mail size={16} className="text-indigo-400" />
                natinaelazmach0941421023@gmail.com
              </a>
            </div>

            {/* Social */}
            <div>
              <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-3">Social</p>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: 'https://github.com/NatinaelAzmach/meh', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/natinael', label: 'LinkedIn' },
                  { icon: Twitter, href: 'https://twitter.com/natinael', label: 'Twitter' },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/50 hover:text-white border border-white/10 hover:border-indigo-500/50 transition-colors"
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Resume */}
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-5 py-3 glass rounded-xl text-white/70 hover:text-white border border-white/10 hover:border-indigo-500/30 transition-all text-sm"
            >
              <Download size={16} className="text-indigo-400" />
              Download Resume (PDF)
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
