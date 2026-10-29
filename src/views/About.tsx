'use client'

import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useScrollReveal } from '@/hooks/useAnimations'

const SERVICES = [
  { icon: '🎨', title: 'Website Design', desc: 'Clear, conversion-focused sites that tell people what you do and how to hire you.' },
  { icon: '💻', title: 'Web Development', desc: 'WordPress and custom builds, with forms, tracking, and a layout that holds up on a phone.' },
  { icon: '🛠️', title: 'Software Development', desc: 'Custom tools and browser extensions for a workflow you already have. RFQ AutoPilot is the public example.' },
  { icon: '📈', title: 'SEO Services', desc: 'Technical, on-page, and local SEO, including Google Business Profile.' },
]

const PROCESS = [
  { num: '01', title: 'Discover', desc: 'Business, audience, and the job the site or software has to do.' },
  { num: '02', title: 'Plan', desc: 'Structure and a plain definition of what "done" looks like.' },
  { num: '03', title: 'Build', desc: 'Design, development, and the SEO and tracking that belong in the first release.' },
  { num: '04', title: 'Launch', desc: 'Go live, confirm the forms and analytics, and agree what happens next.' },
]

const css = `
.about-hero{padding:160px 0 80px;position:relative;overflow:hidden}
.about-hero-mesh{position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 30% 40%,rgba(37,99,235,0.12),transparent 60%),radial-gradient(ellipse 50% 50% at 80% 60%,rgba(34,211,238,0.05),transparent 60%);pointer-events:none}
[data-theme="light"] .about-hero-mesh{background:radial-gradient(ellipse 70% 50% at 30% 40%,rgba(37,99,235,0.05),transparent 60%)}
.about-hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(59,130,246,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.02) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 60% 60% at 50% 50%,black,transparent);-webkit-mask-image:radial-gradient(ellipse 60% 60% at 50% 50%,black,transparent);pointer-events:none}
.about-hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.about-hero-text h1{font-family:var(--font-heading);font-size:clamp(2rem,4.5vw,3.2rem);font-weight:700;line-height:1.14;letter-spacing:-.6px;margin-bottom:20px}
.about-hero-text .lead{font-size:1.05rem;color:var(--text-secondary);line-height:1.85;margin-bottom:16px}
.about-hero-text .lead strong{color:var(--text-primary);font-weight:700}
.about-quick-stats{display:flex;gap:28px;flex-wrap:wrap;margin-top:28px}
.aqs-num{font-family:var(--font-heading);font-size:1.7rem;font-weight:800;color:var(--brand-500);line-height:1.2}
.aqs-label{font-size:.68rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1.2px;font-weight:600}
.about-hero-visual{position:relative;display:flex;justify-content:center}
.about-img-wrap{position:relative;width:100%;max-width:380px}
.about-img-frame{aspect-ratio:1/1;border-radius:30px;overflow:hidden;border:1px solid rgba(59,130,246,0.14);background:linear-gradient(145deg,rgba(37,99,235,0.07),rgba(30,64,175,0.035));padding:8px;box-shadow:0 30px 80px rgba(0,0,0,0.45),0 0 60px rgba(37,99,235,0.08)}
[data-theme="light"] .about-img-frame{box-shadow:0 20px 50px rgba(0,0,0,0.08)}
.about-img-frame img{width:100%;aspect-ratio:1/1;height:auto;display:block;object-fit:cover;object-position:center top;border-radius:22px}
.about-img-glow{position:absolute;inset:-25%;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,0.12),transparent 60%);z-index:-1}
.about-float{position:absolute;padding:10px 16px;background:rgba(10,10,24,0.8);backdrop-filter:blur(16px);border:1px solid rgba(59,130,246,0.12);border-radius:var(--r-md);font-size:.76rem;font-weight:600;z-index:5;white-space:nowrap;box-shadow:0 8px 28px rgba(0,0,0,0.4)}
[data-theme="light"] .about-float{background:rgba(255,255,255,0.85);box-shadow:0 8px 24px rgba(0,0,0,0.06)}
.af1{bottom:12%;right:-8%;color:var(--accent-cyan)}
.af2{top:10%;left:-6%;color:var(--accent-gold)}
.af3{top:55%;right:-12%;color:var(--brand-500)}
.values-section{padding:100px 0;background:var(--bg-secondary)}
.values-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.value-card{padding:32px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-md)}
.value-icon{width:48px;height:48px;border-radius:14px;background:rgba(37,99,235,0.08);border:1px solid rgba(59,130,246,0.1);display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:18px}
.value-card h3{font-family:var(--font-heading);font-size:1.05rem;font-weight:700;margin-bottom:8px}
.value-card p{font-size:.86rem;color:var(--text-secondary);line-height:1.7}
.about-process{padding:100px 0;background:var(--bg-primary)}
.cta-section{padding:120px 0;background:var(--bg-secondary);position:relative;overflow:hidden}
.cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 60% at 50% 50%,rgba(37,99,235,0.1),transparent 70%)}
.cta-inner{max-width:720px;margin:0 auto;text-align:center;position:relative;z-index:1}
.cta-inner h2{font-family:var(--font-heading);font-size:clamp(2rem,3.8vw,2.8rem);font-weight:700;letter-spacing:-.5px;margin-bottom:16px}
.cta-inner p{font-size:1.02rem;color:var(--text-secondary);margin-bottom:36px;line-height:1.8}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
@media(max-width:1080px){
  .about-hero-inner{grid-template-columns:1fr}
  .about-hero-text{text-align:center}
  .about-quick-stats{justify-content:center}
  .about-hero-visual{max-width:340px;margin:40px auto 0}
}
@media(max-width:768px){
  .about-hero{padding:130px 0 70px}
  .values-grid{grid-template-columns:1fr}
  .about-float{display:none}
}
`

