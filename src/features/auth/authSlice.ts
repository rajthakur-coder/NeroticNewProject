// // src/features/auth/authSlice.ts
// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// interface User {
//   name: string;
//   email: string;
//   role: "User" | "Admin";
// }

// interface AuthState {
//   token: string | null;
//   isAuthenticated: boolean;
//   user: User | null;
// }

// // Safely parse localStorage
// const storedToken = localStorage.getItem("token");

// let storedUser: User | null = null;
// try {
//   const userStr = localStorage.getItem("user");
//   if (userStr) {
//     storedUser = JSON.parse(userStr);
//   }
// } catch (err) {
//   console.warn("Failed to parse stored user:", err);
//   storedUser = null;
// }

// const initialState: AuthState = {
//   token: storedToken,
//   isAuthenticated: !!storedToken,
//   user: storedUser,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (
//       state,
//       action: PayloadAction<{ token: string; user: User }>
//     ) => {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//       state.isAuthenticated = true;

//       // persist to localStorage
//       localStorage.setItem("token", action.payload.token);
//       localStorage.setItem("user", JSON.stringify(action.payload.user));
//     },
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//       state.isAuthenticated = false;

//       // clear storage
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;



















// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

// export interface User { name: string; email: string; role: "User" | "Admin"; }
// export interface AuthState {
//   token: string | null;
//   isAuthenticated: boolean;
//   user: User | null;
//   loading: boolean;
//   error: string | null;
// }

// const storedToken = Cookies.get("token") || null;
// const storedUser = (() => {
//   try {
//     const userStr = localStorage.getItem("authUser");
//     return userStr ? JSON.parse(userStr)?.user : null;
//   } catch { return null; }
// })();

// const initialState: AuthState = {
//   token: storedToken,
//   user: storedUser,
//   isAuthenticated: !!storedToken,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginStart(state) { state.loading = true; state.error = null; },
//     loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//       state.isAuthenticated = true;
//       state.loading = false;
//     },
//     logout(state) {
//       state.token = null;
//       state.user = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//       Cookies.remove("token");
//       localStorage.removeItem("authUser");
//       localStorage.setItem("logout", Date.now().toString()); // broadcast logout to other tabs
//     },
//     setError(state, action: PayloadAction<string>) {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
// });

// export const { loginStart, loginSuccess, logout, setError } = authSlice.actions;
// export default authSlice.reducer;











// features/auth/authSlice.ts

// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

// // Interfaces
// export interface User { name: string; email: string; role: "User" | "Admin"; }
// export interface AuthState {
//     token: string | null;
//     isAuthenticated: boolean;
//     user: User | null;
//     loading: boolean;
//     error: string | null;
//     isGlobalLoggingOut: boolean; // 🆕 नया फील्ड
// }
// interface LoginPayload { token: string; user: User }

// // --- Initial State Logic (Existing) ---
// const storedToken = Cookies.get("token") || null;
// const storedUser = (() => {
//     try {
//         const userStr = localStorage.getItem("authUser");
//         return userStr ? JSON.parse(userStr)?.user : null; 
//     } catch { return null; }
// })();

// const initialState: AuthState = {
//     token: storedToken,
//     user: storedUser,
//     isAuthenticated: !!storedToken && !!storedUser,
//     loading: false,
//     error: null,
//     isGlobalLoggingOut: false, // 🆕 Default state
// };

// // --- Auth Slice ---
// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         loginStart(state) { state.loading = true; state.error = null; },
//         loginSuccess(state, action: PayloadAction<LoginPayload>) {
//             state.token = action.payload.token;
//             state.user = action.payload.user;
//             state.isAuthenticated = true;
//             state.loading = false;
//         },
//         setGlobalLoggingOut(state, action: PayloadAction<boolean>) { // 🆕 नया Reducer
//             state.isGlobalLoggingOut = action.payload;
//         },
//         // ✅ LOGOUT Reducer: Cleans up all frontend storage
//         logout(state) {
//             state.token = null;
//             state.user = null;
//             state.isAuthenticated = false;
//             state.loading = false;
//             state.isGlobalLoggingOut = false; // 🛑 Cleanup
            
//             // Clear storage
//             Cookies.remove("token");
//             localStorage.removeItem("authUser");
//             localStorage.removeItem("token_expiry");
//             localStorage.removeItem("expires_at");

//             // broadcast logout to other tabs
//             localStorage.setItem("logout", Date.now().toString()); 
//         },
//         setError(state, action: PayloadAction<string>) {
//             state.error = action.payload;
//             state.loading = false;
//         },
//     },
// });

// export const { loginStart, loginSuccess, logout, setError, setGlobalLoggingOut } = authSlice.actions;
// export default authSlice.reducer;




























// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

// // Interfaces
// export interface User {
//   name: string;
//   email: string;
//   role: "User" | "Admin";
// }

// export interface AuthState {
//   token: string | null;
//   isAuthenticated: boolean;
//   user: User | null;
//   loading: boolean;
//   error: string | null;
//   expiresAt: string | null;       
//   isGlobalLoggingOut: boolean;
// }

// interface LoginPayload {
//   token: string;
//   user: User;
//   expires_at: string;               
// }


// // --- Initial State ---
// const storedToken = Cookies.get("token") || null;
// const storedUser = (() => {
//   try {
//     const data = localStorage.getItem("authUser");
//     return data ? JSON.parse(data) : null;
//   } catch {
//     return null;
//   }
// })();
// const storedExpiry = localStorage.getItem("expires_at") || null;

// const initialState: AuthState = {
//   token: storedToken,
//   user: storedUser,
//   isAuthenticated: !!storedToken && !!storedUser,
//   loading: false,
//   error: null,
//   expiresAt: storedExpiry,
//   isGlobalLoggingOut: false,
// };

// // --- Slice ---
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginStart(state) {
//       state.loading = true;
//       state.error = null;
//     },

//     loginSuccess(state, action: PayloadAction<LoginPayload>) {
//       const { token, user, expires_at } = action.payload;

//       //  Update Redux state
//       state.token = token;
//       state.user = user;
//       state.isAuthenticated = true;
//       state.loading = false;
//       state.expiresAt = expires_at;

//       //  Store token in cookie with backend expiry
//       const expiryDate = new Date(expires_at);
//       Cookies.set("token", token, { expires: expiryDate });

//       // Store user + expiry in localStorage
//       localStorage.setItem("authUser", JSON.stringify(user));
//       localStorage.setItem("expires_at", expires_at);
//     },

//     setGlobalLoggingOut(state, action: PayloadAction<boolean>) {
//       state.isGlobalLoggingOut = action.payload;
//     },

//     logout(state) {
//       //  Clear Redux state
//       state.token = null;
//       state.user = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//       state.isGlobalLoggingOut = false;
//       state.expiresAt = null;

//       //  Clear storage
//       Cookies.remove("token");
//       localStorage.removeItem("authUser");
//       localStorage.removeItem("expires_at");

//       //  Broadcast logout to other tabs
//       localStorage.setItem("logout", Date.now().toString());
//     },

//     setError(state, action: PayloadAction<string>) {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
// });

// export const { loginStart, loginSuccess, logout, setError, setGlobalLoggingOut } =
//   authSlice.actions;

// export default authSlice.reducer;











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