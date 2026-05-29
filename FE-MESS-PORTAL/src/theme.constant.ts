export const FONT_WEIGHT = {
  REGULAR: 400,
  MEDIUM: 500,
  SEMI_BOLD: 600,
  BOLD: 700,
} as const;

export const LETTER_SPACING = {
  TIGHT: '-0.01em',
  NORMAL: '0',
  WIDE: '0.02em',
} as const;

export const PALETTE = {
  PRIMARY: '#2563eb',
  PRIMARY_DARK: '#1d4ed8',
  PRIMARY_LIGHT: '#60a5fa',
  SECONDARY: '#0f172a',
  SUCCESS: '#16a34a',
  WARNING: '#f59e0b',
  ERROR: '#dc2626',
  INFO: '#0ea5e9',
  TEXT_PRIMARY: '#0f172a',
  TEXT_SECONDARY: '#475569',
  BG_DEFAULT: '#f8fafc',
  BG_PAPER: '#ffffff',
  DIVIDER: '#e2e8f0',
} as const;

export const SIZE = {
  HEADER_HEIGHT: 64,
  SIDEBAR_WIDTH: 240,
  SIDEBAR_WIDTH_COLLAPSED: 72,
} as const;
