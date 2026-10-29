import BookConsultation from '@/views/BookConsultation'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Book a Call — Website, Software & SEO',
  description:
    'Book a 30-minute call with Walid Hasan about a website, custom software, or SEO. No obligation.',
  path: '/book',
})

export default function Page() {
  return <BookConsultation />
}
