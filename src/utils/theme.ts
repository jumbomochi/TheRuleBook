import { SPACING, TYPOGRAPHY, TOUCH_TARGETS } from './responsive';

export const COLORS = {
  light: {
    primary: '#6200EE',
    primaryVariant: '#3700B3',
    secondary: '#03DAC6',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    error: '#B00020',
    text: '#000000',
    textSecondary: '#666666',
    border: '#E0E0E0',
    disabled: '#CCCCCC',
  },
  dark: {
    primary: '#BB86FC',
    primaryVariant: '#3700B3',
    secondary: '#03DAC6',
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2C2C2C',
    error: '#CF6679',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    border: '#333333',
    disabled: '#555555',
  },
} as const;

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export const BORDER_RADIUS = {
  small: 4,
  medium: 8,
  large: 16,
  extraLarge: 24,
  round: 9999,
} as const;

export const theme = {
  colors: COLORS,
  spacing: SPACING,
  typography: TYPOGRAPHY,
  touchTargets: TOUCH_TARGETS,
  shadows: SHADOWS,
  borderRadius: BORDER_RADIUS,
} as const;

export type Theme = typeof theme;
