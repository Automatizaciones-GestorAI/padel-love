'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  onClick?: () => void
  'data-cursor'?: string
}

export function MagneticButton({ children, className = '', onClick, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={className}
      data-cursor={props['data-cursor']}
    >
      {children}
    </motion.div>
  )
}
