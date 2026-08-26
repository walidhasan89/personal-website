'use client'

import Link from 'next/link'
import { useState } from 'react'

const painPoints = [
    'Your Google Business Profile is not ranking well in nearby cities.',
    'Your website gets visitors but not enough quote requests.',
    'Competitors with weaker work are showing above you on Google Maps.',
    'You do not have dedicated city or service pages for epoxy flooring keywords.',
    'You are not tracking calls, forms, clicks, and real lead sources properly.',
]

const services = [
    {
        icon: '📍',
        title: 'Google Maps & GBP Optimization',
        desc: 'Improve your Google Business Profile with better categories, services, descriptions, photos, review strategy, and local relevance.',
    },
    {
        icon: '🏙️',
        title: 'City & Service Landing Pages',
        desc: 'Create SEO-optimized landing pages for garage floor coating, commercial epoxy flooring, concrete coating, and target cities.',
    },
    {
        icon: '🧱',
        title: 'Conversion-Focused Website Design',
        desc: 'Build or redesign your website so visitors trust you faster and request estimates from mobile, desktop, and Google Maps traffic.',
    },
    {
        icon: '📈',
        title: 'Local SEO Growth System',
        desc: 'Optimize your website structure, internal links, on-page SEO, technical SEO, and local keyword targeting for long-term ranking growth.',
    },
    {
        icon: '🎯',
        title: 'Lead Tracking Setup',
        desc: 'Set up GA4, Google Tag Manager, Microsoft Clarity, form tracking, call clicks, quote button tracking, and conversion events.',
    },
    {
        icon: '⚡',
        title: 'CRO & Quote Flow Improvement',
        desc: 'Improve CTAs, quote forms, trust sections, project galleries, service pages, and mobile experience to increase lead conversion.',
    },
]

const audienceSegments = [
    {
        icon: '🏠',
        title: 'Garage Floor Coating Contractors',
        desc: 'For contractors who want more garage epoxy flooring, polyaspartic floor coating, and residential concrete coating quote requests.',
    },
    {
        icon: '🏢',
        title: 'Commercial Epoxy Flooring Companies',
        desc: 'For businesses targeting warehouses, shops, showrooms, kitchens, retail spaces, and commercial concrete floor coating projects.',
    },
    {
        icon: '🛠️',
        title: 'Concrete Coating Specialists',
        desc: 'For contractors offering epoxy coatings, flake floors, metallic epoxy, basement floor coatings, floor repair, and resurfacing services.',
    },
]

const landingPageTargets = [
    'Garage Epoxy Flooring',
    'Garage Floor Coating',
    'Concrete Coatings',
    'Polyaspartic Floor Coating',
    'Commercial Epoxy Flooring',
    'Industrial Epoxy Flooring',
    'Metallic Epoxy Flooring',
    'Basement Epoxy Flooring',
    'Epoxy Floor Repair',
    'Epoxy Flooring Cost',
    'Residential Epoxy Flooring',
    'Warehouse Floor Coatings',
]

const localSeoAssets = [
    {
        title: 'Service Pages',
        desc: 'Pages targeting garage floor coating, commercial epoxy flooring, concrete coatings, metallic epoxy, and polyaspartic flooring keywords.',
    },
    {
        title: 'City Landing Pages',
        desc: 'Location pages built for searches like epoxy flooring in Dallas, garage floor coating in Tampa, and concrete coatings near me.',
    },
    {
        title: 'Google Maps Signals',
        desc: 'GBP services, categories, reviews, photos, posts, local relevance, website links, and quote-focused conversion paths.',
    },
    {
        title: 'Lead Tracking',
        desc: 'GA4, GTM, call clicks, quote form submissions, thank-you pages, Microsoft Clarity, and conversion events.',
    },
]

const trackingMetrics = [
    'Google Maps visibility',
    'Phone call clicks',
    'Quote form submissions',
    'GBP website visits',
    'Service page rankings',
    'City page rankings',
    'Organic traffic growth',
    'Real lead source tracking',
]

const packages = [
    {
        name: 'Epoxy Lead Audit',
        price: '$299',
        label: 'Best starting point',
        desc: 'For contractors who want to know what is stopping their website and Google Maps profile from generating more leads.',
        features: [
            'Website conversion review',
            'Google Business Profile review',
            'Local SEO opportunity check',
            'Competitor snapshot',
            'Tracking and lead flow review',
            'Priority action roadmap',
        ],
    },
    {
        name: 'Local SEO Growth',
        price: '$499',
        period: '/month',
        label: 'For Google Maps growth',
        desc: 'For epoxy contractors who want better visibility in their city, service area, and nearby locations.',
        featured: true,
        features: [
            'GBP optimization',
            'Local keyword research',
            'On-page SEO for key pages',
            'Service area optimization',
            'Search Console monitoring',
            'Monthly SEO report',
            'City/service pages available at $100/page',
        ],
    },
    {
        name: 'Website + SEO System',
        price: '$1,499',
        label: 'For serious lead growth',
        desc: 'For contractors who need a stronger website foundation plus local SEO structure built to convert visitors into quote requests.',
        features: [
            'Conversion-focused website design',
            'SEO-friendly page structure',
            'Core service page setup',
            'Quote-focused CTA strategy',
            'Basic tracking setup',
            'Speed and mobile optimization',
            'Launch support',
        ],
    },
]

