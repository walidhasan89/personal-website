'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useScrollReveal, useSkillAnimation } from '@/hooks/useAnimations'

const VALUES = [
  { icon: '🎯', title: 'Results Over Aesthetics', desc: 'A beautiful website means nothing if it doesn\'t generate leads or revenue. Every design decision is tied to a business outcome.' },
  { icon: '🔬', title: 'Data-Driven Everything', desc: 'I don\'t guess. Analytics, heatmaps, conversion data, and search metrics guide every recommendation and optimization.' },
  { icon: '🤝', title: 'Partnership, Not Freelancing', desc: 'I treat every client\'s business like my own. Long-term growth matters more than one-time projects.' },
  { icon: '🌍', title: 'International Quality', desc: 'Serving 30+ countries taught me that world-class quality and communication are non-negotiable, regardless of the project size.' },
  { icon: '⚡', title: 'Speed With Precision', desc: 'Fast delivery without cutting corners. Every project ships on time with meticulous attention to detail.' },
  { icon: '🏗️', title: 'Systems Over Services', desc: 'I don\'t just deliver tasks. I build growth systems — repeatable, scalable, and compounding over time.' },
]

const TIMELINE = [
  { year: '2017', title: 'Started Web Development Journey', desc: 'Began learning HTML, CSS, JavaScript, and WordPress. Built first client websites while studying core web technologies.' },
  { year: '2018', title: 'Entered Freelance Market', desc: 'Launched on Fiverr and started serving international clients. Quickly gained traction with quality-first delivery approach.' },
  { year: '2019', title: 'Expanded into SEO & Analytics', desc: 'Recognized that great websites need traffic. Mastered on-page SEO, technical SEO, and Google Analytics.' },
  { year: '2020', title: '200+ Projects Milestone', desc: 'Crossed 200 completed projects across 15+ countries. Built reputation as a strategic digital partner.' },
  { year: '2021', title: 'Local SEO & GBP Specialization', desc: 'Deep-dived into local SEO and Google Business Profile optimization.' },
  { year: '2022', title: 'Chrome Extension Development', desc: 'Built ReplyChief, Shopify AdminPalette, and RFQ AutoPilot.' },
  { year: '2023', title: 'Founded Inoviqa LLC', desc: 'Formalized the agency with proper business registration, systems, and processes.' },
  { year: '2024', title: '500+ Projects Delivered', desc: 'Crossed half a thousand projects. Expanded into conversion optimization and growth consulting.' },
  { year: '2025', title: 'Product Launches & Scaling', desc: 'Launched Site Audit Pilot on Chrome Web Store and free SEO tools.' },
  { year: '2026', title: 'Building What\'s Next', desc: 'Focused on high-ticket consulting, agency growth, and SaaS product expansion.' },
]

const SKILLS = [
  { name: 'WordPress & Elementor', level: 98 },
  { name: 'Website Design & UI/UX', level: 95 },
  { name: 'On-Page & Technical SEO', level: 96 },
  { name: 'Local SEO & Google Business Profile', level: 97 },
  { name: 'Web Analytics & Tracking', level: 93 },
  { name: 'Conversion Rate Optimization', level: 91 },
  { name: 'Landing Page Design', level: 95 },
  { name: 'Lead Generation Strategy', level: 90 },
  { name: 'Chrome Extension Development', level: 88 },
  { name: 'Server-Side Tracking & Pixels', level: 89 },
]

const PHILOSOPHY_POINTS = [
  { icon: '💡', title: 'Think Like a Business Owner', desc: 'I approach every project as if it were my own business at stake.' },
  { icon: '📊', title: 'Measure Everything', desc: 'If it can\'t be measured, it can\'t be improved. Data is the foundation.' },
  { icon: '🔄', title: 'Iterate & Compound', desc: 'Growth is not a one-time event. It\'s a compounding system of improvements.' },
  { icon: '🎯', title: 'Simplify Complexity', desc: 'The best digital strategies are simple to understand, powerful to execute.' },
]

