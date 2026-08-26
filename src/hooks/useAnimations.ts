'use client'

import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('vis')
            obs.unobserve(e.target)
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    const targets = el.querySelectorAll('.reveal,.reveal-l,.reveal-r')
    targets.forEach((t) => obs.observe(t))
    return () => targets.forEach((t) => obs.unobserve(t))
  }, [])
  return ref
}

export function useCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const done = useRef(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done.current) {
          done.current = true
          ref.current?.querySelectorAll('[data-count]').forEach((el) => {
            const htmlEl = el as HTMLElement
            const target = parseInt(htmlEl.dataset.count || '0')
            let curr = 0
            const inc = target / 45
            const t = setInterval(() => {
              curr += inc
              if (curr >= target) {
                curr = target
                clearInterval(t)
              }
              htmlEl.textContent = Math.floor(curr) + (htmlEl.dataset.suffix || '+')
            }, 28)
          })
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return ref
}

export function useSkillAnimation() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          ref.current?.querySelectorAll('.skill-fill').forEach((el) => el.classList.add('animated'))
          obs.unobserve(e.target)
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return ref
}
