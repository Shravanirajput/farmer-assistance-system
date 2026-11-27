import { useEffect, useRef, useState } from 'react'
import Icon from '../components/Icons'
import PageHeader from '../components/PageHeader'
import { diseaseCrops, diseases } from '../data/diseases'
import { useLanguage } from '../i18n/LanguageContext'

function InfoList({ title, icon, items, tone }) {
  const { tx } = useLanguage()
  return (
    <section className={`info-block tone-${tone}`}>
      <h3>
        <Icon name={icon} size={20} /> {title}
      </h3>
      <ul>
        {items.map((item) => (
          <li key={item.en}>{tx(item)}</li>
        ))}
      </ul>
    </section>
  )
}

export default function DiseasePage({ param }) {
  const { t, tx } = useLanguage()
  const initialCrop = diseaseCrops.some((crop) => crop.id === param) ? param : ''
  const [cropId, setCropId] = useState(initialCrop)
  const [diseaseId, setDiseaseId] = useState('')
  const detailRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (diseaseId) detailRef.current?.focus()
  }, [diseaseId])

  const crop = diseaseCrops.find((item) => item.id === cropId)
  const cropDiseases = diseases.filter((disease) => disease.cropId === cropId)
  const disease = diseases.find((item) => item.id === diseaseId)

  function chooseCrop(id) {
    setCropId(id)
    setDiseaseId('')
    requestAnimationFrame(() => listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <>
      <PageHeader icon="leafSpots" title={t('disease.title')} intro={t('disease.intro')} />
      <div className="page-body">
        <section className="panel" aria-labelledby="disease-crop-title">
          <h2 id="disease-crop-title" className="panel-title">{t('disease.chooseCrop')}</h2>
          <div className="crop-chooser" role="group" aria-labelledby="disease-crop-title">
            {diseaseCrops.map((item) => {
              const count = diseases.filter((entry) => entry.cropId === item.id).length
              return (
                <button
                  key={item.id}
                  type="button"
                  className="crop-chip"
                  aria-pressed={cropId === item.id}
                  onClick={() => chooseCrop(item.id)}
                >
                  <span>{tx(item.name)}</span>
                  <small>{count === 1 ? t('disease.countOne') : t('disease.count', { count })}</small>
                </button>
              )
            })}
          </div>
        </section>

        <div ref={listRef} className="scroll-anchor" />
        {!crop && <p className="empty-note">{t('disease.empty')}</p>}

        {crop && !disease && (
          <section className="results" aria-labelledby="disease-list-title">
            <h2 id="disease-list-title" className="section-title">
              {t('disease.chooseDisease', { crop: tx(crop.name) })}
            </h2>
            <ul className="disease-grid">
              {cropDiseases.map((item) => (
                <li key={item.id}>
                  <button type="button" className="disease-card" onClick={() => setDiseaseId(item.id)}>
                    <span className={`cause cause-${item.cause}`}>{t(`disease.cause.${item.cause}`)}</span>
                    <span className="disease-card-title">{tx(item.name)}</span>
                    <span className="disease-card-text">{tx(item.symptoms[0])}</span>
                    <span className="disease-card-more">
                      {t('disease.viewDetails')} <Icon name="arrowRight" size={18} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {crop && disease && (
          <article className="disease-detail" aria-labelledby="disease-detail-title">
            <button className="button button-ghost" type="button" onClick={() => setDiseaseId('')}>
              <Icon name="arrowLeft" size={18} /> {t('disease.backToList', { crop: tx(crop.name) })}
            </button>
            <header className="disease-detail-head">
              <span className={`cause cause-${disease.cause}`}>{t(`disease.cause.${disease.cause}`)}</span>
              <h2 id="disease-detail-title" ref={detailRef} tabIndex={-1}>
                {tx(disease.name)}
              </h2>
              <p>{tx(crop.name)}</p>
            </header>
            <div className="info-grid">
              <InfoList title={t('disease.symptoms')} icon="search" items={disease.symptoms} tone="ink" />
              <InfoList title={t('disease.favorable')} icon="sun" items={disease.favorableConditions} tone="haldi" />
              <InfoList title={t('disease.prevention')} icon="shield" items={disease.prevention} tone="leaf" />
              <InfoList title={t('disease.management')} icon="check" items={disease.management} tone="mud" />
            </div>
            <aside className="expert-note">
              <Icon name="phone" size={24} />
              <div>
                <strong>{t('disease.expertTitle')}</strong>
                <p>{t('disease.expertText')}</p>
              </div>
            </aside>
            <p className="source-line">
              {t('common.source')}: {tx(disease.sourceNote)}
            </p>
            <p className="disclaimer">{t('disease.disclaimer')}</p>
          </article>
        )}
      </div>
    </>
  )
}
