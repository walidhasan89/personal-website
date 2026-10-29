import PricingClient from './PricingClient'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Pricing',
  description:
    'Transparent starting prices for website design, local SEO, ecommerce SEO, and AI search optimization (AEO and GEO) services by Walid Hasan.',
  path: '/pricing',
})

export default function PricingPage() {
  return <PricingClient />
}
