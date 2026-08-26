'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { faqPageSchema } from '@/lib/schema'
import { useScrollReveal, useCounter } from '@/hooks/useAnimations'

// ─── DATA ───
const TRUST_CHIPS = [
  { icon: '🏆', text: '500+ Projects Delivered' },
  { icon: '⭐', text: '5-Star Rated Seller' },
  { icon: '🏢', text: 'Inoviqa LLC — Registered Agency' },
  { icon: '🌍', text: '30+ Countries Served' },
  { icon: '🧩', text: 'Chrome Extension Creator' },
  { icon: '👥', text: '200+ Happy Customers' },
  { icon: '📈', text: 'World Domination 23%' },
  { icon: '🔧', text: 'Free SEO Tools Builder' },
]

const SERVICES = [
  { icon: '🎨', title: 'Website Design & Development', desc: 'High-converting WordPress websites, Elementor landing pages, and business sites engineered for lead generation and authority positioning.' },
  { icon: '📈', title: 'SEO Strategy & Execution', desc: 'Comprehensive on-page, technical, and off-page SEO systems designed to dominate organic search and drive sustainable traffic growth.' },
  { icon: '📍', title: 'Local SEO & GBP Optimization', desc: 'Google Business Profile optimization and local SEO strategies that put your business at the top of map results and local search.' },
  { icon: '📊', title: 'Web Analytics & Tracking', desc: 'Advanced analytics setups, conversion tracking, and data-driven insights that reveal exactly where your growth opportunities are.' },
  { icon: '🚀', title: 'Lead Generation Strategy', desc: 'End-to-end lead generation systems combining landing pages, SEO funnels, and conversion optimization to fill your pipeline.' },
  { icon: '⚡', title: 'Conversion Rate Optimization', desc: 'Data-backed CRO strategies that transform existing traffic into more leads, more sales, and more revenue — without more ad spend.' },
]

const WHY_ITEMS = [
  { icon: '🎯', title: 'Strategy-First Approach', desc: 'Every project starts with business strategy, not just design. I map your goals to a digital growth system tailored for your market.' },
  { icon: '🔬', title: 'Data-Driven Execution', desc: 'No guesswork. Every decision is backed by analytics, conversion data, and industry benchmarks that drive real measurable outcomes.' },
  { icon: '🏗️', title: 'Full-Stack Digital Systems', desc: 'From design to SEO to analytics to conversion — I deliver complete growth systems, not disconnected pieces.' },
  { icon: '🌐', title: 'International Standards', desc: 'Serving clients across 30+ countries with enterprise-grade quality, professional communication, and world-class deliverables.' },
  { icon: '⚡', title: 'Speed & Reliability', desc: 'Consistent on-time delivery with transparent communication. Your project is never left waiting in a queue.' },
  { icon: '🤝', title: 'Long-Term Partnership', desc: 'I don\'t disappear after delivery. Ongoing optimization, support, and strategic guidance to keep your growth compounding.' },
]

const RESULTS = [
  { num: '500+', label: 'Projects Delivered' },
  { num: '200+', label: 'Happy Customers' },
  { num: '30+', label: 'Countries Served' },
  { num: '23%', label: 'World Domination' },
]

