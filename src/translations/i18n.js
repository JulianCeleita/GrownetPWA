import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './en';
import esTranslations from './es';
import ptTranslations from './pt';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: enTranslations,
      },
      es: {
        translation: esTranslations,
      },
      co: {
        translation: esTranslations,
      },
      pt: {
        translation: ptTranslations,
      },
    },
  });

export default i18n;
