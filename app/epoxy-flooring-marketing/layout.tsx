import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Epoxy Flooring Marketing — Local SEO for Contractors',
  description:
    'Local SEO, Google Business Profile optimization and conversion-focused website design for epoxy flooring contractors who want more quote requests from Google Maps and organic search.',
  path: '/epoxy-flooring-marketing',
})

export default function EpoxyFlooringMarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
