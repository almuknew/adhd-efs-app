// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import arTranslation from './locales/ar/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        translation: arTranslation
      }
    },
    lng: 'ar', // Set Arabic as the default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;