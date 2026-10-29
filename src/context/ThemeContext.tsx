'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  LEGACY_THEME_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from '@/lib/theme'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  mounted: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  mounted: false,
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

function getStoredTheme(): Theme | null {
  const saved = localStorage.getItem(THEME_STORAGE_KEY)

  return saved === 'light' || saved === 'dark' ? saved : null
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

/**
 * Applies the theme to <html> WITHOUT persisting it.
 *
 * localStorage must only be written in response to an explicit user toggle.
 * The previous behavior wrote the resolved theme to storage on every page
 * load, which pinned every returning visitor to whatever their OS theme was
 * on their first visit — the site then ignored later OS theme changes
 * entirely, which is why the theme appeared to "not follow the system".
 */
function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
}

function withNoTransition(update: () => void) {
  document.documentElement.classList.add('theme-switching')
  update()
  window.setTimeout(() => {
    document.documentElement.classList.remove('theme-switching')
  }, 120)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initial = getStoredTheme() ?? systemTheme()

    setTheme(initial)
    applyTheme(initial)
    setMounted(true)

    // The old key was written on every load by the previous implementation;
    // drop it so returning visitors are not stuck on a stale pinned theme.
    localStorage.removeItem(LEGACY_THEME_STORAGE_KEY)

    // Follow live OS theme changes (auto dark mode at sunset, manual OS
    // switch, etc.) for as long as the visitor has not made an explicit
    // choice of their own via the navbar toggle.
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const onSystemChange = () => {
      if (getStoredTheme()) return

      const next = systemTheme()
      withNoTransition(() => {
        setTheme(next)
        applyTheme(next)
      })
    }

    media.addEventListener('change', onSystemChange)

    return () => media.removeEventListener('change', onSystemChange)
  }, [])

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'

    withNoTransition(() => {
      setTheme(nextTheme)
      applyTheme(nextTheme)
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
