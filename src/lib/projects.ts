// Curated proof for the four services. Every URL here returned HTTP 200
// when checked. Descriptions stay descriptive — no traffic or conversion
// figures are attached, because this repo does not have a source for them.

export type ServiceLabel =
  | 'Website Design'
  | 'Web Development'
  | 'Software Development'
  | 'SEO Services'

export type Project = {
  url: string
  name: string
  domain: string
  service: ServiceLabel
  industry: string
  summary: string
  /** Shown in the homepage selected-work grid. */
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    url: 'https://inoviqa.com/',
    name: 'Inoviqa',
    domain: 'inoviqa.com',
    service: 'SEO Services',
    industry: 'Agency site',
    summary:
      'Public website for Inoviqa LLC. Included here as a live example of site structure and SEO, not as a separate offer.',
    featured: true,
  },
  {
    url: 'https://rfqautopilot.com/',
    name: 'RFQ AutoPilot',
    domain: 'rfqautopilot.com',
    service: 'Software Development',
    industry: 'Procurement software',
    summary:
      'Custom software for procurement teams. It automates request-for-quote workflows instead of leaving that work in spreadsheets and email.',
    featured: true,
  },
  {
    url: 'https://enginious.ae/',
    name: 'Enginious',
    domain: 'enginious.ae',
    service: 'Web Development',
    industry: 'Engineering — UAE',
    summary: 'Corporate website for a UAE engineering firm, with a clear service structure and a way to make contact.',
    featured: true,
  },
  {
    url: 'https://silkwaterswindowsandeaves.com/',
    name: 'Silk Waters',
    domain: 'silkwaterswindowsandeaves.com',
    service: 'SEO Services',
    industry: 'Home services',
    summary:
      'Local service website organized for search, including the pages and business information a Google Business Profile needs to point at.',
    featured: true,
  },
  {
    url: 'https://thedogranch.co.nz/',
    name: 'The Dog Ranch',
    domain: 'thedogranch.co.nz',
    service: 'Website Design',
    industry: 'Pet services — New Zealand',
    summary: 'Boarding and pet-care website with service pages and a booking path for local customers.',
    featured: true,
  },
  {
    url: 'https://vbfamlaw.com/',
    name: 'VB Family Law',
    domain: 'vbfamlaw.com',
    service: 'Website Design',
    industry: 'Legal services',
    summary: 'Law firm website with practice information and a consultation request, written for people comparing attorneys.',
    featured: true,
  },
  {
    url: 'https://thecleaningmavens.com/',
    name: 'The Cleaning Mavens',
    domain: 'thecleaningmavens.com',
    service: 'SEO Services',
    industry: 'Cleaning services',
    summary: 'Cleaning company website set up so local visitors can see the services and request a booking.',
  },
  {
    url: 'https://www.drcarlamanly.com/',
    name: 'Dr. Carla Manly',
    domain: 'drcarlamanly.com',
    service: 'Website Design',
    industry: 'Psychology',
    summary: 'Professional site for a psychologist, covering books, media, and how to request a consultation.',
  },
  {
    url: 'https://mynewwarehouse.com/',
    name: 'My New Warehouse',
    domain: 'mynewwarehouse.com',
    service: 'Web Development',
    industry: 'Warehousing',
    summary: 'Warehouse company website with service pages and a lead form for operators comparing facilities.',
  },
  {
    url: 'https://redesignfitout.com/',
    name: 'Redesign Fitout',
    domain: 'redesignfitout.com',
    service: 'Website Design',
    industry: 'Interior fit-out',
    summary: 'Fit-out company website with a project gallery and a path to book a consultation.',
  },
]

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured)
