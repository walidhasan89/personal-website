'use client'

import { useState } from 'react'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { faqPageSchema } from '@/lib/schema'
import { useScrollReveal } from '@/hooks/useAnimations'

const css = `
.srv-hero{padding:160px 0 80px;position:relative;overflow:hidden;text-align:center}
.srv-hero-mesh{position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 30%,rgba(37,99,235,0.12),transparent 60%);pointer-events:none}
[data-theme="light"] .srv-hero-mesh{background:radial-gradient(ellipse 60% 50% at 50% 30%,rgba(37,99,235,0.05),transparent 60%)}
.srv-hero-inner{position:relative;z-index:2;max-width:820px;margin:0 auto}
.srv-hero h1{font-family:var(--font-heading);font-size:clamp(2rem,4.5vw,3.2rem);font-weight:700;line-height:1.14;letter-spacing:-.6px;margin-bottom:20px}
.srv-hero-sub{font-size:1.08rem;color:var(--text-secondary);line-height:1.85;margin-bottom:36px;max-width:640px;margin-left:auto;margin-right:auto}
.srv-hero-stats{display:flex;justify-content:center;gap:36px;flex-wrap:wrap}
.shs{text-align:center}
.shs-num{font-family:var(--font-heading);font-size:1.8rem;font-weight:800;color:var(--brand-500)}
.shs-label{font-size:.68rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1.2px;font-weight:600}

.srv-deep{padding:100px 0;position:relative}
.srv-deep:nth-child(even){background:var(--bg-secondary)}
.srv-deep:nth-child(odd){background:var(--bg-primary)}
.srv-deep-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
.srv-deep-grid.reverse{direction:rtl}
.srv-deep-grid.reverse>*{direction:ltr}
.sd-content h2{font-family:var(--font-heading);font-size:clamp(1.5rem,2.8vw,2rem);font-weight:700;letter-spacing:-.3px;margin-bottom:16px;line-height:1.2}
.sd-content p{font-size:.94rem;color:var(--text-secondary);line-height:1.85;margin-bottom:14px}
.sd-features{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:20px 0}
.sd-feat{display:flex;align-items:center;gap:8px;font-size:.84rem;color:var(--text-secondary);padding:8px 12px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-sm)}
.sd-feat-check{color:var(--accent-emerald);font-weight:700}
.sd-metrics{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:24px}
.sd-metric{text-align:center;padding:20px 16px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-md);transition:all .4s;position:relative;overflow:hidden}
.sd-metric::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--gradient-brand);transform:scaleX(0);transform-origin:left;transition:transform .5s}
.sd-metric:hover::before{transform:scaleX(1)}
.sd-metric:hover{border-color:var(--border-hover);transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,0.15)}
[data-theme="light"] .sd-metric:hover{box-shadow:0 12px 32px rgba(0,0,0,0.06)}
.sd-metric-num{font-family:var(--font-heading);font-size:1.5rem;font-weight:800;background:var(--gradient-brand);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:4px}
.sd-metric-label{font-size:.65rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;font-weight:600}

.sd-visual{position:relative}
.sd-visual-card{background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-lg);padding:36px;position:relative;overflow:hidden;transition:all .5s}
.sd-visual-card:hover{border-color:var(--border-hover);box-shadow:var(--shadow-card)}
.sd-visual-card::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 30% 30%,rgba(37,99,235,0.06),transparent 60%);pointer-events:none}
.sd-visual-card::after{content:'';position:absolute;top:-40%;right:-30%;width:200px;height:200px;border-radius:50%;border:2px solid rgba(59,130,246,0.06);pointer-events:none}
.sd-visual-icon{width:72px;height:72px;border-radius:20px;background:rgba(37,99,235,0.06);border:1px solid rgba(59,130,246,0.1);display:flex;align-items:center;justify-content:center;font-size:2rem;margin-bottom:24px;transition:all .4s;position:relative;z-index:1}
.sd-visual-card:hover .sd-visual-icon{background:var(--gradient-brand);transform:scale(1.08) rotate(-5deg);box-shadow:0 8px 28px rgba(37,99,235,0.3)}
.sd-visual-title{font-family:var(--font-heading);font-size:1.1rem;font-weight:700;margin-bottom:20px;position:relative;z-index:1}
.sd-visual-card .sd-visual-title span{color:var(--brand-500)}
.sd-visual-bar{margin-bottom:20px;position:relative;z-index:1}
.sd-visual-bar-label{display:flex;justify-content:space-between;font-size:.72rem;font-weight:600;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:.8px}
.sd-visual-bar-label span:last-child{color:var(--brand-500)}
.sd-visual-bar-track{height:6px;background:rgba(59,130,246,0.08);border-radius:6px;overflow:hidden}
.sd-visual-bar-fill{height:100%;background:var(--gradient-brand);border-radius:6px;transition:width 1.5s cubic-bezier(.4,0,.2,1)}
.sd-visual-line{display:flex;align-items:center;gap:10px;margin-bottom:12px;font-size:.82rem;color:var(--text-secondary);position:relative;z-index:1}
.sd-visual-line-dot{width:8px;height:8px;border-radius:50%;background:var(--accent-emerald);box-shadow:0 0 6px rgba(52,211,153,0.4);flex-shrink:0}
.sd-visual-line-dot.cyan{background:var(--accent-cyan);box-shadow:0 0 6px rgba(34,211,238,0.4)}
.sd-visual-line-dot.gold{background:var(--accent-gold);box-shadow:0 0 6px rgba(251,191,36,0.4)}
.sd-dots{position:absolute;bottom:16px;right:16px;display:grid;grid-template-columns:repeat(5,6px);gap:4px;opacity:.15;z-index:0}
.sd-dot{width:6px;height:6px;border-radius:50%;background:var(--brand-500)}

.pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.pkg-card{padding:32px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-md);transition:all .5s;display:flex;flex-direction:column}
.pkg-card.featured{border-color:var(--brand-500);box-shadow:0 0 40px rgba(37,99,235,0.15)}
.pkg-card:hover{transform:translateY(-8px);box-shadow:var(--shadow-card)}
.pkg-badge{display:inline-flex;align-self:flex-start;padding:4px 14px;background:rgba(37,99,235,0.08);border:1px solid rgba(59,130,246,0.15);border-radius:var(--r-pill);font-size:.65rem;color:var(--brand-500);font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px}
.pkg-badge.pop{background:var(--gradient-brand);color:#fff;border-color:transparent}
.pkg-card h3{font-family:var(--font-heading);font-size:1.2rem;font-weight:700;margin-bottom:8px}
.pkg-card>p{font-size:.88rem;color:var(--text-secondary);line-height:1.7;margin-bottom:20px}
.pkg-features{display:flex;flex-direction:column;gap:8px;margin-bottom:24px;flex:1}
.pkg-feat{display:flex;align-items:center;gap:8px;font-size:.84rem;color:var(--text-secondary)}
.pkg-check{color:var(--accent-emerald);font-weight:700}
.pkg-section{padding:110px 0;background:var(--bg-secondary)}

.faq-section{padding:110px 0;background:var(--bg-primary)}
.faq-list{max-width:780px;margin:0 auto;display:flex;flex-direction:column;gap:10px}
.faq-item{background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-sm);overflow:hidden;transition:all .3s}
.faq-item.active{border-color:rgba(59,130,246,0.2);box-shadow:0 4px 20px rgba(0,0,0,0.2)}
[data-theme="light"] .faq-item.active{box-shadow:0 4px 20px rgba(0,0,0,0.05)}
.faq-q{padding:18px 22px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-family:var(--font-heading);font-weight:600;font-size:.92rem;transition:color .3s;user-select:none}
.faq-q:hover{color:var(--brand-500)}
.faq-chevron{width:20px;height:20px;border-radius:50%;background:rgba(37,99,235,0.08);display:flex;align-items:center;justify-content:center;font-size:.7rem;color:var(--brand-500);transition:all .3s;flex-shrink:0}
.faq-item.active .faq-chevron{transform:rotate(180deg);background:var(--gradient-brand);color:#fff}
.faq-a{max-height:0;overflow:hidden;transition:max-height .4s ease,padding .3s}
.faq-item.active .faq-a{max-height:300px;padding:0 22px 18px}
.faq-a p{font-size:.88rem;color:var(--text-secondary);line-height:1.8}

.cta-section{padding:120px 0;background:var(--bg-secondary);position:relative;overflow:hidden}
.cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 60% at 50% 50%,rgba(37,99,235,0.1),transparent 70%)}
.cta-inner{max-width:720px;margin:0 auto;text-align:center;position:relative;z-index:1}
.cta-inner h2{font-family:var(--font-heading);font-size:clamp(2rem,3.8vw,2.8rem);font-weight:700;letter-spacing:-.5px;margin-bottom:16px}
.cta-inner p{font-size:1.02rem;color:var(--text-secondary);margin-bottom:36px;line-height:1.8}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.sec-header{text-align:center;margin-bottom:56px}
.sec-title{font-family:var(--font-heading);font-size:clamp(1.8rem,3.4vw,2.5rem);font-weight:700;letter-spacing:-.5px;margin-bottom:14px;line-height:1.18}
.sec-desc{font-size:1rem;color:var(--text-secondary);max-width:580px;margin:0 auto;line-height:1.8}

@media(max-width:1080px){
  .srv-deep-grid,.srv-deep-grid.reverse{grid-template-columns:1fr;direction:ltr}
  .pkg-grid{grid-template-columns:1fr}
  .sd-metrics{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:768px){
  .srv-hero{padding:130px 0 60px}
  .sd-features{grid-template-columns:1fr}
  .sd-visual-line{
  font-size: 14px;
  }
  .faq-a p{
  font-size: 14px!important
}
}
`