const css = `
.about-hero{padding:160px 0 100px;position:relative;overflow:hidden}
.about-hero-mesh{position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 30% 40%,rgba(37,99,235,0.12),transparent 60%),radial-gradient(ellipse 50% 50% at 80% 60%,rgba(34,211,238,0.05),transparent 60%);pointer-events:none}
[data-theme="light"] .about-hero-mesh{background:radial-gradient(ellipse 70% 50% at 30% 40%,rgba(37,99,235,0.05),transparent 60%)}
.about-hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(59,130,246,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.02) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 60% 60% at 50% 50%,black,transparent);-webkit-mask-image:radial-gradient(ellipse 60% 60% at 50% 50%,black,transparent);pointer-events:none}
.about-hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.about-hero-text .sec-label{margin-bottom:18px}
.about-hero-text h1{font-family:var(--font-heading);font-size:clamp(2rem,4.5vw,3.2rem);font-weight:700;line-height:1.14;letter-spacing:-.6px;margin-bottom:20px}
.about-hero-text .lead{font-size:1.08rem;color:var(--text-secondary);line-height:1.85;margin-bottom:28px}
.about-hero-text .lead strong{color:var(--text-primary);font-weight:700}
.about-quick-stats{display:flex;gap:28px;flex-wrap:wrap}
.aqs{text-align:left}
.aqs-num{font-family:var(--font-heading);font-size:1.7rem;font-weight:800;color:var(--brand-500);line-height:1.2}
.aqs-label{font-size:.68rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1.2px;font-weight:600}
.about-hero-visual{position:relative;display:flex;justify-content:center}
.about-img-wrap{position:relative;width:100%;max-width:380px}
.about-img-frame{aspect-ratio:1/1;border-radius:30px;overflow:hidden;border:1px solid rgba(59,130,246,0.14);background:linear-gradient(145deg,rgba(37,99,235,0.07),rgba(30,64,175,0.035));padding:8px;box-shadow:0 30px 80px rgba(0,0,0,0.45),0 0 60px rgba(37,99,235,0.08)}
[data-theme="light"] .about-img-frame{box-shadow:0 20px 50px rgba(0,0,0,0.08)}
.about-img-frame img{width:100%;aspect-ratio:1/1;height:auto;display:block;object-fit:cover;object-position:center top;border-radius:22px}
.about-img-glow{position:absolute;inset:-25%;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,0.12),transparent 60%);z-index:-1;animation:gp2 4s ease-in-out infinite alternate}
@keyframes gp2{0%{opacity:.5;transform:scale(.95)}100%{opacity:.9;transform:scale(1.05)}}
.about-float{position:absolute;padding:10px 16px;background:rgba(10,10,24,0.8);backdrop-filter:blur(16px);border:1px solid rgba(59,130,246,0.12);border-radius:var(--r-md);font-size:.76rem;font-weight:600;z-index:5;white-space:nowrap;box-shadow:0 8px 28px rgba(0,0,0,0.4)}
[data-theme="light"] .about-float{background:rgba(255,255,255,0.85);box-shadow:0 8px 24px rgba(0,0,0,0.06)}
.af1{bottom:12%;right:-8%;color:var(--accent-cyan);animation:aff 5s ease-in-out infinite}
.af2{top:10%;left:-6%;color:var(--accent-gold);animation:aff 5s ease-in-out infinite 1.5s}
.af3{top:55%;right:-12%;color:var(--brand-500);animation:aff 5s ease-in-out infinite 3s}
@keyframes aff{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}

.story-section{padding:110px 0;background:var(--bg-secondary)}
.story-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start}
.story-content h2{font-family:var(--font-heading);font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;letter-spacing:-.4px;margin-bottom:20px;line-height:1.2}
.story-content p{font-size:.94rem;color:var(--text-secondary);line-height:1.85;margin-bottom:16px}
.story-content p strong{color:var(--text-primary);font-weight:600}
.story-highlight{padding:24px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-md);border-left:3px solid var(--brand-500);margin:24px 0}
.story-highlight p{margin:0;font-size:.92rem;color:var(--text-primary);font-style:italic;line-height:1.8}

.values-section{padding:110px 0;background:var(--bg-primary)}
.values-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.value-card{padding:32px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-md);transition:all .5s;position:relative;overflow:hidden}
.value-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--gradient-brand);transform:scaleX(0);transform-origin:left;transition:transform .5s}
.value-card:hover::before{transform:scaleX(1)}
.value-card:hover{border-color:var(--border-hover);transform:translateY(-8px);box-shadow:var(--shadow-card)}
.value-icon{width:48px;height:48px;border-radius:14px;background:rgba(37,99,235,0.08);border:1px solid rgba(59,130,246,0.1);display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:18px;transition:all .4s}
.value-card:hover .value-icon{background:var(--gradient-brand);border-color:transparent;transform:scale(1.08) rotate(-3deg);box-shadow:0 8px 24px rgba(37,99,235,0.3)}
.value-card h3{font-family:var(--font-heading);font-size:1.05rem;font-weight:700;margin-bottom:8px;transition:color .3s}
.value-card:hover h3{color:var(--brand-500)}
.value-card p{font-size:.86rem;color:var(--text-secondary);line-height:1.7}

.timeline-section{padding:110px 0;background:var(--bg-secondary)}
.timeline{max-width:720px;margin:0 auto;position:relative;padding-left:40px}
.timeline::before{content:'';position:absolute;left:15px;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,var(--brand-500),rgba(59,130,246,0.1))}
.tl-item{position:relative;margin-bottom:36px;padding-left:28px}
.tl-item::before{content:'';position:absolute;left:-29px;top:6px;width:12px;height:12px;border-radius:50%;background:var(--gradient-brand);box-shadow:0 0 12px var(--glow-brand);z-index:2;transition:transform .3s}
.tl-item:hover::before{transform:scale(1.4)}
.tl-year{font-family:var(--font-mono);font-size:.72rem;color:var(--brand-500);font-weight:600;letter-spacing:1px;margin-bottom:4px}
.tl-item h3{font-family:var(--font-heading);font-size:1.05rem;font-weight:700;margin-bottom:4px}
.tl-item p{font-size:.88rem;color:var(--text-secondary);line-height:1.7}

.skills-section{padding:110px 0;background:var(--bg-primary)}
.skills-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.skill-bar-item{padding:20px 24px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-md);transition:all .4s}
.skill-bar-item:hover{border-color:rgba(59,130,246,0.2);transform:translateX(4px)}
.skill-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.skill-top span:first-child{font-family:var(--font-heading);font-weight:700;font-size:.92rem}
.skill-top span:last-child{font-family:var(--font-mono);font-size:.75rem;color:var(--brand-500);font-weight:600}
.skill-track{height:4px;background:rgba(59,130,246,0.08);border-radius:4px;overflow:hidden}
.skill-fill{height:100%;background:var(--gradient-brand);border-radius:4px;transition:width 1.2s cubic-bezier(.4,0,.2,1);width:0}
.skill-fill.animated{width:var(--w)}

.philosophy-section{padding:110px 0;background:var(--bg-secondary)}
.philosophy-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.philosophy-content h2{font-family:var(--font-heading);font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;letter-spacing:-.4px;margin-bottom:18px;line-height:1.2}
.philosophy-content p{font-size:.94rem;color:var(--text-secondary);line-height:1.85;margin-bottom:14px}
.philosophy-points{display:flex;flex-direction:column;gap:12px}
.phil-point{display:flex;gap:14px;padding:18px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-md);transition:all .4s}
.phil-point:hover{border-color:rgba(34,211,238,0.25);transform:translateX(6px)}
.phil-icon{flex-shrink:0;width:40px;height:40px;border-radius:12px;background:rgba(34,211,238,0.06);border:1px solid rgba(34,211,238,0.1);display:flex;align-items:center;justify-content:center;font-size:1rem;transition:all .4s}
.phil-point:hover .phil-icon{background:rgba(34,211,238,0.15);transform:scale(1.1) rotate(-5deg)}
.phil-point h4{font-family:var(--font-heading);font-size:.9rem;font-weight:700;margin-bottom:2px}
.phil-point p{font-size:.82rem;color:var(--text-secondary);line-height:1.6;margin:0}

.inoviqa-section{padding:110px 0;background:var(--bg-primary);position:relative;overflow:hidden}
.inoviqa-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 50% at 50% 50%,rgba(37,99,235,0.06),transparent 70%)}
.inoviqa-inner{position:relative;z-index:2;text-align:center;max-width:720px;margin:0 auto}
.inoviqa-logo{width:72px;height:72px;margin:0 auto 22px;border-radius:18px;overflow:hidden;box-shadow:0 8px 32px rgba(37,99,235,0.2);transition:transform .4s}
.inoviqa-logo:hover{transform:scale(1.08) rotate(-3deg)}
.inoviqa-logo img{width:100%;height:100%;object-fit:contain}
.inoviqa-inner h2{font-family:var(--font-heading);font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:700;letter-spacing:-.5px;margin-bottom:16px}
.inoviqa-inner>p{font-size:1rem;color:var(--text-secondary);line-height:1.85;margin-bottom:20px}
.inoviqa-pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:36px 0;text-align:center}
.iq-pillar{padding:24px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-md);transition:all .4s}
.iq-pillar:hover{border-color:rgba(59,130,246,0.2);transform:translateY(-4px);box-shadow:0 12px 36px rgba(0,0,0,0.3)}
[data-theme="light"] .iq-pillar:hover{box-shadow:0 12px 36px rgba(0,0,0,0.06)}
.iq-pillar-icon{font-size:1.6rem;margin-bottom:10px}
.iq-pillar h4{font-family:var(--font-heading);font-size:.92rem;font-weight:700;margin-bottom:4px}
.iq-pillar p{font-size:.8rem;color:var(--text-secondary);line-height:1.6}

.cta-section{padding:120px 0;background:var(--bg-secondary);position:relative;overflow:hidden}
.cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 60% at 50% 50%,rgba(37,99,235,0.1),transparent 70%)}
.cta-inner{max-width:720px;margin:0 auto;text-align:center;position:relative;z-index:1}
.cta-inner h2{font-family:var(--font-heading);font-size:clamp(2rem,3.8vw,2.8rem);font-weight:700;letter-spacing:-.5px;margin-bottom:16px}
.cta-inner p{font-size:1.02rem;color:var(--text-secondary);margin-bottom:36px;line-height:1.8}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}

@media(max-width:1080px){
  .about-hero-inner,.story-grid,.philosophy-grid{grid-template-columns:1fr}
  .about-hero-text{text-align:center}
  .about-hero-text .lead{margin:0 auto 28px}
  .about-quick-stats{justify-content:center}
  .about-hero-visual{max-width:340px;margin:40px auto 0}
  .values-grid{grid-template-columns:repeat(2,1fr)}
  .skills-grid{grid-template-columns:1fr}
  .inoviqa-pillars{grid-template-columns:1fr}
}
@media(max-width:768px){
  .about-hero{padding:130px 0 70px}
  .values-grid{grid-template-columns:1fr}
  .about-float{display:none}
}
`