const PORTFOLIO = [
  { url: 'https://inoviqa.com/', img: 'https://api.microlink.io/?url=https://inoviqa.com&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&overlay.browser=false&viewport.width=1280&viewport.height=800', title: 'Inoviqa LLC — Agency Website', desc: 'Premium digital agency website with conversion-focused design, service architecture, and trust-building authority positioning.', tags: ['WordPress', 'Agency', 'SEO'] },
  { url: 'https://rfqautopilot.com/', img: 'https://api.microlink.io/?url=https://rfqautopilot.com&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&overlay.browser=false&viewport.width=1280&viewport.height=800', title: 'RFQ AutoPilot — SaaS Product', desc: 'SaaS landing page for procurement automation tool with product showcase, feature highlights, and conversion funnel.', tags: ['SaaS', 'Landing Page', 'Product'] },
  { url: 'https://enginious.ae/', img: 'https://api.microlink.io/?url=https://enginious.ae&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&overlay.browser=false&viewport.width=1280&viewport.height=800', title: 'Enginious — Engineering Firm', desc: 'Corporate web presence for a UAE-based engineering company with professional design and service-oriented architecture.', tags: ['Corporate', 'WordPress', 'UAE'] },
  { url: 'https://jointalently.com/', img: 'https://api.microlink.io/?url=https://jointalently.com&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&overlay.browser=false&viewport.width=1280&viewport.height=800', title: 'Talently — HR & Recruitment', desc: 'Modern recruitment platform with clean UX, applicant flows, and conversion-optimized job listing architecture.', tags: ['Platform', 'HR Tech', 'CRO'] },
  { url: 'https://replychief.com/', img: 'https://api.microlink.io/?url=https://replychief.com&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&overlay.browser=false&viewport.width=1280&viewport.height=800', title: 'ReplyChief — Communication Tool', desc: 'SaaS product site for an intelligent reply management system with feature showcase and user onboarding flow.', tags: ['SaaS', 'Chrome Extension', 'Product'] },
  { url: 'https://silkwaterswindowsandeaves.com/', img: 'https://api.microlink.io/?url=https://silkwaterswindowsandeaves.com&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&overlay.browser=false&viewport.width=1280&viewport.height=800', title: 'Silk Waters — Local Business', desc: 'Local service business website with local SEO, Google Business Profile optimization, and lead generation system.', tags: ['Local SEO', 'GBP', 'Lead Gen'] },
]

const PRODUCTS = [
  { badge: 'Chrome Extension', title: 'ReplyChief', desc: 'Streamlines communication workflows for faster, consistent responses — saving hours of repetitive work for busy professionals and teams.', url: 'https://replychief.com/', linkText: 'Visit ReplyChief' },
  { badge: 'Chrome Extension', title: 'Shopify AdminPalette', desc: 'Quick-access commands that enhance Shopify admin productivity with keyboard shortcuts and rapid navigation tools for store managers.', url: 'https://adminpalette.com/', linkText: 'Visit AdminPalette' },
  { badge: 'Chrome Extension', title: 'RFQ AutoPilot', desc: 'Automates supplier RFQ processes for procurement and sourcing teams — reducing manual effort and accelerating response times.', url: 'https://rfqautopilot.com/', linkText: 'Visit RFQ AutoPilot' },
  { badge: 'New Launch', title: 'Site Audit Extension', desc: 'Instant website SEO auditing right from Chrome — analyze on-page SEO, meta tags, headings, performance issues, and technical health in one click.', url: 'https://chromewebstore.google.com/detail/bpopbhodmhhbedeepfkmifaciaafjbgn', linkText: 'View on Chrome Store' },
]

const TESTIMONIALS = [
  { text: 'Walid completely transformed our online presence. Our leads tripled within two months. He doesn\'t just build websites — he builds business growth engines.', author: 'David R.', role: 'CEO, Tech Startup — USA' },
  { text: 'Best SEO consultant I\'ve ever worked with. He got our Google Business Profile ranking #1 in our local market. Professional, strategic, and delivers results.', author: 'Sarah M.', role: 'Business Owner — UK' },
  { text: 'Working with Walid felt like having a digital growth partner, not just a freelancer. His strategic thinking sets him apart from anyone else I\'ve hired.', author: 'James K.', role: 'E-Commerce Founder — Australia' },
  { text: 'Our website went from generating zero leads to 40+ qualified inquiries a month. Walid\'s SEO and conversion strategy changed our entire business trajectory.', author: 'Ahmed N.', role: 'Managing Director — UAE' },
  { text: 'I\'ve hired many developers on Fiverr. Walid is the only one I kept coming back to. His attention to detail and business understanding is exceptional.', author: 'Lisa T.', role: 'Marketing Manager — Canada' },
  { text: 'From local SEO setup to full analytics tracking, Walid delivered everything on time and beyond expectations. Highly recommend for any serious business.', author: 'Michael B.', role: 'Founder, Service Company — Germany' },
]

