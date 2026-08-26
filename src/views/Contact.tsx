'use client'

import { useState } from 'react'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { faqPageSchema } from '@/lib/schema'
import { useScrollReveal } from '@/hooks/useAnimations'

const css = `
.ct-hero{padding:160px 0 60px;position:relative;overflow:hidden;text-align:center}
.ct-hero-mesh{position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 30%,rgba(37,99,235,0.12),transparent 60%);pointer-events:none}
[data-theme="light"] .ct-hero-mesh{background:radial-gradient(ellipse 60% 50% at 50% 30%,rgba(37,99,235,0.05),transparent 60%)}
.ct-hero-inner{position:relative;z-index:2;max-width:720px;margin:0 auto}
.ct-hero h1{font-family:var(--font-heading);font-size:clamp(2rem,4.5vw,3.2rem);font-weight:700;line-height:1.14;letter-spacing:-.6px;margin-bottom:20px}
.ct-hero-sub{font-size:1.08rem;color:var(--text-secondary);line-height:1.85;max-width:580px;margin:0 auto}

.contact-main{padding:80px 0 110px;background:var(--bg-primary)}
.contact-layout{display:grid;grid-template-columns:1fr 1.1fr;gap:48px;align-items:start}
.ct-info h2{font-family:var(--font-heading);font-size:clamp(1.5rem,2.8vw,1.8rem);font-weight:700;letter-spacing:-.3px;margin-bottom:14px}
.ct-info>p{color:var(--text-secondary);font-size:.94rem;line-height:1.85;margin-bottom:24px}
.ct-cards{display:flex;flex-direction:column;gap:12px;margin-bottom:24px}
.ct-card{display:flex;gap:14px;align-items:center;padding:16px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-md);transition:all .3s}
.ct-card:hover{border-color:var(--border-hover);transform:translateX(4px)}
.ct-card-icon{font-size:1.2rem;flex-shrink:0}
.ct-card-content h4{font-family:var(--font-heading);font-size:.85rem;font-weight:700;margin-bottom:2px}
.ct-card-content p{font-size:.82rem;color:var(--text-secondary);margin:0}
.ct-card-content a{color:var(--brand-500)}
.ct-socials{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap}
.ct-social{width:42px;height:42px;border-radius:50%;border:none;display:flex;align-items:center;justify-content:center;font-size:.78rem;transition:all .4s;color:#fff;font-weight:800;text-transform:uppercase;box-shadow:0 12px 28px rgba(0,0,0,.24),inset 0 1px 0 rgba(255,255,255,.18)}
.ct-social:hover{color:#fff;transform:translateY(-3px) scale(1.08);box-shadow:0 16px 34px rgba(0,0,0,.28);border-color:transparent;filter:brightness(1.08)}
.social-linkedin{background:linear-gradient(135deg,#0a66c2 0%,#004182 100%)}
.social-facebook{background:linear-gradient(135deg,#1877f2 0%,#0b5ed7 100%)}
.social-instagram{background:linear-gradient(135deg,#f58529 0%,#dd2a7b 45%,#8134af 100%)}
.social-behance{background:linear-gradient(135deg,#1769ff 0%,#0057ff 100%)}
.social-youtube{background:linear-gradient(135deg,#ff0000 0%,#b00000 100%)}
.social-x{background:linear-gradient(135deg,#111111 0%,#000000 100%);border:1px solid rgba(255,255,255,.12)}
.ct-response{display:flex;align-items:center;gap:8px;font-size:.82rem;color:var(--text-muted)}
.ct-response-dot{width:8px;height:8px;border-radius:50%;background:var(--accent-emerald);box-shadow:0 0 8px var(--accent-emerald);animation:dp2 2s infinite}
@keyframes dp2{0%,100%{opacity:1}50%{opacity:.4}}
.ct-response span{color:var(--text-primary);font-weight:600}

.ct-form-wrap{padding:36px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-lg);position:sticky;top:100px}
.ct-form-wrap h3{font-family:var(--font-heading);font-size:1.2rem;font-weight:700;margin-bottom:8px}
.ct-form-wrap>p{font-size:.88rem;color:var(--text-secondary);margin-bottom:24px;line-height:1.7}
.ct-form{display:flex;flex-direction:column;gap:14px}
.ct-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.ct-field label{display:block;font-size:.78rem;font-weight:600;color:var(--text-secondary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.8px}
.ct-field input,.ct-field textarea,.ct-field select{width:100%;padding:12px 16px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:var(--r-sm);color:var(--text-primary);font-family:var(--font-body);font-size:.9rem;transition:all .3s;outline:none}
.ct-field input:focus,.ct-field textarea:focus,.ct-field select:focus{border-color:var(--brand-500);box-shadow:0 0 0 3px rgba(37,99,235,0.1)}
.ct-field textarea{min-height:100px;resize:vertical}
.ct-field select option{background:var(--bg-card)}
.ct-budget-options{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.ct-budget-btn{padding:10px;text-align:center;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:var(--r-sm);font-size:.82rem;font-weight:600;color:var(--text-secondary);cursor:pointer;transition:all .3s}
.ct-budget-btn:hover{border-color:var(--brand-500);color:var(--text-primary)}
.ct-budget-btn.active{background:var(--gradient-brand);color:#fff;border-color:transparent}
.ct-submit{padding:14px;background:var(--gradient-brand);color:#fff;border:none;border-radius:var(--r-sm);font-family:var(--font-body);font-weight:700;font-size:.95rem;cursor:pointer;transition:all .4s;box-shadow:0 4px 20px rgba(37,99,235,0.3)}
.ct-submit:hover{transform:translateY(-2px);box-shadow:0 8px 36px rgba(37,99,235,0.5)}

.ideal-section{padding:110px 0;background:var(--bg-secondary)}
.ideal-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
.ideal-content h2{font-family:var(--font-heading);font-size:clamp(1.5rem,2.8vw,2rem);font-weight:700;letter-spacing:-.3px;margin-bottom:14px}
.ideal-content>p{font-size:.94rem;color:var(--text-secondary);line-height:1.85;margin-bottom:20px}
.ideal-checks{display:flex;flex-direction:column;gap:10px}
.ideal-check{display:flex;align-items:flex-start;gap:10px;font-size:.9rem;color:var(--text-secondary);line-height:1.6;padding:12px 16px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-sm);transition:all .3s}
.ideal-check:hover{border-color:rgba(52,211,153,0.2);transform:translateX(4px)}
.ideal-check-icon{flex-shrink:0;color:var(--accent-emerald);font-weight:700;margin-top:2px}
.ideal-not{display:flex;flex-direction:column;gap:10px}
.ideal-not-item{display:flex;align-items:flex-start;gap:10px;font-size:.88rem;color:var(--text-muted);line-height:1.6;padding:12px 16px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-sm)}
.ideal-not-icon{flex-shrink:0;color:#f87171;margin-top:2px}

.faq-section{padding:110px 0;background:var(--bg-primary)}
.sec-header{text-align:center;margin-bottom:56px}
.sec-title{font-family:var(--font-heading);font-size:clamp(1.8rem,3.4vw,2.5rem);font-weight:700;letter-spacing:-.5px;margin-bottom:14px;line-height:1.18}
.sec-desc{font-size:1rem;color:var(--text-secondary);max-width:580px;margin:0 auto;line-height:1.8}
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

@media(max-width:1080px){.contact-layout,.ideal-grid{grid-template-columns:1fr}.ct-info{position:static}}
@media(max-width:768px){.ct-hero{padding:130px 0 50px}.ct-row,.ct-budget-options{grid-template-columns:1fr 1fr}.ct-form-wrap{padding:28px 20px}}
`

