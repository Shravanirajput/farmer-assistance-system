import { useMemo, useState } from 'react'
import { SelectField, TextField } from '../components/Form'
import Icon from '../components/Icons'
import PageHeader from '../components/PageHeader'
import { commodityNameMr, cropCommodityPatterns, cropIdForCommodity, districtNameMr, STATE_LABELS, STATES } from '../data/commodities'
import { crops } from '../data/crops'
import { findMsp, mspSeasons } from '../data/msp'
import { useLanguage } from '../i18n/LanguageContext'
import { formatDate, formatRupees } from '../utils/format'
import { useMandiData } from '../utils/useMandiData'

const PAGE = 40
const AGMARKNET_URL = 'https://agmarknet.gov.in'

function useNames() {
  const { language } = useLanguage()
  return {
    commodity: (name) => (language === 'mr' ? commodityNameMr(name) : name),
    district: (name) => (language === 'mr' ? districtNameMr(name) : name),
  }
}

function StatusMessage({ status, onRetry }) {
  const { t } = useLanguage()
  const isSetup = status === 'setup'
  return (
    <div className="status-panel" role="status">
      <Icon name={isSetup ? 'info' : 'refresh'} size={32} />
      <h2>{isSetup ? t('market.states.setupTitle') : t('market.states.errorTitle')}</h2>
      <p>{isSetup ? t('market.states.setupText') : t('market.states.errorText')}</p>
      <div className="form-actions">
        <a className="button button-primary" href={AGMARKNET_URL} target="_blank" rel="noreferrer">
          {t('market.states.openAgmarknet')} <Icon name="external" size={18} />
        </a>
        {!isSetup && (
          <button className="button button-ghost" type="button" onClick={onRetry}>
            {t('common.tryAgain')}
          </button>
        )}
      </div>
      {isSetup && <p className="admin-note">{t('market.states.setupAdmin')}</p>}
    </div>
  )
}

function CommodityInsight({ commodity, rows }) {
  const { t, tx, locale } = useLanguage()
  const names = useNames()
  const [quantity, setQuantity] = useState('10')

  const sorted = [...rows].sort((first, second) => second.modal - first.modal)
  const best = sorted[0]
  const lowest = sorted[sorted.length - 1]
  const average = Math.round(rows.reduce((sum, row) => sum + row.modal, 0) / rows.length)
  const cropId = cropIdForCommodity(commodity)
  const crop = crops.find((item) => item.id === cropId)
  const msp = crop ? findMsp(crop.mspId) : null
  const belowMsp = msp ? rows.filter((row) => row.modal < msp.msp).length : 0
  const qty = Math.max(0, Number(quantity) || 0)
  const displayName = names.commodity(commodity)

  return (
    <section className="insight" aria-labelledby="insight-title">
      <h2 id="insight-title">{t('market.insight.title', { commodity: displayName })}</h2>
      <p className="muted">{t('market.insight.markets', { count: rows.length })}</p>
      <div className="insight-stats">
        <div className="stat stat-best">
          <span>{t('market.insight.best')}</span>
          <strong>{formatRupees(best.modal, locale)}</strong>
          <small>{best.market}</small>
        </div>
        <div className="stat">
          <span>{t('market.insight.average')}</span>
          <strong>{formatRupees(average, locale)}</strong>
          <small>{t('common.perQuintal')}</small>
        </div>
        <div className="stat">
          <span>{t('market.insight.lowest')}</span>
          <strong>{formatRupees(lowest.modal, locale)}</strong>
          <small>{lowest.market}</small>
        </div>
      </div>

      {msp && (
        <p className={`msp-compare ${belowMsp > 0 ? 'is-below' : 'is-above'}`}>
          <Icon name={belowMsp > 0 ? 'info' : 'check'} size={20} />
          <span>
            <strong>
              {belowMsp > 0 ? t('market.insight.belowMsp', { count: belowMsp }) : t('market.insight.aboveMsp')}
            </strong>{' '}
            {belowMsp > 0 &&
              t('market.insight.belowMspText', { commodity: tx(crop.name), msp: `${formatRupees(msp.msp, locale)} ${t('common.perQuintal')}` })}
          </span>
        </p>
      )}

      <div className="calculator">
        <h3>{t('market.calc.title')}</h3>
        <TextField
          label={t('market.calc.quantity')}
          name="quantity"
          type="number"
          min={0}
          step="0.5"
          inputMode="decimal"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
        <dl className="calc-results" aria-live="polite">
          <div>
            <dt>{t('market.calc.atBest', { market: best.market })}</dt>
            <dd>{formatRupees(qty * best.modal, locale)}</dd>
          </div>
          <div>
            <dt>{t('market.calc.atAverage')}</dt>
            <dd>{formatRupees(qty * average, locale)}</dd>
          </div>
        </dl>
        <p className="muted small">{t('market.calc.note')}</p>
      </div>
    </section>
  )
}

