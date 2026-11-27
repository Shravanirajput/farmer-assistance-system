import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { LANGUAGES } from '../i18n/languages'
import { useInstallPrompt, useOnlineStatus } from '../utils/pwa'
import { hrefFor } from '../utils/router'
import Icon from './Icons'
import { WarliPerson } from './WarliArt'

const NAV_ITEMS = ['home', 'crop', 'disease', 'equipment', 'market', 'schemes', 'history']
// Bottom tab bar on phones (like a native app). Equipment and My bookings stay in the menu.
const TABS = [
  ['home', 'home'],
  ['crop', 'sprout'],
  ['disease', 'leafSpots'],
  ['market', 'scale'],
  ['schemes', 'scroll'],
]

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

export function LanguageToggle({ className = '', compact = false }) {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div className={`language-toggle ${compact ? 'is-compact' : ''} ${className}`} role="group" aria-label={t('nav.language')}>
      {LANGUAGES.map((option) => (
        <button
          key={option.code}
          type="button"
          lang={option.code}
          aria-pressed={language === option.code}
          aria-label={option.label}
          onClick={() => setLanguage(option.code)}
        >
          {compact ? option.short : option.label}
        </button>
      ))}
    </div>
  )
}

export function InstallButton({ className = 'button button-primary' }) {
  const { t } = useLanguage()
  const { canInstall, install } = useInstallPrompt()
  if (!canInstall) return null
  return (
    <button className={`install-button ${className}`} type="button" onClick={install}>
      <Icon name="download" size={20} /> {t('app.install')}
    </button>
  )
}

function OfflineBanner() {
  const { t } = useLanguage()
  const online = useOnlineStatus()
  if (online) return null
  return (
    <p className="offline-banner" role="status">
      <Icon name="info" size={18} /> {t('app.offline')}
    </p>
  )
}

function TabBar({ route }) {
  const { t } = useLanguage()
  return (
    <nav className="tab-bar" aria-label={t('app.tabs')}>
      {TABS.map(([id, icon]) => (
        <a key={id} href={hrefFor(id)} aria-current={route === id ? 'page' : undefined}>
          <Icon name={icon} size={24} />
          <span>{t(`nav.${id}`)}</span>
        </a>
      ))}
    </nav>
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

        <LanguageToggle className="header-language" compact />

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? 'cross' : 'menu'} />
          <span className="menu-label">{menuOpen ? t('nav.closeMenu') : t('nav.menu')}</span>
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
          <InstallButton className="button button-outline nav-install" />
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
      <OfflineBanner />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <TabBar route={route} />
    </div>
  )
}
