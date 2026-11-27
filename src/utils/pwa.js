import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'

// Installable-app helpers.

// Register the offline service worker (production builds only — dev uses Vite's live reload).
export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // The app still works normally without offline support.
    })
  })
}

function isRunningAsApp() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
}

// Chrome fires `beforeinstallprompt` (often before React has started) when the site can be
// installed. We keep that event in one shared place so any "Install app" button can open
// Chrome's install dialog, and every button hides again once the app is installed.
let deferredPrompt = null
let installed = isRunningAsApp()
const listeners = new Set()
const notify = () => listeners.forEach((listener) => listener())

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault()
  deferredPrompt = event
  notify()
})
window.addEventListener('appinstalled', () => {
  installed = true
  deferredPrompt = null
  notify()
})

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useInstallPrompt() {
  const canInstall = useSyncExternalStore(subscribe, () => Boolean(deferredPrompt) && !installed)
  const install = useCallback(async () => {
    const event = deferredPrompt
    if (!event) return
    event.prompt()
    await event.userChoice.catch(() => null)
    deferredPrompt = null
    notify()
  }, [])
  return { canInstall, install }
}

export function useOnlineStatus() {
  const [online, setOnline] = useState(() => navigator.onLine)
  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])
  return online
}
