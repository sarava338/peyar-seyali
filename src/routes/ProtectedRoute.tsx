import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../store/hooks";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.user.currentUser);
  const location = useLocation();

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
}
