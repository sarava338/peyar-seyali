// src/AppRouter.tsx
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AllNamesPage from "../pages/AllNamesPage";
import NameDetailPage from "../pages/NameDetailPage";

import AdminDashboard from "../pages/admin/AdminDashBoard";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/names" element={<AllNamesPage />} />
      <Route path="/names/:id" element={<NameDetailPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
