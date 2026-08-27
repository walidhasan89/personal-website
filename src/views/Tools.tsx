'use client'

import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { softwareApplicationSchema } from '@/lib/schema'
import { getScreenshot, SCREENSHOT_FALLBACK } from '@/lib/screenshot'
import { useScrollReveal } from '@/hooks/useAnimations'

const css = `
.tools-hero{padding:160px 0 80px;position:relative;overflow:hidden;text-align:center}
.tools-hero-mesh{position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 30%,rgba(37,99,235,0.12),transparent 60%);pointer-events:none}
[data-theme="light"] .tools-hero-mesh{background:radial-gradient(ellipse 60% 50% at 50% 30%,rgba(37,99,235,0.05),transparent 60%)}
.tools-hero-inner{position:relative;z-index:2;max-width:820px;margin:0 auto}
.tools-hero h1{font-family:var(--font-heading);font-size:clamp(2rem,4.5vw,3.2rem);font-weight:700;line-height:1.14;letter-spacing:-.6px;margin-bottom:20px}
.tools-hero-sub{font-size:1.08rem;color:var(--text-secondary);line-height:1.85;margin-bottom:36px;max-width:640px;margin-left:auto;margin-right:auto}
.tools-hero-stats{display:flex;justify-content:center;gap:36px;flex-wrap:wrap}
.ths{text-align:center}.ths-num{font-family:var(--font-heading);font-size:1.8rem;font-weight:800;color:var(--brand-500)}.ths-label{font-size:.68rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1.2px;font-weight:600}

.product-section{padding:100px 0}
.product-section:nth-child(even){background:var(--bg-secondary)}
.product-section:nth-child(odd){background:var(--bg-primary)}
.ps-layout{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
.ps-layout.reverse{direction:rtl}.ps-layout.reverse>*{direction:ltr}
.ps-content h2{font-family:var(--font-heading);font-size:clamp(1.5rem,2.8vw,2rem);font-weight:700;letter-spacing:-.3px;margin-bottom:10px}
.ps-tagline{font-size:1rem;color:var(--brand-500);font-weight:600;margin-bottom:16px}
.ps-content p{font-size:.94rem;color:var(--text-secondary);line-height:1.85;margin-bottom:14px}
.ps-features{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:20px 0}
.ps-feat{display:flex;align-items:center;gap:8px;font-size:.84rem;color:var(--text-secondary);padding:8px 12px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-sm)}
.ps-feat-check{color:var(--accent-emerald);font-weight:700}
.ps-visual-card{background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-lg);overflow:hidden;transition:all .5s}
.ps-visual-card:hover{border-color:var(--border-hover);box-shadow:var(--shadow-card)}
.ps-screenshot{position:relative;overflow:hidden;aspect-ratio:16/10}
.ps-screenshot img{width:100%;height:100%;object-fit:cover}
.ps-screenshot-badge{position:absolute;top:12px;right:12px;padding:4px 14px;border-radius:var(--r-pill);font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:1px}
.ps-screenshot-badge.ext{background:rgba(59,130,246,0.15);color:var(--brand-500);border:1px solid rgba(59,130,246,0.2)}
.ps-screenshot-badge.new{background:rgba(251,191,36,0.15);color:var(--accent-gold);border:1px solid rgba(251,191,36,0.2)}
.ps-card-info{padding:20px}
.ps-card-info h3{font-family:var(--font-heading);font-size:1.1rem;font-weight:700;margin-bottom:6px}
.ps-card-info>p{font-size:.84rem;color:var(--text-secondary);margin-bottom:14px}
.ps-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.ps-metric{text-align:center;padding:12px 8px;background:var(--bg-elevated);border-radius:var(--r-sm)}
.ps-metric-num{font-family:var(--font-heading);font-size:1rem;font-weight:800;color:var(--brand-500)}
.ps-metric-label{font-size:.6rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.8px;font-weight:600}

.free-tools{padding:110px 0;background:var(--bg-secondary)}
.free-tools-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;align-items:stretch}
.ft-card{display:flex;flex-direction:column;padding:44px 40px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-lg);text-align:center;transition:all .5s}
.ft-card:hover{border-color:var(--border-hover);box-shadow:var(--shadow-card)}
.ft-icon{font-size:2.5rem;margin-bottom:16px}
.ft-card h3{font-family:var(--font-heading);font-size:clamp(1.3rem,2.4vw,1.6rem);font-weight:700;margin-bottom:14px}
.ft-card>p{font-size:.92rem;color:var(--text-secondary);line-height:1.8;margin-bottom:24px}
.ft-features{flex:1;display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:28px;text-align:left;align-content:start}
.ft-feat{font-size:.8rem;color:var(--text-secondary);padding:10px;background:var(--bg-elevated);border-radius:var(--r-sm)}
.ft-card>a{margin-top:auto}

.wt-section{padding:110px 0;background:var(--bg-primary)}
.wt-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.wt-card{padding:28px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-md);transition:all .4s}
.wt-card:hover{border-color:var(--border-hover);transform:translateY(-6px);box-shadow:var(--shadow-card)}
.wt-card-icon{font-size:1.5rem;margin-bottom:14px}
.wt-card h4{font-family:var(--font-heading);font-size:.95rem;font-weight:700;margin-bottom:6px}
.wt-card p{font-size:.84rem;color:var(--text-secondary);line-height:1.65}

.cta-section{padding:120px 0;background:var(--bg-secondary);position:relative;overflow:hidden}
.cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 60% at 50% 50%,rgba(37,99,235,0.1),transparent 70%)}
.cta-inner{max-width:720px;margin:0 auto;text-align:center;position:relative;z-index:1}
.cta-inner h2{font-family:var(--font-heading);font-size:clamp(2rem,3.8vw,2.8rem);font-weight:700;letter-spacing:-.5px;margin-bottom:16px}
.cta-inner p{font-size:1.02rem;color:var(--text-secondary);margin-bottom:36px;line-height:1.8}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.sec-header{text-align:center;margin-bottom:56px}
.sec-title{font-family:var(--font-heading);font-size:clamp(1.8rem,3.4vw,2.5rem);font-weight:700;letter-spacing:-.5px;margin-bottom:14px;line-height:1.18}
.sec-desc{font-size:1rem;color:var(--text-secondary);max-width:580px;margin:0 auto;line-height:1.8}

@media(max-width:1080px){.ps-layout,.ps-layout.reverse{grid-template-columns:1fr;direction:ltr}.wt-grid,.free-tools-grid{grid-template-columns:1fr}}
@media(max-width:768px){.tools-hero{padding:130px 0 60px}.ft-card{padding:32px 24px}.ps-features{grid-template-columns:1fr}}
`

