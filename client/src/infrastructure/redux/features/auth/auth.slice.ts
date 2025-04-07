import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  expiredIn: number | null;
  isAuthenticated: boolean;
  user: any;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  expiredIn: null,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.expiredIn = action.payload.expiredIn;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;
