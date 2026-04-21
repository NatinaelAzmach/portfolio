import { useState, useEffect } from 'react'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

/** Fires callback when the Konami code is entered */
export function useKonamiCode(callback: () => void) {
  const [keys, setKeys] = useState<string[]>([])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setKeys(prev => {
        const next = [...prev, e.key].slice(-KONAMI.length)
        if (next.join(',') === KONAMI.join(',')) callback()
        return next
      })
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [callback])
}
