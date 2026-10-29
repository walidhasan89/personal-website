import Contact from '@/views/Contact'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Contact Walid Hasan',
  description:
    'Contact Walid Hasan about website design, web development, custom software, or SEO. Email hello@walidhasan.com or WhatsApp +880 177 434 0932.',
  path: '/contact',
})

export default function Page() {
  return <Contact />
}
