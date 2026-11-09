import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import '@/Dictionary/i18n';
import { applyLanguage, applyTheme } from '@/Redux/listeners';
import { store } from '@/Redux/store';
import { AppThemeProvider } from '@/Shared/theme/AppThemeProvider';
import App from './App.tsx';
import './index.css';

// Keep <html> in sync with the stored preferences (index.html already did this before render).
const { theme, language } = store.getState().ui;
applyTheme(theme);
applyLanguage(language);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </Provider>
  </StrictMode>,
);
