import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export function Home() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Natinael Azmach — CS Graduate & Software Developer</title>
        <meta name="description" content="CS graduate building mobile and web solutions that solve real community problems. Kotlin, React, Node.js, Python and more." />
        <meta property="og:title" content="Natinael Azmach — Software Developer" />
        <meta property="og:description" content="Building solutions that matter — from power outage apps to civic platforms." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </HelmetProvider>
  )
}
