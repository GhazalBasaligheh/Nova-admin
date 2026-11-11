import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { preferences } from '@/Storage/preferences';
import { DEFAULT_LANGUAGE } from '@/types/Enums/Language';
import en from './en.json';
import fa from './fa.json';

export const resources = {
  fa: { translation: fa },
  en: { translation: en },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: preferences.getLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false }, 
  returnNull: false,
});

export default i18n;