function RatesTab({ focusCropId }) {
  const { t, locale } = useLanguage()
  const names = useNames()
  const [state, setState] = useState('Maharashtra')
  const [district, setDistrict] = useState('')
  const [commodityChoice, setCommodityChoice] = useState(null)
  const [marketQuery, setMarketQuery] = useState('')
  const [visible, setVisible] = useState(PAGE)
  const data = useMandiData(state)

  const districts = useMemo(() => [...new Set(data.records.map((row) => row.district))].sort(), [data.records])
  const commodities = useMemo(() => [...new Set(data.records.map((row) => row.commodity))].sort(), [data.records])

  // A crop link (e.g. from Crop Recommendation) pre-selects the matching commodity.
  const focusCommodity = focusCropId ? commodities.find((name) => cropIdForCommodity(name) === focusCropId) ?? '' : ''
  const commodity = commodityChoice ?? focusCommodity

  const search = marketQuery.trim().toLowerCase()
  const filtered = data.records
    .filter((row) => (!district || row.district === district) && (!commodity || row.commodity === commodity))
    .filter((row) => !search || row.market.toLowerCase().includes(search) || row.district.toLowerCase().includes(search))
    // Field crops from our crop guide (soybean, cotton, onion…) first, then everything else A–Z.
    .sort((first, second) => {
      const firstIsCrop = cropIdForCommodity(first.commodity) ? 0 : 1
      const secondIsCrop = cropIdForCommodity(second.commodity) ? 0 : 1
      return firstIsCrop - secondIsCrop || first.commodity.localeCompare(second.commodity) || second.modal - first.modal
    })

  const reportDate = data.records.reduce((latest, row) => (row.date > latest ? row.date : latest), '')
  const focusMissing = focusCropId && !focusCommodity && data.records.length > 0 && commodityChoice === null

  function changeFilter(setter) {
    return (event) => {
      setter(event.target.value)
      setVisible(PAGE)
    }
  }

  return (
    <>
      <section className="panel market-filters" aria-label={t('market.filters')}>
        <SelectField label={t('market.state')} name="state" value={state} onChange={(event) => { setState(event.target.value); setDistrict(''); setCommodityChoice(''); setVisible(PAGE) }}>
          {STATES.map((name) => (
            <option key={name} value={name}>{STATE_LABELS[name] ?? name}</option>
          ))}
        </SelectField>
        <SelectField label={t('market.district')} name="district" value={district} onChange={changeFilter(setDistrict)}>
          <option value="">{t('market.anyDistrict')}</option>
          {districts.map((name) => (
            <option key={name} value={name}>{names.district(name)}</option>
          ))}
        </SelectField>
        <SelectField label={t('market.commodity')} name="commodity" value={commodity} onChange={changeFilter(setCommodityChoice)}>
          <option value="">{t('market.anyCommodity')}</option>
          {commodities.map((name) => (
            <option key={name} value={name}>{names.commodity(name)}</option>
          ))}
        </SelectField>
        <TextField label={t('market.searchMarket')} name="marketSearch" type="search" value={marketQuery} placeholder={t('market.searchMarketPlaceholder')} onChange={changeFilter(setMarketQuery)} />
      </section>

      {data.status === 'loading' && (
        <div className="status-panel" role="status">
          <span className="loader" aria-hidden="true" />
          <p>{t('market.states.loadingTitle')}</p>
        </div>
      )}

      {(data.status === 'setup' || data.status === 'error') && <StatusMessage status={data.status} onRetry={data.retry} />}

      {(data.status === 'live' || data.status === 'snapshot') && (
        <>
          <div className={`data-source ${data.status}`}>
            <span className="live-dot" aria-hidden="true" />
            {data.status === 'live' ? (
              <span>
                <strong>{t('market.liveFrom')}</strong> · {t('market.updated', { date: formatDate(reportDate, locale) })}
              </span>
            ) : (
              <span>{t('market.states.snapshotNote', { date: formatDate(data.meta?.fetchedAt, locale) })}</span>
            )}
            <a href={data.meta?.sourceUrl ?? AGMARKNET_URL} target="_blank" rel="noreferrer">
              data.gov.in <Icon name="external" size={14} />
            </a>
          </div>

          {data.problem === 'setup' && <p className="admin-note">{t('market.states.setupAdmin')}</p>}

          {focusMissing && (
            <p className="empty-note">{t('market.states.emptyText')}</p>
          )}

          {commodity && filtered.length > 0 && <CommodityInsight key={commodity + district} commodity={commodity} rows={filtered} />}

          {filtered.length === 0 ? (
            <div className="empty-state">
              <h2>{t('market.states.emptyTitle')}</h2>
              <p>{t('market.states.emptyText')}</p>
            </div>
          ) : (
            <section className="bhav-board" aria-labelledby="board-title">
              <div className="bhav-board-head">
                <h2 id="board-title">{t('market.board.title')}</h2>
                <p>{t('market.showing', { shown: Math.min(visible, filtered.length), total: filtered.length })}</p>
              </div>
              <table>
                <thead>
                  <tr>
                    <th scope="col">{t('market.board.commodity')}</th>
                    <th scope="col">{t('market.board.market')}</th>
                    <th scope="col" className="num">{t('market.board.min')}</th>
                    <th scope="col" className="num">{t('market.board.max')}</th>
                    <th scope="col" className="num">{t('market.board.modal')}</th>
                    <th scope="col" className="num">{t('market.board.perKg')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.slice(0, visible).map((row, index) => (
                    <tr key={`${row.market}-${row.commodity}-${row.variety}-${row.grade}-${index}`}>
                      <th scope="row">
                        <span className="cell-main">{names.commodity(row.commodity)}</span>
                        <span className="cell-sub">{row.variety !== 'Other' ? row.variety : row.grade}</span>
                      </th>
                      <td data-label={t('market.board.market')}>
                        <span className="cell-main">{row.market}</span>
                        <span className="cell-sub">{names.district(row.district)}</span>
                      </td>
                      <td className="num" data-label={t('market.board.min')}>{formatRupees(row.min, locale)}</td>
                      <td className="num" data-label={t('market.board.max')}>{formatRupees(row.max, locale)}</td>
                      <td className="num modal" data-label={t('market.board.modal')}>{formatRupees(row.modal, locale)}</td>
                      <td className="num" data-label={t('market.board.perKg')}>₹{(row.modal / 100).toLocaleString(locale, { maximumFractionDigits: 1 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {visible < filtered.length && (
                <button className="button button-light board-more" type="button" onClick={() => setVisible((count) => count + PAGE)}>
                  {t('market.showMore')}
                </button>
              )}
              <p className="board-foot">
                {t('market.unit')} {t('market.modalHelp')}
              </p>
            </section>
          )}
        </>
      )}

      <aside className="info-callout">
        <Icon name="scale" size={26} />
        <div>
          <strong>{t('market.eNamTitle')}</strong>
          <p>{t('market.eNamText')}</p>
          <a href="https://enam.gov.in" target="_blank" rel="noreferrer">
            enam.gov.in <Icon name="external" size={14} />
          </a>
        </div>
      </aside>
    </>
  )
}

function MspTable({ seasonKey }) {
  const { t, tx, locale } = useLanguage()
  const season = mspSeasons[seasonKey]
  return (
    <section className="msp-block" aria-labelledby={`msp-${seasonKey}`}>
      <h3 id={`msp-${seasonKey}`}>{t(`market.msp.${seasonKey}`, { season: season.season })}</h3>
      <table className="msp-table">
        <thead>
          <tr>
            <th scope="col">{t('market.msp.crop')}</th>
            <th scope="col" className="num">{t('market.msp.price')}</th>
            <th scope="col" className="num">{t('market.msp.previous')}</th>
            <th scope="col" className="num">{t('market.msp.change')}</th>
          </tr>
        </thead>
        <tbody>
          {season.crops.map((crop) => (
            <tr key={crop.id}>
              <th scope="row">{tx(crop.name)}</th>
              <td className="num strong" data-label={t('market.msp.price')}>{formatRupees(crop.msp, locale)}</td>
              <td className="num" data-label={t('market.msp.previous')}>{formatRupees(crop.previous, locale)}</td>
              <td className="num up" data-label={t('market.msp.change')}>+{formatRupees(crop.msp - crop.previous, locale)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="source-line">
        <a href={season.sourceUrl} target="_blank" rel="noreferrer">
          {t('market.msp.sourceLine', { date: formatDate(season.releaseDate, locale) })} <Icon name="external" size={14} />
        </a>
      </p>
    </section>
  )
}

function MspTab() {
  const { t } = useLanguage()
  return (
    <section className="panel msp" aria-labelledby="msp-title">
      <h2 id="msp-title" className="panel-title">{t('market.msp.title')}</h2>
      <p className="lead">{t('market.msp.what')}</p>
      <div className="msp-grid">
        <MspTable seasonKey="kharif" />
        <MspTable seasonKey="rabi" />
      </div>
      <p className="muted">{t('market.msp.sugarcaneNote')}</p>
      <p className="info-line">
        <Icon name="info" size={18} /> {t('market.msp.howToSell')}
      </p>
    </section>
  )
}

export default function MarketPage({ param }) {
  const { t } = useLanguage()
  const [tab, setTab] = useState(param === 'msp' ? 'msp' : 'rates')
  const focusCropId = param && cropCommodityPatterns[param] ? param : null

  return (
    <>
      <PageHeader icon="scale" title={t('market.title')} intro={t('market.intro')}>
        <div className="tabs" role="tablist" aria-label={t('market.title')}>
          {['rates', 'msp'].map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              id={`tab-${key}`}
              aria-selected={tab === key}
              aria-controls={`panel-${key}`}
              onClick={() => setTab(key)}
            >
              {t(`market.tabs.${key}`)}
            </button>
          ))}
        </div>
      </PageHeader>
      <div className="page-body" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 'rates' ? <RatesTab focusCropId={focusCropId} /> : <MspTab />}
      </div>
    </>
  )
}
