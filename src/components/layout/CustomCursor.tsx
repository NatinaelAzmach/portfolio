import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom cursor with a dot + ring that follows the mouse.
 * The ring has a spring delay for a magnetic feel.
 * Scales up on hoverable elements.
 */
export function CustomCursor() {
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)
  const ringX = useSpring(dotX, { stiffness: 150, damping: 20 })
  const ringY = useSpring(dotY, { stiffness: 150, damping: 20 })
  const isHovering = useRef(false)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.classList.add('custom-cursor')

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const enter = () => {
      isHovering.current = true
      ringRef.current?.classList.add('scale-[2.5]', 'border-indigo-400')
    }
    const leave = () => {
      isHovering.current = false
      ringRef.current?.classList.remove('scale-[2.5]', 'border-indigo-400')
    }

    window.addEventListener('mousemove', move)
    // Attach to all interactive elements
    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      document.body.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', move)
    }
  }, [dotX, dotY])

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-indigo-400 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ x: dotX, y: dotY }}
      />
      {/* Ring */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/40 rounded-full pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
        style={{ x: ringX, y: ringY }}
      />
    </>
  )
}
