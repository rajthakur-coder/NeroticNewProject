// // src/app/api.ts
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API_URL,
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token");
//       if (token) headers.set("Authorization", `Bearer ${token}`);
//       return headers;
//     },
//   }),
//   tagTypes: ["Auth", "Products", "Categories", "Prices"], // Add more as needed
//   endpoints: () => ({}),
// });







// src/components/app/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { logout, setGlobalLoggingOut } from "../../features/auth/authSlice"; // 🆕 New action import

// 1. Original baseQuery
const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
        const token = Cookies.get("token"); 
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
    },
});

// 2. Enhanced baseQuery with 401 Global Logout Handler
const appBaseQuery = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.error("Session Revoked. Forcing logout with UX delay.");

    api.dispatch(setGlobalLoggingOut(true)); 
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    api.dispatch(logout()); 
    window.location.href = '/login';
  }
  return result;
};


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: appBaseQuery, 
    tagTypes: ["Auth", "Products", "Categories", "Prices"],
    endpoints: () => ({}),
});