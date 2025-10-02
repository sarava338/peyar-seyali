import { Outlet, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useAppSelector, useAuthActions } from "../store/hooks";

import AdminDashBoard from "../pages/admin/AdminDashBoard";
import { useEffect } from "react";

export default function AdminLayout() {
  const { user } = useAppSelector((state) => state.auth);
  const { login } = useAuthActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) login(); // If user not logged in → trigger Google login redirect
    else if (!user.isAdmin) navigate("/", { replace: true }); // Logged in but not admin → redirect to home
  }, [user, navigate, login]);

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
