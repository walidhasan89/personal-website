import Script from 'next/script'
import type { Metadata } from 'next'

import '@/styles/global.css'
import '@/styles/navbar.css'
import '@/styles/footer.css'
import '@/styles/home.css'
import '@/styles/privacy.css'
import '@/styles/terms.css'
import '@/styles/pricing.css'
import '@/styles/niche.css'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CursorGlow from '@/components/CursorGlow'
import BackToTop from '@/components/BackToTop'
import WhatsAppButton from '@/components/WhatsAppButton'
import JsonLd from '@/components/JsonLd'
import { ThemeProvider } from '@/context/ThemeContext'
import { rootGraph } from '@/lib/schema'
import { OG_IMAGE } from '@/lib/seo'

const siteUrl = 'https://walidhasan.com'

// Kept under ~60 characters so it is not truncated in Google results. Name
// and role are front-loaded because branded/entity queries are the primary
// target for this site (see docs/KEYWORD-STRATEGY.md).
const homeTitle = 'Walid Hasan — Digital Growth Consultant, Web Design & SEO'
const homeDescription =
  'Walid Hasan is a digital growth consultant and founder of Inoviqa LLC, building websites, SEO and analytics systems that turn search visibility into qualified leads.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: '%s | Walid Hasan',
  },
  description: homeDescription,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Walid Hasan',
    title: homeTitle,
    description: homeDescription,
    images: [OG_IMAGE],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description: homeDescription,
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: '/assets/favicon-round.png',
    apple: '/assets/favicon-round.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#060611" />
        <JsonLd data={rootGraph()} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P7C4QCR4');
          `}
        </Script>

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wjvp900nqe");
          `}
        </Script>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P7C4QCR4"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <ThemeProvider>
          <CursorGlow />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
