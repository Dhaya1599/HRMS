/**
 * HRMS dark theme — reference UI: dark background, orange accent.
 * Background: #1C1C1E / #1E140F, Card: #2C2C2C, Primary: #FD7A2E
 */
export const COLORS = {
  primary: '#FD7A2E',
  background: '#1C1C1E',
  backgroundDark: '#1E140F',
  surface: '#2C2C2C',
  surfaceVariant: '#332118',
  inputBg: '#40291D',
  textPrimary: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textTertiary: '#999999',
  success: '#4CAF50',
  warning: '#FF8C00',
  error: '#F44336',
  info: '#3b82f6',
  border: '#3D3D3D',
  borderLight: '#4A4A4A',
  disabled: '#5A5A5A',
  inTime: '#4CAF50',
  outTime: '#94a3b8',
  pending: '#FD7A2E',
  approved: '#4CAF50',
  rejected: '#F44336',
  onLeave: '#a78bfa',
  shadowColor: '#000000',
};

export const THEME = {
  colors: COLORS,
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  borderRadius: {
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
    h2: { fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
    h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
    body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
    bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 18 },
  },
  shadows: {
    sm: { shadowColor: COLORS.shadowColor, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 3 },
    md: { shadowColor: COLORS.shadowColor, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 },
    lg: { shadowColor: COLORS.shadowColor, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 8 },
  },
};
