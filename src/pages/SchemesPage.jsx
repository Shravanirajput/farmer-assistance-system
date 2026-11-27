import { useEffect, useMemo, useRef, useState } from 'react'
import { ChoiceGroup, TextField } from '../components/Form'
import Icon from '../components/Icons'
import PageHeader from '../components/PageHeader'
import { schemes, SCHEMES_VERIFIED_ON } from '../data/schemes'
import { useLanguage } from '../i18n/LanguageContext'
import { formatDate } from '../utils/format'
import { hrefFor, navigate } from '../utils/router'
import { findSchemes } from '../utils/schemeFinder'

const DOCS_KEY = 'farmerAssistanceSchemeDocs'
const NEED_OPTIONS = [
  'income-support', 'insurance', 'credit', 'irrigation', 'solar-energy', 'electricity', 'machinery',
  'pension', 'organic-farming', 'horticulture', 'accident-cover', 'market-access', 'infrastructure', 'soil-health',
  'climate-resilience',
]
const emptyAnswers = { state: 'mh', ownsLand: '', land: '', age: '', category: '', needs: [] }

function readDocs() {
  try {
    return JSON.parse(window.localStorage.getItem(DOCS_KEY)) ?? {}
  } catch {
    return {}
  }
}

function LevelBadge({ level }) {
  const { t } = useLanguage()
  return (
    <span className={`level level-${level}`}>
      {level === 'central' ? t('schemes.levelShortCentral') : t('schemes.levelShortState')}
    </span>
  )
}

function SchemeCard({ scheme, reasons }) {
  const { t, tx } = useLanguage()
  return (
    <li className="scheme-card">
      <a href={hrefFor('schemes', scheme.id)}>
        <span className="scheme-card-top">
          <LevelBadge level={scheme.level} />
          <span className="scheme-type">{t(`schemes.needs.${scheme.category}`)}</span>
        </span>
        <span className="scheme-card-name">{tx(scheme.name)}</span>
        <span className="scheme-card-benefit">{tx(scheme.headline)}</span>
        {reasons && (
          <span className="scheme-reasons">
            {reasons.slice(0, 3).map((reason) => (
              <span key={reason.key}>
                <Icon name="check" size={14} strokeWidth={2.6} />
                {reason.key === 'need'
                  ? t('schemes.reasons.need', { need: t(`schemes.needs.${reason.need}`) })
                  : t(`schemes.reasons.${reason.key}`, reason.vars)}
              </span>
            ))}
          </span>
        )}
        <span className="scheme-card-more">
          {t('disease.viewDetails')} <Icon name="arrowRight" size={18} />
        </span>
      </a>
    </li>
  )
}

function Finder() {
  const { t } = useLanguage()
  const [answers, setAnswers] = useState(emptyAnswers)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')
  const resultsRef = useRef(null)

  function set(field, value) {
    setAnswers((current) => ({ ...current, [field]: value }))
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const age = Number(answers.age)
    const missing = !answers.ownsLand || (answers.ownsLand === 'yes' && !answers.land) || !answers.category
    if (missing) {
      setError(t('schemes.finder.incomplete'))
      return
    }
    if (!Number.isInteger(age) || age < 18 || age > 100) {
      setError(t('schemes.finder.ageError'))
      return
    }
    setResults(findSchemes(schemes, answers))
    requestAnimationFrame(() => resultsRef.current?.focus())
  }

  function reset() {
    setAnswers(emptyAnswers)
    setResults(null)
    setError('')
  }

  const option = (value, label) => ({ value, label })

  return (
    <section className="panel finder" aria-labelledby="finder-title">
      <h2 id="finder-title" className="panel-title">{t('schemes.finder.title')}</h2>
      <p>{t('schemes.finder.text')}</p>
      <form onSubmit={handleSubmit} noValidate>
        <ChoiceGroup legend={t('schemes.finder.state')} name="state" value={answers.state} onChange={(value) => set('state', value)} className="choices-2"
          options={[option('mh', t('schemes.finder.stateMh')), option('other', t('schemes.finder.stateOther'))]} />
        <ChoiceGroup legend={t('schemes.finder.ownsLand')} name="ownsLand" value={answers.ownsLand} onChange={(value) => set('ownsLand', value)} className="choices-2"
          options={[option('yes', t('schemes.finder.ownsLandYes')), option('no', t('schemes.finder.ownsLandNo'))]} />
        {answers.ownsLand === 'yes' && (
          <ChoiceGroup legend={t('schemes.finder.land')} name="land" value={answers.land} onChange={(value) => set('land', value)} className="choices-3"
            options={[option('small', t('schemes.finder.landSmall')), option('medium', t('schemes.finder.landMedium')), option('large', t('schemes.finder.landLarge'))]} />
        )}
        <div className="finder-row">
          <TextField label={t('schemes.finder.age')} name="age" type="number" inputMode="numeric" min={18} max={100} value={answers.age} placeholder={t('schemes.finder.agePlaceholder')} onChange={(event) => set('age', event.target.value)} className="age-field" />
          <ChoiceGroup legend={t('schemes.finder.category')} name="category" value={answers.category} onChange={(value) => set('category', value)} className="choices-4 compact"
            options={['General', 'OBC', 'SC', 'ST'].map((value) => option(value, t(`schemes.finder.categories.${value}`)))} />
        </div>
        <ChoiceGroup legend={t('schemes.finder.needs')} name="needs" multiple value={answers.needs} onChange={(value) => set('needs', value)} className="choices-needs compact"
          options={NEED_OPTIONS.map((value) => option(value, t(`schemes.needs.${value}`)))} />
        {error && (
          <p className="form-error" role="alert">
            <Icon name="info" size={20} /> {error}
          </p>
        )}
        <div className="form-actions">
          <button className="button button-primary button-large" type="submit">
            <Icon name="search" size={20} /> {t('schemes.finder.submit')}
          </button>
          {results && (
            <button className="button button-ghost" type="button" onClick={reset}>
              {t('schemes.finder.reset')}
            </button>
          )}
        </div>
      </form>

      {results && (
        <div className="finder-results" ref={resultsRef} tabIndex={-1} aria-live="polite">
          {results.matched.length === 0 && results.others.length === 0 && <p className="empty-note">{t('schemes.results.none')}</p>}
          {results.matched.length > 0 && (
            <>
              <h3>{t('schemes.results.matchTitle')} <small>{t('schemes.results.count', { count: results.matched.length })}</small></h3>
              <ul className="scheme-grid">
                {results.matched.map(({ scheme, reasons }) => <SchemeCard key={scheme.id} scheme={scheme} reasons={reasons} />)}
              </ul>
            </>
          )}
          {results.others.length > 0 && (
            <>
              <h3>{t('schemes.results.eligibleTitle')} <small>{t('schemes.results.count', { count: results.others.length })}</small></h3>
              <ul className="scheme-grid">
                {results.others.map(({ scheme, reasons }) => <SchemeCard key={scheme.id} scheme={scheme} reasons={reasons} />)}
              </ul>
            </>
          )}
          <p className="muted small">{t('schemes.results.checkWith')}</p>
        </div>
      )}
    </section>
  )
}

