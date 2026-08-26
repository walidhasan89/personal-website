'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + 'px'
        ref.current.style.top = e.clientY + 'px'
      }
    }
    document.addEventListener('mousemove', handler, { passive: true })
    return () => document.removeEventListener('mousemove', handler)
  }, [])
  return <div className="cursor-glow" ref={ref} />
}
