// src/features/auth/authSlice.ts (No major changes needed)
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Interfaces
export interface User {
  name: string;
  email: string;
  role: "User" | "Admin";
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  expiresAt: string | null; // API's ISO string 
  isGlobalLoggingOut: boolean;
}

export interface LoginPayload {
  token: string;
  user: User;
  expires_at: string; // API's ISO string
}


// --- Initial State ---
const storedToken = Cookies.get("token") || null;

// Read user data AND expiry data from 'authUser' local storage
const storedAuthData = (() => {
  try {
    const data = localStorage.getItem("authUser");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
})();

const initialState: AuthState = {
  token: storedToken,
  // Extract user and expiresAt from the combined authData
  user: storedAuthData?.user || null, 
  expiresAt: storedAuthData?.expires_at || null,
  isAuthenticated: !!storedToken && !!storedAuthData?.user,
  loading: false,
  error: null,
  isGlobalLoggingOut: false,
};

// --- Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },

    loginSuccess(state, action: PayloadAction<LoginPayload>) {
      const { token, user, expires_at } = action.payload;

      // Update Redux state
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      state.loading = false;
      state.expiresAt = expires_at; // 💡 The expiresAt string is stored here

      // Store user + expiry CONSISTENTLY in localStorage
      localStorage.setItem(
        "authUser", 
        JSON.stringify({ user, expires_at })
      );
      // NOTE: Cookies.set is handled in SignInForm for better security control (secure/sameSite)
    },

    setGlobalLoggingOut(state, action: PayloadAction<boolean>) {
      state.isGlobalLoggingOut = action.payload;
    },

    logout(state) {
      // Clear Redux state
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.isGlobalLoggingOut = false;
      state.expiresAt = null;

      // Clear storage
      Cookies.remove("token");
      localStorage.removeItem("authUser");
      // Broadcast logout to other tabs
      localStorage.setItem("logout", Date.now().toString());
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loginStart, loginSuccess, logout, setError, setGlobalLoggingOut } =
  authSlice.actions;

export default authSlice.reducer;