import CaseStudies from '@/views/CaseStudies'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Case Studies — Selected Client Work',
  description:
    'Selected web design, SEO and digital growth projects built by Walid Hasan for SaaS products, e-commerce brands, local service businesses and corporate clients worldwide.',
  path: '/case-studies',
})

export default function Page() {
  return <CaseStudies />
}
