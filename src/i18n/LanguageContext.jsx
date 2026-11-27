import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import en from './en'
import mr from './mr'

// How translation works (short version for the viva):
// 1. Every piece of interface text lives in en.js and mr.js under the same key.
// 2. t('home.heroTitle') looks up that key in the dictionary for the chosen language.
// 3. Data files (crops, diseases, schemes...) store text as { en: '...', mr: '...' },
//    and tx(value) picks the right one.
// The chosen language is saved in localStorage so it is remembered next visit.

const dictionaries = { en, mr }
const STORAGE_KEY = 'farmerAssistanceLanguage'

const LanguageContext = createContext(null)

function readKey(dictionary, key) {
  return key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dictionary)
}

function fillVariables(text, variables) {
  if (!variables) return text
  return text.replace(/\{(\w+)\}/g, (match, name) => (variables[name] ?? match))
}

function initialLanguage() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && dictionaries[saved]) return saved
  } catch {
    // localStorage can be blocked in private mode; fall back to English.
  }
  return 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage)

  useEffect(() => {
    document.documentElement.lang = language === 'mr' ? 'mr' : 'en'
    document.title = readKey(dictionaries[language], 'meta.title') ?? 'Farmer Assistance'
    try {
      window.localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // Ignore storage errors; the choice still applies for this visit.
    }
  }, [language])

  const t = useCallback(
    (key, variables) => {
      const value = readKey(dictionaries[language], key) ?? readKey(dictionaries.en, key)
      if (typeof value !== 'string') return value ?? key
      return fillVariables(value, variables)
    },
    [language],
  )

  // tx() picks the right language from a bilingual data value: { en, mr }.
  const tx = useCallback(
    (value) => {
      if (value == null) return ''
      if (typeof value === 'string' || Array.isArray(value)) return value
      return value[language] ?? value.en ?? ''
    },
    [language],
  )

  const locale = language === 'mr' ? 'mr-IN-u-nu-latn' : 'en-IN'

  const contextValue = useMemo(
    () => ({ language, setLanguage, t, tx, locale }),
    [language, t, tx, locale],
  )

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return context
}
