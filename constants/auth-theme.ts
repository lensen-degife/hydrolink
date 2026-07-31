/**
 * HydroLink Material Design 3 theme — water utility branding.
 * Premium blue & white palette inspired by modern banking apps.
 */

export const HydroColors = {
  primary: '#0057A8',
  primaryDark: '#003D75',
  primaryLight: '#4A90D9',
  primaryContainer: '#D4E8FF',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#001D35',

  secondary: '#0288D1',
  secondaryContainer: '#B3E5FC',
  onSecondary: '#FFFFFF',

  surface: '#FFFFFF',
  surfaceDim: '#F0F6FC',
  surfaceBright: '#FFFFFF',
  surfaceContainer: '#EEF4FA',
  surfaceContainerHigh: '#E3ECF5',
  onSurface: '#1A1C1E',
  onSurfaceVariant: '#43474E',

  background: '#F5FAFF',
  onBackground: '#1A1C1E',

  outline: '#73777F',
  outlineVariant: '#C3C7CF',
  error: '#BA1A1A',
  errorContainer: '#FFDAD6',
  onError: '#FFFFFF',

  success: '#1B873F',
  successContainer: '#C8F5D5',

  gradientStart: '#0057A8',
  gradientMid: '#0288D1',
  gradientEnd: '#4FC3F7',

  shadow: 'rgba(0, 87, 168, 0.12)',
  overlay: 'rgba(0, 29, 53, 0.45)',
} as const;

export const HydroTypography = {
  displayLarge: { fontSize: 36, fontWeight: '700' as const, letterSpacing: -0.5, lineHeight: 44 },
  displayMedium: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.25, lineHeight: 36 },
  headlineLarge: { fontSize: 24, fontWeight: '600' as const, letterSpacing: 0, lineHeight: 32 },
  headlineMedium: { fontSize: 20, fontWeight: '600' as const, letterSpacing: 0.15, lineHeight: 28 },
  titleLarge: { fontSize: 18, fontWeight: '600' as const, letterSpacing: 0, lineHeight: 26 },
  titleMedium: { fontSize: 16, fontWeight: '500' as const, letterSpacing: 0.15, lineHeight: 24 },
  bodyLarge: { fontSize: 16, fontWeight: '400' as const, letterSpacing: 0.5, lineHeight: 24 },
  bodyMedium: { fontSize: 14, fontWeight: '400' as const, letterSpacing: 0.25, lineHeight: 20 },
  labelLarge: { fontSize: 14, fontWeight: '600' as const, letterSpacing: 0.1, lineHeight: 20 },
  labelMedium: { fontSize: 12, fontWeight: '500' as const, letterSpacing: 0.5, lineHeight: 16 },
} as const;

export const HydroSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const HydroRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const HydroShadow = {
  sm: {
    shadowColor: HydroColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: HydroColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  lg: {
    shadowColor: HydroColors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;

export const HydroNavigationTheme = {
  dark: false,
  colors: {
    primary: HydroColors.primary,
    background: HydroColors.background,
    card: HydroColors.surface,
    text: HydroColors.onSurface,
    border: HydroColors.outlineVariant,
    notification: HydroColors.error,
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' as const },
    medium: { fontFamily: 'System', fontWeight: '500' as const },
    bold: { fontFamily: 'System', fontWeight: '700' as const },
    heavy: { fontFamily: 'System', fontWeight: '800' as const },
  },
};
