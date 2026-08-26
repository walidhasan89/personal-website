'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTheme } from '@/context/ThemeContext'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Tools', href: '/tools' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    short: 'in',
    href: 'https://www.linkedin.com/in/walidhasan-riyad/',
    className: 'mob-social-linkedin',
  },
  {
    label: 'Facebook',
    short: 'fb',
    href: 'https://www.facebook.com/iamwalidhasan',
    className: 'mob-social-facebook',
  },
  {
    label: 'Instagram',
    short: 'ig',
    href: 'https://www.instagram.com/iamwalidhasan/',
    className: 'mob-social-instagram',
  },
  {
    label: 'Behance',
    short: 'be',
    href: 'https://www.behance.net/walid_hasan',
    className: 'mob-social-behance',
  },
  {
    label: 'YouTube',
    short: 'yt',
    href: 'https://www.youtube.com/@walidhasan-r',
    className: 'mob-social-youtube',
  },
  {
    label: 'X',
    short: 'x',
    href: 'https://x.com/walidhasan_r',
    className: 'mob-social-x',
  },
]

export default function Navbar() {
  const pathname = usePathname()
  const { theme, mounted, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <header className={`nav-wrap ${scrolled ? 'scrolled' : ''}`}>
        <nav className="navbar" aria-label="Main navigation">
          <Link href="/" className="nav-logo" aria-label="Walid Hasan Home">
            <img
              src="/assets/walidhasan-logo.png"
              alt="Walid Hasan"
              width={38}
              height={38}
            />

            <span className="nav-logo-text">
              Walid<span className="nav-logo-gradient">Hasan</span>
            </span>
          </Link>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={isActive(link.href) ? 'active' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              suppressHydrationWarning
            >
              {!mounted ? (
                <span className="theme-icon-placeholder" aria-hidden="true" />
              ) : theme === 'dark' ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <Link href="/book" className="nav-cta">
              Book Consultation
            </Link>

            <button
              className={`hamburger ${isOpen ? 'active' : ''}`}
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <div className={`mob-overlay ${isOpen ? 'open' : ''}`}>
        <button
          type="button"
          className="mob-close-btn"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        />

        <div className="mob-nav-inner">
          {navLinks.map((link, index) => (
            <Link
              href={link.href}
              className={`mob-nav-link ${isActive(link.href) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
              key={link.href}
            >
              <span className="mob-num">
                {String(index + 1).padStart(2, '0')}
              </span>
              {link.label}
            </Link>
          ))}

          <div className="mob-socials">
            {socialLinks.map((social) => (
              <a
                href={social.href}
                aria-label={social.label}
                className={`mob-social ${social.className}`}
                target="_blank"
                rel="noopener noreferrer"
                key={social.href}
              >
                {social.short}
              </a>
            ))}
          </div>

          <div className="mob-cta-wrap">
            <Link
              href="/book"
              className="btn btn-brand"
              onClick={() => setIsOpen(false)}
            >
              Book Consultation <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}