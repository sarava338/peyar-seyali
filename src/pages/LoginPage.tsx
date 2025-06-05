// src/components/Login.tsx
import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";
import { useAuth } from "../contexts/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStarted, setLoginStarted] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  useEffect(() => {
    if (loginStarted && user) {
      navigate("/admin");
    }
  }, [loginStarted, user, navigate]);

  const handleLogin = async () => {
    try {
      setLoginStarted(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      const error = err as Error;
      setLoginStarted(false);
      alert("Login error: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoginStarted(true);
      await signInWithPopup(auth, provider);
      navigate("/admin");
    } catch (err) {
      const error = err as Error;
      setLoginStarted(false);
      alert("Google login error: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}