type Service = {
  id: string
  icon: string
  label: string
  title: string
  desc: string
  desc2: string
  features: string[]
  lines: { text: string; dot: string }[]
  reverse?: boolean
}

const SERVICES: Service[] = [
  {
    id: 'website-design',
    icon: '🎨',
    label: 'Website Design',
    title: 'Website Design',
    desc: 'A clean, conversion-focused site that explains the offer and gives the right visitor an obvious next step.',
    desc2: 'The design work covers the page structure, the writing hierarchy, and the calls to action. It is paired with the build, not sold as a picture that someone else has to implement.',
    features: ['Page structure around the offer', 'Conversion-focused layout', 'Mobile layout', 'Clear calls to action', 'Service and about pages', 'A contact path that is easy to find'],
    lines: [
      { text: 'The page says what you do', dot: '' },
      { text: 'The next step is obvious', dot: 'cyan' },
      { text: 'It still reads well on a phone', dot: 'gold' },
    ],
  },
  {
    id: 'web-development',
    icon: '💻',
    label: 'Web Development',
    title: 'Web Development',
    desc: 'Fast, reliable WordPress and custom builds, including forms, tracking, and mobile performance.',
    desc2: 'Analytics and conversion details live here: forms that arrive in your inbox, basic tracking, and a site that does not fall apart on a slow connection.',
    features: ['WordPress or a custom build', 'Forms and lead capture', 'Basic analytics and tracking', 'Speed and mobile performance', 'SEO-ready structure', 'Launch support'],
    reverse: true,
    lines: [
      { text: 'Forms and tracking included', dot: '' },
      { text: 'Built to stay fast on mobile', dot: 'cyan' },
      { text: 'Ready for the SEO work', dot: 'gold' },
    ],
  },
  {
    id: 'software-development',
    icon: '🛠️',
    label: 'Software Development',
    title: 'Software Development',
    desc: 'Custom tools and browser extensions that automate a workflow you already run by hand.',
    desc2: 'RFQ AutoPilot is the public example: a tool for procurement teams that takes request-for-quote work out of repetitive manual steps. Other tools are scoped the same way, around one real process.',
    features: ['Workflow mapped before code', 'Custom tools or browser extensions', 'A focused first version', 'Handover you can actually use', 'Room to extend after launch', 'Quoted per project'],
    lines: [
      { text: 'Built around one real workflow', dot: '' },
      { text: 'RFQ AutoPilot is a live example', dot: 'cyan' },
      { text: 'Price depends on the scope', dot: 'gold' },
    ],
  },
  {
    id: 'seo-services',
    icon: '📈',
    label: 'SEO Services',
    title: 'SEO Services',
    desc: 'Technical, on-page, and local SEO, including Google Business Profile, for businesses that want to be found by people already searching.',
    desc2: 'This covers the foundations: indexation, page structure, titles, internal links, and the local profile. It is ongoing when the market needs it. Rankings are not guaranteed.',
    features: ['Technical SEO fixes', 'On-page structure and metadata', 'Local SEO', 'Google Business Profile', 'Search Console monitoring', 'A plain monthly report'],
    reverse: true,
    lines: [
      { text: 'Technical and on-page work', dot: '' },
      { text: 'Local search and the business profile', dot: 'cyan' },
      { text: 'No guaranteed ranking positions', dot: 'gold' },
    ],
  },
]

