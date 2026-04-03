import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerApi } from "../services/auth.api";

const Register = () => {
  const navigate = useNavigate();

  // ✅ States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // 🔥 Toast function
  const showToast = (message, type) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  // 🔥 Register Handler
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      showToast("Please fill all fields", "error");
      return;
    }

    try {
      setLoading(true);

      // ✅ API call with await
      const data = await registerApi({
        username: name,
        email,
        password,
      });

      // ✅ Save token (auto login)
      localStorage.setItem("token", data.token);

      showToast("Account Created 🎉", "success");

      // ✅ Direct redirect to home
      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (err) {
      console.log("ERROR:", err);

      const message =
        err.response?.data?.message ||
        "User already exists";

      showToast(message, "error");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">

      {/* 🔥 TOAST */}
      {toast && (
        <div className={`toast toast--${toast.type}`}>
          {toast.message}
        </div>
      )}

      <div className="auth__box">
        <h1 className="auth__logo">AI-MIND</h1>
        <h2 className="auth__title">Register</h2>

        <form className="auth__form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="auth__switch">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;