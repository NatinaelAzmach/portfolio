import { useState, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from '@/context/ThemeContext'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { Navbar } from '@/components/layout/Navbar'
import { EasterEgg } from '@/components/ui/EasterEgg'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'
import { Profile } from '@/pages/Profile'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <ThemeProvider>
      <ErrorBoundary>
        {/* Custom cursor — hidden on touch devices via CSS */}
        <div className="hidden md:block">
          <CustomCursor />
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
          ) : (
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <EasterEgg />
            </BrowserRouter>
          )}
        </AnimatePresence>
      </ErrorBoundary>
    </ThemeProvider>
  )
}
