// Rule-based scheme finder. Each scheme has simple rules (age range, land limit,
// land ownership, social category, state). A scheme is shown only if the farmer's
// answers pass every rule. Schemes whose type matches what the farmer needs come first.
// The department makes the final decision; this only narrows down the list.

// Land-size answers are ranges: small (0–1 ha], medium (1–2 ha], large (more than 2 ha).
// A scheme is excluded only when the whole range is above its limit, so a farmer with
// "more than 2 ha" is still shown a scheme with a 6 ha limit (they may have 3 ha).
const LAND_LOWER_BOUND = { small: 0, medium: 1, large: 2 }

export function findSchemes(schemes, answers) {
  const age = Number(answers.age)
  const results = []

  for (const scheme of schemes) {
    const rules = scheme.rules ?? {}
    const reasons = []

    if (scheme.level === 'maharashtra') {
      if (answers.state !== 'mh') continue
      reasons.push({ key: 'state' })
    }

    if (rules.requiresLandOwnership) {
      if (answers.ownsLand !== 'yes') continue
      reasons.push({ key: 'land' })
    } else {
      reasons.push({ key: 'noLandNeeded' })
    }

    if (rules.minAge != null || rules.maxAge != null) {
      const min = rules.minAge ?? 18
      const max = rules.maxAge ?? 100
      if (age < min || age > max) continue
      reasons.push({ key: 'age', vars: { min, max } })
    }

    if (rules.maxLandHectares != null && answers.ownsLand === 'yes') {
      if (LAND_LOWER_BOUND[answers.land] >= rules.maxLandHectares) continue
      reasons.push({ key: 'landSize', vars: { max: rules.maxLandHectares } })
    }

    if (Array.isArray(rules.socialCategories)) {
      if (!rules.socialCategories.includes(answers.category)) continue
      reasons.push({ key: 'category', vars: { category: answers.category } })
    }

    const schemeNeeds = [scheme.category, ...(scheme.alsoFor ?? [])]
    const matchedNeed = answers.needs.find((need) => schemeNeeds.includes(need))
    if (matchedNeed) reasons.push({ key: 'need', need: matchedNeed })

    // Show the most specific reasons first (they are the most useful to read).
    reasons.sort((first, second) => REASON_ORDER.indexOf(first.key) - REASON_ORDER.indexOf(second.key))
    // Schemes made for the farmer's own group rank above general ones.
    const specificity = (Array.isArray(rules.socialCategories) ? 2 : 0) + (scheme.level === 'maharashtra' ? 1 : 0)
    results.push({ scheme, reasons, matchesNeed: Boolean(matchedNeed), specificity })
  }

  const bySpecificity = (first, second) => second.specificity - first.specificity
  return {
    matched: results.filter((result) => result.matchesNeed).sort(bySpecificity),
    others: results.filter((result) => !result.matchesNeed).sort(bySpecificity),
  }
}

const REASON_ORDER = ['need', 'category', 'age', 'landSize', 'state', 'land', 'noLandNeeded']
