import PricingClient from './PricingClient'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Pricing',
  description:
    'Starting prices for Walid Hasan’s website packages and local SEO plans. Custom software is quoted per project.',
  path: '/pricing',
})

export default function PricingPage() {
  return <PricingClient />
}