export default function AboutPage() {
  const heroRef = useScrollReveal()
  const storyRef = useScrollReveal()
  const valuesRef = useScrollReveal()
  const tlRef = useScrollReveal()
  const skillsRef = useSkillAnimation()
  const philRef = useScrollReveal()
  const inoviqaRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  return (
    <>
      <style
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: css }}
      />
      <section className="about-hero" ref={heroRef}>
        <div className="about-hero-mesh" /><div className="about-hero-grid" />
        <div className="orb orb-1" /><div className="orb orb-2" />
        <Breadcrumbs items={[{ name: 'About', path: '/about' }]} />
        <div className="container about-hero-inner">
          <div className="about-hero-text">
            <div className="sec-label reveal">About Me</div>
            <h1 className="reveal">Digital Growth Strategist, <span className="text-gradient">Agency Founder</span> & Product Builder</h1>
            <p className="lead reveal">I'm <strong>Walid Hasan</strong> — a digital growth consultant, the founder of <a href="https://inoviqa.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-500)' }}>Inoviqa LLC</a>, and the creator of multiple <Link href="/tools" style={{ color: 'var(--brand-500)' }}>Chrome extensions</Link> used by professionals worldwide. I help businesses build digital systems that generate leads, authority, and revenue — not just websites.</p>
            <div className="about-quick-stats reveal">
              <div className="aqs"><div className="aqs-num">500+</div><div className="aqs-label">Projects</div></div>
              <div className="aqs"><div className="aqs-num">30+</div><div className="aqs-label">Countries</div></div>
              <div className="aqs"><div className="aqs-num">200+</div><div className="aqs-label">Clients</div></div>
              <div className="aqs"><div className="aqs-num">7+</div><div className="aqs-label">Years</div></div>
            </div>
          </div>
          <div className="about-hero-visual reveal-r">
            <div className="about-img-wrap">
              <div className="about-img-glow" />
              <div className="about-img-frame"><img src="/assets/walidhasan-logo.png" alt="Walid Hasan" width="380" height="380" /></div>
              <div className="about-float af1">⚡ Agency Founder</div>
              <div className="about-float af2">★ 500+ Projects</div>
              <div className="about-float af3">🌍 30+ Countries</div>
            </div>
          </div>
        </div>
      </section>

      <section className="story-section" ref={storyRef}>
        <div className="container">
          <div className="story-grid">
            <div className="story-content reveal-l">
              <div className="sec-label">The Story</div>
              <h2>From Curious Developer to <span className="text-gradient">Growth Operator</span></h2>
              <p>I started my journey in 2017 as a self-taught web developer with a passion for building things. What began as creating simple websites quickly evolved into something bigger — I discovered that the <strong>real impact</strong> comes from understanding how businesses grow online.</p>
              <p>Over the years, I've delivered 500+ projects across 30+ countries, learning from every engagement. I've built Chrome extensions, launched an agency (<a href="https://inoviqa.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-500)' }}>Inoviqa LLC</a>), and created free <Link href="/tools" style={{ color: 'var(--brand-500)' }}>SEO tools</Link> used by professionals worldwide.</p>
              <div className="story-highlight"><p>"I don't just build websites. I build digital growth systems that generate leads, authority, and revenue — predictably and measurably."</p></div>
              <p>Today, I focus on <strong>strategic partnerships</strong> with businesses who are serious about growth. Every project I take on is treated as a growth investment, not a one-time delivery. Learn more about my <Link href="/services" style={{ color: 'var(--brand-500)' }}>services</Link>.</p>
            </div>
            <div className="reveal-r">
              <div className="sec-label">My Journey</div>
              <div className="timeline">
                {TIMELINE.map((t) => (
                  <div className="tl-item" key={t.year}><div className="tl-year">{t.year}</div><h3>{t.title}</h3><p>{t.desc}</p></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section" ref={valuesRef}>
        <div className="container">
          <div className="sec-header center">
            <div className="sec-label reveal">Core Values</div>
            <h2 className="sec-title reveal">Principles That Drive <span className="text-gradient">Every Project</span></h2>
            <p className="sec-desc reveal">These aren't corporate buzzwords. These are the non-negotiable principles behind every decision, design, and strategy.</p>
          </div>
          <div className="values-grid stagger">
            {VALUES.map((v) => (
              <div className="value-card reveal" key={v.title}><div className="value-icon">{v.icon}</div><h3>{v.title}</h3><p>{v.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section" ref={skillsRef}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="sec-label">Technical Expertise</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3.4vw,2.5rem)', fontWeight: 700, letterSpacing: '-.5px', marginBottom: 14 }}>Skills & <span className="text-gradient">Proficiency</span></h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>Years of hands-on experience across the full digital growth stack.</p>
          </div>
          <div className="skills-grid">
            {SKILLS.map((s) => (
              <div className="skill-bar-item" key={s.name}>
                <div className="skill-top"><span>{s.name}</span><span>{s.level}%</span></div>
                <div className="skill-track"><div className="skill-fill" style={{ '--w': s.level + '%' } as React.CSSProperties} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="philosophy-section" ref={philRef}>
        <div className="container">
          <div className="philosophy-grid">
            <div className="philosophy-content reveal-l">
              <div className="sec-label">Work Philosophy</div>
              <h2>How I Think About <span className="text-gradient">Digital Growth</span></h2>
              <p>Most freelancers deliver tasks. I deliver <strong>outcomes</strong>. The difference is in the thinking — every line of code, every design choice, and every SEO recommendation is connected to a business goal.</p>
              <p>I've worked with enough businesses to know that success online isn't about having the fanciest website. It's about having a <strong>system</strong> that attracts, converts, and retains customers predictably.</p>
            </div>
            <div className="philosophy-points reveal-r">
              {PHILOSOPHY_POINTS.map((p) => (
                <div className="phil-point" key={p.title}><div className="phil-icon">{p.icon}</div><div><h4>{p.title}</h4><p>{p.desc}</p></div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="inoviqa-section" ref={inoviqaRef}>
        <div className="container">
          <div className="inoviqa-inner">
            <div className="inoviqa-logo reveal"><img src="/assets/walidhasan-logo.png" alt="Inoviqa LLC Logo" width="72" height="72" /></div>
            <div className="sec-label reveal">The Agency</div>
            <h2 className="reveal">Inoviqa LLC — <span className="text-gradient">Built for Growth</span></h2>
            <p className="reveal">Inoviqa LLC is the formalization of everything I believe about digital growth. A registered agency built on strategy, international quality standards, and measurable outcomes.</p>
            <div className="inoviqa-pillars reveal">
              <div className="iq-pillar"><div className="iq-pillar-icon">🎯</div><h4>Strategy First</h4><p>Every engagement starts with business goals, market analysis, and a custom growth roadmap.</p></div>
              <div className="iq-pillar"><div className="iq-pillar-icon">🌍</div><h4>Global Standards</h4><p>Enterprise-grade quality and professional communication for clients worldwide.</p></div>
              <div className="iq-pillar"><div className="iq-pillar-icon">📈</div><h4>Growth Systems</h4><p>Not one-time projects — compounding digital systems that keep generating results.</p></div>
            </div>
            <a href="https://inoviqa.com/" target="_blank" rel="noopener noreferrer" className="btn btn-brand reveal">Visit Inoviqa LLC <span className="arrow">→</span></a>
          </div>
        </div>
      </section>

      <section className="cta-section" ref={ctaRef}>
        <div className="container">
          <div className="cta-inner">
            <div className="sec-label reveal">Let's Work Together</div>
            <h2 className="reveal">Ready to Partner With <span className="text-gradient">a Growth Operator?</span></h2>
            <p className="reveal">Whether you need a strategic website, SEO system, or full digital growth consulting — I'm here to help you build something that generates real, measurable results.</p>
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
