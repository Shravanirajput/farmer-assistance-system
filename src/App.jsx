import { lazy, Suspense } from 'react'
import Layout from './components/Layout'
import { useLanguage } from './i18n/LanguageContext'
import HomePage from './pages/HomePage'
import { useHashRoute } from './utils/router'

// Each feature screen is downloaded only when it is first opened, so the app starts faster
// on slow mobile connections. The offline service worker still saves all of them.
const PAGES = {
  home: HomePage,
  crop: lazy(() => import('./pages/CropPage')),
  disease: lazy(() => import('./pages/DiseasePage')),
  equipment: lazy(() => import('./pages/EquipmentPage')),
  history: lazy(() => import('./pages/HistoryPage')),
  market: lazy(() => import('./pages/MarketPage')),
  schemes: lazy(() => import('./pages/SchemesPage')),
}

function PageLoading() {
  const { t } = useLanguage()
  return (
    <div className="page-loading" role="status">
      <span className="loader" aria-hidden="true" />
      <span>{t('app.loading')}</span>
    </div>
  )
}

export default function App() {
  const { route, param } = useHashRoute()
  const Page = PAGES[route]
  return (
    <Layout route={route}>
      <Suspense fallback={<PageLoading />}>
        {/* key resets a page's state when its URL changes */}
        <Page key={`${route}/${param ?? ''}`} param={param} />
      </Suspense>
    </Layout>
  )
}
