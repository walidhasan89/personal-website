import BookConsultation from '@/views/BookConsultation'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Book a Consultation — 30 Minute Strategy Call',
  description:
    'Book a free 30-minute strategy call with Walid Hasan to discuss your website, SEO, analytics or digital growth goals. No obligation.',
  path: '/book',
})

export default function Page() {
  return <BookConsultation />
}
