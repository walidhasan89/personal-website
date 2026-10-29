// Single source of truth for the theme-init logic shared between the
// pre-paint inline script in app/layout.tsx and src/context/ThemeContext.tsx.
// The inline script must resolve the theme EXACTLY the same way the provider
// does, or visitors get a flash of the wrong theme on every page load.

export const THEME_STORAGE_KEY = 'wh-theme-v2'

// The previous implementation wrote 'wh-theme' to localStorage on every page
// load, which permanently pinned every returning visitor to the theme that
// was active on their first visit (see ThemeContext.tsx). The storage key was
// bumped so those stale pinned values are ignored; the old entry is removed
// on mount by the ThemeProvider.
export const LEGACY_THEME_STORAGE_KEY = 'wh-theme'

// Resolves to: an explicit user choice (localStorage) if one exists,
// otherwise the OS/browser preference. Runs before first paint — must stay
// framework-free and failure-tolerant (private-mode storage errors, etc.).
export const THEME_INIT_SCRIPT = `(function(){try{var k='${THEME_STORAGE_KEY}';var s=localStorage.getItem(k);var t='dark';if(s==='light'||s==='dark'){t=s}else if(!window.matchMedia('(prefers-color-scheme: dark)').matches){t='light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`
