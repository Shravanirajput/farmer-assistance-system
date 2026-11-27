import Layout from './components/Layout'
import CropPage from './pages/CropPage'
import DiseasePage from './pages/DiseasePage'
import EquipmentPage from './pages/EquipmentPage'
import HistoryPage from './pages/HistoryPage'
import HomePage from './pages/HomePage'
import MarketPage from './pages/MarketPage'
import SchemesPage from './pages/SchemesPage'
import { useHashRoute } from './utils/router'

const PAGES = {
  home: HomePage,
  crop: CropPage,
  disease: DiseasePage,
  equipment: EquipmentPage,
  history: HistoryPage,
  market: MarketPage,
  schemes: SchemesPage,
}

export default function App() {
  const { route, param } = useHashRoute()
  const Page = PAGES[route]
  return (
    <Layout route={route}>
      {/* key resets a page's state when its URL changes */}
      <Page key={`${route}/${param ?? ''}`} param={param} />
    </Layout>
  )
}