const BUDGETS = ['$500 – $1K', '$1K – $3K', '$3K – $5K', '$5K+']
const FAQS = [
  { q: 'What happens after I submit the form?', a: 'You\'ll receive a confirmation within 24 hours with initial thoughts and a suggested time for a free strategy call.' },
  { q: 'Is the consultation really free?', a: 'Yes. The initial strategy call is completely free with no obligations.' },
  { q: 'What\'s the typical project timeline?', a: 'Website projects: 2–4 weeks. SEO campaigns: ongoing with initial results in 60–90 days. Analytics setups: 1–3 days.' },
  { q: 'Do you work with international clients?', a: 'Absolutely. I serve clients across 30+ countries with professional communication and international payments.' },
]
const IDEAL_YES = ['You want a strategic digital partner, not just a task executor', 'You\'re serious about organic growth and long-term results', 'You value quality, communication, and professional delivery', 'You have a budget aligned with premium-quality work', 'You\'re open to data-driven strategy and recommendations']
const IDEAL_NO = ['You\'re looking for the cheapest option available', 'You need results overnight with no strategic investment', 'You want to micromanage every pixel without trusting expertise']

export default function ContactPage() {
  const heroRef = useScrollReveal()
  const mainRef = useScrollReveal()
  const idealRef = useScrollReveal()
  const faqRef = useScrollReveal()
  const [budget, setBudget] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [activeFaq, setActiveFaq] = useState(0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSending(true)

    const formData = new FormData(e.currentTarget)
    formData.set('budget', budget)

    try {
      const res = await fetch('/contact-handler.php', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Request failed')

      setSent(true)
    } catch {
      setError(
        "Something went wrong sending your message. Please email hello@walidhasan.com directly and I'll respond within 24 hours."
      )
    } finally {
      setSending(false)
    }
  }

  const socialLinks = [
    {
      label: 'LinkedIn',
      short: 'in',
      href: 'https://www.linkedin.com/in/walidhasan-riyad/',
      className: 'social-linkedin',
    },
    {
      label: 'Facebook',
      short: 'fb',
      href: 'https://www.facebook.com/iamwalidhasan',
      className: 'social-facebook',
    },
    {
      label: 'Instagram',
      short: 'ig',
      href: 'https://www.instagram.com/iamwalidhasan/',
      className: 'social-instagram',
    },
    {
      label: 'Behance',
      short: 'be',
      href: 'https://www.behance.net/walid_hasan',
      className: 'social-behance',
    },
    {
      label: 'YouTube',
      short: 'yt',
      href: 'https://www.youtube.com/@walidhasan-r',
      className: 'social-youtube',
    },
    {
      label: 'X',
      short: 'x',
      href: 'https://x.com/walidhasan_r',
      className: 'social-x',
    },
  ]

  return (
    <>
      <JsonLd data={faqPageSchema(FAQS)} />
      <style
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: css }}
      />

      <section className="ct-hero" ref={heroRef}>
        <div className="ct-hero-mesh" /><div className="orb orb-1" /><div className="orb orb-2" />
        <Breadcrumbs items={[{ name: 'Contact', path: '/contact' }]} />
        <div className="ct-hero-inner">
          <div className="sec-label reveal">Let's Talk Growth</div>
          <h1 className="reveal">Ready to Build Something <span className="text-gradient">That Actually Grows?</span></h1>
          <p className="ct-hero-sub reveal">This is the first step toward a strategic digital partnership that generates real, measurable results.</p>
        </div>
      </section>

      <section className="contact-main" ref={mainRef}>
        <div className="container">
          <div className="contact-layout">
            <div className="ct-info reveal-l">
              <h2>Let's Discuss Your <span className="text-gradient">Growth Goals</span></h2>
              <p>Fill out the form with as much detail as possible. The more I understand upfront, the more value I can deliver.</p>
              <div className="ct-cards">
                <div className="ct-card"><div className="ct-card-icon">📧</div><div className="ct-card-content"><h4>Email Directly</h4><p><a href="mailto:hello@walidhasan.com">hello@walidhasan.com</a></p></div></div>
                <div className="ct-card"><div className="ct-card-icon">🏢</div><div className="ct-card-content"><h4>Agency</h4><p>Inoviqa LLC — <a href="https://inoviqa.com" target="_blank" rel="noopener noreferrer">inoviqa.com</a></p></div></div>
                <div className="ct-card"><div className="ct-card-icon">🌍</div><div className="ct-card-content"><h4>Availability</h4><p>Serving clients worldwide, 30+ countries</p></div></div>
                <div className="ct-card"><div className="ct-card-icon">🕐</div><div className="ct-card-content"><h4>Working Hours</h4><p>Mon – Sat, 9 AM – 10 PM (GMT+6)</p></div></div>
              </div>
              <div className="ct-socials">
                {socialLinks.map((social) => (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`ct-social ${social.className}`}
                    key={social.href}
                  >
                    {social.short}
                  </a>
                ))}
              </div>
              <div className="ct-response"><div className="ct-response-dot" /><p>Typical response time: <span>under 24 hours</span></p></div>
            </div>

            <div className="ct-form-wrap reveal-r" id="form">
              <h3>{sent ? 'Thank You! ✓' : 'Start Your Growth Conversation'}</h3>
              <p>{sent ? 'I\'ll review your details and respond within 24 hours.' : 'Tell me about your project — I\'ll respond within 24 hours.'}</p>
              {!sent ? (
                <form className="ct-form" onSubmit={handleSubmit}>
                  <div className="ct-row">
                    <div className="ct-field"><label htmlFor="ct-name">Full Name</label><input id="ct-name" name="name" type="text" placeholder="John Smith" required /></div>
                    <div className="ct-field"><label htmlFor="ct-email">Email</label><input id="ct-email" name="email" type="email" placeholder="john@company.com" required /></div>
                  </div>
                  <div className="ct-field"><label htmlFor="ct-website">Website URL (optional)</label><input id="ct-website" name="website" type="url" placeholder="https://yoursite.com" /></div>
                  <div className="ct-field"><label htmlFor="ct-service">Service Interest</label>
                    <select id="ct-service" name="service" required defaultValue="">
                      <option value="" disabled>Select a service</option>
                      <option>Website Design & Development</option><option>SEO Strategy & Execution</option>
                      <option>Local SEO & GBP Optimization</option><option>Web Analytics & Tracking</option>
                      <option>Lead Generation Strategy</option><option>Full Digital Growth Consulting</option>
                    </select>
                  </div>
                  <div className="ct-field"><label id="ct-budget-label">Budget Range</label>
                    <div className="ct-budget-options" role="group" aria-labelledby="ct-budget-label">{BUDGETS.map(b => <div key={b} role="button" tabIndex={0} className={`ct-budget-btn${budget === b ? ' active' : ''}`} onClick={() => setBudget(b)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setBudget(b) } }}>{b}</div>)}</div>
                  </div>
                  <div className="ct-field"><label htmlFor="ct-message">Project Details</label><textarea id="ct-message" name="message" placeholder="Tell me about your project and goals..." required /></div>
                  {/* Honeypot: hidden from humans and assistive tech; bots that
                      auto-fill every field trip it and the server silently
                      discards the submission (see public/contact-handler.php). */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                    <label htmlFor="ct-company-website">Company website (leave blank)</label>
                    <input id="ct-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  {error && <p role="alert" style={{ color: '#f87171', fontSize: '.85rem', margin: 0 }}>{error}</p>}
                  <button type="submit" className="ct-submit" disabled={sending} aria-busy={sending}>{sending ? 'Sending…' : 'Send Inquiry →'}</button>
                </form>
              ) : <div style={{ textAlign: 'center', padding: '40px 0' }}><div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div><p style={{ color: 'var(--text-secondary)' }}>Your inquiry has been received. I'll get back to you shortly.</p><Link href="/" className="btn btn-ghost" style={{ marginTop: 20 }}>Back to Home</Link></div>}
            </div>
          </div>
        </div>
      </section>

      <section className="ideal-section" ref={idealRef}>
        <div className="container">
          <div className="ideal-grid">
            <div className="ideal-content reveal-l">
              <div className="sec-label">Ideal Client Fit</div>
              <h2>We're a Great Fit <span className="text-gradient">If You...</span></h2>
              <p>I work best with business owners and teams who are serious about growth.</p>
              <div className="ideal-checks">{IDEAL_YES.map(i => <div className="ideal-check" key={i}><span className="ideal-check-icon">✓</span>{i}</div>)}</div>
            </div>
            <div className="ideal-not reveal-r">
              <div className="sec-label" style={{ marginBottom: 20 }}>Not the Right Fit If...</div>
              {IDEAL_NO.map(i => <div className="ideal-not-item" key={i}><span className="ideal-not-icon">✕</span>{i}</div>)}
              <div style={{ marginTop: 28, padding: 20, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)' }}>
                <p style={{ fontSize: '.88rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>No judgment.</strong> If you're not ready yet, check out my <Link href="/tools" style={{ color: 'var(--brand-500)' }}>free SEO tools</Link> or <Link href="/case-studies" style={{ color: 'var(--brand-500)' }}>case studies</Link> for self-serve value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section" ref={faqRef}>
        <div className="container">
          <div className="sec-header">
            <div className="sec-label reveal">Common Questions</div>
            <h2 className="sec-title reveal">Before You <span className="text-gradient">Reach Out</span></h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div className={`faq-item${activeFaq === i ? ' active' : ''}`} key={i}>
                <div className="faq-q" onClick={() => setActiveFaq(activeFaq === i ? -1 : i)} role="button" tabIndex={0} aria-expanded={activeFaq === i} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveFaq(activeFaq === i ? -1 : i) } }}>{f.q}<span className="faq-chevron" aria-hidden="true">▾</span></div>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
