import { createTheme } from '@mui/material/styles';
import { FONT_WEIGHT, LETTER_SPACING, PALETTE } from './theme.constant';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    displayL: React.CSSProperties;
    displayM: React.CSSProperties;
    headingL: React.CSSProperties;
    headingM: React.CSSProperties;
    headingS: React.CSSProperties;
    semiBoldLabelL: React.CSSProperties;
    semiBoldLabelM: React.CSSProperties;
    semiBoldLabelS: React.CSSProperties;
    regularLabelL: React.CSSProperties;
    regularLabelM: React.CSSProperties;
    regularLabelS: React.CSSProperties;
    textL: React.CSSProperties;
    textM: React.CSSProperties;
    subtextM: React.CSSProperties;
    subtextS: React.CSSProperties;
  }
  interface TypographyVariantsOptions extends Partial<TypographyVariants> {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    displayL: true;
    displayM: true;
    headingL: true;
    headingM: true;
    headingS: true;
    semiBoldLabelL: true;
    semiBoldLabelM: true;
    semiBoldLabelS: true;
    regularLabelL: true;
    regularLabelM: true;
    regularLabelS: true;
    textL: true;
    textM: true;
    subtextM: true;
    subtextS: true;
  }
}

export const muiTheme = createTheme({
  palette: {
    primary: { main: PALETTE.PRIMARY, dark: PALETTE.PRIMARY_DARK, light: PALETTE.PRIMARY_LIGHT, contrastText: '#ffffff' },
    secondary: { main: PALETTE.SECONDARY, contrastText: '#ffffff' },
    success: { main: PALETTE.SUCCESS, contrastText: '#ffffff' },
    warning: { main: PALETTE.WARNING, contrastText: '#ffffff' },
    error: { main: PALETTE.ERROR, contrastText: '#ffffff' },
    info: { main: PALETTE.INFO, contrastText: '#ffffff' },
    text: { primary: PALETTE.TEXT_PRIMARY, secondary: PALETTE.TEXT_SECONDARY },
    background: { default: PALETTE.BG_DEFAULT, paper: PALETTE.BG_PAPER },
    divider: PALETTE.DIVIDER,
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    displayL: { fontSize: 40, lineHeight: 1.2, fontWeight: FONT_WEIGHT.BOLD, letterSpacing: LETTER_SPACING.TIGHT },
    displayM: { fontSize: 32, lineHeight: 1.25, fontWeight: FONT_WEIGHT.BOLD, letterSpacing: LETTER_SPACING.TIGHT },
    headingL: { fontSize: 28, lineHeight: 1.3, fontWeight: FONT_WEIGHT.SEMI_BOLD },
    headingM: { fontSize: 22, lineHeight: 1.35, fontWeight: FONT_WEIGHT.SEMI_BOLD },
    headingS: { fontSize: 18, lineHeight: 1.4, fontWeight: FONT_WEIGHT.SEMI_BOLD },
    semiBoldLabelL: { fontSize: 16, lineHeight: 1.45, fontWeight: FONT_WEIGHT.SEMI_BOLD },
    semiBoldLabelM: { fontSize: 14, lineHeight: 1.45, fontWeight: FONT_WEIGHT.SEMI_BOLD },
    semiBoldLabelS: { fontSize: 12, lineHeight: 1.45, fontWeight: FONT_WEIGHT.SEMI_BOLD },
    regularLabelL: { fontSize: 16, lineHeight: 1.5, fontWeight: FONT_WEIGHT.REGULAR },
    regularLabelM: { fontSize: 14, lineHeight: 1.5, fontWeight: FONT_WEIGHT.REGULAR },
    regularLabelS: { fontSize: 12, lineHeight: 1.5, fontWeight: FONT_WEIGHT.REGULAR },
    textL: { fontSize: 16, lineHeight: 1.6, fontWeight: FONT_WEIGHT.REGULAR },
    textM: { fontSize: 14, lineHeight: 1.6, fontWeight: FONT_WEIGHT.REGULAR },
    subtextM: { fontSize: 13, lineHeight: 1.5, fontWeight: FONT_WEIGHT.REGULAR },
    subtextS: { fontSize: 11, lineHeight: 1.5, fontWeight: FONT_WEIGHT.REGULAR },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true, variant: 'contained' },
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: FONT_WEIGHT.SEMI_BOLD, borderRadius: 8 },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small', fullWidth: true, variant: 'outlined' },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 12, border: `1px solid ${PALETTE.DIVIDER}` } },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
    },
  },
});
