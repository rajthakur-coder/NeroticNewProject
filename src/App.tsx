// // src/App.tsx
// import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import LayoutWrapper from "./components/layout/LayoutWrapper";
// import { ThemeProvider } from "./components/context/ThemeContext";
// import ProgressWatcher from "./components/ui/ProgressWatcher";
// import AppRoutes from "./routes/AppRoutes";
// import AuthRoutes from "./routes/authRoutes";
// import "../src/assets/styles/scss/globals.scss";

// import { TOASTER_LIBRARY } from "./components/Config/toaster.config";

// // Toaster providers
// import { Toaster as HotToaster } from "react-hot-toast";
// import { Toaster as SonnerToaster } from "sonner";
// import { ToastContainer } from "react-toastify";
// import { ReactNotifications } from "react-notifications-component";

// import { useSelector } from "react-redux";
// import {type RootState } from "./components/app/store";

// const AppContent = () => {
//   // ✅ Get authentication state directly from Redux
//   const isAuthenticated = useSelector(
//     (state: RootState) => state.auth.isAuthenticated
//   );

//   const renderRoutes = () =>
//     isAuthenticated ? (
//       <LayoutWrapper>
//         <AppRoutes />
//       </LayoutWrapper>
//     ) : (
//       <AuthRoutes />
//     );

//   return (
//     <Router>
//       {/* Progress bar watcher */}
//       <ProgressWatcher />

//       {/* Conditional routes */}
//       {renderRoutes()}

//       {/* ===== Toaster Providers ===== */}
//       {TOASTER_LIBRARY === "hot-toast" && <HotToaster position="top-right" />}
//       {TOASTER_LIBRARY === "sonner" && (
//         <SonnerToaster position="top-center" theme="dark" richColors />
//       )}
//       {TOASTER_LIBRARY === "toastify" && (
//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           closeButton={false}
//           hideProgressBar={true}
//           newestOnTop={false}
//           pauseOnHover
//           draggable
//           style={{
//             border: "none",
//             backgroundColor: "transparent",
//             padding: "12px",
//             color: "#000",
//           }}
//         />
//       )}
//       {TOASTER_LIBRARY === "react-notifications-component" && (
//         <ReactNotifications />
//       )}
//     </Router>
//   );
// };

// function AppWrapper() {
//   return (
//     <ThemeProvider>
//       <AppContent />
//     </ThemeProvider>
//   );
// }

// export default AppWrapper;




















// // src/App.tsx (Final Updated using Preloader component)

// import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import LayoutWrapper from "./components/layout/LayoutWrapper";
// import { ThemeProvider } from "./components/context/ThemeContext";
// // ProgressWatcher अब सिर्फ तभी दिखेगा जब isGlobalLoggingOut FALSE हो
// import ProgressWatcher from "./components/ui/ProgressWatcher"; 
// import AppRoutes from "./routes/AppRoutes";
// import AuthRoutes from "./routes/authRoutes";
// import "../src/assets/styles/scss/globals.scss";
// // 🆕 New Imports
// import AuthListener from "./component/AuthListener"; 
// import SessionRefresher from "./component/SessionRefresher"; 
// import Preloader from "./components/Common/Preloader"; // 🛑 Import Preloader

// import { TOASTER_LIBRARY } from "./components/Config/toaster.config";

// // Toaster providers
// import { Toaster as HotToaster } from "react-hot-toast";
// import { Toaster as SonnerToaster } from "sonner";
// import { ToastContainer } from "react-toastify";
// import { ReactNotifications } from "react-notifications-component";

// import { useSelector } from "react-redux";
// import { type RootState } from "./components/app/store";

// const AppContent = () => {
//   // ✅ Get authentication state directly from Redux
//   const isAuthenticated = useSelector(
//     (state: RootState) => state.auth.isAuthenticated
//   );
//   // 🆕 Global Logging Out State
//   const isGlobalLoggingOut = useSelector(
//     (state: RootState) => state.auth.isGlobalLoggingOut
//   );

