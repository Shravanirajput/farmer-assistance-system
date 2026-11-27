// Connects AGMARKNET commodity names (as they appear in the mandi data) to our crops,
// and gives Marathi names for common commodities and Maharashtra districts.
// AGMARKNET uses names like "Soyabean" or "Arhar (Tur/Red Gram)(Whole)", so we match
// on lowercase text patterns instead of exact names.

// Only the raw crop as the farmer sells it is matched, so it can be compared with MSP:
// "Paddy" (not milled "Rice"), "Groundnut" pods (not "Ground Nut Seed" kernels),
// and never processed goods like "Arhar Dal" or "Wheat Atta".
export const cropCommodityPatterns = {
  soybean: ['soyabean', 'soybean'],
  cotton: ['cotton'],
  tur: ['arhar'],
  jowar: ['jowar'],
  chickpea: ['bengal gram', 'kabuli chana'],
  wheat: ['wheat'],
  safflower: ['safflower'],
  rice: ['paddy'],
  nachni: ['ragi'],
  bajra: ['bajra'],
  maize: ['maize'],
  groundnut: ['groundnut'],
  moong: ['green gram', 'moong'],
  urad: ['black gram', 'urd'],
  onion: ['onion'],
  sugarcane: ['sugarcane'],
  sunflower: ['sunflower'],
  watermelon: ['water melon', 'watermelon'],
}

const PROCESSED_WORDS = ['dal', 'atta', 'flour', 'oil', 'cake']
// Extra words that mean "not the raw crop" for particular crops.
const NOT_RAW = { cotton: ['seed'], groundnut: ['seed'], onion: ['green'] }

export function cropIdForCommodity(commodity) {
  const name = commodity.toLowerCase()
  // Green and black gram must be checked before Bengal gram.
  const order = ['moong', 'urad', ...Object.keys(cropCommodityPatterns).filter((id) => id !== 'moong' && id !== 'urad')]
  const cropId = order.find((id) => cropCommodityPatterns[id].some((pattern) => name.includes(pattern))) ?? null
  if (!cropId) return null
  const words = name.split(/[^a-z]+/)
  const blocked = [...PROCESSED_WORDS, ...(NOT_RAW[cropId] ?? [])]
  return blocked.some((word) => words.includes(word)) ? null : cropId
}

export function commodityMatchesCrop(commodity, cropId) {
  return cropIdForCommodity(commodity) === cropId
}

// Marathi names for commodities that commonly appear in Maharashtra mandis.
const commodityMarathi = [
  ['soyabean', 'सोयाबीन'],
  ['cotton', 'कापूस'],
  ['arhar', 'तूर'],
  ['jowar', 'ज्वारी'],
  ['bengal gram', 'हरभरा'],
  ['kabuli chana', 'काबुली हरभरा'],
  ['green gram', 'मूग'],
  ['black gram', 'उडीद'],
  ['wheat', 'गहू'],
  ['safflower', 'करडई'],
  ['paddy', 'भात'],
  ['rice', 'तांदूळ'],
  ['ragi', 'नाचणी'],
  ['bajra', 'बाजरी'],
  ['maize', 'मका'],
  ['ground nut', 'भुईमूग शेंग'],
  ['groundnut', 'भुईमूग'],
  ['onion', 'कांदा'],
  ['potato', 'बटाटा'],
  ['tomato', 'टोमॅटो'],
  ['brinjal', 'वांगी'],
  ['cabbage', 'कोबी'],
  ['cauliflower', 'फ्लॉवर'],
  ['green chilli', 'हिरवी मिरची'],
  ['dry chillies', 'लाल मिरची'],
  ['garlic', 'लसूण'],
  ['ginger', 'आले'],
  ['coriander', 'कोथिंबीर'],
  ['methi', 'मेथी'],
  ['spinach', 'पालक'],
  ['carrot', 'गाजर'],
  ['cucumbar', 'काकडी'],
  ['cucumber', 'काकडी'],
  ['bhindi', 'भेंडी'],
  ['ladies finger', 'भेंडी'],
  ['bitter gourd', 'कारले'],
  ['bottle gourd', 'दुधी भोपळा'],
  ['pumpkin', 'भोपळा'],
  ['cluster beans', 'गवार'],
  ['beans', 'घेवडा'],
  ['peas', 'वाटाणा'],
  ['drumstick', 'शेवगा'],
  ['lemon', 'लिंबू'],
  ['banana', 'केळी'],
  ['pomegranate', 'डाळिंब'],
  ['grapes', 'द्राक्षे'],
  ['mango', 'आंबा'],
  ['orange', 'संत्री'],
  ['papaya', 'पपई'],
  ['guava', 'पेरू'],
  ['water melon', 'कलिंगड'],
  ['sweet lime', 'मोसंबी'],
  ['pineapple', 'अननस'],
  ['apple', 'सफरचंद'],
  ['sugarcane', 'ऊस'],
  ['sunflower', 'सूर्यफूल'],
  ['sesamum', 'तीळ'],
  ['mustard', 'मोहरी'],
  ['turmeric', 'हळद'],
  ['jaggery', 'गूळ'],
  ['gur', 'गूळ'],
  ['lentil', 'मसूर'],
  ['masur', 'मसूर'],
  ['moath', 'मटकी'],
  ['math', 'मटकी'],
  ['horse gram', 'कुळीथ'],
  ['cowpea', 'चवळी'],
  ['castor', 'एरंडी'],
  ['linseed', 'जवस'],
  ['niger', 'कारळे'],
  ['sweet potato', 'रताळे'],
  ['tamarind', 'चिंच'],
  ['coconut', 'नारळ'],
  ['cashew', 'काजू'],
  ['fodder', 'चारा'],
  ['onion green', 'कांद्याची पात'],
  ['capsicum', 'ढोबळी मिरची'],
  ['guar', 'गवार'],
  ['ridgeguard', 'दोडका'],
  ['ridge gourd', 'दोडका'],
  ['french beans', 'फरसबी'],
  ['elephant yam', 'सुरण'],
  ['sweet pumpkin', 'लाल भोपळा'],
  ['mint', 'पुदिना'],
  ['pointed gourd', 'परवल'],
  ['little gourd', 'तोंडली'],
  ['beetroot', 'बीट'],
  ['raddish', 'मुळा'],
  ['radish', 'मुळा'],
  ['chikoo', 'चिकू'],
  ['sapota', 'चिकू'],
  ['mousambi', 'मोसंबी'],
  ['lime', 'लिंबू'],
  ['banana - green', 'कच्ची केळी'],
]

