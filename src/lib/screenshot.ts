// Shared microlink.io screenshot URL builder — previously duplicated with
// slightly different formatting in Home.tsx, CaseStudies.tsx, and Tools.tsx.
export function getScreenshot(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url.replace(/\/$/, ''))}&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&overlay.browser=false&viewport.width=1280&viewport.height=800`
}

// microlink.io is a free-tier third-party service with no uptime guarantee.
// If a screenshot fails to load, fall back to the site's own OG image rather
// than showing a broken-image icon.
export const SCREENSHOT_FALLBACK = '/assets/og-default.png'