//   const renderRoutes = () =>
//     isAuthenticated ? (
//       <LayoutWrapper>
//         <AppRoutes />
//       </LayoutWrapper>
//     ) : (
//       <AuthRoutes />
//     );

//   return (
//     <Router>
//         <AuthListener /> 
//         {isAuthenticated && <SessionRefresher />} 
//         
//         {/* 🛑 GLOBAL LOADER CHECK */}
//         {/* If logging out, show Preloader and stop rendering everything else. */}
//         {isGlobalLoggingOut ? (
//             <Preloader />
//         ) : (
//             // Only render main app content if NOT globally logging out
//             <>
//                 {/* Progress bar watcher */}
//                 <ProgressWatcher />

//                 {/* Conditional routes */}
//                 {renderRoutes()}

//                 {/* ===== Toaster Providers ===== */}
//                 {TOASTER_LIBRARY === "hot-toast" && <HotToaster position="top-right" />}
//                 {TOASTER_LIBRARY === "sonner" && (
//                     <SonnerToaster position="top-center" theme="dark" richColors />
//                 )}
//                 {TOASTER_LIBRARY === "toastify" && (
//                     <ToastContainer
//                         // ... (ToastContainer Props)
//                     />
//                 )}
//                 {TOASTER_LIBRARY === "react-notifications-component" && (
//                     <ReactNotifications />
//                 )}
//             </>
//         )}
//     </Router>
//   );
// };

// function AppWrapper() {
//   return (
//     <ThemeProvider>
//       <AppContent />
//     </ThemeProvider>
//   );
// }

// export default AppWrapper;

















// src/App.tsx

// import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "./components/app/store";

// // Layout & Routes
// import LayoutWrapper from "./components/layout/LayoutWrapper";
// import AppRoutes from "./routes/AppRoutes";
// import AuthRoutes from "./routes/authRoutes";

// // Context & Core
// import { ThemeProvider } from "./components/context/ThemeContext";
// import AuthListener from "./component/AuthListener"; // ✅ Centralized session/expiry handler
// import ProgressWatcher from "./components/ui/ProgressWatcher";
// import Preloader from "./components/Common/Preloader";

// // Styles
// import "./assets/styles/scss/globals.scss";

// // Toaster Config
// import { TOASTER_LIBRARY } from "./components/Config/toaster.config";
// import { Toaster as HotToaster } from "react-hot-toast";
// import { Toaster as SonnerToaster } from "sonner";
// import { ToastContainer } from "react-toastify";
// import { ReactNotifications } from "react-notifications-component";

// /**
//  * AppContent handles routing, theme, and conditional UI rendering.
//  * AuthListener manages session expiry + logout logic in the background.
//  */
// const AppContent: React.FC = () => {
//   // Redux states
//   const { isAuthenticated, isGlobalLoggingOut } = useSelector(
//     (state: RootState) => state.auth
//   );

//   const renderRoutes = () =>
//     isAuthenticated ? (
//       <LayoutWrapper>
//         <AppRoutes />
//       </LayoutWrapper>
//     ) : (
//       <AuthRoutes />
//     );

//   return (
//     <Router>
//       {/* 🧠 AuthListener must be inside Router to use useNavigate() safely */}
//       <AuthListener />

//       {/* ⏳ Global Logout Loader */}
//       {isGlobalLoggingOut ? (
//         <Preloader />
//       ) : (
//         <>
//           <ProgressWatcher />
//           {renderRoutes()}

//           {/* === 🪄 Toaster Providers (Dynamic based on config) === */}
//           {TOASTER_LIBRARY === "hot-toast" && <HotToaster position="top-right" />}

//           {TOASTER_LIBRARY === "sonner" && (
//             <SonnerToaster position="top-center" theme="dark" richColors />
//           )}

