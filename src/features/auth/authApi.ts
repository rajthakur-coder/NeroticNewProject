import { baseApi } from "../../components/app/api";

// --- Login / Logout Types ---
export interface LoginResponseData {
  token: string;
  expires_at: string;
  user: {
    name: string;
    email: string;
    role: "User" | "Admin";
  };
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: LoginResponseData;
}

export interface LoginRequest {
  email: string;
  password: string;
  latitude?: number;
  longitude?: number;
}

export interface LogoutRequest {
  all_device: boolean;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// --- authApi ---
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation<LogoutResponse, LogoutRequest>({
      query: (body) => ({
        url: "/logout",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    forgotPassword: builder.mutation<
      {
        success: boolean;
        statusCode: number;
        message: string;
        data: { verify: string; email?: string; mobile_no?: string };
      },
      { email?: string; mobile_no?: string }
    >({
      query: (body) => ({
        url: "/forgot-password",
        method: "POST",
        body,
      }),
    }),

    verifyForgotPasswordOtp: builder.mutation<
      {
        success: boolean;
        statusCode: number;
        message: string;
        data: { token: string };
      },
      { email?: string; mobile_no?: string; otp: string }
    >({
      query: (body) => ({
        url: "/forgot-password/verify-otp",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

// --- Export hooks ---
export const {
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
} = authApi;
