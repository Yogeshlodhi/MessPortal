import { createTheme } from '@mantine/core';
import { PALETTE } from './theme.constant';

export const mantineTheme = createTheme({
  primaryColor: 'blue',
  fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
  defaultRadius: 'md',
  colors: {
    brand: [
      '#eff6ff',
      '#dbeafe',
      '#bfdbfe',
      '#93c5fd',
      '#60a5fa',
      '#3b82f6',
      PALETTE.PRIMARY,
      PALETTE.PRIMARY_DARK,
      '#1e40af',
      '#1e3a8a',
    ],
  },
});