//           {TOASTER_LIBRARY === "toastify" && (
//             <ToastContainer
//               position="top-right"
//               autoClose={3000}
//               hideProgressBar={false}
//               closeButton={false}
//               hideProgressBar={true}
//               newestOnTop
//               closeOnClick
//               pauseOnFocusLoss
//               draggable
//               pauseOnHover
//               theme="colored"
//             />
//           )}

//           {TOASTER_LIBRARY === "react-notifications-component" && (
//             <ReactNotifications />
//           )}
//         </>
//       )}
//     </Router>
//   );
// };

// /**
//  * AppWrapper wraps everything in the ThemeProvider.
//  * Keeps the app tree clean and composable.
//  */
// const AppWrapper: React.FC = () => (
//   <ThemeProvider>
//     <AppContent />
//   </ThemeProvider>
// );

// export default AppWrapper;































// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./components/app/store";

// Layout & Routes
import LayoutWrapper from "./components/layout/LayoutWrapper";
import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/authRoutes";

// Context & Core
import { ThemeProvider as AppThemeProvider } from "./components/context/ThemeContext";
import AuthListener from "./component/AuthListener"; // ✅ Centralized session/expiry handler
import ProgressWatcher from "./components/ui/ProgressWatcher";
import Preloader from "./components/Common/Preloader";

// 🧩 Material UI (for global InputField performance)
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

// Toaster Config
import { TOASTER_LIBRARY } from "./components/Config/toaster.config";
import { Toaster as HotToaster } from "react-hot-toast";
import { Toaster as SonnerToaster } from "sonner";
import { ToastContainer } from "react-toastify";
import { ReactNotifications } from "react-notifications-component";

// Styles
import "./assets/styles/scss/globals.scss";

/* ------------------------------
   🌗 Create Global MUI Theme
------------------------------ */
const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1C252E" },
    background: { default: "#F9FAFB", paper: "#FFFFFF" },
    text: { primary: "#111827", secondary: "#6B7280" },
  },
  typography: {
    fontFamily: `"Barlow", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
    fontSize: 13,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "0.75rem",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          transition: "all 0.2s ease",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9e9e9e",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1C252E",
            borderWidth: "2px",
          },
        },
        notchedOutline: { borderColor: "#D1D5DB" },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#6B7280",
          fontWeight: 500,
          transition: "all 0.2s ease",
          "&.Mui-focused": {
            color: "#1C252E",
          },
        },
      },
    },
  },
});

/* ------------------------------
   🚀 AppContent (Core Logic)
------------------------------ */
const AppContent: React.FC = () => {
  const { isAuthenticated, isGlobalLoggingOut } = useSelector(
    (state: RootState) => state.auth
  );

  const renderRoutes = () =>
    isAuthenticated ? (
      <LayoutWrapper>
        <AppRoutes />
      </LayoutWrapper>
    ) : (
      <AuthRoutes />
    );

  return (
    <Router>
      {/* 🧠 AuthListener must be inside Router to use useNavigate() safely */}
      <AuthListener />

      {isGlobalLoggingOut ? (
        <Preloader />
      ) : (
        <>
          <ProgressWatcher />
          {renderRoutes()}

          {/* === 🪄 Toaster Providers (Dynamic based on config) === */}
          {TOASTER_LIBRARY === "hot-toast" && (
            <HotToaster position="top-right" />
          )}

          {TOASTER_LIBRARY === "sonner" && (
            <SonnerToaster position="top-center" theme="dark" richColors />
          )}

          {TOASTER_LIBRARY === "toastify" && (
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar
              closeButton={false}
              newestOnTop
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          )}

          {TOASTER_LIBRARY === "react-notifications-component" && (
            <ReactNotifications />
          )}
        </>
      )}
    </Router>
  );
};

/* ------------------------------
   🌍 AppWrapper (Top-Level)
   Combines custom ThemeContext + MUI Theme
------------------------------ */
const AppWrapper: React.FC = () => (
  <AppThemeProvider>
    <MUIThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AppContent />
    </MUIThemeProvider>
  </AppThemeProvider>
);

export default AppWrapper;
