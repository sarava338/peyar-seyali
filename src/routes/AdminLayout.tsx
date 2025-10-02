import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import AdminDashBoard from "../pages/admin/AdminDashBoard";

export default function AdminLayout() {
  return (
    <>
      <Helmet>
        <title>பெயர்கள் - நிர்வாகி தளம்</title>
      </Helmet>

      <AdminDashBoard>
        <Outlet />
      </AdminDashBoard>
    </>
  );
}
