// src/components/Login.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { useAuth } from "../contexts/AuthProvider";

import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStarted, setLoginStarted] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStarted && user) {
      navigate("/admin");
    }
  }, [loginStarted, user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoginStarted(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      const error = err as Error;
      setLoginStarted(false);
      console.error(error);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return alert("Please enter your email first.");

    try {
      await sendPasswordResetEmail(auth, email);
      alert("📧 Password reset email sent!");
    } catch (err) {
      const error = err as Error;
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleForgotPassword}>Forgot Password?</button>
      </form>
    </div>
  );
}
