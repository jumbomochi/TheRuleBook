import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const BREAKPOINTS = {
  phone: 480,
  tablet: 768,
  desktop: 1024,
} as const;

export const isTablet = width >= BREAKPOINTS.tablet;
export const isLargeTablet = width >= BREAKPOINTS.desktop;
export const isIPad = Platform.OS === 'ios' && isTablet;

export const TOUCH_TARGETS = {
  small: 44,
  medium: 56,
  large: 72,
  extraLarge: 88,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const GRID = {
  columns: isTablet ? 3 : 2,
  gap: isTablet ? SPACING.lg : SPACING.md,
  cardMinWidth: isTablet ? 280 : 160,
} as const;

export const TYPOGRAPHY = {
  title: isTablet ? 32 : 24,
  heading: isTablet ? 24 : 20,
  subheading: isTablet ? 20 : 16,
  body: isTablet ? 16 : 14,
  caption: isTablet ? 14 : 12,
} as const;

export const getResponsiveValue = <T,>(phoneValue: T, tabletValue: T): T => {
  return isTablet ? tabletValue : phoneValue;
};

export const getColumns = (baseColumns: number): number => {
  if (isLargeTablet) return baseColumns + 2;
  if (isTablet) return baseColumns + 1;
  return baseColumns;
};

export const responsiveWidth = (percentage: number): number => {
  return width * (percentage / 100);
};

export const responsiveHeight = (percentage: number): number => {
  return height * (percentage / 100);
};