function Browse() {
  const { t, locale } = useLanguage()
  const [level, setLevel] = useState('all')
  const [category, setCategory] = useState('')
  const [query, setQuery] = useState('')
  const categories = useMemo(() => [...new Set(schemes.map((scheme) => scheme.category))], [])
  const search = query.trim().toLowerCase()
  const filtered = schemes.filter((scheme) => {
    const text = [scheme.name.en, scheme.name.mr, scheme.shortName, scheme.headline.en, scheme.headline.mr].join(' ').toLowerCase()
    return (level === 'all' || scheme.level === level) && (!category || scheme.category === category) && (!search || text.includes(search))
  })

  return (
    <section className="browse" aria-labelledby="browse-title">
      <h2 id="browse-title" className="section-title">{t('schemes.browseTitle')}</h2>
      <div className="panel browse-filters">
        <div className="filter-chips" role="group" aria-label={t('schemes.browseTitle')}>
          {[['all', t('schemes.levelAll')], ['central', t('schemes.levelCentral')], ['maharashtra', t('schemes.levelState')]].map(([value, label]) => (
            <button key={value} type="button" aria-pressed={level === value} onClick={() => setLevel(value)}>{label}</button>
          ))}
        </div>
        <div className="browse-row">
          <div className="field">
            <label htmlFor="scheme-category">{t('schemes.categoryFilter')}</label>
            <select id="scheme-category" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="">{t('common.all')}</option>
              {categories.map((value) => <option key={value} value={value}>{t(`schemes.needs.${value}`)}</option>)}
            </select>
          </div>
          <div className="field search-field">
            <label htmlFor="scheme-search">{t('common.search')}</label>
            <div className="input-with-icon">
              <Icon name="search" size={20} />
              <input id="scheme-search" type="search" value={query} placeholder={t('schemes.searchPlaceholder')} onChange={(event) => setQuery(event.target.value)} />
            </div>
          </div>
        </div>
      </div>
      {filtered.length === 0 ? (
        <p className="empty-note">{t('schemes.noResults')}</p>
      ) : (
        <ul className="scheme-grid">
          {filtered.map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} />)}
        </ul>
      )}
      <p className="muted small">{t('schemes.verifiedNote', { date: formatDate(SCHEMES_VERIFIED_ON, locale) })}</p>
    </section>
  )
}

