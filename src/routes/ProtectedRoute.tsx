import { Link } from "react-router-dom";

import { useAppSelector } from "../store/hooks";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.user.currentUser);

  return user?.isAdmin ? (
    children
  ) : (
    <div>
      <p>
        You are not ADMIN. You can't access /admin route. Go to
        <Link to="/"> Home page</Link> or <Link to="/login">Login Page</Link>
      </p>
    </div>
  );
}
