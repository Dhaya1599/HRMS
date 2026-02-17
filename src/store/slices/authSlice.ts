import { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Add login-related actions here when implementing
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
