import 'i18next';
import type en from '@/Dictionary/en.json';

// Typed keys: t('Unknown.key') fails at compile time.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: { translation: typeof en };
    returnNull: false;
  }
}
