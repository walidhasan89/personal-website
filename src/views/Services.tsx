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

const SERVICES = [
  { id:'web',icon:'🎨',label:'Core Service',title:'Website Design & Development',desc:'Your website is your most powerful sales asset. I design and develop high-converting WordPress websites that don\'t just look premium — they generate leads.',desc2:'Every site is built with conversion architecture, SEO foundations, and performance optimization from day one.',features:['Custom WordPress & Elementor design','Conversion-optimized page architecture','Mobile-first responsive development','Speed & Core Web Vitals optimization','SEO-ready structure from day one','Lead capture & CTA strategy'],metrics:[{num:'300+',label:'Sites Built'},{num:'2-4',label:'Week Delivery'},{num:'95+',label:'PageSpeed Score'},{num:'3x',label:'Avg Lead Increase'}],bar:{label:'PageSpeed Score',value:95},lines:[{text:'Conversion-optimized architecture',dot:''},{text:'Mobile-first responsive design',dot:'cyan'},{text:'Core Web Vitals optimized',dot:'gold'}] },
  { id:'seo',icon:'📈',label:'Growth Engine',title:'SEO Strategy & Execution',desc:'Search engine optimization isn\'t about stuffing keywords. It\'s about building a systematic organic growth engine that compounds over time.',desc2:'I deliver comprehensive SEO strategies covering on-page, technical SEO, content architecture, and link building.',features:['Comprehensive SEO audit & strategy','On-page optimization & content strategy','Technical SEO & site architecture','Keyword research & competitor analysis','Monthly reporting & performance tracking','Ongoing optimization & iteration'],metrics:[{num:'96%',label:'Client Retention'},{num:'60-90',label:'Days to Results'},{num:'200%',label:'Avg Traffic Growth'},{num:'500+',label:'Keywords Ranked'}],reverse:true,bar:{label:'Client Retention',value:96},lines:[{text:'Organic traffic compounding monthly',dot:''},{text:'Keyword rankings climbing steadily',dot:'cyan'},{text:'Domain authority growing',dot:'gold'}] },
  { id:'local',icon:'📍',label:'Local Domination',title:'Local SEO & Google Business Profile',desc:'For local businesses, Google Maps and local search are where customers find you.',desc2:'From GBP optimization to local citation building, review strategy, and geo-targeted content.',features:['Google Business Profile optimization','Local citation building & NAP consistency','Review generation strategy','Local keyword targeting','Geo-targeted landing pages','Local link building & outreach'],metrics:[{num:'#1',label:'Map Pack Rankings'},{num:'5x',label:'Calls Increase'},{num:'90',label:'Day Avg Results'},{num:'150+',label:'Local Projects'}],bar:{label:'Map Pack Ranking Rate',value:92},lines:[{text:'Google Maps visibility maximized',dot:''},{text:'Local citations fully consistent',dot:'cyan'},{text:'Review generation automated',dot:'gold'}] },
  { id:'analytics',icon:'📊',label:'Data Intelligence',title:'Web Analytics & Conversion Tracking',desc:'You can\'t improve what you can\'t measure. I set up advanced analytics and conversion tracking.',desc2:'From GA4 and Tag Manager to server-side tracking, Meta Pixel, and Google Ads conversion tracking.',features:['Google Analytics 4 setup','Google Tag Manager implementation','Server-side tracking setup','Meta Pixel & Google Ads tracking','Custom conversion tracking','Reporting dashboards & insights'],metrics:[{num:'100%',label:'Data Accuracy'},{num:'GA4',label:'Setup'},{num:'24hr',label:'Setup Time'},{num:'50+',label:'Tracking Projects'}],reverse:true,bar:{label:'Data Accuracy',value:100},lines:[{text:'Every conversion tracked precisely',dot:''},{text:'Real-time reporting dashboards',dot:'cyan'},{text:'Server-side tracking enabled',dot:'gold'}] },
  { id:'lead',icon:'🚀',label:'Revenue Driver',title:'Lead Generation Strategy',desc:'End-to-end lead generation systems combining landing pages, SEO funnels, and conversion optimization.',desc2:'Real, qualified business inquiries from people ready to buy — delivered through organic channels.',features:['Landing page design & optimization','SEO funnel architecture','Lead magnet strategy','Form optimization & A/B testing','CRM integration & automation','Conversion rate optimization'],metrics:[{num:'40+',label:'Leads/Month Avg'},{num:'3x',label:'ROI Improvement'},{num:'65%',label:'Cost Reduction'},{num:'200+',label:'Funnels Built'}],bar:{label:'Pipeline Conversion',value:88},lines:[{text:'Qualified leads flowing predictably',dot:''},{text:'Funnel stages optimized',dot:'cyan'},{text:'CRM automation connected',dot:'gold'}] },
  { id:'cro',icon:'⚡',label:'Profit Multiplier',title:'Conversion Rate Optimization',desc:'The fastest way to grow revenue isn\'t more traffic — it\'s converting more of the traffic you already have.',desc2:'Through heatmap analysis, user behavior tracking, A/B testing, and strategic UX improvements.',features:['Heatmap & behavior analysis','A/B and multivariate testing','UX & UI optimization','Form & CTA optimization','Page speed improvement','Checkout & funnel optimization'],metrics:[{num:'45%',label:'Avg Conversion Lift'},{num:'2x',label:'Revenue Growth'},{num:'100+',label:'Tests Run'},{num:'30+',label:'CRO Projects'}],reverse:true,bar:{label:'Avg Conversion Lift',value:85},lines:[{text:'A/B tests running continuously',dot:''},{text:'User behavior patterns analyzed',dot:'cyan'},{text:'Revenue per visitor increasing',dot:'gold'}] },
]

