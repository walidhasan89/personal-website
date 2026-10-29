'use client'

import { useState } from 'react'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

const websitePackages = [
    {
        name: 'Starter Website',
        price: '$699',
        label: 'Best for simple service websites',
        description:
            'Perfect for personal brands, consultants, and small businesses that need a clean premium web presence.',
        features: [
            'Up to 3 pages',
            'Premium responsive design',
            'Homepage strategy',
            'Contact form setup',
            'Basic on-page SEO',
            'Mobile optimization',
            'Speed optimization',
            'Basic analytics setup',
            '30-Day Free Maintenance',
        ],
        highlight: false,
    },
    {
        name: 'Business Website',
        price: '$1,499',
        label: 'Most Popular',
        description:
            'A conversion-focused business website designed to build trust, explain services, and generate qualified leads.',
        features: [
            'Up to 6 pages',
            'Homepage, About, Services, Contact',
            'Conversion-focused layout',
            'Premium UI design',
            'SEO-friendly structure',
            'Contact forms',
            'Google Analytics / GTM setup',
            'Speed optimization',
            'Launch support',
            '45-Day Free Maintenance',
        ],
        highlight: true,
    },
    {
        name: 'Growth Website',
        price: '$2,499',
        label: 'Best for growth-focused brands',
        description:
            'A complete website system with stronger SEO foundation, conversion strategy, and lead generation flow.',
        features: [
            'Up to 12 pages',
            'Full website strategy',
            'Premium custom design',
            'Service page structure',
            'Conversion optimization',
            'SEO foundation',
            'Schema markup',
            'Analytics & tracking setup',
            'Lead generation flow',
            'Speed optimization',
            'Launch support',
            '60-Day Free Maintenance',
        ],
        highlight: false,
    },
]

const localSeoPackages = [
    {
        name: 'Local Starter',
        price: '$499',
        period: '/month',
        label: 'For small local businesses',
        bestFor: 'Best for one-location businesses targeting one main city or service area.',
        timeline: 'Recommended timeline: 3 months minimum',
        scope: 'Covers 1 GBP location and up to 5 service pages',
        note:
            'City/service landing pages are not included by default. Add SEO landing pages for $100/page if needed.',
        features: [
            'Google Business Profile optimization',
            'Local keyword research',
            'Homepage or main service page SEO',
            'Basic on-page SEO improvements',
            'Basic citation cleanup guidance',
            'Google Search Console monitoring',
            'Monthly SEO performance report',
        ],
    },
    {
        name: 'Local Growth',
        price: '$799',
        period: '/month',
        label: 'For stronger local ranking',
        bestFor:
            'Best for local businesses targeting multiple services or nearby city/service keywords.',
        timeline: 'Recommended timeline: 3–6 months',
        scope: 'Covers 1–2 GBP locations and up to 10 service pages',
        note:
            'New city/service landing pages can be added for $100/page for active SEO clients.',
        featured: true,
        features: [
            'Everything in Local Starter',
            'Google Business Profile post strategy',
            'Service area optimization',
            'Local landing page optimization',
            'Review strategy recommendations',
            'Competitor analysis',
            'Technical SEO fixes',
            'Internal linking improvements',
            'Monthly growth report',
        ],
    },
    {
        name: 'Local Authority',
        price: '$1,200',
        period: '/month',
        label: 'For competitive local markets',
        bestFor:
            'Best for competitive local niches, multi-service businesses, or stronger city-based visibility.',
        timeline: 'Recommended timeline: 6 months+',
        scope: 'Covers 2–3 GBP locations and up to 15 service pages',
        note:
            'Multi-location businesses, large city campaigns, or aggressive local SEO campaigns may require a custom quote.',
        features: [
            'Everything in Local Growth',
            'Advanced local SEO strategy',
            'Multiple city/service targeting',
            'Local content planning',
            'Advanced internal linking optimization',
            'Ongoing technical SEO improvements',
            'Conversion improvement suggestions',
            'Priority support',
        ],
    },
]


