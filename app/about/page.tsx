import About from '@/views/About'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { profilePageSchema } from '@/lib/schema'

export const metadata = pageMetadata({
  title: 'About Walid Hasan — Designer, Developer & SEO',
  socialTitle: 'About Walid Hasan — Web Designer, Developer & SEO Specialist',
  description:
    'Walid Hasan is a web designer, developer, and SEO specialist. Since 2017 he has built websites, custom software, and SEO systems for client businesses.',
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
