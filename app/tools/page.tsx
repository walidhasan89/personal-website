import Tools from '@/views/Tools'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Tools & Products — Chrome Extensions I Built',
  description:
    'Chrome extensions and SEO tools built by Walid Hasan: ReplyChief, Shopify AdminPalette, RFQ AutoPilot and Site Audit Pilot, plus a free SEO report generator.',
  path: '/tools',
})

export default function Page() {
  return <Tools />
}
