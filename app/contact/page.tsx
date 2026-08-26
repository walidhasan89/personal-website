import Contact from '@/views/Contact'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Contact Walid Hasan',
  description:
    'Get in touch with Walid Hasan about web design, SEO, analytics and digital growth work. Typical response time is under 24 hours.',
  path: '/contact',
})

export default function Page() {
  return <Contact />
}
