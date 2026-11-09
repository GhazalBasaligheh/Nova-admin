import { createGlobalStyle } from 'styled-components';

// Theme-dependent globals. Static resets live in index.css.
export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Vazirmatn', system-ui, sans-serif;
  }
`;
