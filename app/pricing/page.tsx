import PricingClient from './PricingClient'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Pricing',
  description:
    'Transparent starting prices for website design, local SEO, Google Business Profile optimization and ecommerce SEO services by Walid Hasan.',
  path: '/pricing',
})

export default function PricingPage() {
  return <PricingClient />
}