const FAQS = [
  { q: 'How much does a project cost?', a: 'Website and local SEO starting prices are on the pricing page. Software is scoped per project, so it does not have a public package price.' },
  { q: 'How long does a website take?', a: 'Most website projects take about 2–4 weeks once the content and feedback are available. A larger build takes longer and is agreed up front.' },
  { q: 'How long does SEO take?', a: 'SEO is ongoing. Early movement is often discussed around 60–90 days, and stronger results depend on the site, the competition, and how long the work continues. Exact positions are not guaranteed.' },
  { q: 'Do you work with businesses outside your country?', a: 'Yes. Projects on this site span clients in many countries, and the working relationship is remote.' },
  { q: 'What if I already have a website?', a: 'I can work on the site you have — design, development, tracking, or SEO — or recommend a rebuild when the current one is getting in the way.' },
]

function ServiceDeepSection({ service: s }: { service: Service }) {
  const ref = useScrollReveal()

  return (
    <section className="srv-deep" id={s.id} ref={ref}>
      <div className="container">
        <div className={`srv-deep-grid${s.reverse ? ' reverse' : ''}`}>
          <div className="sd-content">
            <div className="sec-label reveal">{s.label}</div>
            <h2 className="reveal">{s.title}</h2>
            <p className="reveal">{s.desc}</p>
            <p className="reveal">{s.desc2}</p>
            <div className="sd-features reveal">
              {s.features.map((feature) => (
                <div className="sd-feat" key={feature}><span className="sd-feat-check">✓</span>{feature}</div>
              ))}
            </div>
            <Link href="/book" className="btn btn-brand reveal" style={{ marginTop: 20 }}>
              Get Started <span className="arrow">→</span>
            </Link>
          </div>
          <div className="sd-visual reveal">
            <div className="sd-visual-card">
              <div className="sd-visual-icon">{s.icon}</div>
              <div className="sd-visual-title">{s.title}</div>
              {s.lines.map((line) => (
                <div className="sd-visual-line" key={line.text}><div className={`sd-visual-line-dot ${line.dot}`} />{line.text}</div>
              ))}
              <div className="sd-dots">{Array.from({ length: 15 }).map((_, i) => <div className="sd-dot" key={i} />)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  const heroRef = useScrollReveal()
  const faqRef = useScrollReveal()
  const ctaRef = useScrollReveal()
  const [activeFaq, setActiveFaq] = useState(-1)

  return (
    <>
      <JsonLd data={faqPageSchema(FAQS)} />
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: css }} />

      <section className="srv-hero" ref={heroRef}>
        <div className="srv-hero-mesh" /><div className="orb orb-1" /><div className="orb orb-2" />
        <Breadcrumbs items={[{ name: 'Services', path: '/services' }]} />
        <div className="container srv-hero-inner">
          <div className="sec-label reveal">Services</div>
          <h1 className="reveal">Website design, development, <span className="text-gradient">software &amp; SEO</span></h1>
          <p className="srv-hero-sub reveal">Four services. Analytics, tracking, and conversion work are part of the build and the SEO, not extra pillars. Starting prices for websites and SEO are on the pricing page.</p>
          <div className="srv-hero-stats reveal">
            <div className="shs"><div className="shs-num">4</div><div className="shs-label">Services</div></div>
            <div className="shs"><div className="shs-num">7+</div><div className="shs-label">Years</div></div>
            <div className="shs"><div className="shs-num">30+</div><div className="shs-label">Countries Served</div></div>
          </div>
        </div>
      </section>

      {SERVICES.map((service) => (
        <ServiceDeepSection key={service.id} service={service} />
      ))}

      <section className="faq-section" ref={faqRef}>
        <div className="container">
          <div className="sec-header">
            <div className="sec-label reveal">Common Questions</div>
            <h2 className="sec-title reveal">Services <span className="text-gradient">FAQ</span></h2>
          </div>
          <div className="faq-list">
            {FAQS.map((faq, index) => (
              <div className={`faq-item${activeFaq === index ? ' active' : ''}`} key={faq.q}>
                <div className="faq-q" onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} role="button" tabIndex={0} aria-expanded={activeFaq === index} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveFaq(activeFaq === index ? -1 : index) } }}>{faq.q}<span className="faq-chevron" aria-hidden="true">▾</span></div>
                <div className="faq-a"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" ref={ctaRef}>
        <div className="container">
          <div className="cta-inner">
            <div className="sec-label reveal">Next step</div>
            <h2 className="reveal">Tell me which <span className="text-gradient">service</span> you need</h2>
            <p className="reveal">Book a call or send the project details. If you want numbers first, the pricing page lists the website and SEO starting prices.</p>
            <div className="cta-btns reveal">
              <Link href="/book" className="btn btn-brand">Book a Call <span className="arrow">→</span></Link>
              <Link href="/pricing" className="btn btn-ghost">View Pricing</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
