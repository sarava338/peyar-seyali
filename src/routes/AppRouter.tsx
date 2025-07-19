import { Routes, Route } from "react-router-dom";

import PublicLayout from "./PublicLayout";
import AdminLayout from "./AdminLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Error from "../pages/Error";

import Name from "../pages/Name";
import Names from "../pages/Names";
import Tag from "../pages/Tag";
import Category from "../pages/Category";
import User from "../pages/User";
import Settings from "../pages/Settings";

import AddName from "../pages/admin/AddName";
import EditName from "../pages/admin/EditName";
import AdminTags from "../pages/admin/Tags";
import AdminCategories from "../pages/admin/Categories";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/names" element={<Names />} />
        <Route path="/names/:nameSlug" element={<Name />} />

        <Route path="/tags/:tagSlug" element={<Tag />} />
        <Route path="/categories/:categorySlug" element={<Category />} />

        <Route path="/user" element={<User />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="names" element={<Names />} />
        <Route path="names/:nameSlug" element={<Name />} />
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