const FAQS = [
  { q: 'What types of businesses do you work with?', a: 'I partner with small to mid-size businesses, startups, local service companies, e-commerce brands, and consultants who want serious organic growth.' },
  { q: 'How long does a typical project take?', a: 'Website projects typically take 2–4 weeks depending on complexity. SEO campaigns are ongoing with initial results visible within 60–90 days.' },
  { q: 'Do you offer ongoing SEO retainers?', a: 'Yes. SEO is not a one-time task — it\'s a growth system. I offer monthly retainers covering technical SEO, content optimization, local SEO, analytics reporting, and strategic consulting.' },
  { q: 'What makes you different from other freelancers?', a: 'I\'m not just a freelancer — I\'m a registered agency founder, Chrome extension creator, and digital growth strategist with 500+ projects delivered globally.' },
  { q: 'How do I get started?', a: 'Simple. Fill out the contact form or book a consultation. We\'ll start with a free strategy call to understand your goals and map out a growth plan.' },
]

const PROCESS = [
  { num: '01', title: 'Discovery & Strategy', desc: 'Deep dive into your business, market, competitors, and goals to define a tailored growth roadmap.' },
  { num: '02', title: 'Design & Architecture', desc: 'Premium UI/UX design, information architecture, and conversion-optimized page structures.' },
  { num: '03', title: 'Build & Optimize', desc: 'Pixel-perfect development, SEO integration, analytics setup, and performance optimization.' },
  { num: '04', title: 'Launch & Scale', desc: 'Go-live execution, ongoing optimization, growth tracking, and strategic iterations for compounding results.' },
]

// ─── SUB-COMPONENTS ───
function ServiceCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  const cardRef = useRef<HTMLElement>(null)
  const handleMove = (e: React.MouseEvent) => {
    const r = cardRef.current?.getBoundingClientRect()
    if (!r || !cardRef.current) return
    cardRef.current.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%')
    cardRef.current.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%')
  }
  return (
    <article className="srv-card reveal" ref={cardRef} onMouseMove={handleMove}>
      <div className="srv-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <Link href="/services" className="srv-link">Learn More <span className="arrow">→</span></Link>
    </article>
  )
}

function PortfolioCard({ item }: { item: typeof PORTFOLIO[0] }) {
  return (
    <article className="pf-card reveal">
      <div className="pf-thumb">
        <img src={item.img} alt={`Screenshot of the ${item.title} website`} loading="lazy" decoding="async" width={1280} height={800} />
        <div className="pf-overlay"><a href={item.url} target="_blank" rel="noopener noreferrer" className="pf-overlay-btn">View Live →</a></div>
      </div>
      <div className="pf-info">
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
        <div className="pf-tags">{item.tags.map((t) => <span key={t}>{t}</span>)}</div>
      </div>
    </article>
  )
}

function FaqItem({ item, isActive, onToggle }: { item: { q: string; a: string }; isActive: boolean; onToggle: () => void }) {
  return (
    <div className={`faq-item${isActive ? ' active' : ''}`}>
      <div className="faq-q" onClick={onToggle} role="button" tabIndex={0} aria-expanded={isActive}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle() } }}>
        {item.q}
        <span className="faq-chevron">▾</span>
      </div>
      <div className="faq-a"><p>{item.a}</p></div>
    </div>
  )
}

