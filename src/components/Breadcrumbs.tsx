import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, type BreadcrumbEntry } from '@/lib/schema'

// Visible breadcrumb trail + matching BreadcrumbList JSON-LD.
// Always pass the same items that are meant to be shown — schema must
// mirror visible content (see src/lib/schema.ts notes).
export default function Breadcrumbs({ items }: { items: BreadcrumbEntry[] }) {
  const trail: BreadcrumbEntry[] = [{ name: 'Home', path: '' }, ...items]

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((item, i) => {
          const isLast = i === trail.length - 1
          return (
            <li key={item.path}>
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.path === '' ? '/' : item.path}>{item.name}</Link>
              )}
              {!isLast && <span className="breadcrumbs-sep" aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
      <JsonLd data={breadcrumbSchema(trail)} />
    </nav>
  )
}
