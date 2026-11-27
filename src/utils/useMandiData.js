import { useCallback, useEffect, useState } from 'react'
import snapshot from '../data/mandiSnapshot.json'

// Loads mandi rates from our /api/mandi function.
// If live data cannot load, falls back to the saved official snapshot (if one exists
// for that state), and says so clearly. Prices are never made up.

async function loadRates(state) {
  try {
    const response = await fetch(`/api/mandi?state=${encodeURIComponent(state)}`)
    const body = await response.json().catch(() => ({}))
    if (response.ok) return { status: 'live', records: body.records ?? [], meta: body, problem: null }
    return fallback(state, body.error === 'missing_key' ? 'setup' : 'error')
  } catch {
    return fallback(state, 'error')
  }
}

function fallback(state, problem) {
  const hasSnapshot = snapshot.records?.length > 0 && snapshot.state === state
  return hasSnapshot
    ? { status: 'snapshot', records: snapshot.records, meta: snapshot, problem }
    : { status: problem, records: [], meta: null, problem }
}

export function useMandiData(state) {
  const [attempt, setAttempt] = useState(0)
  const requestKey = `${state}#${attempt}`
  const [result, setResult] = useState({ key: null, status: 'loading', records: [], meta: null, problem: null })

  useEffect(() => {
    let cancelled = false
    loadRates(state).then((loaded) => {
      if (!cancelled) setResult({ key: requestKey, ...loaded })
    })
    return () => {
      cancelled = true
    }
  }, [state, requestKey])

  const retry = useCallback(() => setAttempt((count) => count + 1), [])
  // While a new request is running, report "loading" instead of showing old data.
  const isCurrent = result.key === requestKey
  return isCurrent
    ? { ...result, retry }
    : { status: 'loading', records: [], meta: null, problem: null, retry }
}
