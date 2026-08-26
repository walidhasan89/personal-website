import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'Read the Privacy Policy for walidhasan.com, including how information is collected, used, protected, and handled when using this website.',
  path: '/privacy-policy',
})

const sections = [
  {
    title: '1. Who We Are',
    body: [
      'This website is operated by Walid Hasan, a digital growth consultant providing services related to web design, SEO, analytics, conversion optimization, lead generation, website audits, and digital strategy.',
      'For privacy-related questions, you can contact: hello@walidhasan.com',
    ],
  },
  {
    title: '2. Information We Collect',
    body: [
      'I may collect information that you provide directly when you fill out a form, book a consultation, request a quote, send an email, or contact me through this website.',
      'This may include your name, email address, phone number if provided, website URL, business name, project details, service requirements, budget or timeline information, messages, or files you choose to send.',
      'Some information may also be collected automatically through analytics and tracking tools, such as IP address, browser type, device type, operating system, pages visited, time spent on pages, referral source, clicks, scroll behavior, approximate location, conversion events, and website performance data.',
    ],
  },
  {
    title: '3. How Your Information Is Used',
    body: [
      'Information collected through this website may be used to respond to inquiries, provide consultations, prepare proposals, deliver web design, SEO, analytics, CRO, or digital growth services, improve website content, analyze visitor behavior, measure marketing performance, improve lead generation, and protect the website from spam or security issues.',
      'I do not use your personal information for unrelated purposes without a valid reason.',
    ],
  },
  {
    title: '4. Analytics and Tracking Tools',
    body: [
      'This website may use third-party analytics and tracking tools, including Google Tag Manager, Google Analytics, Microsoft Clarity, Meta Pixel or other advertising pixels if added, Search Console, or similar performance tools.',
      'These tools may collect usage data such as page views, clicks, scroll activity, session behavior, traffic sources, device information, and conversion actions.',
      'Microsoft Clarity may record anonymized or pseudonymized session interactions such as clicks, scrolling, and page navigation to help improve website usability.',
    ],
  },
  {
    title: '5. Cookies and Similar Technologies',
    body: [
      'This website may use cookies, pixels, tags, and similar technologies to remember basic preferences, analyze website traffic, understand visitor behavior, improve website performance, measure conversions, and support marketing or remarketing activities.',
      'You can control or disable cookies through your browser settings. However, disabling cookies may affect some website functionality or tracking accuracy.',
    ],
  },
  {
    title: '6. Contact Forms and Consultation Bookings',
    body: [
      'When you submit a contact form or book a consultation, the information you provide is used to respond to your request and evaluate whether my services are a good fit for your needs.',
      'Your submitted information may be stored in email, CRM, calendar, analytics, or project management tools used to manage communication and service delivery.',
    ],
  },
  {
    title: '7. Tools and Website Features',
    body: [
      'This website may include free tools, calculators, audit tools, SEO tools, or other interactive features.',
      'When you use these tools, the website may collect input data, usage data, or technical data necessary to process the tool request, improve the tool, prevent abuse, and analyze performance.',
      'Do not submit confidential, sensitive, or private business information into public tools unless you are comfortable sharing it for that purpose.',
    ],
  },
  {
    title: '8. How Information Is Shared',
    body: [
      'I do not sell, rent, or trade your personal information.',
      'Information may be shared only in limited situations, such as with service providers that help operate this website, analytics or tracking platforms, email, calendar, CRM, or project management tools, when required by law, to protect rights or security, or with your permission.',
      'Any third-party tools used are responsible for their own privacy practices.',
    ],
  },
  {
    title: '9. Third-Party Links',
    body: [
      'This website may contain links to third-party websites, platforms, tools, case studies, social media profiles, or external services.',
      'I am not responsible for the privacy policies, content, security, or practices of third-party websites. You should review their privacy policies before submitting information to them.',
    ],
  },
  {
    title: '10. Data Storage and Security',
    body: [
      'Reasonable technical and organizational measures are used to protect information from unauthorized access, loss, misuse, or disclosure.',
      'However, no method of internet transmission or electronic storage is completely secure. I cannot guarantee absolute security of information submitted through this website.',
    ],
  },
  {
    title: '11. Data Retention',
    body: [
      'Information may be retained for as long as necessary to respond to inquiries, provide services, maintain business records, improve website performance, comply with legal or tax obligations, resolve disputes, and prevent abuse or fraud.',
      'If your information is no longer needed, it may be deleted or anonymized.',
    ],
  },
  {
    title: '12. Your Rights',
    body: [
      'Depending on your location, you may have rights regarding your personal information, including the right to request access, correction, deletion, object to certain processing, withdraw consent where applicable, or request information about how your data is used.',
      'To make a request, contact me at: hello@walidhasan.com',
    ],
  },
  {
    title: '13. International Visitors',
    body: [
      'This website may be accessed by visitors from different countries. By using this website or submitting information, you understand that your information may be processed in countries where service providers, analytics tools, or business systems operate.',
    ],
  },
  {
    title: '14. Children’s Privacy',
    body: [
      'This website and services are not intended for children under the age of 13. I do not knowingly collect personal information from children. If you believe a child has submitted personal information, please contact me so it can be removed.',
    ],
  },
  {
    title: '15. Changes to This Privacy Policy',
    body: [
      'This Privacy Policy may be updated from time to time to reflect changes in services, tools, legal requirements, or website practices.',
      'The updated version will be posted on this page with a revised “Last updated” date.',
    ],
  },
  {
    title: '16. Contact Information',
    body: [
      'For questions about this Privacy Policy or how your information is handled, contact Walid Hasan at hello@walidhasan.com.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-page">
      <section className="privacy-hero">
        <div className="privacy-hero-grid" />
        <div className="privacy-hero-glow privacy-hero-glow-one" />
        <div className="privacy-hero-glow privacy-hero-glow-two" />
        <Breadcrumbs items={[{ name: 'Privacy Policy', path: '/privacy-policy' }]} />

        <div className="container privacy-hero-inner">
          <div className="privacy-hero-content">
            <div className="privacy-kicker">
              <span className="privacy-kicker-dot" />
              Legal Information
            </div>

            <h1>
              Privacy <span className="text-gradient">Policy</span>
            </h1>

            <p>
              This Privacy Policy explains how Walid Hasan collects, uses,
              stores, and protects information when you visit this website,
              contact me, book a consultation, use any tools, or interact with
              my services.
            </p>

            <div className="privacy-hero-actions">
              <a href="#privacy-content" className="btn btn-brand">
                Read Policy <span className="arrow">→</span>
              </a>
              <Link href="/contact" className="btn btn-ghost">
                Contact Me
              </Link>
            </div>
          </div>

          <div className="privacy-hero-card" aria-hidden="true">
            <div className="privacy-shield">
              <svg
                width="74"
                height="74"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-5" />
              </svg>
            </div>

            <div className="privacy-card-lines">
              <span />
              <span />
              <span />
            </div>

            <div className="privacy-card-mini-grid">
              <div>
                <strong>Privacy</strong>
                <small>Protected data handling</small>
              </div>
              <div>
                <strong>Analytics</strong>
                <small>Transparent tracking tools</small>
              </div>
              <div>
                <strong>Security</strong>
                <small>Responsible information use</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="privacy-content-section" id="privacy-content">
        <div className="container privacy-layout">
          <aside className="privacy-sidebar">
            <div className="privacy-sidebar-card">
              <span>Last Updated</span>
              <strong>January 2026</strong>
              <p>
                This page describes how information is collected, used, and
                protected across this website.
              </p>
            </div>

            <nav className="privacy-toc" aria-label="Privacy Policy Sections">
              {sections.slice(0, 8).map((section) => (
                <a key={section.title} href={`#${section.title.toLowerCase().replaceAll(' ', '-').replaceAll('.', '')}`}>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="privacy-policy-card">
            <div className="privacy-intro-card">
              <h2>Overview</h2>
              <p>
                By using this website, you agree to the practices described in
                this Privacy Policy. This page is designed to be clear,
                transparent, and easy to understand.
              </p>
            </div>

            {sections.map((section) => (
              <section
                className="privacy-policy-section"
                id={section.title.toLowerCase().replaceAll(' ', '-').replaceAll('.', '')}
                key={section.title}
              >
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}

            <div className="privacy-bottom-cta">
              <div>
                <span>Still have questions?</span>
                <h3>Contact me about this Privacy Policy</h3>
              </div>

              <a href="mailto:hello@walidhasan.com" className="btn btn-brand">
                Email Me <span className="arrow">→</span>
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}