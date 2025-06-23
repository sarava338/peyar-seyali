import { useLocation, useNavigate } from "react-router-dom";

import { useAuthActions } from "../store/hooks";

export default function Login() {
  const { login } = useAuthActions();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/"; // fallback to Home page

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(e.currentTarget.email.value, e.currentTarget.password.value);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  }

  return (
    <>
      <h2>Login Page</h2>

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
