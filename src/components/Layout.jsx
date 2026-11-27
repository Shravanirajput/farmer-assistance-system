import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { LANGUAGES } from '../i18n/languages'
import { hrefFor } from '../utils/router'
import Icon from './Icons'
import { WarliPerson } from './WarliArt'

const NAV_ITEMS = ['home', 'crop', 'disease', 'equipment', 'market', 'schemes', 'history']

export function Logo() {
  return (
    <svg className="logo-mark" viewBox="-30 -46 60 60" aria-hidden="true" focusable="false">
      <circle cx="0" cy="-16" r="29" className="logo-disc" />
      <g className="logo-figure">
        <WarliPerson arms="sow" legs="walk" scale={0.72} y={-12} x={-4} />
      </g>
    </svg>
  )
}

export function LanguageToggle({ className = '' }) {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div className={`language-toggle ${className}`} role="group" aria-label={t('nav.language')}>
      {LANGUAGES.map((option) => (
        <button
          key={option.code}
          type="button"
          lang={option.code}
          aria-pressed={language === option.code}
          onClick={() => setLanguage(option.code)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function Header({ route }) {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Close the mobile menu whenever the page changes.
    const close = () => setMenuOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  return (
    <header className="site-header">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main-content')?.focus()
        }}
      >
        {t('nav.skip')}
      </a>
      <div className="header-inner">
        <a className="brand" href={hrefFor('home')} aria-label={t('brand.homeLabel')}>
          <Logo />
          <span className="brand-text">
            <strong>{t('brand.name')}</strong>
            <small>{t('brand.other')}</small>
          </span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? 'cross' : 'menu'} />
          <span>{menuOpen ? t('nav.closeMenu') : t('nav.menu')}</span>
        </button>

        <nav id="site-nav" className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label={t('nav.main')}>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <a href={hrefFor(item)} aria-current={route === item ? 'page' : undefined}>
                  {t(`nav.${item}`)}
                </a>
              </li>
            ))}
          </ul>
          <LanguageToggle className="nav-language" />
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  const { t } = useLanguage()
  const sources = [
    ['ICAR', 'https://icar.org.in'],
    ['AGMARKNET', 'https://agmarknet.gov.in'],
    ['data.gov.in', 'https://data.gov.in'],
    ['PIB', 'https://pib.gov.in'],
    ['myScheme', 'https://www.myscheme.gov.in'],
    ['MahaDBT', 'https://mahadbt.maharashtra.gov.in'],
  ]
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo />
          <div>
            <strong>{t('brand.name')}</strong>
            <p>{t('footer.about')}</p>
            <p className="footer-team">{t('footer.team')}</p>
          </div>
        </div>
        <div>
          <h2 className="footer-heading">{t('footer.sourcesTitle')}</h2>
          <ul className="footer-sources">
            {sources.map(([label, url]) => (
              <li key={label}>
                <a href={url} target="_blank" rel="noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-helpline">
          <h2 className="footer-heading">{t('home.helplineTitle')}</h2>
          <a className="footer-phone" href="tel:18001801551">
            <Icon name="phone" size={20} /> {t('home.helplineNumber')}
          </a>
        </div>
      </div>
      <p className="footer-disclaimer">
        {t('footer.disclaimer')}{' '}
        <a href="/docs/">{t('footer.docs')}</a>
      </p>
    </footer>
  )
}

export default function Layout({ route, children }) {
  return (
    <div className="site">
      <Header route={route} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
