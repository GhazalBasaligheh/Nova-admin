// Design tokens copied deliberately from NOVA Store (separate repos share no code). Keep in sync by hand.

const navy = {
  900: '#0B1530',
  800: '#13214A',
  700: '#1C2E63',
} as const;

const orange = {
  500: '#F97316',
  600: '#EA580C',
} as const;

export interface Palette {
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  header: string;
  onHeader: string;
  onPrimary: string;
  accent: string;
  accentHover: string;
  onAccent: string;
  danger: string;
  success: string;
}

export const lightPalette: Palette = {
  background: '#FBF8F3',
  surface: '#FFFFFF',
  surfaceMuted: '#F2EEE7',
  border: '#E5E0D8',
  text: navy[900],
  textMuted: '#5B6478',
  primary: navy[800],
  header: navy[800],
  onHeader: '#FFFFFF',
  onPrimary: '#FFFFFF',
  accent: orange[500],
  accentHover: orange[600],
  onAccent: '#FFFFFF',
  danger: '#DC2626',
  success: '#16A34A',
};

export const darkPalette: Palette = {
  background: '#0A1022',
  surface: '#121A33',
  surfaceMuted: '#1A2342',
  border: '#27314F',
  text: '#E8ECF5',
  textMuted: '#A3ACC2',
  primary: '#E8ECF5',
  header: '#0E1630',
  onHeader: '#E8ECF5',
  onPrimary: navy[900],
  accent: orange[500],
  accentHover: '#FB923C',
  onAccent: '#FFFFFF',
  danger: '#F87171',
  success: '#4ADE80',
};

// Mobile-first breakpoints (min-width).
export const breakpoints = {
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

export const media = {
  tablet: `@media (min-width: ${breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px)`,
  wide: `@media (min-width: ${breakpoints.wide}px)`,
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
} as const;

export const radius = {
  sm: '8px',
  md: '12px',
  lg: '20px',
  pill: '999px',
} as const;

export const shadow = {
  card: '0 1px 2px rgb(11 21 48 / 6%), 0 4px 16px rgb(11 21 48 / 6%)',
} as const;

export const createTheme = (colors: Palette) => ({
  colors,
  spacing,
  radius,
  shadow,
  media,
});

export type AppTheme = ReturnType<typeof createTheme>;