const PACKAGES = [
  { badge:'Starter',title:'Growth Foundation',desc:'Perfect for businesses that need a professional online presence with SEO-ready foundations.',features:['Custom WordPress website (up to 5 pages)','Mobile-responsive design','Basic on-page SEO setup','Contact form & lead capture','Google Analytics integration','Speed optimization','2 weeks delivery'] },
  { badge:'Most Popular',badgeType:'pop',title:'Growth Accelerator',desc:'The complete package for businesses serious about organic growth.',features:['Custom WordPress website (up to 12 pages)','Conversion-optimized design','Full SEO audit & strategy','Google Business Profile optimization','Advanced analytics & tracking setup','Lead generation system','CRO recommendations','4 weeks delivery + 30-day support'],featured:true },
  { badge:'Enterprise',title:'Growth Partner',desc:'Ongoing strategic partnership for compounding digital growth.',features:['Everything in Growth Accelerator','Monthly SEO retainer','Ongoing conversion optimization','Content strategy & optimization','Monthly reporting & strategy calls','Priority support & updates','Server-side tracking setup','Dedicated growth consultant'] },
]

const FAQS = [
  { q:'How much does a website cost?',a:'Pricing depends on complexity, pages, and features. My projects typically range from $500 to $5,000+.' },
  { q:'Do you work with businesses outside my country?',a:'Absolutely. I serve clients across 30+ countries with professional communication and international payment systems.' },
  { q:'How long does SEO take to show results?',a:'Initial improvements are typically visible within 60–90 days. Significant results compound over 4–6 months.' },
  { q:'Do you offer ongoing maintenance?',a:'Yes. I offer monthly retainers covering website maintenance, SEO optimization, analytics reporting, and strategic consulting.' },
  { q:'What if I already have a website?',a:'I can audit your existing website, identify growth opportunities, and either optimize or recommend a strategic redesign.' },
]

/**
 * One "deep dive" section per service.
 *
 * This is a separate component on purpose. It previously lived inline as
 * `SERVICES.map((s) => { const ref = useScrollReveal(); ... })`, which calls
 * a React Hook inside a loop callback — a direct violation of the Rules of
 * Hooks. It happened to work only because SERVICES has a constant length;
 * any future conditional or reordered render would have desynchronised
 * React's hook state and caused hard-to-debug runtime errors. Extracting the
 * section into its own component gives each instance its own hook scope,
 * which is the correct fix.
 */
