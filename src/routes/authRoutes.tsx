// src/routes/AuthRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignInForm from "../pages/Auth/SignInForm";

const AuthRoutes = () => {
  return (
    <Routes>
      {/* Default login route */}
      <Route path="/" element={<SignInForm />} />
      <Route path="/login" element={<SignInForm />} />

      {/* Catch-all: redirect any unknown route to /login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AuthRoutes;
