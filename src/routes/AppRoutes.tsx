// src/routes/AppRoutes.tsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Preloader from "../components/Common/Preloader";

// Pages
import EcommercePage from "../pages/Ecommerce";
import Analytics from "../pages/Dashboard";
import Banking from "../pages/Banking";

const AppRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading (preloader)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Preloader />;

  return (
    <Routes>
      {/* Main authenticated routes */}
      <Route path="/ecommerce" element={<EcommercePage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/banking" element={<Banking />} />
            <Route path="/user/profile" element={<Analytics />} />
            <Route path="/user/cards" element={<EcommercePage />} />
            <Route path="/user/list" element={<Banking />} />

      {/* Catch-all: redirect unknown routes to /ecommerce */}
      <Route path="*" element={<Navigate to="/ecommerce" replace />} />
    </Routes>
  );
};

export default AppRoutes;
