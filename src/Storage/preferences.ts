import { DEFAULT_LANGUAGE, Language } from '@/types/Enums/Language';
import { Theme } from '@/types/Enums/Theme';

// Non-sensitive UI preferences in localStorage. Key names are also read by the pre-render script in index.html .
const THEME_KEY = 'nova-admin-theme';
const LANGUAGE_KEY = 'nova-admin-language';

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null; // storage disabled (private mode, policy): fall back to defaults
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore: preference simply won't persist
  }
}

export const preferences = {
  getTheme(): Theme {
    return read(THEME_KEY) === Theme.Dark ? Theme.Dark : Theme.Light;
  },
  setTheme(theme: Theme): void {
    write(THEME_KEY, theme);
  },
  getLanguage(): Language {
    const value = read(LANGUAGE_KEY);
    return value === Language.En || value === Language.Fa ? value : DEFAULT_LANGUAGE;
  },
  setLanguage(language: Language): void {
    write(LANGUAGE_KEY, language);
  },
};