const process = [
    {
        step: '01',
        title: 'Audit',
        desc: 'I review your website, Google Business Profile, competitors, search visibility, and lead conversion flow.',
    },
    {
        step: '02',
        title: 'Strategy',
        desc: 'I map the right services, cities, pages, keywords, CTAs, tracking events, and priority fixes.',
    },
    {
        step: '03',
        title: 'Build & Optimize',
        desc: 'I improve your website, landing pages, GBP, tracking, local SEO structure, and conversion flow.',
    },
    {
        step: '04',
        title: 'Track & Grow',
        desc: 'We monitor rankings, calls, forms, quote requests, traffic, and opportunities for ongoing growth.',
    },
]

const faqs = [
    {
        q: 'How do epoxy flooring contractors get more leads from Google?',
        a: 'Epoxy flooring contractors can get more leads from Google by improving Google Business Profile visibility, optimizing service pages, creating city-based landing pages, collecting reviews, improving website conversion, and tracking phone calls and quote form submissions.',
    },
    {
        q: 'Do epoxy flooring contractors need Local SEO?',
        a: 'Yes. Local SEO is one of the best marketing channels for epoxy flooring contractors because most customers search locally for garage floor coating, epoxy flooring near me, concrete coating, and city-based service keywords.',
    },
    {
        q: 'How long does Local SEO take for epoxy flooring companies?',
        a: 'Most epoxy flooring companies should expect at least 3 months before seeing meaningful movement. Competitive cities may take 3–6 months or longer depending on website quality, Google Business Profile strength, reviews, content, and competitors.',
    },
    {
        q: 'Do I need a website if I already have a Google Business Profile?',
        a: 'Yes. Google Business Profile can generate visibility, but a strong website helps convert visitors into quote requests, supports organic rankings, builds trust, and gives Google more service and location relevance.',
    },
    {
        q: 'What pages should an epoxy flooring contractor website have?',
        a: 'A strong epoxy flooring website should include a homepage, service pages, gallery or project pages, reviews, contact or quote page, and city/service-area landing pages if the business targets multiple locations.',
    },
    {
        q: 'Are city landing pages important for epoxy flooring SEO?',
        a: 'Yes. If you want to rank for keywords like epoxy flooring in Dallas or garage floor coating in Austin, dedicated city or service-area landing pages can help target those searches more effectively.',
    },
    {
        q: 'Can Google Maps help epoxy flooring contractors get more calls?',
        a: 'Yes. Better Google Maps visibility can increase calls, direction requests, website visits, and quote requests. The key is optimizing the Google Business Profile, improving reviews, adding services, and building strong local relevance.',
    },
    {
        q: 'Should epoxy flooring contractors run Google Ads or SEO first?',
        a: 'Both can work. Google Ads can bring faster leads, while SEO builds long-term visibility. A good strategy is to improve the website and tracking first, then use SEO for long-term growth and ads when faster lead flow is needed.',
    },
    {
        q: 'How can I track epoxy flooring leads from my website?',
        a: 'You can track leads with GA4, Google Tag Manager, phone click tracking, quote form tracking, thank-you pages, Microsoft Clarity, and conversion events. This helps identify which pages and traffic sources generate real leads.',
    },
    {
        q: 'What makes an epoxy flooring website convert better?',
        a: 'A high-converting epoxy flooring website needs clear service messaging, strong project photos, trust signals, reviews, simple quote forms, visible phone buttons, fast loading speed, mobile-friendly design, and local SEO structure.',
    },
]

