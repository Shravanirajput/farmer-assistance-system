// Writes dist/sw.js (the offline service worker) after `vite build`.
// It lists the exact files of this build to save for offline use, and derives a version
// from their names, so every deployment ships a fresh service worker automatically.

import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const assets = readdirSync(resolve(dist, 'assets'))
  // Browsers use .woff2 fonts; skipping the older .woff copies halves the download.
  .filter((file) => /\.(js|css|woff2)$/.test(file))
  .map((file) => `/assets/${file}`)

const precache = [
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/maskable-512.png',
  '/icons/apple-touch-icon.png',
  ...assets,
].sort()

const version = createHash('sha256')
  .update(precache.join('\n'))
  .update(readFileSync(resolve(dist, 'index.html')))
  .digest('hex')
  .slice(0, 12)

const template = readFileSync(resolve(root, 'scripts/sw-template.js'), 'utf8')
const VERSION_LINE = "const VERSION = '__VERSION__'"
const PRECACHE_LINE = 'const PRECACHE = __PRECACHE__'
if (!template.includes(VERSION_LINE) || !template.includes(PRECACHE_LINE)) {
  throw new Error('sw-template.js is missing the VERSION or PRECACHE line')
}
const worker = template
  .replace(VERSION_LINE, `const VERSION = '${version}'`)
  .replace(PRECACHE_LINE, `const PRECACHE = ${JSON.stringify(precache, null, 2)}`)
if (/^const (VERSION|PRECACHE) = .*__/m.test(worker)) {
  throw new Error('Service worker placeholders were not filled in')
}
writeFileSync(resolve(dist, 'sw.js'), worker)
console.log(`Service worker built: version ${version}, ${precache.length} files saved for offline use`)
