'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useAnimations'
import { FEATURED_PROJECTS, type Project } from '@/lib/projects'

const SERVICES = [
  {
    href: '/services#website-design',
    icon: '🎨',
    title: 'Website Design',
    desc: 'Clean, conversion-focused websites that explain what you do and make it easy for the right clients to get in touch.',
  },
  {
    href: '/services#web-development',
    icon: '💻',
    title: 'Web Development',
    desc: 'Fast, reliable WordPress and custom builds, including forms, tracking, and mobile performance.',
  },
  {
    href: '/services#software-development',
    icon: '🛠️',
    title: 'Software Development',
    desc: 'Custom tools and browser extensions that automate real workflows. RFQ AutoPilot is one example.',
  },
  {
    href: '/services#seo-services',
    icon: '📈',
    title: 'SEO Services',
    desc: 'Technical, on-page, and local SEO, including Google Business Profile, so people who are already searching can find you.',
  },
]

const PROCESS = [
  { num: '01', title: 'Discover', desc: 'We look at the business, the audience, and what the website or software actually needs to do.' },
  { num: '02', title: 'Plan', desc: 'Pages, structure, and how you will know it is working — before anything is designed or built.' },
  { num: '03', title: 'Build', desc: 'Design, development, and the SEO basics: speed, mobile layout, forms, and tracking.' },
  { num: '04', title: 'Launch', desc: 'The site or tool goes live with a clear next step, whether that is more pages or ongoing SEO.' },
]

const PROOF = [
  {
    title: 'Websites you can open',
    desc: 'Service businesses, professional firms, and companies that needed a clear place to send clients.',
    href: '/work',
    label: 'See the work',
  },
  {
    title: 'SEO on a live site',
    desc: 'Inoviqa.com is public. It is included as an example of site structure and SEO, not as a second service.',
    href: 'https://inoviqa.com/',
    label: 'Open inoviqa.com',
    external: true,
  },
  {
    title: 'Software in production',
    desc: 'RFQ AutoPilot is a custom tool that takes a real procurement workflow out of manual follow-up.',
    href: 'https://rfqautopilot.com/',
    label: 'Open rfqautopilot.com',
    external: true,
  },
]

function ServiceCard({ icon, title, desc, href }: { icon: string; title: string; desc: string; href: string }) {
  const cardRef = useRef<HTMLElement>(null)
  const handleMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect || !cardRef.current) return
    cardRef.current.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width) * 100 + '%')
    cardRef.current.style.setProperty('--my', ((e.clientY - rect.top) / rect.height) * 100 + '%')
  }
  return (
    <article className="srv-card reveal" ref={cardRef} onMouseMove={handleMove}>
      <div className="srv-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <Link href={href} className="srv-link">Learn More <span className="arrow">→</span></Link>
    </article>
  )
}

function ProjectCard({ item }: { item: Project }) {
  return (
    <article className="pf-card reveal">
      <div className="pf-thumb">
        <div className="pf-fallback">
          <strong>{item.name}</strong>
          <span>{item.domain}</span>
        </div>
        <div className="pf-overlay">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="pf-overlay-btn">View Live →</a>
        </div>
      </div>
      <div className="pf-info">
        <h3>{item.name}</h3>
        <p>{item.summary}</p>
        <div className="pf-tags">
          <span>{item.service}</span>
          <span>{item.industry}</span>
        </div>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="pf-live">Visit site →</a>
      </div>
    </article>
  )
}