const localSeoFaqs = [
    {
        q: 'How long does Local SEO take to show results?',
        a: 'Local SEO usually needs at least 3 months to show meaningful movement. Some Google Business Profile improvements can happen earlier, but stronger city/service rankings normally take 3–6 months depending on competition.',
    },
    {
        q: 'Is Local SEO an ongoing monthly service?',
        a: 'Yes. Local SEO works best as an ongoing monthly service because rankings depend on optimization, reviews, content, competitors, technical health, and Google updates.',
    },
    {
        q: 'Do you optimize Google Business Profile?',
        a: 'Yes. Local SEO packages include Google Business Profile optimization, service/category improvements, business information review, local keyword targeting, and growth recommendations.',
    },
    {
        q: 'Do I need city-based landing pages?',
        a: 'If you want to rank for city + service keywords, dedicated city or service-area landing pages are often needed. If your website does not have them, I can create SEO-optimized pages for active Local SEO clients at $100/page.',
    },
    {
        q: 'Are city landing pages included in the monthly SEO package?',
        a: 'No. City or service-area landing pages are not included by default because every business needs a different number of pages. They are available as add-ons at a discounted SEO-client rate.',
    },
    {
        q: 'Can you help with multiple locations?',
        a: 'Yes. Multi-location SEO is possible, but it usually requires a stronger strategy, location-specific pages, GBP optimization for each location, and custom pricing depending on scope.',
    },
    {
        q: 'Do you guarantee first-page rankings?',
        a: 'No ethical SEO expert can guarantee exact rankings. I focus on best-practice optimization, technical improvements, content structure, local relevance, and measurable growth.',
    },
    {
        q: 'What affects Local SEO pricing?',
        a: 'Pricing depends on your website condition, target city, competition level, number of services, number of locations, content needs, and whether new landing pages are required.',
    },
]

