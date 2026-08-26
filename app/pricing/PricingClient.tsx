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

const ecommerceSeoPackages = [
    {
        name: 'Ecommerce Starter',
        price: '$799',
        period: '/month',
        label: 'For small ecommerce stores',
        bestFor:
            'Best for small Shopify, WooCommerce, or ecommerce stores that need SEO foundations.',
        timeline: 'Recommended timeline: 3 months minimum',
        scope: 'Focuses on selected priority collections, categories, and products',
        note:
            'Bulk product SEO, advanced technical fixes, or large-scale collection copy are not included by default.',
        features: [
            'Technical SEO audit',
            'Priority category/collection SEO',
            'Selected product SEO recommendations',
            'Keyword research',
            'Meta title and description optimization',
            'Search Console monitoring',
            'Basic internal linking recommendations',
            'Monthly SEO report',
        ],
    },
    {
        name: 'Ecommerce Growth',
        price: '$1,200',
        period: '/month',
        label: 'For category and product growth',
        bestFor:
            'Best for growing ecommerce stores that want stronger category, collection, and product rankings.',
        timeline: 'Recommended timeline: 3–6 months',
        scope:
            'Focuses on priority category architecture, selected product SEO, and technical improvements',
        note:
            'Additional products, collections, copywriting, or complex technical fixes may require add-on pricing.',
        featured: true,
        features: [
            'Everything in Ecommerce Starter',
            'Category/collection page optimization',
            'Product page SEO for selected products',
            'Internal linking strategy',
            'Content recommendations',
            'Technical SEO fixes',
            'Schema recommendations',
            'Conversion improvement suggestions',
            'Monthly growth report',
        ],
    },
    {
        name: 'Ecommerce Authority',
        price: '$1,800',
        period: '/month',
        label: 'For larger competitive stores',
        bestFor:
            'Best for larger stores, competitive ecommerce niches, or stores with many collections/products.',
        timeline: 'Recommended timeline: 6 months+',
        scope: 'Focuses on advanced SEO strategy, technical structure, and ongoing ecommerce growth',
        note:
            'Large-scale product SEO, faceted navigation issues, advanced schema, and complex technical fixes may require a custom quote.',
        features: [
            'Everything in Ecommerce Growth',
            'Advanced technical SEO',
            'Large-scale product SEO strategy',
            'Collection architecture improvement',
            'SEO content planning',
            'CRO recommendations',
            'Ongoing performance monitoring',
            'Priority support',
        ],
    },
]

