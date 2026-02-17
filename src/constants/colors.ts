/**
 * HRMS light theme — professional UI: white/light grey background, orange accent.
 * Background: #FFFFFF / #F8F9FB, Surface: #FFFFFF, Primary: #FD7A2E
 */
export const COLORS = {
  primary: '#FD7A2E',
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FB',
  surface: '#FFFFFF',
  surfaceVariant: '#F0F0F0',
  inputBg: '#FFFFFF',
  textPrimary: '#1A1A1D',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  success: '#4CAF50',
  warning: '#FF8C00',
  error: '#F44336',
  info: '#3B82F6',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  disabled: '#D1D5DB',
  inTime: '#4CAF50',
  outTime: '#6B7280',
  pending: '#FD7A2E',
  approved: '#4CAF50',
  rejected: '#F44336',
  onLeave: '#8B5CF6',
  shadowColor: '#000000',
  /** Use on primary buttons and orange surfaces for contrast */
  onPrimary: '#FFFFFF',
  /** Leave/status accents */
  leaveAnnual: '#3B82F6',
  leaveSick: '#EF4444',
  leaveCasual: '#EAB308',
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
    sm: { shadowColor: COLORS.shadowColor, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
    md: { shadowColor: COLORS.shadowColor, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
    lg: { shadowColor: COLORS.shadowColor, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 16, elevation: 8 },
  },
};