export default function PricingClient() {
    const [activeFaq, setActiveFaq] = useState<number | null>(0)

    return (
        <div className="pricing-page">
            <section className="pricing-hero">
                <div className="pricing-hero-grid" />
                <div className="pricing-orb pricing-orb-one" />
                <div className="pricing-orb pricing-orb-two" />
                <Breadcrumbs items={[{ name: 'Pricing', path: '/pricing' }]} />

                <div className="container pricing-hero-inner">
                    <div className="pricing-hero-content">
                        <div className="pricing-kicker">
                            <span className="pricing-kicker-dot" />
                            Starting prices
                        </div>

                        <h1>
                            Website and SEO pricing,{' '}
                            <span className="text-gradient">software quoted separately</span>
                        </h1>

                        <p>
                            Published starting prices for website builds and local SEO, including
                            Google Business Profile. Custom software does not have a package price.
                        </p>

                        <div className="pricing-hero-actions">
                            <Link href="/book" className="btn btn-brand">
                                Book Free Consultation <span className="arrow">→</span>
                            </Link>
                            <Link href="/contact" className="btn btn-ghost">
                                Request Custom Quote
                            </Link>
                        </div>
                    </div>

                    <div className="pricing-hero-card" aria-hidden="true">
                        <div className="pricing-card-glow" />
                        <div className="pricing-mini-header">
                            <span>Pricing Snapshot</span>
                            <strong>Starting From</strong>
                        </div>

                        <div className="pricing-mini-row">
                            <span>Website Design</span>
                            <strong>$699</strong>
                        </div>
                        <div className="pricing-mini-row">
                            <span>Local SEO</span>
                            <strong>$499/mo</strong>
                        </div>
                        <div className="pricing-mini-row">
                            <span>Software</span>
                            <strong>Custom quote</strong>
                        </div>

                        <div className="pricing-mini-note">
                            Website and SEO figures are starting prices. Software is scoped per project.
                        </div>
                    </div>
                </div>
            </section>

            <section className="pricing-section">
                <div className="container">
                    <div className="pricing-section-header center">
                        <div className="sec-label">Website Design</div>
                        <h2 className="sec-title">
                            Website Design <span className="text-gradient">Packages</span>
                        </h2>
                        <p className="sec-desc">
                            Premium responsive websites built to look professional, load fast,
                            support SEO, and convert visitors into leads.
                        </p>
                    </div>

                    <div className="pricing-grid">
                        {websitePackages.map((pkg) => (
                            <article
                                className={`pricing-card ${pkg.highlight ? 'featured' : ''}`}
                                key={pkg.name}
                            >
                                {pkg.highlight && <div className="pricing-popular">Most Popular</div>}

                                <div className="pricing-card-top">
                                    <span>{pkg.label}</span>
                                    <h3>{pkg.name}</h3>
                                    <p>{pkg.description}</p>
                                </div>

                                <div className="pricing-price">
                                    <span>Starting from</span>
                                    <strong>{pkg.price}</strong>
                                </div>

                                <ul className="pricing-features">
                                    {pkg.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>

                                <Link href="/book" className={pkg.highlight ? 'btn btn-brand' : 'btn btn-ghost'}>
                                    Get Started <span className="arrow">→</span>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pricing-note-section">
                <div className="container">
                    <div className="pricing-note-card">
                        <div>
                            <span>Software Development</span>
                            <h2>Custom tools are quoted per project.</h2>
                            <p>
                                Browser extensions and workflow tools, such as RFQ AutoPilot, do not
                                have a public package price. Scope, integrations, and timeline are
                                agreed before work starts.
                            </p>
                        </div>

                        <Link href="/book" className="btn btn-brand">
                            Discuss a software project <span className="arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="pricing-section seo-pricing-section">
                <div className="container">
                    <div className="pricing-section-header center">
                        <div className="sec-label">SEO Services</div>
                        <h2 className="sec-title">
                            SEO plans for <span className="text-gradient">search and local visibility</span>
                        </h2>
                        <p className="sec-desc">
                            Monthly plans focused on local SEO and Google Business Profile.
                            Technical and on-page work is included in the plan you choose.
                        </p>
                    </div>

                    <div className="pricing-grid seo-grid">
                        {localSeoPackages.map((pkg) => (
                            <article
                                className={`pricing-card seo-card ${pkg.featured ? 'featured' : ''}`}
                                key={pkg.name}
                            >
                                {pkg.featured && <div className="pricing-popular">Recommended</div>}

                                <div className="pricing-card-top">
                                    <span>{pkg.label}</span>
                                    <h3>{pkg.name}</h3>
                                    <p>{pkg.bestFor}</p>
                                </div>

                                <div className="pricing-price">
                                    <span>Starting from</span>
                                    <strong>
                                        {pkg.price}
                                        <small>{pkg.period}</small>
                                    </strong>
                                </div>

                                <div className="pricing-scope-box">
                                    <p>{pkg.timeline}</p>
                                    <p>{pkg.scope}</p>
                                </div>

                                <ul className="pricing-features">
                                    {pkg.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>

                                <div className="pricing-card-note">{pkg.note}</div>

                                <Link href="/book" className={pkg.featured ? 'btn btn-brand' : 'btn btn-ghost'}>
                                    Discuss This Plan <span className="arrow">→</span>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pricing-note-section">
                <div className="container">
                    <div className="pricing-note-card">
                        <div>
                            <span>Important Pricing Note</span>
                            <h2>All prices are starting prices.</h2>
                            <p>
                                Final pricing depends on website size, business goals, SEO competition,
                                platform, timeline, content needs, and required deliverables.
                            </p>
                        </div>

                        <Link href="/contact" className="btn btn-brand">
                            Request Custom Quote <span className="arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="pricing-faq-section">
                <div className="container">
                    <div className="pricing-section-header center">
                        <div className="sec-label">SEO FAQ</div>
                        <h2 className="sec-title">
                            Frequently Asked <span className="text-gradient">SEO Questions</span>
                        </h2>
                        <p className="sec-desc">
                            Timelines, Google Business Profile, city pages, and what the monthly SEO plans include.
                        </p>
                    </div>

                    <div className="pricing-faq-layout">
                        <div className="pricing-faq-visual">
                            <div className="pricing-faq-visual-glow" />

                            <div className="pricing-faq-big-icon" aria-hidden="true">
                                📍
                            </div>

                            <span>SEO FAQ</span>

                            <h3>Questions about local search and the business profile</h3>

                            <p>
                                Timelines, Google Business Profile, city pages, and what a monthly SEO plan covers.
                            </p>

                            <div className="pricing-faq-mini-stats">
                                <div>
                                    <strong>3–6</strong>
                                    <small>Months typical movement</small>
                                </div>
                                <div>
                                    <strong>Ongoing</strong>
                                    <small>SEO growth service</small>
                                </div>
                            </div>
                        </div>

                        <div className="pricing-faq-content">
                            <div className="pricing-faq-accordion">
                                {localSeoFaqs.map((faq, index) => {
                                    const isOpen = activeFaq === index

                                    return (
                                        <div
                                            className={`pricing-faq-item ${isOpen ? 'active' : ''}`}
                                            key={faq.q}
                                        >
                                            <button
                                                type="button"
                                                className="pricing-faq-question"
                                                onClick={() => setActiveFaq(isOpen ? null : index)}
                                                aria-expanded={isOpen}
                                            >
                                                <span className="pricing-faq-number">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>

                                                <span>{faq.q}</span>

                                                <span className="pricing-faq-chevron">⌄</span>
                                            </button>

                                            <div className="pricing-faq-answer">
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