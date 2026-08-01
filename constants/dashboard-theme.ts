/**
 * HydroLink Master Theme — Home Dashboard & Auth Unified System
 * Material Design 3 inspired, Water utility branding.
 */

export const HydroThemeColors = {
  light: {
    primary: '#1976D2',
    primaryDark: '#0D47A1',
    primaryLight: '#42A5F5',
    primaryContainer: '#E3F2FD',
    onPrimaryContainer: '#0D47A1',
    
    secondary: '#26A69A',
    secondaryDark: '#00796B',
    secondaryLight: '#80CBC4',
    secondaryContainer: '#E0F2F1',
    onSecondaryContainer: '#004D40',

    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceVariant: '#F1F5F9',
    surfaceElevated: '#FFFFFF',
    
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#64748B',
    textOnPrimary: '#FFFFFF',

    border: '#E2E8F0',
    borderLight: '#F1F5F9',

    success: '#22C55E',
    successContainer: '#DCFCE7',
    onSuccessContainer: '#15803D',

    warning: '#F59E0B',
    warningContainer: '#FEF3C7',
    onWarningContainer: '#B45309',

    error: '#EF4444',
    errorContainer: '#FEE2E2',
    onErrorContainer: '#B91C1C',

    shadow: 'rgba(25, 118, 210, 0.08)',
    overlay: 'rgba(15, 23, 42, 0.5)',
  },
  dark: {
    primary: '#42A5F5',
    primaryDark: '#1976D2',
    primaryLight: '#90CAF9',
    primaryContainer: '#1E3A8A',
    onPrimaryContainer: '#DBEAFE',

    secondary: '#26A69A',
    secondaryDark: '#004D40',
    secondaryLight: '#80CBC4',
    secondaryContainer: '#064E3B',
    onSecondaryContainer: '#D1FAE5',

    background: '#0F172A',
    surface: '#1E293B',
    surfaceVariant: '#334155',
    surfaceElevated: '#334155',

    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    textOnPrimary: '#0F172A',

    border: '#334155',
    borderLight: '#1E293B',

    success: '#4ADE80',
    successContainer: '#064E3B',
    onSuccessContainer: '#86EFAC',

    warning: '#FBBF24',
    warningContainer: '#78350F',
    onWarningContainer: '#FDE68A',

    error: '#F87171',
    errorContainer: '#7F1D1D',
    onErrorContainer: '#FECACA',

    shadow: 'rgba(0, 0, 0, 0.4)',
    overlay: 'rgba(0, 0, 0, 0.75)',
  },
} as const;

export const DashboardLayout = {
  cardRadius: 20, // 20px rounded cards as specified
  sectionSpacing: 24, // 24px clean spacing
  containerPadding: 20,
  buttonRadius: 14,
  badgeRadius: 100,
};

export const DashboardShadows = {
  soft: {
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  medium: {
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
  },
  hero: {
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
  },
};
