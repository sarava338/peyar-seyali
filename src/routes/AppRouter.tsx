// src/AppRouter.tsx
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AllNamesPage from "../pages/AllNamesPage";
import NameDetailPage from "../pages/NameDetailPage";

import AdminDashboard from "../pages/admin/AdminDashBoard";
import NameManager from "../pages/admin/NameManager";
import NameAddPage from "../pages/admin/NameAddPage";

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

      <Route
        path="/admin/names"
        element={
          <ProtectedRoute>
            <NameManager />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/names/add"
        element={
          <ProtectedRoute>
            <NameAddPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
