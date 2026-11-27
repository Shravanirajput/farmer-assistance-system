import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fonts are bundled with the site (no Google Fonts request), covering Latin and Devanagari.
import '@fontsource/mukta/400.css'
import '@fontsource/mukta/500.css'
import '@fontsource/mukta/600.css'
import '@fontsource/mukta/700.css'
import '@fontsource/rozha-one/400.css'
import './styles.css'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext'
import { registerServiceWorker } from './utils/pwa'

registerServiceWorker()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
