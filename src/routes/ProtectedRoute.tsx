import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return <>{children}</>;
}
