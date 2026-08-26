'use client'

import Link from 'next/link'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
]

const supportLinks = [
  { label: 'Book a Consultation', href: '/book' },
  { label: 'Contact', href: '/contact' },
  { label: 'Tools', href: '/tools' },
  { label: 'SEO Report Generator', href: 'https://walidhasan.com/seo-report-generator/', external: true },
  { label: 'Inoviqa LLC', href: 'https://inoviqa.com/', external: true },
]

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/walidhasan-riyad/', short: 'in' },
  { label: 'Behance', href: 'https://www.behance.net/walid_hasan', short: 'Be' },
  { label: 'Facebook', href: 'https://www.facebook.com/iamwalidhasan', short: 'f' },
  { label: 'YouTube', href: 'https://www.youtube.com/@walidhasan-r', short: '▶' },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    short: 'in',
    href: 'https://www.linkedin.com/in/walidhasan-riyad/',
    className: 'social-linkedin',
  },
  {
    label: 'Facebook',
    short: 'fb',
    href: 'https://www.facebook.com/iamwalidhasan',
    className: 'social-facebook',
  },
  {
    label: 'Instagram',
    short: 'ig',
    href: 'https://www.instagram.com/iamwalidhasan/',
    className: 'social-instagram',
  },
  {
    label: 'Behance',
    short: 'be',
    href: 'https://www.behance.net/walid_hasan',
    className: 'social-behance',
  },
  {
    label: 'YouTube',
    short: 'yt',
    href: 'https://www.youtube.com/@walidhasan-r',
    className: 'social-youtube',
  },
  {
    label: 'X',
    short: 'x',
    href: 'https://x.com/walidhasan_r',
    className: 'social-x',
  },
]

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__glow site-footer__glow--left" />
      <div className="site-footer__glow site-footer__glow--right" />

      <div className="footer-shell">
        <div className="footer-watermark" aria-hidden="true">WALID</div>

        <div className="footer-panel">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="footer-logo">
                <span className="footer-logo-mark">
                  <img
                    src="/assets/walidhasan-logo.png"
                    alt="Walid Hasan Logo"
                    width="34"
                    height="34"
                  />
                </span>
                <span className="footer-logo-text">Walid <span>Hasan</span></span>
              </Link>

              <p className="footer-description">
                Premium web designer, SEO strategist, and digital growth consultant helping brands build high-converting websites, stronger visibility, and smarter online systems.
              </p>

              <div className="footer-tags">
                <span>Web Design</span>
                <span>Development</span>
                <span>SEO</span>
                <span>Analytics</span>

                <span>CRO</span>
              </div>

              <div className="footer-socials">
                {socialLinks.map((social) => (
                  <a
                    href={social.href}
                    className={`footer-social ${social.className}`}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={social.href}
                  >
                    {social.short}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-col">
              <h3 className="footer-col-title">Quick Links</h3>
              <nav className="footer-links" aria-label="Quick Links">
                {quickLinks.map((item) => (
                  <Link key={item.label} href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="footer-col">
              <h3 className="footer-col-title">Support</h3>
              <nav className="footer-links" aria-label="Support Links">
                {supportLinks.map((item) =>
                  item.external ? (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="footer-link">
                      {item.label}
                    </a>
                  ) : (
                    <Link key={item.label} href={item.href} className="footer-link">
                      {item.label}
                    </Link>
                  )
                )}
                {/*
                  NOTE: "SEO Report Generator" is intentionally rendered as a
                  plain <a> above (via the `external: true` branch), not a
                  Next.js <Link>. It lives at /seo-report-generator/ as a
                  separate, pre-existing asset on the production server
                  (see public/.htaccess, which explicitly preserves it) and
                  is not part of this Next.js app's routes. Using <Link>
                  here would trigger Next's client-side router, which has no
                  matching route and would 404 inside the SPA even though
                  the real file exists on the server. Confirm this page is
                  still live before deployment — see
                  BLOCKED-USER-INPUT.md.
                */}
              </nav>
            </div>

            <div className="footer-col footer-contact-col">
              <h3 className="footer-col-title">Contact</h3>

              <div className="footer-contact-list">
                <div className="footer-contact-card">
                  <span className="footer-contact-label">Email</span>
                  <a href="mailto:hello@walidhasan.com" className="footer-contact-value">hello@walidhasan.com</a>
                </div>

                <div className="footer-contact-card">
                  <span className="footer-contact-label">Whats App</span>
                  <a href="https://wa.me/+8801774340932" className="footer-contact-value">+880 177 434 0932 </a>
                </div>

                <div className="footer-contact-card">
                  <span className="footer-contact-label">GLOBAL REACH</span>
                  <span className="footer-contact-value">Trusted by clients in 30+ countries</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} Walid Hasan. Web Design  ·  Analytics  ·  Conversion Optimization
            </p>

            <div className="footer-legal-links">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <span>|</span>
              <Link href="/terms-of-use">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
