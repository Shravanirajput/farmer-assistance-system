// Minimum Support Prices (₹ per quintal), as notified by the Government of India.
// Kharif Marketing Season 2026-27 — CCEA decision, PIB release dated 13 May 2026:
//   https://www.pib.gov.in/PressReleasePage.aspx?PRID=2260617
// Rabi Marketing Season 2027-28 — CCEA decision, PIB release dated 30 Sep 2026:
//   https://www.pib.gov.in/PressReleasePage.aspx?PRID=2316941
// `id` links a row to crops.js (mspId). Where a crop has two grades, the first is used for comparisons.

export const mspSeasons = {
  kharif: {
    season: '2026-27',
    releaseDate: '2026-05-13',
    sourceUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2260617',
    crops: [
      { id: 'paddy', name: { en: 'Paddy (Common)', mr: 'भात (सामान्य)' }, msp: 2441, previous: 2369 },
      { id: 'paddy-a', name: { en: 'Paddy (Grade A)', mr: 'भात (ग्रेड A)' }, msp: 2461, previous: 2389 },
      { id: 'jowar', name: { en: 'Jowar (Hybrid)', mr: 'ज्वारी (संकरित)' }, msp: 4023, previous: 3699 },
      { id: 'jowar-maldandi', name: { en: 'Jowar (Maldandi)', mr: 'ज्वारी (मालदांडी)' }, msp: 4073, previous: 3749 },
      { id: 'bajra', name: { en: 'Bajra', mr: 'बाजरी' }, msp: 2900, previous: 2775 },
      { id: 'ragi', name: { en: 'Ragi / Nachni', mr: 'नाचणी' }, msp: 5205, previous: 4886 },
      { id: 'maize', name: { en: 'Maize', mr: 'मका' }, msp: 2410, previous: 2400 },
      { id: 'tur', name: { en: 'Tur / Arhar', mr: 'तूर' }, msp: 8450, previous: 8000 },
      { id: 'moong', name: { en: 'Moong', mr: 'मूग' }, msp: 8780, previous: 8768 },
      { id: 'urad', name: { en: 'Urad', mr: 'उडीद' }, msp: 8200, previous: 7800 },
      { id: 'groundnut', name: { en: 'Groundnut', mr: 'भुईमूग' }, msp: 7517, previous: 7263 },
      { id: 'sunflower', name: { en: 'Sunflower seed', mr: 'सूर्यफूल' }, msp: 8343, previous: 7721 },
      { id: 'soybean', name: { en: 'Soybean (Yellow)', mr: 'सोयाबीन (पिवळे)' }, msp: 5708, previous: 5328 },
      { id: 'sesamum', name: { en: 'Sesamum', mr: 'तीळ' }, msp: 10346, previous: 9846 },
      { id: 'nigerseed', name: { en: 'Nigerseed', mr: 'कारळे' }, msp: 10052, previous: 9537 },
      { id: 'cotton', name: { en: 'Cotton (Medium Staple)', mr: 'कापूस (मध्यम धागा)' }, msp: 8267, previous: 7710 },
      { id: 'cotton-long', name: { en: 'Cotton (Long Staple)', mr: 'कापूस (लांब धागा)' }, msp: 8667, previous: 8110 },
    ],
  },
  rabi: {
    season: '2027-28',
    releaseDate: '2026-09-30',
    sourceUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2316941',
    crops: [
      { id: 'wheat', name: { en: 'Wheat', mr: 'गहू' }, msp: 2610, previous: 2585 },
      { id: 'barley', name: { en: 'Barley', mr: 'जव' }, msp: 2286, previous: 2150 },
      { id: 'gram', name: { en: 'Gram (Chana)', mr: 'हरभरा' }, msp: 5958, previous: 5875 },
      { id: 'masur', name: { en: 'Lentil (Masur)', mr: 'मसूर' }, msp: 7390, previous: 7000 },
      { id: 'mustard', name: { en: 'Rapeseed & Mustard', mr: 'मोहरी' }, msp: 6613, previous: 6200 },
      { id: 'safflower', name: { en: 'Safflower', mr: 'करडई' }, msp: 7215, previous: 6540 },
    ],
  },
}

// Find the MSP row (and its season) for an mspId from crops.js.
export function findMsp(mspId) {
  if (!mspId) return null
  for (const [seasonKey, season] of Object.entries(mspSeasons)) {
    const row = season.crops.find((crop) => crop.id === mspId)
    if (row) return { ...row, seasonKey, season: season.season }
  }
  return null
}
