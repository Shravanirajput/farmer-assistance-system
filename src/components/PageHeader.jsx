import { useLanguage } from '../i18n/LanguageContext'
import { hrefFor } from '../utils/router'
import Icon from './Icons'
import { WarliBorder } from './WarliArt'

// The mud-wall band at the top of every feature page.
export default function PageHeader({ icon, title, intro, otherTitle, children }) {
  const { t } = useLanguage()
  return (
    <section className="page-header">
      <div className="page-header-inner">
        <a className="back-link" href={hrefFor('home')}>
          <Icon name="arrowLeft" size={18} /> {t('common.backHome')}
        </a>
        <div className="page-header-title">
          <span className="page-header-icon">
            <Icon name={icon} size={34} strokeWidth={1.6} />
          </span>
          <div>
            <h1>{title}</h1>
            {otherTitle && <p className="page-header-other">{otherTitle}</p>}
          </div>
        </div>
        {intro && <p className="page-header-intro">{intro}</p>}
        {children}
      </div>
      <WarliBorder />
    </section>
  )
}
