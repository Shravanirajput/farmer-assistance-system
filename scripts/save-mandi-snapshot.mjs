// Saves today's official Maharashtra mandi rates to src/data/mandiSnapshot.json.
// The website shows this saved copy (clearly dated) only when live rates cannot load,
// for example if the internet is down during a presentation.
//
// Usage (PowerShell):
//   $env:DATA_GOV_API_KEY="your-key"; node scripts/save-mandi-snapshot.mjs
// Or put DATA_GOV_API_KEY in .env.local and run: npm run snapshot

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { normaliseRecord, RESOURCE_ID } from '../api/_lib/mandiCore.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SAMPLE_KEY = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b'

function keyFromEnvFile() {
  const file = resolve(root, '.env.local')
  if (!existsSync(file)) return undefined
  const line = readFileSync(file, 'utf8').split(/\r?\n/).find((row) => row.startsWith('DATA_GOV_API_KEY='))
  return line?.split('=')[1]?.trim()
}

const apiKey = process.env.DATA_GOV_API_KEY || keyFromEnvFile() || SAMPLE_KEY
const usingSample = apiKey === SAMPLE_KEY
const pageSize = usingSample ? 10 : 1000 // the public sample key returns at most 10 rows per call
const state = process.argv[2] || 'Maharashtra'

const wait = (ms) => new Promise((done) => setTimeout(done, ms))

async function fetchPage(offset) {
  const url = new URL(`https://api.data.gov.in/resource/${RESOURCE_ID}`)
  url.searchParams.set('api-key', apiKey)
  url.searchParams.set('format', 'json')
  url.searchParams.set('limit', String(pageSize))
  url.searchParams.set('offset', String(offset))
  url.searchParams.set('filters[state.keyword]', state)

  for (let attempt = 1; attempt <= 12; attempt += 1) {
    const response = await fetch(url, { signal: AbortSignal.timeout(20000) }).catch(() => null)
    if (response?.ok) return response.json()
    const reason = response ? `HTTP ${response.status}` : 'network error'
    const delay = 15000 * attempt
    console.log(`  offset ${offset}: ${reason}, retrying in ${delay / 1000}s (attempt ${attempt})`)
    await wait(delay)
  }
  throw new Error(`Gave up on offset ${offset}`)
}

console.log(`Saving ${state} mandi rates ${usingSample ? 'with the public sample key (slow)' : 'with your API key'}…`)
const first = await fetchPage(0)
const total = Number(first.total) || 0
let records = first.records ?? []
let updated = first.updated_date ?? null

while (records.length < total) {
  await wait(usingSample ? 4000 : 500)
  const page = await fetchPage(records.length)
  if (!page.records?.length) break
  records = records.concat(page.records)
  updated = page.updated_date ?? updated
  console.log(`  ${records.length} / ${total}`)
}

const snapshot = {
  state,
  source: 'AGMARKNET via data.gov.in (Ministry of Agriculture & Farmers Welfare)',
  sourceUrl: 'https://data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi',
  updated,
  fetchedAt: new Date().toISOString(),
  total,
  records: records.map(normaliseRecord).filter((record) => record.modal != null),
}

writeFileSync(resolve(root, 'src/data/mandiSnapshot.json'), `${JSON.stringify(snapshot, null, 1)}\n`)
console.log(`Saved ${snapshot.records.length} records to src/data/mandiSnapshot.json`)