export default function EpoxyFlooringMarketingPage() {
    const [activeFaq, setActiveFaq] = useState<number | null>(0)

    return (
        <div className="niche-page">
            <section className="niche-hero">
                <div className="niche-hero-grid" />
                <div className="niche-orb niche-orb-one" />
                <div className="niche-orb niche-orb-two" />

                <div className="container niche-hero-inner">
                    <div className="niche-hero-content">
                        <div className="niche-kicker">
                            <span className="niche-kicker-dot" />
                            For Epoxy Flooring Contractors
                        </div>

                        <h1>
                            Get More Epoxy Flooring Leads from{' '}
                            <span className="text-gradient">Google Maps & Local SEO</span>
                        </h1>

                        <p>
                            I help epoxy flooring contractors generate more quote requests with
                            Google Business Profile optimization, <a href="/services">Local SEO</a>, city landing pages,
                            tracking, and conversion-focused website design.
                        </p>

                        <div className="niche-hero-actions">
                            <Link href="/book" className="btn btn-brand">
                                Book Free Epoxy Lead Audit <span className="arrow">→</span>
                            </Link>
                            <Link href="/pricing" className="btn btn-ghost">
                                View Pricing
                            </Link>
                        </div>
                    </div>

                    <div className="niche-hero-card" aria-hidden="true">
                        <div className="niche-card-glow" />

                        <div className="niche-map-card">
                            <span>Google Maps Visibility</span>
                            <strong>Epoxy Flooring Leads</strong>
                            <div className="niche-map-pins">
                                <i />
                                <i />
                                <i />
                            </div>
                        </div>

                        <div className="niche-mini-row">
                            <span>Google Business Profile</span>
                            <strong>Optimized</strong>
                        </div>
                        <div className="niche-mini-row">
                            <span>City Landing Pages</span>
                            <strong>$100/page</strong>
                        </div>
                        <div className="niche-mini-row">
                            <span>Lead Tracking</span>
                            <strong>GA4 + GTM</strong>
                        </div>

                        <div className="niche-mini-note">
                            Built for garage floor coating, commercial epoxy flooring, concrete
                            coatings, and local contractor lead generation.
                        </div>
                    </div>
                </div>
            </section>

            <section className="niche-section">
                <div className="container">
                    <div className="pricing-section-header center">
                        <div className="sec-label">The Problem</div>
                        <h2 className="sec-title">
                            Great Contractors Still Lose
                            <br className="niche-title-break" />
                            <span className="text-gradient">Local Leads</span>
                        </h2>
                        <p className="sec-desc">
                            Many epoxy flooring contractors have strong work and good reviews,
                            but their website and Google Maps presence are not built to capture demand.
                        </p>
                    </div>

                    <div className="niche-problem-grid">
                        {painPoints.map((point, index) => (
                            <article className="niche-problem-card" key={point}>
                                <span>{String(index + 1).padStart(2, '0')}</span>
                                <p>{point}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="niche-section niche-fit-section">
                <div className="container">
                    <div className="pricing-section-header center">
                        <div className="sec-label">Who This Is For</div>
                        <h2 className="sec-title">
                            Built for Contractors Selling
                            <br className="niche-title-break" />
                            <span className="text-gradient">High-Value Floor Coating Jobs</span>
                        </h2>
                        <p className="sec-desc">
                            This is for epoxy flooring contractors who want more garage floor coating leads,
                            commercial epoxy flooring projects, concrete coating jobs, and quote requests
                            from local homeowners and businesses.
                        </p>
                    </div>

                    <div className="niche-fit-grid">
                        {audienceSegments.map((item) => (
                            <article className="niche-fit-card" key={item.title}>
                                <div className="niche-service-icon">{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="niche-section niche-services-section">
                <div className="container">
                    <div className="pricing-section-header center">
                        <div className="sec-label">Growth System</div>
                        <h2 className="sec-title">
                            Marketing Built for
                            <br className="niche-title-break" />
                            <span className="text-gradient">Epoxy Flooring Leads</span>
                        </h2>
                        <p className="sec-desc">
                            A focused system combining Google Maps, website design, service pages,
                            city pages, tracking, and conversion optimization.
                        </p>
                    </div>

                    <div className="niche-service-grid">
                        {services.map((service) => (
                            <article className="niche-service-card" key={service.title}>
                                <div className="niche-service-icon">{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="niche-section">
                <div className="container">
                    <div className="pricing-section-header center">
                        <div className="sec-label">Landing Page Strategy</div>
                        <h2 className="sec-title">
                            SEO Pages That Target
                            <br className="niche-title-break" />
                            <span className="text-gradient">Buyer-Intent Keywords</span>
                        </h2>
                        <p className="sec-desc">
                            I build service and city pages around the keywords epoxy flooring customers
                            actually search before requesting an estimate.
                        </p>
                    </div>

                    <div className="niche-keyword-strip">
                        {landingPageTargets.map((keyword) => (
                            <span key={keyword}>{keyword}</span>
                        ))}
                    </div>

                    <div className="niche-page-build-grid">
                        {localSeoAssets.map((item, index) => (
                            <article className="niche-page-build-card" key={item.title}>
                                <span>{String(index + 1).padStart(2, '0')}</span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="niche-section niche-tracking-section">
                <div className="container">
                    <div className="niche-tracking-card">
                        <div>
                            <div className="sec-label">Tracking & Proof</div>
                            <h2 className="sec-title">
                                Know Which Pages, Keywords, and Traffic Sources Generate{' '}
                                <span className="text-gradient">Real Leads</span>
                            </h2>
                            <p className="sec-desc">
                                A flooring contractor website should not only look good. It should show
                                where calls, quote requests, and booked opportunities are coming from.
                            </p>
                        </div>

                        <div className="niche-tracking-list">
                            {trackingMetrics.map((metric) => (
                                <div className="niche-tracking-item" key={metric}>
                                    <span>✓</span>
                                    <p>{metric}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="niche-section">
                <div className="container">
                    <div className="pricing-section-header center">
                        <div className="sec-label">Niche Packages</div>
                        <h2 className="sec-title">
                            Epoxy Flooring
                            <br className="niche-title-break" />
                            <span className="text-gradient">Lead Growth Pricing</span>
                        </h2>
                        <p className="sec-desc">
                            Simple starting prices for contractors who want more calls, quote
                            requests, and local visibility.
                        </p>
                    </div>

                    <div className="pricing-grid">
                        {packages.map((pkg) => (
                            <article
                                className={`pricing-card ${pkg.featured ? 'featured' : ''}`}
                                key={pkg.name}
                            >
                                {pkg.featured && <div className="pricing-popular">Recommended</div>}

                                <div className="pricing-card-top">
                                    <span>{pkg.label}</span>
                                    <h3>{pkg.name}</h3>
                                    <p>{pkg.desc}</p>
                                </div>

                                <div className="pricing-price">
                                    <span>Starting from</span>
                                    <strong>
                                        {pkg.price}
                                        {'period' in pkg && pkg.period ? <small>{pkg.period}</small> : null}
                                    </strong>
                                </div>

                                <ul className="pricing-features">
                                    {pkg.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>

                                <Link href="/book" className={pkg.featured ? 'btn btn-brand' : 'btn btn-ghost'}>
                                    Get Started <span className="arrow">→</span>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="niche-section niche-process-section">
                <div className="container">
                    <div className="pricing-section-header center">
                        <div className="sec-label">Process</div>
                        <h2 className="sec-title">
                            How I Help You Get
                            <br className="niche-title-break" />
                            <span className="text-gradient">More Local Leads</span>
                        </h2>
                    </div>

                    <div className="niche-process-grid">
                        {process.map((item) => (
                            <article className="niche-process-card" key={item.step}>
                                <span>{item.step}</span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="niche-cta-section">
                <div className="container">
                    <div className="niche-cta-card">
                        <div>
                            <span>Ready to grow locally?</span>
                            <h2>
                                Find Out Why Your Epoxy Flooring Website Is Not Getting Enough Leads
                            </h2>
                            <p>
                                I’ll review your website, Google Maps visibility, service pages,
                                and lead tracking opportunities.
                            </p>
                        </div>

                        <Link href="/book" className="btn btn-brand">
                            Book Free Epoxy Lead Audit <span className="arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="niche-faq-section">
                <div className="container">
                    <div className="pricing-section-header center">
                        <div className="sec-label">FAQ</div>
                        <h2 className="sec-title">
                            Epoxy Flooring
                            <br className="niche-title-break" />
                            <span className="text-gradient">Marketing Questions</span>
                        </h2>
                        <p className="sec-desc">
                            Answers to the most important questions epoxy flooring contractors ask
                            before investing in <a href="/services">Local SEO</a>, Google Maps, website design, and lead tracking.
                        </p>
                    </div>

                    <div className="niche-faq-layout">
                        <div className="niche-faq-visual">
                            <div className="niche-faq-visual-glow" />

                            <div className="niche-faq-big-icon" aria-hidden="true">
                                ❓
                            </div>

                            <span>Contractor FAQ</span>

                            <h3>Questions epoxy flooring contractors ask before investing in SEO.</h3>

                            <p>
                                Learn how Google Maps, city landing pages, Local SEO, website conversion,
                                and lead tracking work together to generate more quote requests.
                            </p>

                            <div className="niche-faq-mini-stats">
                                <div>
                                    <strong>10</strong>
                                    <small>Important questions</small>
                                </div>
                                <div>
                                    <strong>3–6</strong>
                                    <small>Months typical SEO timeline</small>
                                </div>
                            </div>
                        </div>

                        <div className="niche-faq-content">
                            <div className="niche-faq-accordion">
                                {faqs.map((faq, index) => {
                                    const isOpen = activeFaq === index

                                    return (
                                        <div
                                            className={`niche-faq-item ${isOpen ? 'active' : ''}`}
                                            key={faq.q}
                                        >
                                            <button
                                                type="button"
                                                className="niche-faq-question"
                                                onClick={() => setActiveFaq(isOpen ? null : index)}
                                                aria-expanded={isOpen}
                                            >
                                                <span className="niche-faq-number">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>

                                                <span>{faq.q}</span>

                                                <span className="niche-faq-chevron">⌄</span>
                                            </button>

                                            <div className="niche-faq-answer">
                                                <p>{faq.a}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}