import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

void i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          greeteng: 'Welcome Back'
        }
      },
      ua: {
        translation: {
          greeteng: 'Слава Україні'
        }
      }
    }
  })

export default i18n
