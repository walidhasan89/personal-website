'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useScrollReveal } from '@/hooks/useAnimations'
import { PROJECTS, type Project, type ServiceLabel } from '@/lib/projects'

const css = `
.cs-hero{padding:160px 0 80px;position:relative;overflow:hidden;text-align:center}
.cs-hero-mesh{position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 30%,rgba(37,99,235,0.12),transparent 60%);pointer-events:none}
[data-theme="light"] .cs-hero-mesh{background:radial-gradient(ellipse 60% 50% at 50% 30%,rgba(37,99,235,0.05),transparent 60%)}
.cs-hero-inner{position:relative;z-index:2;max-width:820px;margin:0 auto}
.cs-hero h1{font-family:var(--font-heading);font-size:clamp(2rem,4.5vw,3.2rem);font-weight:700;line-height:1.14;letter-spacing:-.6px;margin-bottom:20px}
.cs-hero-sub{font-size:1.08rem;color:var(--text-secondary);line-height:1.85;margin-bottom:8px;max-width:640px;margin-left:auto;margin-right:auto}
.filter-bar{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:48px}
.filter-btn{padding:8px 18px;border-radius:var(--r-pill);font-family:var(--font-body);font-size:.8rem;font-weight:600;border:1px solid var(--border-subtle);background:var(--bg-card);color:var(--text-secondary);cursor:pointer;transition:all .3s}
.filter-btn:hover{border-color:var(--brand-500);color:var(--text-primary)}
.filter-btn.active{background:var(--gradient-brand);color:#fff;border-color:transparent}
.projects-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.project-card{background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-md);overflow:hidden;transition:all .5s cubic-bezier(.4,0,.2,1);opacity:0;transform:translateY(20px)}
.project-card.visible{opacity:1;transform:translateY(0)}
.project-card:hover{border-color:var(--border-hover);box-shadow:var(--shadow-card)}
.pc-thumb{position:relative;overflow:hidden;aspect-ratio:16/10}
.pc-fallback{width:100%;height:100%;display:flex;flex-direction:column;justify-content:flex-end;gap:6px;padding:18px;background:radial-gradient(ellipse 90% 80% at 15% 0%,rgba(37,99,235,0.42),transparent 58%),linear-gradient(165deg,#10182f 0%,#070b16 72%)}
.pc-fallback strong{font-family:var(--font-heading);font-size:1.05rem;font-weight:700}
.pc-fallback span{font-size:.72rem;color:var(--text-muted);font-family:var(--font-mono)}
.pc-overlay{position:absolute;inset:0;background:rgba(6,6,17,0.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .4s}
.project-card:hover .pc-overlay{opacity:1}
.pc-live-btn{padding:10px 24px;background:var(--gradient-brand);color:#fff;border-radius:var(--r-pill);font-size:.85rem;font-weight:600}
.pc-info{padding:18px}
.pc-info h3{font-family:var(--font-heading);font-size:.95rem;font-weight:700;margin-bottom:4px}
.pc-industry{font-size:.72rem;color:var(--brand-500);font-weight:600;margin-bottom:8px}
.pc-desc{font-size:.82rem;color:var(--text-secondary);line-height:1.65;margin-bottom:10px}
.pc-tags{display:flex;gap:5px;flex-wrap:wrap}
.pc-tags span{padding:3px 9px;background:rgba(37,99,235,0.06);border:1px solid rgba(59,130,246,0.08);border-radius:var(--r-pill);font-size:.65rem;color:var(--brand-500);font-weight:600}
.pc-text-link{display:inline-flex;margin-top:12px;color:var(--brand-500);font-size:.8rem;font-weight:600}
.cta-section{padding:120px 0;background:var(--bg-secondary);position:relative;overflow:hidden}
.cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 60% at 50% 50%,rgba(37,99,235,0.1),transparent 70%)}
.cta-inner{max-width:720px;margin:0 auto;text-align:center;position:relative;z-index:1}
.cta-inner h2{font-family:var(--font-heading);font-size:clamp(2rem,3.8vw,2.8rem);font-weight:700;letter-spacing:-.5px;margin-bottom:16px}
.cta-inner p{font-size:1.02rem;color:var(--text-secondary);margin-bottom:36px;line-height:1.8}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
@media(max-width:1080px){.projects-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.cs-hero{padding:130px 0 60px}.projects-grid{grid-template-columns:1fr}}
`

const FILTERS: Array<'All' | ServiceLabel> = [
  'All',
  'Website Design',
  'Web Development',
  'Software Development',
  'SEO Services',
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setVisible(true), (index % 6) * 80)
        obs.unobserve(entry.target)
      }
    }, { threshold: 0.05 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [index])

  return (
    <article className={`project-card${visible ? ' visible' : ''}`} ref={ref} style={{ transitionDelay: `${(index % 6) * 0.08}s` }}>
      <div className="pc-thumb">
        <div className="pc-fallback">
          <strong>{project.name}</strong>
          <span>{project.domain}</span>
        </div>
        <div className="pc-overlay">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="pc-live-btn">View Live Site <span className="arrow">→</span></a>
        </div>
      </div>
      <div className="pc-info">
        <h3>{project.name}</h3>
        <div className="pc-industry">{project.industry}</div>
        <p className="pc-desc">{project.summary}</p>
        <div className="pc-tags"><span>{project.service}</span></div>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="pc-text-link">Visit site →</a>
      </div>
    </article>
  )
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>('All')
  const heroRef = useScrollReveal()
  const ctaRef = useScrollReveal()
  const filtered = activeFilter === 'All' ? PROJECTS : PROJECTS.filter((project) => project.service === activeFilter)

  return (
    <>
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: css }} />

      <section className="cs-hero" ref={heroRef}>
        <div className="cs-hero-mesh" /><div className="orb orb-1" /><div className="orb orb-2" />
        <Breadcrumbs items={[{ name: 'Work', path: '/work' }]} />
        <div className="container cs-hero-inner">
          <div className="sec-label reveal">Work</div>
          <h1 className="reveal">Selected <span className="text-gradient">client work</span></h1>
          <p className="cs-hero-sub reveal">Ten projects that show the four services: website design, web development, software, and SEO. Each card links to the live site.</p>
        </div>
      </section>

      <section style={{ background: 'var(--bg-primary)', padding: '0 0 110px' }}>
        <div className="container">
          <h2 className="sr-only">Selected projects</h2>
          <div className="filter-bar">
            {FILTERS.map((filter) => (
              <button key={filter} type="button" className={`filter-btn${activeFilter === filter ? ' active' : ''}`} onClick={() => setActiveFilter(filter)}>
                {filter}
              </button>
            ))}
          </div>
          <div className="projects-grid">
            {filtered.map((project, index) => <ProjectCard key={project.url} project={project} index={index} />)}
          </div>
        </div>
      </section>

      <section className="cta-section" ref={ctaRef}>
        <div className="container">
          <div className="cta-inner">
            <div className="sec-label reveal">Next step</div>
            <h2 className="reveal">Want something in this <span className="text-gradient">direction?</span></h2>
            <p className="reveal">Tell me about the site, the software, or the search visibility you need. I will reply with scope, not a generic pitch.</p>
            <div className="cta-btns reveal">
              <Link href="/book" className="btn btn-brand">Book a Call <span className="arrow">→</span></Link>
              <Link href="/services" className="btn btn-ghost">View Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
