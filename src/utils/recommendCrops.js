import { crops } from '../data/crops'

// Rule-based scoring (no machine learning) so every result can be explained.
//   Season matches  -> +3  (required: a crop is only shown if it grows in that season)
//   Soil matches    -> +2
//   Water matches   -> +2
//   Region matches  -> +1
// A crop needs the season plus at least one more match to be shown.
// Highest score first. Maximum score is 8.

export const MAX_SCORE = 8

function waterLevelsFor(crop, season) {
  return crop.seasonWater?.[season] ?? crop.waterAvailability
}

export function recommendCrops({ soilType, season, waterAvailability, region }) {
  return crops
    .map((crop) => {
      const checks = {
        season: crop.seasons.includes(season),
        soil: crop.suitableSoils.includes(soilType),
        water: waterLevelsFor(crop, season).includes(waterAvailability),
        region: crop.regions.includes(region),
      }
      const score =
        (checks.season ? 3 : 0) + (checks.soil ? 2 : 0) + (checks.water ? 2 : 0) + (checks.region ? 1 : 0)
      return { crop, checks, score }
    })
    .filter(({ checks, score }) => checks.season && score >= 5)
    .sort((first, second) => second.score - first.score)
    .map(({ crop, checks, score }) => ({
      ...crop,
      checks,
      score,
      strength: score >= 7 ? 'best' : 'good',
    }))
}
