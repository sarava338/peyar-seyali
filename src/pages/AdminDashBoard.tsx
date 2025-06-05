// src/components/Dashboard.tsx
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthProvider";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
}
