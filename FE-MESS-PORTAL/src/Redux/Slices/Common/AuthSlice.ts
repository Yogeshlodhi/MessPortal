import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from 'Common/types/api.types';

export interface IAuthUser {
  id: string;
  emailId: string;
  displayName: string;
  role: Role;
  avatarUrl?: string;
}

export interface IAuthState {
  user: IAuthUser | null;
  isAuthenticated: boolean;
}

const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<IAuthUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