const setupFeeIncludes = [
    'Website and technical SEO audit',
    'Google Business Profile audit',
    'Keyword and search-intent research',
    'Competitor research',
    'Analytics and tracking review',
    'Initial Local SEO strategy',
    'Campaign onboarding',
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

const ecommerceSeoFaqs = [
    {
        q: 'How long does Ecommerce SEO take?',
        a: 'Ecommerce SEO usually takes 3–6 months to show stronger improvements, and competitive stores may need 6–12 months for meaningful category and product ranking growth.',
    },
    {
        q: 'Is Ecommerce SEO ongoing?',
        a: 'Yes. Ecommerce SEO should be ongoing because stores constantly add products, categories, collections, content, and technical changes. Competitors also keep optimizing.',
    },
    {
        q: 'Do you optimize product pages?',
        a: 'Yes, but packages focus on selected priority products. Large-scale product SEO or bulk optimization may require add-on pricing depending on the number of products.',
    },
    {
        q: 'Do you optimize collection/category pages?',
        a: 'Yes. Collection and category pages are usually the most important ecommerce SEO pages because they target commercial keywords and drive qualified buying traffic.',
    },
    {
        q: 'Is product SEO included for every product?',
        a: 'No. Optimizing every product is not included by default for large stores. Priority products are selected first, and additional product SEO can be added if needed.',
    },
    {
        q: 'Do you handle Shopify SEO?',
        a: 'Yes. I can work with Shopify SEO, including collection optimization, product SEO, technical SEO, metadata, internal linking, and ecommerce conversion recommendations.',
    },
    {
        q: 'What affects Ecommerce SEO pricing?',
        a: 'Pricing depends on store size, number of products, number of collections, technical issues, platform, competition level, content needs, and how much optimization is required.',
    },
    {
        q: 'Can Ecommerce SEO improve sales?',
        a: 'SEO can increase qualified organic traffic and improve product/category visibility. Sales also depend on product quality, pricing, trust, UX, conversion rate, and offer strength.',
    },
]

export default function PricingClient() {
    const [seoTab, setSeoTab] = useState<'local' | 'ecommerce'>('local')
    const [faqTab, setFaqTab] = useState<'local' | 'ecommerce'>('local')
    const [activeFaq, setActiveFaq] = useState<number | null>(0)

    const activeSeoPackages = seoTab === 'local' ? localSeoPackages : ecommerceSeoPackages
    const activeFaqs = faqTab === 'local' ? localSeoFaqs : ecommerceSeoFaqs

    const handleFaqTabChange = (tab: 'local' | 'ecommerce') => {
        setFaqTab(tab)
        setActiveFaq(0)
    }

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
                            Personal Consultant Pricing
                        </div>

                        <h1>
                            Growth-Focused Pricing for{' '}
                            <span className="text-gradient">Websites & SEO</span>
                        </h1>

                        <p>
                            Transparent starting prices for premium website design, local SEO,
                            Google Business Profile optimization, and ecommerce SEO growth.
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
                            <span>Ecommerce SEO</span>
                            <strong>$799/mo</strong>
                        </div>

                        <div className="pricing-mini-note">
                            Lower than agency pricing. Built for personal consulting clients.
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

            <section className="pricing-section seo-pricing-section">
                <div className="container">
                    <div className="pricing-section-header center">
                        <div className="sec-label">SEO Growth</div>
                        <h2 className="sec-title">
                            SEO Pricing for <span className="text-gradient">Local & Ecommerce</span>
                        </h2>
                        <p className="sec-desc">
                            Choose between Local SEO with Google Business Profile optimization
                            or Ecommerce SEO for product and collection growth.
                        </p>
                    </div>

                    <div className="pricing-tabs" role="tablist" aria-label="SEO pricing tabs">
                        <button
                            type="button"
                            className={seoTab === 'local' ? 'active' : ''}
                            onClick={() => setSeoTab('local')}
                        >
                            Local SEO + GBP
                        </button>
                        <button
                            type="button"
                            className={seoTab === 'ecommerce' ? 'active' : ''}
                            onClick={() => setSeoTab('ecommerce')}
                        >
                            Ecommerce SEO
                        </button>
                    </div>

                    <div className="pricing-grid seo-grid">
                        {activeSeoPackages.map((pkg) => (
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

            <section className="setup-fee-section">
                <div className="container">
                    <div className="setup-fee-grid">
                        <div className="setup-fee-content">
                            <div className="setup-fee-kicker">
                                <span className="setup-fee-kicker-dot" />
                                Before monthly work begins
                            </div>

                            <h2>
                                One-time <span className="text-gradient">setup fee.</span>
                            </h2>

                            <div className="setup-fee-price">
                                <strong>$199</strong>
                                <span>once</span>
                            </div>

                            <p>
                                The setup fee covers the research, auditing, tracking review,
                                competitor analysis, and campaign preparation required before
                                monthly work begins.
                            </p>
                        </div>

                        <div className="setup-fee-card">
                            <span className="setup-fee-corner setup-fee-corner-tl" aria-hidden="true" />
                            <span className="setup-fee-corner setup-fee-corner-tr" aria-hidden="true" />
                            <span className="setup-fee-corner setup-fee-corner-bl" aria-hidden="true" />
                            <span className="setup-fee-corner setup-fee-corner-br" aria-hidden="true" />

                            <span className="setup-fee-card-label">Setup Includes</span>

                            <ul className="setup-fee-list">
                                {setupFeeIncludes.map((item) => (
                                    <li key={item}>
                                        <span className="setup-fee-check">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
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
                            Clear answers about Local SEO, Ecommerce SEO, ranking timelines, monthly service
                            scope, and add-on work.
                        </p>
                    </div>

                    <div className="pricing-faq-layout">
                        <div className="pricing-faq-visual">
                            <div className="pricing-faq-visual-glow" />

                            <div className="pricing-faq-big-icon" aria-hidden="true">
                                {faqTab === 'local' ? '📍' : '🛒'}
                            </div>

                            <span>{faqTab === 'local' ? 'Local SEO FAQ' : 'Ecommerce SEO FAQ'}</span>

                            <h3>
                                {faqTab === 'local'
                                    ? 'Questions about ranking in your local market?'
                                    : 'Questions about growing product and category visibility?'}
                            </h3>

                            <p>
                                {faqTab === 'local'
                                    ? 'Understand timelines, GBP optimization, city landing pages, and monthly local SEO scope.'
                                    : 'Understand product SEO, collection optimization, store size, technical SEO, and ongoing ecommerce growth.'}
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
                            <div className="pricing-faq-tabs" role="tablist" aria-label="SEO FAQ tabs">
                                <button
                                    type="button"
                                    className={faqTab === 'local' ? 'active' : ''}
                                    onClick={() => handleFaqTabChange('local')}
                                >
                                    Local SEO FAQ
                                </button>
                                <button
                                    type="button"
                                    className={faqTab === 'ecommerce' ? 'active' : ''}
                                    onClick={() => handleFaqTabChange('ecommerce')}
                                >
                                    Ecommerce SEO FAQ
                                </button>
                            </div>

                            <div className="pricing-faq-accordion">
                                {activeFaqs.map((faq, index) => {
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