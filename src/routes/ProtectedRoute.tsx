import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  console.log("ProtectedRoute user:", user);

  return !user ? <Navigate to="/login" /> : <>{children}</>;
}
