import { Routes, Route } from "react-router-dom";

import PublicLayout from "./PublicLayout";
import AdminLayout from "./AdminLayout";

import Home from "../pages/Home";
import PublicNames from "../pages/Names";
import Name from "../pages/Name";

import AdminNames from "../pages/admin/Names";
import AddName from "../pages/admin/AddName";
import EditName from "../pages/admin/EditName";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/names" element={<PublicNames />} />
        <Route path="/names/:id" element={<Name />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="names" element={<AdminNames />} />
        <Route path="names/add" element={<AddName />} />
        <Route
          path="names/:id/edit"
          element={<EditName nameSlug="saravanan" />}
        />
      </Route>
    </Routes>
  );
}
