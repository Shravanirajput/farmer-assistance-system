// Vercel serverless function: GET /api/mandi?state=Maharashtra&district=Pune&commodity=Onion
// Vercel runs every file in /api as a small server function. Locally, vite.config.js
// mounts this same handler so `npm run dev` works without extra tools.
import { getMandiPrices } from './_lib/mandiCore.js'

export default async function handler(req, res) {
  const { searchParams } = new URL(req.url, 'http://localhost')
  const result = await getMandiPrices(Object.fromEntries(searchParams), process.env.DATA_GOV_API_KEY)

  res.statusCode = result.status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader(
    'Cache-Control',
    result.status === 200 ? 'public, s-maxage=900, stale-while-revalidate=3600' : 'no-store',
  )
  res.end(JSON.stringify(result.body))
}
