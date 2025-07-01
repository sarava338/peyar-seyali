import { Routes, Route } from "react-router-dom";

import PublicLayout from "./PublicLayout";
import AdminLayout from "./AdminLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Error from "../pages/Error";

import PublicNames from "../pages/Names";
import PublicName from "../pages/Name";
import PublicTags from "../pages/Tags";
import PublicCategories from "../pages/Categories";

import AdminNames from "../pages/admin/Names";
import AddName from "../pages/admin/AddName";
import EditName from "../pages/admin/EditName";
import AdminName from "../pages/admin/Name";
import AdminTags from "../pages/admin/Tags";
import AdminCategories from "../pages/admin/Categories";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/names" element={<PublicNames />} />
        <Route path="/names/:id" element={<PublicName />} />

        <Route path="/tags/:tagSlug" element={<PublicTags />} />
        <Route path="/categories/:categorySlug" element={<PublicCategories />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="names" element={<AdminNames />} />
        <Route path="names/:nameSlug" element={<AdminName />} />
        <Route path="names/:nameSlug/edit" element={<EditName />} />
        <Route path="names/add" element={<AddName />} />

        <Route path="tags" element={<AdminTags />} />
        <Route path="categories" element={<AdminCategories />} />
      </Route>

      {/** Error Route */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<Error code={404} messege="The Page you are looking for, Not Found" />} />
      </Route>
    </Routes>
  );
}
