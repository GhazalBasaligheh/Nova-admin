import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { preferences } from '@/Storage/preferences';
import type { Language } from '@/types/Enums/Language';
import { Theme } from '@/types/Enums/Theme';

interface UiState {
  theme: Theme;
  language: Language;
}

const initialState: UiState = {
  theme: preferences.getTheme(),
  language: preferences.getLanguage(),
};

// Pure state only; persistence and DOM/i18n side effects live in Redux/listeners.ts.
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === Theme.Light ? Theme.Dark : Theme.Light;
    },
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
  },
});

export const { toggleTheme, setLanguage } = uiSlice.actions;
export default uiSlice.reducer;
