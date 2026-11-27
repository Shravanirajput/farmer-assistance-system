// Service worker for the installed app (template — scripts/build-sw.mjs fills in
// __VERSION__ and __PRECACHE__ after each build and writes dist/sw.js).
//
// What it does, in plain words:
// 1. When the app is installed/opened, it saves the app's own files (HTML, JS, CSS, fonts, icons)
//    so the app opens even without internet.
// 2. Pages are always fetched fresh when online; the saved copy is used only when offline.
// 3. Mandi prices (/api/...) are never saved here — the app shows its dated official snapshot instead.
// 4. Each new deployment has a new version, so old saved files are cleaned up automatically.

/* global __PRECACHE__ */

const VERSION = '__VERSION__'
const PRECACHE = __PRECACHE__
const APP_CACHE = `fa-app-${VERSION}`
const RUNTIME_CACHE = 'fa-runtime-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(APP_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('fa-app-') && key !== APP_CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

function offlinePage() {
  return new Response(
    '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<title>Offline</title><body style="font-family:system-ui;padding:2rem;background:#f2ebdc;color:#1f2a44">' +
      '<h1>You are offline · तुम्ही ऑफलाइन आहात</h1><p>This page has not been saved yet. Connect to the internet and try again.</p>' +
      '<p><a href="/">Open the app</a></p></body>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return
  if (url.pathname.startsWith('/api/')) return
  if (url.pathname.startsWith('/docs/presentation/')) return // large files: always download fresh

  // Pages: network first, saved copy when offline.
  if (request.mode === 'navigate') {
    const isApp = url.pathname === '/' || url.pathname === '/index.html'
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok && !isApp) {
            const copy = response.clone()
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy))
          }
          return response
        })
        .catch(async () => {
          if (isApp) return (await caches.match('/index.html')) ?? offlinePage()
          return (await caches.match(request, { ignoreSearch: true })) ?? offlinePage()
        }),
    )
    return
  }

  // Files (scripts, styles, fonts, images): saved copy first — their names change when their content changes.
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ??
        fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy))
          }
          return response
        }),
    ),
  )
})
