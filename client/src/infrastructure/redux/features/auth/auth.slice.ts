import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  userId: string | null;
  email: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiredIn: number | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  userId: null,
  email: null,
  accessToken: null,
  refreshToken: null,
  expiredIn: null,
  isAuthenticated: false,
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
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.email = null;
      state.userId = null;
    },
  },
});

export const { setAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;
