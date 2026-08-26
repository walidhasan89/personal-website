import About from '@/views/About'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { profilePageSchema } from '@/lib/schema'

export const metadata = pageMetadata({
  title: 'About Walid Hasan — Consultant & Agency Founder',
  socialTitle: 'About Walid Hasan — Digital Growth Consultant & Agency Founder',
  description:
    'Walid Hasan is a digital growth consultant and founder of Inoviqa LLC, working on web design, SEO, analytics and conversion optimization since 2017.',
  path: '/about',
  ogType: 'profile',
})

export default function Page() {
  return (
    <>
      {/*
        ProfilePage is the schema.org type Google documents specifically for
        "a page about one person". Pointing its mainEntity at the shared
        Person @id (defined once in app/layout.tsx) tells search engines and
        AI systems that THIS page is the canonical description of the
        Walid Hasan entity — which is exactly the disambiguation signal this
        project needs, given several unrelated public figures share the name.
      */}
      <JsonLd data={profilePageSchema('/about')} />
      <About />
    </>
  )
}
