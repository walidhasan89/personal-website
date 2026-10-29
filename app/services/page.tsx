import Services from '@/views/Services'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Services — Website Design, Development, Software & SEO',
  description:
    'Four services from Walid Hasan: website design, web development, custom software, and SEO including technical, on-page, and local search.',
  path: '/services',
})

export default function Page() {
  return <Services />
}