// ─── MAIN PAGE ───
export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState(0)
  const counterRef = useCounter()
  const sectionRefs = {
    services: useScrollReveal(),
    why: useScrollReveal(),
    results: useScrollReveal(),
    portfolio: useScrollReveal(),
    products: useScrollReveal(),
    testimonials: useScrollReveal(),
    agency: useScrollReveal(),
    process: useScrollReveal(),
    faq: useScrollReveal(),
    cta: useScrollReveal(),
  }

  const trustChips = [...TRUST_CHIPS, ...TRUST_CHIPS]

  return (
    <>
      <JsonLd data={faqPageSchema(FAQS)} />

      {/* Hero */}
      <header className="hero" id="hero">
        <div className="hero-mesh" />
        <div className="hero-grid" />
        <div className="hero-noise" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge" style={{ animation: 'fadeUp .8s .2s both' }}><span className="pulse-dot" /> Available for Strategic Projects</div>
            <h1 style={{ animation: 'fadeUp .8s .35s both' }}>I Build <span className="text-gradient">Growth Systems</span> That Generate Leads, Authority &amp; Revenue</h1>
            <p className="hero-sub" style={{ animation: 'fadeUp .8s .5s both' }}>Not just websites. I architect end-to-end digital ecosystems — combining strategic web design, SEO, and conversion engineering to scale businesses globally.</p>
            <div className="hero-ctas" style={{ animation: 'fadeUp .8s .65s both' }}>
              <Link href="/book" className="btn btn-brand">Start Your Growth Strategy <span className="arrow">→</span></Link>
              <Link href="/case-studies" className="btn btn-ghost">View Case Studies</Link>
            </div>
            <div className="hero-stats" ref={counterRef} style={{ animation: 'fadeUp .8s .8s both' }}>
              <div className="stat"><div className="stat-num" data-count="500">0+</div><div className="stat-label">Projects Delivered</div></div>
              <div className="stat"><div className="stat-num" data-count="200">0+</div><div className="stat-label">Happy Customers</div></div>
              <div className="stat"><div className="stat-num" data-count="30">0+</div><div className="stat-label">Countries Served</div></div>
            </div>
          </div>
          <div className="hero-visual" style={{ animation: 'fadeUp .8s .5s both' }}>
            <div className="hero-image-wrap">
              <div className="hero-img-glow" />
              <div className="hero-img-container">
                <img src="/assets/walidhasan-logo.png" alt="Walid Hasan — Digital Growth Consultant" width="412" height="412" />
              </div>
              <div className="float-card fc1">⚡ 500+ Projects Delivered</div>
              <div className="float-card fc2">★ Agency Founder</div>
              <div className="float-card fc3">🌍 World Domination 23%</div>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Marquee */}
      <section className="trust-marquee" aria-label="Trust signals">
        <p className="marquee-label">Trusted By Businesses Across 30+ Countries</p>
        <div className="marquee-track">
          {trustChips.map((c, i) => (
            <div className="trust-chip" key={i}><span>{c.icon}</span> {c.text}</div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" ref={sectionRefs.services} style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="sec-header center reveal">
            <div className="sec-label">What I Deliver</div>
            <h2 className="sec-title">Strategic Digital Services Built for <span className="text-gradient">Real Growth</span></h2>
            <p className="sec-desc">Every service is engineered with one goal — measurable business growth. No vanity metrics. No fluff. Just systems that convert.</p>
          </div>
          <div className="services-grid stagger">
            {SERVICES.map((s) => <ServiceCard key={s.title} {...s} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }} className="reveal">
            <Link href="/services" className="btn btn-ghost">Explore All Services <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      {/* Why */}
      <section ref={sectionRefs.why} style={{ background: 'var(--bg-secondary)', padding: '110px 0' }}>
        <div className="container">
          <div className="sec-header center reveal">
            <div className="sec-label">Why Clients Choose Me</div>
            <h2 className="sec-title">What Sets This Partnership <span className="text-gradient">Apart</span></h2>
            <p className="sec-desc">Working with me isn't hiring a freelancer. It's partnering with a strategic growth operator who treats your business like his own.</p>
          </div>
          <div className="why-grid stagger">
            {WHY_ITEMS.map((w) => (
              <div className="why-item reveal" key={w.title}>
                <div className="w-icon">{w.icon}</div>
                <div><h4>{w.title}</h4><p>{w.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section ref={sectionRefs.results} style={{ background: 'var(--bg-primary)', padding: '110px 0' }}>
        <div className="container">
          <div className="sec-header center reveal">
            <div className="sec-label">Proven Results</div>
            <h2 className="sec-title">Numbers That Speak <span className="text-gradient">For Themselves</span></h2>
          </div>
          <div className="results-grid stagger">
            {RESULTS.map((r) => (
              <div className="res-card reveal" key={r.label}><div className="res-num">{r.num}</div><div className="res-text">{r.label}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" ref={sectionRefs.portfolio} style={{ background: 'var(--bg-secondary)', padding: '110px 0' }}>
        <div className="container">
          <div className="sec-header center reveal">
            <div className="sec-label">Selected Work</div>
            <h2 className="sec-title">Portfolio <span className="text-gradient">Highlights</span></h2>
            <p className="sec-desc">Strategic digital systems built for businesses across industries and geographies.</p>
          </div>
          <div className="pf-grid stagger">
            {PORTFOLIO.map((p) => <PortfolioCard key={p.title} item={p} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }} className="reveal">
            <Link href="/case-studies" className="btn btn-ghost">View All Case Studies <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" ref={sectionRefs.products} style={{ background: 'var(--bg-primary)', padding: '110px 0' }}>
        <div className="container">
          <div className="sec-header center reveal">
            <div className="sec-label">Products I've Built</div>
            <h2 className="sec-title">Chrome Extensions & <span className="text-gradient">Digital Products</span></h2>
            <p className="sec-desc">Solving real workflow problems with purpose-built software products used by professionals worldwide.</p>
          </div>
          <div className="prod-grid stagger">
            {PRODUCTS.map((p) => (
              <article className="prod-card reveal" key={p.title}>
                <div className="prod-badge">{p.badge}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="prod-link">{p.linkText} <span className="arrow">→</span></a>
              </article>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 28 }} className="reveal">
            <Link href="/tools" className="btn btn-ghost">🔧 Explore All Tools <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" ref={sectionRefs.testimonials} style={{ background: 'var(--bg-secondary)', padding: '110px 0' }}>
        <div className="container">
          <div className="sec-header center reveal">
            <div className="sec-label">Client Voices</div>
            <h2 className="sec-title">What My Clients <span className="text-gradient">Say</span></h2>
          </div>
          <div className="testi-grid stagger">
            {TESTIMONIALS.map((t, i) => (
              <article className="testi-card reveal" key={i}>
                <div className="testi-stars">★★★★★</div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-author">{t.author}</div>
                <div className="testi-role">{t.role}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Agency */}
      <section className="agency-banner" id="about" ref={sectionRefs.agency}>
        <div className="container agency-inner reveal">
          <div className="agency-logo"><img src="/assets/walidhasan-logo.png" alt="Inoviqa LLC Logo" width="64" height="64" /></div>
          <div className="sec-label">The Agency Behind The Vision</div>
          <h2 className="sec-title" style={{ marginBottom: 14 }}>Inoviqa LLC — <span className="text-gradient">Premium Digital Growth Agency</span></h2>
          <p className="sec-desc" style={{ margin: '0 auto 32px', textAlign: 'center' }}>A full-service digital agency built on strategy, quality, and measurable outcomes. Serving businesses globally with enterprise-grade web design, SEO, and growth consulting.</p>
          <a href="https://inoviqa.com/" target="_blank" rel="noopener noreferrer" className="btn btn-brand">Partner With Inoviqa <span className="arrow">→</span></a>
        </div>
      </section>

      {/* Process */}
      <section ref={sectionRefs.process} style={{ background: 'var(--bg-secondary)', padding: '110px 0' }}>
        <div className="container">
          <div className="sec-header center reveal">
            <div className="sec-label">How I Work</div>
            <h2 className="sec-title">My Strategic <span className="text-gradient">Growth Framework</span></h2>
            <p className="sec-desc">A proven 4-step process that turns business goals into digital growth systems — predictable, measurable, and scalable.</p>
          </div>
          <div className="proc-track stagger">
            {PROCESS.map((p) => (
              <div className="proc-step reveal" key={p.num}><div className="proc-num">{p.num}</div><h4>{p.title}</h4><p>{p.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={sectionRefs.faq} style={{ background: 'var(--bg-primary)', padding: '110px 0' }}>
        <div className="container">
          <div className="sec-header center reveal">
            <div className="sec-label">Frequently Asked</div>
            <h2 className="sec-title">Questions <span className="text-gradient">Answered</span></h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <FaqItem key={i} item={f} isActive={activeFaq === i} onToggle={() => setActiveFaq(activeFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" ref={sectionRefs.cta}>
        <div className="container">
          <div className="cta-inner reveal">
            <div className="sec-label">Ready to Grow?</div>
            <h2>Let's Build Your Digital <span className="text-gradient">Growth Engine</span></h2>
            <p>Stop leaving money on the table with an underperforming website and invisible online presence. Let's create a strategic digital system that drives real, measurable business growth.</p>
            <div className="cta-btns">
              <Link href="/book" className="btn btn-brand">Book a Free Consultation <span className="arrow">→</span></Link>
              <Link href="/case-studies" className="btn btn-ghost">See My Work</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
