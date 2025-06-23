import { Link, Outlet } from "react-router-dom";

import { useAppSelector } from "../store/hooks";

import AdminDashBoard from "../pages/admin/AdminDashboard";

export default function AdminLayout() {
  const user = useAppSelector((state) => state.user.currentUser);

  return user?.isAdmin ? (
    <AdminDashBoard>
      <Outlet />
    </AdminDashBoard>
  ) : (
    <div>
      <p>
        You are not ADMIN. You can't access /admin route. Go to
        <Link to="/"> Home page</Link> or <Link to="/login">Login Page</Link>
      </p>
    </div>
  );
}
