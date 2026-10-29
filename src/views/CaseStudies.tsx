'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getScreenshot, SCREENSHOT_FALLBACK } from '@/lib/screenshot'
import { useScrollReveal } from '@/hooks/useAnimations'

const css = `
.cs-hero{padding:160px 0 80px;position:relative;overflow:hidden;text-align:center}
.cs-hero-mesh{position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 30%,rgba(37,99,235,0.12),transparent 60%);pointer-events:none}
[data-theme="light"] .cs-hero-mesh{background:radial-gradient(ellipse 60% 50% at 50% 30%,rgba(37,99,235,0.05),transparent 60%)}
.cs-hero-inner{position:relative;z-index:2;max-width:820px;margin:0 auto}
.cs-hero h1{font-family:var(--font-heading);font-size:clamp(2rem,4.5vw,3.2rem);font-weight:700;line-height:1.14;letter-spacing:-.6px;margin-bottom:20px}
.cs-hero-sub{font-size:1.08rem;color:var(--text-secondary);line-height:1.85;margin-bottom:36px;max-width:640px;margin-left:auto;margin-right:auto}
.cs-hero-stats{display:flex;justify-content:center;gap:36px;flex-wrap:wrap}
.chs{text-align:center}
.chs-num{font-family:var(--font-heading);font-size:1.8rem;font-weight:800;color:var(--brand-500)}
.chs-label{font-size:.68rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1.2px;font-weight:600}

.filter-bar{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:48px}
.filter-btn{padding:8px 18px;border-radius:var(--r-pill);font-family:var(--font-body);font-size:.8rem;font-weight:600;border:1px solid var(--border-subtle);background:var(--bg-card);color:var(--text-secondary);cursor:pointer;transition:all .3s}
.filter-btn:hover{border-color:var(--brand-500);color:var(--text-primary)}
.filter-btn.active{background:var(--gradient-brand);color:#fff;border-color:transparent}
.filter-count{font-size:.65rem;opacity:.6;margin-left:4px}

.projects-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.project-card{background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-md);overflow:hidden;transition:all .5s cubic-bezier(.4,0,.2,1);opacity:0;transform:translateY(20px)}
.project-card.visible{opacity:1;transform:translateY(0)}
.project-card:hover{border-color:var(--border-hover);box-shadow:var(--shadow-card)}
.pc-thumb{position:relative;overflow:hidden;aspect-ratio:16/10}
.pc-thumb img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.project-card:hover .pc-thumb img{transform:scale(1.04)}
.pc-overlay{position:absolute;inset:0;background:rgba(6,6,17,0.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .4s}
.project-card:hover .pc-overlay{opacity:1}
.pc-live-btn{padding:10px 24px;background:var(--gradient-brand);color:#fff;border-radius:var(--r-pill);font-size:.85rem;font-weight:600;transition:transform .3s}
.pc-status{position:absolute;top:12px;right:12px;padding:4px 12px;border-radius:var(--r-pill);font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:1px}
.pc-status.live{background:rgba(52,211,153,0.15);color:var(--accent-emerald);border:1px solid rgba(52,211,153,0.2)}
.pc-status.product{background:rgba(59,130,246,0.15);color:var(--brand-500);border:1px solid rgba(59,130,246,0.2)}
.pc-info{padding:18px}
.pc-info h3{font-family:var(--font-heading);font-size:.95rem;font-weight:700;margin-bottom:4px}
.pc-industry{font-size:.72rem;color:var(--brand-500);font-weight:600;margin-bottom:8px}
.pc-desc{font-size:.82rem;color:var(--text-secondary);line-height:1.65;margin-bottom:10px}
.pc-tags{display:flex;gap:5px;flex-wrap:wrap}
.pc-tags span{padding:3px 9px;background:rgba(37,99,235,0.06);border:1px solid rgba(59,130,246,0.08);border-radius:var(--r-pill);font-size:.65rem;color:var(--brand-500);font-weight:600}

.cta-section{padding:120px 0;background:var(--bg-secondary);position:relative;overflow:hidden}
.cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 60% at 50% 50%,rgba(37,99,235,0.1),transparent 70%)}
.cta-inner{max-width:720px;margin:0 auto;text-align:center;position:relative;z-index:1}
.cta-inner h2{font-family:var(--font-heading);font-size:clamp(2rem,3.8vw,2.8rem);font-weight:700;letter-spacing:-.5px;margin-bottom:16px}
.cta-inner p{font-size:1.02rem;color:var(--text-secondary);margin-bottom:36px;line-height:1.8}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}

@media(max-width:1080px){.projects-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.cs-hero{padding:130px 0 60px}.projects-grid{grid-template-columns:1fr}}
`

