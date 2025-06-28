import { Outlet, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useAppSelector } from "../store/hooks";

import AdminDashBoard from "../pages/admin/AdminDashBoard";
import { useEffect } from "react";

export default function AdminLayout() {
  const user = useAppSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/");
  }, [user, navigate]);

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
