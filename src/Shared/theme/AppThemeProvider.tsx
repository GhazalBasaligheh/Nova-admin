import type { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { useAppSelector } from '@/Redux/hooks';
import { Theme } from '@/types/Enums/Theme';
import { GlobalStyle } from './GlobalStyle';
import { createTheme, darkPalette, lightPalette } from './tokens';

const themes = {
  [Theme.Light]: createTheme(lightPalette),
  [Theme.Dark]: createTheme(darkPalette),
};

// Bridges the Redux theme into styled-components.
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
