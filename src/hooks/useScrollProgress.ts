import { useState, useEffect } from 'react'

/** Returns scroll progress 0–1 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      setProgress(scrollTop / (scrollHeight - clientHeight))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return progress
}
