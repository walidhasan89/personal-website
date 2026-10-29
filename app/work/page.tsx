import Work from '@/views/Work'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Work — Web, Software & SEO Projects',
  description:
    'Selected website design, web development, software, and SEO projects by Walid Hasan, including Inoviqa and RFQ AutoPilot.',
  path: '/work',
})

export default function Page() {
  return <Work />
}
