// src/i18n.jsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '../public/locales/en/english.json';
import frTranslation from '../public/locales/fr/french.json';
import esTranslation from "../public/locales/sp/spanish.json";
import swTranslation from "../public/locales/sw/swahili.json";

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