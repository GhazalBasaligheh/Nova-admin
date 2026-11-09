import { createListenerMiddleware } from '@reduxjs/toolkit';
import i18n from '@/Dictionary/i18n';
import { preferences } from '@/Storage/preferences';
import { languageDirection, type Language } from '@/types/Enums/Language';
import type { Theme } from '@/types/Enums/Theme';
import { setLanguage, toggleTheme } from './slices/uiSlice';

// Side effects of state changes, kept out of reducers and components.
export const listenerMiddleware = createListenerMiddleware();

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

export function applyLanguage(language: Language): void {
  const root = document.documentElement;
  root.lang = language;
  root.dir = languageDirection[language];
}

listenerMiddleware.startListening({
  actionCreator: toggleTheme,
  effect: (_action, api) => {
    const { theme } = (api.getState() as { ui: { theme: Theme } }).ui;
    preferences.setTheme(theme);
    applyTheme(theme);
  },
});

listenerMiddleware.startListening({
  actionCreator: setLanguage,
  effect: async ({ payload }) => {
    preferences.setLanguage(payload);
    applyLanguage(payload);
    await i18n.changeLanguage(payload);
  },
});