export default function HomePage() {
  const sectionRefs = {
    services: useScrollReveal(),
    portfolio: useScrollReveal(),
    process: useScrollReveal(),
    proof: useScrollReveal(),
    cta: useScrollReveal(),
  }

  return (
    <>
      <header className="hero" id="hero">
        <div className="hero-mesh" />
        <div className="hero-grid" />
        <div className="hero-noise" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge" style={{ animation: 'fadeUp .8s .2s both' }}><span className="pulse-dot" /> Available for new projects</div>
            <h1 style={{ animation: 'fadeUp .8s .35s both' }}>Website Design, Development, Software &amp; SEO, <span className="text-gradient">Built to Get You Clients</span></h1>
            <p className="hero-sub" style={{ animation: 'fadeUp .8s .5s both' }}>I design and build websites, custom software, and SEO systems for businesses that need a clear online presence and measurable leads.</p>
            <div className="hero-ctas" style={{ animation: 'fadeUp .8s .65s both' }}>
              <Link href="/book" className="btn btn-brand">Book a Call <span className="arrow">→</span></Link>
              <Link href="/work" className="btn btn-ghost">See Selected Work</Link>
            </div>
            <div className="hero-stats" style={{ animation: 'fadeUp .8s .8s both' }}>
              <div className="stat"><div className="stat-num">500+</div><div className="stat-label">Projects Delivered</div></div>
              <div className="stat"><div className="stat-num">30+</div><div className="stat-label">Countries Served</div></div>
              <div className="stat"><div className="stat-num">7+</div><div className="stat-label">Years of Experience</div></div>
            </div>
          </div>
          <div className="hero-visual" style={{ animation: 'fadeUp .8s .5s both' }}>
            <div className="hero-image-wrap">
              <div className="hero-img-glow" />
              <div className="hero-img-container">
                <img src="/assets/walidhasan-logo.webp" alt="Walid Hasan, web designer, developer and SEO specialist" width="412" height="412" />
              </div>
              <div className="float-card fc1">Website Design</div>
              <div className="float-card fc2">Custom Software</div>
              <div className="float-card fc3">SEO Services</div>
            </div>
          </div>
        </div>
      </header>

      <section id="services" ref={sectionRefs.services} style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="sec-header center reveal">
            <div className="sec-label">Services</div>
            <h2 className="sec-title">Four ways to <span className="text-gradient">hire me</span></h2>
            <p className="sec-desc">Website design, web development, software, and SEO. Analytics, tracking, and conversion work sit inside the build and the SEO, not as separate offers.</p>
          </div>
          <div className="services-grid stagger">
            {SERVICES.map((service) => <ServiceCard key={service.title} {...service} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }} className="reveal">
            <Link href="/services" className="btn btn-ghost">Explore All Services <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <section id="work" ref={sectionRefs.portfolio} style={{ background: 'var(--bg-secondary)', padding: '110px 0' }}>
        <div className="container">
          <div className="sec-header center reveal">
            <div className="sec-label">Selected Work</div>
            <h2 className="sec-title">Projects across <span className="text-gradient">web, software &amp; SEO</span></h2>
            <p className="sec-desc">A short set of live sites. Open them — the pages are the proof.</p>
          </div>
          <div className="pf-grid stagger">
            {FEATURED_PROJECTS.map((project) => <ProjectCard key={project.url} item={project} />)}
          </div>
          <p className="credibility-line reveal">
            Founder of <a href="https://inoviqa.com/" target="_blank" rel="noopener noreferrer">Inoviqa LLC</a>. On this site that is one SEO example, not a separate agency offer.
          </p>
          <div style={{ textAlign: 'center', marginTop: 32 }} className="reveal">
            <Link href="/work" className="btn btn-ghost">View All Work <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <section ref={sectionRefs.process} style={{ background: 'var(--bg-primary)', padding: '110px 0' }}>
        <div className="container">
          <div className="sec-header center reveal">
            <div className="sec-label">How I Work</div>
            <h2 className="sec-title">A straightforward <span className="text-gradient">project path</span></h2>
            <p className="sec-desc">Four steps from the first conversation to launch. No extra retainers are assumed unless you want ongoing SEO.</p>
          </div>
          <div className="proc-track stagger">
            {PROCESS.map((step) => (
              <div className="proc-step reveal" key={step.num}><div className="proc-num">{step.num}</div><h4>{step.title}</h4><p>{step.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section ref={sectionRefs.proof} style={{ background: 'var(--bg-secondary)', padding: '110px 0' }}>
        <div className="container">
          <div className="sec-header center reveal">
            <div className="sec-label">Proof</div>
            <h2 className="sec-title">Results you can <span className="text-gradient">check</span></h2>
            <p className="sec-desc">The counts in the hero are the experience figures already published on this site. The proof below is specific work you can open.</p>
          </div>
          <div className="proof-grid stagger">
            {PROOF.map((item) => (
              <article className="proof-card reveal" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="srv-link">{item.label} <span className="arrow">→</span></a>
                ) : (
                  <Link href={item.href} className="srv-link">{item.label} <span className="arrow">→</span></Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" ref={sectionRefs.cta}>
        <div className="container">
          <div className="cta-inner reveal">
            <div className="sec-label">Start a project</div>
            <h2>Tell me what you need <span className="text-gradient">built</span></h2>
            <p>A website, custom software, or SEO. Send a note or book a call and I will reply with a sensible next step.</p>
            <div className="cta-contacts">
              <a href="mailto:hello@walidhasan.com">hello@walidhasan.com</a>
              <a href="https://wa.me/+8801774340932">WhatsApp +880 177 434 0932</a>
            </div>
            <div className="cta-btns">
              <Link href="/book" className="btn btn-brand">Book a Call <span className="arrow">→</span></Link>
              <Link href="/contact" className="btn btn-ghost">Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
