'use client'

import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useScrollReveal } from '@/hooks/useAnimations'

const css = `
.book-hero{padding:160px 0 60px;position:relative;overflow:hidden;text-align:center}
.book-hero-mesh{position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 30%,rgba(37,99,235,0.12),transparent 60%);pointer-events:none}
[data-theme="light"] .book-hero-mesh{background:radial-gradient(ellipse 60% 50% at 50% 30%,rgba(37,99,235,0.05),transparent 60%)}
.book-hero-inner{position:relative;z-index:2;max-width:720px;margin:0 auto}
.book-hero h1{font-family:var(--font-heading);font-size:clamp(2rem,4.5vw,3.2rem);font-weight:700;line-height:1.14;letter-spacing:-.6px;margin-bottom:20px}
.book-hero-sub{font-size:1.08rem;color:var(--text-secondary);line-height:1.85;max-width:580px;margin:0 auto 12px}
.book-hero-trust{display:flex;justify-content:center;gap:24px;flex-wrap:wrap;margin-top:24px}
.book-trust-item{display:flex;align-items:center;gap:6px;font-size:.82rem;color:var(--text-muted);font-weight:600}
.book-trust-icon{color:var(--accent-emerald)}

.cal-section{padding:40px 0 110px;background:var(--bg-primary)}
.cal-wrapper{max-width:1000px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-lg);overflow:hidden;min-height:600px;padding:24px}
[data-theme="light"] .cal-wrapper{box-shadow:0 8px 40px rgba(0,0,0,0.06)}
[data-theme="dark"] .cal-wrapper{box-shadow:0 8px 40px rgba(0,0,0,0.3)}

.book-info{padding:80px 0;background:var(--bg-secondary)}
.book-info-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.book-info-card{padding:28px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-md);text-align:center;transition:all .4s}
.book-info-card:hover{border-color:var(--border-hover);transform:translateY(-6px);box-shadow:var(--shadow-card)}
.book-info-icon{font-size:1.5rem;margin-bottom:12px}
.book-info-card h4{font-family:var(--font-heading);font-size:.92rem;font-weight:700;margin-bottom:6px}
.book-info-card p{font-size:.82rem;color:var(--text-secondary);line-height:1.65}

.cta-section{padding:100px 0;background:var(--bg-primary);position:relative;overflow:hidden}
.cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 60% at 50% 50%,rgba(37,99,235,0.08),transparent 70%)}
.cta-inner{max-width:720px;margin:0 auto;text-align:center;position:relative;z-index:1}
.cta-inner h2{font-family:var(--font-heading);font-size:clamp(1.8rem,3.4vw,2.5rem);font-weight:700;letter-spacing:-.5px;margin-bottom:16px}
.cta-inner p{font-size:1.02rem;color:var(--text-secondary);margin-bottom:36px;line-height:1.8}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}

@media(max-width:1080px){.book-info-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.book-hero{padding:130px 0 50px}.book-info-grid{grid-template-columns:1fr}}
`

const INFO_CARDS = [
  { icon: '\u23F1\uFE0F', title: '30 Minute Call', desc: 'Focused strategy session to understand your business goals and growth challenges.' },
  { icon: '\uD83C\uDFAF', title: 'Custom Strategy', desc: 'Walk away with actionable insights tailored specifically to your business.' },
  { icon: '\uD83D\uDC8E', title: '100% Free', desc: 'No obligation, no pressure. Just genuine value and strategic thinking.' },
  { icon: '\u26A1', title: 'Fast Booking', desc: "Pick a time that works for you. I'll confirm within hours." },
]

export default function BookConsultation() {
  const heroRef = useScrollReveal()
  const infoRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '30min-call' })
      cal('ui', { hideEventTypeDetails: true, layout: 'month_view' })
    })()
  }, [])

  return (
    <>
      <style
  suppressHydrationWarning
  dangerouslySetInnerHTML={{ __html: css }}
/>

      <section className="book-hero" ref={heroRef}>
        <div className="book-hero-mesh" />
        <div className="orb orb-1" /><div className="orb orb-2" />
        <Breadcrumbs items={[{ name: 'Book a Call', path: '/book' }]} />
        <div className="container book-hero-inner">
          <div className="sec-label reveal">Free Strategy Call</div>
          <h1 className="reveal">Book Your Free <span className="text-gradient">Growth Consultation</span></h1>
          <p className="book-hero-sub reveal">Pick a time that works for you. In 30 minutes, we'll map out a custom digital growth strategy for your business — no strings attached.</p>
          <div className="book-hero-trust reveal">
            <span className="book-trust-item"><span className="book-trust-icon">&#10003;</span> No Obligation</span>
            <span className="book-trust-item"><span className="book-trust-icon">&#10003;</span> 30 Min Call</span>
            <span className="book-trust-item"><span className="book-trust-icon">&#10003;</span> Custom Strategy</span>
            <span className="book-trust-item"><span className="book-trust-icon">&#10003;</span> 500+ Projects Experience</span>
          </div>
        </div>
      </section>

      <section className="cal-section">
        <div className="container">
          <div className="cal-wrapper">
            <Cal
              namespace="30min-call"
              calLink="walidhasan/30min-call"
              style={{ width: '100%', height: '100%', overflow: 'scroll' }}
              config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
            />
          </div>
        </div>
      </section>

      <section className="book-info" ref={infoRef}>
        <div className="container">
          <div className="book-info-grid">
            {INFO_CARDS.map((c) => (
              <div className="book-info-card reveal" key={c.title}>
                <div className="book-info-icon">{c.icon}</div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" ref={ctaRef}>
        <div className="container">
          <div className="cta-inner">
            <div className="sec-label reveal">Prefer Email?</div>
            <h2 className="reveal">You Can Also <span className="text-gradient">Send an Inquiry</span></h2>
            <p className="reveal">If you'd rather share project details in writing, use the contact form and I'll respond within 24 hours.</p>
            <div className="cta-btns reveal">
              <Link href="/contact" className="btn btn-brand">Send an Inquiry <span className="arrow">&#8594;</span></Link>
              <Link href="/case-studies" className="btn btn-ghost">View Case Studies</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
