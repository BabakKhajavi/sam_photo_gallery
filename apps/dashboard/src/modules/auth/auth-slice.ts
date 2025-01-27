import { IUser } from '@packages/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: IUser | null;
  token?: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
    refreshToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});
export const { logout, refreshToken } = authSlice.actions;
const authReducer = authSlice.reducer;
export { authReducer };