function ServiceDeepSection({ service: s }: { service: (typeof SERVICES)[number] }) {
  const ref = useScrollReveal()

  return (
    <section className="srv-deep" ref={ref}>
      <div className="container">
        <div className={`srv-deep-grid${s.reverse ? ' reverse' : ''}`}>
          <div className="sd-content">
            <div className="sec-label reveal">{s.label}</div>
            <h2 className="reveal">{s.title}</h2>
            <p className="reveal">{s.desc}</p>
            <p className="reveal">{s.desc2}</p>
            <div className="sd-features reveal">
              {s.features.map((f) => (
                <div className="sd-feat" key={f}><span className="sd-feat-check">✓</span>{f}</div>
              ))}
            </div>
            <Link href="/book" className="btn btn-brand reveal" style={{ marginTop: 20 }}>
              Get Started <span className="arrow">→</span>
            </Link>
          </div>
          <div className="sd-visual reveal">
            <div className="sd-visual-card" aria-hidden="true">
              <div className="sd-visual-icon">{s.icon}</div>
              <div className="sd-visual-title">
                {s.title.split(' ').slice(0, 2).join(' ')}{' '}
                <span>{s.title.split(' ').slice(2).join(' ')}</span>
              </div>
              <div className="sd-visual-bar">
                <div className="sd-visual-bar-label"><span>{s.bar.label}</span><span>{s.bar.value}%</span></div>
                <div className="sd-visual-bar-track"><div className="sd-visual-bar-fill" style={{ width: s.bar.value + '%' }} /></div>
              </div>
              {s.lines.map((l, li) => (
                <div className="sd-visual-line" key={li}><div className={`sd-visual-line-dot ${l.dot}`} />{l.text}</div>
              ))}
              <div className="sd-metrics">
                {s.metrics.map((m) => (
                  <div className="sd-metric" key={m.label}><div className="sd-metric-num">{m.num}</div><div className="sd-metric-label">{m.label}</div></div>
                ))}
              </div>
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
  const pkgRef = useScrollReveal()
  const faqRef = useScrollReveal()
  const ctaRef = useScrollReveal()
  const [activeFaq,setActiveFaq] = useState(-1)

  return (
    <>
      <JsonLd data={faqPageSchema(FAQS)} />
      <style
  suppressHydrationWarning
  dangerouslySetInnerHTML={{ __html: css }}
/>

      <section className="srv-hero" ref={heroRef}>
        <div className="srv-hero-mesh" /><div className="orb orb-1" /><div className="orb orb-2" />
        <Breadcrumbs items={[{ name: 'Services', path: '/services' }]} />
        <div className="container srv-hero-inner">
          <div className="sec-label reveal">Services</div>
          <h1 className="reveal">Strategic Digital Services <span className="text-gradient">Engineered for Growth</span></h1>
          <p className="srv-hero-sub reveal">I don't sell hours. I sell outcomes. Every service is a growth system — engineered to generate leads, build authority, and drive measurable revenue.</p>
          <div className="srv-hero-stats reveal">
            <div className="shs"><div className="shs-num">6</div><div className="shs-label">Core Services</div></div>
            <div className="shs"><div className="shs-num">500+</div><div className="shs-label">Projects Delivered</div></div>
            <div className="shs"><div className="shs-num">30+</div><div className="shs-label">Countries Served</div></div>
            <div className="shs"><div className="shs-num">98%</div><div className="shs-label">Client Satisfaction</div></div>
          </div>
        </div>
      </section>

      {SERVICES.map((s) => (
        <ServiceDeepSection key={s.id} service={s} />
      ))}

      <section className="pkg-section" ref={pkgRef}>
        <div className="container">
          <div className="sec-header">
            <div className="sec-label reveal">Engagement Models</div>
            <h2 className="sec-title reveal">Choose Your <span className="text-gradient">Growth</span> Path</h2>
            <p className="sec-desc reveal">Flexible engagement models designed for businesses at every stage.</p>
          </div>
          <div className="pkg-grid">
            {PACKAGES.map(p=>(
              <div className={`pkg-card reveal${p.featured?' featured':''}`} key={p.title}>
                <div className={`pkg-badge${p.badgeType==='pop'?' pop':''}`}>{p.badge}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="pkg-features">{p.features.map(f=><div className="pkg-feat" key={f}><span className="pkg-check">✓</span>{f}</div>)}</div>
                <Link href="/book" className={`btn ${p.featured?'btn-brand':'btn-ghost'}`}>Get Started <span className="arrow">→</span></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section" ref={faqRef}>
        <div className="container">
          <div className="sec-header">
            <div className="sec-label reveal">Common Questions</div>
            <h2 className="sec-title reveal">Services <span className="text-gradient">FAQ</span></h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f,i)=>(
              <div className={`faq-item${activeFaq===i?' active':''}`} key={i}>
                <div className="faq-q" onClick={()=>setActiveFaq(activeFaq===i?-1:i)} role="button" tabIndex={0} aria-expanded={activeFaq===i} onKeyDown={(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setActiveFaq(activeFaq===i?-1:i)}}}>{f.q}<span className="faq-chevron" aria-hidden="true">▾</span></div>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" ref={ctaRef}>
        <div className="container">
          <div className="cta-inner">
            <div className="sec-label reveal">Ready to Grow?</div>
            <h2 className="reveal">Let's Build Your <span className="text-gradient">Growth Engine</span></h2>
            <p className="reveal">Stop guessing. Start growing. Book a free consultation and I'll map out a custom growth strategy.</p>
            <div className="cta-btns reveal">
              <Link href="/book" className="btn btn-brand">Book a Free Consultation <span className="arrow">→</span></Link>
              <Link href="/case-studies" className="btn btn-ghost">View Case Studies</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
