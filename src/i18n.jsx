// src/i18n.jsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './assets/locales/en/english.json';
import frTranslation from './assets/locales/fr/french.json';
import esTranslation from "./assets/locales/sp/spanish.json";
import swTranslation from "./assets/locales/sw/swahili.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: enTranslation,
      },
      fr: {
        translation: frTranslation,
      },
      es: {
        translation: esTranslation,
      },
      sw: {
        translation: swTranslation,
      },
    },
  });

export default i18n;