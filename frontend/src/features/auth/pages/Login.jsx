import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginApi } from "../services/auth.api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Please fill all fields", "error");
      return;
    }

    try {
      setLoading(true);

      await loginApi({ email, password });

   

      showToast("Login Successful 🎉", "success");

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid email or password";

      showToast(message, "error");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      {toast && (
        <div className={`toast toast--${toast.type}`}>
          {toast.message}
        </div>
      )}

      <div className="auth__box">
        <h1 className="auth__logo">AI-SKETCH</h1>
        <h2 className="auth__title">Login</h2>

        <form className="auth__form" onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth__switch">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;