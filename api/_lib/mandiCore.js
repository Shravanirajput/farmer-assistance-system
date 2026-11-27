// Fetches today's APMC mandi prices from the Government of India Open Data Platform.
// Dataset: "Current Daily Price of Various Commodities from Various Markets (Mandi)"
// Published by: Ministry of Agriculture and Farmers Welfare (data comes from AGMARKNET).
// Docs: https://data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi
//
// The API key is read on the server only (DATA_GOV_API_KEY), so it never reaches the browser.
// Prices are in ₹ per quintal (100 kg).

export const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070'
const API_BASE = `https://api.data.gov.in/resource/${RESOURCE_ID}`
const PAGE_SIZE = 1000
const MAX_PAGES = 4
const CACHE_MS = 15 * 60 * 1000

const cache = new Map()

// Only allow simple text in filters (letters, digits, spaces and a few symbols used in names).
function cleanFilter(value) {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim().slice(0, 80)
  return /^[\p{L}\p{N} ().,&/'-]*$/u.test(trimmed) ? trimmed : ''
}

// "26/11/2026" -> "2026-11-26"
function toISODate(value) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value ?? '')
  return match ? `${match[3]}-${match[2]}-${match[1]}` : value ?? null
}

function toNumber(value) {
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

export function normaliseRecord(record) {
  const text = (value) => String(value ?? '').replace(/\s+/g, ' ').trim()
  return {
    state: text(record.state),
    district: text(record.district),
    market: text(record.market),
    commodity: text(record.commodity),
    variety: text(record.variety),
    grade: text(record.grade),
    date: toISODate(record.arrival_date),
    min: toNumber(record.min_price),
    max: toNumber(record.max_price),
    modal: toNumber(record.modal_price),
  }
}

function buildUrl(apiKey, filters, offset) {
  const url = new URL(API_BASE)
  url.searchParams.set('api-key', apiKey)
  url.searchParams.set('format', 'json')
  url.searchParams.set('limit', String(PAGE_SIZE))
  url.searchParams.set('offset', String(offset))
  for (const [field, value] of Object.entries(filters)) {
    if (value) url.searchParams.set(`filters[${field}]`, value)
  }
  return url
}

async function fetchPage(apiKey, filters, offset) {
  const response = await fetch(buildUrl(apiKey, filters, offset), {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  })
  if (response.status === 429) throw Object.assign(new Error('rate_limited'), { code: 'rate_limited' })
  if (response.status === 401 || response.status === 403) {
    throw Object.assign(new Error('invalid_key'), { code: 'invalid_key' })
  }
  if (!response.ok) throw Object.assign(new Error(`upstream_${response.status}`), { code: 'upstream_error' })
  return response.json()
}

export async function getMandiPrices(query, apiKey) {
  if (!apiKey) {
    return { status: 503, body: { error: 'missing_key', message: 'DATA_GOV_API_KEY is not set on the server.' } }
  }

  const filters = {
    'state.keyword': cleanFilter(query.state) || 'Maharashtra',
    'district': cleanFilter(query.district),
    'commodity': cleanFilter(query.commodity),
  }
  const cacheKey = JSON.stringify(filters)
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.time < CACHE_MS) {
    return { status: 200, body: { ...cached.body, cached: true } }
  }

  try {
    const first = await fetchPage(apiKey, filters, 0)
    const total = Number(first.total) || 0
    let records = first.records ?? []

    const pagesNeeded = Math.min(Math.ceil(total / PAGE_SIZE), MAX_PAGES)
    if (pagesNeeded > 1) {
      const offsets = Array.from({ length: pagesNeeded - 1 }, (_, index) => (index + 1) * PAGE_SIZE)
      const pages = await Promise.all(offsets.map((offset) => fetchPage(apiKey, filters, offset)))
      records = records.concat(...pages.map((page) => page.records ?? []))
    }

    const body = {
      source: 'AGMARKNET via data.gov.in (Ministry of Agriculture & Farmers Welfare)',
      sourceUrl: 'https://data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi',
      updated: first.updated_date ?? null,
      fetchedAt: new Date().toISOString(),
      total,
      records: records.map(normaliseRecord).filter((record) => record.modal != null),
    }
    cache.set(cacheKey, { time: Date.now(), body })
    return { status: 200, body }
  } catch (error) {
    // Shows up in Vercel's function logs (never includes the API key).
    console.error('[mandi] data.gov.in request failed:', error.name, error.message, error.cause?.code ?? '')
    const code = error.code ?? (error.name === 'TimeoutError' ? 'timeout' : 'upstream_error')
    return { status: 502, body: { error: code, message: 'Could not load prices from data.gov.in right now.' } }
  }
}
