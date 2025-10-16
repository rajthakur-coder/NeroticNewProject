import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Preloader from "../components/Common/Preloader";
import ProductCategory from "../pages/Admin/Product Managements/ProductCategory";
import Product from "../pages/Admin/Product Managements/Product";
import ProductPricing from "../pages/Admin/Product Managements/ProductPricing";
import Apis from "../pages/Admin/settingManagement/Apis";
import ServiceSwitching from "../pages/Admin/settingManagement/ServiceSwitching";

// Pages
import EcommercePage from "../pages/Ecommerce";
import Analytics from "../pages/Dashboard";
import Banking from "../pages/Banking";
import WalletTransfer from "../pages/Admin/Account Management/WalletTransfer";

const AppRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Preloader />;

  return (
    <Routes>
      <Route path="/ecommerce" element={<EcommercePage />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/banking" element={<Banking />} />
      <Route path="/product-category" element={<ProductCategory />} />
      <Route path="/products" element={<Product />} />
      <Route path="/product-pricing" element={<ProductPricing />} />
      <Route path="/setting-management/apis" element={<Apis />} />
      <Route
        path="/setting-management/service-switching"
        element={<ServiceSwitching />}
      />
      <Route
        path="/account-management/wallet-transfer"
        element={<WalletTransfer />}
      />

      {/* Catch-all: redirect unknown routes to /ecommerce */}
      <Route path="*" element={<Navigate to="/ecommerce" replace />} />
    </Routes>
  );
};

export default AppRoutes;
