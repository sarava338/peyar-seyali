import { Outlet, useNavigate } from "react-router-dom";

import { useAppSelector } from "../store/hooks";

import AdminDashBoard from "../pages/admin/AdminDashBoard";

export default function AdminLayout() {
  const user = useAppSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  if (!user || !user.isAdmin) {
    navigate("/");
  }

  return (
    <AdminDashBoard>
      <Outlet />
    </AdminDashBoard>
  );
}
