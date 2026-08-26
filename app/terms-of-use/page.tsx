import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Terms of Use',
  description:
    'Read the Terms of Use for walidhasan.com, including website usage, services, tools, intellectual property, limitations, and contact information.',
  path: '/terms-of-use',
})

const sections = [
  {
    title: '1. Website Owner',
    body: [
      'This website is operated by Walid Hasan, a digital growth consultant offering services related to web design, SEO, analytics, conversion optimization, lead generation, website audits, and digital strategy.',
      'For questions, contact: walid@inoviqa.com',
    ],
  },
  {
    title: '2. Use of This Website',
    body: [
      'You may use this website for lawful personal or business purposes, including learning about my services, viewing portfolio or case study information, reading content, using available tools, contacting me, booking a consultation, and requesting service information.',
      'You agree not to use this website in a way that may harm, disrupt, overload, or interfere with its functionality, security, or availability.',
    ],
  },
  {
    title: '3. Services Information',
    body: [
      'The website describes services such as web design, SEO, local SEO, analytics setup, CRO, lead generation strategy, website audits, and related consulting.',
      'Information on this website is provided for general informational and promotional purposes. It does not create a binding service agreement unless a separate written agreement, proposal, invoice, or confirmed engagement is made.',
      'Service scope, pricing, timelines, deliverables, revisions, support, and responsibilities may vary depending on the project and must be agreed separately.',
    ],
  },
  {
    title: '4. No Guaranteed Results',
    body: [
      'While I aim to provide high-quality strategy and execution, I do not guarantee specific results such as search engine rankings, traffic growth, lead volume, sales revenue, conversion rate increases, advertising performance, business growth, or approval from third-party platforms.',
      'Results depend on many factors outside my control, including market conditions, competition, website history, content quality, implementation, budget, user behavior, search engine algorithm changes, and client participation.',
      'Any examples, case studies, testimonials, or performance claims shown on the website are for illustration and do not guarantee the same results for every client.',
    ],
  },
  {
    title: '5. Website Tools and Free Resources',
    body: [
      'This website may include free tools, SEO tools, audit tools, calculators, templates, guides, or other resources.',
      'These tools and resources are provided for general informational purposes only. They should not be treated as professional, legal, financial, or guaranteed business advice.',
      'Tool outputs may not always be complete, accurate, or suitable for your specific situation. You are responsible for reviewing and validating any information before making decisions based on it.',
    ],
  },
  {
    title: '6. Consultations',
    body: [
      'Consultations are intended to understand your business goals, website challenges, service needs, and potential opportunities.',
      'A consultation does not guarantee that I will accept your project, provide free implementation, or deliver a complete strategy unless explicitly agreed.',
      'I reserve the right to decline projects that are not a good fit, conflict with availability, or fall outside my service scope.',
    ],
  },
  {
    title: '7. User Submissions',
    body: [
      'If you submit information through forms, email, booking pages, or tools, you agree that the information you provide is accurate and that you have the right to share it.',
      'You agree not to submit false or misleading information, spam or harmful content, malware or malicious links, confidential information you are not authorized to share, or content that violates laws or third-party rights.',
      'I may use submitted information to respond to your inquiry, evaluate project fit, prepare recommendations, and provide services.',
    ],
  },
  {
    title: '8. Intellectual Property',
    body: [
      'All content on this website, including text, design, layout, graphics, branding, logos, visuals, icons, code structure, and other materials, is owned by or licensed to Walid Hasan unless otherwise stated.',
      'You may not copy, reproduce, modify, sell, distribute, or reuse website content without written permission.',
      'You may share website links for informational purposes, provided you do not misrepresent ownership or remove attribution.',
    ],
  },
  {
    title: '9. Portfolio and Case Studies',
    body: [
      'Portfolio items, case studies, screenshots, project descriptions, or examples may be shown to demonstrate work experience and service capabilities.',
      'Some results or visuals may be summarized, anonymized, updated, or presented for clarity. Third-party brands, websites, or logos remain the property of their respective owners.',
      'If you are a past client and want a project reference updated or removed, you may contact me.',
    ],
  },
  {
    title: '10. Third-Party Websites and Tools',
    body: [
      'This website may link to third-party websites, platforms, tools, social media profiles, analytics services, booking tools, payment processors, or external resources.',
      'I am not responsible for third-party websites, including their content, availability, privacy practices, security, terms, or accuracy.',
      'Your use of third-party websites is at your own risk and may be governed by their own terms and policies.',
    ],
  },
  {
    title: '11. Payments and Project Agreements',
    body: [
      'Any paid service must be confirmed through a separate agreement, proposal, invoice, order, or written communication.',
      'Payment terms, refunds, revisions, ownership transfer, timelines, and deliverables will depend on the specific project agreement.',
      'Unless agreed otherwise, work may not begin until required information, access, content, and payment terms are completed.',
    ],
  },
  {
    title: '12. Client Responsibilities',
    body: [
      'For service projects, clients may be responsible for providing accurate business information, website access or platform access, brand assets, images, copy, content, feedback, approvals, timely communication, legal rights to any materials provided, and payment according to agreed terms.',
      'Delays in providing required materials or approvals may affect timelines and delivery.',
    ],
  },
  {
    title: '13. Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, Walid Hasan will not be liable for any indirect, incidental, special, consequential, or business losses resulting from use of this website, use of website tools or resources, reliance on website information, technical issues or downtime, third-party platform changes, search engine or advertising platform changes, or business decisions made based on website content.',
      'This includes loss of revenue, profits, leads, rankings, data, reputation, or business opportunities.',
    ],
  },
  {
    title: '14. Disclaimer',
    body: [
      'The information on this website is provided “as is” and “as available.” While I aim to keep information accurate and useful, I do not guarantee that all content is complete, current, error-free, or suitable for every situation.',
      'You are responsible for using your own judgment and seeking professional advice where necessary.',
    ],
  },
  {
    title: '15. Prohibited Activities',
    body: [
      'You agree not to attempt to hack, damage, or disrupt the website, use bots, scrapers, or automated tools without permission, copy or steal website content or design, misuse contact forms or tools, upload harmful code or malicious content, impersonate another person or business, or use the website for illegal or abusive purposes.',
    ],
  },
  {
    title: '16. Changes to These Terms',
    body: [
      'These Terms of Use may be updated at any time. Updated terms will be posted on this page with a new “Last updated” date.',
      'Your continued use of the website after changes means you accept the updated Terms of Use.',
    ],
  },
  {
    title: '17. Governing Principles',
    body: [
      'These terms are intended to be interpreted in a fair and reasonable manner for a personal business website offering digital services internationally.',
      'If any part of these terms is found unenforceable, the remaining sections will continue to apply.',
    ],
  },
  {
    title: '18. Contact Information',
    body: [
      'For questions about these Terms of Use, contact Walid Hasan at walid@inoviqa.com.',
    ],
  },
]

