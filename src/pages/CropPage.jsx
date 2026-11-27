import { useRef, useState } from 'react'
import { ChoiceGroup } from '../components/Form'
import Icon from '../components/Icons'
import PageHeader from '../components/PageHeader'
import { REGIONS, SEASONS, SOILS, WATER_LEVELS } from '../data/crops'
import { findMsp } from '../data/msp'
import { useLanguage } from '../i18n/LanguageContext'
import { formatRupees } from '../utils/format'
import { MAX_SCORE, recommendCrops } from '../utils/recommendCrops'
import { hrefFor } from '../utils/router'

const SOIL_CLASS = {
  'Black Soil': 'soil-black',
  'Red Soil': 'soil-red',
  'Alluvial Soil': 'soil-alluvial',
  'Laterite Soil': 'soil-laterite',
}
const WATER_DROPS = { Low: 1, Moderate: 2, High: 3 }

const emptyForm = { season: '', soilType: '', waterAvailability: '', region: '' }

export default function CropPage({ param }) {
  const { t, tx, locale } = useLanguage()
  const [form, setForm] = useState(() => ({ ...emptyForm, season: SEASONS.includes(param) ? param : '' }))
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')
  const resultsRef = useRef(null)

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (Object.values(form).some((value) => !value)) {
      setResults(null)
      setError(t('crop.error'))
      return
    }
    setResults(recommendCrops(form))
    requestAnimationFrame(() => resultsRef.current?.focus())
  }

  function handleClear() {
    setForm(emptyForm)
    setResults(null)
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const seasonOptions = SEASONS.map((season) => ({
    value: season,
    label: t(`seasons.${season}.name`),
    note: t(`seasons.${season}.months`),
  }))
  const soilOptions = SOILS.map((soil) => ({
    value: soil,
    label: t(`soils.${soil}.name`),
    note: t(`soils.${soil}.note`),
    visual: <span className={`soil-swatch ${SOIL_CLASS[soil]}`} aria-hidden="true" />,
  }))
  const waterOptions = WATER_LEVELS.map((level) => ({
    value: level,
    label: t(`water.${level}.name`),
    note: t(`water.${level}.note`),
    visual: (
      <span className="water-drops" aria-hidden="true">
        {Array.from({ length: 3 }, (_, index) => (
          <Icon key={index} name="drop" size={16} className={index < WATER_DROPS[level] ? 'is-filled' : ''} />
        ))}
      </span>
    ),
  }))
  const regionOptions = REGIONS.map((region) => ({
    value: region,
    label: t(`regions.${region}.name`),
    note: t(`regions.${region}.note`),
  }))

  return (
    <>
      <PageHeader icon="sprout" title={t('crop.title')} intro={t('crop.intro')} />

      <div className="page-body">
        <form className="panel crop-form" onSubmit={handleSubmit} noValidate>
          <h2 className="panel-title">{t('crop.formTitle')}</h2>
          <ChoiceGroup legend={t('crop.seasonLabel')} name="season" options={seasonOptions} value={form.season} onChange={(value) => update('season', value)} className="choices-3" />
          <ChoiceGroup legend={t('crop.soilLabel')} name="soilType" options={soilOptions} value={form.soilType} onChange={(value) => update('soilType', value)} className="choices-4" />
          <ChoiceGroup legend={t('crop.waterLabel')} name="waterAvailability" options={waterOptions} value={form.waterAvailability} onChange={(value) => update('waterAvailability', value)} className="choices-3" />
          <ChoiceGroup legend={t('crop.regionLabel')} name="region" options={regionOptions} value={form.region} onChange={(value) => update('region', value)} className="choices-regions" />

          {error && (
            <p className="form-error" role="alert">
              <Icon name="info" size={20} /> {error}
            </p>
          )}
          <div className="form-actions">
            <button className="button button-primary button-large" type="submit">
              <Icon name="sprout" size={20} /> {t('crop.submit')}
            </button>
          </div>
        </form>

        {results !== null && (
          <section className="results" aria-labelledby="crop-results-title">
            <div className="results-head">
              <h2 id="crop-results-title" ref={resultsRef} tabIndex={-1}>
                {results.length === 0
                  ? t('crop.noMatchTitle')
                  : results.length === 1
                    ? t('crop.resultsTitleOne')
                    : t('crop.resultsTitle', { count: results.length })}
              </h2>
              <button className="button button-ghost" type="button" onClick={handleClear}>
                {t('common.startAgain')}
              </button>
            </div>

            <div className="field-summary">
              <strong>{t('crop.yourField')}:</strong>
              <span>{t(`seasons.${form.season}.name`)}</span>
              <span>{t(`soils.${form.soilType}.name`)}</span>
              <span>{t(`water.${form.waterAvailability}.name`)}</span>
              <span>{t(`regions.${form.region}.name`)}</span>
            </div>
            <p className="method-note">
              <Icon name="info" size={18} /> {t('crop.howItWorks')}
            </p>

            {results.length === 0 ? (
              <p className="empty-note">{t('crop.noMatch')}</p>
            ) : (
              <ol className="crop-results">
                {results.map((crop) => {
                  const msp = findMsp(crop.mspId)
                  return (
                    <li key={crop.id} className={`crop-card is-${crop.strength}`}>
                      <div className="crop-card-head">
                        <h3>{tx(crop.name)}</h3>
                        <span className={`badge badge-${crop.strength}`}>{t(`crop.strength.${crop.strength}`)}</span>
                      </div>
                      <p className="crop-score">{t('crop.score', { score: crop.score, max: MAX_SCORE })}</p>
                      <ul className="checks">
                        {['season', 'soil', 'water', 'region'].map((check) => (
                          <li key={check} className={crop.checks[check] ? 'is-yes' : 'is-no'}>
                            <Icon name={crop.checks[check] ? 'check' : 'cross'} size={16} strokeWidth={2.4} />
                            {crop.checks[check] ? t(`crop.checks.${check}`) : t(`crop.checkNo.${check}`)}
                          </li>
                        ))}
                      </ul>
                      <dl className="crop-facts">
                        <div>
                          <dt><Icon name="calendar" size={18} /> {t('crop.sowing')}</dt>
                          <dd>{tx(crop.sowingWindow)}</dd>
                        </div>
                        <div>
                          <dt><Icon name="sun" size={18} /> {t('crop.duration')}</dt>
                          <dd>{tx(crop.duration)}</dd>
                        </div>
                        <div>
                          <dt><Icon name="drop" size={18} /> {t('crop.waterNote')}</dt>
                          <dd>{tx(crop.waterNote)}</dd>
                        </div>
                        <div>
                          <dt><Icon name="rupee" size={18} /> {msp ? t('crop.msp', { season: msp.season }) : t('crop.mspLabel')}</dt>
                          <dd>{msp ? `${formatRupees(msp.msp, locale)} / ${t('common.perQuintal')}` : t('crop.noMsp')}</dd>
                        </div>
                      </dl>
                      <div className="crop-links">
                        {crop.diseaseCropId && (
                          <a href={hrefFor('disease', crop.diseaseCropId)}>
                            <Icon name="leafSpots" size={18} /> {t('crop.seeDiseases')}
                          </a>
                        )}
                        <a href={hrefFor('market', crop.id)}>
                          <Icon name="scale" size={18} /> {t('crop.seePrice')}
                        </a>
                      </div>
                      <p className="source-line">
                        {t('common.source')}: {tx(crop.sourceNote)}
                      </p>
                    </li>
                  )
                })}
              </ol>
            )}
          </section>
        )}
      </div>
    </>
  )
}
