import Icon from '../components/Icons'
import { TarpaCircle, Sun, Bird, WarliFrieze } from '../components/WarliArt'
import { useLanguage } from '../i18n/LanguageContext'
import { currentSeason } from '../utils/format'
import { hrefFor } from '../utils/router'

const SERVICES = [
  { id: 'crop', icon: 'sprout', other: { en: 'पीक शिफारस', mr: 'Crop Recommendation' } },
  { id: 'disease', icon: 'leafSpots', other: { en: 'रोग मार्गदर्शक', mr: 'Disease Guide' } },
  { id: 'equipment', icon: 'tractor', other: { en: 'अवजारे भाड्याने', mr: 'Equipment Rental' } },
  { id: 'market', icon: 'scale', other: { en: 'बाजारभाव', mr: 'Agri Market' } },
  { id: 'schemes', icon: 'scroll', other: { en: 'सरकारी योजना', mr: 'Government Schemes' } },
]

export default function HomePage() {
  const { t, tx, locale } = useLanguage()
  const season = currentSeason()
  const seasonName = t(`seasons.${season}.name`)
  const month = new Date().toLocaleDateString(locale, { month: 'long', year: 'numeric' })

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="season-chip">
              <Icon name="sun" size={18} /> {t('home.seasonChip', { season: seasonName, month })}
            </p>
            <h1>{t('home.heroTitle')}</h1>
            <p className="hero-text">{t('home.heroText')}</p>
            <div className="hero-actions">
              <a className="button button-primary" href={hrefFor('crop')}>
                <Icon name="sprout" size={20} /> {t('home.ctaCrop')}
              </a>
              <a className="button button-light" href={hrefFor('market')}>
                <Icon name="scale" size={20} /> {t('home.ctaMarket')}
              </a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <svg className="hero-sky" viewBox="0 0 400 120">
              <Sun x={330} y={56} r={24} />
              <Bird x={80} y={40} />
              <Bird x={104} y={54} scale={0.8} />
              <Bird x={190} y={24} scale={0.7} />
            </svg>
            <TarpaCircle />
          </div>
        </div>
        <WarliFrieze />
      </section>

      <section className="season-band" aria-labelledby="season-title">
        <div className="section-inner season-band-inner">
          <div>
            <h2 id="season-title">{t('home.seasonTitle', { season: seasonName })}</h2>
            <p>{t(`home.seasonTips.${season}`)}</p>
          </div>
          <a className="button button-outline" href={hrefFor('crop', season)}>
            {t('home.seasonLink', { season: seasonName })} <Icon name="arrowRight" size={18} />
          </a>
        </div>
      </section>

      <section className="services" aria-labelledby="services-title">
        <div className="section-inner">
          <h2 id="services-title" className="section-title">{t('home.servicesTitle')}</h2>
          <ul className="service-grid">
            {SERVICES.map((service) => (
              <li key={service.id} className={`service service-${service.id}`}>
                <a href={hrefFor(service.id)}>
                  <span className="service-icon">
                    <Icon name={service.icon} size={36} strokeWidth={1.6} />
                  </span>
                  <span className="service-text">
                    <span className="service-title">{t(`home.services.${service.id}.title`)}</span>
                    <span className="service-other" lang={tx({ en: 'mr', mr: 'en' })}>{tx(service.other)}</span>
                    <span className="service-desc">{t(`home.services.${service.id}.text`)}</span>
                  </span>
                  <Icon name="arrowRight" size={22} className="service-arrow" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="trust" aria-labelledby="trust-title">
        <div className="section-inner">
          <h2 id="trust-title" className="section-title">{t('home.trustTitle')}</h2>
          <div className="trust-grid">
            {['science', 'market', 'schemes'].map((key) => (
              <div key={key} className="trust-item">
                <h3>{t(`home.trust.${key}.title`)}</h3>
                <p>{t(`home.trust.${key}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="helpline" aria-labelledby="helpline-title">
        <div className="section-inner helpline-inner">
          <span className="helpline-icon">
            <Icon name="phone" size={30} />
          </span>
          <div>
            <h2 id="helpline-title">{t('home.helplineTitle')}</h2>
            <p>{t('home.helplineText')}</p>
          </div>
          <a className="helpline-number" href="tel:18001801551">
            {t('home.helplineNumber')}
          </a>
        </div>
      </section>
    </>
  )
}