const PRODUCTS = [
  {id:'replychief',badge:'Chrome Extension',badgeType:'ext',title:'ReplyChief',tagline:'Respond faster. Stay consistent. Save hours every week.',url:'https://replychief.com/',screenshot:getScreenshot('https://replychief.com'),desc:'ReplyChief streamlines communication workflows by giving professionals a centralized system for managing replies.',features:['Template library with categories','One-click reply insertion','Cross-platform compatibility','Custom shortcut triggers','Team sharing capabilities','Variable/personalization support'],metrics:[{num:'10x',label:'Faster Replies'},{num:'5+',label:'Hours Saved/Week'},{num:'500+',label:'Users'},{num:'4.8★',label:'Rating'}]},
  {id:'adminpalette',badge:'Chrome Extension',badgeType:'ext',title:'Shopify AdminPalette',tagline:'Command your Shopify store at the speed of thought.',url:'https://adminpalette.com/',screenshot:getScreenshot('https://adminpalette.com'),desc:'AdminPalette adds a powerful command palette to the Shopify admin — letting store owners navigate with keyboard shortcuts.',features:['Cmd+K command palette','Instant product & order search','Quick navigation to any page','Custom keyboard shortcuts','Recent actions history','Works on any Shopify plan'],metrics:[{num:'3x',label:'Faster Navigation'},{num:'Cmd+K',label:'Activation'},{num:'1000+',label:'Installs'},{num:'5.0★',label:'Rating'}],reverse:true},
  {id:'rfqautopilot',badge:'Chrome Extension',badgeType:'ext',title:'RFQ AutoPilot',tagline:'Automate procurement. Respond faster. Win more deals.',url:'https://rfqautopilot.com/',screenshot:getScreenshot('https://rfqautopilot.com'),desc:'RFQ AutoPilot automates the Request for Quotation process for procurement and sourcing teams.',features:['Automated data extraction','One-click RFQ generation','Supplier communication automation','Response tracking dashboard','Template management','Integration with existing workflows'],metrics:[{num:'80%',label:'Time Saved'},{num:'5x',label:'Faster RFQs'},{num:'B2B',label:'Focused'},{num:'4.9★',label:'Rating'}]},
  {id:'siteaudit',badge:'New Launch',badgeType:'new',title:'Site Audit Pilot',tagline:'Instant SEO audits. Right from your browser.',url:'https://chromewebstore.google.com/detail/bpopbhodmhhbedeepfkmifaciaafjbgn',screenshot:getScreenshot('https://siteauditpilot.com'),desc:'Site Audit Pilot gives instant SEO audits for any webpage — analyzing meta tags, headings, images, and performance.',features:['One-click instant page audit','Meta tag & heading analysis','Image optimization checker','Link structure analysis','Schema markup detection','Performance score overview'],metrics:[{num:'1-Click',label:'Audit Speed'},{num:'25+',label:'Check Points'},{num:'Free',label:'To Use'},{num:'New',label:'On Chrome Store'}],reverse:true},
]

