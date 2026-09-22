import { crops } from '../data/crops'

export const noMatchMessage = 'No close matches were found for these conditions. Try another combination or consult a local agricultural expert.'

export function recommendCrops({ soilType, season, state, waterAvailability }) {
  const scoredCrops = crops
    .map((crop) => {
      let score = 0

      if (crop.state === state) score += 1
      if (crop.seasons.includes(season)) score += 2
      if (crop.suitableSoils.includes(soilType)) score += 2
      if (crop.waterAvailability.includes(waterAvailability)) score += 1

      return { crop, score }
    })
    // State and season establish the reasonable match; soil and water refine it.
    .filter(({ crop, score }) => crop.state === state && crop.seasons.includes(season) && score >= 3)
    .sort((first, second) => second.score - first.score)

  return scoredCrops.map(({ crop }) => ({
    ...crop,
    whyItMatches: buildMatchExplanation(crop, { soilType, season, state, waterAvailability }),
  }))
}

function buildMatchExplanation(crop, selections) {
  const matchedDetails = []

  if (crop.seasons.includes(selections.season)) {
    matchedDetails.push(`the selected ${selections.season} season`)
  }

  if (crop.suitableSoils.includes(selections.soilType)) {
    matchedDetails.push(selections.soilType.toLowerCase())
  }

  if (crop.waterAvailability.includes(selections.waterAvailability)) {
    matchedDetails.push(`${selections.waterAvailability.toLowerCase()} water availability`)
  }

  if (matchedDetails.length === 0) {
    return 'Matches the selected state in this prototype dataset.'
  }

  if (matchedDetails.length === 1) {
    return `Matches ${matchedDetails[0]}.`
  }

  const lastDetail = matchedDetails.pop()
  return `Matches ${matchedDetails.join(', ')} and ${lastDetail}.`
}
