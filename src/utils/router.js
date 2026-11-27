import { useEffect, useState } from 'react'

// Tiny hash router: "#market/soybean" -> { route: 'market', param: 'soybean' }.
// Hash URLs work on any static host (like Vercel) without server configuration,
// and the browser back button works as expected.

export const ROUTES = ['home', 'crop', 'disease', 'equipment', 'history', 'market', 'schemes']

function parseHash() {
  const [route, ...rest] = window.location.hash.replace(/^#\/?/, '').split('/')
  const param = rest.length ? decodeURIComponent(rest.join('/')) : null
  return { route: ROUTES.includes(route) ? route : 'home', param }
}

export function useHashRoute() {
  const [location, setLocation] = useState(parseHash)

  useEffect(() => {
    function handleChange() {
      setLocation(parseHash())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', handleChange)
    return () => window.removeEventListener('hashchange', handleChange)
  }, [])

  return location
}

export function hrefFor(route, param) {
  return param ? `#${route}/${encodeURIComponent(param)}` : `#${route}`
}

export function navigate(route, param) {
  window.location.hash = hrefFor(route, param).slice(1)
}
