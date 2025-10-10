// App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LayoutWrapper from "./components/layout/LayoutWrapper";
import { ThemeProvider } from "./components/context/ThemeContext";
import { AuthProvider, useAuth } from "../src/components/context/AuthContext";
import ProgressWatcher from "./components/ui/ProgressWatcher";
import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/authRoutes";
import "../src/assets/styles/scss/globals.scss";

import { TOASTER_LIBRARY } from "../src/components/Config/toaster.config";

// Toaster providers
import { Toaster as HotToaster } from "react-hot-toast";
import { Toaster as SonnerToaster } from "sonner";
import { ToastContainer } from "react-toastify";
import { ReactNotifications } from "react-notifications-component";

const AppContent = () => {
  const { isAuthenticated } = useAuth();

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
      <ProgressWatcher />

      {renderRoutes()}

      {/* ===== Toaster Providers ===== */}
      {TOASTER_LIBRARY === "hot-toast" && <HotToaster position="top-right" />}
      {TOASTER_LIBRARY === "sonner" && (
        <SonnerToaster position="top-center" theme="dark" richColors />
      )}
      {TOASTER_LIBRARY === "toastify" && (
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeButton={false}
          hideProgressBar={true}
          newestOnTop={false}
          pauseOnHover
          draggable
          style={{
            border: 'none', 
            backgroundColor: 'transparent', 
            // boxShadow: 'none', 
            padding: '12px',
            color: '#000', // text color (optional)
          }}
        />
      )}
      {TOASTER_LIBRARY === "react-notifications-component" && <ReactNotifications />}
    </Router>
  );
};

function AppWrapper() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default AppWrapper;