// Longer patterns are more specific ("sweet potato" before "potato"), so try them first.
const commodityMarathiByLength = [...commodityMarathi].sort((first, second) => second[0].length - first[0].length)

export function commodityNameMr(commodity) {
  const name = commodity.toLowerCase()
  const match = commodityMarathiByLength.find(([pattern]) => name.includes(pattern))
  return match ? match[1] : commodity
}

const districtMarathi = {
  ahmednagar: 'अहिल्यानगर',
  ahilyanagar: 'अहिल्यानगर',
  akola: 'अकोला',
  amravati: 'अमरावती',
  amarawati: 'अमरावती',
  aurangabad: 'छत्रपती संभाजीनगर',
  'chhatrapati sambhajinagar': 'छत्रपती संभाजीनगर',
  beed: 'बीड',
  bhandara: 'भंडारा',
  buldhana: 'बुलढाणा',
  chandrapur: 'चंद्रपूर',
  dharashiv: 'धाराशिव',
  osmanabad: 'धाराशिव',
  dhule: 'धुळे',
  gadchiroli: 'गडचिरोली',
  gondia: 'गोंदिया',
  hingoli: 'हिंगोली',
  jalgaon: 'जळगाव',
  jalna: 'जालना',
  kolhapur: 'कोल्हापूर',
  latur: 'लातूर',
  mumbai: 'मुंबई',
  'mumbai suburban': 'मुंबई उपनगर',
  nagpur: 'नागपूर',
  nanded: 'नांदेड',
  nandurbar: 'नंदुरबार',
  nashik: 'नाशिक',
  palghar: 'पालघर',
  parbhani: 'परभणी',
  pune: 'पुणे',
  raigad: 'रायगड',
  ratnagiri: 'रत्नागिरी',
  sangli: 'सांगली',
  satara: 'सातारा',
  sindhudurg: 'सिंधुदुर्ग',
  solapur: 'सोलापूर',
  thane: 'ठाणे',
  wardha: 'वर्धा',
  washim: 'वाशिम',
  yavatmal: 'यवतमाळ',
}

export function districtNameMr(district) {
  return districtMarathi[district.trim().toLowerCase()] ?? district
}

// State names exactly as the data.gov.in mandi dataset spells them (checked 26 Nov 2026).
// The dataset writes "Chattisgarh", so we query with that and display the correct spelling.
export const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chattisgarh', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal',
]
export const STATE_LABELS = { Chattisgarh: 'Chhattisgarh' }
