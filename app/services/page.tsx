import Services from '@/views/Services'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Services — Web Design, SEO & Digital Growth',
  description:
    'Web design and development, SEO strategy, local SEO and Google Business Profile, GA4 analytics, lead generation and conversion optimization — delivered by Walid Hasan.',
  path: '/services',
})

export default function Page() {
  return <Services />
}