export default function AboutPage() {
  const heroRef = useScrollReveal()
  const servicesRef = useScrollReveal()
  const processRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  return (
    <>
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: css }} />
      <section className="about-hero" ref={heroRef}>
        <div className="about-hero-mesh" /><div className="about-hero-grid" />
        <div className="orb orb-1" /><div className="orb orb-2" />
        <Breadcrumbs items={[{ name: 'About', path: '/about' }]} />
        <div className="container about-hero-inner">
          <div className="about-hero-text">
            <div className="sec-label reveal">About</div>
            <h1 className="reveal">Web Designer, Developer &amp; <span className="text-gradient">SEO Specialist</span></h1>
            <p className="lead reveal">I&apos;m <strong>Walid Hasan</strong>. Since 2017 I have designed and built websites, custom software, and SEO systems for businesses that need a clear online presence and a straightforward way to get clients.</p>
            <p className="lead reveal">The work is four services: website design, web development, software development, and SEO. A typical project starts with what the business needs the site or tool to do, then design and build, then launch with tracking in place.</p>
            <p className="lead reveal">I also founded <a href="https://inoviqa.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-500)' }}>Inoviqa LLC</a>. On this site it appears once, as an SEO example in the work.</p>
            <div className="about-quick-stats reveal">
              <div className="aqs"><div className="aqs-num">7+</div><div className="aqs-label">Years</div></div>
              <div className="aqs"><div className="aqs-num">500+</div><div className="aqs-label">Projects</div></div>
              <div className="aqs"><div className="aqs-num">30+</div><div className="aqs-label">Countries</div></div>
            </div>
          </div>
          <div className="about-hero-visual reveal">
            <div className="about-img-wrap">
              <div className="about-img-glow" />
              <div className="about-img-frame"><img src="/assets/walidhasan-logo.webp" alt="Walid Hasan" width="380" height="380" /></div>
              <div className="about-float af1">Website Design</div>
              <div className="about-float af2">Web Development</div>
              <div className="about-float af3">SEO Services</div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section" ref={servicesRef}>
        <div className="container">
          <div className="sec-header center">
            <div className="sec-label reveal">What I do</div>
            <h2 className="sec-title reveal">The four <span className="text-gradient">services</span></h2>
          </div>
          <div className="values-grid">
            {SERVICES.map((service) => (
              <article className="value-card reveal" key={service.title}>
                <div className="value-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-process" ref={processRef}>
        <div className="container">
          <div className="sec-header center">
            <div className="sec-label reveal">How I work</div>
            <h2 className="sec-title reveal">From the first call to <span className="text-gradient">launch</span></h2>
            <p className="sec-desc reveal">Same path for a marketing site, a custom tool, or an SEO engagement. Scope changes. The sequence does not.</p>
          </div>
          <div className="proc-track">
            {PROCESS.map((step) => (
              <div className="proc-step reveal" key={step.num}>
                <div className="proc-num">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" ref={ctaRef}>
        <div className="container">
          <div className="cta-inner">
            <div className="sec-label reveal">Work together</div>
            <h2 className="reveal">If the fit is right, <span className="text-gradient">let&apos;s talk</span></h2>
            <p className="reveal">Email hello@walidhasan.com, message WhatsApp +880 177 434 0932, or book a call.</p>
            <div className="cta-btns reveal">
              <Link href="/book" className="btn btn-brand">Book a Call <span className="arrow">→</span></Link>
              <Link href="/work" className="btn btn-ghost">See the Work</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
