// Formatting helpers that respect the chosen language.
// Digits stay in the familiar 0-9 form in both languages for easy reading of prices.

export function formatRupees(amount, locale = 'en-IN') {
  if (amount == null || Number.isNaN(Number(amount))) return '—'
  return `₹${Number(amount).toLocaleString(locale, { maximumFractionDigits: 0 })}`
}

export function formatDate(isoDate, locale = 'en-IN') {
  if (!isoDate) return '—'
  const date = isoDate.length === 10 ? new Date(`${isoDate}T00:00:00`) : new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
}

// The current Indian cropping season, worked out from today's month.
// Kharif: June–October, Rabi: November–February, Zaid (summer): March–May.
export function currentSeason(date = new Date()) {
  const month = date.getMonth() + 1
  if (month >= 6 && month <= 10) return 'Kharif'
  if (month >= 11 || month <= 2) return 'Rabi'
  return 'Zaid'
}