function SchemeDetail({ scheme }) {
  const { t, tx, locale } = useLanguage()
  const [docs, setDocs] = useState(() => readDocs()[scheme.id] ?? [])
  const headingRef = useRef(null)
  useEffect(() => headingRef.current?.focus(), [])

  function toggleDoc(index) {
    const next = docs.includes(index) ? docs.filter((item) => item !== index) : [...docs, index]
    setDocs(next)
    try {
      window.localStorage.setItem(DOCS_KEY, JSON.stringify({ ...readDocs(), [scheme.id]: next }))
    } catch {
      // Saving is optional.
    }
  }

  const section = (key, items, icon) =>
    items?.length > 0 && (
      <section className="scheme-section">
        <h3><Icon name={icon} size={20} /> {t(`schemes.detail.${key}`)}</h3>
        <ul>
          {items.map((item) => <li key={item.en}>{tx(item)}</li>)}
        </ul>
      </section>
    )

  return (
    <article className="scheme-detail">
      <button className="button button-ghost" type="button" onClick={() => navigate('schemes')}>
        <Icon name="arrowLeft" size={18} /> {t('schemes.detail.backToList')}
      </button>
      <header className="scheme-detail-head">
        <div className="scheme-card-top">
          <LevelBadge level={scheme.level} />
          <span className="scheme-type">{t(`schemes.needs.${scheme.category}`)}</span>
          {scheme.launchYear && <span className="scheme-type">{t('schemes.detail.launched', { year: scheme.launchYear })}</span>}
        </div>
        <h2 ref={headingRef} tabIndex={-1}>{tx(scheme.name)}</h2>
        <p className="muted">{tx(scheme.department)}</p>
        <p className="scheme-headline">{tx(scheme.headline)}</p>
      </header>

      <div className="scheme-columns">
        <div>
          {section('benefits', scheme.benefits, 'rupee')}
          {section('eligibility', scheme.eligibility, 'user')}
          {section('exclusions', scheme.exclusions, 'cross')}
          {scheme.howToApply?.length > 0 && (
            <section className="scheme-section">
              <h3><Icon name="clipboard" size={20} /> {t('schemes.detail.howToApply')}</h3>
              <ol className="steps">
                {scheme.howToApply.map((step) => <li key={step.en}>{tx(step)}</li>)}
              </ol>
            </section>
          )}
        </div>
        <aside className="scheme-aside">
          {scheme.documents?.length > 0 && (
            <section className="doc-checklist">
              <h3>{t('schemes.detail.documents')}</h3>
              <p className="muted small">{t('schemes.detail.documentsHint')}</p>
              <ul>
                {scheme.documents.map((doc, index) => (
                  <li key={doc.en}>
                    <label>
                      <input type="checkbox" checked={docs.includes(index)} onChange={() => toggleDoc(index)} />
                      <span>{tx(doc)}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <a className="button button-primary button-block" href={scheme.officialUrl} target="_blank" rel="noreferrer">
            {t('schemes.detail.apply')} <Icon name="external" size={18} />
          </a>
          {scheme.helpline && (
            <p className="scheme-helpline">
              <Icon name="phone" size={18} /> {t('schemes.detail.helpline')}: <strong>{scheme.helpline}</strong>
            </p>
          )}
          {scheme.status && (
            <p className="scheme-status">
              <strong>{t('schemes.detail.status')}:</strong> {tx(scheme.status)}
            </p>
          )}
          <div className="scheme-sources">
            <h4>{t('schemes.detail.sources')}</h4>
            <ul>
              {scheme.sources.map((url) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noreferrer">{new URL(url).hostname.replace(/^www\./, '')}</a>
                </li>
              ))}
            </ul>
            <p className="muted small">{t('schemes.detail.lastChecked', { date: formatDate(scheme.verifiedOn, locale) })}</p>
          </div>
        </aside>
      </div>
    </article>
  )
}

export default function SchemesPage({ param }) {
  const { t } = useLanguage()
  const scheme = schemes.find((item) => item.id === param)

  return (
    <>
      <PageHeader icon="scroll" title={t('schemes.title')} intro={t('schemes.intro')} />
      <div className="page-body">
        {scheme ? (
          <SchemeDetail key={scheme.id} scheme={scheme} />
        ) : (
          <>
            <aside className="before-apply">
              <h2>{t('schemes.beforeTitle')}</h2>
              <ul>
                <li>
                  <Icon name="user" size={20} />
                  <span>
                    {t('schemes.before.farmerId')}{' '}
                    <a href="https://mhfr.agristack.gov.in/farmer-registry-mh" target="_blank" rel="noreferrer">
                      {t('schemes.before.farmerIdLink')}
                    </a>
                  </span>
                </li>
                <li>
                  <Icon name="clipboard" size={20} />
                  <span>
                    {t('schemes.before.mahadbt')}{' '}
                    <a href="https://mahadbt.maharashtra.gov.in/Farmer/Login/Login" target="_blank" rel="noreferrer">
                      {t('schemes.before.mahadbtLink')}
                    </a>
                  </span>
                </li>
                <li><Icon name="rupee" size={20} /> <span>{t('schemes.before.aadhaar')}</span></li>
                <li><Icon name="shield" size={20} /> <span>{t('schemes.before.official')}</span></li>
              </ul>
            </aside>
            <Finder />
            <Browse />
          </>
        )}
      </div>
    </>
  )
}
