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

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./components/app/store";

// Layout & Routes
import LayoutWrapper from "./components/layout/LayoutWrapper";
import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/authRoutes";

// Context & Core
import { ThemeProvider } from "./components/context/ThemeContext";
import AuthListener from "./component/AuthListener"; // ✅ Centralized session/expiry handler
import ProgressWatcher from "./components/ui/ProgressWatcher";
import Preloader from "./components/Common/Preloader";

// Styles
import "./assets/styles/scss/globals.scss";

// Toaster Config
import { TOASTER_LIBRARY } from "./components/Config/toaster.config";
import { Toaster as HotToaster } from "react-hot-toast";
import { Toaster as SonnerToaster } from "sonner";
import { ToastContainer } from "react-toastify";
import { ReactNotifications } from "react-notifications-component";

/**
 * AppContent handles routing, theme, and conditional UI rendering.
 * AuthListener manages session expiry + logout logic in the background.
 */
const AppContent: React.FC = () => {
  // Redux states
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

      {/* ⏳ Global Logout Loader */}
      {isGlobalLoggingOut ? (
        <Preloader />
      ) : (
        <>
          <ProgressWatcher />
          {renderRoutes()}

          {/* === 🪄 Toaster Providers (Dynamic based on config) === */}
          {TOASTER_LIBRARY === "hot-toast" && <HotToaster position="top-right" />}

          {TOASTER_LIBRARY === "sonner" && (
            <SonnerToaster position="top-center" theme="dark" richColors />
          )}

          {TOASTER_LIBRARY === "toastify" && (
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              closeButton={false}
              hideProgressBar={true}
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

/**
 * AppWrapper wraps everything in the ThemeProvider.
 * Keeps the app tree clean and composable.
 */
const AppWrapper: React.FC = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default AppWrapper;