const PROJECTS = [
  { url:'https://replychief.com/',name:'ReplyChief',industry:'SaaS / Productivity',cat:'product',tags:['SaaS','Chrome Extension','Product'],desc:'Smart reply management system for faster, consistent communication workflows.' },
  { url:'https://adminpalette.com/',name:'Shopify AdminPalette',industry:'SaaS / Shopify',cat:'product',tags:['Shopify','Chrome Extension','Product'],desc:'Command palette for Shopify admin with keyboard-first navigation.' },
  { url:'https://rfqautopilot.com/',name:'RFQ AutoPilot',industry:'SaaS / Procurement',cat:'product',tags:['SaaS','Chrome Extension','B2B'],desc:'Automated RFQ workflow tool for procurement and sourcing teams.' },
  { url:'https://siteauditpilot.com/',name:'Site Audit Pilot',industry:'SaaS / SEO',cat:'product',tags:['SEO','Chrome Extension','Product'],desc:'One-click instant SEO audit tool for any webpage from Chrome.' },
  { url:'https://inoviqa.com/',name:'Inoviqa LLC',industry:'Digital Agency',cat:'agency',tags:['Agency','WordPress','SEO'],desc:'Premium digital growth agency website with conversion-focused design.' },
  { url:'https://mynewwarehouse.com/',name:'My New Warehouse',industry:'Warehousing / Logistics',cat:'corporate',tags:['Corporate','WordPress','Lead Gen'],desc:'Warehouse solutions company with service showcase and lead capture.' },
  { url:'https://fulfillmyorders.com/',name:'Fulfill My Orders',industry:'Fulfillment / Logistics',cat:'corporate',tags:['Fulfillment','WordPress','Lead Gen'],desc:'Order fulfillment service with process overview and onboarding flow.' },
  { url:'https://redesignfitout.com/',name:'Redesign Fitout',industry:'Interior Design / Fitout',cat:'corporate',tags:['Interior Design','WordPress','Portfolio'],desc:'Interior fitout company with project gallery and consultation booking.' },
  { url:'https://enginious.ae/',name:'Enginious',industry:'Engineering — UAE',cat:'corporate',tags:['Corporate','WordPress','UAE'],desc:'UAE-based engineering company with professional service architecture.' },
  { url:'https://evergreenlandinvesting.com/',name:'Evergreen Land Investing',industry:'Real Estate / Investment',cat:'business',tags:['Real Estate','WordPress','Lead Gen'],desc:'Land investment company with property listings and investor resources.' },
  { url:'https://theultimateastrologer.com/',name:'The Ultimate Astrologer',industry:'Astrology / Wellness',cat:'business',tags:['Wellness','WordPress','Booking'],desc:'Professional astrologer website with readings, bookings, and content.' },
  { url:'https://www.btrservicesinc.com/',name:'BTR Services Inc',industry:'Business Services',cat:'corporate',tags:['Corporate','WordPress','Services'],desc:'Professional business services company with service architecture.' },
  { url:'https://jointalently.com/',name:'Talently',industry:'HR & Recruitment',cat:'corporate',tags:['Platform','HR Tech','CRO'],desc:'Modern recruitment platform with clean UX and applicant flows.' },
  { url:'https://pasonglobal.com/',name:'Pason Global',industry:'Technology / Consulting',cat:'corporate',tags:['Tech','Corporate','WordPress'],desc:'Global technology consulting firm with service showcase.' },
  { url:'https://thedogranch.co.nz/',name:'The Dog Ranch',industry:'Pet Services — NZ',cat:'local',tags:['Local SEO','WordPress','Booking'],desc:'New Zealand dog boarding facility with booking and local SEO.' },
  { url:'https://nospotwy.com/',name:'NoSpot WY',industry:'Cleaning Services',cat:'local',tags:['Local SEO','WordPress','Lead Gen'],desc:'Professional cleaning service with local search optimization.' },
  { url:'https://invictuss.io/',name:'Invictus',industry:'Technology / Web3',cat:'business',tags:['Tech','Web3','Landing Page'],desc:'Technology platform with modern design and feature showcase.' },
  { url:'https://rapidresponsetesting.com/',name:'Rapid Response Testing',industry:'Healthcare / Testing',cat:'business',tags:['Healthcare','WordPress','Booking'],desc:'Medical testing service with appointment booking and location info.' },
  { url:'https://matarbinfraih.com/',name:'Matar Bin Fraih',industry:'Business — UAE',cat:'corporate',tags:['Corporate','WordPress','UAE'],desc:'UAE-based business group with professional corporate web presence.' },
  { url:'https://lix.health/',name:'Lix Health',industry:'Health Tech',cat:'business',tags:['Health Tech','Landing Page','Product'],desc:'Health technology platform with product showcase and user onboarding.' },
  { url:'https://kayakbackpack.com/',name:'Kayak Backpack',industry:'E-Commerce / Outdoor',cat:'ecommerce',tags:['E-Commerce','Shopify','Outdoor'],desc:'Outdoor gear e-commerce store with product catalog.' },
  { url:'https://flawlesswomen.org/',name:'Flawless Women',industry:'Non-Profit / Women',cat:'business',tags:['Non-Profit','WordPress','Community'],desc:'Women empowerment organization website with programs and events.' },
  { url:'https://gherrinosrl.com/',name:'Gherrino SRL',industry:'Manufacturing — Italy',cat:'corporate',tags:['Corporate','Manufacturing','EU'],desc:'Italian manufacturing company with product catalog and international positioning.' },
  { url:'https://claytonvanhook.com/',name:'Clayton Van Hook',industry:'Personal Brand',cat:'business',tags:['Personal Brand','Portfolio','WordPress'],desc:'Professional personal brand website with portfolio and lead capture.' },
  { url:'https://designsbyplatinum.com/',name:'Designs By Platinum',industry:'Design Studio',cat:'business',tags:['Design','Portfolio','Creative'],desc:'Creative design studio with portfolio showcase and client inquiry.' },
  { url:'https://leadershipcompassonline.com/',name:'Leadership Compass',industry:'Coaching & Consulting',cat:'business',tags:['Coaching','WordPress','Lead Gen'],desc:'Leadership coaching platform with program details and booking.' },
  { url:'https://www.caidwin.com/',name:'Caidwin',industry:'Technology',cat:'corporate',tags:['Tech','Corporate','WordPress'],desc:'Technology solutions company with service architecture.' },
  { url:'https://www.drcarlamanly.com/',name:'Dr. Carla Manly',industry:'Psychology & Wellness',cat:'business',tags:['Personal Brand','Wellness','WordPress'],desc:'Clinical psychologist website with books, media, and consultation.' },
  { url:'https://bubbagumpseafoodmarkets.com/',name:'Bubba Gump Seafood',industry:'Restaurant / F&B',cat:'ecommerce',tags:['Restaurant','E-Commerce','WordPress'],desc:'Seafood market and restaurant with online ordering.' },
  { url:'https://bayroaddevelopment.com/',name:'Bay Road Development',industry:'Real Estate',cat:'business',tags:['Real Estate','WordPress','Lead Gen'],desc:'Property development company with project showcases.' },
  { url:'https://conceptualarchitectureanddesigns.com/',name:'Conceptual Architecture',industry:'Architecture',cat:'corporate',tags:['Architecture','Portfolio','WordPress'],desc:'Architecture firm with project gallery and design philosophy.' },
  { url:'https://thecleaningmavens.com/',name:'The Cleaning Mavens',industry:'Cleaning Services',cat:'local',tags:['Local SEO','WordPress','Booking'],desc:'Professional cleaning service with online booking and local SEO.' },
  { url:'https://vbfamlaw.com/',name:'VB Family Law',industry:'Legal Services',cat:'business',tags:['Law Firm','WordPress','Lead Gen'],desc:'Family law practice with attorney profiles and consultation booking.' },
  { url:'https://cbtfittraining.com/',name:'CBT Fit Training',industry:'Fitness',cat:'local',tags:['Fitness','WordPress','Booking'],desc:'Personal training studio with class schedules and membership.' },
  { url:'https://silkwaterswindowsandeaves.com/',name:'Silk Waters',industry:'Home Services',cat:'local',tags:['Local SEO','GBP','Lead Gen'],desc:'Window and eaves cleaning with local SEO domination.' },
  { url:'https://devoidmoda.com.bd/',name:'Devoid Moda',industry:'Fashion — BD',cat:'ecommerce',tags:['E-Commerce','Fashion','Shopify'],desc:'Bangladesh fashion brand with product catalog and e-commerce.' },
  { url:'https://littleredpepper.co.uk/',name:'Little Red Pepper',industry:'Food & Beverage — UK',cat:'ecommerce',tags:['Restaurant','UK','WordPress'],desc:'UK food business with menu presentation and online ordering.' },
  { url:'https://curioustom.co.za/',name:'Curious Tom',industry:'Creative — South Africa',cat:'business',tags:['Creative','Portfolio','ZA'],desc:'South African creative agency with portfolio showcase.' },
  { url:'https://deusboxingg.myshopify.com/',name:'Deus Boxing',industry:'Sports / E-Commerce',cat:'ecommerce',tags:['Shopify','E-Commerce','Sports'],desc:'Boxing equipment e-commerce store with Shopify integration.' },
  { url:'https://bmcliveent.com/',name:'BMC Live Entertainment',industry:'Entertainment',cat:'business',tags:['Entertainment','Events','WordPress'],desc:'Live entertainment company with event showcase and booking.' },
  { url:'https://thebyobfirm.com/',name:'The BYOB Firm',industry:'Business Consulting',cat:'business',tags:['Consulting','WordPress','Lead Gen'],desc:'Business consulting firm with service packages and case studies.' },
  { url:'https://ledsnbaggs.com/',name:'Leds N Baggs',industry:'E-Commerce / Lighting',cat:'ecommerce',tags:['E-Commerce','Shopify','Products'],desc:'LED lighting products e-commerce store.' },
]