const WHY_TOOLS = [
  {icon:'🎯',title:'Built to Solve Real Problems',desc:'Every tool was born from a real workflow pain point I experienced while serving 500+ clients.'},
  {icon:'⚡',title:'Speed-First Design',desc:'All tools are lightweight, fast, and designed to integrate into your existing workflow.'},
  {icon:'🔧',title:'Actively Maintained',desc:'Every tool receives regular updates, bug fixes, and feature improvements.'},
  {icon:'🌍',title:'Used Globally',desc:'Professionals across 30+ countries rely on these tools for daily productivity.'},
  {icon:'🔒',title:'Privacy Focused',desc:'No data collection, no tracking, no selling your information.'},
  {icon:'💡',title:'Free & Accessible',desc:'Core functionality is free for everyone. Premium features are priced fairly.'},
]

const FREE_TOOLS = [
  {
    id: 'seo-report-generator',
    icon: '🔧',
    titlePrefix: 'Free SEO Report',
    titleGradient: 'Generator',
    desc: 'Get an instant, comprehensive SEO health report for any website — completely free, no signup required.',
    features: ['Instant SEO score','Meta tag analysis','Heading structure check','Image optimization report','Mobile-friendly test','Page speed insights','Downloadable PDF report','No signup required'],
    url: 'https://walidhasan.com/seo-report-generator/',
    linkText: 'Try Free SEO Report Generator',
  },
  {
    id: 'invoice-builder',
    icon: '🧾',
    titlePrefix: 'Free Invoice',
    titleGradient: 'Builder',
    desc: 'Create clean, professional invoices in minutes — completely free, no signup required.',
    features: ['Professional invoice templates','Add unlimited line items','Automatic total calculation','Download or print as PDF','No signup required','Completely free'],
    url: 'https://walidhasan.com/invoice-builder/',
    linkText: 'Try Free Invoice Builder',
  },
]

/**
 * One section per product. Extracted from an inline `PRODUCTS.map(...)` that
 * called useScrollReveal() inside the loop callback — a Rules of Hooks
 * violation. See the equivalent note in src/views/Services.tsx.
 */