export default function TermsOfUsePage() {
  return (
    <div className="terms-page">
      <section className="terms-hero">
        <div className="terms-hero-grid" />
        <div className="terms-hero-glow terms-hero-glow-one" />
        <div className="terms-hero-glow terms-hero-glow-two" />
        <Breadcrumbs items={[{ name: 'Terms of Use', path: '/terms-of-use' }]} />

        <div className="container terms-hero-inner">
          <div className="terms-hero-content">
            <div className="terms-kicker">
              <span className="terms-kicker-dot" />
              Website Terms
            </div>

            <h1>
              Terms of <span className="text-gradient">Use</span>
            </h1>

            <p>
              These Terms of Use explain the rules and conditions for using this
              website, contacting Walid Hasan, using website tools, and engaging
              with the services offered through this website.
            </p>

            <div className="terms-hero-actions">
              <a href="#terms-content" className="btn btn-brand">
                Read Terms <span className="arrow">→</span>
              </a>
              <Link href="/privacy-policy" className="btn btn-ghost">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="terms-hero-card" aria-hidden="true">
            <div className="terms-document">
              <div className="terms-doc-icon">
                <svg
                  width="72"
                  height="72"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M8 13h8" />
                  <path d="M8 17h6" />
                  <path d="M8 9h2" />
                </svg>
              </div>

              <div className="terms-doc-lines">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="terms-signature">
                <div>
                  <strong>Usage Rules</strong>
                  <small>Clear terms for website visitors</small>
                </div>
                <div>
                  <strong>Service Scope</strong>
                  <small>Project terms are agreed separately</small>
                </div>
                <div>
                  <strong>Fair Use</strong>
                  <small>Responsible use of tools and content</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="terms-content-section" id="terms-content">
        <div className="container terms-layout">
          <aside className="terms-sidebar">
            <div className="terms-sidebar-card">
              <span>Last Updated</span>
              <strong>January 2026</strong>
              <p>
                These terms explain how this website, services, tools, and
                content may be used.
              </p>
            </div>

            <nav className="terms-toc" aria-label="Terms of Use Sections">
              {sections.slice(0, 9).map((section) => (
                <a
                  key={section.title}
                  href={`#${section.title
                    .toLowerCase()
                    .replaceAll(' ', '-')
                    .replaceAll('.', '')}`}
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="terms-policy-card">
            <div className="terms-intro-card">
              <h2>Overview</h2>
              <p>
                By accessing or using this website, you agree to these Terms of
                Use. If you do not agree, please do not use this website.
              </p>
            </div>

            {sections.map((section) => (
              <section
                className="terms-policy-section"
                id={section.title
                  .toLowerCase()
                  .replaceAll(' ', '-')
                  .replaceAll('.', '')}
                key={section.title}
              >
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}

            <div className="terms-bottom-cta">
              <div>
                <span>Need clarification?</span>
                <h3>Contact me before starting a project</h3>
              </div>

              <a href="mailto:walid@inoviqa.com" className="btn btn-brand">
                Email Me <span className="arrow">→</span>
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}