const CATEGORIES = [
  { id:'all',label:'All Projects' },
  { id:'product',label:'Products' },
  { id:'corporate',label:'Corporate' },
  { id:'business',label:'Business' },
  { id:'local',label:'Local SEO' },
  { id:'ecommerce',label:'E-Commerce' },
  { id:'agency',label:'Agency' },
]

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), (index % 6) * 80); obs.unobserve(e.target) }
    }, { threshold: 0.05 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [index])

  return (
    <article className={`project-card${visible ? ' visible' : ''}`} ref={ref} style={{ transitionDelay: `${(index % 6) * 0.08}s` }}>
      <div className="pc-thumb">
        <img
          src={getScreenshot(project.url)}
          alt={`Screenshot of the ${project.name} website`}
          loading="lazy"
          decoding="async"
          width={1280}
          height={800}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = SCREENSHOT_FALLBACK
          }}
        />
        <div className="pc-overlay"><a href={project.url} target="_blank" rel="noopener noreferrer" className="pc-live-btn">View Live Site <span className="arrow">→</span></a></div>
        <div className={`pc-status ${project.cat === 'product' ? 'product' : 'live'}`}>{project.cat === 'product' ? 'Product' : 'Live'}</div>
      </div>
      <div className="pc-info">
        <h3>{project.name}</h3>
        <div className="pc-industry">{project.industry}</div>
        <p className="pc-desc">{project.desc}</p>
        <div className="pc-tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div>
      </div>
    </article>
  )
}

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const heroRef = useScrollReveal()
  const ctaRef = useScrollReveal()
  const filtered = activeFilter === 'all' ? PROJECTS : PROJECTS.filter(p => p.cat === activeFilter)
  const counts: Record<string, number> = {}
  CATEGORIES.forEach(c => { counts[c.id] = c.id === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.cat === c.id).length })

  return (
    <>
      <style
  suppressHydrationWarning
  dangerouslySetInnerHTML={{ __html: css }}
/>

      <section className="cs-hero" ref={heroRef}>
        <div className="cs-hero-mesh" /><div className="orb orb-1" /><div className="orb orb-2" />
        <Breadcrumbs items={[{ name: 'Case Studies', path: '/case-studies' }]} />
        <div className="container cs-hero-inner">
          <div className="sec-label reveal">Case Studies</div>
          <h1 className="reveal">Real Projects. Real Results. <span className="text-gradient">Real Growth.</span></h1>
          <p className="cs-hero-sub reveal">Every project below is a real business with a real growth challenge. See how strategic <Link href="/services" style={{color:'var(--brand-500)'}}>web design and SEO</Link> transformed their digital presence.</p>
          <div className="cs-hero-stats reveal">
            <div className="chs"><div className="chs-num">500+</div><div className="chs-label">Total Projects</div></div>
            <div className="chs"><div className="chs-num">30+</div><div className="chs-label">Countries</div></div>
            <div className="chs"><div className="chs-num">15+</div><div className="chs-label">Industries</div></div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-primary)', padding: '0 0 110px' }}>
        <div className="container">
          <h2 className="sr-only">Selected projects</h2>
          <div className="filter-bar">
            {CATEGORIES.map(c => (
              <button key={c.id} className={`filter-btn${activeFilter === c.id ? ' active' : ''}`} onClick={() => setActiveFilter(c.id)}>
                {c.label}<span className="filter-count">({counts[c.id]})</span>
              </button>
            ))}
          </div>
          <div className="projects-grid">
            {filtered.map((p, i) => <ProjectCard key={p.url + activeFilter} project={p} index={i} />)}
          </div>
        </div>
      </section>

      <section className="cta-section" ref={ctaRef}>
        <div className="container">
          <div className="cta-inner">
            <div className="sec-label reveal">Want Similar Results?</div>
            <h2 className="reveal">Let's Build Your <span className="text-gradient">Growth Story</span></h2>
            <p className="reveal">Every case study above started with a conversation. Let's start yours.</p>
            <div className="cta-btns reveal">
              <Link href="/book" className="btn btn-brand">Book a Free Consultation <span className="arrow">→</span></Link>
              <Link href="/services" className="btn btn-ghost">View Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