function ProductSection({ product: p }: { product: (typeof PRODUCTS)[number] }) {
  const ref = useScrollReveal()

  return (
    <section className="product-section" id={p.id} ref={ref}>
      <div className="container">
        <div className={`ps-layout${p.reverse ? ' reverse' : ''}`}>
          <div className="ps-content">
            <div className="sec-label reveal">{p.badge}</div>
            <h2 className="reveal">{p.title}</h2>
            <p className="ps-tagline reveal">{p.tagline}</p>
            <p className="reveal">{p.desc}</p>
            <div className="ps-features reveal">
              {p.features.map((f) => (
                <div className="ps-feat" key={f}><span className="ps-feat-check">✓</span>{f}</div>
              ))}
            </div>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-brand reveal"
              style={{ marginTop: 16 }}
            >
              {p.badgeType === 'new' ? 'View on Chrome Store' : `Visit ${p.title}`}{' '}
              <span className="arrow">→</span>
            </a>
          </div>
          <div className="ps-visual-card reveal">
            <div className="ps-screenshot">
              <img
                src={p.screenshot}
                alt={`Screenshot of the ${p.title} website`}
                loading="lazy"
                width={1280}
                height={800}
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = SCREENSHOT_FALLBACK
                }}
              />
              <div className={`ps-screenshot-badge ${p.badgeType}`}>
                {p.badgeType === 'ext' ? 'Chrome Extension' : 'New Launch'}
              </div>
            </div>
            <div className="ps-card-info">
              <h3>{p.title}</h3>
              <p>{p.tagline}</p>
              <div className="ps-metrics">
                {p.metrics.map((m) => (
                  <div className="ps-metric" key={m.label}><div className="ps-metric-num">{m.num}</div><div className="ps-metric-label">{m.label}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ToolsPage() {
  const heroRef = useScrollReveal()
  const freeRef = useScrollReveal()
  const whyRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  return (
    <>
      {PRODUCTS.map((p) => (
        <JsonLd
          key={p.id}
          data={softwareApplicationSchema({
            name: p.title,
            description: p.desc,
            url: p.url,
            applicationCategory: 'BrowserApplication',
          })}
        />
      ))}
      <style
  suppressHydrationWarning
  dangerouslySetInnerHTML={{ __html: css }}
/>

      <section className="tools-hero" ref={heroRef}>
        <div className="tools-hero-mesh" /><div className="orb orb-1" /><div className="orb orb-2" />
        <Breadcrumbs items={[{ name: 'Tools', path: '/tools' }]} />
        <div className="container tools-hero-inner">
          <div className="sec-label reveal">Tools & Products</div>
          <h1 className="reveal">Purpose-Built Tools for <span className="text-gradient">Digital Professionals</span></h1>
          <p className="tools-hero-sub reveal">I don't just build websites for clients — I build software tools that solve real workflow problems.</p>
          <div className="tools-hero-stats reveal">
            <div className="ths"><div className="ths-num">4</div><div className="ths-label">Chrome Extensions</div></div>
            <div className="ths"><div className="ths-num">2</div><div className="ths-label">Free Tools</div></div>
            <div className="ths"><div className="ths-num">30+</div><div className="ths-label">Countries Using</div></div>
            <div className="ths"><div className="ths-num">2000+</div><div className="ths-label">Total Users</div></div>
          </div>
        </div>
      </section>

      {PRODUCTS.map((p) => (
        <ProductSection key={p.id} product={p} />
      ))}

      <section className="free-tools" ref={freeRef}>
        <div className="container">
          <div className="sec-header center reveal">
            <div className="sec-label">100% Free</div>
            <h2 className="sec-title">Free Tools <span className="text-gradient">& Resources</span></h2>
            <p className="sec-desc">No signup, no cost — practical tools built to solve real problems.</p>
          </div>
          <div className="free-tools-grid">
            {FREE_TOOLS.map((t) => (
              <div className="ft-card reveal" key={t.id}>
                <div className="ft-icon">{t.icon}</div>
                <h3>{t.titlePrefix} <span className="text-gradient">{t.titleGradient}</span></h3>
                <p>{t.desc}</p>
                <div className="ft-features">{t.features.map(f=><div className="ft-feat" key={f}>✓ {f}</div>)}</div>
                <a href={t.url} target="_blank" rel="noopener noreferrer" className="btn btn-brand">{t.linkText} <span className="arrow">→</span></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wt-section" ref={whyRef}>
        <div className="container">
          <div className="sec-header">
            <div className="sec-label reveal">Why These Tools</div>
            <h2 className="sec-title reveal">Built Different. <span className="text-gradient">Built Better.</span></h2>
            <p className="sec-desc reveal">Production tools built by someone who uses them daily.</p>
          </div>
          <div className="wt-grid">
            {WHY_TOOLS.map(w=><div className="wt-card reveal" key={w.title}><div className="wt-card-icon">{w.icon}</div><h4>{w.title}</h4><p>{w.desc}</p></div>)}
          </div>
        </div>
      </section>

      <section className="cta-section" ref={ctaRef}>
        <div className="container">
          <div className="cta-inner">
            <div className="sec-label reveal">Need a Custom Tool?</div>
            <h2 className="reveal">Let's Build Something <span className="text-gradient">Together</span></h2>
            <p className="reveal">Have a workflow problem that needs a custom solution? Let's talk about building it.</p>
            <div className="cta-btns reveal">
              <Link href="/contact" className="btn btn-brand">Get in Touch <span className="arrow">→</span></Link>
              <Link href="/services" className="btn btn-ghost">View Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
