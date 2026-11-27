// Checks that English and Marathi have exactly the same interface keys,
// and that every bilingual value in the data files has both languages.
// Run: npm run check:i18n

import en from '../src/i18n/en.js'
import mr from '../src/i18n/mr.js'
import { crops } from '../src/data/crops.js'
import { diseaseCrops, diseases } from '../src/data/diseases.js'
import { equipment, equipmentCategories } from '../src/data/equipment.js'
import { mspSeasons } from '../src/data/msp.js'
import { schemes } from '../src/data/schemes.js'

function flatten(object, prefix = '') {
  return Object.entries(object).flatMap(([key, value]) =>
    value && typeof value === 'object' ? flatten(value, `${prefix}${key}.`) : [`${prefix}${key}`],
  )
}

const problems = []
const enKeys = new Set(flatten(en))
const mrKeys = new Set(flatten(mr))
for (const key of enKeys) if (!mrKeys.has(key)) problems.push(`mr.js is missing: ${key}`)
for (const key of mrKeys) if (!enKeys.has(key)) problems.push(`en.js is missing: ${key}`)

// Placeholders like {count} must match in both languages.
for (const key of enKeys) {
  const read = (dictionary) => key.split('.').reduce((node, part) => node?.[part], dictionary)
  const vars = (text) => (typeof text === 'string' ? (text.match(/\{\w+\}/g) ?? []).sort().join(',') : '')
  if (mrKeys.has(key) && vars(read(en)) !== vars(read(mr))) problems.push(`placeholders differ: ${key}`)
}

// Every { en, mr } object in the data must have non-empty text for both.
function checkBilingual(value, path) {
  if (Array.isArray(value)) return value.forEach((item, index) => checkBilingual(item, `${path}[${index}]`))
  if (!value || typeof value !== 'object') return
  const keys = Object.keys(value)
  if (keys.includes('en') || keys.includes('mr')) {
    if (!value.en?.trim?.()) problems.push(`${path}: missing English`)
    if (!value.mr?.trim?.()) problems.push(`${path}: missing Marathi`)
    return
  }
  for (const [key, child] of Object.entries(value)) checkBilingual(child, `${path}.${key}`)
}

checkBilingual(crops, 'crops')
checkBilingual(diseaseCrops, 'diseaseCrops')
checkBilingual(diseases, 'diseases')
checkBilingual(equipment, 'equipment')
checkBilingual(equipmentCategories, 'equipmentCategories')
checkBilingual(mspSeasons, 'msp')
checkBilingual(schemes, 'schemes')

if (problems.length) {
  console.error(`✗ ${problems.length} translation problems:\n  ${problems.join('\n  ')}`)
  process.exit(1)
}
console.log(`✓ Translations complete: ${enKeys.size} interface keys in English and Marathi; all data is bilingual.`)
