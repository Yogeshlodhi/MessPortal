import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const SNACKBAR_SEVERITY = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export type SnackbarSeverity = (typeof SNACKBAR_SEVERITY)[keyof typeof SNACKBAR_SEVERITY];

export interface ISnackbarState {
  open: boolean;
  severity: SnackbarSeverity;
  message: string;
  transactionId: string | null;
}

const initialState: ISnackbarState = {
  open: false,
  severity: SNACKBAR_SEVERITY.INFO,
  message: '',
  transactionId: null,
};

interface IShowSnackbarPayload {
  severity: SnackbarSeverity;
  message: string;
  transactionId?: string | null;
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<IShowSnackbarPayload>) => {
      state.open = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
      state.transactionId = action.payload.transactionId ?? null;
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
