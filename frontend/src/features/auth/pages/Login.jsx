import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginApi } from "../services/auth.api";

const Login = () => {
  const navigate = useNavigate();

  // ✅ ALL STATES ANDAR AAYENGE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState("");

  // 🔥 Already logged-in check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  // 🔥 Toast function
  const showToast = (message, type) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  // 🔥 Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
  
    // 🔥 reset error
    setError("");
  
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
  
    try {
      setLoading(true);
  
      const data = await loginApi({ email, password });
  
      localStorage.setItem("token", data.token);
  
      showToast("Login Successful 🎉", "success");
  
      setTimeout(() => {
        navigate("/");
      }, 1200);
  
    }catch (err) {
        const message =
          err.response?.data?.message || "Invalid email or password";
      
        showToast(message, "error"); 
      }
       finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">

      {/* 🔥 TOAST UI YAHAN AAYEGA */}
      {toast && (
        <div className={`toast toast--${toast.type}`}>
          {toast.message}
        </div>
      )}

      <div className="auth__box">
        <h1 className="auth__logo">AI-MIND</h1>
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